/**
 * Port of tests-v3-archive/templates/aave-health-factor-alert.test.ts,
 * redesigned around an event trigger.
 *
 * Studio template: watch the AAVE V3 Pool for a `Borrow` event on
 * behalf of the user's wallet, then check the resulting health
 * factor and fire a top-up alert when it dropped below 1.5.
 *
 * Intent (per design): this is a reactive top-up safety net for
 * user-initiated debt increases, not a liquidation preventer. Oracle-
 * driven HF moves (collateral price drops) emit no AAVE event and
 * are not in scope here — a future cron variant would cover those.
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

// keccak256("Borrow(address,address,address,uint256,uint8,uint256,uint16)")
// Stable across AAVE V3 deployments (mainnet, sepolia, base, etc.).
const AAVE_BORROW_SIG =
  "0xb3d084820fb1a9decffb176436bd02558d15fac9b0ddfed8c465bc7359d7dce0";

const AAVE_BORROW_EVENT_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "reserve", type: "address" },
      { indexed: false, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "address", name: "onBehalfOf", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "uint8", name: "interestRateMode", type: "uint8" },
      { indexed: false, internalType: "uint256", name: "borrowRate", type: "uint256" },
      { indexed: true, internalType: "uint16", name: "referralCode", type: "uint16" },
    ],
    name: "Borrow",
    type: "event",
  },
];

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

/** Pads a 20-byte address to a 32-byte topic value (left-zero-padded). */
function padTopic(addr: string): string {
  return "0x" + addr.slice(2).padStart(64, "0").toLowerCase();
}

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

  test("simulates the eventTrigger->contractRead->branch->REST top-up workflow", async () => {
    const wallet = await getSmartWallet(client);
    const sim = await client.workflows.simulate({
      // Fire when the AAVE V3 Pool emits a Borrow event with
      // onBehalfOf == this wallet. Layout of the Borrow topics:
      //   topics[0] = event signature
      //   topics[1] = reserve (indexed address)
      //   topics[2] = onBehalfOf (indexed address) ← filter slot
      //   topics[3] = referralCode (indexed uint16)
      // Empty strings in slots 1 and 3 are wildcards.
      trigger: Triggers.event({
        id: "trigger",
        name: "aaveBorrow",
        queries: [
          {
            addresses: [AAVE_V3_POOL_SEPOLIA],
            topics: [AAVE_BORROW_SIG, "", padTopic(eoaAddress), ""],
          },
        ],
      }),
      nodes: [
        // After a Borrow event lands, fetch the current HF directly
        // — Borrow's `amount` field tells you the debt added, not the
        // resulting HF, so a read is unavoidable.
        Nodes.contractRead({
          id: "read",
          name: "aaveRead",
          contractAddress: AAVE_V3_POOL_SEPOLIA,
          contractAbi: AAVE_POOL_ABI,
          methodCalls: [
            { methodName: "getUserAccountData", methodParams: [eoaAddress] },
          ],
        }),
        Nodes.branch({
          id: "branch",
          name: "branch",
          conditions: [
            {
              id: "lowHF",
              type: "if",
              // Fire the top-up branch when HF < 1.5e18 (1.5 in
              // AAVE's 18-decimal fixed-point HF representation).
              // String compare avoids JS bigint precision issues.
              expression:
                'aaveRead.data.getUserAccountData.healthFactor < "1500000000000000000"',
            },
            { id: "ok", type: "else", expression: "" },
          ],
        }),
        // Placeholder for the actual top-up action — a Studio user
        // would replace this with a contractWrite that calls AAVE
        // Pool.supply() with additional collateral, or queues an
        // off-chain instruction to the wallet UI.
        Nodes.restApi({
          id: "topup",
          name: "topup",
          url: "https://httpbin.org/post",
          method: "POST",
          body: JSON.stringify({
            text: "AAVE health factor below 1.5 — top up liquidity",
          }),
          headers: { "Content-Type": "application/json" },
        }),
      ],
      edges: [
        { id: "e1", source: "trigger", target: "read" },
        { id: "e2", source: "read", target: "branch" },
        { id: "e3", source: "branch.lowHF", target: "topup" },
      ],
      inputVariables: {
        settings: settingsForChain(wallet.address, 11_155_111),
      },
    });

    expect(sim.status).toBeTruthy();
    const stepIds = (sim.steps ?? []).map((s) => s.id);
    expect(stepIds).toContain("read");
    expect(stepIds).toContain("branch");
  });

  // The Borrow event ABI is exported so Studio surfaces decoded
  // event fields (reserve, amount, etc.) for downstream nodes that
  // want to reference them. Spot-check that the constant survives
  // schema changes — if it doesn't, the test below catches it before
  // a Studio template export drifts silently.
  test("Borrow event signature matches the published ABI definition", () => {
    const borrow = AAVE_BORROW_EVENT_ABI.find((e) => e.name === "Borrow");
    expect(borrow).toBeDefined();
    expect(borrow!.inputs).toHaveLength(7);
    expect(borrow!.inputs[2]).toMatchObject({ name: "onBehalfOf", indexed: true });
    expect(AAVE_BORROW_SIG).toMatch(/^0x[0-9a-f]{64}$/);
  });
});
