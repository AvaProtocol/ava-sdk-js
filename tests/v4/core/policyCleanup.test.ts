import { Client } from "@avaprotocol/sdk-js";
import type { v4 } from "@avaprotocol/types";

const wallet = "0x209eb31c199bEB4c386eF83CF442DE1a00667a1F";
const chainId = 11155111;
const id = "01JABCDEF0000000000000000";
const policy = {
  id,
  runner: wallet,
  chainId,
  status: "revoked",
  entityId: 7,
  sessionSigner: "0x82F2Dd9a552a69f2ceD7Ff2D05c43aB8430158FB",
  agentLabel: "TradingBot",
  validUntil: 1799999999000,
  createdAt: 1790000000000,
} as const;
const cleanup: v4.OnChainRevokeCleanup = {
  entityId: policy.entityId,
  target: wallet,
  callData: "0x1234",
  chainId,
};

describe("policy cleanup reads", () => {
  let fetchImpl: jest.Mock<Promise<Response>, Parameters<typeof fetch>>;
  let client: Client;

  beforeEach(() => {
    fetchImpl = jest.fn();
    client = new Client({
      baseUrl: "https://gateway.test/api/v1",
      token: "owner-jwt",
      fetchImpl,
    });
  });

  function reply(value: unknown): void {
    fetchImpl.mockResolvedValueOnce(
      new Response(JSON.stringify(value), {
        headers: { "Content-Type": "application/json" },
      }),
    );
  }

  test.each([
    ["required with payload", { ...policy, onChainCleanupRequired: true, onChainCleanup: cleanup }],
    ["required without payload", { ...policy, onChainCleanupRequired: true }],
    ["not required", { ...policy, onChainCleanupRequired: false }],
    // Deliberately predates the current SessionPolicy contract. Transport
    // preserves the old wire reply rather than synthesizing a boolean.
    ["older gateway without the flag", policy],
  ])("list and detail preserve %s unchanged", async (_name, received) => {
    reply({ items: [received] });
    const listed = await client.policies.list(wallet, { chainId });
    expect(listed).toStrictEqual({ items: [received] });

    reply(received);
    const fetched = await client.policies.get(wallet, id, { chainId });
    expect(fetched).toStrictEqual(received);

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    const expectedPaths = [`/api/v1/wallets/${wallet}/policies`, `/api/v1/wallets/${wallet}/policies/${id}`];
    fetchImpl.mock.calls.forEach(([url, init], index) => {
      const request = new URL(String(url));
      expect(request.pathname).toBe(expectedPaths[index]);
      expect(request.searchParams.get("chainId")).toBe(String(chainId));
      expect(init?.method).toBe("GET");
    });
  });

  test("fresh reads replace the warning with a payload, then clear both after removal", async () => {
    const waiting: v4.SessionPolicy = { ...policy, onChainCleanupRequired: true };
    const available: v4.SessionPolicy = { ...waiting, onChainCleanup: cleanup };
    const cleared: v4.SessionPolicy = { ...policy, onChainCleanupRequired: false };
    for (const received of [waiting, available, cleared]) {
      reply({ items: [received] });
      const listed = await client.policies.list(wallet, { chainId });
      expect(listed.items[0]).toStrictEqual(received);
      reply(received);
      expect(await client.policies.get(wallet, id, { chainId })).toStrictEqual(received);
    }
    expect(fetchImpl).toHaveBeenCalledTimes(6);
  });
});
