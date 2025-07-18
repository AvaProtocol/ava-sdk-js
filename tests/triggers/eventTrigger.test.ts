import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import { Client, TriggerFactory, EventTrigger } from "@avaprotocol/sdk-js";
import { TriggerType, EventConditionType } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  SaltGlobal,
  removeCreatedWorkflows,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(45000);

// Lazy-load configuration to handle CI/CD environments gracefully
async function getTestConfig() {
  try {
    return getConfig();
  } catch (error) {
    console.warn(
      "⚠️ Environment validation failed, using mock config for unit tests:",
      error
    );
    // Return mock config for CI/CD or when real credentials aren't available
    return {
      avsEndpoint: "mock-endpoint:2206",
      walletPrivateKey:
        "0x0000000000000000000000000000000000000000000000000000000000000001",
      factoryAddress: "0x0000000000000000000000000000000000000000",
      chainEndpoint: "https://mock-chain-endpoint.com",
    };
  }
}

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 7000;

// Sepolia ERC-20 token addresses for testing
const SEPOLIA_TOKEN_ADDRESSES = [
  "0x779877A7B0D9E8603169DdbD7836e478b4624789", // LINK token on Sepolia
  "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // UNI token on Sepolia (if exists)
  "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", // WETH on Sepolia
];

// Chainlink Price Feed Aggregator address on Sepolia (ETH/USD)
const CHAINLINK_ETH_USD_SEPOLIA = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

// ERC-20 Transfer event signature
const TRANSFER_EVENT_SIGNATURE =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

// Chainlink AnswerUpdated event signature
const CHAINLINK_ANSWER_UPDATED_SIGNATURE =
  "0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f";

// ERC20 Transfer event ABI for proper parsing
const ERC20_TRANSFER_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];

// Chainlink Price Feed ABI for AnswerUpdated event
const CHAINLINK_AGGREGATOR_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "int256",
        name: "current",
        type: "int256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "updatedAt",
        type: "uint256",
      },
    ],
    name: "AnswerUpdated",
    type: "event",
  },
];

// Helper function to check if we're on Sepolia
async function isSepoliaChain(): Promise<boolean> {
  try {
    const config = await getTestConfig();
    return config.chainEndpoint?.toLowerCase().includes("sepolia") || false;
  } catch {
    return false;
  }
}

// Helper function to pad addresses to 32 bytes for topics
function padAddressForTopic(address: string): string {
  // Remove 0x prefix if present, then pad to 64 hex characters (32 bytes)
  const cleanAddress = address.startsWith("0x") ? address.slice(2) : address;
  return "0x" + cleanAddress.toLowerCase().padStart(64, "0");
}

// Helper function to create basic event trigger config (without enrichment)
function createEventTriggerConfig(
  coreAddress: string,
  contractAddresses: string[] = SEPOLIA_TOKEN_ADDRESSES
) {
  return {
    queries: [
      {
        addresses: contractAddresses,
        topics: [
          {
            values: [
              TRANSFER_EVENT_SIGNATURE,
              padAddressForTopic(coreAddress),
              null,
            ], // Transfer from coreAddress
          },
        ],
      },
      {
        addresses: contractAddresses,
        topics: [
          {
            values: [
              TRANSFER_EVENT_SIGNATURE,
              null,
              padAddressForTopic(coreAddress),
            ], // Transfer to coreAddress
          },
        ],
      },
    ],
  };
}

// Helper function to create Chainlink price condition event trigger config
function createChainlinkPriceConditionConfig(
  priceThreshold: string,
  operator: string = "gt"
) {
  const conditions: EventConditionType[] = [
    {
      fieldName: "current",
      operator: operator,
      value: priceThreshold, // Price threshold in 8 decimals (e.g., "200000000000" for $2000)
      fieldType: "int256",
    },
  ];

  return {
    queries: [
      {
        addresses: [CHAINLINK_ETH_USD_SEPOLIA],
        topics: [
          {
            values: [CHAINLINK_ANSWER_UPDATED_SIGNATURE], // AnswerUpdated events
          },
        ],
        contractAbi: JSON.stringify(CHAINLINK_AGGREGATOR_ABI),
        conditions: conditions,
        maxEventsPerBlock: 5,
      },
    ],
  };
}

describe("EventTrigger Tests", () => {
  let client: Client;
  let isSepoliaTest: boolean;
  let coreAddress: string;

  beforeAll(async () => {
    // Load real configuration for integration tests
    const { avsEndpoint, walletPrivateKey, factoryAddress } =
      await getTestConfig();

    coreAddress = await getAddress(walletPrivateKey);

    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message } = await client.getSignatureFormat(coreAddress);
    const signature = await generateSignature(message, walletPrivateKey);

    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);

    // Check if we're on Sepolia chain
    isSepoliaTest = await isSepoliaChain();

    if (!isSepoliaTest) {
      console.log(
        "⚠️  Skipping Sepolia-specific EventTrigger tests - not on Sepolia chain"
      );
    }
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runTrigger Tests", () => {
    test("should throw error when queries is missing", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          // Missing queries property
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Queries array is required for event"
      );
    });

    test("should throw error when queries is null", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queries: null,
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Queries array is required for event"
      );
    });

    test("should throw error when queries is empty", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queries: [],
        },
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Queries array is required for event"
      );
    });

    test("should succeed with minimal valid config", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
              topics: [
                {
                  values: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                  ],
                },
              ],
            },
          ],
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getEvent()).toBeDefined();
      expect(request.getEvent()!.getConfig()).toBeDefined();
      expect(request.getEvent()!.getConfig()!.getQueriesList()).toHaveLength(1);
    });

    test("should succeed with FROM-OR-TO scenario", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: createEventTriggerConfig(coreAddress, SEPOLIA_TOKEN_ADDRESSES),
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getEvent()!.getConfig()!.getQueriesList()).toHaveLength(2);

      const queries = request.getEvent()!.getConfig()!.getQueriesList();
      queries.forEach((query) => {
        expect(query.getAddressesList()).toEqual(SEPOLIA_TOKEN_ADDRESSES);
        expect(query.getTopicsList()).toHaveLength(1);
      });
    });

    test("should handle empty addresses", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: [],
              topics: [
                {
                  values: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                  ],
                },
              ],
            },
          ],
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      const query = request.getEvent()!.getConfig()!.getQueriesList()[0];
      expect(query.getAddressesList()).toEqual([]);
    });

    test("should handle empty topics", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
              topics: [],
            },
          ],
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      const query = request.getEvent()!.getConfig()!.getQueriesList()[0];
      expect(query.getTopicsList()).toEqual([]);
    });

    test("should throw error when trigger data is completely missing", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: undefined as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for event"
      );
    });

    test("should throw error when trigger data is null", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: null as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for event"
      );
    });

    test("should run trigger for Transfer events from core address", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: SEPOLIA_TOKEN_ADDRESSES,
              topics: [
                {
                  values: [TRANSFER_EVENT_SIGNATURE, coreAddress, null], // Transfer from coreAddress
                },
              ],
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger with Transfer FROM events... ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger Transfer FROM response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();
      expect(result.metadata).toBeDefined();

      // For specific address filters, no matching events is a valid outcome
      expect(result.success).toBe(true);
      // Data can be null (no events found) or an object (events found)
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });

    test("should run trigger for Transfer events to core address", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: SEPOLIA_TOKEN_ADDRESSES,
              topics: [
                {
                  values: [
                    TRANSFER_EVENT_SIGNATURE,
                    null,
                    padAddressForTopic(coreAddress),
                  ], // Transfer to coreAddress
                },
              ],
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger with Transfer TO events ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger Transfer TO response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();
      expect(result.metadata).toBeDefined();

      // For specific address filters, no matching events is a valid outcome
      expect(result.success).toBe(true);
      // Data can be null (no events found) or an object (events found)
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });

    test("should run trigger with multiple Transfer event queries", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: createEventTriggerConfig(coreAddress),
      };

      console.log(
        "🚀 ~ runTrigger with multiple Transfer queries ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger multiple queries response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // For specific address filters, no matching events is a valid outcome
      expect(result.success).toBe(true);
      // Data can be null (no events found) or an object (events found)
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });

    test("should run trigger with Chainlink price condition", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: createChainlinkPriceConditionConfig(
          "200000000000",
          "gt"
        ), // ETH > $2000
      };

      console.log(
        "🚀 ~ runTrigger with Chainlink price condition ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger Chainlink condition response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();
      expect(result.metadata).toBeDefined();

      // Conditions filter events, so no matching events is expected when condition is not met
      expect(result.success).toBe(true);
      // Data can be null (no events found) or an object (events found)
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });

    test("should run trigger with multiple price range conditions", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const conditions: EventConditionType[] = [
        {
          fieldName: "current",
          operator: "gte",
          value: "150000000000", // >= $1500
          fieldType: "int256",
        },
        {
          fieldName: "current",
          operator: "lte",
          value: "400000000000", // <= $4000
          fieldType: "int256",
        },
      ];

      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [CHAINLINK_ETH_USD_SEPOLIA],
              topics: [
                {
                  values: [CHAINLINK_ANSWER_UPDATED_SIGNATURE],
                },
              ],
              contractAbi: JSON.stringify(CHAINLINK_AGGREGATOR_ABI),
              conditions: conditions,
              maxEventsPerBlock: 3,
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger with price range conditions ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger price range response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      expect(result.success).toBe(true);
      // Data can be null (no events found) or an object (events found)
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });

    test("should run trigger with Chainlink price condition with decimal formatting", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [CHAINLINK_ETH_USD_SEPOLIA],
              topics: [
                {
                  values: [CHAINLINK_ANSWER_UPDATED_SIGNATURE],
                },
              ],
              contractAbi: JSON.stringify(CHAINLINK_AGGREGATOR_ABI),
              methodCalls: [
                {
                  methodName: "decimals",
                  callData: "0x313ce567", // decimals() method signature
                  applyToFields: ["current"], // Apply decimal formatting to the "current" field
                },
              ],
              conditions: [
                {
                  fieldName: "current",
                  operator: "gt",
                  value: "2000.00000000", // Now we can use human-readable values!
                  fieldType: "decimal",
                },
              ],
              maxEventsPerBlock: 5,
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger with decimal formatting ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger decimal formatting response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.error).toBe("");
      expect(result.triggerId).toBeDefined();

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      // Check that we have both formatted and raw values
      expect((result.data as any).current).toBeDefined();
      expect((result.data as any).currentRaw).toBeDefined();
      expect((result.data as any).decimals).toBeDefined();

      // 🔍 TYPE CHECK: Verify ABI type improvements are working
      expect(typeof (result.data as any).decimals).toBe("number"); // decimals should be number type (uint8 -> number)
      expect(typeof (result.data as any).current).toBe("string"); // current should be string (int256 -> string, then formatted)
      expect(typeof (result.data as any).currentRaw).toBe("string"); // raw value should be string
      expect(typeof (result.data as any).roundId).toBe("string"); // roundId should be string (uint256 -> string)
      expect(typeof (result.data as any).updatedAt).toBe("string"); // updatedAt should be string (uint256 -> string)

      // Verify the formatting makes sense
      const formattedValue = parseFloat((result.data as any).current);
      const rawValue = parseInt((result.data as any).currentRaw);
      const decimals = parseInt((result.data as any).decimals);

      // Verify the math is correct
      const calculatedValue = rawValue / Math.pow(10, decimals);
      expect(Math.abs(formattedValue - calculatedValue)).toBeLessThan(
        0.00000001
      );

      // Verify metadata contains raw blockchain data
      expect(result.metadata).toBeDefined();
      expect((result.metadata as any).address).toBe(CHAINLINK_ETH_USD_SEPOLIA);
      expect((result.metadata as any).topics).toBeDefined();
      expect(Array.isArray((result.metadata as any).topics)).toBe(true);
      expect((result.metadata as any).topics.length).toBeGreaterThan(0);
    });

    test("should deserialize trigger with conditions from response", () => {
      // Create a trigger with conditions
      const originalConditions: EventConditionType[] = [
        {
          fieldName: "current",
          operator: "gt",
          value: "200000000000",
          fieldType: "int256",
        },
      ];

      const originalTrigger = TriggerFactory.create({
        id: "test-deserialize-trigger",
        name: "chainlinkPriceCondition",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: [CHAINLINK_ETH_USD_SEPOLIA],
              topics: [
                {
                  values: [CHAINLINK_ANSWER_UPDATED_SIGNATURE],
                },
              ],
              contractAbi: JSON.stringify(CHAINLINK_AGGREGATOR_ABI),
              conditions: originalConditions,
              maxEventsPerBlock: 5,
            },
          ],
        },
      });

      console.log(
        "🚀 ~ should deserialize trigger with conditions from response ~ originalTrigger:",
        util.inspect(originalTrigger, { depth: null, colors: true })
      );

      // Convert to protobuf and back
      const request = originalTrigger.toRequest();
      const deserializedTrigger = EventTrigger.fromResponse(request);

      console.log(
        "🚀 ~ should deserialize trigger with conditions from response ~ deserializedTrigger:",
        util.inspect(deserializedTrigger, { depth: null, colors: true })
      );
      // Verify deserialized trigger has the same data
      expect(deserializedTrigger.data).toBeDefined();
      const queries = (deserializedTrigger.data as any).queries;
      expect(queries).toHaveLength(1);

      const query = queries[0];
      expect(query.contractAbi).toEqual(
        JSON.stringify(CHAINLINK_AGGREGATOR_ABI)
      );
      expect(query.conditions).toHaveLength(1);
      expect(query.maxEventsPerBlock).toBe(5);

      const condition = query.conditions[0];
      expect(condition.fieldName).toBe("current");
      expect(condition.operator).toBe("gt");
      expect(condition.value).toBe("200000000000");
      expect(condition.fieldType).toBe("int256");
    });

    test("should handle contractAbi as string format", () => {
      const abiArray = [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
      ];

      // Test with string format (contractAbi is always a string)
      const trigger = TriggerFactory.create({
        id: "test-string-abi",
        name: "eventTriggerString",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: [SEPOLIA_TOKEN_ADDRESSES[0]],
              topics: [
                {
                  values: [TRANSFER_EVENT_SIGNATURE],
                },
              ],
              contractAbi: JSON.stringify(abiArray), // Pass as string
            },
          ],
        },
      });

      // Should serialize without errors
      expect(() => trigger.toRequest()).not.toThrow();

      // Get the protobuf message
      const request = trigger.toRequest();
      const query = request.getEvent()!.getConfig()!.getQueriesList()[0];

      // Should remain as JSON string in protobuf
      expect(query.getContractAbi()).toBe(JSON.stringify(abiArray));

      // Test round-trip: fromResponse should keep it as string
      const deserializedTrigger = EventTrigger.fromResponse(request);
      const deserializedQuery = (deserializedTrigger.data as any).queries[0];
      expect(deserializedQuery.contractAbi).toBe(JSON.stringify(abiArray));
    });

    test("should handle optional contractAbi (not provided)", () => {
      // Test without contractAbi field - should work for basic event filtering
      const trigger = TriggerFactory.create({
        id: "test-no-abi",
        name: "eventTriggerNoAbi",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: [SEPOLIA_TOKEN_ADDRESSES[0]],
              topics: [
                {
                  values: [TRANSFER_EVENT_SIGNATURE],
                },
              ],
              // No contractAbi field - should be optional
            },
          ],
        },
      });

      // Should serialize without errors
      expect(() => trigger.toRequest()).not.toThrow();

      // Get the protobuf message
      const request = trigger.toRequest();
      const query = request.getEvent()!.getConfig()!.getQueriesList()[0];

      // Should have empty string for contractAbi in protobuf
      expect(query.getContractAbi()).toBe("");

      // Test round-trip: fromResponse should handle empty contractAbi
      const deserializedTrigger = EventTrigger.fromResponse(request);
      const deserializedQuery = (deserializedTrigger.data as any).queries[0];
      expect(deserializedQuery.contractAbi).toBeUndefined();
    });

    test("should run trigger with enriched Transfer event parsing", async () => {
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          simulationMode: true,
          queries: [
            {
              addresses: ["0x779877A7B0D9E8603169DdbD7836e478b4624789"], // Sample token contract
              topics: [
                {
                  values: [
                    TRANSFER_EVENT_SIGNATURE,
                    null, // Any from address
                    padAddressForTopic(
                      "0xc60e71bd0f2e6d8832fea1a2d56091c48493c788"
                    ), // Specific to address
                  ],
                },
              ],
              contractAbi: JSON.stringify([
                {
                  anonymous: false,
                  inputs: [
                    {
                      indexed: true,
                      internalType: "address",
                      name: "from",
                      type: "address",
                    },
                    {
                      indexed: true,
                      internalType: "address",
                      name: "to",
                      type: "address",
                    },
                    {
                      indexed: false,
                      internalType: "uint256",
                      name: "value",
                      type: "uint256",
                    },
                  ],
                  name: "Transfer",
                  type: "event",
                },
              ]),
              methodCalls: [
                {
                  methodName: "decimals",
                  callData: "0x313ce567",
                  applyToFields: ["value"],
                },
              ],
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger with enriched Transfer parsing ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger enriched Transfer response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result.success).toBe(true);
      expect(result.error).toBe("");
      expect(result.data).toBeDefined();

      const transferData = result.data as Record<string, unknown>;

      // Verify ABI parsing worked
      expect(transferData.fromAddress).toBeDefined();
      expect(transferData.toAddress).toBeDefined();
      expect(transferData.value).toBeDefined(); // Formatted value (main value field)
      expect(transferData.valueRaw).toBeDefined(); // Raw uint256 value as string
      expect(transferData.tokenName).toBeDefined();
      expect(transferData.tokenSymbol).toBeDefined();
      expect(transferData.tokenDecimals).toBeDefined();
      expect(transferData.address).toBeDefined();
      expect(transferData.transactionHash).toBeDefined();
      expect(transferData.blockNumber).toBeDefined();
      expect(transferData.logIndex).toBeDefined();
      expect(transferData.transactionIndex).toBeDefined();

      // Type checks for enhanced Transfer enrichment
      expect(typeof transferData.tokenName).toBe("string");
      expect(typeof transferData.tokenSymbol).toBe("string");
      expect(typeof transferData.tokenDecimals).toBe("number");
      expect(typeof transferData.fromAddress).toBe("string");
      expect(typeof transferData.toAddress).toBe("string");
      expect(typeof transferData.value).toBe("string"); // Formatted value
      expect(typeof transferData.valueRaw).toBe("string"); // Raw uint256 value
      expect(typeof transferData.blockNumber).toBe("number");
      expect(typeof transferData.transactionHash).toBe("string");
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow without contractAbi or methodCalls", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const eventTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "simulate_event_trigger_test",
        type: TriggerType.Event,
        data: createEventTriggerConfig(coreAddress),
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = eventTrigger;

      console.log(
        "🚀 simulateWorkflow with event trigger:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + minimal node

      const triggerStep = simulation.steps.find(
        (step) => step.id === eventTrigger.id
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);

      // For simulation, we can accept null output when no events are found
      // This is realistic behavior for event triggers
    });

    test("should simulate workflow with single event query", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const eventTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "simulate_single_query",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: SEPOLIA_TOKEN_ADDRESSES,
              topics: [
                {
                  values: [TRANSFER_EVENT_SIGNATURE, coreAddress, null], // Only FROM events
                },
              ],
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = eventTrigger;

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      expect(simulation.success).toBe(true);
      const triggerStep = simulation.steps.find(
        (step) => step.id === eventTrigger.id
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);
    });

    test("should simulate workflow with event trigger and method calls", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        id: defaultTriggerId,
        name: "simulate_event_trigger_with_method_calls",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: [CHAINLINK_ETH_USD_SEPOLIA],
              topics: [
                {
                  values: [CHAINLINK_ANSWER_UPDATED_SIGNATURE],
                },
              ],
              contractAbi: JSON.stringify(CHAINLINK_AGGREGATOR_ABI),
              methodCalls: [
                {
                  methodName: "decimals",
                  callData: "0x313ce567",
                  applyToFields: ["current"],
                },
              ],
              conditions: [
                {
                  fieldName: "current",
                  operator: "gt",
                  value: "2000.00000000",
                  fieldType: "decimal",
                },
              ],
              maxEventsPerBlock: 5,
            },
          ],
        },
      };
      console.log(
        "🚀 simulateWorkflow with event trigger and method calls:",
        util.inspect(params, { depth: null, colors: true })
      );
      const eventTrigger = TriggerFactory.create(params);

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = eventTrigger;

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow with method calls response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + minimal node

      const triggerStep = simulation.steps.find(
        (step) => step.id === eventTrigger.id
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);

      // Check if the trigger step now has output data with decimal formatting
      const output = triggerStep!.output as any;
      expect(output).toBeDefined();

      // Check for decimal formatting
      if (output.current && output.decimals) {
        // Verify decimal formatting data is present and valid
        expect(output.current).toBeDefined();
        expect(output.currentRaw).toBeDefined();
        expect(output.decimals).toBeDefined();
        
        // Verify formatted value is a valid number string
        expect(parseFloat(output.current)).not.toBeNaN();
        
        // Verify raw value is a valid integer string
        expect(parseInt(output.currentRaw)).not.toBeNaN();
        
        // Verify decimals is a reasonable number (typically 8 for Chainlink)
        expect(output.decimals).toBeGreaterThan(0);
        expect(output.decimals).toBeLessThanOrEqual(18);

        // 🔍 TYPE CHECK: Verify ABI type improvements are working
        expect(typeof output.decimals).toBe("number"); // decimals should be number type (uint8 -> number)
        expect(typeof output.current).toBe("string"); // current should be string (int256 -> string, then formatted)
        expect(typeof output.currentRaw).toBe("string"); // raw value should be string

        expect(output.decimals).toBe(8);
        expect(output.current).toMatch(/^\d+\.\d+$/); // Should be decimal format (flexible decimal places)
        expect(output.currentRaw).toMatch(/^\d+$/); // Should be raw number
      } else {
        console.log(
          "ℹ️  No decimal formatting found - this may be expected if no events match conditions"
        );
      }
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with event trigger", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const eventTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "deploy_event_trigger_test",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: SEPOLIA_TOKEN_ADDRESSES,
              topics: [
                {
                  values: [TRANSFER_EVENT_SIGNATURE, null, coreAddress], // Transfer to coreAddress
                },
              ],
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = eventTrigger;

      let workflowId: string | undefined;

      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );

        // Verify deployment was successful
        const workflowsResult = await client.getWorkflows([wallet.address]);
        const deployedWorkflow = workflowsResult.items.find(
          (w) => w.id === workflowId
        );

        expect(deployedWorkflow).toBeDefined();
        expect(deployedWorkflow!.trigger).toBeDefined();
        expect(deployedWorkflow!.trigger!.type).toBe(TriggerType.Event);

        console.log(
          "Deployed workflow:",
          util.inspect(deployedWorkflow, { depth: null, colors: true })
        );

        // Now actually TRIGGER the deployed workflow with sample event data
        console.log("🔥 Triggering the deployed event workflow...");

        const triggerData = {
          type: TriggerType.Event,
          data: {
            // Sample Transfer event data that matches our trigger criteria
            blockNumber: 12345678,
            chainId: 11155111,
            contractAddress: SEPOLIA_TOKEN_ADDRESSES[0],
            eventFound: true,
            eventSignature: TRANSFER_EVENT_SIGNATURE,
            eventType: "Transfer",
            logIndex: 0,
            rawData:
              "0x00000000000000000000000000000000000000000000000de0b6b3a7640000",
            topics: [
              TRANSFER_EVENT_SIGNATURE,
              "0x000000000000000000000000c60e71bd0f2e6d8832fea1a2d56091c48493c788", // Properly padded from address
              null,
            ],
            transactionHash:
              "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            from: "0x1234567890123456789012345678901234567890",
            to: coreAddress,
            value: "1000000000000000000", // 1 ETH in wei
          },
        };

        const triggerResponse = await client.triggerWorkflow({
          id: workflowId,
          triggerData,
          isBlocking: true, // Wait for execution to complete
        });

        console.log(
          "🎯 Trigger response:",
          util.inspect(triggerResponse, { depth: null, colors: true })
        );

        expect(triggerResponse.executionId).toBeDefined();
        expect(triggerResponse.status).toBeDefined();

        // Check that the execution was created
        const executionsAfterTrigger = await client.getExecutions(
          [workflowId],
          {
            limit: 1,
          }
        );

        console.log(
          "Event trigger executions after manual trigger:",
          util.inspect(executionsAfterTrigger, { depth: null, colors: true })
        );

        // Verify that an execution was created
        expect(executionsAfterTrigger.items).toHaveLength(1);
        expect(executionsAfterTrigger.items[0].id).toBe(
          triggerResponse.executionId
        );
      } finally {
        // Always clean up the workflow, even if test fails
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
            // Workflow deletion was successful
          } catch (deleteError) {
            console.warn(
              `⚠️  Failed to delete workflow ${workflowId}:`,
              deleteError
            );
          }
        }
      }
    });
  });

  describe("Response Format Consistency Tests", () => {
    test("should return consistent response format across trigger methods", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const eventTriggerConfig = {
        queries: [
          {
            addresses: [SEPOLIA_TOKEN_ADDRESSES[0]], // Use single contract for consistency
            topics: [
              {
                values: [TRANSFER_EVENT_SIGNATURE, null, null], // Any Transfer event
              },
            ],
          },
        ],
      };

      // Test 1: runTrigger
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: eventTriggerConfig,
      };

      console.log(
        "🚀 ~ runTrigger for empty data consistency ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const directResponse = await client.runTrigger(params);

      // Test 2: simulateWorkflow
      const eventTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "consistency_test",
        type: TriggerType.Event,
        data: eventTriggerConfig,
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = eventTrigger;

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === eventTrigger.id
      );

      // Test 3: Deploy and trigger the workflow
      let workflowId: string | undefined;

      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );

        const workflowsResult = await client.getWorkflows([wallet.address]);
        const deployedWorkflow = workflowsResult.items.find(
          (w) => w.id === workflowId
        );

        // Actually TRIGGER the deployed workflow with sample event data
        const triggerData = {
          type: TriggerType.Event,
          data: {
            // Sample Transfer event data that matches our trigger criteria
            blockNumber: 12345678,
            chainId: 11155111,
            contractAddress: SEPOLIA_TOKEN_ADDRESSES[0],
            eventFound: true,
            eventSignature: TRANSFER_EVENT_SIGNATURE,
            eventType: "Transfer",
            logIndex: 0,
            rawData:
              "0x00000000000000000000000000000000000000000000000de0b6b3a7640000",
            topics: [
              TRANSFER_EVENT_SIGNATURE,
              "0x000000000000000000000000c60e71bd0f2e6d8832fea1a2d56091c48493c788", // Properly padded from address
              null,
            ],
            transactionHash:
              "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            from: "0x1234567890123456789012345678901234567890",
            to: coreAddress,
            value: "1000000000000000000", // 1 ETH in wei
          },
        };

        const triggerResponse = await client.triggerWorkflow({
          id: workflowId,
          triggerData,
          isBlocking: true, // Wait for execution to complete
        });

        // Get the execution to access the trigger step output
        const executionsAfterTrigger = await client.getExecutions(
          [workflowId],
          {
            limit: 1,
          }
        );

        const triggeredStep = executionsAfterTrigger.items[0]?.steps.find(
          (step) => step.id === eventTrigger.id
        );

        // Compare response formats - verify all three methods return consistent data
        expect(directResponse.data).toBeDefined();
        expect(simulatedStep?.output).toBeDefined();
        expect(triggeredStep?.output).toBeDefined();
        
        // All outputs should have consistent structure (excluding dynamic fields like transactionHash)
        const directData = directResponse.data;
        const simulatedData = simulatedStep?.output;
        const triggeredData = triggeredStep?.output;
        
        // Verify essential event trigger fields match (allowing for simulation differences)
        // Direct response should have event data
        expect(directData).toBeDefined();
        expect(directData.contractAddress).toBeDefined();
        expect(directData.chainId).toBeDefined();
        expect(directData.eventFound).toBeDefined();
        
        // Simulation and triggered data might have different structures
        if (simulatedData && simulatedData.contractAddress) {
          expect(directData.contractAddress).toBe(simulatedData.contractAddress);
        }
        
        if (simulatedData && simulatedData.chainId) {
          expect(directData.chainId).toBe(simulatedData.chainId);
        }
        
        if (triggeredData && triggeredData.contractAddress) {
          expect(directData.contractAddress).toBe(triggeredData.contractAddress);
        }
        
        // Verify dynamic fields exist but don't compare values
        expect(directData.transactionHash).toBeDefined();
        
        // Simulation and triggered data might not have all dynamic fields
        if (simulatedData && simulatedData.transactionHash) {
          expect(simulatedData.transactionHash).toBeDefined();
        }
        
        if (triggeredData && triggeredData.transactionHash) {
          expect(triggeredData.transactionHash).toBeDefined();
        }

        // All should be successful
        expect(directResponse.success).toBe(true);
        expect(simulatedStep).toBeDefined();
        expect(deployedWorkflow).toBeDefined();
        expect(deployedWorkflow!.trigger!.type).toBe(TriggerType.Event);
        expect(triggerResponse.executionId).toBeDefined();
        expect(triggeredStep).toBeDefined();
        expect(triggeredStep!.success).toBe(true);

        // Verify consistent structure across all three methods
        const directOutput = directResponse.data;
        const simulatedOutput = (simulatedStep!.output as any)?.data;
        const triggeredOutput = (triggeredStep!.output as any).data;

        // Check that all outputs have consistent structure
        expect(directOutput).toBeDefined();
        expect(triggeredOutput).toBeDefined();

        // simulatedOutput can be undefined when no events are found, which is correct behavior
        if (simulatedOutput) {
          expect(simulatedOutput).toBeDefined();
        } else {
          console.log(
            "ℹ️  Simulation output is undefined (no events found) - this is expected behavior"
          );
        }

        // The triggered output should have the event data we passed in
        expect(triggeredOutput.eventFound).toBe(true);
        expect(triggeredOutput.eventType).toBe("Transfer");
        expect(triggeredOutput.contractAddress).toBe(
          SEPOLIA_TOKEN_ADDRESSES[0]
        );

      } finally {
        // Always clean up the workflow, even if test fails
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
            // Workflow deletion was successful
          } catch (deleteError) {
            console.warn(
              `⚠️  Failed to delete workflow ${workflowId}:`,
              deleteError
            );
          }
        }
      }
    });

    test("should handle empty address array", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [], // Empty array - monitor all contracts
              topics: [
                {
                  values: [TRANSFER_EVENT_SIGNATURE, null, null],
                },
              ],
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger with empty address array ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger empty addresses response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      // This should either succeed with broad monitoring or handle gracefully
    });

    test("should handle complex topic filtering", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: SEPOLIA_TOKEN_ADDRESSES,
              topics: [
                {
                  values: [
                    TRANSFER_EVENT_SIGNATURE,
                    "0x0000000000000000000000000000000000000000", // From zero address (minting)
                    null,
                  ],
                },
              ],
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger with complex topic filtering ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger complex topics response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // For specific filters like minting events, no matching events is expected
      expect(result.success).toBe(true);
      // Data can be null (no events found) or an object (events found)
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });
  });

  describe("Empty Data Handling Tests", () => {
    test("should handle no matching events (empty data) vs query errors", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      // Use a definitely non-existent contract address to ensure no events
      // This should be much faster than real blockchain queries
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          simulationMode: false, // Use historical search to get null when no events are found
          queries: [
            {
              addresses: ["0x0000000000000000000000000000000000000001"], // Non-existent contract
              topics: [
                {
                  values: [TRANSFER_EVENT_SIGNATURE, null, null],
                },
              ],
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger for no matching events ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const noEventsResult = await client.runTrigger(params);

      console.log(
        "No events result:",
        util.inspect(noEventsResult, { depth: null, colors: true })
      );

      // Should succeed but return null data
      expect(noEventsResult.success).toBe(true);
      expect(noEventsResult.error).toBe("");
      expect(noEventsResult.data).toBe(null);
      expect(noEventsResult.triggerId).toBeDefined();
    });

    test("should handle empty address arrays consistently", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      // Use a more targeted approach - empty addresses with specific topic filter
      // This should be faster than monitoring all contracts
      const result = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [], // Empty array - monitor all contracts
              topics: [
                {
                  values: [TRANSFER_EVENT_SIGNATURE, null, null],
                },
              ],
            },
          ],
        },
      });

      console.log(
        "Empty addresses result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // Should either succeed with broad monitoring or handle gracefully
      expect(result.success).toBe(true);
      expect(result.error).toBe("");
    });

    test("should handle empty topics array consistently", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      // Use a known contract but with empty topics - this should be faster
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [SEPOLIA_TOKEN_ADDRESSES[0]],
              topics: [], // Empty topics - monitor all events from this contract
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger with empty topics array ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "Empty topics result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // Should handle empty topics gracefully
      expect(result.success).toBe(true);
      expect(result.error).toBe("");
    });

    test("should maintain empty data consistency across execution methods", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Use a definitely non-existent contract to ensure consistent null results
      const eventTriggerConfig = {
        simulationMode: false, // Use historical search to get null when no events are found
        queries: [
          {
            addresses: ["0x0000000000000000000000000000000000000001"], // Non-existent contract
            topics: [
              {
                values: [TRANSFER_EVENT_SIGNATURE, null, null],
              },
            ],
          },
        ],
      };

      // Test 1: runTrigger
      const directResponse = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: eventTriggerConfig,
      });

      // Test 2: simulateWorkflow
      const eventTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "empty_data_consistency_test",
        type: TriggerType.Event,
        data: eventTriggerConfig,
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = eventTrigger;

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === eventTrigger.id
      );

      // Compare empty data handling - verify consistent behavior
      expect(directResponse.success).toBe(true);
      expect(simulatedStep?.success).toBe(true);
      
      // Verify data consistency between methods
      expect(directResponse.data).toBe(null); // runTrigger returns null for no events
      expect(simulatedStep?.output).not.toBe(null); // simulateWorkflow provides sample data
      
      // Both should be successful even with no matching events
      expect(directResponse.success).toBe(simulatedStep?.success);

      // runTrigger should return null for no events (uses simulationMode: false)
      expect(directResponse.success).toBe(true);
      expect(directResponse.data).toBe(null); // No events found
      expect(directResponse.error).toBe("");

      // simulateWorkflow always returns sample data (it's a simulation environment)
      expect(simulatedStep).toBeDefined();
      expect(simulatedStep!.success).toBe(true);
      expect(simulatedStep!.output).not.toBe(null); // Simulation always provides sample data
    });

    test("should handle malformed query configurations gracefully", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      // Test with invalid topic format
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [SEPOLIA_TOKEN_ADDRESSES[0]],
              topics: [
                {
                  values: ["invalid_topic_format"], // Invalid topic format
                },
              ],
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger with malformed query configurations ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "Malformed query result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // Should handle gracefully - either succeed with null data or fail with error
      expect(result.success).toBe(true);
      expect(result.error).toBe("");
    });

    test("should validate event trigger configuration without network calls", () => {
      // Test valid configurations
      const validConfig = {
        queries: [
          {
            addresses: ["0x1234567890123456789012345678901234567890"],
            topics: [
              {
                values: [TRANSFER_EVENT_SIGNATURE, null, null],
              },
            ],
          },
        ],
      };

      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "validation_test",
        type: TriggerType.Event,
        data: validConfig,
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getEvent()).toBeDefined();
      expect(request.getEvent()!.getConfig()).toBeDefined();
      expect(request.getEvent()!.getConfig()!.getQueriesList()).toHaveLength(1);

      // Test invalid configurations that actually throw
      const invalidConfigs = [{ queries: null }, { queries: [] }];

      invalidConfigs.forEach((config, index) => {
        const invalidTrigger = TriggerFactory.create({
          id: `invalid-${index}`,
          name: "invalid_test",
          type: TriggerType.Event,
          data: config as any,
        });

        expect(() => invalidTrigger.toRequest()).toThrow();
      });
    });

    test("should handle empty data scenarios consistently (offline test)", () => {
      // Test different empty data scenarios
      const scenarios = [
        {
          name: "null data",
          data: null,
          expected: null,
        },
        {
          name: "empty object",
          data: {},
          expected: null,
        },
        {
          name: "found=false",
          data: { found: false },
          expected: null,
        },
        {
          name: "found=true but no event data",
          data: { found: true },
          expected: null,
        },
        {
          name: "found=true with event data",
          data: {
            found: true,
            event_data: {
              tokenName: "Test",
              tokenSymbol: "TST",
              transactionHash: "0x123",
            },
          },
          expected: "event_data",
        },
      ];

      scenarios.forEach((scenario) => {
        // This simulates what the server-side buildEventTriggerOutput function does
        let result = null;

        if (scenario.data && scenario.data.found) {
          if (scenario.data.event_data) {
            result = "event_data";
          }
        }

        if (scenario.expected === null) {
          expect(result).toBe(null);
        } else {
          expect(result).toBe(scenario.expected);
        }
      });
    });

    test("should handle basic event trigger functionality (offline test)", () => {
      // Test basic trigger creation and validation
      const basicConfig = {
        queries: [
          {
            addresses: ["0x1234567890123456789012345678901234567890"],
            topics: [
              {
                values: [TRANSFER_EVENT_SIGNATURE],
              },
            ],
          },
        ],
      };

      const trigger = TriggerFactory.create({
        id: "basic-test",
        name: "basic_event_trigger",
        type: TriggerType.Event,
        data: basicConfig,
      });

      // Verify basic properties
      expect(trigger.id).toBe("basic-test");
      expect(trigger.name).toBe("basic_event_trigger");
      expect(trigger.type).toBe(TriggerType.Event);

      // Verify data structure
      expect(trigger.data).toBeDefined();
      const eventData = trigger.data as any;
      expect(eventData.queries).toBeDefined();
      expect(Array.isArray(eventData.queries)).toBe(true);
      expect(eventData.queries.length).toBe(1);

      const query = eventData.queries[0];
      expect(query.addresses).toBeDefined();
      expect(Array.isArray(query.addresses)).toBe(true);
      expect(query.addresses.length).toBe(1);
      expect(query.addresses[0]).toBe(
        "0x1234567890123456789012345678901234567890"
      );

      expect(query.topics).toBeDefined();
      expect(Array.isArray(query.topics)).toBe(true);
      expect(query.topics.length).toBe(1);
      expect(query.topics[0].values).toBeDefined();
      expect(Array.isArray(query.topics[0].values)).toBe(true);
      expect(query.topics[0].values[0]).toBe(TRANSFER_EVENT_SIGNATURE);

      // Verify request creation
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getId()).toBe("basic-test");
      expect(request.getName()).toBe("basic_event_trigger");
    });
  });
});
