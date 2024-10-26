import { describe, beforeAll, test, expect } from "@jest/globals";
import Client, { getKeyRequestMessage } from "../dist/index.js";
import dotenv from "dotenv";
import path from "path";
import { ethers } from "ethers";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

const {
  TEST_JWT_TOKEN,
  TEST_PRIVATE_KEY,
  TOKEN_CONTRACT,
  ORACLE_CONTRACT,
  ENDPOINT,
} = process.env;
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

// Add signature generation logic
async function getAddress(privateKey: string): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
}

// Add signature generation logic
async function generateSignature(
  privateKey: string,
  expiredAt: number
): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  const message = getKeyRequestMessage(wallet.address, expiredAt);

  // console.log("Signing message:", message, "Expired at:", expiredAt);

  const signature = await wallet.signMessage(message);

  return signature;
}

describe("Client E2E Tests", () => {
  let client: Client;
  let walletAddress: string; // Add this line to declare the variable

  beforeAll(async () => {
    if (!ENDPOINT) {
      throw new Error("ENDPOINT is not set in the .env.test file");
    }

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
    });

    if (!TEST_PRIVATE_KEY) {
      throw new Error("TEST_PRIVATE_KEY is not set in the .env.test file");
    }

    // Generate the address here
    const address = await getAddress(TEST_PRIVATE_KEY);
    walletAddress = address;
  });

  //   test("authWithJwtToken", async () => {
  //     if (!TEST_JWT_TOKEN) {
  //       throw new Error("TEST_JWT_TOKEN is not set in the .env.test file");
  //     }

  //     const response = await client.authWithJwtToken(
  //       walletAddress,
  //       TEST_JWT_TOKEN,
  //       EXPIRED_AT
  //     );

  //     console.log("authWithJwtToken response:", response);
  //     expect(response).toBeDefined();
  //   });

  test("authWithSignature", async () => {
    if (!TEST_PRIVATE_KEY) {
      throw new Error("TEST_PRIVATE_KEY is not set in the .env.test file");
    }

    if (!EXPIRED_AT) {
      throw new Error("EXPIRED_AT is not set.");
    }

    const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);

    if (!signature) {
      throw new Error(
        "Signature could not be generated. Make sure TEST_PRIVATE_KEY is set in the .env.test file"
      );
    }

    const response = await client.authWithSignature(
      walletAddress,
      signature,
      EXPIRED_AT
    );

    console.log("authWithSignature response:", response);

    expect(response).toBeDefined();
    expect(response).toHaveProperty("jwtToken");
    expect(typeof response.jwtToken).toBe("string");

    // Check if the key is a valid JWT token
    const jwtParts = response.jwtToken.split(".");
    expect(jwtParts).toHaveLength(3);

    // Decode the base64 token and check the payload
    const payload = JSON.parse(Buffer.from(jwtParts[1], "base64").toString());
    expect(payload).toHaveProperty("iss", "AvaProtocol");
    expect(payload).toHaveProperty("sub");
    expect(payload.sub).toMatch(/^0x[a-fA-F0-9]{40}$/); // Ethereum address format
    expect(payload).toHaveProperty("exp", EXPIRED_AT);
  });

  describe("Authenticated Tests", () => {
    let walletAddress: string;
    let client: Client;

    beforeAll(async () => {
      if (!ENDPOINT) {
        throw new Error("ENDPOINT is not set in the .env.test file");
      }

      // Initialize the client with test credentials
      client = new Client({
        endpoint: ENDPOINT,
      });

      if (!TEST_PRIVATE_KEY) {
        throw new Error("TEST_PRIVATE_KEY is not set in the .env.test file");
      }

      walletAddress = await getAddress(TEST_PRIVATE_KEY);

      if (!EXPIRED_AT) {
        throw new Error("EXPIRED_AT is not set");
      }

      const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);

      if (!signature) {
        throw new Error(
          "Signature could not be generated. Make sure TEST_PRIVATE_KEY is set in the .env.test file"
        );
      }

      await client.authWithSignature(walletAddress, signature, EXPIRED_AT);
    });

    test("getAddresses", async () => {
      const result = await client.getAddresses(walletAddress);
      console.log("Get smart wallet address result:", result);
      // Example result:
      // {
      //   address: '0xD3a07BA3264839d2D3B5FD5c4546a94Ce4ad5eEc',
      //   smart_account_address: '0xD3a07BA3264839d2D3B5FD5c4546a94Ce4ad5eEc',
      // }
      expect(result).toBeDefined();
      expect(result.owner).toMatch(/^0x[a-fA-F0-9]{40}$/); // Ethereum address format
      expect(result.smart_account_address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    test("createTask", async () => {
      if (!TOKEN_CONTRACT) {
        throw new Error("TOKEN_CONTRACT is not set in the .env.test file");
      }

      if (!ORACLE_CONTRACT) {
        throw new Error("ORACLE_CONTRACT is not set in the .env.test file");
      }

      const result = await client.createTask({
        address: walletAddress,
        tokenContract: TOKEN_CONTRACT,
        oracleContract: ORACLE_CONTRACT,
      });
      console.log("Create task result:", result);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
    });

    test("listTasks", async () => {
      const result = await client.listTasks(walletAddress);
      console.log("List task result:", result);
      expect(Array.isArray(result.tasks)).toBe(true);
    });

    // test("getTask", async () => {
    //   // First, list tasks to get a valid task ID
    //   const listResult = await client.listTask();
    //   if (listResult.tasks.length > 0) {
    //     const taskId = listResult.tasks[0].id;
    //     const result = await client.getTask(taskId);
    //     console.log("Get task result:", result);
    //     expect(result).toBeDefined();
    //     expect(result.id).toBe(taskId);
    //   } else {
    //     console.warn("No tasks available to test getTask");
    //   }
    // });
  });
});
