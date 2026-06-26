/**
 * Port of tests-v3-archive/templates/test-single-approve-with-simulation.test.ts.
 *
 * Real-world studio template: approve a token spend amount and then
 * (in production) chain a swap via Uniswap V3. The port focuses on
 * the approve simulation path against Sepolia USDC — the swap leg is
 * covered by uniswapv3_stoploss.test.ts.
 */

import { Chains, Client, Nodes, Protocols, Tokens, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsForChain,
} from "../../utils/client";

jest.setTimeout(60_000);

const USDC_SEPOLIA = Tokens.USDC[Chains.Sepolia]!.address;
const UNISWAP_ROUTER02 = Protocols.uniswapV3.swapRouter02[Chains.Sepolia]!;
const APPROVE_ABI = Protocols.erc20.approveAbi;

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
    const wallet = await createSmartWallet(client, { saltValue: "2" });
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
          chainId: 11_155_111,
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
