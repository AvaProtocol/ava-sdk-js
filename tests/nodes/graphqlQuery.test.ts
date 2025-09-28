import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import {
  NodeType,
  RunNodeWithInputsResponse,
  TriggerType,
  ExecutionStatus
} from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  TIMEOUT_DURATION,
  SaltGlobal,
  removeCreatedWorkflows,
  getBlockNumber,
  SALT_BUCKET_SIZE,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.GraphQLQuery * SALT_BUCKET_SIZE;

/**
 * ⚠️  IMPORTANT: This test file is EXCLUSIVELY for testing gateway.thegraph.com GraphQL API
 *
 * DO NOT USE ANY OTHER GraphQL ENDPOINTS in this file:
 * - ❌ NO countries.trevorblades.com
 * - ❌ NO api.spacex.land/graphql
 * - ❌ NO other public GraphQL APIs
 *
 * ✅ ONLY USE: gateway.thegraph.com URLs for success cases
 * ✅ ONLY USE: mock-api.ap-aggregator.local for error cases (aligned with backend)
 *
 * This file tests The Graph API key authentication and subgraph querying functionality.
 */

// Mock API endpoint constant (aligned with EigenLayer-AVS backend)
const MOCK_API_ENDPOINT = "https://mock-api.ap-aggregator.local";

// Success cases: Real The Graph Uniswap V3 GraphQL queries (with API key authentication)
const THEGRAPH_UNISWAP_V3_QUERY = {
  url: "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
  query:
    "query { factories(first: 5) { id poolCount txCount totalVolumeUSD } bundles(first: 5) { id ethPriceUSD } }",
  variables: {},
  description: "Real The Graph Uniswap V3 Subgraph Query",
};

const THEGRAPH_UNISWAP_V3_WITH_VARIABLES = {
  url: "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
  query:
    "query GetFactoryById($id: String!) { factory(id: $id) { id poolCount txCount totalVolumeUSD } }",
  variables: { id: "0x1F98431c8aD98523631AE4a59f267346ea31F984" },
  description: "Real The Graph Uniswap V3 Query with Variables",
};

// GraphQL endpoint configurations for testing
const GRAPHQL_ENDPOINTS = {
  // Use a mock endpoint that we know works in tests (similar to RestAPI tests)
  MOCK_ENDPOINT: {
    url: `${MOCK_API_ENDPOINT}/graphql`,
    query: "query { test { id name value } }",
    variables: {},
    description: "Mock GraphQL Query",
  },
  // Query with variables
  MOCK_WITH_VARIABLES: {
    url: `${MOCK_API_ENDPOINT}/graphql`,
    query: "query GetTest($first: Int!) { test(first: $first) { id name } }",
    variables: { first: "2" },
    description: "Mock GraphQL with Variables",
  },
  // Error cases: Use mock API endpoints that return errors (aligned with backend)
  MOCK_ERROR_400: {
    url: `${MOCK_API_ENDPOINT}/status/400`,
    query: "query { error }",
    variables: {},
    description: "Mock GraphQL Error (400 Bad Request)",
  },

  MOCK_ERROR_500: {
    url: `${MOCK_API_ENDPOINT}/status/500`,
    query: "query { serverError }",
    variables: {},
    description: "Mock GraphQL Error (500 Internal Server Error)",
  },

  INVALID_ENDPOINT: {
    url: "https://invalid-domain-that-does-not-exist.local/graphql",
    query: "query { test }",
    variables: {},
    description: "Invalid GraphQL Endpoint (Network Error)",
  },
};

describe("GraphQL Query Node Tests", () => {
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
    test("should fail runNodeWithInputs with network error from mock endpoint", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const endpoint = GRAPHQL_ENDPOINTS.MOCK_ENDPOINT;

      const params = {
        nodeType: NodeType.GraphQLQuery,
        nodeConfig: {
          url: endpoint.url,
          query: endpoint.query,
          variables: {},
        },
        inputVariables: {
          workflowContext: {
            id: "test-graphql-basic-id",
            chainId: null,
            name: "GraphQL Basic Test",
            userId: "test-user",
            eoaAddress: eoaAddress,
            runner: wallet.address,
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            maxExecution: 0,
            status: "draft",
            completedAt: null,
            lastRanAt: null,
            executionCount: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with GraphQL query ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result: RunNodeWithInputsResponse = await client.runNodeWithInputs(
        params
      );

      console.log(
        "🚀 ~ runNodeWithInputs with GraphQL query ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Verify the response structure (should fail due to network but show GraphQL implementation works)
            expect(typeof result.success).toBe("boolean");
      

      // The request should fail due to network (mock endpoint doesn't exist)
      // but this proves GraphQL node creation and execution pipeline is working
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("mock-api.ap-aggregator.local"); // Network error proves it tried to execute

      console.log(
        "✅ GraphQL node creation and execution pipeline is working correctly!"
      );
      console.log("   - Node was created successfully");
      console.log("   - GraphQL processor attempted HTTP request");
      console.log(
        "   - Network error is expected (mock endpoint doesn't exist)"
      );
    }, 15000); // 15 second timeout for network request

    test("should fail runNodeWithInputs with variables and return network error", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const endpoint = GRAPHQL_ENDPOINTS.MOCK_WITH_VARIABLES;

      const params = {
        nodeType: NodeType.GraphQLQuery,
        nodeConfig: {
          url: endpoint.url,
          query: endpoint.query,
          variables: {
            first: endpoint.variables.first,
          },
        },
        inputVariables: {
          workflowContext: {
            id: "test-graphql-variables-id",
            name: "GraphQL Variables Test",
            userId: "test-user",
            eoaAddress: eoaAddress,
            runner: wallet.address,
          },
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with GraphQL variables ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result: RunNodeWithInputsResponse = await client.runNodeWithInputs(
        params
      );

      console.log(
        "🚀 ~ runNodeWithInputs with GraphQL variables ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

            expect(result.success).toBe(false); // Network error expected for mock endpoint
      expect(result.error).toContain(
        "dial tcp: lookup mock-api.ap-aggregator.local: no such host"
      );

      console.log(
        "✅ GraphQL node with variables execution pipeline is working correctly!"
      );
      console.log("    - Node was created successfully");
      console.log(
        "    - GraphQL processor attempted HTTP request with variables"
      );
      console.log(
        "    - Network error is expected (mock endpoint doesn't exist)"
      );
    }, 15000);

    test("should fail runNodeWithInputs gracefully with invalid domain endpoint", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const endpoint = GRAPHQL_ENDPOINTS.INVALID_ENDPOINT;

      const params = {
        nodeType: NodeType.GraphQLQuery,
        nodeConfig: {
          url: endpoint.url,
          query: endpoint.query,
          variables: {},
        },
        inputVariables: {
          workflowContext: {
            id: "test-graphql-error-id",
            name: "GraphQL Error Test",
            userId: "test-user",
            eoaAddress: eoaAddress,
            runner: wallet.address,
          },
        },
      };

      const result = await client.runNodeWithInputs(params);

      console.log(
        "❌ GraphQL error result:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should handle the error gracefully
            expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error.length).toBeGreaterThan(0);
    }, 15000);

    test("should fail runNodeWithInputs gracefully with empty query configuration", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const params = {
        nodeType: NodeType.GraphQLQuery,
        nodeConfig: {
          url: GRAPHQL_ENDPOINTS.MOCK_ENDPOINT.url,
          query: "", // Empty query should be rejected
          variables: {},
        },
        inputVariables: {
          workflowContext: {
            id: "test-graphql-empty-query-id",
            name: "GraphQL Empty Query Test",
            userId: "test-user",
            eoaAddress: eoaAddress,
            runner: wallet.address,
          },
        },
      };

      const result = await client.runNodeWithInputs(params);

      console.log(
        "❌ GraphQL empty query result:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should reject empty query
            expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("url and query is required");
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should successfully simulate workflow with The Graph GraphQL query", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Use the constant for success case (real The Graph with API key)
      const endpoint = THEGRAPH_UNISWAP_V3_QUERY;

      const graphqlNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_graphql_test",
        type: NodeType.GraphQLQuery,
        data: {
          url: endpoint.url,
          query: endpoint.query,
          variables: {},
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [graphqlNode]);

      console.log(
        "🚀 ~ simulateWorkflow with GraphQL query ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
      });

      console.log(
        "🚀 ~ simulateWorkflow with GraphQL query ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      // With API key configured, this should succeed
      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(2); // trigger + graphql node

      const graphqlStep = simulation.steps.find(
        (step) => step.id === graphqlNode.id
      );
            expect(graphqlStep!.success).toBeTruthy(); // Must succeed with API key
      expect(graphqlStep!.error).toBe(""); // No error expected

      console.log("✅ The Graph GraphQL succeeded with API key authentication");

      // Verify the GraphQL response data for The Graph Uniswap V3
      const output = graphqlStep!.output as any;
      expect(output).toBeDefined();

      // The query should return factories and bundles
      expect(output).toHaveProperty("factories");
      expect(Array.isArray(output.factories)).toBe(true);
      expect(output.factories.length).toBeGreaterThan(0);
      expect(output.factories[0]).toHaveProperty("id");
      expect(output.factories[0]).toHaveProperty("poolCount");
      expect(output.factories[0]).toHaveProperty("txCount");
      expect(output.factories[0]).toHaveProperty("totalVolumeUSD");

      expect(output).toHaveProperty("bundles");
      expect(Array.isArray(output.bundles)).toBe(true);
      expect(output.bundles.length).toBeGreaterThan(0);
      expect(output.bundles[0]).toHaveProperty("id");
      expect(output.bundles[0]).toHaveProperty("ethPriceUSD");

      console.log(
        "✅ The Graph Uniswap V3 GraphQL workflow simulation succeeded!"
      );
      console.log(`   - Retrieved ${output.factories.length} factories`);
      console.log(`   - First factory ID: ${output.factories[0].id}`);
      console.log(
        `   - Retrieved ${output.bundles.length} bundles with ETH price data`
      );
      console.log(
        `   - Current ETH price: $${parseFloat(
          output.bundles[0].ethPriceUSD
        ).toFixed(2)}`
      );
    }, 15000);

    test("should successfully simulate workflow with The Graph GraphQL variables", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Use the constant for success case with variables (real The Graph with API key)
      const endpoint = THEGRAPH_UNISWAP_V3_WITH_VARIABLES;

      const graphqlNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_graphql_variables",
        type: NodeType.GraphQLQuery,
        data: {
          url: endpoint.url,
          query: endpoint.query,
          variables: endpoint.variables,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [graphqlNode]);

      console.log(
        "🚀 ~ simulateWorkflow with GraphQL variables ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
      });

      console.log(
        "🚀 ~ simulateWorkflow with GraphQL variables ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.status).toBe(ExecutionStatus.Success);
      const graphqlStep = simulation.steps.find(
        (step) => step.id === graphqlNode.id
      );
            expect(graphqlStep!.success).toBeTruthy(); // Should succeed with API key
      expect(graphqlStep!.error).toBe(""); // No error expected

      const output = graphqlStep!.output as any;
      expect(output).toBeDefined(); // Should have valid output data

      console.log("✅ GraphQL workflow simulation with variables succeeded!");
      console.log("    - Variables were passed correctly to The Graph API");
      console.log("    - API key authentication worked correctly");
    }, 15000);
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should successfully deploy and trigger workflow with The Graph GraphQL query", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;
      const endpoint = THEGRAPH_UNISWAP_V3_QUERY;

      try {
        const graphqlNode = NodeFactory.create({
          id: getNextId(),
          name: "deploy_graphql_test",
          type: NodeType.GraphQLQuery,
          data: {
            url: endpoint.url,
            query: endpoint.query,
            variables: {},
          },
        });

        const workflowProps = createFromTemplate(wallet.address, [graphqlNode]);

        workflowProps.trigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval: triggerInterval },
        });

        console.log(
          "🚀 ~ deploy + trigger workflow with GraphQL query ~ workflowProps:",
          util.inspect(workflowProps, { depth: null, colors: true })
        );

        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        const triggerParams = {
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        };

        console.log(
          "🚀 ~ triggerWorkflow ~ params:",
          util.inspect(triggerParams, { depth: null, colors: true })
        );

        await client.triggerWorkflow(triggerParams);

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const graphqlStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === graphqlNode.id
        );

        if (_.isUndefined(graphqlStep)) {
          throw new Error("No corresponding GraphQL step found.");
        }

        expect(graphqlStep.success).toBeTruthy(); // Should succeed with The Graph API
        expect(graphqlStep.error).toBe(""); // No error expected
        console.log(
          "Deploy + trigger GraphQL step output:",
          util.inspect(graphqlStep.output, { depth: null, colors: true })
        );

        const output = graphqlStep.output as any;
        expect(output).toBeDefined(); // Should have valid output data from The Graph
        expect(output).toHaveProperty("factories");
        expect(output).toHaveProperty("bundles");

        console.log(
          "✅ GraphQL deployed workflow execution succeeded with The Graph API!"
        );
        console.log("    - Workflow was deployed successfully");
        console.log("    - GraphQL step executed and retrieved real data");
        console.log(
          "    - The Graph API key authentication worked correctly"
        );
      } finally {
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
            createdIdMap.delete(workflowId);
          } catch (error) {
            console.warn("Failed to cleanup workflow:", workflowId, error);
          }
        }
      }
    }, 30000); // 30 second timeout for full deployment and execution

    test("should successfully deploy and trigger workflow with The Graph GraphQL variables", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;
      const endpoint = THEGRAPH_UNISWAP_V3_WITH_VARIABLES;

      try {
        const graphqlNode = NodeFactory.create({
          id: getNextId(),
          name: "deploy_graphql_variables",
          type: NodeType.GraphQLQuery,
          data: {
            url: endpoint.url,
            query: endpoint.query,
            variables: endpoint.variables,
          },
        });

        const workflowProps = createFromTemplate(wallet.address, [graphqlNode]);

        workflowProps.trigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval: triggerInterval },
        });

        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        const triggerParams = {
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        };

        await client.triggerWorkflow(triggerParams);

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const graphqlStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === graphqlNode.id
        );

                expect(graphqlStep!.success).toBeTruthy(); // Should succeed with The Graph API
        expect(graphqlStep!.error).toBe(""); // No error expected

        const output = graphqlStep!.output as any;
        expect(output).toBeDefined(); // Should have valid output data from The Graph
        expect(output).toHaveProperty("factory");
        expect(output.factory).toHaveProperty("id");
        expect(output.factory).toHaveProperty("poolCount");

        console.log(
          "✅ GraphQL deployed workflow with variables succeeded with The Graph API!"
        );
        console.log("    - Workflow was deployed successfully with variables");
        console.log("    - GraphQL step executed and retrieved real data");
        console.log(
          "    - The Graph API key authentication worked correctly"
        );
      } finally {
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
            createdIdMap.delete(workflowId);
          } catch (error) {
            console.warn("Failed to cleanup workflow:", workflowId, error);
          }
        }
      }
    }, 30000);
  });

  describe("Response Format Consistency Tests", () => {
    test("should return consistent error format across all execution methods with mock endpoint", async () => {
      const endpoint = GRAPHQL_ENDPOINTS.MOCK_ENDPOINT;
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      let workflowId: string | undefined;

      try {
        // 1. Test runNodeWithInputs
        const runNodeParams = {
          nodeType: NodeType.GraphQLQuery,
          nodeConfig: {
            url: endpoint.url,
            query: endpoint.query,
            variables: {},
          },
          inputVariables: {
            workflowContext: {
              id: "consistency-test-id",
              name: "GraphQL Consistency Test",
              userId: "test-user",
              eoaAddress: eoaAddress,
              runner: wallet.address,
            },
          },
        };

        const runNodeResult = await client.runNodeWithInputs(runNodeParams);
        expect(runNodeResult.success).toBeFalsy(); // Network error expected

        // 2. Test simulateWorkflow
        const graphqlNode = NodeFactory.create({
          id: getNextId(),
          name: "consistency_graphql_test",
          type: NodeType.GraphQLQuery,
          data: {
            url: endpoint.url,
            query: endpoint.query,
            variables: {},
          },
        });

        const workflowProps = createFromTemplate(wallet.address, [graphqlNode]);
        const simulation = await client.simulateWorkflow({
          ...client.createWorkflow(workflowProps).toJson(),
          inputVariables: {
            workflowContext: {
              eoaAddress,
              runner: wallet.address,
            },
          },
        });

        expect(simulation.status).toBe(ExecutionStatus.PartialSuccess); // Network error expected for mock endpoint
        const simGraphqlStep = simulation.steps.find(
          (step) => step.id === graphqlNode.id
        );
                expect(simGraphqlStep!.success).toBeFalsy(); // Network error expected

        // 3. Test deployed workflow execution
        const currentBlockNumber = await getBlockNumber();
        const triggerInterval = 5;

        workflowProps.trigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval: triggerInterval },
        });

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

        const deployedGraphqlStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === graphqlNode.id
        );

                expect(deployedGraphqlStep!.success).toBeFalsy(); // Network error expected

        // 4. Compare all three outputs for consistency
        const runNodeOutput = runNodeResult.data as any;
        const simOutput = simGraphqlStep!.output as any;
        const deployedOutput = deployedGraphqlStep!.output as any;

        console.log("🔍 Consistency Check:");
        console.log(
          "runNodeWithInputs output:",
          util.inspect(runNodeOutput, { depth: 3 })
        );
        console.log(
          "simulateWorkflow output:",
          util.inspect(simOutput, { depth: 3 })
        );
        console.log(
          "deployed workflow output:",
          util.inspect(deployedOutput, { depth: 3 })
        );

        // All outputs should be objects (not arrays)
        expect(typeof runNodeOutput).toBe("object");
        expect(typeof simOutput).toBe("object");
        expect(typeof deployedOutput).toBe("object");

        expect(Array.isArray(runNodeOutput)).toBe(false);
        expect(Array.isArray(simOutput)).toBe(false);
        expect(Array.isArray(deployedOutput)).toBe(false);

        // All outputs should be null/undefined for network errors (consistent behavior)
        expect(runNodeOutput).toBeNull();
        expect(simOutput).toBeNull();
        expect(deployedOutput).toBeNull();

        console.log(
          "✅ All execution methods have consistent error handling behavior:"
        );
        console.log("    - runNodeWithInputs: returns null for network errors");
        console.log("    - simulateWorkflow: returns null for network errors");
        console.log("    - deployed workflow: returns null for network errors");
      } finally {
        if (workflowId) {
          try {
            await client.deleteWorkflow(workflowId);
            createdIdMap.delete(workflowId);
          } catch (error) {
            console.warn("Failed to cleanup workflow:", workflowId, error);
          }
        }
      }
    }, 45000); // 45 second timeout for full consistency test
  });

  describe("Real GraphQL Success Tests", () => {
    test("should successfully query The Graph Uniswap V3 API", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const endpoint = THEGRAPH_UNISWAP_V3_QUERY;

      const params = {
        nodeType: NodeType.GraphQLQuery,
        nodeConfig: {
          url: endpoint.url,
          query: endpoint.query,
          variables: {},
        },
        inputVariables: {
          workflowContext: {
            id: "test-real-thegraph-id",
            name: "Real The Graph GraphQL Test",
            userId: "test-user",
            eoaAddress: eoaAddress,
            runner: wallet.address,
          },
        },
      };

      console.log(
        "🚀 ~ Real The Graph GraphQL query ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result: RunNodeWithInputsResponse = await client.runNodeWithInputs(
        params
      );

      console.log(
        "🚀 ~ Real The Graph GraphQL query ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should succeed with real data
            expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      const data = result.data as Record<string, any>;
      expect(data).toHaveProperty("factories");
      expect(data).toHaveProperty("bundles");
      expect(Array.isArray(data.factories)).toBe(true);
      expect(Array.isArray(data.bundles)).toBe(true);
      expect(data.factories.length).toBeGreaterThan(0);
      expect(data.bundles.length).toBeGreaterThan(0);
      expect(data.factories[0]).toHaveProperty("id");
      expect(data.factories[0]).toHaveProperty("poolCount");
      expect(data.bundles[0]).toHaveProperty("ethPriceUSD");

      console.log("✅ Real The Graph GraphQL query succeeded!");
      console.log(`   - Retrieved ${data.factories.length} factories`);
      console.log(`   - First factory ID: ${data.factories[0].id}`);
    }, 30000); // 30 second timeout for real network requests

    test("should successfully query The Graph Uniswap V3 API with variables", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const endpoint = THEGRAPH_UNISWAP_V3_WITH_VARIABLES;

      const params = {
        nodeType: NodeType.GraphQLQuery,
        nodeConfig: {
          url: endpoint.url,
          query: endpoint.query,
          variables: endpoint.variables,
        },
        inputVariables: {
          workflowContext: {
            id: "test-real-thegraph-variables-id",
            name: "Real The Graph GraphQL Test with Variables",
            userId: "test-user",
            eoaAddress: eoaAddress,
            runner: wallet.address,
          },
        },
      };

      const result: RunNodeWithInputsResponse = await client.runNodeWithInputs(
        params
      );

      console.log(
        "🚀 ~ Real The Graph GraphQL query with variables ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should succeed with real data
            expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      const data = result.data as Record<string, any>;
      expect(data).toHaveProperty("factory");
      expect(data.factory).toBeDefined();
      expect(data.factory).toHaveProperty("id");
      expect(data.factory).toHaveProperty("poolCount");
      expect(data.factory).toHaveProperty("txCount");
      expect(data.factory).toHaveProperty("totalVolumeUSD");

      console.log("✅ Real The Graph GraphQL query with variables succeeded!");
      console.log(`   - Retrieved factory: ${data.factory.id}`);
      console.log(`   - Pool count: ${data.factory.poolCount}`);
    }, 30000);
  });

  describe("Error Handling Tests", () => {
    test("should fail gracefully with GraphQL server error (400 Bad Request)", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const params = {
        nodeType: NodeType.GraphQLQuery,
        nodeConfig: {
          url: GRAPHQL_ENDPOINTS.MOCK_ERROR_400.url, // Use mock API that returns 400 error
          query: GRAPHQL_ENDPOINTS.MOCK_ERROR_400.query,
          variables: {},
        },
        inputVariables: {
          workflowContext: {
            id: "test-graphql-malformed-id",
            name: "GraphQL Malformed Test",
            userId: "test-user",
            eoaAddress: eoaAddress,
            runner: wallet.address,
          },
        },
      };

      const result = await client.runNodeWithInputs(params);

      console.log(
        "❌ GraphQL server error result:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should handle HTTP 400 errors gracefully
            expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("400"); // Should contain HTTP status code
    }, 15000);

    test("should fail gracefully with missing URL configuration error", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const params = {
        nodeType: NodeType.GraphQLQuery,
        nodeConfig: {
          url: "", // Empty URL should be rejected
          query: "query { test }",
          variables: {},
        },
        inputVariables: {
          workflowContext: {
            id: "test-graphql-no-url-id",
            name: "GraphQL No URL Test",
            userId: "test-user",
            eoaAddress: eoaAddress,
            runner: wallet.address,
          },
        },
      };

      const result = await client.runNodeWithInputs(params);

      // Should reject empty URL
            expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("url and query is required");
    });

    test("should fail gracefully with network connection error from invalid domain", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const params = {
        nodeType: NodeType.GraphQLQuery,
        nodeConfig: {
          url: GRAPHQL_ENDPOINTS.INVALID_ENDPOINT.url, // Invalid domain that doesn't exist
          query: GRAPHQL_ENDPOINTS.INVALID_ENDPOINT.query,
          variables: {},
        },
        inputVariables: {
          workflowContext: {
            id: "test-graphql-network-error-id",
            name: "GraphQL Network Error Test",
            userId: "test-user",
            eoaAddress: eoaAddress,
            runner: wallet.address,
          },
        },
      };

      const result = await client.runNodeWithInputs(params);

      console.log(
        "❌ GraphQL network error result:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should handle network errors gracefully
            expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toMatch(/dial tcp|no such host|network/i); // Network error patterns
    }, 15000);
  });
});
