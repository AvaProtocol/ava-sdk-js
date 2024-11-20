import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../src";
import dotenv from "dotenv";
import path from "path";
import { getAddress, generateSignature, requireEnvVar } from "./utils";

import { sampleTask1, TEST_PRIVATE_KEY } from "./fixture";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const {
  TEST_API_KEY,
  TOKEN_CONTRACT,
  ORACLE_CONTRACT,
  ENDPOINT,
} = {
  TEST_API_KEY: requireEnvVar("TEST_API_KEY"),
  TOKEN_CONTRACT: requireEnvVar("TOKEN_CONTRACT"),
  ORACLE_CONTRACT: requireEnvVar("ORACLE_CONTRACT"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Define EXPIRED_AT as a constant
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours from now

describe("createTask Tests", () => {
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
    let smartWalletAddress: string;
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

      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const result = await client.listSmartWallets({ authKey });
      smartWalletAddress = result[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);
    });

    test("should create a task when authenticated with signature", async () => {
      const result = await client.createTask(
        { ...sampleTask1, smartWalletAddress },
        { authKey }
      );
      console.log("Create task result:", result);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
    });

    test("should throw error when creating a task with owner address using signature", async () => {
      await expect(client.createTask(
        { ...sampleTask1, smartWalletAddress: ownerAddress },
        { authKey }
      )).rejects.toThrow("3 INVALID_ARGUMENT: invalid smart account address");
    });
  });

  describe("Auth with API key", () => {
    let authKey: string;
    let smartWalletAddress: string;

    beforeAll(async () => {
      console.log("Authenticating with API key ...");
      const res = await client.authWithAPIKey(ownerAddress,TEST_API_KEY,  EXPIRED_AT);
      authKey = res.authKey;

      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const result = await client.listSmartWallets({ authKey });
      smartWalletAddress = result[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);
    });

    test("should create a task when authenticated with API key", async () => {
      const result = await client.createTask(
        { ...sampleTask1, smartWalletAddress },
        { authKey }
      );
      console.log("Create task result:", result);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
    });

    test("should throw error when creating a task with owner address using API key", async () => {
      await expect(client.createTask(
        { ...sampleTask1, smartWalletAddress: ownerAddress },
        { authKey }
       )).rejects.toThrow("3 INVALID_ARGUMENT: invalid smart account addres");
    });
  });

  describe("Without authentication", () => {
    let smartWalletAddress: string;
    let authKey: string;

    test("should throw error when creating a task without authentication", async () => {
      await expect(client.createTask(
        { ...sampleTask1, smartWalletAddress }
      )).rejects.toThrow("missing auth header");
    });
  });
});
