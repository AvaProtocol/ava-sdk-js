/**
 * Port of tests-v3-archive/executions/getExecutions.test.ts.
 *
 * v3 → v4 API:
 *   - client.getExecutions([workflowIds], opts) ->
 *     client.executions.list({workflowId: [...], ...opts})
 *   - client.getExecutionCount({workflowIds: [...]}) ->
 *     client.executions.count({workflowId: [...]})
 *
 * Pagination + invalid-input semantics mirror workflows.list.
 */

import { Client, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getCurrentBlockNumber,
  getSmartWallet,
  nextTestSalt,
  removeCreatedWorkflows,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(120_000);

async function createAndFireWorkflow(
  client: Client,
  walletAddress: string,
  blockNumber: number,
  triggerName: string,
): Promise<string> {
  const created = await client.workflows.create({
    ...createFromTemplate(walletAddress),
    maxExecution: 1,
    trigger: Triggers.block({ id: "trigger", name: triggerName, interval: 5 }),
  });
  const wfId = created.id as string;
  await client.workflows.trigger(wfId, {
    triggerType: "block",
    triggerOutput: { blockNumber: blockNumber + 5 },
    isBlocking: true,
  });
  return wfId;
}

describe("executions.list Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("limit + after cursor returns N then the rest with no overlap", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const total = 4;
    const wallet = await getSmartWallet(client, { saltValue: nextTestSalt() });
    const blockNumber = await getCurrentBlockNumber();

    // Each workflow fires once (maxExecution=1), producing 1 execution.
    const wfIds: string[] = [];
    for (let i = 0; i < total; i++) {
      const id = await createAndFireWorkflow(client, wallet.address, blockNumber, `bt${i}`);
      wfIds.push(id);
      createdWorkflowIds.push(id);
    }

    const firstPage = await client.executions.list({ workflowId: wfIds, limit: 1 });
    expect(firstPage.data.length).toBe(1);
    expect(firstPage.pageInfo.hasNextPage).toBe(true);
    expect(firstPage.pageInfo.endCursor).toBeTruthy();

    const secondPage = await client.executions.list({
      workflowId: wfIds,
      after: firstPage.pageInfo.endCursor,
      limit: total,
    });
    expect(secondPage.data.length).toBe(total - 1);

    const overlap = firstPage.data
      .map((e) => e.id)
      .filter((id) => secondPage.data.some((e) => e.id === id));
    expect(overlap.length).toBe(0);
  });

  test("rejects a negative limit with HTTP 400", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create(createFromTemplate(wallet.address));
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    await expect(
      client.executions.list({ workflowId: [wfId], limit: -1 }),
    ).rejects.toMatchObject({ status: 400 });
  });

  test("count returns 0 for a workflow with no executions", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create(createFromTemplate(wallet.address));
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const c = await client.executions.count({ workflowId: [wfId] });
    expect(typeof c.total).toBe("number");
    expect(c.total).toBe(0);
  });

  test("count returns the right number for a single workflow", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await getSmartWallet(client);
    const blockNumber = await getCurrentBlockNumber();
    const wfId = await createAndFireWorkflow(client, wallet.address, blockNumber, "countSingle");
    createdWorkflowIds.push(wfId);

    const c = await client.executions.count({ workflowId: [wfId] });
    expect(c.total).toBe(1);
  });

  test("count aggregates across multiple workflows", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await getSmartWallet(client, { saltValue: nextTestSalt() });
    const blockNumber = await getCurrentBlockNumber();
    const wfIds: string[] = [];
    for (let i = 0; i < 3; i++) {
      const id = await createAndFireWorkflow(client, wallet.address, blockNumber, `multi${i}`);
      wfIds.push(id);
      createdWorkflowIds.push(id);
    }
    const c = await client.executions.count({ workflowId: wfIds });
    expect(c.total).toBe(3);
  });

  test("supports backward pagination via the before cursor", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await getSmartWallet(client, { saltValue: nextTestSalt() });
    const blockNumber = await getCurrentBlockNumber();
    const wfIds: string[] = [];
    for (let i = 0; i < 4; i++) {
      const id = await createAndFireWorkflow(client, wallet.address, blockNumber, `bk${i}`);
      wfIds.push(id);
      createdWorkflowIds.push(id);
    }

    const firstPage = await client.executions.list({ workflowId: wfIds, limit: 2 });
    expect(firstPage.pageInfo.endCursor).toBeTruthy();
    const secondPage = await client.executions.list({
      workflowId: wfIds,
      after: firstPage.pageInfo.endCursor,
      limit: 2,
    });
    const backPage = await client.executions.list({
      workflowId: wfIds,
      before: secondPage.pageInfo.startCursor,
      limit: 2,
    });
    expect(backPage.data.length).toBeGreaterThan(0);
  });

  test("rejects invalid before/after cursors with HTTP 400", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create(createFromTemplate(wallet.address));
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    await expect(
      client.executions.list({ workflowId: [wfId], before: "garbage" }),
    ).rejects.toMatchObject({ status: 400 });
    await expect(
      client.executions.list({ workflowId: [wfId], after: "garbage" }),
    ).rejects.toMatchObject({ status: 400 });
  });
});
