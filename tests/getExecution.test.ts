import { describe, beforeAll, test, expect } from "@jest/globals";
import {
  Client,
  TriggerType,
  NodeFactory,
} from "@avaprotocol/sdk-js";
import { NodeType } from "@avaprotocol/types";

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
  getNextId,
  consoleLogNestedObject,
} from "./utils";

import {
  FACTORY_ADDRESS,
  createFromTemplate,
  defaultTriggerId,
  ethTransferNodeProps,
  restApiNodeProps,
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

let saltIndex = SaltGlobal.Step * 1000; // Salt index for Step tests

describe("Get Execution and Step Tests", () => {
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

  test("should verify step properties from workflow execution with ETH transfer node", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();
    const targetBlockNumber = blockNumber + 5;
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address, [
        ethTransferNodeProps,
      ]);

      const workflow = client.createWorkflow(workflowProps);
      consoleLogNestedObject("workflow", workflow);
      workflowId = await client.submitWorkflow(workflow);

      // Trigger the workflow
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: targetBlockNumber,
        },
        isBlocking: true,
      });

      consoleLogNestedObject("triggerResponse", triggerResponse);

      // Wait for the execution triggering to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get the execution to verify step properties
      const exeResp = await client.getExecution(
        workflowId,
        triggerResponse.executionId
      );
      consoleLogNestedObject("exeResp", exeResp);

      expect(exeResp.triggerName).toBe("blockTrigger");
      expect(exeResp.triggerReason?.type).toBe(TriggerType.Block);
      expect(exeResp.triggerReason?.blockNumber).toBe(targetBlockNumber);
      expect(exeResp.triggerOutput).toBeDefined();
      expect(exeResp.error).toBe("");

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
    const targetBlockNumber = blockNumber + 5;
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address, [
        ethTransferNodeProps,
        restApiNodeProps,
      ]);

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      // Trigger the workflow
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: targetBlockNumber,
        },
        isBlocking: true,
      });

      consoleLogNestedObject("After triggerWorkflow", triggerResponse);

      // Wait for the execution to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get the execution to verify multiple steps
      const exeResp = await client.getExecution(
        workflowId,
        triggerResponse.executionId
      );

      consoleLogNestedObject("After getExecutions", exeResp);
      expect(exeResp.stepsList.length).toBe(2); // Should have multiple steps

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

      const workflowProps = createFromTemplate(wallet.address, [
        invalidEthTransferNode,
      ]);

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      // Trigger the workflow
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      // Wait for the execution to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get the execution to verify failed steps
      const exeResp = await client.getExecution(
        workflowId,
        triggerResponse.executionId
      );

      expect(exeResp.stepsList.length).toBeGreaterThan(0);

      consoleLogNestedObject("exeResp", exeResp);
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
