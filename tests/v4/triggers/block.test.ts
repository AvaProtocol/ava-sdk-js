/**
 * Port of tests-v3-archive/triggers/block.test.ts (804 lines).
 *
 * v3's TriggerFactory + toRequest() validation tests are dropped —
 * v4 builders return plain JSON and validation now happens server-
 * side (and is currently lenient: zero / negative intervals are
 * accepted as "sample the latest block").
 *
 * API rename:
 *   - client.runTrigger(p) -> client.triggers.run(p)
 *   - client.triggerWorkflow -> client.workflows.trigger(id, body)
 *
 * Block trigger output:
 *   result.output.data = {
 *     blockHash, blockNumber, difficulty, gasLimit, gasUsed,
 *     parentHash, timestamp
 *   }
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

interface BlockTriggerOutput {
  readonly blockHash: string;
  readonly blockNumber: number;
  readonly difficulty?: string;
  readonly gasLimit?: number;
  readonly gasUsed?: number;
  readonly parentHash?: string;
  readonly timestamp?: number;
}

describe("BlockTrigger Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("triggers.run", () => {
    test.each([
      ["small interval", 5],
      ["medium interval", 25],
      ["large interval", 100],
      ["single block", 1],
    ])("returns the latest block for %s", async (_label, interval) => {
      const result = await client.triggers.run({
        trigger: Triggers.block({ id: "t", name: "blockTrigger", chainId: 11_155_111, interval }),
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: BlockTriggerOutput }).data;
      expect(typeof data.blockHash).toBe("string");
      expect(data.blockHash).toMatch(/^0x[a-f0-9]{64}$/);
      expect(typeof data.blockNumber).toBe("number");
      expect(data.blockNumber).toBeGreaterThan(0);
    });
  });

  describe("workflows.simulate", () => {
    test("simulates a workflow with a block trigger", async () => {
      const wallet = await createSmartWallet(client);
      const sim = await client.workflows.simulate({
        trigger: Triggers.block({ id: "trigger", name: "blockTrigger", chainId: 11_155_111, interval: 10 }),
        nodes: [Nodes.customCode({ id: "step1", name: "step1", source: "return {ok: true};" })],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(sim.status).toBe("success");
      const step = sim.steps?.find((s) => s.id === "trigger");
      expect(step?.success).toBe(true);
    });
  });

  describe("deploy + trigger", () => {
    test("deploys, fires block trigger, returns execution with block step", async () => {
      if (!process.env.CHAIN_ENDPOINT) {
        console.log("Skipping — CHAIN_ENDPOINT not set");
        return;
      }
      const wallet = await createSmartWallet(client);
      const blockNumber = await getCurrentBlockNumber();
      const interval = 5;

      const wfReq = {
        ...createFromTemplate(wallet.address),
        trigger: Triggers.block({ id: "trigger", name: "blockTrigger", chainId: 11_155_111, interval }),
      };
      const created = await client.workflows.create(wfReq);
      const wfId = created.id as string;
      createdWorkflowIds.push(wfId);

      const trig = await client.workflows.trigger(wfId, {
        triggerType: "block",
        triggerOutput: { blockNumber: blockNumber + interval },
        isBlocking: true,
      });
      expect(trig.executionId).toBeTruthy();
      const exec = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
      expect(exec.id).toBe(trig.executionId);
      const triggerStep = exec.steps?.find((s) => s.id === "trigger");
      expect(triggerStep?.success).toBe(true);
    });
  });
});
