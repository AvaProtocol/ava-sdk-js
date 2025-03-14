import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  compareResults,
  SaltGlobal,
  removeCreatedWorkflows,
  submitWorkflowAndQueueForRemoval,
  queueForRemoval,
} from "./utils";
import { FACTORY_ADDRESS, WorkflowTemplate } from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows and isDeleting status tracking of those that need to be cleaned up after the test
const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.GetWorkflow * 1000; // Salt index 7,000 - 7,999

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
    const signature = await generateSignature(TEST_PRIVATE_KEY);
    const res = await client.authWithSignature(signature);

    client.setAuthKey(res.authKey);
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  test("should get workflow when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const workflowId = await submitWorkflowAndQueueForRemoval(
      client,
      {
        ...WorkflowTemplate,
        smartWalletAddress: wallet.address,
      },
      createdIdMap
    );

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
