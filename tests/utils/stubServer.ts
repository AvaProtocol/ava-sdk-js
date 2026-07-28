/**
 * A local stub HTTP server for tests that exercise the gateway's restApi node.
 *
 * Why this exists rather than nock/msw/a patched fetch: the request under test
 * is made by the **gateway process**, not by the test. Client-side HTTP mocking
 * intercepts traffic leaving the test process, and these tests send none to the
 * target — so the only thing that can stand in for a real endpoint is a server
 * the gateway can actually dial.
 *
 * It replaces httpbin.org, which cost the suite two ways: tests skipped or
 * failed whenever httpbin had an outage, and every request paid a real
 * round-trip (~300ms each, vs ~2ms here).
 *
 * Routes mirror the httpbin shapes the tests relied on, so assertions written
 * against httpbin keep working:
 *
 *   GET|POST /anything?a=b   -> { args, url, headers, json? }   (echo)
 *   GET      /get?a=b        -> same
 *   POST     /post           -> same, with the parsed body under `json`
 *   GET      /status/<code>  -> bare response carrying that status
 *
 * Requires a gateway that can reach this process — true for the default local
 * stack. For a containerised gateway, set TEST_STUB_HOST (e.g.
 * host.docker.internal); callers should assert reachability once up front so an
 * unreachable stub does not surface as every assertion failing opaquely.
 */

import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";

import type { Client } from "@avaprotocol/sdk-js";

export interface StubServer {
  /** Base URL the gateway should call, e.g. http://127.0.0.1:53124 */
  readonly baseUrl: string;
  /** Shuts the listener down. Safe to call more than once. */
  close(): Promise<void>;
}

const STATUS_ROUTE = /^\/status\/(\d{3})$/;

/**
 * Starts the stub on an ephemeral port and resolves once it is listening.
 *
 * Binds 0.0.0.0 so a containerised gateway can reach it, and port 0 so
 * concurrent runs cannot collide the way v3's fixed port 19876 could.
 */
export async function startStubServer(): Promise<StubServer> {
  let baseUrl = "";

  const server: Server = createServer((req, res) => {
    const requestUrl = new URL(req.url ?? "/", `http://${req.headers.host ?? "stub"}`);

    const status = STATUS_ROUTE.exec(requestUrl.pathname);
    if (status) {
      // writeHead derives the standard reason phrase, which is what
      // metadata.statusText is asserted against.
      res.writeHead(Number(status[1]));
      res.end();
      return;
    }

    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString();
      const args: Record<string, string> = {};
      requestUrl.searchParams.forEach((value, key) => {
        args[key] = value;
      });

      const payload: Record<string, unknown> = {
        args,
        url: `${baseUrl}${req.url ?? "/"}`,
        headers: req.headers,
      };
      if (raw) {
        try {
          payload.json = JSON.parse(raw);
        } catch {
          // Non-JSON bodies land under `data`, matching httpbin.
          payload.data = raw;
        }
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(payload));
    });
  });

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "0.0.0.0", () => resolve());
  });

  const { port } = server.address() as AddressInfo;
  baseUrl = `http://${process.env.TEST_STUB_HOST ?? "127.0.0.1"}:${port}`;

  let closed = false;
  return {
    baseUrl,
    close: async () => {
      if (closed) return;
      closed = true;
      await new Promise<void>((resolve) => server.close(() => resolve()));
    },
  };
}

/**
 * The message to throw when the gateway cannot reach the stub. Kept here so
 * every suite that uses the stub gives the same actionable guidance.
 */
export function stubUnreachableMessage(baseUrl: string, cause: string | undefined): string {
  return (
    `The gateway at ${process.env.AVS_REST_URL ?? "the configured URL"} cannot reach this test's ` +
    `stub server at ${baseUrl}: ${cause ?? "unknown error"}. These tests need a gateway that can ` +
    `dial this process. Point AVS_REST_URL at a local gateway, or set TEST_STUB_HOST ` +
    `(e.g. host.docker.internal) if the gateway runs in a container.`
  );
}

/** The `node` argument shape `client.nodes.run` accepts, derived so it stays in sync. */
type RunnableNode = Parameters<Client["nodes"]["run"]>[0]["node"];

/**
 * Starts the stub and proves the gateway can actually reach it, throwing once
 * with guidance if it cannot.
 *
 * The probe is worth its ~100ms: without it an unreachable stub surfaces as
 * every assertion in the suite failing on a connection error, which reads like
 * a product bug rather than a setup problem.
 */
export async function startStubServerFor(
  client: Client,
  restApiNode: (url: string) => RunnableNode,
): Promise<StubServer> {
  const stub = await startStubServer();
  const probe = await client.nodes.run({
    node: restApiNode(`${stub.baseUrl}/get?probe=1`),
    inputVariables: {},
  });
  if (!probe.success) {
    await stub.close();
    throw new Error(stubUnreachableMessage(stub.baseUrl, probe.error));
  }
  return stub;
}
