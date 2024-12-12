import { describe, beforeAll, test, expect } from "@jest/globals";
import Client, { WorkflowStatuses } from "../dist";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  queueForRemoval,
  removeCreatedWorkflows,
  compareResults,
} from "./utils";
import { FACTORY_ADDRESS, WorkflowTemplate } from "./templates";

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

describe("Basic Tests", () => {
  let client: Client;
  let walletAddress: string; // Add this line to declare the variable

  beforeAll(async () => {
    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
    });

    // Generate the address here
    const address = await getAddress(TEST_PRIVATE_KEY);
    walletAddress = address;
  });

  test("should authenticate and return valid JWT token when using API key", async () => {
    const res = await client.authWithAPIKey(
      walletAddress,
      TEST_API_KEY,
      EXPIRED_AT
    );

    expect(res).toBeDefined();
    expect(res).toHaveProperty("authKey");

    // Check if the key is a valid JWT token
    const keyParts = res.authKey.split(".");
    expect(keyParts).toHaveLength(3);

    // The format of the parsed key payload is
    // {
    //   "iss": "AvaProtocol",
    //   "exp": number
    // }

    // Decode the base64 token and check the payload
    const payload = JSON.parse(Buffer.from(keyParts[1], "base64").toString());

    // Verify all expected payload fields
    expect(payload).toHaveProperty("iss", "AvaProtocol");
    expect(payload).toHaveProperty("exp", EXPIRED_AT);
  });

  test("authWithSignature", async () => {
    const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);

    if (!signature) {
      throw new Error(
        "Signature could not be generated. Make sure TEST_PRIVATE_KEY is set in the .env.test file"
      );
    }

    const res = await client.authWithSignature(
      walletAddress,
      signature,
      EXPIRED_AT
    );

    expect(res).toBeDefined();
    expect(res).toHaveProperty("authKey");

    // Check if the key is a valid JWT token
    const keyParts = res.authKey.split(".");
    expect(keyParts).toHaveLength(3);

    // Decode the base64 token and check the payload
    const payload = JSON.parse(Buffer.from(keyParts[1], "base64").toString());
    expect(payload).toHaveProperty("iss", "AvaProtocol");
    expect(payload).toHaveProperty("sub");
    expect(payload.sub).toMatch(/^0x[a-fA-F0-9]{40}$/); // Ethereum address format
    expect(payload).toHaveProperty("exp", EXPIRED_AT);
  });

  describe("Authenticated Tests", () => {
    let walletAddress: string;
    let client: Client;
    let authKey: string;

    beforeAll(async () => {
      // Initialize the client with test credentials
      client = new Client({
        endpoint: ENDPOINT,
      });

      walletAddress = await getAddress(TEST_PRIVATE_KEY);
      const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);

      if (!signature) {
        throw new Error(
          "Signature could not be generated. Make sure TEST_PRIVATE_KEY is set in the .env.test file"
        );
      }

      const result = await client.authWithSignature(
        walletAddress,
        signature,
        EXPIRED_AT
      );
      authKey = result.authKey;
    });

    afterAll(
      async () =>
        await removeCreatedWorkflows(client, authKey, createdWorkflows)
    );

    test("addWallet", async () => {
      const result = await client.addWallet(
        { salt: "123", factoryAddress: FACTORY_ADDRESS },
        { authKey }
      );
      expect(result?.address).toHaveLength(42);
      expect(result?.salt).toEqual("123");
      expect(result?.factory).toEqual(FACTORY_ADDRESS);
    });

    test("listSmartWallets", async () => {
      const wallets = await client.getWallets({ authKey });
      expect(wallets.length).toBeGreaterThanOrEqual(1);

      expect(wallets[0].address).toBeDefined();
      expect(wallets[0].salt).toEqual("0");
      expect(wallets[0].factory).toEqual(FACTORY_ADDRESS);
    });

    test("createWorkflow", async () => {
      const wallets = await client.getWallets({ authKey });
      const smartWalletAddress = wallets[0].address;

      const createResult = await client.submitWorkflow(
        client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
        { authKey }
      );

      queueForRemoval(createdWorkflows, createResult);

      expect(createResult).toBeDefined();
      expect(createResult).toHaveLength(26);
    });

    test("getTask", async () => {
      const wallets = await client.getWallets({ authKey });
      const smartWalletAddress = wallets[0].address;

      const createResult = await client.submitWorkflow(
        client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
        { authKey }
      );

      expect(createResult).toHaveLength(26);

      const task = await client.getWorkflow(createResult, { authKey });
      compareResults(
        {
          ...WorkflowTemplate,
          smartWalletAddress,
          id: createResult,
          status: WorkflowStatuses.ACTIVE,
          owner: walletAddress,
        },
        task
      );

      queueForRemoval(createdWorkflows, createResult);
    });

    test("listTask", async () => {
      // Remove any workflows created in previous tests
      await removeCreatedWorkflows(client, authKey, createdWorkflows);

      const addResponse = await client.addWallet(
        { salt: "345", factoryAddress: FACTORY_ADDRESS },
        { authKey }
      );

      const wallets = await client.getWallets({ authKey });
      const walletSalt0 = wallets?.find((item) => item.salt === "0")?.address;
      const walletSalt345 = addResponse.address;

      // Ensure the wallets are defined before proceeding
      expect(walletSalt0).toBeDefined();
      expect(walletSalt345).toBeDefined();

      // populate tasks for default wallet and the custom salt smart wallet above
      const createdId1 = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: walletSalt0!,
        }),
        { authKey }
      );

      queueForRemoval(createdWorkflows, createdId1);

      console.log("Getting workflows for wallet:", walletSalt0);
      const listResult1 = await client.getWorkflows(walletSalt0!, "", 100, {
        authKey,
      });

      const createdId2 = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: walletSalt345,
        }),
        { authKey }
      );

      queueForRemoval(createdWorkflows, createdId2);

      console.log("Getting workflows for wallet:", walletSalt345);
      const listResult2 = await client.getWorkflows(walletSalt345, "", 100, {
        authKey,
      });

      console.log("listResult1:", listResult1);
      console.log("listResult2:", listResult2);
      expect(listResult1.result.length).toBeGreaterThanOrEqual(1);
      expect(listResult2.result.length).toBeGreaterThanOrEqual(1);

      const foundFirstWorkflow = listResult1.result.find(
        (item) => item.id === createdId1
      );
      expect(foundFirstWorkflow?.id).toEqual(createdId1);
      expect(foundFirstWorkflow?.smartWalletAddress).toEqual(walletSalt0);

      const foundSecondWorkflow = listResult2.result.find(
        (item) => item.id === createdId2
      );
      expect(foundSecondWorkflow?.id).toEqual(createdId2);
      expect(foundSecondWorkflow?.smartWalletAddress).toEqual(walletSalt345);

      // Not found the second workflow in the first list, since the are from different wallets
      expect(
        listResult1.result.find((item) => item.id === createdId2)
      ).toBeUndefined();

      // Not found the first workflow in the second list, since the are from different wallets
      expect(
        listResult2.result.find((item) => item.id === createdId1)
      ).toBeUndefined();
    });

    test("cancelTask", async () => {
      const wallets = await client.getWallets({ authKey });
      const smartWalletAddress = wallets[0].address;

      const createResult = await client.submitWorkflow(
        client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
        { authKey }
      );

      queueForRemoval(createdWorkflows, createResult);

      const workflow = await client.getWorkflow(createResult, { authKey });
      expect(workflow.status).toEqual(WorkflowStatuses.ACTIVE);

      const cancelResult = await client.cancelWorkflow(createResult, {
        authKey,
      });
      expect(cancelResult).toEqual(true);
      const updatedWorkflow = await client.getWorkflow(createResult, {
        authKey,
      });

      expect(updatedWorkflow.status).toEqual(WorkflowStatuses.CANCELED);
    });

    test("deleteTask", async () => {
      const wallets = await client.getWallets({ authKey });
      const smartWalletAddress = wallets[0].address;

      const createResult = await client.submitWorkflow(
        client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
        { authKey }
      ); 

      const workflow = await client.getWorkflow(createResult, { authKey });
      expect(workflow.status).toEqual(WorkflowStatuses.ACTIVE);
      expect(workflow.id).toHaveLength(26);

      const deleteResult = await client.deleteWorkflow(createResult, {
        authKey,
      });

      expect(deleteResult).toEqual(true);

      await expect(async () => {
        await client.getWorkflow(workflow.id!, { authKey });
      }).rejects.toThrow("5 NOT_FOUND: task not found");
    });
  });
});
