import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {
  getAddress,
  generateSignature,
  SaltGlobal,
  TIMEOUT_DURATION,
} from "./utils";
import { getConfig } from "./envalid";

jest.setTimeout(TIMEOUT_DURATION); // Set timeout to 15 seconds for all tests in this file

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.GetWallets * 1000; // Salt index 6,000 - 6,999

describe("getAddresses Tests", () => {
  let client: Client;

  beforeAll(async () => {
    const eoaAddress = await getAddress(walletPrivateKey);
    console.log("Owner wallet address:", eoaAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message } = await client.getSignatureFormat(eoaAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });
    client.setAuthKey(res.authKey);
  });

  // TODO: Redo this test when we can have a solid way for a wallets reset
  // test("should return an initial empty array when authenticated with signature", async () => {
  //   const result = await client.getWallets();
  //   expect(result).toBeDefined();
  //   expect(result.length).toBeGreaterThanOrEqual(1);
  //   expect(result[0].salt).toEqual("0");
  //   expect(result[0].factory).toEqual(factoryAddress);
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
