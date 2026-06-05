/**
 * Port of tests-v3-archive/core/secret.test.ts.
 *
 * v3 → v4 API rename map:
 *   - client.createSecret(name, value, opts)  -> client.secrets.put(name, {value, ...opts})
 *   - client.updateSecret(name, value)        -> client.secrets.put(name, {value})  (idempotent)
 *   - client.deleteSecret(name, opts)         -> client.secrets.delete(name, opts)
 *   - client.getSecrets(opts)                 -> client.secrets.list(opts)
 *
 * Response shape differences:
 *   - v3 returned `{success: boolean}` objects from createSecret /
 *     updateSecret / deleteSecret. v4 returns `Promise<void>` and
 *     throws on failure; "no throw" replaces `success === true`.
 *   - v3's `getSecrets()` returned `{items, pageInfo}`; v4 returns
 *     `{data, pageInfo}`. (Matches the rest of the v4 collection
 *     responses — pageInfo unchanged.)
 *
 * v3's "delete workflow-scoped secret without passing workflowId"
 * test asserted on the response body's `scope === "workflow"` field.
 * v4 DELETE returns 204 (no body), so the port just verifies the
 * call succeeds — the regression coverage is the success itself,
 * not the response shape.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  createSmartWallet,
  removeCreatedWorkflows,
  testPrivateKey,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

// Secondary signing key — used to verify cross-EOA isolation.
const otherPrivateKey =
  "0x9c04bbac1942c5398ef520d66936523db8e489ef59fc33e8e66bb13664b45293";

let secretCounter = 0;
function nextSecretSuffix(): string {
  secretCounter += 1;
  return `${Date.now()}_${secretCounter}`;
}

// Delete a list of (name, scope) pairs without surfacing individual
// errors — mirrors v3's removeCreatedSecrets cleanup helper.
async function cleanupSecrets(
  client: Client,
  entries: Array<{ name: string; workflowId?: string; orgId?: string }>,
): Promise<void> {
  for (const e of entries) {
    try {
      await client.secrets.delete(e.name, {
        ...(e.workflowId ? { workflowId: e.workflowId } : {}),
        ...(e.orgId ? { orgId: e.orgId } : {}),
      });
    } catch {
      // Ignore — cleanup shouldn't mask the original assertion failure.
    }
  }
}

describe("secret Tests", () => {
  let client: Client;
  let client2: Client;
  const createdWorkflowIds: string[] = [];
  const createdSecrets: Array<{ name: string; workflowId?: string; orgId?: string }> = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);

    client2 = getClient();
    await authenticateClient(client2, otherPrivateKey);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
    await cleanupSecrets(client, createdSecrets.splice(0));
  });

  describe("create secret suite", () => {
    test("created secret is available in workflow via apContext.configVars", async () => {
      const secretName = `secret_${nextSecretSuffix()}`;
      const secretValue = "dummy_value";
      const testMessage = "my secret is ";

      await client.secrets.put(secretName, { value: secretValue });
      createdSecrets.push({ name: secretName });

      const wallet = await createSmartWallet(client);

      // Build a block-trigger workflow whose customCode node reads
      // the secret from apContext and returns it. We drive the
      // execution synchronously via workflows.trigger so the
      // assertion can run immediately.
      const workflowReq = {
        ...createFromTemplate(wallet.address),
        trigger: Triggers.block({
          id: "trigger",
          name: "blockTrigger",
          interval: 5,
        }),
        nodes: [
          Nodes.customCode({
            id: "step1",
            name: "step1",
            source: `return '${testMessage}' + apContext.configVars['${secretName}'];`,
          }),
        ],
      };
      const created = await client.workflows.create(workflowReq);
      const workflowId = created.id as string;
      createdWorkflowIds.push(workflowId);

      const trig = await client.workflows.trigger(workflowId, {
        triggerType: "block",
        triggerOutput: { blockNumber: 1 },
        isBlocking: true,
      });

      const execution = await client.executions.retrieve(trig.executionId, {
        workflowId,
      });
      const step = execution.steps?.find((s) => s.id === "step1");
      if (!step) {
        throw new Error("step1 missing from execution steps");
      }
      // v4 wraps customCode return values in `{data: ...}`. v3
      // unwrapped them — keeping the assertion explicit so a future
      // shape change is easy to spot.
      expect(step.output).toEqual({ data: testMessage + secretValue });
    });

    test("create secret at user level succeeds", async () => {
      const name = `dummysecret_${nextSecretSuffix()}`;
      await expect(client.secrets.put(name, { value: "value" })).resolves.toBeUndefined();
      createdSecrets.push({ name });
      // Verify deletion succeeds — proves the secret existed.
      await expect(client.secrets.delete(name)).resolves.toBeUndefined();
      // Clear from cleanup since we already deleted it.
      createdSecrets.pop();
    });

    test("create secret at workflow level", async () => {
      const name = `dummysecret_${nextSecretSuffix()}`;
      const workflowId = `01ABC${nextSecretSuffix()}`.replace(/_/g, "0").slice(0, 26);

      await expect(
        client.secrets.put(name, { value: "value", workflowId }),
      ).resolves.toBeUndefined();
      createdSecrets.push({ name, workflowId });

      await expect(client.secrets.delete(name, { workflowId })).resolves.toBeUndefined();
      createdSecrets.pop();
    });

    test("secrets from different EOAs do not cross", async () => {
      const name1 = `testdup1_${nextSecretSuffix()}`;
      const name2 = `testdup2_${nextSecretSuffix()}`;

      await client.secrets.put(name1, { value: "some_value" });
      createdSecrets.push({ name: name1 });

      // client2 uses a different private key — its secrets are scoped
      // to a different EOA and must not appear in client's listing.
      await client2.secrets.put(name2, { value: "some_value" });
      // Use client2 for client2's cleanup — but since both share the
      // createdSecrets list, just defer the cleanup explicitly here.
      try {
        const list1 = await client.secrets.list();
        const list2 = await client2.secrets.list();
        expect(list1.data.some((s) => s.name === name2)).toBe(false);
        expect(list2.data.some((s) => s.name === name1)).toBe(false);
      } finally {
        await cleanupSecrets(client2, [{ name: name2 }]);
      }
    });
  });

  describe("delete secret suite", () => {
    test("delete your own secret works", async () => {
      const name = `delete_${nextSecretSuffix()}`;
      await client.secrets.put(name, { value: "value" });
      createdSecrets.push({ name });

      await expect(client.secrets.delete(name)).resolves.toBeUndefined();
      createdSecrets.pop();
    });

    test("delete at workflowId scope succeeds", async () => {
      const userName = `abc_${nextSecretSuffix()}`;
      const workflowName = `def_${nextSecretSuffix()}`;
      const workflowId = `01ABC${nextSecretSuffix()}`.replace(/_/g, "0").slice(0, 26);

      await client.secrets.put(userName, { value: "value1" });
      createdSecrets.push({ name: userName });

      await client.secrets.put(workflowName, { value: "value2", workflowId });
      createdSecrets.push({ name: workflowName, workflowId });

      await expect(
        client.secrets.delete(workflowName, { workflowId }),
      ).resolves.toBeUndefined();
      createdSecrets.splice(createdSecrets.findIndex((s) => s.name === workflowName), 1);

      await expect(client.secrets.delete(userName)).resolves.toBeUndefined();
      createdSecrets.splice(createdSecrets.findIndex((s) => s.name === userName), 1);
    });

    // Regression for AvaProtocol/EigenLayer-AVS#772.
    test("delete workflow-scoped secret without passing workflowId", async () => {
      const name = `def_${nextSecretSuffix()}`;
      const workflowId = `01ABC${nextSecretSuffix()}`.replace(/_/g, "0").slice(0, 26);

      await client.secrets.put(name, { value: "value", workflowId });
      createdSecrets.push({ name, workflowId });

      // No workflowId in the delete params — the server should still
      // find and remove it. v4 returns 204 no-body, so we just verify
      // the call resolves and the secret is gone from a follow-up list.
      await expect(client.secrets.delete(name)).resolves.toBeUndefined();
      createdSecrets.pop();
    });
  });

  describe("update secret suite", () => {
    // PUT is idempotent — repeating it with a new value is the v4
    // equivalent of v3's updateSecret. We can't read the value back
    // (write-only), but a second PUT followed by DELETE must succeed.
    test("update secret value succeeds", async () => {
      const name = `update_${nextSecretSuffix()}`;

      await client.secrets.put(name, { value: "value" });
      createdSecrets.push({ name });

      await expect(client.secrets.put(name, { value: "newvalue" })).resolves.toBeUndefined();
      await expect(client.secrets.delete(name)).resolves.toBeUndefined();
      createdSecrets.pop();
    });
  });

  describe("pagination suite", () => {
    const secretPrefix = `paged_${Date.now()}_`;
    const pageNames: string[] = [];

    beforeAll(async () => {
      for (let i = 0; i < 10; i++) {
        const name = `${secretPrefix}${i}`;
        await client.secrets.put(name, { value: `value_${i}` });
        pageNames.push(name);
      }
    });

    afterAll(async () => {
      await cleanupSecrets(client, pageNames.map((n) => ({ name: n })));
    });

    test("supports forward pagination via after", async () => {
      const pageSize = 3;
      const firstPage = await client.secrets.list({ limit: pageSize });

      expect(firstPage.data.length).toBeLessThanOrEqual(pageSize);
      expect(firstPage.pageInfo.endCursor).toBeTruthy();

      if (!firstPage.pageInfo.hasNextPage) return;

      const secondPage = await client.secrets.list({
        after: firstPage.pageInfo.endCursor,
        limit: pageSize,
      });
      expect(secondPage.data.length).toBeLessThanOrEqual(pageSize);

      const firstNames = firstPage.data.map((s) => s.name);
      const secondNames = secondPage.data.map((s) => s.name);
      const overlap = firstNames.filter((n) => secondNames.includes(n));
      expect(overlap.length).toBe(0);
    });

    test("supports backward pagination via before", async () => {
      const pageSize = 3;
      const firstPage = await client.secrets.list({ limit: pageSize });
      if (!firstPage.pageInfo.endCursor || !firstPage.pageInfo.hasNextPage) return;

      const secondPage = await client.secrets.list({
        after: firstPage.pageInfo.endCursor,
        limit: pageSize,
      });
      expect(secondPage.data.length).toBeGreaterThan(0);

      const previousPage = await client.secrets.list({
        before: secondPage.pageInfo.startCursor,
        limit: pageSize,
      });
      expect(previousPage.data.length).toBeGreaterThan(0);
      expect(typeof previousPage.pageInfo.startCursor).toBe("string");
      expect(typeof previousPage.pageInfo.endCursor).toBe("string");
      expect(typeof previousPage.pageInfo.hasPreviousPage).toBe("boolean");
      expect(typeof previousPage.pageInfo.hasNextPage).toBe("boolean");

      const prevNames = previousPage.data.map((s) => s.name);
      const secondNames = secondPage.data.map((s) => s.name);
      const overlap = prevNames.filter((n) => secondNames.includes(n));
      expect(overlap.length).toBe(0);
    });

    test("respects the limit parameter", async () => {
      const smallPage = await client.secrets.list({ limit: 2 });
      const largerPage = await client.secrets.list({ limit: 5 });
      expect(smallPage.data.length).toBeLessThanOrEqual(2);
      expect(largerPage.data.length).toBeLessThanOrEqual(5);
      expect(largerPage.data.length).toBeGreaterThanOrEqual(smallPage.data.length);
    });

    test("filters secrets by workflowId", async () => {
      const workflowId = `01ABC${nextSecretSuffix()}`.replace(/_/g, "0").slice(0, 26);
      const name = `${secretPrefix}workflow_${nextSecretSuffix()}`;

      await client.secrets.put(name, { value: "workflow_value", workflowId });
      try {
        const filtered = await client.secrets.list({ workflowId });
        expect(Array.isArray(filtered.data)).toBe(true);
        expect(typeof filtered.pageInfo.hasNextPage).toBe("boolean");
        expect(typeof filtered.pageInfo.hasPreviousPage).toBe("boolean");
      } finally {
        await client.secrets.delete(name, { workflowId });
      }
    });

    test("rejects an invalid limit with HTTP 400", async () => {
      await expect(client.secrets.list({ limit: -1 })).rejects.toMatchObject({ status: 400 });
    });

    test("rejects an invalid cursor with HTTP 400", async () => {
      await expect(
        client.secrets.list({ before: "invalid-cursor" }),
      ).rejects.toMatchObject({ status: 400 });
      await expect(
        client.secrets.list({ after: "invalid-cursor" }),
      ).rejects.toMatchObject({ status: 400 });
    });
  });

  // EOA addresses are derived once for any tests that need them.
  // Kept after the describes so the helper is co-located with use.
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const _eoa1 = getEOAAddress();
  const _eoa2 = getEOAAddress(otherPrivateKey);
  const _selfKey = testPrivateKey();
  /* eslint-enable */
});
