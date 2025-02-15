import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "@/sdk-js/dist";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  removeCreatedWorkflows,
  SaltGlobal,
  submitWorkflowAndQueueForRemoval,
} from "./utils";
import { FACTORY_ADDRESS, WorkflowTemplate } from "./templates";
import { WorkflowStatus } from "@/sdk-js/dist";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows and isDeleting status tracking of those that need to be cleaned up after the test
const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CancelWorkflow * 1000; // Salt index 1,000 - 1,999

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
    const signature = await generateSignature(TEST_PRIVATE_KEY);
    const res = await client.authWithSignature(signature);

    client.setAuthKey(res.authKey);
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  test("should cancel task when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

    const workflowId = await submitWorkflowAndQueueForRemoval(
      client,
      client.createWorkflow({
        ...WorkflowTemplate,
        smartWalletAddress: wallet.address,
      }),
      createdIdMap
    );

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
