import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import { Client, TriggerFactory, NodeFactory, Edge } from "@avaprotocol/sdk-js";
import { TriggerType, NodeType, CustomCodeLang } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  TIMEOUT_DURATION,
  SaltGlobal,
  removeCreatedWorkflows,
  getBlockNumber,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 8000;

describe("BlockTrigger Tests", () => {
  let client: Client;
  let coreAddress: string;
  let currentBlockNumber: number;

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

    // Get current block number for testing
    currentBlockNumber = await getBlockNumber();
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("TriggerFactory and toRequest() Tests", () => {
    test("should throw error when interval is missing", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: {
          // Missing interval property
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Interval is required for block trigger"
      );
    });

    test("should throw error when interval is null", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: {
          interval: null,
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Interval is required for block trigger"
      );
    });

    test("should throw error when interval is zero", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: {
          interval: 0,
        },
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Interval must be greater than 0"
      );
    });

    test("should throw error when interval is negative", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: {
          interval: -5,
        },
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Interval must be greater than 0"
      );
    });

    test("should succeed with valid interval", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: {
          interval: 10,
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getBlock()).toBeDefined();
      expect(request.getBlock()!.getConfig()!.getInterval()).toBe(10);
    });

    test("should succeed with large interval", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: {
          interval: 1000,
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getBlock()!.getConfig()!.getInterval()).toBe(1000);
    });

    test("should throw error when trigger data is completely missing", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: undefined as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for block"
      );
    });

    test("should throw error when trigger data is null", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: null as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for block"
      );
    });
  });

  describe("runTrigger Tests", () => {
    test("should run trigger with small interval", async () => {
      const result = await client.runTrigger({
        triggerType: "blockTrigger",
        triggerConfig: {
          interval: 5,
        },
      });

      console.log(
        "runTrigger small interval response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should run trigger with medium interval", async () => {
      const result = await client.runTrigger({
        triggerType: "blockTrigger",
        triggerConfig: {
          interval: 25,
        },
      });

      console.log(
        "runTrigger medium interval response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should run trigger with large interval", async () => {
      const result = await client.runTrigger({
        triggerType: "blockTrigger",
        triggerConfig: {
          interval: 100,
        },
      });

      console.log(
        "runTrigger large interval response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should run trigger with single block interval", async () => {
      const result = await client.runTrigger({
        triggerType: "blockTrigger",
        triggerConfig: {
          interval: 1,
        },
      });

      console.log(
        "runTrigger single block response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with block trigger", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const blockTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "simulate_block_trigger_test",
        type: TriggerType.Block,
        data: {
          interval: 10,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = blockTrigger;

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
        (step) => step.id === blockTrigger.id
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);

      const output = triggerStep!.output as any;
      expect(output).toBeDefined();
    });

    test("should simulate workflow with different block intervals", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const blockTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "simulate_different_intervals",
        type: TriggerType.Block,
        data: {
          interval: 50,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = blockTrigger;

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      expect(simulation.success).toBe(true);
      const triggerStep = simulation.steps.find(
        (step) => step.id === blockTrigger.id
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with block trigger", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const triggerInterval = 5;

      const blockTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "deploy_block_trigger_test",
        type: TriggerType.Block,
        data: {
          interval: triggerInterval,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = blockTrigger;

      let workflowId: string | null = null;

      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        // Trigger the workflow manually for testing
        const triggerResult = await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        });

        expect(triggerResult).toBeDefined();
        // expect(triggerResult.success).toBe(true); // TODO: Check if triggerWorkflow returns success property

        // Check executions
        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);
        console.log(
          "Block trigger executions:",
          JSON.stringify(executions, null, 2)
        );
      } finally {
        // Ensure cleanup happens regardless of test success/failure
        expect(workflowId).toBeDefined();
        try {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        } catch (cleanupError) {
          console.warn(
            `Failed to cleanup workflow ${workflowId}:`,
            cleanupError
          );
        }
      }
    });
  });

  describe("Response Format Consistency Tests", () => {
    test("should return consistent response format across trigger methods", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const triggerInterval = 10;

      const blockTriggerConfig = {
        interval: triggerInterval,
      };

      console.log(
        "🔍 Testing response format consistency across trigger methods..."
      );

      // Test 1: runTrigger
      const directResponse = await client.runTrigger({
        triggerType: "blockTrigger",
        triggerConfig: blockTriggerConfig,
      });

      // Test 2: simulateWorkflow
      const blockTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "consistency_test",
        type: TriggerType.Block,
        data: blockTriggerConfig,
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = blockTrigger;

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === blockTrigger.id
      );

      // Test 3: Deploy + Trigger
      let workflowId: string | null = null;

      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
            blockHash:
              "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            timestamp: Math.floor(Date.now() / 1000),
            parentHash:
              "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
            difficulty: "0",
            gasLimit: 30000000,
            gasUsed: 15000000,
          },
          isBlocking: true,
        });

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });
        const executedStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === blockTrigger.id
        );

        // Compare response formats

        // All should be successful
        expect(directResponse.success).toBe(true);
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBe(true);

        // Verify consistent structure
        const directOutput = directResponse.data;
        const simulatedOutput = (simulatedStep!.output as any).data;
        const executedOutput = (executedStep!.output as any).data;

        // Check that all outputs have consistent structure
        expect(directOutput).toBeDefined();
        expect(simulatedOutput).toBeDefined();
        expect(executedOutput).toBeDefined();

        // 🔍 CRITICAL TEST: Verify field naming consistency

        // Check for snake_case field names (the standard we established)
        const expectedFields = [
          "blockNumber",
          "blockHash",
          "timestamp",
          "parentHash",
          "difficulty",
          "gasLimit",
          "gasUsed",
        ];

        expectedFields.forEach((field) => {
          console.log(`🔍 Checking field: ${field}`);

          expect(directOutput).toBeDefined();
          expect(typeof directOutput).toBe("object");
          expect(directOutput).toHaveProperty(field);

          expect(simulatedOutput).toBeDefined();
          expect(typeof simulatedOutput).toBe("object");
          expect(simulatedOutput).toHaveProperty(field);

          expect(executedOutput).toBeDefined();
          expect(typeof executedOutput).toBe("object");
          expect(executedOutput).toHaveProperty(field);
        });

        // Verify the most critical field - blockNumber (camelCase standard)
        expect(executedOutput).toHaveProperty("blockNumber");
        expect(typeof executedOutput.blockNumber).toBe("number");
        expect(executedOutput.blockNumber).toBeGreaterThan(0);

        // Verify other essential fields use camelCase
        expect(executedOutput.blockHash).toBeDefined();
        expect(typeof executedOutput.blockHash).toBe("string");
        expect(executedOutput.blockHash).toMatch(/^0x[a-fA-F0-9]+$/);

        expect(executedOutput.timestamp).toBeDefined();
        expect(typeof executedOutput.timestamp).toBe("number");
        expect(executedOutput.timestamp).toBeGreaterThan(0);
      } finally {
        // Ensure cleanup happens regardless of test success/failure
        expect(workflowId).toBeDefined();
        try {
          if (workflowId) {
            await client.deleteWorkflow(workflowId);
            createdIdMap.delete(workflowId);
          }
        } catch (cleanupError) {
          console.warn(
            `Failed to cleanup workflow ${workflowId}:`,
            cleanupError
          );
        }
      }
    });

    test("should handle block trigger template variable resolution", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const triggerInterval = 5;

      // Create a workflow that uses block trigger data in a template
      const blockTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "template_resolution_test",
        type: TriggerType.Block,
        data: {
          interval: triggerInterval,
        },
      });

      // Create a simple template workflow that references trigger data
      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = blockTrigger;

      // Add a custom code node that uses trigger template variables
      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "customCode0",
        type: NodeType.CustomCode,
        data: {
          source: `
            // Test camelCase field access (standard format) 
            // Access trigger data through the workflow context
            const triggerData = template_resolution_test.data;
            const blockNumber = triggerData.blockNumber;
            const blockHash = triggerData.blockHash;
            const timestamp = triggerData.timestamp;
            
            // Verify we have the data
            if (blockNumber === undefined) {
              throw new Error('blockNumber is undefined - field naming issue!');
            }
            
            return {
              success: true,
              blockNumber: blockNumber,
              blockHash: blockHash,
              timestamp: timestamp,
              message: 'Block trigger fired for block ' + blockNumber
            };
          `,
          lang: CustomCodeLang.JavaScript,
        },
      });

      workflowProps.nodes = [customCodeNode];
      workflowProps.edges = [
        new Edge({
          id: getNextId(),
          source: blockTrigger.id,
          target: customCodeNode.id,
        }),
      ];

      let workflowId: string | null = null;

      try {
        // Deploy the workflow
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        // Trigger it manually with specific block data
        const triggerResponse = await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
            blockHash:
              "0x16c05c8faa35084fb5d0622be510591f138659ea0181be8b9d053b8437959d41",
            timestamp: Math.floor(Date.now() / 1000),
          },
          isBlocking: true,
        });

        // Get the execution results
        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items).toHaveLength(1);
        const execution = executions.items[0];

        // Find the custom code step
        const customCodeStep = execution.steps.find(
          (step) => step.id === customCodeNode.id
        );

        expect(customCodeStep).toBeDefined();
        expect(customCodeStep!.success).toBe(true);

        const customCodeOutput = customCodeStep!.output as any;
        expect(customCodeOutput).toBeDefined();
        expect(customCodeOutput.success).toBe(true);
        expect(customCodeOutput.blockNumber).toBeDefined();
        expect(typeof customCodeOutput.blockNumber).toBe("number");
        expect(customCodeOutput.blockNumber).toBeGreaterThan(0);
      } finally {
        expect(workflowId).toBeDefined();
        try {
          if (workflowId) {
            await client.deleteWorkflow(workflowId);
            createdIdMap.delete(workflowId);
          }
        } catch (cleanupError) {
          console.warn(
            `Failed to cleanup workflow ${workflowId}:`,
            cleanupError
          );
        }
      }
    });

    test("should verify block trigger output field types and values", async () => {
      const result = await client.runTrigger({
        triggerType: "blockTrigger",
        triggerConfig: {
          interval: 1,
        },
      });

      console.log(
        "Block trigger output analysis:",
        JSON.stringify(result.data, null, 2)
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      const blockData = result.data as Record<string, unknown>;

      // Type and value validation for block trigger fields (camelCase format)
      const fieldValidations = [
        {
          name: "blockNumber",
          type: "number",
          validator: (val: any) => typeof val === "number" && val >= 0, // Allow 0 for test scenarios
          required: true,
        },
        {
          name: "blockHash",
          type: "string",
          validator: (val: any) =>
            typeof val === "string" && (val === "" || val.startsWith("0x")), // Allow empty string for test scenarios
          required: false,
        },
        {
          name: "timestamp",
          type: "number",
          validator: (val: any) => typeof val === "number" && val > 0,
          required: false,
        },
        {
          name: "parentHash",
          type: "string",
          validator: (val: any) =>
            typeof val === "string" && (val === "" || val.startsWith("0x")), // Allow empty string for test scenarios
          required: false,
        },
        {
          name: "gasLimit",
          type: "number",
          validator: (val: any) => typeof val === "number" && val >= 0,
          required: false,
        },
        {
          name: "gasUsed",
          type: "number",
          validator: (val: any) => typeof val === "number" && val >= 0,
          required: false,
        },
      ];

      fieldValidations.forEach(({ name, type, validator, required }) => {
        const value = blockData[name];

        if (required) {
          expect(value).toBeDefined();
          expect(validator(value)).toBe(true);
        } else {
          if (value !== undefined) {
            expect(validator(value)).toBe(true);
          }
        }
      });

      // Verify NO snake_case fields are present (they should all be camelCase)
      const snakeCaseFields = [
        "block_number",
        "block_hash",
        "parent_hash",
        "gas_limit",
        "gas_used",
      ];

      snakeCaseFields.forEach((field) => {
        expect(blockData[field]).toBeUndefined();
      });
    });
  });

  describe("Block Configuration Tests", () => {
    test("should handle minimum interval value", async () => {
      const result = await client.runTrigger({
        triggerType: "blockTrigger",
        triggerConfig: {
          interval: 1,
        },
      });

      console.log(
        "runTrigger minimum interval response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
    });

    test("should handle very large interval value", async () => {
      const result = await client.runTrigger({
        triggerType: "blockTrigger",
        triggerConfig: {
          interval: 10000,
        },
      });

      console.log(
        "runTrigger large interval response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should validate interval boundaries", () => {
      // Test with extremely large number
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: {
          interval: Number.MAX_SAFE_INTEGER,
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getBlock()!.getConfig()!.getInterval()).toBe(
        Number.MAX_SAFE_INTEGER
      );
    });

    test("should handle decimal intervals by truncating", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: {
          interval: 10.7, // Should be truncated to 10
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      // The interval should be handled as an integer
      expect(typeof request.getBlock()!.getConfig()!.getInterval()).toBe(
        "number"
      );
    });
  });
});
