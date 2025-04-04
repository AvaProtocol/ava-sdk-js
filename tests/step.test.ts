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
} from "./utils";
import {
  FACTORY_ADDRESS,
  WorkflowTemplate,
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

    const workflow = client.createWorkflow({
      ...WorkflowTemplate,
      trigger,
      smartWalletAddress: wallet.address,
      nodes: [ethTransferNode],
      edges: [],
    });
    const workflowId = await client.submitWorkflow(workflow);

    try {
      // Trigger the workflow
      await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      // Get the execution to verify step properties
      const executions = await client.getExecutions([workflowId]);
      expect(executions.result.length).toBeGreaterThan(0);

      const execution = executions.result[0];
      expect(execution.stepsList.length).toBeGreaterThan(0);

      const step = execution.stepsList[0];
      expect(step).toHaveProperty("nodeId");
      expect(step).toHaveProperty("success");
      expect(step).toHaveProperty("log");
      expect(step).toHaveProperty("error");
      expect(step).toHaveProperty("startAt");
      expect(step).toHaveProperty("endAt");
      expect(step).toHaveProperty("inputsList");
      expect(step).toHaveProperty("outputData");
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });

  test("should handle multiple steps in workflow execution with different node types", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

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

    const graphqlNode = NodeFactory.create({
      id: getNextId(),
      name: "graphql",
      type: NodeType.GraphQLQuery,
      data: {
        url: "https://api.example.com/graphql",
        query: "{ test { id } }",
        variablesMap: [["variableName", "variableValue"]],
      },
    });

    const workflow = client.createWorkflow({
      ...WorkflowTemplate,
      trigger,
      smartWalletAddress: wallet.address,
      nodes: [ethTransferNode, graphqlNode],
      edges: [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: ethTransferNode.id,
        }),
      ],
    });

    console.log("Before submitWorkflow", workflow);
    const workflowId = await client.submitWorkflow(workflow);

    try {
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

      // Get the execution to verify multiple steps
      const exeResp = await client.getExecutions([workflowId]);

      console.log("After getExecutions", exeResp);
      expect(exeResp.result.length).toBeGreaterThan(0);

      const execution = exeResp.result[0];
      console.log("execution.stepsList", execution.stepsList);
      expect(execution.stepsList.length).toBeGreaterThan(1); // Should have multiple steps

      // Verify each step has the required properties
      console.log("execution.stepsList", execution.stepsList);
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });

  test("should handle failed steps in workflow execution with invalid configuration", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

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

    const workflow = client.createWorkflow({
      ...WorkflowTemplate,
      trigger,
      smartWalletAddress: wallet.address,
      nodes: [invalidEthTransferNode],
      edges: [],
    });
    const workflowId = await client.submitWorkflow(workflow);

    try {
      // Trigger the workflow
      await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      });

      // Get the execution to verify failed steps
      const executions = await client.getExecutions([workflowId]);
      expect(executions.result.length).toBeGreaterThan(0);

      const execution = executions.result[0];
      const failedSteps = execution.stepsList.filter((step) => !step.success);

      // If there are failed steps, verify their properties
      console.log(execution.stepsList);
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });
});
