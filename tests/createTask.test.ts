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

describe("listTasks Tests", () => {
  let ownerAddress: string;

  beforeAll(async () => {
    ownerAddress = await getAddress(TEST_PRIVATE_KEY);
  });

  describe("Auth with Signature", () => {
    let client: Client;
    let smartWallet: string;
    beforeAll(async () => {
      // Initialize the client with test credentials
      client = new Client({
        endpoint: ENDPOINT,
      });

      console.log("Authenticating with signature ...");
      const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);
      await client.authWithSignature(ownerAddress, signature, EXPIRED_AT);

      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const result = await client.getAddresses(ownerAddress);
      smartWallet = result.smart_account_address;
      console.log(`Smart wallet created: ${smartWallet}`);
    });

    test("should create a task when authenticated with signature", async () => {
      const result = await client.createTask({
        address: smartWallet,
        tokenContract: TOKEN_CONTRACT,
        oracleContract: ORACLE_CONTRACT,
      });
      console.log("Create task result:", result);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
    });

    test("should fail when creating a task with owner address using signature", async () => {
      await expect(
        client.createTask({
          address: ownerAddress,
          tokenContract: TOKEN_CONTRACT,
          oracleContract: ORACLE_CONTRACT,
        })
      ).rejects.toThrow("invalid address");
    });
  });

  describe("Auth with API key", () => {
    let client: Client;
    let smartWallet: string;
    beforeAll(async () => {
      // Initialize the client with test credentials
      client = new Client({
        endpoint: ENDPOINT,
      });

      console.log("Authenticating with API key ...");
      await client.authWithAPIKey(TEST_API_KEY, EXPIRED_AT);

      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const result = await client.getAddresses(ownerAddress);
      smartWallet = result.smart_account_address;
      console.log(`Smart wallet created: ${smartWallet}`);
    });

    test("should create a task when authenticated with API key", async () => {
      const result = await client.createTask({
        address: smartWallet,
        tokenContract: TOKEN_CONTRACT,
        oracleContract: ORACLE_CONTRACT,
      });
      console.log("Create task result:", result);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
    });

    test("should fail when creating a task with owner address using API key", async () => {
      await expect(
        client.createTask({
          address: ownerAddress,
          tokenContract: TOKEN_CONTRACT,
          oracleContract: ORACLE_CONTRACT,
        })
      ).rejects.toThrow("invalid address");
    });
  });

  test("should throw error when creating a task without authentication", async () => {
    const clientWithoutAuth = new Client({
      endpoint: ENDPOINT,
    });

    await expect(
      clientWithoutAuth.createTask({
        address: ownerAddress,
        tokenContract: TOKEN_CONTRACT,
        oracleContract: ORACLE_CONTRACT,
      })
    ).rejects.toThrow("missing auth header");
  });
});
