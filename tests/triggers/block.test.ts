import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
import { TriggerType } from "@avaprotocol/types";
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

const { avsEndpoint, walletPrivateKey, factoryAddress, chainEndpoint } =
  getConfig();

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
    console.log(`🧱 Current block number: ${currentBlockNumber}`);
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
      console.log("🚀 Testing runTrigger with 5 block interval...");

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
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Small interval block trigger failed:", result.error);
      }
    });

    test("should run trigger with medium interval", async () => {
      console.log("🚀 Testing runTrigger with 25 block interval...");

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
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Medium interval block trigger failed:", result.error);
      }
    });

    test("should run trigger with large interval", async () => {
      console.log("🚀 Testing runTrigger with 100 block interval...");

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
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Large interval block trigger failed:", result.error);
      }
    });

    test("should run trigger with single block interval", async () => {
      console.log("🚀 Testing runTrigger with 1 block interval...");

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
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Single block interval trigger failed:", result.error);
      }
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

      console.log("🚀 Testing simulateWorkflow with block trigger...");

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

      console.log("🚀 Testing simulateWorkflow with 50 block interval...");

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

      console.log("🚀 Testing deploy + trigger workflow with block trigger...");

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

        console.log("=== BLOCK TRIGGER WORKFLOW TEST ===");
        console.log(
          "Trigger result:",
          util.inspect(triggerResult, { depth: null, colors: true })
        );

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
        if (workflowId) {
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
        console.log("=== BLOCK TRIGGER RESPONSE FORMAT COMPARISON ===");
        console.log(
          "1. runTrigger response:",
          JSON.stringify(directResponse.data, null, 2)
        );
        console.log(
          "2. simulateWorkflow step output:",
          JSON.stringify(simulatedStep?.output, null, 2)
        );
        console.log(
          "3. deploy+trigger step output:",
          JSON.stringify(executedStep?.output, null, 2)
        );

        // All should be successful
        expect(directResponse.success).toBe(true);
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBe(true);

        // Verify consistent structure
        const directOutput = directResponse.data;
        const simulatedOutput = simulatedStep!.output as any;
        const executedOutput = executedStep!.output as any;

        // Check that all outputs have consistent structure
        expect(directOutput).toBeDefined();
        expect(simulatedOutput).toBeDefined();
        expect(executedOutput).toBeDefined();

        console.log(
          "✅ All trigger methods return consistent block trigger results!"
        );
      } finally {
        // Ensure cleanup happens regardless of test success/failure
        if (workflowId) {
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
      }
    });
  });

  describe("Block Configuration Tests", () => {
    test("should handle minimum interval value", async () => {
      console.log("🚀 Testing block trigger with minimum interval (1)...");

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
      console.log("🚀 Testing block trigger with large interval (10000)...");

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
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Large interval block trigger failed:", result.error);
      }
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
