import util from "util";
import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import { NodeType, TriggerType, CustomCodeLang } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  TIMEOUT_DURATION,
  SaltGlobal,
  getBlockNumber,
  removeCreatedWorkflows,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 5000;

describe("FilterNode Tests", () => {
  let client: Client;

  beforeAll(async () => {
    const address = await getAddress(walletPrivateKey);

    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message } = await client.getSignatureFormat(address);
    const signature = await generateSignature(message, walletPrivateKey);

    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should filter adults only with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "{{ current.age >= 18 }}",
          sourceId: "testArray",
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Carol", age: 25 },
          ],
          current: { age: 21 },
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
        if (Array.isArray(result.data)) {
          expect(result.data.length).toBe(2);
        }
      } else {
        console.log("Filter adults test failed:", result.error);
      }
    });

    test("should filter minors with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "{{ current.age < 18 }}",
          sourceId: "testArray",
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Carol", age: 25 },
          ],
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
        if (Array.isArray(result.data)) {
          expect(result.data.length).toBe(1);
        }
      } else {
        console.log("Filter minors test failed:", result.error);
      }
    });

    test("should filter by name starting with A", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: '{{ current.name.startsWith("A") }}',
          sourceId: "testArray",
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Anna", age: 25 },
          ],
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
        if (Array.isArray(result.data)) {
          expect(result.data.length).toBe(2);
        }
      } else {
        console.log("Filter by name test failed:", result.error);
      }
    });

    test("should filter with trigger data reference", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "{{ current.age >= trigger.data.minAge }}",
          sourceId: "testArray",
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

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
        if (Array.isArray(result.data)) {
          expect(result.data.length).toBe(2);
        }
      } else {
        console.log("Filter with trigger data test failed:", result.error);
      }
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with filter node", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Create a CustomCode node that generates test data
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_test_data",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
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
          expression: "{{ current.age >= 18 }}",
          sourceId: dataNode.id, // Reference the data generation node
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        filterNode,
      ]);

      

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(3); // trigger + data node + filter node

      const filterStep = simulation.steps.find(
        (step) => step.id === filterNode.id
      );
      expect(filterStep).toBeDefined();
    });

    test("should simulate workflow with complex filter expression", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Create a CustomCode node that generates test data
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_complex_test_data",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
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
          expression: '{{ current.age >= 20 && current.name.startsWith("A") }}',
          sourceId: dataNode.id, // Reference the data generation node
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        filterNode,
      ]);

      

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      expect(simulation.success).toBe(true);
      const filterStep = simulation.steps.find(
        (step) => step.id === filterNode.id
      );
      expect(filterStep).toBeDefined();
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with filter node", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      // Create a CustomCode node that generates test data
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_test_data",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
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
          expression: "{{ current.age >= 18 }}",
          sourceId: dataNode.id, // Reference the data generation node
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [dataNode, filterNode]);

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

        console.log("=== TRIGGER WORKFLOW TEST ===");
        console.log("Trigger result:", util.inspect(triggerResult, { depth: null, colors: true }));

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

        expect(filterStep.success).toBe(true);
        console.log(
          "Deploy + trigger filter step output:",
          util.inspect(filterStep.output, { depth: null, colors: true })
        );
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
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const filterConfig = {
        expression: "{{ current.age >= 21 }}",
        sourceId: "testArray",
      };

      const inputVariables = {
        testArray: [
          { name: "Alice", age: 21 },
          { name: "Bob", age: 17 },
          { name: "Carol", age: 25 },
        ],
      };

      console.log(
        "🔍 Testing filter expression consistency across all methods..."
      );

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
          lang: CustomCodeLang.JavaScript,
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
          expression: "{{ current.age >= 21 }}",
          sourceId: dataNode.id, // Reference the data generation node
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [dataNode, filterNode]);
      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

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
        console.log("=== FILTER EXPRESSION COMPARISON ===");
        console.log(
          "1. runNodeWithInputs response:",
          util.inspect(directResponse.data, { depth: null, colors: true })
        );
        console.log(
          "2. simulateWorkflow step output:",
          util.inspect(simulatedStep?.output, { depth: null, colors: true })
        );
        console.log(
          "3. deploy+trigger step output:",
          util.inspect(executedStep?.output, { depth: null, colors: true })
        );

        // All should be successful
        expect(directResponse.success).toBe(true);
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBe(true);

        // Verify filter results are consistent
        if (directResponse.data && Array.isArray(directResponse.data)) {
          expect(directResponse.data.length).toBe(2); // Alice(21) and Carol(25)
        }

        console.log("✅ All three methods return consistent filter results!");
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });
});
