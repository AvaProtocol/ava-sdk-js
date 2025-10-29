import _ from "lodash";
import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import {NodeType, TriggerType, ExecutionStatus} from "@avaprotocol/types";
import {
  getNextId,
  removeCreatedWorkflows,
  getBlockNumber,
  TIMEOUT_DURATION,
  getSettings,
  getSmartWallet,
  getClient,
  authenticateClient,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { MOCKED_API_ENDPOINT_AGGREGATOR } from "../utils/mocks/api";

// Using mock API endpoint instead of external services
const MOCK_API_BASE_URL = MOCKED_API_ENDPOINT_AGGREGATOR;

jest.setTimeout(TIMEOUT_DURATION);

const createdIdMap: Map<string, boolean> = new Map();

interface RestApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: Record<string, unknown> | string;
  url: string;
  success: boolean;
}

describe("RestAPI Node Tests", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should handle successful REST API GET call", async () => {
      const response = await client.runNodeWithInputs({
        node: {
          id: getNextId(),
          name: "rest_api_test",
          type: NodeType.RestAPI,
          data: {
          url: MOCK_API_BASE_URL + "/get",
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        }
        },
        inputVariables: {},
      });

      expect(response.success).toBeTruthy();
      expect(response.error).toBe("");
      expect(response.data).toBeDefined();
      expect(response.metadata).toBeDefined();
      
      // Data should contain only the actual response data
      expect(response.data).toBeDefined();
      
      // Metadata should contain status, headers, etc.
      const metadata = response.metadata as RestApiResponse;
      expect(metadata.status).toBe(200);
      expect(metadata.headers).toBeDefined();
      expect(metadata.data).toBeDefined();
      expect(metadata.url).toBe(MOCK_API_BASE_URL + "/get");
    });

    test("should handle REST API POST call", async () => {
      const postData = { test: "data", timestamp: Date.now() };

      const response = await client.runNodeWithInputs({
        node: {
          id: getNextId(),
          name: "rest_api_test",
          type: NodeType.RestAPI,
          data: {
          url: MOCK_API_BASE_URL + "/post",
          method: "POST",
          body: JSON.stringify(postData),
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "AvaProtocol-SDK-Test",
          },
        }
        },
        inputVariables: {},
      });

      expect(response.success).toBeTruthy();
      expect(response.data).toBeDefined();
      expect(response.metadata).toBeDefined();
      
      // Metadata should contain status, headers, etc.
      const metadata = response.metadata as RestApiResponse;
      expect(metadata.status).toBe(200);
      // Mock API should return the posted data
      expect(metadata.data).toBeDefined();
    });

    test("should handle REST API error responses", async () => {
      const response = await client.runNodeWithInputs({
        node: {
          id: getNextId(),
          name: "rest_api_test",
          type: NodeType.RestAPI,
          data: {
          url: MOCK_API_BASE_URL + "/status/404",
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        }
        },
        inputVariables: {},
      });

      expect(response.success).toBeFalsy(); // HTTP 404 should be categorized as failed

      // Verify that failed requests now return full response data (consistent with simulateWorkflow)
      expect(response.data).toBeDefined();
      expect(response.metadata).toBeDefined();
      
      // Status, headers, etc. should be in metadata
      const metadata = response.metadata as RestApiResponse;
      expect(metadata.status).toBe(404);
      expect(metadata.statusText).toBe("Not Found");
      expect(metadata.success).toBeFalsy(); // Response-level success should also be false
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with successful REST API call", async () => {
      const wallet = await getSmartWallet(client);

      const restApiNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_get_test",
        type: NodeType.RestAPI,
        data: {
          url: MOCK_API_BASE_URL + "/posts/1",
          method: "GET",
          body: "",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [restApiNode]);

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(2); // trigger + REST API node

        const restApiStep = simulation.steps.find(
          (step) => step.id === restApiNode.id
        );
        expect(restApiStep).toBeDefined();
        expect(restApiStep!.success).toBeTruthy();

      const output = restApiStep!.output as RestApiResponse;
      expect(output.status).toBe(200);
      expect(output.data).toBeDefined();
    });

    test("should simulate workflow with REST API error", async () => {
      const wallet = await getSmartWallet(client);

      const restApiNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_error_test",
        type: NodeType.RestAPI,
        data: {
          url: MOCK_API_BASE_URL + "/status/500",
          method: "GET",
          body: "",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [restApiNode]);

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      const restApiStep = simulation.steps.find(
        (step) => step.id === restApiNode.id
      );
      expect(restApiStep).toBeDefined();
      expect(restApiStep!.success).toBeFalsy(); // HTTP 500 should be categorized as failed

      const output = restApiStep!.output as RestApiResponse;
      expect(output.status).toBe(500);
      expect(output.statusText).toBe("Internal Server Error");
      expect(output.data).toBeDefined();
      expect((output.data as { error?: string }).error).toBe("Internal Server Error");
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with REST API call", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const restApiNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_get_test",
        type: NodeType.RestAPI,
        data: {
          url: MOCK_API_BASE_URL + "/get?deployed=true",
          method: "GET",
          body: "",
          headers: { "User-Agent": "AvaProtocol-SDK-Test-Deployed" },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [restApiNode]);

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

        const restApiStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === restApiNode.id
        );

        expect(restApiStep).toBeDefined();
        expect(restApiStep!.success).toBeTruthy();
        const output = restApiStep!.output as RestApiResponse;
        expect(output.status).toBe(200);
        expect(output.data).toBeDefined();
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
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const testEndpoint = MOCK_API_BASE_URL + "/posts/42";
      const restApiConfig = {
        url: testEndpoint,
        method: "GET" as const,
        body: "",
        headers: { "User-Agent": "AvaProtocol-SDK-Consistency-Test" },
      };

      // Test 1: runNodeWithInputs
      const directResponse = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: restApiConfig,
        inputVariables: {},
      });

      // Test 2: simulateWorkflow
      const restApiNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_test",
        type: NodeType.RestAPI,
        data: restApiConfig,
      });

      const workflowProps = createFromTemplate(wallet.address, [restApiNode]);
      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      const simulatedStep = simulation.steps.find(
        (step) => step.id === restApiNode.id
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
          (step) => step.id === restApiNode.id
        );

        // Compare response formats - all should have the same structure
        expect(directResponse.data).toBeDefined();
        expect(directResponse.metadata).toBeDefined();
        expect(simulatedStep).toBeDefined();
        expect(simulatedStep!.output).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.output).toBeDefined();

        // For runNodeWithInputs: status/headers are in metadata
        const directMetadata = directResponse.metadata as RestApiResponse;
        // For simulateWorkflow and deployed: status/headers are in output directly
        const simulatedOutput = simulatedStep!.output as RestApiResponse;
        const executedOutput = executedStep!.output as RestApiResponse;

        // Verify consistent structure
        expect(directMetadata.status).toBe(200);
        expect(directMetadata.status).toBe(simulatedOutput.status);
        expect(simulatedOutput.status).toBe(executedOutput.status);

        expect(directMetadata.headers).toBeDefined();
        expect(simulatedOutput.headers).toBeDefined();
        expect(executedOutput.headers).toBeDefined();

        // Mock API should return consistent data
        expect(directMetadata.data).toBeDefined();
        expect(simulatedOutput.data).toBeDefined();
        expect(executedOutput.data).toBeDefined();
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });


  describe("Options Field Tests", () => {
    test("should handle options field via runNodeWithInputs", async () => {
      const response = await client.runNodeWithInputs({
        node: {
          id: getNextId(),
          name: "rest_api_test",
          type: NodeType.RestAPI,
          data: {
          url: MOCK_API_BASE_URL + "/get",
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
          options: { summarize: true, maxTokens: 100 },
        }
        },
        inputVariables: {},
      });

      expect(response.success).toBeTruthy();
      expect(response.error).toBe("");
      expect(response.data).toBeDefined();
      expect(response.metadata).toBeDefined();
      
      const metadata = response.metadata as RestApiResponse;
      expect(metadata.status).toBe(200);
    });

    test("should handle options field via simulateWorkflow", async () => {
      const wallet = await getSmartWallet(client);

      const restApiNode = NodeFactory.create({
        id: getNextId(),
        name: "options_simulate_test",
        type: NodeType.RestAPI,
        data: {
          url: MOCK_API_BASE_URL + "/posts/1",
          method: "GET",
          body: "",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
          options: { summarize: true, format: "compact" },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [restApiNode]);

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(2);

      const restApiStep = simulation.steps.find(
        (step) => step.id === restApiNode.id
      );
      expect(restApiStep).toBeDefined();
      expect(restApiStep!.success).toBeTruthy();

      const output = restApiStep!.output as RestApiResponse;
      expect(output.status).toBe(200);
      expect(output.data).toBeDefined();
    });

    test("should handle options field via deployed workflow execution", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const restApiNode = NodeFactory.create({
        id: getNextId(),
        name: "options_deployed_test",
        type: NodeType.RestAPI,
        data: {
          url: MOCK_API_BASE_URL + "/get?deployed=true",
          method: "GET",
          body: "",
          headers: { "User-Agent": "AvaProtocol-SDK-Test-Options" },
          options: { summarize: true, maxLength: 500 },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [restApiNode]);

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

        const restApiStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === restApiNode.id
        );

        expect(restApiStep).toBeDefined();
        expect(restApiStep!.success).toBeTruthy();
        const output = restApiStep!.output as RestApiResponse;
        expect(output.status).toBe(200);
        expect(output.data).toBeDefined();
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });

    test("should handle workflow without options field", async () => {
      const wallet = await getSmartWallet(client);

      const restApiNode = NodeFactory.create({
        id: getNextId(),
        name: "no_options_test",
        type: NodeType.RestAPI,
        data: {
          url: MOCK_API_BASE_URL + "/get",
          method: "GET",
          body: "",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
          // No options field
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [restApiNode]);

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      expect(simulation.status).toBe(ExecutionStatus.Success);
      const restApiStep = simulation.steps.find(
        (step) => step.id === restApiNode.id
      );
      expect(restApiStep).toBeDefined();
      expect(restApiStep!.success).toBeTruthy();
    });
  });

  describe("Empty Data Handling Tests", () => {
    test("should handle 204 No Content responses", async () => {
      const result = await client.runNodeWithInputs({
        node: {
          id: getNextId(),
          name: "rest_api_test",
          type: NodeType.RestAPI,
          data: {
          url: MOCK_API_BASE_URL + "/status/204", // Mock API endpoint
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        }
        },
        inputVariables: {},
      });


      expect(result.success).toBe(true);
      expect(result.error).toBe("");
      expect(result.data).toBeDefined();
      expect(result.metadata).toBeDefined();
      
      // Status should be in metadata
      const metadata = result.metadata as RestApiResponse;
      expect(metadata.status).toBe(204);
      expect(metadata.data).toBe("");
    });

    test("should distinguish between empty data and server errors", async () => {
      // Test 204 No Content (empty but successful)
      const emptyResponse = await client.runNodeWithInputs({
        node: {
          id: getNextId(),
          name: "rest_api_test",
          type: NodeType.RestAPI,
          data: {
          url: MOCK_API_BASE_URL + "/status/204",
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        }
        },
        inputVariables: {},
      });

      // Test 500 Internal Server Error
      const errorResponse = await client.runNodeWithInputs({
        node: {
          id: getNextId(),
          name: "rest_api_test",
          type: NodeType.RestAPI,
          data: {
          url: MOCK_API_BASE_URL + "/status/500",
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        }
        },
        inputVariables: {},
      });

      // 204 should succeed (2xx), but 500 should fail (5xx)
      expect(emptyResponse.success).toBeTruthy();
      expect(errorResponse.success).toBeFalsy();

      expect(emptyResponse.data).toBeDefined();
      expect(emptyResponse.metadata).toBeDefined();
      const emptyMetadata = emptyResponse.metadata as RestApiResponse;
      expect(emptyMetadata.status).toBe(204);
      expect(emptyMetadata.data).toBe("");

      // 500 responses now fail (success=false) but still include response data
      expect(errorResponse.data).toBeDefined();
      expect(errorResponse.metadata).toBeDefined();
      const errorMetadata = errorResponse.metadata as RestApiResponse;
      expect(errorMetadata.status).toBe(500);
      expect(errorMetadata.statusText).toBe("Internal Server Error");
    });
  });
});
