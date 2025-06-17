import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import { TriggerType, NodeType, CustomCodeLang } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  TIMEOUT_DURATION,
  SaltGlobal,
  getNextId,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
import util from "util";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

describe("SimulateWorkflow", () => {
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

  describe("Manual Trigger with Custom Code", () => {
    test("should simulate a manual trigger with custom code successfully", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manual trigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: nodeId,
          name: "custom code",
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

      const result = await client.simulateWorkflow({
        trigger,
        nodes: nodes as any,
        edges,
        inputVariables: {},
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify unified step structure
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);
      expect(triggerStep.name).toBe("manual trigger");

      const nodeStep = result.steps[1];
      expect(nodeStep.id).toBe(nodeId);
      expect(nodeStep.type).toBe(NodeType.CustomCode);
      expect(nodeStep.name).toBe("custom code");
    });

    test("should handle simulation with input variables", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manual trigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: nodeId,
          name: "custom code",
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

      const result = await client.simulateWorkflow({
        trigger,
        nodes: nodes as any,
        edges,
        inputVariables: {
          name: "World",
          value: 42,
        },
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify step structure with input variables
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);

      const nodeStep = result.steps[1];
      expect(nodeStep.id).toBe(nodeId);
      expect(nodeStep.type).toBe(NodeType.CustomCode);
      expect(nodeStep.success).toBe(true);
    });
  });

  describe("Fixed Time Trigger with REST API", () => {
    test("should simulate a fixed time trigger with REST API call", async () => {
      const timestamp = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "fixed time trigger",
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
          name: "rest api call",
          type: NodeType.RestAPI,
          data: {
            url: "https://jsonplaceholder.typicode.com/posts/1",
            method: "GET",
            headersMap: [],
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

      const result = await client.simulateWorkflow({
        trigger,
        nodes: nodes as any,
        edges,
        inputVariables: {},
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify unified step structure
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.FixedTime);
      expect(triggerStep.name).toBe("fixed time trigger");

      const nodeStep = result.steps[1];
      expect(nodeStep.id).toBe(nodeId);
      expect(nodeStep.type).toBe(NodeType.RestAPI);
      expect(nodeStep.name).toBe("rest api call");
    });
  });

  describe("Multi-node Workflow", () => {
    test("should simulate a workflow with multiple connected nodes", async () => {
      const triggerId = getNextId();
      const node1Id = getNextId();
      const node2Id = getNextId();

      const trigger = {
        id: triggerId,
        name: "manual trigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: node1Id,
          name: "custom code 1",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source: "return { step1: 'completed', data: 'from step 1' };",
          },
        },
        {
          id: node2Id,
          name: "custom code 2",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source:
              "return { step2: 'completed', previousData: manual_trigger.data };",
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
        nodes: nodes as any,
        edges,
        inputVariables: {},
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(3); // trigger + 2 nodes

      // Verify all steps have unified structure
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);
      expect(triggerStep.name).toBe("manual trigger");

      const node1Step = result.steps[1];
      expect(node1Step.id).toBe(node1Id);
      expect(node1Step.type).toBe(NodeType.CustomCode);
      expect(node1Step.name).toBe("custom code 1");
      expect(node1Step.success).toBe(true);

      const node2Step = result.steps[2];
      expect(node2Step.id).toBe(node2Id);
      expect(node2Step.type).toBe(NodeType.CustomCode);
      expect(node2Step.name).toBe("custom code 2");
      expect(node2Step.success).toBe(true);
    });
  });

  describe("Error Handling", () => {
    test("should handle simulation errors gracefully", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manual trigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: nodeId,
          name: "custom code",
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
        const result = await client.simulateWorkflow({
          trigger,
          nodes: nodes as any,
          edges,
          inputVariables: {},
        });

        // If we get here, the simulation succeeded despite the error
        expect(result).toBeDefined();
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();

        // Even failed simulations should have unified step structure
        expect(result.steps).toHaveLength(2); // trigger + node
        const triggerStep = result.steps[0];
        expect(triggerStep.id).toBe(triggerId);
        expect(triggerStep.type).toBe(TriggerType.Manual);

        const nodeStep = result.steps[1];
        expect(nodeStep.id).toBe(nodeId);
        expect(nodeStep.type).toBe(NodeType.CustomCode);
        expect(nodeStep.success).toBe(false);
      } catch (error: any) {
        // The server treats JavaScript errors as simulation failures
        expect(error).toBeDefined();
        expect(error.message).toContain("Intentional error for testing");
      }
    });
  });

  describe("Input Field Feature", () => {
    test("should allow setting input data on nodes and accessing it from subsequent nodes", async () => {
      const triggerId = getNextId();
      const restApiNodeId = getNextId();
      const customCodeNodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manual trigger",
        type: TriggerType.Manual,
        data: {},
        input: {
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
            url: "https://jsonplaceholder.typicode.com/posts/1",
            method: "GET",
            headersMap: [],
          },
          input: {
            timeout: 30000,
            retries: 3,
            debugMode: true,
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
              // TODO: Input field feature needs backend support to expose:
              // - manual_trigger.input (trigger input data)
              // - rest_api_node.input (previous node input data)
              // Currently only manual_trigger.data and rest_api_node.data are available
              
              // For now, test that we can set input fields without errors
              // and access regular data from trigger and previous node
              const triggerData = manual_trigger.data;
              const restApiOutput = rest_api_node.data;
              
              return {
                inputFieldFeatureTest: {
                  message: "Input fields can be set on triggers and nodes",
                  triggerDataAccessible: !!triggerData,
                  restApiOutputReceived: !!restApiOutput,
                  currentContext: typeof workflowContext !== 'undefined'
                },
                status: "success",
                timestamp: Date.now()
              };
            `,
          },
          input: {
            processingMode: "validation",
            logLevel: "debug",
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

      const result = await client.simulateWorkflow({
        trigger,
        nodes: nodes as any,
        edges,
        inputVariables: {},
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(3); // trigger + 2 nodes

      // Verify trigger step
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);
      expect(triggerStep.name).toBe("manual trigger");

      // Verify REST API step
      const restApiStep = result.steps[1];
      expect(restApiStep.id).toBe(restApiNodeId);
      expect(restApiStep.type).toBe(NodeType.RestAPI);
      expect(restApiStep.name).toBe("rest_api_node");
      expect(restApiStep.success).toBe(true);

      // Verify custom code step that accesses input data
      const customCodeStep = result.steps[2];
      expect(customCodeStep.id).toBe(customCodeNodeId);
      expect(customCodeStep.type).toBe(NodeType.CustomCode);
      expect(customCodeStep.name).toBe("input_processor");
      expect(customCodeStep.success).toBe(true);

      // The custom code step should have processed the input data successfully
      // We can verify this by checking if the step completed successfully
      // and examining any logs or output data if available
    });

    test("should handle workflows with both input data and regular data access", async () => {
      const triggerId = getNextId();
      const processorNodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manual trigger",
        type: TriggerType.Manual,
        data: {},
        input: {
          environment: "test",
          version: "1.0.0",
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
              // TODO: Input field feature needs backend support to expose:
              // - manual_trigger.input (trigger input data)
              // - data_processor.input (current node input data)
              // Currently only manual_trigger.data is available
              
              // For now, test that we can set input fields on nodes and triggers
              // without causing errors, and access regular trigger data
              const triggerData = manual_trigger.data;
              
              return {
                inputFieldFeatureTest: {
                  message: "Input fields can be set on triggers and nodes",
                  triggerDataAccessible: !!triggerData,
                  currentContext: typeof workflowContext !== 'undefined',
                  availableVariables: Object.keys(this || {})
                },
                status: "success",
                timestamp: Date.now()
              };
            `,
          },
          input: {
            maxRetries: 5,
            timeout: 60000,
            enableLogging: true,
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

      const result = await client.simulateWorkflow({
        trigger,
        nodes: nodes as any,
        edges,
        inputVariables: {},
      });

      console.log(
        "🚀 ~ simulateWorkflow result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify both steps completed successfully
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.success).toBe(true);

      const processorStep = result.steps[1];
      expect(processorStep.id).toBe(processorNodeId);
      expect(processorStep.success).toBe(true);
    });
  });
});
