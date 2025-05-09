import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {
  getAddress,
  generateSignature,
  SaltGlobal,
} from "./utils";
import { createFromTemplate } from "./templates";
import { getConfig } from "./envalid";

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.DeleteWorkflow * 1000; // Salt index 3,000 - 3,999

describe("deleteWorkflow Tests", () => {
  let client: Client;

  beforeAll(async () => {
    const eoaAddress = await getAddress(walletPrivateKey);
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

  test("should delete task when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    const workflowProps = createFromTemplate(wallet.address);
    const workflow = client.createWorkflow(workflowProps);
    workflowId = await client.submitWorkflow(workflow);

    const result = await client.deleteWorkflow(workflowId);
    expect(result).toBe(true);

    const listRes = await client.getWorkflows([wallet.address]);

    expect(Array.isArray(listRes.result)).toBe(true);
    expect(listRes.result.some((task) => task.id === workflowId)).toBe(false);
  });

  test("should throw error when deleting an non-existent task", async () => {
    await expect(client.deleteWorkflow("non-existent-task-id")).rejects.toThrow(
      /NOT_FOUND/i
    );
  });
});
