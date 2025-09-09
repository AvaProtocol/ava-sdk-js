import util from "util";
import _ from "lodash";
import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import { NodeType, TriggerType } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  SaltGlobal,
  removeCreatedWorkflows,
  getBlockNumber,
  TIMEOUT_DURATION,
  SALT_BUCKET_SIZE,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { MOCKED_API_ENDPOINT_AGGREGATOR } from "../utils/mocks/api";

// Using mock API endpoint instead of external services
const MOCK_API_BASE_URL = MOCKED_API_ENDPOINT_AGGREGATOR;

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.RestAPI * SALT_BUCKET_SIZE;

interface RestApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  url: string;
  success: boolean;
  nodeId: string;
}

describe("RestAPI Node Tests", () => {
  let client: Client;
  let eoaAddress: string;

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

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should handle successful REST API GET call", async () => {
      const response = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: MOCK_API_BASE_URL + "/get",
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        },
        inputVariables: {},
      });

      console.log(
        "runNodeWithInputs server response:",
        util.inspect(response, { depth: null, colors: true })
      );

      expect(response.success).toBeTruthy();
      expect(response.error).toBe("");

      if (response.data) {
        const data = response.data as RestApiResponse;
        expect(data.status).toBe(200);
        expect(data.headers).toBeDefined();
        expect(data.data).toBeDefined();
        expect(data.url).toBe(MOCK_API_BASE_URL + "/get");
      }
    });

    test("should handle REST API POST call", async () => {
      const postData = { test: "data", timestamp: Date.now() };

      const response = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: MOCK_API_BASE_URL + "/post",
          method: "POST",
          body: JSON.stringify(postData),
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "AvaProtocol-SDK-Test",
          },
        },
        inputVariables: {},
      });

      expect(response.success).toBeTruthy();
      if (response.data) {
        const data = response.data as RestApiResponse;
        expect(data.status).toBe(200);
        // Mock API should return the posted data
        expect(data.data).toBeDefined();
      }
    });

    test("should handle REST API error responses", async () => {
      const response = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: MOCK_API_BASE_URL + "/status/404",
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        },
        inputVariables: {},
      });

      expect(response.success).toBeFalsy(); // HTTP 404 should be categorized as failed

      // NOTE: Backend currently doesn't populate detailed response data for failed runNodeWithInputs calls
      // This is different from simulateWorkflow which does return full status information
      expect(response.data).toEqual({}); // Empty object for failed requests via runNodeWithInputs
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with successful REST API call", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

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
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
      });

      expect(simulation.success).toBeTruthy();
      expect(simulation.steps).toHaveLength(2); // trigger + REST API node

      const restApiStep = simulation.steps.find(
        (step) => step.id === restApiNode.id
      );
            expect(restApiStep!.success).toBeTruthy();

      const output = restApiStep!.output as RestApiResponse;
      expect(output.status).toBe(200);
      expect(output.data).toBeDefined();
    });

    test("should simulate workflow with REST API error", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

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
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
      });

      const restApiStep = simulation.steps.find(
        (step) => step.id === restApiNode.id
      );
            expect(restApiStep!.success).toBeFalsy(); // HTTP 500 should be categorized as failed

      const output = restApiStep!.output as RestApiResponse;
      expect(output.status).toBe(500);
      expect(output.statusText).toBe("Internal Server Error");
      expect(output.data).toBeDefined();
      expect(output.data.error).toBe("Internal Server Error");
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with REST API call", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
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

        if (_.isUndefined(restApiStep)) {
          throw new Error("No corresponding REST API step found.");
        }

        expect(restApiStep.success).toBeTruthy();
        const output = restApiStep.output as RestApiResponse;
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
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
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
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
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

        // Compare response formats

        // All should have the same structure
        if (directResponse.data) {
          const directData = directResponse.data as RestApiResponse;
          expect(directData.status).toBe(200);
        }
        expect(simulatedStep?.output).toBeDefined();
        expect(executedStep?.output).toBeDefined();

        const directOutput = directResponse.data as RestApiResponse;
        const simulatedOutput = simulatedStep!.output as RestApiResponse;
        const executedOutput = executedStep!.output as RestApiResponse;

        // Verify consistent structure
        if (directOutput) {
          expect(directOutput.status).toBe(simulatedOutput.status);
          expect(simulatedOutput.status).toBe(executedOutput.status);

          expect(directOutput.headers).toBeDefined();
          expect(simulatedOutput.headers).toBeDefined();
          expect(executedOutput.headers).toBeDefined();

          // Mock API should return consistent data
          expect(directOutput.data).toBeDefined();
          expect(simulatedOutput.data).toBeDefined();
          expect(executedOutput.data).toBeDefined();
        }
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Empty Data Handling Tests", () => {
    test("should handle 204 No Content responses", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: MOCK_API_BASE_URL + "/status/204", // Mock API endpoint
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        },
        inputVariables: {},
      });

      console.log(
        "REST API 204 response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result.success).toBeTruthy();
      expect(result.error).toBe("");
      expect(result.data).toBeDefined();
      if (result.data && typeof result.data === "object") {
        const data = result.data as RestApiResponse;
        expect(data.status).toBe(204);
        expect(data.data).toBe("");
      }
    });

    test("should distinguish between empty data and server errors", async () => {
      // Test 204 No Content (empty but successful)
      const emptyResponse = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: MOCK_API_BASE_URL + "/status/204",
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        },
        inputVariables: {},
      });

      // Test 500 Internal Server Error
      const errorResponse = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: MOCK_API_BASE_URL + "/status/500",
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        },
        inputVariables: {},
      });

      // 204 should succeed (2xx), but 500 should fail (5xx)
      expect(emptyResponse.success).toBeTruthy();
      expect(errorResponse.success).toBeFalsy();

      if (emptyResponse.data && typeof emptyResponse.data === "object") {
        const emptyData = emptyResponse.data as RestApiResponse;
        expect(emptyData.status).toBe(204);
        expect(emptyData.data).toBe("");
      }

      // Note: 500 responses now fail (success=false) and may not include detailed response data
    });
  });
});
