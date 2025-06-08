import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import { getAddress, generateSignature, SaltGlobal } from "../utils/utils";
import { createFromTemplate } from "../utils/templates";
import { WorkflowStatus } from "@avaprotocol/types";
import { getConfig } from "../utils/envalid";

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.CancelWorkflow * 1000; // Salt index 1,000 - 1,999

describe("cancelWorkflow Tests", () => {
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

  test("should cancel task when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const result = await client.cancelWorkflow(workflowId);
      expect(result).toBe(true);

      const cancelResult = await client.getWorkflow(workflowId);
      expect(cancelResult.id).toEqual(workflowId);
      expect(cancelResult.status).toEqual(WorkflowStatus.Canceled);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should throw error when canceling an non-existent task", async () => {
    await expect(
      client.cancelWorkflow("non-existent-task-id")
    ).rejects.toThrowError(/NOT_FOUND/i);
  });
});
