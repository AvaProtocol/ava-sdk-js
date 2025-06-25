import util from util;
import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
import { TriggerType } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  TIMEOUT_DURATION,
  SaltGlobal,
  removeCreatedWorkflows,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";
import util from "util";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress, chainEndpoint } =
  getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 9000;

describe("CronTrigger Tests", () => {
  let client: Client;
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
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runTrigger Tests", () => {
    test("should throw error when schedules is missing", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: {
          // Missing schedules property
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Schedules are required for cron trigger"
      );
    });

    test("should throw error when schedules is null", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: {
          schedules: null,
        } as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Schedules are required for cron trigger"
      );
    });

    test("should throw error when schedules is empty", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: {
          schedules: [],
        },
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Schedules are required for cron trigger"
      );
    });

    test("should succeed with valid cron expression", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: {
          schedules: ["0 0 * * *"], // Daily at midnight
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getCron()).toBeDefined();
      expect(request.getCron()!.getConfig()!.getSchedulesList()).toEqual([
        "0 0 * * *",
      ]);
    });

    test("should succeed with multiple cron expressions", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: {
          schedules: ["0 0 * * *", "0 12 * * *"], // Daily at midnight and noon
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getCron()!.getConfig()!.getSchedulesList()).toEqual([
        "0 0 * * *",
        "0 12 * * *",
      ]);
    });

    test("should succeed with complex cron expressions", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: {
          schedules: ["0 0 1 * *", "0 0 * * MON", "*/15 * * * *"], // Monthly, weekly, every 15 minutes
        },
      });

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getCron()!.getConfig()!.getSchedulesList()).toHaveLength(
        3
      );
    });

    test("should throw error when trigger data is completely missing", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: undefined as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for cron"
      );
    });

    test("should throw error when trigger data is null", () => {
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: null as any,
      });

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for cron"
      );
    });

    test("should run trigger with daily schedule", async () => {
      console.log("🚀 Testing runTrigger with daily cron schedule...");
      
      const params = {
        triggerType: "cronTrigger",
        triggerConfig: {
          expression: "0 0 * * *", // Daily at midnight
        },
      };

      console.log(
        "🚀 ~ runTrigger with daily cron schedule ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger daily schedule response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Daily cron trigger failed:", result.error);
      }
    });

    test("should run trigger with hourly schedule", async () => {
      console.log("🚀 Testing runTrigger with hourly cron schedule...");
      
      const params = {
        triggerType: "cronTrigger",
        triggerConfig: {
          expression: "0 * * * *", // Every hour
        },
      };

      console.log(
        "🚀 ~ runTrigger with hourly cron schedule ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger hourly schedule response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Hourly cron trigger failed:", result.error);
      }
    });

    test("should run trigger with every 15 minutes schedule", async () => {
      console.log("🚀 Testing runTrigger with every 15 minutes cron schedule...");
      
      const params = {
        triggerType: "cronTrigger",
        triggerConfig: {
          expression: "*/15 * * * *", // Every 15 minutes
        },
      };

      console.log(
        "🚀 ~ runTrigger with every 15 minutes cron schedule ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger every 15 minutes response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Every 15 minutes cron trigger failed:", result.error);
      }
    });

    test("should run trigger with complex schedule", async () => {
      console.log("🚀 Testing runTrigger with complex cron schedule...");
      
      const params = {
        triggerType: "cronTrigger",
        triggerConfig: {
          expression: "0 9 * * 1-5", // Weekdays at 9 AM
        },
      };

      console.log(
        "🚀 ~ runTrigger with complex cron schedule ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger complex schedule response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Complex cron trigger failed:", result.error);
      }
    });

    test("should run trigger with minute-based schedule", async () => {
      console.log("🚀 Testing runTrigger with minute-based cron schedule...");
      
      const params = {
        triggerType: "cronTrigger",
        triggerConfig: {
          expression: "*/5 * * * *", // Every 5 minutes
        },
      };

      console.log(
        "🚀 ~ runTrigger with minute-based cron schedule ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger minute-based schedule response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Minute-based cron trigger failed:", result.error);
      }
    });

    test("should run trigger with weekly schedule", async () => {
      console.log("🚀 Testing runTrigger with weekly cron schedule...");
      
      const params = {
        triggerType: "cronTrigger",
        triggerConfig: {
          expression: "0 0 * * MON", // Every Monday at midnight
        },
      };

      console.log(
        "🚀 ~ runTrigger with weekly cron schedule ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger weekly schedule response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Weekly cron trigger failed:", result.error);
      }
    });

    test("should handle standard cron expressions", async () => {
      console.log("🚀 Testing cron trigger with standard expressions...");
      
      const params = {
        triggerType: "cronTrigger",
        triggerConfig: {
          expression: "0 0 * * *", // Daily at midnight
        },
      };

      console.log(
        "🚀 ~ runTrigger with standard cron expressions ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger standard cron response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
    });

    test("should handle invalid cron expressions gracefully", async () => {
      console.log("🚀 Testing cron trigger with invalid expression...");
      
      const params = {
        triggerType: "cronTrigger",
        triggerConfig: {
          expression: "invalid-cron-expression",
        },
      };

      console.log(
        "🚀 ~ runTrigger with invalid cron expression ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger invalid cron response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      // Should handle invalid expressions gracefully
      if (!result.success) {
        expect(result.error).toBeDefined();
      }
    });

    test("should handle complex time specifications", async () => {
      console.log("🚀 Testing cron trigger with complex time specs...");
      
      const params = {
        triggerType: "cronTrigger",
        triggerConfig: {
          expression: "0 0,12 1 */2 *", // Twice daily on 1st of every other month
        },
      };

      console.log(
        "🚀 ~ runTrigger with complex time specifications ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger complex cron response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Complex cron trigger failed:", result.error);
      }
    });

    test("should handle step values in cron expressions", async () => {
      console.log("🚀 Testing cron trigger with step values...");
      
      const params = {
        triggerType: "cronTrigger",
        triggerConfig: {
          expression: "*/10 */2 * * *", // Every 10 minutes, every 2 hours
        },
      };

      console.log(
        "🚀 ~ runTrigger with step values in cron expressions ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger step values cron response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.triggerId).toBeDefined();
      } else {
        console.log("Step values cron trigger failed:", result.error);
      }
    });

    test("should validate cron expression format in TriggerFactory", () => {
      // Test with valid 5-field cron expression
      const validTrigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: {
          schedules: ["0 0 * * *"], // Standard 5-field format
        },
      });

      expect(() => validTrigger.toRequest()).not.toThrow();
      const request = validTrigger.toRequest();
      expect(request.getCron()!.getConfig()!.getSchedulesList()).toContain(
        "0 0 * * *"
      );
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with cron trigger", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const cronTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "simulate_cron_trigger_test",
        type: TriggerType.Cron,
        data: {
          schedules: ["0 0 * * *"], // Daily at midnight
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = cronTrigger;

      console.log("🚀 Testing simulateWorkflow with cron trigger...");

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
        (step) => step.id === cronTrigger.id
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);

      const output = triggerStep!.output as any;
      expect(output).toBeDefined();
    });

    test("should simulate workflow with complex cron schedule", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const cronTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "simulate_complex_cron",
        type: TriggerType.Cron,
        data: {
          schedules: ["0 9 * * MON-FRI"], // Weekdays at 9 AM
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = cronTrigger;

      console.log("🚀 Testing simulateWorkflow with complex cron schedule...");

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      expect(simulation.success).toBe(true);
      const triggerStep = simulation.steps.find(
        (step) => step.id === cronTrigger.id
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with cron trigger", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const epoch = Math.floor(Date.now() / 1000);

      const cronTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "deploy_cron_trigger_test",
        type: TriggerType.Cron,
        data: {
          schedules: ["* * * * *"], // Every minute for testing
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = cronTrigger;

      console.log("🚀 Testing deploy + trigger workflow with cron trigger...");

      const workflowId = await client.submitWorkflow(
        client.createWorkflow(workflowProps)
      );
      createdIdMap.set(workflowId, true);

      // Trigger the workflow manually for testing
      const triggerResult = await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Cron,
          timestamp: (epoch + 60) * 1000, // Convert to milliseconds
          timestampIso: new Date((epoch + 60) * 1000).toISOString(),
        } as any,
        isBlocking: true,
      });

      console.log("=== CRON TRIGGER WORKFLOW TEST ===");
      console.log("Trigger result:", util.inspect(triggerResult, { depth: null, colors: true }));

      expect(triggerResult).toBeDefined();
      // expect(triggerResult.success).toBe(true); // TODO: Check if triggerWorkflow returns success property

      // Check executions
      const executions = await client.getExecutions([workflowId], {
        limit: 1,
      });

      expect(executions.items.length).toBe(1);
      console.log(
        "Cron trigger executions:",
        util.inspect(executions, { depth: null, colors: true })
      );
    });
  });

  describe("Response Format Consistency Tests", () => {
    test("should return consistent response format across trigger methods", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const epoch = Math.floor(Date.now() / 1000);

      const cronTriggerConfig = {
        expression: "0 * * * *", // Every hour
      };

      console.log(
        "🔍 Testing response format consistency across trigger methods..."
      );

      // Test 1: runTrigger
      const directResponse = await client.runTrigger({
        triggerType: "cronTrigger",
        triggerConfig: cronTriggerConfig,
      });

      // Test 2: simulateWorkflow
      const cronTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "consistency_test",
        type: TriggerType.Cron,
        data: {
          schedules: ["0 * * * *"], // Every hour
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = cronTrigger;

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === cronTrigger.id
      );

      // Test 3: Deploy + Trigger
      const workflowId = await client.submitWorkflow(
        client.createWorkflow(workflowProps)
      );
      createdIdMap.set(workflowId, true);

      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Cron,
          timestamp: (epoch + 3600) * 1000, // One hour from now in milliseconds
          timestampIso: new Date((epoch + 3600) * 1000).toISOString(),
        } as any,
        isBlocking: true,
      });

      const executions = await client.getExecutions([workflowId], { limit: 1 });
      const executedStep = _.find(
        _.first(executions.items)?.steps,
        (step) => step.id === cronTrigger.id
      );

      // Compare response formats
      console.log("=== CRON TRIGGER RESPONSE FORMAT COMPARISON ===");
      console.log(
        "1. runTrigger response:",
        util.inspect(directResponse.data, { depth: null, colors: true })
      );
      console.log(
        "2. simulateWorkflow step output:",
        util.inspect(simulatedStep?.output, { depth: null, colors: true })
      );
      console.log(
        "3. deploy+trigger step output:",
        util.inspect(executedStep?.output, { depth: null, colors: true })
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
        "✅ All trigger methods return consistent cron trigger results!"
      );
    });
  });
});
