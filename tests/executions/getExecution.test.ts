import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import {
  TriggerType,
  ExecutionStatus,
  NodeType,
  CustomCodeLang,
} from "@avaprotocol/types";
import util from "util";
import _ from "lodash";
import {
  getAddress,
  generateSignature,
  getBlockNumber,
  SaltGlobal,
  TIMEOUT_DURATION,
  SALT_BUCKET_SIZE,
} from "../utils/utils";
import { executionHasWriteFailure } from "../utils/utils";
import { createFromTemplate, defaultTriggerId } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

let saltIndex = SaltGlobal.GetExecution * SALT_BUCKET_SIZE;

describe("getExecution Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(walletPrivateKey);

    client = new Client({
      endpoint: avsEndpoint,
    });

    const { message } = await client.getSignatureFormat(ownerAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });
    client.setAuthKey(res.authKey);
  });

  // This test verifies that after a workflow is triggered,
  // the specific execution can be fetched using the workflowId and the executionId from the trigger response.
  test("should retrieve a specific execution by ID after triggering it", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });
      workflowProps.maxExecution = 3; // Set to 3 to give the workflow enough runs while not being infinite

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const triggerResult = await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      const execution = await client.getExecution(
        workflowId,
        triggerResult.executionId
      );

      expect(execution).toBeDefined();
      expect(execution.id).toEqual(triggerResult.executionId);
      // Ensure status reflects step outcomes
      const hasWriteFailure = executionHasWriteFailure(execution as any);
      if (hasWriteFailure) {
        expect([ExecutionStatus.Failed, ExecutionStatus.PartialSuccess]).toContain(execution.status);
      } else {
        expect(execution.status).toBe(ExecutionStatus.Success);
      }

      // The execution now contains both trigger and node steps
      // Step 0: Trigger step, Step 1: ETH transfer node
      expect(execution.steps).toBeDefined();
      expect(execution.steps.length).toBeGreaterThanOrEqual(2);

      // The first step should be the trigger step
      const triggerStep = execution.steps[0];
      expect(triggerStep.type).toEqual(TriggerType.Block);
      expect(triggerStep.name).toEqual("blockTrigger");
      expect(triggerStep.success).toBeTruthy();

      // The second step should be the CustomCode node
      const customCodeStep = execution.steps[1];
      expect(customCodeStep.type).toEqual(NodeType.CustomCode);
      expect(customCodeStep.name).toEqual("customCode");
      expect(customCodeStep.success).toBeTruthy();

      // Execution context should exist and be camelCased at step level for trigger and/or overall execution
      // Note: getExecution returns server objects; ensure presence at least on the first step (trigger)
      // Execution context should exist for at least the custom code step in deployed runs
      expect((customCodeStep as any).executionContext).toBeDefined();

      // Verify the trigger data is available in the inputs
      expect(customCodeStep.inputsList).toContain("blockTrigger.data");
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  // This test ensures that the system correctly handles requests for executions
  // where the provided workflow ID does not exist, expecting an error.
  test("should throw error when trying to get an execution with a non-existent workflow ID", async () => {
    const nonExistentExecutionId = "non-existent-execution-id";

    await expect(
      client.getExecution("non-existent-workflow-id", nonExistentExecutionId)
    ).rejects.toThrowError(/task not found|NOT_FOUND|resource not found/i);
  });

  test("should throw error when using a valid workflow ID but a non-existent execution ID", async () => {
    // This test checks that an error is thrown if a valid workflow ID is used
    // but the specified execution ID does not exist for that workflow.
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const nonExistentExecutionId = "non-existent-execution-id";

      await expect(
        client.getExecution(workflowId, nonExistentExecutionId)
      ).rejects.toThrowError(
        /execution not found|NOT_FOUND|resource not found/i
      );
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  // This test verifies that a cron-triggered workflow execution can be fetched,
  // and its status is correctly reported as FINISHED after a blocking trigger.
  test("should retrieve execution with correct status after triggering workflow (cron based)", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const epoch = Math.floor(Date.now() / 1000);
    let workflowId: string | undefined;

    try {
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: { schedules: ["* * * * *"] },
      });

      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = trigger;
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const result = await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Cron,
          timestamp: (epoch + 60) * 1000, // Convert to milliseconds
          timestampIso: new Date((epoch + 60) * 1000).toISOString(),
        } as any,
        isBlocking: true,
      });

      const execution = await client.getExecution(
        workflowId,
        result.executionId
      );
      expect(execution.id).toEqual(result.executionId);

      // The execution now contains both trigger and node steps
      // Step 0: Trigger step, Step 1: ETH transfer node
      expect(execution.steps).toBeDefined();
      expect(execution.steps.length).toBeGreaterThanOrEqual(2);

      // The first step should be the trigger step
      const triggerStep = execution.steps[0];
      expect(triggerStep.type).toEqual(TriggerType.Cron);
      expect(triggerStep.name).toEqual("cronTrigger");
      expect(triggerStep.success).toBeTruthy();

      // The second step should be the CustomCode node
      const customCodeStep = execution.steps[1];
      expect(customCodeStep.type).toEqual(NodeType.CustomCode);
      expect(customCodeStep.name).toEqual("customCode");
      expect(customCodeStep.success).toBeTruthy();

      // Verify the trigger data is available in the inputs
      expect(customCodeStep.inputsList).toContain("cronTrigger.data");

      const executionStatus = await client.getExecutionStatus(
        workflowId,
        result.executionId
      );
      expect(executionStatus).toEqual(ExecutionStatus.Success);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  // This test ensures that an execution ID obtained from the getExecutions() list
  // can be used to successfully fetch the details of that specific execution.s
  test("should retrieve execution by ID obtained from getExecutions list", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTriggerForGetExecutionsTest",
        type: TriggerType.Block,
        data: { interval: 5 },
      });
      workflowProps.maxExecution = 1; // Ensure it runs once

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      // Trigger the workflow
      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      // Get executions for the workflow
      const executionsResponse = await client.getExecutions([workflowId], {
        limit: 1,
      });
      expect(executionsResponse.items.length).toBe(1);
      const executionIdFromList = executionsResponse.items[0].id;

      // Get the specific execution using the ID from the list
      const execution = await client.getExecution(
        workflowId,
        executionIdFromList
      );

      expect(execution).toBeDefined();
      expect(execution.id).toEqual(executionIdFromList);
      expect(execution.status).toBe(ExecutionStatus.Success);

      // The execution now contains both trigger and node steps
      // Step 0: Trigger step, Step 1: ETH transfer node
      expect(execution.steps).toBeDefined();
      expect(execution.steps.length).toBeGreaterThanOrEqual(2);

      // The first step should be the trigger step
      const triggerStep = execution.steps[0];
      expect(triggerStep.type).toEqual(TriggerType.Block);
      expect(triggerStep.name).toEqual("blockTriggerForGetExecutionsTest");
      expect(triggerStep.success).toBeTruthy();

      // The second step should be the CustomCode node
      const customCodeStep = execution.steps[1];
      expect(customCodeStep.type).toEqual(NodeType.CustomCode);
      expect(customCodeStep.name).toEqual("customCode");
      expect(customCodeStep.success).toBeTruthy();

      // Verify the trigger data is available in the inputs
      expect(customCodeStep.inputsList).toContain(
        "blockTriggerForGetExecutionsTest.data"
      );

      const executionStatus = await client.getExecutionStatus(
        workflowId,
        execution.id
      );
      expect(executionStatus).toEqual(ExecutionStatus.Success);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should verify ManualTrigger input config is accessible and propagates via data to subsequent nodes", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      // Create workflow props and create trigger properly using TriggerFactory
      const workflowProps = createFromTemplate(wallet.address);

      // Create Manual trigger with custom input config
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "manualTriggerWithInput",
        type: TriggerType.Manual,
        data: {
          data: {
            environment: "test",
            priority: "high",
            description: "Test workflow with input fields for getExecution",
          },
          headers: { "x-test": "true" },
          pathParams: { mode: "dev" },
        },
      });

      workflowProps.trigger = trigger;

      // Create CustomCode node using NodeFactory to ensure it has toRequest() method
      const customCodeNode = NodeFactory.create({
        id: workflowProps.nodes[0].id, // Use existing node ID
        name: "input_data_tester",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            // Access ManualTrigger input (config) and its data
            try {
              const inputCfg = manualTriggerWithInput.input;   // { data, headers, pathParams }
              const outData  = manualTriggerWithInput.data;    // should mirror inputCfg.data for Manual trigger
              const env = inputCfg?.data?.environment;
              const pr  = inputCfg?.data?.priority;
              const desc = inputCfg?.data?.description;
              const headerOk = inputCfg?.headers?.["x-test"] === "true";
              const pathOk = inputCfg?.pathParams?.mode === "dev";
              const envMatch = env === "test";
              const prMatch = pr === "high";
              const descMatch = typeof desc === "string" && desc.includes("getExecution");
              const dataMirrors = outData && outData.environment === env && outData.priority === pr;
              const inputDataAvailable = !!(inputCfg && inputCfg.data);
              const allTestsPassed = inputDataAvailable && envMatch && prMatch && descMatch && headerOk && pathOk && dataMirrors;
              return {
                success: true,
                inputValues: { environment: env, priority: pr, description: desc },
                validation: { envMatch, prMatch, descMatch, headerOk, pathOk, dataMirrors, inputDataAvailable, allTestsPassed },
                timestamp: Date.now()
              };
            } catch (error) {
              return { success: false, error: error.message, timestamp: Date.now() };
            }
          `,
        },
      });

      // Add input data to the CustomCode node
      (customCodeNode as any).input = {
        nodeType: "input_data_tester",
        purpose: "testing input field value access",
        expectations: [
          "trigger input access",
          "value validation",
          "property verification",
        ],
      };

      // Replace the first node
      workflowProps.nodes[0] = customCodeNode;

      workflowProps.maxExecution = 1; // Single execution for testing

      // Create and submit workflow
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      // Trigger the workflow
      const triggerResult = await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Manual,
        },
        isBlocking: true,
      });

      // Get the execution details
      const execution = await client.getExecution(
        workflowId,
        triggerResult.executionId
      );

      expect(execution).toBeDefined();
      expect(execution.id).toEqual(triggerResult.executionId);
      expect(execution.status).toBe(ExecutionStatus.Success);

      // Verify execution has both trigger and node steps
      expect(execution.steps).toBeDefined();
      expect(execution.steps.length).toBeGreaterThanOrEqual(2);

      // Verify trigger step
      const triggerStep = execution.steps[0];
      expect(triggerStep.type).toEqual(TriggerType.Manual);
      expect(triggerStep.name).toEqual("manualTriggerWithInput");
      expect(triggerStep.success).toBeTruthy();

      // Verify CustomCode node step
      const customCodeStep = execution.steps[1];
      expect(customCodeStep.type).toEqual(NodeType.CustomCode);
      expect(customCodeStep.name).toEqual("input_data_tester");
      expect(customCodeStep.success).toBeTruthy();

      // Verify that the node can access trigger data
      expect(customCodeStep.inputsList).toContain(
        "manualTriggerWithInput.data"
      );

      // Verify that trigger input (config) is exposed
      expect(customCodeStep.inputsList).toContain(
        "manualTriggerWithInput.input"
      );

      // Verify that both data and input fields are present for the trigger
      const triggerInputs = customCodeStep.inputsList.filter((input) =>
        input.startsWith("manualTriggerWithInput.")
      );
      expect(triggerInputs).toContain("manualTriggerWithInput.data");
      expect(triggerInputs).toContain("manualTriggerWithInput.input");

      // Verify actual input values were accessed successfully
      expect(customCodeStep.output).toBeDefined();
      expect(typeof customCodeStep.output).toBe("object");

      const nodeOutput = customCodeStep.output as any;

      expect(nodeOutput.success).toBeTruthy();

      // Verify the trigger input values were correctly accessed
      expect(nodeOutput.inputValues).toBeDefined();
      expect(nodeOutput.inputValues.environment).toBe("test");
      expect(nodeOutput.inputValues.priority).toBe("high");
      expect(nodeOutput.inputValues.description).toContain("getExecution");

      // Verify validation results
      expect(nodeOutput.validation).toBeDefined();

      // Validation flags should all be true
      expect(nodeOutput.validation.envMatch).toBe(true);
      expect(nodeOutput.validation.prMatch).toBe(true);
      expect(nodeOutput.validation.descMatch).toBe(true);
      expect(nodeOutput.validation.headerOk).toBe(true);
      expect(nodeOutput.validation.pathOk).toBe(true);
      expect(nodeOutput.validation.dataMirrors).toBe(true);
      expect(nodeOutput.validation.inputDataAvailable).toBe(true);
      expect(nodeOutput.validation.allTestsPassed).toBe(true);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
});
