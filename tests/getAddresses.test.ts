import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../dist";
import dotenv from "dotenv";
import path from "path";
import { getAddress, generateSignature, requireEnvVar } from "./utils";
import { DUMMY_PRIVATE_KEY } from "./fixture";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });
// Get environment variables with type safety
const {
  TEST_API_KEY,
  TEST_PRIVATE_KEY,
  TOKEN_CONTRACT,
  ORACLE_CONTRACT,
  ENDPOINT,
} = {
  TEST_API_KEY: requireEnvVar("TEST_API_KEY"),
  TEST_PRIVATE_KEY: requireEnvVar('TEST_PRIVATE_KEY'),
  TOKEN_CONTRACT: requireEnvVar("TOKEN_CONTRACT"),
  ORACLE_CONTRACT: requireEnvVar("ORACLE_CONTRACT"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Define EXPIRED_AT as a constant
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours from now

describe("listSmartWalletses Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(DUMMY_PRIVATE_KEY);
    console.log("Client endpoint:", ENDPOINT, "\nOwner address:", ownerAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
    });
  });

  describe("Auth with Signature", () => {
    let authKey: string;
    let smartWallet: string;

    beforeAll(async () => {
      console.log("Authenticating with signature ...");
      const signature = await generateSignature(DUMMY_PRIVATE_KEY, EXPIRED_AT);
      const res = await client.authWithSignature(
        ownerAddress,
        signature,
        EXPIRED_AT
      );
      authKey = res.authKey;
    });

    test("should include default smart wallet when authenticated with signature", async () => {
      const result = await client.listSmartWallets({ authKey });
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0].salt).toEqual("0");
      expect(result[0].factory).toEqual("0x29adA1b5217242DEaBB142BC3b1bCfFdd56008e7");
      expect(result[0].address).toHaveLength(42);
    });

    test("should include custom salt wallet when getting address with smartWallet using signature", async () => {
      await client.createWallet({salt: "12345"}, { authKey });

      const wallets = await client.listSmartWallets({ authKey });
      expect(wallets.length).toBeGreaterThanOrEqual(2);
      expect(wallets.some(item => item.salt === "12345")).toBe(true);
    });

    test("create wallet is idempotent", async () => {
      await client.createWallet({salt: "12345"}, { authKey });
      await client.createWallet({salt: "12345"}, { authKey });
      await client.createWallet({salt: 0}, { authKey });
      await client.createWallet({salt: 0}, { authKey });

      const wallets = await client.listSmartWallets({ authKey });
      console.log("wallet", wallets);
      expect(wallets.filter(item => item.salt === "12345")).toHaveLength(1);
      expect(wallets.filter(item => item.salt === "0")).toHaveLength(1);
    });
  });

  describe("Auth with API key", () => {
    let authKey: string;
    let smartWallet: string;

    beforeAll(async () => {
      console.log("Authenticating with API key ...");
      const res = await client.authWithAPIKey(ownerAddress, TEST_API_KEY, EXPIRED_AT);
      authKey = res.authKey;
    });

    test("should include default smart wallet when authenticated with API key", async () => {
      const result = await client.listSmartWallets({ authKey });
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0].salt).toEqual("0");
      expect(result[0].factory).toEqual("0x29adA1b5217242DEaBB142BC3b1bCfFdd56008e7");
      expect(result[0].address).toHaveLength(42);
    });

    test("should include custom salt wallet when getting address with API key", async () => {
      await client.createWallet({salt: "78910"}, { authKey });

      const wallets = await client.listSmartWallets({ authKey });
      expect(wallets.length).toBeGreaterThanOrEqual(2);
      expect(wallets.some(item => item.salt === "78910")).toBe(true);
    });
  });

  test("should throw error when getting address without authentication", async () => {
    await expect(
      client.listSmartWallets({ authKey: "" })
    ).rejects.toThrow("missing auth header");
  });
});
