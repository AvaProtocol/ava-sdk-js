/**
 * Port of tests-v3-archive/workflows/setWorkflowEnabled.test.ts.
 *
 * v4 splits the v3 `setWorkflowEnabled(id, bool)` call into two
 * explicit verbs:
 *   - client.workflows.pause(id)  -> disable
 *   - client.workflows.resume(id) -> enable
 * Both are idempotent at the engine level.
 */

import { Client } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getSmartWallet,
  removeCreatedWorkflows,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(60_000);

describe("pause/resume Workflow Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("pause flips status to disabled", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create(createFromTemplate(wallet.address));
    const id = created.id as string;
    createdWorkflowIds.push(id);

    const paused = await client.workflows.pause(id);
    expect(paused.status).toBe("disabled");

    const fetched = await client.workflows.retrieve(id);
    expect(fetched.status).toBe("disabled");
  });

  test("returns 404 when pausing a non-existent workflow", async () => {
    await expect(client.workflows.pause("01ZZZZZZZZZZZZZZZZZZZZZZZZ")).rejects.toMatchObject({
      status: 404,
    });
  });

  test("resume is idempotent on an already-enabled workflow", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create(createFromTemplate(wallet.address));
    const id = created.id as string;
    createdWorkflowIds.push(id);

    const resumed = await client.workflows.resume(id);
    expect(resumed.status).toBe("enabled");
  });

  test("resume re-enables a paused workflow", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create(createFromTemplate(wallet.address));
    const id = created.id as string;
    createdWorkflowIds.push(id);

    await client.workflows.pause(id);
    const resumed = await client.workflows.resume(id);
    expect(resumed.status).toBe("enabled");

    const fetched = await client.workflows.retrieve(id);
    expect(fetched.status).toBe("enabled");
  });

  test("pause is idempotent on an already-paused workflow", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create(createFromTemplate(wallet.address));
    const id = created.id as string;
    createdWorkflowIds.push(id);

    const first = await client.workflows.pause(id);
    expect(first.status).toBe("disabled");
    const second = await client.workflows.pause(id);
    expect(second.status).toBe("disabled");
  });
});
