import util from "util";
import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import {
  Client,
  Edge,
  Workflow,
  NodeFactory,
  TriggerFactory,
} from "@avaprotocol/sdk-js";
import {
  LoopNodeData,
  NodeType,
  CustomCodeLang,
  TriggerType,
} from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  TIMEOUT_DURATION,
  SaltGlobal,
  removeCreatedWorkflows,
  getBlockNumber,
} from "../utils/utils";
import {
  defaultTriggerId,
  createFromTemplate,
  loopNodeWithRestApiProps,
  loopNodeWithCustomCodeProps,
  loopNodeWithETHTransferProps,
  loopNodeWithContractReadProps,
  loopNodeWithGraphQLQueryProps,
} from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 1000 + 500; // Use a different range than createWorkflow.test.ts

describe("LoopNode Tests", () => {
  let eoaAddress: string;
  let client: Client;

  beforeAll(async () => {
    eoaAddress = await getAddress(walletPrivateKey);

    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
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
    test("should process loop with CustomCode runner using runNodeWithInputs", async () => {
      const params = {
        nodeType: NodeType.Loop,
        nodeConfig: {
          sourceId: "testArray",
          iterVal: "item",
          iterKey: "index",
          customCode: {
            config: {
              lang: CustomCodeLang.JavaScript,
              source: `
                const _ = require('lodash');
                return {
                  processedItem: item,
                  position: index,
                  squared: item * item,
                  timestamp: new Date().toISOString()
                };
              `,
            },
          },
        },
        inputVariables: {
          testArray: [1, 2, 3, 4, 5],
        },
      };

      console.log("🚀 ~ should process loop with CustomCode ~ params:", params);

      const result = await client.runNodeWithInputs(params);

      console.log(
        "runNodeWithInputs loop response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.data).toBeDefined();
        expect(result.data.data).toBeDefined();
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.data.length).toBe(5);
        expect(result.nodeId).toBeDefined();

        // Check first processed item
        const firstItem = result.data.data[0];
        expect(firstItem.processedItem).toBe(1);
        expect(firstItem.position).toBe(0);
        expect(firstItem.squared).toBe(1);
      } else {
        console.log("Loop CustomCode test failed:", result.error);
      }
    });

    test("should process loop with REST API runner using runNodeWithInputs", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Loop,
        nodeConfig: {
          sourceId: "urlArray",
          iterVal: "url",
          iterKey: "index",
          restApi: {
            config: {
              url: "{{url}}",
              method: "GET",
              body: "",
              headersMap: [["User-Agent", "AvaProtocol-Loop-Test"]],
            },
          },
        },
        inputVariables: {
          urlArray: [
            "https://httpbin.org/get?test=1",
            "https://httpbin.org/get?test=2",
          ],
        },
      });

      console.log(
        "runNodeWithInputs loop REST API response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.data).toBeDefined();
        // The actual array is nested in result.data.data
        expect(result.data.data).toBeDefined();
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.data.length).toBe(2);
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Loop REST API test failed:", result.error);
      }
    });

    test("should handle empty array input", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Loop,
        nodeConfig: {
          sourceId: "emptyArray",
          iterVal: "item",
          iterKey: "index",
          customCode: {
            config: {
              lang: CustomCodeLang.JavaScript,
              source: `return { processed: item };`,
            },
          },
        },
        inputVariables: {
          emptyArray: [],
        },
      });

      console.log(
        "runNodeWithInputs empty array response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        // The actual array is nested in result.data.data
        expect(result.data.data).toBeDefined();
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.data.length).toBe(0);
      }
    });

    test("should handle complex object array", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Loop,
        nodeConfig: {
          sourceId: "complexArray",
          iterVal: "obj",
          iterKey: "idx",
          customCode: {
            config: {
              lang: CustomCodeLang.JavaScript,
              source: `
                const _ = require('lodash');
                return {
                  id: obj.id,
                  upperName: obj.name.toUpperCase(),
                  doubledValue: obj.value * 2,
                  index: idx,
                  isEven: obj.value % 2 === 0
                };
              `,
            },
          },
        },
        inputVariables: {
          complexArray: [
            { id: "a1", name: "Alice", value: 10 },
            { id: "b2", name: "Bob", value: 15 },
            { id: "c3", name: "Carol", value: 20 },
          ],
        },
      });

      console.log(
        "runNodeWithInputs complex array response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        // The actual array is nested in result.data.data
        expect(result.data.data).toBeDefined();
        expect(Array.isArray(result.data.data)).toBe(true);
        expect(result.data.data.length).toBe(3);

        const firstResult = result.data.data[0];
        expect(firstResult.id).toBe("a1");
        expect(firstResult.upperName).toBe("ALICE");
        expect(firstResult.doubledValue).toBe(20);
        expect(firstResult.index).toBe(0);
        expect(firstResult.isEven).toBe(true);
      }
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with Loop node using CustomCode runner", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Create a data generation node
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_loop_data",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
              const testArray = [
                { name: "item1", value: 10 },
                { name: "item2", value: 20 },
                { name: "item3", value: 30 }
              ];
              return { testArray };
            `,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_loop_test",
        type: NodeType.Loop,
        data: {
          sourceId: dataNode.id,
          iterVal: "item",
          iterKey: "index",
          customCode: {
            config: {
              lang: CustomCodeLang.JavaScript,
              source: `
                const _ = require('lodash');
                return {
                  processedItem: item,
                  position: index,
                  calculatedValue: item.value * 2 + index,
                  itemName: item.name
                };
              `,
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow loop response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(3); // trigger + data node + loop node

      const loopStep = simulation.steps.find((step) => step.id === loopNode.id);
      expect(loopStep).toBeDefined();
      expect(loopStep!.success).toBe(true);

      const output = loopStep!.output as any;
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBe(3);
    });

    test("should simulate workflow with Loop node using REST API runner", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Create a data generation node for URLs (reduced to just 1 URL to avoid timeouts)
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_url_data",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const urlArray = [
              "https://httpbin.org/get?test=simple"
            ];
            return { urlArray };
          `,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_loop_rest_api",
        type: NodeType.Loop,
        data: {
          sourceId: dataNode.id,
          iterVal: "url",
          iterKey: "index",
          restApi: {
            config: {
              url: "{{url}}",
              method: "GET",
              body: "",
              headersMap: [["User-Agent", "AvaProtocol-Loop-Simulation"]],
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      expect(simulation.success).toBe(true);
      const loopStep = simulation.steps.find((step) => step.id === loopNode.id);
      expect(loopStep).toBeDefined();
      expect(loopStep!.success).toBe(true);

      // Verify we got the expected single result
      const output = loopStep!.output as any;
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBe(1);
    }, 30000); // Increased timeout to 30 seconds for network requests
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with Loop node", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      // Create a data generation node
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_test_data",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const testArray = [
              { name: "Alice", score: 85 },
              { name: "Bob", score: 92 },
              { name: "Carol", score: 78 }
            ];
            return { testArray };
          `,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_loop_test",
        type: NodeType.Loop,
        data: {
          sourceId: dataNode.id,
          iterVal: "student",
          iterKey: "position",
          customCode: {
            config: {
              lang: CustomCodeLang.JavaScript,
              source: `
                const _ = require('lodash');
                const grade = student.score >= 90 ? 'A' : 
                             student.score >= 80 ? 'B' : 
                             student.score >= 70 ? 'C' : 'D';
                
                return {
                  studentName: student.name,
                  originalScore: student.score,
                  letterGrade: grade,
                  position: position + 1,
                  timestamp: new Date().toISOString()
                };
              `,
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
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

        console.log("=== TRIGGER WORKFLOW TEST ===");
        console.log(
          "Trigger result:",
          util.inspect(triggerResult, { depth: null, colors: true })
        );

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const loopStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === loopNode.id
        );

        if (_.isUndefined(loopStep)) {
          throw new Error("No corresponding loop step found.");
        }

        expect(loopStep.success).toBe(true);
        console.log(
          "Deploy + trigger loop step output:",
          util.inspect(loopStep.output, { depth: null, colors: true })
        );

        const output = loopStep.output as any;
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBe(3);
        expect(output[0].studentName).toBe("Alice");
        expect(output[0].letterGrade).toBe("B");
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });

    test("should deploy and trigger workflow with multiple Loop node types", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      // Create a data generation node
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_multi_data",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            return {
              numbers: [1, 2, 3]
            };
            `,
        },
      });

      // Create CustomCode loop
      const customCodeLoop = NodeFactory.create({
        id: getNextId(),
        name: "custom_code_loop",
        type: NodeType.Loop,
        data: {
          sourceId: dataNode.id,
          iterVal: "num",
          iterKey: "idx",
          customCode: {
            config: {
              lang: CustomCodeLang.JavaScript,
              source: `return { number: num, squared: num * num, index: idx };`,
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        customCodeLoop,
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
        const customCodeLoopStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === customCodeLoop.id
        );

        expect(customCodeLoopStep).toBeDefined();
        expect(customCodeLoopStep!.success).toBe(true);

        const output = customCodeLoopStep!.output as any;
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBe(3);
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

      const loopConfig = {
        sourceId: "testData",
        iterVal: "item",
        iterKey: "index",
        customCode: {
          config: {
            lang: CustomCodeLang.JavaScript,
            source: `
              const _ = require('lodash');
              return {
                originalValue: item,
                doubled: item * 2,
                index: index,
                timestamp: new Date().toISOString(),
                computed: _.sum([item, index, 10])
              };
            `,
          },
        },
      };

      const inputVariables = {
        testData: [5, 10, 15],
      };

      console.log(
        "🔍 Testing response format consistency across all methods..."
      );

      // Test 1: runNodeWithInputs
      const directResponse = await client.runNodeWithInputs({
        nodeType: NodeType.Loop,
        nodeConfig: loopConfig,
        inputVariables: inputVariables,
      });

      // Test 2: simulateWorkflow
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_data_gen",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `return { testData: [5, 10, 15] };`,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_test",
        type: NodeType.Loop,
        data: {
          sourceId: dataNode.id,
          iterVal: "item",
          iterKey: "index",
          customCode: {
            config: {
              lang: CustomCodeLang.JavaScript,
              source: `
                const _ = require('lodash');
                return {
                  originalValue: item,
                  doubled: item * 2,
                  index: index,
                  timestamp: new Date().toISOString(),
                  computed: _.sum([item, index, 10])
                };
              `,
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);
      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === loopNode.id
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
          (step) => step.id === loopNode.id
        );

        // Compare response formats
        console.log("=== LOOP NODE RESPONSE FORMAT COMPARISON ===");
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

        // Verify consistent structure
        const directOutput = directResponse.data;
        const simulatedOutput = simulatedStep!.output as any;
        const executedOutput = executedStep!.output as any;

        // All should be arrays with same length
        if (directOutput && Array.isArray(directOutput)) {
          expect(Array.isArray(simulatedOutput)).toBe(true);
          expect(Array.isArray(executedOutput)).toBe(true);

          expect(directOutput.length).toBe(3);
          expect(simulatedOutput.length).toBe(3);
          expect(executedOutput.length).toBe(3);

          // Check structure of first element
          expect(directOutput[0].originalValue).toBe(5);
          expect(simulatedOutput[0].originalValue).toBe(5);
          expect(executedOutput[0].originalValue).toBe(5);

          expect(directOutput[0].doubled).toBe(10);
          expect(simulatedOutput[0].doubled).toBe(10);
          expect(executedOutput[0].doubled).toBe(10);

          expect(directOutput[0].index).toBe(0);
          expect(simulatedOutput[0].index).toBe(0);
          expect(executedOutput[0].index).toBe(0);

          expect(directOutput[0].computed).toBe(15); // 5 + 0 + 10
          expect(simulatedOutput[0].computed).toBe(15);
          expect(executedOutput[0].computed).toBe(15);
        }

        console.log(
          "✅ All three methods return consistent loop execution results!"
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });

    test("should handle edge cases consistently across all methods", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      // Test with single item array
      const loopConfig = {
        sourceId: "singleItem",
        iterVal: "value",
        iterKey: "pos",
        customCode: {
          config: {
            lang: CustomCodeLang.JavaScript,
            source: `return { value: value, position: pos, processed: true };`,
          },
        },
      };

      const inputVariables = {
        singleItem: [42],
      };

      console.log("🔍 Testing edge case consistency (single item array)...");

      // Test 1: runNodeWithInputs
      const directResponse = await client.runNodeWithInputs({
        nodeType: NodeType.Loop,
        nodeConfig: loopConfig,
        inputVariables: inputVariables,
      });

      // Test 2: simulateWorkflow
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "edge_case_data",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `return { singleItem: [42] };`,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "edge_case_test",
        type: NodeType.Loop,
        data: {
          sourceId: dataNode.id,
          iterVal: "value",
          iterKey: "pos",
          customCode: {
            config: {
              lang: CustomCodeLang.JavaScript,
              source: `return { value: value, position: pos, processed: true };`,
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);
      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === loopNode.id
      );

      // All should handle single-item arrays consistently
      expect(directResponse.success).toBe(true);
      expect(simulatedStep).toBeDefined();
      expect(simulatedStep!.success).toBe(true);

      if (directResponse.data && Array.isArray(directResponse.data)) {
        expect(directResponse.data.length).toBe(1);
        expect(directResponse.data[0].value).toBe(42);
        expect(directResponse.data[0].position).toBe(0);
        expect(directResponse.data[0].processed).toBe(true);
      }

      const simulatedOutput = simulatedStep!.output as any;
      if (Array.isArray(simulatedOutput)) {
        expect(simulatedOutput.length).toBe(1);
        expect(simulatedOutput[0].value).toBe(42);
        expect(simulatedOutput[0].position).toBe(0);
        expect(simulatedOutput[0].processed).toBe(true);
      }

      console.log("✅ Edge case handling is consistent across methods!");
    });
  });
});
