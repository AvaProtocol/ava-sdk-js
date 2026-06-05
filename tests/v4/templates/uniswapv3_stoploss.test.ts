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

import { Chains, Nodes, Protocols, Triggers, type Client } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsForChain,
} from "../../utils/client";

jest.setTimeout(60_000);

// Whitelist context — addresses + ABIs come from the SDK protocol
// catalog so this template test consumes the same canonical data as
// studio's UI layer. The `!` non-null assertions are safe: every
// constant resolved below is present in the catalog for Sepolia.
const WETH_SEPOLIA = Protocols.uniswapV3.tokens.WETH[Chains.Sepolia]!;
const USDC_SEPOLIA = Protocols.uniswapV3.tokens.USDC[Chains.Sepolia]!;
const UNISWAP_SWAP_ROUTER02_SEPOLIA =
  Protocols.uniswapV3.swapRouter02[Chains.Sepolia]!;
const CHAINLINK_ETH_USD_SEPOLIA = Protocols.chainlink.ethUsdFeed[Chains.Sepolia]!;

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
          contractAbi: Protocols.chainlink.aggregatorV3Abi,
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
          contractAbi: Protocols.uniswapV3.swapRouter02Abi,
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
    const wallet = await createSmartWallet(client, { saltValue: "2" });
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
    const wallet = await createSmartWallet(client, { saltValue: "2" });
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
    expect(retrieved.nodes).toHaveLength(3);
    expect(retrieved.edges).toHaveLength(3);
  });
});
