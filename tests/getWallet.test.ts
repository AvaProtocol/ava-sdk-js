import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client, TriggerFactory, TriggerType } from "@avaprotocol/sdk-js";

import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  SaltGlobal,
} from "./utils";

import {
  createFromTemplate,
  FACTORY_ADDRESS,
  defaultTriggerId,
} from "./templates";

let saltIndex = SaltGlobal.GetWallet * 1000; // Salt index 5,000 - 5,999

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
    const signature = await generateSignature(TEST_PRIVATE_KEY);
    const res = await client.authWithSignature(signature);
    client.setAuthKey(res.authKey);
  });

  test("should get wallet client.factoryAddress", async () => {
    const salt = _.toString(saltIndex++);
    // Set the factory address in client
    client.setFactoryAddress(FACTORY_ADDRESS);
    expect(client.getFactoryAddress()).toEqual(FACTORY_ADDRESS);

    const result = await client.getWallet({ salt });

    expect(result).toBeDefined();
    expect(result.salt).toEqual(salt);
    expect(result.factory).toEqual(FACTORY_ADDRESS);
    expect(result.address).toHaveLength(42);
  });

  test("should return correct task count", async () => {
    // Set the factory address in client
    client.setFactoryAddress(FACTORY_ADDRESS);
    expect(client.getFactoryAddress()).toEqual(FACTORY_ADDRESS);

    // TODO: experiment with not using the RUN_ID for running tests on staging
    const salt = process.env.RUN_ID || `${new Date().getTime()}`;
    let wallet = await client.getWallet({ salt });
    let workflowId1: string | undefined;
    let workflowId2: string | undefined;

    try {
      const initialStat = {
        totalTaskCount: wallet.totalTaskCount,
        activeTaskCount: wallet.activeTaskCount,
        completedTaskCount: wallet.completedTaskCount,
        canceledTaskCount: wallet.canceledTaskCount,
        failedTaskCount: wallet.failedTaskCount,
      };

      const workflowProps1 = createFromTemplate(wallet.address);
      workflowProps1.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 102 },
      });

      const workflow1 = client.createWorkflow(workflowProps1);
      workflowId1 = await client.submitWorkflow(workflow1);

      wallet = await client.getWallet({ salt });

      expect(wallet.totalTaskCount).toEqual(initialStat.totalTaskCount || 0 + 1);
      expect(wallet.activeTaskCount).toEqual(initialStat.activeTaskCount || 0 + 1);
      expect(wallet.completedTaskCount).toEqual(initialStat.completedTaskCount);
      expect(wallet.canceledTaskCount).toEqual(initialStat.canceledTaskCount);

      // Trigger the task and wait for it finished to check the stat
      await client.triggerWorkflow({
        id: workflowId1,
        reason: {
          type: TriggerType.Block,
          blockNumber: 1, // set epoch to 1 minute later
        },
        isBlocking: true,
      });

      wallet = await client.getWallet({ salt });
      expect(wallet.totalTaskCount).toEqual(initialStat.totalTaskCount || 0 + 1);
      expect(wallet.activeTaskCount).toEqual(initialStat.activeTaskCount || 0);
      expect(wallet.completedTaskCount).toEqual(initialStat.completedTaskCount || 0 + 1);
      expect(wallet.canceledTaskCount).toEqual(initialStat.canceledTaskCount);

      // Now test the cancel metric
      const workflowProps2 = createFromTemplate(wallet.address);
      const workflow2 = client.createWorkflow(workflowProps2);
      workflowId2 = await client.submitWorkflow(workflow2);

      await client.cancelWorkflow(workflowId2);

      wallet = await client.getWallet({ salt });
      expect(wallet.totalTaskCount).toEqual(initialStat.totalTaskCount || 0 + 2);
      expect(wallet.activeTaskCount).toEqual(initialStat.activeTaskCount);
      expect(wallet.completedTaskCount).toEqual(initialStat.completedTaskCount || 0 + 1);
      expect(wallet.canceledTaskCount).toEqual(initialStat.canceledTaskCount || 0 + 1);
    } finally {
      if (workflowId1) {
        await client.deleteWorkflow(workflowId1);
      }
      if (workflowId2) {
        await client.deleteWorkflow(workflowId2);
      }
    }
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

    await expect(
      client.getWallet({ salt: "0", factoryAddress: "0x1234" })
    ).rejects.toThrow(/invalid factory address/);
    await expect(client.getWallet({ salt: "0" })).rejects.toThrow(
      /invalid factory address/
    );
  });
});
