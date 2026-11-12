/**
 * Long-lived session grant for the MA v2 funded UserOp fixture.
 *
 * Real bundler sends refuse to sign without a grant, and grants only
 * attach to Modular Account v2. This is the single place the e2e
 * suite compiles that grant, so every UserOp test hits the same
 * runner with the same allowlist.
 */

import { FunctionFragment, Wallet as EthersWallet } from "ethers";

import {
  Chains,
  Protocols,
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

/**
 * Gateway problem+json `code` when `session_policy_deploy_check` is on and
 * POST /workflows names a fund-moving step the runner's usable grant does
 * not cover. `problem.required` describes the grant that would.
 */
export const SESSION_POLICY_NOT_COVERING = "SESSION_POLICY_NOT_COVERING";

/** Stable label so later runs reuse this grant instead of replacing it. */
export const E2E_SESSION_AGENT_LABEL = "e2e-funded-wallet";

/** One year — the fixture is meant to be funded once and left alone. */
export const E2E_GRANT_TTL_SECONDS = 365 * 24 * 60 * 60;

/**
 * Per-token caps. These are ceilings the owner signs, not balances: the
 * fixture holds a few USDC and no LINK, and the AllowlistModule still
 * refuses anything above what the runner has.
 *
 * They are sized for the deploy check, which derives a cap need per token
 * from a workflow's fixed per-run amount multiplied by the runs its schedule
 * allows inside the grant window, and refuses the create when the grant's
 * cap is lower. The templates this suite deploys came out at 51,840 runs:
 * the USDC read+write+customCode template transfers 0.1 USDC per run
 * (need 5,184 USDC) and the AAVE health-factor alert approves and supplies
 * 0.1 LINK per run (need 5,184 LINK). The Uniswap V3 stop-loss swaps
 * 0.001 WETH per run; the router call carries no derived token spend today,
 * so WETH only needs an allowlist row, but the cap is sized the same way in
 * case it does tomorrow. Withdraw spends 0.01 USDC; approve(0) is free.
 */
export const E2E_USDC_SPEND_CAP = "10000000000"; // 10,000 USDC (6 decimals)
export const E2E_LINK_SPEND_CAP = "10000000000000000000000"; // 10,000 LINK (18 decimals)
export const E2E_WETH_SPEND_CAP = "100000000000000000000"; // 100 WETH (18 decimals)

/**
 * `supply(address,uint256,address,uint16)` on the AAVE V3 Pool. Stated as
 * the signature it hashes from, like the selectors in the SDK's
 * sessionPolicy builders, so a wrong value cannot hide behind a hex literal.
 */
const SELECTOR_AAVE_V3_SUPPLY = FunctionFragment.from(
  "function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)",
).selector;

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

/**
 * Everything a fund-moving test may plan on the funded runner: the withdraw
 * and gas-tracking UserOps (USDC approve/transfer, native value to the owner
 * and the alternate recipient) plus the calls the deployed templates make
 * (AAVE approve LINK + Pool.supply, Uniswap V3 exactInputSingle with a WETH
 * approve). One grant covers all of them, so the fixture is installed once
 * per gateway database rather than once per template.
 */
export function e2eSessionActions(owner: string): v4.AllowedAction[] {
  const usdc = Tokens.USDC[Chains.Sepolia]!.address;
  const link = Protocols.aaveV3.tokens.LINK[Chains.Sepolia]!;
  const aavePool = Protocols.aaveV3.pool[Chains.Sepolia]!;
  const weth = Protocols.uniswapV3.tokens.WETH[Chains.Sepolia]!;
  return SessionPolicyActions.merge([
    SessionPolicyActions.erc20Approve(usdc),
    SessionPolicyActions.erc20Transfer(usdc),
    SessionPolicyActions.custom(owner, [SELECTOR_NATIVE_VALUE]),
    SessionPolicyActions.custom(e2eWithdrawAlternateRecipient(), [
      SELECTOR_NATIVE_VALUE,
    ]),
    SessionPolicyActions.erc20Approve(link),
    SessionPolicyActions.custom(aavePool, [SELECTOR_AAVE_V3_SUPPLY]),
    SessionPolicyActions.erc20Approve(weth),
    SessionPolicyActions.uniswapV3Swap(Chains.Sepolia),
  ]);
}

type SpendCap = NonNullable<v4.PreparePolicyRequest["erc20SpendCaps"]>[number];

export function e2eSpendCaps(): SpendCap[] {
  return [
    { token: Tokens.USDC[Chains.Sepolia]!.address, amount: E2E_USDC_SPEND_CAP },
    { token: Protocols.aaveV3.tokens.LINK[Chains.Sepolia]!, amount: E2E_LINK_SPEND_CAP },
    { token: Protocols.uniswapV3.tokens.WETH[Chains.Sepolia]!, amount: E2E_WETH_SPEND_CAP },
  ];
}

/** Every required per-token cap is present on the grant at least as high. */
function capsCover(required: readonly SpendCap[], have: readonly SpendCap[]): boolean {
  return required.every((need) => {
    const got = have.find((c) => c.token.toLowerCase() === need.token.toLowerCase());
    return got !== undefined && BigInt(got.amount) >= BigInt(need.amount);
  });
}

function e2eGrantRequest(
  owner: string,
  chainId: number,
): v4.PreparePolicyRequest {
  return {
    chainId,
    agentLabel: E2E_SESSION_AGENT_LABEL,
    justification:
      "ava-sdk-js e2e fixture — USDC approve/transfer, native ETH, AAVE supply and Uniswap swap templates",
    allowedActions: e2eSessionActions(owner),
    erc20SpendCaps: e2eSpendCaps(),
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
 * Reuse a pending/active grant on this runner that covers the required
 * actions AND caps, or submit one. A grant whose actions match but whose
 * caps are lower is not reused: the deploy check refuses on caps too, and
 * reusing it would pin the old caps on every later run. Does not revoke —
 * the fixture grant is meant to outlive a single test.
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
    const requiredCaps = e2eSpendCaps();
    const covers = (p: v4.SessionPolicy): boolean =>
      actionsCover(required, p.allowedActions ?? []) &&
      capsCover(requiredCaps, p.erc20SpendCaps ?? []);
    const listed = await client.policies.list(walletAddress, { chainId });
    const usable = listed.items.filter(stillValid);

    const labeled = usable.find(
      (p) => p.agentLabel === E2E_SESSION_AGENT_LABEL,
    );
    if (labeled && covers(labeled)) return labeled;

    const covering = usable.find(covers);
    if (covering) return covering;

    try {
      return await client.policies.grant(
        walletAddress,
        e2eGrantRequest(ownerAddress, chainId),
        signTypedDataWithEthers(ownerPrivateKey),
      );
    } catch (err) {
      // Another process granted first. Reuse what it installed only if it
      // covers; a surviving low-cap grant must surface as the conflict, not
      // as a fixture that later fails every fund-moving deploy.
      const e = err as { status?: number };
      if (e.status === 409) {
        const retry = await client.policies.list(walletAddress, { chainId });
        const won = retry.items.filter(stillValid).find(covers);
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
