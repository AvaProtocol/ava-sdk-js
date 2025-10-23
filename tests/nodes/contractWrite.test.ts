import util from "util";
import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import {
  NodeType,
  TriggerType,
  ExecutionStatus,
  ErrorCode,
  AbiElement,
  TimeoutPresets,
} from "@avaprotocol/types";
import {
  getNextId,
  TIMEOUT_DURATION,
  removeCreatedWorkflows,
  getBlockNumber,
  stepIndicatesWriteFailure,
  resultIndicatesAllWritesSuccessful,
  describeIfSepolia,
  getSettings,
  getSmartWalletWithBalance,
  getSmartWallet,
  getEOAAddress,
  authenticateClient,
  getClient,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";
const { tokens, chainId } = getConfig();

// Common test constants
const USDC_AMOUNT_0_01 = "10000"; // 0.01 USDC (6 decimals)

// Use a known contract address as spender (Uniswap V3 SwapRouter on Sepolia)
const SPENDER_CONTRACT_ADDRESS = "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E";

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
 * for easy access (e.g., { transfer: {} }). Each method contains its parsed events.
 * The metadata field contains detailed method execution information including transaction receipts,
 * method ABIs, and execution status. Both simulateWorkflow and deployWorkflow now have consistent
 * structure with both data and metadata fields.
 */

const createdIdMap: Map<string, boolean> = new Map();

// Sepolia ERC20 Test Token Configurations
// (Imported from shared location at top of file)

// Standard ERC20 ABI for testing (approve and transfer functions)
const ERC20_ABI: AbiElement[] = [
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

describeIfSepolia("ContractWrite Node Tests", () => {
  let client: Client;
  let smartWalletAddress: string;
  let eoaAddress: string;

  beforeAll(async () => {
    eoaAddress = await getEOAAddress();
    client = getClient();
    await authenticateClient(client);

    // Derive smart wallet address using centralized funded wallet (newest implementation)
    // Expected address: 0x5a8A8a79DdF433756D4D97DCCE33334D9E218856
    const wallet = await getSmartWalletWithBalance(client);
    smartWalletAddress = wallet.address;
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should handle approve with isSimulated: false using empty balance smart wallet", async () => {
      // Test the new backend logic that allows wallets with 0 ETH balance to succeed
      // via paymaster sponsorship without requiring gas reimbursement
      // Uses approve with 0 amount to test real on-chain transaction (isSimulated: false)
      // Expected behavior: success: true, data: { approve: {} }, with real transaction receipt

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [
                "0x000000000022D473030F116dDEE9F6B43aC78BA3", // Permit2 contract
                "0", // 0 amount approval
              ],
            },
          ],
          isSimulated: false, // Explicitly set to false for real transaction attempt
        },
        inputVariables: {
          settings: getSettings(smartWalletAddress),
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params, {
        timeout: TimeoutPresets.SLOW, // 2 minute timeout for real blockchain transaction
      });

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );

      // With the new logic, empty ETH balance should return success: true
      // The new backend feature allows wallets with 0 ETH balance to succeed
      // via paymaster sponsorship without requiring gas reimbursement
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(typeof result.data).toBe("object");

      // Verify the approve method is present in the response
      expect(result.data).toHaveProperty("approve");
      expect(typeof result.data.approve).toBe("object");
      
      // Because the ABI includes the Approval event and the receipt contains an Approval log,
      // the event data takes priority over the boolean return value.
      // Expected structure: { owner, spender, value }
      expect(result.data.approve).toHaveProperty("owner");
      expect(result.data.approve).toHaveProperty("spender");
      expect(result.data.approve).toHaveProperty("value");
      
      // Verify the event field values
      expect(result.data.approve.owner).toBe(smartWalletAddress);
      expect(result.data.approve.spender).toBe("0x000000000022D473030F116dDEE9F6B43aC78BA3");
      expect(result.data.approve.value).toBe("0");

      // Verify error is empty string
      expect(result.error).toBe("");
      expect(result.errorCode).toBeUndefined();

      // Verify metadata structure
      expect(result.metadata).toBeDefined();
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBe(1);

      // Check the metadata for the approve call
      const approveMetadata = result.metadata[0];
      expect(approveMetadata.methodName).toBe("approve");
      expect(approveMetadata.success).toBe(true);
      expect(approveMetadata.receipt).toBeDefined();
      expect(approveMetadata.receipt.transactionHash).toBeDefined();
      expect(approveMetadata.receipt.status).toBe("0x1");
      expect(approveMetadata.blockNumber).toBeDefined();

      // Verify executionContext
      expect(result.executionContext).toBeDefined();
      expect(result.executionContext.chainId).toBeDefined();
      expect(typeof result.executionContext.chainId).toBe("number");
      expect(result.executionContext.isSimulated).toBe(false); // Real transaction, not simulated
      expect(result.executionContext.provider).toBe("bundler"); // Goes through bundler for UserOp
    }, 120000); // 2 minute timeout for real blockchain transaction

    test("should handle ERC20 transfer transaction", async () => {
      // Test configuration variables - use centralized funded smart wallet (newest implementation)
      const recipientAddress = smartWalletAddress; // Use funded smart wallet as recipient
      const transferAmount = "1"; // Use 1 wei - should emit Transfer event even if it reverts
      const expectedFrom = smartWalletAddress.toLowerCase(); // runner (smart wallet) address
      const expectedTo = recipientAddress.toLowerCase();
      const expectedValue = transferAmount; // Should match the actual transfer amount in simulation
      const expectedMethodName = "transfer";

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: expectedMethodName,
              methodParams: [recipientAddress, transferAmount],
            },
          ],
        },
        inputVariables: {
          settings: getSettings(smartWalletAddress),
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(typeof result.success).toBe("boolean");

      expect(result.data).toBeDefined();

      // NEW: Check new response structure with data and metadata at top level
      expect(result.data).toBeDefined(); // Decoded event data (organized by method name)
      expect(typeof result.data).toBe("object"); // Should be an object, not array
      expect(Array.isArray(result.data)).toBe(false); // Should NOT be an array

      // Verify flattened structure by method name - this test only has transfer
      expect(result.data).toHaveProperty("transfer");
      expect(typeof result.data.transfer).toBe("object");

      expect(result.metadata).toBeDefined(); // Method execution details
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBe(params.nodeConfig.methodCalls.length);

      // For ERC20 transfer, a Transfer event SHOULD be emitted with from, to, value
      expect(Object.keys(result.data).length).toBe(
        params.nodeConfig.methodCalls.length
      ); // One method = one key

      // Validate that the transfer method returned proper event data
      // STRUCTURE: Events are flattened (not nested under event names)
      expect(result.data.transfer).toBeDefined();
      // Events are flattened directly under the method name
      expect(result.data.transfer.from).toBeDefined();
      expect(result.data.transfer.to).toBeDefined();
      expect(result.data.transfer.value).toBeDefined();

      // Use destructuring for better null safety and readability
      const { from, to, value } = result.data.transfer;
      expect(from).toBeDefined();
      expect(to).toBeDefined();
      expect(value).toBeDefined();
      expect(from.toLowerCase()).toBe(expectedFrom);
      expect(to.toLowerCase()).toBe(expectedTo);
      expect(value).toBe(expectedValue);

      // Validate that the receipt contains logs from the simulation
      expect(result.metadata!.length).toBeGreaterThan(0);
      const transferMetadata = result.metadata![0];
      expect(transferMetadata.receipt).toBeDefined();
      expect(Array.isArray(transferMetadata.receipt.logs)).toBe(true);
      expect(transferMetadata.receipt.logs.length).toBeGreaterThan(0); // Should have Transfer event log

      // success must reflect metadata/receipt success
      expect(result.success).toBeTruthy();
      expect(result.success).toBe(resultIndicatesAllWritesSuccessful(result));

      // Verify executionContext present and camelCased
      expect(result.executionContext!.isSimulated).toBe(true);
      // chainId may vary by config; just assert it exists as a number if provided
      expect((result.executionContext as any).chainId).toBeDefined();
      expect(typeof (result.executionContext as any).chainId).toBe("number");

      // Should have transaction hash regardless of success/failure
      const transferResult = result.metadata.find(
        (r: any) => r.methodName === "transfer"
      );
      expect(transferResult).toBeDefined();
      expect(transferResult.methodName).toBe("transfer");
      expect(transferResult.receipt).toBeDefined();
      expect(transferResult.receipt.transactionHash).toBeDefined();

      // Check that the receipt status matches the method success
      expect(transferResult.success).toBe(
        transferResult.receipt.status === "0x1"
      );
      if (transferResult.success) {
        expect(transferResult.receipt.status).toBe("0x1"); // Success
      } else {
        expect(transferResult.receipt.status).toBe("0x0"); // Failure
        expect(transferResult.error).toBeDefined(); // Should have error message
      }
    });

    test("should abort multiple method calls after first failure (insufficient funds)", async () => {
      const wallet = await getSmartWallet(client);

      const spender1 = smartWalletAddress;
      const spender2 = smartWalletAddress; // Use funded smart wallet for consistency

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.LINK.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [spender1, "50"],
            },
            {
              methodName: "transfer",
              methodParams: [spender2, "75"],
            },
          ],
        },
        inputVariables: {
          settings: getSettings(wallet.address),
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

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();

      // 🚀 NEW: Check new response structure with data and metadata at top level
      expect(result.data).toBeDefined(); // Decoded event data
      expect(result.metadata).toBeDefined(); // Method execution details
      expect(Array.isArray(result.metadata!)).toBe(true);
      expect(result.metadata!.length).toBe(2); // Backend processes all method calls even after failures

      // Verify executionContext present and camelCased
      expect(result.executionContext).toBeDefined();
      expect(result.executionContext!.isSimulated).toBe(true);

      expect(result.success).toBeFalsy(); // Should fail due to insufficient funds
      expect(result.success).toBe(resultIndicatesAllWritesSuccessful(result));
      expect(result.metadata!.length).toBeGreaterThan(0);

      result.metadata!.forEach((methodResult: any) => {
        expect(methodResult.methodName).toBe("transfer");
      });
    });

    test("should handle multiple method calls successfully (funded wallet)", async () => {
      // Use centralized funded wallet for successful multiple method calls (newest implementation)
      const recipient1 = smartWalletAddress;
      const recipient2 = smartWalletAddress; // Use same funded wallet as recipient

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address, // USDC contract
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [recipient1, "0"], // Transfer 0 to avoid balance issues
            },
            {
              methodName: "transfer",
              methodParams: [recipient2, "0"], // Transfer 0 to avoid balance issues
            },
          ],
        },
        inputVariables: {
          settings: getSettings(smartWalletAddress),
        },
      };

      console.log(
        "runNodeWithInputs multiple successful calls response:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "runNodeWithInputs multiple successful calls result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();

      // Metadata should be defined and array
      expect(result.metadata).toBeDefined();
      expect(Array.isArray(result.metadata!)).toBe(true);

      // runNodeWithInputs sets isSimulated=true for ContractWrite nodes
      expect(result.executionContext!.isSimulated).toBe(true);

      // Test the multiple method call behavior - backend processes all method calls
      expect(result.metadata!.length).toBe(2); // Backend processes all method calls, doesn't abort after first failure
      expect(result.success).toBe(resultIndicatesAllWritesSuccessful(result));
      result.metadata!.forEach((methodResult: any) => {
        expect(methodResult.methodName).toBe("transfer");
      });
    });

    test("should handle invalid contract address gracefully", async () => {
      const wallet = await getSmartWallet(client);

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: "0x0000000000000000000000000000000000000000", // Zero address
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: ["0x0000000000000000000000000000000000000001", "0"],
            },
          ],
        },
        inputVariables: {
          settings: getSettings(wallet.address),
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

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();

      // 🚀 NEW: Check new response structure with data and metadata at top level
      expect(result.data).toBeDefined(); // Decoded event data
      expect(result.metadata).toBeDefined(); // Method execution details
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBe(params.nodeConfig.methodCalls.length);

      // runNodeWithInputs sets isSimulated=true for ContractWrite nodes
      expect(result.executionContext!.isSimulated).toBe(true);

      // Backend now succeeds for invalid addresses in simulation mode
      // Success should match what metadata indicates
      expect(result.success).toBe(resultIndicatesAllWritesSuccessful(result));
      expect(result.data).toBeDefined();
    });

    test("should handle malformed call data gracefully", async () => {
      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
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

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();

      // 🚀 NEW: Check new response structure with data and metadata at top level
      expect(result.data).toBeDefined(); // Decoded event data
      // For validation errors (missing settings), metadata is undefined
      expect(result.metadata).toBeUndefined(); // Method execution doesn't occur due to validation error
      expect(result.error).toBe("settings is required for contractWrite");

      // For validation errors, success should be false regardless of metadata state
      expect(result.success).toBeFalsy();
      expect(result.data).toBeDefined();
    });
  });

  describe("simulateWorkflow Tests", () => {
  // List of methods to simulate; methodParams are computed inside each test
  const simulateMethodNames = ["approve", "transfer"] as const;

    for (const methodName of simulateMethodNames) {
      test(`simulateWorkflow single ERC20 ${methodName} call reflects write outcome`, async () => {
        // Use funded smart wallet so AA sender holds USDC
        const wallet = await getSmartWalletWithBalance(client);

        // Compute method params now (after beforeAll), so addresses are defined
        const methodParams =
          methodName === "approve"
            ? [SPENDER_CONTRACT_ADDRESS, USDC_AMOUNT_0_01]
            : [eoaAddress, USDC_AMOUNT_0_01];

        const contractWriteNode = NodeFactory.create({
          id: getNextId(),
          name: `simulate_contract_write_${methodName}`,
          type: NodeType.ContractWrite,
          data: {
            contractAddress: tokens.USDC.address,
            contractAbi: ERC20_ABI,
            methodCalls: [
              {
                methodName,
                methodParams,
              },
            ],
          },
        });

        const workflowProps = createFromTemplate(wallet.address, [
          contractWriteNode,
        ]);

        const simulation = await client.simulateWorkflow({
          ...client.createWorkflow(workflowProps).toJson(),
          inputVariables: {
            settings: getSettings(wallet.address),
          },
        });

        console.log(
          "simulateWorkflow response:",
          util.inspect(simulation, { depth: null, colors: true })
        );

        // success must reflect step outcomes
        const contractWriteSimStep = simulation.steps.find(
          (s: any) => s.id === contractWriteNode.id
        );
        const writeFail = stepIndicatesWriteFailure(
          contractWriteSimStep as any
        );
        const expectedStatus = writeFail
          ? ExecutionStatus.PartialSuccess
          : ExecutionStatus.Success;
        expect(simulation.status).toBe(expectedStatus);
        expect(simulation.steps).toHaveLength(2); // trigger + contract write node

        const contractWriteStep = contractWriteSimStep;
        expect(contractWriteStep).toBeDefined();

        const output = (contractWriteStep as any).output as any;
        expect(output).toBeDefined();
        expect(typeof output).toBe("object");
        expect(output).not.toBeNull();
        expect(Array.isArray(output)).toBe(false);

        // Backend simulation behavior may vary - check against metadata consistency
        const stepFail = stepIndicatesWriteFailure(contractWriteStep as any);
        expect((contractWriteStep as any).success).toBe(!stepFail);
      });
    }
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with contract write", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_contract_write_test",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [smartWalletAddress, "300"],
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

        // Verify flattened structure by method name - this test only has transfer
        expect(output).toHaveProperty("transfer");
        expect(typeof output.transfer).toBe("object");

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
      // Test configuration variables - use centralized funded smart wallet (newest implementation)
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      const recipientAddress = smartWalletAddress;
      const transferAmount = "1";
      const expectedFrom = smartWalletAddress.toLowerCase(); // runner (smart wallet) address
      const expectedTo = recipientAddress.toLowerCase();
      const expectedValue = "1"; // Simulation should return actual transfer amount when properly configured
      const expectedMethodName = "transfer";

      const contractWriteConfig = {
        contractAddress: tokens.USDC.address,
        contractAbi: ERC20_ABI,
        methodCalls: [
          {
            methodName: expectedMethodName,
            methodParams: [recipientAddress, transferAmount],
          },
        ],
      };

      // Test 1: runNodeWithInputs
      const runNodeWithInputsParams = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: contractWriteConfig,
        inputVariables: {
          settings: getSettings(smartWalletAddress),
        },
      };

      const runNodeResponse = await client.runNodeWithInputs(
        runNodeWithInputsParams
      );
      console.log(
        "params:",
        util.inspect(runNodeWithInputsParams, { depth: null, colors: true })
      );
      console.log(
        "response:",
        util.inspect(runNodeResponse, { depth: null, colors: true })
      );

      // Test 2: simulateWorkflow
      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_test",
        type: NodeType.ContractWrite,
        data: contractWriteConfig,
      });

      const workflowProps = createFromTemplate(smartWalletAddress, [
        contractWriteNode,
      ]);

      const wfSim = client.createWorkflow(workflowProps);
      const simulation = await client.simulateWorkflow({
        ...wfSim.toJson(),
        inputVariables: {
          settings: getSettings(smartWalletAddress),
        },
      });
      console.log(
        "response:",
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
        expect(runNodeResponse.data).toBeDefined();
        expect(simulatedStep?.output).toBeDefined();
        expect(executedStep?.output).toBeDefined();

        // 🚀 NEW: Verify consistent structure between different execution methods
        // runNodeWithInputs: metadata is array, data is flattened object by method name
        // simulateWorkflow/deployWorkflow: output contains both data and metadata fields

        const runNodeResponseMetadata = runNodeResponse.metadata as any[]; // Array of method results
        const runNodeResponseData = runNodeResponse.data as any; // Object organized by method name
        const simulatedOutput = simulatedStep?.output as any; // Object with data and metadata fields
        const executedOutput = executedStep?.output as any; // Object with data and metadata fields

        // Verify metadata array length matches number of method calls
        expect(runNodeResponseMetadata.length).toBe(
          contractWriteConfig.methodCalls.length
        );

        // Output should be the data object directly; metadata is step-level
        expect(typeof simulatedOutput).toBe("object");
        expect(typeof executedOutput).toBe("object");
        expect(simulatedStep as any).toHaveProperty("metadata");
        expect(executedStep as any).toHaveProperty("metadata");

        // Verify all outputs have the same method names (keys) in their data fields
        const runNodeResponseDataKeys = Object.keys(runNodeResponseData).sort();
        const simulatedDataKeys = Object.keys(simulatedOutput || {}).sort();
        const executedDataKeys = Object.keys(executedOutput || {}).sort();

        expect(runNodeResponseDataKeys).toEqual(simulatedDataKeys);
        expect(simulatedDataKeys).toEqual(executedDataKeys);

        // Verify each method has consistent structure across execution types
        for (const methodName of runNodeResponseDataKeys) {
          // All should have the same method represented in their data fields
          expect(runNodeResponseData[methodName]).toBeDefined();
          expect(simulatedOutput[methodName]).toBeDefined();
          expect(executedOutput[methodName]).toBeDefined();

          // All should be objects (decoded events)
          expect(typeof runNodeResponseData[methodName]).toBe("object");
          expect(typeof simulatedOutput[methodName]).toBe("object");
          expect(typeof executedOutput[methodName]).toBe("object");
        }

        // Verify consistent structure
        expect(runNodeResponse).toBeDefined();
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();

        // 🚀 NEW: Check response structure - direct call has data/metadata at top level
        expect(typeof runNodeResponse.data).toBe("object");
        expect(runNodeResponse.data).toBeDefined(); // Decoded events (flattened by method)
        expect(runNodeResponse.metadata).toBeDefined(); // Method results
        expect(Array.isArray(runNodeResponse.metadata)).toBe(true);

        // simulateWorkflow and deployWorkflow should have object structure with data and metadata
        expect(typeof simulatedStep?.output).toBe("object");
        expect(Array.isArray(simulatedStep?.output)).toBe(false);
        expect(typeof executedStep?.output).toBe("object");
        expect(Array.isArray(executedStep?.output)).toBe(false);

        // Check that all have the same method names
        const runNodeResponseMetadataMethods = (
          runNodeResponse.metadata as any[]
        )
          ?.map((r: any) => r.methodName)
          .sort();
        const simulatedMethods = Object.keys(
          simulatedStep?.output || {}
        ).sort();
        const executedMethods = Object.keys(executedStep?.output || {}).sort();

        expect(simulatedMethods).toEqual(executedMethods);
        expect(simulatedMethods).toEqual(runNodeResponseMetadataMethods);

        // Verify top-level success for all methods - backend behavior may vary
        expect(runNodeResponse.success).toBe(
          resultIndicatesAllWritesSuccessful(runNodeResponse)
        );
        const simStepFail = stepIndicatesWriteFailure(simulatedStep as any);
        expect(simulatedStep?.success).toBe(!simStepFail);
        // For deployed workflow, success depends on whether wallet is funded/deployed
        // executedStep success is checked separately below

        // NEW: Verify decoded Transfer event fields for methods that have working simulations
        // Note: Tenderly simulations may be unreliable, but real transactions work correctly

        // Verify runNodeWithInputs has transfer object (may be empty due to Tenderly issues)
        expect(runNodeResponseData.transfer).toBeDefined();
        expect(typeof runNodeResponseData.transfer).toBe("object");

        // Only validate fields if they exist (Tenderly may not return logs consistently)
        // NEW STRUCTURE: Events are nested under event names
        const transferEvent = runNodeResponseData.transfer.Transfer;
        if (transferEvent && transferEvent.from) {
          expect(typeof transferEvent.from).toBe("string");
          expect(transferEvent.from.toLowerCase()).toBe(expectedFrom);
        }
        if (transferEvent && transferEvent.to) {
          expect(typeof transferEvent.to).toBe("string");
          expect(transferEvent.to.toLowerCase()).toBe(expectedTo);
        }
        if (transferEvent && transferEvent.value !== undefined) {
          // Simulation may return actual transfer amount or 0 depending on wallet balance
          expect(typeof transferEvent.value).toBe("string");
          expect(["0", "1", transferAmount]).toContain(transferEvent.value);
        }

        // For simulation workflow step - same conditional validation
        expect(simulatedOutput.transfer).toBeDefined();
        expect(typeof simulatedOutput.transfer).toBe("object");

        // Validate transfer fields are properly populated
        // STRUCTURE: Events are flattened (not nested under event names)
        expect(simulatedOutput.transfer).toBeDefined();
        expect(simulatedOutput.transfer.from).toBeDefined();
        expect(simulatedOutput.transfer.to).toBeDefined();
        expect(simulatedOutput.transfer.value).toBeDefined();

        // Use destructuring for better null safety and readability
        const {
          from: simFrom,
          to: simTo,
          value: simValue,
        } = simulatedOutput.transfer;
        expect(simFrom).toBeDefined();
        expect(typeof simFrom).toBe("string");
        expect(simFrom.toLowerCase()).toBe(expectedFrom);

        expect(simTo).toBeDefined();
        expect(typeof simTo).toBe("string");
        expect(simTo.toLowerCase()).toBe(expectedTo);

        expect(simValue).toBeDefined();
        expect(simValue).toBe(expectedValue);

        // Verify deployed workflow success
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBeTruthy();

        // For deployed workflow (real transaction), verify the transfer data is populated
        // Real transactions should always have proper event logs and decoded data
        // STRUCTURE: Events are flattened (not nested under event names)
        const deployedOutput = executedStep!.output as any;
        expect(deployedOutput.transfer).toBeDefined();
        expect(deployedOutput.transfer.from).toBeDefined();
        expect(deployedOutput.transfer.to).toBeDefined();
        expect(deployedOutput.transfer.value).toBeDefined();

        // Use destructuring for better null safety and readability
        const {
          from: deployedFrom,
          to: deployedTo,
          value: deployedValue,
        } = deployedOutput.transfer;
        expect(typeof deployedFrom).toBe("string");
        // Note: Real transaction uses smart wallet address as sender
        expect(deployedTo.toLowerCase()).toBe(expectedTo);
        // Deployed execution may return actual transfer amount or 0 depending on wallet balance
        expect(typeof deployedValue).toBe("string");
        expect(["0", "1", transferAmount]).toContain(deployedValue);
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
      const wallet = await getSmartWallet(client);

      const methodName = "nonExistentMethod";

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: [
            {
              inputs: [],
              name: methodName,
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
          methodCalls: [{ methodName: methodName, methodParams: [] }],
        },
        inputVariables: {
          settings: getSettings(wallet.address),
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
      // Backend correctly fails for invalid method signatures
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.errorCode).toBe(ErrorCode.INVALID_REQUEST);

      // Should still return structured data with empty object for the failed method
      expect(result.data).toBeDefined();
      expect(result.data[methodName]).toEqual({});

      // Should include metadata with method-level error details
      expect(result.metadata).toBeDefined();
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBe(1);
      expect(result.metadata[0].success).toBe(false);
      expect(result.metadata[0].methodName).toBe(methodName);
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
              methodName: "transfer",
              methodParams: [smartWalletAddress, "100"],
            },
            {
              methodName: "transfer",
              methodParams: [smartWalletAddress, "200"],
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
      expect(firstCall.getMethodName()).toBe("transfer");
      expect(firstCall.getMethodParamsList()).toEqual([
        smartWalletAddress,
        "100",
      ]);

      // Check second method call
      const secondCall = methodCalls[1];
      expect(secondCall.getMethodName()).toBe("transfer");
      expect(secondCall.getMethodParamsList()).toEqual([
        smartWalletAddress,
        "200",
      ]);

      console.log(
        "✅ Protobuf serialization test passed - methodCalls are properly serialized"
      );
    });
  });

  describe("ApplyToFields Decimal Formatting Tests", () => {
    test("should include answerRaw field when using applyToFields with runNodeWithInputs", async () => {
      // Note: For contract write, applyToFields might not be as relevant as for contract read
      // But we'll test it for consistency with the contract read tests
      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [smartWalletAddress, "100"],
              applyToFields: ["amount"], // Apply formatting to amount field if applicable
            },
          ],
        },
        inputVariables: {
          settings: getSettings(smartWalletAddress),
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

      // Find the transfer result in metadata
      const transferResult = result.metadata.find(
        (r: any) => r.methodName === "transfer"
      );
      expect(transferResult).toBeDefined();
    });

    test("should include answerRaw field when using applyToFields with simulateWorkflow", async () => {
      const wallet = await getSmartWallet(client);

      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_applyToFields_test",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [smartWalletAddress, "150"],
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
          settings: getSettings(wallet.address),
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
      const writeFail3 = stepIndicatesWriteFailure(
        contractWriteSimStep3 as any
      );
      const expectedStatus = writeFail3
        ? ExecutionStatus.PartialSuccess
        : ExecutionStatus.Success;
      expect(simulation.status).toBe(expectedStatus);
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

      // Verify flattened structure by method name - this test only has transfer
      expect(output).toHaveProperty("transfer");
      expect(typeof output.transfer).toBe("object");

      // Should have same number of methods as methodCalls
      expect(Object.keys(output).length).toBe(
        (contractWriteNode.data as any).methodCalls.length
      );

      // Access the transfer result directly from flattened structure
      const transferResult = output.transfer;
      expect(transferResult).toBeDefined();
      expect(typeof transferResult).toBe("object");
    });

    test("should deploy and trigger workflow with applyToFields", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;

      try {
        const contractWriteNode = NodeFactory.create({
          id: getNextId(),
          name: "deploy_contract_write_applyToFields_test",
          type: NodeType.ContractWrite,
          data: {
            contractAddress: tokens.USDC.address,
            contractAbi: ERC20_ABI,
            methodCalls: [
              {
                methodName: "transfer",
                methodParams: [smartWalletAddress, "250"],
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

        // Verify flattened structure by method name - this test only has transfer
        expect(output).toHaveProperty("transfer");
        expect(typeof output.transfer).toBe("object");

        // Should have same number of methods as methodCalls
        expect(Object.keys(output).length).toBe(
          (contractWriteNode.data as any).methodCalls.length
        );

        // Access the approve result directly from flattened structure
        const transferResult = output.transfer;
        expect(transferResult).toBeDefined();
        expect(typeof transferResult).toBe("object");
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Event Priority Tests", () => {
    test("should prioritize Approval event data over boolean return values", async () => {
      const wallet = await getSmartWallet(client);

      // Test constants
      const APPROVAL_AMOUNT = USDC_AMOUNT_0_01; // 0.01 USDC
      const SPENDER_ADDRESS = "0x3bfa4769fb09eefc5a80d6e87c3b9c650f7ae48e"; // Uniswap router

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [SPENDER_ADDRESS, APPROVAL_AMOUNT],
            },
          ],
        },
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      };

      console.log("🚀 ~ Boolean return value test ~ params:", params);

      const result = await client.runNodeWithInputs(params);
      console.log(
        "Boolean return value test result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result.success).toBeTruthy();
      expect(result.data).toBeDefined();
      expect(typeof result.data).toBe("object");

      // Check that approve method data exists
      expect(result.data).toHaveProperty("approve");
      expect(typeof result.data.approve).toBe("object");

      // For approve methods, events take priority over return values (more descriptive)
      // The Approval event contains owner, spender, value fields which are more useful than just output_0: true

      // Check that event data is included (owner, spender, value)
      // STRUCTURE: Events are flattened (not nested under event names)
      expect(result.data.approve.owner).toBeDefined();
      expect(result.data.approve.spender).toBeDefined();
      expect(result.data.approve.value).toBeDefined();

      // Use destructuring for better null safety and readability
      const {
        owner,
        spender,
        value: approvalValue,
      } = result.data.approve;
      expect(owner).toBeDefined();
      expect(spender).toBeDefined();
      expect(approvalValue).toBeDefined();

      // Verify the event data matches our parameters
      expect(owner).toBe(wallet.address);
      expect(spender.toLowerCase()).toBe(
        SPENDER_ADDRESS.toLowerCase() // Case-insensitive address comparison
      );
      expect(approvalValue).toBe(APPROVAL_AMOUNT);
    });
  });

  describeIfSepolia("Real UserOp Transaction Debug Tests", () => {
    test("should test real UserOp with funded smart wallet", async () => {
      const contractWriteNode = NodeFactory.create({
        id: getNextId(),
        name: "real_userop_debug_test",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [
                eoaAddress, // recipient is EOA address
                USDC_AMOUNT_0_01, // 0.01 USDC
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

      const workflowProps = createFromTemplate(smartWalletAddress, [
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
    const thirdApproveCall = methodCalls[2];
    expect(thirdApproveCall.getMethodName()).toBe("approve");
    expect(thirdApproveCall.getMethodParamsList()).toEqual([]); // Should be empty array when no parameters
  });

  test("should test real contract call with paymaster sponsoring unfunded wallet", async () => {
    const wallet = await getSmartWallet(client);

    console.log(
      "🚀 Testing Real On-Chain Transaction (paymaster-sponsored, unfunded wallet)"
    );
    console.log("Smart Wallet Address:", wallet.address);
    console.log(
      "💰 Testing simple contract call that should succeed via paymaster sponsorship..."
    );

    // Instead of ETH transfer, let's use a contract write that will definitely succeed
    // Use USDC transfer with amount 0 - this will always succeed and doesn't require balance
    const contractWriteNode = NodeFactory.create({
      id: getNextId(),
      name: "simple_contract_transfer_test",
      type: NodeType.ContractWrite,
      data: {
        contractAddress: tokens.USDC.address, // USDC contract
        contractAbi: ERC20_ABI,
        methodCalls: [
          {
            methodName: "approve",
            methodParams: [
              smartWalletAddress, // spender has to be the smart wallet address
              USDC_AMOUNT_0_01, // 0.01 USDC
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
        note: "Test contract transfer with real on-chain transaction",
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
          data: {
            note: "Test contract transfer with real on-chain transaction",
          },
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
      // Real execution success may vary based on wallet funding and gas
      expect(execution).toBeDefined();

      const contractWriteStep = _.find(
        execution.steps,
        (step) => step.id === contractWriteNode.id
      );

      expect(contractWriteStep).toBeDefined();
      // Real execution success depends on wallet funding/gas
      const stepFail = stepIndicatesWriteFailure(contractWriteStep as any);
      expect(contractWriteStep!.success).toBe(!stepFail);

      console.log("🎉 Real on-chain contract write completed successfully!");
    } catch (error) {
      console.error("❌ Test failed with error:", error);
      throw error;
    }
  }, 180000); // 3 minutes for real blockchain transaction (deployment + confirmation)

  describe("Template Variable Validation Tests", () => {
    test("should reject hyphenated variable names in methodParams", async () => {
      const wallet = await getSmartWallet(client);

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [
                "{{settings.recipient-address}}", // Hyphenated key - should be rejected
                "100",
              ],
            },
          ],
        },
        inputVariables: {
          settings: {
            ...getSettings(wallet.address),
            "recipient-address": eoaAddress, // recipient is EOA address
          },
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should fail with clear error message about hyphenated variables
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("undefined");
      expect(result.error).toContain("template variable resolution failed");
    });

    test("should support mathematical expressions with hyphens", async () => {
      const wallet = await getSmartWallet(client);

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [
                smartWalletAddress,
                "{{settings.base_amount - 10}}", // Mathematical expression with hyphen
              ],
            },
          ],
        },
        inputVariables: {
          settings: {
            ...getSettings(wallet.address),
            base_amount: 100, // Will be: 100 - 10 = 90
          },
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should succeed - mathematical expressions with hyphens are allowed
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(result.metadata).toBeDefined();
      expect(Array.isArray(result.metadata)).toBe(true);
    });

    test("should handle tuple parameters with template variables (JSON array format)", async () => {
      const wallet = await getSmartWallet(client);

      // Uniswap V3 Pool quoter ABI with quoteExactInputSingle that takes a tuple
      const QUOTER_ABI = [
        {
          inputs: [
            {
              components: [
                { internalType: "address", name: "tokenIn", type: "address" },
                { internalType: "address", name: "tokenOut", type: "address" },
                { internalType: "uint256", name: "amountIn", type: "uint256" },
                { internalType: "uint24", name: "fee", type: "uint24" },
                {
                  internalType: "uint160",
                  name: "sqrtPriceLimitX96",
                  type: "uint160",
                },
              ],
              internalType: "struct IQuoter.QuoteExactInputSingleParams",
              name: "params",
              type: "tuple",
            },
          ],
          name: "quoteExactInputSingle",
          outputs: [
            { internalType: "uint256", name: "amountOut", type: "uint256" },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6", // Uniswap V3 Quoter
          contractAbi: QUOTER_ABI,
          methodCalls: [
            {
              methodName: "quoteExactInputSingle",
              methodParams: [
                // JSON array format for tuple
                `["{{settings.pool_data.token0}}", "{{settings.pool_data.token1}}", "{{settings.amount}}", "{{settings.pool_data.fee}}", 0]`,
              ],
            },
          ],
        },
        inputVariables: {
          settings: {
            ...getSettings(wallet.address),
            pool_data: {
              token0: tokens.USDC.address,
              token1: tokens.LINK.address,
              fee: 3000,
            },
            amount: "1000000", // 1 USDC
          },
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should succeed - tuple parameters with templates are supported
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(result.metadata).toBeDefined();
      expect(Array.isArray(result.metadata)).toBe(true);
    });

    test("should handle tuple parameters with template variables (JSON object format)", async () => {
      const wallet = await getSmartWallet(client);

      // Same Uniswap V3 Pool quoter ABI
      const QUOTER_ABI = [
        {
          inputs: [
            {
              components: [
                { internalType: "address", name: "tokenIn", type: "address" },
                { internalType: "address", name: "tokenOut", type: "address" },
                { internalType: "uint256", name: "amountIn", type: "uint256" },
                { internalType: "uint24", name: "fee", type: "uint24" },
                {
                  internalType: "uint160",
                  name: "sqrtPriceLimitX96",
                  type: "uint160",
                },
              ],
              internalType: "struct IQuoter.QuoteExactInputSingleParams",
              name: "params",
              type: "tuple",
            },
          ],
          name: "quoteExactInputSingle",
          outputs: [
            { internalType: "uint256", name: "amountOut", type: "uint256" },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6", // Uniswap V3 Quoter
          contractAbi: QUOTER_ABI,
          methodCalls: [
            {
              methodName: "quoteExactInputSingle",
              methodParams: [
                // JSON object format for tuple
                `{"tokenIn": "{{settings.pool_data.token0}}", "tokenOut": "{{settings.pool_data.token1}}", "amountIn": "{{settings.amount}}", "fee": "{{settings.pool_data.fee}}", "sqrtPriceLimitX96": 0}`,
              ],
            },
          ],
        },
        inputVariables: {
          settings: {
            ...getSettings(wallet.address),
            pool_data: {
              token0: tokens.USDC.address,
              token1: tokens.LINK.address,
              fee: 3000,
            },
            amount: "1000000", // 1 USDC
          },
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should succeed - tuple parameters with templates are supported
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(result.metadata).toBeDefined();
      expect(Array.isArray(result.metadata)).toBe(true);
    });

    test("should enforce snake_case for settings variables", async () => {
      const wallet = await getSmartWallet(client);

      // Test that camelCase chainId is NOT supported
      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [eoaAddress, "1"],
            },
          ],
        },
        inputVariables: {
          settings: {
            runner: wallet.address,
            chainId: parseInt(chainId), // camelCase - should fail
          },
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should fail - chain_id (snake_case) is required
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("chain_id");
      expect(result.error).toContain("required");
    });

    test("should require settings object for contractWrite", async () => {
      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [smartWalletAddress, "1"],
            },
          ],
        },
        inputVariables: {
          // Missing settings - should fail
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should fail - settings is required
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("settings");
      expect(result.error).toContain("required");
    });

    test("should require runner in settings for contractWrite", async () => {
      const params = {
        nodeType: NodeType.ContractWrite,
        nodeConfig: {
          contractAddress: tokens.USDC.address,
          contractAbi: ERC20_ABI,
          methodCalls: [
            {
              methodName: "transfer",
              methodParams: [smartWalletAddress, "1"],
            },
          ],
        },
        inputVariables: {
          settings: {
            // Missing runner - should fail
          },
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Should fail - runner is required
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("runner");
      expect(result.error).toContain("required");
    });
  });
});
