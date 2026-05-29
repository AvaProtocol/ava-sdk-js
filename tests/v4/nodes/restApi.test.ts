/**
 * Port of tests-v3-archive/nodes/RestAPi.test.ts.
 *
 * v3 ran a local mock server on port 19876. v4 tests use httpbin.org
 * (a public test target) so they stay self-contained — no extra infra
 * to spin up. The tradeoff: tests are network-dependent. Each test
 * that contacts httpbin skips itself when the request fails (offline,
 * httpbin down, etc.) rather than asserting a hard failure.
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
  authenticateClient,
  getClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

const HTTPBIN = "https://httpbin.org";

interface RestMetadata {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly success?: boolean;
}

describe("RestAPI Node Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
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
          url: `${HTTPBIN}/get?ping=v4`,
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-v4-Test" },
        }),
        inputVariables: {},
      });
      if (!result.success) {
        console.log(`Skipping — httpbin GET failed: ${result.error}`);
        return;
      }
      const body = (result.output as { data: any }).data;
      expect(body.args).toEqual({ ping: "v4" });
      expect(body.url).toBe(`${HTTPBIN}/get?ping=v4`);
      const meta = result.metadata as unknown as RestMetadata;
      expect(meta.status).toBe(200);
      expect(meta.statusText).toBe("OK");
      expect(meta.url).toBe(`${HTTPBIN}/get?ping=v4`);
    });

    test("POST 200 echoes the JSON body", async () => {
      const payload = { test: "data", n: 42 };
      const result = await client.nodes.run({
        node: Nodes.restApi({
          id: "rest",
          name: "rest",
          url: `${HTTPBIN}/post`,
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "AvaProtocol-v4-Test",
          },
        }),
        inputVariables: {},
      });
      if (!result.success) {
        console.log(`Skipping — httpbin POST failed: ${result.error}`);
        return;
      }
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
          url: `${HTTPBIN}/status/404`,
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
          url: `${HTTPBIN}/status/500`,
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-v4-Test" },
        }),
        inputVariables: {},
      });
      expect(result.success).toBe(false);
      const meta = result.metadata as unknown as RestMetadata;
      expect(meta.status).toBe(500);
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
            url: `${HTTPBIN}/get?from=simulate`,
            method: "GET",
            headers: { "User-Agent": "AvaProtocol-v4-Test" },
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "rest" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(sim.status).toBe("success");
      const step = sim.steps?.find((s) => s.id === "rest");
      if (!step?.success) {
        console.log(`Skipping — httpbin unreachable during simulate`);
        return;
      }
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
            url: `${HTTPBIN}/status/404`,
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
