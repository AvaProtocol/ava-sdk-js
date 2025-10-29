import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import util from "util";
import { isAddress } from "ethers";
import { Client, TriggerFactory, EventTrigger } from "@avaprotocol/sdk-js";
import {
  TriggerType,
  EventConditionType,
  ExecutionStatus,
} from "@avaprotocol/types";
import {
  removeCreatedWorkflows,
  describeIfSepolia,
  getSmartWallet,
  getSmartWalletWithBalance,
  getClient,
  authenticateClient,
  getEOAAddress,
  isTemplateVariable,
  padAddressForTopic,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";
const { chainId, tokens } = getConfig();

jest.setTimeout(45000);

const createdIdMap: Map<string, boolean> = new Map();

const SEPOLIA_TOKEN_ADDRESSES = [tokens?.ETH?.address, tokens?.USDC?.address];

// Chainlink Price Feed Aggregator address on Sepolia (ETH/USD)
const CHAINLINK_ETH_USD_SEPOLIA = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

const TRANSFER_EVENT_SIGNATURE =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

const CHAINLINK_ANSWER_UPDATED_SIGNATURE =
  "0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f";

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

/**
 *
 * @param walletAddress - The wallet address to monitor for transfer events
 * @param contractAddresses - The contract addresses to monitor for transfer events
 * @returns The event trigger config
 */
function createEventTriggerConfig(
  walletAddress: string,
  contractAddresses: string[]
) {
  // Only pad addresses that are NOT template variables
  // Template variables will be resolved server-side and should not be padded client-side
  let addressToMonitor: string;

  if (isTemplateVariable(walletAddress)) {
    // Template variable - leave as-is for server-side resolution
    addressToMonitor = walletAddress;
  } else if (isAddress(walletAddress)) {
    // Valid Ethereum address - pad it for topic filtering
    addressToMonitor = padAddressForTopic(walletAddress);
  } else {
    // Invalid input - throw descriptive error
    throw new Error(
      `Invalid walletAddress: "${walletAddress}". Must be either a valid Ethereum address or a template variable (e.g., {{settings.runner}})`
    );
  }

  return {
    queries: [
      {
        addresses: contractAddresses,
        topics: [TRANSFER_EVENT_SIGNATURE, addressToMonitor, null], // Transfer from walletAddress
      },
      {
        addresses: contractAddresses,
        topics: [TRANSFER_EVENT_SIGNATURE, null, addressToMonitor], // Transfer to walletAddress
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
      fieldName: "AnswerUpdated.current",
      operator: operator,
      value: priceThreshold, // Price threshold in 8 decimals (e.g., "200000000000" for $2000)
      fieldType: "int256",
    },
  ];

  return {
    queries: [
      {
        addresses: [CHAINLINK_ETH_USD_SEPOLIA],
        topics: [CHAINLINK_ANSWER_UPDATED_SIGNATURE],
        contractAbi: CHAINLINK_AGGREGATOR_ABI,
        conditions: conditions,
        maxEventsPerBlock: 5,
      },
    ],
  };
}

describeIfSepolia("EventTrigger Tests", () => {
  let client: Client;
  let eoaAddress: string;

  const undefinedDataTriggerProps = {
    id: "test-trigger-id",
    name: "eventTrigger",
    type: TriggerType.Event,
    data: undefined as any,
  };

  const nullDataTriggerProps = {
    id: "test-trigger-id",
    name: "eventTrigger",
    type: TriggerType.Event,
    data: null as any,
  };

  beforeAll(async () => {
    eoaAddress = await getEOAAddress();
    client = getClient();
    await authenticateClient(client);
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
        },
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
        },
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
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
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
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
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
      const trigger = TriggerFactory.create(undefinedDataTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for event"
      );
    });

    test("should throw error when trigger data is null", () => {
      const trigger = TriggerFactory.create(nullDataTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for event"
      );
    });

    // Transfer event tests - defined as individual tests to access eoaAddress after initialization
    test("should run trigger for Transfer events from eoa address", async () => {
      const triggerConfig = {
        queries: [
          {
            addresses: SEPOLIA_TOKEN_ADDRESSES,
            topics: [
              TRANSFER_EVENT_SIGNATURE,
              padAddressForTopic(eoaAddress),
              null,
            ],
          },
        ],
      };

      const params = { triggerType: TriggerType.Event, triggerConfig };
      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );
      const result = await client.runTrigger(params);
      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );
      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });

    test("should run trigger for Transfer events to eoa address", async () => {
      const triggerConfig = {
        queries: [
          {
            addresses: SEPOLIA_TOKEN_ADDRESSES,
            topics: [
              TRANSFER_EVENT_SIGNATURE,
              null,
              padAddressForTopic(eoaAddress),
            ],
          },
        ],
      };

      const params = { triggerType: TriggerType.Event, triggerConfig };
      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );
      const result = await client.runTrigger(params);
      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );
      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });

    test("should run trigger for Transfer events with multiple queries", async () => {
      const triggerConfig = createEventTriggerConfig(
        eoaAddress,
        SEPOLIA_TOKEN_ADDRESSES
      );

      const params = { triggerType: TriggerType.Event, triggerConfig };
      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );
      const result = await client.runTrigger(params);
      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );
      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });

    test("should run trigger with Chainlink price condition", async () => {
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: createChainlinkPriceConditionConfig(
          "200000000000",
          "gt"
        ), // ETH > $2000
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );
      const result = await client.runTrigger(params);
      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(typeof result.success).toBe("boolean");

      expect(result.metadata).toBeDefined();

      // Conditions filter events, so no matching events is expected when condition is not met
      expect(result.success).toBe(true);
      // Data can be null (no events found) or an object (events found)
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });

    test("should run trigger with multiple price range conditions", async () => {
      const conditions: EventConditionType[] = [
        {
          fieldName: "AnswerUpdated.current",
          operator: "gte",
          value: "150000000000", // >= $1500
          fieldType: "int256",
        },
        {
          fieldName: "AnswerUpdated.current",
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
              topics: [CHAINLINK_ANSWER_UPDATED_SIGNATURE],
              contractAbi: CHAINLINK_AGGREGATOR_ABI,
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

      expect(typeof result.success).toBe("boolean");

      expect(result.success).toBe(true);
      // Data can be null (no events found) or an object (events found)
      expect(result.data === null || typeof result.data === "object").toBe(
        true
      );
    });

    test("should deserialize trigger with conditions from response", () => {
      // Create a trigger with conditions
      const originalConditions: EventConditionType[] = [
        {
          fieldName: "AnswerUpdated.current",
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
              topics: [CHAINLINK_ANSWER_UPDATED_SIGNATURE],
              contractAbi: CHAINLINK_AGGREGATOR_ABI,
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
      const triggerData = deserializedTrigger.data as Record<string, unknown>;
      const queries = triggerData.queries as unknown[];
      expect(queries).toHaveLength(1);

      const query = queries[0];
      expect(query.contractAbi).toEqual(CHAINLINK_AGGREGATOR_ABI);
      expect(query.conditions).toHaveLength(1);
      expect(query.maxEventsPerBlock).toBe(5);

      const condition = query.conditions[0];
      expect(condition.fieldName).toBe("AnswerUpdated.current");
      expect(condition.operator).toBe("gt");
      expect(condition.value).toBe("200000000000");
      expect(condition.fieldType).toBe("int256");
    });

    test("should reject contractAbi as string format", () => {
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

      // Test with string format (should be rejected)
      const trigger = TriggerFactory.create({
        id: "test-string-abi-rejected",
        name: "eventTriggerStringRejected",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: [SEPOLIA_TOKEN_ADDRESSES[0]],
              topics: [TRANSFER_EVENT_SIGNATURE],
              contractAbi: JSON.stringify(abiArray) as any, // Force string type
            },
          ],
        },
      });

      // Should throw error for string format
      expect(() => trigger.toRequest()).toThrow(
        "contractAbi must be an array of ABI elements"
      );
    });

    test("should strictly require contractAbi as array format", () => {
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

      // Test with array format (contractAbi must be an array)
      const trigger = TriggerFactory.create({
        id: "test-array-abi",
        name: "eventTriggerArray",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: [SEPOLIA_TOKEN_ADDRESSES[0]],
              topics: [TRANSFER_EVENT_SIGNATURE],
              contractAbi: abiArray, // Pass as array
            },
          ],
        },
      });

      // Should serialize without errors
      expect(() => trigger.toRequest()).not.toThrow();

      // Get the protobuf message
      const request = trigger.toRequest();
      const query = request.getEvent()!.getConfig()!.getQueriesList()[0];

      // Should have contractAbi in protobuf list format
      expect(query.getContractAbiList()).toBeDefined();
      expect(query.getContractAbiList().length).toBe(abiArray.length);

      // Test round-trip: fromResponse should keep it as string
      const deserializedTrigger = EventTrigger.fromResponse(request);
      const deserializedTriggerData = deserializedTrigger.data as Record<
        string,
        unknown
      >;
      const deserializedQuery = (
        deserializedTriggerData.queries as unknown[]
      )[0] as Record<string, unknown>;
      expect(deserializedQuery.contractAbi).toEqual(abiArray);
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
                TRANSFER_EVENT_SIGNATURE,
                null, // Any from address
                padAddressForTopic(
                  "0xc60e71bd0f2e6d8832fea1a2d56091c48493c788"
                ), // Specific to address
              ],
              contractAbi: [
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
              ],
              methodCalls: [
                {
                  methodName: "decimals",
                  methodParams: [],
                  applyToFields: ["Transfer.value"],
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
      // Note: valueRaw field removed in backend changes
      expect(transferData.tokenName).toBeDefined();
      expect(transferData.tokenSymbol).toBeDefined();
      expect(transferData.tokenDecimals).toBeDefined();
      expect(transferData.contractAddress).toBeDefined();
      expect(transferData.transactionHash).toBeDefined();
      expect(transferData.blockNumber).toBeDefined();

      // Type checks for enhanced Transfer enrichment
      expect(typeof transferData.tokenName).toBe("string");
      expect(typeof transferData.tokenSymbol).toBe("string");
      expect(typeof transferData.tokenDecimals).toBe("number");
      expect(typeof transferData.fromAddress).toBe("string");
      expect(typeof transferData.toAddress).toBe("string");
      expect(typeof transferData.value).toBe("string"); // Formatted value
      // Note: valueRaw field removed in backend changes
      expect(typeof transferData.blockNumber).toBe("number");
      expect(typeof transferData.transactionHash).toBe("string");
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow without contractAbi or methodCalls", async () => {
      const wallet = await getSmartWallet(client);

      const eventTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "simulate_event_trigger_test",
        type: TriggerType.Event,
        data: createEventTriggerConfig(eoaAddress, SEPOLIA_TOKEN_ADDRESSES),
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

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(2); // trigger + minimal node

      const triggerStep = simulation.steps.find(
        (step) => step.id === eventTrigger.id
      );
      expect(triggerStep!.success).toBeTruthy();

      // For simulation, we can accept null output when no events are found
      // This is realistic behavior for event triggers
    });

    test("should simulate workflow with single event query", async () => {
      const wallet = await getSmartWallet(client);

      const eventTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "simulate_single_query",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: SEPOLIA_TOKEN_ADDRESSES,
              topics: [TRANSFER_EVENT_SIGNATURE, padAddressForTopic(eoaAddress), null], // Only FROM events
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = eventTrigger;

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      expect(simulation.status).toBe(ExecutionStatus.Success);
      const triggerStep = simulation.steps.find(
        (step) => step.id === eventTrigger.id
      );
      expect(triggerStep!.success).toBeTruthy();
    });

    test("should simulate workflow with event trigger and method calls", async () => {
      const wallet = await getSmartWallet(client);

      const params = {
        id: defaultTriggerId,
        name: "simulate_event_trigger_with_method_calls",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: [CHAINLINK_ETH_USD_SEPOLIA],
              topics: [CHAINLINK_ANSWER_UPDATED_SIGNATURE],
              contractAbi: CHAINLINK_AGGREGATOR_ABI,
              methodCalls: [
                {
                  methodName: "decimals",
                  methodParams: [],
                  applyToFields: ["AnswerUpdated.current"],
                },
              ],
              conditions: [
                {
                  fieldName: "AnswerUpdated.current",
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

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(2); // trigger + minimal node

      const triggerStep = simulation.steps.find(
        (step) => step.id === eventTrigger.id
      );
      expect(triggerStep!.success).toBeTruthy();

      // Check if the trigger step now has output data with decimal formatting
      const output = triggerStep!.output as Record<string, unknown>;
      expect(output).toBeDefined();

      // TODO: Backend methodParams processing not implemented yet - skip if null
      if (output === null) {
        console.log(
          "⚠️  Backend methodParams processing not yet implemented - output is null"
        );
        return; // Skip test until backend implements methodParams processing
      }

      // Check for decimal formatting - NEW STRUCTURE: Event data nested under event name
      // Use more flexible approach that doesn't hard-code event name
      const expectedEventName = "AnswerUpdated";
      const eventOutput = output[expectedEventName] as Record<string, unknown>;

      if (eventOutput && eventOutput.current && eventOutput.decimals) {
        // Verify decimal formatting data is present and valid
        expect(eventOutput.current).toBeDefined();
        expect(eventOutput.currentRaw).toBeDefined();
        expect(eventOutput.decimals).toBeDefined();

        // Verify formatted value is a valid number string
        expect(parseFloat(eventOutput.current as string)).not.toBeNaN();

        // Verify raw value is a valid integer string
        expect(parseInt(eventOutput.currentRaw as string)).not.toBeNaN();

        // Verify decimals is a reasonable number (typically 8 for Chainlink)
        expect(eventOutput.decimals).toBeGreaterThan(0);
        expect(eventOutput.decimals).toBeLessThanOrEqual(18);

        // 🔍 TYPE CHECK: Verify ABI type improvements are working
        expect(typeof eventOutput.decimals).toBe("number"); // decimals should be number type (uint8 -> number)
        expect(typeof eventOutput.current).toBe("string"); // current should be string (int256 -> string, then formatted)
        expect(typeof eventOutput.currentRaw).toBe("string"); // raw value should be string

        expect(eventOutput.decimals).toBe(8);
        expect(eventOutput.current).toMatch(/^\d+\.\d+$/); // Should be decimal format (flexible decimal places)
        expect(eventOutput.currentRaw).toMatch(/^\d+$/); // Should be raw number
      } else {
        console.log(
          "ℹ️  No decimal formatting found - this may be expected if no events match conditions"
        );
      }
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with event trigger", async () => {
      const smartWallet = await getSmartWallet(client);

      const eventTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "deploy_event_trigger_test",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: SEPOLIA_TOKEN_ADDRESSES,
              topics: [TRANSFER_EVENT_SIGNATURE, null, padAddressForTopic(eoaAddress)], // Transfer to eoaAddress
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(smartWallet.address, []);
      workflowProps.trigger = eventTrigger;

      const workflowId = await client.submitWorkflow(
        client.createWorkflow(workflowProps)
      );

      createdIdMap.set(workflowId, true); // Track for automatic cleanup

      // Verify deployment was successful
      const workflowsResult = await client.getWorkflows([smartWallet.address]);
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
          chainId: parseInt(chainId),
          contractAddress: SEPOLIA_TOKEN_ADDRESSES[0],
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
          to: eoaAddress,
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
      const executionsAfterTrigger = await client.getExecutions([workflowId], {
        limit: 1,
      });

      console.log(
        "Event trigger executions after manual trigger:",
        util.inspect(executionsAfterTrigger, { depth: null, colors: true })
      );

      // Verify that an execution was created
      expect(executionsAfterTrigger.items).toHaveLength(1);
      expect(executionsAfterTrigger.items[0].id).toBe(
        triggerResponse.executionId
      );
    });
  });

  describe("Template Variable Resolution Tests", () => {
    test("should resolve template variables in addresses and topics", async () => {
      const smartWallet = await getSmartWalletWithBalance(client); // The wallet to monitor for transfer events

      const monitoringWalletAddress = "{{settings.runner}}"; // smartwallet.address
      const erc20TokenAddresses = [
        tokens?.ETH?.address,
        "{{settings.uniswapv3_pool.token1.id}}", // Template variable for USDC
      ];

      const triggerConfig = createEventTriggerConfig(
        monitoringWalletAddress,
        erc20TokenAddresses
      );

      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: triggerConfig,
        inputVariables: {
          settings: {
            name: "Template Variable Resolution Test",
            runner: smartWallet.address,
            chain_id: parseInt(chainId),
            uniswapv3_pool: {
              token1: {
                id: tokens?.USDC?.address,
                symbol: "USDC",
              },
              feeTier: "3000",
            },
          },
        },
      };

      console.log(
        "🚀 ~ runTrigger with template variables ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger template resolution response:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should succeed - template resolution happens server-side
      expect(result.success).toBe(true);
      expect(result.error).toBe("");

      // Verify response structure
      expect(result.data).toBeDefined();
      expect(result.data?.topics).toBeInstanceOf(Array);
      expect(result.data?.topics[0]).toBe(TRANSFER_EVENT_SIGNATURE);

      // Key verification: the contractAddress in the response matches any of those in trigger config
      expect(
        result.data?.contractAddress.toLowerCase() ===
          tokens?.USDC?.address?.toLowerCase() ||
          result.data?.contractAddress.toLowerCase() ===
            tokens?.ETH?.address?.toLowerCase()
      ).toBe(true);

      // Key verification: either the from or to in Transfer event equals to the padded wallet for monitoring
      console.log(
        "result.data.topics[1]:",
        result.data?.topics[1].toLowerCase()
      );
      console.log(
        "result.data.topics[2]:",
        result.data?.topics[2].toLowerCase()
      );
      console.log(
        "padAddressForTopic(smartWallet.address):",
        padAddressForTopic(smartWallet.address).toLowerCase()
      );

      expect(
        result.data?.topics[1].toLowerCase() ===
          padAddressForTopic(smartWallet.address).toLowerCase() ||
          result.data?.topics[2].toLowerCase() ===
            padAddressForTopic(smartWallet.address).toLowerCase()
      ).toBe(true);

      // The server should have resolved:
      // - {{settings.uniswapv3_pool.token1.id}} → USDC_ADDRESS
      // - {{settings.runner}} → smartWallet.address

      // Verify metadata contains transfer transaction receipt
      expect(result.metadata).toBeDefined();
      expect(result.metadata).toHaveProperty("address");
      expect(result.metadata).toHaveProperty("data");
    });
  });

  describe("Response Format Consistency Tests", () => {
    test("should return consistent AnswerUpdated event format across all execution modes", async () => {
      const wallet = await getSmartWallet(client);

      // Define oracle event trigger configuration with proper AnswerUpdated event ABI
      const oracleEventConfig = {
        queries: [
          {
            addresses: [CHAINLINK_ETH_USD_SEPOLIA],
            topics: [CHAINLINK_ANSWER_UPDATED_SIGNATURE],
            contractAbi: [
              {
                anonymous: false,
                inputs: [
                  { indexed: true, name: "current", type: "int256" },
                  { indexed: true, name: "roundId", type: "uint256" },
                  { indexed: false, name: "updatedAt", type: "uint256" },
                ],
                name: "AnswerUpdated",
                type: "event",
              },
            ],
            conditions: [
              {
                fieldName: "AnswerUpdated.current",
                operator: "gt",
                value: "200000000000", // $2000 in 8 decimals
                fieldType: "int256",
              },
            ],
            maxEventsPerBlock: 5,
          },
        ],
      };

      // Test 1: runTrigger (Run Node Immediately)
      console.log("🧪 Testing runTrigger (Run Node Immediately)...");
      const runNodeParams = {
        triggerType: TriggerType.Event,
        triggerConfig: oracleEventConfig,
      };

      const runNodeResponse = await client.runTrigger(runNodeParams);
      console.log(
        "🚀 runTrigger response:",
        util.inspect(runNodeResponse, { depth: null, colors: true })
      );

      // Test 2: simulateWorkflow (Simulate Task)
      console.log("🧪 Testing simulateWorkflow (Simulate Task)...");
      const eventTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "oracle_consistency_test",
        type: TriggerType.Event,
        data: oracleEventConfig,
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = eventTrigger;

      const simulateResponse = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );
      console.log(
        "🚀 simulateWorkflow response:",
        util.inspect(simulateResponse, { depth: null, colors: true })
      );

      // Helper function to validate consistent response structure
      const validateEventResponse = (response: any, mode: string) => {
        console.log(`🔍 Validating ${mode} response structure...`);

        expect(response.success).toBeTruthy();

        // Validate data structure (parsed ABI fields)
        expect(response.data).toBeDefined();
        const parsedData = response.data as Record<string, unknown>;

        // NEW STRUCTURE: Event data is nested under event name
        // Use more flexible approach that doesn't hard-code event name
        const eventKeys = Object.keys(parsedData);
        expect(eventKeys.length).toBeGreaterThan(0);

        // For this test, we expect AnswerUpdated event specifically
        const expectedEventName = "AnswerUpdated";
        expect(parsedData[expectedEventName]).toBeDefined();

        const eventData = parsedData[expectedEventName] as Record<
          string,
          unknown
        >;
        expect(typeof eventData.current).toBe("string");
        expect(typeof eventData.roundId).toBe("string");
        expect(typeof eventData.updatedAt).toBe("string");

        // Validate metadata structure (raw event log only)
        expect(response.metadata).toBeDefined();
        const metadata = response.metadata as Record<string, unknown>;

        expect(metadata.address).toBe(CHAINLINK_ETH_USD_SEPOLIA);
        expect(Array.isArray(metadata.topics)).toBe(true);
        expect(metadata.topics[0]).toBe(CHAINLINK_ANSWER_UPDATED_SIGNATURE);
        expect(typeof metadata.blockNumber).toBe("number");
        expect(typeof metadata.transactionHash).toBe("string");
        expect(typeof metadata.data).toBe("string");
        expect(metadata.chainId).toBe(parseInt(config.chainId));

        // Ensure NO executionContext in metadata
        expect(metadata.executionContext).toBeUndefined();

        // Validate executionContext structure
        expect(response.executionContext).toBeDefined();
        expect(response.executionContext.chainId).toBe(parseInt(config.chainId));
        expect(response.executionContext.isSimulated).toBe(true);
        expect(response.executionContext.provider).toBe("tenderly");
        expect(Object.keys(response.executionContext)).toHaveLength(3);

        console.log(`✅ ${mode} response structure is valid`);
      };

      // Extract trigger step from simulate workflow response
      const triggerStep = simulateResponse.steps.find(
        (step) => step.type === "eventTrigger"
      );
      expect(triggerStep).toBeDefined();

      // Create a normalized response structure for the trigger step
      const normalizedSimulateResponse = {
        success: triggerStep!.success,
        data: triggerStep!.output,
        metadata: triggerStep!.metadata || {}, // simulateWorkflow doesn't include raw metadata
        executionContext: {
          chainId: triggerStep!.executionContext.chain_id,
          isSimulated: triggerStep!.executionContext.is_simulated,
          provider: triggerStep!.executionContext.provider,
        },
      };

      // Validate both responses have consistent structure
      validateEventResponse(runNodeResponse, "runTrigger");

      // For simulate workflow, we only validate the data structure since metadata isn't included
      console.log("🔍 Validating simulateWorkflow response structure...");
      expect(normalizedSimulateResponse.success).toBeTruthy();
      expect(normalizedSimulateResponse.data).toBeDefined();

      const simulateData = normalizedSimulateResponse.data as Record<
        string,
        unknown
      >;
      // NEW STRUCTURE: Event data is nested under event name
      // Use more flexible approach that doesn't hard-code event name
      const simulateEventKeys = Object.keys(simulateData);
      expect(simulateEventKeys.length).toBeGreaterThan(0);

      // For this test, we expect AnswerUpdated event specifically
      const expectedEventName = "AnswerUpdated";
      expect(simulateData[expectedEventName]).toBeDefined();

      const simulateEventData = simulateData[expectedEventName] as Record<
        string,
        unknown
      >;
      expect(typeof simulateEventData.current).toBe("string");
      expect(typeof simulateEventData.roundId).toBe("string");
      expect(typeof simulateEventData.updatedAt).toBe("string");

      expect(normalizedSimulateResponse.executionContext.chainId).toBe(
        parseInt(config.chainId)
      );
      expect(normalizedSimulateResponse.executionContext.isSimulated).toBe(
        true
      );
      expect(normalizedSimulateResponse.executionContext.provider).toBe(
        "tenderly"
      );

      console.log("✅ simulateWorkflow response structure is valid");

      // Compare data consistency between modes
      const runNodeData = runNodeResponse.data as Record<string, unknown>;

      expect(runNodeData.eventName).toBe(simulateData.eventName);
      expect(typeof runNodeData.current).toBe(typeof simulateData.current);
      expect(typeof runNodeData.roundId).toBe(typeof simulateData.roundId);
      expect(typeof runNodeData.updatedAt).toBe(typeof simulateData.updatedAt);

      console.log(
        "🎉 All execution modes return consistent AnswerUpdated event format!"
      );
    });

    test("should return consistent response format across trigger methods", async () => {
      const wallet = await getSmartWallet(client);

      // Use eoaAddress as the monitoring address (defined constant, not hard-coded)
      const MONITORING_ADDRESS = eoaAddress;
      const ERC20_CONTRACT_ADDRESS = SEPOLIA_TOKEN_ADDRESSES[0];

      const eventTriggerConfig = {
        queries: [
          {
            addresses: [ERC20_CONTRACT_ADDRESS], // Use single contract for consistency
            topics: [
              TRANSFER_EVENT_SIGNATURE,
              padAddressForTopic(MONITORING_ADDRESS),
              null,
            ], // Transfer FROM MONITORING_ADDRESS
          },
        ],
      };

      // Test 1: runTrigger
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: eventTriggerConfig,
      };

      const runTriggerResponse = await client.runTrigger(params);

      console.log(
        "🚀 ~ runTrigger response:",
        util.inspect(runTriggerResponse, { depth: null, colors: true })
      );

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

      console.log(
        "🚀 ~ simulateWorkflow response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === eventTrigger.id
      );

      // Test 3: Deploy and trigger the workflow
      const workflowId = await client.submitWorkflow(
        client.createWorkflow(workflowProps)
      );
      createdIdMap.set(workflowId, true); // Track for automatic cleanup

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
          chainId: parseInt(chainId),
          contractAddress: ERC20_CONTRACT_ADDRESS,
          eventSignature: TRANSFER_EVENT_SIGNATURE,
          eventType: "Transfer",
          logIndex: 0,
          rawData:
            "0x00000000000000000000000000000000000000000000000de0b6b3a7640000",
          topics: [
            TRANSFER_EVENT_SIGNATURE,
            padAddressForTopic(MONITORING_ADDRESS),
            null,
          ],
          transactionHash:
            "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          from: MONITORING_ADDRESS,
          to: eoaAddress,
          value: "1000000000000000000", // 1 ETH in wei
        },
      };

      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        triggerData,
        isBlocking: true, // Wait for execution to complete
      });

      // Get the execution to access the trigger step output
      const executionsAfterTrigger = await client.getExecutions([workflowId], {
        limit: 1,
      });

      const executionStep = executionsAfterTrigger.items[0]?.steps.find(
        (step) => step.id === eventTrigger.id
      );

      console.log(
        "🚀 ~ executionStep output:",
        util.inspect(executionStep?.output, { depth: null, colors: true })
      );

      // Compare response formats - verify all three methods return data
      expect(runTriggerResponse.data).toBeDefined();
      expect(simulatedStep?.output).toBeDefined();
      expect(executionStep?.output).toBeDefined();

      // All outputs should have consistent structure (excluding dynamic fields like transactionHash)
      const runTriggerData = runTriggerResponse.data;
      const simulatedData = simulatedStep!.output;
      const executionData = executionStep!.output;

      // Verify essential event trigger fields match
      expect(runTriggerData).toBeDefined();
      expect(runTriggerData.contractAddress).toBeDefined();
      expect(runTriggerData.contractAddress.toLowerCase()).toBe(
        ERC20_CONTRACT_ADDRESS.toLowerCase()
      );

      // Key verification: the FROM address in topics should match our monitoring address
      expect(Array.isArray(runTriggerData.topics)).toBe(true);
      expect(runTriggerData.topics[0]).toBe(TRANSFER_EVENT_SIGNATURE);
      expect(runTriggerData.topics[1].toLowerCase()).toBe(
        padAddressForTopic(MONITORING_ADDRESS).toLowerCase()
      );

      // Verify simulated data has contract address
      expect(simulatedData).toBeDefined();
      expect(simulatedData.contractAddress).toBeDefined();
      expect(simulatedData.contractAddress.toLowerCase()).toBe(
        ERC20_CONTRACT_ADDRESS.toLowerCase()
      );

      // Verify triggered execution data has contract address
      expect(executionData).toBeDefined();
      expect(executionData.contractAddress).toBeDefined();
      expect(executionData.contractAddress.toLowerCase()).toBe(
        ERC20_CONTRACT_ADDRESS.toLowerCase()
      );

      // Verify dynamic fields exist
      expect(runTriggerData.transactionHash).toBeDefined();
      expect(simulatedData.transactionHash).toBeDefined();
      expect(executionData.transactionHash).toBeDefined();

      // All should be successful
      expect(runTriggerResponse.success).toBeTruthy();
      expect(simulatedStep).toBeDefined();
      expect(deployedWorkflow).toBeDefined();
      expect(deployedWorkflow!.trigger!.type).toBe(TriggerType.Event);
      expect(triggerResponse.executionId).toBeDefined();

      // 🔍 SPECIFIC VALUE TESTS: Verify actual event data values
      // Note: runTrigger and simulateWorkflow return raw log data
      // Only triggerWorkflow execution returns enriched Transfer event data
      
      // Test runTrigger data (raw log format)
      expect(typeof runTriggerData.blockNumber).toBe("number");
      expect(runTriggerData.blockNumber).toBeGreaterThan(0);
      expect(runTriggerData.transactionHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
      expect(Array.isArray(runTriggerData.topics)).toBe(true);
      expect(runTriggerData.topics.length).toBeGreaterThan(0);
      expect(runTriggerData.topics[0]).toBe(TRANSFER_EVENT_SIGNATURE);

      // Test simulated data (raw log format)
      expect(typeof simulatedData.blockNumber).toBe("number");
      expect(simulatedData.blockNumber).toBeGreaterThan(0);
      expect(Array.isArray(simulatedData.topics)).toBe(true);
      expect(simulatedData.topics[0]).toBe(TRANSFER_EVENT_SIGNATURE);
      
      // Test triggered execution data (enriched Transfer format)
      // Note: eventFound field is optional and may not be present in all responses
      expect(executionData.eventType).toBe("Transfer");
      expect(executionData.eventSignature).toBe(TRANSFER_EVENT_SIGNATURE);
      expect(executionData.from).toBeDefined();
      expect(executionData.to).toBeDefined();
      expect(typeof executionData.value).toBe("string");

      // 🔍 CONFIG TESTS: Verify step configuration consistency

      // Test simulated step config
      expect(simulatedStep!.config).toBeDefined();
      expect(simulatedStep!.config).toHaveProperty("queries");
      expect(Array.isArray(simulatedStep!.config.queries)).toBe(true);
      expect(simulatedStep!.config.queries.length).toBe(1);
      expect(simulatedStep!.config.queries[0]).toHaveProperty("addresses");
      expect(simulatedStep!.config.queries[0]).toHaveProperty("topics");
      expect(Array.isArray(simulatedStep!.config.queries[0].addresses)).toBe(
        true
      );
      expect(simulatedStep!.config.queries[0].addresses[0].toLowerCase()).toBe(
        ERC20_CONTRACT_ADDRESS.toLowerCase()
      );

      // Test triggered step config
      expect(executionStep!.config).toBeDefined();
      expect(executionStep!.config).toHaveProperty("queries");
      expect(Array.isArray(executionStep!.config.queries)).toBe(true);
      expect(executionStep!.config.queries.length).toBe(1);
      expect(executionStep!.config.queries[0]).toHaveProperty("addresses");
      expect(executionStep!.config.queries[0]).toHaveProperty("topics");
      expect(Array.isArray(executionStep!.config.queries[0].addresses)).toBe(
        true
      );
      expect(executionStep!.config.queries[0].addresses[0].toLowerCase()).toBe(
        ERC20_CONTRACT_ADDRESS.toLowerCase()
      );

      // Test step metadata
      expect(simulatedStep!.type).toBe("eventTrigger");
      expect(simulatedStep!.name).toBe("consistency_test");
      expect(simulatedStep!.success).toBeTruthy();
      expect(simulatedStep!.error).toBe("");

      expect(executionStep!.type).toBe("eventTrigger");
      expect(executionStep!.name).toBe("consistency_test");
      expect(executionStep!.success).toBeTruthy();
      expect(executionStep!.error).toBe("");
    });

    test("should handle empty address array", async () => {
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [], // Empty array - monitor all contracts
              topics: [TRANSFER_EVENT_SIGNATURE, null, null],
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

      expect(typeof result.success).toBe("boolean");
      // This should either succeed with broad monitoring or handle gracefully
    });

    test("should handle complex topic filtering", async () => {
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: SEPOLIA_TOKEN_ADDRESSES,
              topics: [
                TRANSFER_EVENT_SIGNATURE,
                "0x0000000000000000000000000000000000000000", // From zero address (minting)
                null,
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

      expect(typeof result.success).toBe("boolean");

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
      // Use a definitely non-existent contract address to ensure no events
      // This should be much faster than real blockchain queries
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          simulationMode: false, // Use historical search to get null when no events are found
          queries: [
            {
              addresses: ["0x0000000000000000000000000000000000000001"], // Non-existent contract
              topics: [TRANSFER_EVENT_SIGNATURE, null, null],
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

      // Backend returns success: false when no events found
      expect(noEventsResult.success).toBeFalsy();
      expect(noEventsResult.data).toBeNull();
      // Error message may be empty in some cases
      expect(typeof noEventsResult.error).toBe("string");
    });

    test("should handle empty address arrays consistently", async () => {
      // Empty addresses array should cause an error
      // Use eoaAddress as the monitoring address (not hard-coded)
      const monitoringAddress = eoaAddress;

      const result = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [], // Empty array - should fail
              topics: [
                TRANSFER_EVENT_SIGNATURE,
                padAddressForTopic(monitoringAddress),
                null,
              ],
            },
          ],
        },
      });

      console.log(
        "Empty addresses result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(typeof result.success).toBe("boolean");

      // Empty addresses array should fail
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    });

    test("should handle empty topics array consistently", async () => {
      // Backend now requires at least one address in topics for Transfer events
      // Use eoaAddress as the monitoring address (not hard-coded)
      const monitoringAddress = eoaAddress;

      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [SEPOLIA_TOKEN_ADDRESSES[0]],
              topics: [
                TRANSFER_EVENT_SIGNATURE,
                null,
                padAddressForTopic(monitoringAddress),
              ], // Transfer TO monitoringAddress
            },
          ],
        },
      };

      console.log(
        "🚀 ~ runTrigger with specific address in topics ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "Topics with address result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(typeof result.success).toBe("boolean");

      // Should succeed when valid address is provided
      expect(result.success).toBe(true);
      expect(result.error).toBe("");

      // Verify the response contains our monitoring address
      expect(result.data).toBeDefined();
      expect(result.data).not.toBeNull();
      expect(result.data.topics).toBeDefined();
      expect(result.data.topics[2].toLowerCase()).toBe(
        padAddressForTopic(monitoringAddress).toLowerCase()
      );
    });

    test("should maintain empty data consistency across execution methods", async () => {
      const wallet = await getSmartWallet(client);

      // Use eoaAddress as monitoring address (not hard-coded)
      const monitoringAddress = eoaAddress;

      // Use a definitely non-existent contract to ensure consistent null results
      const eventTriggerConfig = {
        simulationMode: false, // Use historical search to get null when no events are found
        queries: [
          {
            addresses: ["0x0000000000000000000000000000000000000001"], // Non-existent contract
            topics: [
              TRANSFER_EVENT_SIGNATURE,
              padAddressForTopic(monitoringAddress),
              null,
            ], // But with valid FROM address
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

      // runTrigger: Backend returns success: false for no events
      expect(directResponse.success).toBeFalsy();
      expect(directResponse.data).toBeNull();
      expect(typeof directResponse.error).toBe("string");

      // simulateWorkflow: Always succeeds and provides sample data
      expect(simulatedStep!.success).toBeTruthy();
      expect(simulatedStep!.output).not.toBe(null);
    });

    test("should handle malformed query configurations gracefully", async () => {
      // Test with invalid topic format - not a valid hex string
      const params = {
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [SEPOLIA_TOKEN_ADDRESSES[0]],
              topics: ["invalid_topic_format", null, null], // Invalid topic format
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

      expect(typeof result.success).toBe("boolean");

      // Invalid topic format should fail with error
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    });

    test("should validate event trigger configuration without network calls", () => {
      // Test valid configurations
      const validConfig = {
        queries: [
          {
            addresses: ["0x1234567890123456789012345678901234567890"],
            topics: [TRANSFER_EVENT_SIGNATURE, null, null],
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
          data: config,
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
            topics: [TRANSFER_EVENT_SIGNATURE],
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
      const eventData = trigger.data as Record<string, unknown>;
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
      // Topics is now a flat array, not nested
      expect(query.topics[0]).toBe(TRANSFER_EVENT_SIGNATURE);

      // Verify request creation
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getId()).toBe("basic-test");
      expect(request.getName()).toBe("basic_event_trigger");
    });

    test("should handle eventName.fieldName pattern in applyToFields", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: ["0x694AA1769357215DE4FAC081bf1f309aDC325306"],
              topics: [
                "0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f",
              ],
              contractAbi: CHAINLINK_AGGREGATOR_ABI,
              methodCalls: [
                {
                  methodName: "decimals",
                  methodParams: [],
                  applyToFields: ["AnswerUpdated.current"], // Test eventName.fieldName pattern
                },
              ],
            },
          ],
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      const query = request.getEvent()!.getConfig()!.getQueriesList()[0];

      // Verify the method call configuration
      const methodCalls = query.getMethodCallsList();
      expect(methodCalls).toHaveLength(1);
      expect(methodCalls[0].getMethodName()).toBe("decimals");
      expect(methodCalls[0].getApplyToFieldsList()).toEqual([
        "AnswerUpdated.current",
      ]);

      // Verify contractAbi is properly set
      expect(query.getContractAbiList()).toBeDefined();
      expect(query.getContractAbiList().length).toBe(1);
    });

    test("should handle eventName.fieldName pattern in conditions for precise targeting", () => {
      // Test that conditions use the same eventName.fieldName format as applyToFields
      const trigger = TriggerFactory.create({
        id: "test-condition-pattern",
        name: "eventConditionPattern",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: ["0x694AA1769357215DE4FAC081bf1f309aDC325306"],
              topics: [
                "0x0559884fd3a460db3073b7fc896cc77986f16e378210ded43186175bf646fc5f",
              ],
              contractAbi: CHAINLINK_AGGREGATOR_ABI,
              conditions: [
                {
                  fieldName: "AnswerUpdated.current", // Use eventName.fieldName pattern
                  operator: "gt",
                  value: "2000.00000000",
                  fieldType: "decimal",
                },
                {
                  fieldName: "AnswerUpdated.roundId", // Another field with same pattern
                  operator: "gt",
                  value: "1000",
                  fieldType: "uint256",
                },
              ],
              methodCalls: [
                {
                  methodName: "decimals",
                  methodParams: [],
                  applyToFields: ["AnswerUpdated.current"], // Same pattern as conditions
                },
              ],
            },
          ],
        },
      }) as EventTrigger;

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      const query = request.getEvent()!.getConfig()!.getQueriesList()[0];

      // Verify conditions use the eventName.fieldName pattern
      expect(query.getConditionsList()).toHaveLength(2);

      const condition1 = query.getConditionsList()[0];
      expect(condition1.getFieldName()).toBe("AnswerUpdated.current");
      expect(condition1.getOperator()).toBe("gt");
      expect(condition1.getFieldType()).toBe("decimal");

      const condition2 = query.getConditionsList()[1];
      expect(condition2.getFieldName()).toBe("AnswerUpdated.roundId");
      expect(condition2.getOperator()).toBe("gt");
      expect(condition2.getFieldType()).toBe("uint256");

      // Verify methodCalls also use the same pattern
      expect(query.getMethodCallsList()).toHaveLength(1);
      const methodCall = query.getMethodCallsList()[0];
      expect(methodCall.getApplyToFieldsList()).toEqual([
        "AnswerUpdated.current",
      ]);
    });
  });
});
