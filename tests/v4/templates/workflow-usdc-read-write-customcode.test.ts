/**
 * Port of tests-v3-archive/templates/workflow-usdc-read-write-customcode.test.ts.
 *
 * Replicates the real-world workflow shape:
 *   cron trigger -> contractRead(symbol) + contractRead(decimals) -> contractWrite(transfer)
 *                                                                 -> customCode (builds message)
 *
 * Guards the regression where one of the contractRead nodes was
 * deduped, causing the customCode to fail with undefined input.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  getSmartWallet,
  removeCreatedWorkflows,
  settingsForChain,
} from "../../utils/client";

jest.setTimeout(60_000);

const USDC_SEPOLIA = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const SYMBOL_ABI = [
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];
const DECIMALS_ABI = [
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
];
const TRANSFER_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

describe("Template: USDC read+write+customCode", () => {
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

  /** Canonical workflow shape — shared by simulate and deploy tests. */
  function buildWorkflow(smartWalletAddress: string) {
    return {
      smartWalletAddress,
      name: "USDC read+write+customCode",
      chainId: 11_155_111,
      trigger: Triggers.cron({
        id: "timeTrigger",
        name: "timeTrigger",
        schedule: ["*/2 * * * *"],
      }),
      nodes: [
        Nodes.contractRead({
          id: "contractRead1",
          name: "contractRead1",
          contractAddress: USDC_SEPOLIA,
          contractAbi: SYMBOL_ABI,
          methodCalls: [{ methodName: "symbol", methodParams: [] }],
        }),
        Nodes.contractRead({
          id: "contractRead2",
          name: "contractRead2",
          contractAddress: USDC_SEPOLIA,
          contractAbi: DECIMALS_ABI,
          methodCalls: [{ methodName: "decimals", methodParams: [] }],
        }),
        Nodes.contractWrite({
          id: "contractWrite1",
          name: "contractWrite1",
          contractAddress: USDC_SEPOLIA,
          contractAbi: TRANSFER_ABI,
          methodCalls: [{ methodName: "transfer", methodParams: [eoaAddress, "100000"] }],
        }),
        Nodes.customCode({
          id: "code1",
          name: "code1",
          source: `
            const symbol = contractRead1?.data?.symbol;
            const decimals = Number(contractRead2?.data?.decimals);
            const result = contractWrite1?.data?.transfer;
            return { symbol, decimals, transferOk: result === true };
          `,
        }),
      ],
      edges: [
        { id: "e1", source: "timeTrigger", target: "contractRead1" },
        { id: "e2", source: "contractRead1", target: "contractRead2" },
        { id: "e3", source: "contractRead2", target: "contractWrite1" },
        { id: "e4", source: "contractWrite1", target: "code1" },
      ],
    };
  }

  test("simulates the workflow with both contractReads + contractWrite + customCode", async () => {
    const wallet = await getSmartWallet(client, { saltValue: "2" });
    const wf = buildWorkflow(wallet.address);

    const sim = await client.workflows.simulate({
      trigger: wf.trigger,
      nodes: wf.nodes,
      edges: wf.edges,
      inputVariables: { settings: settingsForChain(wallet.address, 11_155_111) },
    });

    expect(sim.status).toBe("success");
    // Both contractReads must appear in the step list — the v3
    // regression deduplicated them and broke the downstream customCode.
    const stepIds = (sim.steps ?? []).map((s) => s.id);
    expect(stepIds).toContain("contractRead1");
    expect(stepIds).toContain("contractRead2");
    expect(stepIds).toContain("contractWrite1");
    expect(stepIds).toContain("code1");

    const code = sim.steps?.find((s) => s.id === "code1");
    expect(code?.success).toBe(true);
    const out = (code?.output as { data: any }).data;
    expect(typeof out.symbol).toBe("string");
    expect(typeof out.decimals).toBe("number");
    expect(out.transferOk).toBe(true);
  });

  test("deploys + retrieves the workflow with the cron trigger type", async () => {
    const wallet = await getSmartWallet(client, { saltValue: "2" });
    const wf = buildWorkflow(wallet.address);

    const created = await client.workflows.create({
      ...wf,
      // The top-level wf.name is the canonical workflow name; the
      // REST mapper auto-mirrors it into settings.name server-side.
      inputVariables: {
        settings: settingsForChain(wallet.address, 11_155_111),
      },
    });
    expect(typeof created.id).toBe("string");
    createdWorkflowIds.push(created.id);

    const retrieved = await client.workflows.retrieve(created.id);
    expect(retrieved.id).toBe(created.id);
    expect(retrieved.name).toBe(wf.name);
    expect(retrieved.trigger?.type).toBe("cron");
    expect(retrieved.nodes).toHaveLength(4);
    expect(retrieved.edges).toHaveLength(4);
  });
});
