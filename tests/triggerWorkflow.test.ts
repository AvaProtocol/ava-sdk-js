import { describe, beforeAll, test, expect } from "@jest/globals";
import Client, {
  TriggerFactory,
  TriggerType,
  ExecutionStatus,
  WorkflowStatus,
} from "@/sdk-js/dist";

import dotenv from "dotenv";
import path from "path";
import _ from "lodash";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  queueForRemoval,
  removeCreatedWorkflows,
  cleanupWorkflows,
  getBlockNumber,
} from "./utils";
import { FACTORY_ADDRESS, WorkflowTemplate, defaultTriggerId } from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows tracking of those that need to be cleaned up after the test
const createdWorkflows: Map<string, boolean> = new Map();

describe("triggerWorkflow Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(TEST_PRIVATE_KEY);
    console.log("Client endpoint:", ENDPOINT, "\nOwner address:", ownerAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
      factoryAddress: FACTORY_ADDRESS,
    });

    const signature = await generateSignature(TEST_PRIVATE_KEY);
    const res = await client.authWithSignature(signature);
    client.setAuthKey(res.authKey);
  });

  afterAll(async () => await removeCreatedWorkflows(client, createdWorkflows));

  test("trigger for block type should succeed", async () => {
    const interval = 5;
    const wallet = await client.getWallet({ salt: "0" });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    const executions = await client.getExecutions([workflowId]);

    // The list should be empty because the workflow has not been executed yet
    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toEqual(0);

    // Manually trigger the workflow with block number + 5
    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerType.Block,
        blockNumber: blockNumber + interval, // block interval in the workflow template
      },
      isBlocking: true,
    });

    // The list should now contain one execution
    const executions2 = await client.getExecutions([workflowId]);

    // Verify that the execution is successfully triggered at block number + 5
    expect(Array.isArray(executions2.result)).toBe(true);
    expect(executions2.result.length).toEqual(1);
    expect(executions2.result[0].success).toEqual(true);
    expect(executions2.result[0].triggerMetadata?.blockNumber).toEqual(
      blockNumber + interval
    );
    expect(executions2.result[0].triggerMetadata?.type).toEqual(
      TriggerType.Block
    );

    const workflow = await client.getWorkflow(workflowId);

    expect(workflow.status).toEqual(WorkflowStatus.Completed);
    expect(workflow.totalExecution).toEqual(1);
  });

  test("trigger for cron type should succeed", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    await cleanupWorkflows(client, wallet.address);
    const epoch = Math.floor(Date.now() / 1000);

    // Create a cron trigger with a schedule of every minute
    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "cronTrigger",
      type: TriggerType.Cron,
      data: { scheduleList: ["* * * * *"] },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    const executions = await client.getExecutions([workflowId]);

    // The list should be empty because the workflow has not been executed yet
    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toEqual(0);

    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerType.Cron,
        epoch: epoch + 60, // set epoch to 1 minute later
      },
      isBlocking: true,
    });

    // The list should now contain one execution, the id from manual trigger should matched
    const executions2 = await client.getExecutions([workflowId]);
    expect(executions2.result[0].id).toEqual(result.executionId);
    expect(Array.isArray(executions2.result)).toBe(true);
    expect(executions2.result.length).toEqual(1);
    expect(executions2.result[0].triggerMetadata?.type).toEqual(
      TriggerType.Cron
    );
    expect(executions2.result[0].triggerMetadata?.epoch).toEqual(epoch + 60);

    const workflow = await client.getWorkflow(workflowId);
    expect(workflow.totalExecution).toEqual(1);
    expect(workflow.status).toEqual(WorkflowStatus.Completed);
  });

  test("trigger for fixed time type should succeed", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const epoch = Math.floor(Date.now() / 1000);

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "fixedTimeTrigger",
      type: TriggerType.FixedTime,
      data: { epochsList: [epoch + 60, epoch + 120, epoch + 180] }, // one per minute for the next 3 minutes
    });

    // TODO: the maxExecution is 1, but epochsList has 3 epochs;
    // Should we change the maxExecution to 3?
    // Add a test: what happens if the maxExecution is less than the epochsList length?
    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    // The list should be empty because the workflow has not been executed yet
    const executions = await client.getExecutions([workflowId]);
    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toEqual(0);

    // Manually trigger the workflow
    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerType.FixedTime,
        epoch: epoch + 300, // 5 minutes later
      },
      isBlocking: true,
    });

    // The list should now contain one execution
    const executions2 = await client.getExecutions([workflowId]);
    expect(Array.isArray(executions2.result)).toBe(true);
    expect(executions2.result.length).toEqual(1);

    const workflow = await client.getWorkflow(workflowId);
    expect(workflow.status).toEqual(WorkflowStatus.Completed);
    expect(workflow.totalExecution).toEqual(1);
    expect(executions2.result[0].triggerMetadata?.epoch).toEqual(epoch + 300);
    expect(executions2.result[0].triggerMetadata?.type).toEqual(
      TriggerType.FixedTime
    );
  });

  test("trigger for event type should succeed", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "eventTrigger",
      type: TriggerType.Event,
      data: {
        expression: `trigger1.data.topics[0] == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" && trigger1.data.topics[2] == "${wallet.address.toLowerCase()}"`,
      },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    // The list should be empty because the workflow has not been executed yet
    const executions = await client.getExecutions([workflowId]);
    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toEqual(0);

    // Manually trigger the workflow
    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerType.Event,
        blockNumber: blockNumber + 5,
        logIndex: 0,
        txHash: "0x1234567890",
      },
      isBlocking: true,
    });

    // The list should now contain one execution
    const executions2 = await client.getExecutions([workflowId]);
    expect(Array.isArray(executions2.result)).toBe(true);
    expect(executions2.result.length).toEqual(1);

    const workflow = await client.getWorkflow(workflowId);
    expect(workflow.status).toEqual(WorkflowStatus.Completed);
    expect(workflow.totalExecution).toEqual(1);
    expect(executions2.result[0].triggerMetadata?.blockNumber).toEqual(
      blockNumber + 5
    );
    expect(executions2.result[0].triggerMetadata?.txHash).toEqual(
      "0x1234567890"
    );
    expect(executions2.result[0].triggerMetadata?.type).toEqual(
      TriggerType.Event
    );
  });

  test("trigger return correct execution id in blocking mode", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    await cleanupWorkflows(client, wallet.address);
    const epoch = Math.floor(Date.now() / 1000);

    // Create a cron trigger with a schedule of every minute
    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "cronTrigger",
      type: TriggerType.Cron,
      data: { scheduleList: ["* * * * *"] },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    const executions = await client.getExecutions([workflowId]);

    // The list should be empty because the workflow has not been executed yet
    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toEqual(0);

    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerType.Cron,
        epoch: epoch + 60, // set epoch to 1 minute later
      },
      isBlocking: true,
    });

    // The list should now contain one execution, the id from manual trigger should matched
    const execution = await client.getExecution(workflowId, result.executionId);
    expect(execution.id).toEqual(result.executionId);
    expect(execution.triggerMetadata.type).toEqual(TriggerType.Cron);
    expect(execution.triggerMetadata.epoch).toEqual(epoch + 60);

    const executionStatus = await client.getExecutionStatus(workflowId, result.executionId);
    expect(executionStatus).toEqual(ExecutionStatus.FINISHED);
  });

  test("trigger async return id and pending status", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    await cleanupWorkflows(client, wallet.address);
    const epoch = Math.floor(Date.now() / 1000);

    // Create a cron trigger with a schedule of every minute
    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "cronTrigger",
      type: TriggerType.Cron,
      data: { scheduleList: ["* * * * *"] },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerType.Cron,
        epoch: epoch + 60, // set epoch to 1 minute later
      },
      isBlocking: false,
    });

    expect(result.status).toEqual(ExecutionStatus.QUEUED);
    expect(result.executionId).toHaveLength(26);
  });


  test("should throw trigger an non-existent workflow Id", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const blockNumber = await getBlockNumber();

    await expect(
      client.triggerWorkflow({
        id: "non-existent-workflow-id",
        data: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      })
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);
  });
});
