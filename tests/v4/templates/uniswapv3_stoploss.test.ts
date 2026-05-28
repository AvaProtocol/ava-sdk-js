/**
 * Port of tests-v3-archive/templates/uniswapv3_stoploss.test.ts.
 *
 * Studio template: monitor a Chainlink price feed and execute a
 * Uniswap V3 swap when the price crosses a threshold (stop-loss).
 *
 * Real v3 test triggered actual on-chain swaps against the funded
 * wallet. The v4 port validates the workflow shape via simulate
 * (Tenderly-backed for the contractWrite) to keep the test
 * deterministic.
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

const WETH_SEPOLIA = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
const USDC_SEPOLIA = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const UNISWAP_SWAP_ROUTER02_SEPOLIA = "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E";
const CHAINLINK_ETH_USD_SEPOLIA = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

const CHAINLINK_ABI = [
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const SWAP_ROUTER_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMinimum", type: "uint256" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" },
        ],
        internalType: "struct IV3SwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
];

describe("Template: Uniswap V3 stop-loss", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  /** Canonical workflow shape — shared by simulate and deploy tests. */
  function buildWorkflow(smartWalletAddress: string) {
    return {
      smartWalletAddress,
      name: "Uniswap V3 stop-loss",
      chainId: 11_155_111,
      trigger: Triggers.cron({
        id: "trigger",
        name: "cron",
        schedule: ["*/5 * * * *"],
      }),
      nodes: [
        Nodes.contractRead({
          id: "price",
          name: "price",
          contractAddress: CHAINLINK_ETH_USD_SEPOLIA,
          contractAbi: CHAINLINK_ABI,
          methodCalls: [{ methodName: "latestRoundData", methodParams: [] }],
        }),
        Nodes.branch({
          id: "branch",
          name: "branch",
          conditions: [
            // Trigger swap when ETH/USD < $10,000 (8 decimals → 1e12).
            {
              id: "stopLoss",
              type: "if",
              expression: 'price.data.latestRoundData.answer < "1000000000000"',
            },
            { id: "hold", type: "else", expression: "" },
          ],
        }),
        Nodes.contractWrite({
          id: "swap",
          name: "swap",
          contractAddress: UNISWAP_SWAP_ROUTER02_SEPOLIA,
          contractAbi: SWAP_ROUTER_ABI,
          methodCalls: [
            {
              methodName: "exactInputSingle",
              methodParams: [
                JSON.stringify({
                  tokenIn: WETH_SEPOLIA,
                  tokenOut: USDC_SEPOLIA,
                  fee: 3000,
                  recipient: smartWalletAddress,
                  amountIn: "1000000000000000",
                  amountOutMinimum: "0",
                  sqrtPriceLimitX96: "0",
                }),
              ],
            },
          ],
        }),
      ],
      edges: [
        { id: "e1", source: "trigger", target: "price" },
        { id: "e2", source: "price", target: "branch" },
        { id: "e3", source: "branch.stopLoss", target: "swap" },
      ],
    };
  }

  test("simulates the cron->priceRead->branch->swap workflow shape", async () => {
    const wallet = await getSmartWallet(client, { saltValue: "2" });
    const wf = buildWorkflow(wallet.address);

    const sim = await client.workflows.simulate({
      trigger: wf.trigger,
      nodes: wf.nodes,
      edges: wf.edges,
      inputVariables: { settings: settingsForChain(wallet.address, 11_155_111) },
    });

    expect(sim.status).toBeTruthy();
    const stepIds = (sim.steps ?? []).map((s) => s.id);
    expect(stepIds).toContain("price");
    expect(stepIds).toContain("branch");
    // The swap step only fires if the price condition is met (it
    // shouldn't be in this dev env). The point of this test is the
    // workflow compiles + simulates successfully.
  });

  test("deploys + retrieves the workflow with the cron trigger type", async () => {
    const wallet = await getSmartWallet(client, { saltValue: "2" });
    const wf = buildWorkflow(wallet.address);

    const created = await client.workflows.create({
      ...wf,
      inputVariables: {
        settings: settingsForChain(wallet.address, 11_155_111, wf.name),
      },
    });
    expect(typeof created.id).toBe("string");
    createdWorkflowIds.push(created.id);

    const retrieved = await client.workflows.retrieve(created.id);
    expect(retrieved.id).toBe(created.id);
    expect(retrieved.name).toBe(wf.name);
    expect(retrieved.trigger?.type).toBe("cron");
    expect(retrieved.nodes).toHaveLength(3);
    expect(retrieved.edges).toHaveLength(3);
  });
});
