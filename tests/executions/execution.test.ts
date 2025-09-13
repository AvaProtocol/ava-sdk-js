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
  SALT_BUCKET_SIZE,
} from "../utils/utils";
import { executionHasWriteFailure } from "../utils/utils";
import { createFromTemplate, defaultTriggerId } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

let saltIndex = SaltGlobal.GetExecution * SALT_BUCKET_SIZE;

describe("Execution Management Tests", () => {
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

  // getExecution specific tests are now consolidated in getExecution.test.ts

  describe("Execution Index Tests", () => {
    test("should assign sequential index values starting from 0 for multiple executions", async () => {
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
        workflowProps.maxExecution = 0; // Set to infinite runs

        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow);

        // Trigger the workflow 3 times sequentially
        const executionIds: string[] = [];
        const triggerInterval = 5;

        for (let i = 0; i < 3; i++) {
          const triggerResult = await client.triggerWorkflow({
            id: workflowId,
            triggerData: {
              type: TriggerType.Block,
              blockNumber: blockNumber + (i + 1) * triggerInterval,
            },
            isBlocking: true,
          });
          executionIds.push(triggerResult.executionId);
        }

        // Verify each execution has the correct index
        for (let i = 0; i < executionIds.length; i++) {
          const execution = await client.getExecution(workflowId, executionIds[i]);
          expect(execution).toBeDefined();
          expect(execution.id).toEqual(executionIds[i]);
          
          // The index should be 0-based: 0 for first run, 1 for second run, etc.
          expect(execution.index).toBe(i);
        }
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("should assign correct indexes regardless of execution completion order", async () => {
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

        // Trigger multiple executions non-blocking (async)
        const triggerPromises = [];

        for (let i = 0; i < 2; i++) {
          const triggerPromise = client.triggerWorkflow({
            id: workflowId,
            triggerData: {
              type: TriggerType.Block,
              blockNumber: blockNumber + (i + 1) * 5,
            },
            isBlocking: false, // Non-blocking to potentially allow out-of-order completion
          });
          triggerPromises.push(triggerPromise);
        }

        // Wait for all triggers to be submitted
        const triggerResults = await Promise.all(triggerPromises);

        // Wait for executions to complete
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Collect all executions and their indexes
        const executionsWithIndexes = [];
        for (let i = 0; i < triggerResults.length; i++) {
          const execution = await client.getExecution(workflowId, triggerResults[i].executionId);
          expect(execution).toBeDefined();
          expect(typeof execution.index).toBe('number');
          executionsWithIndexes.push({
            executionId: execution.id,
            index: execution.index
          });
        }

        // Verify that indexes are unique and within expected range
        const indexes = executionsWithIndexes.map(e => e.index);
        const uniqueIndexes = [...new Set(indexes)];
        expect(uniqueIndexes.length).toBe(indexes.length); // All indexes should be unique
        
        // Indexes should be 0 and 1 (in any order)
        expect(indexes.sort()).toEqual([0, 1]);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("should reset index to 0 when workflow is resubmitted", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const blockNumber = await getBlockNumber();
      let firstWorkflowId: string | undefined;
      let secondWorkflowId: string | undefined;

      try {
        // Create and submit first workflow
        const workflowProps = createFromTemplate(wallet.address);
        workflowProps.trigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval: 5 },
        });
        workflowProps.maxExecution = 0;

        const firstWorkflow = client.createWorkflow(workflowProps);
        firstWorkflowId = await client.submitWorkflow(firstWorkflow);

        // Execute the first workflow once
        const firstTriggerResult = await client.triggerWorkflow({
          id: firstWorkflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: blockNumber + 5,
          },
          isBlocking: true,
        });

        const firstExecution = await client.getExecution(firstWorkflowId, firstTriggerResult.executionId);
        expect(firstExecution.index).toBe(0);

        // Delete the first workflow
        await client.deleteWorkflow(firstWorkflowId);
        firstWorkflowId = undefined;

        // Create and submit a new workflow (same template but new instance)
        const secondWorkflow = client.createWorkflow(workflowProps);
        secondWorkflowId = await client.submitWorkflow(secondWorkflow);

        // Execute the second workflow
        const secondTriggerResult = await client.triggerWorkflow({
          id: secondWorkflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: blockNumber + 10,
          },
          isBlocking: true,
        });

        const secondExecution = await client.getExecution(secondWorkflowId, secondTriggerResult.executionId);
        // The index should reset to 0 for the new workflow instance
        expect(secondExecution.index).toBe(0);
      } finally {
        if (firstWorkflowId) {
          await client.deleteWorkflow(firstWorkflowId);
        }
        if (secondWorkflowId) {
          await client.deleteWorkflow(secondWorkflowId);
        }
      }
    });

    test("should include index field in getExecutions response", async () => {
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

        // Trigger the workflow twice
        const firstResult = await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: blockNumber + 5,
          },
          isBlocking: true,
        });

        const secondResult = await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: blockNumber + 10,
          },
          isBlocking: true,
        });

        // Get executions list and verify index field is present and correct
        const executionsList = await client.getExecutions([workflowId], { limit: 10 });
        
        expect(executionsList.items).toBeDefined();
        expect(executionsList.items.length).toBe(2);

        // Sort by index to ensure correct order verification
        const sortedExecutions = executionsList.items.sort((a: any, b: any) => a.index - b.index);
        
        expect(sortedExecutions[0].index).toBe(0);
        expect(sortedExecutions[1].index).toBe(1);
        
        // Verify these match the execution IDs from our triggers
        const executionIds = [firstResult.executionId, secondResult.executionId];
        expect(executionIds).toContain(sortedExecutions[0].id);
        expect(executionIds).toContain(sortedExecutions[1].id);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });
  });

  // getExecutions and getExecutionCount tests are in their respective dedicated test files
});
