import { describe, beforeAll, test, expect } from "@jest/globals";
import Client, { TriggerFactory, TriggerType } from "@/sdk-js/dist";
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
  SaltGlobal,
} from "./utils";
import {
  FACTORY_ADDRESS,
  WorkflowTemplate,
  defaultTriggerId,
} from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows tracking of those that need to be cleaned up after the test
const createdWorkflows: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.GetExecutions * 1000;

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

    const signature = await generateSignature(TEST_PRIVATE_KEY);
    const res = await client.authWithSignature(signature);
    client.setAuthKey(res.authKey);
  });

  afterAll(async () => await removeCreatedWorkflows(client, createdWorkflows));

  /**
   * Test the options.limit parameter
   * 1. Create a workflow with 4 executions
   * 2. Get the first page of executions with limit:1, expect 1 execution
   * 3. Get the second page with limit:2, expect 2 executions
   * 4. Get the third page with limit:2, expect 1 execution
   */
  test("options.limit returns the correct number of executions", async () => {
    const limitOne = 1;
    const limitTwo = 2;
    const triggerInterval = 5;
    const totalTriggerCount = 4;

    if (totalTriggerCount < limitOne + limitTwo) {
      throw new Error(
        "totalTriggerCount value must be greater than limitOne + limitTwo, e.g. 4 > 1 + 2"
      );
    }

    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const startBlockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: triggerInterval },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
        maxExecution: 0, // Set to 0, or infinite runs, to ensure the workflow is not completed; otherwise, triggering a Completed workflow will fail
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    // Trigger the workflow totalTriggerCount times to make sure we have 4 executions
    for (let i = 1; i <= totalTriggerCount; i++) {
      console.log("Triggering the workflow", i, "times");
      await client.triggerWorkflow({
        id: workflowId,
        data: {
          type: TriggerType.Block,
          blockNumber: startBlockNumber + i * triggerInterval,
        },
        isBlocking: true,
      });
    }

    // Get the list of workflows with limit:1; it should return 1 item
    const resultLimitOne = await client.getExecutions([workflowId], {
      limit: limitOne,
    });

    expect(Array.isArray(resultLimitOne.result)).toBe(true);
    expect(resultLimitOne.result.length).toBe(limitOne);
    expect(resultLimitOne).toHaveProperty("cursor");
    expect(resultLimitOne.hasMore).toBe(true);
    const firstCursor = resultLimitOne.cursor;

    // Get the list of workflows with limit:2; it should return 2 items
    const resultLimitTwo = await client.getExecutions([workflowId], {
      limit: limitTwo,
      cursor: firstCursor,
    });
    expect(Array.isArray(resultLimitTwo.result)).toBe(true);
    expect(resultLimitTwo.result.length).toBe(limitTwo);
    expect(resultLimitTwo.hasMore).toBe(true);

    // Make sure there's no overlap between the two lists
    expect(
      _.intersection(
        resultLimitOne.result.map((item) => item.id),
        resultLimitTwo.result.map((item) => item.id)
      ).length
    ).toBe(0);
    const secondCursor = resultLimitTwo.cursor;

    // Get another limit:2 with the second cursor; it should return only 1 item
    const resultWithExtraLimit = await client.getExecutions([workflowId], {
      limit: limitTwo,
      cursor: secondCursor,
    });
    expect(Array.isArray(resultWithExtraLimit.result)).toBe(true);
    expect(resultWithExtraLimit.result.length).toBe(
      totalTriggerCount - limitTwo - limitOne
    );
    expect(resultWithExtraLimit.hasMore).toBe(false);

    // Make sure the cursor is an empty string due to reaching the end of the list
    expect(resultWithExtraLimit.cursor).toBe("");
  }, 15000); // Timeout 15 seconds

  test("options.cursor works as pagination", async () => {
    const blockInterval = 5;
    const repeatCount = 3;
    const limit = 2;

    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: blockInterval },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
        maxExecution: 0, // Set to 0, or infinite runs, to ensure the workflow is not completed; otherwise, triggering a Completed workflow will fail
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    for (let i = 0; i < 3; i++) {
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

    // Make sure there's no overlap between the two lists
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
  }, 15000); // Timeout 15 seconds

  test("should throw error with a non-existent cursor", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
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
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
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
