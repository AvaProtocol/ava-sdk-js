import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import {
  Client,
  TriggerFactory,
  CustomCodeNode,
  NodeFactory,
  Edge,
} from "@avaprotocol/sdk-js";
import {
  TriggerType,
  NodeType,
  CustomCodeLang,
  ExecutionMode,
} from "@avaprotocol/types";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  getAddress,
  generateSignature,
  SaltGlobal,
  removeCreatedWorkflows,
  getNextId,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(45000);

// Lazy-load configuration to handle CI/CD environments gracefully
async function getTestConfig() {
  try {
    return getConfig();
  } catch (error) {
    console.warn(
      "⚠️ Environment validation failed, using mock config for unit tests:",
      error
    );
    // Return mock config for CI/CD or when real credentials aren't available
    return {
      avsEndpoint: "mock-endpoint:2206",
      walletPrivateKey:
        "0x0000000000000000000000000000000000000000000000000000000000000001",
      factoryAddress: "0x0000000000000000000000000000000000000000",
      chainEndpoint: "https://mock-chain-endpoint.com",
    };
  }
}

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 8000;

describe("ManualTrigger Tests", () => {
  let client: Client;
  let coreAddress: string;

  // Define trigger props at the beginning
  const minimalTriggerProps = {
    id: "test-trigger-id",
    name: "manualTrigger",
    type: TriggerType.Manual,
    data: { test: "minimal data" },
  };

  const userDataTriggerProps = {
    id: "test-trigger-id",
    name: "manualTrigger",
    type: TriggerType.Manual,
    data: {
      items: [
        { name: "item1", address: "0xaaaa" },
        { name: "item2", address: "0xbbbb" },
      ],
    },
  };

  const complexTriggerProps = {
    id: "test-trigger-id",
    name: "manualTrigger",
    type: TriggerType.Manual,
    data: {
      data: { message: "Hello World" },
      headers: { "Content-Type": "application/json", Authorization: "Bearer token123" },
      pathParams: { userId: "123", apiVersion: "v1" },
    },
  };

  const runTriggerSimpleProps = {
    triggerType: TriggerType.Manual,
    triggerConfig: {
      data: { message: "Hello, World!" },
    },
  };

  const runTriggerWithHeadersProps = {
    triggerType: TriggerType.Manual,
    triggerConfig: {
      data: {
        data: { message: "Hello with headers!" },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token123",
        },
      },
    },
  };

  beforeAll(async () => {
    // Load real configuration for integration tests
    const { avsEndpoint, walletPrivateKey, factoryAddress } =
      await getTestConfig();

    coreAddress = await getAddress(walletPrivateKey);

    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message } = await client.getSignatureFormat(coreAddress);
    const signature = await generateSignature(message, walletPrivateKey);

    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runTrigger Tests", () => {
    test("should succeed with minimal valid config", () => {
      const trigger = TriggerFactory.create(minimalTriggerProps);

      expect(() => trigger.toRequest()).not.toThrow();
      expect(trigger.toRequest().getType()).toBe(
        avs_pb.TriggerType.TRIGGER_TYPE_MANUAL
      );
    });

    test("should succeed with user-defined data", () => {
      const trigger = TriggerFactory.create(userDataTriggerProps);

      expect(() => trigger.toRequest()).not.toThrow();
    });

    test("should succeed with headers and pathParams", () => {
      const trigger = TriggerFactory.create(complexTriggerProps);

      expect(() => trigger.toRequest()).not.toThrow();
      expect(trigger.toRequest().getType()).toBe(
        avs_pb.TriggerType.TRIGGER_TYPE_MANUAL
      );
    });

    test("should handle runTrigger with no data", async () => {
      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {},
      };

      console.log(
        "🚀 runTrigger with no data input:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "🚀 runTrigger with no data result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      // ManualTrigger now requires data, so this should fail
      expect(result.success).toBe(false);
      expect(result.error).toContain("ManualTrigger data is required");
    });

    test("should handle runTrigger with simple data", async () => {
      console.log(
        "🚀 runTrigger with simple data input:",
        util.inspect(runTriggerSimpleProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerSimpleProps);

      console.log(
        "🚀 runTrigger with simple data result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(runTriggerSimpleProps.triggerConfig.data);
    });

    test("should handle runTrigger with headers", async () => {
      console.log(
        "🚀 runTrigger with headers input:",
        util.inspect(runTriggerWithHeadersProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerWithHeadersProps);

      console.log(
        "🚀 runTrigger with headers result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(runTriggerWithHeadersProps.triggerConfig.data);
    });

    test("should handle runTrigger with pathParams", async () => {
      const runTriggerWithPathParamsProps = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: { message: "Hello with pathParams!" },
          pathParams: {
            userId: "123",
            apiVersion: "v1",
          },
        },
      };

      console.log(
        "🚀 runTrigger with pathParams input:",
        util.inspect(runTriggerWithPathParamsProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerWithPathParamsProps);

      console.log(
        "🚀 runTrigger with pathParams result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(runTriggerWithPathParamsProps.triggerConfig.data);
    });

    test("should handle runTrigger with headers and pathParams", async () => {
      const runTriggerWithBothProps = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: { message: "Hello with both!" },
          headers: {
            "Content-Type": "application/json",
            "X-Custom": "header-value",
          },
          pathParams: {
            userId: "456",
            action: "update",
          },
        },
      };

      console.log(
        "🚀 runTrigger with headers and pathParams input:",
        util.inspect(runTriggerWithBothProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerWithBothProps);

      console.log(
        "🚀 runTrigger with headers and pathParams result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(runTriggerWithBothProps.triggerConfig.data);
    });

    test("should handle runTrigger with complex data", async () => {
      const runTriggerComplexProps = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: {
            items: [
              { name: "item1", address: "0xaaaa", value: 100 },
              { name: "item2", address: "0xbbbb", value: 200 },
            ],
            metadata: {
              timestamp: Date.now(),
              version: "1.0.0",
            },
          },
        },
      };

      console.log(
        "🚀 runTrigger with complex data input:",
        util.inspect(runTriggerComplexProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerComplexProps);

      console.log(
        "🚀 runTrigger with complex data result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(runTriggerComplexProps.triggerConfig.data);
    });

    test("should handle runTrigger with array data wrapped in JSON object", async () => {
      const runTriggerArrayProps = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: {
            items: [
              { name: "item1", address: "0xaaaa" },
              { name: "item2", address: "0xbbbb" },
              { name: "item3", address: "0xcccc" },
            ],
          },
        },
      };

      console.log(
        "🚀 runTrigger with array data input:",
        util.inspect(runTriggerArrayProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerArrayProps);

      console.log(
        "🚀 runTrigger with array data result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(runTriggerArrayProps.triggerConfig.data);
    });

    test("should handle runTrigger with JSON object containing JSON string field", async () => {
      const runTriggerJsonStringProps = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: {
            jsonString: JSON.stringify([
              { name: "item1", address: "0xaaaa" },
              { name: "item2", address: "0xbbbb" },
            ]),
          },
        },
      };

      console.log(
        "🚀 runTrigger with JSON string field input:",
        util.inspect(runTriggerJsonStringProps, { depth: null, colors: true })
      );

      const result = await client.runTrigger(runTriggerJsonStringProps);

      console.log(
        "🚀 runTrigger with JSON string field result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(runTriggerJsonStringProps.triggerConfig.data);
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with manual trigger and minimal data", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "simulate_manual_trigger_no_data",
        type: TriggerType.Manual,
        data: { message: "test simulation" }, // ManualTrigger now requires data
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = manualTrigger;

      console.log(
        "🚀 simulateWorkflow with manual trigger (minimal data):",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation).toBeDefined();
      expect(simulation.success).toBe(true);
      expect(simulation.steps).toBeDefined();
      expect(Array.isArray(simulation.steps)).toBe(true);

      // Check that the trigger step ran
      const triggerStep = simulation.steps.find(
        (step) => step.id === defaultTriggerId
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);

      // The output should be the raw data directly (new simplified format)
      expect(triggerStep!.output).toEqual({ message: "test simulation" });
    });

    test("should simulate workflow with manual trigger and user data", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const triggerName = "simulate_manual_trigger_with_data";

      const userData = {
        items: [
          { name: "item1", address: "0xaaaa" },
          { name: "item2", address: "0xbbbb" },
        ],
      };

      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: triggerName,
        type: TriggerType.Manual,
        data: userData,
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = manualTrigger;

      // Update the CustomCode node to reference the manual trigger's data
      const customCodeNode = workflowProps.nodes[0] as CustomCodeNode;
      // Update the CustomCode source to reference the manual trigger's data directly
      (
        customCodeNode.data as { source: string }
      ).source = `return ${triggerName}.data;`; // Access only the data field

      console.log(
        "🚀 simulateWorkflow with manual trigger and user data:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow with user data response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation).toBeDefined();
      expect(simulation.success).toBe(true);
      expect(simulation.steps).toBeDefined();
      expect(Array.isArray(simulation.steps)).toBe(true);

      // Check that the trigger step ran with the expected data
      const triggerStep = simulation.steps.find(
        (step) => step.id === defaultTriggerId
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);

      // The trigger step should have the user data available
      expect(triggerStep!.output).toBeDefined();
      const outputData = triggerStep!.output;
      expect(outputData).toBeDefined();
      expect(outputData).toEqual(userData); // ManualTrigger now returns raw data directly

      // Check that the CustomCode node successfully referenced the manual trigger data
      const customCodeStep = simulation.steps.find(
        (step) => step.name === "minimal_node"
      );
      expect(customCodeStep).toBeDefined();
      expect(customCodeStep!.success).toBe(true);

      // Manual triggers now return user data directly
      expect(customCodeStep!.output).toEqual(expect.objectContaining(userData));

      // Verify the reference was properly made by checking inputsList
      expect(customCodeStep!.inputsList).toContain(`${triggerName}.data`); // Check for specific field access
    });

    test("should simulate workflow with manual trigger including headers and pathParams", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const triggerName = "simulate_manual_trigger";

      const data = { message: "Hello webhook!" };
      const headers = {
        "Content-Type": "application/json",
        "X-API-Key": "secret123",
      };
      const pathParams = {
        userId: "789",
        action: "test",
      };

      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: triggerName,
        type: TriggerType.Manual,
        data: {
          data: data,
          headers: headers,
          pathParams: pathParams,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = manualTrigger;

      // Update the CustomCode node to reference the manual trigger's data directly
      // Note: headers and pathParams are config-only and not included in output
      const customCodeNode = workflowProps.nodes[0] as CustomCodeNode;
      (
        customCodeNode.data as { source: string }
      ).source = `return ${triggerName}.data;`; // Access data directly (new simplified format)

      console.log(
        "🚀 simulateWorkflow with manual trigger and webhook data:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow with webhook data response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation).toBeDefined();
      expect(simulation.success).toBe(true);
      expect(simulation.steps).toBeDefined();
      expect(Array.isArray(simulation.steps)).toBe(true);

      // Check that the trigger step ran with the expected data
      const triggerStep = simulation.steps.find(
        (step) => step.id === defaultTriggerId
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);

      // With the new simplified format, only the data content is returned (headers and pathParams are config-only)
      expect(triggerStep!.output).toEqual(data);

      // Check that the CustomCode node successfully referenced the manual trigger webhook data
      const customCodeStep = simulation.steps.find(
        (step) => step.name === "minimal_node"
      );
      expect(customCodeStep).toBeDefined();
      expect(customCodeStep!.success).toBe(true);

      // With the new design, only the data content is returned (headers and pathParams are config-only)
      expect(customCodeStep!.output).toEqual(data);

      expect(customCodeStep!.inputsList).toContain(`${triggerName}.data`); // Check for specific field access
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with manual trigger", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const userData = {
        testItems: [
          { name: "deployed_item1", address: "0xaaaa" },
          { name: "deployed_item2", address: "0xbbbb" },
        ],
      };

      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "deploy_manual_trigger_test",
        type: TriggerType.Manual,
        data: userData,
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = manualTrigger;

      let workflowId: string | undefined;

      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );

        // Verify deployment was successful
        const workflowsResult = await client.getWorkflows([wallet.address]);
        const deployedWorkflow = workflowsResult.items.find(
          (w) => w.id === workflowId
        );

        expect(deployedWorkflow).toBeDefined();
        expect(deployedWorkflow!.trigger).toBeDefined();
        expect(deployedWorkflow!.trigger!.type).toBe(TriggerType.Manual);

        console.log(
          "Deployed workflow:",
          util.inspect(deployedWorkflow, { depth: null, colors: true })
        );

        const triggerResponse = await client.triggerWorkflow({
          id: workflowId!,
          triggerData: {
            type: TriggerType.Manual,
            data: userData,
          },
        });

        console.log(
          "Manual trigger response:",
          util.inspect(triggerResponse, { depth: null, colors: true })
        );

        expect(triggerResponse).toBeDefined();
        expect(triggerResponse.executionId).toBeDefined();
        expect(triggerResponse.status).toBeDefined();

        // Mark as created for cleanup
        createdIdMap.set(workflowId!, true);
      } catch (error) {
        if (workflowId) {
          createdIdMap.set(workflowId, true);
        }
        throw error;
      }
    });

    test("should deploy and trigger workflow with manual trigger (minimal data)", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "deploy_manual_trigger_no_data",
        type: TriggerType.Manual,
        data: { message: "test deploy" }, // ManualTrigger now requires data
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = manualTrigger;

      let workflowId: string | undefined;

      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );

        // Verify deployment was successful
        const workflowsResult = await client.getWorkflows([wallet.address]);
        const deployedWorkflow = workflowsResult.items.find(
          (w) => w.id === workflowId
        );

        expect(deployedWorkflow).toBeDefined();
        expect(deployedWorkflow!.trigger).toBeDefined();
        expect(deployedWorkflow!.trigger!.type).toBe(TriggerType.Manual);

        console.log(
          "Deployed workflow:",
          util.inspect(deployedWorkflow, { depth: null, colors: true })
        );

        const triggerResponse = await client.triggerWorkflow({
          id: workflowId!,
          triggerData: {
            type: TriggerType.Manual,
            data: null,
          },
        });

        console.log(
          "Manual trigger response (no data):",
          util.inspect(triggerResponse, { depth: null, colors: true })
        );

        expect(triggerResponse).toBeDefined();
        expect(triggerResponse.executionId).toBeDefined();
        expect(triggerResponse.status).toBeDefined();

        // Mark as created for cleanup
        createdIdMap.set(workflowId!, true);
      } catch (error) {
        console.error("Deploy and trigger test (no data) failed:", error);
        if (workflowId) {
          createdIdMap.set(workflowId, true);
        }
        throw error;
      }
    });

    test("should deploy and trigger workflow with webhook headers and pathParams", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const userData = { message: "Deploy webhook test" };
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-Test": "webhook",
      };
      const pathParams: Record<string, string> = {
        userId: "deploy123",
        env: "test",
      };

      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "deploy_webhook_trigger_test",
        type: TriggerType.Manual,
        data: {
          data: userData,
          headers: headers,
          pathParams: pathParams,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = manualTrigger;

      let workflowId: string | undefined;

      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );

        // Verify deployment was successful
        const workflowsResult = await client.getWorkflows([wallet.address]);
        const deployedWorkflow = workflowsResult.items.find(
          (w) => w.id === workflowId
        );

        expect(deployedWorkflow).toBeDefined();
        expect(deployedWorkflow!.trigger).toBeDefined();
        expect(deployedWorkflow!.trigger!.type).toBe(TriggerType.Manual);

        console.log(
          "Deployed workflow:",
          util.inspect(deployedWorkflow, { depth: null, colors: true })
        );

        const triggerResponse = await client.triggerWorkflow({
          id: workflowId!,
          triggerData: {
            type: TriggerType.Manual,
            data: userData,
            headers: headers,
            pathParams: pathParams,
          },
        });

        console.log(
          "Webhook trigger response:",
          util.inspect(triggerResponse, { depth: null, colors: true })
        );

        expect(triggerResponse).toBeDefined();
        expect(triggerResponse.executionId).toBeDefined();
        expect(triggerResponse.status).toBeDefined();

        // Mark as created for cleanup
        createdIdMap.set(workflowId!, true);
      } catch (error) {
        console.error("Deploy and trigger webhook test failed:", error);
        if (workflowId) {
          createdIdMap.set(workflowId, true);
        }
        throw error;
      }
    });
  });

  describe("Response Format Consistency Tests", () => {
    test("should maintain consistent response format across runTrigger and simulateWorkflow", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const testData = [
        { name: "consistency_item1", address: "0xaaaa" },
        { name: "consistency_item2", address: "0xbbbb" },
      ];

      const triggerName = "consistency_test_manual_trigger";
      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: triggerName,
        type: TriggerType.Manual,
        data: testData,
      });

      // Create a LoopNode to process the array data
      const loopNodeId = getNextId();
      const iteratorValueVar = "value";
      const iteratorKeyVar = "index";
      const runnerType = "customCode";
      const loopNode = NodeFactory.create({
        id: loopNodeId,
        name: "process_array_loop",
        type: NodeType.Loop,
        data: {
          inputNodeName: triggerName,  // Use inputNodeName instead of deprecated sourceId
          iterVal: iteratorValueVar,
          iterKey: iteratorKeyVar,
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: runnerType,
            data: {
              config: {
                lang: CustomCodeLang.JavaScript,
                source: `return ${iteratorValueVar}.name + ${iteratorValueVar}.address;`,
              },
            },
          },
        },
      });

      // Create edge from trigger to loop node
      const edge: Edge = {
        id: getNextId(),
        source: defaultTriggerId,
        target: loopNodeId,
      };

      // Test 1: runTrigger
      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: testData,
        },
      };

      console.log(
        "🚀 ~ runTrigger for consistency test ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const directResponse = await client.runTrigger(params);
      console.log(
        "runTrigger response:",
        util.inspect(directResponse, { depth: null, colors: true })
      );

      // Test 2: simulateWorkflow with LoopNode
      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = manualTrigger;
      workflowProps.nodes = [loopNode];
      workflowProps.edges = [edge];

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      // Both should be successful
      expect(directResponse.success).toBe(true);
      expect(simulation.success).toBe(true);

      // Validate trigger data consistency
      expect(directResponse.data).toEqual(testData);

      // Find the trigger step in simulation
      const triggerStep = simulation.steps.find(
        (step) => step.id === defaultTriggerId
      );
      expect(triggerStep).toBeDefined();
      expect(triggerStep!.success).toBe(true);

      // Validate consistency_test_manual_trigger.config and .output
      expect(triggerStep!.config).toBeDefined();
      expect(triggerStep!.output).toEqual(testData); // ManualTrigger now returns raw data directly

      // Find the loop step in simulation
      const loopStep = simulation.steps.find((step) => step.id === loopNodeId);
      expect(loopStep).toBeDefined();
      expect(loopStep!.success).toBe(true);

      // Validate LoopNode output - should contain processed results
      expect(loopStep!.output).toBeDefined();
      expect(Array.isArray(loopStep!.output)).toBe(true);

      // Expected results: ["consistency_item10xaaaa", "consistency_item20xbbbb"]
      const expectedResults = testData.map(
        (item) => `${item.name}${item.address}`
      );
      expect(loopStep!.output).toEqual(expectedResults);
    });
  });

  describe("Required Data Validation Tests", () => {
    test("should reject null data (data is required)", async () => {
      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: null,
        },
      };

      console.log(
        "🚀 ~ runTrigger with null data ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger null data response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toContain("ManualTrigger data is required");
    });

    test("should reject undefined data (data is required)", async () => {
      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: undefined,
        },
      };

      console.log(
        "🚀 ~ runTrigger with undefined data ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger undefined data response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toContain("ManualTrigger data is required");
    });

    test("should handle empty object data", async () => {
      const emptyData = {};

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: emptyData,
        },
      };

      console.log(
        "🚀 ~ runTrigger with empty object ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger empty object response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);

      expect(result.data).toEqual(emptyData);
    });

    test("should handle empty array data wrapped in JSON object", async () => {
      const emptyArrayData = {
        items: [] as unknown[],
      };

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: emptyArrayData,
        },
      };

      console.log(
        "🚀 ~ runTrigger with empty array wrapped in JSON object ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger empty array response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);

      expect(result.data).toEqual(emptyArrayData);
    });
  });

  describe("JSON Data Acceptance Tests", () => {
    test("should accept raw array data (valid JSON)", async () => {
      const arrayData = [
        { name: "item1", address: "0xaaaa" },
        { name: "item2", address: "0xbbbb" },
      ];

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: arrayData,
        },
      };

      const result = await client.runTrigger(params);
      console.log("🚀 ~ test ~ result:", result);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(arrayData);
    });

    test("should accept string data (valid JSON primitive)", async () => {
      const stringData = "Hello World";

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: stringData,
        },
      };

      const result = await client.runTrigger(params);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(stringData);
    });

    test("should accept number data (valid JSON primitive)", async () => {
      const numberData = 42;

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: numberData,
        },
      };

      const result = await client.runTrigger(params);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(numberData);
    });

    test("should accept boolean data (valid JSON primitive)", async () => {
      const booleanData = true;

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: booleanData,
        },
      };

      const result = await client.runTrigger(params);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(booleanData);
    });

    test("should accept array of objects data (valid JSON)", async () => {
      const arrayData = [{ key1: "value1" }, { key2: "value2" }];

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: arrayData,
        },
      };

      const result = await client.runTrigger(params);

      console.log("🚀 ~ test ~ result:", result);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(arrayData);
    });
  });
});
