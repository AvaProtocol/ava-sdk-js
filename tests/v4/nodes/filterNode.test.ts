/**
 * Port of tests-v3-archive/nodes/filterNode.test.ts.
 *
 * Filter expression syntax — `{{variable}}` for the array reference,
 * bare `value.x` for the iteratee. This survives v4 unchanged.
 *
 * Output shape:
 *   - nodes.run filter: `result.output.data` is the filtered array.
 *   - Workflow execution wraps the same shape under step.output.data.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getCurrentBlockNumber,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(60_000);

const TEST_PEOPLE = [
  { name: "Alice", age: 21 },
  { name: "Bob", age: 17 },
  { name: "Carol", age: 25 },
];

describe("FilterNode Tests", () => {
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
    test("filters adults only (>= 18)", async () => {
      const result = await client.nodes.run({
        node: Nodes.filter({
          id: "f",
          name: "f",
          expression: "value.age >= 18",
          inputVariable: "{{testArray}}",
        }),
        inputVariables: { testArray: TEST_PEOPLE },
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: unknown[] }).data;
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(2);
    });

    test("filters minors only (< 18)", async () => {
      const result = await client.nodes.run({
        node: Nodes.filter({
          id: "f",
          name: "f",
          expression: "value.age < 18",
          inputVariable: "{{testArray}}",
        }),
        inputVariables: { testArray: TEST_PEOPLE },
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: unknown[] }).data;
      expect(data).toHaveLength(1);
    });

    test("filters by string predicate", async () => {
      const result = await client.nodes.run({
        node: Nodes.filter({
          id: "f",
          name: "f",
          expression: 'value.name.startsWith("A")',
          inputVariable: "{{testArray}}",
        }),
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Anna", age: 25 },
          ],
        },
      });
      expect(result.success).toBe(true);
      expect((result.output as { data: unknown[] }).data).toHaveLength(2);
    });

    test("references a sibling input variable inside the predicate", async () => {
      const result = await client.nodes.run({
        node: Nodes.filter({
          id: "f",
          name: "f",
          expression: "value.age >= trigger.data.minAge",
          inputVariable: "{{testArray}}",
        }),
        inputVariables: {
          testArray: TEST_PEOPLE,
          trigger: { data: { minAge: 18 } },
        },
      });
      expect(result.success).toBe(true);
      expect((result.output as { data: unknown[] }).data).toHaveLength(2);
    });
  });

  describe("workflows.simulate", () => {
    test("chains a data-producing customCode node into a filter node", async () => {
      const wallet = await createSmartWallet(client);
      const dataNode = Nodes.customCode({
        id: "data",
        name: "data",
        source: `return ${JSON.stringify(TEST_PEOPLE)};`,
      });
      const filter = Nodes.filter({
        id: "filter",
        name: "filter",
        expression: "value.age >= 18",
        inputVariable: "{{data.data}}",
      });

      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [dataNode, filter],
        edges: [
          { id: "e1", source: "trigger", target: "data" },
          { id: "e2", source: "data", target: "filter" },
        ],
        inputVariables: { settings: settingsFor(wallet.address) },
      });

      expect(sim.status).toBe("success");
      const step = sim.steps?.find((s) => s.id === "filter");
      expect(step?.success).toBe(true);
      const data = (step?.output as { data: unknown[] }).data;
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(2);
    });
  });

  describe("Deploy + trigger", () => {
    test("deploys and triggers a workflow with a filter node", async () => {
      if (!process.env.CHAIN_ENDPOINT) {
        console.log("Skipping — CHAIN_ENDPOINT not set");
        return;
      }
      const wallet = await createSmartWallet(client);
      const blockNumber = await getCurrentBlockNumber();

      const dataNode = Nodes.customCode({
        id: "data",
        name: "data",
        source: `return ${JSON.stringify(TEST_PEOPLE)};`,
      });
      const filter = Nodes.filter({
        id: "filter",
        name: "filter",
        expression: "value.age >= 18",
        inputVariable: "{{data.data}}",
      });

      const wfReq = {
        ...createFromTemplate(wallet.address),
        trigger: Triggers.block({ id: "trigger", name: "blockTrigger", chainId: 11_155_111, interval: 5 }),
        nodes: [dataNode, filter],
        edges: [
          { id: "e1", source: "trigger", target: "data" },
          { id: "e2", source: "data", target: "filter" },
        ],
      };
      const created = await client.workflows.create(wfReq);
      const wfId = created.id as string;
      createdWorkflowIds.push(wfId);

      const trig = await client.workflows.trigger(wfId, {
        triggerType: "block",
        triggerOutput: { blockNumber: blockNumber + 5 },
        isBlocking: true,
      });
      const exec = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
      const step = exec.steps?.find((s) => s.id === "filter");
      expect(step?.success).toBe(true);
      const data = (step?.output as { data: unknown[] }).data;
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(2);
    });
  });
});
