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

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.Pagination * 1000; // Use a unique salt index range

describe("Pagination Tests", () => {
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

  test("should support forward pagination with 'after' parameter", async () => {
    const triggerInterval = 5;
    const totalTriggerCount = 4;
    const limit = 2;

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
      workflowProps.maxExecution = 0;

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

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

      const firstPage = await client.getExecutions([workflowId], {
        limit,
      });

      expect(firstPage.result.length).toBe(limit);
      expect(firstPage.hasMore).toBe(true);
      expect(firstPage.cursor).toBeTruthy();

      const secondPage = await client.getExecutions([workflowId], {
        limit,
        after: firstPage.cursor,
      });

      expect(secondPage.result.length).toBe(totalTriggerCount - limit);
      expect(secondPage.hasMore).toBe(false);

      const firstPageIds = firstPage.result.map((item) => item.id);
      const secondPageIds = secondPage.result.map((item) => item.id);
      expect(_.intersection(firstPageIds, secondPageIds).length).toBe(0);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should support backward pagination with 'before' parameter", async () => {
    const triggerInterval = 5;
    const totalTriggerCount = 4;
    const limit = 2;

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
      workflowProps.maxExecution = 0;

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

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

      const allExecutions = await client.getExecutions([workflowId], {
        limit: totalTriggerCount,
      });

      const lastPage = await client.getExecutions([workflowId], {
        limit,
        before: "", // Start from the end
      });

      expect(lastPage.result.length).toBe(limit);

      const previousPage = await client.getExecutions([workflowId], {
        limit,
        before: lastPage.cursor,
      });

      expect(previousPage.result.length).toBe(totalTriggerCount - limit);

      const lastPageIds = lastPage.result.map((item) => item.id);
      const previousPageIds = previousPage.result.map((item) => item.id);
      expect(_.intersection(lastPageIds, previousPageIds).length).toBe(0);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("legacy cursor parameter should take precedence over before/after", async () => {
    const triggerInterval = 5;
    const totalTriggerCount = 3;
    const limit = 1;

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
      workflowProps.maxExecution = 0;

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

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

      const firstPage = await client.getExecutions([workflowId], {
        limit,
      });

      const resultWithCursor = await client.getExecutions([workflowId], {
        limit,
        cursor: firstPage.cursor,
        after: "should-be-ignored",
        before: "should-also-be-ignored",
      });

      const resultOnlyCursor = await client.getExecutions([workflowId], {
        limit,
        cursor: firstPage.cursor,
      });

      expect(resultWithCursor.result.length).toBe(resultOnlyCursor.result.length);
      expect(resultWithCursor.result.map(item => item.id)).toEqual(
        resultOnlyCursor.result.map(item => item.id)
      );
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should handle invalid 'after' cursor", async () => {
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

      await expect(
        client.getExecutions([workflowId], {
          after: "invalid-after-cursor",
        })
      ).rejects.toThrowError(/cursor is not valid/);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should handle invalid 'before' cursor", async () => {
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

      await expect(
        client.getExecutions([workflowId], {
          before: "invalid-before-cursor",
        })
      ).rejects.toThrowError(/cursor is not valid/);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
});
