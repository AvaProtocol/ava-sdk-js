import { type Client } from "@avaprotocol/sdk-js";
import {
  createSmartWallet,
  getFundedClient,
  getIsolatedClient,
} from "../../utils/client";
import {
  buildWalletSweepWorkflow,
  previewWalletSweep,
  simulateWalletSweep,
  SWEEP_CHAIN_ID,
  walletSweepPlanFromPreview,
} from "../../../examples/workflows/wallet-sweep";

jest.setTimeout(120_000);

describe("Template: wallet sweep (live gateway, simulation only)", () => {
  let client: Client;
  let source: string;
  const destination = "0x2222222222222222222222222222222222222222";

  beforeAll(async () => {
    ({ client } = await getIsolatedClient());
    source = (await createSmartWallet(client, { saltValue: "0" })).address;
  });

  test("reads both catalog tokens and omits their real zero balances", async () => {
    const { plan, workflow } = await previewWalletSweep(client, {
      source,
      destination,
    });
    expect(plan.chainId).toBe(SWEEP_CHAIN_ID);
    expect(plan.source.toLowerCase()).toBe(source.toLowerCase());
    expect(plan.transfers).toEqual([]);
    expect(plan.zeroBalanceTokens).toEqual(["USDC", "WETH"]);
    expect(workflow).toBeNull();
  });

  test("a stale two-token snapshot cannot reach the transfer node", async () => {
    // These are deliberately stale fixture amounts, not simulated holdings.
    // The real read nodes see the empty wallet and must block both transfers.
    const options = { source, destination };
    const plan = walletSweepPlanFromPreview(options, {
      id: "fixture",
      workflowId: "",
      startAt: 1,
      status: "success",
      steps: [0, 1].map((index) => ({
        id: `balance${index}`,
        type: "contractRead",
        success: true,
        output: { data: { balanceOf: "1" } },
      })),
    });
    const execution = await client.workflows.simulate(
      buildWalletSweepWorkflow(plan),
    );
    expect(execution.status).toBe("failed");
    expect(
      execution.steps?.find((step) => step.id === "snapshot"),
    ).toMatchObject({
      success: true,
      output: { data: { ready: false } },
    });
    expect(execution.steps?.find((step) => step.id === "stale")).toMatchObject({
      success: false,
    });
    expect(
      execution.steps?.find((step) => step.id === "transfer")?.success,
    ).not.toBe(true);
  });
});

// Explicit opt-in: this fixture must already hold both test tokens. Never
// install a session grant or top it up just to make a simulation test pass.
const describeFunded =
  process.env.WALLET_SWEEP_FUNDED_SIMULATION === "1" ? describe : describe.skip;
describeFunded("Template: funded wallet sweep (simulation only)", () => {
  test("simulates both real token balances and leaves the source balances unchanged", async () => {
    const { client } = await getFundedClient();
    const { address: source } = await client.wallets.create({ salt: "0" });
    const options = {
      source,
      destination: "0x2222222222222222222222222222222222222222",
    };
    const before = await previewWalletSweep(client, options);
    expect(before.plan.transfers.map((row) => row.symbol)).toEqual([
      "USDC",
      "WETH",
    ]);
    const simulation = await simulateWalletSweep(client, options);
    expect(simulation.execution.status).toBe("success");
    const transfer = simulation.execution.steps?.find(
      (step) => step.id === "transfer",
    );
    expect(transfer?.metadata?.results).toHaveLength(2);
    const after = await previewWalletSweep(client, options);
    expect(after.plan).toEqual(before.plan);
  });
});
