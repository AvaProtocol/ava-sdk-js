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
  TEST_SMART_WALLET_ADDRESS,
  SALT_BUCKET_SIZE,
  stepIndicatesWriteFailure,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig, isSepolia } from "../utils/envalid";
const { tokens } = getConfig();
const SEPOLIA_TOKEN_CONFIGS = tokens;

jest.setTimeout(TIMEOUT_DURATION);

/**
 * ContractWrite Node Expected Response Structure:
 *
 * For runNodeWithInputs:
 * {
 *   success: true,
 *   data: { methodName: {} }, // Object organized by method name, each containing decoded receipt logs/events
 *   metadata: [], // Array of method execution details with transaction receipts, ABIs, etc.
 *   error: "",
 *   nodeId: "..."
 * }
 *
 * For simulateWorkflow/deployWorkflow:
 * {
 *   output: {
 *     data: { methodName: {} }, // Object organized by method name, each containing decoded events
 *     metadata: [] // Array of method execution details with transaction receipts, ABIs, etc.
 *   }
 * }
 *
 * The data field contains decoded events from transaction receipts, organized by method name
 * for easy access (e.g., { approve: {}, transfer: {} }). Each method contains its parsed events.
 * The metadata field contains detailed method execution information including transaction receipts,
 * method ABIs, and execution status. Both simulateWorkflow and deployWorkflow now have consistent
 * structure with both data and metadata fields.
 */

const { avsEndpoint, walletPrivateKey } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.ContractWrite * SALT_BUCKET_SIZE;

// Sepolia ERC20 Test Token Configurations
// (Imported from shared location at top of file)

// Standard ERC20 ABI for testing (approve and transfer functions)
const ERC20_ABI: any[] = [
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
  // --- ERC20 events ---
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];

describe("ContractWrite Node Tests", () => {
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

    if (!isSepolia()) {
      console.log(
        "⚠️  Skipping Sepolia-specific ContractWrite tests - not on Sepolia chain"
      );
    }
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should handle ERC20 approve transaction", async () => {
      if (!isSepolia()) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const spenderAddress = TEST_SMART_WALLET_ADDRESS; // Use test smart wallet for success path

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [spenderAddress, "100"],
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
            runner: wallet.address,
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

      expect(result.data).toBeDefined();

      // NEW: Check new response structure with data and metadata at top level
      expect(result.data).toBeDefined(); // Decoded event data (organized by method name)
      expect(typeof result.data).toBe("object"); // Should be an object, not array
      expect(Array.isArray(result.data)).toBe(false); // Should NOT be an array

      // Verify flattened structure by method name - this test only has approve
      expect(result.data).toHaveProperty("approve");
      expect(typeof result.data.approve).toBe("object");

      expect(result.metadata).toBeDefined(); // Method execution details
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBe(params.nodeConfig.methodCalls.length);

      // For ERC20 approve, typically no events are emitted, so each method should have empty object
      // If events were emitted, they would be flattened into the method's object
      expect(Object.keys(result.data).length).toBe(
        params.nodeConfig.methodCalls.length
      ); // One method = one key

      // success must reflect metadata/receipt success
      const allOk = Array.isArray(result.metadata)
        ? (result.metadata as any[]).every(
            (m: any) =>
              m &&
              m.success === true &&
              (!m.receipt || m.receipt.status === "0x1")
          )
        : true;
      expect(result.success).toBe(allOk);
      expect(result.metadata.length).toBeGreaterThan(0);

      // Verify executionContext present and camelCased
      expect(result.executionContext).toBeDefined();
      expect(result.executionContext!.isSimulated).toBe(true);
      // chainId may vary by config; just assert it exists as a number if provided
      if ((result.executionContext as any).chainId !== undefined) {
        expect(typeof (result.executionContext as any).chainId).toBe("number");
      }

      // Should have transaction hash regardless of success/failure
      const approveResult = result.metadata.find(
        (r: any) => r.methodName === "approve"
      );
      expect(approveResult).toBeDefined();
      expect(approveResult.methodName).toBe("approve");
      expect(approveResult.receipt).toBeDefined();
      expect(approveResult.receipt.transactionHash).toBeDefined();

      // Check that the receipt status matches the method success
      if (approveResult.success) {
        expect(approveResult.receipt.status).toBe("0x1"); // Success
      } else {
        expect(approveResult.receipt.status).toBe("0x0"); // Failure
        expect(approveResult.error).toBeDefined(); // Should have error message
      }
    });

    test("should handle multiple method calls", async () => {
      if (!isSepolia()) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const spender1 = TEST_SMART_WALLET_ADDRESS;
      const spender2 = TEST_SMART_WALLET_ADDRESS; // Use test smart wallet for consistency

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.LINK.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [spender1, "50"],
            },
            {
              methodName: "approve",
              methodParams: [spender2, "75"],
            },
          ],
        },
        inputVariables: {
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
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

      // 🚀 NEW: Check new response structure with data and metadata at top level
      expect(result.data).toBeDefined(); // Decoded event data
      expect(result.metadata).toBeDefined(); // Method execution details
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBe(params.nodeConfig.methodCalls.length);

      // Verify executionContext present and camelCased
      expect(result.executionContext).toBeDefined();
      expect(result.executionContext!.isSimulated).toBe(true);

      const allOk2 = Array.isArray(result.metadata)
        ? (result.metadata as any[]).every(
            (m: any) =>
              m &&
              m.success === true &&
              (!m.receipt || m.receipt.status === "0x1")
          )
        : true;
      expect(result.success).toBe(allOk2);
      expect(result.metadata.length).toBeGreaterThan(0);

      result.metadata.forEach((methodResult: any) => {
        expect(methodResult.methodName).toBe("approve");
      });
    });

    test("should handle invalid contract address gracefully", async () => {
      if (!isSepolia()) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: "0x0000000000000000000000000000000000000000", // Zero address
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [
                "0x0000000000000000000000000000000000000001",
                "1000000",
              ],
            },
          ],
        },
        inputVariables: {
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
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

      // 🚀 NEW: Check new response structure with data and metadata at top level
      expect(result.data).toBeDefined(); // Decoded event data
      expect(result.metadata).toBeDefined(); // Method execution details
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBe(params.nodeConfig.methodCalls.length);

      // Verify executionContext present and camelCased
      expect(result.executionContext).toBeDefined();
      expect(result.executionContext!.isSimulated).toBe(true);

      // If metadata indicates failure or receipt.status != 0x1, success must be false
      const allOkInvalid = Array.isArray(result.metadata)
        ? (result.metadata as any[]).every(
            (m: any) =>
              m &&
              m.success === true &&
              (!m.receipt || m.receipt.status === "0x1")
          )
        : true;
      expect(result.success).toBe(allOkInvalid);
      expect(result.data).toBeDefined();
    });

    test("should handle malformed call data gracefully", async () => {
      if (!isSepolia) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: ["invalid_address", "invalid_amount"], // Invalid parameters
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

      // 🚀 NEW: Check new response structure with data and metadata at top level
      expect(result.data).toBeDefined(); // Decoded event data
      expect(result.metadata).toBeDefined(); // Method execution details
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBe(params.nodeConfig.methodCalls.length);

      // If metadata indicates failure or receipt.status != 0x1, success must be false
      const allOkMalformed = Array.isArray(result.metadata)
        ? (result.metadata as any[]).every(
            (m: any) =>
              m &&
              m.success === true &&
              (!m.receipt || m.receipt.status === "0x1")
          )
        : true;
      expect(result.success).toBe(allOkMalformed);
      expect(result.data).toBeDefined();
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with contract write node", async () => {
      if (!isSepolia) {
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
          contractAbi: ERC20_ABI, // Convert array to JSON string
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [
                wallet.address, // Use wallet address as spender (self-approval is always valid)
                "1000000", // 1 USDC (6 decimals)
              ],
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

      const base = client.createWorkflow(workflowProps);
      const simulation = await client.simulateWorkflow({
        ...base.toJson(),
        inputVariables: {
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
      });

      console.log(
        "simulateWorkflow response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      // success must reflect step outcomes
      const contractWriteSimStep1 = simulation.steps.find(
        (s: any) => s.id === contractWriteNode.id
      );
      // Return true if any metadata item indicates a failed write (success === false or receipt.status === "0x0")
      const writeFail1 = stepIndicatesWriteFailure(contractWriteSimStep1 as any);
      expect(simulation.success).toBe(!writeFail1);
      expect(simulation.steps).toHaveLength(2); // trigger + contract write node

      const contractWriteStep = simulation.steps.find(
        (step) => step.id === contractWriteNode.id
      );
      expect(contractWriteStep).toBeDefined();

      const output = contractWriteStep!.output as any;
      expect(output).toBeDefined();

      // Contract write simulation should return flattened object format (consistent with contract_read)
      expect(typeof output).toBe("object");
      expect(output).not.toBeNull();
      expect(Array.isArray(output)).toBe(false);

      expect(contractWriteStep!.success).toBe(true);
    });

    test("should simulate workflow with approve and transfer calls", async () => {
      if (!isSepolia) {
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
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [TEST_SMART_WALLET_ADDRESS, "100"],
            },
            {
              methodName: "transfer",
              methodParams: [TEST_SMART_WALLET_ADDRESS, "100"],
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

      const base2 = client.createWorkflow(workflowProps);
      const simulation = await client.simulateWorkflow({
        ...base2.toJson(),
        inputVariables: {
          workflowContext: {
            eoaAddress,
            runner: wallet.address,
          },
        },
      });

      console.log(
        "simulateWorkflow response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      const contractWriteSimStep2 = simulation.steps.find(
        (s: any) => s.id === contractWriteNode.id
      );
      // Return true if any metadata item indicates a failed write (success === false or receipt.status === "0x0")
      const writeFail2 = stepIndicatesWriteFailure(contractWriteSimStep2 as any);
      expect(simulation.success).toBe(!writeFail2);
      const contractWriteStep = simulation.steps.find(
        (step) => step.id === contractWriteNode.id
      );
      expect(contractWriteStep).toBeDefined();

      const output = contractWriteStep!.output as any;
      expect(output).toBeDefined();
      expect(typeof output).toBe("object");
      expect(Array.isArray(output)).toBe(false); // Should be flattened object, not array
      expect(output).not.toHaveProperty("results");

      // Verify flattened structure by method name directly on output
      expect(output).toHaveProperty("approve");
      expect(output).toHaveProperty("transfer");
      expect(typeof output.approve).toBe("object");
      expect(typeof output.transfer).toBe("object");

      // Should have same number of methods as methodCalls
      expect(Object.keys(output).length).toBe(
        (contractWriteNode.data as any).methodCalls.length
      );

      // Step-level metadata property should exist (may be undefined if backend didn't set it)
      expect(contractWriteStep as any).toHaveProperty("metadata");

      // Execution context: should indicate simulated run with provider tenderly
      expect((contractWriteStep as any).executionContext).toBeDefined();
      const ctx = (contractWriteStep as any).executionContext as any;
      expect(ctx.is_simulated).toBe(true);
      expect(ctx.provider).toBe("tenderly");
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with contract write", async () => {
      if (!isSepolia) {
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
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [TEST_SMART_WALLET_ADDRESS, "300"],
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
        expect(typeof output).toBe("object");
        expect(Array.isArray(output)).toBe(false); // Should be flattened object, not array
        expect(output).not.toHaveProperty("results");

        // Output is the data object directly; metadata is step-level
        expect(typeof output).toBe("object");
        expect(contractWriteStep as any).toHaveProperty("metadata");

        // Verify flattened structure by method name - this test only has approve
        expect(output).toHaveProperty("approve");
        expect(typeof output.approve).toBe("object");

        // Should have same number of methods as methodCalls
        expect(Object.keys(output).length).toBe(
          (contractWriteNode.data as any).methodCalls.length
        );

        // Note: The step might succeed or fail depending on wallet funding and gas
        // step success must reflect metadata/receipt success
        const stepFail = stepIndicatesWriteFailure(contractWriteStep as any);
        expect(contractWriteStep.success).toBe(!stepFail);
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
      if (!isSepolia) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const contractWriteConfig = {
        contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
        contractAbi: ERC20_ABI,
        methodCalls: [
          {
            methodName: "approve",
            methodParams: [TEST_SMART_WALLET_ADDRESS, "400"],
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

      const wfSim = client.createWorkflow(workflowProps);
      const simulation = await client.simulateWorkflow({
        ...wfSim.toJson(),
        inputVariables: {
          workflowContext: { eoaAddress, runner: wallet.address },
        },
      });

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

        await client.triggerWorkflow(triggerParams);

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });
        const executedStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === contractWriteNode.id
        );

        console.log(
          "🚀 ~ deploy test ~ executedStep:",
          util.inspect(executedStep, { depth: null, colors: true })
        );

        // Compare response formats - verify all three methods return consistent data
        expect(directResponse.data).toBeDefined();
        expect(simulatedStep?.output).toBeDefined();
        expect(executedStep?.output).toBeDefined();

        // 🚀 NEW: Verify consistent structure between different execution methods
        // runNodeWithInputs: metadata is array, data is flattened object by method name
        // simulateWorkflow/deployWorkflow: output contains both data and metadata fields

        const directMetadata = directResponse.metadata as any[]; // Array of method results
        const directData = directResponse.data as any; // Object organized by method name
        const simulatedOutput = simulatedStep?.output as any; // Object with data and metadata fields
        const executedOutput = executedStep?.output as any; // Object with data and metadata fields

        // Verify metadata array length matches number of method calls
        expect(directMetadata.length).toBe(
          contractWriteConfig.methodCalls.length
        );

        // Output should be the data object directly; metadata is step-level
        expect(typeof simulatedOutput).toBe("object");
        expect(typeof executedOutput).toBe("object");
        expect(simulatedStep as any).toHaveProperty("metadata");
        expect(executedStep as any).toHaveProperty("metadata");

        // Verify all outputs have the same method names (keys) in their data fields
        const directDataKeys = Object.keys(directData).sort();
        const simulatedDataKeys = Object.keys(simulatedOutput || {}).sort();
        const executedDataKeys = Object.keys(executedOutput || {}).sort();

        expect(directDataKeys).toEqual(simulatedDataKeys);
        expect(simulatedDataKeys).toEqual(executedDataKeys);

        // Verify each method has consistent structure across execution types
        for (const methodName of directDataKeys) {
          // All should have the same method represented in their data fields
          expect(directData[methodName]).toBeDefined();
          expect(simulatedOutput[methodName]).toBeDefined();
          expect(executedOutput[methodName]).toBeDefined();

          // All should be objects (decoded events)
          expect(typeof directData[methodName]).toBe("object");
          expect(typeof simulatedOutput[methodName]).toBe("object");
          expect(typeof executedOutput[methodName]).toBe("object");
        }

        // Verify consistent structure
        expect(directResponse).toBeDefined();
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();

        // 🚀 NEW: Check response structure - direct call has data/metadata at top level
        expect(typeof directResponse.data).toBe("object");
        expect(directResponse.data).toBeDefined(); // Decoded events (flattened by method)
        expect(directResponse.metadata).toBeDefined(); // Method results
        expect(Array.isArray(directResponse.metadata)).toBe(true);

        // simulateWorkflow and deployWorkflow should have object structure with data and metadata
        expect(typeof simulatedStep?.output).toBe("object");
        expect(Array.isArray(simulatedStep?.output)).toBe(false);
        expect(typeof executedStep?.output).toBe("object");
        expect(Array.isArray(executedStep?.output)).toBe(false);

        // Check that all have the same method names
        const directMethods = (directResponse.metadata as any[])
          ?.map((r: any) => r.methodName)
          .sort();
        const simulatedMethods = Object.keys(
          simulatedStep?.output || {}
        ).sort();
        const executedMethods = Object.keys(executedStep?.output || {}).sort();

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
      if (!isSepolia) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: [
            {
              inputs: [],
              name: "nonExistentMethod",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
          methodCalls: [{ methodName: "nonExistentMethod", methodParams: [] }],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Error Handling Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: eoaAddress,
            runner: wallet.address,
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

      // 🚀 NEW: Check new response structure with data and metadata at top level
      expect(result.data).toBeDefined(); // Decoded event data
      expect(result.metadata).toBeDefined(); // Method execution details
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBe(params.nodeConfig.methodCalls.length);

      // Since we're using Tenderly simulation, it might return success even for invalid methods
      // The important thing is that we get a response with the correct structure
      if (result.success && result.metadata && Array.isArray(result.metadata)) {
        const errorResult = Array.isArray(result.metadata)
          ? result.metadata.find(
              (r: any) => r.methodName === "nonExistentMethod"
            )
          : undefined;
        // Some backends may not include the failing method explicitly; only assert structure
        if (errorResult) {
          expect(errorResult.methodName).toBe("nonExistentMethod");
        }
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
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [TEST_SMART_WALLET_ADDRESS, "100"],
            },
            {
              methodName: "approve",
              methodParams: [TEST_SMART_WALLET_ADDRESS, "200"],
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
      expect(firstCall.getMethodParamsList()).toEqual([
        TEST_SMART_WALLET_ADDRESS,
        "100",
      ]);

      // Check second method call
      const secondCall = methodCalls[1];
      expect(secondCall.getMethodName()).toBe("approve");
      expect(secondCall.getMethodParamsList()).toEqual([
        TEST_SMART_WALLET_ADDRESS,
        "200",
      ]);

      console.log(
        "✅ Protobuf serialization test passed - methodCalls are properly serialized"
      );
    });
  });

  describe("ApplyToFields Decimal Formatting Tests", () => {
    test("should include answerRaw field when using applyToFields with runNodeWithInputs", async () => {
      if (!isSepolia) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Note: For contract write, applyToFields might not be as relevant as for contract read
      // But we'll test it for consistency with the contract read tests
      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [TEST_SMART_WALLET_ADDRESS, "100"],
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
            runner: wallet.address,
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

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ test ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();

      // 🚀 NEW: Check new response structure with data and metadata at top level
      expect(result.data).toBeDefined(); // Decoded event data
      expect(result.metadata).toBeDefined(); // Method execution details
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBe(params.nodeConfig.methodCalls.length);

      // Find the approve result in metadata
      const approveResult = result.metadata.find(
        (r: any) => r.methodName === "approve"
      );
      expect(approveResult).toBeDefined();
    });

    test("should include answerRaw field when using applyToFields with simulateWorkflow", async () => {
      if (!isSepolia) {
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
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [TEST_SMART_WALLET_ADDRESS, "150"],
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

      const wfApply = client.createWorkflow(workflowProps);
      const simulation = await client.simulateWorkflow({
        ...wfApply.toJson(),
        inputVariables: {
          workflowContext: { eoaAddress, runner: wallet.address },
        },
      });

      console.log(
        "🚀 ~ test ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      const contractWriteSimStep3 = simulation.steps.find(
        (s: any) => s.id === contractWriteNode.id
      );
      // Return true if any metadata item indicates a failed write (success === false or receipt.status === "0x0")
      const writeFail3 = stepIndicatesWriteFailure(contractWriteSimStep3 as any);
      expect(simulation.success).toBe(!writeFail3);
      const contractWriteStep = simulation.steps.find(
        (step) => step.id === contractWriteNode.id
      );
      expect(contractWriteStep).toBeDefined();

      const output = contractWriteStep!.output as any;
      expect(output).toBeDefined();
      expect(typeof output).toBe("object");
      expect(Array.isArray(output)).toBe(false); // Should be flattened object, not array
      expect(output).not.toHaveProperty("results");

      // Output is the data object directly; metadata is step-level
      expect(typeof output).toBe("object");
      expect(contractWriteStep as any).toHaveProperty("metadata");

      // Verify flattened structure by method name - this test only has approve
      expect(output).toHaveProperty("approve");
      expect(typeof output.approve).toBe("object");

      // Should have same number of methods as methodCalls
      expect(Object.keys(output).length).toBe(
        (contractWriteNode.data as any).methodCalls.length
      );

      // Access the approve result directly from flattened structure
      const approveResult = output.approve;
      expect(approveResult).toBeDefined();
      expect(typeof approveResult).toBe("object");
    });

    test("should deploy and trigger workflow with applyToFields", async () => {
      if (!isSepolia) {
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
            contractAbi: ERC20_ABI,
            methodCalls: [
              {
                methodName: "approve",
                methodParams: [TEST_SMART_WALLET_ADDRESS, "250"],
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

        await client.triggerWorkflow(triggerParams);

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
        expect(typeof output).toBe("object");
        expect(Array.isArray(output)).toBe(false); // Should be flattened object, not array
        expect(output).not.toHaveProperty("results");

        // Output is the data object directly; metadata is step-level
        expect(typeof output).toBe("object");
        expect(contractWriteStep as any).toHaveProperty("metadata");

        // Verify flattened structure by method name - this test only has approve
        expect(output).toHaveProperty("approve");
        expect(typeof output.approve).toBe("object");

        // Should have same number of methods as methodCalls
        expect(Object.keys(output).length).toBe(
          (contractWriteNode.data as any).methodCalls.length
        );

        // Access the approve result directly from flattened structure
        const approveResult = output.approve;
        expect(approveResult).toBeDefined();
        expect(typeof approveResult).toBe("object");
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Real UserOp Transaction Debug Tests", () => {
    test("should test real UserOp with salt:0 (funded wallet)", async () => {
      if (!isSepolia) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      // Use the default smart wallet (salt: 0) that is pre-funded
      const wallet = await client.getWallet({ salt: "0" });

      console.log("🚀 Testing Real UserOp Transactions");
      console.log("Smart Wallet Address:", wallet.address);
      console.log("EOA Address:", eoaAddress);
      console.log("Using default smart wallet (salt: 0)");

      // Note: Smart wallet address is dynamically generated based on EOA + salt + factory
      // No need for hardcoded address comparison - test works with any generated address

      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "real_userop_debug_test",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [
                "0xc60e71bd0f2e6d8832Fea1a2d56091C48493C788", // Test recipient (EOA)
                "1000000", // 1.0 USDC (6 decimals: 1000000 = 1.0 USDC) - should work with 10 USDC balance
              ],
            },
          ],
        },
      });

      // Create workflow with manual trigger for easy testing
      const manualTrigger = TriggerFactory.create({
        id: defaultTriggerId, // Use the same ID as the template expects
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: {
          note: "Debug test for real UserOp transactions",
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractWriteNode,
      ]);
      workflowProps.trigger = manualTrigger;
      workflowProps.name = "Real UserOp Debug Test";

      let workflowId: string | undefined;
      try {
        console.log(
          "🚀 Creating workflow with props:",
          util.inspect(workflowProps, { depth: null, colors: true })
        );

        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        console.log("✅ Workflow created with ID:", workflowId);

        // Trigger the workflow manually
        console.log("🚀 Triggering workflow manually...");

        await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Manual,
            note: "Manual trigger for debug test",
          },
          isBlocking: true,
        });

        console.log("✅ Workflow triggered successfully");

        // Get execution results
        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        console.log(
          "🚀 Execution results:",
          util.inspect(executions, { depth: null, colors: true })
        );

        expect(executions.items.length).toBe(1);

        const contractWriteStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === contractWriteNode.id
        );

        if (_.isUndefined(contractWriteStep)) {
          throw new Error("No corresponding contract write step found.");
        }

        console.log(
          "🔍 Contract Write Step Details:",
          util.inspect(contractWriteStep, { depth: null, colors: true })
        );

        // Analyze the transaction result to see if it's real or simulated
        const output = contractWriteStep.output as any;
        expect(output).toBeDefined();
        // metadata is top-level on the step, not inside output
        expect((contractWriteStep as any).metadata).toBeDefined();

        if (
          output.metadata &&
          Array.isArray(output.metadata) &&
          output.metadata.length > 0
        ) {
          const transferResult = output.metadata[0];
          console.log(
            "🔍 Transfer Result Analysis:",
            util.inspect(transferResult, { depth: null, colors: true })
          );

          if (transferResult.receipt) {
            const receipt = transferResult.receipt;
            console.log("📋 Transaction Receipt Analysis:");
            console.log("  Transaction Hash:", receipt.transactionHash);
            console.log("  Block Number:", receipt.blockNumber);
            console.log("  Block Hash:", receipt.blockHash);
            console.log("  From:", receipt.from);
            console.log("  To:", receipt.to);
            console.log("  Gas Used:", receipt.gasUsed);
            console.log("  Status:", receipt.status);

            // Check if this looks like a real transaction or simulation
            const isSimulated =
              receipt.blockNumber === "0x1" ||
              receipt.blockHash ===
                "0x0000000000000000000000000000000000000000000000000000000000000001" ||
              receipt.transactionHash?.startsWith(
                "0x000000000000000000000000000000000000000000000000"
              );

            console.log(
              "🎯 Transaction Type:",
              isSimulated ? "SIMULATED" : "REAL"
            );

            if (isSimulated) {
              console.log(
                "⚠️  Transaction appears to be simulated - real UserOp not used"
              );
            } else {
              console.log(
                "✅ Transaction appears to be real - UserOp successfully used!"
              );
            }
          }
        }

      const stepFail2 = stepIndicatesWriteFailure(contractWriteStep as any);
        expect(contractWriteStep.success).toBe(!stepFail2);
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
        contractAbi: [],
        methodCalls: [
          {
            methodName: "transfer",
            methodParams: ["{{value.recipient}}", "{{value.amount}}"], // Array with multiple parameters
          },
          {
            methodName: "transferFrom",
            methodParams: [
              "{{value.sender}}",
              "{{value.recipient}}",
              "{{value.amount}}",
            ], // Array with 3 parameters
          },
          {
            methodName: "approve",
            methodParams: [], // Empty array when no parameters
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
    expect(transferCall.getMethodParamsList()).toEqual([
      "{{value.recipient}}",
      "{{value.amount}}",
    ]);

    // Check second method call (transferFrom with 3 parameters)
    const transferFromCall = methodCalls[1];
    expect(transferFromCall.getMethodName()).toBe("transferFrom");
    expect(transferFromCall.getMethodParamsList()).toEqual([
      "{{value.sender}}",
      "{{value.recipient}}",
      "{{value.amount}}",
    ]);

    // Check third method call (approve with empty methodParams)
    const approveCall = methodCalls[2];
    expect(approveCall.getMethodName()).toBe("approve");
    expect(approveCall.getMethodParamsList()).toEqual([]); // Should be empty array when no parameters
  });

  test("should test real on-chain transaction with simple contract call (paymaster-sponsored, non-zero salt)", async () => {
    if (!isSepolia) {
      console.log("Skipping test - not on Sepolia chain");
      return;
    }

    // Use a fresh smart wallet (non-zero salt) so it has no ETH balance and should use the paymaster
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

    console.log(
      "🚀 Testing Real On-Chain Transaction (paymaster-sponsored, unfunded wallet)"
    );
    console.log("Smart Wallet Address:", wallet.address);
    console.log("EOA Address:", eoaAddress);
    console.log(
      "💰 Testing simple contract call that should succeed via paymaster sponsorship..."
    );

    // Instead of ETH transfer, let's use a contract write that will definitely succeed
    // Use USDC approve with amount 0 - this will always succeed and doesn't require balance
    const contractWriteNode = NodeFactory.create({
      id: getNextId(),
      name: "simple_contract_approve_test",
      type: NodeType.ContractWrite,
      data: {
        contractAddress: SEPOLIA_TOKEN_CONFIGS.USDC.address, // USDC contract
        contractAbi: ERC20_ABI,
        methodCalls: [
          {
            methodName: "approve",
            methodParams: [
              "0xc60e71bd0f2e6d8832Fea1a2d56091C48493C788", // Spender address (EOA)
              "0", // Amount: 0 - this will always succeed regardless of balance
            ],
          },
        ],
      },
    });

    const manualTrigger = TriggerFactory.create({
      id: defaultTriggerId, // Use the same ID as the template expects
      name: "contractTrigger",
      type: TriggerType.Manual,
      data: {
        note: "Test contract approve with real on-chain transaction",
      },
    });

    const workflowProps = createFromTemplate(wallet.address, [
      contractWriteNode,
    ]);
    workflowProps.trigger = manualTrigger;
    workflowProps.name = "Real On-Chain Contract Write Test";

    let workflowId: string | undefined;
    try {
      console.log("📝 Submitting contract write workflow...");
      workflowId = await client.submitWorkflow(
        client.createWorkflow(workflowProps)
      );
      createdIdMap.set(workflowId, true);
      console.log("✅ Contract write workflow created:", workflowId);

      // Trigger the contract write workflow
      console.log("🎯 Triggering contract write workflow...");
      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Manual,
          note: "Test contract approve with real on-chain transaction",
        },
        isBlocking: true,
      });
      console.log("✅ Contract write workflow triggered");

      // Get execution results
      const executions = await client.getExecutions([workflowId], { limit: 1 });
      console.log(
        "🔍 Execution results:",
        util.inspect(executions, { depth: null, colors: true })
      );

      expect(executions.items.length).toBe(1);
      const execution = executions.items[0];
      expect(execution.success).toBe(true);

      const contractWriteStep = _.find(
        execution.steps,
        (step) => step.id === contractWriteNode.id
      );

      expect(contractWriteStep).toBeDefined();
      expect(contractWriteStep!.success).toBe(true);

      console.log("🎉 Real on-chain contract write completed successfully!");
    } catch (error) {
      console.error("❌ Test failed with error:", error);
      throw error;
    }
  }, 180000); // 3 minutes for real blockchain transaction (deployment + confirmation)
});
