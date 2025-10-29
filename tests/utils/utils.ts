import { Client, Workflow, Step } from "@avaprotocol/sdk-js";
import { WorkflowProps, StepProps, AbiElement } from "@avaprotocol/types";
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

export const MOCK_FAILURE_ADDRESS =
  "0x0000000000000000000000000000000000000001"; // Mock address for failure tests

// Funded smart wallet salt for integration tests
// This wallet is pre-funded with ETH and USDC using the newest smart wallet implementation
export const FUNDED_WALLET_SALT = "2";

// Salt counter map to track unique wallet generation per test suite
// Key: SaltGlobal enum value, Value: current counter for that suite
const saltCounters = new Map<number, number>();

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

// Mapping from test file names to their starting salt index
// This allows auto-detection of salt range based on the calling test file
// Each file gets SALT_BUCKET_SIZE (20) unique salts
const fileToStartIndex: Record<string, number> = {
  // Core tests (0-19)
  "auth.test.ts": 0,
  // Workflow tests (20-239)
  "cancelWorkflow.test.ts": 20,
  "secret.test.ts": 40,
  "deleteWorkflow.test.ts": 60,
  "getExecutions.test.ts": 80,
  "wallet.test.ts": 100,
  "getWorkflow.test.ts": 140,
  "workflow.test.ts": 160,
  "triggerWorkflow.test.ts": 200,
  "createWorkflow.test.ts": 220,
  "getExecution.test.ts": 260,
  "simulateWorkflow.test.ts": 300,
  // Node tests (380-739)
  "branchNode.test.ts": 380,
  "cron.test.ts": 400,
  "block.test.ts": 420,
  "graphqlQuery.test.ts": 440,
  "RestAPi.test.ts": 460,
  "filterNode.test.ts": 480,
  "customCode.test.ts": 500,
  "contractRead.test.ts": 520,
  "contractWrite.test.ts": 540,
  "stepInput.test.ts": 560,
  "loopNode.test.ts": 640,
  "balanceNode.test.ts": 720,
  // Template tests (580-599)
  "telegram-alert-on-transfer.test.ts": 580,
  "exported-workflow-consistency.test.ts": 660,
  "unipswapv3_stoploss.test.ts": 780,
  // Trigger tests (600-639)
  "eventTrigger.test.ts": 600,
  "manual.test.ts": 620,
  // Execution tests (680-719)
  "withdraw.test.ts": 680,
  "execution.test.ts": 700,
  "runNodeWithInputs.test.ts": 740,
  "errorCodeConsistency.test.ts": 760,
  "inputVariables.test.ts": 220, // Shares with createWorkflow
  "partialSuccess.test.ts": 700, // Shares with execution
  "gasTracking.test.ts": 540, // Shares with contractWrite
};

/**
 * Get the EOA (Externally Owned Account) address for testing.
 * Uses the TEST_PRIVATE_KEY from environment configuration.
 *
 * @returns EOA wallet address
 *
 * @example
 * const eoaAddress = await getEOAAddress();
 * // Returns the address derived from TEST_PRIVATE_KEY
 */
export async function getEOAAddress(privateKey?: string): Promise<string> {
  const wallet = new ethers.Wallet(privateKey || config.walletPrivateKey);
  return wallet.address;
}

/**
 * Check if a string is a template variable in the format {{variable.path}}.
 * Template variables are used for dynamic value substitution in workflows.
 *
 * @param value - The string to validate as a template variable
 * @returns true if the string matches the template variable pattern, false otherwise
 *
 * @example
 * isTemplateVariable("{{settings.runner}}") // true
 * isTemplateVariable("{{workflow.id}}") // true
 * isTemplateVariable("{{execution.input}}") // true
 * isTemplateVariable("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb") // false
 * isTemplateVariable("normal string") // false
 * isTemplateVariable("") // false
 * isTemplateVariable(null) // false
 */
export function isTemplateVariable(value: string): boolean {
  // Match template variable pattern: {{anything}}
  // More strict: {{word.word}} or {{word.word.word}} etc.
  const templateVarPattern =
    /^\{\{[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)+\}\}$/;
  return templateVarPattern.test(value);
}

/**
 * Pad an Ethereum address to 32 bytes for use in event topic filtering.
 * Ethereum event topics for indexed address parameters must be 32 bytes (64 hex characters).
 *
 * @param address - The Ethereum address to pad (with or without 0x prefix)
 * @returns Padded address as 32-byte hex string (0x + 64 hex chars)
 *
 * @example
 * padAddressForTopic("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb")
 * // Returns: "0x000000000000000000000000742d35cc6634c0532925a3b844bc9e7595f0beb"
 *
 * @example
 * padAddressForTopic("")
 * // Returns: "0x0000000000000000000000000000000000000000000000000000000000000000"
 */
export function padAddressForTopic(address: string): string {
  if (!address) {
    return "0x" + "0".repeat(64);
  }
  const cleanAddress = address.startsWith("0x") ? address.slice(2) : address;
  return "0x" + cleanAddress.toLowerCase().padStart(64, "0");
}

/**
 * Create a new Client instance with the AVS endpoint from configuration.
 * The client is not authenticated by default - call authenticateClient() separately.
 *
 * @returns A new Client instance configured with the AVS endpoint
 *
 * @example
 * const client = getClient();
 * await authenticateClient(client);
 */
export function getClient(): Client {
  return new Client({
    endpoint: config.aggregatorEndpoint,
  });
}

/**
 * Authenticate a client with signature using the test private key.
 * Handles the entire authentication flow: getSignatureFormat → sign → authWithSignature.
 *
 * @param client - Client instance to authenticate
 * @returns Authenticated client with authKey set
 *
 * @example
 * const client = new Client({ endpoint: aggregatorEndpoint });
 * await authenticateClient(client);
 * // Client is now authenticated and ready to use
 */
export async function authenticateClient(
  client: Client,
  privateKey?: string
): Promise<void> {
  const signingKey = privateKey || config.walletPrivateKey;
  const eoaAddress = await getEOAAddress(signingKey);

  const { message } = await client.getSignatureFormat(eoaAddress);
  const signature = await generateSignature(message, signingKey);
  const res = await client.authWithSignature({ message, signature });
  client.setAuthKey(res.authKey);
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

/**
 * Get a smart wallet with balance (ETH and USDC) for testing transactions.
 * Uses salt "2" which is pre-funded with the newest smart wallet implementation.
 *
 * @param client - Authenticated Client instance
 * @returns Smart wallet object with address and balance
 */
export async function getSmartWalletWithBalance(client: Client) {
  const wallet = await client.getWallet({ salt: FUNDED_WALLET_SALT });
  console.log(`Smart Wallet (salt:${FUNDED_WALLET_SALT}):`, wallet.address);
  return wallet;
}

/**
 * Auto-detect the starting salt index from the calling test file path.
 * Uses Error stack trace to determine which test file is calling this function.
 *
 * @returns The starting salt index for the calling file
 * @throws Error if the calling file cannot be determined or is not mapped
 */
function detectStartIndexFromCaller(): number {
  const stack = new Error().stack || "";
  const stackLines = stack.split("\n");

  // Find the first stack frame that's in a test file (not in utils.ts)
  for (const line of stackLines) {
    // Match file paths in stack trace (handles both Unix and Windows paths)
    const match = line.match(/([^/\\]+\.test\.[tj]s)/);
    if (match) {
      const filename = match[1];
      const startIndex = fileToStartIndex[filename];

      if (startIndex !== undefined) {
        return startIndex;
      }

      throw new Error(
        `Unable to auto-detect salt index for test file: ${filename}. ` +
          `Please add it to fileToStartIndex map in utils.ts or pass startIndex explicitly.`
      );
    }
  }

  throw new Error(
    "Unable to auto-detect salt index from call stack. " +
      "Please pass startIndex explicitly as the second parameter."
  );
}

/**
 * Get a unique smart wallet for testing (unfunded, fresh wallet).
 * Automatically manages salt counters per test file.
 *
 * **Auto-detection**: If called from a test file, automatically detects the starting salt index
 * from the file name (e.g., contractWrite.test.ts → starts at 540).
 *
 * Each file gets SALT_BUCKET_SIZE (20) unique wallets (e.g., 540-559 for contractWrite.test.ts).
 *
 * @param client - Authenticated Client instance
 * @param options - Optional configuration:
 *   - `startIndex`: Override auto-detected start index
 *   - `saltValue`: Use a specific salt value (bypasses auto-increment)
 *   - `authKey`: Use a specific authKey (overrides client.authKey)
 * @returns Smart wallet object with unique address
 *
 * @example
 * // Auto-detection (recommended):
 * const wallet1 = await getSmartWallet(client);
 * const wallet2 = await getSmartWallet(client);
 * // If called from contractWrite.test.ts → uses salts 540, 541, etc.
 *
 * @example
 * // Explicit start index:
 * const wallet = await getSmartWallet(client, { startIndex: 540 });
 *
 * @example
 * // Custom salt value:
 * const wallet = await getSmartWallet(client, { saltValue: "123" });
 *
 * @example
 * // With custom authKey:
 * const wallet = await getSmartWallet(client, { authKey: customAuthKey });
 */
export async function getSmartWallet(
  client: Client,
  options?: {
    startIndex?: number;
    saltValue?: string;
    authKey?: string;
  }
) {
  let salt: string;

  // If saltValue is provided, use it directly
  if (options?.saltValue) {
    salt = options.saltValue;
  } else {
    // Auto-detect start index from calling file if not provided
    const resolvedStartIndex =
      options?.startIndex ?? detectStartIndexFromCaller();

    // Initialize counter for this test file if not exists
    if (!saltCounters.has(resolvedStartIndex)) {
      saltCounters.set(resolvedStartIndex, resolvedStartIndex);
    }

    // Get current index and increment
    const currentIndex = saltCounters.get(resolvedStartIndex)!;
    const nextIndex = currentIndex + 1;

    // Validate we haven't exceeded the bucket size
    const maxIndex = resolvedStartIndex + SALT_BUCKET_SIZE;
    if (nextIndex >= maxIndex) {
      throw new Error(
        `Salt bucket overflow for test file starting at ${resolvedStartIndex}. ` +
          `Max ${SALT_BUCKET_SIZE} wallets per file (${resolvedStartIndex} to ${
            maxIndex - 1
          })`
      );
    }

    saltCounters.set(resolvedStartIndex, nextIndex);
    salt = _.toString(currentIndex);
  }

  // Get wallet with optional authKey
  const wallet = options?.authKey
    ? await client.getWallet({ salt }, { authKey: options.authKey })
    : await client.getWallet({ salt });

  return wallet;
}

/**
 * Reset salt counters for a specific test file or all files.
 * Useful for test isolation or cleanup between test runs.
 *
 * @param startIndex - Optional. If provided, resets only that file's counter.
 *                     If undefined, resets all counters.
 */
export function resetSaltCounters(startIndex?: number) {
  if (startIndex !== undefined) {
    saltCounters.delete(startIndex);
  } else {
    saltCounters.clear();
  }
}

// Helper function to generate api key message
export async function generateAuthPayloadWithApiKey(
  address: string,
  apiKey: string
): Promise<GetKeyRequestApiKey> {
  try {
    const client = new Client({
      endpoint: config.aggregatorEndpoint,
    });

    const { message } = await client.getSignatureFormat(address);
    return { message, apiKey };
  } catch {
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
        setTimeout(
          () => reject(new Error("Provider connection timeout after 15s")),
          15000
        )
      ),
    ]);
    return blockNumber;
  } catch (error: unknown) {
    const errorMessage =
      (error as { message?: string })?.message || "Unknown error";
    throw new Error(
      `Failed to get block number from ${config.chainEndpoint}: ${errorMessage}`
    );
  }
};

export const getChainId = async (): Promise<number> => {
  const provider = new ethers.JsonRpcProvider(config.chainEndpoint);
  try {
    // Set a 15 second timeout for the connection (increased from 5s to handle slower RPC endpoints)
    const network = await Promise.race<ethers.Network>([
      provider.getNetwork(),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(new Error("Provider connection timeout after 15s")),
          15000
        )
      ),
    ]);
    return Number(network.chainId);
  } catch (error: unknown) {
    const errorMessage =
      (error as { message?: string })?.message || "Unknown error";
    throw new Error(
      `Failed to get chain ID from ${config.chainEndpoint}: ${errorMessage}`
    );
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

export const USDC_Implementation_ABI: AbiElement[] = [
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

/**
 * Check if the operator is running and healthy
 * @param operatorEndpoint - The operator endpoint (e.g., "localhost:9010")
 * @returns Promise<boolean> - true if operator is healthy, false otherwise
 */
export async function checkOperatorHealth(
  operatorEndpoint: string
): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    // Try to connect to the operator port - if it's open, the operator is running
    await fetch(`http://${operatorEndpoint}/`, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    // If we get any response (even 404), the operator is running
    return true;
  } catch (error) {
    console.log(`❌ Operator health check failed: ${error}`);
    return false;
  }
}

/**
 * Decorator function to skip tests that require operator if operator is not running
 * @param operatorEndpoint - The operator endpoint to check
 * @returns Jest test decorator
 */
export function describeIfOperatorRunning(operatorEndpoint: string) {
  return async (name: string, fn: () => void | Promise<void>) => {
    const isOperatorHealthy = await checkOperatorHealth(operatorEndpoint);
    if (isOperatorHealthy) {
      console.log(`✅ Operator is running - executing test: ${name}`);
      return describe(name, fn);
    } else {
      console.log(`⚠️  Operator is not running - skipping test: ${name}`);
      return describe.skip(name, fn);
    }
  };
}

/**
 * Get the owner address of a paymaster contract
 * @param paymasterAddress - The paymaster contract address
 * @param provider - Ethers provider instance
 * @returns The owner address
 */
export async function getPaymasterOwner(
  paymasterAddress: string,
  provider: ethers.JsonRpcProvider
): Promise<string> {
  // Paymaster owner() function ABI
  const ownerAbi = ["function owner() view returns (address)"];
  const paymasterContract = new ethers.Contract(
    paymasterAddress,
    ownerAbi,
    provider
  );
  return await paymasterContract.owner();
}

/**
 * Verify a bundler transaction receipt to ensure all internal operations succeeded.
 * For ERC-4337 UserOperations, this checks:
 * - Transaction receipt status is 1 (outer transaction success)
 * - UserOperationEvent success field is true (internal operation success)
 * - No UserOperationRevertReason events (indicates UserOp failure)
 *
 * @param transactionHash - The transaction hash to verify
 * @param provider - Ethers provider instance
 * @returns Object with success status, receipt, and any error details
 */
export async function verifyTransactionReceipt(
  transactionHash: string,
  provider: ethers.JsonRpcProvider
): Promise<{
  success: boolean;
  receipt: ethers.TransactionReceipt | null;
  error?: string;
  revertReason?: string;
  internalSuccess?: boolean;
}> {
  try {
    // Get the transaction receipt
    const receipt = await provider.getTransactionReceipt(transactionHash);

    if (!receipt) {
      return {
        success: false,
        receipt: null,
        error: "Transaction receipt not found",
      };
    }

    // Check basic receipt status (outer transaction)
    if (receipt.status !== 1) {
      return {
        success: false,
        receipt,
        error: `Outer transaction failed with status ${receipt.status}`,
      };
    }

    // ERC-4337 Event signatures
    // UserOperationEvent(bytes32 indexed userOpHash, address indexed sender, address indexed paymaster, uint256 nonce, bool success, uint256 actualGasCost, uint256 actualGasUsed)
    const userOpEventTopic =
      "0x49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f";

    // UserOperationRevertReason(bytes32 indexed userOpHash, address indexed sender, uint256 nonce, bytes revertReason)
    const userOpRevertReasonTopic =
      "0x1c4fada7374c0a9ee8841fc38afe82932dc0f8e69012e927f061a8bae611a201"; // keccak256("UserOperationRevertReason(bytes32,address,uint256,bytes)")

    // Check for UserOperationRevertReason event first
    const revertReasonLog = receipt.logs.find(
      (log) => log.topics[0] === userOpRevertReasonTopic
    );

    if (revertReasonLog) {
      let revertReason = "UserOperation reverted";
      const data = revertReasonLog.data;
      if (data && data.length > 2) {
        revertReason = `UserOperation reverted: ${data.slice(0, 66)}...`;
      }

      return {
        success: false,
        receipt,
        error: "UserOperation reverted within bundler transaction",
        revertReason,
        internalSuccess: false,
      };
    }

    // Check UserOperationEvent for internal transaction success
    const userOpEventLog = receipt.logs.find(
      (log) => log.topics[0] === userOpEventTopic
    );

    if (userOpEventLog) {
      // Decode the success field from the event data
      // Event data structure: nonce (uint256, 32 bytes), success (bool, 32 bytes), actualGasCost (uint256, 32 bytes), actualGasUsed (uint256, 32 bytes)
      const data = userOpEventLog.data;

      if (data && data.length >= 66) {
        // Skip first 2 chars (0x), then skip nonce (64 chars), get success (64 chars)
        const successHex = data.slice(2 + 64, 2 + 64 + 64);
        const internalSuccess = BigInt("0x" + successHex) === 1n;

        if (!internalSuccess) {
          return {
            success: false,
            receipt,
            error:
              "Internal UserOperation failed (success=false in UserOperationEvent)",
            internalSuccess: false,
          };
        }

        return {
          success: true,
          receipt,
          internalSuccess: true,
        };
      }
    }

    // No UserOperation events found - might be a direct transaction or different type
    // In this case, we rely on receipt.status
    return {
      success: true,
      receipt,
    };
  } catch (error: unknown) {
    const errorMessage =
      (error as { message?: string })?.message || "Unknown error";
    return {
      success: false,
      receipt: null,
      error: `Failed to verify transaction: ${errorMessage}`,
    };
  }
}
