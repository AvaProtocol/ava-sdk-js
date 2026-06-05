import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {
  getSmartWallet,
  getClient,
  authenticateClient,
} from "../utils/utils";
import { createFromTemplate } from "../utils/templates";

describe("deleteWorkflow Tests", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  test("should delete task when authenticated with signature", async () => {
    const wallet = await getSmartWallet(client);

    const workflowProps = createFromTemplate(wallet.address);
    const workflow = client.createWorkflow(workflowProps);
    const workflowId = await client.submitWorkflow(workflow);

    const result = await client.deleteWorkflow(workflowId);
    expect(result.success).toBeTruthy();

    const listRes = await client.getWorkflows([wallet.address]);

    expect(Array.isArray(listRes.items)).toBe(true);
    expect(listRes.items.some((task) => task.id === workflowId)).toBe(false);
  });

  test("should return error response when deleting a non-existent task", async () => {
    const result = await client.deleteWorkflow("non-existent-task-id");
    expect(result.success).toBeFalsy();
    expect(result.status).toBe("not_found");
    expect(result.message).toMatch(/task not found/i);
    expect(result.id).toBe("non-existent-task-id");
  });
});
