import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {TriggerType, NodeType, CustomCodeLang, ExecutionStatus} from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  TIMEOUT_DURATION,
  getNextId,
  SaltGlobal,
  SALT_BUCKET_SIZE,
  getSettings,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

describe("SimulateWorkflow", () => {
  let eoaAddress: string;
  let client: Client;
  let saltIndex = SaltGlobal.SimulateWorkflow * SALT_BUCKET_SIZE;

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

  describe("Manual Trigger with Custom Code", () => {
    test("should simulate a manual trigger with custom code successfully", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: nodeId,
          name: "customCode",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source:
              "return { message: 'Task executed successfully', timestamp: Date.now() };",
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      const wallet = await client.getWallet({ salt: String(saltIndex++) });
      const result = await client.simulateWorkflow({
        trigger,
        nodes,
        edges,
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      expect(result).toBeDefined();
      expect(result.status).toBe(ExecutionStatus.Success);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify unified step structure
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);
      expect(triggerStep.name).toBe("manualTrigger");

      const nodeStep = result.steps[1];
      expect(nodeStep.id).toBe(nodeId);
      expect(nodeStep.type).toBe(NodeType.CustomCode);
      expect(nodeStep.name).toBe("customCode");
    });

    test("should handle simulation with input variables", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: nodeId,
          name: "customCode",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source: "return { greeting: 'Hello World!', calculated: 42 * 2 };",
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      const wallet = await client.getWallet({ salt: String(saltIndex++) });
      const result = await client.simulateWorkflow({
        trigger,
        nodes,
        edges,
        inputVariables: {
          name: "World",
          value: 42,
          settings: getSettings(wallet.address),
        },
      });

      expect(result).toBeDefined();
      expect(result.status).toBe(ExecutionStatus.Success);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify step structure with input variables
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);

      const nodeStep = result.steps[1];
      expect(nodeStep.id).toBe(nodeId);
      expect(nodeStep.type).toBe(NodeType.CustomCode);
      expect(nodeStep.success).toBeTruthy();
    });
  });

  describe("Fixed Time Trigger with REST API", () => {
    test("should simulate a fixed time trigger with REST API call", async () => {
      const timestamp = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "fixedTimeTrigger",
        type: TriggerType.FixedTime,
        data: {
          config: {
            timestamp: timestamp,
          },
        },
      };

      const nodes = [
        {
          id: nodeId,
          name: "restAPICall",
          type: NodeType.RestAPI,
          data: {
            url: "https://mock-api.ap-aggregator.local/posts/1",
            method: "GET",
            body: "",
            headers: {},
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      const wallet = await client.getWallet({ salt: String(saltIndex++) });
      const result = await client.simulateWorkflow({
        trigger,
        nodes,
        edges,
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      expect(result).toBeDefined();
      expect(result.status).toBe(ExecutionStatus.Success);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify unified step structure
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.FixedTime);
      expect(triggerStep.name).toBe("fixedTimeTrigger");

      const nodeStep = result.steps[1];
      expect(nodeStep.id).toBe(nodeId);
      expect(nodeStep.type).toBe(NodeType.RestAPI);
      expect(nodeStep.name).toBe("restAPICall");
    });
  });

  describe("Multi-node Workflow", () => {
    test("should simulate a workflow with multiple connected nodes", async () => {
      const triggerId = getNextId();
      const node1Id = getNextId();
      const node2Id = getNextId();

      const trigger = {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: node1Id,
          name: "customCode1",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source: "return { step1: 'completed', data: 'from step 1' };",
          },
        },
        {
          id: node2Id,
          name: "customCode2",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source:
              "return { step2: 'completed', previousData: manualTrigger.data };",
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: node1Id,
        },
        {
          id: getNextId(),
          source: node1Id,
          target: node2Id,
        },
      ];

      const result = await client.simulateWorkflow({
        trigger,
        nodes,
        edges,
        inputVariables: {},
      });

      expect(result).toBeDefined();
      expect(result.status).toBe(ExecutionStatus.Success);
      expect(result.steps).toHaveLength(3); // trigger + 2 nodes

      // Verify all steps have unified structure
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);
      expect(triggerStep.name).toBe("manualTrigger");

      const node1Step = result.steps[1];
      expect(node1Step.id).toBe(node1Id);
      expect(node1Step.type).toBe(NodeType.CustomCode);
      expect(node1Step.name).toBe("customCode1");
      expect(node1Step.success).toBeTruthy();

      const node2Step = result.steps[2];
      expect(node2Step.id).toBe(node2Id);
      expect(node2Step.type).toBe(NodeType.CustomCode);
      expect(node2Step.name).toBe("customCode2");
      expect(node2Step.success).toBeTruthy();
    });
  });

  describe("Error Handling", () => {
    test("should handle simulation errors gracefully", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: nodeId,
          name: "customCode",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source: "throw new Error('Intentional error for testing');",
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      try {
        const wallet = await client.getWallet({ salt: String(saltIndex++) });
        const result = await client.simulateWorkflow({
          trigger,
          nodes,
          edges,
          inputVariables: {
            settings: getSettings(wallet.address),
          },
        });

        // If we get here, the simulation succeeded despite the error
        expect(result).toBeDefined();
        // Should be PartialSuccess since trigger succeeds but node fails
        expect(result.status).toBe(ExecutionStatus.PartialSuccess);
        expect(result.error).toBeDefined();

        // Even failed simulations should have unified step structure
        expect(result.steps).toHaveLength(2); // trigger + node
        const triggerStep = result.steps[0];
        expect(triggerStep.id).toBe(triggerId);
        expect(triggerStep.type).toBe(TriggerType.Manual);

        const nodeStep = result.steps[1];
        expect(nodeStep.id).toBe(nodeId);
        expect(nodeStep.type).toBe(NodeType.CustomCode);
        expect(nodeStep.success).toBeFalsy();
      } catch (error: unknown) {
        // The server treats JavaScript errors as simulation failures
        expect(error).toBeDefined();
        expect((error as Error).message).toContain(
          "partialSuccess"
        );
      }
    });
  });

  describe("Data Field Access", () => {
    test("should allow setting data on triggers and nodes and accessing it from subsequent nodes", async () => {
      const triggerId = getNextId();
      const restApiNodeId = getNextId();
      const customCodeNodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: {
          timezone: "UTC",
          priority: "high",
          description: "Test workflow with input fields",
        },
      };

      const nodes = [
        {
          id: restApiNodeId,
          name: "rest_api_node",
          type: NodeType.RestAPI,
          data: {
            url: "https://mock-api.ap-aggregator.local/posts/1",
            method: "GET",
            body: "",
            headers: {
              "User-Agent": "AvaProtocol-SDK-Test",
              Accept: "application/json",
            },
          },
        },
        {
          id: customCodeNodeId,
          name: "input_processor",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source: `
              // Access trigger data and previous node output
              const triggerData = manualTrigger.data;
              const restApiOutput = rest_api_node.data;
              
              return {
                dataAccessTest: {
                  message: "Can access trigger and node data correctly",
                  triggerDataAccessible: !!triggerData,
                  triggerTimezone: triggerData?.timezone,
                  triggerPriority: triggerData?.priority,
                  restApiOutputReceived: !!restApiOutput
                },
                status: "success",
                timestamp: Date.now(),
                processingMode: "validation",
                logLevel: "debug"
              };
            `,
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: restApiNodeId,
        },
        {
          id: getNextId(),
          source: restApiNodeId,
          target: customCodeNodeId,
        },
      ];

      const wallet = await client.getWallet({ salt: String(saltIndex++) });
      const result = await client.simulateWorkflow({
        trigger,
        nodes,
        edges,
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      expect(result).toBeDefined();
      expect(result.status).toBe(ExecutionStatus.Success);
      expect(result.steps).toHaveLength(3); // trigger + 2 nodes

      // Verify trigger step
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);
      expect(triggerStep.name).toBe("manualTrigger");

      // Verify REST API step
      const restApiStep = result.steps[1];
      expect(restApiStep.id).toBe(restApiNodeId);
      expect(restApiStep.type).toBe(NodeType.RestAPI);
      expect(restApiStep.name).toBe("rest_api_node");
      expect(restApiStep.success).toBeTruthy();

      // Verify custom code step that accesses input data
      const customCodeStep = result.steps[2];
      expect(customCodeStep.id).toBe(customCodeNodeId);
      expect(customCodeStep.type).toBe(NodeType.CustomCode);
      expect(customCodeStep.name).toBe("input_processor");
      expect(customCodeStep.success).toBeTruthy();

      // The custom code step should have processed the trigger data successfully
      // We can verify this by checking if the step completed successfully
      // and examining any logs or output data if available
    });

    test("should handle workflows with trigger data access", async () => {
      const triggerId = getNextId();
      const processorNodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: {
          data: {
            environment: "test",
            version: "1.0.0",
          },
        },
      };

      const nodes = [
        {
          id: processorNodeId,
          name: "data_processor",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source: `
              // Access trigger data which now contains environment and version
              const triggerData = manualTrigger.data;
              
              return {
                dataAccessTest: {
                  message: "Can access trigger data correctly",
                  triggerDataAccessible: !!triggerData,
                  triggerEnvironment: triggerData?.environment,
                  triggerVersion: triggerData?.version
                },
                status: "success",
                timestamp: Date.now(),
                maxRetries: 5,
                timeout: 60000,
                enableLogging: true
              };
            `,
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: processorNodeId,
        },
      ];

      const wallet = await client.getWallet({ salt: String(saltIndex++) });
      const result = await client.simulateWorkflow({
        trigger,
        nodes,
        edges,
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      expect(result).toBeDefined();
      expect(result.status).toBe(ExecutionStatus.Success);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify both steps completed successfully
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.success).toBeTruthy();

      const processorStep = result.steps[1];
      expect(processorStep.id).toBe(processorNodeId);
      expect(processorStep.success).toBeTruthy();
    });
  });
});
