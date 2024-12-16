import { describe, beforeAll, test, expect } from "@jest/globals";
import Client, {
  TriggerFactory,
  TriggerTypes,
  WorkflowStatuses,
} from "../dist";
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
import { EXPIRED_AT, FACTORY_ADDRESS, WorkflowTemplate } from "./templates";

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

    const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);
    const res = await client.authWithSignature(
      ownerAddress,
      signature,
      EXPIRED_AT
    );
    client.setAuthKey(res.authKey);
  });

  afterAll(async () => await removeCreatedWorkflows(client, createdWorkflows));

  test("trigger for block type should succeed", async () => {
    const interval = 5;
    const wallet = await client.getWallet({ salt: "0" });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      name: "blockTrigger",
      type: TriggerTypes.BLOCK,
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

    const executions = await client.getExecutions(workflowId);

    // The list should be empty because the workflow has not been executed yet
    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toEqual(0);

    // Manually trigger the workflow with block number + 5
    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerTypes.BLOCK,
        blockNumber: blockNumber + interval, // block interval in the workflow template
      },
      isBlocking: true,
    });

    // The list should now contain one execution
    const executions2 = await client.getExecutions(workflowId);

    // Verify that the execution is successfully triggered at block number + 5
    expect(Array.isArray(executions2.result)).toBe(true);
    expect(executions2.result.length).toEqual(1);
    expect(executions2.result[0].success).toEqual(true);
    expect(
      executions2.result[0].triggerMetadata?.blockNumber
    ).toBeGreaterThanOrEqual(blockNumber + interval);

    const workflow = await client.getWorkflow(workflowId);
    expect(workflow.status).toEqual(WorkflowStatuses.COMPLETED);
    expect(workflow.totalExecution).toEqual(1);
  });

  test("trigger for cron type should succeed", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    await cleanupWorkflows(client, wallet.address);
    const epoch = Math.floor(Date.now() / 1000);

    // Create a cron trigger with a schedule of every minute
    const trigger = TriggerFactory.create({
      name: "cronTrigger",
      type: TriggerTypes.CRON,
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

    const executions = await client.getExecutions(workflowId);

    // The list should be empty because the workflow has not been executed yet
    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toEqual(0);

    // Manually trigger the workflow; no need to wait because we are setting the epoch to 1 minute later
    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerTypes.CRON,
        epoch: epoch + 60, // set epoch to 1 minute later
      },
      isBlocking: true,
    });

    // The isBlocking:true does not give enough information about the execution;
    // Since it’s blocking, could we get an indicator: does the execution reaches the final node?
    //
    // triggerWorkflow.result { result: true, executionId: '01JF1X8N37K3FZBNNR8DPX7DSY', jobId: '' }
    console.log("triggerWorkflow.result", result);

    // The list should now contain one execution
    const executions2 = await client.getExecutions(workflowId);
    expect(Array.isArray(executions2.result)).toBe(true);
    expect(executions2.result.length).toEqual(1);

    // Is success:true enough to determine the workflow is completed?
    // Could we get the workflow id from the response?
    //
    // executions2 {
    //   cursor: '',
    //   result: [
    //     _Execution {
    //       id: '01JF1X8N37K3FZBNNR8DPX7DSY',
    //       startAt: 1734157292,
    //       endAt: 1734157292,
    //       success: true,
    //       error: '',
    //       triggerMetadata: [_TriggerMetadata],
    //       result: '',
    //       stepsList: []
    //     }
    //   ]
    // }
    console.log("executions2", executions2);

    // The workflow status should be COMPLETED since maxExecution is 1
    const workflow = await client.getWorkflow(workflowId);
    console.log("workflow", workflow);

    // The workflow has the below invalid fields:
    // status: Completed, lastRanAt, totalExecution, completedAt
    //
    // Example:
    // workflow _Workflow {
    //   smartWalletAddress: '0x6C6244dFd5d0bA3230B6600bFA380f0bB4E8AC49',
    //   trigger: _CronTrigger {
    //     name: 'cronTrigger',
    //     type: 4,
    //     data: { scheduleList: [Array] }
    //   },
    //   nodes: [
    //     _ContractWriteNode {
    //       id: '01JF1X8MPW4SDK81DGFRHMP6SR',
    //       name: 'transfer token',
    //       type: 11,
    //       data: [Object]
    //     }
    //   ],
    //   edges: [
    //     _Edge {
    //       id: '01JF1X8MPW4SH5CG00VFPJM2EC',
    //       source: '__TRIGGER__',
    //       target: '01JF1X8MPW4SDK81DGFRHMP6SR'
    //     }
    //   ],
    //   startAt: 1734157322,
    //   expiredAt: 1736749292,
    //   maxExecution: 1,
    //   id: '01JF1X8N33F3NFSAB2W62B9FW4',
    //   owner: '0xc60e71bd0f2e6d8832Fea1a2d56091C48493C788',
    //   memo: '',
    //   status: 0,
    //   completedAt: 0,
    //   totalExecution: 0,
    //   lastRanAt: 0
    // }
    expect(workflow.totalExecution).toEqual(1);
    expect(workflow.status).toEqual(WorkflowStatuses.COMPLETED);
  });

  test("trigger for fixed time type should succeed", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const epoch = Math.floor(Date.now() / 1000);

    const trigger = TriggerFactory.create({
      name: "fixedTimeTrigger",
      type: TriggerTypes.FIXED_TIME,
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
    const executions = await client.getExecutions(workflowId);
    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toEqual(0);

    // Manually trigger the workflow
    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerTypes.FIXED_TIME,
        epoch: epoch + 300, // 5 minutes later
      },
      isBlocking: true,
    });

    console.log("triggerWorkflow result", result);

    // The list should now contain one execution
    const executions2 = await client.getExecutions(workflowId);
    console.log("executions2", executions2);
    expect(Array.isArray(executions2.result)).toBe(true);
    expect(executions2.result.length).toEqual(1);

    const workflow = await client.getWorkflow(workflowId);
    expect(workflow.status).toEqual(WorkflowStatuses.COMPLETED);
    expect(workflow.totalExecution).toEqual(3);
  });

  test("trigger for event type should succeed", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const blockNumber = await getBlockNumber();

    console.log("blockNumber", blockNumber);

    const trigger = TriggerFactory.create({
      name: "eventTrigger",
      type: TriggerTypes.EVENT,
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
    const executions = await client.getExecutions(workflowId);
    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toEqual(0);

    // Manually trigger the workflow
    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerTypes.EVENT,
        blockNumber: blockNumber + 5,
        logIndex: 0,
        txHash: "0x1234567890",
      },
      isBlocking: true,
    });

    console.log("triggerWorkflow result", result);

    // The list should now contain one execution
    const executions2 = await client.getExecutions(workflowId);
    console.log("executions2", executions2);
    expect(Array.isArray(executions2.result)).toBe(true);
    expect(executions2.result.length).toEqual(1);

    const workflow = await client.getWorkflow(workflowId);
    expect(workflow.status).toEqual(WorkflowStatuses.COMPLETED);
    expect(workflow.totalExecution).toEqual(1);
  });

  test("should throw trigger an non-existent workflow Id", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const blockNumber = await getBlockNumber();

    await expect(
      client.triggerWorkflow({
        id: "non-existent-workflow-id",
        data: {
          type: TriggerTypes.BLOCK,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      })
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);
  });
});
