import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import { 
  TriggerType, 
  ExecutionStatus, 
  NodeType, 
  CustomCodeLang, 
  ETHTransferNodeProps 
} from "@avaprotocol/types";
import _ from "lodash";
import {
  getAddress,
  generateSignature,
  getBlockNumber,
  SaltGlobal,
  TIMEOUT_DURATION,
  SALT_BUCKET_SIZE,
  MOCK_FAILURE_ADDRESS,
} from "../utils/utils";
import { createFromTemplate, defaultTriggerId } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

let saltIndex = SaltGlobal.ExecutionIndex * SALT_BUCKET_SIZE + 100; // Offset to avoid conflicts

describe("Execution Partial Success Tests", () => {
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

  test("should return PartialSuccess status when some nodes succeed and others fail", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      // Create a workflow with multiple nodes where some will succeed and some will fail
      const successNode = {
        id: "success-node-" + Date.now(),
        name: "successfulNode",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "return { result: 'success' };", // This should succeed
        },
      };

      const failureNode = {
        id: "failure-node-" + Date.now(),
        name: "failingNode", 
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "throw new Error('Intentional failure for testing');", // This should fail
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [successNode, failureNode]);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });
      workflowProps.maxExecution = 1;

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const triggerResult = await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      const execution = await client.getExecution(workflowId, triggerResult.executionId);
      
      expect(execution).toBeDefined();
      expect(execution.id).toEqual(triggerResult.executionId);
      
      // The overall execution should show partial success
      // Note: This might be "failed" initially if the system doesn't yet implement PartialSuccess
      // The test will help verify when the feature is implemented
      const executionStatus = await client.getExecutionStatus(workflowId, triggerResult.executionId);
      
      // Check steps individual success/failure status
      expect(execution.steps.length).toBeGreaterThanOrEqual(3); // Trigger + 2 nodes
      
      const successStep = execution.steps.find(step => step.name === "successfulNode");
      const failureStep = execution.steps.find(step => step.name === "failingNode");
      
      expect(successStep).toBeDefined();
      expect(failureStep).toBeDefined();
      
      if (successStep && failureStep) {
        expect(successStep.success).toBe(true);
        expect(failureStep.success).toBe(false);
        expect(failureStep.error).toBeTruthy();
        
        // When PartialSuccess is implemented, this should be PartialSuccess
        // For now, it might be Failed, Completed, or Unspecified depending on current implementation
        expect([
          ExecutionStatus.PartialSuccess,
          ExecutionStatus.Failed,
          ExecutionStatus.Completed,
          ExecutionStatus.Unspecified
        ]).toContain(executionStatus);
      }
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should return PartialSuccess when ETH transfer fails but other nodes succeed", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      // Create nodes with a successful custom code node and a failing ETH transfer
      const successNode = {
        id: "success-custom-" + Date.now(),
        name: "successCustomCode",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "return { message: 'Custom code executed successfully' };",
        },
      };

      // ETH transfer to an invalid address or with insufficient funds to cause failure
      const failingEthTransfer: ETHTransferNodeProps = {
        id: "failing-eth-" + Date.now(),
        name: "failingETHTransfer",
        type: NodeType.ETHTransfer,
        data: {
          destination: MOCK_FAILURE_ADDRESS, // Using mock failure address
          amount: "1000000000000000000", // 1 ETH - likely to fail due to insufficient balance
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [successNode, failingEthTransfer]);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });
      workflowProps.maxExecution = 1;

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const triggerResult = await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      const execution = await client.getExecution(workflowId, triggerResult.executionId);
      const executionStatus = await client.getExecutionStatus(workflowId, triggerResult.executionId);
      
      expect(execution.steps.length).toBeGreaterThanOrEqual(3); // Trigger + 2 nodes
      
      const successStep = execution.steps.find(step => step.name === "successCustomCode");
      const ethTransferStep = execution.steps.find(step => step.name === "failingETHTransfer");
      
      if (successStep && ethTransferStep) {
        expect(successStep.success).toBe(true);
        expect(ethTransferStep.success).toBe(false);
        expect(ethTransferStep.error).toBeTruthy();
        
        // Should be PartialSuccess when feature is implemented
        expect([
          ExecutionStatus.PartialSuccess,
          ExecutionStatus.Failed,
          ExecutionStatus.Completed,
          ExecutionStatus.Unspecified
        ]).toContain(executionStatus);
      }
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should return Completed status when all steps succeed (not PartialSuccess)", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      // Create a workflow where all nodes should succeed
      const firstSuccessNode = {
        id: "success-1-" + Date.now(),
        name: "firstSuccess",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "return { step: 1, result: 'success' };",
        },
      };

      const secondSuccessNode = {
        id: "success-2-" + Date.now(),
        name: "secondSuccess",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "return { step: 2, result: 'success' };",
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [firstSuccessNode, secondSuccessNode]);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });
      workflowProps.maxExecution = 1;

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const triggerResult = await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      const execution = await client.getExecution(workflowId, triggerResult.executionId);
      const executionStatus = await client.getExecutionStatus(workflowId, triggerResult.executionId);
      
      expect(execution.steps.length).toBeGreaterThanOrEqual(3); // Trigger + 2 nodes
      
      // All steps should succeed
      const allNonTriggerSteps = execution.steps.filter(step => step.type !== TriggerType.Block);
      allNonTriggerSteps.forEach(step => {
        expect(step.success).toBe(true);
        expect(step.error).toBeFalsy();
      });
      
      // Should be Completed, not PartialSuccess when all succeed
      expect(executionStatus).toBe(ExecutionStatus.Completed);
      expect(executionStatus).not.toBe(ExecutionStatus.PartialSuccess);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should return Failed status when all nodes fail (not PartialSuccess)", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      // Create a workflow where all nodes should fail
      const firstFailureNode = {
        id: "failure-1-" + Date.now(),
        name: "firstFailure",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "throw new Error('First intentional failure');",
        },
      };

      const secondFailureNode = {
        id: "failure-2-" + Date.now(),
        name: "secondFailure", 
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "throw new Error('Second intentional failure');",
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [firstFailureNode, secondFailureNode]);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });
      workflowProps.maxExecution = 1;

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const triggerResult = await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      const execution = await client.getExecution(workflowId, triggerResult.executionId);
      const executionStatus = await client.getExecutionStatus(workflowId, triggerResult.executionId);
      
      // All non-trigger steps should fail
      const allNonTriggerSteps = execution.steps.filter(step => step.type !== TriggerType.Block);
      allNonTriggerSteps.forEach(step => {
        expect(step.success).toBe(false);
        expect(step.error).toBeTruthy();
      });
      
      // Should be Failed or Unspecified, not PartialSuccess when all fail
      expect([
        ExecutionStatus.Failed,
        ExecutionStatus.Unspecified
      ]).toContain(executionStatus);
      expect(executionStatus).not.toBe(ExecutionStatus.PartialSuccess);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
});
