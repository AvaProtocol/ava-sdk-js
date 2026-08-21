/**
 * The grant flow against a live gateway.
 *
 * `policies.test.ts` proves the SDK sends the right shapes; this proves the
 * gateway accepts them and that the signature actually verifies. Those are
 * different failures: a contract mismatch passes the stub and dies here.
 *
 * The owner signs with `eth_signTypedData_v4` over the payload the gateway
 * returned. Nothing reaches the chain — a grant is stored as `pending` and the
 * on-chain install rides the first workflow operation on that wallet — so this
 * costs no gas and needs no funded account.
 */

import { Wallet as EthersWallet } from "ethers";

import { Client, SessionPolicyActions } from "@avaprotocol/sdk-js";
import type { v4 } from "@avaprotocol/types";

import {
  getIsolatedClient,
  TEST_AUTH_CHAIN_ID,
} from "../../utils/client";

// Sepolia test USDC — the same token the Uniswap fixtures use.
const TOKEN = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const APPROVE_SELECTOR = "0x095ea7b3";

/**
 * ethers signs typed data from (domain, types, message) and rejects the
 * EIP712Domain entry that eth_signTypedData_v4 payloads carry — it derives
 * that from the domain itself. Browser wallets take the whole envelope, which
 * is why the SDK passes it through untouched rather than destructuring.
 */
function signTypedDataWithEthers(privateKey: string) {
  const signer = new EthersWallet(privateKey);
  return async (
    typedData: Readonly<Record<string, unknown>>
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
      message as never
    );
  };
}

describe("policies (live gateway)", () => {
  let client: Client;
  let ownerKey: string;
  let wallet: string;

  beforeAll(async () => {
    ({ client, privateKey: ownerKey } = await getIsolatedClient());

    // Isolated EOA so grant-then-revoke cannot tear down the funded
    // UserOp fixture (shared TEST_PRIVATE_KEY, MA v2 salt 0).
    const w = await client.wallets.create({ salt: "0" });
    wallet = w.address;
  }, 120_000);

  test("the gateway returns a signable payload and no state", async () => {
    const prepared = await client.policies.prepare(wallet, request());

    expect(prepared.policyId).toBeTruthy();
    expect(prepared.entityId).toBeGreaterThanOrEqual(1); // 0 is the owner's own validation
    expect(prepared.digest).toMatch(/^0x[0-9a-fA-F]{64}$/);
    expect(prepared.typedData).toBeTruthy();

    // validUntil is absolute and must be echoed to submit, not recomputed.
    expect(prepared.validUntil).toBeGreaterThan(Date.now());

    // Prepare stores nothing: an abandoned grant screen leaves no policy.
    const after = await client.policies.list(wallet);
    expect(after.items.some((p) => p.id === prepared.policyId)).toBe(false);
  }, 120_000);

  test("a grant signed by the owner is accepted and stored pending", async () => {
    const policy = await client.policies.grant(
      wallet,
      request(),
      signTypedDataWithEthers(ownerKey)
    );

    try {
      expect(policy.id).toBeTruthy();
      // Pending, not active: the install rides the first workflow operation.
      expect(policy.status).toBe("pending");

      const listed = await client.policies.list(wallet);
      expect(listed.items.some((p) => p.id === policy.id)).toBe(true);

      // Grant material must never be echoed back — this is a read for the
      // manage screen, not a way to recover an authorization.
      const fetched = await client.policies.get(wallet, policy.id);
      expect(JSON.stringify(fetched)).not.toContain("installCall");
      expect(JSON.stringify(fetched)).not.toContain("ownerSignature");

      // Pending with InstallCall is retained as revoked so a late-landing
      // install can still be cleaned up (#731). Nothing is known on chain yet.
      const revoked = await client.policies.revoke(wallet, policy.id);
      expect(revoked.status).toBe("revoked");
      expect(revoked.onChainCleanupRequired).toBe(false);
      expect(revoked.onChainCleanup).toBeUndefined();
    } finally {
      // A failed assertion above must not leave a pending grant behind on a
      // wallet other tests share. Revoke is idempotent enough that the
      // happy-path call above is harmless to repeat.
      await client.policies.revoke(wallet, policy.id).catch(() => undefined);
    }
  }, 180_000);

  test("a signature from someone other than the owner is refused", async () => {
    const stranger = EthersWallet.createRandom();
    // A label unique to this attempt, so the assertion below can only be
    // satisfied by this grant's absence — not by it happening to look like
    // some other policy on the wallet.
    const label = `ImposterBot-${Date.now()}`;

    await expect(
      client.policies.grant(
        wallet,
        request(label),
        signTypedDataWithEthers(stranger.privateKey)
      )
    ).rejects.toThrow();

    const listed = await client.policies.list(wallet);
    expect(listed.items.some((p) => p.agentLabel === label)).toBe(false);
  }, 180_000);

  // The path Studio actually takes: chips → SessionPolicyActions → a grant the
  // gateway accepts. Proves the builder's output is a shape the API takes, not
  // just a well-formed object.
  test("a grant built from action chips is accepted", async () => {
    const allowedActions = SessionPolicyActions.merge([
      SessionPolicyActions.erc20Approve(TOKEN),
      SessionPolicyActions.uniswapV3Swap(TEST_AUTH_CHAIN_ID),
    ]);
    expect(allowedActions).toHaveLength(2);

    const policy = await client.policies.grant(
      wallet,
      { ...request("ChipBuiltBot"), allowedActions },
      signTypedDataWithEthers(ownerKey)
    );
    try {
      expect(policy.status).toBe("pending");
    } finally {
      await client.policies.revoke(wallet, policy.id).catch(() => undefined);
    }
  }, 180_000);

  // v4.17.0 refuses a grant naming a chain this gateway does not serve,
  // before any signature is collected: such a grant would be signed and
  // stored but unusable, since no bundler behind this gateway could send
  // under it. Asserted here rather than against the stub in policies.test.ts,
  // where the refusal would only be the one the stub was told to give.
  //
  // 999_999 is not a real chain, so no stack this suite runs against serves
  // it — unlike Base or Sepolia, which the Railway gateway does serve.
  test("a chain the gateway does not serve is refused at prepare", async () => {
    // v4.17.0+ (EigenLayer-AVS #760). 4.16.x still allocates the grant.
    const { version } = await client.health.check();
    const [maj, min] = (version ?? "0.0.0").split(".").map((n) => Number(n) || 0);
    if (maj < 4 || (maj === 4 && min < 17)) {
      console.log(
        `Skipping — POLICIES_CHAIN_NOT_SERVED needs aggregator >= 4.17.0 (this gateway is ${version})`,
      );
      return;
    }

    const unserved = 999_999;

    await expect(
      client.policies.prepare(wallet, { ...request(), chainId: unserved }),
    ).rejects.toMatchObject({
      status: 400,
      code: "POLICIES_CHAIN_NOT_SERVED",
    });

    // Refused, not recorded: the wallet's grants are untouched.
    const listed = await client.policies.list(wallet);
    expect(listed.items.every((p) => p.chainId !== unserved)).toBe(true);
  }, 120_000);

  function request(label = "TradingBot"): v4.PreparePolicyRequest {
    return {
      chainId: TEST_AUTH_CHAIN_ID,
      agentLabel: label,
      justification: "Execute swaps you approve in chat",
      allowedActions: [{ target: TOKEN, selectors: [APPROVE_SELECTOR] }],
      erc20SpendCap: { token: TOKEN, amount: "500000000" },
      expiresInSeconds: 30 * 24 * 60 * 60,
    };
  }
});
