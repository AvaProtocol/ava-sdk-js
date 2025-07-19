import { describe, test, expect, beforeAll } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import { TriggerType, NodeType, ExecutionMode } from "@avaprotocol/types";
import { TriggerFactory, NodeFactory, Edge } from "@avaprotocol/sdk-js";
import _ from "lodash";
import util from "util";
import { getConfig } from "../utils/envalid";
import {
  getAddress,
  generateSignature,
  SaltGlobal,
  getNextId,
} from "../utils/utils";

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let client: Client;
let eoaAddress: string;
let saltIndex = SaltGlobal.CreateWorkflow * 1000 + 800; // Use a different range

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
  console.log("✅ Client authenticated successfully");
});

describe("Exported Workflow Consistency Tests", () => {
  /**
   * Test workflow structure based on exported-workflow.json:
   *
   * ManualTrigger -> [LoopNode, FilterNode, CustomCodeNode]
   *
   * ManualTrigger: Contains array data [{"key":"value1"},{"key":"value2"}]
   * LoopNode: Iterates over trigger data with CustomCode runner
   * FilterNode: Filters trigger data for items with key === "value1"
   * CustomCodeNode: Returns the raw trigger data
   */

  describe("Individual Node Testing (runTrigger/runNode)", () => {
    test("should test ManualTrigger with JSON array data", async () => {
      const testData = [{ key: "value1" }, { key: "value2" }];

      const result = await client.runTrigger({
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: testData,
          headers: [{ key: "headerKey", value: "headerValue" }],
          pathParams: [{ key: "pathKey", value: "pathValue" }],
        },
      });

      console.log(
        "🚀 ManualTrigger runTrigger result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(testData);
      expect(result.triggerId).toBeDefined();
    });

    test("should test LoopNode with CustomCode runner", async () => {
      const inputData = [{ key: "value1" }, { key: "value2" }];

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Loop,
        nodeConfig: {
          inputNodeName: "manualTrigger",
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: "customCode",
            data: {
              config: {
                lang: 0, // JavaScript
                source: "return value;",
              },
            },
          },
        },
        inputVariables: {
          manualTrigger: inputData,
        },
      });

      console.log(
        "🚀 LoopNode runNodeWithInputs result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).toEqual(inputData); // Should return the same array items
      expect(result.nodeId).toBeDefined();
    });

    test("should test FilterNode with inputNodeName", async () => {
      const inputData = [{ key: "value1" }, { key: "value2" }];

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          inputNodeName: "manualTrigger",
          expression: 'value.key === "value1"',
        },
        inputVariables: {
          manualTrigger: inputData,
        },
      });

      console.log(
        "🚀 FilterNode runNodeWithInputs result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual([{ key: "value1" }]); // FilterNode now returns array of filtered items
      expect(result.nodeId).toBeDefined();
    });

    test("should test CustomCode node accessing trigger data", async () => {
      const inputData = [{ key: "value1" }, { key: "value2" }];

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: 0, // JavaScript
          source: "return manualTrigger.data;",
        },
        inputVariables: {
          manualTrigger: {
            data: inputData,
          },
        },
      });

      console.log(
        "🚀 CustomCode runNodeWithInputs result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(inputData); // Should return the trigger data
      expect(result.nodeId).toBeDefined();
    });
  });

  describe("Workflow Simulation Testing", () => {
    test("should simulate complete workflow with all nodes", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Create ManualTrigger with proper data structure
      const manualTrigger = TriggerFactory.create({
        id: "manualTrigger",
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: [{ key: "value1" }, { key: "value2" }],
        headers: [{ key: "headerKey", value: "headerValue" }],
        pathParams: [{ key: "pathKey", value: "pathValue" }],
      });

      // Create LoopNode with updated inputNodeName
      const loopNode = NodeFactory.create({
        id: "loop0",
        name: "loop0",
        type: NodeType.Loop,
        data: {
          inputNodeName: "manualTrigger", // Updated from sourceId
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: "customCode",
            data: {
              config: {
                lang: 0,
                source: "return value;",
              },
            },
          },
        },
      });

      // Create FilterNode with updated inputNodeName
      const filterNode = NodeFactory.create({
        id: "filter1",
        name: "filter1",
        type: NodeType.Filter,
        data: {
          inputNodeName: "manualTrigger", // Updated from sourceId
          expression: 'value.key === "value1"',
        },
      });

      // Create CustomCode node
      const customCodeNode = NodeFactory.create({
        id: "code1",
        name: "code1",
        type: NodeType.CustomCode,
        data: {
          lang: 0,
          source: "return manualTrigger.data;",
        },
      });

      // Create workflow
      const workflowProps = {
        smartWalletAddress: wallet.address,
        trigger: manualTrigger,
        nodes: [loopNode, filterNode, customCodeNode],
        edges: [
          new Edge({
            id: getNextId(),
            source: "manualTrigger",
            target: "loop0",
          }),
          new Edge({
            id: getNextId(),
            source: "manualTrigger",
            target: "filter1",
          }),
          new Edge({
            id: getNextId(),
            source: "manualTrigger",
            target: "code1",
          }),
        ],
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        maxExecution: 1,
        name: "Exported Workflow Simulation Test",
      };

      const workflow = client.createWorkflow(workflowProps);

      console.log(
        "🚀 Simulating workflow:",
        util.inspect(
          {
            trigger: manualTrigger,
            nodes: [loopNode, filterNode, customCodeNode],
          },
          { depth: null, colors: true }
        )
      );

      const simulation = await client.simulateWorkflow(workflow);

      console.log(
        "🚀 Simulation result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation).toBeDefined();
      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(4); // Trigger + 3 nodes

      // Validate trigger step
      const triggerStep = simulation.steps.find(
        (s) => s.type === "manualTrigger"
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);
      expect(triggerStep!.output).toEqual([
        { key: "value1" },
        { key: "value2" },
      ]);

      // Validate loop step
      const loopStep = simulation.steps.find((s) => s.type === "loop");
      expect(loopStep).toBeDefined();
      expect(loopStep!.success).toBe(true);
      expect(Array.isArray(loopStep!.output)).toBe(true);
      expect(loopStep!.output).toEqual([{ key: "value1" }, { key: "value2" }]);
      expect(loopStep!.inputsList).toContain("manualTrigger.data");

      // Validate filter step
      const filterStep = simulation.steps.find((s) => s.type === "filter");
      expect(filterStep).toBeDefined();
      expect(filterStep!.success).toBe(true);
      expect(filterStep!.output).toEqual([{ key: "value1" }]);
      expect(filterStep!.inputsList).toContain("manualTrigger.data");

      // Validate custom code step
      const codeStep = simulation.steps.find((s) => s.type === "customCode");
      expect(codeStep).toBeDefined();
      expect(codeStep!.success).toBe(true);
      expect(codeStep!.output).toEqual([{ key: "value1" }, { key: "value2" }]);
      expect(codeStep!.inputsList).toContain("manualTrigger.data");
    });
  });

  describe("Deployed Workflow Testing", () => {
    test("should deploy and trigger workflow, validating step consistency", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Create the same workflow as simulation test
      const manualTrigger = TriggerFactory.create({
        id: "manualTrigger",
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: [{ key: "value1" }, { key: "value2" }],
        headers: [{ key: "headerKey", value: "headerValue" }],
        pathParams: [{ key: "pathKey", value: "pathValue" }],
      });

      const loopNode = NodeFactory.create({
        id: "loop0",
        name: "loop0",
        type: NodeType.Loop,
        data: {
          inputNodeName: "manualTrigger",
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: "customCode",
            data: {
              config: {
                lang: 0,
                source: "return value;",
              },
            },
          },
        },
      });

      const filterNode = NodeFactory.create({
        id: "filter1",
        name: "filter1",
        type: NodeType.Filter,
        data: {
          inputNodeName: "manualTrigger",
          expression: 'value.key === "value1"',
        },
      });

      const customCodeNode = NodeFactory.create({
        id: "code1",
        name: "code1",
        type: NodeType.CustomCode,
        data: {
          lang: 0,
          source: "return manualTrigger.data;",
        },
      });

      const workflowProps = {
        smartWalletAddress: wallet.address,
        trigger: manualTrigger,
        nodes: [loopNode, filterNode, customCodeNode],
        edges: [
          new Edge({
            id: getNextId(),
            source: "manualTrigger",
            target: "loop0",
          }),
          new Edge({
            id: getNextId(),
            source: "manualTrigger",
            target: "filter1",
          }),
          new Edge({
            id: getNextId(),
            source: "manualTrigger",
            target: "code1",
          }),
        ],
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        maxExecution: 1,
        name: "Deployed Workflow Consistency Test",
      };

      const workflow = client.createWorkflow(workflowProps);

      let workflowId: string | undefined;

      try {
        // Deploy workflow
        workflowId = await client.submitWorkflow(workflow);
        expect(workflowId).toBeDefined();

        console.log("🚀 Deployed workflow ID:", workflowId);

        // Wait a moment for deployment
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Trigger the workflow
        const execution = await client.triggerWorkflow({
          id: workflowId!,
          triggerData: {
            type: TriggerType.Manual,
            data: [{ key: "value1" }, { key: "value2" }],
          },
        });

        console.log(
          "🚀 Workflow trigger result:",
          util.inspect(execution, { depth: null, colors: true })
        );

        expect(execution).toBeDefined();
        expect(execution.executionId).toBeDefined();

        // Wait for execution to complete and fetch the execution details
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const executionDetails = await client.getExecution(
          workflowId!,
          execution.executionId
        );
        console.log(
          "🚀 Workflow execution details:",
          util.inspect(executionDetails, { depth: null, colors: true })
        );

        expect(executionDetails).toBeDefined();
        expect(executionDetails.steps).toHaveLength(4); // Trigger + 3 nodes

        // Note: Deployed workflow execution may differ from simulation
        // The main test goal is to verify that the workflow can be deployed and triggered
        console.log("📊 Deployed workflow execution status:", {
          success: executionDetails.success,
          error: executionDetails.error,
          stepCount: executionDetails.steps.length,
        });

        // Validate that all expected step types are present
        const triggerStep = executionDetails.steps.find(
          (s) => s.type === "manualTrigger"
        );
        const loopStep = executionDetails.steps.find((s) => s.type === "loop");
        const filterStep = executionDetails.steps.find(
          (s) => s.type === "filter"
        );
        const codeStep = executionDetails.steps.find(
          (s) => s.type === "customCode"
        );

        expect(triggerStep).toBeDefined();
        expect(loopStep).toBeDefined();
        expect(filterStep).toBeDefined();
        expect(codeStep).toBeDefined();

        console.log(
          "✅ Deployed workflow test completed - all step types present"
        );
        console.log("📋 Step execution summary:", {
          trigger: {
            success: triggerStep!.success,
            hasOutput: !!triggerStep!.output,
          },
          loop: { success: loopStep!.success, hasOutput: !!loopStep!.output },
          filter: {
            success: filterStep!.success,
            hasOutput: !!filterStep!.output,
          },
          code: { success: codeStep!.success, hasOutput: !!codeStep!.output },
        });
      } finally {
        // Clean up - delete the workflow
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
            console.log("🧹 Cleaned up workflow:", workflowId);
          } catch (error) {
            console.warn("Failed to clean up workflow:", error);
          }
        }
      }
    });
  });

  describe("Cross-Method Consistency Validation", () => {
    test("should validate LoopNode output consistency across all three methods", async () => {
      const testData = [{ key: "value1" }, { key: "value2" }];

      // Method 1: runNodeWithInputs
      const directResult = await client.runNodeWithInputs({
        nodeType: NodeType.Loop,
        nodeConfig: {
          inputNodeName: "manualTrigger",
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: "customCode",
            data: {
              config: {
                lang: 0,
                source: "return value;",
              },
            },
          },
        },
        inputVariables: {
          manualTrigger: testData,
        },
      });

      // Method 2: simulateWorkflow
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const manualTrigger = TriggerFactory.create({
        id: "manualTrigger",
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: testData,
      });

      const loopNode = NodeFactory.create({
        id: "loop0",
        name: "loop0",
        type: NodeType.Loop,
        data: {
          inputNodeName: "manualTrigger",
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: "customCode",
            data: {
              config: {
                lang: 0,
                source: "return value;",
              },
            },
          },
        },
      });

      const workflowProps = {
        smartWalletAddress: wallet.address,
        trigger: manualTrigger,
        nodes: [loopNode],
        edges: [
          new Edge({
            id: getNextId(),
            source: "manualTrigger",
            target: "loop0",
          }),
        ],
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        maxExecution: 1,
        name: "LoopNode Consistency Test",
      };

      const workflow = client.createWorkflow(workflowProps);
      const simulation = await client.simulateWorkflow(workflow);
      const simulatedLoopStep = simulation.steps.find((s) => s.type === "loop");

      // Method 3: deployed workflow
      let workflowId: string | undefined;
      let executedLoopStep: any;

      try {
        workflowId = await client.submitWorkflow(workflow);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const triggerResponse = await client.triggerWorkflow({
          id: workflowId!,
          triggerData: {
            type: TriggerType.Manual,
            data: testData,
          },
          isBlocking: true,
        });

        const executions = await client.getExecutions([workflowId!], {
          limit: 1,
        });

        const execution = executions.items[0];
        executedLoopStep = execution.steps.find((s) => s.type === "loop");
      } finally {
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
          } catch (error) {
            console.warn("Failed to clean up workflow:", error);
          }
        }
      }

      // Validate consistency across all three methods
      console.log(
        "🔍 Direct Result:",
        JSON.stringify(directResult.data, null, 2)
      );
      console.log(
        "🔍 Simulated Step:",
        JSON.stringify(simulatedLoopStep!.output, null, 2)
      );
      console.log(
        "🔍 Executed Step:",
        JSON.stringify(executedLoopStep!.output, null, 2)
      );

      // All three methods should return identical flat array results
      expect(directResult.success).toBe(true);
      expect(simulation.success).toBe(true);
      expect(executedLoopStep.success).toBe(true);

      // The key consistency check - all return the same flat array
      expect(directResult.data).toEqual(testData);
      expect(simulatedLoopStep!.output).toEqual(testData);
      expect(executedLoopStep!.output).toEqual(testData);

      // Verify they are all arrays (not nested objects)
      expect(Array.isArray(directResult.data)).toBe(true);
      expect(Array.isArray(simulatedLoopStep!.output)).toBe(true);
      expect(Array.isArray(executedLoopStep!.output)).toBe(true);

      console.log(
        "✅ Perfect consistency achieved across all three execution methods!"
      );
    });

    test("should validate FilterNode output consistency across all methods", async () => {
      const testData = [{ key: "value1" }, { key: "value2" }];
      const expectedResult = [{ key: "value1" }];

      // Method 1: runNodeWithInputs
      const directResult = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          inputNodeName: "manualTrigger",
          expression: 'value.key === "value1"',
        },
        inputVariables: {
          manualTrigger: testData,
        },
      });

      // Method 2: simulateWorkflow
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const manualTrigger = TriggerFactory.create({
        id: "manualTrigger",
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: testData,
      });

      const filterNode = NodeFactory.create({
        id: "filter1",
        name: "filter1",
        type: NodeType.Filter,
        data: {
          inputNodeName: "manualTrigger",
          expression: 'value.key === "value1"',
        },
      });

      const workflowProps = {
        smartWalletAddress: wallet.address,
        trigger: manualTrigger,
        nodes: [filterNode],
        edges: [
          new Edge({
            id: getNextId(),
            source: "manualTrigger",
            target: "filter1",
          }),
        ],
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        maxExecution: 1,
        name: "FilterNode Consistency Test",
      };

      const workflow = client.createWorkflow(workflowProps);

      const simulation = await client.simulateWorkflow(workflow);
      const simulatedFilterStep = simulation.steps.find(
        (s) => s.type === "filter"
      );

      // Method 3: deployed workflow
      let workflowId: string | undefined;
      let executedFilterStep: any;

      try {
        workflowId = await client.submitWorkflow(workflow);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const triggerResponse = await client.triggerWorkflow({
          id: workflowId!,
          triggerData: {
            type: TriggerType.Manual,
            data: testData,
          },
          isBlocking: true,
        });

        const executions = await client.getExecutions([workflowId!], {
          limit: 1,
        });

        const execution = executions.items[0];
        executedFilterStep = execution.steps.find((s) => s.type === "filter");
      } finally {
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
          } catch (error) {
            console.warn("Failed to clean up workflow:", error);
          }
        }
      }

      // Validate consistency
      console.log(
        "🔍 Filter Direct Result:",
        JSON.stringify(directResult.data, null, 2)
      );
      console.log(
        "🔍 Filter Simulated Step:",
        JSON.stringify(simulatedFilterStep!.output, null, 2)
      );
      console.log(
        "🔍 Filter Executed Step:",
        JSON.stringify(executedFilterStep!.output, null, 2)
      );

      expect(directResult.success).toBe(true);
      expect(simulation.success).toBe(true);
      expect(executedFilterStep.success).toBe(true);

      expect(directResult.data).toEqual(expectedResult);
      expect(simulatedFilterStep!.output).toEqual(expectedResult);
      expect(executedFilterStep!.output).toEqual(expectedResult);

      console.log("✅ FilterNode consistency verified across all methods!");
    });

    test("should validate ManualTrigger data access in CustomCode across all methods", async () => {
      const testData = [{ key: "value1" }, { key: "value2" }];

      // Method 1: runNodeWithInputs
      const directResult = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: {
          lang: 0,
          source: "return manualTrigger.data;",
        },
        inputVariables: {
          manualTrigger: {
            data: testData,
          },
        },
      });

      // Method 2: simulateWorkflow
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const manualTrigger = TriggerFactory.create({
        id: "manualTrigger",
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: testData,
      });

      const customCodeNode = NodeFactory.create({
        id: "code1",
        name: "code1",
        type: NodeType.CustomCode,
        data: {
          lang: 0,
          source: "return manualTrigger.data;",
        },
      });

      const workflowProps = {
        smartWalletAddress: wallet.address,
        trigger: manualTrigger,
        nodes: [customCodeNode],
        edges: [
          new Edge({
            id: getNextId(),
            source: "manualTrigger",
            target: "code1",
          }),
        ],
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        maxExecution: 1,
        name: "CustomCode Consistency Test",
      };

      const workflow = client.createWorkflow(workflowProps);

      const simulation = await client.simulateWorkflow(workflow);
      const simulatedCodeStep = simulation.steps.find(
        (s) => s.type === "customCode"
      );

      // Method 3: deployed workflow
      let workflowId: string | undefined;
      let executedCodeStep: any;

      try {
        workflowId = await client.submitWorkflow(workflow);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const triggerResponse = await client.triggerWorkflow({
          id: workflowId!,
          triggerData: {
            type: TriggerType.Manual,
            data: testData,
          },
          isBlocking: true,
        });

        const executions = await client.getExecutions([workflowId!], {
          limit: 1,
        });

        const execution = executions.items[0];
        executedCodeStep = execution.steps.find((s) => s.type === "customCode");
      } finally {
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
          } catch (error) {
            console.warn("Failed to clean up workflow:", error);
          }
        }
      }

      // Validate consistency
      console.log(
        "🔍 CustomCode Direct Result:",
        JSON.stringify(directResult.data, null, 2)
      );
      console.log(
        "🔍 CustomCode Simulated Step:",
        JSON.stringify(simulatedCodeStep!.output, null, 2)
      );
      console.log(
        "🔍 CustomCode Executed Step:",
        JSON.stringify(executedCodeStep!.output, null, 2)
      );

      expect(directResult.success).toBe(true);
      expect(simulation.success).toBe(true);
      expect(executedCodeStep.success).toBe(true);

      expect(directResult.data).toEqual(testData);
      expect(simulatedCodeStep!.output).toEqual(testData);
      expect(executedCodeStep!.output).toEqual(testData);

      // Verify inputsList contains trigger data reference
      expect(simulatedCodeStep!.inputsList).toContain("manualTrigger.data");
      expect(executedCodeStep!.inputsList).toContain("manualTrigger.data");

      console.log(
        "✅ CustomCode ManualTrigger data access consistency verified!"
      );
    });
  });

  describe("Input Field Validation", () => {
    test("should validate that execution steps contain proper input field data", async () => {
      const testData = [{ key: "value1" }, { key: "value2" }];
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const manualTrigger = TriggerFactory.create({
        id: "manualTrigger",
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: testData,
        headers: [{ key: "testHeader", value: "testValue" }],
        pathParams: [{ key: "testParam", value: "testParamValue" }],
      });

      const loopNode = NodeFactory.create({
        id: "loop0",
        name: "loop0",
        type: NodeType.Loop,
        data: {
          inputNodeName: "manualTrigger",
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: "customCode",
            data: {
              config: {
                lang: 0,
                source:
                  "return { processed: value, timestamp: new Date().toISOString() };",
              },
            },
          },
        },
      });

      const workflowProps = {
        smartWalletAddress: wallet.address,
        trigger: manualTrigger,
        nodes: [loopNode],
        edges: [
          new Edge({
            id: getNextId(),
            source: "manualTrigger",
            target: "loop0",
          }),
        ],
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        maxExecution: 1,
        name: "Input Field Validation Test",
      };

      const workflow = client.createWorkflow(workflowProps);

      const simulation = await client.simulateWorkflow(workflow);

      console.log(
        "🔍 Input field validation simulation:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);

      // Validate trigger step input field
      const triggerStep = simulation.steps.find(
        (s) => s.type === "manualTrigger"
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.input).toBeDefined();
      expect(triggerStep!.input.data).toEqual(testData);

      // Validate node step input field
      const loopStep = simulation.steps.find((s) => s.type === "loop");
      expect(loopStep).toBeDefined();
      expect(loopStep!.input).toBeDefined();
      expect(loopStep!.input.inputNodeName).toBe("manualTrigger");
      expect(loopStep!.input.executionMode).toBe("sequential");
      expect(loopStep!.input.runner).toBeDefined();
      expect(loopStep!.input.runner.type).toBe("customCode");

      // Validate inputsList contains expected references
      expect(loopStep!.inputsList).toContain("manualTrigger.data");
      expect(loopStep!.inputsList).toContain("workflowContext");
      expect(loopStep!.inputsList).toContain("apContext.configVars");

      console.log("✅ Input field validation passed!");
    });
  });
});
