/**
 * Port of tests-v3-archive/nodes/ethTransfer.test.ts (1191 lines).
 *
 * v3 had many near-duplicate variations of "with/without isSimulated".
 * v4 simplifies: nodes.run is always a simulation (no UserOp goes
 * out), and the only on-chain execution path is workflows.trigger.
 * Real ETH transfer under a REST session grant is refused with
 * SESSION_POLICY_NATIVE_NOT_ALLOWED (EigenLayer-AVS #761) — empty
 * inner calldata cannot pass a selector-scoped allowlist.
 * The port keeps one assertion per scenario rather than re-asserting
 * the same response shape three different ways.
 *
 * Output shape map:
 *   - v3 `result.data.transfer.{from,to,value}`
 *   - v4 `result.output.data.transfer.{from,to,value}`
 *   - v3 `result.metadata.{gasUsed, gasPrice, totalGasCost, transactionHash}`
 *   - v4 same field set on `result.metadata` (top-level, NOT under output).
 *   - v3 `executionContext.{chainId, isSimulated, provider}` (camelCase)
 *   - v4 `executionContext.{chain_id, is_simulated, provider}` (snake_case)
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
    test("simulates an ETH transfer and returns the canonical transfer/metadata shape", async () => {
      const wallet = await createSmartWallet(client);
      const amountWei = "1000000000000000"; // 0.001 ETH

      const result = await client.nodes.run({
        node: Nodes.ethTransfer({
          id: "n1",
          name: "n1",
          chainId: 11_155_111,
          destination: eoaAddress,
          amountWei,
        }),
        inputVariables: { settings: settingsFor(wallet.address) },
      });

      expect(result.success).toBe(true);

      const transfer = (result.output as { data: { transfer: any } }).data.transfer;
      expect(transfer.from.toLowerCase()).toBe(wallet.address.toLowerCase());
      expect(transfer.to.toLowerCase()).toBe(eoaAddress.toLowerCase());
      expect(transfer.value).toBe(amountWei);

      const metadata = result.metadata as Record<string, string>;
      expect(typeof metadata.transactionHash).toBe("string");
      // gasUsed / gasPrice / totalGasCost are populated even in
      // simulation (placeholder values), unlike v3 where they were
      // only present on real execution.
      expect(typeof metadata.gasUsed).toBe("string");
      expect(typeof metadata.gasPrice).toBe("string");
      expect(typeof metadata.totalGasCost).toBe("string");

      const ctx = result.executionContext as Record<string, unknown>;
      expect(typeof ctx.chain_id).toBe("number");
      expect(typeof ctx.is_simulated).toBe("boolean");
      expect(ctx.provider).toBeTruthy();
    });

    test("rejects empty destination", async () => {
      const wallet = await createSmartWallet(client);
      // v4 returns success=false with an error message rather than
      // throwing on validation — assert on the shape.
      const result = await client.nodes.run({
        node: Nodes.ethTransfer({
          id: "n1",
          name: "n1",
          chainId: 11_155_111,
          destination: "",
          amountWei: "1",
        }),
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(result.success).toBe(false);
      expect(typeof result.error).toBe("string");
      expect(result.error?.length ?? 0).toBeGreaterThan(0);
    });

    test("accepts zero amount as a no-op simulation", async () => {
      // v3 expected this to fail; v4 simulates a 0-wei transfer
      // successfully (the engine's view: a valid 0-value transfer is
      // legal even if pointless). The on-chain bundler would still
      // reject a real 0-wei UserOp, so this only matters at the
      // simulate path.
      const wallet = await createSmartWallet(client);
      const result = await client.nodes.run({
        node: Nodes.ethTransfer({
          id: "n1",
          name: "n1",
          chainId: 11_155_111,
          destination: eoaAddress,
          amountWei: "0",
        }),
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(result.success).toBe(true);
      const transfer = (result.output as { data: { transfer: any } }).data.transfer;
      expect(transfer.value).toBe("0");
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
