import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../dist";
import dotenv from "dotenv";
import path from "path";
import { getAddress, generateSignature, requireEnvVar, queueTaskCleanup, teardown } from "./utils";

import { WorkflowTemplate } from "./fixture";

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

describe("listTasks Tests", () => {
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
    let workflowId: string;

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
      const listSmartWalletsRes = await client.getWallets({ authKey });
      smartWalletAddress = listSmartWalletsRes[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);

      console.log("Creating a task to use for the following tests");
      workflowId = await client.submitWorkflow(
        client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
        { authKey }
      );
      queueTaskCleanup(createdTaskId);
    });

    afterAll(async() => await teardown(client, authKey));

    test("should list tasks when authenticated with signature", async () => {
      const result = await client.getWorkflows(smartWalletAddress, {
        authKey,
      });
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result.some((task) => task.id === workflowId)).toBe(true);
    });

    test("should throw error when not sending a valid smart wallet address", async () => {
      await expect(
        client.getWorkflows(ownerAddress, { authKey })
      ).rejects.toThrow("3 INVALID_ARGUMENT: invalid smart account address");

      await expect(
        client.getWorkflows("0x000000000000000000000000000000000000dead", {
          authKey,
        })
      ).rejects.toThrow("3 INVALID_ARGUMENT: invalid smart account address");
    });
  });

  describe("Auth with API key", () => {
    let authKey: string;
    let smartWalletAddress: string;
    let workflowId: string;

    beforeAll(async () => {
      console.log("Authenticating with API key ...");
      const res = await client.authWithAPIKey(
        ownerAddress,
        TEST_API_KEY,
        EXPIRED_AT
      );
      authKey = res.authKey;

      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const listSmartWalletsRes = await client.getWallets({ authKey });
      smartWalletAddress = listSmartWalletsRes[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);

      console.log("Creating a task to use for the following tests");
      workflowId = await client.submitWorkflow(
        client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
        { authKey }
      );
      queueTaskCleanup(createdTaskId);
    });

    afterAll(async() => await teardown(client, authKey));

    test("should list tasks when authenticated with API key", async () => {
      const result = await client.getWorkflows(smartWalletAddress, { authKey });
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result.some((task) => task.id === workflowId)).toBe(true);
    });

    test("should throw error when not sending a valid smart wallet address using API key", async () => {
      await expect(
        client.getWorkflows(ownerAddress, { authKey })
      ).rejects.toThrow("3 INVALID_ARGUMENT: invalid smart account address");

      await expect(
        client.getWorkflows("0x000000000000000000000000000000000000dead", {
          authKey,
        })
      ).rejects.toThrow("3 INVALID_ARGUMENT: invalid smart account address");
    });
  });

  describe("Without authentication", () => {
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
      const listSmartWalletsRes = await client.getWallets({ authKey });
      smartWalletAddress = listSmartWalletsRes[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);
    });

    test("should throw error when listing tasks without authentication", async () => {
      await expect(
        client.getWorkflows(smartWalletAddress, { authKey: "" })
      ).rejects.toThrow("missing auth header");
    });
  });
});
