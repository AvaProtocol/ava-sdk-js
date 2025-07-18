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
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
// Using real httpbin.org endpoints for testing
const HTTPBIN_BASE_URL = "https://httpbin.org";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateSecret * 1000 + 600;

describe("RestAPI Node Tests", () => {
  let client: Client;
  let eoaAddress: string;

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
    test("should handle successful REST API GET call", async () => {
      const response = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: HTTPBIN_BASE_URL + "/get",
          method: "GET",
          headers: { "User-Agent": "AvaProtocol-SDK-Test" },
        },
        inputVariables: {},
      });

      console.log(
        "runNodeWithInputs server response:",
        util.inspect(response, { depth: null, colors: true })
      );

      expect(response.success).toBe(true);
      expect(response.error).toBe("");
      expect(response.nodeId).toBeDefined();

      if (response.data) {
        expect(response.data.statusCode).toBe(200);
        expect(response.data.headers).toBeDefined();
        expect(response.data.body).toBeDefined();
        // httpbin.org/get returns JSON with url field
        expect(response.data.body.url).toBe(
          HTTPBIN_BASE_URL + "/get"
        );
      }
    });

    test("should handle REST API POST call", async () => {
      const postData = { test: "data", timestamp: Date.now() };

      const response = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: HTTPBIN_BASE_URL + "/post",
          method: "POST",
          body: JSON.stringify(postData),
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "AvaProtocol-SDK-Test",
          },
        },
        inputVariables: {},
      });



      expect(response.success).toBe(true);
      if (response.data) {
        expect(response.data.statusCode).toBe(200);
        // httpbin.org/post returns JSON with json field containing the posted data
        expect(response.data.body.json).toEqual(postData);
      }
    });

    test("should handle REST API error responses", async () => {
      const response = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: HTTPBIN_BASE_URL + "/status/404",
          method: "GET",
          headersMap: [["User-Agent", "AvaProtocol-SDK-Test"]],
        },
        inputVariables: {},
      });



      expect(response.success).toBe(true); // HTTP call succeeds even with 404
      if (response.data) {
        expect(response.data.statusCode).toBe(404);
      }
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
          url: "https://jsonplaceholder.typicode.com/posts/1",
          method: "GET",
          body: "",
          headersMap: [["User-Agent", "AvaProtocol-SDK-Test"]],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [restApiNode]);

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + REST API node

      const restApiStep = simulation.steps.find(
        (step) => step.id === restApiNode.id
      );
      expect(restApiStep).toBeDefined();
      expect(restApiStep!.success).toBe(true);

      const output = restApiStep!.output as any;
      expect(output.statusCode).toBe(200);
      expect(output.body.id).toBe(1);
    });

    test("should simulate workflow with REST API error", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const restApiNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_error_test",
        type: NodeType.RestAPI,
        data: {
          url: HTTPBIN_BASE_URL + "/status/500",
          method: "GET",
          body: "",
          headersMap: [["User-Agent", "AvaProtocol-SDK-Test"]],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [restApiNode]);

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );



      const restApiStep = simulation.steps.find(
        (step) => step.id === restApiNode.id
      );
      expect(restApiStep).toBeDefined();
      expect(restApiStep!.success).toBe(true); // HTTP call succeeds even with 500

      const output = restApiStep!.output as any;
      expect(output.statusCode).toBe(500);
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
          url: HTTPBIN_BASE_URL + "/get?deployed=true",
          method: "GET",
          body: "",
          headersMap: [["User-Agent", "AvaProtocol-SDK-Test-Deployed"]],
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



        expect(restApiStep.success).toBe(true);
        const output = restApiStep.output as any;
        expect(output.statusCode).toBe(200);
        // httpbin.org/get returns JSON with args field containing query parameters
        expect(output.body.args.deployed).toBe("true");
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

      const testEndpoint = "https://jsonplaceholder.typicode.com/posts/42";
      const restApiConfig = {
        url: testEndpoint,
        method: "GET" as const,
        body: "",
        headersMap: [["User-Agent", "AvaProtocol-SDK-Consistency-Test"]] as [
          string,
          string
        ][],
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
      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

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
          expect(directResponse.data.statusCode).toBe(200);
        }
        expect(simulatedStep?.output).toBeDefined();
        expect(executedStep?.output).toBeDefined();

        const directOutput = directResponse.data;
        const simulatedOutput = simulatedStep!.output as any;
        const executedOutput = executedStep!.output as any;

        // Verify consistent structure
        if (directOutput) {
          expect(directOutput.statusCode).toBe(simulatedOutput.statusCode);
          expect(simulatedOutput.statusCode).toBe(executedOutput.statusCode);

          expect(directOutput.headers).toBeDefined();
          expect(simulatedOutput.headers).toBeDefined();
          expect(executedOutput.headers).toBeDefined();

          // jsonplaceholder.typicode.com/posts/42 returns JSON with id field
          expect(directOutput.body.id).toBe(42);
          expect(simulatedOutput.body.id).toBe(42);
          expect(executedOutput.body.id).toBe(42);
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
          url: HTTPBIN_BASE_URL + "/status/204", // Returns empty response with 204 status
          method: "GET",
          headersMap: [["User-Agent", "AvaProtocol-SDK-Test"]],
        },
        inputVariables: {},
      });

      console.log(
        "REST API 204 response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result.success).toBe(true);
      expect(result.error).toBe("");
      expect(result.data).toBeDefined();
      if (result.data && typeof result.data === "object") {
        expect(result.data.statusCode).toBe(204);
        expect(result.data.body).toBe("");
      }
    });

    test("should distinguish between empty data and server errors", async () => {
      // Test 204 No Content (empty but successful)
      const emptyResponse = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: HTTPBIN_BASE_URL + "/status/204",
          method: "GET",
          headersMap: [["User-Agent", "AvaProtocol-SDK-Test"]],
        },
        inputVariables: {},
      });

      // Test 500 Internal Server Error
      const errorResponse = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: {
          url: HTTPBIN_BASE_URL + "/status/500",
          method: "GET",
          headersMap: [["User-Agent", "AvaProtocol-SDK-Test"]],
        },
        inputVariables: {},
      });

      // Both should succeed at HTTP level but have different status codes
      expect(emptyResponse.success).toBe(true);
      expect(errorResponse.success).toBe(true);

      if (emptyResponse.data && typeof emptyResponse.data === "object") {
        expect(emptyResponse.data.statusCode).toBe(204);
        expect(emptyResponse.data.body).toBe("");
      }

      if (errorResponse.data && typeof errorResponse.data === "object") {
        expect(errorResponse.data.statusCode).toBe(500);
      }
    });
  });
});
