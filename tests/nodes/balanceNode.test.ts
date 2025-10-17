import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import {
  Client,
  TriggerFactory,
  NodeFactory,
  BalanceNode,
} from "@avaprotocol/sdk-js";
import { NodeType, TriggerType, ExecutionStatus } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  TIMEOUT_DURATION,
  SaltGlobal,
  removeCreatedWorkflows,
  getBlockNumber,
  SALT_BUCKET_SIZE,
  describeIfSepolia,
  getSettings,
  getCurrentChain,
  getChainNameFromId,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";

// Get token constants for the current environment
const { tokens } = getConfig();

// Get current chain information
const currentChain = getCurrentChain();
const currentChainName = getChainNameFromId(currentChain.chainId);

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.Balance * SALT_BUCKET_SIZE;

// Test wallet addresses for balance queries
const TEST_ADDRESSES = {
  // Vitalik's address - known to have ETH and various tokens
  vitalik: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  // A random address with some activity
  test: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
};

describeIfSepolia("BalanceNode Tests", () => {
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
    test("should retrieve balance for an address on Sepolia", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        nodeType: NodeType.Balance,
        nodeConfig: {
          address: TEST_ADDRESSES.vitalik,
          chain: currentChainName,
        },
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with balance node ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with balance node ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(typeof result.data).toBe("object");
      expect(result.data).not.toBeNull();
      expect(Array.isArray(result.data)).toBe(true);

      // Each token should have the expected structure
      // We expect at least some tokens for Vitalik's address
      expect(result.data.length).toBeGreaterThan(0);
      const token = result.data[0];
      expect(token).toHaveProperty("symbol");
      expect(token).toHaveProperty("name");
      expect(token).toHaveProperty("balance");
      expect(token).toHaveProperty("balanceFormatted");
      expect(token).toHaveProperty("decimals");

      // Native tokens should not have tokenAddress
      // ERC20 tokens should have tokenAddress
      if (token.symbol !== "ETH") {
        expect(token).toHaveProperty("tokenAddress");
      }
    });

    test("should retrieve balance with filters (includeSpam=false, includeZeroBalances=false)", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        nodeType: NodeType.Balance,
        nodeConfig: {
          address: TEST_ADDRESSES.vitalik,
          chain: currentChainName,
          includeSpam: false,
          includeZeroBalances: false,
        },
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with balance filters ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with balance filters ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(typeof result.data).toBe("object");
      expect(result.data).not.toBeNull();
      expect(Array.isArray(result.data)).toBe(true);

      // Verify that no zero balances are included
      // We expect at least some non-zero balance tokens for Vitalik's address
      expect(result.data.length).toBeGreaterThan(0);
      result.data.forEach((token: any) => {
        expect(parseFloat(token.balanceFormatted)).toBeGreaterThan(0);
      });
    });

    test("should retrieve balance with minimum USD value filter", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Note: Sepolia testnet tokens typically don't have USD pricing data from Moralis
      // This test verifies that the filtering mechanism works, even if it returns empty results
      const params = {
        nodeType: NodeType.Balance,
        nodeConfig: {
          address: TEST_ADDRESSES.vitalik,
          chain: currentChainName,
          minUsdValue: 1.0, // Only include tokens worth at least $1
        },
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with minUsdValue filter ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with minUsdValue filter ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(typeof result.data).toBe("object");
      expect(result.data).not.toBeNull();
      expect(Array.isArray(result.data)).toBe(true);

      // On Sepolia, tokens typically don't have USD pricing, so we expect an empty result
      // This is expected behavior for testnet tokens without market value
      // The test verifies that the filtering mechanism works correctly
      if (currentChainName === "sepolia") {
        // Sepolia tokens don't have USD pricing, so filtering by minUsdValue should return empty
        expect(result.data.length).toBe(0);
      } else {
        // On mainnet, we should get some results and verify USD values
        expect(result.data.length).toBeGreaterThan(0);
        result.data.forEach((token: any) => {
          if (token.usdValue) {
            expect(parseFloat(token.usdValue)).toBeGreaterThanOrEqual(1.0);
          }
        });
      }
    });

    test("should support different chain identifiers (name, short name, id)", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Test different formats for the current chain
      const chains = [currentChainName, currentChain.chainName.toLowerCase(), currentChain.chainId.toString()];

      for (const chain of chains) {
        const params = {
          nodeType: NodeType.Balance,
          nodeConfig: {
            address: TEST_ADDRESSES.vitalik,
            chain: chain,
          },
          inputVariables: {
            settings: getSettings(wallet.address),
          },
        };

        console.log(
          `🚀 ~ runNodeWithInputs with chain ${chain} ~ params:`,
          util.inspect(params, { depth: null, colors: true })
        );

        const result = await client.runNodeWithInputs(params);

        console.log(
          `🚀 ~ runNodeWithInputs with chain ${chain} ~ result:`,
          util.inspect(result, { depth: null, colors: true })
        );

        expect(typeof result.success).toBe("boolean");
        expect(result.data).toBeDefined();
        expect(Array.isArray(result.data)).toBe(true);
      }
    });

    test("should use template variables for address and chain", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        nodeType: NodeType.Balance,
        nodeConfig: {
          address: "{{walletAddress}}",
          chain: "{{chainName}}",
        },
        inputVariables: {
          settings: getSettings(wallet.address),
          walletAddress: TEST_ADDRESSES.vitalik,
          chainName: currentChainName,
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with template variables ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with template variables ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      expect(typeof result.data).toBe("object");
      expect(result.data).not.toBeNull();
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with balance node", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const balanceNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_balance_test",
        type: NodeType.Balance,
        data: {
          address: TEST_ADDRESSES.vitalik,
          chain: currentChainName,
          includeSpam: false,
          includeZeroBalances: false,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [balanceNode]);

      console.log(
        "🚀 ~ simulateWorkflow with balance node ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "🚀 ~ simulateWorkflow with balance node ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(2); // trigger + balance node

      const balanceStep = simulation.steps.find(
        (step) => step.id === balanceNode.id
      );
      expect(balanceStep!.success).toBeTruthy();

      const output = balanceStep!.output as any;
      expect(output).toBeDefined();

      // Output should be an array of tokens
      expect(Array.isArray(output)).toBe(true);

      // Each token should have the expected structure
      // We expect at least some tokens for Vitalik's address
      expect(output.length).toBeGreaterThan(0);
      const token = output[0];
      expect(token).toHaveProperty("symbol");
      expect(token).toHaveProperty("name");
      expect(token).toHaveProperty("balance");
      expect(token).toHaveProperty("balanceFormatted");
      expect(token).toHaveProperty("decimals");
    });

    test("should simulate workflow with balance node using BlockTrigger", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Note: ManualTrigger does not support template variable references
      // since there is no preceding trigger output to reference.
      // Use hard-coded values for simulation with ManualTrigger.
      const balanceNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_balance_block_trigger",
        type: NodeType.Balance,
        data: {
          address: TEST_ADDRESSES.vitalik,
          chain: currentChainName,
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [balanceNode]);

      console.log(
        "🚀 ~ simulateWorkflow with BlockTrigger ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "🚀 ~ simulateWorkflow with BlockTrigger ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.status).toBe(ExecutionStatus.Success);
      const balanceStep = simulation.steps.find(
        (step) => step.id === balanceNode.id
      );
      expect(balanceStep!.success).toBeTruthy();

      const output = balanceStep!.output as any;
      expect(output).toBeDefined();
      expect(Array.isArray(output)).toBe(true);
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with balance node", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;

      try {
        const balanceNode = NodeFactory.create({
          id: getNextId(),
          name: "deploy_balance_test",
          type: NodeType.Balance,
          data: {
            address: TEST_ADDRESSES.vitalik,
            chain: currentChainName,
            includeZeroBalances: false,
          },
        });

        const workflowProps = createFromTemplate(wallet.address, [balanceNode]);

        workflowProps.trigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval: triggerInterval },
        });

        console.log(
          "🚀 ~ deploy + trigger workflow with balance node ~ workflowProps:",
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

        const balanceStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === balanceNode.id
        );

        if (_.isUndefined(balanceStep)) {
          throw new Error("No corresponding balance step found.");
        }

        expect(balanceStep.success).toBeTruthy();
        console.log(
          "Deploy + trigger balance step output:",
          util.inspect(balanceStep.output, { depth: null, colors: true })
        );

        const output = balanceStep.output as any;
        expect(output).toBeDefined();
        expect(Array.isArray(output)).toBe(true);

        // Verify structure of the output
        // We expect at least some tokens for Vitalik's address
        expect(output.length).toBeGreaterThan(0);
        const token = output[0];
        expect(token).toHaveProperty("symbol");
        expect(token).toHaveProperty("name");
        expect(token).toHaveProperty("balance");
        expect(token).toHaveProperty("balanceFormatted");
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
      let workflowId: string | undefined;

      try {
        const balanceConfig = {
          address: TEST_ADDRESSES.vitalik,
          chain: currentChainName,
          includeZeroBalances: false,
        };

        const inputVariables = {
          settings: getSettings(wallet.address),
        };

        console.log(
          "🔍 Testing response format consistency across all methods..."
        );

        // Test 1: runNodeWithInputs
        const directParams = {
          nodeType: NodeType.Balance,
          nodeConfig: balanceConfig,
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
        const balanceNode = NodeFactory.create({
          id: getNextId(),
          name: "consistency_test",
          type: NodeType.Balance,
          data: balanceConfig,
        });

        const workflowProps = createFromTemplate(wallet.address, [balanceNode]);

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
          (step) => step.id === balanceNode.id
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
          (step) => step.id === balanceNode.id
        );

        // All should be successful
        expect(directResponse.success).toBeTruthy();
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBeTruthy();

        // Verify consistent structure
        const directOutput = directResponse.data; // runNodeWithInputs now returns [...] directly
        const simulatedOutput = simulatedStep?.output as any; // simulateWorkflow returns [...]
        const executedOutput = executedStep?.output as any; // deployed workflow returns [...]

        // Check that all outputs are arrays
        expect(Array.isArray(directOutput)).toBe(true);
        expect(Array.isArray(simulatedOutput)).toBe(true);
        expect(Array.isArray(executedOutput)).toBe(true);

        // Check that all arrays have similar structure
        // We expect at least some tokens to be returned for Vitalik's address
        expect(directOutput.length).toBeGreaterThan(0);
        expect(simulatedOutput.length).toBeGreaterThan(0);
        expect(executedOutput.length).toBeGreaterThan(0);

        const directToken = directOutput[0];
        const simulatedToken = simulatedOutput[0];
        const executedToken = executedOutput[0];

        // All should have the same keys
        const directKeys = Object.keys(directToken).sort();
        const simulatedKeys = Object.keys(simulatedToken).sort();
        const executedKeys = Object.keys(executedToken).sort();

        // The keys should be consistent across all three methods
        expect(simulatedKeys).toEqual(executedKeys);
        expect(directKeys).toEqual(simulatedKeys);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Error Handling Tests", () => {
    test("should handle invalid address gracefully", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        nodeType: NodeType.Balance,
        nodeConfig: {
          address: "invalid-address",
          chain: currentChainName,
        },
        inputVariables: {
          settings: getSettings(wallet.address),
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
      // The backend should handle invalid addresses and return an error
      expect(typeof result.success).toBe("boolean");
    });

    test("should handle invalid chain gracefully", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        nodeType: NodeType.Balance,
        nodeConfig: {
          address: TEST_ADDRESSES.vitalik,
          chain: "invalid-chain",
        },
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with invalid chain ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with invalid chain ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      // The backend should handle invalid chains and return an error
      expect(typeof result.success).toBe("boolean");
    });

    test("should reject negative minUsdValue from backend", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        nodeType: NodeType.Balance,
        nodeConfig: {
          address: TEST_ADDRESSES.vitalik,
          chain: currentChainName,
          minUsdValue: -1.0, // Negative value - backend should reject
        },
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with negative minUsdValue ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with negative minUsdValue ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(false);
      expect(result.error).toContain("minUsdValue must be non-negative");
    });
  });

  describe("Protobuf Serialization Tests", () => {
    test("should properly serialize BalanceNode configuration in protobuf", () => {
      const balanceNode = NodeFactory.create({
        id: "test-balance-node",
        name: "Test Balance Node",
        type: NodeType.Balance,
        data: {
          address: TEST_ADDRESSES.vitalik,
          chain: currentChainName,
          includeSpam: false,
          includeZeroBalances: false,
          minUsdValue: 1.0,
        },
      });

      // Convert to protobuf request
      const request = balanceNode.toRequest();

      // Verify the structure
      expect(request.getBalance()).toBeDefined();
      const config = request.getBalance()!.getConfig();
      expect(config).toBeDefined();

      // Check configuration fields
      expect(config!.getAddress()).toBe(TEST_ADDRESSES.vitalik);
      expect(config!.getChain()).toBe(currentChainName);
      expect(config!.getIncludeSpam()).toBe(false);
      expect(config!.getIncludeZeroBalances()).toBe(false);
      // minUsdValue of 1.0 dollars = 100 cents
      expect(config!.getMinUsdValueCents()).toBe(100);
    });

    test("should properly serialize tokenAddresses in protobuf", () => {
      const balanceNode = BalanceNode.createProtobufNode({
        address: "0x1234567890123456789012345678901234567890",
        chain: currentChainName,
        includeSpam: false,
        includeZeroBalances: false,
        minUsdValue: 1.0,
        tokenAddresses: [
          tokens.USDC.address,
          tokens.LINK.address,
        ],
      });

      const config = balanceNode.getConfig();
      expect(config).toBeDefined();
      expect(config!.getAddress()).toBe(
        "0x1234567890123456789012345678901234567890"
      );
      expect(config!.getChain()).toBe(currentChainName);
      expect(config!.getIncludeSpam()).toBe(false);
      expect(config!.getIncludeZeroBalances()).toBe(false);
      expect(config!.getMinUsdValueCents()).toBe(100);
      expect(config!.getTokenAddressesList()).toEqual([
        tokens.USDC.address,
        tokens.LINK.address,
      ]);
    });

    test("should support tokenAddresses parameter for specific token filtering", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      // Test with specific token addresses (USDC and LINK on current chain)
      const params = {
        nodeType: NodeType.Balance,
        nodeConfig: {
          address: TEST_ADDRESSES.vitalik,
          chain: currentChainName,
          tokenAddresses: [
            tokens.USDC.address, // USDC on current chain
            tokens.LINK.address, // LINK on current chain
          ],
        },
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with tokenAddresses ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with tokenAddresses ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(typeof result.data).toBe("object");
        expect(result.data).not.toBeNull();
        expect(Array.isArray(result.data)).toBe(true);

        // Should only return tokens that match the specified addresses
        const returnedTokens = result.data as any[];
        // We expect at least some tokens to be returned (either native ETH or the specified tokens)
        expect(returnedTokens.length).toBeGreaterThan(0);
        for (const token of returnedTokens) {
          if (token.tokenAddress) {
            // Non-native tokens should be one of our specified addresses
            // Use case-insensitive comparison since Ethereum addresses are case-insensitive
            const expectedAddresses = [
              tokens.USDC.address.toLowerCase(),
              tokens.LINK.address.toLowerCase(),
            ];
            expect(expectedAddresses).toContain(token.tokenAddress.toLowerCase());
          }
        }
      }
    });
  });
});
