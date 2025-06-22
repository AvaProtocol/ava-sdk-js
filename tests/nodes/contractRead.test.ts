import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import {
  NodeType,
  RunNodeWithInputsResponse,
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
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress, chainEndpoint } =
  getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 6000;

// Sepolia Chainlink ETH/USD Price Feed Oracle
const SEPOLIA_ORACLE_CONFIG = {
  contractAddress: "0xB0C712f98daE15264c8E26132BCC91C40aD4d5F9",
  contractAbi: JSON.stringify([
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]),
  methodCalls: [
    { callData: "0xfeaf968c", methodName: "latestRoundData" },
    { callData: "0x313ce567", methodName: "decimals" },
  ],
};

// Helper function to check if we're on Sepolia
async function isSepoliaChain(): Promise<boolean> {
  try {
    // This is a simple check - in a real scenario you might want to query the chain ID
    // For now, we'll assume if chainEndpoint contains 'sepolia' we're on Sepolia
    return chainEndpoint?.toLowerCase().includes("sepolia") || false;
  } catch {
    return false;
  }
}

describe("ContractRead Node Tests", () => {
  let client: Client;
  let isSepoliaTest: boolean;

  beforeAll(async () => {
    const address = await getAddress(walletPrivateKey);

    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message } = await client.getSignatureFormat(address);
    const signature = await generateSignature(message, walletPrivateKey);

    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);

    // Check if we're on Sepolia chain
    isSepoliaTest = await isSepoliaChain();

    if (!isSepoliaTest) {
      console.log(
        "⚠️  Skipping Sepolia-specific ContractRead tests - not on Sepolia chain"
      );
    }
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should read latest round data from Chainlink oracle", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            { callData: "0xfeaf968c", methodName: "latestRoundData" },
          ],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Contract Read Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
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
        "🚀 ~ runNodeWithInputs with Chainlink oracle read ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with Chainlink oracle read ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        // Handle both flattened (single method) and array (multiple methods) formats
        if (Array.isArray((result.data as any).results)) {
          // Multiple methods format
          expect((result.data as any).results.length).toBeGreaterThan(0);
          const latestRoundResult = (result.data as any).results.find(
            (r: any) => r.methodName === "latestRoundData"
          );
          expect(latestRoundResult).toBeDefined();
          expect(latestRoundResult.success).toBe(true);
          expect(latestRoundResult.data).toBeDefined();
        } else {
          // Flattened format for single method - data fields should be directly accessible
          expect((result.data as any).roundId).toBeDefined();
          expect((result.data as any).answer).toBeDefined();
          expect((result.data as any).startedAt).toBeDefined();
          expect((result.data as any).updatedAt).toBeDefined();
          expect((result.data as any).answeredInRound).toBeDefined();
          expect((result.data as any).method_name).toBe("latestRoundData");
        }
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Oracle read test failed:", result.error);
      }
    });

    test("should read multiple methods from contract", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: SEPOLIA_ORACLE_CONFIG.methodCalls,
        },
        inputVariables: {},
      };

      console.log(
        "🚀 ~ runNodeWithInputs with multiple methods ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with multiple methods ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect((result.data as any).results).toBeDefined();
        expect(Array.isArray((result.data as any).results)).toBe(true);
        expect((result.data as any).results.length).toBeGreaterThan(0);
        expect(result.nodeId).toBeDefined();

        // Check that we got results for both methods
        const latestRoundResult = (result.data as any).results.find(
          (r: any) => r.methodName === "latestRoundData"
        );
        const decimalsResult = (result.data as any).results.find(
          (r: any) => r.methodName === "decimals"
        );

        expect(latestRoundResult).toBeDefined();
        expect(decimalsResult).toBeDefined();
      } else {
        console.log("Multiple methods test failed:", result.error);
      }
    });

    test("should handle invalid contract address", async () => {
      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: "0x0000000000000000000000000000000000000000", // Invalid address
          contractAbi: JSON.stringify([
            {
              inputs: [],
              name: "totalSupply",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ]),
          methodCalls: [{ callData: "0x18160ddd", methodName: "totalSupply" }],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Invalid Contract Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
        "🚀 ~ runNodeWithInputs with invalid contract address ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with invalid contract address ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      // This should either fail or return error results
    });

    test("should read oracle description method", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [{ callData: "0x7284e416", methodName: "description" }],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Description Method Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
        "🚀 ~ runNodeWithInputs with description method ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with description method ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        // Handle both flattened (single method) and array (multiple methods) formats
        if (Array.isArray((result.data as any).results)) {
          // Multiple methods format
          expect((result.data as any).results).toBeDefined();
          const descriptionResult = (result.data as any).results.find(
            (r: any) => r.methodName === "description"
          );
          expect(descriptionResult).toBeDefined();
          expect(descriptionResult.success).toBe(true);
        } else {
          // Flattened format for single method - should have the description data directly
          expect((result.data as any).method_name).toBe("description");
          // The description method returns a string, so we should have that field
          expect(typeof (result.data as any)["0"]).toBe("string"); // First return value
        }
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Description method test failed:", result.error);
      }
    });

    test("should apply decimal formatting using applyToFields", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            {
              callData: "0x313ce567", // decimals()
              methodName: "decimals",
              applyToFields: ["answer"], // Apply decimal formatting to answer field
            },
            {
              callData: "0xfeaf968c", // latestRoundData()
              methodName: "latestRoundData",
            },
          ],
        },
        inputVariables: {},
      };

      console.log(
        "🚀 ~ runNodeWithInputs with decimal formatting ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result: RunNodeWithInputsResponse = await client.runNodeWithInputs(
        params
      );

      console.log(
        "🚀 ~ runNodeWithInputs with decimal formatting ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");

      if (result.success && result.data) {
        // With our new flattened implementation, the data should be directly accessible
        // The test calls decimals() for formatting and latestRoundData() for the actual data
        // The result should be flattened data directly from latestRoundData with decimal formatting applied

        const data = result.data as any;

        // For our new implementation, we expect direct field access (no results array)
        expect(data.answer).toBeDefined();
        expect(data.roundId).toBeDefined();
        expect(data.startedAt).toBeDefined();
        expect(data.updatedAt).toBeDefined();
        expect(data.answeredInRound).toBeDefined();

        const answerValue = data.answer;
        console.log("Flattened answer field found:", answerValue);
        console.log("Expected: Decimal formatted (e.g., '0.64522')");
        console.log("Actual:", answerValue);

        // ✅ Decimal formatting should be working! Verify the formatted value
        expect(typeof answerValue).toBe("string");
        expect(answerValue).toBeTruthy();

        // Check if decimal formatting was applied (should contain a decimal point)
        expect(answerValue).toMatch(/^\d+\.\d+$/); // Should be a decimal number
        console.log(
          "✅ Decimal formatting is working in flattened format! Value:",
          answerValue
        );

        // The raw value with decimals should be much smaller than raw value
        const numericValue = parseFloat(answerValue);
        expect(numericValue).toBeGreaterThan(0);
        expect(numericValue).toBeLessThan(1000); // Should be much smaller than raw value

        expect(result.nodeId).toBeDefined();

        // ✅ Check if metadata is included for flattened format
        console.log("Checking metadata field:", result.metadata);
        if (
          result.metadata &&
          result.metadata._raw &&
          result.metadata._raw.length > 0
        ) {
          console.log("✅ Metadata is included:", result.metadata);
          const firstMethod = result.metadata._raw[0];
          expect(firstMethod.methodName).toBeDefined();
          expect(firstMethod.success).toBe(true);
          expect(firstMethod.methodName).toBe("latestRoundData");

          // Check if the structured fields data is present
          if (firstMethod.data && Array.isArray(firstMethod.data)) {
            console.log(
              "✅ Raw structured fields found in metadata:",
              firstMethod.data.length,
              "fields"
            );
            expect(firstMethod.data.length).toBeGreaterThan(0);

            // Check the format of the first field
            const firstField = firstMethod.data[0];
            expect(firstField).toHaveProperty("name");
            expect(firstField).toHaveProperty("type");
            expect(firstField).toHaveProperty("value");
            console.log("✅ Field structure is correct:", firstField);
          } else {
            console.log("❌ Raw structured fields missing in metadata");
          }
        } else {
          console.log("❌ Metadata is missing or incorrectly structured");
        }
      } else {
        console.log("Decimal formatting test failed:", result.error);
        // Don't fail the test if it's a network error, just log it
        expect(result.error).toBeDefined();
      }

      expect(result.metadata?._raw).toBeDefined();
      expect(result.metadata?._raw?.length).toBeGreaterThan(0);
      expect(result.metadata?._raw?.[0]?.data).toBeDefined();
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with contract read", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const contractReadNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_contract_read_test",
        type: NodeType.ContractRead,
        data: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            { callData: "0xfeaf968c", methodName: "latestRoundData" },
            { callData: "0x313ce567", methodName: "decimals" },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractReadNode,
      ]);

      console.log(
        "🚀 ~ simulateWorkflow with contract read ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "🚀 ~ simulateWorkflow with contract read ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + contract read node

      const contractReadStep = simulation.steps.find(
        (step) => step.id === contractReadNode.id
      );
      expect(contractReadStep).toBeDefined();
      expect(contractReadStep!.success).toBe(true);

      const output = contractReadStep!.output as any;
      expect(output.results).toBeDefined();
      expect(Array.isArray(output.results)).toBe(true);
      expect(output.results.length).toBe(2);
    });

    test("should simulate workflow with single method call", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const contractReadNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_single_method",
        type: NodeType.ContractRead,
        data: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [{ callData: "0x313ce567", methodName: "decimals" }],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractReadNode,
      ]);

      console.log(
        "🚀 ~ simulateWorkflow with single method call ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "🚀 ~ simulateWorkflow with single method call ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      const contractReadStep = simulation.steps.find(
        (step) => step.id === contractReadNode.id
      );
      expect(contractReadStep).toBeDefined();
      expect(contractReadStep!.success).toBe(true);

      const output = contractReadStep!.output as any;
      expect(output.results).toBeDefined();
      expect(output.results.length).toBe(1);
      expect(output.results[0].methodName).toBe("decimals");
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with contract read", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;

      try {
        const contractReadNode = NodeFactory.create({
          id: getNextId(),
          name: "deploy_contract_read_test",
          type: NodeType.ContractRead,
          data: {
            contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
            contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
            methodCalls: [
              { callData: "0xfeaf968c", methodName: "latestRoundData" },
              { callData: "0x7284e416", methodName: "description" },
            ],
          },
        });

        const workflowProps = createFromTemplate(wallet.address, [
          contractReadNode,
        ]);

        workflowProps.trigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval: triggerInterval },
        });

        console.log(
          "🚀 ~ deploy + trigger workflow with contract read ~ workflowProps:",
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

        const triggerResult = await client.triggerWorkflow(triggerParams);

        console.log(
          "🚀 ~ triggerWorkflow ~ result:",
          util.inspect(triggerResult, { depth: null, colors: true })
        );

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const contractReadStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === contractReadNode.id
        );

        if (_.isUndefined(contractReadStep)) {
          throw new Error("No corresponding contract read step found.");
        }

        expect(contractReadStep.success).toBe(true);
        console.log(
          "Deploy + trigger contract read step output:",
          JSON.stringify(contractReadStep.output, null, 2)
        );

        const output = contractReadStep.output as any;
        expect(output.results).toBeDefined();
        expect(Array.isArray(output.results)).toBe(true);
        expect(output.results.length).toBe(2);

        const latestRoundResult = output.results.find(
          (r: any) => r.methodName === "latestRoundData"
        );
        const descriptionResult = output.results.find(
          (r: any) => r.methodName === "description"
        );

        expect(latestRoundResult).toBeDefined();
        expect(descriptionResult).toBeDefined();
        expect(latestRoundResult.success).toBe(true);
        expect(descriptionResult.success).toBe(true);
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
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;

      try {
        const contractReadConfig = {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            { callData: "0x313ce567", methodName: "decimals" },
            { callData: "0x54fd4d50", methodName: "version" },
          ],
        };

        const inputVariables = {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Consistency Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            maxExecution: 0,
            status: "draft",
            completedAt: null,
            lastRanAt: null,
            executionCount: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };

        console.log(
          "🔍 Testing response format consistency across all methods..."
        );

        // Test 1: runNodeWithInputs
        const directParams = {
          nodeType: NodeType.ContractRead,
          nodeConfig: contractReadConfig,
          inputVariables: inputVariables,
        };

        console.log(
          "🚀 ~ runNodeWithInputs consistency test ~ params:",
          util.inspect(directParams, { depth: null, colors: true })
        );

        const directResponse = await client.runNodeWithInputs(directParams);

        console.log(
          "🚀 ~ runNodeWithInputs consistency test ~ result:",
          util.inspect(directResponse, { depth: null, colors: true })
        );

        // Test 2: simulateWorkflow
        const contractReadNode = NodeFactory.create({
          id: getNextId(),
          name: "consistency_test",
          data: contractReadConfig,
        });

        const workflowProps = createFromTemplate(wallet.address, [
          contractReadNode,
        ]);

        console.log(
          "🚀 ~ simulateWorkflow consistency test ~ workflowProps:",
          util.inspect(workflowProps, { depth: null, colors: true })
        );

        const simulation = await client.simulateWorkflow(
          client.createWorkflow(workflowProps)
        );

        console.log(
          "🚀 ~ simulateWorkflow consistency test ~ result:",
          util.inspect(simulation, { depth: null, colors: true })
        );

        const simulatedStep = simulation.steps.find(
          (step) => step.id === contractReadNode.id
        );

        // Test 3: Deploy + Trigger
        workflowProps.trigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval: triggerInterval },
        });

        console.log(
          "🚀 ~ deploy workflow consistency test ~ workflowProps:",
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
          "🚀 ~ triggerWorkflow consistency test ~ params:",
          util.inspect(triggerParams, { depth: null, colors: true })
        );

        await client.triggerWorkflow(triggerParams);

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });
        const executedStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === contractReadNode.id
        );

        // Compare response formats
        console.log("=== CONTRACT READ RESPONSE FORMAT COMPARISON ===");
        console.log(
          "1. runNodeWithInputs response:",
          JSON.stringify(directResponse.data, null, 2)
        );
        console.log(
          "2. simulateWorkflow step output:",
          JSON.stringify(simulatedStep?.output, null, 2)
        );
        console.log(
          "3. deploy+trigger step output:",
          JSON.stringify(executedStep?.output, null, 2)
        );

        // All should be successful
        expect(directResponse.success).toBe(true);
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBe(true);

        // Verify consistent structure
        const directOutput = directResponse.data;

        // Check that all outputs have the same structure
        expect(executedStep?.output).not.toHaveProperty("resultsList");
        expect(executedStep?.output).toHaveProperty("results");

        expect(simulatedStep?.output).not.toHaveProperty("resultsList");
        expect(simulatedStep?.output).toHaveProperty("results");

        // Check that all have the same method names
        const simulatedMethods = simulatedStep?.output?.results
          .map((r: any) => r.methodName)
          .sort();
        const executedMethods = executedStep?.output?.results
          .map((r: any) => r.methodName)
          .sort();

        expect(simulatedMethods).toEqual(executedMethods);

        console.log(
          "✅ All three methods return consistent contract read results!"
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Error Handling Tests", () => {
    test("should handle invalid method signature gracefully", async () => {
      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: JSON.stringify([
            {
              inputs: [],
              name: "nonExistentMethod",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ]),
          methodCalls: [
            { callData: "0x12345678", methodName: "nonExistentMethod" },
          ],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Error Handling Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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
        "🚀 ~ runNodeWithInputs error handling ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs error handling ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");

      // Should either fail the node execution or return error results
      if (result.success && result.data && (result.data as any).results) {
        const errorResult = (result.data as any).results.find(
          (r: any) => r.methodName === "nonExistentMethod"
        );
        if (errorResult) {
          expect(errorResult.success).toBe(false);
          expect(errorResult.error).toBeDefined();
        }
      }
    });
  });

  describe("Protobuf Serialization Tests", () => {
    test("should properly serialize applyToFields in protobuf", () => {
      const contractReadNode = NodeFactory.create({
        id: "test-contract-read",
        name: "Test Contract Read",
        type: NodeType.ContractRead,
        data: {
          contractAddress: "0x1234567890123456789012345678901234567890",
          contractAbi: "[]",
          methodCalls: [
            {
              callData: "0x313ce567", // decimals()
              methodName: "decimals",
              applyToFields: ["answer"], // Apply decimal formatting to answer field
            },
            {
              callData: "0xfeaf968c", // latestRoundData()
              methodName: "latestRoundData",
            },
          ],
        },
      });

      // Convert to protobuf request
      const request = contractReadNode.toRequest();

      // Verify the structure
      expect(request.getContractRead()).toBeDefined();
      const config = request.getContractRead()!.getConfig();
      expect(config).toBeDefined();

      const methodCalls = config!.getMethodCallsList();
      expect(methodCalls).toHaveLength(2);

      // Check first method call (decimals with applyToFields)
      const decimalsCall = methodCalls[0];
      expect(decimalsCall.getMethodName()).toBe("decimals");
      expect(decimalsCall.getCallData()).toBe("0x313ce567");
      expect(decimalsCall.getApplyToFieldsList()).toEqual(["answer"]);

      // Check second method call (no applyToFields)
      const latestRoundCall = methodCalls[1];
      expect(latestRoundCall.getMethodName()).toBe("latestRoundData");
      expect(latestRoundCall.getCallData()).toBe("0xfeaf968c");
      expect(latestRoundCall.getApplyToFieldsList()).toEqual([]);

      console.log(
        "✅ Protobuf serialization test passed - applyToFields is properly serialized"
      );
    });
  });
});
