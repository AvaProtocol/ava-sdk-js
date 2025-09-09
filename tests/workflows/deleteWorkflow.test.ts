import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {
  getAddress,
  generateSignature,
  SaltGlobal,
  SALT_BUCKET_SIZE,
} from "../utils/utils";
import { createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey } = getConfig();

let saltIndex = SaltGlobal.DeleteWorkflow * SALT_BUCKET_SIZE;

describe("deleteWorkflow Tests", () => {
  let client: Client;

  beforeAll(async () => {
    const eoaAddress = await getAddress(walletPrivateKey);
    console.log("Owner wallet address:", eoaAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: avsEndpoint,
    });

    const { message } = await client.getSignatureFormat(eoaAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);
  });

  test("should delete task when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    const workflowProps = createFromTemplate(wallet.address);
    const workflow = client.createWorkflow(workflowProps);
    workflowId = await client.submitWorkflow(workflow);

    const result = await client.deleteWorkflow(workflowId);
    expect(result.success).toBeTruthy();

    const listRes = await client.getWorkflows([wallet.address]);

    expect(Array.isArray(listRes.items)).toBe(true);
    expect(listRes.items.some((task) => task.id === workflowId)).toBe(false);
  });

  test("should return error response when deleting a non-existent task", async () => {
    const result = await client.deleteWorkflow("non-existent-task-id");
    expect(result.success).toBeFalsy();
    expect(result.status).toBe("not_found");
    expect(result.message).toMatch(/task not found/i);
    expect(result.id).toBe("non-existent-task-id");
  });
});
