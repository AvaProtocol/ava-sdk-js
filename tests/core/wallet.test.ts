import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
import { TriggerType } from "@avaprotocol/types";
import {
  TIMEOUT_DURATION,
  getClient,
  authenticateClient,
} from "../utils/utils";
import { createFromTemplate, defaultTriggerId } from "../utils/templates";

jest.setTimeout(TIMEOUT_DURATION); // Set timeout to 15 seconds for all tests in this file

describe("Wallet Management Tests", () => {
  let client: Client;
  let saltCounter = 0; // Local counter for wallet API tests

  beforeAll(async () => {
    // Initialize the client with test credentials
    client = getClient();
    await authenticateClient(client);
  });

  describe("getWallet Tests", () => {
    test("should get wallet with aggregator's default factory", async () => {
      const salt = _.toString(saltCounter++);

      const result = await client.getWallet({ salt });

      expect(result.salt).toEqual(salt);
      expect(result.factory).toBeTruthy(); // Should use aggregator's default factory
      expect(result.address).toHaveLength(42);
    });

    test("should return correct task count", async () => {
      const salt = _.toString(saltCounter++);
      let wallet = await client.getWallet({ salt });
      let workflowId1: string | undefined;
      let workflowId2: string | undefined;

      try {
        const initialStat = {
          totalTaskCount: wallet.totalTaskCount,
          enabledTaskCount: wallet.enabledTaskCount,
          completedTaskCount: wallet.completedTaskCount,
          disabledTaskCount: wallet.disabledTaskCount,
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
        expect(wallet.enabledTaskCount).toEqual(
          initialStat.enabledTaskCount || 0 + 1
        );
        expect(wallet.completedTaskCount).toEqual(
          initialStat.completedTaskCount
        );
        expect(wallet.disabledTaskCount).toEqual(initialStat.disabledTaskCount);

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

        expect(wallet.enabledTaskCount).toEqual(
          initialStat.enabledTaskCount || 0
        );

        expect(wallet.completedTaskCount).toEqual(
          initialStat.completedTaskCount || 0 + 1
        );
        expect(wallet.disabledTaskCount).toEqual(initialStat.disabledTaskCount);

        // Now test the cancel metric
        const workflowProps2 = createFromTemplate(wallet.address);
        const workflow2 = client.createWorkflow(workflowProps2);
        workflowId2 = await client.submitWorkflow(workflow2);

        await client.setWorkflowEnabled(workflowId2!, false);

        wallet = await client.getWallet({ salt });

        expect(wallet.totalTaskCount).toEqual(
          initialStat.totalTaskCount || 0 + 2
        );
        expect(wallet.enabledTaskCount).toEqual(initialStat.enabledTaskCount);
        expect(wallet.completedTaskCount).toEqual(
          initialStat.completedTaskCount || 0 + 1
        );
        expect(wallet.disabledTaskCount).toEqual(
          initialStat.disabledTaskCount || 0 + 1
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

    test("should get wallet with custom salt value", async () => {
      const salt1 = "12345";
      const salt2 = "-12";

      const result1 = await client.getWallet({
        salt: salt1,
      });
      expect(result1.salt).toEqual(salt1);
      expect(result1.factory).toBeTruthy(); // Should use aggregator's default factory
      expect(result1.address).toHaveLength(42);

      const result2 = await client.getWallet({
        salt: salt2,
      });
      expect(result2.salt).toEqual(salt2);
      expect(result2.factory).toBeTruthy(); // Should use aggregator's default factory
      expect(result2.address).toHaveLength(42);
    });

    test("will fail when getting wallet with non-existent factory address", async () => {
      await expect(
        client.getWallet({ salt: "0", factoryAddress: "0x1234" })
      ).rejects.toThrow(
        /invalid factory address|^3 INVALID_ARGUMENT:.*invalid factory address/
      );
    });

    test("should include isHidden property in getWallet response with default value of false", async () => {
      const salt = _.toString(saltCounter++);

      const wallet = await client.getWallet({ salt });

      expect(wallet).toHaveProperty("isHidden");
      expect(wallet.isHidden).toBeFalsy();
    });
  });

  describe("getWallets Tests", () => {
    test("should include custom salt wallet when getting address with smartWallet using signature", async () => {
      const saltValue = _.toString(saltCounter++);
      await client.getWallet({ salt: saltValue });

      const wallets = await client.getWallets();
      expect(wallets.length).toBeGreaterThanOrEqual(2);
      expect(wallets.some((item) => item.salt === saltValue)).toBe(true);
    });

    test("will not add duplicate wallets to the list", async () => {
      const salt1 = _.toString(saltCounter++);
      const salt2 = _.toString(saltCounter++);

      // Intentionally getting duplicate wallets with the same salt
      await client.getWallet({ salt: salt1 });
      await client.getWallet({ salt: salt1 });
      await client.getWallet({ salt: salt2 });
      await client.getWallet({ salt: salt2 });

      const wallets = await client.getWallets();

      // Make sure the same salt from the getWallets list not returning duplicate wallets
      // Note: There might be multiple wallets with the same salt but different factory addresses
      // We should only have one wallet per salt per factory address
      const walletsWithSalt1 = wallets.filter((item) => item.salt === salt1);
      const walletsWithSalt2 = wallets.filter((item) => item.salt === salt2);

      // Check that we don't have duplicate wallets with the same salt AND factory address
      const uniqueWalletsSalt1 = new Set(
        walletsWithSalt1.map((w) => `${w.salt}-${w.factory}`)
      );
      const uniqueWalletsSalt2 = new Set(
        walletsWithSalt2.map((w) => `${w.salt}-${w.factory}`)
      );

      expect(uniqueWalletsSalt1.size).toBe(walletsWithSalt1.length);
      expect(uniqueWalletsSalt2.size).toBe(walletsWithSalt2.length);
    });

    test("should include isHidden property in getWallets response with default value of false", async () => {
      const saltValue = _.toString(saltCounter++);
      await client.getWallet({ salt: saltValue });

      const wallets = await client.getWallets();
      const wallet = wallets.find((w) => w.salt === saltValue);

      expect(wallet).toHaveProperty("isHidden");
      if (wallet) {
        expect(wallet.isHidden).toBeFalsy();
      }
    });

    test("should return wallets sorted by salt", async () => {
      // Create wallets with different salt values
      const salt1 = "10";
      const salt2 = "2";
      const salt3 = "0";
      const salt4 = "1";

      await client.getWallet({ salt: salt1 });
      await client.getWallet({ salt: salt2 });
      await client.getWallet({ salt: salt3 });
      await client.getWallet({ salt: salt4 });

      const wallets = await client.getWallets();

      // Extract salt values from wallets and verify they are sorted
      const saltValues = wallets.map((w) => w.salt || "");

      // Verify the wallets are sorted by salt (string comparison)
      // In lexicographic order: "0" < "1" < "10" < "2"
      const sortedSalts = [...saltValues].sort((a, b) => a.localeCompare(b));
      expect(saltValues).toEqual(sortedSalts);
    });
  });

  describe("setWallet Tests", () => {
    test("setWallet should hide wallet when isHidden is true", async () => {
      const saltValue = _.toString(saltCounter++);
      await client.getWallet({ salt: saltValue });

      let wallets = await client.getWallets();
      let wallet = wallets.find((w) => w.salt === saltValue);
      if (wallet) {
        expect(wallet.isHidden).toBeFalsy(); // The initial value should be false
      }

      const hiddenWallet = await client.setWallet(
        { salt: saltValue },
        { isHidden: true }
      );

      expect(hiddenWallet.isHidden).toBeTruthy();

      wallets = await client.getWallets();
      // Find the wallet with the same salt and factory address as the hidden wallet
      wallet = wallets.find(
        (w) => w.salt === saltValue && w.factory === hiddenWallet.factory
      );

      if (wallet) {
        expect(wallet.isHidden).toBeTruthy();
      }

      const unhiddenWallet = await client.setWallet(
        { salt: saltValue },
        { isHidden: false }
      );
      expect(unhiddenWallet.isHidden).toBeFalsy();

      wallets = await client.getWallets();
      // Find the wallet with the same salt and factory address as the unhidden wallet
      wallet = wallets.find(
        (w) => w.salt === saltValue && w.factory === unhiddenWallet.factory
      );
      if (wallet) {
        expect(wallet.isHidden).toBeFalsy(); // The initial value should be false
      }
    });
  });
});
