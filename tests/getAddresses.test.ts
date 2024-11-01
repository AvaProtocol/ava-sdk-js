import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../dist/index.js";
import dotenv from "dotenv";
import path from "path";
import { getAddress, generateSignature, requireEnvVar } from "./utils";

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
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  TOKEN_CONTRACT: requireEnvVar("TOKEN_CONTRACT"),
  ORACLE_CONTRACT: requireEnvVar("ORACLE_CONTRACT"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Define EXPIRED_AT as a constant
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours from now

describe("getAddresses Tests", () => {
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
    let smartWallet: string;

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

    test("should get addresses when authenticated with signature", async () => {
      const result = await client.getAddresses(ownerAddress, { authKey });
      expect(result.smart_account_address).toBeDefined();
      smartWallet = result.smart_account_address;
      console.log("Smart wallet address:", smartWallet);
    });

    test("should return empty when getting address with smartWallet using signature", async () => {
      const result = await client.getAddresses(smartWallet, { authKey });
      expect(result.smart_account_address).toBe(undefined);
    });
  });

  describe("Auth with API key", () => {
    let authKey: string;
    let smartWallet: string;

    beforeAll(async () => {
      console.log("Authenticating with API key ...");
      const res = await client.authWithAPIKey(TEST_API_KEY, EXPIRED_AT);
      authKey = res.authKey;
    });

    test("should get addresses when authenticated with API key", async () => {
      const result = await client.getAddresses(ownerAddress, { authKey });
      expect(result.smart_account_address).toBeDefined();
      smartWallet = result.smart_account_address;
    });

    test("should return empty when getting address with smartWallet using API key", async () => {
      const result = await client.getAddresses(smartWallet, { authKey });
      expect(result.smart_account_address).toBe(undefined);
    });
  });

  test("should throw error when getting address without authentication", async () => {
    await expect(
      client.getAddresses(ownerAddress, { authKey: "" })
    ).rejects.toThrow("missing auth header");
  });
});
