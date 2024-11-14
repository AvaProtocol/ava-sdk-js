import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../src/index";
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
    expect(typeof res.authKey).toBe("string");

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
    expect(typeof res.authKey).toBe("string");

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

      console.log("should hit here", "dauhu", walletAddress, signature, EXPIRED_AT);
      let a = await client.authWithSignature(walletAddress, signature, EXPIRED_AT);
      console.log("should hit here", "dauhu", a);
    });

    test("listSmartWallets", async () => {
      const result = await client.listSmartWallets(walletAddress);
      // Example result:
      // {
      //   address: '0xD3a07BA3264839d2D3B5FD5c4546a94Ce4ad5eEc',
      //   smart_account_address: '0xD3a07BA3264839d2D3B5FD5c4546a94Ce4ad5eEc',
      // }
      console.log("dauhu", result);
      expect(result).toBeDefined();
      expect(result.wallets).toBeDefined();
      const total = result.wallets.length;
      expect(total).toBeGreaterThan(1);

      expect(result.wallet[s0].smart_account_address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    test("createTask", async () => {
      const result = await client.createTask({
        address: walletAddress,
        tokenContract: TOKEN_CONTRACT,
        oracleContract: ORACLE_CONTRACT,
      });

      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");

      // Important: save the task ID to the suite for the following tests
      createdTaskId = result.id;
    });

    test("getTask", async () => {
      // Use the saved task ID
      if (createdTaskId) {
        const result = await client.getTask(createdTaskId);
        expect(result).toBeDefined();
      } else {
        console.warn("No task ID available to test getTask");
      }
    });

    test("cancelTask", async () => {
      if (createdTaskId) {
        const result = await client.cancelTask(createdTaskId);
        expect(result).toBe(true);
      } else {
        console.warn("No task ID available to test cancelTask");
      }
    });

    test("deleteTask", async () => {
      if (createdTaskId) {
        const result = await client.deleteTask(createdTaskId);
        expect(result).toBe(true);
      } else {
        console.warn("No task ID available to test deleteTask");
      }
    });
  });
});
