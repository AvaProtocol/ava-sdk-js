import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../dist";
import dotenv from "dotenv";
import path from "path";
import { getAddress, generateSignature, requireEnvVar } from "./utils";
import { EXPIRED_AT, FACTORY_ADDRESS } from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });
// Get environment variables with type safety
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

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
    const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);
    const res = await client.authWithSignature(
      eoaAddress,
      signature,
      EXPIRED_AT
    );
    client.setAuthKey(res.authKey);
  });

  test("should get wallet client.factoryAddress", async () => {
    // Set the factory address in client
    client.setFactoryAddress(FACTORY_ADDRESS);
    expect(client.getFactoryAddress()).toEqual(FACTORY_ADDRESS);

    const result = await client.getWallet({ salt: "0" });

    expect(result).toBeDefined();
    expect(result.salt).toEqual("0");
    expect(result.factory).toEqual(FACTORY_ADDRESS);
    expect(result.address).toHaveLength(42);
  });

  test("should get wallet with options.factoryAddress", async () => {
    // Unset the factory address in client
    const invalidAddress = "0x0000000000000000000000000000000000000000";
    client.setFactoryAddress(invalidAddress);
    expect(client.getFactoryAddress()).toEqual(invalidAddress);

    // TODO: find a different factory address other than the one set in client to test
    const result = await client.getWallet({
      salt: "0",
      factoryAddress: FACTORY_ADDRESS,
    });

    expect(result).toBeDefined();
    expect(result.salt).toEqual("0");
    expect(result.factory).toEqual(FACTORY_ADDRESS); // Equal to options.factoryAddress but not client.factoryAddress
    expect(result.address).toHaveLength(42);
  });

  test("should get wallet with custom salt value", async () => {
    const salt1 = "12345";
    const salt2 = "-12";

    const result1 = await client.getWallet({
      salt: salt1,
      factoryAddress: FACTORY_ADDRESS,
    });
    expect(result1).toBeDefined();
    expect(result1.salt).toEqual(salt1);
    expect(result1.factory).toEqual(FACTORY_ADDRESS);
    expect(result1.address).toHaveLength(42);

    const result2 = await client.getWallet({
      salt: salt2,
      factoryAddress: FACTORY_ADDRESS,
    });
    expect(result2).toBeDefined();
    expect(result2.salt).toEqual(salt2);
    expect(result2.factory).toEqual(FACTORY_ADDRESS);
    expect(result2.address).toHaveLength(42);
  });

  test("will fail when getting wallet with non-existent factory address", async () => {
    // Unset the factory address in client
    const invalidAddress = "0x0000000000000000000000000000000000000000";
    client.setFactoryAddress(invalidAddress);
    expect(client.getFactoryAddress()).toEqual(invalidAddress);

    await expect(client.getWallet({ salt: "0", factoryAddress: "0x1234" })).rejects.toThrow(/invalid factory address/);
    await expect(client.getWallet({ salt: "0" })).rejects.toThrow(/invalid factory address/);
  });
});
