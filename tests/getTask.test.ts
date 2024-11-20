import * as avs_pb from "../grpc_codegen/avs_pb";
import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../dist";
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
  TEST_PRIVATE_KEY: requireEnvVar('TEST_PRIVATE_KEY'),
  TOKEN_CONTRACT: requireEnvVar("TOKEN_CONTRACT"),
  ORACLE_CONTRACT: requireEnvVar("ORACLE_CONTRACT"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Define EXPIRED_AT as a constant
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours from now

describe("getTask Tests", () => {
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
      const listSmartWalletsRes = await client.listSmartWallets({ authKey });
      smartWalletAddress = listSmartWalletsRes[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);

      console.log("Creating a task to use for the following tests");
      createdTaskId = await client.createTask(
        {
          ...sampleTask1, smartWalletAddress
        },
        { authKey }
      );
    });

    test("should get task when authenticated with signature", async () => {
      const result = await client.getTask(createdTaskId, { authKey });

      // Check if the result is an object and has the expected properties
      expect(result).toBeDefined();
      expect(result.status).toBe(avs_pb.TaskStatus.ACTIVE);
      expect(result.id).toBe(createdTaskId);
      expect(result.smartWalletAddress).toEqual(smartWalletAddress);
      //expect(result.trigger).toBeDefined();
      expect(result.nodes).toHaveLength(1);
      expect(result.expiredAt).toEqual(sampleTask1.expiredAt);
      expect(result.memo).toEqual(sampleTask1.memo);
    });

    test("should throw task not found when getting an non-existent task", async () => {
      await expect(client.getTask("non-existent-task-id", { authKey })).rejects.toThrow("5 NOT_FOUND: task not found");
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
      const listSmartWalletsRes = await client.listSmartWallets({ authKey });
      smartWalletAddress = listSmartWalletsRes[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);

      console.log("Creating a task to use for the following tests");
      createdTaskId = await client.createTask(
        { ...sampleTask1, smartWalletAddress },
        { authKey }
      );
    });

    test("should get task when authenticated with API key", async () => {
      const result = await client.getTask(createdTaskId, { authKey });

      console.log("trask is ", result);
      // Check if the result is an object and has the expected properties
      expect(result).toBeDefined();
      expect(result.status).toBe(avs_pb.TaskStatus.ACTIVE);
      expect(result.id).toBe(createdTaskId);
      expect(result.smartWalletAddress).toEqual(smartWalletAddress);
      expect(result.trigger).toBeDefined();
      expect(result.trigger.triggerType).toEqual(avs_pb.TaskTrigger.TriggerTypeCase.BLOCK);
      expect(result.nodes).toHaveLength(1);
      expect(result.expiredAt).toEqual(sampleTask1.expiredAt);
      expect(result.memo).toEqual(sampleTask1.memo);
    });

    test("should throw task not found when getting an non-existent task", async () => {
      await expect(client.getTask("non-existent-task-id", { authKey })).rejects.toThrow("5 NOT_FOUND: task not found");
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
      const listSmartWalletsRes = await client.listSmartWallets({ authKey });
      smartWalletAddress = listSmartWalletsRes[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);

      console.log("Creating a task to use for the following tests");
      createdTaskId = await client.createTask(
        { ...sampleTask1, smartWalletAddress },
        { authKey }
      );
    });

    test("should throw error when getting a task without authentication", async () => {
      await expect(
        client.getTask(createdTaskId, { authKey: "" })
      ).rejects.toThrow("missing auth header");
    });
  });
});
