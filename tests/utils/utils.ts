import { Client, Workflow, Step } from "@avaprotocol/sdk-js";
import { WorkflowProps, StepProps } from "@avaprotocol/types";
import { GetKeyRequestApiKey, WorkflowStatus } from "@avaprotocol/types";

import { ethers } from "ethers";
import { UlidMonotonic } from "id128";
import _ from "lodash";
import { inspect } from "util";

// Lazy-load configuration to handle CI/CD environments gracefully
function getTestConfig() {
  try {
    const { getConfig } = require("./envalid");
    return getConfig();
  } catch (error) {
    console.warn(
      "⚠️ Environment validation failed in utils, using mock config:",
      error
    );
    // Return mock config for CI/CD or when real credentials aren't available
    return {
      avsEndpoint: "localhost:2206",
      chainEndpoint: "https://mock-chain-endpoint.com",
      chainId: "1",
    };
  }
}

const EXPIRATION_DURATION_MS = 86400000; // Milliseconds in 24 hours, or 24 * 60 * 60 * 1000
export const TIMEOUT_DURATION = 15000; // 15 seconds

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
  CreateWorkflow: 11,
  Step: 12,
  GetExecution: 13,
  RestAPITest: 18,
  Pagination: 14,
};

// Get wallet address from private key
export async function getAddress(privateKey: string): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
}

// Generate a signed message from a private key
export async function generateSignature(
  message: string,
  privateKey: string
): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  const signature = await wallet.signMessage(message);
  return signature;
}

// Helper function to generate api key message
export async function generateAuthPayloadWithApiKey(
  address: string,
  apiKey: string
): Promise<GetKeyRequestApiKey> {
  try {
    const config = getTestConfig();
    const client = new Client({
      endpoint: config.avsEndpoint,
    });

    const { message } = await client.getSignatureFormat(address);
    return { message, apiKey };
  } catch (error) {
    console.warn("GetSignatureFormat not available, using fallback format");
    const config = getTestConfig();
    const now = Date.now();
    const message = `Please sign the below text for ownership verification.

URI: https://app.avaprotocol.org
Chain ID: ${_.toNumber(config.chainId)}
Version: 1
Issued At: ${new Date(now).toISOString()}
Expire At: ${new Date(now + EXPIRATION_DURATION_MS).toISOString()}
Wallet: ${address}`;

    return { message, apiKey };
  }
}

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
    workflowArray.items
      .filter((item: any) => item.id !== undefined)
      .map((item: any) => [item.id as string, false])
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
    expect(typeof workflow.executionCount).toBe("number");
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
  const config = getTestConfig();
  const provider = new ethers.JsonRpcProvider(config.chainEndpoint);
  try {
    // Set a 5 second timeout for the connection
    const blockNumber = await Promise.race<number>([
      provider.getBlockNumber(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Provider connection timeout")), 5000)
      ),
    ]);
    return blockNumber;
  } catch (error: any) {
    throw new Error(
      `Failed to get block number: ${error?.message || "Unknown error"}`
    );
  }
};

export const getChainId = async (): Promise<number> => {
  const config = getTestConfig();
  const provider = new ethers.JsonRpcProvider(config.chainEndpoint);
  try {
    // Set a 5 second timeout for the connection
    const network = await Promise.race<ethers.Network>([
      provider.getNetwork(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Provider connection timeout")), 5000)
      ),
    ]);
    return Number(network.chainId);
  } catch (error: any) {
    throw new Error(
      `Failed to get chain ID: ${error?.message || "Unknown error"}`
    );
  }
};

export const verifyExecutionStepResults = (
  expected: StepProps,
  actual: Step
): void => {
  // Verify basic properties
  expect(actual).toBeDefined();
  expect(actual.id).toBe(expected.id);
  expect(actual.success).toBe(expected.success);
  expect(actual.log).toBe(expected.log);
  expect(actual.error).toBe(expected.error);
  expect(actual.startAt).toBe(expected.startAt);
  expect(actual.endAt).toBe(expected.endAt);

  // Verify inputsList
  expect(Array.isArray(actual.inputsList)).toBe(true);
  expect(actual.inputsList.length).toBe(expected.inputsList.length);
  actual.inputsList.forEach((input, index) => {
    expect(input).toBe(expected.inputsList[index]);
  });

  // Verify output
  expect(actual.output).toBeDefined();
  // The output type can vary based on the node type, so we just verify it exists
  // and matches the expected output
  expect(actual.output).toEqual(expected.output);
};

// Remove all secrets from the list of created secrets
export const removeCreatedSecrets = async (
  client: Client,
  secretNames: Map<string, boolean>
): Promise<void> => {
  await Promise.all(
    Array.from(secretNames.entries()).map(async ([secretName, isDeleting]) => {
      // Prevent re-entry with the same secret name
      if (isDeleting) {
        return;
      }

      secretNames.set(secretName, true);

      try {
        await client.deleteSecret(secretName);
      } catch (error) {
        console.warn(
          `Found secret ${secretName} but failed to delete it during cleanup.`,
          (error as Error).message
        );
      } finally {
        secretNames.delete(secretName);
      }
    })
  );

  if (secretNames.size > 0) {
    console.warn(
      "After deleting secrets. The remaining secret names:",
      secretNames
    );
  }
};

export const cleanupSecrets = async (client: Client) => {
  try {
    const secretsResponse = await client.getSecrets({ limit: 1000 });
    const secretItems = Array.isArray(secretsResponse)
      ? secretsResponse
      : secretsResponse.items || [];

    // Only cleanup secrets that look like test secrets (have test prefixes)
    const testSecretPrefixes = [
      "dummysecret_",
      "testdup",
      "delete_",
      "abc_",
      "def_",
      "paged_",
      "secret_name",
      "test_debug_",
    ];

    const testSecrets = secretItems.filter((item) =>
      testSecretPrefixes.some((prefix) => item.name.startsWith(prefix))
    );

    if (testSecrets.length > 0) {
      const secretNames = new Map(
        testSecrets.map((item) => [item.name, false])
      );
      await removeCreatedSecrets(client, secretNames);
    }
  } catch (error) {
    console.warn("Failed to cleanup secrets:", (error as Error).message);
  }
};
