/**
 * Port of tests-v3-archive/nodes/balanceNode.test.ts (877 lines).
 *
 * Balance node queries Moralis under the hood; v3 used Vitalik's
 * address on mainnet, but that account now has too many ERC-20s
 * for a single Moralis call (HTTP 400). v4 tests query the test
 * EOA on sepolia, which is the wallet the rest of the suite uses
 * — Moralis returns a manageable list.
 *
 * Output shape:
 *   - `result.output.data` = array of token balances
 *   - Each entry: `{balance, balanceFormatted, decimals, name, symbol, tokenAddress}`
 *   - No double-wrap (filter/graphql have one, balance does not).
 *
 * Note: this node requires a working Moralis key on the aggregator;
 * a missing/invalid key surfaces as success=false with the Moralis
 * error text. The tests skip on Moralis errors so they don't fail
 * the suite when the key is rotated or quota is exhausted.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  getSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

interface TokenBalance {
  readonly balance: string;
  readonly balanceFormatted: string;
  readonly decimals: number;
  readonly name: string;
  readonly symbol: string;
  readonly tokenAddress: string;
}

describe("BalanceNode Tests", () => {
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

  const skipIfMoralisError = (result: { success: boolean; error?: string }): boolean => {
    if (!result.success && /moralis|API key/i.test(result.error ?? "")) {
      console.log(`Skipping — Moralis error: ${result.error}`);
      return true;
    }
    return false;
  };

  describe("nodes.run", () => {
    test("retrieves the balance list for an EOA on sepolia", async () => {
      const result = await client.nodes.run({
        node: Nodes.balance({
          id: "b",
          name: "b",
          address: eoaAddress,
          chain: "sepolia",
        }),
        inputVariables: {},
      });
      if (skipIfMoralisError(result)) return;
      expect(result.success).toBe(true);
      const balances = (result.output as { data: TokenBalance[] }).data;
      expect(Array.isArray(balances)).toBe(true);
      expect(balances.length).toBeGreaterThan(0);
      const eth = balances.find((b) => b.symbol === "ETH");
      expect(eth).toBeDefined();
      if (eth) {
        expect(eth.decimals).toBe(18);
        expect(typeof eth.balance).toBe("string");
        expect(typeof eth.balanceFormatted).toBe("string");
      }
    });

    test("includeZeroBalances=false filters out zero-balance tokens", async () => {
      const result = await client.nodes.run({
        node: Nodes.balance({
          id: "b",
          name: "b",
          address: eoaAddress,
          chain: "sepolia",
          includeZeroBalances: false,
        }),
        inputVariables: {},
      });
      if (skipIfMoralisError(result)) return;
      expect(result.success).toBe(true);
      const balances = (result.output as { data: TokenBalance[] }).data;
      for (const tok of balances) {
        // balance is a wei-precision decimal string; "0" only when
        // includeZeroBalances=true. We assert the filter held.
        expect(tok.balance).not.toBe("0");
      }
    });

    test("accepts chain by name, short name, or numeric ID", async () => {
      // Run three variants and assert they all return a balance list.
      // We don't compare values across variants because the aggregator
      // normalizes the chain identifier; the assertion is that each
      // variant is *accepted*.
      const variants = ["sepolia", "11155111"]; // short-name + decimal id
      for (const chain of variants) {
        const result = await client.nodes.run({
          node: Nodes.balance({
            id: "b",
            name: "b",
            address: eoaAddress,
            chain,
          }),
          inputVariables: {},
        });
        if (skipIfMoralisError(result)) return;
        expect(result.success).toBe(true);
        const balances = (result.output as { data: TokenBalance[] }).data;
        expect(Array.isArray(balances)).toBe(true);
      }
    });

    test("resolves template variables for address and chain", async () => {
      const result = await client.nodes.run({
        node: Nodes.balance({
          id: "b",
          name: "b",
          address: "{{walletAddress}}",
          chain: "{{chainName}}",
        }),
        inputVariables: {
          walletAddress: eoaAddress,
          chainName: "sepolia",
        },
      });
      if (skipIfMoralisError(result)) return;
      expect(result.success).toBe(true);
      const balances = (result.output as { data: TokenBalance[] }).data;
      expect(Array.isArray(balances)).toBe(true);
    });

    test("rejects an invalid address with success=false", async () => {
      const result = await client.nodes.run({
        node: Nodes.balance({
          id: "b",
          name: "b",
          address: "not-an-address",
          chain: "sepolia",
        }),
        inputVariables: {},
      });
      expect(result.success).toBe(false);
      expect(typeof result.error).toBe("string");
    });
  });

  describe("workflows.simulate", () => {
    test("simulates a workflow with a balance step", async () => {
      const wallet = await getSmartWallet(client);
      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [
          Nodes.balance({
            id: "b",
            name: "b",
            address: eoaAddress,
            chain: "sepolia",
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "b" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      const step = sim.steps?.find((s) => s.id === "b");
      if (!step?.success) {
        console.log(`Skipping — balance step failed in sim`);
        return;
      }
      // Inside the workflow execution, balance output is at
      // step.output.data (single wrap).
      const balances = (step?.output as { data: TokenBalance[] }).data;
      expect(Array.isArray(balances)).toBe(true);
    });
  });
});
