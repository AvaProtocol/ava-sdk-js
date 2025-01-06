import { describe, beforeAll, test, expect } from "@jest/globals";
import Client, { TriggerFactory, TriggerType } from "../dist";
import dotenv from "dotenv";
import path from "path";
import _ from "lodash";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  queueForRemoval,
  removeCreatedWorkflows,
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

const salt = "0";

describe("getExecutions Tests", () => {
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

  test("options.limit returns the correct number of executions", async () => {
    const countFirstPage = 1;
    const blockInterval = 5;
    const repeatCount = 4;

    const wallet = await client.getWallet({ salt });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: blockInterval },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    // Get the first page of executions with limit:1
    let executions = await client.getExecutions([workflowId], {
      limit: countFirstPage,
    });
    expect(executions.result.length).toBe(0);
    expect(executions.hasMore).toBe(false);
    
    // Manually trigger the workflow with block number + 20
    const result = await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerType.Block,
        blockNumber: blockNumber,
      },
      isBlocking: true,
    });

    // trigger the test {repeatCount} extra time more
    for(let i = 0; i < repeatCount; i++){
      await client.triggerWorkflow({
        id: workflowId,
        data: {
          type: TriggerType.Block,
          blockNumber: blockNumber + repeatCount +1
        },
        isBlocking: true,
      });
    }

    console.log("triggerWorkflow.result", result);

    // Get the first page of executions with limit:1
    executions = await client.getExecutions([workflowId], {
      limit: countFirstPage,
    });

    console.log("executions", executions);

    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toBe(countFirstPage);
    expect(executions).toHaveProperty("cursor");
    expect(executions.hasMore).toBe(true);
    const firstCursor = executions.cursor;

    // Get the list of workflows with limit:2 and cursor
    const executions2 = await client.getExecutions([workflowId], {
      limit: repeatCount,
      cursor: firstCursor,
    });

    console.log("executions2", executions2);

    // Verify that the count of the second return is totalCount - limit
    expect(Array.isArray(executions2.result)).toBe(true);
    expect(executions2.result.length).toBe(repeatCount);
    expect(executions2.hasMore).toBe(false);
    const secondCursor = executions2.cursor;

    // Make sure there’s no overlap between the two lists
    expect(
      _.intersection(
        executions.result.map((item) => item.id),
        executions2.result.map((item) => item.id)
      ).length
    ).toBe(0);
  });

  test("options.cursor works as pagination", async () => {
    const blockInterval = 5;
    const repeatCount = 3;
    const limit = 2;

    const wallet = await client.getWallet({ salt });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: blockInterval },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    for (let i =0; i < 3; i++) {
      // Manually trigger the workflow 3 times
      await client.triggerWorkflow({
        id: workflowId,
        data: {
          type: TriggerType.Block,
          blockNumber: blockNumber + i,
        },
        isBlocking: true,
      });
    }

    // Get the first page of executions with limit:1
    const executions = await client.getExecutions([workflowId], {
      limit,
    });

    console.log("executions", executions);

    expect(Array.isArray(executions.result)).toBe(true);
    expect(executions.result.length).toBe(limit);
    expect(executions).toHaveProperty("cursor");
    expect(executions.hasMore).toBe(true);
    const firstCursor = executions.cursor;

    // Get the list of workflows with limit:2 and cursor
    const executions2 = await client.getExecutions([workflowId], {
      limit,
      cursor: firstCursor,
    });

    // Verify that the count of the second return is totalCount - limit
    expect(Array.isArray(executions2.result)).toBe(true);
    expect(executions2.result.length).toBe(repeatCount - limit);

    // Make sure there’s no overlap between the two lists
    expect(
      _.intersection(
        executions.result.map((item) => item.id),
        executions2.result.map((item) => item.id)
      ).length
    ).toBe(0);

    // Make sure the cursor is different from the first cursor and an empty string due to reaching the end of the list
    expect(executions2.cursor).not.toBe(firstCursor);
    expect(executions2.cursor).toBe("");
    expect(executions2.hasMore).toBe(false);
  });

  test("should throw error with a non-existent cursor", async () => {
    const wallet = await client.getWallet({ salt });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: 5 },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
      })
    );

    queueForRemoval(createdWorkflows, workflowId);

    await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerType.Block,
        blockNumber: blockNumber + 5,
      },
      isBlocking: true,
    });

    // Invalid cursor should throw INVALID_ARGUMENT
    await expect(
      client.getExecutions([workflowId], {
        cursor: "invalid-cursor",
      })
    ).rejects.toThrowError(/cursor is not valid/);
  });

  test("should throw error with an invalid limit", async () => {
    const wallet = await client.getWallet({ salt });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: 5 },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
      })
    );

    queueForRemoval(createdWorkflows, workflowId);

    await client.triggerWorkflow({
      id: workflowId,
      data: {
        type: TriggerType.Block,
        blockNumber: blockNumber + 5,
      },
      isBlocking: true,
    });

    // Invalid limit should throw INVALID_ARGUMENT
    await expect(
      client.getExecutions([workflowId], {
        limit: -1,
      })
    ).rejects.toThrowError(/item per page is not valid/);
  });
});
