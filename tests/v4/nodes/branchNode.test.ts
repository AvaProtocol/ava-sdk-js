/**
 * Port of tests-v3-archive/nodes/branchNode.test.ts.
 *
 * Edge syntax: branch successors are addressed by `<branchId>.<conditionId>`
 * (e.g. `branch1.on`). This survives the v3 → v4 transition because
 * the engine encodes branch gating in the edge's source string.
 *
 * Output shape: branch nodes return `{conditionId: string}` on the
 * matched condition. v3's "no protobuf artifacts" guards are dropped
 * since the v4 transport speaks JSON natively.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getCurrentBlockNumber,
  getSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(60_000);

function branchNode(
  id: string,
  conditions: Array<{ id: string; expression: string; type: "if" | "elseIf" | "else" }>,
) {
  return Nodes.branch({ id, name: id, conditions });
}

describe("BranchNode Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("nodes.run condition evaluation", () => {
    test.each([
      [
        "timestamp comparison",
        "{{ trigger.data.timestamp > 0 }}",
        { trigger: { data: { timestamp: 1748804062960 } } },
      ],
      [
        "string equality",
        '{{ trigger.data.status === "ready" }}',
        { trigger: { data: { status: "ready" } } },
      ],
      [
        "nested property access",
        '{{ trigger.data.user.role === "admin" }}',
        { trigger: { data: { user: { role: "admin" } } } },
      ],
      [
        "complex logical AND",
        '{{ trigger.data.status === "ready" && trigger.data.user.age >= 18 }}',
        { trigger: { data: { status: "ready", user: { age: 21 } } } },
      ],
    ])("evaluates %s and returns conditionId", async (_label, expression, inputs) => {
      const node = branchNode("branch", [
        { id: "condition1", type: "if", expression },
        { id: "condition2", type: "else", expression: "" },
      ]);
      const result = await client.nodes.run({ node, inputVariables: inputs });
      expect(result.success).toBe(true);
      const data = (result.output as { data: Record<string, any> }).data;
      expect(data.conditionId).toEqual(expect.any(String));
    });
  });

  describe("workflows.simulate", () => {
    test("includes the branch step in the simulation output", async () => {
      const wallet = await getSmartWallet(client);
      const node = branchNode("branch", [
        { id: "condition1", type: "if", expression: "{{ trigger.data.user.age >= 18 }}" },
        { id: "condition2", type: "else", expression: "" },
      ]);

      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [node],
        edges: [{ id: "e1", source: "trigger", target: "branch" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(sim.status).toBe("success");
      expect(sim.steps?.find((s) => s.id === "branch")).toBeDefined();
    });
  });

  describe("Branch gating of successors", () => {
    test("simulate: true branch fires NodeA, false branch fires NodeB", async () => {
      const wallet = await getSmartWallet(client);

      const buildSim = async (expr: string) => {
        const branch = branchNode("branch", [
          { id: "on", type: "if", expression: expr },
          { id: "off", type: "else", expression: "" },
        ]);
        const nodeA = Nodes.customCode({ id: "A", name: "A", source: "return {a: 1};" });
        const nodeB = Nodes.customCode({ id: "B", name: "B", source: "return {b: 1};" });
        return client.workflows.simulate({
          trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
          nodes: [branch, nodeA, nodeB],
          edges: [
            { id: "e1", source: "trigger", target: "branch" },
            { id: "e2", source: "branch.on", target: "A" },
            { id: "e3", source: "branch.off", target: "B" },
          ],
          inputVariables: { settings: settingsFor(wallet.address) },
        });
      };

      const truthy = await buildSim("true");
      const truthyIds = truthy.steps!.map((s) => s.id);
      expect(truthyIds).toContain("branch");
      expect(truthyIds).toContain("A");
      expect(truthyIds).not.toContain("B");

      const falsy = await buildSim("false");
      const falsyIds = falsy.steps!.map((s) => s.id);
      expect(falsyIds).toContain("branch");
      expect(falsyIds).toContain("B");
      expect(falsyIds).not.toContain("A");
    });

    test("deployed workflow: true branch fires NodeA, false branch fires NodeB", async () => {
      if (!process.env.CHAIN_ENDPOINT) {
        console.log("Skipping — CHAIN_ENDPOINT not set");
        return;
      }
      const wallet = await getSmartWallet(client);
      const blockNumber = await getCurrentBlockNumber();

      const runCase = async (expr: string, expectFires: "A" | "B") => {
        const branch = branchNode("branch", [
          { id: "on", type: "if", expression: expr },
          { id: "off", type: "else", expression: "" },
        ]);
        const nodeA = Nodes.customCode({ id: "A", name: "A", source: "return {a: 1};" });
        const nodeB = Nodes.customCode({ id: "B", name: "B", source: "return {b: 1};" });

        const wfReq = {
          ...createFromTemplate(wallet.address),
          trigger: Triggers.block({ id: "trigger", name: "blockTrigger", interval: 3 }),
          nodes: [branch, nodeA, nodeB],
          edges: [
            { id: "e1", source: "trigger", target: "branch" },
            { id: "e2", source: "branch.on", target: "A" },
            { id: "e3", source: "branch.off", target: "B" },
          ],
        };
        const created = await client.workflows.create(wfReq);
        const wfId = created.id as string;
        createdWorkflowIds.push(wfId);

        const trig = await client.workflows.trigger(wfId, {
          triggerType: "block",
          triggerOutput: { blockNumber: blockNumber + 3 },
          isBlocking: true,
        });
        const exec = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
        const stepIds = (exec.steps ?? []).map((s) => s.id);
        expect(stepIds).toContain("branch");
        expect(stepIds).toContain(expectFires);
        expect(stepIds).not.toContain(expectFires === "A" ? "B" : "A");
      };

      await runCase("true", "A");
      await runCase("false", "B");
    });
  });
});
