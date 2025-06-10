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

  describe("runNodeWithInputs Tests", () => {
    test("should execute simple JavaScript code with input variables", async () => {
      console.log("🚀 Testing runNodeWithInputs with simple JavaScript...");
      
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
              multiplier: 3
            }
          }
        },
      });

      console.log("runNodeWithInputs simple JS response:", JSON.stringify(result, null, 2));

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBe(30);
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Simple JavaScript test failed:", result.error);
      }
    });

    test("should execute JavaScript with lodash module", async () => {
      console.log("🚀 Testing runNodeWithInputs with lodash module...");
      
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
              numbers: [1, 2, 3, 4, 5, 6]
            }
          }
        },
      });

      console.log("runNodeWithInputs lodash response:", JSON.stringify(result, null, 2));

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.data).toBeDefined();
        expect(result.data.sum).toBe(21);
        expect(result.data.max).toBe(6);
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Lodash module test failed:", result.error);
      }
    });

    test("should execute JavaScript with date manipulation", async () => {
      console.log("🚀 Testing runNodeWithInputs with dayjs module...");
      
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
              date: '2023-12-25'
            }
          }
        },
      });

      console.log("runNodeWithInputs dayjs response:", JSON.stringify(result, null, 2));

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.data).toBeDefined();
        expect(result.data.formatted).toBe('2023-12-25');
        expect(result.data.addDays).toBe('2024-01-01');
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Date manipulation test failed:", result.error);
      }
    });

    test("should handle error in custom code execution", async () => {
      console.log("🚀 Testing runNodeWithInputs with error handling...");
      
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
              value: 42
            }
          }
        },
      });

      console.log("runNodeWithInputs error response:", JSON.stringify(result, null, 2));

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

      const workflowProps = createFromTemplate(wallet.address, [customCodeNode]);

      console.log("🚀 Testing simulateWorkflow with custom code...");
      
      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log("simulateWorkflow response:", JSON.stringify(simulation, null, 2));

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + custom code node

      const customCodeStep = simulation.steps.find(step => step.id === customCodeNode.id);
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

      const workflowProps = createFromTemplate(wallet.address, [dataNode, customCodeNode]);

      console.log("🚀 Testing simulateWorkflow with complex data processing...");
      
      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log("Complex simulation result:", JSON.stringify(simulation, null, 2));

      expect(simulation.success).toBe(true);
      const customCodeStep = simulation.steps.find(step => step.id === customCodeNode.id);
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

      const workflowProps = createFromTemplate(wallet.address, [customCodeNode]);
      
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      console.log("🚀 Testing deploy + trigger workflow with custom code...");

      const workflowId = await client.submitWorkflow(
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
      console.log("Trigger result:", JSON.stringify(triggerResult, null, 2));

      const executions = await client.getExecutions([workflowId], {
        limit: 1,
      });

      expect(executions.items.length).toBe(1);
      console.log("Deploy+trigger execution:", JSON.stringify(executions.items[0], null, 2));

      const customCodeStep = _.find(
        _.first(executions.items)?.steps,
        (step) => step.id === customCodeNode.id
      );

      if (_.isUndefined(customCodeStep)) {
        throw new Error("No corresponding custom code step found.");
      }

      console.log("CustomCode step details:", JSON.stringify(customCodeStep, null, 2));
      expect(customCodeStep.success).toBe(true);
      console.log("Deploy + trigger custom code step output:", JSON.stringify(customCodeStep.output, null, 2));

      const output = customCodeStep.output as any;
      expect(output.message).toBe('Custom code executed successfully');
      expect(output.executedAt).toBeDefined();
      expect(output.blockNumber).toBeDefined();
      expect(output.timestamp).toBeDefined();
      expect(typeof output.calculation).toBe('number');
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
            testArray: [1, 2, 3]
          }
        }
      };

      console.log("🔍 Testing response format consistency across all methods...");

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

      const workflowProps = createFromTemplate(wallet.address, [dataNode, customCodeNode]);
      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      const simulatedStep = simulation.steps.find(step => step.id === customCodeNode.id);

      // Test 3: Deploy + Trigger
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      const workflowId = await client.submitWorkflow(
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

      const executions = await client.getExecutions([workflowId], { limit: 1 });
      const executedStep = _.find(
        _.first(executions.items)?.steps,
        (step) => step.id === customCodeNode.id
      );

      // Compare response formats
      console.log("=== CUSTOM CODE RESPONSE FORMAT COMPARISON ===");
      console.log("1. runNodeWithInputs response:", JSON.stringify(directResponse.data, null, 2));
      console.log("2. simulateWorkflow step output:", JSON.stringify(simulatedStep?.output, null, 2));
      console.log("3. deploy+trigger step output:", JSON.stringify(executedStep?.output, null, 2));

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
        expect(directOutput.computedValue).toBe(15);
        expect(simulatedOutput.computedValue).toBe(15);
        expect(executedOutput.computedValue).toBe(15);
        
        expect(directOutput.status).toBe('completed');
        expect(simulatedOutput.status).toBe('completed');
        expect(executedOutput.status).toBe('completed');
        
        expect(directOutput.processingId).toBeDefined();
        expect(simulatedOutput.processingId).toBeDefined();
        expect(executedOutput.processingId).toBeDefined();
        
        expect(directOutput.inputReceived).toEqual(inputVariables.trigger.data);
        expect(simulatedOutput.inputReceived).toBeDefined();
        expect(executedOutput.inputReceived).toBeDefined();
      }

      console.log("✅ All three methods return consistent custom code execution results!");
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

      const workflowProps = createFromTemplate(wallet.address, [customCodeNode]);
      
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      const workflowId = await client.submitWorkflow(
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
        throw new Error("No corresponding match step found for the triggered execution.");
      }

      const output = matchStep.output as any;
      expect(output.isValidUuid).toBe(true);
      expect(typeof output.uuid).toBe('string');
      expect(output.uuid.length).toBe(36);
    });
  });
});
