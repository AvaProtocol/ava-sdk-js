/**
 * Port of tests-v3-archive/nodes/RestAPi.test.ts.
 *
 * These tests exercise the gateway's restApi node, and the request is made by
 * the **gateway process**, not by this test. That rules out the usual JS
 * mocking tools — nock, msw, a patched global fetch — because they intercept
 * traffic leaving the test process, and this test sends no HTTP to the target
 * at all. The only thing that can stand in for a real endpoint is a server the
 * gateway can actually dial.
 *
 * So: a stub HTTP server on an ephemeral port, started here and torn down
 * after. v3 did the same thing on a fixed port 19876; v4 briefly switched to
 * httpbin.org to avoid the infra, which traded a few lines of setup for a
 * network dependency that then skipped or failed tests whenever httpbin was
 * having a bad day. The setup is cheaper than the flake.
 *
 * Nothing here skips. Status-code *semantics* (which codes mean success, what
 * lands in metadata) are gateway behaviour and are covered hermetically in
 * EigenLayer-AVS `core/taskengine/vm_runner_rest_test.go` via httptest. What
 * these tests own is the shape the SDK exposes to callers.
 *
 * Requires a gateway that can reach this process. That holds for the default
 * local stack; for a containerised gateway set TEST_STUB_HOST (e.g.
 * host.docker.internal). The precondition in beforeAll fails loudly with that
 * guidance rather than letting every assertion fail for an unclear reason.
 *
 * v4 response shape (single call):
 *   output.data          — parsed response body
 *   metadata.status      — HTTP status
 *   metadata.statusText  — HTTP status text
 *   metadata.headers     — response headers
 *   metadata.url         — final request URL
 *   metadata.success     — !4xx/5xx
 *
 * v3 stuffed everything under `response.metadata.*` AND echoed parts
 * under `response.data.*`. v4 is cleaner: data is the body only,
 * everything else is metadata.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  getSuiteClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";
import {
  describeIfGatewayCanReachStub,
  startStubServerFor,
  type StubServer,
} from "../../utils/stubServer";

jest.setTimeout(60_000);

interface RestMetadata {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly success?: boolean;
}

/** Base URL of the stub, assigned once it is listening. */
let STUB = "";
let stub: StubServer;

describeIfGatewayCanReachStub("RestAPI Node Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    ({ client } = await getSuiteClient());

    // Same helper the other stub-backed suites use: it starts the server, proves
    // the gateway can reach it, and closes the listener before throwing if it
    // cannot — an inline probe that threw first would leak the handle and leave
    // Jest reporting an open handle instead of the reachability error.
    stub = await startStubServerFor(client, (url) =>
      Nodes.restApi({ id: "probe", name: "probe", url, method: "GET" }),
    );
    STUB = stub.baseUrl;
  });

  afterAll(async () => {
    await stub?.close();
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("nodes.run", () => {
    test("GET 200 returns parsed body + status metadata", async () => {
      const result = await client.nodes.run({
        node: Nodes.restApi({
          id: "rest",
          name: "rest",
          url: `${STUB}/get?ping=v4`,
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-v4-Test" },
        }),
        inputVariables: {},
      });
      expect(result.success).toBe(true);
      const body = (result.output as { data: any }).data;
      expect(body.args).toEqual({ ping: "v4" });
      expect(body.url).toBe(`${STUB}/get?ping=v4`);
      const meta = result.metadata as unknown as RestMetadata;
      expect(meta.status).toBe(200);
      expect(meta.statusText).toBe("OK");
      expect(meta.url).toBe(`${STUB}/get?ping=v4`);
    });

    test("POST 200 echoes the JSON body", async () => {
      const payload = { test: "data", n: 42 };
      const result = await client.nodes.run({
        node: Nodes.restApi({
          id: "rest",
          name: "rest",
          url: `${STUB}/post`,
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "AvaProtocol-v4-Test",
          },
        }),
        inputVariables: {},
      });
      expect(result.success).toBe(true);
      const body = (result.output as { data: any }).data;
      expect(body.json).toEqual(payload);
      const meta = result.metadata as unknown as RestMetadata;
      expect(meta.status).toBe(200);
    });

    test("404 status surfaces as success=false with the status in metadata", async () => {
      const result = await client.nodes.run({
        node: Nodes.restApi({
          id: "rest",
          name: "rest",
          url: `${STUB}/status/404`,
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-v4-Test" },
        }),
        inputVariables: {},
      });
      // v4 categorizes 4xx/5xx as failure at the node level, but
      // still surfaces the response in metadata for diagnostics.
      expect(result.success).toBe(false);
      const meta = result.metadata as unknown as RestMetadata;
      expect(meta.status).toBe(404);
      expect(meta.statusText).toBe("Not Found");
      expect(typeof result.error).toBe("string");
    });

    test("5xx status surfaces as success=false", async () => {
      const result = await client.nodes.run({
        node: Nodes.restApi({
          id: "rest",
          name: "rest",
          url: `${STUB}/status/500`,
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-v4-Test" },
        }),
        inputVariables: {},
      });
      expect(result.success).toBe(false);
      const meta = result.metadata as unknown as RestMetadata;
      // Exact, not a range: the stub returns precisely what was asked for, so
      // there is no outage substituting a different 5xx.
      expect(meta.status).toBe(500);
      expect(meta.statusText).toBe("Internal Server Error");
    });
  });

  describe("workflows.simulate", () => {
    test("simulates a workflow with a successful REST call", async () => {
      const wallet = await createSmartWallet(client);
      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [
          Nodes.restApi({
            id: "rest",
            name: "rest",
            url: `${STUB}/get?from=simulate`,
            method: "GET",
            headers: { "User-Agent": "AvaProtocol-v4-Test" },
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "rest" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      const step = sim.steps?.find((s) => s.id === "rest");
      expect(step?.success).toBe(true);
      expect(sim.status).toBe("success");
      // Inside a workflow execution, REST step output is doubly
      // nested: `step.output.data.data` is the response body and
      // `step.output.data.{status, headers, url}` carries metadata
      // (the standalone metadata field present on nodes.run is
      // folded back into output.data here).
      const inner = (step?.output as { data: { data: any; status: number; url: string } }).data;
      expect(inner.data.args).toEqual({ from: "simulate" });
      expect(inner.status).toBe(200);
      expect(inner.url).toContain("from=simulate");
    });

    test("simulates a workflow whose REST step 404s", async () => {
      const wallet = await createSmartWallet(client);
      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [
          Nodes.restApi({
            id: "rest",
            name: "rest",
            url: `${STUB}/status/404`,
            method: "GET",
            headers: { "User-Agent": "AvaProtocol-v4-Test" },
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "rest" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      // The workflow may report success at the workflow level even
      // when a step fails — assertions focus on the step.
      const step = sim.steps?.find((s) => s.id === "rest");
      expect(step).toBeDefined();
      expect(step?.success).toBe(false);
    });
  });
});
