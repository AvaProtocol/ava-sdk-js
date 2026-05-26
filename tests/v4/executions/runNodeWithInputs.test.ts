/**
 * Port of tests-v3-archive/executions/runNodeWithInputs.test.ts.
 *
 * v3 client.runNodeWithInputs(p) -> v4 client.nodes.run(p).
 *
 * The v3 file was specifically about the `isSimulated` toggle on
 * ContractWrite. In v4 nodes.run always simulates (Tenderly for
 * contract writes, chain_rpc for reads); a real bundler submission
 * only happens through workflows.trigger. The port captures both
 * behaviors and asserts the provider field accordingly.
 */

import { Client, Nodes } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  getSmartWallet,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

const USDC_SEPOLIA = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const APPROVE_ABI = [
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

describe("nodes.run (provider routing)", () => {
  let client: Client;
  let eoaAddress: string;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    eoaAddress = getEOAAddress();
  });

  test("Balance node always uses chain_rpc (read-only)", async () => {
    const wallet = await getSmartWallet(client);
    const result = await client.nodes.run({
      node: Nodes.balance({
        id: "b",
        name: "balance",
        address: wallet.address,
        chain: "sepolia",
        includeSpam: false,
        includeZeroBalances: false,
      }),
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    if (!result.success && /moralis/i.test(result.error ?? "")) {
      console.log(`Skipping — Moralis error: ${result.error}`);
      return;
    }
    expect(result.success).toBe(true);
    const ctx = result.executionContext as Record<string, unknown>;
    expect(ctx.provider).toBe("chain_rpc");
  });

  test("ContractWrite routes through Tenderly (is_simulated=true)", async () => {
    const wallet = await getSmartWallet(client, { saltValue: "2" });
    const result = await client.nodes.run({
      node: Nodes.contractWrite({
        id: "w",
        name: "approve",
        contractAddress: USDC_SEPOLIA,
        contractAbi: APPROVE_ABI,
        methodCalls: [{ methodName: "approve", methodParams: [eoaAddress, "1000000"] }],
      }),
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    expect(result.success).toBe(true);
    const ctx = result.executionContext as Record<string, unknown>;
    // contractWrite simulation always goes through Tenderly in v4.
    expect(ctx.provider).toBe("tenderly");
    expect(ctx.is_simulated).toBe(true);
  });
});
