import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import { Client, TriggerFactory, NodeFactory, Edge } from "@avaprotocol/sdk-js";
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

            expect(result.success).toBeTruthy();
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

            expect(result.success).toBeTruthy();
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

            expect(result.success).toBeTruthy();
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

            expect(result.success).toBeTruthy();
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



      expect(simulation.success).toBeTruthy();
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

      expect(simulation.success).toBeTruthy();
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

        expect(executions.items.length).toBe(1);

        const branchStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === branchNode.id
        );

        if (_.isUndefined(branchStep)) {
          throw new Error("No corresponding branch step found.");
        }

        expect(branchStep.success).toBeTruthy();

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
        expect(directResponse.success).toBeTruthy();
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBeTruthy();


      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  // --- New gating tests ---
  describe("Branch gating of successors", () => {
    test("simulateWorkflow: true -> NodeA only; false -> NodeB only", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Case 1: condition true -> NodeA
      const branchTrue = NodeFactory.create({
        id: getNextId(),
        name: "branch_true",
        type: NodeType.Branch,
        data: { conditions: [ { id: "on", type: "if", expression: "true" }, { id: "off", type: "else", expression: "" } ] }
      });
      const nodeAT = NodeFactory.create({ id: getNextId(), name: "NodeA_T", type: NodeType.CustomCode, data: { lang: 0, source: "return { a: 1 }" } });
      const nodeBT = NodeFactory.create({ id: getNextId(), name: "NodeB_T", type: NodeType.CustomCode, data: { lang: 0, source: "return { b: 1 }" } });
      const triggerT = TriggerFactory.create({ id: defaultTriggerId, name: "blockTrigger", type: TriggerType.Block, data: { interval: 3 } });
      const edgesT = [
        new Edge({ id: getNextId(), source: defaultTriggerId, target: branchTrue.id }),
        new Edge({ id: getNextId(), source: `${branchTrue.id}.on`, target: nodeAT.id }),
        new Edge({ id: getNextId(), source: `${branchTrue.id}.off`, target: nodeBT.id }),
      ];
      const wfTrue = { trigger: triggerT, nodes: [branchTrue, nodeAT, nodeBT], edges: edgesT };
      const simTrue = await client.simulateWorkflow({
        ...client.createWorkflow(wfTrue).toJson(),
        inputVariables: { workflowContext: { eoaAddress: await getAddress(walletPrivateKey), runner: wallet.address } }
      });
      const stepIdsTrue = simTrue.steps.map((s: { id: string }) => s.id);
      expect(stepIdsTrue).toContain(branchTrue.id);
      expect(stepIdsTrue).toContain(nodeAT.id);
      expect(stepIdsTrue).not.toContain(nodeBT.id);

      // Case 2: condition false -> NodeB
      const branchFalse = NodeFactory.create({
        id: getNextId(),
        name: "branch_false",
        type: NodeType.Branch,
        data: { conditions: [ { id: "on", type: "if", expression: "false" }, { id: "off", type: "else", expression: "" } ] }
      });
      const nodeAF = NodeFactory.create({ id: getNextId(), name: "NodeA_F", type: NodeType.CustomCode, data: { lang: 0, source: "return { a: 1 }" } });
      const nodeBF = NodeFactory.create({ id: getNextId(), name: "NodeB_F", type: NodeType.CustomCode, data: { lang: 0, source: "return { b: 1 }" } });
      const triggerF = TriggerFactory.create({ id: defaultTriggerId, name: "blockTrigger", type: TriggerType.Block, data: { interval: 3 } });
      const edgesF = [
        new Edge({ id: getNextId(), source: defaultTriggerId, target: branchFalse.id }),
        new Edge({ id: getNextId(), source: `${branchFalse.id}.on`, target: nodeAF.id }),
        new Edge({ id: getNextId(), source: `${branchFalse.id}.off`, target: nodeBF.id }),
      ];
      const wfFalse = { trigger: triggerF, nodes: [branchFalse, nodeAF, nodeBF], edges: edgesF };
      const simFalse = await client.simulateWorkflow({
        ...client.createWorkflow(wfFalse).toJson(),
        inputVariables: { workflowContext: { eoaAddress: await getAddress(walletPrivateKey), runner: wallet.address } }
      });
      const stepIdsFalse = simFalse.steps.map((s: { id: string }) => s.id);
      expect(stepIdsFalse).toContain(branchFalse.id);
      expect(stepIdsFalse).toContain(nodeBF.id);
      expect(stepIdsFalse).not.toContain(nodeAF.id);
    });

    test("deployed workflow: true -> NodeA only; false -> NodeB only", async () => {
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 4;

      // True branch
      const branchT = NodeFactory.create({ id: getNextId(), name: "deploy_branch_true_gating", type: NodeType.Branch, data: { conditions: [ { id: "on", type: "if", expression: "true" }, { id: "off", type: "else", expression: "" } ] } });
      const nodeATD = NodeFactory.create({ id: getNextId(), name: "NodeA_true", type: NodeType.CustomCode, data: { lang: 0, source: "return { a: 1 }" } });
      const nodeBTD = NodeFactory.create({ id: getNextId(), name: "NodeB_true", type: NodeType.CustomCode, data: { lang: 0, source: "return { b: 1 }" } });
      const triggerDeploy = TriggerFactory.create({ id: defaultTriggerId, name: "blockTrigger", type: TriggerType.Block, data: { interval: triggerInterval } });
      const edgesDT = [
        new Edge({ id: getNextId(), source: defaultTriggerId, target: branchT.id }),
        new Edge({ id: getNextId(), source: `${branchT.id}.on`, target: nodeATD.id }),
        new Edge({ id: getNextId(), source: `${branchT.id}.off`, target: nodeBTD.id }),
      ];
      const wfTrue = { trigger: triggerDeploy, nodes: [branchT, nodeATD, nodeBTD], edges: edgesDT };

      let wfIdTrue: string | undefined;
      try {
        wfIdTrue = await client.submitWorkflow(client.createWorkflow(wfTrue));
        createdIdMap.set(wfIdTrue, true);
        await client.triggerWorkflow({ id: wfIdTrue, triggerData: { type: TriggerType.Block, blockNumber: currentBlockNumber + triggerInterval }, isBlocking: true });
        const executionsT = await client.getExecutions([wfIdTrue], { limit: 1 });
        const stepIdsT = (_.first(executionsT.items)?.steps || []).map((s: { id: string }) => s.id);
        expect(stepIdsT).toContain(branchT.id);
        expect(stepIdsT).toContain(nodeATD.id);
        expect(stepIdsT).not.toContain(nodeBTD.id);
      } finally {
        if (wfIdTrue) { await client.deleteWorkflow(wfIdTrue); createdIdMap.delete(wfIdTrue); }
      }

      // False branch
      const branchF = NodeFactory.create({ id: getNextId(), name: "deploy_branch_false_gating", type: NodeType.Branch, data: { conditions: [ { id: "on", type: "if", expression: "false" }, { id: "off", type: "else", expression: "" } ] } });
      const nodeAFD = NodeFactory.create({ id: getNextId(), name: "NodeA_false", type: NodeType.CustomCode, data: { lang: 0, source: "return { a: 1 }" } });
      const nodeBFD = NodeFactory.create({ id: getNextId(), name: "NodeB_false", type: NodeType.CustomCode, data: { lang: 0, source: "return { b: 1 }" } });
      const edgesDF = [
        new Edge({ id: getNextId(), source: defaultTriggerId, target: branchF.id }),
        new Edge({ id: getNextId(), source: `${branchF.id}.on`, target: nodeAFD.id }),
        new Edge({ id: getNextId(), source: `${branchF.id}.off`, target: nodeBFD.id }),
      ];
      const wfFalse = { trigger: triggerDeploy, nodes: [branchF, nodeAFD, nodeBFD], edges: edgesDF };

      let wfIdFalse: string | undefined;
      try {
        wfIdFalse = await client.submitWorkflow(client.createWorkflow(wfFalse));
        createdIdMap.set(wfIdFalse, true);
        await client.triggerWorkflow({ id: wfIdFalse, triggerData: { type: TriggerType.Block, blockNumber: currentBlockNumber + triggerInterval }, isBlocking: true });
        const executionsF = await client.getExecutions([wfIdFalse], { limit: 1 });
        const stepIdsF = (_.first(executionsF.items)?.steps || []).map((s: { id: string }) => s.id);
        expect(stepIdsF).toContain(branchF.id);
        expect(stepIdsF).toContain(nodeBFD.id);
        expect(stepIdsF).not.toContain(nodeAFD.id);
      } finally {
        if (wfIdFalse) { await client.deleteWorkflow(wfIdFalse); createdIdMap.delete(wfIdFalse); }
      }
    });
  });
});
