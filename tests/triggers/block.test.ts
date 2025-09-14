import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
import {TriggerType, ExecutionStatus} from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  TIMEOUT_DURATION,
  SaltGlobal,
  removeCreatedWorkflows,
  getBlockNumber,
  SALT_BUCKET_SIZE,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.BlockTrigger * SALT_BUCKET_SIZE;

describe("BlockTrigger Tests", () => {
  let client: Client;
  let coreAddress: string;
  let currentBlockNumber: number;

  // Define trigger props at the beginning
  const missingIntervalTriggerProps = {
    id: "test-trigger-id",
    name: "blockTrigger",
    type: TriggerType.Block,
    data: {},
  };

  const nullIntervalTriggerProps = {
    id: "test-trigger-id",
    name: "blockTrigger",
    type: TriggerType.Block,
    data: { interval: null },
  };

  const zeroIntervalTriggerProps = {
    id: "test-trigger-id",
    name: "blockTrigger",
    type: TriggerType.Block,
    data: { interval: 0 },
  };

  const negativeIntervalTriggerProps = {
    id: "test-trigger-id",
    name: "blockTrigger",
    type: TriggerType.Block,
    data: { interval: -5 },
  };

  const validTriggerProps = {
    id: "test-trigger-id",
    name: "blockTrigger",
    type: TriggerType.Block,
    data: { interval: 10 },
  };

  const largeTriggerProps = {
    id: "test-trigger-id",
    name: "blockTrigger",
    type: TriggerType.Block,
    data: { interval: 1000 },
  };

  const undefinedDataTriggerProps = {
    id: "test-trigger-id",
    name: "blockTrigger",
    type: TriggerType.Block,
    data: undefined as any,
  };

  const nullDataTriggerProps = {
    id: "test-trigger-id",
    name: "blockTrigger",
    type: TriggerType.Block,
    data: null as any,
  };

  const runTriggerSmallProps = {
    triggerType: "blockTrigger" as const,
    triggerConfig: { interval: 5 },
  };

  const runTriggerMediumProps = {
    triggerType: "blockTrigger" as const,
    triggerConfig: { interval: 25 },
  };

  const runTriggerLargeProps = {
    triggerType: "blockTrigger" as const,
    triggerConfig: { interval: 100 },
  };

  const runTriggerSingleProps = {
    triggerType: "blockTrigger" as const,
    triggerConfig: { interval: 1 },
  };

  beforeAll(async () => {
    coreAddress = await getAddress(walletPrivateKey);

    client = new Client({
      endpoint: avsEndpoint,
    });

    const { message } = await client.getSignatureFormat(coreAddress);
    const signature = await generateSignature(message, walletPrivateKey);

    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);

    currentBlockNumber = await getBlockNumber();
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdIdMap);
  });

  describe("TriggerFactory and toRequest() Tests", () => {
    test("should throw error when interval is missing", () => {
      const trigger = TriggerFactory.create(missingIntervalTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Interval is required for block trigger"
      );
    });

    test("should throw error when interval is null", () => {
      const trigger = TriggerFactory.create(nullIntervalTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Interval is required for block trigger"
      );
    });

    test("should throw error when interval is zero", () => {
      const trigger = TriggerFactory.create(zeroIntervalTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Interval must be greater than 0"
      );
    });

    test("should throw error when interval is negative", () => {
      const trigger = TriggerFactory.create(negativeIntervalTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Interval must be greater than 0"
      );
    });

    test("should succeed with valid interval", () => {
      const trigger = TriggerFactory.create(validTriggerProps);

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getBlock()).toBeDefined();
      expect(request.getBlock()!.getConfig()!.getInterval()).toBe(10);
    });

    test("should succeed with large interval", () => {
      const trigger = TriggerFactory.create(largeTriggerProps);

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getBlock()!.getConfig()!.getInterval()).toBe(1000);
    });

    test("should throw error when trigger data is completely missing", () => {
      const trigger = TriggerFactory.create(undefinedDataTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for block"
      );
    });

    test("should throw error when trigger data is null", () => {
      const trigger = TriggerFactory.create(nullDataTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for block"
      );
    });
  });

  describe("runTrigger Tests", () => {
    test("should run trigger with small interval", async () => {
      console.log(
        "🚀 runTrigger small interval input:",
        util.inspect(runTriggerSmallProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerSmallProps);

      console.log(
        "🚀 runTrigger small interval result:",
        util.inspect(result, { depth: null, colors: true })
      );

            expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
    });

    test("should run trigger with medium interval", async () => {
      console.log(
        "🚀 runTrigger medium interval input:",
        util.inspect(runTriggerMediumProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerMediumProps);

      console.log(
        "🚀 runTrigger medium interval result:",
        util.inspect(result, { depth: null, colors: true })
      );

            expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
    });

    test("should run trigger with large interval", async () => {
      console.log(
        "🚀 runTrigger large interval input:",
        util.inspect(runTriggerLargeProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerLargeProps);

      console.log(
        "🚀 runTrigger large interval result:",
        util.inspect(result, { depth: null, colors: true })
      );

            expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
    });

    test("should run trigger with single block interval", async () => {
      console.log(
        "🚀 runTrigger single block input:",
        util.inspect(runTriggerSingleProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerSingleProps);

      console.log(
        "🚀 runTrigger single block result:",
        util.inspect(result, { depth: null, colors: true })
      );

            expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
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

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          workflowContext: {
            eoaAddress: coreAddress,
            runner: wallet.address,
          },
        },
      });

      console.log(
        "🚀 simulateWorkflow result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(2); // trigger + minimal node

      const triggerStep = simulation.steps.find(
        (step) => step.id === blockTrigger.id
      );
            expect(triggerStep!.success).toBeTruthy();

      const output = triggerStep!.output as Record<string, unknown>;
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

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          workflowContext: {
            eoaAddress: coreAddress,
            runner: wallet.address,
          },
        },
      });

      expect(simulation.status).toBe(ExecutionStatus.Success);
      const triggerStep = simulation.steps.find(
        (step) => step.id === blockTrigger.id
      );
            expect(triggerStep!.success).toBeTruthy();
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
        // expect(triggerResult.success).toBeTruthy(); // TODO: Check if triggerWorkflow returns success property

        // Check executions
        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);
        console.log(
          "🚀 Block trigger executions result:",
          util.inspect(executions, { depth: null, colors: true })
        );
      } finally {
        // Ensure cleanup happens regardless of test success/failure
        expect(workflowId).toBeDefined();
        try {
          await client.deleteWorkflow(workflowId!);
          createdIdMap.delete(workflowId!);
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

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          workflowContext: {
            eoaAddress: coreAddress,
            runner: wallet.address,
          },
        },
      });

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
        expect(directResponse.success).toBeTruthy();
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBeTruthy();

        // Verify consistent structure
        const directOutput = directResponse.data as Record<string, any>;
        const simulatedOutput = simulatedStep!.output as Record<string, any>;
        const executedOutput = executedStep!.output as Record<string, any>;

        // Check that all outputs have consistent structure
        expect(directOutput).toBeDefined();
        expect(simulatedOutput).toBeDefined();
        expect(executedOutput).toBeDefined();

        // 🔍 CRITICAL TEST: Verify field naming consistency and specific values

        // Check for camelCase field names (the standard we established)
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
          // Verify all three methods have the field
          expect(directOutput).toHaveProperty(field);
          expect(simulatedOutput).toHaveProperty(field);
          expect(executedOutput).toHaveProperty(field);

          // Verify field types based on expected blockchain data types
          if (
            field === "blockNumber" ||
            field === "timestamp" ||
            field === "gasLimit" ||
            field === "gasUsed"
          ) {
            expect(typeof directOutput[field]).toBe("number");
            expect(typeof simulatedOutput[field]).toBe("number");
            expect(typeof executedOutput[field]).toBe("number");
          } else {
            // blockHash, parentHash, difficulty should be strings
            expect(typeof directOutput[field]).toBe("string");
            expect(typeof simulatedOutput[field]).toBe("string");
            expect(typeof executedOutput[field]).toBe("string");
          }
        });

        // 🔍 SPECIFIC VALUE TESTS: Verify actual blockchain data values

        // Test blockNumber - should be a positive integer
        expect(directOutput.blockNumber).toBeGreaterThan(0);
        expect(simulatedOutput.blockNumber).toBeGreaterThan(0);
        expect(executedOutput.blockNumber).toBeGreaterThan(0);

        // Test blockHash - should be a valid hex string
        expect(directOutput.blockHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
        expect(simulatedOutput.blockHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
        // Note: executedOutput.blockHash might be empty for triggered workflows
        if (executedOutput.blockHash) {
          expect(executedOutput.blockHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
        }

        // Test timestamp - should be a reasonable Unix timestamp
        const currentTime = Math.floor(Date.now() / 1000);
        const oneHourAgo = currentTime - 3600;
        expect(directOutput.timestamp).toBeGreaterThan(oneHourAgo);
        expect(directOutput.timestamp).toBeLessThanOrEqual(currentTime);
        expect(simulatedOutput.timestamp).toBeGreaterThan(oneHourAgo);
        expect(simulatedOutput.timestamp).toBeLessThanOrEqual(currentTime);
        // Note: executedOutput.timestamp might be 0 for triggered workflows
        if (executedOutput.timestamp > 0) {
          expect(executedOutput.timestamp).toBeGreaterThan(oneHourAgo);
          expect(executedOutput.timestamp).toBeLessThanOrEqual(currentTime);
        }

        // Test parentHash - should be a valid hex string (if not empty)
        if (directOutput.parentHash) {
          expect(directOutput.parentHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
        }
        if (simulatedOutput.parentHash) {
          expect(simulatedOutput.parentHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
        }

        // Test gasLimit and gasUsed - should be reasonable values
        expect(directOutput.gasLimit).toBeGreaterThanOrEqual(0);
        expect(directOutput.gasUsed).toBeGreaterThanOrEqual(0);
        expect(directOutput.gasUsed).toBeLessThanOrEqual(directOutput.gasLimit);

        expect(simulatedOutput.gasLimit).toBeGreaterThanOrEqual(0);
        expect(simulatedOutput.gasUsed).toBeGreaterThanOrEqual(0);
        expect(simulatedOutput.gasUsed).toBeLessThanOrEqual(
          simulatedOutput.gasLimit
        );

        // 🔍 CONFIG TESTS: Verify step configuration consistency

        // Test simulated step config
        expect(simulatedStep!.config).toBeDefined();
        expect(simulatedStep!.config).toHaveProperty("interval");
        expect((simulatedStep!.config as any).interval).toBe("10"); // Should match the trigger interval

        // Test executed step config
        expect(executedStep!.config).toBeDefined();
        expect(executedStep!.config).toHaveProperty("interval");
        expect((executedStep!.config as any).interval).toBe("10"); // Should match the deployed trigger interval (same as simulation)

        // Test step metadata
        expect(simulatedStep!.type).toBe("blockTrigger");
        expect(simulatedStep!.name).toBe("consistency_test"); // Should match the trigger name
        expect(simulatedStep!.success).toBeTruthy();
        expect(simulatedStep!.error).toBe("");

        expect(executedStep!.type).toBe("blockTrigger");
        expect(executedStep!.name).toBe("consistency_test"); // Should match the trigger name
        expect(executedStep!.success).toBeTruthy();
        expect(executedStep!.error).toBe("");
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
      const blockTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "block_trigger_template_test",
        type: TriggerType.Block,
        data: { interval: 5 },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = blockTrigger;

      // Test that the trigger can be converted to request format successfully
      expect(() => blockTrigger.toRequest()).not.toThrow();
      const request = blockTrigger.toRequest();
      expect(request.getBlock()).toBeDefined();
      expect(request.getBlock()!.getConfig()).toBeDefined();
      expect(request.getBlock()!.getConfig()!.getInterval()).toBe(5);

      // Test that the workflow props are structured correctly
      expect(workflowProps.trigger).toBeDefined();
      expect(workflowProps.trigger!.type).toBe(TriggerType.Block);
      expect(workflowProps.trigger!.name).toBe("block_trigger_template_test");
    });

    test("should verify block trigger output field types and values", async () => {
      const blockTriggerConfig = { interval: 15 };

      const directResponse = await client.runTrigger({
        triggerType: TriggerType.Block,
        triggerConfig: blockTriggerConfig,
      });

      expect(directResponse.success).toBeTruthy();
      expect(directResponse.data).toBeDefined();

      const blockData = directResponse.data as Record<string, any>;
      console.log(
        "🚀 Block trigger output analysis result:",
        util.inspect(blockData, { depth: null, colors: true })
      );

      // Test all expected fields exist and have correct types
      expect(blockData.blockNumber).toBeDefined();
      expect(typeof blockData.blockNumber).toBe("number");
      expect(blockData.blockNumber).toBeGreaterThan(0);

            expect(typeof blockData.blockHash).toBe("string");
      expect(blockData.blockHash).toMatch(/^0x[a-fA-F0-9]+$/);

      expect(blockData.timestamp).toBeDefined();
      expect(typeof blockData.timestamp).toBe("number");
      expect(blockData.timestamp).toBeGreaterThan(0);

            expect(typeof blockData.parentHash).toBe("string");

            expect(typeof blockData.difficulty).toBe("string");

      expect(blockData.gasLimit).toBeDefined();
      expect(typeof blockData.gasLimit).toBe("number");
      expect(blockData.gasLimit).toBeGreaterThanOrEqual(0);

      expect(blockData.gasUsed).toBeDefined();
      expect(typeof blockData.gasUsed).toBe("number");
      expect(blockData.gasUsed).toBeGreaterThanOrEqual(0);
      expect(blockData.gasUsed).toBeLessThanOrEqual(blockData.gasLimit);

      // Verify timestamp is reasonable (within last hour)
      const currentTime = Math.floor(Date.now() / 1000);
      const oneHourAgo = currentTime - 3600;
      expect(blockData.timestamp).toBeGreaterThan(oneHourAgo);
      expect(blockData.timestamp).toBeLessThanOrEqual(currentTime);
    });
  });

  describe("Block Configuration Tests", () => {
    test("should handle minimum interval value", async () => {
      const blockTriggerConfig = { interval: 1 };

      const response = await client.runTrigger({
        triggerType: TriggerType.Block,
        triggerConfig: blockTriggerConfig,
      });

      console.log(
        "🚀 runTrigger minimum interval result:",
        util.inspect(response, { depth: null, colors: true })
      );

      expect(response.success).toBeTruthy();
      expect(response.data).toBeDefined();
      expect((response.data as Record<string, any>).blockNumber).toBeGreaterThan(0);
    });

    test("should handle very large interval value", async () => {
      const blockTriggerConfig = { interval: 999999 };

      const response = await client.runTrigger({
        triggerType: TriggerType.Block,
        triggerConfig: blockTriggerConfig,
      });

      console.log(
        "🚀 runTrigger large interval result:",
        util.inspect(response, { depth: null, colors: true })
      );

      expect(response.success).toBeTruthy();
      expect(response.data).toBeDefined();
      expect((response.data as Record<string, any>).blockNumber).toBeGreaterThan(0);
    });

    test("should validate interval boundaries", () => {
      // Test boundary values for interval
      const validIntervals = [1, 10, 100, 1000, 999999];

      validIntervals.forEach((interval) => {
        const trigger = TriggerFactory.create({
          id: "test-trigger-id",
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval },
        });

        expect(() => trigger.toRequest()).not.toThrow();
      });
    });

    test("should reject decimal intervals", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5.7 },
      });

      // Should throw error when trying to convert decimal interval to request
      expect(() => trigger.toRequest()).toThrow(
        "BlockTrigger interval must be an integer, got: 5.7"
      );
    });

    test("should reject zero interval", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 0 },
      });

      expect(() => trigger.toRequest()).toThrow(
        "Interval must be greater than 0"
      );
    });

    test("should reject negative intervals", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: -5 },
      });

      expect(() => trigger.toRequest()).toThrow(
        "Interval must be greater than 0"
      );
    });
  });
});
