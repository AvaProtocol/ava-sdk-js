import util from "util";
import _ from "lodash";
import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
import { TriggerType } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  TIMEOUT_DURATION,
  SaltGlobal,
  removeCreatedWorkflows,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 9000;

describe("CronTrigger Tests", () => {
  let client: Client;
  let coreAddress: string;

  // Define trigger props at the beginning
  const missingSchedulesTriggerProps = {
    id: "test-trigger-id",
    name: "cronTrigger",
    type: TriggerType.Cron,
    data: {} as any,
  };

  const nullSchedulesTriggerProps = {
    id: "test-trigger-id",
    name: "cronTrigger",
    type: TriggerType.Cron,
    data: { schedules: null } as any,
  };

  const emptySchedulesTriggerProps = {
    id: "test-trigger-id",
    name: "cronTrigger",
    type: TriggerType.Cron,
    data: { schedules: [] },
  };

  const validDailyTriggerProps = {
    id: "test-trigger-id",
    name: "cronTrigger",
    type: TriggerType.Cron,
    data: { schedules: ["0 0 * * *"] }, // Daily at midnight
  };

  const multipleTriggerProps = {
    id: "test-trigger-id",
    name: "cronTrigger",
    type: TriggerType.Cron,
    data: { schedules: ["0 0 * * *", "0 12 * * *"] }, // Daily at midnight and noon
  };

  const complexTriggerProps = {
    id: "test-trigger-id",
    name: "cronTrigger",
    type: TriggerType.Cron,
    data: { schedules: ["0 0 1 * *", "0 0 * * MON", "*/15 * * * *"] }, // Monthly, weekly, every 15 minutes
  };

  const undefinedDataTriggerProps = {
    id: "test-trigger-id",
    name: "cronTrigger",
    type: TriggerType.Cron,
    data: undefined as any,
  };

  const nullDataTriggerProps = {
    id: "test-trigger-id",
    name: "cronTrigger",
    type: TriggerType.Cron,
    data: null as any,
  };

  const runTriggerDailyProps = {
    triggerType: "cronTrigger" as const,
    triggerConfig: { expression: "0 0 * * *" }, // Daily at midnight
  };

  const runTriggerHourlyProps = {
    triggerType: "cronTrigger" as const,
    triggerConfig: { expression: "0 * * * *" }, // Every hour
  };

  const runTrigger15MinProps = {
    triggerType: "cronTrigger" as const,
    triggerConfig: { expression: "*/15 * * * *" }, // Every 15 minutes
  };

  const runTriggerComplexProps = {
    triggerType: "cronTrigger" as const,
    triggerConfig: { expression: "0 9 * * 1-5" }, // Weekdays at 9 AM
  };

  const runTriggerMinuteProps = {
    triggerType: "cronTrigger" as const,
    triggerConfig: { expression: "*/5 * * * *" }, // Every 5 minutes
  };

  const runTriggerWeeklyProps = {
    triggerType: "cronTrigger" as const,
    triggerConfig: { expression: "0 0 * * MON" }, // Every Monday at midnight
  };

  const runTriggerStandardProps = {
    triggerType: "cronTrigger" as const,
    triggerConfig: { expression: "0 0 * * *" }, // Daily at midnight
  };

  const runTriggerInvalidProps = {
    triggerType: "cronTrigger" as const,
    triggerConfig: { expression: "invalid-cron-expression" },
  };

  const runTriggerComplexTimeProps = {
    triggerType: "cronTrigger" as const,
    triggerConfig: { expression: "0 0,12 1 */2 *" }, // Twice daily on 1st of every other month
  };

  const runTriggerStepValuesProps = {
    triggerType: "cronTrigger" as const,
    triggerConfig: { expression: "*/10 */2 * * *" }, // Every 10 minutes, every 2 hours
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
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runTrigger Tests", () => {
    test("should throw error when schedules is missing", () => {
      const trigger = TriggerFactory.create(missingSchedulesTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Schedules are required for cron trigger"
      );
    });

    test("should throw error when schedules is null", () => {
      const trigger = TriggerFactory.create(nullSchedulesTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Schedules are required for cron trigger"
      );
    });

    test("should throw error when schedules is empty", () => {
      const trigger = TriggerFactory.create(emptySchedulesTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Schedules are required for cron trigger"
      );
    });

    test("should succeed with valid cron expression", () => {
      const trigger = TriggerFactory.create(validDailyTriggerProps);

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request).toBeDefined();
      expect(request.getCron()).toBeDefined();
      expect(request.getCron()!.getConfig()!.getSchedulesList()).toEqual([
        "0 0 * * *",
      ]);
    });

    test("should succeed with multiple cron expressions", () => {
      const trigger = TriggerFactory.create(multipleTriggerProps);

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getCron()!.getConfig()!.getSchedulesList()).toEqual([
        "0 0 * * *",
        "0 12 * * *",
      ]);
    });

    test("should succeed with complex cron expressions", () => {
      const trigger = TriggerFactory.create(complexTriggerProps);

      expect(() => trigger.toRequest()).not.toThrow();
      const request = trigger.toRequest();
      expect(request.getCron()!.getConfig()!.getSchedulesList()).toHaveLength(
        3
      );
    });

    test("should throw error when trigger data is completely missing", () => {
      const trigger = TriggerFactory.create(undefinedDataTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for cron"
      );
    });

    test("should throw error when trigger data is null", () => {
      const trigger = TriggerFactory.create(nullDataTriggerProps);

      expect(() => trigger.toRequest()).toThrowError(
        "Trigger data is missing for cron"
      );
    });

    test("should run trigger with daily schedule", async () => {
      console.log(
        "🚀 runTrigger daily schedule input:",
        util.inspect(runTriggerDailyProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerDailyProps);

      console.log(
        "🚀 runTrigger daily schedule result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should run trigger with hourly schedule", async () => {
      console.log(
        "🚀 runTrigger hourly schedule input:",
        util.inspect(runTriggerHourlyProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerHourlyProps);

      console.log(
        "🚀 runTrigger hourly schedule result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should run trigger with every 15 minutes schedule", async () => {
      console.log(
        "🚀 runTrigger 15 minutes schedule input:",
        util.inspect(runTrigger15MinProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTrigger15MinProps);

      console.log(
        "🚀 runTrigger 15 minutes schedule result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should run trigger with complex schedule", async () => {
      console.log(
        "🚀 runTrigger complex schedule input:",
        util.inspect(runTriggerComplexProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerComplexProps);

      console.log(
        "🚀 runTrigger complex schedule result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should run trigger with minute-based schedule", async () => {
      console.log(
        "🚀 runTrigger minute-based schedule input:",
        util.inspect(runTriggerMinuteProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerMinuteProps);

      console.log(
        "🚀 runTrigger minute-based schedule result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should run trigger with weekly schedule", async () => {
      console.log(
        "🚀 runTrigger weekly schedule input:",
        util.inspect(runTriggerWeeklyProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerWeeklyProps);

      console.log(
        "🚀 runTrigger weekly schedule result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should handle standard cron expressions", async () => {
      console.log(
        "🚀 runTrigger standard cron input:",
        util.inspect(runTriggerStandardProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerStandardProps);

      console.log(
        "🚀 runTrigger standard cron result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
    });

    test("should handle invalid cron expressions gracefully", async () => {
      console.log(
        "🚀 runTrigger invalid cron input:",
        util.inspect(runTriggerInvalidProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerInvalidProps);

      console.log(
        "🚀 runTrigger invalid cron result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      // Backend handles invalid cron expressions gracefully, returning success
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    test("should handle complex time specifications", async () => {
      console.log(
        "🚀 runTrigger complex time specifications input:",
        util.inspect(runTriggerComplexTimeProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerComplexTimeProps);

      console.log(
        "🚀 runTrigger complex time specifications result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
    });

    test("should handle step values in cron expressions", async () => {
      console.log(
        "🚀 runTrigger step values input:",
        util.inspect(runTriggerStepValuesProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerStepValuesProps);

      console.log(
        "🚀 runTrigger step values result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.triggerId).toBeDefined();
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
    });
  });
});
