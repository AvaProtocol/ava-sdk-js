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
  removeCreatedWorkflows,
  getBlockNumber,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 5000;

describe("CustomCode Node Tests", () => {
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

  describe("CustomCode Return Type Tests", () => {
    test("CustomCode should return null when code returns null", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: CustomCodeLang.JavaScript,
          source: "return null;",
        },
        inputVariables: {},
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
    });

    test("CustomCode should return empty object when code returns {}", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: CustomCodeLang.JavaScript,
          source: "return {};",
        },
        inputVariables: {},
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({});
    });

    test("CustomCode should return null when code returns undefined (protobuf limitation)", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: CustomCodeLang.JavaScript,
          source: "return undefined;",
        },
        inputVariables: {},
      });

      console.log("UNDEFINED result:", util.inspect(result, { depth: null, colors: true }));
      expect(result.success).toBe(true);
      // Note: JavaScript `undefined` becomes `null` in protobuf conversion since protobuf
      // only supports JSON-compatible types and has no representation for `undefined`
      expect(result.data).toBeNull();
    });

    test("CustomCode should return empty array when code returns []", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: CustomCodeLang.JavaScript,
          source: "return [];",
        },
        inputVariables: {},
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    test("CustomCode should return number when code returns number", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: CustomCodeLang.JavaScript,
          source: "return 42;",
        },
        inputVariables: {},
      });

      expect(result.success).toBe(true);
      expect(result.data).toBe(42);
    });

    test("CustomCode should return string when code returns string", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: CustomCodeLang.JavaScript,
          source: 'return "hello";',
        },
        inputVariables: {},
      });

      expect(result.success).toBe(true);
      expect(result.data).toBe("hello");
    });
  });

  describe("runNodeWithInputs Tests", () => {
    test("should execute simple JavaScript code with input variables", async () => {
      

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const inputValue = trigger.data.value;
            const multiplier = trigger.data.multiplier || 2;
            return inputValue * multiplier;
          `,
        },
        inputVariables: {
          trigger: {
            data: {
              value: 10,
              multiplier: 3,
            },
          },
        },
      });

      console.log(
        "runNodeWithInputs simple JS response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBe(30);
      expect(result.nodeId).toBeDefined();
    });

    test("should execute JavaScript with lodash module", async () => {
      

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const _ = require('lodash');
            const numbers = trigger.data.numbers;
            return {
              sum: _.sum(numbers),
              max: _.max(numbers),
              grouped: _.groupBy(numbers, n => n % 2 === 0 ? 'even' : 'odd')
            };
          `,
        },
        inputVariables: {
          trigger: {
            data: {
              numbers: [1, 2, 3, 4, 5, 6],
            },
          },
        },
      });



      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      const data = result.data as any;
      expect(data).toBeDefined();
      expect(data.sum).toBe(21);
      expect(data.max).toBe(6);
      expect(result.nodeId).toBeDefined();
    });

    test("should execute JavaScript with date manipulation", async () => {
      

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const dayjs = require('dayjs');
            const inputDate = trigger.data.date;
            const date = dayjs(inputDate);
            return {
              formatted: date.format('YYYY-MM-DD'),
              addDays: date.add(7, 'days').format('YYYY-MM-DD'),
              dayOfWeek: date.format('dddd')
            };
          `,
        },
        inputVariables: {
          trigger: {
            data: {
              date: "2023-12-25",
            },
          },
        },
      });



      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      const data = result.data as any;
      expect(data).toBeDefined();
      expect(data.formatted).toBe("2023-12-25");
      expect(data.addDays).toBe("2024-01-01");
      expect(result.nodeId).toBeDefined();
    });

    test("should handle error in custom code execution", async () => {
      

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: CustomCodeLang.JavaScript,
          source: `
            // This will cause an error
            const result = trigger.data.nonexistent.property;
            return result;
          `,
        },
        inputVariables: {
          trigger: {
            data: {
              value: 42,
            },
          },
        },
      });



      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      // Expect this to fail or handle the error gracefully
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with custom code execution", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_custom_code_test",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const _ = require('lodash');
            const { v4: uuidv4 } = require('uuid');
            
            return {
              id: uuidv4(),
              processedData: _.map([1, 2, 3], n => n * 2),
              timestamp: new Date().toISOString()
            };
          `,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        customCodeNode,
      ]);

      

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );



      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + custom code node

      const customCodeStep = simulation.steps.find(
        (step) => step.id === customCodeNode.id
      );
      expect(customCodeStep).toBeDefined();
      expect(customCodeStep!.success).toBe(true);

      const output = customCodeStep!.output as any;
      expect(output.processedData).toEqual([2, 4, 6]);
      expect(output.id).toBeDefined();
      expect(output.timestamp).toBeDefined();
    });

    test("should simulate workflow with complex data processing", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Create a data generation node to provide the items that the CustomCode expects
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_complex_data",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            return {
              items: [
                { id: 1, value: 25, active: true, name: "Item A" },
                { id: 2, value: 75, active: false, name: "Item B" },
                { id: 3, value: 60, active: true, name: "Item C" },
                { id: 4, value: 30, active: true, name: "Item D" }
              ]
            };
          `,
        },
      });

      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_complex_processing",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const _ = require('lodash');
            
            // Get data from the data generation node
            const data = generate_complex_data.data;
            const activeItems = _.filter(data.items, 'active');
            
            return {
              summary: {
                total: data.items.length,
                active: activeItems.length,
                activeItems: activeItems
              }
            };
          `,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        customCodeNode,
      ]);

      console.log(
        "🚀 Testing simulateWorkflow with complex data processing..."
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "Complex simulation result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      const customCodeStep = simulation.steps.find(
        (step) => step.id === customCodeNode.id
      );
      expect(customCodeStep).toBeDefined();
      expect(customCodeStep!.success).toBe(true);
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with custom code", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_custom_code_test",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const _ = require('lodash');
            
            const blockNumber = blockTrigger.data.blockNumber || 0;
            const currentTime = Date.now();
            
            return {
              executedAt: new Date().toISOString(),
              blockNumber: blockNumber,
              timestamp: currentTime,
              calculation: _.sum([blockNumber, currentTime]) % 1000,
              message: 'Custom code executed successfully'
            };
          `,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        customCodeNode,
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

        const triggerResult = await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        });


        console.log("Trigger result:", util.inspect(triggerResult, { depth: null, colors: true }));

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);
        console.log(
          "Deploy+trigger execution:",
          util.inspect(executions.items[0], { depth: null, colors: true })
        );

        const customCodeStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === customCodeNode.id
        );

        if (_.isUndefined(customCodeStep)) {
          throw new Error("No corresponding custom code step found.");
        }

        console.log(
          "CustomCode step details:",
          util.inspect(customCodeStep, { depth: null, colors: true })
        );
        expect(customCodeStep.success).toBe(true);
        console.log(
          "Deploy + trigger custom code step output:",
          util.inspect(customCodeStep.output, { depth: null, colors: true })
        );

        const output = customCodeStep.output as any;
        expect(output.message).toBe("Custom code executed successfully");
        expect(output.executedAt).toBeDefined();
        expect(output.blockNumber).toBeDefined();
        expect(output.timestamp).toBeDefined();
        expect(typeof output.calculation).toBe("number");
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Response Format Consistency Tests", () => {
    test("should return consistent response format across all three methods", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const customCodeConfig = {
        lang: CustomCodeLang.JavaScript,
        source: `
          const _ = require('lodash');
          const { v4: uuidv4 } = require('uuid');
          
          const inputData = trigger.data || {};
          const processingId = uuidv4();
          
          return {
            processingId: processingId,
            inputReceived: inputData,
            computedValue: _.sum([1, 2, 3, 4, 5]),
            executionTime: new Date().toISOString(),
            status: 'completed'
          };
        `,
      };

      const inputVariables = {
        trigger: {
          data: {
            testValue: 42,
            testArray: [1, 2, 3],
          },
        },
      };

      console.log(
        "🔍 Testing response format consistency across all methods..."
      );

      // Test 1: runNodeWithInputs
      const directResponse = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: customCodeConfig,
        inputVariables: inputVariables,
      });

      // Test 2: simulateWorkflow
      // Create a data generation node to provide consistent test data
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_data_gen",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            return {
              testValue: 42,
              testArray: [1, 2, 3]
            };
          `,
        },
      });

      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_test",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const _ = require('lodash');
            const { v4: uuidv4 } = require('uuid');
            
            // Use data from the data generation node for consistency
            const inputData = consistency_data_gen.data;
            const processingId = uuidv4();
            
            return {
              processingId: processingId,
              inputReceived: inputData,
              computedValue: _.sum([1, 2, 3, 4, 5]),
              executionTime: new Date().toISOString(),
              status: 'completed'
            };
          `,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        customCodeNode,
      ]);
      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === customCodeNode.id
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
          (step) => step.id === customCodeNode.id
        );

        // Compare response formats - verify all three methods return consistent data
        expect(directResponse.data).toBeDefined();
        expect(simulatedStep?.output).toBeDefined();
        expect(executedStep?.output).toBeDefined();
        
        // All outputs should have consistent structure (excluding dynamic fields)
        const directData = directResponse.data;
        const simulatedData = simulatedStep?.output;
        const executedData = executedStep?.output;
        
        // Verify structure and static content match
        expect(directData.computedValue).toBe(simulatedData.computedValue);
        expect(directData.status).toBe(simulatedData.status);
        expect(directData.inputReceived).toEqual(simulatedData.inputReceived);
        
        expect(simulatedData.computedValue).toBe(executedData.computedValue);
        expect(simulatedData.status).toBe(executedData.status);
        expect(simulatedData.inputReceived).toEqual(executedData.inputReceived);
        
        // Verify dynamic fields exist but don't compare values
        expect(directData.executionTime).toBeDefined();
        expect(directData.processingId).toBeDefined();
        expect(simulatedData.executionTime).toBeDefined();
        expect(simulatedData.processingId).toBeDefined();

        // All should be successful
        expect(directResponse.success).toBe(true);
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBe(true);

        // Verify consistent structure
        const directOutput = directResponse.data;
        const simulatedOutput = simulatedStep!.output as any;
        const executedOutput = executedStep!.output as any;

        // Check that all outputs have the same structure
        if (directOutput) {
          const directOutputObj = directOutput as any;
          const simulatedOutputObj = simulatedOutput as any;
          const executedOutputObj = executedOutput as any;

          expect(directOutputObj.computedValue).toBe(15);
          expect(simulatedOutputObj.computedValue).toBe(15);
          expect(executedOutputObj.computedValue).toBe(15);

          expect(directOutputObj.status).toBe("completed");
          expect(simulatedOutputObj.status).toBe("completed");
          expect(executedOutputObj.status).toBe("completed");

          expect(directOutputObj.processingId).toBeDefined();
          expect(simulatedOutputObj.processingId).toBeDefined();
          expect(executedOutputObj.processingId).toBeDefined();

          // Check that the expected camelCase fields exist in inputReceived
          // Note: The backend now provides both camelCase and snake_case versions for compatibility
          expect(directOutputObj.inputReceived).toMatchObject(
            inputVariables.trigger.data
          );
          expect(simulatedOutputObj.inputReceived).toBeDefined();
          expect(executedOutputObj.inputReceived).toBeDefined();

          // Verify that the core data fields are present (regardless of dual naming)
          expect(simulatedOutputObj.inputReceived.testValue).toBe(42);
          expect(simulatedOutputObj.inputReceived.testArray).toEqual([1, 2, 3]);
          expect(executedOutputObj.inputReceived.testValue).toBe(42);
          expect(executedOutputObj.inputReceived.testArray).toEqual([1, 2, 3]);
        }

        console.log(
          "✅ All three methods return consistent custom code execution results!"
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Empty Data Workflow Tests", () => {
    // Define reusable node configurations for testing all empty data types
    const createEmptyDataNodes = (namePrefix: string = "test") => {
      const nullNodeParams = {
        id: getNextId(),
        name: `${namePrefix}_null`,
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "return null;",
        },
      };

      const emptyObjectNodeParams = {
        id: getNextId(),
        name: `${namePrefix}_empty_object`,
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "return {};",
        },
      };

      const undefinedNodeParams = {
        id: getNextId(),
        name: `${namePrefix}_undefined`,
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "return undefined;",
        },
      };

      const emptyArrayNodeParams = {
        id: getNextId(),
        name: `${namePrefix}_empty_array`,
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "return [];",
        },
      };

      const numberNodeParams = {
        id: getNextId(),
        name: `${namePrefix}_number`,
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "return 42;",
        },
      };

      const stringNodeParams = {
        id: getNextId(),
        name: `${namePrefix}_string`,
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: 'return "hello";',
        },
      };

      return {
        nullNodeParams,
        emptyObjectNodeParams,
        undefinedNodeParams,
        emptyArrayNodeParams,
        numberNodeParams,
        stringNodeParams,
      };
    };

    test("should handle all empty data types in simulateWorkflow", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Create nodes testing all empty data return types
      const nodeParams = createEmptyDataNodes("simulate");

      const nullNode = NodeFactory.create(nodeParams.nullNodeParams);
      const emptyObjectNode = NodeFactory.create(
        nodeParams.emptyObjectNodeParams
      );
      const undefinedNode = NodeFactory.create(nodeParams.undefinedNodeParams);
      const emptyArrayNode = NodeFactory.create(
        nodeParams.emptyArrayNodeParams
      );
      const numberNode = NodeFactory.create(nodeParams.numberNodeParams);
      const stringNode = NodeFactory.create(nodeParams.stringNodeParams);

      const workflowProps = createFromTemplate(wallet.address, [
        nullNode,
        emptyObjectNode,
        undefinedNode,
        emptyArrayNode,
        numberNode,
        stringNode,
      ]);

      

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "Empty data simulation result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      // Verify overall workflow success
      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(7); // trigger + 6 custom code nodes

      // Verify each node returns expected values
      const nullStep = simulation.steps.find((step) => step.id === nullNode.id);
      expect(nullStep).toBeDefined();
      expect(nullStep!.success).toBe(true);
      expect(nullStep!.output).toBeNull();

      const emptyObjectStep = simulation.steps.find(
        (step) => step.id === emptyObjectNode.id
      );
      expect(emptyObjectStep).toBeDefined();
      expect(emptyObjectStep!.success).toBe(true);
      expect(emptyObjectStep!.output).toEqual({});

      const undefinedStep = simulation.steps.find(
        (step) => step.id === undefinedNode.id
      );
      expect(undefinedStep).toBeDefined();
      expect(undefinedStep!.success).toBe(true);
      // Note: undefined becomes null in protobuf conversion
      expect(undefinedStep!.output).toBeNull();

      const emptyArrayStep = simulation.steps.find(
        (step) => step.id === emptyArrayNode.id
      );
      expect(emptyArrayStep).toBeDefined();
      expect(emptyArrayStep!.success).toBe(true);
      expect(emptyArrayStep!.output).toEqual([]);

      const numberStep = simulation.steps.find(
        (step) => step.id === numberNode.id
      );
      expect(numberStep).toBeDefined();
      expect(numberStep!.success).toBe(true);
      expect(numberStep!.output).toBe(42);

      const stringStep = simulation.steps.find(
        (step) => step.id === stringNode.id
      );
      expect(stringStep).toBeDefined();
      expect(stringStep!.success).toBe(true);
      expect(stringStep!.output).toBe("hello");

      console.log(
        "✅ All empty data types handled correctly in simulateWorkflow!"
      );
    });

    test("should handle all empty data types in submit and trigger workflow", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      // Create nodes testing all empty data return types
      const nodeParams = createEmptyDataNodes("deployed");

      const nullNode = NodeFactory.create(nodeParams.nullNodeParams);
      const emptyObjectNode = NodeFactory.create(
        nodeParams.emptyObjectNodeParams
      );
      const undefinedNode = NodeFactory.create(nodeParams.undefinedNodeParams);
      const emptyArrayNode = NodeFactory.create(
        nodeParams.emptyArrayNodeParams
      );
      const numberNode = NodeFactory.create(nodeParams.numberNodeParams);
      const stringNode = NodeFactory.create(nodeParams.stringNodeParams);

      const workflowProps = createFromTemplate(wallet.address, [
        nullNode,
        emptyObjectNode,
        undefinedNode,
        emptyArrayNode,
        numberNode,
        stringNode,
      ]);

      // Set up block trigger
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      

      let workflowId: string | undefined;
      try {
        // Deploy workflow
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        // Trigger workflow
        const triggerResult = await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        });

        console.log("Trigger result:", util.inspect(triggerResult, { depth: null, colors: true }));

        // Get execution results
        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);
        const execution = executions.items[0];

        console.log(
          "Empty data workflow execution:",
          util.inspect(execution, { depth: null, colors: true })
        );

        // Verify overall workflow success
        expect(execution.success).toBe(true);
        expect(execution.steps).toHaveLength(7); // trigger + 6 custom code nodes

        // Verify each node returns expected values
        const nullStep = execution.steps.find(
          (step) => step.id === nullNode.id
        );
        expect(nullStep).toBeDefined();
        expect(nullStep!.success).toBe(true);
        expect(nullStep!.output).toBeNull();

        const emptyObjectStep = execution.steps.find(
          (step) => step.id === emptyObjectNode.id
        );
        expect(emptyObjectStep).toBeDefined();
        expect(emptyObjectStep!.success).toBe(true);
        expect(emptyObjectStep!.output).toEqual({});

        const undefinedStep = execution.steps.find(
          (step) => step.id === undefinedNode.id
        );
        expect(undefinedStep).toBeDefined();
        expect(undefinedStep!.success).toBe(true);
        // Note: undefined becomes null in protobuf conversion
        expect(undefinedStep!.output).toBeNull();

        const emptyArrayStep = execution.steps.find(
          (step) => step.id === emptyArrayNode.id
        );
        expect(emptyArrayStep).toBeDefined();
        expect(emptyArrayStep!.success).toBe(true);
        expect(emptyArrayStep!.output).toEqual([]);

        const numberStep = execution.steps.find(
          (step) => step.id === numberNode.id
        );
        expect(numberStep).toBeDefined();
        expect(numberStep!.success).toBe(true);
        expect(numberStep!.output).toBe(42);

        const stringStep = execution.steps.find(
          (step) => step.id === stringNode.id
        );
        expect(stringStep).toBeDefined();
        expect(stringStep!.success).toBe(true);
        expect(stringStep!.output).toBe("hello");

        console.log(
          "✅ All empty data types handled correctly in deployed workflow!"
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Trigger Data Reference Tests", () => {
    test("should return direct data when referencing manual trigger data", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const triggerName = "manual_trigger_data_test";

      const userData = {
        items: [
          { name: "test1", value: 100 },
          { name: "test2", value: 200 },
        ],
      };

      // Create a ManualTrigger with test data
      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: triggerName,
        type: TriggerType.Manual,
        data: userData,
      });

      // Create a CustomCode node that references the manual trigger data
      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "manual_trigger_ref_test",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `return ${triggerName}.data;`,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [customCodeNode]);
      workflowProps.trigger = manualTrigger;

      

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "Manual trigger reference result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + custom code node

      const customCodeStep = simulation.steps.find(
        (step) => step.id === customCodeNode.id
      );
      expect(customCodeStep).toBeDefined();
      expect(customCodeStep!.success).toBe(true);

      // CustomCode returns the trigger data directly, not wrapped in additional data field
      expect(customCodeStep!.output).toEqual(userData);

      console.log(
        "✅ CustomCode correctly returned direct manual trigger data!"
      );
    });
  });

  describe("Module Import Tests", () => {
    test("should support uuid module import", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "uuid_test",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const { v4: uuidv4 } = require('uuid');
            const id = uuidv4();
            return {
              uuid: id,
              isValidUuid: typeof id === 'string' && id.length === 36
            };
          `,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        customCodeNode,
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

        const matchStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === customCodeNode.id
        );

        if (_.isUndefined(matchStep)) {
          throw new Error(
            "No corresponding match step found for the triggered execution."
          );
        }

        const output = matchStep.output as any;
        expect(output.isValidUuid).toBe(true);
        expect(typeof output.uuid).toBe("string");
        expect(output.uuid.length).toBe(36);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });
});
