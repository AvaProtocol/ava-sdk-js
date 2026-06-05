import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {
  getSmartWallet,
  getClient,
  authenticateClient,
} from "../utils/utils";
import { createFromTemplate } from "../utils/templates";
import { WorkflowStatus } from "@avaprotocol/types";

describe("setWorkflowEnabled Tests", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  test("should disable workflow when authenticated with signature", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const result = await client.setWorkflowEnabled(workflowId, false);
      expect(result.success).toBeTruthy();

      const updated = await client.getWorkflow(workflowId);
      expect(updated.id).toEqual(workflowId);
      expect(updated.status).toEqual(WorkflowStatus.Disabled);
    } finally {
      await client.deleteWorkflow(workflowId!);
    }
  });

  test("should return error response when disabling a non-existent workflow", async () => {
    const result = await client.setWorkflowEnabled("non-existent-task-id", false);
    expect(result.success).toBeFalsy();
    expect(result.status).toBe("not_found");
    expect(result.message).toMatch(/task not found/i);
    expect(result.id).toBe("non-existent-task-id");
  });

  test("should be idempotent when enabling an already enabled workflow", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const res = await client.setWorkflowEnabled(workflowId, true);
      expect(res.success).toBeTruthy();
      expect(res.status).toBe(WorkflowStatus.Enabled);

      const updated = await client.getWorkflow(workflowId);
      expect(updated.status).toEqual(WorkflowStatus.Enabled);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should enable a disabled workflow", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const disableRes = await client.setWorkflowEnabled(workflowId, false);
      expect(disableRes.success).toBeTruthy();
      expect(disableRes.status).toBe(WorkflowStatus.Disabled);

      const enableRes = await client.setWorkflowEnabled(workflowId, true);
      expect(enableRes.success).toBeTruthy();
      expect(enableRes.status).toBe(WorkflowStatus.Enabled);

      const updated = await client.getWorkflow(workflowId);
      expect(updated.status).toEqual(WorkflowStatus.Enabled);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should be idempotent when disabling an already disabled workflow", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const firstDisable = await client.setWorkflowEnabled(workflowId, false);
      expect(firstDisable.success).toBeTruthy();
      expect(firstDisable.status).toBe(WorkflowStatus.Disabled);

      const secondDisable = await client.setWorkflowEnabled(workflowId, false);
      expect(secondDisable.success).toBeTruthy();
      expect(secondDisable.status).toBe(WorkflowStatus.Disabled);

      const updated = await client.getWorkflow(workflowId);
      expect(updated.status).toEqual(WorkflowStatus.Disabled);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
});

