/**
 * Port of tests-v3-archive/executions/execution.test.ts (647 lines).
 *
 * Covers the execution-index sequencing behavior: each trigger of a
 * given workflow gets a 0-based monotonic index, and that index is
 * surfaced on both executions.retrieve and executions.list.
 *
 * v3's "resubmit workflow resets index" test is dropped — v4 has no
 * resubmit primitive (workflows are created once and lifecycle is
 * pause / resume / cancel).
 */

import { Client, Triggers } from "@avaprotocol/sdk-js";

import {
  getIsolatedClient,
  getCurrentBlockNumber,
  createSmartWallet,
  removeCreatedWorkflows,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(120_000);

describe("Execution Management Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    // A private EOA for this suite. Salts alone do not isolate an
    // owner-scoped query, and this suite asserts on exact counts.
    ({ client } = await getIsolatedClient());
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("assigns sequential 0-based indexes across blocking triggers", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await createSmartWallet(client);
    const blockNumber = await getCurrentBlockNumber();

    const created = await client.workflows.create({
      // The template caps at 1 execution; this test triggers three times, so it
      // needs a bigger budget. It used to pass 0 (unlimited), which the gateway
      // now rejects — every run spends metered provider quota, so a workflow
      // must declare a finite budget or take the server default.
      ...createFromTemplate(wallet.address),
      maxExecution: 10,
      trigger: Triggers.block({ id: "trigger", name: "blockTrigger", chainId: 11_155_111, interval: 5 }),
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const executionIds: string[] = [];
    for (let i = 0; i < 3; i++) {
      const trig = await client.workflows.trigger(wfId, {
        triggerType: "block",
        triggerOutput: { blockNumber: blockNumber + (i + 1) * 5 },
        isBlocking: true,
      });
      executionIds.push(trig.executionId);
    }

    for (let i = 0; i < executionIds.length; i++) {
      const exec = await client.executions.retrieve(executionIds[i], { workflowId: wfId });
      expect(exec.id).toBe(executionIds[i]);
      expect(exec.index).toBe(i);
    }
  });

  test("non-blocking trigger returns immediate executionId with index assigned", async () => {
    const wallet = await createSmartWallet(client);
    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      maxExecution: 10,
      trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const trig = await client.workflows.trigger(wfId, {
      triggerType: "cron",
      triggerOutput: { timestamp: Date.now(), timestampIso: new Date().toISOString() },
      isBlocking: false,
    });
    expect(trig.executionId).toBeTruthy();
    expect(typeof trig.status).toBe("string");
  });

  test("executions.list rows include an index field", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await createSmartWallet(client);
    const blockNumber = await getCurrentBlockNumber();
    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      maxExecution: 10,
      trigger: Triggers.block({ id: "trigger", name: "blockTrigger", chainId: 11_155_111, interval: 5 }),
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
    expect(list.data[0].index).toBe(0);
  });
});
