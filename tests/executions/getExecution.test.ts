import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
import { TriggerType, ExecutionStatus, NodeType } from "@avaprotocol/types";
import _ from "lodash";
import {
  getAddress,
  generateSignature,
  getBlockNumber,
  SaltGlobal,
  TIMEOUT_DURATION,
} from "../utils/utils";
import { createFromTemplate, defaultTriggerId } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.GetExecution * 1000; // Salt index 13000 - 13999

describe("getExecution Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(walletPrivateKey);

    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
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

      const execution = await client.getExecution(workflowId, triggerResult.executionId);

      expect(execution).toBeDefined();
      expect(execution.id).toEqual(triggerResult.executionId);
      expect(execution.success).toBe(true);
      
      // The execution now contains both trigger and node steps
      // Step 0: Trigger step, Step 1: ETH transfer node
      expect(execution.steps).toBeDefined();
      expect(execution.steps.length).toBeGreaterThanOrEqual(2);
      
      // The first step should be the trigger step
      const triggerStep = execution.steps[0];
      expect(triggerStep.type).toEqual(TriggerType.Block);
      expect(triggerStep.name).toEqual("blockTrigger");
      expect(triggerStep.success).toBe(true);
      
      // The second step should be the ETH transfer node
      const ethTransferStep = execution.steps[1];
      expect(ethTransferStep.type).toEqual(NodeType.ETHTransfer);
      expect(ethTransferStep.name).toEqual("send eth");
      expect(ethTransferStep.success).toBe(true);
      
      // Verify the trigger data is available in the inputs
      expect(ethTransferStep.inputsList).toContain("blockTrigger.data");
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  // This test ensures that the system correctly handles requests for executions
  // where the provided workflow ID does not exist, expecting an error.
  test("should throw error when trying to get an execution with a non-existent workflow ID", async () => {
    const nonExistentWorkflowId = "non-existent-workflow-id";
    const nonExistentExecutionId = "non-existent-execution-id";

    await expect(
      client.getExecution("non-existent-workflow-id", nonExistentExecutionId)
    ).rejects.toThrowError(/NOT_FOUND|resource not found/i);
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
      ).rejects.toThrowError(/NOT_FOUND|resource not found/i);
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

      const execution = await client.getExecution(workflowId, result.executionId);
      expect(execution.id).toEqual(result.executionId);
      
      // The execution now contains both trigger and node steps
      // Step 0: Trigger step, Step 1: ETH transfer node
      expect(execution.steps).toBeDefined();
      expect(execution.steps.length).toBeGreaterThanOrEqual(2);
      
      // The first step should be the trigger step
      const triggerStep = execution.steps[0];
      expect(triggerStep.type).toEqual(TriggerType.Cron);
      expect(triggerStep.name).toEqual("cronTrigger");
      expect(triggerStep.success).toBe(true);
      
      // The second step should be the ETH transfer node
      const ethTransferStep = execution.steps[1];
      expect(ethTransferStep.type).toEqual(NodeType.ETHTransfer);
      expect(ethTransferStep.name).toEqual("send eth");
      expect(ethTransferStep.success).toBe(true);
      
      // Verify the trigger data is available in the inputs
      expect(ethTransferStep.inputsList).toContain("cronTrigger.data");

      const executionStatus = await client.getExecutionStatus(workflowId, result.executionId);
      expect(executionStatus).toEqual(ExecutionStatus.EXECUTION_STATUS_COMPLETED);
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
      const execution = await client.getExecution(workflowId, executionIdFromList);

      expect(execution).toBeDefined();
      expect(execution.id).toEqual(executionIdFromList);
      expect(execution.success).toBe(true);
      
      // The execution now contains both trigger and node steps
      // Step 0: Trigger step, Step 1: ETH transfer node
      expect(execution.steps).toBeDefined();
      expect(execution.steps.length).toBeGreaterThanOrEqual(2);
      
      // The first step should be the trigger step
      const triggerStep = execution.steps[0];
      expect(triggerStep.type).toEqual(TriggerType.Block);
      expect(triggerStep.name).toEqual("blockTriggerForGetExecutionsTest");
      expect(triggerStep.success).toBe(true);
      
      // The second step should be the ETH transfer node
      const ethTransferStep = execution.steps[1];
      expect(ethTransferStep.type).toEqual(NodeType.ETHTransfer);
      expect(ethTransferStep.name).toEqual("send eth");
      expect(ethTransferStep.success).toBe(true);
      
      // Verify the trigger data is available in the inputs
      expect(ethTransferStep.inputsList).toContain("blockTriggerForGetExecutionsTest.data");

      const executionStatus = await client.getExecutionStatus(workflowId, execution.id);
      expect(executionStatus).toEqual(ExecutionStatus.EXECUTION_STATUS_COMPLETED);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
});
