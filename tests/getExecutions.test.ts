import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
import { TriggerType } from "@avaprotocol/types";
import _ from "lodash";
import {
  getAddress,
  generateSignature,
  getBlockNumber,
  SaltGlobal,
  TIMEOUT_DURATION,
} from "./utils";
import { createFromTemplate, defaultTriggerId } from "./templates";
import { getConfig } from "./envalid";

// Set a default timeout of 15 seconds for all tests in this file
jest.setTimeout(TIMEOUT_DURATION);

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.GetExecutions * 1000; // Salt index 4000 - 4999

describe("getExecutions Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(walletPrivateKey);

    // Initialize the client with test credentials
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
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });
      workflowProps.maxExecution = 0; // Set to 0, or infinite runs, to ensure the workflow is not completed; otherwise, triggering a Completed workflow will fail

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      // Trigger the workflow multiple times
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

      // Get executions with limitOne
      const resultWithLimitOne = await client.getExecutions([workflowId], {
        limit: limitOne,
      });

      expect(Array.isArray(resultWithLimitOne.result)).toBe(true);
      expect(resultWithLimitOne.result.length).toBe(limitOne);
      expect(resultWithLimitOne).toHaveProperty("cursor");
      expect(resultWithLimitOne.hasMore).toBe(true);
      const firstCursor = resultWithLimitOne.cursor;

      // Get executions with limitTwo
      const resultWithLimitTwo = await client.getExecutions([workflowId], {
        limit: limitTwo,
        after: firstCursor,
      });
      expect(Array.isArray(resultWithLimitTwo.result)).toBe(true);
      expect(resultWithLimitTwo.result.length).toBe(limitTwo);
      expect(resultWithLimitTwo.hasMore).toBe(true);

      // Make sure there's no overlap between the two lists
      expect(
        _.intersection(
          resultWithLimitOne.result.map((item) => item.id),
          resultWithLimitTwo.result.map((item) => item.id)
        ).length
      ).toBe(0);
      const secondCursor = resultWithLimitTwo.cursor;

      // Get another limit:2 with the second cursor; it should return only 1 item
      const resultWithExtraLimit = await client.getExecutions([workflowId], {
        limit: limitTwo,
        after: secondCursor,
      });
      expect(Array.isArray(resultWithExtraLimit.result)).toBe(true);
      expect(resultWithExtraLimit.result.length).toBe(
        totalTriggerCount - limitTwo - limitOne
      );
      expect(resultWithExtraLimit.hasMore).toBe(false);

      // Make sure the cursor is an empty string due to reaching the end of the list
      expect(resultWithExtraLimit.cursor).toBe("");
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should throw error with an invalid limit", async () => {
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

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

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
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("getExecutionCount returns correct count for single workflow", async () => {
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
      workflowProps.maxExecution = 0;

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

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
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("getExecutionCount returns correct count for multiple workflows", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    const workflowIds: string[] = [];

    try {
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });

      // Create first workflow
      const workflowProps1 = createFromTemplate(wallet.address);
      workflowProps1.trigger = trigger;
      workflowProps1.maxExecution = 0;

      const workflow1 = client.createWorkflow(workflowProps1);
      const workflowId1 = await client.submitWorkflow(workflow1);
      workflowIds.push(workflowId1);

      // Create second workflow
      const workflowProps2 = createFromTemplate(wallet.address);
      workflowProps2.trigger = trigger;
      workflowProps2.maxExecution = 0;

      const workflow2 = client.createWorkflow(workflowProps2);
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
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const count = await client.getExecutionCount([workflowId]);
      expect(count).toBe(0);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should support forward pagination with after parameter", async () => {
    const totalCount = 4;
    const pageSize = 2;

    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;
    const executionIds: string[] = [];

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });
      workflowProps.maxExecution = 0;

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      // Trigger the workflow multiple times
      for (let i = 1; i <= totalCount; i++) {
        const result = await client.triggerWorkflow({
          id: workflowId,
          reason: {
            type: TriggerType.Block,
            blockNumber: blockNumber + i * 5,
          },
          isBlocking: true,
        });
        executionIds.push(result.executionId);
      }

      const firstPage = await client.getExecutions([workflowId], {
        limit: pageSize,
      });
      
      expect(firstPage.result.length).toBeLessThanOrEqual(pageSize);
      expect(firstPage.cursor).toBeTruthy();
      expect(firstPage.hasMore).toBe(true);

      const secondPage = await client.getExecutions([workflowId], {
        after: firstPage.cursor,
        limit: pageSize,
      });

      expect(secondPage.result.length).toBeLessThanOrEqual(pageSize);

      // Verify no overlap between pages
      const firstPageIds = firstPage.result.map((item) => item.id);
      const secondPageIds = secondPage.result.map((item) => item.id);
      
      const overlap = firstPageIds.filter((id) => secondPageIds.includes(id));
      expect(overlap.length).toBe(0);

      // Verify all returned executions are in our created list
      [...firstPageIds, ...secondPageIds].forEach((id) => {
        if (id) {
          expect(executionIds.includes(id)).toBe(true);
        }
      });
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should support backward pagination with before parameter", async () => {
    const totalCount = 4;
    const pageSize = 2;

    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;
    const executionIds: string[] = [];

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });
      workflowProps.maxExecution = 0;

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      // Trigger the workflow multiple times
      for (let i = 1; i <= totalCount; i++) {
        const result = await client.triggerWorkflow({
          id: workflowId,
          reason: {
            type: TriggerType.Block,
            blockNumber: blockNumber + i * 5,
          },
          isBlocking: true,
        });
        executionIds.push(result.executionId);
      }

      const firstPage = await client.getExecutions([workflowId], {
        limit: pageSize,
      });
      
      expect(firstPage.result.length).toBeLessThanOrEqual(pageSize);
      expect(firstPage.cursor).toBeTruthy();

      const previousPage = await client.getExecutions([workflowId], {
        before: firstPage.cursor,
        limit: pageSize,
      });

      // Verify we got items in both pages
      expect(previousPage.result.length).toBeGreaterThan(0);
      expect(firstPage.result.length).toBeGreaterThan(0);

      // Verify the previous page has cursor and hasMore fields
      expect(typeof previousPage.cursor).toBe("string");
      expect(typeof previousPage.hasMore).toBe("boolean");

      // Verify all returned executions are in our created list
      const previousPageIds = previousPage.result.map((item) => item.id);
      const firstPageIds = firstPage.result.map((item) => item.id);
      
      [...previousPageIds, ...firstPageIds].forEach((id) => {
        if (id) {
          expect(executionIds.includes(id)).toBe(true);
        }
      });
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should throw error with invalid before/after parameters", async () => {
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

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      // Invalid before parameter should throw INVALID_ARGUMENT
      await expect(
        client.getExecutions([workflowId], { before: "invalid-cursor" })
      ).rejects.toThrowError(/INVALID_ARGUMENT/i);

      // Invalid after parameter should throw INVALID_ARGUMENT
      await expect(
        client.getExecutions([workflowId], { after: "invalid-cursor" })
      ).rejects.toThrowError(/INVALID_ARGUMENT/i);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
});
