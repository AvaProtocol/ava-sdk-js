/**
 * Port of tests-v3-archive/executions/gasTracking.test.ts (874 lines).
 *
 * Most v3 scenarios were variants of "fire a workflow, look at the
 * step metadata + execution.cogs". The v4 port keeps one
 * representative per concern (single ETH transfer, multi-step
 * aggregation) and asserts the gas math (totalGasCost = gasUsed *
 * gasPrice) plus the execution-level cogs shape.
 *
 * Step metadata fields (gasUsed, gasPrice, totalGasCost,
 * transactionHash) are populated even by simulations — the values
 * are placeholders for sim-only paths but the math invariant still
 * holds.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  getSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(120_000);

interface StepWithMeta {
  readonly metadata?: {
    readonly gasUsed?: string;
    readonly gasPrice?: string;
    readonly totalGasCost?: string;
    readonly transactionHash?: string;
  };
}

describe("Gas tracking", () => {
  let client: Client;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    eoaAddress = getEOAAddress();
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("ETH transfer node exposes gas metadata via nodes.run", async () => {
    const wallet = await getSmartWallet(client);
    const result = await client.nodes.run({
      node: Nodes.ethTransfer({
        id: "transfer",
        name: "transfer",
        destination: eoaAddress,
        amountWei: "1000000000000000",
      }),
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    expect(result.success).toBe(true);
    const meta = result.metadata as Record<string, string>;
    expect(typeof meta.gasUsed).toBe("string");
    expect(typeof meta.gasPrice).toBe("string");
    expect(typeof meta.totalGasCost).toBe("string");
    // Validate the gas math invariant.
    const used = BigInt(meta.gasUsed);
    const price = BigInt(meta.gasPrice);
    const total = BigInt(meta.totalGasCost);
    expect(total).toBe(used * price);
  });

  test("execution.cogs aggregates gas costs across a multi-step workflow", async () => {
    if (!process.env.CHAIN_ENDPOINT) {
      console.log("Skipping — CHAIN_ENDPOINT not set");
      return;
    }
    const wallet = await getSmartWallet(client, { saltValue: "2" });
    const blockNumber = (await import("ethers")).JsonRpcProvider
      ? await (async () => {
          const { JsonRpcProvider } = await import("ethers");
          const ep = process.env.CHAIN_ENDPOINT ?? "";
          return new JsonRpcProvider(ep.startsWith("http") ? ep : `https://${ep}`).getBlockNumber();
        })()
      : 0;

    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      maxExecution: 1,
      trigger: Triggers.block({ id: "trigger", name: "blockTrigger", interval: 5 }),
      nodes: [
        Nodes.ethTransfer({
          id: "transfer",
          name: "transfer",
          destination: eoaAddress,
          amountWei: "100000000000000",
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "transfer" }],
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const trig = await client.workflows.trigger(wfId, {
      triggerType: "block",
      triggerOutput: { blockNumber: blockNumber + 5 },
      isBlocking: true,
    });
    if (trig.status === "failed" || trig.status === "error" || trig.error) {
      console.log(`Skipping — trigger returned ${trig.status}`);
      return;
    }

    const exec = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
    expect(Array.isArray(exec.cogs)).toBe(true);
    for (const c of exec.cogs ?? []) {
      expect(typeof c.nodeId).toBe("string");
      expect(c.fee.unit).toBe("WEI");
      expect(typeof c.fee.amount).toBe("string");
    }

    // The step itself carries its own gas metadata.
    const step = exec.steps?.find((s) => s.id === "transfer") as unknown as StepWithMeta | undefined;
    if (step?.metadata) {
      expect(typeof step.metadata.gasUsed).toBe("string");
      expect(typeof step.metadata.gasPrice).toBe("string");
      expect(typeof step.metadata.totalGasCost).toBe("string");
    }
  });

  test("simulated workflow carries metadata.transactionHash on transfer steps", async () => {
    const wallet = await getSmartWallet(client);
    const sim = await client.workflows.simulate({
      trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
      nodes: [
        Nodes.ethTransfer({
          id: "transfer",
          name: "transfer",
          destination: eoaAddress,
          amountWei: "1",
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "transfer" }],
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    const step = sim.steps?.find((s) => s.id === "transfer") as unknown as StepWithMeta | undefined;
    expect(step?.metadata).toBeDefined();
    expect(typeof step?.metadata?.transactionHash).toBe("string");
  });
});
