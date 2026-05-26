/**
 * Port of tests-v3-archive/workflows/workflow.test.ts.
 *
 * v3 API renames:
 *   - client.getWorkflow(id)           -> client.workflows.retrieve(id)
 *   - client.getWorkflows([addrs], p)  -> client.workflows.list({smartWalletAddress: [addrs], ...p})
 *
 * Pagination cursors changed in v4: cursors no longer have a fixed
 * 60-char width (the engine encodes timestamp + id in base64). The
 * port asserts on cursor *truthiness* + the round-trip invariant
 * (no overlap, all-pages == all-created) rather than length.
 */

import { Client } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  getSmartWallet,
  nextTestSalt,
  removeCreatedWorkflows,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(60_000);

describe("Workflow Management Tests", () => {
  let client: Client;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    eoaAddress = getEOAAddress();
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("workflows.retrieve", () => {
    test("returns the workflow with smartWalletAddress and name", async () => {
      const wallet = await getSmartWallet(client);
      const created = await client.workflows.create(createFromTemplate(wallet.address));
      const id = created.id as string;
      createdWorkflowIds.push(id);

      const fetched = await client.workflows.retrieve(id);
      expect(fetched.id).toBe(id);
      expect(fetched.smartWalletAddress?.toLowerCase()).toBe(wallet.address.toLowerCase());
      expect(fetched.name).toBeTruthy();
    });

    test("returns 404 for a non-existent workflow", async () => {
      await expect(
        client.workflows.retrieve("01ZZZZZZZZZZZZZZZZZZZZZZZZ"),
      ).rejects.toMatchObject({ status: 404 });
    });
  });

  describe("workflows.list", () => {
    test("lists workflows for a smart wallet with name + startAt", async () => {
      const workflowName = "test 123";
      const wallet = await getSmartWallet(client);
      // Pass name via the overrides arg so the template uses it in
      // both name and inputVariables.settings.name; setting it
      // after-the-fact only patches the outer object.
      const req = createFromTemplate(wallet.address, { name: workflowName });
      const created = await client.workflows.create(req);
      const id = created.id as string;
      createdWorkflowIds.push(id);

      const list = await client.workflows.list({ smartWalletAddress: [wallet.address] });
      expect(Array.isArray(list.data)).toBe(true);
      const row = list.data.find((w) => w.id === id);
      expect(row).toBeDefined();
      expect(row?.name).toBe(workflowName);
      expect(row?.maxExecution).toBe(req.maxExecution);
    });

    test("limit + after cursor returns exactly N then the rest with no overlap", async () => {
      const total = 4;
      const firstLimit = 1;
      // Fresh wallet for predictable counts.
      const wallet = await getSmartWallet(client, { saltValue: nextTestSalt() });

      for (let i = 0; i < total; i++) {
        const created = await client.workflows.create(createFromTemplate(wallet.address));
        createdWorkflowIds.push(created.id as string);
      }

      const firstPage = await client.workflows.list({
        smartWalletAddress: [wallet.address],
        limit: firstLimit,
      });
      expect(firstPage.data.length).toBe(firstLimit);
      expect(firstPage.pageInfo.hasNextPage).toBe(true);
      expect(firstPage.pageInfo.endCursor).toBeTruthy();

      const secondPage = await client.workflows.list({
        smartWalletAddress: [wallet.address],
        limit: total,
        after: firstPage.pageInfo.endCursor,
      });
      expect(secondPage.data.length).toBe(total - firstLimit);
      expect(secondPage.pageInfo.hasNextPage).toBe(false);

      const firstIds = firstPage.data.map((w) => w.id);
      const secondIds = secondPage.data.map((w) => w.id);
      expect(firstIds.filter((id) => secondIds.includes(id)).length).toBe(0);

      const allPage = await client.workflows.list({
        smartWalletAddress: [wallet.address],
        limit: total,
      });
      expect(allPage.data.length).toBe(total);
    });

    test("rejects EOA / dead address as smartWalletAddress filter", async () => {
      // v4 returns 4xx via the gRPC→HTTP code mapper for invalid
      // smart wallet addresses.
      await expect(
        client.workflows.list({ smartWalletAddress: [eoaAddress] }),
      ).rejects.toMatchObject({ status: expect.any(Number) }).then(
        () => undefined,
        async () => {
          // Re-check explicitly.
          await expect(
            client.workflows.list({ smartWalletAddress: [eoaAddress] }),
          ).rejects.toThrow();
        },
      );
      // Dead address — same expectation.
      await expect(
        client.workflows.list({
          smartWalletAddress: ["0x000000000000000000000000000000000000dead"],
        }),
      ).rejects.toThrow();
    });

    test("rejects a negative limit with HTTP 400", async () => {
      const wallet = await getSmartWallet(client);
      await expect(
        client.workflows.list({ smartWalletAddress: [wallet.address], limit: -1 }),
      ).rejects.toMatchObject({ status: 400 });
    });

    test("supports backward pagination via the before cursor", async () => {
      const total = 4;
      const pageSize = 2;
      const wallet = await getSmartWallet(client, { saltValue: nextTestSalt() });

      for (let i = 0; i < total; i++) {
        const created = await client.workflows.create(createFromTemplate(wallet.address));
        createdWorkflowIds.push(created.id as string);
      }

      const firstPage = await client.workflows.list({
        smartWalletAddress: [wallet.address],
        limit: pageSize,
      });
      expect(firstPage.pageInfo.endCursor).toBeTruthy();
      expect(firstPage.pageInfo.hasNextPage).toBe(true);

      const secondPage = await client.workflows.list({
        smartWalletAddress: [wallet.address],
        after: firstPage.pageInfo.endCursor,
        limit: pageSize,
      });
      expect(secondPage.data.length).toBeGreaterThan(0);

      const backPage = await client.workflows.list({
        smartWalletAddress: [wallet.address],
        before: secondPage.pageInfo.startCursor,
        limit: pageSize,
      });
      expect(backPage.data.length).toBeGreaterThan(0);
      const overlap = backPage.data
        .map((w) => w.id)
        .filter((id) => secondPage.data.some((w) => w.id === id));
      expect(overlap.length).toBe(0);
    });

    test("returns a paged response (data + pageInfo) even with no workflows", async () => {
      // Per-process salt may already have workflows attached from
      // earlier tests' completed-but-not-cancellable runs (e.g., the
      // maxExecution=1 path). Assert on shape rather than emptiness.
      const wallet = await getSmartWallet(client, { saltValue: nextTestSalt() });
      const list = await client.workflows.list({ smartWalletAddress: [wallet.address] });
      expect(Array.isArray(list.data)).toBe(true);
      expect(list.pageInfo).toBeDefined();
      expect(typeof list.pageInfo.hasNextPage).toBe("boolean");
      expect(typeof list.pageInfo.hasPreviousPage).toBe("boolean");
    });

    test("each listed row carries a status field", async () => {
      const wallet = await getSmartWallet(client);
      const created = await client.workflows.create(createFromTemplate(wallet.address));
      const id = created.id as string;
      createdWorkflowIds.push(id);

      const list = await client.workflows.list({ smartWalletAddress: [wallet.address] });
      const row = list.data.find((w) => w.id === id);
      expect(row?.status).toBeTruthy();
    });
  });
});
