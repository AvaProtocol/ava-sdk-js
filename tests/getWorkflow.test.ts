import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "@/sdk-js/dist";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  queueForRemoval,
  compareResults,
  removeCreatedWorkflows,
} from "./utils";
import { EXPIRED_AT, FACTORY_ADDRESS, WorkflowTemplate } from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows and isDeleting status tracking of those that need to be cleaned up after the test
const createdWorkflows: Map<string, boolean> = new Map();

describe("getWorkflow Tests", () => {
  let client: Client;
  let eoaAddress: string;

  beforeAll(async () => {
    eoaAddress = await getAddress(TEST_PRIVATE_KEY);
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

  test("should get workflow when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        smartWalletAddress: wallet.address,
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    const result = await client.getWorkflow(workflowId);

    // Check if the result is an object and has the expected properties
    compareResults(
      {
        ...WorkflowTemplate,
        id: workflowId,
        owner: eoaAddress,
        smartWalletAddress: wallet.address,
      },
      result
    );
  });

  test("should throw task not found when getting an non-existent task", async () => {
    await expect(
      client.getWorkflow("non-existent-task-id")
    ).rejects.toThrowError(/NOT_FOUND/i);
  });
});
