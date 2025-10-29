import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import { NodeType } from "@avaprotocol/types";
import {
  TIMEOUT_DURATION,
  getSettings,
  getSmartWallet,
  getClient,
  authenticateClient,
  getCurrentChain,
  getChainNameFromId,
} from "../utils/utils";
import util from "util";

jest.setTimeout(TIMEOUT_DURATION);

describe("RunNodeWithInputs", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  describe("isSimulated parameter behavior", () => {
    test("should ignore isSimulated parameter for read-only operations", async () => {
      const wallet = await getSmartWallet(client);
      const { chainId } = getCurrentChain();
      const chainName = getChainNameFromId(chainId);
      
      const params = {
        node: {
          id: "balance-test",
          name: "checkBalance",
          type: NodeType.Balance,
          data: {
            address: wallet.address,
            chain: chainName,
            includeSpam: false,
            includeZeroBalances: false,
          },
        },
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs read-only with isSimulated ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs read-only with isSimulated ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      // Read-only operations (Balance, ContractRead) always use RPC directly, regardless of isSimulated
      expect(result.executionContext).toBeDefined();
      expect(result.executionContext.provider).toBe("chain_rpc");
    });
  });

  describe("ContractWrite with isSimulated parameter", () => {
    test("should use Tenderly simulation when isSimulated is true", async () => {
      const wallet = await getSmartWallet(client);
      
      // USDC contract on Sepolia
      const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
      const swapRouterAddress = "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E"; // Uniswap SwapRouter
      
      const params = {
        node: {
          id: "contract-write-test",
          name: "approve",
          type: NodeType.ContractWrite,
          data: {
            contractAddress: usdcAddress,
            contractAbi: [
              {
                name: "approve",
                type: "function",
                inputs: [
                  { name: "spender", type: "address" },
                  { name: "value", type: "uint256" },
                ],
                outputs: [{ name: "", type: "bool" }],
                stateMutability: "nonpayable",
              },
            ],
            methodCalls: [
              {
                methodName: "approve",
                methodParams: [swapRouterAddress, "1000000"], // 1 USDC (6 decimals)
              },
            ],
            isSimulated: true, // Simulation mode - uses Tenderly
          },
        },
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs ContractWrite with isSimulated=true ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs ContractWrite with isSimulated=true ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      
      // Should use Tenderly simulation
      expect(result.executionContext).toBeDefined();
      expect(result.executionContext.isSimulated).toBe(true);
      expect(result.executionContext.provider).toBe("tenderly");
    });

    test("should attempt real UserOp execution when isSimulated is false", async () => {
      const wallet = await getSmartWallet(client);
      
      // USDC contract on Sepolia
      const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
      const swapRouterAddress = "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E"; // Uniswap SwapRouter
      
      const params = {
        node: {
          id: "contract-write-real-test",
          name: "approve",
          type: NodeType.ContractWrite,
          data: {
            contractAddress: usdcAddress,
            contractAbi: [
              {
                name: "approve",
                type: "function",
                inputs: [
                  { name: "spender", type: "address" },
                  { name: "value", type: "uint256" },
                ],
                outputs: [{ name: "", type: "bool" }],
                stateMutability: "nonpayable",
              },
            ],
            methodCalls: [
              {
                methodName: "approve",
                methodParams: [swapRouterAddress, "1000000"], // 1 USDC (6 decimals)
              },
            ],
            isSimulated: false, // Real execution - attempts to send UserOp to bundler
          },
        },
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs ContractWrite with isSimulated=false ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs ContractWrite with isSimulated=false ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.executionContext).toBeDefined();
    });
  });
});

