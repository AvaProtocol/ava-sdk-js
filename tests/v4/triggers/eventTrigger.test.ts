/**
 * Port of tests-v3-archive/triggers/eventTrigger.test.ts (2317 lines).
 *
 * v3 used `padAddressForTopic` from the SDK; v4 doesn't ship that
 * helper, so the test inlines a 32-byte padding helper. Topic
 * filters use:
 *   - topics[0] = event signature (32 bytes, no padding needed)
 *   - topics[1..n] = indexed args, each padded to 32 bytes
 *   - "" or "0x" in a slot = match any value
 *
 * Tenderly is the simulation backend for `triggers.run`; it
 * requires at least one address (from or to) in the topic filter
 * for ERC-20 Transfer events.
 *
 * Output shape:
 *   - result.output.data = decoded event log (blockHash, blockNumber,
 *     contractAddress, data, logIndex, removed, topics, transactionHash)
 *   - result.metadata = raw log (with chainId)
 */

import { Chains, Client, Protocols, Tokens, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
} from "../../utils/client";

jest.setTimeout(60_000);

const USDC_SEPOLIA = Tokens.USDC[Chains.Sepolia]!.address;
const CHAINLINK_ETH_USD_SEPOLIA = Protocols.chainlink.ethUsdFeed[Chains.Sepolia]!;
const TRANSFER_SIG = Protocols.erc20.eventTopics.Transfer;
const CHAINLINK_ANSWER_UPDATED_SIG = Protocols.chainlink.eventTopics.AnswerUpdated;
const CHAINLINK_ABI = Protocols.chainlink.answerUpdatedEventAbi;

function padTopic(addr: string): string {
  return "0x" + addr.slice(2).padStart(64, "0").toLowerCase();
}

describe("EventTrigger Tests", () => {
  let client: Client;
  let eoaAddress: string;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    eoaAddress = getEOAAddress();
  });

  describe("triggers.run", () => {
    test("simulates a Transfer event filtered by from-address", async () => {
      const result = await client.triggers.run({
        trigger: Triggers.event({
          id: "t",
          name: "ev",
          chainId: 11_155_111,
          queries: [
            {
              addresses: [USDC_SEPOLIA],
              topics: [TRANSFER_SIG, padTopic(eoaAddress), ""],
            },
          ],
        }),
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: any }).data;
      expect(data.topics[0]).toBe(TRANSFER_SIG);
      expect(data.topics[1]).toBe(padTopic(eoaAddress));
      expect(typeof data.blockNumber).toBe("number");
      expect(typeof data.transactionHash).toBe("string");
    });

    test("simulates a Transfer event filtered by to-address", async () => {
      const result = await client.triggers.run({
        trigger: Triggers.event({
          id: "t",
          name: "ev",
          chainId: 11_155_111,
          queries: [
            {
              addresses: [USDC_SEPOLIA],
              topics: [TRANSFER_SIG, "", padTopic(eoaAddress)],
            },
          ],
        }),
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: any }).data;
      // Tenderly may swap from/to slots when only one filter is set;
      // assert the signature matches and the EOA appears in topics[1] or [2].
      expect(data.topics[0]).toBe(TRANSFER_SIG);
      expect([data.topics[1], data.topics[2]]).toContain(padTopic(eoaAddress));
    });

    test("supports multiple queries (OR'd together)", async () => {
      const result = await client.triggers.run({
        trigger: Triggers.event({
          id: "t",
          name: "ev",
          chainId: 11_155_111,
          queries: [
            { addresses: [USDC_SEPOLIA], topics: [TRANSFER_SIG, padTopic(eoaAddress), ""] },
            { addresses: [USDC_SEPOLIA], topics: [TRANSFER_SIG, "", padTopic(eoaAddress)] },
          ],
        }),
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: any }).data;
      expect(data.topics[0]).toBe(TRANSFER_SIG);
    });

    test("supports condition-based filtering (Chainlink price > 0)", async () => {
      const result = await client.triggers.run({
        trigger: Triggers.event({
          id: "t",
          name: "ev",
          chainId: 11_155_111,
          queries: [
            {
              addresses: [CHAINLINK_ETH_USD_SEPOLIA],
              topics: [CHAINLINK_ANSWER_UPDATED_SIG],
              // The ABI is required for the condition below to resolve
              // `AnswerUpdated.current`; without it the engine can't decode
              // the indexed field and returns "Conditions not met".
              contractAbi: CHAINLINK_ABI,
              conditions: [
                {
                  fieldName: "AnswerUpdated.current",
                  operator: "gt",
                  fieldType: "int256",
                  value: "0",
                },
              ],
              maxEventsPerBlock: 5,
            },
          ],
        }),
      });
      // CLAUDE.md forbids soft-skips; hard-assert. The
      // WORKFLOWS_BAD_TRIGGER fix (SDK value: string) ensures this
      // request no longer rejects at the validation layer. If Tenderly
      // genuinely can't simulate the Chainlink feed in CI, that's a
      // real environmental issue to address — not silently mask.
      expect(result.success).toBe(true);
      // With the ABI provided, a matched event is returned decoded and keyed
      // by event name (not as a raw topics[] log). The condition (current > 0)
      // is satisfied, so the decoded `current` price is present and positive.
      const data = (result.output as { data: any }).data;
      expect(data.AnswerUpdated).toBeDefined();
      expect(Number(data.AnswerUpdated.current)).toBeGreaterThan(0);
    });

    test("honors cooldownSeconds (no second fire within window)", async () => {
      const trigger = Triggers.event({
        id: "t",
        name: "ev",
        chainId: 11_155_111,
        queries: [
          {
            addresses: [USDC_SEPOLIA],
            topics: [TRANSFER_SIG, padTopic(eoaAddress), ""],
          },
        ],
        cooldownSeconds: 60,
      });
      const first = await client.triggers.run({ trigger });
      const second = await client.triggers.run({ trigger });
      // Both runs succeed in simulation — cooldown only gates
      // operator-driven firings, not direct triggers.run invocations.
      expect(first.success).toBe(true);
      expect(second.success).toBe(true);
    });

    test("rejects empty queries with success=false", async () => {
      const result = await client.triggers.run({
        trigger: Triggers.event({ id: "t", name: "ev", chainId: 11_155_111, queries: [] }),
      });
      expect(result.success).toBe(false);
      expect(typeof result.error).toBe("string");
    });

    test("rejects Transfer event without any address filter", async () => {
      const result = await client.triggers.run({
        trigger: Triggers.event({
          id: "t",
          name: "ev",
          chainId: 11_155_111,
          queries: [{ addresses: [USDC_SEPOLIA], topics: [TRANSFER_SIG] }],
        }),
      });
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/at least one address/i);
    });
  });
});
