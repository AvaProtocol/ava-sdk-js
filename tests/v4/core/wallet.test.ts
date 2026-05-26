/**
 * Port of tests-v3-archive/core/wallet.test.ts.
 *
 * Wallet field renames that show up throughout this suite:
 *   - factory             -> factoryAddress
 *   - totalTaskCount      -> totalWorkflowCount
 *   - enabledTaskCount    -> enabledWorkflowCount
 *   - completedTaskCount  -> completedWorkflowCount
 *   - disabledTaskCount   -> disabledWorkflowCount
 *   - failedTaskCount     -> failedWorkflowCount
 *
 * SDK call renames:
 *   - client.getWallet({salt})            -> client.wallets.create({salt})  (idempotent)
 *   - client.getWallets()                 -> client.wallets.list()           (returns {data})
 *   - client.setWallet({salt},{isHidden}) -> client.wallets.update(address,{isHidden})
 *   - client.createWorkflow + submit      -> client.workflows.create(req)
 *   - client.deleteWorkflow(id)           -> client.workflows.cancel(id)
 *   - client.setWorkflowEnabled(id,false) -> client.workflows.pause(id)
 *   - client.triggerWorkflow              -> client.workflows.trigger(id, body)
 *
 * The v3 "negative salt" and "invalid factory" tests asserted on the
 * raw gRPC error message. v4 returns RFC 7807 problem+json with HTTP
 * 400, so those assertions check status instead of message text.
 */

import { Client, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getSmartWallet,
  nextTestSalt,
  removeCreatedWorkflows,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

describe("Wallet Management Tests", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  describe("wallets.create (v3 getWallet)", () => {
    test("derives a wallet with the aggregator's default factory", async () => {
      const salt = nextTestSalt();
      const result = await client.wallets.create({ salt });

      expect(result.salt).toEqual(salt);
      expect(result.factoryAddress).toBeTruthy();
      expect(result.address).toHaveLength(42);
    });

    test("workflow lifecycle updates the wallet counts", async () => {
      // Use a fresh salt so the workflow counters start from a known baseline.
      const salt = nextTestSalt();
      let wallet = await client.wallets.create({ salt });

      let workflowId1: string | undefined;
      let workflowId2: string | undefined;

      try {
        const initial = {
          total: wallet.totalWorkflowCount ?? 0,
          enabled: wallet.enabledWorkflowCount ?? 0,
          completed: wallet.completedWorkflowCount ?? 0,
          disabled: wallet.disabledWorkflowCount ?? 0,
        };

        // Create a block-trigger workflow targeting this wallet.
        const blockWorkflowReq = {
          ...createFromTemplate(wallet.address),
          trigger: Triggers.block({
            id: "trigger",
            name: "blockTrigger",
            interval: 102,
          }),
        };
        const created1 = await client.workflows.create(blockWorkflowReq);
        workflowId1 = created1.id as string;

        wallet = await client.wallets.create({ salt });
        expect(wallet.totalWorkflowCount).toEqual(initial.total + 1);
        expect(wallet.enabledWorkflowCount).toEqual(initial.enabled + 1);
        expect(wallet.completedWorkflowCount).toEqual(initial.completed);
        expect(wallet.disabledWorkflowCount).toEqual(initial.disabled);

        // Fire the trigger synchronously so we can observe the
        // counters move to "completed". Block triggers need a
        // triggerOutput payload that mimics what the operator
        // would have observed (block number).
        await client.workflows.trigger(workflowId1, {
          triggerType: "block",
          triggerOutput: { blockNumber: 1 },
          isBlocking: true,
        });

        wallet = await client.wallets.create({ salt });
        expect(wallet.totalWorkflowCount).toEqual(initial.total + 1);
        expect(wallet.enabledWorkflowCount).toEqual(initial.enabled);
        expect(wallet.completedWorkflowCount).toEqual(initial.completed + 1);
        expect(wallet.disabledWorkflowCount).toEqual(initial.disabled);

        // Now create a second workflow and pause it to verify the
        // "disabled" counter moves.
        const created2 = await client.workflows.create(
          createFromTemplate(wallet.address),
        );
        workflowId2 = created2.id as string;
        await client.workflows.pause(workflowId2);

        wallet = await client.wallets.create({ salt });
        expect(wallet.totalWorkflowCount).toEqual(initial.total + 2);
        expect(wallet.enabledWorkflowCount).toEqual(initial.enabled);
        expect(wallet.completedWorkflowCount).toEqual(initial.completed + 1);
        expect(wallet.disabledWorkflowCount).toEqual(initial.disabled + 1);
      } finally {
        await removeCreatedWorkflows(client, [workflowId1, workflowId2]);
      }
    });

    test("accepts an explicit salt and echoes it back", async () => {
      const salt = "12345";
      const result = await client.wallets.create({ salt });
      expect(result.salt).toEqual(salt);
      expect(result.factoryAddress).toBeTruthy();
      expect(result.address).toHaveLength(42);
    });

    test("rejects a negative salt with HTTP 400", async () => {
      await expect(
        client.wallets.create({ salt: "-12" }),
      ).rejects.toMatchObject({ status: 400 });
    });

    test("rejects an invalid factory address with HTTP 400", async () => {
      await expect(
        client.wallets.create({ salt: "0", factoryAddress: "0x1234" }),
      ).rejects.toMatchObject({ status: 400 });
    });

    test("returns isHidden defaulted to false on a fresh wallet", async () => {
      const salt = nextTestSalt();
      const wallet = await client.wallets.create({ salt });
      expect(wallet).toHaveProperty("isHidden");
      expect(wallet.isHidden ?? false).toBeFalsy();
    });
  });

  describe("wallets.list (v3 getWallets)", () => {
    test("includes a freshly created custom-salt wallet", async () => {
      const salt = nextTestSalt();
      await client.wallets.create({ salt });

      const list = await client.wallets.list();
      expect(list.data.length).toBeGreaterThanOrEqual(2);
      expect(list.data.some((w) => w.salt === salt)).toBe(true);
    });

    test("does not return duplicates for the same salt + factory", async () => {
      const salt1 = nextTestSalt();
      const salt2 = nextTestSalt();

      // Intentionally re-derive the same wallets to exercise
      // idempotency on the create endpoint.
      await client.wallets.create({ salt: salt1 });
      await client.wallets.create({ salt: salt1 });
      await client.wallets.create({ salt: salt2 });
      await client.wallets.create({ salt: salt2 });

      const list = await client.wallets.list();

      const walletsForSalt = (s: string) => list.data.filter((w) => w.salt === s);
      const uniqueKeys = (rows: ReadonlyArray<{ salt?: string; factoryAddress?: string }>) =>
        new Set(rows.map((r) => `${r.salt}-${r.factoryAddress}`));

      const salt1Rows = walletsForSalt(salt1);
      const salt2Rows = walletsForSalt(salt2);

      expect(uniqueKeys(salt1Rows).size).toBe(salt1Rows.length);
      expect(uniqueKeys(salt2Rows).size).toBe(salt2Rows.length);
    });

    test("includes isHidden=false by default on listed wallets", async () => {
      const salt = nextTestSalt();
      await client.wallets.create({ salt });

      const list = await client.wallets.list();
      const wallet = list.data.find((w) => w.salt === salt);
      expect(wallet).toBeTruthy();
      if (wallet) {
        expect(wallet).toHaveProperty("isHidden");
        expect(wallet.isHidden ?? false).toBeFalsy();
      }
    });

    test("returns wallets sorted by salt (lexicographic)", async () => {
      // Create four salts whose lexicographic order differs from
      // numeric order: "0" < "1" < "10" < "2".
      for (const salt of ["10", "2", "0", "1"]) {
        await client.wallets.create({ salt });
      }

      const list = await client.wallets.list();
      const salts = list.data.map((w) => w.salt ?? "");
      const sorted = [...salts].sort((a, b) => a.localeCompare(b));
      expect(salts).toEqual(sorted);
    });
  });

  describe("wallets.update (v3 setWallet)", () => {
    test("toggles the isHidden flag through update", async () => {
      const salt = nextTestSalt();
      const created = await getSmartWallet(client, { saltValue: salt });
      expect(created.isHidden ?? false).toBeFalsy();

      // Hide.
      const hidden = await client.wallets.update(created.address, { isHidden: true });
      expect(hidden.isHidden).toBe(true);

      const listAfterHide = await client.wallets.list();
      const hiddenRow = listAfterHide.data.find(
        (w) => w.salt === salt && w.factoryAddress === hidden.factoryAddress,
      );
      expect(hiddenRow?.isHidden).toBe(true);

      // Unhide.
      const unhidden = await client.wallets.update(created.address, { isHidden: false });
      expect(unhidden.isHidden ?? false).toBeFalsy();

      const listAfterUnhide = await client.wallets.list();
      const unhiddenRow = listAfterUnhide.data.find(
        (w) => w.salt === salt && w.factoryAddress === unhidden.factoryAddress,
      );
      expect(unhiddenRow?.isHidden ?? false).toBeFalsy();
    });
  });
});
