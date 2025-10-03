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
  getAddress,
  generateSignature,
  SaltGlobal,
  TIMEOUT_DURATION,
  SALT_BUCKET_SIZE,
  describeIfSepolia,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION); // Set timeout to 60 seconds for all tests in this file

let saltIndex = SaltGlobal.Withdraw * SALT_BUCKET_SIZE;

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, tokens } = getConfig();

describeIfSepolia("Withdraw Funds Tests", () => {
  let client: Client;
  let eoaAddress: string;

  // NOTE: These tests use salt=0 for consistent wallet addresses that can be pre-funded
  // This is required for real blockchain tests that need funded smart wallets

  beforeAll(async () => {
    eoaAddress = await getAddress(walletPrivateKey);
    console.log("\nOwner wallet address:", eoaAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: avsEndpoint,
      // No factory address - let aggregator use its default
    });

    console.log("Authenticating with signature ...");
    const { message } = await client.getSignatureFormat(eoaAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });
    client.setAuthKey(res.authKey);
  });

  describe("withdrawFunds Basic Tests", () => {
    test("should successfully initiate ETH withdrawal with minimal parameters", async () => {
      // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt: "0" });

      console.log("Wallet address:", wallet.address);
      console.log("EOA address:", eoaAddress);
      
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

      // Verify response structure
      expect(response.success).toBeTruthy();
      expect(typeof response.status).toBe("string");
      expect(typeof response.message).toBe("string");
      expect(response.smartWalletAddress).toBeDefined();
      expect(response.smartWalletAddress).toBe(wallet.address);
      expect(response.recipientAddress).toBe(withdrawRequest.recipientAddress);
      expect(response.amount).toBe(withdrawRequest.amount);
      expect(response.token).toBe(withdrawRequest.token);

      // Optional fields should be properly typed
      if (response.userOpHash) {
        expect(typeof response.userOpHash).toBe("string");
      }
      if (response.transactionHash) {
        expect(typeof response.transactionHash).toBe("string");
      }
      if (response.submittedAt) {
        expect(typeof response.submittedAt).toBe("number");
      }

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

  describe("withdrawFunds Token Tests", () => {
    test("should successfully initiate USDC withdrawal if token is available", async () => {
      // Skip if no USDC token configured for this environment
      if (!tokens.USDC) {
        console.log(
          "Skipping USDC test - token not configured for this environment"
        );
        return;
      }

      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt });

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "10000", // 0.01 USDC (token decimals: 6)
        token: tokens.USDC.address,
        smartWalletAddress: wallet.address,
      };

      const response = await client.withdrawFunds(withdrawRequest);

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

      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt });

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
      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt });

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
      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt });

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
      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt });

      // Generate a deterministic test address different from eoaAddress
      const differentRecipient = await getAddress(
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
      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt });

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: "invalid-address", // Invalid address format
        amount: "1000000000000000", // 0.001 ETH in wei
        token: "ETH",
        smartWalletAddress: wallet.address,
      };

      await expect(client.withdrawFunds(withdrawRequest)).rejects.toThrow();
    });

    test("should reject withdrawal with invalid token address", async () => {
      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt });

      const withdrawRequest: WithdrawFundsRequest = {
        recipientAddress: eoaAddress,
        amount: "1000000000000000", // 0.001 ETH in wei
        token: "invalid-token", // Invalid token format
        smartWalletAddress: wallet.address,
      };

      await expect(client.withdrawFunds(withdrawRequest)).rejects.toThrow();
    });

    test("should reject withdrawal with invalid amount format", async () => {
      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt });

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
        endpoint: avsEndpoint,
      });

      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt }); // Use authenticated client to create wallet

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
        endpoint: avsEndpoint,
      });

      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt }); // Use authenticated client to create wallet

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
      const salt = "0"; // Use salt 0 for consistent wallet address that can be pre-funded
      const wallet = await client.getWallet({ salt });

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
});
