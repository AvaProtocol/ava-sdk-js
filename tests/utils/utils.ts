import { Client, Workflow, Step } from "@avaprotocol/sdk-js";
import { WorkflowProps, StepProps } from "@avaprotocol/types";
import { GetKeyRequestApiKey, WorkflowStatus } from "@avaprotocol/types";

import { ethers } from "ethers";
import { UlidMonotonic } from "id128";
import _ from "lodash";
import { getConfig } from "./envalid";

const config = getConfig();

// Chain ID constants for reliable chain detection
export const CHAIN_IDS = {
  ETHEREUM: 1,
  SEPOLIA: 11155111,
  BASE: 8453,
  BASE_SEPOLIA: 84532,
  BSC: 56,
  BSC_TESTNET: 97,
  SONEIUM: 1868,
  SONEIUM_MINATO: 1946,
} as const;

// Dynamic chain detection functions for different networks
export const describeIfChain = (targetChainId: number) => {
  const currentChainId = parseInt(config.chainId);
  return currentChainId === targetChainId ? describe : describe.skip;
};

// Convenience functions for specific chains
export const describeIfSepolia = describeIfChain(CHAIN_IDS.SEPOLIA);
export const describeIfEthereum = describeIfChain(CHAIN_IDS.ETHEREUM);
export const describeIfBase = describeIfChain(CHAIN_IDS.BASE);
export const describeIfBaseSepolia = describeIfChain(CHAIN_IDS.BASE_SEPOLIA);

// Helper function to get current chain info
export const getCurrentChain = () => {
  const currentChainId = parseInt(config.chainId);
  const chainName =
    Object.entries(CHAIN_IDS).find(([, id]) => id === currentChainId)?.[0] ||
    "UNKNOWN";
  return { chainId: currentChainId, chainName };
};

// Convert chain ID to chain name (lowercase with hyphens for testnets)
export const getChainNameFromId = (chainId: number): string => {
  const chainMap: Record<number, string> = {
    1: "ethereum",
    11155111: "sepolia",
    8453: "base",
    84532: "base-sepolia",
    56: "bsc",
    97: "bsc-testnet",
    1868: "soneium",
    1946: "soneium-minato",
  };
  return chainMap[chainId] || `chain-${chainId}`;
};

// Helper to create minimal inputVariables.settings for workflows
export const getSettings = (
  runner: string
): { runner: string; chain_id: number; chain: string } => {
  const chainId = parseInt(config.chainId);
  return {
    runner,
    chain_id: chainId,
    chain: getChainNameFromId(chainId),
  };
};

const EXPIRATION_DURATION_MS = 86400000; // Milliseconds in 24 hours, or 24 * 60 * 60 * 1000
export const TIMEOUT_DURATION = 60000; // 60 seconds to reduce flaky timeouts

// Salt bucket size per suite to ensure total salts < 2000
export const SALT_BUCKET_SIZE = 20;

// Test addresses
export const TEST_SMART_WALLET_ADDRESS =
  "0x6C6244dFd5d0bA3230B6600bFA380f0bB4E8AC49"; // User's test smart wallet with ETH and USDC on Sepolia
export const MOCK_FAILURE_ADDRESS =
  "0x0000000000000000000000000000000000000001"; // Mock address for failure tests

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
  SimulateWorkflow: 15,
  // New suite-specific buckets
  BranchNode: 19,
  CronTrigger: 20,
  BlockTrigger: 21,
  GraphQLQuery: 22,
  RestAPI: 23,
  FilterNode: 24,
  CustomCode: 25,
  ContractRead: 26,
  ContractWrite: 27,
  StepInput: 28,
  TelegramTemplate: 29,
  EventTrigger: 30,
  ManualTrigger: 31,
  LoopNode: 32,
  ExportedWorkflow: 33,
  Withdraw: 34,
  ExecutionIndex: 35,
  Balance: 36,
  RunNodeWithInputs: 37,
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
    const client = new Client({
      endpoint: config.avsEndpoint,
    });

    const { message } = await client.getSignatureFormat(address);
    return { message, apiKey };
  } catch (_error) {
    console.warn("GetSignatureFormat not available, using fallback format");
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
      .filter((item: { id?: string }) => item.id !== undefined)
      .map((item: { id?: string }) => [item.id as string, false])
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
  const provider = new ethers.JsonRpcProvider(config.chainEndpoint);
  try {
    // Set a 15 second timeout for the connection (increased from 5s to handle slower RPC endpoints)
    const blockNumber = await Promise.race<number>([
      provider.getBlockNumber(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Provider connection timeout after 15s")), 15000)
      ),
    ]);
    return blockNumber;
  } catch (error: unknown) {
    const errorMessage = (error as { message?: string })?.message || "Unknown error";
    throw new Error(
      `Failed to get block number from ${config.chainEndpoint}: ${errorMessage}`
    );
  } finally {
    // Clean up provider connection
    provider.destroy();
  }
};

export const getChainId = async (): Promise<number> => {
  const provider = new ethers.JsonRpcProvider(config.chainEndpoint);
  try {
    // Set a 15 second timeout for the connection (increased from 5s to handle slower RPC endpoints)
    const network = await Promise.race<ethers.Network>([
      provider.getNetwork(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Provider connection timeout after 15s")), 15000)
      ),
    ]);
    return Number(network.chainId);
  } catch (error: unknown) {
    const errorMessage = (error as { message?: string })?.message || "Unknown error";
    throw new Error(
      `Failed to get chain ID from ${config.chainEndpoint}: ${errorMessage}`
    );
  } finally {
    // Clean up provider connection
    provider.destroy();
  }
};

// ===== Test helpers for blockchain write success/failure checks =====

type ReceiptLike = { status?: string } | null | undefined;
type MethodMetadataLike =
  | { success?: boolean; receipt?: ReceiptLike }
  | null
  | undefined;

/**
 * Return true if any metadata item indicates a failed write
 * (success === false or receipt.status === "0x0").
 */
export function hasWriteFailureFromMetadata(metadata: unknown): boolean {
  if (!Array.isArray(metadata)) return false;
  return (metadata as MethodMetadataLike[]).some(
    (m) =>
      !!m && (m.success === false || (m.receipt && m.receipt.status === "0x0"))
  );
}

/** Return true if every metadata item indicates a successful write. */
export function metadataIndicatesAllWritesSuccessful(
  metadata: unknown
): boolean {
  if (!Array.isArray(metadata)) return true;
  return (metadata as MethodMetadataLike[]).every(
    (m) =>
      !!m && m.success === true && (!m.receipt || m.receipt.status === "0x1")
  );
}

/** Return true if the given result object has metadata and it indicates all writes succeeded. */
export function resultIndicatesAllWritesSuccessful(
  result: { metadata?: unknown } | null | undefined
): boolean {
  if (!result || result.metadata === undefined) return true;
  return metadataIndicatesAllWritesSuccessful(result.metadata);
}

/** Return true if a step has metadata that indicates a failed write. */
export function stepIndicatesWriteFailure(
  step: { metadata?: unknown } | null | undefined
): boolean {
  if (!step || step.metadata === undefined) return false;
  return hasWriteFailureFromMetadata(step.metadata);
}

/**
 * Return true if any ContractWrite step in an execution indicates a failed write.
 */
export function executionHasWriteFailure(
  execution:
    | { steps?: Array<{ type?: string; metadata?: unknown }> }
    | null
    | undefined
): boolean {
  if (!execution || !Array.isArray(execution.steps)) return false;
  return execution.steps
    .filter((s) => s && s.type === "contractWrite")
    .some((s) => hasWriteFailureFromMetadata(s.metadata));
}

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

export const USDC_Implementation_ABI = [
  {
    name: "Approval",
    type: "event",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "AuthorizationCanceled",
    type: "event",
    inputs: [
      {
        name: "authorizer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nonce",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    name: "AuthorizationUsed",
    type: "event",
    inputs: [
      {
        name: "authorizer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nonce",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    name: "Blacklisted",
    type: "event",
    inputs: [
      {
        name: "_account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "BlacklisterChanged",
    type: "event",
    inputs: [
      {
        name: "newBlacklister",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "Burn",
    type: "event",
    inputs: [
      {
        name: "burner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "MasterMinterChanged",
    type: "event",
    inputs: [
      {
        name: "newMasterMinter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "Mint",
    type: "event",
    inputs: [
      {
        name: "minter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "MinterConfigured",
    type: "event",
    inputs: [
      {
        name: "minter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "minterAllowedAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "MinterRemoved",
    type: "event",
    inputs: [
      {
        name: "oldMinter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "OwnershipTransferred",
    type: "event",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { name: "Pause", type: "event", inputs: [], anonymous: false },
  {
    name: "PauserChanged",
    type: "event",
    inputs: [
      {
        name: "newAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "RescuerChanged",
    type: "event",
    inputs: [
      {
        name: "newRescuer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    name: "Transfer",
    type: "event",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    name: "UnBlacklisted",
    type: "event",
    inputs: [
      {
        name: "_account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { name: "Unpause", type: "event", inputs: [], anonymous: false },
  {
    name: "CANCEL_AUTHORIZATION_TYPEHASH",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    name: "DOMAIN_SEPARATOR",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    name: "PERMIT_TYPEHASH",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    name: "RECEIVE_WITH_AUTHORIZATION_TYPEHASH",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    name: "TRANSFER_WITH_AUTHORIZATION_TYPEHASH",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    name: "allowance",
    type: "function",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "approve",
    type: "function",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    name: "authorizationState",
    type: "function",
    inputs: [
      {
        name: "authorizer",
        type: "address",
        internalType: "address",
      },
      { name: "nonce", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    name: "balanceOf",
    type: "function",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "blacklist",
    type: "function",
    inputs: [
      {
        name: "_account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "blacklister",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    name: "burn",
    type: "function",
    inputs: [{ name: "_amount", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "cancelAuthorization",
    type: "function",
    inputs: [
      {
        name: "authorizer",
        type: "address",
        internalType: "address",
      },
      { name: "nonce", type: "bytes32", internalType: "bytes32" },
      { name: "v", type: "uint8", internalType: "uint8" },
      { name: "r", type: "bytes32", internalType: "bytes32" },
      { name: "s", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "cancelAuthorization",
    type: "function",
    inputs: [
      {
        name: "authorizer",
        type: "address",
        internalType: "address",
      },
      { name: "nonce", type: "bytes32", internalType: "bytes32" },
      { name: "signature", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "configureMinter",
    type: "function",
    inputs: [
      { name: "minter", type: "address", internalType: "address" },
      {
        name: "minterAllowedAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    name: "currency",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    name: "decimals",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view",
  },
  {
    name: "decreaseAllowance",
    type: "function",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      {
        name: "decrement",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    name: "increaseAllowance",
    type: "function",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      {
        name: "increment",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    name: "initialize",
    type: "function",
    inputs: [
      { name: "tokenName", type: "string", internalType: "string" },
      {
        name: "tokenSymbol",
        type: "string",
        internalType: "string",
      },
      {
        name: "tokenCurrency",
        type: "string",
        internalType: "string",
      },
      {
        name: "tokenDecimals",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "newMasterMinter",
        type: "address",
        internalType: "address",
      },
      {
        name: "newPauser",
        type: "address",
        internalType: "address",
      },
      {
        name: "newBlacklister",
        type: "address",
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "initializeV2",
    type: "function",
    inputs: [{ name: "newName", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "initializeV2_1",
    type: "function",
    inputs: [
      {
        name: "lostAndFound",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "initializeV2_2",
    type: "function",
    inputs: [
      {
        name: "accountsToBlacklist",
        type: "address[]",
        internalType: "address[]",
      },
      { name: "newSymbol", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "isBlacklisted",
    type: "function",
    inputs: [
      {
        name: "_account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    name: "isMinter",
    type: "function",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    name: "masterMinter",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    name: "mint",
    type: "function",
    inputs: [
      { name: "_to", type: "address", internalType: "address" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    name: "minterAllowance",
    type: "function",
    inputs: [{ name: "minter", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "name",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    name: "nonces",
    type: "function",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "owner",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    name: "pause",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "paused",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    name: "pauser",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    name: "permit",
    type: "function",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "signature", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "permit",
    type: "function",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "v", type: "uint8", internalType: "uint8" },
      { name: "r", type: "bytes32", internalType: "bytes32" },
      { name: "s", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "receiveWithAuthorization",
    type: "function",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
      {
        name: "validAfter",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "validBefore",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "nonce", type: "bytes32", internalType: "bytes32" },
      { name: "signature", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "receiveWithAuthorization",
    type: "function",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
      {
        name: "validAfter",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "validBefore",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "nonce", type: "bytes32", internalType: "bytes32" },
      { name: "v", type: "uint8", internalType: "uint8" },
      { name: "r", type: "bytes32", internalType: "bytes32" },
      { name: "s", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "removeMinter",
    type: "function",
    inputs: [{ name: "minter", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    name: "rescueERC20",
    type: "function",
    inputs: [
      {
        name: "tokenContract",
        type: "address",
        internalType: "contract IERC20",
      },
      { name: "to", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "rescuer",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    name: "symbol",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    name: "totalSupply",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "transfer",
    type: "function",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    name: "transferFrom",
    type: "function",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    name: "transferOwnership",
    type: "function",
    inputs: [
      {
        name: "newOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "transferWithAuthorization",
    type: "function",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
      {
        name: "validAfter",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "validBefore",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "nonce", type: "bytes32", internalType: "bytes32" },
      { name: "signature", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "transferWithAuthorization",
    type: "function",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
      {
        name: "validAfter",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "validBefore",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "nonce", type: "bytes32", internalType: "bytes32" },
      { name: "v", type: "uint8", internalType: "uint8" },
      { name: "r", type: "bytes32", internalType: "bytes32" },
      { name: "s", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "unBlacklist",
    type: "function",
    inputs: [
      {
        name: "_account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "unpause",
    type: "function",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "updateBlacklister",
    type: "function",
    inputs: [
      {
        name: "_newBlacklister",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "updateMasterMinter",
    type: "function",
    inputs: [
      {
        name: "_newMasterMinter",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "updatePauser",
    type: "function",
    inputs: [
      {
        name: "_newPauser",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "updateRescuer",
    type: "function",
    inputs: [
      {
        name: "newRescuer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "version",
    type: "function",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "pure",
  },
];
