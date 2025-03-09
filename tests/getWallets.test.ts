import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  SaltGlobal,
  TIMEOUT_DURATION,
} from "./utils";
import { FACTORY_ADDRESS } from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

jest.setTimeout(TIMEOUT_DURATION); // Set timeout to 15 seconds for all tests in this file

let saltIndex = SaltGlobal.GetWallets * 1000; // Salt index 6,000 - 6,999

describe("getAddresses Tests", () => {
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

  // TODO: Redo this test when we can have a solid way for a wallets reset
  // test("should return an initial empty array when authenticated with signature", async () => {
  //   const result = await client.getWallets();
  //   expect(result).toBeDefined();
  //   expect(result.length).toBeGreaterThanOrEqual(1);
  //   expect(result[0].salt).toEqual("0");
  //   expect(result[0].factory).toEqual(FACTORY_ADDRESS);
  //   expect(result[0].address).toHaveLength(42);
  // });

  test("should include custom salt wallet when getting address with smartWallet using signature", async () => {
    const saltValue = _.toString(saltIndex++);
    await client.getWallet({ salt: saltValue });

    const wallets = await client.getWallets();
    expect(wallets.length).toBeGreaterThanOrEqual(2);
    expect(wallets.some((item) => item.salt === saltValue)).toBe(true);
  });

  test("will not add duplicate wallets to the list", async () => {
    const salt1 = _.toString(saltIndex++);
    const salt2 = _.toString(saltIndex++);

    // Intentially getting duplicate wallets with the same salt
    await client.getWallet({ salt: salt1 });
    await client.getWallet({ salt: salt1 });
    await client.getWallet({ salt: salt2 });
    await client.getWallet({ salt: salt2 });

    const wallets = await client.getWallets();

    // Make sure the same salt from the getWallets list not returning duplicate wallets
    expect(wallets.filter((item) => item.salt === salt1)).toHaveLength(1);
    expect(wallets.filter((item) => item.salt === salt2)).toHaveLength(1);
  });
});
