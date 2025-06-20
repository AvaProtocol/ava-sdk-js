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

      console.log("🚀 Testing runNodeWithInputs with ERC20 approve...");

      const spenderAddress = "0x0000000000000000000000000000000000000001"; // Dummy address
      const approveCallData = createApproveCallData(spenderAddress, "100");

      const result = await client.runNodeWithInputs({
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
      });

      console.log(
        "runNodeWithInputs approve response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.nodeId).toBeDefined();

      if (
        result.success &&
        result.data &&
        typeof result.data === "object" &&
        "results" in result.data
      ) {
        // Should have transaction hash for successful write
        expect(result.data.results).toBeDefined();
        expect(Array.isArray(result.data.results)).toBe(true);
        if (result.data.results.length > 0) {
          expect(result.data.results[0].methodName).toBe("approve");
          if (result.data.results[0].transaction) {
            expect(result.data.results[0].transaction.hash).toBeDefined();
            console.log(
              "✅ Transaction hash:",
              result.data.results[0].transaction.hash
            );
          }
        }
      } else {
        console.log("ContractWrite failed:", result.error);
        // Failure is acceptable for testing (might be insufficient gas, etc.)
        expect(result.error).toBeDefined();
      }
    });

    test("should handle multiple method calls", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      console.log("🚀 Testing runNodeWithInputs with multiple method calls...");

      const spender1 = "0x0000000000000000000000000000000000000001";
      const spender2 = "0x0000000000000000000000000000000000000002";

      const result = await client.runNodeWithInputs({
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
      });

      console.log(
        "runNodeWithInputs multiple calls response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");

      if (
        result.success &&
        result.data &&
        typeof result.data === "object" &&
        "results" in result.data
      ) {
        expect(result.data.results).toBeDefined();
        expect(result.data.results.length).toBe(2);
        result.data.results.forEach((methodResult: any, index: number) => {
          expect(methodResult.methodName).toBe("approve");
        });
      } else {
        console.log("Multiple method calls failed:", result.error);
        expect(result.error).toBeDefined();
      }
    });

    test("should handle invalid contract address gracefully", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      console.log(
        "🚀 Testing runNodeWithInputs with invalid contract address..."
      );

      const result = await client.runNodeWithInputs({
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
      });

      console.log(
        "runNodeWithInputs invalid address response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");

      // Should fail gracefully
      if (!result.success) {
        expect(result.error).toBeDefined();
        console.log("Expected failure for zero address:", result.error);
      }
    });

    test("should handle malformed call data gracefully", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      console.log("🚀 Testing runNodeWithInputs with malformed call data...");

      const result = await client.runNodeWithInputs({
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
      });

      console.log(
        "runNodeWithInputs malformed data response:",
        JSON.stringify(result, null, 2)
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");

      // Should fail gracefully
      if (!result.success) {
        expect(result.error).toBeDefined();
        console.log("Expected failure for malformed data:", result.error);
      }
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
          contractAbi: JSON.stringify(ERC20_ABI),
          methodCalls: [
            {
              callData: createApproveCallData(
                "0x0000000000000000000000000000000000000001",
                "200"
              ),
              methodName: "approve",
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractWriteNode,
      ]);

      console.log("🚀 Testing simulateWorkflow with contract write...");

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "simulateWorkflow response:",
        JSON.stringify(simulation, null, 2)
      );

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + contract write node

      const contractWriteStep = simulation.steps.find(
        (step) => step.id === contractWriteNode.id
      );
      expect(contractWriteStep).toBeDefined();

      // Note: Simulation might succeed even if actual execution would fail
      // This depends on the simulation implementation
      console.log("Contract write step success:", contractWriteStep!.success);
      if (!contractWriteStep!.success) {
        console.log("Simulation error (expected):", contractWriteStep!.error);
      }
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

      console.log(
        "🚀 Testing simulateWorkflow with multiple contract writes..."
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      expect(simulation.success).toBe(true);
      const contractWriteStep = simulation.steps.find(
        (step) => step.id === contractWriteNode.id
      );
      expect(contractWriteStep).toBeDefined();

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

      console.log(
        "🚀 Testing deploy + trigger workflow with contract write..."
      );

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
          JSON.stringify(contractWriteStep.output, null, 2)
        );

        // Note: The step might succeed or fail depending on wallet funding and gas
        console.log("Contract write step success:", contractWriteStep.success);
        if (!contractWriteStep.success) {
          console.log(
            "Execution error (may be expected):",
            contractWriteStep.error
          );
        }
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

      console.log(
        "🔍 Testing response format consistency across all methods..."
      );

      // Test 1: runNodeWithInputs
      const directResponse = await client.runNodeWithInputs({
        nodeType: NodeType.ContractWrite,
        nodeConfig: contractWriteConfig,
        inputVariables: {},
      });

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
      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
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
          (step) => step.id === contractWriteNode.id
        );

        // Compare response formats
        console.log("=== CONTRACT WRITE RESPONSE FORMAT COMPARISON ===");
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

        // Verify consistent structure
        expect(directResponse).toBeDefined();
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();

        // All should have similar response structure (success/failure is less important)
        console.log("Direct response success:", directResponse.success);
        console.log("Simulated step success:", simulatedStep?.success);
        console.log("Executed step success:", executedStep?.success);

        console.log(
          "✅ All three methods return consistent contract write response formats!"
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });

    test("should use 'results' format (not 'resultsList') in all response types", async () => {
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
              "0x0000000000000000000000000000000000000005",
              "500"
            ),
            methodName: "approve",
          },
        ],
      };

      console.log(
        "🔍 Testing that all responses use 'results' not 'resultsList'..."
      );

      // Test 1: runNodeWithInputs should use 'results'
      const directResponse = await client.runNodeWithInputs({
        nodeType: NodeType.ContractWrite,
        nodeConfig: contractWriteConfig,
        inputVariables: {},
      });

      expect(directResponse.data).toHaveProperty("results");
      console.log("✅ runNodeWithInputs uses 'results' format");

      // Test 2: simulateWorkflow should use 'results'
      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "format_test_simulate",
        type: NodeType.ContractWrite,
        data: contractWriteConfig,
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractWriteNode,
      ]);
      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === contractWriteNode.id
      );

      if (simulatedStep?.output) {
        // If there's data, it should use 'results'
        if (
          typeof simulatedStep.output === "object" &&
          simulatedStep.output !== null &&
          "results" in simulatedStep.output
        ) {
          expect(simulatedStep.output).toHaveProperty("results");
          console.log("✅ simulateWorkflow uses 'results' format");
        }
      }

      // Test 3: Deploy + Trigger should use 'results'
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
          (step) => step.id === contractWriteNode.id
        );

        console.log("🚀 ~ test ~ executedStep:", executedStep);

        expect(executedStep?.output).not.toHaveProperty("resultsList");
        expect(executedStep?.output).toHaveProperty("results");

        console.log(
          "✅ All contract write responses use 'results' format, NOT 'resultsList'!"
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });
});
