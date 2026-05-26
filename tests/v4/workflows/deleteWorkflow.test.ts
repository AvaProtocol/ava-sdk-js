/**
 * Port of tests-v3-archive/workflows/deleteWorkflow.test.ts.
 *
 * v4 cancel returns void (HTTP 204). The "not found" branch surfaces
 * as HTTP 404 instead of v3's `{success: false, status: "not_found"}`
 * shape — assert on the HTTP status now that errors are typed.
 */

import { Client } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getSmartWallet,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(30_000);

describe("deleteWorkflow Tests", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  test("cancels a workflow and removes it from the list", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create(createFromTemplate(wallet.address));
    const id = created.id as string;

    await expect(client.workflows.cancel(id)).resolves.toBeUndefined();

    const list = await client.workflows.list({ smartWalletAddress: [wallet.address] });
    expect(list.data.some((w) => w.id === id)).toBe(false);
  });

  test("cancel is idempotent on a non-existent workflow (204)", async () => {
    // v3 returned `{success:false, status:"not_found"}` for missing
    // tasks. v4 treats DELETE as idempotent — both "existed and now
    // gone" and "never existed" land on 204. Tests that need a real
    // "exists" check should use workflows.retrieve.
    await expect(client.workflows.cancel("01ZZZZZZZZZZZZZZZZZZZZZZZZ")).resolves.toBeUndefined();
  });
});
