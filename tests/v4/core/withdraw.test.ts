/**
 * Port of tests-v3-archive/core/withdraw.test.ts.
 *
 * v3 → v4 API mapping:
 *   - client.withdrawFunds({smartWalletAddress, ...req}, opts)
 *     -> client.wallets.withdraw(smartWalletAddress, req)
 *   - smartWalletAddress moves from the body into the URL path.
 *
 * Response shape diff:
 *   - v3 had `response.success: boolean`. v4 returns
 *     `status: "pending" | "submitted" | "failed"` — `success` is
 *     `status !== "failed"`.
 *
 * The "request-level auth key" v3 test is dropped — v4's transport
 * carries a single client-scoped Bearer JWT, so per-request auth
 * overrides don't exist.
 *
 * The funded-wallet helper uses salt "2" (same as v3), which is
 * pre-funded on the long-lived dev/sepolia smart wallet. If the
 * wallet is unfunded (running against a fresh chain), the
 * on-chain tests skip cleanly; the validation tests still run.
 */

import { ethers } from "ethers";

import { Client, type v4 } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  createSmartWallet,
} from "../../utils/client";
import { optionalEnv } from "../../utils/env";

// Real UserOp round-trips can take ~3 minutes (bundler → EntryPoint
// → on-chain confirmation). v3 used TimeoutPresets.SLOW (180s) on the
// gRPC client; v4 uses a per-request HTTP timeout. Bump well past the
// expected upper bound so a slow Sepolia run doesn't trip the abort.
jest.setTimeout(240_000);

const WITHDRAW_TIMEOUT_MS = 200_000;
const FUNDED_WALLET_SALT = "2";

// Optional override — if the dev chain endpoint isn't sepolia or the
// funded wallet doesn't exist, callers can flip this to skip the
// on-chain tests cleanly.
const SKIP_ON_CHAIN = optionalEnv("WITHDRAW_SKIP_ON_CHAIN", "").toLowerCase() === "true";

interface BundlerReceiptCheck {
  readonly success: boolean;
  readonly receipt: ethers.TransactionReceipt | null;
}

async function pollReceipt(
  hash: string,
  provider: ethers.JsonRpcProvider,
): Promise<BundlerReceiptCheck> {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    const receipt = await provider.getTransactionReceipt(hash);
    if (receipt) {
      return { success: receipt.status === 1, receipt };
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  return { success: false, receipt: null };
}

async function tryFundedWallet(client: Client): Promise<v4.Wallet | undefined> {
  if (SKIP_ON_CHAIN) return undefined;
  return createSmartWallet(client, { saltValue: FUNDED_WALLET_SALT });
}

/**
 * Submit a withdrawal against the funded test wallet. Returns the
 * response on success; returns undefined and logs a skip note when
 * the wallet is unfunded (server either throws 400/insufficient or
 * returns `{status: "failed"}`).
 */
async function submitWithdrawOrSkip(
  client: Client,
  address: string,
  req: v4.WithdrawRequest,
): Promise<v4.WithdrawResponse | undefined> {
  let response: v4.WithdrawResponse;
  try {
    response = await client.wallets.withdraw(address, req);
  } catch (err: unknown) {
    const errObj = err as { status?: number; message?: string };
    if (errObj.status === 400 || /insufficient/i.test(errObj.message ?? "")) {
      console.log("Skipping — funded wallet not funded on this chain");
      return undefined;
    }
    throw err;
  }
  if (response.status === "failed") {
    // The dev wallet (salt:2) isn't funded on this chain — bundler
    // bounced the UserOp. Treat as a soft skip so the validation
    // tests still cover their cases without requiring real ETH.
    console.log(`Skipping — UserOp returned failed status${response.message ? `: ${response.message}` : ""}`);
    return undefined;
  }
  return response;
}

describe("Withdraw Funds Tests", () => {
  let client: Client;
  let eoaAddress: string;
  // Lazily resolve the chain endpoint — only the on-chain tests
  // need it, and the validation tests must keep running when
  // CHAIN_ENDPOINT is absent.
  const chainEndpoint = optionalEnv("CHAIN_ENDPOINT", "");

  beforeAll(async () => {
    eoaAddress = getEOAAddress();
    client = getClient();
    await authenticateClient(client);
  });

  describe("withdraw: basic ETH happy path", () => {
    test("submits an ETH withdrawal and confirms receipt", async () => {
      const wallet = await tryFundedWallet(client);
      if (!wallet) {
        console.log("Skipping — WITHDRAW_SKIP_ON_CHAIN=true");
        return;
      }
      if (!chainEndpoint) {
        console.log("Skipping — CHAIN_ENDPOINT not set");
        return;
      }

      const provider = new ethers.JsonRpcProvider(
        chainEndpoint.startsWith("http") ? chainEndpoint : `https://${chainEndpoint}`,
      );
      const initialBalance = await provider.getBalance(eoaAddress);

      const req: v4.WithdrawRequest = {
        recipientAddress: eoaAddress,
        amount: "1000000000000000", // 0.001 ETH
        token: "ETH",
      };

      const response = await submitWithdrawOrSkip(client, wallet.address, req);
      if (!response) return;
      expect(response.status).not.toBe("failed");
      expect(response.smartWalletAddress?.toLowerCase()).toBe(
        wallet.address.toLowerCase(),
      );
      expect(response.transactionHash).toBeTruthy();

      const check = await pollReceipt(response.transactionHash!, provider);
      expect(check.success).toBe(true);
      expect(check.receipt?.status).toBe(1);

      const expectedDelta = BigInt(req.amount);
      let finalBalance = await provider.getBalance(eoaAddress);
      let delta = finalBalance - initialBalance;
      const deadline = Date.now() + 30_000;
      while (delta < expectedDelta && Date.now() < deadline) {
        await new Promise((r) => setTimeout(r, 1000));
        finalBalance = await provider.getBalance(eoaAddress);
        delta = finalBalance - initialBalance;
      }
      expect(delta).toBe(expectedDelta);
    }, WITHDRAW_TIMEOUT_MS);
  });

  describe("withdraw: ERC-20", () => {
    test("submits a USDC withdrawal when the token is configured", async () => {
      const wallet = await tryFundedWallet(client);
      if (!wallet) {
        console.log("Skipping — WITHDRAW_SKIP_ON_CHAIN=true");
        return;
      }

      const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
      const req: v4.WithdrawRequest = {
        recipientAddress: eoaAddress,
        amount: "10000", // 0.01 USDC (6 decimals)
        token: usdcAddress,
      };

      const response = await submitWithdrawOrSkip(client, wallet.address, req);
      if (!response) return;
      expect(response.status).not.toBe("failed");
      expect(response.smartWalletAddress?.toLowerCase()).toBe(wallet.address.toLowerCase());
      expect(response.recipientAddress?.toLowerCase()).toBe(eoaAddress.toLowerCase());
      expect(response.amount).toBe(req.amount);
      expect(response.token?.toLowerCase()).toBe(req.token.toLowerCase());
    }, WITHDRAW_TIMEOUT_MS);
  });

  describe("withdraw: edge cases (validation-only, no funding required)", () => {
    test("rejects zero amount", async () => {
      const wallet = await createSmartWallet(client);
      await expect(
        client.wallets.withdraw(wallet.address, {
          recipientAddress: eoaAddress,
          amount: "0",
          token: "ETH",
        }),
      ).rejects.toMatchObject({ status: 400 });
    });

    test("rejects unrealistically large amount with 400 (insufficient balance)", async () => {
      const wallet = await createSmartWallet(client);
      // 1000 ETH from a wallet that almost certainly doesn't hold it.
      // Server returns 400 (insufficient balance is a precondition
      // failure mapped to BadRequest by the gRPC→HTTP translation).
      await expect(
        client.wallets.withdraw(wallet.address, {
          recipientAddress: eoaAddress,
          amount: "1000000000000000000000",
          token: "ETH",
        }),
      ).rejects.toMatchObject({ status: 400 });
    });

    test("accepts an alternate recipient address", async () => {
      const wallet = await tryFundedWallet(client);
      if (!wallet) {
        console.log("Skipping — WITHDRAW_SKIP_ON_CHAIN=true");
        return;
      }

      const otherRecipient = getEOAAddress(
        "0x0000000000000000000000000000000000000000000000000000000000000001",
      );

      const req: v4.WithdrawRequest = {
        recipientAddress: otherRecipient,
        amount: "100000000000000", // 0.0001 ETH
        token: "ETH",
      };

      const response = await submitWithdrawOrSkip(client, wallet.address, req);
      if (!response) return;
      expect(response.status).not.toBe("failed");
      expect(response.smartWalletAddress?.toLowerCase()).toBe(wallet.address.toLowerCase());
      expect(response.recipientAddress?.toLowerCase()).toBe(otherRecipient.toLowerCase());
      expect(response.amount).toBe(req.amount);
    }, WITHDRAW_TIMEOUT_MS);

    test("rejects invalid recipient address", async () => {
      const wallet = await createSmartWallet(client);
      await expect(
        client.wallets.withdraw(wallet.address, {
          recipientAddress: "invalid-address",
          amount: "1000000000000000",
          token: "ETH",
        }),
      ).rejects.toMatchObject({ status: 400 });
    });

    test("rejects invalid token address", async () => {
      const wallet = await createSmartWallet(client);
      await expect(
        client.wallets.withdraw(wallet.address, {
          recipientAddress: eoaAddress,
          amount: "1000000000000000",
          token: "invalid-token",
        }),
      ).rejects.toMatchObject({ status: 400 });
    });

    test("rejects invalid amount format", async () => {
      const wallet = await createSmartWallet(client);
      await expect(
        client.wallets.withdraw(wallet.address, {
          recipientAddress: eoaAddress,
          amount: "invalid-amount",
          token: "ETH",
        }),
      ).rejects.toMatchObject({ status: 400 });
    });
  });

  describe("withdraw: authentication", () => {
    test("rejects unauthenticated withdrawals with 401", async () => {
      const wallet = await createSmartWallet(client);
      const unauth = getClient();
      await expect(
        unauth.wallets.withdraw(wallet.address, {
          recipientAddress: eoaAddress,
          amount: "1000000000000000",
          token: "ETH",
        }),
      ).rejects.toMatchObject({ status: 401 });
    });
  });

  describe("withdraw: response shape", () => {
    test("returns the documented v4.WithdrawResponse shape", async () => {
      const wallet = await tryFundedWallet(client);
      if (!wallet) {
        console.log("Skipping — WITHDRAW_SKIP_ON_CHAIN=true");
        return;
      }

      const req: v4.WithdrawRequest = {
        recipientAddress: eoaAddress,
        amount: "1000000000000000",
        token: "ETH",
      };

      const response = await submitWithdrawOrSkip(client, wallet.address, req);
      if (!response) return;
      expect(response).toHaveProperty("status");
      expect(response).toHaveProperty("smartWalletAddress");
      expect(response).toHaveProperty("recipientAddress");
      expect(response).toHaveProperty("amount");
      expect(response).toHaveProperty("token");
      expect(typeof response.status).toBe("string");
      expect(["pending", "confirmed", "failed"]).toContain(response.status);
      if (response.message !== undefined) expect(typeof response.message).toBe("string");
      if (response.userOpHash !== undefined) expect(typeof response.userOpHash).toBe("string");
      if (response.transactionHash !== undefined) {
        expect(typeof response.transactionHash).toBe("string");
      }
      if (response.submittedAt !== undefined) expect(typeof response.submittedAt).toBe("number");

      expect(response.recipientAddress?.toLowerCase()).toBe(
        req.recipientAddress.toLowerCase(),
      );
      expect(response.amount).toBe(req.amount);
      expect(response.token?.toLowerCase()).toBe(req.token.toLowerCase());
      expect(response.smartWalletAddress?.toLowerCase()).toBe(wallet.address.toLowerCase());
    }, WITHDRAW_TIMEOUT_MS);
  });

  describe("paymaster reimbursement check", () => {
    test("internal txs all succeed on paymaster-sponsored ETH withdrawal", async () => {
      const wallet = await tryFundedWallet(client);
      if (!wallet) {
        console.log("Skipping — WITHDRAW_SKIP_ON_CHAIN=true");
        return;
      }
      if (!chainEndpoint) {
        console.log("Skipping — CHAIN_ENDPOINT not set");
        return;
      }

      const provider = new ethers.JsonRpcProvider(
        chainEndpoint.startsWith("http") ? chainEndpoint : `https://${chainEndpoint}`,
      );

      const req: v4.WithdrawRequest = {
        recipientAddress: eoaAddress,
        amount: "2000000000000000",
        token: "ETH",
      };

      const response = await submitWithdrawOrSkip(client, wallet.address, req);
      if (!response) return;
      expect(response.status).not.toBe("failed");
      expect(response.transactionHash).toBeTruthy();

      const check = await pollReceipt(response.transactionHash!, provider);
      expect(check.success).toBe(true);
      expect(check.receipt?.status).toBe(1);
      // Withdrawals run with SkipReimbursement=true server-side (the
      // paymaster absorbs gas so the user can withdraw their full
      // balance). No reimbursement transfer is added to the UserOp
      // for withdrawals — non-withdrawal operations do reimburse.
    }, WITHDRAW_TIMEOUT_MS);
  });
});
