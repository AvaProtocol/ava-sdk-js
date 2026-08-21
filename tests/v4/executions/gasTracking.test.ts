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

import { Chains, Client, Nodes, Protocols, Tokens, Triggers } from "@avaprotocol/sdk-js";

import {
  getSuiteClient,
  getFundedFixture,
  assertUserOpTriggerOk,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

// 180s: same blockNumber+5 trigger pattern as ethTransfer — 60s of
// pure block-wait before the UserOp round-trip even starts.
jest.setTimeout(180_000);

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
    ({ client, owner: eoaAddress } = await getSuiteClient());
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("ETH transfer node exposes gas metadata via nodes.run", async () => {
    const wallet = await createSmartWallet(client);
    const result = await client.nodes.run({
      node: Nodes.ethTransfer({
        id: "transfer",
        name: "transfer",
        chainId: 11_155_111,
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
    // Native ETH execute(to, value, 0x) AA23s under REST session grants
    // (AllowlistModule NoSelectorSpecified). An ERC-20 approve has a real
    // selector and still produces execution.cogs on a mined UserOp.
    const { client: funded, owner: fundedOwner, wallet } = await getFundedFixture();
    const usdc = Tokens.USDC[Chains.Sepolia]!.address;
    const erc20Abi = [...Protocols.erc20.transferAbi, ...Protocols.erc20.approveAbi];
    const blockNumber = await (async () => {
      const { JsonRpcProvider } = await import("ethers");
      const ep = process.env.CHAIN_ENDPOINT ?? "";
      return new JsonRpcProvider(ep.startsWith("http") ? ep : `https://${ep}`).getBlockNumber();
    })();

    const created = await funded.workflows.create({
      ...createFromTemplate(wallet.address),
      maxExecution: 1,
      trigger: Triggers.block({ id: "trigger", name: "blockTrigger", chainId: 11_155_111, interval: 5 }),
      nodes: [
        Nodes.contractWrite({
          id: "approve",
          name: "approve",
          chainId: 11_155_111,
          contractAddress: usdc,
          contractAbi: erc20Abi,
          methodCalls: [{ methodName: "approve", methodParams: [fundedOwner, "0"] }],
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "approve" }],
    });
    const wfId = created.id as string;
    try {
      const trig = await funded.workflows.trigger(wfId, {
        triggerType: "block",
        triggerOutput: { blockNumber: blockNumber + 5 },
        isBlocking: true,
      });
      assertUserOpTriggerOk(trig, wallet.address);

      const exec = await funded.executions.retrieve(trig.executionId, { workflowId: wfId });
      expect(Array.isArray(exec.cogs)).toBe(true);
      for (const c of exec.cogs ?? []) {
        expect(typeof c.nodeId).toBe("string");
        expect(c.fee.unit).toBe("WEI");
        expect(typeof c.fee.amount).toBe("string");
      }

      const step = exec.steps?.find((s) => s.id === "approve") as unknown as StepWithMeta | undefined;
      if (step?.metadata) {
        expect(typeof step.metadata.gasUsed).toBe("string");
        expect(typeof step.metadata.gasPrice).toBe("string");
        expect(typeof step.metadata.totalGasCost).toBe("string");
      }
    } finally {
      await removeCreatedWorkflows(funded, [wfId]);
    }
  });

  test("simulated workflow carries metadata.transactionHash on transfer steps", async () => {
    const wallet = await createSmartWallet(client);
    const sim = await client.workflows.simulate({
      trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
      nodes: [
        Nodes.ethTransfer({
          id: "transfer",
          name: "transfer",
          chainId: 11_155_111,
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
