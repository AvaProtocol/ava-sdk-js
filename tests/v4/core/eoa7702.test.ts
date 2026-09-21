/**
 * `client.wallets.delegate()` against a stand-in gateway.
 *
 * Protects the echo: submit must send prepare's chainId + nonce + the
 * signature the caller produced. Recomputing nonce (the `nonce+1`
 * self-sponsored type-4 habit) is DELEGATION_STALE_NONCE on a live
 * gateway and still spends controller gas if it were broadcast.
 *
 * 202 pending must poll GET until `delegated`. GET never returns
 * `pending` — `missing` means not visible yet.
 */

import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";

import { Wallet } from "ethers";

import {
  authorizationDigest,
  Client,
  SMA7702_DELEGATE,
  SMA7702_IMPL_HASH,
  signEoa7702Authorization,
} from "@avaprotocol/sdk-js";
import type { v4 } from "@avaprotocol/types";

interface Captured {
  prepareBody?: Record<string, unknown>;
  submitBody?: Record<string, unknown>;
  getCount: number;
  paths: string[];
}

const PREPARED: v4.PreparedDelegation = {
  chainId: 11155111,
  delegate: SMA7702_DELEGATE,
  nonce: 7,
  digest: authorizationDigest({
    chainId: 11155111,
    delegate: SMA7702_DELEGATE,
    nonce: 7,
  }),
};

async function startGateway(
  captured: Captured,
  opts: {
    submitStatus?: "delegated" | "pending";
    prepare?: v4.PreparedDelegation;
  } = {},
): Promise<{ url: string; close: () => Promise<void> }> {
  const submitStatus = opts.submitStatus ?? "delegated";
  const prepare = opts.prepare ?? PREPARED;
  const server: Server = createServer((req, res) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      const path = req.url ?? "";
      captured.paths.push(`${req.method} ${path}`);
      const body = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
      res.setHeader("content-type", "application/json");

      if (path.includes("delegation:prepare")) {
        captured.prepareBody = body;
        res.statusCode = 200;
        res.end(JSON.stringify(prepare));
        return;
      }
      if (path.includes("delegation:submit")) {
        captured.submitBody = body;
        res.statusCode = submitStatus === "pending" ? 202 : 200;
        res.end(
          JSON.stringify({
            status: submitStatus,
            chainId: prepare.chainId,
            ...(submitStatus === "delegated"
              ? { delegate: SMA7702_DELEGATE, codeHash: SMA7702_IMPL_HASH }
              : {}),
          }),
        );
        return;
      }
      if (path.includes("/delegation") && req.method === "GET") {
        captured.getCount += 1;
        res.statusCode = 200;
        // Real GET is missing | delegated, never pending.
        const delegated = captured.getCount >= 2;
        res.end(
          JSON.stringify(
            delegated
              ? {
                  status: "delegated",
                  chainId: prepare.chainId,
                  delegate: SMA7702_DELEGATE,
                  codeHash: SMA7702_IMPL_HASH,
                }
              : { status: "missing", chainId: prepare.chainId },
          ),
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

describe("signEoa7702Authorization", () => {
  const key = Wallet.createRandom().privateKey;

  test("refuses a non-canonical delegate", () => {
    expect(() =>
      signEoa7702Authorization(key, {
        chainId: 11155111,
        delegate: "0x000000000000000000000000000000000000dEaD",
        nonce: 0,
        digest: `0x${"ab".repeat(32)}`,
      }),
    ).toThrow(/canonical SMA-7702/);
  });

  test("refuses a digest that is not SetCodeAuthorization.SigHash", () => {
    expect(() =>
      signEoa7702Authorization(key, {
        ...PREPARED,
        digest: `0x${"cd".repeat(32)}`,
      }),
    ).toThrow(/does not match SetCodeAuthorization.SigHash/);
  });

  test("signs a canonical prepare", () => {
    const sig = signEoa7702Authorization(key, PREPARED);
    expect(sig).toMatch(/^0x[0-9a-fA-F]{130}$/);
  });
});

describe("wallets.delegate", () => {
  const eoa = "0x400ffAc94d8A10364bcF167B2F972875D254958d";
  let gateway: { url: string; close: () => Promise<void> };
  let captured: Captured;
  let client: Client;

  afterEach(async () => {
    await gateway.close();
  });

  test("echoes prepare chainId and nonce to submit, never nonce+1", async () => {
    captured = { getCount: 0, paths: [] };
    gateway = await startGateway(captured);
    client = new Client({ baseUrl: `${gateway.url}/api/v1`, token: "test-jwt" });

    let signed: v4.PreparedDelegation | undefined;
    const status = await client.wallets.delegate(eoa, { chainId: 11155111 }, async (prepared) => {
      signed = prepared;
      return `0x${"22".repeat(65)}`;
    });

    expect(signed).toEqual(PREPARED);
    expect(captured.prepareBody).toEqual({ chainId: 11155111 });
    expect(captured.submitBody).toEqual({
      chainId: PREPARED.chainId,
      nonce: PREPARED.nonce,
      signature: `0x${"22".repeat(65)}`,
    });
    expect(status.status).toBe("delegated");
    expect(captured.paths.filter((p) => p.includes("delegation:submit"))).toHaveLength(1);
  });

  test("polls GET on 202 until delegated; missing is not terminal", async () => {
    captured = { getCount: 0, paths: [] };
    gateway = await startGateway(captured, { submitStatus: "pending" });
    client = new Client({ baseUrl: `${gateway.url}/api/v1`, token: "test-jwt" });

    const status = await client.wallets.delegate(
      eoa,
      { chainId: 11155111 },
      async () => `0x${"22".repeat(65)}`,
      { intervalMs: 10, timeoutMs: 1_000 },
    );

    expect(status.status).toBe("delegated");
    expect(captured.paths.filter((p) => p.includes("delegation:submit"))).toHaveLength(1);
    expect(captured.getCount).toBeGreaterThanOrEqual(2);
  });

  test("refuses prepare that names a foreign delegate", async () => {
    captured = { getCount: 0, paths: [] };
    gateway = await startGateway(captured, {
      prepare: {
        chainId: 11155111,
        delegate: "0x000000000000000000000000000000000000dEaD",
        nonce: 7,
        digest: `0x${"ab".repeat(32)}`,
      },
    });
    client = new Client({ baseUrl: `${gateway.url}/api/v1`, token: "test-jwt" });
    await expect(
      client.wallets.prepareDelegation(eoa, { chainId: 11155111 }),
    ).rejects.toThrow(/canonical SMA-7702/);
  });

  test("refuses chainId 0 before any request", async () => {
    captured = { getCount: 0, paths: [] };
    gateway = await startGateway(captured);
    client = new Client({ baseUrl: `${gateway.url}/api/v1`, token: "test-jwt" });
    await expect(
      client.wallets.prepareDelegation(eoa, { chainId: 0 }),
    ).rejects.toThrow(/chainId=0 is refused/);
    expect(captured.paths).toHaveLength(0);
  });

  test("a signer that refuses never submits", async () => {
    captured = { getCount: 0, paths: [] };
    gateway = await startGateway(captured);
    client = new Client({ baseUrl: `${gateway.url}/api/v1`, token: "test-jwt" });

    await expect(
      client.wallets.delegate(eoa, { chainId: 11155111 }, async () => {
        throw new Error("user rejected");
      }),
    ).rejects.toThrow("user rejected");
    expect(captured.submitBody).toBeUndefined();
  });
});
