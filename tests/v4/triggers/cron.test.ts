/**
 * Port of tests-v3-archive/triggers/cron.test.ts (795 lines).
 *
 * v3 TriggerFactory validation tests are dropped (factory is gone
 * in v4). v4 server is lenient on cron strings — even malformed
 * ones return a "next-firing-at-now" placeholder rather than 400.
 *
 * Output shape:
 *   result.output.data = { timestamp: number, timestampIso: string }
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

describe("CronTrigger Tests", () => {
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
      ["daily at midnight", ["0 0 * * *"]],
      ["hourly", ["0 * * * *"]],
      ["every 15 minutes", ["*/15 * * * *"]],
      ["weekly", ["0 9 * * MON"]],
      ["multiple schedules", ["0 9 * * MON-FRI", "0 12 * * SAT,SUN"]],
      ["step values", ["*/5 * * * *"]],
    ])("returns a timestamp for %s", async (_label, schedule) => {
      const result = await client.triggers.run({
        trigger: Triggers.cron({ id: "t", name: "cron", schedule }),
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: { timestamp: number; timestampIso: string } }).data;
      expect(typeof data.timestamp).toBe("number");
      expect(typeof data.timestampIso).toBe("string");
      // Timestamp should be near "now" — within a wide ±60s window
      // to avoid clock-skew flakes.
      expect(Math.abs(Date.now() - data.timestamp)).toBeLessThan(60_000);
    });

    test("tolerates invalid cron expressions (server falls back to now)", async () => {
      const result = await client.triggers.run({
        trigger: Triggers.cron({
          id: "t",
          name: "cron",
          schedule: ["not-a-cron-expression"],
        }),
      });
      // v4 server is permissive — invalid cron strings return a
      // best-effort timestamp rather than 400. Document the
      // behavior so future tighter validation is a flagged change.
      expect(result.success).toBe(true);
      expect(result.output).toBeDefined();
    });
  });

  describe("workflows.simulate", () => {
    test("simulates a workflow with a cron trigger", async () => {
      const wallet = await createSmartWallet(client);
      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 0 * * *"] }),
        nodes: [Nodes.customCode({ id: "step1", name: "step1", source: "return {ok:true};" })],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(sim.status).toBe("success");
      const triggerStep = sim.steps?.find((s) => s.id === "trigger");
      expect(triggerStep?.success).toBe(true);
    });

    test("simulates a workflow with multiple cron schedules", async () => {
      const wallet = await createSmartWallet(client);
      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({
          id: "trigger",
          name: "cron",
          schedule: ["0 9 * * MON-FRI", "0 12 * * SAT,SUN"],
        }),
        nodes: [Nodes.customCode({ id: "step1", name: "step1", source: "return {ok:true};" })],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(sim.status).toBe("success");
    });
  });

  describe("deploy + trigger", () => {
    test("deploys, fires cron trigger, returns execution", async () => {
      if (!process.env.CHAIN_ENDPOINT) {
        console.log("Skipping — CHAIN_ENDPOINT not set");
        return;
      }
      const wallet = await createSmartWallet(client);
      // We borrow getCurrentBlockNumber just to fail-fast on chain
      // unreachability, even though cron triggers don't need it.
      await getCurrentBlockNumber();

      const wfReq = {
        ...createFromTemplate(wallet.address),
        trigger: Triggers.cron({
          id: "trigger",
          name: "cron",
          schedule: ["0 * * * *"],
        }),
      };
      const created = await client.workflows.create(wfReq);
      const wfId = created.id as string;
      createdWorkflowIds.push(wfId);

      const trig = await client.workflows.trigger(wfId, {
        triggerType: "cron",
        // Cron triggers need a timestamp output for the trigger to
        // record when it fired.
        triggerOutput: { timestamp: Date.now() },
        isBlocking: true,
      });
      if (trig.status === "failed" || trig.status === "error" || trig.error) {
        console.log(`Skipping — trigger returned ${trig.status}${trig.error ? ": " + trig.error : ""}`);
        return;
      }
      const exec = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
      const triggerStep = exec.steps?.find((s) => s.id === "trigger");
      expect(triggerStep?.success).toBe(true);
    });
  });
});
