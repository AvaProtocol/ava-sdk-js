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

async function startGateway(
  captured: Captured,
  prepared: v4.PreparedPolicy = PREPARED,
): Promise<{ url: string; close: () => Promise<void> }> {
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
        res.end(JSON.stringify(prepared));
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
    expect(submitted.basePolicyId).toBeUndefined();
    expect(submitted.allowContractRecipient).toBeUndefined();
    expect(submitted.dropTaskIds).toBeUndefined();
    expect(submitted.agentLabel).toBe(request.agentLabel);
    expect(submitted.justification).toBe(request.justification);
    expect(submitted.signature).toBe(`0x${"11".repeat(65)}`);
  });

  test("echoes native ETH fields so a native-only grant rebuilds the same calldata", async () => {
    const nativeReq: v4.PreparePolicyRequest = {
      chainId: 11155111,
      agentLabel: "SendETH",
      nativeRecipients: ["0x000000000000000000000000000000000000a11c"],
      nativeSpendCap: { amount: "1" },
      expiresInSeconds: 2_592_000,
    };
    await client.policies.grant(wallet, nativeReq, async () => `0x${"11".repeat(65)}`);
    const submitted = captured.submitBody!;
    expect(submitted.nativeRecipients).toEqual(nativeReq.nativeRecipients);
    expect(submitted.nativeSpendCap).toEqual(nativeReq.nativeSpendCap);
    expect(submitted.allowedActions).toBeUndefined();
  });

  test("echoes the merged grant, not the add fragment", async () => {
    await gateway.close();
    const usdc = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
    const merged = {
      ...PREPARED,
      basePolicyId: "",
      affectedTaskIds: ["swap-1"],
      allowedActions: [{ target: usdc, selectors: ["0xa9059cbb", "0x095ea7b3"] }],
      erc20SpendCap: { token: usdc, amount: "19" },
      erc20SpendCaps: [{ token: usdc, amount: "19" }],
    } satisfies v4.PreparedPolicy;
    captured = { paths: [] };
    gateway = await startGateway(captured, merged);
    client = new Client({ baseUrl: `${gateway.url}/api/v1`, token: "test-jwt" });

    const fragment = {
      allowedActions: [{ target: usdc, selectors: ["0xa9059cbb"] }],
      erc20SpendCaps: [{ token: usdc, amount: "12" }],
    };
    await client.policies.grant(
      wallet,
      { ...request, add: fragment, dropTaskIds: ["swap-1"] },
      async () => `0x${"11".repeat(65)}`,
    );

    const submitted = captured.submitBody!;
    expect(submitted.allowedActions).toEqual(merged.allowedActions);
    expect(submitted.erc20SpendCap).toEqual(merged.erc20SpendCap);
    expect(submitted.erc20SpendCaps).toEqual(merged.erc20SpendCaps);
    expect(submitted.basePolicyId).toBe("");
    expect(submitted.allowContractRecipient).toBeUndefined();
    expect(submitted.dropTaskIds).toEqual(["swap-1"]);
    expect(captured.prepareBody?.add).toEqual(fragment);
    expect(captured.prepareBody?.dropTaskIds).toEqual(["swap-1"]);
  });

  test("submits the ids prepare left out, not an extra id the caller named", async () => {
    await gateway.close();
    const merged = {
      ...PREPARED,
      basePolicyId: "",
      affectedTaskIds: ["swap-1"],
    } satisfies v4.PreparedPolicy;
    captured = { paths: [] };
    gateway = await startGateway(captured, merged);
    client = new Client({ baseUrl: `${gateway.url}/api/v1`, token: "test-jwt" });

    await client.policies.grant(
      wallet,
      { ...request, add: { allowedActions: request.allowedActions }, dropTaskIds: ["swap-1", "missing"] },
      async () => `0x${"11".repeat(65)}`,
    );

    expect(captured.prepareBody?.dropTaskIds).toEqual(["swap-1", "missing"]);
    expect(captured.submitBody?.dropTaskIds).toEqual(["swap-1"]);
  });

  test("keeps dropTaskIds off prepare when add is omitted", async () => {
    await client.policies.grant(
      wallet,
      { ...request, dropTaskIds: ["old"] },
      async () => `0x${"11".repeat(65)}`,
    );

    expect(captured.prepareBody?.dropTaskIds).toBeUndefined();
    expect(captured.submitBody?.dropTaskIds).toEqual(["old"]);
  });

  test("echoes prepare's basePolicyId and contract-recipient flag, not the caller's", async () => {
    await gateway.close();
    const usdc = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
    const merged = {
      ...PREPARED,
      basePolicyId: "01JABCDEF0000000000000000",
      changes: {
        summary: ["Weekly swap: until Dec 28, was Nov 30"],
        basePolicyId: "01JABCDEF0000000000000000",
      },
      allowedActions: [{ target: usdc, selectors: ["0xa9059cbb"] }],
      allowContractRecipient: true,
    } satisfies v4.PreparedPolicy;
    captured = { paths: [] };
    gateway = await startGateway(captured, merged);
    client = new Client({ baseUrl: `${gateway.url}/api/v1`, token: "test-jwt" });

    await client.policies.grant(
      wallet,
      {
        ...request,
        basePolicyId: "01STALE000000000000000000",
        allowContractRecipient: false,
        add: {
          allowedActions: [{ target: usdc, selectors: ["0xa9059cbb"] }],
        },
      },
      async () => `0x${"11".repeat(65)}`,
    );

    const submitted = captured.submitBody!;
    expect(captured.prepareBody?.basePolicyId).toBe("01STALE000000000000000000");
    expect(submitted.basePolicyId).toBe("01JABCDEF0000000000000000");
    expect(submitted.allowedActions).toEqual(merged.allowedActions);
    expect(submitted.allowContractRecipient).toBe(true);
    expect(submitted.erc20SpendCap).toBeUndefined();
  });

  test("echoes a caller-supplied basePolicyId on a full-set grant", async () => {
    const policyId = "01JABCDEF0000000000000000";
    await client.policies.grant(
      wallet,
      { ...request, basePolicyId: policyId },
      async () => `0x${"11".repeat(65)}`,
    );

    expect(captured.prepareBody?.basePolicyId).toBe(policyId);
    expect(captured.submitBody!.basePolicyId).toBe(policyId);
    expect(captured.submitBody!.allowedActions).toEqual(request.allowedActions);

    captured.prepareBody = undefined;
    captured.submitBody = undefined;
    await client.policies.grant(
      wallet,
      { ...request, basePolicyId: "" },
      async () => `0x${"11".repeat(65)}`,
    );
    expect(captured.prepareBody?.basePolicyId).toBe("");
    expect(captured.submitBody!.basePolicyId).toBe("");
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
