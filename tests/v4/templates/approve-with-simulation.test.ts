/**
 * Port of tests-v3-archive/templates/test-single-approve-with-simulation.test.ts.
 *
 * Real-world studio template: approve a token spend amount and then
 * (in production) chain a swap via Uniswap V3. The port focuses on
 * the approve simulation path against Sepolia USDC — the swap leg is
 * covered by uniswapv3_stoploss.test.ts.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getSmartWallet,
  removeCreatedWorkflows,
  settingsForChain,
} from "../../utils/client";

jest.setTimeout(60_000);

const USDC_SEPOLIA = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const UNISWAP_ROUTER02 = "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E";
const APPROVE_ABI = [
  {
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

describe("Template: single approve with Tenderly simulation", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("simulates a manual-trigger workflow that approves USDC for the Uniswap router", async () => {
    const wallet = await getSmartWallet(client, { saltValue: "2" });
    const sim = await client.workflows.simulate({
      trigger: Triggers.manual({
        id: "trigger",
        name: "manualTrigger",
        lang: "json",
        data: {},
      }),
      nodes: [
        Nodes.contractWrite({
          id: "approve",
          name: "approve",
          contractAddress: USDC_SEPOLIA,
          contractAbi: APPROVE_ABI,
          methodCalls: [{ methodName: "approve", methodParams: [UNISWAP_ROUTER02, "10000"] }],
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "approve" }],
      inputVariables: { settings: settingsForChain(wallet.address, 11_155_111) },
    });

    expect(sim.status).toBe("success");
    const step = sim.steps?.find((s) => s.id === "approve");
    expect(step?.success).toBe(true);
    const data = (step?.output as { data: Record<string, any> }).data;
    expect(data.approve).toBe(true);
  });
});
