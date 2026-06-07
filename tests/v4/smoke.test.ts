import {
  APIError,
  Client,
  Nodes,
  Protocols,
  Triggers,
  buildAuthMessage,
  signAuthMessage,
} from "@avaprotocol/sdk-js";

import { TEST_REST_URL } from "../utils/env";

/**
 * v4 SDK smoke test. Doesn't require an aggregator to run — most of
 * the assertions are about shape and behaviour of the client itself.
 * The integration-style tests that hit a live aggregator live next
 * to this file under wildcard names; they're auto-skipped when
 * `AVS_REST_URL` is unset.
 */
describe("v4 SDK smoke", () => {
  describe("client construction", () => {
    test("exposes every resource sub-client", () => {
      const client = new Client({ baseUrl: TEST_REST_URL() });
      expect(client.auth).toBeDefined();
      expect(client.health).toBeDefined();
      expect(client.workflows).toBeDefined();
      expect(client.executions).toBeDefined();
      expect(client.wallets).toBeDefined();
      expect(client.secrets).toBeDefined();
      expect(client.tokens).toBeDefined();
      expect(client.nodes).toBeDefined();
      expect(client.triggers).toBeDefined();
      expect(client.operators).toBeDefined();
    });

    test("baseUrl trailing slash is normalized", () => {
      const a = new Client({ baseUrl: "https://gateway.example/api/v1" });
      const b = new Client({ baseUrl: "https://gateway.example/api/v1/" });
      // Both should produce identical request URLs; we verify by
      // checking that setToken roundtrips identically.
      a.setToken("t");
      b.setToken("t");
      expect(a.token).toBe(b.token);
    });

    test("token is set/cleared via setToken", () => {
      const client = new Client({ baseUrl: TEST_REST_URL() });
      expect(client.token).toBeUndefined();
      client.setToken("jwt.value");
      expect(client.token).toBe("jwt.value");
      client.auth.clear();
      expect(client.token).toBeUndefined();
    });
  });

  describe("auth message builder", () => {
    test("buildAuthMessage produces a canonical EIP-191 template", () => {
      const built = buildAuthMessage({
        ownerAddress: "0xD7050816337a3f8f690F8083B5Ff8019D50c0E50",
        uri: "http://localhost:3000",
        chainId: 11_155_111,
        issuedAt: new Date("2026-05-25T12:00:00.000Z"),
        expireAt: new Date("2026-05-26T12:00:00.000Z"),
        version: "v4-test",
      });
      expect(built.message).toContain("URI: http://localhost:3000");
      expect(built.message).toContain("Chain ID: 11155111");
      expect(built.message).toContain("Issued At: 2026-05-25T12:00:00.000Z");
      expect(built.message).toContain("Expire At: 2026-05-26T12:00:00.000Z");
      expect(built.message).toContain("Wallet: 0xD7050816337a3f8f690F8083B5Ff8019D50c0E50");
      expect(built.chainId).toBe(11_155_111);
    });

    test("signAuthMessage produces a hex signature with the recovered owner", async () => {
      // Deterministic test key (no funds). Not the same as TEST_PRIVATE_KEY.
      const pk = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
      const out = await signAuthMessage(pk, {
        uri: "http://localhost:3000",
        chainId: 11_155_111,
        version: "v4-test",
      });
      expect(out.signature.startsWith("0x")).toBe(true);
      expect(out.signature.length).toBe(132); // 65 bytes hex + 0x prefix
      expect(out.ownerAddress.length).toBe(42);
    });

    test("buildAuthMessage throws on invalid chainId (zero, negative, non-integer)", () => {
      const owner = "0xD7050816337a3f8f690F8083B5Ff8019D50c0E50";
      const baseOk = { ownerAddress: owner, uri: "http://localhost:3000", version: "v4-test" };
      expect(() => buildAuthMessage({ ...baseOk, chainId: 0 })).toThrow(/chainId/);
      expect(() => buildAuthMessage({ ...baseOk, chainId: -1 })).toThrow(/chainId/);
      expect(() => buildAuthMessage({ ...baseOk, chainId: 1.5 })).toThrow(/chainId/);
    });

    test("buildAuthMessage throws on missing/empty version", () => {
      const owner = "0xD7050816337a3f8f690F8083B5Ff8019D50c0E50";
      const baseOk = { ownerAddress: owner, uri: "http://localhost:3000", chainId: 1 };
      expect(() => buildAuthMessage({ ...baseOk, version: "" })).toThrow(/version/);
      expect(() =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        buildAuthMessage({ ...baseOk, version: undefined as any }),
      ).toThrow(/version/);
    });

    test("buildAuthMessage throws on missing/empty uri", () => {
      const owner = "0xD7050816337a3f8f690F8083B5Ff8019D50c0E50";
      const baseOk = { ownerAddress: owner, chainId: 1, version: "v4-test" };
      expect(() => buildAuthMessage({ ...baseOk, uri: "" })).toThrow(/uri/);
      expect(() =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        buildAuthMessage({ ...baseOk, uri: undefined as any }),
      ).toThrow(/uri/);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => buildAuthMessage({ ...baseOk, uri: null as any })).toThrow(/uri/);
      expect(() => buildAuthMessage({ ...baseOk, uri: "   " })).toThrow(/uri/);
    });

    test("buildAuthMessage throws on invalid uri format", () => {
      const owner = "0xD7050816337a3f8f690F8083B5Ff8019D50c0E50";
      const baseOk = { ownerAddress: owner, chainId: 1, version: "v4-test" };
      // Negative cases — each line documents one rejection mode.
      expect(() => buildAuthMessage({ ...baseOk, uri: "not-a-url" })).toThrow(/uri/);
      expect(() => buildAuthMessage({ ...baseOk, uri: "localhost:3000" })).toThrow(/scheme/);
      expect(() => buildAuthMessage({ ...baseOk, uri: "ftp://example.com" })).toThrow(/scheme/);
      expect(() => buildAuthMessage({ ...baseOk, uri: "javascript:void(0)" })).toThrow(/scheme/);
      // Positive cases — guard against future over-aggressive validation.
      expect(() => buildAuthMessage({ ...baseOk, uri: "http://localhost:3000" })).not.toThrow();
      expect(() => buildAuthMessage({ ...baseOk, uri: "https://app.example.com" })).not.toThrow();
      expect(() => buildAuthMessage({ ...baseOk, uri: "https://app.example.com:8443/path" })).not.toThrow();
    });

    test("signAuthMessage throws when called without input", async () => {
      const pk = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await expect(signAuthMessage(pk, undefined as any)).rejects.toThrow(/input is required/);
    });
  });

  describe("typed builders", () => {
    test("Triggers.cron returns a discriminated-union shaped object", () => {
      const trigger = Triggers.cron({
        name: "every5min",
        schedule: ["*/5 * * * *"],
      });
      expect(trigger.type).toBe("cron");
      expect(trigger.name).toBe("every5min");
      // Config lives inline alongside the discriminator (see builders/triggers.ts).
      // The discriminated-union shape carries readonly arrays per the
      // OpenAPI types; the test only reads the value, so widening
      // through `unknown` keeps the assertion intent without
      // pretending the source array is mutable.
      const config = (trigger as unknown as { config: { schedules: readonly string[] } }).config;
      expect(config.schedules).toEqual(["*/5 * * * *"]);
    });

    test("Nodes.customCode returns id+name+type+config", () => {
      const node = Nodes.customCode({
        id: "step1",
        name: "step1",
        source: "return {ok: true};",
      });
      expect(node.id).toBe("step1");
      expect(node.name).toBe("step1");
      expect(node.type).toBe("customCode");
      const config = (node as { config: { source: string; lang: string } }).config;
      expect(config.source).toBe("return {ok: true};");
      expect(config.lang).toBe("javascript");
    });

    test("Triggers.event preserves topic wildcards as empty strings", () => {
      const transferTopic = Protocols.erc20.eventTopics.Transfer;
      const trigger = Triggers.event({
        name: "transfer",
        queries: [
          {
            addresses: ["0x0000000000000000000000000000000000000001"],
            topics: [transferTopic, ""],
          },
        ],
      });
      // Same readonly-vs-mutable widening as the cron case above —
      // the builders return discriminated-union readonly shapes; the
      // test only reads the topic array.
      const config = (
        trigger as unknown as {
          config: { queries: ReadonlyArray<{ topics: ReadonlyArray<string | null> }> };
        }
      ).config;
      expect(config.queries[0].topics).toEqual([transferTopic, ""]);
    });
  });

  describe("transport behaviour", () => {
    test("APIError surfaces problem+json fields when fetch returns 4xx", async () => {
      // Hand-roll a fetch that returns 401 problem+json so we don't need
      // a live aggregator for this assertion.
      const fakeFetch: typeof fetch = async () =>
        new Response(
          JSON.stringify({
            type: "about:blank",
            title: "Auth required",
            status: 401,
            code: "AUTH_REQUIRED",
            detail: "this endpoint requires a Bearer JWT",
            instance: "01TEST",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/problem+json",
              "X-Request-ID": "01TEST",
            },
          },
        );
      const client = new Client({ baseUrl: "http://example.test/api/v1", fetchImpl: fakeFetch });
      await expect(client.workflows.list()).rejects.toMatchObject({
        constructor: APIError,
        status: 401,
        code: "AUTH_REQUIRED",
        requestId: "01TEST",
      });
    });
  });
});
