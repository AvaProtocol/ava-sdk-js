import { describe, beforeAll, test, expect } from "@jest/globals";
import {
  Client,
  TriggerType,
  NodeFactory,
  TriggerFactory,
  NodeProps,
  Edge,
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
  consoleLogNestedObject,
  cleanupWorkflows,
} from "./utils";

import {
  createFromTemplate,
  defaultTriggerId,
  ethTransferNodeProps,
  restApiNodeProps,
} from "./templates";

import { getConfig } from "./envalid";

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

const createEdgesFromNodes = (nodes: NodeProps[]): Edge[] => {
  return nodes.map((node, index) => {
    if (index === 0) {
      return new Edge({
        id: getNextId(),
        source: defaultTriggerId,
        target: node.id,
      });
    }
    return new Edge({
      id: getNextId(),
      source: nodes[index - 1].id,
      target: node.id,
    });
  });
};

// Set a default timeout of 15 seconds for all tests in this file
jest.setTimeout(TIMEOUT_DURATION);

let saltIndex = SaltGlobal.Step * 1000; // Salt index for Step tests

describe("Get Execution and Step Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(walletPrivateKey);

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
    let workflowId: string | undefined;

    try {
      await cleanupWorkflows(client, wallet.address);
      
      // Create workflow with manual trigger type
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "manualTrigger",
        type: TriggerType.Block, // Still using Block type but will trigger manually
        data: { interval: 1 }, // Use a small interval for faster triggering
      });
      
      // Create and submit workflow with explicit smartWalletAddress and generous time window
      const workflow = client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
        startAt: Math.floor(Date.now() / 1000) - 86400, // 24 hours in the past
        expiredAt: Math.floor(Date.now() / 1000) + 3600 * 24 * 365, // 1 year in the future
        maxExecution: 100, // Allow many executions
      });
      
      workflowId = await client.submitWorkflow(workflow);
      console.log("Created workflow with ID:", workflowId);
      
      // Trigger the workflow with Manual trigger
      console.log("Triggering workflow with Manual trigger...");
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Manual,
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
      expect(exeResp.triggerReason?.blockNumber).toEqual(blockNumber + 5);
      
      // There should be one step in nodes
      expect(exeResp.stepsList.length).toBeGreaterThan(0);

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
    let workflowId: string | undefined;

    try {
      await cleanupWorkflows(client, wallet.address);
      
      // Create workflow with block trigger type
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 1 }, // Use a small interval for faster triggering
      });
      
      // Create and submit workflow with explicit smartWalletAddress and generous time window
      const workflow = client.createWorkflow({
        ...createFromTemplate(wallet.address, [ethTransferNodeProps, restApiNodeProps]),
        trigger,
        smartWalletAddress: wallet.address,
        startAt: Math.floor(Date.now() / 1000) - 86400, // 24 hours in the past
        expiredAt: Math.floor(Date.now() / 1000) + 3600 * 24 * 365, // 1 year in the future
        maxExecution: 100, // Allow many executions
      });
      
      workflowId = await client.submitWorkflow(workflow);
      console.log("Created workflow with ID:", workflowId);
      
      // Trigger the workflow with Manual trigger
      console.log("Triggering workflow with Manual trigger...");
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Manual,
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
      expect(exeResp.triggerReason?.blockNumber).toEqual(blockNumber + 5);
      
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
      
      // Create workflow with block trigger type
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 1 }, // Use a small interval for faster triggering
      });
      
      // Create and submit workflow with explicit smartWalletAddress and generous time window
      const workflow = client.createWorkflow({
        ...createFromTemplate(wallet.address, [invalidEthTransferNode]),
        trigger,
        smartWalletAddress: wallet.address,
        startAt: Math.floor(Date.now() / 1000) - 86400, // 24 hours in the past
        expiredAt: Math.floor(Date.now() / 1000) + 3600 * 24 * 365, // 1 year in the future
        maxExecution: 100, // Allow many executions
      });
      workflowId = await client.submitWorkflow(workflow);
      console.log("Created workflow with ID:", workflowId);
      
      // Trigger the workflow with a block trigger - exactly like in triggerWorkflow.test.ts
      console.log("Triggering workflow with Block trigger...");
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
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
      expect(exeResp.triggerReason?.blockNumber).toEqual(blockNumber + 5);
      
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
