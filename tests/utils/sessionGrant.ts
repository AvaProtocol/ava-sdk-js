/**
 * Long-lived session grant for the MA v2 funded UserOp fixture.
 *
 * Real bundler sends refuse to sign without a grant, and grants only
 * attach to Modular Account v2. This is the single place the e2e
 * suite compiles that grant, so every UserOp test hits the same
 * runner with the same allowlist.
 */

import { Wallet as EthersWallet } from "ethers";

import {
  Chains,
  SessionPolicyActions,
  Tokens,
  actionsCover,
  type Client,
} from "@avaprotocol/sdk-js";
import type { v4 } from "@avaprotocol/types";

/** Native value transfer (empty calldata) as the allowlist records it. */
export const SELECTOR_NATIVE_VALUE = "0x00000000";

/**
 * Gateway problem+json `code` for a native ETH send under a REST
 * session grant (EigenLayer-AVS #761). Every REST grant is
 * selector-scoped, so `execute(to, value, 0x)` cannot validate.
 * Re-granting does not fix it.
 */
export const SESSION_POLICY_NATIVE_NOT_ALLOWED =
  "SESSION_POLICY_NATIVE_NOT_ALLOWED";

/** Stable label so later runs reuse this grant instead of replacing it. */
export const E2E_SESSION_AGENT_LABEL = "e2e-funded-wallet";

/** One year — the fixture is meant to be funded once and left alone. */
export const E2E_GRANT_TTL_SECONDS = 365 * 24 * 60 * 60;

/** 1000 USDC (6 decimals). Approve(0) is free; withdraw spends 0.01. */
export const E2E_USDC_SPEND_CAP = "1000000000";

/**
 * Same key `withdraw.test.ts` uses for the alternate-recipient case.
 * Native ETH to that address must be on the grant or the UserOp AA23s.
 */
export const E2E_WITHDRAW_ALTERNATE_KEY =
  "0x0000000000000000000000000000000000000000000000000000000000000001";

export function e2eWithdrawAlternateRecipient(): string {
  return new EthersWallet(E2E_WITHDRAW_ALTERNATE_KEY).address;
}

export function signTypedDataWithEthers(privateKey: string) {
  const signer = new EthersWallet(privateKey);
  return async (
    typedData: Readonly<Record<string, unknown>>,
  ): Promise<string> => {
    const { domain, types, message } = typedData as {
      domain: Record<string, unknown>;
      types: Record<string, unknown>;
      message: Record<string, unknown>;
    };
    const { EIP712Domain: _ignored, ...rest } = types as Record<
      string,
      unknown
    >;
    return signer.signTypedData(
      domain as never,
      rest as never,
      message as never,
    );
  };
}

export function e2eSessionActions(owner: string): v4.AllowedAction[] {
  const usdc = Tokens.USDC[Chains.Sepolia]!.address;
  return SessionPolicyActions.merge([
    SessionPolicyActions.erc20Approve(usdc),
    SessionPolicyActions.erc20Transfer(usdc),
    SessionPolicyActions.custom(owner, [SELECTOR_NATIVE_VALUE]),
    SessionPolicyActions.custom(e2eWithdrawAlternateRecipient(), [
      SELECTOR_NATIVE_VALUE,
    ]),
  ]);
}

function e2eGrantRequest(
  owner: string,
  chainId: number,
): v4.PreparePolicyRequest {
  const usdc = Tokens.USDC[Chains.Sepolia]!.address;
  return {
    chainId,
    agentLabel: E2E_SESSION_AGENT_LABEL,
    justification:
      "ava-sdk-js e2e UserOp fixture — USDC approve/transfer and native ETH",
    allowedActions: e2eSessionActions(owner),
    erc20SpendCap: { token: usdc, amount: E2E_USDC_SPEND_CAP },
    expiresInSeconds: E2E_GRANT_TTL_SECONDS,
  };
}

function stillValid(policy: v4.SessionPolicy): boolean {
  return (
    (policy.status === "pending" || policy.status === "active") &&
    policy.validUntil > Date.now() + 24 * 60 * 60 * 1000
  );
}

const inflight = new Map<string, Promise<v4.SessionPolicy>>();

/**
 * Reuse a covering pending/active grant on this runner, or submit one.
 * Does not revoke — the fixture grant is meant to outlive a single test.
 */
export async function ensureE2eSessionGrant(
  client: Client,
  walletAddress: string,
  ownerPrivateKey: string,
  ownerAddress: string,
  chainId: number,
): Promise<v4.SessionPolicy> {
  const key = `${chainId}:${ownerAddress.toLowerCase()}:${walletAddress.toLowerCase()}`;
  const existing = inflight.get(key);
  if (existing) return existing;

  const run = async (): Promise<v4.SessionPolicy> => {
    const required = e2eSessionActions(ownerAddress);
    const listed = await client.policies.list(walletAddress, { chainId });
    const usable = listed.items.filter(stillValid);

    const labeled = usable.find(
      (p) => p.agentLabel === E2E_SESSION_AGENT_LABEL,
    );
    if (labeled) {
      if (
        !labeled.allowedActions ||
        labeled.allowedActions.length === 0 ||
        actionsCover(required, labeled.allowedActions)
      ) {
        return labeled;
      }
    }

    const covering = usable.find((p) =>
      actionsCover(required, p.allowedActions ?? []),
    );
    if (covering) return covering;

    try {
      return await client.policies.grant(
        walletAddress,
        e2eGrantRequest(ownerAddress, chainId),
        signTypedDataWithEthers(ownerPrivateKey),
      );
    } catch (err) {
      const e = err as { status?: number };
      if (e.status === 409) {
        const retry = await client.policies.list(walletAddress, { chainId });
        const won = retry.items.find(stillValid);
        if (won) return won;
      }
      throw err;
    }
  };

  const pending = run().finally(() => {
    inflight.delete(key);
  });
  inflight.set(key, pending);
  return pending;
}
