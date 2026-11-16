/** SDK -> real HTTP gateway -> owner inventory -> decoded SDK response. No mocked fetch. */
import { randomUUID } from "node:crypto";
import { Chains, type Client, type v4 } from "@avaprotocol/sdk-js";
import {
  getClient,
  getIsolatedClient,
  tightWalletCap,
  TEST_AUTH_CHAIN_ID,
} from "../../utils/client";
import {
  hasPartnerAssertionKey,
  mintTestPartnerAssertion,
  PARTNER_ASSERTION_HEADER,
} from "../../utils/partner";

jest.setTimeout(60_000);
const testTight = tightWalletCap() ? test : test.skip;
const testMultichain =
  process.env.MULTICHAIN_TEST === "1" || process.env.TEST_ENV === "railway"
    ? test
    : test.skip;
const testPartner = hasPartnerAssertionKey() ? test : test.skip;

function expectUsage(list: v4.WalletList, activeCount: number) {
  expect(list.usage).toMatchObject({
    scope: "owner",
    activeCount,
    activeLimit: expect.any(Number),
  });
  expect(list.usage!.activeLimit).toBeGreaterThanOrEqual(1);
  expect(list.usage!.revision).toMatch(/^\d+$/);
  expect(
    list.data.filter((wallet) => wallet.kind !== "eoa_7702" && !wallet.isHidden)
  ).toHaveLength(activeCount);
}

async function archiveInventory(client: Client) {
  const list = await client.wallets.list();
  for (const wallet of list.data) {
    await client.wallets.update(wallet.address, { isHidden: true });
  }
}

describe("global wallet inventory E2E", () => {
  test("returns identity metadata and authoritative owner usage", async () => {
    const { client } = await getIsolatedClient();
    try {
      const list = await client.wallets.list();
      expectUsage(list, 1);
      expect(list.data).toHaveLength(1);
      expect(list.data[0]).toMatchObject({
        salt: "0",
        isHidden: false,
        walletId: expect.any(String),
        deploymentProfile: expect.any(String),
      });
      expect(list.data[0].walletId).not.toHaveLength(0);
      expect(list.data[0].address).toMatch(/^0x[0-9a-fA-F]{40}$/);
      expect(list.data[0].factoryAddress).toMatch(/^0x[0-9a-fA-F]{40}$/);
    } finally {
      await archiveInventory(client);
    }
  });

  testTight(
    "archives salt 0, creates salt 4, and enforces restore capacity",
    async () => {
      const { client } = await getIsolatedClient();
      try {
        const zero = await client.wallets.create({ salt: "0" });
        await client.wallets.create({ salt: "1" });
        const two = await client.wallets.create({ salt: "2" });
        const full = await client.wallets.list();
        expectUsage(full, 3);
        expect(full.usage!.activeLimit).toBe(3);
        for (const salt of ["3", "4"]) {
          await expect(client.wallets.create({ salt })).rejects.toMatchObject({
            status: 429,
            code: "WALLETS_LIMIT_REACHED",
          });
        }
        await client.wallets.update(zero.address, { isHidden: true });
        const four = await client.wallets.create({ salt: "4" });
        expect(four.salt).toBe("4");
        expect(four.isHidden).toBe(false);
        const afterCreate = await client.wallets.list();
        expectUsage(afterCreate, 3);
        expect(afterCreate.data.map((wallet) => wallet.salt)).toEqual([
          "0",
          "1",
          "2",
          "4",
        ]);
        expect(BigInt(afterCreate.usage!.revision)).toBeGreaterThan(
          BigInt(full.usage!.revision)
        );
        await expect(
          client.wallets.update(zero.address, { isHidden: false })
        ).rejects.toMatchObject({ status: 429, code: "WALLETS_LIMIT_REACHED" });
        await expect(
          client.wallets.create({ salt: "0" })
        ).resolves.toMatchObject({ walletId: zero.walletId, isHidden: true });
        await client.wallets.update(two.address, { isHidden: true });
        await client.wallets.update(zero.address, { isHidden: false });
        expectUsage(await client.wallets.list(), 3);
      } finally {
        await archiveInventory(client);
      }
    }
  );

  test("allocates above non-contiguous and large salt history", async () => {
    const { client } = await getIsolatedClient();
    try {
      const zero = await client.wallets.create({ salt: "0" });
      await client.wallets.create({ salt: "2" });
      const eight = await client.wallets.create({ salt: "8" });
      await client.wallets.update(zero.address, { isHidden: true });
      const nine = await client.wallets.createNext({
        idempotencyKey: randomUUID(),
      });
      expect(nine.salt).toBe("9");
      await client.wallets.update(nine.address, { isHidden: true });
      await client.wallets.create({ salt: "9007199254740993" });
      await client.wallets.update(eight.address, { isHidden: true });
      const next = await client.wallets.createNext({
        idempotencyKey: randomUUID(),
      });
      expect(next.salt).toBe("9007199254740994");
      const list = await client.wallets.list();
      expect(list.data.map((wallet) => wallet.salt)).toEqual([
        "0",
        "2",
        "8",
        "9",
        "9007199254740993",
        "9007199254740994",
      ]);
      expectUsage(list, 3);
    } finally {
      await archiveInventory(client);
    }
  });

  testTight(
    "replays an archived allocation at capacity through a fresh SDK client",
    async () => {
      const { client } = await getIsolatedClient();
      try {
        const key = randomUUID();
        const first = await client.wallets.createNext({ idempotencyKey: key });
        expect(first.salt).toBe("0");
        await client.wallets.update(first.address, { isHidden: true });
        for (const salt of ["1", "2", "4"])
          await client.wallets.create({ salt });
        const before = await client.wallets.list();
        expectUsage(before, 3);
        const retry = getClient();
        retry.setToken(client.token!);
        const replay = await retry.wallets.createNext({ idempotencyKey: key });
        expect(replay).toMatchObject({
          address: first.address,
          salt: "0",
          walletId: first.walletId,
          isHidden: true,
        });
        const after = await retry.wallets.list();
        expect(after).toEqual(before);
        await expect(
          retry.wallets.createNext({
            idempotencyKey: key,
            deploymentProfile: "different-profile",
          })
        ).rejects.toMatchObject({
          status: 409,
          code: "IDEMPOTENCY_KEY_REUSED",
        });
      } finally {
        await archiveInventory(client);
      }
    }
  );

  test("preserves archived-only inventory and allocates a new salt", async () => {
    const { client } = await getIsolatedClient();
    try {
      const zero = await client.wallets.create({ salt: "0" });
      const two = await client.wallets.create({ salt: "2" });
      await archiveInventory(client);
      const list = await client.wallets.list();
      expectUsage(list, 0);
      expect(list.data.map((wallet) => wallet.walletId)).toEqual([
        zero.walletId,
        two.walletId,
      ]);
      await expect(client.wallets.create({ salt: "0" })).resolves.toMatchObject(
        { walletId: zero.walletId, isHidden: true }
      );
      const next = await client.wallets.createNext({
        idempotencyKey: randomUUID(),
      });
      expect(next.salt).toBe("3");
      expectUsage(await client.wallets.list(), 1);
    } finally {
      await archiveInventory(client);
    }
  });

  test("keeps allocation replay keys isolated by authenticated owner", async () => {
    const first = await getIsolatedClient();
    const second = await getIsolatedClient();
    try {
      const key = randomUUID();
      const a = await first.client.wallets.createNext({ idempotencyKey: key });
      const b = await second.client.wallets.createNext({ idempotencyKey: key });
      expect(a.address).not.toEqual(b.address);
      expect(a.walletId).not.toEqual(b.walletId);
      expect(a.salt).toBe("0");
      expect(b.salt).toBe("0");
      await expect(
        first.client.wallets.createNext({ idempotencyKey: key })
      ).resolves.toEqual(a);
      await expect(
        second.client.wallets.createNext({ idempotencyKey: key })
      ).resolves.toEqual(b);
    } finally {
      await archiveInventory(first.client);
      await archiveInventory(second.client);
    }
  });

  testMultichain(
    "shares identities, usage and replay across supported network hints",
    async () => {
      const { client } = await getIsolatedClient();
      try {
        const key = randomUUID();
        const first = await client.wallets.createNext({
          idempotencyKey: key,
          chainId: Chains.BaseMainnet,
        });
        const onBase = await client.wallets.list({
          chainId: Chains.BaseMainnet,
        });
        const onSepolia = await client.wallets.list({
          chainId: TEST_AUTH_CHAIN_ID,
        });
        expect(onBase).toEqual(onSepolia);
        expectUsage(onBase, 1);
        await client.wallets.update(first.address, { isHidden: true });
        await expect(
          client.wallets.createNext({
            idempotencyKey: key,
            chainId: TEST_AUTH_CHAIN_ID,
          })
        ).resolves.toMatchObject({
          walletId: first.walletId,
          address: first.address,
          isHidden: true,
        });
        const hidden = await client.wallets.list({
          chainId: Chains.BaseMainnet,
        });
        expectUsage(hidden, 0);
        expect(hidden.data[0].isHidden).toBe(true);
      } finally {
        await archiveInventory(client);
      }
    }
  );

  test("rejects allocation without an owner JWT", async () => {
    await expect(
      getClient().wallets.createNext({ idempotencyKey: randomUUID() })
    ).rejects.toMatchObject({ status: 401, code: "AUTH_REQUIRED" });
  });

  testPartner(
    "rejects partner-only allocation before looking up replay keys",
    async () => {
      const { client, owner } = await getIsolatedClient();
      try {
        const key = randomUUID();
        await client.wallets.createNext({ idempotencyKey: key });
        const partner = getClient({
          headers: {
            [PARTNER_ASSERTION_HEADER]: mintTestPartnerAssertion({
              subject: owner,
              scope: "read",
            }),
          },
        });
        await expect(
          partner.wallets.createNext({ idempotencyKey: key })
        ).rejects.toMatchObject({ status: 401, code: "AUTH_REQUIRED" });
      } finally {
        await archiveInventory(client);
      }
    }
  );
});
