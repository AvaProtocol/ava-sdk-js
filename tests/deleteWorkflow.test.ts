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
} from "./utils";
import { FACTORY_ADDRESS, createFromTemplate } from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

let saltIndex = SaltGlobal.DeleteWorkflow * 1000; // Salt index 3,000 - 3,999

describe("deleteWorkflow Tests", () => {
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
