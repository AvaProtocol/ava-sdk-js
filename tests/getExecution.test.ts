import { describe, beforeAll, test, expect } from "@jest/globals";
import {
  Client,
  TriggerType,
  NodeFactory,
  TriggerFactory,
  WorkflowStatus,
} from "@avaprotocol/sdk-js";
import { NodeType } from "@avaprotocol/types";

import _ from "lodash";
import {
  getAddress,
  generateSignature,
  getBlockNumber,
  SaltGlobal,
  TIMEOUT_DURATION,
  getNextId,
  cleanupWorkflows,
} from "./utils";

import {
  createFromTemplate,
  ethTransferNodeProps,
  restApiNodeProps,
  defaultTriggerId,
  blockTriggerEvery5,
} from "./templates";

import { getConfig } from "./envalid";

jest.setTimeout(TIMEOUT_DURATION * 4); // 60 seconds

let saltIndex = SaltGlobal.TriggerWorkflow * 1000; // Salt index 10,000 - 10,499 (same as triggerWorkflow.test.ts)

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

describe("Get Execution and Step Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(walletPrivateKey);
    console.log("Owner wallet address:", ownerAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const signature = await generateSignature(walletPrivateKey);
    const res = await client.authWithSignature(signature);
    client.setAuthKey(res.authKey);
  });

  test("should verify step properties from workflow execution with ETH transfer node", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    const interval = 5;
    let workflowId: string | undefined;

    try {
      await cleanupWorkflows(client, wallet.address);
      
      // Create workflow with Block trigger (using exact pattern from triggerWorkflow.test.ts)
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval },
      });

      workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...createFromTemplate(wallet.address, [ethTransferNodeProps]),
          trigger,
          smartWalletAddress: wallet.address,
        })
      );
      console.log("Created workflow with ID:", workflowId);
      
      // Verify no executions exist yet
      const executions = await client.getExecutions([workflowId]);
      expect(Array.isArray(executions.result)).toBe(true);
      expect(executions.result.length).toEqual(0);
      
      
      console.log("Triggering workflow with Block trigger...");
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: blockNumber + interval,
        },
        isBlocking: true,
      });
      
      console.log("Trigger response executionId:", triggerResponse.executionId);

      // Get the execution to verify step properties
      const exeResp = await client.getExecution(
        workflowId,
        triggerResponse.executionId
      );
      
      // Verify that the execution has the expected properties
      expect(exeResp.id).toEqual(triggerResponse.executionId);
      expect(exeResp.triggerReason?.type).toEqual(TriggerType.Block);
      expect(exeResp.triggerReason?.blockNumber).toEqual(blockNumber + interval);
      
      // There should be one step in nodes
      expect(exeResp.stepsList.length).toBeGreaterThan(0);

      // Verify step properties
      const step = exeResp.stepsList[0];
      expect(step.nodeId).toBe(ethTransferNodeProps.id);
      expect(step.success).toBeDefined();
      expect(step.startAt).toBeDefined();
      expect(step.endAt).toBeDefined();
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should handle multiple steps in workflow execution with different node types", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    const interval = 5;
    let workflowId: string | undefined;

    try {
      await cleanupWorkflows(client, wallet.address);
      
      // Create workflow with Block trigger (using exact pattern from triggerWorkflow.test.ts)
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval },
      });

      workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...createFromTemplate(wallet.address, [ethTransferNodeProps, restApiNodeProps]),
          trigger,
          smartWalletAddress: wallet.address,
        })
      );
      console.log("Created workflow with ID:", workflowId);
      
      // Verify no executions exist yet
      const executions = await client.getExecutions([workflowId]);
      expect(Array.isArray(executions.result)).toBe(true);
      expect(executions.result.length).toEqual(0);
      
      
      console.log("Triggering workflow with Block trigger...");
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: blockNumber + interval, // Use future block number exactly as in triggerWorkflow.test.ts
        },
        isBlocking: true,
      });
      
      console.log("Trigger response executionId:", triggerResponse.executionId);

      // Get the execution to verify multiple steps
      const exeResp = await client.getExecution(
        workflowId,
        triggerResponse.executionId
      );
      
      // Verify that the execution has the expected properties
      expect(exeResp.id).toEqual(triggerResponse.executionId);
      expect(exeResp.triggerReason?.type).toEqual(TriggerType.Block);
      expect(exeResp.triggerReason?.blockNumber).toEqual(blockNumber + interval);
      
      // Should have multiple steps
      expect(exeResp.stepsList.length).toBe(2);

      // Verify each step has the required properties
      exeResp.stepsList.forEach((step) => {
        expect(step.nodeId).toBeDefined();
        expect(step.success).toBeDefined();
        expect(step.startAt).toBeDefined();
        expect(step.endAt).toBeDefined();
      });
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should handle failed steps in workflow execution with invalid configuration", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    const interval = 5;
    let workflowId: string | undefined;

    try {
      await cleanupWorkflows(client, wallet.address);
      
      // Create a workflow with an invalid ETH transfer node
      const invalidEthTransferNode = NodeFactory.create({
        id: getNextId(),
        name: "invalidEthTransfer",
        type: NodeType.ETHTransfer,
        data: {
          destination: "invalid-address", // Invalid address
          amount: "0",
        },
      });
      
      // Create workflow with Block trigger (using exact pattern from triggerWorkflow.test.ts)
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval },
      });

      workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...createFromTemplate(wallet.address, [invalidEthTransferNode]),
          trigger,
          smartWalletAddress: wallet.address,
        })
      );
      console.log("Created workflow with ID:", workflowId);
      
      // Verify no executions exist yet
      const executions = await client.getExecutions([workflowId]);
      expect(Array.isArray(executions.result)).toBe(true);
      expect(executions.result.length).toEqual(0);
      
      
      console.log("Triggering workflow with Block trigger...");
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: blockNumber + interval, // Use future block number exactly as in triggerWorkflow.test.ts
        },
        isBlocking: true,
      });
      
      console.log("Trigger response executionId:", triggerResponse.executionId);

      // Get the execution to verify failed steps
      const exeResp = await client.getExecution(
        workflowId,
        triggerResponse.executionId
      );
      
      // Verify that the execution has the expected properties
      expect(exeResp.id).toEqual(triggerResponse.executionId);
      expect(exeResp.triggerReason?.type).toEqual(TriggerType.Block);
      expect(exeResp.triggerReason?.blockNumber).toEqual(blockNumber + interval);
      
      expect(exeResp.stepsList.length).toBeGreaterThan(0);

      const failedSteps = exeResp.stepsList.filter((step) => !step.success);
      expect(failedSteps.length).toBeGreaterThan(0);

      // Verify failed step properties
      failedSteps.forEach((step) => {
        expect(step.error).toBeDefined();
        expect(step.error).not.toBe("");
      });
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
});
