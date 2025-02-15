import Client, { Workflow, WorkflowProps, WorkflowStatus } from "@/sdk-js/dist";
import {
  getKeyRequestMessage,
  GetKeyRequestMessage,
  GetKeyRequestApiKey,
  GetKeyRequestSignature,
} from "@/types/dist";

import { ethers } from "ethers";
import { UlidMonotonic } from "id128";
import dotenv from "dotenv";
import path from "path";
import _ from "lodash";
// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

const CHAIN_ENDPOINT = requireEnvVar("CHAIN_ENDPOINT");
const CHAIN_ID = requireEnvVar("CHAIN_ID", "11155111");
const EXPIRATION_DURATION_MS = 86400000; // Milliseconds in 24 hours, or 24 * 60 * 60 * 1000

// Global index salt for all tests, e.g. Auth test salts range from 0 to 1000
export const SaltGlobal = {
  Auth: 0,
  CancelWorkflow: 1,
  CreateSecret: 2,
  DeleteWorkflow: 3,
  GetExecutions: 4,
  GetWallet: 5,
  GetWallets: 6,
  GetWorkflow: 7,
  GetWorkflows: 8,
  Secrets: 9,
  TriggerWorkflow: 10,
};

// Get wallet address from private key
export async function getAddress(privateKey: string): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
}

// Generate a signed message from a private key
export async function generateSignature(
  privateKey: string
): Promise<GetKeyRequestSignature> {
  const wallet = new ethers.Wallet(privateKey);

  const keyRequestParams: GetKeyRequestMessage = {
    chainId: _.toNumber(CHAIN_ID),
    address: wallet.address,
    issuedAt: new Date(),
    expiredAt: new Date(new Date().getTime() + EXPIRATION_DURATION_MS),
  };

  const message = getKeyRequestMessage(keyRequestParams);
  const signature = await wallet.signMessage(message);

  return { signature, ...keyRequestParams };
}

// Helper function to generate api key message
export function generateAuthPayloadWithApiKey(
  address: string,
  apiKey: string
): GetKeyRequestApiKey {
  const chainId = _.toNumber(CHAIN_ID);
  const issuedAt = new Date();
  const expiredAt = new Date(Date.now() + EXPIRATION_DURATION_MS);

  return { chainId, address, issuedAt, expiredAt, apiKey };
}

// Helper function to ensure environment variables are defined
export function requireEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];

  if (_.isUndefined(value)) {
    // Use the defaultValue if it's provided
    if (!_.isUndefined(defaultValue)) {
      return defaultValue;
    }

    // Otherwise, configs are seriosuly wrong, throwing an error
    throw new Error(`Required environment variable "${name}" is not set`);
  }
  return value;
}

// Add a workflow to the list of created workflows for cleanup, or removal later
export const queueForRemoval = (
  workflowIds: Map<string, boolean>,
  createdIds: string | string[]
) => {
  const ids = Array.isArray(createdIds) ? createdIds : [createdIds];

  ids.forEach((id) => {
    if (workflowIds.has(id)) {
      return;
    }

    workflowIds.set(id, false);
  });
};

// Add a workflow to the list of created workflows for cleanup, or removal later
export const submitWorkflowAndQueueForRemoval = async (
  client: Client,
  data: WorkflowProps,
  createdIdMap: Map<string, boolean>
) => {
  const workflowId = await client.submitWorkflow(client.createWorkflow(data));

  queueForRemoval(createdIdMap, workflowId);

  return workflowId;
};

// Remove all workflows from the list of created workflows
export const removeCreatedWorkflows = async (
  client: Client,
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
        const foundWorkflow = await client.getWorkflow(workflowId);

        if (foundWorkflow) {
          await client.deleteWorkflow(workflowId);
        }
      } catch (error) {
        console.warn(
          `Found workflowId ${workflowId} but failed to delete it during cleanup.`,
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

export const cleanupWorkflows = async (
  client: Client,
  smartWalletAddress: string
) => {
  const workflowArray = await client.getWorkflows([smartWalletAddress], {
    limit: 1000,
  });

  // Filter out undefined ids and convert the array to a Map
  const workflowIds = new Map(
    workflowArray.result
      .filter((item) => item.id !== undefined)
      .map((item) => [item.id as string, false])
  );

  await removeCreatedWorkflows(client, workflowIds);
};

// Compare the expected and actual workflow results; usually called after getWorkflow()
export const compareResults = (
  expected: WorkflowProps,
  actual: Workflow
): void => {
  expect(actual).toBeDefined();
  expect(actual.smartWalletAddress).toEqual(expected.smartWalletAddress);
  expect(actual.trigger.id).toEqual(expected.trigger.id);
  expect(actual.trigger.type).toEqual(expected.trigger.type);
  expect(actual.trigger.name).toEqual(expected.trigger.name);

  console.log("actual.trigger.data", actual.trigger.data);
  console.log("expected.trigger.data", expected.trigger.data);
  expect(actual.trigger.data).toEqual(expected.trigger.data);
  expect(actual.nodes).toHaveLength(expected.nodes.length);
  expect(actual.edges).toHaveLength(expected.edges.length);
  expect(actual.startAt).toEqual(expected.startAt);
  expect(actual.expiredAt).toEqual(expected.expiredAt);
  expect(actual.maxExecution).toBe(expected.maxExecution);
  expect(actual.status).toBe(expected.status || WorkflowStatus.Active);
  expect(actual.id).toBe(expected.id);
  expect(actual.owner).toBe(expected.owner);
};

export const compareListResults = (
  expected: WorkflowProps,
  actual: Workflow[]
): void => {
  _.each(actual, (workflow) => {
    expect(workflow.owner).toBe(expected.owner);
    expect(workflow.smartWalletAddress).toEqual(expected.smartWalletAddress);
    expect(workflow.trigger.type).toEqual(expected.trigger.type);
    expect(workflow.startAt).toEqual(expected.startAt);
    expect(workflow.expiredAt).toEqual(expected.expiredAt);
    expect(workflow.maxExecution).toBe(expected.maxExecution);
    expect(workflow.status).toBe(expected.status);
    expect(typeof workflow.id).toBe("string");
    expect(typeof workflow.totalExecution).toBe("number");
    expect(typeof workflow.lastRanAt).toBe("number");
  });
};

/**
 * Generate a unique id for each node or branch condition; currently we are using id128 for sortable ulid
 * @returns string
 */
export const getNextId = (): string => UlidMonotonic.generate().toCanonical();

/**
 * Get the current block number from the chain endpoint
 * @returns number
 */
export const getBlockNumber = async (): Promise<number> => {
  const chainEndpoint = requireEnvVar("CHAIN_ENDPOINT");
  const provider = new ethers.JsonRpcProvider(chainEndpoint);
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
};

export const getChainId = async (): Promise<number> => {
  const provider = new ethers.JsonRpcProvider(CHAIN_ENDPOINT);
  const network = await provider.getNetwork();

  console.log("getChainId network:", network);
  return Number(network.chainId);
};
