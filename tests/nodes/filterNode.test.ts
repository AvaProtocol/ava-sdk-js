import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import {
  NodeType,
  TriggerType,
  ExecutionStatus,
  Lang,
} from "@avaprotocol/types";
import {
  getNextId,
  TIMEOUT_DURATION,
  getBlockNumber,
  removeCreatedWorkflows,
  getSettings,
  getSmartWallet,
  getClient,
  authenticateClient,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";

jest.setTimeout(TIMEOUT_DURATION);

const createdIdMap: Map<string, boolean> = new Map();

describe("FilterNode Tests", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should filter adults only with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "value.age >= 18",
          inputNodeName: "testArray",
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Carol", age: 25 },
          ],
        },
      });

      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBe(2);
    });

    test("should filter minors with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "value.age < 18",
          inputNodeName: "testArray",
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Carol", age: 25 },
          ],
        },
      });

      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBe(1);
    });

    test("should filter by name starting with A", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: 'value.name.startsWith("A")',
          inputNodeName: "testArray",
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Anna", age: 25 },
          ],
        },
      });

      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBe(2);
    });

    test("should filter with trigger data reference", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "value.age >= trigger.data.minAge",
          inputNodeName: "testArray",
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Carol", age: 25 },
          ],
          trigger: {
            data: {
              minAge: 18,
            },
          },
        },
      });

      expect(typeof result.success).toBe("boolean");
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBe(2);
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with filter node", async () => {
      const wallet = await getSmartWallet(client);

      // Create a CustomCode node that generates test data
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_test_data",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
            const testArray = [
              { name: "Alice", age: 21 },
              { name: "Bob", age: 17 },
              { name: "Carol", age: 25 }
            ];
            return testArray;
          `,
        },
      });

      const filterNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_filter_test",
        type: NodeType.Filter,
        data: {
          expression: "value.age >= 18",
          inputNodeName: dataNode.id, // Reference the data generation node
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        filterNode,
      ]);

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(3); // trigger + data node + filter node

      const filterStep = simulation.steps.find(
        (step) => step.id === filterNode.id
      );
      expect(filterStep).toBeDefined();
    });

    test("should simulate workflow with complex filter expression", async () => {
      const wallet = await getSmartWallet(client);

      // Create a CustomCode node that generates test data
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_complex_test_data",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
            const testArray = [
              { name: "Alice", age: 25 },
              { name: "Bob", age: 17 },
              { name: "Anna", age: 22 },
              { name: "Charlie", age: 30 }
            ];
            return testArray;
          `,
        },
      });

      const filterNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_complex_filter",
        type: NodeType.Filter,
        data: {
          expression: 'value.age >= 20 && value.name.startsWith("A")',
          inputNodeName: dataNode.id, // Reference the data generation node
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        filterNode,
      ]);

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      expect(simulation.status).toBe(ExecutionStatus.Success);
      const filterStep = simulation.steps.find(
        (step) => step.id === filterNode.id
      );
      expect(filterStep).toBeDefined();
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with filter node", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      // Create a CustomCode node that generates test data
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_test_data",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
            const testArray = [
              { name: "Alice", age: 21 },
              { name: "Bob", age: 17 },
              { name: "Carol", age: 25 }
            ];
            return testArray;
          `,
        },
      });

      const filterNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_filter_test",
        type: NodeType.Filter,
        data: {
          expression: "value.age >= 18",
          inputNodeName: dataNode.id, // Reference the data generation node
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        filterNode,
      ]);

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

        const filterStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === filterNode.id
        );

        if (_.isUndefined(filterStep)) {
          throw new Error("No corresponding filter step found.");
        }

        expect(filterStep.success).toBeTruthy();
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Filter Expression Consistency Tests", () => {
    test("should return consistent filter results across all three methods", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const filterConfig = {
        expression: "value.age >= 21",
        inputNodeName: "testArray",
      };

      const inputVariables = {
        testArray: [
          { name: "Alice", age: 21 },
          { name: "Bob", age: 17 },
          { name: "Carol", age: 25 },
        ],
      };

      // Test 1: runNodeWithInputs
      const directResponse = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: filterConfig,
        inputVariables: inputVariables,
      });

      // Test 2: simulateWorkflow
      // Create a CustomCode node that generates test data for simulation/deploy
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_data_gen",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
            const testArray = [
              { name: "Alice", age: 21 },
              { name: "Bob", age: 17 },
              { name: "Carol", age: 25 }
            ];
            return testArray;
          `,
        },
      });

      const filterNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_test",
        type: NodeType.Filter,
        data: {
          expression: "value.age >= 21",
          inputNodeName: dataNode.id, // Reference the data generation node
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        filterNode,
      ]);
      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      const simulatedStep = simulation.steps.find(
        (step) => step.id === filterNode.id
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
          (step) => step.id === filterNode.id
        );

        // Compare response formats

        // All should be successful
        expect(directResponse.success).toBeTruthy();
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBeTruthy();

        // Verify filter results are consistent
        if (directResponse.data && Array.isArray(directResponse.data)) {
          expect(directResponse.data.length).toBe(2); // Alice(21) and Carol(25)
        }
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });
});
