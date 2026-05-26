/**
 * Port of tests-v3-archive/templates/aave-health-factor-alert.test.ts.
 *
 * Studio template: monitor a wallet's AAVE V3 health factor on cron,
 * trigger a Telegram alert when it falls below a threshold.
 *
 * The v3 test set up a real position on Sepolia (supply LINK, borrow
 * DAI) to drive the health factor into a known range. The v4 port
 * just validates the workflow shape compiles and simulates — we
 * don't manipulate real positions to keep the test deterministic.
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

const AAVE_V3_POOL_SEPOLIA = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";
const AAVE_POOL_ABI = [
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserAccountData",
    outputs: [
      { internalType: "uint256", name: "totalCollateralBase", type: "uint256" },
      { internalType: "uint256", name: "totalDebtBase", type: "uint256" },
      { internalType: "uint256", name: "availableBorrowsBase", type: "uint256" },
      { internalType: "uint256", name: "currentLiquidationThreshold", type: "uint256" },
      { internalType: "uint256", name: "ltv", type: "uint256" },
      { internalType: "uint256", name: "healthFactor", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

describe("Template: AAVE health factor alert", () => {
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

  test("simulates the cron->contractRead->branch->REST alert workflow", async () => {
    const wallet = await getSmartWallet(client);
    const sim = await client.workflows.simulate({
      trigger: Triggers.cron({
        id: "trigger",
        name: "cron",
        schedule: ["*/15 * * * *"],
      }),
      nodes: [
        Nodes.contractRead({
          id: "read",
          name: "aaveRead",
          contractAddress: AAVE_V3_POOL_SEPOLIA,
          contractAbi: AAVE_POOL_ABI,
          methodCalls: [
            {
              methodName: "getUserAccountData",
              methodParams: [eoaAddress],
            },
          ],
        }),
        Nodes.branch({
          id: "branch",
          name: "branch",
          conditions: [
            {
              id: "lowHF",
              type: "if",
              // Trigger alert when HF < 1.6e18 (using string compare
              // to avoid bigint precision issues in JS).
              expression: 'aaveRead.data.getUserAccountData.healthFactor < "1600000000000000000"',
            },
            { id: "ok", type: "else", expression: "" },
          ],
        }),
        Nodes.restApi({
          id: "alert",
          name: "alert",
          url: "https://httpbin.org/post",
          method: "POST",
          body: JSON.stringify({ text: "Health factor low" }),
          headers: { "Content-Type": "application/json" },
        }),
      ],
      edges: [
        { id: "e1", source: "trigger", target: "read" },
        { id: "e2", source: "read", target: "branch" },
        { id: "e3", source: "branch.lowHF", target: "alert" },
      ],
      inputVariables: { settings: settingsForChain(wallet.address, 11_155_111) },
    });

    expect(sim.status).toBeTruthy();
    const stepIds = (sim.steps ?? []).map((s) => s.id);
    expect(stepIds).toContain("read");
    expect(stepIds).toContain("branch");
  });
});
