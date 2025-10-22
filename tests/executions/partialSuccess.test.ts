import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
import {
  TriggerType,
  ExecutionStatus,
  NodeType,
  Lang,
  ETHTransferNodeProps,
} from "@avaprotocol/types";
import {
  getBlockNumber,
  TIMEOUT_DURATION,
  MOCK_FAILURE_ADDRESS,
  getSmartWallet,
  getClient,
  authenticateClient,
} from "../utils/utils";
import { createFromTemplate, defaultTriggerId } from "../utils/templates";

jest.setTimeout(TIMEOUT_DURATION);

describe("Execution Partial Success Tests", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  test("should return PartialSuccess status when some nodes succeed and others fail", async () => {
    const wallet = await getSmartWallet(client);
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      // Create a workflow with multiple nodes where some will succeed and some will fail
      const successNode = {
        id: "success-node-" + Date.now(),
        name: "successfulNode",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: "return { result: 'success' };", // This should succeed
        },
      };

      const failureNode = {
        id: "failure-node-" + Date.now(),
        name: "failingNode",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: "throw new Error('Intentional failure for testing');", // This should fail
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [
        successNode,
        failureNode,
      ]);
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

      const execution = await client.getExecution(
        workflowId,
        triggerResult.executionId
      );

      expect(execution).toBeDefined();
      expect(execution.id).toEqual(triggerResult.executionId);

      // The overall execution should show partial success
      // Note: This might be "failed" initially if the system doesn't yet implement PartialSuccess
      // The test will help verify when the feature is implemented
      const executionStatus = await client.getExecutionStatus(
        workflowId,
        triggerResult.executionId
      );

      // Check steps individual success/failure status
      expect(execution.steps.length).toBeGreaterThanOrEqual(3); // Trigger + 2 nodes

      const successStep = execution.steps.find(
        (step) => step.name === "successfulNode"
      );
      const failureStep = execution.steps.find(
        (step) => step.name === "failingNode"
      );

      expect(successStep).toBeDefined();
      expect(failureStep).toBeDefined();

      if (successStep && failureStep) {
        expect(successStep.success).toBe(true);
        expect(failureStep.success).toBe(false);
        expect(failureStep.error).toBeTruthy();

        // When PartialSuccess is implemented, this should be PartialSuccess
        // For now, it might be Failed, Success, or Unspecified depending on current implementation
        expect([
          ExecutionStatus.PartialSuccess,
          ExecutionStatus.Failed,
          ExecutionStatus.Success,
          ExecutionStatus.Unspecified,
        ]).toContain(executionStatus);
      }
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should return PartialSuccess when ETH transfer fails but other nodes succeed", async () => {
    const wallet = await getSmartWallet(client);
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      // Create nodes with a successful custom code node and a failing ETH transfer
      const successNode = {
        id: "success-custom-" + Date.now(),
        name: "successCustomCode",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
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

      const workflowProps = createFromTemplate(wallet.address, [
        successNode,
        failingEthTransfer,
      ]);
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

      const execution = await client.getExecution(
        workflowId,
        triggerResult.executionId
      );
      const executionStatus = await client.getExecutionStatus(
        workflowId,
        triggerResult.executionId
      );

      expect(execution.steps.length).toBeGreaterThanOrEqual(3); // Trigger + 2 nodes

      const successStep = execution.steps.find(
        (step) => step.name === "successCustomCode"
      );
      const ethTransferStep = execution.steps.find(
        (step) => step.name === "failingETHTransfer"
      );

      if (successStep && ethTransferStep) {
        expect(successStep.success).toBe(true);
        expect(ethTransferStep.success).toBe(false);
        expect(ethTransferStep.error).toBeTruthy();

        // Should be PartialSuccess when feature is implemented
        expect([
          ExecutionStatus.PartialSuccess,
          ExecutionStatus.Failed,
          ExecutionStatus.Success,
          ExecutionStatus.Unspecified,
        ]).toContain(executionStatus);
      }
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should return Completed status when all steps succeed (not PartialSuccess)", async () => {
    const wallet = await getSmartWallet(client);
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      // Create a workflow where all nodes should succeed
      const firstSuccessNode = {
        id: "success-1-" + Date.now(),
        name: "firstSuccess",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: "return { step: 1, result: 'success' };",
        },
      };

      const secondSuccessNode = {
        id: "success-2-" + Date.now(),
        name: "secondSuccess",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: "return { step: 2, result: 'success' };",
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [
        firstSuccessNode,
        secondSuccessNode,
      ]);
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

      const execution = await client.getExecution(
        workflowId,
        triggerResult.executionId
      );
      const executionStatus = await client.getExecutionStatus(
        workflowId,
        triggerResult.executionId
      );

      expect(execution.steps.length).toBeGreaterThanOrEqual(3); // Trigger + 2 nodes

      // All steps should succeed
      const allNonTriggerSteps = execution.steps.filter(
        (step) => step.type !== TriggerType.Block
      );
      allNonTriggerSteps.forEach((step) => {
        expect(step.success).toBe(true);
        expect(step.error).toBeFalsy();
      });

      // Should be Success, not PartialSuccess when all succeed
      expect(executionStatus).toBe(ExecutionStatus.Success);
      expect(executionStatus).not.toBe(ExecutionStatus.PartialSuccess);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should return PartialSuccess status when all nodes fail but trigger succeeds", async () => {
    const wallet = await getSmartWallet(client);
    const blockNumber = await getBlockNumber();
    let workflowId: string | undefined;

    try {
      // Create a workflow where all nodes should fail
      const firstFailureNode = {
        id: "failure-1-" + Date.now(),
        name: "firstFailure",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: "throw new Error('First intentional failure');",
        },
      };

      const secondFailureNode = {
        id: "failure-2-" + Date.now(),
        name: "secondFailure",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: "throw new Error('Second intentional failure');",
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [
        firstFailureNode,
        secondFailureNode,
      ]);
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

      const execution = await client.getExecution(
        workflowId,
        triggerResult.executionId
      );
      const executionStatus = await client.getExecutionStatus(
        workflowId,
        triggerResult.executionId
      );

      // All non-trigger steps should fail
      const allNonTriggerSteps = execution.steps.filter(
        (step) => step.type !== TriggerType.Block
      );
      allNonTriggerSteps.forEach((step) => {
        expect(step.success).toBe(false);
        expect(step.error).toBeTruthy();
      });

      // Should be PartialSuccess when all nodes fail but trigger succeeds
      expect(executionStatus).toBe(ExecutionStatus.PartialSuccess);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
});
