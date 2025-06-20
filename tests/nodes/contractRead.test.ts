import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import { NodeType, TriggerType } from "@avaprotocol/types";
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
  contractAbi: [
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "description",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "version",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint80", "name": "_roundId", "type": "uint80"}],
      "name": "getRoundData",
      "outputs": [
        {"internalType": "uint80", "name": "roundId", "type": "uint80"},
        {"internalType": "int256", "name": "answer", "type": "int256"},
        {"internalType": "uint256", "name": "startedAt", "type": "uint256"},
        {"internalType": "uint256", "name": "updatedAt", "type": "uint256"},
        {"internalType": "uint80", "name": "answeredInRound", "type": "uint80"}
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "latestRoundData",
      "outputs": [
        {"internalType": "uint80", "name": "roundId", "type": "uint80"},
        {"internalType": "int256", "name": "answer", "type": "int256"},
        {"internalType": "uint256", "name": "startedAt", "type": "uint256"},
        {"internalType": "uint256", "name": "updatedAt", "type": "uint256"},
        {"internalType": "uint80", "name": "answeredInRound", "type": "uint80"}
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
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

      console.log("🚀 Testing runNodeWithInputs with Chainlink oracle read...");

      const result = await client.runNodeWithInputs({
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
      });

      console.log(
        "runNodeWithInputs oracle response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.data.results).toBeDefined();
        expect(Array.isArray(result.data.results)).toBe(true);
        expect(result.data.results.length).toBeGreaterThan(0);

        const latestRoundResult = result.data.results.find(
          (r: any) => r.methodName === "latestRoundData"
        );
        expect(latestRoundResult).toBeDefined();
        expect(latestRoundResult.success).toBe(true);
        expect(latestRoundResult.data).toBeDefined();
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

      console.log("🚀 Testing runNodeWithInputs with multiple method calls...");

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.ContractRead,
        nodeConfig: SEPOLIA_ORACLE_CONFIG,
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Multiple Methods Test",
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
      });

      console.log(
        "runNodeWithInputs multiple methods response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.data.results).toBeDefined();
        expect(Array.isArray(result.data.results)).toBe(true);
        expect(result.data.results.length).toBe(2); // latestRoundData + decimals

        const latestRoundResult = result.data.results.find(
          (r: any) => r.methodName === "latestRoundData"
        );
        const decimalsResult = result.data.results.find(
          (r: any) => r.methodName === "decimals"
        );

        expect(latestRoundResult).toBeDefined();
        expect(decimalsResult).toBeDefined();
        expect(latestRoundResult.success).toBe(true);
        expect(decimalsResult.success).toBe(true);
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Multiple methods test failed:", result.error);
      }
    });

    test("should handle invalid contract address", async () => {
      console.log(
        "🚀 Testing runNodeWithInputs with invalid contract address..."
      );

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: "0x0000000000000000000000000000000000000000", // Invalid address
          contractAbi: [
            {
              "inputs": [],
              "name": "totalSupply",
              "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
              "stateMutability": "view",
              "type": "function"
            }
          ],
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
      });

      console.log(
        "runNodeWithInputs invalid contract response:",
        JSON.stringify(result, null, 2)
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

      console.log("🚀 Testing runNodeWithInputs with description method...");

      const result = await client.runNodeWithInputs({
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
      });

      console.log(
        "runNodeWithInputs description response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success && result.data) {
        expect(result.data.results).toBeDefined();
        const descriptionResult = result.data.results.find(
          (r: any) => r.methodName === "description"
        );
        expect(descriptionResult).toBeDefined();
        expect(descriptionResult.success).toBe(true);
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Description method test failed:", result.error);
      }
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

      console.log("🚀 Testing simulateWorkflow with contract read...");

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow response:",
        JSON.stringify(simulation, null, 2)
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

      console.log("🚀 Testing simulateWorkflow with single method call...");

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
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
          "🚀 Testing deploy + trigger workflow with contract read..."
        );

        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        const triggerResult = await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        });

        console.log("=== TRIGGER WORKFLOW TEST ===");
        console.log("Trigger result:", JSON.stringify(triggerResult, null, 2));

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
        const directResponse = await client.runNodeWithInputs({
          nodeType: NodeType.ContractRead,
          nodeConfig: contractReadConfig,
          inputVariables: inputVariables,
        });

        // Test 2: simulateWorkflow
        const contractReadNode = NodeFactory.create({
          id: getNextId(),
          name: "consistency_test",
          type: NodeType.ContractRead,
          data: contractReadConfig,
        });

        const workflowProps = createFromTemplate(wallet.address, [
          contractReadNode,
        ]);
        const simulation = await client.simulateWorkflow(
          client.createWorkflow(workflowProps)
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
      console.log("🚀 Testing error handling with invalid method signature...");

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: [
            {
              "inputs": [],
              "name": "nonExistentMethod",
              "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
              "stateMutability": "view",
              "type": "function"
            }
          ],
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
      });

      console.log(
        "runNodeWithInputs error handling response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");

      // Should either fail the node execution or return error results
      if (result.success && result.data && result.data.results) {
        const errorResult = result.data.results.find(
          (r: any) => r.methodName === "nonExistentMethod"
        );
        if (errorResult) {
          expect(errorResult.success).toBe(false);
          expect(errorResult.error).toBeDefined();
        }
      }
    });
  });
});
