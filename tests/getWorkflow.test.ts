import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {
  getAddress,
  generateSignature,
  compareResults,
  SaltGlobal,
} from "./utils";
import { createFromTemplate } from "./templates";
import { getConfig } from "./envalid";

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.GetWorkflow * 1000; // Salt index 7,000 - 7,999

describe("getWorkflow Tests", () => {
  let client: Client;
  let eoaAddress: string;

  beforeAll(async () => {
    eoaAddress = await getAddress(walletPrivateKey);
    console.log("Owner wallet address:", eoaAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const signature = await generateSignature(walletPrivateKey);
    const res = await client.authWithSignature(signature);
    client.setAuthKey(res.authKey);
  });

  test("should get workflow when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const result = await client.getWorkflow(workflowId);

      // Check if the result is an object and has the expected properties
      compareResults(
        {
          ...workflowProps,
          id: workflowId,
          owner: eoaAddress,
          smartWalletAddress: wallet.address,
        },
        result
      );
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should throw task not found when getting an non-existent task", async () => {
    await expect(
      client.getWorkflow("non-existent-task-id")
    ).rejects.toThrowError(/NOT_FOUND/i);
  });
});
