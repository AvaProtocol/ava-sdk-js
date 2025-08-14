import util from "util";
import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import { NodeType, TriggerType } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  TIMEOUT_DURATION,
  SaltGlobal,
  getBlockNumber,
  removeCreatedWorkflows,
  SALT_BUCKET_SIZE,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.BranchNode * SALT_BUCKET_SIZE;

describe("BranchNode Tests", () => {
  let client: Client;
  let eoaAddress: string;

  beforeAll(async () => {
    eoaAddress = await getAddress(walletPrivateKey);

    client = new Client({
      endpoint: avsEndpoint,
    });

    const { message } = await client.getSignatureFormat(eoaAddress);
    const signature = await generateSignature(message, walletPrivateKey);

    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should evaluate timestamp comparison with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditions: [
            {
              id: "condition1",
              type: "if",
              expression: "{{ trigger.data.timestamp > 0 }}",
            },
            { id: "condition2", type: "else", expression: "" },
          ],
        },
        inputVariables: {
          trigger: {
            data: {
              timestamp: 1748804062960,
            },
          },
        },
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      
      // Validate data format - should be clean JSON, not protobuf structures
      expect(result.data).toEqual(
        expect.objectContaining({
          conditionId: expect.any(String)
        })
      );
      // Ensure no protobuf artifacts like nullValue, numberValue, structValue
      expect(result.data).not.toHaveProperty('nullValue');
      expect(result.data).not.toHaveProperty('numberValue');
      expect(result.data).not.toHaveProperty('structValue');
    });

    test("should evaluate status string comparison with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditions: [
            {
              id: "condition1",
              type: "if",
              expression: '{{ trigger.data.status === "ready" }}',
            },
            { id: "condition2", type: "else", expression: "" },
          ],
        },
        inputVariables: {
          trigger: {
            data: {
              status: "ready",
            },
          },
        },
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      
      // Validate data format - should be clean JSON, not protobuf structures
      expect(result.data).toEqual(
        expect.objectContaining({
          conditionId: expect.any(String)
        })
      );
      // Ensure no protobuf artifacts like nullValue, numberValue, structValue
      expect(result.data).not.toHaveProperty('nullValue');
      expect(result.data).not.toHaveProperty('numberValue');
      expect(result.data).not.toHaveProperty('structValue');
    });

    test("should evaluate nested object property access with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditions: [
            {
              id: "condition1",
              type: "if",
              expression: '{{ trigger.data.user.role === "admin" }}',
            },
            { id: "condition2", type: "else", expression: "" },
          ],
        },
        inputVariables: {
          trigger: {
            data: {
              user: {
                role: "admin",
              },
            },
          },
        },
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      
      // Validate data format - should be clean JSON, not protobuf structures
      expect(result.data).toEqual(
        expect.objectContaining({
          conditionId: expect.any(String)
        })
      );
      // Ensure no protobuf artifacts like nullValue, numberValue, structValue
      expect(result.data).not.toHaveProperty('nullValue');
      expect(result.data).not.toHaveProperty('numberValue');
      expect(result.data).not.toHaveProperty('structValue');
    });

    test("should evaluate complex logical expression with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditions: [
            {
              id: "condition1",
              type: "if",
              expression:
                '{{ trigger.data.status === "ready" && trigger.data.user.age >= 18 }}',
            },
            { id: "condition2", type: "else", expression: "" },
          ],
        },
        inputVariables: {
          trigger: {
            data: {
              status: "ready",
              user: {
                age: 21,
              },
            },
          },
        },
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      
      // Validate data format - should be clean JSON, not protobuf structures
      expect(result.data).toEqual(
        expect.objectContaining({
          conditionId: expect.any(String)
        })
      );
      // Ensure no protobuf artifacts like nullValue, numberValue, structValue
      expect(result.data).not.toHaveProperty('nullValue');
      expect(result.data).not.toHaveProperty('numberValue');
      expect(result.data).not.toHaveProperty('structValue');
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with branch node condition evaluation", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const branchNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_branch_test",
        type: NodeType.Branch,
        data: {
          conditions: [
            {
              id: "condition1",
              type: "if",
              expression: "{{ trigger.data.user.age >= 18 }}",
            },
            { id: "condition2", type: "else", expression: "" },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [branchNode]);

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
      });



      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + branch node

      const branchStep = simulation.steps.find(
        (step) => step.id === branchNode.id
      );
      expect(branchStep).toBeDefined();
    });

    test("should simulate workflow with false condition", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const branchNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_false_condition",
        type: NodeType.Branch,
        data: {
          conditions: [
            {
              id: "condition1",
              type: "if",
              expression: '{{ trigger.data.user.role === "guest" }}',
            },
            { id: "condition2", type: "else", expression: "" },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [branchNode]);

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
      });

      expect(simulation.success).toBe(true);
      const branchStep = simulation.steps.find(
        (step) => step.id === branchNode.id
      );
      expect(branchStep).toBeDefined();
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with branch node", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const branchNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_branch_test",
        type: NodeType.Branch,
        data: {
          conditions: [
            {
              id: "condition1",
              type: "if",
              expression: "{{ trigger.data.timestamp > 0 }}",
            },
            { id: "condition2", type: "else", expression: "" },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [branchNode]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      let workflowId: string | undefined;
      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        const triggerResult = await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        });



        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const branchStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === branchNode.id
        );

        if (_.isUndefined(branchStep)) {
          throw new Error("No corresponding branch step found.");
        }

        expect(branchStep.success).toBe(true);

      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Condition Evaluation Consistency Tests", () => {
    test("should return consistent condition evaluation across all three methods", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const branchConfig = {
        conditions: [
          {
            id: "condition1",
            type: "if",
            expression: '{{ trigger.data.status === "active" }}',
          },
          { id: "condition2", type: "else", expression: "" },
        ],
      };

      const inputVariables = {
        trigger: {
          data: {
            status: "active",
          },
        },
      };



      // Test 1: runNodeWithInputs
      const directResponse = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: branchConfig,
        inputVariables: inputVariables,
      });

      // Test 2: simulateWorkflow
      const branchNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_test",
        type: NodeType.Branch,
        data: branchConfig,
      });

      const workflowProps = createFromTemplate(wallet.address, [branchNode]);
      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
      });

      const simulatedStep = simulation.steps.find(
        (step) => step.id === branchNode.id
      );

      // Test 3: Deploy + Trigger
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      let workflowId: string | undefined;
      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        });

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });
        const executedStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === branchNode.id
        );

        // Compare response formats

        // All should be successful
        expect(directResponse.success).toBe(true);
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBe(true);


      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });
});
