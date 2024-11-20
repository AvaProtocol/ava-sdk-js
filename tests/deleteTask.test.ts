import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../src";
import dotenv from "dotenv";
import path from "path";
import { getAddress, generateSignature, requireEnvVar } from "./utils";

import { sampleTask1 } from "./fixture";

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

describe("deleteTask Tests", () => {
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
    let smartWalletAddress: string;
    let createdTaskId: string;

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

      console.log("Creating a task to use for the following tests");
      const createTaskRes = await client.createTask(
        { ...sampleTask1, smartWalletAddress },
        { authKey }
      );

      createdTaskId = createTaskRes.id;
    });

    test("should delete task when authenticated with signature", async () => {
      const result = await client.deleteTask(createdTaskId, { authKey });
      expect(result).toBe(true);

      const listRes = await client.listTasks(smartWalletAddress, { authKey });
      expect(Array.isArray(listRes)).toBe(true);
      expect(listRes.some((task) => task.id === createdTaskId)).toBe(
        false
      );
    });

    test("should throw error when deleting an non-existent task", async () => {
      // This fails because the current error message is "2 UNKNOWN: Key not found", which is not a clear error message
      await expect(client.deleteTask("non-existent-task-id", { authKey }))
        .rejects.toThrow("5 NOT_FOUND: task not found");
    });
  });

  describe("Auth with API key", () => {
    let authKey: string;
    let smartWalletAddress: string;
    let createdTaskId: string;

    beforeAll(async () => {
      console.log("Authenticating with API key ...");
      const res = await client.authWithAPIKey(ownerAddress, TEST_API_KEY, EXPIRED_AT);
      authKey = res.authKey;

      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const getAddressesRes = await client.listSmartWallets({ authKey });
      smartWalletAddress = getAddressesRes[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);

      console.log("Creating a task to use for the following tests");
      const createTaskRes = await client.createTask(
        { ...sampleTask1, smartWalletAddress },
        { authKey }
      );

      createdTaskId = createTaskRes.id;
      console.log("crate task", createdTaskId);
    });

    test("should delete task when authenticated with API key", async () => {
      const result = await client.deleteTask(createdTaskId, { authKey });
      expect(result).toBe(true);

      const listRes = await client.listTasks(smartWalletAddress, { authKey });
      expect(Array.isArray(listRes)).toBe(true);
      expect(listRes.some((task) => task.id === createdTaskId)).toBe(
        false
      );
    });

    test("should throw error when deleting an non-existent task", async () => {
      await expect(client.deleteTask("non-existent-task-id", { authKey }))
        .rejects.toThrow("5 NOT_FOUND: task not found");
    });
  });

  describe("Without authentication", () => {
    let smartWalletAddress: string;
    let authKey: string;
    let createdTaskId: string;

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
      const getAddressesRes = await client.listSmartWallets({ authKey });
      smartWalletAddress = getAddressesRes[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);

      console.log("Creating a task to use for the following tests");
      const createTaskRes = await client.createTask(
        { ...sampleTask1, smartWalletAddress },
        { authKey }
      );

      createdTaskId = createTaskRes.id;
    });

    test("should throw error when deleting a task without authentication", async () => {
      await expect(client.deleteTask(createdTaskId, { authKey: "" })).rejects.toThrow("missing auth header");
    });
  });
});
