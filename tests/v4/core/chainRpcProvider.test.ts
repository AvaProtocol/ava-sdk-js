/**
 * chainRpcProvider() must refuse an RPC that serves any chain other than
 * Sepolia. The production workflow used to hand Base's and Ethereum's RPCs
 * to suites that seed Sepolia block triggers and poll Sepolia receipts; the
 * only symptoms were block seeds from the wrong chain and receipts that never
 * arrived. A stub JSON-RPC server pins the guard without a live chain.
 */
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";

import {
  TEST_AUTH_CHAIN_ID,
  chainRpcProvider,
  getCurrentBlockNumber,
} from "../../utils/client";

interface RpcCall {
  id: number;
  method: string;
}

/** Minimal JSON-RPC node: answers eth_chainId and eth_blockNumber, single or batched. */
function stubRpc(chainId: number, blockNumber: number): Promise<{ server: Server; url: string }> {
  const answer = ({ id, method }: RpcCall) => {
    if (method === "eth_chainId") return { jsonrpc: "2.0", id, result: `0x${chainId.toString(16)}` };
    if (method === "eth_blockNumber") {
      return { jsonrpc: "2.0", id, result: `0x${blockNumber.toString(16)}` };
    }
    return { jsonrpc: "2.0", id, error: { code: -32601, message: `unsupported ${method}` } };
  };
  const server = createServer((req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const parsed = JSON.parse(body) as RpcCall | RpcCall[];
      const reply = Array.isArray(parsed) ? parsed.map(answer) : answer(parsed);
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify(reply));
    });
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as AddressInfo;
      resolve({ server, url: `http://127.0.0.1:${port}` });
    });
  });
}

describe("chainRpcProvider", () => {
  const originalEndpoint = process.env.CHAIN_ENDPOINT;
  const servers: Server[] = [];

  afterEach(() => {
    if (originalEndpoint === undefined) delete process.env.CHAIN_ENDPOINT;
    else process.env.CHAIN_ENDPOINT = originalEndpoint;
  });

  afterAll(async () => {
    await Promise.all(servers.map((s) => new Promise<void>((done) => s.close(() => done()))));
  });

  test("refuses an endpoint that serves another chain", async () => {
    const { server, url } = await stubRpc(8453, 39_000_000);
    servers.push(server);
    process.env.CHAIN_ENDPOINT = url;

    await expect(chainRpcProvider()).rejects.toThrow(/serves chain 8453.*Sepolia/);
    // Every caller goes through the same guard, so block seeds cannot
    // come from the wrong chain either.
    await expect(getCurrentBlockNumber()).rejects.toThrow(/serves chain 8453/);
  });

  test("accepts a Sepolia endpoint, reads its head and caches the provider", async () => {
    const { server, url } = await stubRpc(TEST_AUTH_CHAIN_ID, 9_900_000);
    servers.push(server);
    process.env.CHAIN_ENDPOINT = url;

    await expect(getCurrentBlockNumber()).resolves.toBe(9_900_000);
    const provider = await chainRpcProvider();
    expect(await chainRpcProvider()).toBe(provider);
    provider.destroy();
  });

  test("fails without CHAIN_ENDPOINT", async () => {
    delete process.env.CHAIN_ENDPOINT;
    await expect(chainRpcProvider()).rejects.toThrow(/CHAIN_ENDPOINT not set/);
  });
});
