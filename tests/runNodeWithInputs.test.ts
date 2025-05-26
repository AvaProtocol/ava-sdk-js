import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import { NodeType } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  TIMEOUT_DURATION,
  SaltGlobal,
} from "./utils";
import { getConfig } from "./envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.CreateWorkflow * 2000; // Salt index 22,000 - 22,999

describe("runNodeWithInputs Tests", () => {
  let eoaAddress: string;
  let client: Client;

  beforeAll(async () => {
    eoaAddress = await getAddress(walletPrivateKey);
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

  test("should execute a blockTrigger node with inputs", async () => {
    const result = await client.runNodeWithInputs({
      nodeType: "blockTrigger",
      nodeConfig: {},
      inputVariables: {
        blockNumber: 12345
      }
    });

    expect(result.success).toBe(true);
    expect(result.nodeId).toBeDefined();
    expect(result.executionId).toBeDefined();
  });

  test("should execute a restApi node with inputs", async () => {
    const result = await client.runNodeWithInputs({
      nodeType: "restApi",
      nodeConfig: {
        url: "https://httpbin.org/get",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      },
      inputVariables: {}
    });

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  test("should execute a customCode node with inputs", async () => {
    const result = await client.runNodeWithInputs({
      nodeType: "customCode",
      nodeConfig: {
        source: "return { message: 'Hello', input: myVar };"
      },
      inputVariables: {
        myVar: "World"
      }
    });

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
  });

  test("should handle errors gracefully", async () => {
    const result = await client.runNodeWithInputs({
      nodeType: "invalidType",
      nodeConfig: {},
      inputVariables: {}
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  test("should execute a contractRead node", async () => {
    const result = await client.runNodeWithInputs({
      nodeType: "contractRead",
      nodeConfig: {
        contractAddress: "0x1234567890123456789012345678901234567890",
        callData: "0x70a08231",
        contractAbi: JSON.stringify([{
          "constant": true,
          "inputs": [{"name": "_owner", "type": "address"}],
          "name": "balanceOf",
          "outputs": [{"name": "balance", "type": "uint256"}],
          "type": "function"
        }])
      },
      inputVariables: {}
    });

    expect(result).toBeDefined();
    expect(typeof result.success).toBe('boolean');
  });
});
