/**
 * @jest-environment node
 * @jest-serial
 */

import util from "util";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {
  WithdrawFundsRequest,
  WithdrawFundsResponse,
  TimeoutPresets,
} from "@avaprotocol/types";
import {
  getEOAAddress,
  TIMEOUT_DURATION,
  describeIfSepolia,
  getClient,
  authenticateClient,
  getSmartWalletWithBalance,
  verifyTransactionReceipt,
  getPaymasterOwner,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
import { ethers } from "ethers";

jest.setTimeout(TIMEOUT_DURATION); // Set timeout to 60 seconds for all tests in this file

// Get environment variables from envalid config
const { tokens, chainEndpoint, aggregatorEndpoint, paymasterAddress } = getConfig();

describeIfSepolia("Withdraw Funds Tests", () => {
  let client: Client;
  let eoaAddress: string;

  beforeAll(async () => {
    eoaAddress = await getEOAAddress();
    client = getClient();
    await authenticateClient(client);
  });

  describe("withdrawFunds Basic Tests", () => {
    test("should successfully initiate ETH withdrawal with minimal parameters", async () => {
      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client);

      console.log("Wallet address:", wallet.address);

      // Get initial balances for verification
      const provider = new ethers.JsonRpcProvider(chainEndpoint);
      const initialRecipientBalance = await provider.getBalance(eoaAddress);

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress, // Send back to EOA address
        amount: "1000000000000000", // 0.001 ETH in wei
        token: "ETH",
        smartWalletAddress: wallet.address, // Use address from getWallet() call
      };

      const response: WithdrawFundsResponse = await client.withdrawFunds(
        withdrawRequest,
        { timeout: TimeoutPresets.SLOW } // 3 minutes for blockchain operations
      );

      // Verify response indicates success
      expect(response.success).toBeTruthy();
      expect(response.smartWalletAddress).toBe(wallet.address);
      expect(response.transactionHash).toBeDefined();

      // Verify the bundler transaction and all internal operations succeeded
      const verification = await verifyTransactionReceipt(
        response.transactionHash!,
        provider
      );

      // All internal transactions must succeed
      expect(verification.success).toBeTruthy();
      expect(verification.receipt).toBeTruthy();
      expect(verification.receipt?.status).toBe(1);

      // Verify recipient actually received the funds (poll up to 30s as RPC balance can lag)
      const expectedDelta = BigInt(withdrawRequest.amount);
      let finalRecipientBalance = await provider.getBalance(eoaAddress);
      let balanceIncrease = finalRecipientBalance - initialRecipientBalance;
      const deadline = Date.now() + 30000; // 30s
      while (balanceIncrease < expectedDelta && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        finalRecipientBalance = await provider.getBalance(eoaAddress);
        balanceIncrease = finalRecipientBalance - initialRecipientBalance;
      }

      expect(balanceIncrease).toBe(expectedDelta);

      console.log(
        `✅ All internal transactions succeeded: block ${verification.receipt?.blockNumber}, ${verification.receipt?.logs.length} logs`
      );
      console.log(
        `✅ Recipient balance increased by ${balanceIncrease} wei (expected: ${withdrawRequest.amount} wei)`
      );

      console.log("ETH withdrawal response:", {
        success: response.success,
        status: response.status,
        message: response.message,
        userOpHash: response.userOpHash,
        transactionHash: response.transactionHash,
        smartWalletAddress: response.smartWalletAddress,
      });
    });
  });

  describe("withdrawFunds ERC20Token Tests", () => {
    test("should successfully initiate USDC withdrawal if token is available", async () => {
      // Skip if no USDC token configured for this environment
      if (!tokens.USDC) {
        console.log(
          "Skipping USDC test - token not configured for this environment"
        );
        return;
      }

      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client);

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "10000", // 0.01 USDC (token decimals: 6)
        token: tokens.USDC.address,
        smartWalletAddress: wallet.address,
      };

      const response = await client.withdrawFunds(withdrawRequest, {
        timeout: TimeoutPresets.SLOW,
      });

      console.log(
        "USDC withdrawal response:",
        util.inspect(response, { depth: null, colors: true })
      );

      expect(response.success).toBeTruthy();
      expect(response.smartWalletAddress).toBe(wallet.address);
      expect(response.recipientAddress).toBe(withdrawRequest.recipientAddress);
      expect(response.amount).toBe(withdrawRequest.amount);
      expect(response.token).toBe(withdrawRequest.token);

      console.log("USDC withdrawal response:", {
        success: response.success,
        status: response.status,
        token: response.token,
        amount: response.amount,
      });
    });

    test("should handle custom ERC20 token withdrawal", async () => {
      // Skip if no custom ERC20 token configured for this environment
      if (!tokens.CUSTOM_ERC20) {
        console.log(
          "Skipping custom ERC20 test - token not configured for this environment"
        );
        return;
      }

      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client);

      const customTokenAddress = tokens.CUSTOM_ERC20.address;

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "1000000000000000000", // 1 token (18 decimals)
        token: customTokenAddress,
        smartWalletAddress: wallet.address,
      };

      const response = await client.withdrawFunds(withdrawRequest);

      expect(response.success).toBeTruthy();
      expect(response.smartWalletAddress).toBe(wallet.address);
      expect(response.recipientAddress).toBe(withdrawRequest.recipientAddress);
      expect(response.amount).toBe(withdrawRequest.amount);
      expect(response.token).toBe(withdrawRequest.token);

      console.log("Custom ERC20 withdrawal response:", {
        success: response.success,
        status: response.status,
        token: response.token,
      });
    });
  });

  describe("withdrawFunds Edge Cases", () => {
    test("should reject zero amount withdrawal", async () => {
      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client);

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "0", // Zero amount should be rejected
        token: "ETH",
        smartWalletAddress: wallet.address,
      };

      // Zero amount should be rejected by the server
      await expect(client.withdrawFunds(withdrawRequest)).rejects.toThrow(
        /invalid amount.*positive integer|INVALID_ARGUMENT/
      );
    });

    test("should handle large amount withdrawal", async () => {
      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client);

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "1000000000000000000000", // 1000 ETH in wei (likely to fail due to insufficient balance)
        token: "ETH",
        smartWalletAddress: wallet.address,
      };

      const response = await client.withdrawFunds(withdrawRequest);

      expect(response.success).toBeTruthy();
      expect(response.smartWalletAddress).toBe(wallet.address);
      expect(response.amount).toBe(withdrawRequest.amount);

      console.log("Large amount withdrawal response:", {
        success: response.success,
        status: response.status,
        message: response.message,
      });
    });

    test("should handle withdrawal to different recipient address", async () => {
      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client);

      // Generate a deterministic test address different from eoaAddress
      const differentRecipient = await getEOAAddress(
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      );

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: differentRecipient,
        amount: "100000000000000", // 0.0001 ETH in wei
        token: "ETH",
        smartWalletAddress: wallet.address,
      };

      const response = await client.withdrawFunds(withdrawRequest);

      expect(response.success).toBeTruthy();
      expect(response.smartWalletAddress).toBe(wallet.address);
      expect(response.recipientAddress).toBe(differentRecipient);
      expect(response.amount).toBe(withdrawRequest.amount);

      console.log("Different recipient withdrawal response:", {
        success: response.success,
        status: response.status,
        recipientAddress: response.recipientAddress,
      });
    });

    test("should reject withdrawal with invalid recipient address", async () => {
      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client);

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: "invalid-address", // Invalid address format
        amount: "1000000000000000", // 0.001 ETH in wei
        token: "ETH",
        smartWalletAddress: wallet.address,
      };

      await expect(client.withdrawFunds(withdrawRequest)).rejects.toThrow();
    });

    test("should reject withdrawal with invalid token address", async () => {
      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client);

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "1000000000000000", // 0.001 ETH in wei
        token: "invalid-token", // Invalid token format
        smartWalletAddress: wallet.address,
      };

      await expect(client.withdrawFunds(withdrawRequest)).rejects.toThrow();
    });

    test("should reject withdrawal with invalid amount format", async () => {
      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client);

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "invalid-amount", // Invalid amount format
        token: "ETH",
        smartWalletAddress: wallet.address,
      };

      await expect(client.withdrawFunds(withdrawRequest)).rejects.toThrow();
    });
  });

  describe("withdrawFunds Authentication Tests", () => {
    test("should reject withdrawal request without authentication", async () => {
      const unauthenticatedClient = new Client({
        endpoint: aggregatorEndpoint,
      });

      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client); // Use authenticated client to create wallet

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "1000000000000000", // 0.001 ETH in wei
        token: "ETH",
        smartWalletAddress: wallet.address,
      };

      await expect(
        unauthenticatedClient.withdrawFunds(withdrawRequest)
      ).rejects.toThrow(/unauthenticated|auth|UNAUTHENTICATED/);
    });

    test("should work with request-level auth key", async () => {
      const unauthenticatedClient = new Client({
        endpoint: aggregatorEndpoint,
      });

      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client); // Use authenticated client to create wallet

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "100000000000000", // 0.0001 ETH in wei
        token: "ETH",
        smartWalletAddress: wallet.address,
      };

      // Use the authenticated client's auth key for this request
      const authKey = client.getAuthKey();
      expect(authKey).toBeDefined();

      const response = await unauthenticatedClient.withdrawFunds(
        withdrawRequest,
        { authKey: authKey! }
      );

      expect(response.success).toBeTruthy();
      expect(response.smartWalletAddress).toBe(wallet.address);

      console.log("Request-level auth withdrawal response:", {
        success: response.success,
        status: response.status,
      });
    });
  });

  describe("withdrawFunds Response Validation", () => {
    test("should return properly formatted response for successful withdrawal", async () => {
      // Use funded wallet for withdrawal tests
      const wallet = await getSmartWalletWithBalance(client);

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "1000000000000000", // 0.001 ETH in wei
        token: "ETH",
        smartWalletAddress: wallet.address,
      };

      const response = await client.withdrawFunds(withdrawRequest);

      // Validate all required fields
      expect(response).toHaveProperty("success");
      expect(response).toHaveProperty("status");
      expect(response).toHaveProperty("message");
      expect(response).toHaveProperty("smartWalletAddress");
      expect(response).toHaveProperty("recipientAddress");
      expect(response).toHaveProperty("amount");
      expect(response).toHaveProperty("token");

      // Validate field types
      expect(response.success).toBeTruthy();
      expect(typeof response.status).toBe("string");
      expect(typeof response.message).toBe("string");
      expect(typeof response.smartWalletAddress).toBe("string");
      expect(typeof response.recipientAddress).toBe("string");
      expect(typeof response.amount).toBe("string");
      expect(typeof response.token).toBe("string");

      // Validate optional fields if present
      if (response.userOpHash !== undefined) {
        expect(typeof response.userOpHash).toBe("string");
      }
      if (response.transactionHash !== undefined) {
        expect(typeof response.transactionHash).toBe("string");
      }
      if (response.submittedAt !== undefined) {
        expect(typeof response.submittedAt).toBe("number");
      }

      // Validate content matches request
      expect(response.recipientAddress).toBe(withdrawRequest.recipientAddress);
      expect(response.amount).toBe(withdrawRequest.amount);
      expect(response.token).toBe(withdrawRequest.token);
      expect(response.smartWalletAddress).toBe(wallet.address);

      console.log("Response validation successful:", {
        hasAllRequiredFields: true,
        typesCorrect: true,
        contentMatches: true,
        response: {
          success: response.success,
          status: response.status,
          message: response.message,
          userOpHash: response.userOpHash,
          transactionHash: response.transactionHash,
          submittedAt: response.submittedAt,
        },
      });
    });
  });

  describe("Paymaster Reimbursement Verification", () => {
    test("should verify internal transaction success for paymaster-sponsored withdrawal", async () => {
      const wallet = await getSmartWalletWithBalance(client);
      const provider = new ethers.JsonRpcProvider(chainEndpoint);

      // Get paymaster owner address for balance verification
      const paymasterOwnerAddress = await getPaymasterOwner(paymasterAddress, provider);
      console.log("Paymaster owner address:", paymasterOwnerAddress);

      // Get initial paymaster owner balance
      const initialPaymasterOwnerBalance = await provider.getBalance(paymasterOwnerAddress);
      console.log("Initial paymaster owner balance:", ethers.formatEther(initialPaymasterOwnerBalance), "ETH");

      const withdrawalAmount = "2000000000000000"; // 0.002 ETH
      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: withdrawalAmount,
        token: "ETH",
        smartWalletAddress: wallet.address,
      };

      const response = await client.withdrawFunds(withdrawRequest, {
        timeout: TimeoutPresets.SLOW,
      });

      expect(response.success).toBeTruthy();
      expect(response.smartWalletAddress).toBe(wallet.address);
      expect(response.transactionHash).toBeDefined();

      // Verify the bundler transaction and all internal operations succeeded
      const verification = await verifyTransactionReceipt(
        response.transactionHash!,
        provider
      );

      // All internal transactions must succeed
      expect(verification.success).toBeTruthy();
      expect(verification.receipt).toBeTruthy();
      expect(verification.receipt?.status).toBe(1);

      // Verify paymaster owner received reimbursement
      const finalPaymasterOwnerBalance = await provider.getBalance(paymasterOwnerAddress);
      const balanceIncrease = finalPaymasterOwnerBalance - initialPaymasterOwnerBalance;
      
      console.log("Final paymaster owner balance:", ethers.formatEther(finalPaymasterOwnerBalance), "ETH");
      console.log("Balance increase:", ethers.formatEther(balanceIncrease), "ETH");
      
      // The paymaster owner should receive gas reimbursement (should be positive)
      expect(balanceIncrease).toBeGreaterThan(0n);

      console.log(
        `✅ All internal transactions succeeded: block ${verification.receipt?.blockNumber}, ${verification.receipt?.logs.length} logs, internal success: ${verification.internalSuccess}`
      );
    });
  });
});
