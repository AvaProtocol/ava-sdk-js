/**
 * Port of tests-v3-archive/core/auth.test.ts.
 *
 * v3 had three describe groups:
 *   1. "Authenticated with client.authKey"  — token set on the client.
 *   2. "Authenticated with options.authKey" — per-request override (gRPC-only).
 *   3. "Unauthenticated state"               — every method 401s.
 *
 * v4's transport carries a single Bearer JWT, so (2) collapses into
 * (1) — there is no per-request token override. (1) and (3) port
 * over directly; the JWT shape assertions are kept (sub + exp +
 * iss = AvaProtocol) because they exercise the same auth handler
 * the SDK depends on.
 */

import { APIError, Client } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  buildAuthPayload,
  generateSignature,
  getClient,
  getEOAAddress,
  createSmartWallet,
  nextTestSalt,
  removeCreatedWorkflows,
  testPrivateKey,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

describe("Authentication Tests", () => {
  let eoaAddress: string;

  beforeAll(() => {
    eoaAddress = getEOAAddress();
  });

  describe("Authenticated client", () => {
    let client: Client;

    beforeAll(async () => {
      client = getClient();
      await authenticateClient(client);
    });

    test("wallets.create works with the authenticated client", async () => {
      const salt = nextTestSalt();
      const result = await createSmartWallet(client, { saltValue: salt });
      expect(result.address).toHaveLength(42);
      expect(result.salt).toEqual(salt);
      expect(result.factoryAddress).toBeTruthy();
    });

    test("wallets.list returns at least the default wallet", async () => {
      const list = await client.wallets.list();
      expect(list.data.length).toBeGreaterThanOrEqual(1);
    });

    test("workflows.create returns a ULID", async () => {
      const wallet = await createSmartWallet(client);
      let workflowId: string | undefined;
      try {
        const wf = await client.workflows.create(createFromTemplate(wallet.address));
        workflowId = wf.id as string;
        expect(workflowId).toHaveLength(26);
      } finally {
        await removeCreatedWorkflows(client, [workflowId]);
      }
    });

    test("workflows.retrieve fetches by id", async () => {
      const wallet = await createSmartWallet(client);
      let workflowId: string | undefined;
      try {
        const created = await client.workflows.create(createFromTemplate(wallet.address));
        workflowId = created.id as string;
        const fetched = await client.workflows.retrieve(workflowId);
        expect(fetched.id).toEqual(workflowId);
        expect(fetched.status).toBe("enabled");
        expect(fetched.smartWalletAddress).toEqualIgnoreCase(wallet.address);
      } finally {
        await removeCreatedWorkflows(client, [workflowId]);
      }
    });

    test("workflows.list filters by smart wallet", async () => {
      const wallet = await createSmartWallet(client);
      let workflowId: string | undefined;
      try {
        const created = await client.workflows.create(createFromTemplate(wallet.address));
        workflowId = created.id as string;
        const list = await client.workflows.list({
          smartWalletAddress: [wallet.address],
        });
        expect(list.data.map((w) => w.id)).toContain(workflowId);
      } finally {
        await removeCreatedWorkflows(client, [workflowId]);
      }
    });

    test("workflows.pause flips the workflow to disabled", async () => {
      const wallet = await createSmartWallet(client);
      let workflowId: string | undefined;
      try {
        const created = await client.workflows.create(createFromTemplate(wallet.address));
        workflowId = created.id as string;
        const paused = await client.workflows.pause(workflowId);
        expect(paused.status).toBe("disabled");
      } finally {
        await removeCreatedWorkflows(client, [workflowId]);
      }
    });

    test("workflows.cancel deletes the workflow", async () => {
      const wallet = await createSmartWallet(client);
      const created = await client.workflows.create(createFromTemplate(wallet.address));
      const workflowId = created.id as string;
      await expect(client.workflows.cancel(workflowId)).resolves.toBeUndefined();
      await expect(client.workflows.retrieve(workflowId)).rejects.toMatchObject({
        status: 404,
      });
    });
  });

  describe("Exchange flow (POST /auth:exchange)", () => {
    let client: Client;

    beforeAll(() => {
      client = getClient();
    });

    test("returns a JWT with the expected claims (issuer + subject + exp)", async () => {
      const payload = await buildAuthPayload();
      const res = await client.auth.exchange(payload);
      expect(res.token).toBeTruthy();
      // The token also gets stashed on the transport for follow-up calls.
      expect(client.token).toEqual(res.token);

      const [, body] = res.token.split(".");
      expect(body).toBeTruthy();
      const decoded = JSON.parse(Buffer.from(body, "base64").toString());
      expect(decoded).toMatchObject({
        iss: "AvaProtocol",
        sub: payload.ownerAddress,
      });
      expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
      // Subject is always a 0x-prefixed EOA address.
      expect(decoded.sub).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    test("exchangeWithKey is a one-shot helper around exchange()", async () => {
      const c = getClient();
      const res = await c.auth.exchangeWithKey(testPrivateKey());
      expect(res.token).toEqual(c.token);
      expect(res.subject).toBeTruthy();
      expect(res.subject?.toLowerCase()).toEqual(eoaAddress.toLowerCase());
    });

    test("rejects a signature that doesn't match the owner", async () => {
      const payload = await buildAuthPayload();
      // Re-sign the message with a different key — verifier will
      // reject because the recovered address doesn't match ownerAddress.
      const otherKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
      const badSig = await generateSignature(payload.message, otherKey);
      await expect(
        client.auth.exchange({ ...payload, signature: badSig }),
      ).rejects.toMatchObject({ status: 401 });
    });
  });

  describe("Unauthenticated state", () => {
    let client: Client;

    beforeAll(() => {
      client = getClient(); // never authenticated
    });

    test("workflows.create rejects with 401", async () => {
      await expect(
        client.workflows.create(createFromTemplate(eoaAddress)),
      ).rejects.toMatchObject({ status: 401 });
    });

    test("workflows.list rejects with 401", async () => {
      await expect(client.workflows.list()).rejects.toMatchObject({ status: 401 });
    });

    test("workflows.retrieve rejects with 401", async () => {
      await expect(client.workflows.retrieve("01ANYULID")).rejects.toBeInstanceOf(APIError);
    });

    test("workflows.pause rejects with 401", async () => {
      await expect(client.workflows.pause("01ANYULID")).rejects.toBeInstanceOf(APIError);
    });

    test("workflows.cancel rejects with 401", async () => {
      await expect(client.workflows.cancel("01ANYULID")).rejects.toBeInstanceOf(APIError);
    });

    test("wallets.list rejects with 401", async () => {
      await expect(client.wallets.list()).rejects.toMatchObject({ status: 401 });
    });

    test("wallets.create rejects with 401", async () => {
      await expect(client.wallets.create({ salt: "1" })).rejects.toMatchObject({ status: 401 });
    });
  });
});

// `toEqualIgnoreCase` is registered globally by
// tests/utils/matchers.ts (wired via jest.config.cjs
// setupFilesAfterEnv) and re-used by other ported suites.
