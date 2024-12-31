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

import { EXPIRED_AT, FACTORY_ADDRESS, WorkflowTemplate } from "./templates";

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

describe("deleteWorkflow Tests", () => {
  let client: Client;
  let workflowId: string;

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
    const res = await client.authWithSignature(
      eoaAddress,
      signature,
      EXPIRED_AT
    );

    client.setAuthKey(res.authKey);
  });

  afterAll(async () => await removeCreatedWorkflows(client, createdWorkflows));

  test("should delete task when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: "1" });
    workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        smartWalletAddress: wallet.address,
      })
    );

    queueForRemoval(createdWorkflows, workflowId);

    const result = await client.deleteWorkflow(workflowId);
    expect(result).toBe(true);

    const listRes = await client.getWorkflows([wallet.address]);

    expect(Array.isArray(listRes.result)).toBe(true);
    expect(listRes.result.some((task) => task.id === workflowId)).toBe(false);
  });

  test("should throw error when deleting an non-existent task", async () => {
    await expect(client.deleteWorkflow("non-existent-task-id")).rejects.toThrow(
      /NOT_FOUND/i
    );
  });
});
