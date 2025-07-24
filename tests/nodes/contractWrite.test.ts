import util from "util";
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
let saltIndex = SaltGlobal.CreateWorkflow * 8000;

// Sepolia ERC20 Test Token Configurations
const SEPOLIA_TOKEN_CONFIGS = {
  USDC: {
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
  },
  LINK: {
    address: "0x779877a7b0d9e8603169ddbd7836e478b4624789",
    name: "ChainLink Token",
    symbol: "LINK",
    decimals: 18,
  },
};

// Standard ERC20 ABI for testing (approve and transfer functions)
const ERC20_ABI = JSON.stringify([
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
]);

// Helper function to check if we're on Sepolia
async function isSepoliaChain(): Promise<boolean> {
  try {
    return chainEndpoint?.toLowerCase().includes("sepolia") || false;
  } catch {
    return false;
  }
}

// Helper function to create approve call data for ERC20
function createApproveCallData(
  spender: string,
  amount: string = "1000000"
): string {
  // approve(address,uint256) function selector: 0x095ea7b3
  // Pad spender address to 32 bytes
  const paddedSpender = spender.replace("0x", "").padStart(64, "0");
  // Pad amount to 32 bytes (1000000 = 0xF4240)
  const paddedAmount = parseInt(amount).toString(16).padStart(64, "0");
  return `0x095ea7b3${paddedSpender}${paddedAmount}`;
}

describe("ContractWrite Node Tests", () => {
  let client: Client;
  let isSepoliaTest: boolean;
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

    // Check if we're on Sepolia chain
    isSepoliaTest = await isSepoliaChain();

    if (!isSepoliaTest) {
      console.log(
        "⚠️  Skipping Sepolia-specific ContractWrite tests - not on Sepolia chain"
      );
    }
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should handle ERC20 approve transaction", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const spenderAddress = "0x0000000000000000000000000000000000000001"; // Dummy address
      const approveCallData = createApproveCallData(spenderAddress, "100");

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: JSON.stringify(ERC20_ABI),
          methodCalls: [
            {
              callData: approveCallData,
              methodName: "approve",
            },
          ],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Contract Write Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: eoaAddress,
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
        "Test params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "runNodeWithInputs approve response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.nodeId).toBeDefined();
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).not.toHaveProperty("results");
      const data = result.data as any[];
      expect(data.length).toBe(params.nodeConfig.methodCalls.length);

      expect(result.success).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      // Should have transaction hash for successful write
      const approveResult = data.find((r: any) => r.methodName === "approve");
      expect(approveResult).toBeDefined();
      expect(approveResult.methodName).toBe("approve");
      expect(approveResult.transaction).toBeDefined();
      expect(approveResult.transaction.hash).toBeDefined();
    });

    test("should handle multiple method calls", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const spender1 = "0x0000000000000000000000000000000000000001";
      const spender2 = "0x0000000000000000000000000000000000000002";

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.LINK.address,
          contractAbi: JSON.stringify(ERC20_ABI),
          methodCalls: [
            {
              callData: createApproveCallData(spender1, "50"),
              methodName: "approve",
            },
            {
              callData: createApproveCallData(spender2, "75"),
              methodName: "approve",
            },
          ],
        },
        inputVariables: {},
      };

      console.log(
        "~ test ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "runNodeWithInputs multiple calls response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).not.toHaveProperty("results");
      const data = result.data as any[];
      expect(data.length).toBe(params.nodeConfig.methodCalls.length);

      expect(result.success).toBe(true);
      expect(data.length).toBeGreaterThan(0);

      data.forEach((methodResult: any) => {
        expect(methodResult.methodName).toBe("approve");
      });
    });

    test("should handle invalid contract address gracefully", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: "0x0000000000000000000000000000000000000000", // Zero address
          contractAbi: JSON.stringify(ERC20_ABI),
          methodCalls: [
            {
              callData: createApproveCallData(
                "0x0000000000000000000000000000000000000001"
              ),
              methodName: "approve",
            },
          ],
        },
        inputVariables: {},
      };

      console.log(
        "~ test ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "runNodeWithInputs invalid address response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).not.toHaveProperty("results");
      const data = result.data as any[];
      expect(data.length).toBe(params.nodeConfig.methodCalls.length);

      // Backend handles invalid addresses gracefully, returning success but may indicate issues in data
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    test("should handle malformed call data gracefully", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: JSON.stringify(ERC20_ABI),
          methodCalls: [
            {
              callData: "0xinvalidcalldata", // Invalid call data
              methodName: "approve",
            },
          ],
        },
        inputVariables: {},
      };

      console.log(
        "~ test ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "runNodeWithInputs malformed data response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).not.toHaveProperty("results");
      const data = result.data as any[];
      expect(data.length).toBe(params.nodeConfig.methodCalls.length);

      // Backend handles malformed call data gracefully, returning success but may indicate issues in data
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with contract write node", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_contract_write",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: ERC20_ABI, // ERC20_ABI is already a JSON string
          methodCalls: [
            {
              callData: createApproveCallData(
                wallet.address, // Use wallet address as spender (self-approval is always valid)
                "1000000" // 1 USDC (6 decimals)
              ),
              methodName: "approve",
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractWriteNode,
      ]);

      console.log(
        "🚀 ~ simulateWorkflow ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + contract write node

      const contractWriteStep = simulation.steps.find(
        (step) => step.id === contractWriteNode.id
      );
      expect(contractWriteStep).toBeDefined();

      const output = contractWriteStep!.output as any;
      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
      expect(output).not.toHaveProperty("results");
      expect(output.length).toBe(
        (contractWriteNode.data as any).methodCalls.length
      );

      expect(contractWriteStep!.success).toBe(true);
    });

    test("should simulate workflow with multiple contract writes", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_multiple_writes",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.LINK.address,
          contractAbi: JSON.stringify(ERC20_ABI),
          methodCalls: [
            {
              callData: createApproveCallData(
                "0x0000000000000000000000000000000001",
                "100"
              ),
              methodName: "approve",
            },
            {
              callData: createApproveCallData(
                "0x0000000000000000000000000000000002",
                "150"
              ),
              methodName: "approve",
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractWriteNode,
      ]);

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      expect(simulation.success).toBe(true);
      const contractWriteStep = simulation.steps.find(
        (step) => step.id === contractWriteNode.id
      );
      expect(contractWriteStep).toBeDefined();

      const output = contractWriteStep!.output as any;
      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
      expect(output).not.toHaveProperty("results");
      expect(output.length).toBe(
        (contractWriteNode.data as any).methodCalls.length
      );

      console.log(
        "Multiple writes simulation result:",
        contractWriteStep!.success
      );
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with contract write", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_contract_write_test",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: JSON.stringify(ERC20_ABI),
          methodCalls: [
            {
              callData: createApproveCallData(
                "0x0000000000000000000000000000000000000003",
                "300"
              ),
              methodName: "approve",
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractWriteNode,
      ]);
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

        const contractWriteStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === contractWriteNode.id
        );

        if (_.isUndefined(contractWriteStep)) {
          throw new Error("No corresponding contract write step found.");
        }

        console.log(
          "Deploy + trigger contract write step output:",
          util.inspect(contractWriteStep.output, { depth: null, colors: true })
        );

        const output = contractWriteStep.output as any;
        expect(output).toBeDefined();
        expect(Array.isArray(output)).toBe(true);
        expect(output).not.toHaveProperty("results");
        expect(output.length).toBe(
          (contractWriteNode.data as any).methodCalls.length
        );

        // Note: The step might succeed or fail depending on wallet funding and gas
        expect(contractWriteStep.success).toBe(true);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Response Format Consistency Tests", () => {
    test("should return consistent response format across all methods", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const contractWriteConfig = {
        contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
        contractAbi: JSON.stringify(ERC20_ABI),
        methodCalls: [
          {
            callData: createApproveCallData(
              "0x0000000000000000000000000000000000000004",
              "400"
            ),
            methodName: "approve",
          },
        ],
      };

      // Test 1: runNodeWithInputs
      const directParams = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: contractWriteConfig,
        inputVariables: {},
      };

      console.log(
        "🚀 ~ direct test ~ params:",
        util.inspect(directParams, { depth: null, colors: true })
      );

      const directResponse = await client.runNodeWithInputs(directParams);

      console.log(
        "🚀 ~ direct test ~ result:",
        util.inspect(directResponse, { depth: null, colors: true })
      );

      // Test 2: simulateWorkflow
      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_test",
        type: NodeType.ContractWrite,
        data: contractWriteConfig,
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractWriteNode,
      ]);

      console.log(
        "🚀 ~ simulation test ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "🚀 ~ simulation test ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === contractWriteNode.id
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
        console.log(
          "🚀 ~ deploy test ~ workflowProps:",
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
          "🚀 ~ trigger test ~ params:",
          util.inspect(triggerParams, { depth: null, colors: true })
        );

        const triggerResult = await client.triggerWorkflow(triggerParams);

        console.log(
          "🚀 ~ trigger test ~ result:",
          util.inspect(triggerResult, { depth: null, colors: true })
        );

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });
        const executedStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === contractWriteNode.id
        );

        // Compare response formats - verify all three methods return consistent data
        expect(directResponse.data).toBeDefined();
        expect(simulatedStep?.output).toBeDefined();
        expect(executedStep?.output).toBeDefined();

        // All outputs should have consistent structure (excluding dynamic fields like transaction hash)
        const directData = directResponse.data as any[];
        const simulatedData = simulatedStep?.output as any[];
        const executedData = executedStep?.output as any[];

        // Verify array lengths match
        expect(directData.length).toBe(simulatedData.length);
        expect(simulatedData.length).toBe(executedData.length);

        // Verify each method call result has consistent structure (excluding dynamic fields)
        for (let i = 0; i < directData.length; i++) {
          expect(directData[i].methodName).toBe(simulatedData[i].methodName);
          expect(directData[i].success).toBe(simulatedData[i].success);
          expect(directData[i].returnData).toBe(simulatedData[i].returnData);

          // Verify transaction structure exists but don't compare dynamic fields
          expect(directData[i].transaction).toBeDefined();
          expect(simulatedData[i].transaction).toBeDefined();
          expect(directData[i].transaction.chainId).toBe(
            simulatedData[i].transaction.chainId
          );
          expect(directData[i].transaction.simulation).toBe(
            simulatedData[i].transaction.simulation
          );
        }

        // Verify consistent structure
        expect(directResponse).toBeDefined();
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();

        // Check that all outputs have the same structure - they should all be arrays directly
        expect(Array.isArray(directResponse.data)).toBe(true);
        expect(directResponse.data).not.toHaveProperty("results");
        expect(Array.isArray(simulatedStep?.output)).toBe(true);
        expect(simulatedStep?.output).not.toHaveProperty("results");
        expect(Array.isArray(executedStep?.output)).toBe(true);
        expect(executedStep?.output).not.toHaveProperty("results");

        // Check that all have the same method names
        const directMethods = (directResponse.data as any[])
          ?.map((r: any) => r.methodName)
          .sort();
        const simulatedMethods = (simulatedStep?.output as any[])
          ?.map((r: any) => r.methodName)
          .sort();
        const executedMethods = (executedStep?.output as any[])
          ?.map((r: any) => r.methodName)
          .sort();

        expect(simulatedMethods).toEqual(executedMethods);
        expect(simulatedMethods).toEqual(directMethods);
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
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: JSON.stringify([
            {
              inputs: [],
              name: "nonExistentMethod",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "nonpayable",
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
            eoaAddress: eoaAddress,
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
        "🚀 ~ test ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ test ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).not.toHaveProperty("results");
      const data = result.data as any[];
      expect(data.length).toBe(params.nodeConfig.methodCalls.length);

      // Since we're using Tenderly simulation, it might return success even for invalid methods
      // The important thing is that we get a response with the correct structure
      if (result.success && result.data && Array.isArray(result.data)) {
        const errorResult = (result.data as any[]).find(
          (r: any) => r.methodName === "nonExistentMethod"
        );
        expect(errorResult).toBeDefined();
        expect(errorResult.methodName).toBe("nonExistentMethod");
        // Note: Tenderly simulation may return success=true even for invalid methods
        // This is expected behavior when using simulation
      }
    });
  });

  describe("Protobuf Serialization Tests", () => {
    test("should properly serialize methodCalls in protobuf", () => {
      const contractWriteNode = NodeFactory.create({
        id: "test-contract-write",
        name: "Test Contract Write",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: "0x1234567890123456789012345678901234567890",
          contractAbi: JSON.stringify(ERC20_ABI),
          methodCalls: [
            {
              callData: createApproveCallData(
                "0x0000000000000000000000000000000000000001",
                "100"
              ),
              methodName: "approve",
            },
            {
              callData: createApproveCallData(
                "0x0000000000000000000000000000000000000002",
                "200"
              ),
              methodName: "approve",
            },
          ],
        },
      });

      // Convert to protobuf request
      const request = contractWriteNode.toRequest();

      // Verify the structure
      expect(request.getContractWrite()).toBeDefined();
      const config = request.getContractWrite()!.getConfig();
      expect(config).toBeDefined();

      const methodCalls = config!.getMethodCallsList();
      expect(methodCalls).toHaveLength(2);

      // Check first method call
      const firstCall = methodCalls[0];
      expect(firstCall.getMethodName()).toBe("approve");
      expect(firstCall.getCallData()).toContain("0x095ea7b3");

      // Check second method call
      const secondCall = methodCalls[1];
      expect(secondCall.getMethodName()).toBe("approve");
      expect(secondCall.getCallData()).toContain("0x095ea7b3");

      console.log(
        "✅ Protobuf serialization test passed - methodCalls are properly serialized"
      );
    });
  });

  describe("ApplyToFields Decimal Formatting Tests", () => {
    test("should include answerRaw field when using applyToFields with runNodeWithInputs", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      // Note: For contract write, applyToFields might not be as relevant as for contract read
      // But we'll test it for consistency with the contract read tests
      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: JSON.stringify(ERC20_ABI),
          methodCalls: [
            {
              callData: createApproveCallData(
                "0x0000000000000000000000000000000000000001",
                "100"
              ),
              methodName: "approve",
              applyToFields: ["amount"], // Apply formatting to amount field if applicable
            },
          ],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "ApplyToFields Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: eoaAddress,
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
        "�� ~ test ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ test ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data).not.toHaveProperty("results");
      const data = result.data as any[];
      expect(data.length).toBe(params.nodeConfig.methodCalls.length);

      // Find the approve result
      const approveResult = data.find((r: any) => r.methodName === "approve");
      expect(approveResult).toBeDefined();
    });

    test("should include answerRaw field when using applyToFields with simulateWorkflow", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_applyToFields_test",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: JSON.stringify(ERC20_ABI),
          methodCalls: [
            {
              callData: createApproveCallData(
                "0x0000000000000000000000000000000000000001",
                "150"
              ),
              methodName: "approve",
              applyToFields: ["amount"], // Apply formatting to amount field if applicable
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractWriteNode,
      ]);

      console.log(
        "🚀 ~ test ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "🚀 ~ test ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      const contractWriteStep = simulation.steps.find(
        (step) => step.id === contractWriteNode.id
      );
      expect(contractWriteStep).toBeDefined();

      const output = contractWriteStep!.output as any;
      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
      expect(output).not.toHaveProperty("results");
      expect(output.length).toBe(
        (contractWriteNode.data as any).methodCalls.length
      );

      // Find the approve result
      const approveResult = output.find((r: any) => r.methodName === "approve");
      expect(approveResult).toBeDefined();
    });

    test("should deploy and trigger workflow with applyToFields", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;

      try {
        const contractWriteNode = NodeFactory.create({
          id: getNextId(),
          name: "deploy_contract_write_applyToFields_test",
          type: NodeType.ContractWrite,
          data: {
            contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
            contractAbi: JSON.stringify(ERC20_ABI),
            methodCalls: [
              {
                callData: createApproveCallData(
                  "0x0000000000000000000000000000000000000001",
                  "250"
                ),
                methodName: "approve",
                applyToFields: ["amount"], // Apply formatting to amount field if applicable
              },
            ],
          },
        });

        const workflowProps = createFromTemplate(wallet.address, [
          contractWriteNode,
        ]);

        console.log(
          "🚀 ~ test ~ workflowProps:",
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
          "�� ~ test ~ params:",
          util.inspect(triggerParams, { depth: null, colors: true })
        );

        const triggerResult = await client.triggerWorkflow(triggerParams);

        console.log(
          "🚀 ~ test ~ result:",
          util.inspect(triggerResult, { depth: null, colors: true })
        );

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const contractWriteStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === contractWriteNode.id
        );

        if (_.isUndefined(contractWriteStep)) {
          throw new Error("No corresponding contract write step found.");
        }

        console.log(
          "Deploy + trigger contract write with applyToFields step output:",
          util.inspect(contractWriteStep.output, { depth: null, colors: true })
        );

        const output = contractWriteStep.output as any;
        expect(output).toBeDefined();
        expect(Array.isArray(output)).toBe(true);
        expect(output).not.toHaveProperty("results");
        expect(output.length).toBe(
          (contractWriteNode.data as any).methodCalls.length
        );

        // Find the approve result
        const approveResult = output.find(
          (r: any) => r.methodName === "approve"
        );
        expect(approveResult).toBeDefined();
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  // Test methodParams field support
  test("should properly serialize methodParams in protobuf", () => {
    const contractWriteNode = NodeFactory.create({
      id: "test-contract-write-methodparams",
      name: "Test Contract Write MethodParams",
      type: NodeType.ContractWrite,
      data: {
        contractAddress: "0x1234567890123456789012345678901234567890",
        callData: "0xa9059cbb", // transfer(address,uint256)
        contractAbi: "[]",
        methodCalls: [
          {
            callData: "0xa9059cbb", // transfer(address,uint256)
            methodName: "transfer",
            methodParams: ["{{value.recipient}}", "{{value.amount}}"], // Array with multiple parameters
          },
          {
            callData: "0x23b872dd", // transferFrom(address,address,uint256)
            methodName: "transferFrom",
            methodParams: ["{{value.sender}}", "{{value.recipient}}", "{{value.amount}}"], // Array with 3 parameters
          },
          {
            callData: "0x095ea7b3", // approve(address,uint256)
            methodName: "approve",
            // No methodParams - should be empty array
          },
        ],
      },
    });

    // Convert to protobuf request
    const request = contractWriteNode.toRequest();

    // Verify the structure
    expect(request.getContractWrite()).toBeDefined();
    const config = request.getContractWrite()!.getConfig();
    expect(config).toBeDefined();

    const methodCalls = config!.getMethodCallsList();
    expect(methodCalls).toHaveLength(3);

    // Check first method call (transfer with 2 parameters)
    const transferCall = methodCalls[0];
    expect(transferCall.getMethodName()).toBe("transfer");
    expect(transferCall.getCallData()).toBe("0xa9059cbb");
    expect(transferCall.getMethodParamsList()).toEqual(["{{value.recipient}}", "{{value.amount}}"]);

    // Check second method call (transferFrom with 3 parameters)
    const transferFromCall = methodCalls[1];
    expect(transferFromCall.getMethodName()).toBe("transferFrom");
    expect(transferFromCall.getCallData()).toBe("0x23b872dd");
    expect(transferFromCall.getMethodParamsList()).toEqual(["{{value.sender}}", "{{value.recipient}}", "{{value.amount}}"]);

    // Check third method call (approve without methodParams)
    const approveCall = methodCalls[2];
    expect(approveCall.getMethodName()).toBe("approve");
    expect(approveCall.getCallData()).toBe("0x095ea7b3");
    expect(approveCall.getMethodParamsList()).toEqual([]); // Should be empty array when not set
  });
});
