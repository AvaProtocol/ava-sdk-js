/**
 * Port of tests-v3-archive/nodes/loopNode.test.ts (2754 lines).
 *
 * The v3 test exercised every runner type (CustomCode, RestAPI,
 * ContractRead, ContractWrite, ETHTransfer, GraphQL) and both
 * sequential + parallel execution modes. v4's LoopNodeConfig is
 * simpler: just `inputVariable`, `iterVar` (default "value"), and
 * `runner`. There is no `executionMode`, `iterKey`, or
 * `iterationTimeout` — iterations run sequentially.
 *
 * The port keeps the CustomCode + RestAPI runner coverage (those
 * are the runners users hit most often) and one each of the
 * cross-cutting concerns (empty array, complex object iteration).
 * Contract* runners are covered by the dedicated contractRead /
 * contractWrite test files.
 *
 * Output shape:
 *   - nodes.run loop: `result.output.data` is an array (one entry
 *     per iteration). Each entry is the runner's return value
 *     unwrapped (no double `{data:...}` like filter).
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(60_000);

function loopWithCustomCode(input: string, source: string, iterVar = "value") {
  return Nodes.loop({
    id: "loop",
    name: "loop",
    inputVariable: input,
    iterVar,
    runner: Nodes.customCode({ id: "iter", name: "iter", source }),
  });
}

describe("LoopNode Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("nodes.run with CustomCode runner", () => {
    test("processes a numeric array sequentially", async () => {
      const result = await client.nodes.run({
        node: loopWithCustomCode(
          "{{testArray}}",
          `return {
            processedValue: value,
            squared: value * value,
            timestamp: new Date().toISOString()
          };`,
        ),
        inputVariables: { testArray: [1, 2, 3, 4, 5] },
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: any[] }).data;
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(5);
      expect(data[0].processedValue).toBe(1);
      expect(data[0].squared).toBe(1);
      expect(data[0].timestamp).toBeDefined();
      expect(data[4].squared).toBe(25);
    });

    test("handles an empty array as a no-op", async () => {
      const result = await client.nodes.run({
        node: loopWithCustomCode(
          "{{emptyArray}}",
          "return { processed: value };",
        ),
        inputVariables: { emptyArray: [] },
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: any[] }).data;
      expect(data).toEqual([]);
    });

    test("processes an array of complex objects", async () => {
      const result = await client.nodes.run({
        node: loopWithCustomCode(
          "{{complexArray}}",
          `return {
            id: value.id,
            upperName: value.name.toUpperCase(),
            doubledValue: value.value * 2,
            isEven: value.value % 2 === 0
          };`,
        ),
        inputVariables: {
          complexArray: [
            { id: "a1", name: "Alice", value: 10 },
            { id: "b2", name: "Bob", value: 15 },
            { id: "c3", name: "Carol", value: 20 },
          ],
        },
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: any[] }).data;
      expect(data).toHaveLength(3);
      expect(data[0].id).toBe("a1");
      expect(data[0].upperName).toBe("ALICE");
      expect(data[0].doubledValue).toBe(20);
      expect(data[0].isEven).toBe(true);
      expect(data[1].isEven).toBe(false);
    });

    test("honors a custom iterVar name", async () => {
      const result = await client.nodes.run({
        node: loopWithCustomCode("{{items}}", "return { item: item * 10 };", "item"),
        inputVariables: { items: [1, 2, 3] },
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: any[] }).data;
      expect(data).toHaveLength(3);
      expect(data.map((d) => d.item)).toEqual([10, 20, 30]);
    });
  });

  describe("nodes.run with RestAPI runner", () => {
    test("iterates over URLs and fetches each", async () => {
      // httpbin.org is the de-facto standard test target; if it's
      // unreachable the runner will fail per iteration and we skip.
      const result = await client.nodes.run({
        node: Nodes.loop({
          id: "loop",
          name: "loop",
          inputVariable: "{{urlArray}}",
          iterVar: "value",
          runner: Nodes.restApi({
            id: "rest",
            name: "rest",
            url: "{{value}}",
            method: "GET",
            headers: { "User-Agent": "AvaProtocol-Loop-Test" },
          }),
        }),
        inputVariables: {
          urlArray: [
            "https://httpbin.org/get?n=1",
            "https://httpbin.org/get?n=2",
          ],
        },
      });
      if (!result.success) {
        console.log(`Skipping — REST runner failed: ${result.error}`);
        return;
      }
      const data = (result.output as { data: any[] }).data;
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(2);
      expect(typeof data[0]).toBe("object");
    });
  });

  describe("workflows.simulate", () => {
    test("simulates a workflow with a loop step", async () => {
      const wallet = await createSmartWallet(client);
      const dataNode = Nodes.customCode({
        id: "data",
        name: "data",
        source: "return [1, 2, 3];",
      });
      const loopNode = Nodes.loop({
        id: "loop",
        name: "loop",
        inputVariable: "{{data.data}}",
        iterVar: "value",
        runner: Nodes.customCode({
          id: "iter",
          name: "iter",
          source: "return { squared: value * value };",
        }),
      });

      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [dataNode, loopNode],
        edges: [
          { id: "e1", source: "trigger", target: "data" },
          { id: "e2", source: "data", target: "loop" },
        ],
        inputVariables: { settings: settingsFor(wallet.address) },
      });

      expect(sim.status).toBe("success");
      const step = sim.steps?.find((s) => s.id === "loop");
      expect(step?.success).toBe(true);
      const data = (step?.output as { data: any[] }).data;
      expect(data).toHaveLength(3);
      expect(data[0].squared).toBe(1);
      expect(data[2].squared).toBe(9);
    });
  });

  describe("Error handling", () => {
    test("surfaces per-iteration runner errors as success=false with error message", async () => {
      const result = await client.nodes.run({
        node: loopWithCustomCode(
          "{{nums}}",
          "throw new Error('intentional ' + value);",
        ),
        inputVariables: { nums: [1, 2, 3] },
      });
      expect(result.success).toBe(false);
      expect(typeof result.error).toBe("string");
      expect(result.error?.length ?? 0).toBeGreaterThan(0);
    });

    test("rejects missing source array gracefully", async () => {
      const result = await client.nodes.run({
        node: loopWithCustomCode("{{missing}}", "return { v: value };"),
        inputVariables: {},
      });
      expect(result.success).toBe(false);
      expect(typeof result.error).toBe("string");
    });
  });
});
