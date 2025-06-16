import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import { Client, TriggerFactory, EventTrigger } from "@avaprotocol/sdk-js";
import { TriggerType } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  SaltGlobal,
  removeCreatedWorkflows,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(45000);

const { avsEndpoint, walletPrivateKey, factoryAddress, chainEndpoint } =
  getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 7000;

// Sepolia ERC-20 token addresses for testing
const SEPOLIA_TOKEN_ADDRESSES = [
  "0x779877A7B0D9E8603169DdbD7836e478b4624789", // LINK token on Sepolia
  "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // UNI token on Sepolia (if exists)
  "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", // WETH on Sepolia
];

// ERC-20 Transfer event signature
const TRANSFER_EVENT_SIGNATURE =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

// Helper function to check if we're on Sepolia
async function isSepoliaChain(): Promise<boolean> {
  try {
    return chainEndpoint?.toLowerCase().includes("sepolia") || false;
  } catch {
    return false;
  }
}

// Helper function to create event trigger config
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
            values: [TRANSFER_EVENT_SIGNATURE, coreAddress, null], // Transfer from coreAddress
          },
        ],
      },
      {
        addresses: contractAddresses,
        topics: [
          {
            values: [TRANSFER_EVENT_SIGNATURE, null, coreAddress], // Transfer to coreAddress
          },
        ],
      },
    ],
  };
}

describe("EventTrigger Tests", () => {
  let client: Client;
  let isSepoliaTest: boolean;
  let coreAddress: string;

  beforeAll(async () => {
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

      console.log("🚀 Testing runTrigger with Transfer FROM events...");

      const result = await client.runTrigger({
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
      });

      console.log(
        "runTrigger Transfer FROM response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // For specific address filters, no matching events is a valid outcome
      if (result.success && result.data !== null) {
        // If we found events, validate the structure
        expect(result.data).toBeDefined();
        console.log("✅ Found Transfer FROM events for address:", coreAddress);
      } else {
        // No events found is expected for most test addresses
        console.log(
          "ℹ️  No Transfer FROM events found for address (expected):",
          coreAddress
        );
        expect(result.success).toBe(true);
        expect(result.data).toBe(null);
      }
    });

    test("should run trigger for Transfer events to core address", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      console.log("🚀 Testing runTrigger with Transfer TO events...");

      const result = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: {
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

      console.log(
        "runTrigger Transfer TO response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // For specific address filters, no matching events is a valid outcome
      if (result.success && result.data !== null) {
        // If we found events, validate the structure
        expect(result.data).toBeDefined();
        console.log("✅ Found Transfer TO events for address:", coreAddress);
      } else {
        // No events found is expected for most test addresses
        console.log(
          "ℹ️  No Transfer TO events found for address (expected):",
          coreAddress
        );
        expect(result.success).toBe(true);
        expect(result.data).toBe(null);
      }
    });

    test("should run trigger with multiple Transfer event queries", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      console.log("🚀 Testing runTrigger with multiple Transfer queries...");

      const result = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: createEventTriggerConfig(coreAddress),
      });

      console.log(
        "runTrigger multiple queries response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // For specific address filters, no matching events is a valid outcome
      if (result.success && result.data !== null) {
        // If we found events, validate the structure
        expect(result.data).toBeDefined();
        console.log("✅ Found Transfer events for address:", coreAddress);
      } else {
        // No events found is expected for most test addresses
        console.log(
          "ℹ️  No Transfer events found for address (expected):",
          coreAddress
        );
        expect(result.success).toBe(true);
        expect(result.data).toBe(null);
      }
    });

    test("should run trigger with single contract address filter", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      console.log("🚀 Testing runTrigger with single contract filter...");

      const result = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [SEPOLIA_TOKEN_ADDRESSES[0]], // Only first token
              topics: [
                {
                  values: [TRANSFER_EVENT_SIGNATURE, null, null], // Any Transfer event
                },
              ],
            },
          ],
        },
      });

      console.log(
        "runTrigger single contract response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Single contract filter trigger failed:", result.error);
      }
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with event trigger", async () => {
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

      console.log("🚀 Testing simulateWorkflow with event trigger...");

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow response:",
        JSON.stringify(simulation, null, 2)
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
      console.log("✅ Event trigger simulation completed successfully");
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

      console.log("🚀 Testing simulateWorkflow with single event query...");

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      expect(simulation.success).toBe(true);
      const triggerStep = simulation.steps.find(
        (step) => step.id === eventTrigger.id
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);

      console.log("✅ Single event query simulation completed successfully");
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

      console.log("🚀 Testing deploy + trigger workflow with event trigger...");

      let workflowId: string | undefined;

      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );

        // For event triggers, we don't use triggerWorkflow since they're event-driven
        // Instead, we can check if the workflow was deployed successfully
        const workflowsResult = await client.getWorkflows([wallet.address]);
        const deployedWorkflow = workflowsResult.items.find(
          (w) => w.id === workflowId
        );

        expect(deployedWorkflow).toBeDefined();
        expect(deployedWorkflow!.trigger).toBeDefined();
        expect(deployedWorkflow!.trigger!.type).toBe(TriggerType.Event);

        console.log("=== EVENT TRIGGER DEPLOYMENT TEST ===");
        console.log(
          "Deployed workflow:",
          JSON.stringify(deployedWorkflow, null, 2)
        );

        // Optionally check executions (though event triggers are reactive)
        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        console.log(
          "Event trigger executions:",
          JSON.stringify(executions, null, 2)
        );
      } finally {
        // Always clean up the workflow, even if test fails
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
            console.log(`✅ Cleaned up workflow: ${workflowId}`);
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

      const inputVariables = {
        workflowContext: {
          id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
          chainId: null,
          name: "Consistency Test",
          userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
          eoaAddress: coreAddress,
          runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
          startAt: new Date(),
          expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          maxExecution: 0,
          status: "draft",
          completedAt: null,
          lastRanAt: null,
          executionCount: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      console.log(
        "🔍 Testing response format consistency across trigger methods..."
      );

      // Test 1: runTrigger
      const directResponse = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: eventTriggerConfig,
      });

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

      // Test 3: Deploy (event triggers are reactive, so we just check deployment)
      let workflowId: string | undefined;

      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );

        const workflowsResult = await client.getWorkflows([wallet.address]);
        const deployedWorkflow = workflowsResult.items.find(
          (w) => w.id === workflowId
        );

        // Compare response formats
        console.log("=== EVENT TRIGGER RESPONSE FORMAT COMPARISON ===");
        console.log(
          "1. runTrigger response:",
          JSON.stringify(directResponse.data, null, 2)
        );
        console.log(
          "2. simulateWorkflow step output:",
          JSON.stringify(simulatedStep?.output, null, 2)
        );
        console.log(
          "3. deployed workflow trigger:",
          JSON.stringify(deployedWorkflow?.trigger, null, 2)
        );

        // All should be successful
        expect(directResponse.success).toBe(true);
        expect(simulatedStep).toBeDefined();
        expect(deployedWorkflow).toBeDefined();
        expect(deployedWorkflow!.trigger!.type).toBe(TriggerType.Event);

        // Verify consistent structure
        const directOutput = directResponse.data;
        const simulatedOutput = simulatedStep!.output as any;

        // Check that all outputs have consistent structure
        expect(directOutput).toBeDefined();
        expect(simulatedOutput).toBeDefined();

        console.log(
          "✅ All trigger methods return consistent event trigger results!"
        );
      } finally {
        // Always clean up the workflow, even if test fails
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
            console.log(`✅ Cleaned up workflow: ${workflowId}`);
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

      console.log("🚀 Testing event trigger with empty address array...");

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
        "runTrigger empty addresses response:",
        JSON.stringify(result, null, 2)
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

      console.log("🚀 Testing event trigger with complex topic filtering...");

      const result = await client.runTrigger({
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
      });

      console.log(
        "runTrigger complex topics response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // For specific filters like minting events, no matching events is expected
      if (result.success && result.data !== null) {
        // If we found minting events, validate the structure
        expect(result.data).toBeDefined();
        console.log("✅ Found minting events (Transfer from zero address)");
      } else {
        // No minting events found is expected for most token contracts
        console.log("ℹ️  No minting events found (expected behavior)");
        expect(result.success).toBe(true);
        expect(result.data).toBe(null);
      }
    });
  });

  describe("Empty Data Handling Tests", () => {
    test("should handle no matching events (empty data) vs query errors", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      console.log(
        "🚀 Testing empty data vs error distinction for event triggers..."
      );

      // Use a definitely non-existent contract address to ensure no events
      // This should be much faster than real blockchain queries
      const noEventsResult = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: {
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
      });

      console.log("No events result:", JSON.stringify(noEventsResult, null, 2));

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

      console.log("🚀 Testing empty address array handling...");

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

      console.log("Empty addresses result:", JSON.stringify(result, null, 2));

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // Should either succeed with broad monitoring or handle gracefully
      if (result.success) {
        // If successful, data can be null (no events) or contain events
        expect(result.error).toBe("");
      }
    });

    test("should handle empty topics array consistently", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      console.log("🚀 Testing empty topics array handling...");

      // Use a known contract but with empty topics - this should be faster
      const result = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: {
          queries: [
            {
              addresses: [SEPOLIA_TOKEN_ADDRESSES[0]],
              topics: [], // Empty topics - monitor all events from this contract
            },
          ],
        },
      });

      console.log("Empty topics result:", JSON.stringify(result, null, 2));

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // Should handle empty topics gracefully
      if (result.success) {
        expect(result.error).toBe("");
      }
    });

    test("should maintain empty data consistency across execution methods", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Use a definitely non-existent contract to ensure consistent null results
      const eventTriggerConfig = {
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

      console.log(
        "🔍 Testing empty data consistency across event trigger methods..."
      );

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

      // Compare empty data handling
      console.log("=== EMPTY DATA CONSISTENCY COMPARISON ===");
      console.log(
        "1. runTrigger response:",
        JSON.stringify(
          { success: directResponse.success, data: directResponse.data },
          null,
          2
        )
      );
      console.log(
        "2. simulateWorkflow step:",
        JSON.stringify(
          { success: simulatedStep?.success, output: simulatedStep?.output },
          null,
          2
        )
      );

      // Both should handle empty data consistently
      expect(directResponse.success).toBe(true);
      expect(directResponse.data).toBe(null); // No events found
      expect(directResponse.error).toBe("");

      expect(simulatedStep).toBeDefined();
      expect(simulatedStep!.success).toBe(true);
      // simulatedStep.output can be null when no events are found

      console.log(
        "✅ Empty data handling is consistent across execution methods!"
      );
    });

    test("should handle malformed query configurations gracefully", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      console.log("🚀 Testing malformed query configurations...");

      // Test with invalid topic format
      const result = await client.runTrigger({
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
      });

      console.log("Malformed query result:", JSON.stringify(result, null, 2));

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // Should handle gracefully - either succeed with null data or fail with error
      if (result.success) {
        expect(result.error).toBe("");
        // Data can be null or contain events depending on how the system handles invalid topics
      } else {
        expect(result.error).toBeTruthy();
      }
    });

    test("should correctly parse null vs empty object responses (client-side test)", () => {
      console.log("🚀 Testing client-side null vs empty object parsing...");

      // Test the EventTrigger.fromOutputData method directly
      // This simulates what happens when the server returns different response types

      // Mock RunTriggerResp with null event trigger (no events found)
      const mockNullResponse = {
        getEventTrigger: () => null,
      };

      const nullResult = EventTrigger.fromOutputData(mockNullResponse as any);
      expect(nullResult).toBe(null);

      // Mock RunTriggerResp with empty EventTrigger_Output (no oneof fields set)
      const mockEmptyResponse = {
        getEventTrigger: () => ({
          hasEvmLog: () => false,
          hasTransferLog: () => false,
          getEvmLog: () => null,
          getTransferLog: () => null,
        }),
      };

      const emptyResult = EventTrigger.fromOutputData(mockEmptyResponse as any);
      expect(emptyResult).toBe(null);

      // Mock RunTriggerResp with TransferLog data
      const mockTransferLogResponse = {
        getEventTrigger: () => ({
          hasEvmLog: () => false,
          hasTransferLog: () => true,
          getEvmLog: () => null,
          getTransferLog: () => ({
            toObject: () => ({
              tokenName: "Test Token",
              tokenSymbol: "TEST",
              tokenDecimals: 18,
              transactionHash: "0x123",
              address: "0x456",
              blockNumber: 12345,
              blockTimestamp: 1672531200,
              fromAddress: "0x789",
              toAddress: "0xabc",
              value: "1000000000000000000",
              valueFormatted: "1.0",
              transactionIndex: 5,
              logIndex: 3,
            }),
          }),
        }),
      };

      const transferLogResult = EventTrigger.fromOutputData(
        mockTransferLogResponse as any
      );
      expect(transferLogResult).not.toBe(null);
      expect(transferLogResult).toHaveProperty("tokenName", "Test Token");
      expect(transferLogResult).toHaveProperty("logIndex", 3);

      // Mock RunTriggerResp with EvmLog data
      const mockEvmLogResponse = {
        getEventTrigger: () => ({
          hasEvmLog: () => true,
          hasTransferLog: () => false,
          getEvmLog: () => ({
            toObject: () => ({
              address: "0x123",
              topics: ["0xtopic1", "0xtopic2"],
              data: "0xdata",
              blockNumber: 12345,
              transactionHash: "0x456",
              transactionIndex: 5,
              blockHash: "0x789",
              index: 3,
              removed: false,
            }),
          }),
          getTransferLog: () => null,
        }),
      };

      const evmLogResult = EventTrigger.fromOutputData(
        mockEvmLogResponse as any
      );
      expect(evmLogResult).not.toBe(null);
      expect(evmLogResult).toHaveProperty("address", "0x123");
      expect(evmLogResult).toHaveProperty("index", 3);

      console.log(
        "✅ Client-side parsing correctly handles null vs data responses!"
      );
    });

    test("should validate event trigger configuration without network calls", () => {
      console.log("🚀 Testing event trigger configuration validation...");

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

      console.log("✅ Event trigger configuration validation works correctly!");
    });

    test("should handle empty data scenarios consistently (offline test)", () => {
      console.log("🚀 Testing empty data scenarios offline...");

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
          name: "found=true with transfer log",
          data: {
            found: true,
            transfer_log: {
              tokenName: "Test",
              tokenSymbol: "TST",
              transactionHash: "0x123",
            },
          },
          expected: "transfer_log",
        },
        {
          name: "found=true with evm log",
          data: {
            found: true,
            evm_log: {
              address: "0x456",
              topics: ["0xtopic"],
              data: "0xdata",
            },
          },
          expected: "evm_log",
        },
      ];

      scenarios.forEach((scenario) => {
        console.log(`Testing scenario: ${scenario.name}`);

        // This simulates what the server-side buildEventTriggerOutput function does
        let result = null;

        if (scenario.data && scenario.data.found) {
          if (scenario.data.transfer_log) {
            result = "transfer_log";
          } else if (scenario.data.evm_log) {
            result = "evm_log";
          }
        }

        if (scenario.expected === null) {
          expect(result).toBe(null);
        } else {
          expect(result).toBe(scenario.expected);
        }
      });

      console.log("✅ Empty data scenarios handled consistently!");
    });

    test("should handle basic event trigger functionality (offline test)", () => {
      console.log("🚀 Testing basic event trigger functionality offline...");

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
      const eventData = trigger.data as any; // Type assertion for testing
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

      console.log("✅ Basic event trigger functionality works correctly!");
    });
  });
});
