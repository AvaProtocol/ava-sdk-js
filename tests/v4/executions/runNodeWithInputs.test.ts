/** Standalone reads are supported; blockchain writes require a workflow. */

import { Chains, Client, Nodes, Protocols, Tokens } from "@avaprotocol/sdk-js";

import {
  getSuiteClient,
  createSmartWallet,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

const USDC_SEPOLIA = Tokens.USDC[Chains.Sepolia]!.address;
const APPROVE_ABI = Protocols.erc20.approveAbi;

describe("nodes.run (provider routing)", () => {
  let client: Client;
  let eoaAddress: string;

  beforeAll(async () => {
    ({ client, owner: eoaAddress } = await getSuiteClient());
  });

  test("Balance node always uses chain_rpc (read-only)", async () => {
    const wallet = await createSmartWallet(client);
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

  test("ContractWrite requires a complete workflow", async () => {
    await expect(client.nodes.run({
      node: Nodes.contractWrite({
        id: "w", name: "approve", chainId: Chains.Sepolia,
        contractAddress: USDC_SEPOLIA, contractAbi: APPROVE_ABI,
        methodCalls: [{ methodName: "approve", methodParams: [eoaAddress, "1000000"] }],
      }),
    })).rejects.toMatchObject({ status: 400, message: expect.stringContaining("complete workflow") });
  });
});
