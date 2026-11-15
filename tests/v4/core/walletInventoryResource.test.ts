import { APIError, Client } from "@avaprotocol/sdk-js";

const address = "0x1111111111111111111111111111111111111111";
const identity = { address, salt: "4", walletId: "global-4", isHidden: false };

function makeClient(payload: unknown, status = 200) {
  const fetchImpl = jest.fn(async () => new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": status >= 400 ? "application/problem+json" : "application/json" },
  }));
  const client = new Client({ baseUrl: "https://gateway.example/api/v1", fetchImpl: fetchImpl as typeof fetch });
  client.setToken("owner-jwt");
  return { client, fetchImpl };
}

describe("global wallet inventory resource", () => {
  it("passes a durable allocation key without putting it in the body", async () => {
    const { client, fetchImpl } = makeClient(identity, 201);
    await expect(client.wallets.createNext({ idempotencyKey: "add-1", chainId: 8453 })).resolves.toEqual(identity);
    const [url, options] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://gateway.example/api/v1/wallets:allocate");
    expect(options.method).toBe("POST");
    expect(options.headers).toMatchObject({ "Idempotency-Key": "add-1", Authorization: "Bearer owner-jwt" });
    expect(JSON.parse(String(options.body))).toEqual({ chainId: 8453 });
  });

  it("keeps the same logical allocation key on a cross-network retry", async () => {
    const { client, fetchImpl } = makeClient({ ...identity, isHidden: true }, 201);
    await client.wallets.createNext({ idempotencyKey: "retry-1", chainId: 1 });
    const replay = await client.wallets.createNext({ idempotencyKey: "retry-1", chainId: 8453 });
    expect(replay.isHidden).toBe(true);
    expect(replay.walletId).toBe(identity.walletId);
    for (const call of fetchImpl.mock.calls) {
      expect((call as unknown as [string, RequestInit])[1].headers).toMatchObject({ "Idempotency-Key": "retry-1" });
    }
  });

  it("returns hidden inventory and global usage without dropping archived identities", async () => {
    const response = {
      data: [{ ...identity, isHidden: true }],
      usage: { scope: "owner", activeCount: 0, activeLimit: 3, revision: "9007199254740993" },
    };
    const { client } = makeClient(response);
    await expect(client.wallets.list({ chainId: 1 })).resolves.toEqual(response);
  });

  it("preserves quota and key-conflict problem codes", async () => {
    for (const [status, code] of [[429, "WALLETS_LIMIT_REACHED"], [409, "IDEMPOTENCY_KEY_REUSED"]] as const) {
      const { client } = makeClient({ type: "about:blank", title: "Refused", status, code }, status);
      await expect(client.wallets.createNext({ idempotencyKey: "add-1" })).rejects.toMatchObject({ code, status });
    }
    expect(APIError).toBeDefined();
  });

  it("rejects an empty allocation key before sending", () => {
    const { client, fetchImpl } = makeClient(identity);
    expect(() => client.wallets.createNext({ idempotencyKey: " " })).toThrow("idempotency key");
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
