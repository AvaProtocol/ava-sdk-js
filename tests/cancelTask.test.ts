import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../dist";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  queueForRemoval,
  removeCreatedWorkflows,
} from "./utils";

import { WorkflowTemplate } from "./templates";
import { WorkflowStatuses } from "../dist";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_API_KEY, TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_API_KEY: requireEnvVar("TEST_API_KEY"),
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows and isDeleting status tracking of those that need to be cleaned up after the test
const createdWorkflows: Map<string, boolean> = new Map();

// Define EXPIRED_AT as a constant
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours from now

describe("cancelTask Tests", () => {
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
      const result = await client.getWallets({ authKey });
      smartWalletAddress = result[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);

      console.log("Creating a task to use for the following tests");
      workflowId = await client.submitWorkflow(
        client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
        { authKey }
      );

      queueForRemoval(createdWorkflows, workflowId);
    });

    afterAll(
      async () =>
        await removeCreatedWorkflows(client, authKey, createdWorkflows)
    );

    test("should cancel task when authenticated with signature", async () => {
      const result = await client.cancelWorkflow(workflowId, { authKey });
      expect(result).toBe(true);

      const cancelResult = await client.getWorkflow(workflowId, { authKey });
      expect(cancelResult.id).toEqual(workflowId);
      expect(cancelResult.status).toEqual(WorkflowStatuses.CANCELED);
    });

    test("should throw error when canceling an non-existent task", async () => {
      // This fails because the current error message is "2 UNKNOWN: Key not found", which is not a clear error message
      await expect(
        client.cancelWorkflow("non-existent-task-id", { authKey })
      ).rejects.toThrow("5 NOT_FOUND: task not found");
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
      const wallets = await client.getWallets({ authKey });
      smartWalletAddress = wallets[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);

      console.log("Creating a task to use for the following tests");
      workflowId = await client.submitWorkflow(
        client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
        { authKey }
      );

      queueForRemoval(createdWorkflows, workflowId);
    });

    afterAll(
      async () =>
        await removeCreatedWorkflows(client, authKey, createdWorkflows)
    );

    test("should cancel task when authenticated with API key", async () => {
      const result = await client.cancelWorkflow(workflowId, { authKey });
      expect(result).toBe(true);

      // TODO: there was a cleanup after creation
      const cancelResult = await client.getWorkflow(workflowId, { authKey });
      expect(cancelResult.id).toEqual(workflowId);
      expect(cancelResult.status).toEqual(WorkflowStatuses.CANCELED);
    });

    test("should throw error when canceling an non-existent task", async () => {
      await expect(
        client.cancelWorkflow("non-existent-task-id", { authKey })
      ).rejects.toThrow("5 NOT_FOUND: task not found");
    });
  });

  describe("Without authentication", () => {
    let smartWalletAddress: string;
    let authKey: string;
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
      const wallets = await client.getWallets({ authKey });
      smartWalletAddress = wallets[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);

      console.log("Creating a task to use for the following tests");
      workflowId = await client.submitWorkflow(
        client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
        { authKey }
      );

      queueForRemoval(createdWorkflows, workflowId);
    });

    afterAll(
      async () =>
        await removeCreatedWorkflows(client, authKey, createdWorkflows)
    );

    test("should throw error when canceling a task without authentication", async () => {
      await expect(
        client.cancelWorkflow(workflowId, { authKey: "" })
      ).rejects.toThrow("missing auth header");
    });
  });
});
