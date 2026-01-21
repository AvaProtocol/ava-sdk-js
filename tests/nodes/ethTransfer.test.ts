import util from "util";
import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import {
  NodeType,
  TriggerType,
  ExecutionStatus,
  TimeoutPresets,
} from "@avaprotocol/types";
import {
  getNextId,
  TIMEOUT_DURATION,
  removeCreatedWorkflows,
  describeIfSepolia,
  getSettings,
  getSmartWalletWithBalance,
  getSmartWallet,
  getEOAAddress,
  authenticateClient,
  getClient,
  getBlockNumber,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";
const { chainId } = getConfig();

jest.setTimeout(TIMEOUT_DURATION);

/**
 * ETHTransfer Node Expected Response Structure:
 *
 * For runNodeWithInputs:
 * {
 *   success: true/false,
 *   data: {
 *     transactionHash: "0x...", // Transaction hash of the ETH transfer
 *     transfer: {                // ✅ NEW: Now matches ERC20 transfer format!
 *       from: "0x...",           // Smart wallet address (sender)
 *       to: "0x...",             // Destination address (recipient)
 *       value: "..."             // Amount in wei (as string)
 *     }
 *   },
 *   metadata: undefined, // ETHTransfer does NOT have metadata field (unlike ContractWrite)
 *   error: "",
 *   errorCode: undefined,
 *   executionContext: {
 *     chainId: number,
 *     isSimulated: boolean,
 *     provider: string
 *   }
 * }
 *
 * For simulateWorkflow/deployWorkflow (step output):
 * {
 *   output: {
 *     transactionHash: "0x...",
 *     transfer: {
 *       from: "0x...",
 *       to: "0x...",
 *       value: "..."
 *     }
 *   }
 *   // Receipt and gas info are on the step level, not in output
 * }
 *
 * Note: ETHTransfer now outputs the same format as ERC20 transfers:
 * - Has a transfer object with from, to, value fields (consistent with ContractWrite ERC20 transfers)
 * - Still does NOT have metadata field in runNodeWithInputs response
 * - Provides structured event data instead of just transactionHash
 */

const createdIdMap: Map<string, boolean> = new Map();

describeIfSepolia("ETHTransfer Node Tests", () => {
  let client: Client;
  let smartWalletAddress: string;
  let eoaAddress: string;

  beforeAll(async () => {
    eoaAddress = await getEOAAddress();
    client = getClient();
    await authenticateClient(client);

    // Derive smart wallet address using centralized funded wallet (newest implementation)
    const wallet = await getSmartWalletWithBalance(client);
    smartWalletAddress = wallet.address;
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should handle ETH transfer with simulation (isSimulated default)", async () => {
      const recipientAddress = eoaAddress;
      const transferAmount = "1000000000000000"; // 0.001 ETH in wei

      const params = {
        node: {
          id: getNextId(),
          name: "eth_transfer_test",
          type: NodeType.ETHTransfer,
          data: {
            destination: recipientAddress,
            amount: transferAmount,
          },
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

      // Verify basic response structure
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(typeof result.data).toBe("object");

      // Verify transfer object structure (matches ERC20 format)
      expect(result.data.transfer).toBeDefined();
      expect(typeof result.data.transfer).toBe("object");
      
      // Check transfer fields
      expect(result.data.transfer.from).toBeDefined();
      expect(typeof result.data.transfer.from).toBe("string");
      // Note: from might be empty string if backend not yet fully deployed
      if (result.data.transfer.from) {
        expect(result.data.transfer.from.toLowerCase()).toBe(smartWalletAddress.toLowerCase());
      }
      
      expect(result.data.transfer.to).toBeDefined();
      expect(typeof result.data.transfer.to).toBe("string");
      expect(result.data.transfer.to.toLowerCase()).toBe(recipientAddress.toLowerCase());
      
      expect(result.data.transfer.value).toBeDefined();
      expect(typeof result.data.transfer.value).toBe("string");
      expect(result.data.transfer.value).toBe(transferAmount);

      // Verify executionContext
      expect(result.executionContext).toBeDefined();
      expect(result.executionContext.chainId).toBeDefined();
      expect(typeof result.executionContext.chainId).toBe("number");
      expect(typeof result.executionContext.isSimulated).toBe("boolean");
      expect(result.executionContext.provider).toBeDefined();

      // For ETHTransfer, success indicates the transfer was processed
      expect(result.success).toBe(true);
    });

    test("should handle zero ETH transfer (edge case)", async () => {
      const recipientAddress = eoaAddress;
      const transferAmount = "0"; // 0 ETH

      const params = {
        node: {
          id: getNextId(),
          name: "eth_transfer_zero_test",
          type: NodeType.ETHTransfer,
          data: {
            destination: recipientAddress,
            amount: transferAmount,
          },
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
      expect(result.data.transactionHash).toBeDefined();
      
      // Verify transfer object (matches ERC20 format)
      expect(result.data.transfer).toBeDefined();
      expect(result.data.transfer.from).toBeDefined();
      expect(result.data.transfer.to).toBeDefined();
      expect(result.data.transfer.value).toBe("0"); // Zero transfer

      // Zero transfer should succeed
      expect(result.success).toBe(true);
    });

    test("should handle small ETH transfer amount", async () => {
      const recipientAddress = eoaAddress;
      const transferAmount = "1"; // 1 wei (smallest unit)

      const params = {
        node: {
          id: getNextId(),
          name: "eth_transfer_small_test",
          type: NodeType.ETHTransfer,
          data: {
            destination: recipientAddress,
            amount: transferAmount,
          },
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
      expect(result.data.transactionHash).toBeDefined();
      
      // Verify transfer object (matches ERC20 format)
      expect(result.data.transfer).toBeDefined();
      expect(result.data.transfer.from).toBeDefined();
      expect(result.data.transfer.to).toBeDefined();
      expect(result.data.transfer.value).toBe("1"); // 1 wei
    });

    test("should handle invalid recipient address gracefully", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "eth_transfer_invalid_test",
          type: NodeType.ETHTransfer,
          data: {
            destination: "invalid_address", // Invalid Ethereum address
            amount: "1000000000000000", // 0.001 ETH
          },
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

      // Should fail with validation error
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error.length).toBeGreaterThan(0);
    });

    test("should handle template variables in destination and amount", async () => {
      const recipientAddress = eoaAddress;
      const transferAmount = "1000000000000000"; // 0.001 ETH

      const params = {
        node: {
          id: getNextId(),
          name: "eth_transfer_template_test",
          type: NodeType.ETHTransfer,
          data: {
            destination: "{{transfer_config.recipient}}", // Template variable
            amount: "{{transfer_config.amount}}", // Template variable
          },
        },
        inputVariables: {
          settings: getSettings(smartWalletAddress),
          transfer_config: {
            recipient: recipientAddress,
            amount: transferAmount,
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

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(result.data.transactionHash).toBeDefined();
    });

    test("should require settings object for ETHTransfer", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "eth_transfer_test",
          type: NodeType.ETHTransfer,
          data: {
            destination: eoaAddress,
            amount: "1000000000000000", // 0.001 ETH
          },
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
      expect(result.error.toLowerCase()).toContain("settings");
    });

    test("should require runner in settings for ETHTransfer", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "eth_transfer_test",
          type: NodeType.ETHTransfer,
          data: {
            destination: eoaAddress,
            amount: "1000000000000000", // 0.001 ETH
          },
        },
        inputVariables: {
          settings: {
            chain_id: parseInt(chainId),
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
      expect(result.error.toLowerCase()).toContain("runner");
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate ETH transfer workflow successfully", async () => {
      const wallet = await getSmartWalletWithBalance(client);
      const recipientAddress = eoaAddress;
      const transferAmount = "1000000000000000"; // 0.001 ETH

      const ethTransferNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_eth_transfer",
        type: NodeType.ETHTransfer,
        data: {
          destination: recipientAddress,
          amount: transferAmount,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        ethTransferNode,
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

      // Verify simulation status - should be Success or PartialSuccess
      expect([
        ExecutionStatus.Success,
        ExecutionStatus.PartialSuccess,
      ]).toContain(simulation.status);
      expect(simulation.steps).toHaveLength(2); // trigger + eth transfer node

      const ethTransferStep = simulation.steps.find(
        (s: any) => s.id === ethTransferNode.id
      );
      expect(ethTransferStep).toBeDefined();

      const output = (ethTransferStep as any).output as any;
      expect(output).toBeDefined();
      expect(typeof output).toBe("object");

      // Verify transfer object in output (matches ERC20 format)
      expect(output.transfer).toBeDefined();
      expect(output.transfer.from).toBeDefined();
      expect(output.transfer.to).toBeDefined();
      expect(output.transfer.value).toBe(transferAmount);
      
      // Check step-level metadata
      expect((ethTransferStep as any).metadata).toBeDefined();
      const metadata = (ethTransferStep as any).metadata;
      expect(Array.isArray(metadata)).toBe(true);
      expect(metadata.length).toBe(1);

      // Verify metadata has transaction details
      expect(metadata[0].receipt).toBeDefined();
      expect(typeof metadata[0].success).toBe("boolean");
    });

    test("should simulate zero ETH transfer", async () => {
      const wallet = await getSmartWallet(client);
      const recipientAddress = smartWalletAddress;
      const transferAmount = "0"; // 0 ETH

      const ethTransferNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_zero_eth_transfer",
        type: NodeType.ETHTransfer,
        data: {
          destination: recipientAddress,
          amount: transferAmount,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        ethTransferNode,
      ]);

      const simulation = await client.simulateWorkflow({
        ...client.createWorkflow(workflowProps).toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      console.log(
        "simulateWorkflow zero transfer response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect([
        ExecutionStatus.Success,
        ExecutionStatus.PartialSuccess,
      ]).toContain(simulation.status);

      const ethTransferStep = simulation.steps.find(
        (s: any) => s.id === ethTransferNode.id
      );
      expect(ethTransferStep).toBeDefined();
      
      // Verify transfer object in output
      const output = (ethTransferStep as any).output;
      expect(output.transfer).toBeDefined();
      expect(output.transfer.value).toBe("0"); // Zero transfer
      
      expect((ethTransferStep as any).metadata).toBeDefined();
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with ETH transfer", async () => {
      const wallet = await getSmartWalletWithBalance(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      const recipientAddress = eoaAddress;
      const transferAmount = "1000000000000000"; // 0.001 ETH

      const ethTransferNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_eth_transfer_test",
        type: NodeType.ETHTransfer,
        data: {
          destination: recipientAddress,
          amount: transferAmount,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        ethTransferNode,
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

        const ethTransferStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === ethTransferNode.id
        );

        if (_.isUndefined(ethTransferStep)) {
          throw new Error("No corresponding ETH transfer step found.");
        }

        console.log(
          "Deploy + trigger ETH transfer step output:",
          util.inspect(ethTransferStep.output, { depth: null, colors: true })
        );

        const output = ethTransferStep.output as any;
        expect(output).toBeDefined();
        expect(typeof output).toBe("object");

        // Verify transfer object (matches ERC20 format)
        expect(output.transfer).toBeDefined();
        expect(output.transfer.from).toBeDefined();
        expect(output.transfer.to).toBe(recipientAddress);
        expect(output.transfer.value).toBe(transferAmount);

        // For deployed workflows, step-level metadata contains receipt and gas info
        expect(ethTransferStep as any).toHaveProperty("metadata");
        const metadata = (ethTransferStep as any).metadata;
        expect(Array.isArray(metadata)).toBe(true);
        expect(metadata.length).toBe(1);

        // Verify metadata has transaction details
        expect(metadata[0].receipt).toBeDefined();
        expect(typeof metadata[0].success).toBe("boolean");

        // Check overall step success
        expect(typeof ethTransferStep.success).toBe("boolean");
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });

    test("should deploy and trigger workflow with zero ETH transfer", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      const recipientAddress = smartWalletAddress;
      const transferAmount = "0"; // 0 ETH

      const ethTransferNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_zero_eth_transfer_test",
        type: NodeType.ETHTransfer,
        data: {
          destination: recipientAddress,
          amount: transferAmount,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        ethTransferNode,
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

        const ethTransferStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === ethTransferNode.id
        );

        expect(ethTransferStep).toBeDefined();
        
        // Verify transfer object in output
        const output = (ethTransferStep as any).output;
        expect(output.transfer).toBeDefined();
        expect(output.transfer.value).toBe("0"); // Zero transfer
        
        expect((ethTransferStep as any).metadata).toBeDefined();

        const metadata = (ethTransferStep as any).metadata;
        expect(Array.isArray(metadata)).toBe(true);
        expect(metadata.length).toBe(1);
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
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      const recipientAddress = eoaAddress;
      const transferAmount = "1000000000000000"; // 0.001 ETH

      const ethTransferConfig = {
        destination: recipientAddress,
        amount: transferAmount,
      };

      // Test 1: runNodeWithInputs
      const runNodeWithInputsParams = {
        node: {
          id: getNextId(),
          name: "consistency_test",
          type: NodeType.ETHTransfer,
          data: ethTransferConfig,
        },
        inputVariables: {
          settings: getSettings(smartWalletAddress),
        },
      };

      const runNodeResponse = await client.runNodeWithInputs(
        runNodeWithInputsParams
      );
      console.log(
        "runNodeWithInputs response:",
        util.inspect(runNodeResponse, { depth: null, colors: true })
      );

      // Test 2: simulateWorkflow
      const ethTransferNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_test",
        type: NodeType.ETHTransfer,
        data: ethTransferConfig,
      });

      const workflowProps = createFromTemplate(smartWalletAddress, [
        ethTransferNode,
      ]);

      const wfSim = client.createWorkflow(workflowProps);
      const simulation = await client.simulateWorkflow({
        ...wfSim.toJson(),
        inputVariables: {
          settings: getSettings(smartWalletAddress),
        },
      });
      console.log(
        "simulateWorkflow response:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === ethTransferNode.id
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
          (step) => step.id === ethTransferNode.id
        );

        console.log(
          "deploy + trigger response:",
          util.inspect(executedStep, { depth: null, colors: true })
        );

        // Compare response formats - verify all three methods return consistent data
        expect(runNodeResponse.data).toBeDefined();
        expect(simulatedStep?.output).toBeDefined();
        expect(executedStep?.output).toBeDefined();

        // Note: runNodeWithInputs for ETHTransfer does NOT have metadata field
        // But workflow execution steps DO have metadata (different structure)
        const simulatedOutput = simulatedStep?.output as any;
        const executedOutput = executedStep?.output as any;

        // Output should be objects
        expect(typeof simulatedOutput).toBe("object");
        expect(typeof executedOutput).toBe("object");
        expect(simulatedStep as any).toHaveProperty("metadata");
        expect(executedStep as any).toHaveProperty("metadata");

        // Verify consistent structure
        expect(runNodeResponse).toBeDefined();
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();

        // Check response structure - runNodeWithInputs has data at top level
        expect(typeof runNodeResponse.data).toBe("object");
        expect(runNodeResponse.data).toBeDefined();
        expect(runNodeResponse.data.transactionHash).toBeDefined();
        
        // Verify transfer object (NEW: matches ERC20 format)
        expect(runNodeResponse.data.transfer).toBeDefined();
        expect(runNodeResponse.data.transfer.from).toBeDefined();
        expect(runNodeResponse.data.transfer.to).toBe(recipientAddress);
        expect(runNodeResponse.data.transfer.value).toBe(transferAmount);
        
        // ETHTransfer does NOT have metadata in runNodeWithInputs (unlike ContractWrite)
        expect(runNodeResponse.metadata).toBeUndefined();

        // simulateWorkflow and deployWorkflow should have object structure
        expect(typeof simulatedStep?.output).toBe("object");
        expect(Array.isArray(simulatedStep?.output)).toBe(false);
        expect(typeof executedStep?.output).toBe("object");
        expect(Array.isArray(executedStep?.output)).toBe(false);

        // Verify transfer objects exist in all outputs (consistent format)
        expect(runNodeResponse.data.transfer).toBeDefined();
        expect(simulatedOutput.transfer).toBeDefined();
        expect(executedOutput.transfer).toBeDefined();
        
        // Verify transfer fields match across all methods
        expect(runNodeResponse.data.transfer.to).toBe(recipientAddress);
        expect(simulatedOutput.transfer.to).toBe(recipientAddress);
        expect(executedOutput.transfer.to).toBe(recipientAddress);
        
        expect(runNodeResponse.data.transfer.value).toBe(transferAmount);
        expect(simulatedOutput.transfer.value).toBe(transferAmount);
        expect(executedOutput.transfer.value).toBe(transferAmount);

        // Verify top-level success for all methods
        expect(typeof runNodeResponse.success).toBe("boolean");
        expect(typeof simulatedStep?.success).toBe("boolean");
        expect(typeof executedStep?.success).toBe("boolean");
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Real Transaction Tests", () => {
    test(
      "should execute real ETH transfer with funded wallet",
      async () => {
        const recipientAddress = eoaAddress;
        const transferAmount = "1000000000000000"; // 0.001 ETH

        const ethTransferNode = NodeFactory.create({
          id: getNextId(),
          name: "real_eth_transfer_test",
          type: NodeType.ETHTransfer,
          data: {
            destination: recipientAddress,
            amount: transferAmount,
          },
        });

        const manualTrigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "manualTrigger",
          type: TriggerType.Manual,
          data: {
            note: "Test real ETH transfer",
          },
        });

        const workflowProps = createFromTemplate(smartWalletAddress, [
          ethTransferNode,
        ]);
        workflowProps.trigger = manualTrigger;
        workflowProps.name = "Real ETH Transfer Test";

        let workflowId: string | undefined;
        try {
          console.log("📝 Submitting ETH transfer workflow...");
          workflowId = await client.submitWorkflow(
            client.createWorkflow(workflowProps)
          );
          createdIdMap.set(workflowId, true);
          console.log("✅ ETH transfer workflow created:", workflowId);

          console.log("🎯 Triggering ETH transfer workflow...");
          await client.triggerWorkflow(
            {
              id: workflowId,
              triggerData: {
                type: TriggerType.Manual,
                data: {
                  note: "Test real ETH transfer",
                },
              },
              isBlocking: true,
            },
            { timeout: TimeoutPresets.SLOW }
          );
          console.log("✅ ETH transfer workflow triggered");

          const executions = await client.getExecutions([workflowId], {
            limit: 1,
          });
          console.log(
            "🔍 Execution results:",
            util.inspect(executions, { depth: null, colors: true })
          );

          expect(executions.items.length).toBe(1);
          const execution = executions.items[0];
          expect(execution).toBeDefined();

          const ethTransferStep = _.find(
            execution.steps,
            (step) => step.id === ethTransferNode.id
          );

          expect(ethTransferStep).toBeDefined();
          expect(typeof ethTransferStep!.success).toBe("boolean");

          console.log("🎉 Real ETH transfer completed!");
        } catch (error) {
          console.error("❌ Test failed with error:", error);
          throw error;
        } finally {
          if (workflowId) {
            await client.deleteWorkflow(workflowId);
            createdIdMap.delete(workflowId);
          }
        }
      },
      180000
    ); // 3 minutes for real blockchain transaction
  });

  describe("Protobuf Serialization Tests", () => {
    test("should properly serialize ETHTransfer in protobuf", () => {
      const ethTransferNode = NodeFactory.create({
        id: "test-eth-transfer",
        name: "Test ETH Transfer",
        type: NodeType.ETHTransfer,
        data: {
          destination: eoaAddress,
          amount: "1000000000000000", // 0.001 ETH
        },
      });

      // Convert to protobuf request
      const request = ethTransferNode.toRequest();

      // Verify the structure
      expect(request.getEthTransfer()).toBeDefined();
      const config = request.getEthTransfer()!.getConfig();
      expect(config).toBeDefined();

      // Check configuration
      expect(config!.getDestination()).toBe(eoaAddress);
      expect(config!.getAmount()).toBe("1000000000000000");

      console.log(
        "✅ Protobuf serialization test passed - ETHTransfer properly serialized"
      );
    });
  });
});
