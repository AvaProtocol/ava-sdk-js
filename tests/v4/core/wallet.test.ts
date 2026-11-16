/**
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

import { Chains, Client, Triggers } from "@avaprotocol/sdk-js";

import {
  getSuiteClient,
  getIsolatedClient,
  createSmartWallet,
  suiteSalt,
  removeCreatedWorkflows,
  TEST_AUTH_CHAIN_ID,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

// Every other network-touching suite raises this; wallet.test.ts was left on
// Jest's 5s default. Three tests here now stand up their own isolated client
// (a full SIWE round-trip) before doing any wallet work, which does not fit in
// 5s whenever the gateway is cold — e.g. right after a redeploy.
jest.setTimeout(60_000);

// The multi-chain stack (Railway, or an explicitly multi-chain local run).
// Matches the flags expansion-chains-e2e.test.ts already uses.
const MULTICHAIN_STACK =
  process.env.MULTICHAIN_TEST === "1" || process.env.TEST_ENV === "railway";
const testMultichain = MULTICHAIN_STACK ? test : test.skip;

describe("Wallet Management Tests", () => {
  let client: Client;

  beforeAll(async () => {
    ({ client } = await getSuiteClient());
  });

  describe("wallets.create (v3 getWallet)", () => {
    test("derives a wallet with the aggregator's default factory", async () => {
      const salt = suiteSalt();
      const result = await client.wallets.create({ salt });

      expect(result.salt).toEqual(salt);
      expect(result.factoryAddress).toBeTruthy();
      expect(result.address).toHaveLength(42);
    });

    test("workflow lifecycle updates the wallet counts", async () => {
      // Use a fresh salt so the workflow counters start from a known baseline.
      const salt = suiteSalt();
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
            chainId: 11_155_111,
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
      // Its own owner: this salt is deliberately outside the suite pool
      // ("0"/"1"/"2"), so on the shared owner it would be a fourth distinct
      // wallet and 429 against production's cap of 3.
      const { client: echoClient } = await getIsolatedClient();
      const salt = "12345";
      const result = await echoClient.wallets.create({ salt });
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
      const salt = suiteSalt();
      const wallet = await client.wallets.create({ salt });
      expect(wallet).toHaveProperty("isHidden");
      expect(wallet.isHidden ?? false).toBeFalsy();
    });
  });

  describe("wallets.list (v3 getWallets)", () => {
    test("includes a freshly created custom-salt wallet", async () => {
      const { client: listClient } = await getIsolatedClient();
      const salt = "1";
      await listClient.wallets.list(); // Bootstrap the fresh owner's salt 0.
      await listClient.wallets.create({ salt });

      const list = await listClient.wallets.list();
      expect(list.data).toHaveLength(2);
      expect(list.data.some((w) => w.salt === salt)).toBe(true);
    });

    test("does not return duplicates for the same salt + factory", async () => {
      const salt1 = suiteSalt();
      const salt2 = suiteSalt();

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
      const salt = suiteSalt();
      await client.wallets.create({ salt });

      const list = await client.wallets.list();
      const wallet = list.data.find((w) => w.salt === salt);
      expect(wallet).toBeTruthy();
      if (wallet) {
        expect(wallet).toHaveProperty("isHidden");
        expect(wallet.isHidden ?? false).toBeFalsy();
      }
    });

    // Needs a gateway serving Base and Sepolia. A network hint must retain
    // the same derived identities and owner usage with one owner JWT.
    testMultichain("returns the same global inventory for chainId and the JWT audience", async () => {
      const otherChain = Chains.BaseMainnet;
      expect(otherChain).not.toEqual(TEST_AUTH_CHAIN_ID);

      const { client: crossClient } = await getIsolatedClient();
      const salt = "4";
      const onOtherChain = await crossClient.wallets.create({ salt, chainId: otherChain });
      expect(onOtherChain.address).toBeTruthy();

      const namedChain = await crossClient.wallets.list({ chainId: otherChain });
      expect(namedChain.data.some((w) => w.salt === salt)).toBe(true);

      const audChain = await crossClient.wallets.list();
      expect(audChain).toEqual(namedChain);
      expect(audChain.data.find((wallet) => wallet.salt === salt)?.walletId).toBe(onOtherChain.walletId);
      expect(audChain.usage).toMatchObject({ scope: "owner", activeCount: 1 });
      await crossClient.wallets.update(onOtherChain.address, { isHidden: true });
    });

    // Same gating as the listing test above. getNonce looks the wallet up
    // and reads its nonce on one chain (EigenLayer-AVS
    // TestGetWalletNonceChecksOwnershipOnTheReadChain); this is the wire
    // check that the SDK sends `?chainId=`.
    testMultichain("reads the nonce on chainId, not the JWT audience chain", async () => {
      const otherChain = Chains.BaseMainnet;
      expect(otherChain).not.toEqual(TEST_AUTH_CHAIN_ID);

      // Only one network has a local runtime row initially. Exact global
      // metadata makes the wallet readable on either configured network.
      const { client: crossClient } = await getIsolatedClient();
      const wallet = await crossClient.wallets.create({ salt: "1", chainId: otherChain });

      const { nonce } = await crossClient.wallets.getNonce(wallet.address, {
        chainId: otherChain,
      });
      // The full nonce is key << 64 | sequence, and the owner's key is 0x1.
      expect(BigInt(nonce) >> 64n).toBe(1n);

      const audNonce = await crossClient.wallets.getNonce(wallet.address);
      expect(BigInt(audNonce.nonce) >> 64n).toBe(1n);
      await crossClient.wallets.update(wallet.address, { isHidden: true });
    });

    test("returns wallets sorted numerically by salt", async () => {
      // Its own owner: these salts are not the suite pool's, and a fourth
      // distinct wallet on one owner is a 429 against production's cap of 3.
      const { client: lexClient } = await getIsolatedClient();

      // Numeric order differs from lexicographic order: 0, 2, 10.
      for (const salt of ["10", "2", "0"]) {
        await lexClient.wallets.create({ salt });
      }

      const list = await lexClient.wallets.list();
      const salts = list.data.map((w) => w.salt ?? "");
      expect(salts).toEqual(["0", "2", "10"]);
      for (const wallet of list.data) await lexClient.wallets.update(wallet.address, { isHidden: true });
    });
  });

  describe("wallets.update (v3 setWallet)", () => {
    test("toggles the isHidden flag through update", async () => {
      const salt = suiteSalt();
      const created = await createSmartWallet(client, { saltValue: salt });
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
