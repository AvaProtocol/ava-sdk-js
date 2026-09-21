/**
 * EOA 7702 delegation against a live gateway that has Track B routes.
 *
 * Does **not** 7702-delegate TEST_PRIVATE_KEY. Does **not** broadcast a
 * successful type-4 (that spends controller gas). Happy-path submit is
 * the stub in eoa7702.test.ts; here we prove prepare/get/error codes
 * against the running aggregator.
 *
 * Isolated throwaway EOA — JWT identity is free; the key is never the
 * Track A fixture owner.
 *
 * CI's `avaprotocol/avs-dev` image does not yet expose these routes
 * (404). Skip there unless `EOA_7702_LIVE=1`. Local `yarn test` against
 * a staging-built aggregator still runs the suite.
 */

import { Wallet as EthersWallet } from "ethers";

import {
  APIError,
  authorizationDigest,
  Client,
  SMA7702_DELEGATE,
  signEoa7702Authorization,
} from "@avaprotocol/sdk-js";
import { partnerAssertionHeaders } from "@avaprotocol/sdk-js/partner";

import { getIsolatedClient, TEST_AUTH_CHAIN_ID } from "../../utils/client";
import { TEST_REST_URL } from "../../utils/env";
import { hasPartnerAssertionKey } from "../../utils/partner";

jest.setTimeout(60_000);

const describeLive =
  process.env.CI === "true" && process.env.EOA_7702_LIVE !== "1"
    ? describe.skip
    : describe;

describeLive("EOA 7702 delegation (live gateway)", () => {
  let client: Client;
  let owner: string;
  let privateKey: string;

  beforeAll(async () => {
    ({ client, owner, privateKey } = await getIsolatedClient());
  });

  test("GET is a code read: undelegated throwaway is missing", async () => {
    const status = await client.wallets.getDelegation(owner, {
      chainId: TEST_AUTH_CHAIN_ID,
    });
    expect(status.status).toBe("missing");
  });

  test("prepare returns the canonical SMA-7702 pin and the EOA nonce", async () => {
    const prepared = await client.wallets.prepareDelegation(owner, {
      chainId: TEST_AUTH_CHAIN_ID,
    });
    expect(prepared.delegate.toLowerCase()).toBe(SMA7702_DELEGATE.toLowerCase());
    expect(prepared.chainId).toBe(TEST_AUTH_CHAIN_ID);
    expect(prepared.nonce).toBeGreaterThanOrEqual(0);
    expect(prepared.digest).toMatch(/^0x[0-9a-fA-F]{64}$/);
  });

  test("chainId 0 is refused in the SDK before it can be coerced to JWT aud", async () => {
    await expect(
      client.wallets.prepareDelegation(owner, { chainId: 0 }),
    ).rejects.toThrow(/chainId=0 is refused/);
  });

  test("a non-first chain is refused by the gateway", async () => {
    await expect(
      client.wallets.prepareDelegation(owner, { chainId: 1 }),
    ).rejects.toMatchObject({
      name: "APIError",
      status: 400,
      code: "DELEGATION_CHAIN_NOT_FIRST",
    } satisfies Partial<APIError>);
  });

  (hasPartnerAssertionKey() ? test : test.skip)(
    "partner assertion is refused",
    async () => {
    const live = new Client({
      baseUrl: TEST_REST_URL(),
      headers: partnerAssertionHeaders({
        privateKeyBase64: process.env.PARTNER_ASSERTION_PRIVATE_KEY!.trim(),
        partnerId: "studio",
        scope: "read",
        subject: owner,
        audience:
          process.env.PARTNER_ASSERTION_AUDIENCE?.trim() || "avs-gateway-local",
      }),
    });
    await expect(
      live.wallets.prepareDelegation(owner, { chainId: TEST_AUTH_CHAIN_ID }),
    ).rejects.toMatchObject({ name: "APIError", status: 403 });
    },
  );

  test("stale nonce is refused before broadcast", async () => {
    const prepared = await client.wallets.prepareDelegation(owner, {
      chainId: TEST_AUTH_CHAIN_ID,
    });
    const stale = {
      ...prepared,
      nonce: prepared.nonce + 1,
      digest: authorizationDigest({
        chainId: prepared.chainId,
        delegate: prepared.delegate,
        nonce: prepared.nonce + 1,
      }),
    };
    const signature = signEoa7702Authorization(privateKey, stale);
    await expect(
      client.wallets.submitDelegation(owner, {
        chainId: stale.chainId,
        nonce: stale.nonce,
        signature,
      }),
    ).rejects.toMatchObject({
      name: "APIError",
      code: "DELEGATION_STALE_NONCE",
    } satisfies Partial<APIError>);
  });

  test("a signature from another key is not this EOA", async () => {
    const prepared = await client.wallets.prepareDelegation(owner, {
      chainId: TEST_AUTH_CHAIN_ID,
    });
    const other = EthersWallet.createRandom().privateKey;
    const signature = signEoa7702Authorization(other, prepared);
    await expect(
      client.wallets.submitDelegation(owner, {
        chainId: prepared.chainId,
        nonce: prepared.nonce,
        signature,
      }),
    ).rejects.toMatchObject({
      name: "APIError",
      code: "DELEGATION_BAD_AUTHORITY",
    } satisfies Partial<APIError>);
  });

  test("POST /wallets does not create kind eoa_7702", async () => {
    const wallet = await client.wallets.create({ salt: "0" });
    expect(wallet.kind).toBeUndefined();
    expect(wallet.factoryAddress).toBeTruthy();
    expect(wallet.address.toLowerCase()).not.toBe(owner.toLowerCase());
  });

  test("policies.prepare against the undelegated EOA is not a 7702 runner", async () => {
    await expect(
      client.policies.prepare(owner, {
        chainId: TEST_AUTH_CHAIN_ID,
        agentLabel: "should-fail",
        nativeRecipients: ["0x000000000000000000000000000000000000a11c"],
        nativeSpendCap: { amount: "1" },
        expiresInSeconds: 3600,
      }),
    ).rejects.toMatchObject({ name: "APIError" } satisfies Partial<APIError>);
  });
});
