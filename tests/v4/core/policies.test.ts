/**
 * `client.policies.grant()` against a stand-in gateway.
 *
 * This suite needs no real gateway: the SDK's own HTTP leaves the test
 * process, so a local listener can play the gateway and assert exactly what
 * the SDK sent. That is the point — the logic worth protecting here is not
 * "does the request reach the server", it is "does submit echo prepare's
 * allocations byte for byte".
 *
 * Why that matters: `validUntil` is an ABSOLUTE timestamp baked into the
 * install calldata the owner signs. Recomputing it at submit time from
 * `expiresInSeconds` — the obvious-looking thing to do, since that is what
 * the caller supplied — changes the digest, and the signature silently stops
 * verifying. The failure surfaces on chain, much later, as an invalid
 * signature that names nothing.
 */

import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";

import { Client } from "@avaprotocol/sdk-js";
import type { v4 } from "@avaprotocol/types";

interface Captured {
  prepareBody?: Record<string, unknown>;
  submitBody?: Record<string, unknown>;
  paths: string[];
}

const PREPARED = {
  policyId: "01JABCDEF0000000000000000",
  chainId: 11155111,
  entityId: 7,
  sessionSigner: "0x82F2Dd9a552a69f2ceD7Ff2D05c43aB8430158FB",
  deadline: 1785541743,
  // Deliberately unrelated to expiresInSeconds below, so a recomputed value
  // cannot coincidentally match.
  validUntil: 1799999999000,
  digest: `0x${"ab".repeat(32)}`,
  typedData: { domain: { chainId: 11155111 }, message: { nonce: "0x1" } },
} satisfies v4.PreparedPolicy;

async function startGateway(captured: Captured): Promise<{ url: string; close: () => Promise<void> }> {
  const server: Server = createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      const path = req.url ?? "";
      captured.paths.push(path);
      const body = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
      res.setHeader("content-type", "application/json");

      if (path.includes("policies:prepare")) {
        captured.prepareBody = body;
        res.statusCode = 200;
        res.end(JSON.stringify(PREPARED));
        return;
      }
      if (path.includes("policies:submit")) {
        captured.submitBody = body;
        res.statusCode = 201;
        // Matches SubmitPolicyResponse: SessionPolicy fields + supersededPolicyIds.
        res.end(
          JSON.stringify({
            id: PREPARED.policyId,
            status: "pending",
            supersededPolicyIds: [],
          }),
        );
        return;
      }
      res.statusCode = 404;
      res.end("{}");
    });
  });

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

describe("policies.grant", () => {
  const wallet = "0x209eb31c199bEB4c386eF83CF442DE1a00667a1F";
  const request: v4.PreparePolicyRequest = {
    chainId: 11155111,
    agentLabel: "TradingBot",
    justification: "Execute swaps you approve in chat",
    allowedActions: [
      { target: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", selectors: ["0x095ea7b3"] },
    ],
    erc20SpendCap: {
      token: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      amount: "500000000",
    },
    expiresInSeconds: 2_592_000,
  };

  let gateway: { url: string; close: () => Promise<void> };
  let captured: Captured;
  let client: Client;

  beforeEach(async () => {
    captured = { paths: [] };
    gateway = await startGateway(captured);
    client = new Client({ baseUrl: `${gateway.url}/api/v1`, token: "test-jwt" });
  });

  afterEach(async () => {
    await gateway.close();
  });

  test("signs the typed data the gateway returned, not something rebuilt", async () => {
    let signedWith: unknown;
    await client.policies.grant(wallet, request, async (typedData) => {
      signedWith = typedData;
      return `0x${"11".repeat(65)}`;
    });

    expect(signedWith).toEqual(PREPARED.typedData);
  });

  test("echoes prepare's allocations verbatim to submit", async () => {
    await client.policies.grant(wallet, request, async () => `0x${"11".repeat(65)}`);

    const submitted = captured.submitBody!;
    expect(submitted.policyId).toBe(PREPARED.policyId);
    expect(submitted.entityId).toBe(PREPARED.entityId);
    expect(submitted.deadline).toBe(PREPARED.deadline);
    expect(submitted.chainId).toBe(PREPARED.chainId);
  });

  test("submits the ABSOLUTE validUntil from prepare, never a recomputed one", async () => {
    const before = Date.now();
    await client.policies.grant(wallet, request, async () => `0x${"11".repeat(65)}`);

    const submitted = captured.submitBody!;
    expect(submitted.validUntil).toBe(PREPARED.validUntil);

    // Guard the specific mistake: deriving it from expiresInSeconds. That
    // would land near now + 30 days and change the digest the owner signed.
    const recomputed = before + request.expiresInSeconds * 1000;
    expect(Math.abs((submitted.validUntil as number) - recomputed)).toBeGreaterThan(60_000);
  });

  test("carries the grant terms through so the gateway rebuilds the same calldata", async () => {
    await client.policies.grant(wallet, request, async () => `0x${"11".repeat(65)}`);

    const submitted = captured.submitBody!;
    expect(submitted.allowedActions).toEqual(request.allowedActions);
    expect(submitted.erc20SpendCap).toEqual(request.erc20SpendCap);
    expect(submitted.agentLabel).toBe(request.agentLabel);
    expect(submitted.justification).toBe(request.justification);
    expect(submitted.signature).toBe(`0x${"11".repeat(65)}`);
  });

  test("hits prepare then submit, in that order", async () => {
    await client.policies.grant(wallet, request, async () => `0x${"11".repeat(65)}`);

    expect(captured.paths).toHaveLength(2);
    expect(captured.paths[0]).toContain("policies:prepare");
    expect(captured.paths[1]).toContain("policies:submit");
  });

  test("a signer that refuses leaves nothing submitted", async () => {
    await expect(
      client.policies.grant(wallet, request, async () => {
        throw new Error("user rejected");
      }),
    ).rejects.toThrow("user rejected");

    // Prepare stores nothing server-side, so an abandoned grant screen must
    // not have reached submit either.
    expect(captured.submitBody).toBeUndefined();
    expect(captured.paths).toHaveLength(1);
  });
});
