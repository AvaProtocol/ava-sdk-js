/**
 * Port of tests-v3-archive/executions/partialSuccess.test.ts.
 *
 * The contract under test: any step failure flips the execution
 * status to "failed", even when other steps succeeded. The
 * "partial success" name is a misnomer — v4's engine treats any
 * failed step as a workflow-level failure.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getCurrentBlockNumber,
  createSmartWallet,
  removeCreatedWorkflows,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(60_000);

describe("Execution Status — partial / mixed step outcomes", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("one failing node + one succeeding node = failed execution", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await createSmartWallet(client);
    const blockNumber = await getCurrentBlockNumber();

    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      maxExecution: 1,
      trigger: Triggers.block({ id: "trigger", name: "blockTrigger", interval: 5 }),
      nodes: [
        Nodes.customCode({ id: "good", name: "successfulNode", source: "return {result: 'success'};" }),
        Nodes.customCode({
          id: "bad",
          name: "failingNode",
          source: "throw new Error('Intentional failure for testing');",
        }),
      ],
      edges: [
        { id: "e1", source: "trigger", target: "good" },
        { id: "e2", source: "good", target: "bad" },
      ],
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const trig = await client.workflows.trigger(wfId, {
      triggerType: "block",
      triggerOutput: { blockNumber: blockNumber + 5 },
      isBlocking: true,
    });
    const exec = await client.executions.retrieve(trig.executionId, { workflowId: wfId });

    const good = exec.steps?.find((s) => s.name === "successfulNode");
    const bad = exec.steps?.find((s) => s.name === "failingNode");
    expect(good?.success).toBe(true);
    expect(bad?.success).toBe(false);
    expect(typeof bad?.error).toBe("string");
    expect(exec.status).toBe("failed");
  });

  test("all steps succeed = success execution", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await createSmartWallet(client);
    const blockNumber = await getCurrentBlockNumber();

    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      maxExecution: 1,
      trigger: Triggers.block({ id: "trigger", name: "blockTrigger", interval: 5 }),
      nodes: [
        Nodes.customCode({ id: "step1", name: "step1", source: "return {ok: 1};" }),
        Nodes.customCode({ id: "step2", name: "step2", source: "return {ok: 2};" }),
      ],
      edges: [
        { id: "e1", source: "trigger", target: "step1" },
        { id: "e2", source: "step1", target: "step2" },
      ],
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const trig = await client.workflows.trigger(wfId, {
      triggerType: "block",
      triggerOutput: { blockNumber: blockNumber + 5 },
      isBlocking: true,
    });
    const exec = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
    expect(exec.status).toBe("success");
    expect(exec.steps?.every((s) => s.success)).toBe(true);
  });

  test("all nodes fail = failed execution", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await createSmartWallet(client);
    const blockNumber = await getCurrentBlockNumber();

    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      maxExecution: 1,
      trigger: Triggers.block({ id: "trigger", name: "blockTrigger", interval: 5 }),
      nodes: [
        Nodes.customCode({ id: "step1", name: "step1", source: "throw new Error('boom1');" }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "step1" }],
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const trig = await client.workflows.trigger(wfId, {
      triggerType: "block",
      triggerOutput: { blockNumber: blockNumber + 5 },
      isBlocking: true,
    });
    const exec = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
    expect(exec.status).toBe("failed");
    const step = exec.steps?.find((s) => s.id === "step1");
    expect(step?.success).toBe(false);
  });
});
