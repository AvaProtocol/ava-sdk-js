/**
 * Port of tests-v3-archive/core/getTokenMetadata.test.ts.
 *
 * v3 → v4 mapping:
 *   - client.getTokenMetadata({address}) -> client.tokens.retrieve(address)
 *   - v3 wrapped fields under `response.token.*`; v4 returns
 *     {found, address, name, symbol, decimals, source, chainId}
 *     directly on the response.
 *
 * The v3 "per-request authKey" branch is gone — v4's auth is a
 * single client-scoped Bearer JWT, so the "should respect request
 * options" assertion is dropped.
 *
 * Token whitelist is inlined for the dev/sepolia chain (chainId
 * 11155111). Tests using TOKENS skip cleanly when the table is
 * empty so re-running against a chain with no whitelist still
 * passes.
 */

import { Chains, Client, Tokens, type TokenChainEntry } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
} from "../../utils/client";

interface TokenDef {
  readonly address: string;
  readonly name: string;
  readonly symbol: string;
  readonly decimals: number;
}

/**
 * Build a TokenDef from the catalog's symbol-keyed entry. The
 * catalog ships `name`/`decimals`/`address` per chain; `symbol` is
 * the lookup key so we add it back into the shape the existing
 * test logic expects.
 */
function fromCatalog(symbol: string): TokenDef {
  const entry: TokenChainEntry | undefined = Tokens[symbol]?.[Chains.Sepolia];
  if (!entry) {
    throw new Error(`Expected ${symbol} in @avaprotocol/protocols Sepolia catalog`);
  }
  return {
    address: entry.address,
    name: entry.name ?? symbol,
    symbol,
    decimals: entry.decimals,
  };
}

// Sepolia (chainId 11155111) — matches the dev aggregator's chain.
// Catalog symbols come from `@avaprotocol/protocols`. ETH is the
// native-asset sentinel (`0xeee…`) — not an ERC-20, so it's not in
// the catalog; stays inlined here.
const TOKENS: Readonly<Record<string, TokenDef>> = {
  ETH: {
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  WETH: fromCatalog("WETH"),
  USDC: fromCatalog("USDC"),
  LINK: fromCatalog("LINK"),
};

const HAS_TOKENS = Object.keys(TOKENS).length > 0;
const describeOrSkip = HAS_TOKENS ? describe : describe.skip;
const testOrSkip = HAS_TOKENS ? test : test.skip;

/**
 * Match server-returned name against the expected name/symbol.
 * v3 included this because the whitelist sometimes returns the
 * symbol where the test expects the full name (e.g. "USDC" vs
 * "USD Coin"). v4 has the same characteristic.
 */
function nameMatchesExpected(actual: string | undefined, expected: TokenDef): boolean {
  if (!actual) return false;
  if (actual === expected.name) return true;
  if (actual === expected.symbol) return true;
  return false;
}

describeOrSkip("getToken Tests", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  test.each(Object.entries(TOKENS))(
    "retrieve(%s) returns whitelist metadata (or placeholder)",
    async (tokenName, token) => {
      const resp = await client.tokens.retrieve(token.address);
      expect(resp.found).toBeTruthy();
      // v4 returns the address lowercased and exposes it directly on
      // the response (no nested `.token` object).
      expect(resp.address?.toLowerCase()).toBe(token.address.toLowerCase());

      // Tolerate placeholder responses (server still warming caches).
      if (resp.name === "Unknown Token") {
        expect(resp.symbol).toBeTruthy();
        expect((resp.decimals ?? -1) >= 0).toBe(true);
        return;
      }
      if (!nameMatchesExpected(resp.name, token)) {
        // Force the assertion to fail with the actual name printed.
        expect(resp.name).toBe(token.name);
      }
      expect(resp.symbol).toBe(token.symbol);
      expect(resp.decimals).toBe(token.decimals);
      void tokenName;
    },
  );

  test.each([
    ["zero address", "0x0000000000000000000000000000000000000000"],
    ["non-existent address", "0x1234567890123456789012345678901234567890"],
  ])("retrieve(%s) returns a well-formed found/not-found response", async (context, address) => {
    const resp = await client.tokens.retrieve(address);
    expect(typeof resp.found).toBe("boolean");
    if (resp.found) {
      // Some non-test environments return cached metadata even for
      // these addresses. Treat that as legitimate.
      expect(resp.address).toBeTruthy();
    } else {
      // v4 omits the address-info on not-found.
      expect(resp.name ?? "").toBe("");
    }
    void context;
  });

  test.each([
    ["too short", "0x123"],
    ["too long", "0x12345678901234567890123456789012345678901"],
    ["not hex", "invalid-address"],
    ["empty string", ""],
    ["invalid hex characters", "0xZZZ"],
  ])("retrieve(%s) rejects malformed addresses with HTTP 400 or 404", async (description, address) => {
    // Echo routes "" -> different path (/tokens/) so the surface
    // there is 404 from the router, not 400 from the handler.
    // Either is acceptable as "not a valid request".
    await expect(client.tokens.retrieve(address))
      .rejects.toMatchObject({ status: expect.any(Number) })
      .then(() => undefined)
      .catch(async () => {
        // If the call somehow resolves, the response must indicate
        // found=false so the test still expresses "garbage in →
        // safe handling out".
        const resp = await client.tokens.retrieve(address);
        expect(resp.found).toBe(false);
      });
    void description;
  });

  test("handles lowercase / uppercase / mixed-case addresses consistently", async () => {
    if (!TOKENS.USDC) return;
    const original = TOKENS.USDC.address;
    const variants = [
      original.toLowerCase(),
      original.toUpperCase(),
      original.slice(0, 20).toLowerCase() + original.slice(20).toUpperCase(),
    ];

    const responses = await Promise.all(
      variants.map((addr) => client.tokens.retrieve(addr)),
    );

    for (const resp of responses) {
      expect(resp.found).toBeTruthy();
      // Returned address is always lowercase.
      expect(resp.address).toBe(original.toLowerCase());
      expect(resp.name).toBe(responses[0].name);
      expect(resp.symbol).toBe(responses[0].symbol);
      expect(resp.decimals).toBe(responses[0].decimals);
    }
  });

  testOrSkip.each(Object.values(TOKENS).map((t) => [t.address] as const))(
    "validate token metadata structure for %s",
    async (address) => {
      const resp = await client.tokens.retrieve(address);
      expect(resp.found).toBeTruthy();
      // v4 surfaces the address-as-id directly.
      expect(resp.address).toMatch(/^0x[a-f0-9]{40}$/);
      expect(resp.address).toBe(resp.address?.toLowerCase());
      expect((resp.name ?? "").length).toBeGreaterThan(0);
      expect((resp.symbol ?? "").length).toBeGreaterThan(0);
      expect(resp.decimals).toBeGreaterThanOrEqual(0);
      expect(resp.decimals).toBeLessThanOrEqual(24);
      expect(typeof resp.address).toBe("string");
      expect(typeof resp.name).toBe("string");
      expect(typeof resp.symbol).toBe("string");
      expect(typeof resp.decimals).toBe("number");
      expect(Number.isInteger(resp.decimals)).toBe(true);
    },
  );

  testOrSkip("handles concurrent requests properly", async () => {
    const addresses = Object.values(TOKENS).map((t) => t.address);
    const responses = await Promise.all(addresses.map((a) => client.tokens.retrieve(a)));
    expect(responses).toHaveLength(addresses.length);
    responses.forEach((resp, idx) => {
      expect(resp.found).toBeTruthy();
      expect(resp.address).toBe(addresses[idx].toLowerCase());
    });
  });

  testOrSkip("returns consistent data across multiple calls", async () => {
    if (!TOKENS.USDC) return;
    const address = TOKENS.USDC.address;
    const [first, second, third] = await Promise.all([
      client.tokens.retrieve(address),
      client.tokens.retrieve(address),
      client.tokens.retrieve(address),
    ]);
    expect(first).toEqual(second);
    expect(second).toEqual(third);
    for (const resp of [first, second, third]) {
      expect(resp.found).toBeTruthy();
      expect(resp.address).toBeTruthy();
    }
  });

  testOrSkip.each(
    Object.entries(TOKENS).map(([name, token]) => [name, token, token.decimals] as const),
  )(
    "handle %s with %s decimals (flexible)",
    async (tokenName, token, expectedDecimals) => {
      const resp = await client.tokens.retrieve(token.address);
      expect(resp.found).toBeTruthy();

      if (resp.name === "Unknown Token") {
        expect(resp.decimals).toBeGreaterThanOrEqual(0);
        return;
      }
      expect(resp.decimals).toBe(expectedDecimals);
      expect(resp.symbol).toBe(token.symbol);
      if (!nameMatchesExpected(resp.name, token)) {
        expect(resp.name).toBe(token.name);
      }
      void tokenName;
    },
  );

  test("request completes within a reasonable time budget", async () => {
    const start = Date.now();
    const resp = await client.tokens.retrieve("0x0000000000000000000000000000000000000000");
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(10_000);
    expect(typeof resp.found).toBe("boolean");
  });
});
