import * as avs_pb from "../grpc_codegen/avs_pb";
import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../src/index";
import dotenv from "dotenv";
import path from "path";
import { getAddress, generateSignature, requireEnvVar } from "./utils";
import { sampleTask1, TEST_PRIVATE_KEY } from "./fixture";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const {
  TEST_API_KEY,
  TOKEN_CONTRACT,
  ORACLE_CONTRACT,
  ENDPOINT,
} = {
  TEST_API_KEY: requireEnvVar('TEST_API_KEY'),
  TOKEN_CONTRACT: requireEnvVar('TOKEN_CONTRACT'),
  ORACLE_CONTRACT: requireEnvVar('ORACLE_CONTRACT'),
  ENDPOINT: requireEnvVar('ENDPOINT'),
} as const;

// Define EXPIRED_AT as a constant
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours from now

describe("Client E2E Tests", () => {
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
    const res = await client.authWithAPIKey(walletAddress, TEST_API_KEY, EXPIRED_AT);

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
    let createdTaskId: string; // Add this line to declare the variable
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

      const result = await client.authWithSignature(walletAddress, signature, EXPIRED_AT);
      authKey = result.authKey;
    });

    test("createWallet", async () => {
      const result = await client.createWallet({salt: "123"}, { authKey });
      expect(result?.address).toHaveLength(42);
      expect(result?.salt).toEqual("123");
      expect(result?.factory).toEqual("0x29adA1b5217242DEaBB142BC3b1bCfFdd56008e7");
    });

    test("listSmartWallets", async () => {
      const wallets = await client.listSmartWallets({ authKey });
      expect(wallets.length).toBeGreaterThanOrEqual(1);

      expect(wallets[0].address).toEqual("0x6B5103D06B53Cc2386243A09f4EAf3140f4FaD41");
      expect(wallets[0].salt).toEqual("0");
      expect(wallets[0].factory).toEqual("0x29adA1b5217242DEaBB142BC3b1bCfFdd56008e7");
    });

    test("createTask", async () => {
      const result = await client.createTask(sampleTask1, { authKey });

      expect(result).toBeDefined();
      expect(result).toHaveLength(26);
    });

    test("getTask", async () => {
      const result = await client.createTask(sampleTask1, { authKey });
      expect(result).toHaveLength(26);

      const task = await client.getTask(result, { authKey });
      expect(task.status).toEqual(avs_pb.TaskStatus.ACTIVE);
      expect(task.nodes).toHaveLength(1);
      expect(task.nodes[0].contractWrite.contractAddress).toEqual(sampleTask1.nodes[0].contractWrite.contractAddress);
      expect(task.nodes[0].contractWrite.callData).toEqual(sampleTask1.nodes[0].contractWrite.callData);
      expect(task.trigger.block.interval).toEqual(5);
    });

    test("listTask", async () => {
      // ensure the smart wallet is created
      const smartWallet = await client.createWallet({salt: "345"}, { authKey });

      // populate tasks for default wallet and the custom salt smart wallet above
      const result1 = await client.createTask({...sampleTask1, memo: 'task1 test', smartWalletAddress: smartWallet.address}, { authKey });
      const tasks1 = await client.listTasks(smartWallet.address, { authKey });

      const result2 = await client.createTask({...sampleTask1, memo: 'default wallet test'}, { authKey });
      const tasks2 = await client.listTasks("0x6B5103D06B53Cc2386243A09f4EAf3140f4FaD41", { authKey });

      expect(tasks1.length).toBeGreaterThanOrEqual(1);
      expect(tasks2.length).toBeGreaterThanOrEqual(1);

      const task1 = tasks1.find(t => t.id == result1);
      expect(tasks1.find(t => t.id == result2)).toBe(undefined);
      expect(task1?.id).toEqual(result1);
      expect(task1?.memo).toEqual('task1 test');

      const task2 = tasks2.find(t => t.id == result2);
      expect(tasks2.find(t => t.id == result1)).toBe(undefined);
      expect(task2?.id).toEqual(result2);
      expect(task2?.memo).toEqual('default wallet test');
    });

    test("cancelTask", async () => {
      const result = await client.createTask(sampleTask1, { authKey });
      const task = await client.getTask(result, { authKey });
      expect(task.status).toEqual( avs_pb.TaskStatus.ACTIVE);

      const cancelResult = await client.cancelTask(task.id, { authKey });
      expect(cancelResult).toEqual(true);
      const updatedTask = await client.getTask(task.id, { authKey });
      expect(updatedTask.status).toEqual( avs_pb.TaskStatus.CANCELED);
    });

    test("deleteTask", async () => {
      const result = await client.createTask(sampleTask1, { authKey });
      const task = await client.getTask(result, { authKey });
      expect(task.status).toEqual(avs_pb.TaskStatus.ACTIVE);
      expect(task.id).toHaveLength(26);

      const deleteResult = await client.deleteTask(task.id, { authKey });
      expect(deleteResult).toEqual(true);
      try {
        await client.getTask(task.id, { authKey });
      } catch  (e) {
        expect(e.code).toEqual(5);
        expect(e.message).toEqual('5 NOT_FOUND: task not found');
      }
    });
  });
});
