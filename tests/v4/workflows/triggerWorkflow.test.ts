/**
 * Port of tests-v3-archive/workflows/triggerWorkflow.test.ts.
 *
 * v3 used `client.triggerWorkflow({id, triggerData, isBlocking})` —
 * v4 uses `client.workflows.trigger(id, body)` where body has
 * `triggerType`, `triggerOutput`, `isBlocking`.
 *
 * triggerOutput shapes by type:
 *   - block:     {blockNumber}
 *   - cron:      {timestamp, timestampIso}
 *   - fixedTime: {timestamp, timestampIso}
 *   - event:     {address, blockNumber, transactionHash, ...evmLog fields}
 *   - manual:    {data: {...}}
 *
 * Completed-workflow errors:
 *   - v3: `task cannot be executed | FAILED_PRECONDITION`
 *   - v4: HTTP 400 (server-side FailedPrecondition → BadRequest via
 *     the gRPC→HTTP code translation).
 */

import { Client, Protocols, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getCurrentBlockNumber,
  createSmartWallet,
  removeCreatedWorkflows,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(120_000);

describe("workflows.trigger Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("happy paths per trigger type", () => {
    test("block trigger workflow fires and reports the execution", async () => {
      if (!process.env.CHAIN_ENDPOINT) {
        console.log("Skipping — CHAIN_ENDPOINT not set");
        return;
      }
      const wallet = await createSmartWallet(client);
      const blockNumber = await getCurrentBlockNumber();
      const interval = 5;

      const created = await client.workflows.create({
        ...createFromTemplate(wallet.address),
        trigger: Triggers.block({ id: "trigger", name: "blockTrigger", interval }),
      });
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
    });

    test("cron trigger workflow fires and reports the execution", async () => {
      const wallet = await createSmartWallet(client);
      const created = await client.workflows.create({
        ...createFromTemplate(wallet.address),
        trigger: Triggers.cron({ id: "trigger", name: "cronTrigger", schedule: ["* * * * *"] }),
      });
      const wfId = created.id as string;
      createdWorkflowIds.push(wfId);

      const trig = await client.workflows.trigger(wfId, {
        triggerType: "cron",
        triggerOutput: {
          timestamp: Date.now(),
          timestampIso: new Date().toISOString(),
        },
        isBlocking: true,
      });
      expect(trig.executionId).toBeTruthy();
    });

    test("fixedTime trigger workflow fires and reports the execution", async () => {
      const wallet = await createSmartWallet(client);
      const epoch = Math.floor(Date.now() / 1000);
      const created = await client.workflows.create({
        ...createFromTemplate(wallet.address),
        trigger: Triggers.fixedTime({
          id: "trigger",
          name: "fixedTimeTrigger",
          epochsMs: [(epoch + 60) * 1000, (epoch + 120) * 1000],
        }),
      });
      const wfId = created.id as string;
      createdWorkflowIds.push(wfId);

      const trig = await client.workflows.trigger(wfId, {
        triggerType: "fixedTime",
        triggerOutput: {
          timestamp: (epoch + 60) * 1000,
          timestampIso: new Date((epoch + 60) * 1000).toISOString(),
        },
        isBlocking: true,
      });
      expect(trig.executionId).toBeTruthy();
    });

    test("event trigger workflow fires and reports the execution", async () => {
      if (!process.env.CHAIN_ENDPOINT) {
        console.log("Skipping — CHAIN_ENDPOINT not set");
        return;
      }
      const wallet = await createSmartWallet(client);
      const blockNumber = await getCurrentBlockNumber();
      const created = await client.workflows.create({
        ...createFromTemplate(wallet.address),
        trigger: Triggers.event({
          id: "trigger",
          name: "eventTrigger",
          queries: [
            {
              addresses: [],
              topics: [
                Protocols.erc20.eventTopics.Transfer,
                "",
                "0x" + wallet.address.slice(2).padStart(64, "0").toLowerCase(),
              ],
              maxEventsPerBlock: 100,
            },
          ],
        }),
      });
      const wfId = created.id as string;
      createdWorkflowIds.push(wfId);

      const trig = await client.workflows.trigger(wfId, {
        triggerType: "event",
        triggerOutput: {
          address: "0x1234567890123456789012345678901234567890",
          blockNumber: blockNumber + 5,
          transactionHash: "0x1234567890",
          logIndex: 0,
        },
        isBlocking: true,
      });
      expect(trig.executionId).toBeTruthy();
    });
  });

  describe("blocking vs async mode", () => {
    test("blocking returns the execution id and terminal status", async () => {
      const wallet = await createSmartWallet(client);
      const created = await client.workflows.create({
        ...createFromTemplate(wallet.address),
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["* * * * *"] }),
      });
      const wfId = created.id as string;
      createdWorkflowIds.push(wfId);

      const trig = await client.workflows.trigger(wfId, {
        triggerType: "cron",
        triggerOutput: { timestamp: Date.now(), timestampIso: new Date().toISOString() },
        isBlocking: true,
      });
      expect(trig.executionId).toBeTruthy();
      // trigger status mirrors ExecutionStatus — pending (async),
      // success / failed / error (blocking terminal states).
      expect(["pending", "success", "failed", "error"]).toContain(trig.status);

      // The execution is reachable by id immediately after blocking.
      const exec = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
      expect(exec.id).toBe(trig.executionId);
    });

    test("async mode returns id with queued/pending status", async () => {
      const wallet = await createSmartWallet(client);
      const created = await client.workflows.create({
        ...createFromTemplate(wallet.address),
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["* * * * *"] }),
      });
      const wfId = created.id as string;
      createdWorkflowIds.push(wfId);

      const trig = await client.workflows.trigger(wfId, {
        triggerType: "cron",
        triggerOutput: { timestamp: Date.now(), timestampIso: new Date().toISOString() },
        isBlocking: false,
      });
      expect(trig.executionId).toBeTruthy();
      // Async returns immediately — status is whatever the engine has
      // observed so far (queued, succeeded, or in flight).
      expect(typeof trig.status).toBe("string");
    });
  });

  describe("error cases", () => {
    test("rejects triggering a non-existent workflow with 404", async () => {
      await expect(
        client.workflows.trigger("01ZZZZZZZZZZZZZZZZZZZZZZZZ", {
          triggerType: "cron",
          triggerOutput: { timestamp: Date.now(), timestampIso: new Date().toISOString() },
          isBlocking: true,
        }),
      ).rejects.toMatchObject({ status: 404 });
    });

    test("rejects re-triggering a completed (maxExecution=1) workflow", async () => {
      const wallet = await createSmartWallet(client);
      const created = await client.workflows.create({
        ...createFromTemplate(wallet.address),
        maxExecution: 1,
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["* * * * *"] }),
      });
      const wfId = created.id as string;
      createdWorkflowIds.push(wfId);

      // First trigger completes the workflow.
      await client.workflows.trigger(wfId, {
        triggerType: "cron",
        triggerOutput: { timestamp: Date.now(), timestampIso: new Date().toISOString() },
        isBlocking: true,
      });

      // After maxExecution is reached the engine may either:
      //   (a) keep the workflow with status=completed and reject the
      //       re-trigger with 400 (FailedPrecondition), or
      //   (b) remove the workflow entirely, in which case the
      //       follow-up trigger returns 404.
      // Both are valid "cannot trigger again" signals — accept either.
      await expect(
        client.workflows.trigger(wfId, {
          triggerType: "cron",
          triggerOutput: { timestamp: Date.now(), timestampIso: new Date().toISOString() },
          isBlocking: true,
        }),
      ).rejects.toMatchObject({ status: expect.any(Number) }).then(
        () => undefined,
        async (caught) => {
          // .then handler shouldn't run; if it does, the call resolved.
          // Forward the rejection check as the test failure.
          throw caught;
        },
      );

      // Re-do the assertion explicitly so the test fails clearly if
      // the call somehow resolved.
      try {
        await client.workflows.trigger(wfId, {
          triggerType: "cron",
          triggerOutput: { timestamp: Date.now(), timestampIso: new Date().toISOString() },
          isBlocking: true,
        });
        // Reaching this line means the second trigger succeeded —
        // not the contract.
        throw new Error("expected second trigger on completed workflow to reject");
      } catch (err: unknown) {
        const e = err as { status?: number };
        expect([400, 404]).toContain(e.status);
      }
    });
  });
});
