import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client, TriggerFactory, TriggerType } from "@avaprotocol/sdk-js";
import dotenv from "dotenv";
import path from "path";
import _ from "lodash";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  getBlockNumber,
  SaltGlobal,
  TIMEOUT_DURATION,
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

// Set a default timeout of 15 seconds for all tests in this file
jest.setTimeout(TIMEOUT_DURATION);

let saltIndex = SaltGlobal.GetExecutions * 1000; // Salt index 4000 - 4999

describe("getExecutions Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(TEST_PRIVATE_KEY);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
      factoryAddress: FACTORY_ADDRESS,
    });

    const signature = await generateSignature(TEST_PRIVATE_KEY);
    const res = await client.authWithSignature(signature);
    client.setAuthKey(res.authKey);
  });

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

    const workflow = client.createWorkflow({
      ...WorkflowTemplate,
      trigger,
      smartWalletAddress: wallet.address,
      maxExecution: 0, // Set to 0, or infinite runs, to ensure the workflow is not completed; otherwise, triggering a Completed workflow will fail
    });
    const workflowId = await client.submitWorkflow(workflow);

    try {
      // Trigger the workflow totalTriggerCount times to make sure we have 4 executions
      for (let i = 1; i <= totalTriggerCount; i++) {
        await client.triggerWorkflow({
          id: workflowId,
          reason: {
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
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });

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

    const workflow = client.createWorkflow({
      ...WorkflowTemplate,
      trigger,
      smartWalletAddress: wallet.address,
      maxExecution: 0, // Set to 0, or infinite runs, to ensure the workflow is not completed; otherwise, triggering a Completed workflow will fail
    });
    const workflowId = await client.submitWorkflow(workflow);

    try {
      for (let i = 0; i < 3; i++) {
        // Manually trigger the workflow 3 times
        await client.triggerWorkflow({
          id: workflowId,
          reason: {
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
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });

  test("should throw error with a non-existent cursor", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: 5 },
    });

    const workflow = client.createWorkflow({
      ...WorkflowTemplate,
      trigger,
      smartWalletAddress: wallet.address,
    });
    const workflowId = await client.submitWorkflow(workflow);

    try {
      await client.triggerWorkflow({
        id: workflowId,
        reason: {
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
    } finally {
      await client.deleteWorkflow(workflowId);
    }
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

    const workflow = client.createWorkflow({
      ...WorkflowTemplate,
      trigger,
      smartWalletAddress: wallet.address,
    });
    const workflowId = await client.submitWorkflow(workflow);

    try {
      await client.triggerWorkflow({
        id: workflowId,
        reason: {
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
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });

  test("getExecutionCount returns correct count for single workflow", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: 5 },
    });

    const workflow = client.createWorkflow({
      ...WorkflowTemplate,
      trigger,
      smartWalletAddress: wallet.address,
      maxExecution: 0,
    });
    const workflowId = await client.submitWorkflow(workflow);

    try {
      // Trigger the workflow 3 times
      for (let i = 1; i <= 3; i++) {
        await client.triggerWorkflow({
          id: workflowId,
          reason: {
            type: TriggerType.Block,
            blockNumber: blockNumber + i * 5,
          },
          isBlocking: true,
        });
      }

      const count = await client.getExecutionCount([workflowId]);
      expect(count).toBeGreaterThanOrEqual(3);
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });

  test("getExecutionCount returns correct count for multiple workflows", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    const workflowIds: string[] = [];

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: 5 },
    });

    try {
      // Create first workflow
      const workflow1 = client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
        maxExecution: 0,
      });
      const workflowId1 = await client.submitWorkflow(workflow1);
      workflowIds.push(workflowId1);

      // Create second workflow
      const workflow2 = client.createWorkflow({
        ...WorkflowTemplate,
        trigger,
        smartWalletAddress: wallet.address,
        maxExecution: 0,
      });
      const workflowId2 = await client.submitWorkflow(workflow2);
      workflowIds.push(workflowId2);

      // Trigger first workflow twice
      for (let i = 1; i <= 2; i++) {
        await client.triggerWorkflow({
          id: workflowId1,
          reason: {
            type: TriggerType.Block,
            blockNumber: blockNumber + i * 5,
          },
          isBlocking: true,
        });
      }

      // Trigger second workflow once
      await client.triggerWorkflow({
        id: workflowId2,
        reason: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 15,
        },
        isBlocking: true,
      });

      const count = await client.getExecutionCount([workflowId1, workflowId2]);
      expect(count).toBeGreaterThanOrEqual(3);
    } finally {
      // Clean up all created workflows
      for (const workflowId of workflowIds) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("getExecutionCount returns 0 for workflow with no executions", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: 5 },
    });

    const workflow = client.createWorkflow({
      ...WorkflowTemplate,
      trigger,
      smartWalletAddress: wallet.address,
    });
    const workflowId = await client.submitWorkflow(workflow);

    try {
      const count = await client.getExecutionCount([workflowId]);
      expect(count).toBe(0);
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });
});
