import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {
  getSmartWallet,
  getClient,
  authenticateClient,
} from "../utils/utils";
import { createFromTemplate } from "../utils/templates";
import { WorkflowStatus } from "@avaprotocol/types";

describe("cancelWorkflow Tests", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  test("should cancel task when authenticated with signature", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const result = await client.cancelWorkflow(workflowId);
      expect(result.success).toBeTruthy();

      const cancelResult = await client.getWorkflow(workflowId);
      expect(cancelResult.id).toEqual(workflowId);
      expect(cancelResult.status).toEqual(WorkflowStatus.Canceled);
    } finally {
      await client.deleteWorkflow(workflowId!);
    }
  });

  test("should return error response when canceling a non-existent task", async () => {
    const result = await client.cancelWorkflow("non-existent-task-id");
    expect(result.success).toBeFalsy();
    expect(result.status).toBe("not_found");
    expect(result.message).toMatch(/task not found/i);
    expect(result.id).toBe("non-existent-task-id");
  });
});
