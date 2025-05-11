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
    const epoch = Math.floor(Date.now() / 1000);
    let workflowId: string | undefined;

    try {
      await cleanupWorkflows(client, wallet.address);
      
      // Create a cron trigger with a schedule of every minute - exactly like in triggerWorkflow.test.ts
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: { scheduleList: ["* * * * *"] },
      });
      
      // Create workflow using the exact same approach as in triggerWorkflow.test.ts
      workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...createFromTemplate(wallet.address, [ethTransferNodeProps]),
          trigger,
          smartWalletAddress: wallet.address,
        })
      );
      console.log("Created workflow with ID:", workflowId);
      
      // Wait for the workflow to be fully registered
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      // Get the workflow to verify its status
      const workflowBefore = await client.getWorkflow(workflowId);
      console.log("Workflow status before trigger:", workflowBefore.status);
      
      // Trigger the workflow with a cron trigger - exactly like in triggerWorkflow.test.ts
      console.log("Triggering workflow with Cron trigger...");
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Cron,
          epoch: epoch + 60, // set epoch to 1 minute later
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
      expect(exeResp.triggerReason?.type).toEqual(TriggerType.Cron);
      expect(exeResp.triggerReason?.epoch).toEqual(epoch + 60);
      
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
    const epoch = Math.floor(Date.now() / 1000);
    let workflowId: string | undefined;

    try {
      await cleanupWorkflows(client, wallet.address);
      
      // Create a fixed time trigger - exactly like in triggerWorkflow.test.ts
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "fixedTimeTrigger",
        type: TriggerType.FixedTime,
        data: { epochsList: [epoch + 60, epoch + 120, epoch + 180] }, // one per minute for the next 3 minutes
      });
      
      // Create workflow using the exact same approach as in triggerWorkflow.test.ts
      workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...createFromTemplate(wallet.address, [ethTransferNodeProps, restApiNodeProps]),
          trigger,
          smartWalletAddress: wallet.address,
        })
      );
      console.log("Created workflow with ID:", workflowId);
      
      // Wait for the workflow to be fully registered
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      // Get the workflow to verify its status
      const workflowBefore = await client.getWorkflow(workflowId);
      console.log("Workflow status before trigger:", workflowBefore.status);
      
      // Trigger the workflow with a fixed time trigger - exactly like in triggerWorkflow.test.ts
      console.log("Triggering workflow with FixedTime trigger...");
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.FixedTime,
          epoch: epoch + 300, // 5 minutes later
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
      expect(exeResp.triggerReason?.type).toEqual(TriggerType.FixedTime);
      expect(exeResp.triggerReason?.epoch).toEqual(epoch + 300);
      
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
      
      // Create an event trigger - exactly like in triggerWorkflow.test.ts
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          expression: `trigger1.data.topics[0] == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" && trigger1.data.topics[2] == "${wallet.address.toLowerCase()}"`,
          matcherList: [],
        },
      });
      
      // Create workflow using the exact same approach as in triggerWorkflow.test.ts
      workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...createFromTemplate(wallet.address, [invalidEthTransferNode]),
          trigger,
          smartWalletAddress: wallet.address,
        })
      );
      console.log("Created workflow with ID:", workflowId);
      
      // Wait for the workflow to be fully registered
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      // Get the workflow to verify its status
      const workflowBefore = await client.getWorkflow(workflowId);
      console.log("Workflow status before trigger:", workflowBefore.status);
      
      // Trigger the workflow with an event trigger - exactly like in triggerWorkflow.test.ts
      console.log("Triggering workflow with Event trigger...");
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Event,
          blockNumber: blockNumber + 5,
          logIndex: 0,
          txHash: "0x1234567890",
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
      expect(exeResp.triggerReason?.type).toEqual(TriggerType.Event);
      expect(exeResp.triggerReason?.blockNumber).toEqual(blockNumber + 5);
      expect(exeResp.triggerReason?.txHash).toEqual("0x1234567890");
      
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
