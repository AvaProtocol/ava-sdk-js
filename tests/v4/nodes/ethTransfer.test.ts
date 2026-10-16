/**
 * Native transfers require complete workflows. Standalone requests are rejected;
 * workflow simulation and deployment exercise the supported action paths.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  getCurrentBlockNumber,
  getSuiteClient,
  getFundedFixture,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";
import { SESSION_POLICY_NATIVE_NOT_ALLOWED } from "../../utils/sessionGrant";

// deploy+trigger block matches a future block (blockNumber+5) then waits for the
// bundler/UserOp receipt — ~45s against a fresh gateway. The jest budget is set
// ABOVE the test client's 240s defaultTimeoutMs (tests/utils/client.ts) so a slow
// blocking :trigger surfaces as a clean client abort rather than a jest kill.
// Persistent ~240s slowness in CI means a STALE avs-dev:latest image (republish
// the EigenLayer-AVS dev docker after gateway changes — see publish-dev-docker.yml),
// not inherent Sepolia latency.
jest.setTimeout(300_000);

// Pull a fresh wallet per test from the per-process salt cursor — the
// validation tests don't need funding, so a hot wallet works fine.
describe("ETHTransfer Node Tests", () => {
  let client: Client;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    ({ client, owner: eoaAddress } = await getSuiteClient());
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("nodes.run", () => {
    test("rejects a standalone native transfer", async () => {
      await expect(client.nodes.run({
        node: Nodes.ethTransfer({
          id: "n1", name: "n1", chainId: 11_155_111,
          destination: eoaAddress, amountWei: "1",
        }),
      })).rejects.toMatchObject({ status: 400, message: expect.stringContaining("complete workflow") });
    });
  });

  describe("workflows.simulate", () => {
    test("simulates a workflow whose only step is an ETH transfer", async () => {
      const wallet = await createSmartWallet(client);
      const amountWei = "1000000000000000";

      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [
          Nodes.ethTransfer({
            id: "transfer",
            name: "transfer",
            chainId: 11_155_111,
            destination: eoaAddress,
            amountWei,
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "transfer" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });

      expect(sim.status).toBe("success");
      const step = sim.steps?.find((s) => s.id === "transfer");
      expect(step?.success).toBe(true);
      const transfer = (step?.output as { data: { transfer: any } }).data.transfer;
      expect(transfer.from.toLowerCase()).toBe(wallet.address.toLowerCase());
      expect(transfer.to.toLowerCase()).toBe(eoaAddress.toLowerCase());
      expect(transfer.value).toBe(amountWei);

      const meta = (step as unknown as { metadata: Record<string, string> }).metadata;
      expect(typeof meta.transactionHash).toBe("string");
    });
  });

  describe("deploy + trigger (real bundler round-trip)", () => {
    let funded: Client;
    let fundedOwner: string;
    let wallet: Awaited<ReturnType<typeof getFundedFixture>>["wallet"];
    const fundedWorkflowIds: string[] = [];

    beforeAll(async () => {
      ({ client: funded, owner: fundedOwner, wallet } = await getFundedFixture());
    });

    afterEach(async () => {
      await removeCreatedWorkflows(funded, fundedWorkflowIds.splice(0));
    });

    test("refuses a native ETH transfer with SESSION_POLICY_NATIVE_NOT_ALLOWED", async () => {
      if (!process.env.CHAIN_ENDPOINT) {
        console.log("Skipping — CHAIN_ENDPOINT not set");
        return;
      }
      const blockNumber = await getCurrentBlockNumber();
      const triggerInterval = 5;

      const workflowReq = {
        ...createFromTemplate(wallet.address),
        trigger: Triggers.block({
          id: "trigger",
          name: "blockTrigger",
          chainId: 11_155_111,
          interval: triggerInterval,
        }),
        nodes: [
          Nodes.ethTransfer({
            id: "transfer",
            name: "transfer",
            chainId: 11_155_111,
            destination: fundedOwner,
            amountWei: "100000000000000",
          }),
        ],
        // Override the template's edges so they target our renamed
        // node id ("transfer" instead of "step1"). Forgetting this is
        // a compile error from the engine.
        edges: [{ id: "e1", source: "trigger", target: "transfer" }],
      };
      const created = await funded.workflows.create(workflowReq);
      const workflowId = created.id as string;
      fundedWorkflowIds.push(workflowId);

      const trig = await funded.workflows.trigger(workflowId, {
        triggerType: "block",
        triggerOutput: { blockNumber: blockNumber + triggerInterval },
        isBlocking: true,
      });
      // Option C of EigenLayer-AVS #761: REST session grants cannot
      // cover execute(to, value, 0x). The gateway refuses before the
      // bundler instead of returning opaque AA23. The trigger envelope
      // only says "1 of 2 steps failed: transfer"; the code is on the
      // step.
      expect(trig.status).toBe("failed");

      const execution = await funded.executions.retrieve(trig.executionId, { workflowId });
      const step = execution.steps?.find((s) => s.id === "transfer");
      expect(step?.success).toBe(false);
      const stepErr = `${step?.error ?? ""} ${step?.errorCode ?? ""}`;
      expect(stepErr).toContain(SESSION_POLICY_NATIVE_NOT_ALLOWED);
    });
  });
});
