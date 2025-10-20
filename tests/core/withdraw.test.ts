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
  TIMEOUT_DURATION,
  describeIfSepolia,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
import { ethers } from "ethers";

jest.setTimeout(TIMEOUT_DURATION); // Set timeout to 60 seconds for all tests in this file

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, tokens, chainEndpoint } = getConfig();

describeIfSepolia("Withdraw Funds Tests", () => {
  let client: Client;
  let eoaAddress: string;

  // NOTE: These tests use salt=0 for consistent wallet addresses that can be pre-funded
  // This is required for real blockchain tests that need funded smart wallets

  beforeAll(async () => {
    eoaAddress = await getAddress(walletPrivateKey);
    console.log("EOA address:", eoaAddress);

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

      // Wait for the on-chain transaction to be mined (or poll balance as fallback)
      if (response.transactionHash) {
        const receipt = await provider.waitForTransaction(
          response.transactionHash
        );
        expect(receipt).toBeTruthy();
      }

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
        `✅ Recipient balance increased by ${balanceIncrease} wei (expected: ${withdrawRequest.amount} wei)`
      );

      await provider.destroy();

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

  describe("Paymaster Reimbursement Verification", () => {
    test("should verify paymaster owner receives reimbursement on successful withdrawal", async () => {
      const wallet = await client.getWallet({ salt: "0" });
      const paymasterOwnerAddress =
        "0x72b9fcC9Ca53480a89839620c88526c76b1905a5"; // Paymaster owner EOA (receives reimbursement)

      // Get initial balances
      const provider = new ethers.JsonRpcProvider(chainEndpoint);

      const initialWalletBalance = await provider.getBalance(wallet.address);
      const initialPaymasterOwnerBalance = await provider.getBalance(
        paymasterOwnerAddress
      );
      const initialRecipientBalance = await provider.getBalance(eoaAddress);

      console.log("\nInitial Balances:");
      console.log(
        `  Wallet: ${initialWalletBalance} wei (${
          Number(initialWalletBalance) / 1e18
        } ETH)`
      );
      console.log(
        `  Paymaster Owner: ${initialPaymasterOwnerBalance} wei (${
          Number(initialPaymasterOwnerBalance) / 1e18
        } ETH)`
      );
      console.log(
        `  Recipient: ${initialRecipientBalance} wei (${
          Number(initialRecipientBalance) / 1e18
        } ETH)`
      );

      // Perform withdrawal
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
      expect(response.transactionHash).toBeDefined();

      console.log("\nWithdrawal Transaction:", response.transactionHash);

      // Wait for transaction confirmation and get the transaction details
      const txReceipt = await provider.waitForTransaction(
        response.transactionHash!
      );
      expect(txReceipt).toBeTruthy();

      const tx = await provider.getTransaction(response.transactionHash!);
      expect(tx).toBeTruthy();

      // Get balances at the specific block of THIS transaction (for accurate measurement)
      const blockBefore = tx!.blockNumber! - 1;
      const blockAfter = tx!.blockNumber!;

      const walletBalanceBefore = await provider.getBalance(
        wallet.address,
        blockBefore
      );
      const walletBalanceAfter = await provider.getBalance(
        wallet.address,
        blockAfter
      );

      const paymasterOwnerBalanceBefore = await provider.getBalance(
        paymasterOwnerAddress,
        blockBefore
      );
      const paymasterOwnerBalanceAfter = await provider.getBalance(
        paymasterOwnerAddress,
        blockAfter
      );

      const recipientBalanceBefore = await provider.getBalance(
        eoaAddress,
        blockBefore
      );
      const recipientBalanceAfter = await provider.getBalance(
        eoaAddress,
        blockAfter
      );

      console.log("\nFinal Balances:");
      console.log(
        `  Wallet: ${walletBalanceAfter} wei (${
          Number(walletBalanceAfter) / 1e18
        } ETH)`
      );
      console.log(
        `  Paymaster Owner: ${paymasterOwnerBalanceAfter} wei (${
          Number(paymasterOwnerBalanceAfter) / 1e18
        } ETH)`
      );
      console.log(
        `  Recipient: ${recipientBalanceAfter} wei (${
          Number(recipientBalanceAfter) / 1e18
        } ETH)`
      );

      // Calculate changes from THIS transaction only (block-level accuracy)
      const walletChange = walletBalanceAfter - walletBalanceBefore;
      const paymasterOwnerChange =
        paymasterOwnerBalanceAfter - paymasterOwnerBalanceBefore;
      const recipientChange = recipientBalanceAfter - recipientBalanceBefore;

      console.log("\nBalance Changes:");
      console.log(
        `  Wallet: ${walletChange} wei (${Number(walletChange) / 1e18} ETH)`
      );
      console.log(
        `  Paymaster Owner: ${paymasterOwnerChange} wei (${
          Number(paymasterOwnerChange) / 1e18
        } ETH)`
      );
      console.log(
        `  Recipient: ${recipientChange} wei (${
          Number(recipientChange) / 1e18
        } ETH)`
      );

      // Verify reimbursement occurred
      // Wallet should have decreased by: withdrawal amount + reimbursement amount
      // Paymaster owner should have INCREASED (received reimbursement)
      // Recipient should have increased by withdrawal amount

      expect(walletChange < 0n).toBeTruthy(); // Wallet decreased (sent ETH + reimbursement)
      expect(paymasterOwnerChange > 0n).toBeTruthy(); // Paymaster owner increased (received reimbursement)
      expect(recipientChange).toBe(BigInt(withdrawalAmount)); // Recipient received exact withdrawal amount

      // Verify wallet paid more than just the withdrawal (paid withdrawal + reimbursement)
      const walletDecrease = -walletChange;
      expect(walletDecrease > BigInt(withdrawalAmount)).toBeTruthy();

      console.log("\n✅ Reimbursement Verification:");
      console.log(
        `  Wallet paid: ${walletDecrease} wei (withdrawal + reimbursement)`
      );
      console.log(
        `  Paymaster owner received: ${paymasterOwnerChange} wei (reimbursement)`
      );
      console.log(`  Recipient received: ${recipientChange} wei (withdrawal)`);
      console.log(
        `  Extra paid by wallet: ${
          walletDecrease - BigInt(withdrawalAmount)
        } wei (reimbursement)`
      );

      // Verify gas used is within a sane bound of the transaction gas limit
      // This avoids flaky tests from gas price fluctuations by checking execution characteristics instead
      const txReceipt2 = await provider.getTransactionReceipt(
        response.transactionHash!
      );
      expect(txReceipt2).toBeTruthy();
      const txDetails = await provider.getTransaction(response.transactionHash!);
      expect(txDetails).toBeTruthy();

      const gasUsed = BigInt(txReceipt2!.gasUsed.toString());
      const gasLimit = BigInt(txDetails!.gasLimit.toString());

      // gasUsed should be > 0 and less than or equal to gasLimit
      expect(gasUsed > 0n).toBeTruthy();
      expect(gasUsed <= gasLimit).toBeTruthy();

      console.log(`  Gas used: ${gasUsed} / gas limit: ${gasLimit}`);

      await provider.destroy();
    });
  });
});
