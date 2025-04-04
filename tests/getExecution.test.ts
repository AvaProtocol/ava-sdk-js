import { describe, beforeAll, test, expect } from "@jest/globals";
import {
  Client,
  TriggerFactory,
  TriggerType,
  NodeFactory,
  Edge,
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

describe("Step Tests", () => {
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
    let workflowId: string | undefined;

    try {
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });

      // Create a workflow with an ETH transfer node
      const ethTransferNode = NodeFactory.create({
        id: getNextId(),
        name: "ethTransfer",
        type: NodeType.ETHTransfer,
        data: {
          destination: "0x0000000000000000000000000000000000000000",
          amount: "0",
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [ethTransferNode]);
      workflowProps.trigger = trigger;
      workflowProps.edges = [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: ethTransferNode.id,
        }),
      ];

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      // Wait for the workflow to be ready
      await new Promise((resolve) => setTimeout(resolve, 2000));

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

      // Get the execution to verify step properties
      const executions = await client.getExecutions([workflowId]);
      expect(executions.result.length).toBeGreaterThan(0);

      const execution = executions.result[0];
      expect(execution.stepsList.length).toBeGreaterThan(0);

      const step = execution.stepsList[0];
      expect(step.nodeId).toBe(ethTransferNode.id);
      expect(step.success).toBeDefined();
      expect(step.startAt).toBeDefined();
      expect(step.endAt).toBeDefined();

      consoleLogNestedObject("execution", execution);
      consoleLogNestedObject("step", step);
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
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });

      // Create a workflow with multiple node types
      const ethTransferNode = NodeFactory.create({
        id: getNextId(),
        name: "ethTransfer",
        type: NodeType.ETHTransfer,
        data: {
          destination: "0x0000000000000000000000000000000000000000",
          amount: "0",
        },
      });

      const restApiNode = NodeFactory.create({
        id: getNextId(),
        name: "restApi",
        type: NodeType.RestAPI,
        data: {
          url: "https://httpbin.org/get",
          method: "GET",
          headersMap: [["content-type", "application/json"]],
          body: "",
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        ethTransferNode,
        restApiNode,
      ]);
      workflowProps.trigger = trigger;
      workflowProps.edges = [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: ethTransferNode.id,
        }),
        new Edge({
          id: getNextId(),
          source: ethTransferNode.id,
          target: restApiNode.id,
        }),
      ];

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      // Wait for the workflow to be ready
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Trigger the workflow
      const triggerResponse = await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      console.log("After triggerWorkflow", triggerResponse);

      // Wait for the execution to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get the execution to verify multiple steps
      const exeResp = await client.getExecutions([workflowId]);

      console.log("After getExecutions", exeResp);
      expect(exeResp.result.length).toBeGreaterThan(0);

      const execution = exeResp.result[0];
      console.log("execution.stepsList", execution.stepsList);
      expect(execution.stepsList.length).toBeGreaterThan(1); // Should have multiple steps

      // Verify each step has the required properties
      execution.stepsList.forEach((step) => {
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
      const trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });

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

      const workflowProps = createFromTemplate(wallet.address, [invalidEthTransferNode]);
      workflowProps.trigger = trigger;
      workflowProps.edges = [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: invalidEthTransferNode.id,
        }),
      ];

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      // Wait for the workflow to be ready
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Trigger the workflow
      await client.triggerWorkflow({
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
      const executions = await client.getExecutions([workflowId]);
      expect(executions.result.length).toBeGreaterThan(0);

      const execution = executions.result[0];
      const failedSteps = execution.stepsList.filter((step) => !step.success);
      expect(failedSteps.length).toBeGreaterThan(0);

      // Verify failed step properties
      failedSteps.forEach((step) => {
        expect(step.error).toBeDefined();
        expect(step.error).not.toBe("");
      });

      console.log(execution.stepsList);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
});
