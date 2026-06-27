/**
 * Port of tests-v3-archive/executions/getExecution.test.ts.
 *
 * v3 → v4 API:
 *   - client.getExecution(workflowId, execId) ->
 *     client.executions.retrieve(execId, {workflowId})
 *   - client.getExecutionStatus(workflowId, execId) ->
 *     client.executions.getStatus(execId, {workflowId})
 *
 * Step shape:
 *   - v3 `step.type` was a TriggerType / NodeType enum value;
 *     v4 returns lowercase strings ("block", "cron", "customCode", ...).
 *   - v3 `step.inputsList` -> v4 `step.inputs` (same array, renamed
 *     field).
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

describe("executions.retrieve Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("retrieves an execution after a block-triggered workflow fires", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await createSmartWallet(client);
    const blockNumber = await getCurrentBlockNumber();
    const interval = 5;

    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      maxExecution: 3,
      trigger: Triggers.block({ id: "trigger", name: "blockTrigger", chainId: 11_155_111, interval }),
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const trig = await client.workflows.trigger(wfId, {
      triggerType: "block",
      triggerOutput: { blockNumber: blockNumber + interval },
      isBlocking: true,
    });
    const execution = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
    expect(execution.id).toBe(trig.executionId);
    expect(execution.steps?.length ?? 0).toBeGreaterThanOrEqual(2);

    const triggerStep = execution.steps?.[0];
    expect(triggerStep?.type).toBe("block");
    expect(triggerStep?.name).toBe("blockTrigger");
    expect(triggerStep?.success).toBe(true);

    const nodeStep = execution.steps?.[1];
    expect(nodeStep?.type).toBe("customCode");
    expect(nodeStep?.success).toBe(true);
    // v4 carries the trigger.data reference in step.inputs.
    expect(nodeStep?.inputs).toEqual(expect.arrayContaining(["blockTrigger.data"]));
  });

  test("rejects retrieve for a non-existent workflow with 404", async () => {
    await expect(
      client.executions.retrieve("01ZZZZZZZZZZZZZZZZZZZZZZZZ", {
        workflowId: "01ZZZZZZZZZZZZZZZZZZZZZZZZ",
      }),
    ).rejects.toMatchObject({ status: 404 });
  });

  test("rejects retrieve for a non-existent execution under a valid workflow", async () => {
    const wallet = await createSmartWallet(client);
    const created = await client.workflows.create(createFromTemplate(wallet.address));
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    await expect(
      client.executions.retrieve("01ZZZZZZZZZZZZZZZZZZZZZZZZ", { workflowId: wfId }),
    ).rejects.toMatchObject({ status: 404 });
  });

  test("retrieves an execution after a cron-triggered workflow fires", async () => {
    const wallet = await createSmartWallet(client);
    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      trigger: Triggers.cron({ id: "trigger", name: "cronTrigger", schedule: ["* * * * *"] }),
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const trig = await client.workflows.trigger(wfId, {
      triggerType: "cron",
      triggerOutput: { timestamp: Date.now(), timestampIso: new Date().toISOString() },
      isBlocking: true,
    });
    const execution = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
    expect(execution.id).toBe(trig.executionId);

    const triggerStep = execution.steps?.[0];
    expect(triggerStep?.type).toBe("cron");
    expect(triggerStep?.name).toBe("cronTrigger");

    const nodeStep = execution.steps?.[1];
    expect(nodeStep?.inputs).toEqual(expect.arrayContaining(["cronTrigger.data"]));

    const statusSummary = await client.executions.getStatus(trig.executionId, { workflowId: wfId });
    expect(statusSummary.status).toBeTruthy();
  });

  test("execution id from list matches the id returned by trigger", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await createSmartWallet(client);
    const blockNumber = await getCurrentBlockNumber();

    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      maxExecution: 1,
      trigger: Triggers.block({ id: "trigger", name: "blockGetExecs", chainId: 11_155_111, interval: 5 }),
      nodes: [Nodes.customCode({ id: "step1", name: "step1", source: "return {ok: true};" })],
      edges: [{ id: "e1", source: "trigger", target: "step1" }],
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    await client.workflows.trigger(wfId, {
      triggerType: "block",
      triggerOutput: { blockNumber: blockNumber + 5 },
      isBlocking: true,
    });
    const list = await client.executions.list({ workflowId: [wfId], limit: 1 });
    expect(list.data.length).toBe(1);

    const idFromList = list.data[0].id as string;
    const fetched = await client.executions.retrieve(idFromList, { workflowId: wfId });
    expect(fetched.id).toBe(idFromList);
  });
});
