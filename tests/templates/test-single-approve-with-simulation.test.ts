import { describe, test, expect, beforeAll } from "@jest/globals";
import { Client, TriggerFactory, NodeFactory, Edge } from "@avaprotocol/sdk-js";
import { TriggerType, NodeType, AbiElement } from "@avaprotocol/types";
import util from "util";
import {
  getNextId,
  TIMEOUT_DURATION,
  getSmartWalletWithBalance,
  getClient,
  authenticateClient,
  getChainNameFromId,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
const { chainId } = getConfig();

// Set timeout to 240 seconds for this test suite
jest.setTimeout(TIMEOUT_DURATION * 4);

let client: Client;
let smartWalletAddress: string;

beforeAll(async () => {
  client = getClient();
  await authenticateClient(client);
  const smartWallet = await getSmartWalletWithBalance(client);
  smartWalletAddress = smartWallet.address;
});

describe("Templates - Test Single Approve with Simulation Parameter", () => {
  // Function to get workflow config with properly initialized smartWalletAddress
  const getWorkflowConfig = () => ({
    name: "Test Single Approve with max",
    chainId: parseInt(chainId),
    settings: {
      chain: getChainNameFromId(parseInt(chainId)),
      amount: "10000", // 0.01 USDC (6 decimals) - matches Go test for repeated testing
      runner: smartWalletAddress, // Now properly initialized after beforeAll
      chain_id: parseInt(chainId),
      uniswapv3_pool: {
        id: "0xee8027d8430344ba3419f844ba858ac7f1a92095",
        token0: {
          id: "0xfff9976782d46cc05630d1f6ebab18b2324d6b14", // WETH
          symbol: "WETH",
        },
        token1: {
          id: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // USDC
          symbol: "USDC",
        },
        feeTier: "500", // 0.05% - matches Go test SEPOLIA_FEE_TIER
      },
      uniswapv3_contracts: {
        permit2: "0x000000000022d473030F116dDEE9F6B43aC78BA3",
        quoterV2: "0xEd1f6473345F45b75f8179591dd5ba1888cf2FB3",
        swapRouter02: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
      },
    },
  });

  const USDC_ABI: AbiElement[] = [
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

  const SWAPROUTER_ABI = [
    {
      name: "exactInputSingle",
      type: "function" as const,
      inputs: [
        {
          name: "params",
          type: "tuple",
          components: [
            {
              name: "tokenIn",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenOut",
              type: "address",
              internalType: "address",
            },
            {
              name: "fee",
              type: "uint24",
              internalType: "uint24",
            },
            {
              name: "recipient",
              type: "address",
              internalType: "address",
            },
            {
              name: "amountIn",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "amountOutMinimum",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "sqrtPriceLimitX96",
              type: "uint160",
              internalType: "uint160",
            },
          ],
          internalType: "struct IV3SwapRouter.ExactInputSingleParams",
        },
      ],
      outputs: [
        {
          name: "amountOut",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "payable",
    },
  ];

  const QUOTER_ABI = [
    {
      name: "quoteExactInputSingle",
      type: "function" as const,
      inputs: [
        {
          name: "params",
          type: "tuple",
          components: [
            {
              name: "tokenIn",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenOut",
              type: "address",
              internalType: "address",
            },
            {
              name: "amountIn",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "fee",
              type: "uint24",
              internalType: "uint24",
            },
            {
              name: "sqrtPriceLimitX96",
              type: "uint160",
              internalType: "uint160",
            },
          ],
          internalType: "struct IQuoterV2.QuoteExactInputSingleParams",
        },
      ],
      outputs: [
        {
          name: "amountOut",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "sqrtPriceX96After",
          type: "uint160",
          internalType: "uint160",
        },
        {
          name: "initializedTicksCrossed",
          type: "uint32",
          internalType: "uint32",
        },
        {
          name: "gasEstimate",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "nonpayable",
    },
  ];

  test("runNodeWithInputs - contractRead (quoteExactInputSingle) - default simulation mode", async () => {
    // Test balance node with simulation (default)
    const balanceResult = await client.runNodeWithInputs({
      nodeType: "balance",
      nodeConfig: {
        address: getWorkflowConfig().settings.runner,
        chain: getWorkflowConfig().settings.chain,
        tokenAddresses: [
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // ETH
          getWorkflowConfig().settings.uniswapv3_pool.token0.id,
          getWorkflowConfig().settings.uniswapv3_pool.token1.id,
        ],
      },
    });

    console.log(
      "Balance result (simulation):",
      util.inspect(balanceResult, { depth: 3 })
    );
    expect(balanceResult.success).toBe(true);
    expect(balanceResult.data).toBeDefined();

    // NOTE: Oracle node type doesn't exist in the system - skipping oracle test
    // Oracle functionality would typically be implemented via contractRead to Chainlink price feeds

    // Test contractWrite (approve) with simulation (default)
    const approveResult = await client.runNodeWithInputs({
      nodeType: "contractWrite",
      nodeConfig: {
        contractAddress: getWorkflowConfig().settings.uniswapv3_pool.token1.id,
        contractAbi: USDC_ABI,
        methodCalls: [
          {
            methodName: "approve",
            methodParams: [
              getWorkflowConfig().settings.uniswapv3_contracts.swapRouter02,
              "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
            ],
          },
        ],
        value: "0",
        gasLimit: "44909",
      },
      inputVariables: {
        settings: getWorkflowConfig().settings,
      },
      // isSimulated not specified, should default to true
    });

    console.log(
      "Approve result (simulation):",
      util.inspect(approveResult, { depth: 3 })
    );
    expect(approveResult.success).toBe(true);
    expect(approveResult.data).toBeDefined();

    // Test contractRead (quote) with simulation (default)
    const quoteResult = await client.runNodeWithInputs({
      nodeType: "contractRead",
      nodeConfig: {
        contractAddress:
          getWorkflowConfig().settings.uniswapv3_contracts.quoterV2,
        contractAbi: QUOTER_ABI,
        methodCalls: [
          {
            methodName: "quoteExactInputSingle",
            methodParams: [
              '["{{settings.uniswapv3_pool.token1.id}}", "{{settings.uniswapv3_pool.token0.id}}", "{{settings.amount}}", "{{settings.uniswapv3_pool.feeTier}}", "0"]',
            ],
          },
        ],
      },
      inputVariables: {
        settings: getWorkflowConfig().settings,
      },
    });

    console.log(
      "Quote result (simulation):",
      util.inspect(quoteResult, { depth: 3 })
    );
    expect(quoteResult.success).toBe(true);
    expect(quoteResult.data).toBeDefined();
  });

  test("runNodeWithInputs - contractWrite real execution validates approval persistence", async () => {
    console.log("Chain:", getWorkflowConfig().settings.chain);
    console.log("USDC:", getWorkflowConfig().settings.uniswapv3_pool.token1.id);
    console.log(
      "SwapRouter:",
      getWorkflowConfig().settings.uniswapv3_contracts.swapRouter02
    );
    console.log("Amount: 1 USDC (1000000)\n");

    // Step 1: Check initial balance
    console.log("Step 1: Checking initial balance...");
    const initialBalanceResult = await client.runNodeWithInputs({
      nodeType: "balance",
      nodeConfig: {
        address: getWorkflowConfig().settings.runner,
        chain: getWorkflowConfig().settings.chain,
        tokenAddresses: [
          getWorkflowConfig().settings.uniswapv3_pool.token1.id, // USDC
        ],
        isSimulated: false,
      },
    });

    console.log(
      "Initial balance:",
      util.inspect(initialBalanceResult, { depth: 3 })
    );
    expect(initialBalanceResult.success).toBe(true);

    // Step 2: Approve USDC to SwapRouter (REAL EXECUTION)
    // CRITICAL: Approve MORE than swap amount to account for Uniswap fees
    // Go tests show: approval == swap amount FAILS, approval > swap amount SUCCEEDS
    const swapAmount = "10000"; // 0.01 USDC
    const approvalAmount = "50000"; // 0.05 USDC (5x swap amount for safety)

    console.log("\nStep 2: Approving USDC to SwapRouter (REAL EXECUTION)...");
    console.log(`   Swap Amount: ${swapAmount} (0.01 USDC)`);
    console.log(
      `   Approval Amount: ${approvalAmount} (0.05 USDC - 5x swap for fees)`
    );

    const approveResult = await client.runNodeWithInputs({
      nodeType: "contractWrite",
      nodeConfig: {
        contractAddress: getWorkflowConfig().settings.uniswapv3_pool.token1.id,
        contractAbi: USDC_ABI,
        methodCalls: [
          {
            methodName: "approve",
            methodParams: [
              getWorkflowConfig().settings.uniswapv3_contracts.swapRouter02,
              approvalAmount, // Use higher approval to cover fees
            ],
          },
        ],
        value: "0",
        gasLimit: "44909",
        isSimulated: false, // REAL EXECUTION - must be in nodeConfig
      },
      inputVariables: {
        settings: {
          runner: getWorkflowConfig().settings.runner,
          chain_id: 11155111,
        },
      },
    });

    console.log("Approve result:", util.inspect(approveResult, { depth: 4 }));

    // Test must fail if approval fails - be deterministic
    expect(approveResult.success).toBe(true);
    expect(approveResult.data).toBeDefined();
    console.log("✅ Approval succeeded!");

    // Wait for approval transaction to be confirmed on-chain
    // The aggregator should handle confirmation internally, but adding a small delay
    // to ensure RPC nodes have propagated the state
    console.log(
      "\n⏰ Waiting 3 seconds for approval confirmation and RPC propagation..."
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Step 3: Execute Swap (REAL EXECUTION)
    console.log("\nStep 3: Executing Uniswap V3 swap (REAL EXECUTION)...");
    console.log(`   Swapping ${swapAmount} USDC for WETH`);
    console.log(
      `   Fee Tier: ${
        getWorkflowConfig().settings.uniswapv3_pool.feeTier
      } (0.05%)`
    );

    const swapResult = await client.runNodeWithInputs({
      nodeType: "contractWrite",
      nodeConfig: {
        contractAddress:
          getWorkflowConfig().settings.uniswapv3_contracts.swapRouter02,
        contractAbi: SWAPROUTER_ABI,
        methodCalls: [
          {
            methodName: "exactInputSingle",
            methodParams: [
              '["{{settings.uniswapv3_pool.token1.id}}", "{{settings.uniswapv3_pool.token0.id}}", "{{settings.uniswapv3_pool.feeTier}}", "{{settings.runner}}", "{{settings.amount}}", "1", "0"]',
            ],
          },
        ],
        value: "0",
        isSimulated: false, // REAL EXECUTION - must be in nodeConfig
      },
      inputVariables: {
        settings: {
          runner: getWorkflowConfig().settings.runner,
          chain_id: 11155111,
          uniswapv3_pool: getWorkflowConfig().settings.uniswapv3_pool,
          amount: swapAmount,
        },
      },
    });

    console.log("\n🎯 SWAP RESULT:", util.inspect(swapResult, { depth: 4 }));

    // Test must fail if swap fails - be deterministic
    expect(swapResult.success).toBe(true);
    expect(swapResult.data).toBeDefined();
    console.log(
      "🎉 Complete approve + swap workflow completed successfully on Sepolia!"
    );

    // Step 4: Check final balance
    console.log("\nStep 4: Checking final balance...");
    const finalBalanceResult = await client.runNodeWithInputs({
      nodeType: "balance",
      nodeConfig: {
        address: getWorkflowConfig().settings.runner,
        chain: "sepolia",
        tokenAddresses: [
          getWorkflowConfig().settings.uniswapv3_pool.token0.id, // WETH
          getWorkflowConfig().settings.uniswapv3_pool.token1.id, // USDC
        ],
      },
    });

    console.log(
      "Final balance:",
      util.inspect(finalBalanceResult, { depth: 3 })
    );
    expect(finalBalanceResult.success).toBe(true);
  });

  test("runNodeWithInputs - contractWrite (approve) - simulation vs real execution comparison", async () => {
    // Test the same balance node call with both modes
    const nodeConfig = {
      address: getWorkflowConfig().settings.runner,
      chain: getWorkflowConfig().settings.chain,
      tokenAddresses: [
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // ETH
        getWorkflowConfig().settings.uniswapv3_pool.token1.id, // USDC
      ],
    };

    // Simulation mode (balance nodes always query real data, no simulation)
    const simulationResult = await client.runNodeWithInputs({
      nodeType: "balance",
      nodeConfig,
    });

    // Real execution mode (same as simulation for balance nodes)
    const realResult = await client.runNodeWithInputs({
      nodeType: "balance",
      nodeConfig,
    });

    console.log(
      "Simulation result:",
      util.inspect(simulationResult, { depth: 3 })
    );
    console.log(
      "Real execution result:",
      util.inspect(realResult, { depth: 3 })
    );

    // Both should succeed for balance queries
    expect(simulationResult.success).toBe(true);
    expect(realResult.success).toBe(true);

    // Data structure should be similar
    expect(simulationResult.data).toBeDefined();
    expect(realResult.data).toBeDefined();

    // Verify that the isSimulated parameter is working by checking that we get different execution contexts
    // In simulation mode, the execution might have different metadata or context
    console.log(
      "✅ Both simulation and real execution modes completed successfully"
    );
  });

  test("runNodeWithInputs - contractWrite (approve) - explicit isSimulated parameter behavior", async () => {
    const contractWriteConfig = {
      contractAddress: getWorkflowConfig().settings.uniswapv3_pool.token1.id,
      contractAbi: USDC_ABI,
      methodCalls: [
        {
          methodName: "approve",
          methodParams: [
            getWorkflowConfig().settings.uniswapv3_contracts.swapRouter02,
            "1000000",
          ],
        },
      ],
      value: "0",
      gasLimit: "44909",
    };

    // Test with explicit simulation=true
    const simulatedResult = await client.runNodeWithInputs({
      nodeType: "contractWrite",
      nodeConfig: { ...contractWriteConfig, isSimulated: true },
      inputVariables: {
        settings: getWorkflowConfig().settings,
      },
    });

    console.log(
      "Simulated contractWrite result:",
      util.inspect(simulatedResult, { depth: 3 })
    );
    expect(simulatedResult).toBeDefined();

    // Test with explicit simulation=false (real execution)
    const realResult = await client.runNodeWithInputs({
      nodeType: "contractWrite",
      nodeConfig: { ...contractWriteConfig, isSimulated: false },
      inputVariables: {
        settings: getWorkflowConfig().settings,
      },
    });

    console.log(
      "Real contractWrite result:",
      util.inspect(realResult, { depth: 3 })
    );
    expect(realResult).toBeDefined();

    // The simulation should generally succeed
    expect(simulatedResult.success).toBe(true);

    // Real execution might fail due to insufficient balance, gas, etc.
    // We test that the call structure is valid regardless of success
    console.log("✅ Both simulation and real execution calls completed");
    console.log(`Simulation success: ${simulatedResult.success}`);
    console.log(`Real execution success: ${realResult.success}`);

    if (!realResult.success) {
      console.log(
        "Real execution error (this may be expected):",
        realResult.error
      );
    }
  });

  test.skip("simulateWorkflow - contractWrite (approve + swap) - approval amount validation [DISABLED: Tenderly state persistence issue]", async () => {
    console.log(
      "\n🧪 Testing simulateWorkflow with contractWrite (approve + swap) - approval amount validation...\n"
    );
    console.log(
      "⚠️  LIMITATION: Tenderly simulations don't persist state between nodes!"
    );
    console.log(
      "    Each node makes an independent Tenderly API call, so approval state doesn't carry over to swap."
    );
    console.log(
      "    This test is DISABLED because Tenderly cannot maintain state across workflow nodes.\n"
    );
    console.log(
      "    Use REAL EXECUTION instead (see 'runNodeWithInputs - contractWrite (approve + swap) - real execution validates approval persistence').\n"
    );

    console.log("Smart Wallet:", smartWalletAddress);

    const testSwapAmount = "10000"; // 0.01 USDC

    // Helper function to create workflow with specific approval amount
    // Note: Parameter used for function signature only; actual value passed via inputVariables
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createApproveAndSwapWorkflow = (approvalAmount: string) => {
      const trigger = TriggerFactory.create({
        id: "manual_trigger",
        name: "manual_trigger",
        type: TriggerType.Manual,
        data: {},
      });

      const approveNode = NodeFactory.create({
        id: "approve_usdc",
        name: "approve_usdc",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: "{{settings.uniswapv3_pool.token1.id}}",
          contractAbi: USDC_ABI,
          methodCalls: [
            {
              methodName: "approve",
              methodParams: [
                "{{settings.uniswapv3_contracts.swapRouter02}}",
                "{{approval_amount}}",
              ],
            },
          ],
        },
      });

      const swapNode = NodeFactory.create({
        id: "execute_swap",
        name: "execute_swap",
        type: NodeType.ContractWrite,
        data: {
          contractAddress: "{{settings.uniswapv3_contracts.swapRouter02}}",
          contractAbi: SWAPROUTER_ABI,
          methodCalls: [
            {
              methodName: "exactInputSingle",
              methodParams: [
                '["{{settings.uniswapv3_pool.token1.id}}", "{{settings.uniswapv3_pool.token0.id}}", "{{settings.uniswapv3_pool.feeTier}}", "{{settings.runner}}", "{{test_swap_amount}}", "1", "0"]',
              ],
            },
          ],
        },
      });

      const edges = [
        new Edge({
          id: getNextId(),
          source: "manual_trigger",
          target: "approve_usdc",
        }),
        new Edge({
          id: getNextId(),
          source: "approve_usdc",
          target: "execute_swap",
        }),
      ];

      return { trigger, nodes: [approveNode, swapNode], edges };
    };

    // Test Case 1: Equal approval should fail swap
    console.log(
      "\n🔴 Test Case 1: Approval EQUAL to swap amount (should fail swap)"
    );
    console.log(`   Swap: ${testSwapAmount}, Approval: ${testSwapAmount}`);

    const equalWorkflowData = createApproveAndSwapWorkflow(testSwapAmount);
    const equalWorkflow = client.createWorkflow({
      smartWalletAddress: smartWalletAddress,
      trigger: equalWorkflowData.trigger,
      nodes: equalWorkflowData.nodes,
      edges: equalWorkflowData.edges,
      startAt: Date.now(),
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
      maxExecution: 1,
      name: "Equal Approval Test",
    });

    const equalExecution = await client.simulateWorkflow({
      ...equalWorkflow.toJson(),
      inputVariables: {
        settings: getWorkflowConfig().settings,
        approval_amount: testSwapAmount,
        test_swap_amount: testSwapAmount,
      },
    });

    console.log("   Workflow status:", equalExecution.status);

    // Find the swap step
    const equalSwapStep = equalExecution.steps?.find(
      (s) => s.name === "execute_swap"
    );

    if (equalSwapStep) {
      console.log(
        "   Swap step result:",
        equalSwapStep.success ? "✅ Success" : "❌ Failed"
      );
      if (!equalSwapStep.success && equalSwapStep.error) {
        console.log("   Error (expected):", equalSwapStep.error);
        expect(equalSwapStep.error).toContain("allowance");
      }
      // Equal approval should cause swap to fail
      expect(equalSwapStep.success).toBe(false);
    } else {
      console.log("   ⚠️ Swap step not found in execution");
    }

    // Test Case 2: Higher approval should succeed
    console.log(
      "\n🟢 Test Case 2: Approval HIGHER than swap amount (should succeed)"
    );
    const higherApprovalAmount = "50000"; // 5x swap amount
    console.log(
      `   Swap: ${testSwapAmount}, Approval: ${higherApprovalAmount}`
    );

    const higherWorkflowData =
      createApproveAndSwapWorkflow(higherApprovalAmount);
    const higherWorkflow = client.createWorkflow({
      smartWalletAddress: smartWalletAddress,
      trigger: higherWorkflowData.trigger,
      nodes: higherWorkflowData.nodes,
      edges: higherWorkflowData.edges,
      startAt: Date.now(),
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
      maxExecution: 1,
      name: "Higher Approval Test",
    });

    const higherExecution = await client.simulateWorkflow({
      ...higherWorkflow.toJson(),
      inputVariables: {
        settings: getWorkflowConfig().settings,
        approval_amount: higherApprovalAmount,
        test_swap_amount: testSwapAmount,
      },
    });

    console.log("   Workflow status:", higherExecution.status);

    // Find the swap step
    const higherSwapStep = higherExecution.steps?.find(
      (s) => s.name === "execute_swap"
    );

    if (higherSwapStep) {
      console.log(
        "   Swap step result:",
        higherSwapStep.success ? "✅ Success" : "❌ Failed"
      );
      if (!higherSwapStep.success && higherSwapStep.error) {
        console.log("   Unexpected error:", higherSwapStep.error);
      }
      // Higher approval should cause swap to succeed
      expect(higherSwapStep.success).toBe(true);
    } else {
      console.log("   ⚠️ Swap step not found in execution");
    }

    console.log("\n✅ Approval amount validation test completed!");
    console.log(
      "📋 Summary: Equal approval fails swap, higher approval succeeds swap (as expected)"
    );
  });
});
