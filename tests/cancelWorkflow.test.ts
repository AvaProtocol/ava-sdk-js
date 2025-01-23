import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "@/sdk-js/dist";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  queueForRemoval,
  removeCreatedWorkflows,
} from "./utils";
import { EXPIRED_AT, FACTORY_ADDRESS, WorkflowTemplate } from "./templates";
import { WorkflowStatus } from "@/sdk-js/dist";

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

describe("cancelWorkflow Tests", () => {
  let client: Client;

  beforeAll(async () => {
    const eoaAddress = await getAddress(TEST_PRIVATE_KEY);
    console.log("Client endpoint:", ENDPOINT, "\nOwner address:", eoaAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
      factoryAddress: FACTORY_ADDRESS,
    });

    console.log("Authenticating with signature ...");
    const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);
    const res = await client.authWithSignature(signature);

    client.setAuthKey(res.authKey);
  });

  afterAll(async () => await removeCreatedWorkflows(client, createdWorkflows));

  test("should cancel task when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: "0" });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        smartWalletAddress: wallet.address,
      })
    );

    queueForRemoval(createdWorkflows, workflowId);

    const result = await client.cancelWorkflow(workflowId);
    expect(result).toBe(true);

    const cancelResult = await client.getWorkflow(workflowId);
    expect(cancelResult.id).toEqual(workflowId);
    expect(cancelResult.status).toEqual(WorkflowStatus.Canceled);
  });

  test("should throw error when canceling an non-existent task", async () => {
    await expect(
      client.cancelWorkflow("non-existent-task-id")
    ).rejects.toThrowError(/NOT_FOUND/i);
  });
});
