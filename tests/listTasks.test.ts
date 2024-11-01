import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../dist/index.js";
import dotenv from "dotenv";
import path from "path";
import { getAddress, generateSignature, requireEnvVar } from "./utils";

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
  TEST_API_KEY: requireEnvVar('TEST_API_KEY'),
  TEST_PRIVATE_KEY: requireEnvVar('TEST_PRIVATE_KEY'),
  TOKEN_CONTRACT: requireEnvVar('TOKEN_CONTRACT'),
  ORACLE_CONTRACT: requireEnvVar('ORACLE_CONTRACT'),
  ENDPOINT: requireEnvVar('ENDPOINT'),
} as const;

// Define EXPIRED_AT as a constant
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours from now

describe("listTasks Tests", () => {
  let ownerAddress: string;

  beforeAll(async () => {
    ownerAddress = await getAddress(TEST_PRIVATE_KEY);
  });

  describe("Auth with Signature", () => {
    let client: Client;
    let createdTaskId: string;
    let smartWallet: string;

    beforeAll(async () => {
      // Initialize the client with test credentials
      client = new Client({
        endpoint: ENDPOINT,
      });
  
      console.log("Authenticating with signature ...")
      const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT); 
      await client.authWithSignature(ownerAddress, signature, EXPIRED_AT);
  
      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const getAddressesRes = await client.getAddresses(ownerAddress);
      smartWallet = getAddressesRes.smart_account_address;
      console.log(`Smart wallet created: ${smartWallet}`);

      console.log("Creating a task to use for the following tests")
      const createTaskRes = await client.createTask({
        address: smartWallet,
        tokenContract: TOKEN_CONTRACT,
        oracleContract: ORACLE_CONTRACT,
      });
  
      createdTaskId = createTaskRes.id;
    });
  
    test("should list tasks when authenticated with signature", async () => {
      const result = await client.listTasks(smartWallet);
      expect(Array.isArray(result.tasks)).toBe(true);
      expect(result.tasks.some(task => task.id === createdTaskId)).toBe(true);
    });

    test("should return empty when listing owner address using signature", async () => {
      const result = await client.listTasks(ownerAddress);
      expect(Array.isArray(result.tasks)).toBe(true);
      expect(result.tasks.length).toBe(0);
    });
  });

  describe("Auth with API key", () => {
    let client: Client;
    let createdTaskId: string;
    let smartWallet: string;

    beforeAll(async () => {
      // Initialize the client with test credentials
      client = new Client({
        endpoint: ENDPOINT,
      });

      console.log("Authenticating with API key ...")
      await client.authWithAPIKey(TEST_API_KEY, EXPIRED_AT);

      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const getAddressesRes = await client.getAddresses(ownerAddress);
      smartWallet = getAddressesRes.smart_account_address;
      console.log(`Smart wallet created: ${smartWallet}`);

      console.log("Creating a task to use for the following tests")
      const createTaskRes = await client.createTask({
        address: smartWallet,
        tokenContract: TOKEN_CONTRACT,
        oracleContract: ORACLE_CONTRACT,
      });
  
      createdTaskId = createTaskRes.id;
    });
    
    test("should list tasks when authenticated with API key", async () => {
      const result = await client.listTasks(smartWallet);
      expect(Array.isArray(result.tasks)).toBe(true);
      expect(result.tasks.some(task => task.id === createdTaskId)).toBe(true);
    });

    test("should return empty when listing owner address using API key", async () => {
      const result = await client.listTasks(ownerAddress);
      expect(Array.isArray(result.tasks)).toBe(true);
      expect(result.tasks.length).toBe(0);
    });
  });

  test("should throw error when creating a task without authentication", async () => {
    const clientWithoutAuth = new Client({
      endpoint: ENDPOINT,
    });

    const smartWallet = await getAddress(TEST_PRIVATE_KEY);

    await expect(clientWithoutAuth.createTask({
      address: smartWallet,
      tokenContract: TOKEN_CONTRACT,
      oracleContract: ORACLE_CONTRACT,
    })).rejects.toThrow(
      "missing auth header"
    );
  });
});
