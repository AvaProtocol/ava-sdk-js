import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../dist";
import dotenv from "dotenv";
import path from "path";
import { getAddress, generateSignature, requireEnvVar } from "./utils";
import { FACTORY_ADDRESS } from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });
// Get environment variables with type safety
const { TEST_API_KEY, TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_API_KEY: requireEnvVar("TEST_API_KEY"),
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Define EXPIRED_AT as a constant
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours from now

describe("listSmartWalletses Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(TEST_PRIVATE_KEY);
    console.log("Client endpoint:", ENDPOINT, "\nOwner address:", ownerAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
    });
  });

  describe("Auth with Signature", () => {
    let authKey: string;

    beforeAll(async () => {
      console.log("Authenticating with signature ...");
      const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);
      const res = await client.authWithSignature(
        ownerAddress,
        signature,
        EXPIRED_AT
      );
      authKey = res.authKey;
    });

    test("should include default smart wallet when authenticated with signature", async () => {
      const result = await client.getWallets({ authKey });
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0].salt).toEqual("0");
      expect(result[0].factory).toEqual(FACTORY_ADDRESS);
      expect(result[0].address).toHaveLength(42);
    });

    test("should include custom salt wallet when getting address with smartWallet using signature", async () => {
      const randomSalt = "12345";
      await client.createWallet({ salt: randomSalt }, { authKey });

      const wallets = await client.getWallets({ authKey });
      expect(wallets.length).toBeGreaterThanOrEqual(2);
      expect(wallets.some((item) => item.salt === randomSalt)).toBe(true);
    });

    test("create wallet is idempotent", async () => {
      const salt1 = "12345";
      const salt2 = "0";
      const createdWallet1 = await client.createWallet({ salt: salt1 }, { authKey });
      const createdWallet2 = await client.createWallet({ salt: salt2 }, { authKey });

      const wallets = await client.getWallets({ authKey });

      // Make sure the created wallets have correponding salts
      expect(wallets.find((item) => item.address === createdWallet1.address)?.salt).toEqual(salt1);
      expect(wallets.find((item) => item.address === createdWallet2.address)?.salt).toEqual(salt2);
    });
  });

  describe("Auth with API key", () => {
    let authKey: string;
    beforeAll(async () => {
      console.log("Authenticating with API key ...");
      const res = await client.authWithAPIKey(
        ownerAddress,
        TEST_API_KEY,
        EXPIRED_AT
      );
      authKey = res.authKey;
    });

    test("should include default smart wallet when authenticated with API key", async () => {
      const result = await client.getWallets({ authKey });
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0].salt).toEqual("0");
      expect(result[0].factory).toEqual(FACTORY_ADDRESS);
      expect(result[0].address).toHaveLength(42);
    });

    test("should include custom salt wallet when getting address with API key", async () => {
      const randomSalt = "78910";
      await client.createWallet({ salt: randomSalt }, { authKey });

      const wallets = await client.getWallets({ authKey });
      expect(wallets.length).toBeGreaterThanOrEqual(2);
      expect(wallets.some((item) => item.salt === randomSalt)).toBe(true);
    });
  });

  test("should throw error when getting address without authentication", async () => {
    await expect(client.getWallets({ authKey: "" })).rejects.toThrow(
      "missing auth header"
    );
  });
});
