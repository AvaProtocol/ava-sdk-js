/**
 * Port of tests-v3-archive/executions/simulateWorkflow.test.ts.
 *
 * v3 client.simulateWorkflow(req) -> v4 client.workflows.simulate(req).
 *
 * Step shape changes:
 *   - v3 step.type used enum values; v4 returns lowercase strings.
 *   - v3 ExecutionStatus.Success -> v4 "success".
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

describe("workflows.simulate Tests", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  describe("Manual trigger + customCode", () => {
    test("simulates the workflow and returns trigger + node steps", async () => {
      const wallet = await createSmartWallet(client);
      const result = await client.workflows.simulate({
        trigger: Triggers.manual({
          id: "trigger",
          name: "manualTrigger",
          lang: "json",
          data: {},
        }),
        nodes: [
          Nodes.customCode({
            id: "step1",
            name: "customCode",
            source: "return {message: 'ok', timestamp: Date.now()};",
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });

      expect(result.status).toBe("success");
      expect(result.steps).toHaveLength(2);

      const triggerStep = result.steps?.[0];
      expect(triggerStep?.id).toBe("trigger");
      expect(triggerStep?.type).toBe("manual");
      expect(triggerStep?.name).toBe("manualTrigger");

      const nodeStep = result.steps?.[1];
      expect(nodeStep?.id).toBe("step1");
      expect(nodeStep?.type).toBe("customCode");
      expect(nodeStep?.success).toBe(true);
    });

    test("forwards input variables to the runner", async () => {
      const wallet = await createSmartWallet(client);
      const result = await client.workflows.simulate({
        trigger: Triggers.manual({
          id: "trigger",
          name: "manualTrigger",
          lang: "json",
          data: {},
        }),
        nodes: [
          Nodes.customCode({
            id: "step1",
            name: "customCode",
            source: "return { greeting: 'hi ' + name, doubled: value * 2 };",
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: {
          name: "World",
          value: 42,
          settings: settingsFor(wallet.address),
        },
      });
      expect(result.status).toBe("success");
      const out = (result.steps?.[1]?.output as { data: any }).data;
      expect(out).toEqual({ greeting: "hi World", doubled: 84 });
    });
  });

  describe("Fixed-time trigger + REST API", () => {
    test("simulates a workflow that calls a REST endpoint", async () => {
      const wallet = await createSmartWallet(client);
      const result = await client.workflows.simulate({
        trigger: Triggers.fixedTime({
          id: "trigger",
          name: "fixedTimeTrigger",
          epochsMs: [Date.now() + 60_000],
        }),
        nodes: [
          Nodes.restApi({
            id: "rest",
            name: "rest",
            url: "https://httpbin.org/get?from=sim",
            method: "GET",
            headers: { "User-Agent": "AvaProtocol-v4-Test" },
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "rest" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      const step = result.steps?.find((s) => s.id === "rest");
      if (!step?.success) {
        console.log("Skipping — httpbin unreachable");
        return;
      }
      const inner = (step.output as { data: { data: any; status: number } }).data;
      expect(inner.status).toBe(200);
      expect(inner.data.args).toEqual({ from: "sim" });
    });
  });

  describe("Multi-node workflow", () => {
    test("simulates a workflow with chained customCode + branch + customCode", async () => {
      const wallet = await createSmartWallet(client);
      const result = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [
          Nodes.customCode({
            id: "data",
            name: "data",
            source: "return { age: 21 };",
          }),
          Nodes.branch({
            id: "branch",
            name: "branch",
            conditions: [
              { id: "adult", type: "if", expression: "{{ data.data.age >= 18 }}" },
              { id: "minor", type: "else", expression: "" },
            ],
          }),
          Nodes.customCode({
            id: "yes",
            name: "yes",
            source: "return { tag: 'adult' };",
          }),
          Nodes.customCode({
            id: "no",
            name: "no",
            source: "return { tag: 'minor' };",
          }),
        ],
        edges: [
          { id: "e1", source: "trigger", target: "data" },
          { id: "e2", source: "data", target: "branch" },
          { id: "e3", source: "branch.adult", target: "yes" },
          { id: "e4", source: "branch.minor", target: "no" },
        ],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(result.status).toBe("success");
      const stepIds = (result.steps ?? []).map((s) => s.id);
      expect(stepIds).toContain("yes");
      expect(stepIds).not.toContain("no");
    });
  });

  describe("Error handling", () => {
    test("step that throws surfaces success=false on that step", async () => {
      const wallet = await createSmartWallet(client);
      const result = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [
          Nodes.customCode({
            id: "step1",
            name: "step1",
            source: "throw new Error('boom');",
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      const step = result.steps?.find((s) => s.id === "step1");
      expect(step?.success).toBe(false);
      expect(typeof step?.error).toBe("string");
    });
  });

  describe("Data field access between nodes", () => {
    test("a downstream node can read a predecessor node's data", async () => {
      const wallet = await createSmartWallet(client);
      const result = await client.workflows.simulate({
        trigger: Triggers.manual({
          id: "trigger",
          name: "manualGo",
          lang: "json",
          data: { upstream: "from-trigger" },
        }),
        nodes: [
          Nodes.customCode({
            id: "producer",
            name: "producer",
            source: "return { greeting: 'from producer', triggerEcho: manualGo.data.upstream };",
          }),
          Nodes.customCode({
            id: "consumer",
            name: "consumer",
            source: "return { sawProducer: producer.data.greeting, sawEcho: producer.data.triggerEcho };",
          }),
        ],
        edges: [
          { id: "e1", source: "trigger", target: "producer" },
          { id: "e2", source: "producer", target: "consumer" },
        ],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(result.status).toBe("success");
      const consumer = result.steps?.find((s) => s.id === "consumer");
      const out = (consumer?.output as { data: any }).data;
      expect(out.sawProducer).toBe("from producer");
      expect(out.sawEcho).toBe("from-trigger");
    });
  });
});
