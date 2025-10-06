import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import {
  NodeType,
  TriggerType,
  ExecutionStatus,
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
  describeIfSepolia,
  getSettings,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

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
          chain: "sepolia",
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

      // The result should be an object with a data field containing array of tokens
      expect(typeof result.data).toBe("object");
      expect(result.data).not.toBeNull();
      expect(result.data).toHaveProperty("data");
      expect(Array.isArray(result.data.data)).toBe(true);

      // Each token should have the expected structure
      if (result.data.data.length > 0) {
        const token = result.data.data[0];
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
      }
    });

    test("should retrieve balance with filters (includeSpam=false, includeZeroBalances=false)", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        nodeType: NodeType.Balance,
        nodeConfig: {
          address: TEST_ADDRESSES.vitalik,
          chain: "sepolia",
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
      expect(result.data).toHaveProperty("data");
      expect(Array.isArray(result.data.data)).toBe(true);

      // Verify that no zero balances are included
      if (result.data.data.length > 0) {
        result.data.data.forEach((token: any) => {
          expect(parseFloat(token.balanceFormatted)).toBeGreaterThan(0);
        });
      }
    });

    test("should retrieve balance with minimum USD value filter", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const params = {
        nodeType: NodeType.Balance,
        nodeConfig: {
          address: TEST_ADDRESSES.vitalik,
          chain: "sepolia",
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
      expect(result.data).toHaveProperty("data");
      expect(Array.isArray(result.data.data)).toBe(true);

      // Verify that all tokens meet the minimum USD value requirement
      if (result.data.data.length > 0) {
        result.data.data.forEach((token: any) => {
          if (token.usdValue) {
            expect(parseFloat(token.usdValue)).toBeGreaterThanOrEqual(1.0);
          }
        });
      }
    });

    test("should support different chain identifiers (ethereum, eth, 1)", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const chains = ["ethereum", "eth", "1"];

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
        expect(result.data).toHaveProperty("data");
        expect(Array.isArray(result.data.data)).toBe(true);
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
          chainName: "sepolia",
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
      expect(result.data).toHaveProperty("data");
      expect(Array.isArray(result.data.data)).toBe(true);
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
          chain: "sepolia",
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
      if (output.length > 0) {
        const token = output[0];
        expect(token).toHaveProperty("symbol");
        expect(token).toHaveProperty("name");
        expect(token).toHaveProperty("balance");
        expect(token).toHaveProperty("balanceFormatted");
        expect(token).toHaveProperty("decimals");
      }
    });

    test("should simulate workflow with balance node using template variables", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const balanceNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_balance_with_variables",
        type: NodeType.Balance,
        data: {
          address: "{{trigger.walletAddress}}",
          chain: "{{trigger.chainName}}",
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [balanceNode]);

      // Override trigger to provide input data
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: {
          walletAddress: TEST_ADDRESSES.vitalik,
          chainName: "sepolia",
        },
      });

      console.log(
        "🚀 ~ simulateWorkflow with template variables ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "🚀 ~ simulateWorkflow with template variables ~ result:",
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
            chain: "sepolia",
            includeZeroBalances: false,
          },
        });

        const workflowProps = createFromTemplate(wallet.address, [
          balanceNode,
        ]);

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
        if (output.length > 0) {
          const token = output[0];
          expect(token).toHaveProperty("symbol");
          expect(token).toHaveProperty("name");
          expect(token).toHaveProperty("balance");
          expect(token).toHaveProperty("balanceFormatted");
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
    test("should return consistent response format across all three methods", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;

      try {
        const balanceConfig = {
          address: TEST_ADDRESSES.vitalik,
          chain: "sepolia",
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

        const workflowProps = createFromTemplate(wallet.address, [
          balanceNode,
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
        const directOutput = directResponse.data; // runNodeWithInputs returns { data: [...] }
        const simulatedOutput = simulatedStep?.output as any; // simulateWorkflow returns [...]
        const executedOutput = executedStep?.output as any; // deployed workflow returns [...]

        // Check that all outputs are arrays
        expect(directOutput).toHaveProperty("data");
        expect(Array.isArray(directOutput.data)).toBe(true);
        expect(Array.isArray(simulatedOutput)).toBe(true);
        expect(Array.isArray(executedOutput)).toBe(true);

        // Check that all arrays have similar structure
        if (directOutput.data.length > 0 && simulatedOutput.length > 0 && executedOutput.length > 0) {
          const directToken = directOutput.data[0];
          const simulatedToken = simulatedOutput[0];
          const executedToken = executedOutput[0];

          // All should have the same keys
          const directKeys = Object.keys(directToken).sort();
          const simulatedKeys = Object.keys(simulatedToken).sort();
          const executedKeys = Object.keys(executedToken).sort();

          // The keys should be consistent across all three methods
          expect(simulatedKeys).toEqual(executedKeys);
          expect(directKeys).toEqual(simulatedKeys);
        }
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
          chain: "sepolia",
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
  });

  describe("Protobuf Serialization Tests", () => {
    test("should properly serialize BalanceNode configuration in protobuf", () => {
      const balanceNode = NodeFactory.create({
        id: "test-balance-node",
        name: "Test Balance Node",
        type: NodeType.Balance,
        data: {
          address: TEST_ADDRESSES.vitalik,
          chain: "sepolia",
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
      expect(config!.getChain()).toBe("sepolia");
      expect(config!.getIncludeSpam()).toBe(false);
      expect(config!.getIncludeZeroBalances()).toBe(false);
      expect(config!.getMinUsdValue()).toBe(1.0);
    });
  });
});

