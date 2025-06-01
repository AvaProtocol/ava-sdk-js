import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
import { TriggerType } from "@avaprotocol/types";
import { getAddress, generateSignature, SaltGlobal } from "./utils";
import { createFromTemplate, defaultTriggerId } from "./templates";
import { getConfig } from "./envalid";

let saltIndex = SaltGlobal.GetWallet * 1000; // Salt index 5,000 - 5,999

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

describe("getWallet Tests", () => {
  let client: Client;

  beforeAll(async () => {
    const eoaAddress = await getAddress(walletPrivateKey);
    console.log("\nOwner walletaddress:", eoaAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    console.log("Authenticating with signature ...");
    const { message } = await client.getSignatureFormat(eoaAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });
    client.setAuthKey(res.authKey);
  });

  test("should get wallet client.factoryAddress", async () => {
    const salt = _.toString(saltIndex++);
    // Set the factory address in client
    client.setFactoryAddress(factoryAddress);
    expect(client.getFactoryAddress()).toEqual(factoryAddress);

    const result = await client.getWallet({ salt });

    expect(result).toBeDefined();
    expect(result.salt).toEqual(salt);
    expect(result.factory).toEqual(factoryAddress);
    expect(result.address).toHaveLength(42);
  });

  test("should return correct task count", async () => {
    // Set the factory address in client
    client.setFactoryAddress(factoryAddress);
    expect(client.getFactoryAddress()).toEqual(factoryAddress);

    const salt = _.toString(saltIndex++);
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

      expect(wallet.totalTaskCount).toEqual(
        initialStat.totalTaskCount || 0 + 1
      );
      expect(wallet.activeTaskCount).toEqual(
        initialStat.activeTaskCount || 0 + 1
      );
      expect(wallet.completedTaskCount).toEqual(initialStat.completedTaskCount);
      expect(wallet.canceledTaskCount).toEqual(initialStat.canceledTaskCount);

      // Trigger the task and wait for it finished to check the stat
      await client.triggerWorkflow({
        id: workflowId1,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: 1, // set epoch to 1 minute later
        },
        isBlocking: true,
      });

      wallet = await client.getWallet({ salt });
      expect(wallet.totalTaskCount).toEqual(
        initialStat.totalTaskCount || 0 + 1
      );
      expect(wallet.activeTaskCount).toEqual(initialStat.activeTaskCount || 0);
      expect(wallet.completedTaskCount).toEqual(
        initialStat.completedTaskCount || 0 + 1
      );
      expect(wallet.canceledTaskCount).toEqual(initialStat.canceledTaskCount);

      // Now test the cancel metric
      const workflowProps2 = createFromTemplate(wallet.address);
      const workflow2 = client.createWorkflow(workflowProps2);
      workflowId2 = await client.submitWorkflow(workflow2);

      await client.cancelWorkflow(workflowId2);

      wallet = await client.getWallet({ salt });

      expect(wallet.totalTaskCount).toEqual(
        initialStat.totalTaskCount || 0 + 2
      );
      expect(wallet.activeTaskCount).toEqual(initialStat.activeTaskCount);
      expect(wallet.completedTaskCount).toEqual(
        initialStat.completedTaskCount || 0 + 1
      );
      expect(wallet.canceledTaskCount).toEqual(
        initialStat.canceledTaskCount || 0 + 1
      );
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
      factoryAddress,
    });

    expect(result).toBeDefined();
    expect(result.salt).toEqual("0");
    expect(result.factory).toEqual(factoryAddress); // Equal to options.factoryAddress but not client.factoryAddress
    expect(result.address).toHaveLength(42);
  });

  test("should get wallet with custom salt value", async () => {
    const salt1 = "12345";
    const salt2 = "-12";

    const result1 = await client.getWallet({
      salt: salt1,
      factoryAddress,
    });
    expect(result1).toBeDefined();
    expect(result1.salt).toEqual(salt1);
    expect(result1.factory).toEqual(factoryAddress);
    expect(result1.address).toHaveLength(42);

    const result2 = await client.getWallet({
      salt: salt2,
      factoryAddress,
    });
    expect(result2).toBeDefined();
    expect(result2.salt).toEqual(salt2);
    expect(result2.factory).toEqual(factoryAddress);
    expect(result2.address).toHaveLength(42);
  });

  test("will fail when getting wallet with non-existent factory address", async () => {
    // Unset the factory address in client
    const invalidAddress = "0x0000000000000000000000000000000000000000";
    client.setFactoryAddress(invalidAddress);
    expect(client.getFactoryAddress()).toEqual(invalidAddress);

    await expect(
      client.getWallet({ salt: "0", factoryAddress: "0x1234" })
    ).rejects.toThrow(/^3 INVALID_ARGUMENT:.*invalid factory address/);

    await expect(client.getWallet({ salt: "0" })).rejects.toThrow(
      /^3 INVALID_ARGUMENT:.*no contract code at given address/
    );
  });

  test("should include isHidden property in getWallet response with default value of false", async () => {
    const salt = _.toString(saltIndex++);
    client.setFactoryAddress(factoryAddress);

    const wallet = await client.getWallet({ salt });

    expect(wallet).toBeDefined();
    expect(wallet).toHaveProperty("isHidden");
    expect(wallet.isHidden).toBe(false);
  });

  test("setWallet should update isHidden property", async () => {
    const salt = _.toString(saltIndex++);
    client.setFactoryAddress(factoryAddress);

    const initialWallet = await client.getWallet({ salt });
    expect(initialWallet.isHidden).toBe(false);

    const hiddenWallet = await client.setWallet({ salt }, { isHidden: true });
    expect(hiddenWallet.isHidden).toBe(true);

    const unhiddenWallet = await client.setWallet(
      { salt },
      { isHidden: false }
    );
    expect(unhiddenWallet.isHidden).toBe(false);
  });
});
