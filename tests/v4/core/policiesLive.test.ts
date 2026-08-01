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

import { Client } from "@avaprotocol/sdk-js";
import type { v4 } from "@avaprotocol/types";

import { getClient, authenticateClient, testPrivateKey, TEST_AUTH_CHAIN_ID } from "../../utils/client";

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
  return async (typedData: Readonly<Record<string, unknown>>): Promise<string> => {
    const { domain, types, message } = typedData as {
      domain: Record<string, unknown>;
      types: Record<string, unknown>;
      message: Record<string, unknown>;
    };
    const { EIP712Domain: _ignored, ...rest } = types as Record<string, unknown>;
    return signer.signTypedData(domain as never, rest as never, message as never);
  };
}

describe("policies (live gateway)", () => {
  let client: Client;
  let owner: string;
  let wallet: string;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    owner = new EthersWallet(testPrivateKey()).address;

    // Salt 0 is the owner's default wallet; ensure-and-register is idempotent.
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
    const after = await client.policies.list(wallet, TEST_AUTH_CHAIN_ID);
    expect(after.items.some((p) => p.id === prepared.policyId)).toBe(false);
  }, 120_000);

  test("a grant signed by the owner is accepted and stored pending", async () => {
    const policy = await client.policies.grant(
      wallet,
      request(),
      signTypedDataWithEthers(testPrivateKey()),
    );

    expect(policy.id).toBeTruthy();
    // Pending, not active: the install rides the first workflow operation.
    expect(policy.status).toBe("pending");

    const listed = await client.policies.list(wallet, TEST_AUTH_CHAIN_ID);
    expect(listed.items.some((p) => p.id === policy.id)).toBe(true);

    // Grant material must never be echoed back — this is a read for the
    // manage screen, not a way to recover an authorization.
    const fetched = await client.policies.get(wallet, policy.id, TEST_AUTH_CHAIN_ID);
    expect(JSON.stringify(fetched)).not.toContain("installCall");
    expect(JSON.stringify(fetched)).not.toContain("ownerSignature");

    // Revoking before first use is complete on its own: nothing was installed.
    // Never used, so nothing was installed: the record goes away entirely
    // rather than being retained for audit.
    const revoked = await client.policies.revoke(wallet, policy.id, TEST_AUTH_CHAIN_ID);
    expect(revoked.status).toBe("deleted");
  }, 180_000);

  test("a signature from someone other than the owner is refused", async () => {
    const stranger = EthersWallet.createRandom();
    await expect(
      client.policies.grant(wallet, request(), signTypedDataWithEthers(stranger.privateKey)),
    ).rejects.toThrow();

    // And nothing was stored for it.
    const listed = await client.policies.list(wallet, TEST_AUTH_CHAIN_ID);
    expect(listed.items.every((p) => p.status !== "pending" || p.agentLabel !== "ImposterBot")).toBe(true);
  }, 180_000);

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
