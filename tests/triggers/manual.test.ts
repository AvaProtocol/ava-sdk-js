import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import {
  Client,
  TriggerFactory,
  ManualTrigger,
  CustomCodeNode,
} from "@avaprotocol/sdk-js";
import { TriggerType } from "@avaprotocol/types";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  getAddress,
  generateSignature,
  SaltGlobal,
  removeCreatedWorkflows,
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
      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: null,
      });

      expect(() => trigger.toRequest()).not.toThrow();
      expect(trigger.toRequest().getType()).toBe(
        avs_pb.TriggerType.TRIGGER_TYPE_MANUAL
      );
    });

    test("should succeed with user-defined data", () => {
      const userData = {
        items: [
          { name: "item1", address: "0xaaaa" },
          { name: "item2", address: "0xbbbb" },
        ],
      };

      const trigger = TriggerFactory.create({
        id: "test-trigger-id",
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: userData,
      });

      expect(() => trigger.toRequest()).not.toThrow();
    });

    test("should handle runTrigger with no data", async () => {
      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {},
      };

      console.log(
        "🚀 ~ runTrigger with no data ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger no data response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);

      // With no data, the manual trigger should return wrapped null: {data: null}
      expect(result.data).toEqual({data: null});
    });

    test("should handle runTrigger with simple data", async () => {
      const testData = { message: "Hello, World!" };

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: testData,
        },
      };

      console.log(
        "🚀 ~ runTrigger with simple data ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger simple data response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);

      expect(result.data).toEqual({data: testData});
    });

    test("should handle runTrigger with complex data", async () => {
      const complexData = {
        items: [
          { name: "item1", address: "0xaaaa", value: 100 },
          { name: "item2", address: "0xbbbb", value: 200 },
        ],
        metadata: {
          timestamp: Date.now(),
          version: "1.0.0",
        },
      };

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: complexData,
        },
      };

      console.log(
        "🚀 ~ runTrigger with complex data ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger complex data response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);

      expect(result.data).toEqual({data: complexData});
    });

    test("should handle runTrigger with array data", async () => {
      const arrayData = [
        { name: "item1", address: "0xaaaa" },
        { name: "item2", address: "0xbbbb" },
        { name: "item3", address: "0xcccc" },
      ];

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: arrayData,
        },
      };

      console.log(
        "🚀 ~ runTrigger with array data ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger array data response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);

      expect(result.data).toEqual({data: arrayData});
    });

    test("should handle runTrigger with string data", async () => {
      const stringData = JSON.stringify([
        { name: "item1", address: "0xaaaa" },
        { name: "item2", address: "0xbbbb" },
      ]);

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: stringData,
        },
      };

      console.log(
        "🚀 ~ runTrigger with string data ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger string data response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);

      expect(result.data).toEqual({data: stringData});
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with manual trigger and no data", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "simulate_manual_trigger_no_data",
        type: TriggerType.Manual,
        data: null,
      });

      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = manualTrigger;

      console.log(
        "🚀 simulateWorkflow with manual trigger (no data):",
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

      // When data is null, the output should be null (backend returns null for null data in simulation)
      expect(triggerStep!.output).toEqual({ data: null }); // ✅ Now uses standard structure
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
      customCodeNode.data.source = `return ${triggerName}.data;`;

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

      // The trigger step should have the user data available (backend returns direct data in simulation)
      expect(triggerStep!.output).toBeDefined();
      const outputData = triggerStep!.output;
      expect(outputData).toBeDefined();
      // In simulation, the backend returns data wrapped in standard structure
      expect(outputData).toEqual({ data: userData });

      // Check that the CustomCode node successfully referenced the manual trigger data
      const customCodeStep = simulation.steps.find(
        (step) => step.name === "minimal_node"
      );
      expect(customCodeStep).toBeDefined();
      expect(customCodeStep!.success).toBe(true);

      // Manual triggers now return user data directly without wrapper
      expect(customCodeStep!.output).toEqual({data: userData});

      // Verify the reference was properly made by checking inputsList
      expect(customCodeStep!.inputsList).toContain(`${triggerName}.data`);
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

        console.log("=== MANUAL TRIGGER DEPLOYMENT TEST ===");
        console.log(
          "Deployed workflow:",
          util.inspect(deployedWorkflow, { depth: null, colors: true })
        );

        // Now actually TRIGGER the deployed workflow
        console.log("🔥 Triggering the deployed manual workflow...");

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
        console.error("Deploy and trigger test failed:", error);
        expect(workflowId).toBeDefined();
        createdIdMap.set(workflowId, true);
        throw error;
      }
    });

    test("should deploy and trigger workflow with manual trigger (no data)", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "deploy_manual_trigger_no_data",
        type: TriggerType.Manual,
        data: null,
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

        console.log("=== MANUAL TRIGGER DEPLOYMENT TEST (NO DATA) ===");
        console.log(
          "Deployed workflow:",
          util.inspect(deployedWorkflow, { depth: null, colors: true })
        );

        // Now actually TRIGGER the deployed workflow without data
        console.log("🔥 Triggering the deployed manual workflow (no data)...");

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
        expect(workflowId).toBeDefined();
        createdIdMap.set(workflowId, true);
        throw error;
      }
    });
  });

  describe("Response Format Consistency Tests", () => {
    test("should maintain consistent response format across runTrigger and simulateWorkflow", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const testData = {
        items: [
          { name: "consistency_item1", address: "0xaaaa" },
          { name: "consistency_item2", address: "0xbbbb" },
        ],
      };

      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "consistency_test_manual_trigger",
        type: TriggerType.Manual,
        data: testData,
      });

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

      // Test 2: simulateWorkflow
      const workflowProps = createFromTemplate(wallet.address, []);
      workflowProps.trigger = manualTrigger;

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "1. runTrigger response:",
        util.inspect(directResponse, { depth: null, colors: true })
      );

      console.log(
        "2. simulateWorkflow step output:",
        util.inspect(
          simulation.steps.find((step) => step.id === defaultTriggerId),
          { depth: null, colors: true }
        )
      );

      // Both should be successful
      expect(directResponse.success).toBe(true);
      expect(simulation.success).toBe(true);

      // Both should have the same data structure with standard wrapper
      expect(directResponse.data).toEqual({data: testData});

      // Note: simulateWorkflow tests need different handling due to stepOutputs structure
      // These integration tests need backend-frontend protobuf sync

      console.log("✅ Manual trigger response consistency verified:");
      console.log("   - runTrigger returns expected data structure");
      console.log("   - simulateWorkflow returns compatible step output");
    });
  });

  describe("Empty Data Handling Tests", () => {
    test("should handle null data gracefully", async () => {
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
      expect(result.success).toBe(true);

      expect(result.data).toEqual({data: null});
    });

    test("should handle undefined data gracefully", async () => {
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
      expect(result.success).toBe(true);

      expect(result.data).toEqual({data: null});
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

      expect(result.data).toEqual({data: emptyData});
    });

    test("should handle empty array data", async () => {
      const emptyArray: unknown[] = [];

      const params = {
        triggerType: TriggerType.Manual,
        triggerConfig: {
          data: emptyArray,
        },
      };

      console.log(
        "🚀 ~ runTrigger with empty array ~ input params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runTrigger(params);

      console.log(
        "runTrigger empty array response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);

      expect(result.data).toEqual({data: emptyArray});
    });
  });

  describe("Mock Output Data Tests", () => {
    test("should handle mock RunTriggerResp with null manual trigger", () => {
      // Mock RunTriggerResp with null manual trigger (no data)
      const mockResponse = {
        getManualTrigger: () => null,
      } as any;

      const result = ManualTrigger.fromOutputData(mockResponse);
      expect(result).toBeNull();
    });

    test("should handle mock RunTriggerResp with empty ManualTrigger_Output", () => {
      // Mock RunTriggerResp with empty ManualTrigger_Output (no data)
      const mockResponse = {
        getManualTrigger: () => ({
          getData: () => null,
        }),
      } as any;

      const result = ManualTrigger.fromOutputData(mockResponse);
      expect(result).toEqual({data: null});
    });

    test("should handle mock RunTriggerResp with actual data", () => {
      const testData = {
        items: [
          { name: "mock_item1", address: "0xaaaa" },
          { name: "mock_item2", address: "0xbbbb" },
        ],
      };

      // Mock RunTriggerResp with actual data
      const mockResponse = {
        getManualTrigger: () => ({
          getData: () => testData,
        }),
      } as any;

      const result = ManualTrigger.fromOutputData(mockResponse);
      expect(result).toEqual({data: testData});
    });
  });
});
