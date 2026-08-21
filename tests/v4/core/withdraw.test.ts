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
 * The funded-wallet helper looks up MA v2 salt "0" (see
 * getFundedFixture). If the wallet is unfunded, on-chain tests skip
 * with the address to fund; the validation tests still run.
 */

import { ethers } from "ethers";

import { Chains, Client, Tokens, type v4 } from "@avaprotocol/sdk-js";

import {
  getClient,
  getFundedClient,
  getFundedFixture,
  FUNDED_FACTORY_ADDRESS,
  FUNDED_WALLET_SALT,
  createSmartWallet,
} from "../../utils/client";
import {
  e2eWithdrawAlternateRecipient,
  SESSION_POLICY_NATIVE_NOT_ALLOWED,
} from "../../utils/sessionGrant";
import { optionalEnv } from "../../utils/env";

// Real UserOp round-trips can take ~3 minutes (bundler → EntryPoint
// → on-chain confirmation). v3 used TimeoutPresets.SLOW (180s) on the
// gRPC client; v4 uses a per-request HTTP timeout. Bump well past the
// expected upper bound so a slow Sepolia run doesn't trip the abort.
jest.setTimeout(240_000);

const WITHDRAW_TIMEOUT_MS = 200_000;

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

function fundedSkipMessage(address: string, detail: string): string {
  return (
    `Skipping — ${detail}. Fund MA v2 salt-${FUNDED_WALLET_SALT} wallet ` +
    `${address} (factory ${FUNDED_FACTORY_ADDRESS}) on Sepolia with ETH and USDC.`
  );
}

/**
 * Submit a withdrawal against the funded test wallet. Returns the
 * response on success; returns undefined and logs a skip note when
 * the wallet is unfunded. Session-grant / bundler errors fail the
 * test — those are not a funding gap.
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
    const errObj = err as { status?: number; code?: string; message?: string };
    // Native ETH is a typed 400 (SESSION_POLICY_NATIVE_NOT_ALLOWED), not
    // a funding miss — let those tests assert the code.
    if (
      errObj.status === 400 &&
      errObj.code !== SESSION_POLICY_NATIVE_NOT_ALLOWED &&
      /insufficient/i.test(`${errObj.code ?? ""} ${errObj.message ?? ""}`)
    ) {
      console.log(fundedSkipMessage(address, "wallet not funded on this chain"));
      return undefined;
    }
    throw err;
  }
  if (response.status === "failed") {
    const msg = response.message ?? "";
    if (/insufficient/i.test(msg)) {
      console.log(fundedSkipMessage(address, msg || "insufficient funds"));
      return undefined;
    }
    throw new Error(
      `UserOp withdraw failed for MA v2 funded wallet ${address}: ${msg || "failed"}`,
    );
  }
  return response;
}

describe("Withdraw Funds Tests", () => {
  let client: Client;
  let eoaAddress: string;
  let fundedWallet: v4.Wallet | undefined;
  // Lazily resolve the chain endpoint — only the on-chain tests
  // need it, and the validation tests must keep running when
  // CHAIN_ENDPOINT is absent.
  const chainEndpoint = optionalEnv("CHAIN_ENDPOINT", "");

  beforeAll(async () => {
    // Validation tests still need an authenticated client. Skip the
    // grant+UserOp fixture when WITHDRAW_SKIP_ON_CHAIN is set, and
    // keep running those tests if the funded wallet cannot be created.
    if (SKIP_ON_CHAIN) {
      const fx = await getFundedClient();
      client = fx.client;
      eoaAddress = fx.owner;
      return;
    }
    try {
      const fx = await getFundedFixture();
      client = fx.client;
      eoaAddress = fx.owner;
      fundedWallet = fx.wallet;
    } catch (err) {
      const fx = await getFundedClient();
      client = fx.client;
      eoaAddress = fx.owner;
      console.log(
        `Skipping on-chain withdraws — ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  });

  describe("withdraw: native ETH (session-grant refusal)", () => {
    test("refuses an ETH withdrawal with SESSION_POLICY_NATIVE_NOT_ALLOWED", async () => {
      const wallet = fundedWallet;
      if (!wallet) {
        console.log("Skipping — WITHDRAW_SKIP_ON_CHAIN=true or funded wallet unavailable");
        return;
      }

      await expect(
        client.wallets.withdraw(wallet.address, {
          recipientAddress: eoaAddress,
          amount: "1000000000000000", // 0.001 ETH
          token: "ETH",
        }),
      ).rejects.toMatchObject({
        status: 400,
        code: SESSION_POLICY_NATIVE_NOT_ALLOWED,
      });
    });
  });

  describe("withdraw: ERC-20", () => {
    test("submits a USDC withdrawal when the token is configured", async () => {
      const wallet = fundedWallet;
      if (!wallet) {
        console.log("Skipping — WITHDRAW_SKIP_ON_CHAIN=true or funded wallet unavailable");
        return;
      }

      const usdcAddress = Tokens.USDC[Chains.Sepolia]!.address;
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
      const wallet = fundedWallet;
      if (!wallet) {
        console.log("Skipping — WITHDRAW_SKIP_ON_CHAIN=true or funded wallet unavailable");
        return;
      }

      const otherRecipient = e2eWithdrawAlternateRecipient();
      const usdcAddress = Tokens.USDC[Chains.Sepolia]!.address;
      // Native ETH is refused under REST session grants; ERC-20 transfer
      // to a different recipient is the path that can still mine.
      const req: v4.WithdrawRequest = {
        recipientAddress: otherRecipient,
        amount: "10000", // 0.01 USDC
        token: usdcAddress,
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
      const wallet = fundedWallet;
      if (!wallet) {
        console.log("Skipping — WITHDRAW_SKIP_ON_CHAIN=true or funded wallet unavailable");
        return;
      }

      const req: v4.WithdrawRequest = {
        recipientAddress: eoaAddress,
        amount: "10000",
        token: Tokens.USDC[Chains.Sepolia]!.address,
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
    test("internal txs all succeed on a session-granted ERC-20 withdrawal", async () => {
      const wallet = fundedWallet;
      if (!wallet) {
        console.log("Skipping — WITHDRAW_SKIP_ON_CHAIN=true or funded wallet unavailable");
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
        amount: "10000",
        token: Tokens.USDC[Chains.Sepolia]!.address,
      };

      const response = await submitWithdrawOrSkip(client, wallet.address, req);
      if (!response) return;
      expect(response.status).not.toBe("failed");
      expect(response.transactionHash).toBeTruthy();

      const check = await pollReceipt(response.transactionHash!, provider);
      expect(check.success).toBe(true);
      expect(check.receipt?.status).toBe(1);
    }, WITHDRAW_TIMEOUT_MS);
  });
});
