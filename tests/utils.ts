import Client, {
  getKeyRequestMessage,
  Workflow,
  WorkflowProps,
  WorkflowStatuses,
} from "../dist";
import { ethers } from "ethers";
import _ from "lodash";

// Get wallet address from private key
export async function getAddress(privateKey: string): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
}

// Generate a signed message from a private key
export async function generateSignature(
  privateKey: string,
  expiredAt: number
): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  const message = getKeyRequestMessage(wallet.address, expiredAt);

  // console.log("Signing message:", message, "Expired at:", expiredAt);

  const signature = await wallet.signMessage(message);

  return signature;
}

// Helper function to ensure environment variables are defined
export function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required environment variable "${name}" is not set`);
  }
  return value;
}

// Add a workflow to the list of created workflows for cleanup, or removal later
export const queueForRemoval = (
  workflowIds: Map<string, boolean>,
  workflowId: string
) => {
  if (workflowIds.has(workflowId)) {
    return;
  }

  workflowIds.set(workflowId, false);
};

// Remove all workflows from the list of created workflows
export const removeCreatedWorkflows = async (
  client: Client,
  authKey: string,
  workflowIds: Map<string, boolean>
): Promise<void> => {
  await Promise.all(
    Array.from(workflowIds.entries()).map(async ([workflowId, isDeleting]) => {
      // Prevent re-entry with the same workflow id
      if (isDeleting) {
        return;
      }

      workflowIds.set(workflowId, true);

      try {
        await client.deleteWorkflow(workflowId, { authKey });
      } catch (error) {
        console.warn(
          `Cannot cleanup workflowId ${workflowId}. Please remove it manually.`,
          (error as Error).message
        );
      } finally {
        // No retry - in deletion error case, we leave the workflow id and isDeleted: true
        workflowIds.delete(workflowId);
      }
    })
  );

  if (workflowIds.size > 0) {
    console.warn(
      "After deleting workflows. The remaining workflow ids:",
      workflowIds
    );
  }
};

// Compare the expected and actual workflow results; usually called after getWorkflow()
export const compareResults = (
  expected: WorkflowProps,
  actual: Workflow
): void => {
  expect(actual).toBeDefined();
  expect(actual.smartWalletAddress).toEqual(expected.smartWalletAddress);
  expect(actual.trigger.type).toEqual(expected.trigger.type);
  expect(actual.nodes).toHaveLength(expected.nodes.length);
  expect(actual.edges).toHaveLength(expected.edges.length);
  expect(actual.startAt).toEqual(expected.startAt);
  expect(actual.expiredAt).toEqual(expected.expiredAt);
  expect(actual.maxExecution).toBe(expected.maxExecution);
  expect(actual.status).toBe(WorkflowStatuses.ACTIVE);
  expect(actual.id).toBe(expected.id);
  expect(actual.owner).toBe(expected.owner);
};
