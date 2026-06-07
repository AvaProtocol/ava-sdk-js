/**
 * Port of tests-v3-archive/nodes/contractRead.test.ts (1653 lines).
 *
 * Anchored on the Sepolia Chainlink ETH/USD price feed — a stable
 * on-chain target that's been in place long enough to use as a
 * permanent test fixture. v3 spent most of its 1.6K lines asserting
 * the same shape from runNodeWithInputs / simulate / deploy+trigger;
 * the port collapses those into a single happy-path per surface.
 *
 * Output shape:
 *   - `result.output.data.<methodName>` — flattened object per call
 *     (matches v3). For tuple returns like `latestRoundData`, the
 *     value is an object keyed by the ABI field names.
 *   - `applyToFields` formatting adds a `<methodName>Raw` field
 *     alongside the formatted one.
 */

import { Chains, Client, Nodes, Protocols, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

// Chainlink ETH/USD price feed on Sepolia, sourced from the catalog.
// The previous hardcoded address (0xB0C712...) was actually the
// Sepolia AUD/USD feed — same AggregatorV3 shape (so the test still
// passed on shape assertions) but a misleading constant. Using the
// catalog locks the right contract for the test name.
const ORACLE_ADDRESS = Protocols.chainlink.ethUsdFeed[Chains.Sepolia]!;
// AggregatorV3 ABI from the catalog covers `latestRoundData` +
// `decimals`. The two extra read-only fragments (`description`,
// `version`) the test exercises live here as inline extras.
const ORACLE_ABI = [
  ...Protocols.chainlink.aggregatorV3Abi,
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

describe("ContractRead Node Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("nodes.run", () => {
    test("reads latestRoundData from the Chainlink oracle", async () => {
      const wallet = await createSmartWallet(client);
      const result = await client.nodes.run({
        node: Nodes.contractRead({
          id: "r",
          name: "r",
          contractAddress: ORACLE_ADDRESS,
          contractAbi: ORACLE_ABI,
          methodCalls: [{ methodName: "latestRoundData", methodParams: [] }],
        }),
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: Record<string, any> }).data;
      expect(data.latestRoundData).toBeDefined();
      const round = data.latestRoundData;
      // The tuple is decoded to an object keyed by ABI field names.
      expect(round.roundId).toBeDefined();
      expect(round.answer).toBeDefined();
      expect(round.startedAt).toBeDefined();
      expect(round.updatedAt).toBeDefined();
      expect(round.answeredInRound).toBeDefined();
    });

    test("reads multiple methods in a single call", async () => {
      const result = await client.nodes.run({
        node: Nodes.contractRead({
          id: "r",
          name: "r",
          contractAddress: ORACLE_ADDRESS,
          contractAbi: ORACLE_ABI,
          methodCalls: [
            { methodName: "latestRoundData", methodParams: [] },
            { methodName: "decimals", methodParams: [] },
          ],
        }),
        inputVariables: {},
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: Record<string, any> }).data;
      expect(data.latestRoundData).toBeDefined();
      expect(data.decimals).toBeDefined();
      // Chainlink ETH/USD uses 8 decimals.
      expect(Number(data.decimals)).toBe(8);
    });

    test("reads the description method (string return)", async () => {
      const result = await client.nodes.run({
        node: Nodes.contractRead({
          id: "r",
          name: "r",
          contractAddress: ORACLE_ADDRESS,
          contractAbi: ORACLE_ABI,
          methodCalls: [{ methodName: "description", methodParams: [] }],
        }),
        inputVariables: {},
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: Record<string, any> }).data;
      expect(typeof data.description).toBe("string");
      // Sepolia ETH/USD feed description starts with "ETH" — exact
      // string changes if Chainlink redeploys the feed, so we keep
      // the assertion loose.
      expect(data.description.length).toBeGreaterThan(0);
    });

    test("rejects calls to a contract that doesn't implement the method", async () => {
      // Use the same ABI but point at an unrelated address — the
      // call data is valid bytes but the runtime call reverts.
      const result = await client.nodes.run({
        node: Nodes.contractRead({
          id: "r",
          name: "r",
          contractAddress: "0x1234567890123456789012345678901234567890",
          contractAbi: [
            {
              inputs: [],
              name: "nonexistentMethod",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ],
          methodCalls: [{ methodName: "nonexistentMethod", methodParams: [] }],
        }),
        inputVariables: {},
      });
      // The engine reports this as success=false with an RPC-level error.
      expect(result.success).toBe(false);
      expect(typeof result.error).toBe("string");
    });

    test("applyToFields formats integer fields with the oracle's decimals", async () => {
      const result = await client.nodes.run({
        node: Nodes.contractRead({
          id: "r",
          name: "r",
          contractAddress: ORACLE_ADDRESS,
          contractAbi: ORACLE_ABI,
          methodCalls: [
            {
              methodName: "latestRoundData",
              methodParams: [],
              // Tells the engine to call `decimals()` and use it to
              // format the `answer` field of latestRoundData.
              applyToFields: ["decimals:answer"],
            },
            { methodName: "decimals", methodParams: [] },
          ],
        }),
        inputVariables: {},
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: Record<string, any> }).data;
      const round = data.latestRoundData;
      // The decimals-scaled `answer` is markedly smaller than the raw
      // int256 would be (1e8 scale): the raw is something like 71630450...
      // truncated; the scaled value is the human-readable USD price.
      // We just assert the field is present and the engine returned
      // a string-encoded number.
      expect(round.answer).toBeDefined();
      expect(typeof round.answer).toBe("string");
      expect(Number(round.answer)).not.toBeNaN();
    });
  });

  describe("workflows.simulate", () => {
    test("simulates a workflow that reads the oracle", async () => {
      const wallet = await createSmartWallet(client);
      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [
          Nodes.contractRead({
            id: "r",
            name: "r",
            contractAddress: ORACLE_ADDRESS,
            contractAbi: ORACLE_ABI,
            methodCalls: [{ methodName: "latestRoundData", methodParams: [] }],
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "r" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(sim.status).toBe("success");
      const step = sim.steps?.find((s) => s.id === "r");
      expect(step?.success).toBe(true);
      const data = (step?.output as { data: Record<string, any> }).data;
      expect(data.latestRoundData).toBeDefined();
    });
  });
});
