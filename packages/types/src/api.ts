import { NodeProps } from "./node";
import { TriggerProps } from "./trigger";
import { EdgeProps } from "./workflow";

export interface GetWalletRequest {
  salt: string;
  factoryAddress?: string;
}

export interface ClientOption {
  endpoint: string;
  factoryAddress?: string;
  timeout?: TimeoutConfig;
}

/**
 * Timeout configuration options for gRPC requests
 */
export interface TimeoutConfig {
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Maximum number of retry attempts (default: 3) */
  retries?: number;
  /** Delay between retries in milliseconds (default: 1000) */
  retryDelay?: number;
}

/**
 * Predefined timeout presets for common use cases
 */
export const TimeoutPresets = {
  /** 5s timeout, 2 retries, 500ms delay - for quick operations */
  FAST: { timeout: 5000, retries: 2, retryDelay: 500 } as TimeoutConfig,
  /** 30s timeout, 3 retries, 1s delay - for normal operations */
  NORMAL: { timeout: 30000, retries: 3, retryDelay: 1000 } as TimeoutConfig,
  /** 2min timeout, 2 retries, 2s delay - for heavy operations */
  SLOW: { timeout: 120000, retries: 2, retryDelay: 2000 } as TimeoutConfig,
  /** 30s timeout, no retries - fail-fast for latency-sensitive operations */
  NO_RETRY: { timeout: 30000, retries: 0, retryDelay: 0 } as TimeoutConfig,
} as const;

export interface RequestOptions {
  authKey?: string;
  timeout?: TimeoutConfig;
}

/**
 * Enhanced error with timeout context
 */
export interface TimeoutError extends Error {
  isTimeout: boolean;
  attemptsMade: number;
  methodName: string;
}

export interface GetExecutionsOptions extends RequestOptions {
  before?: string;
  after?: string;
  limit?: number;
}
export interface GetWorkflowsOptions extends RequestOptions {
  before?: string;
  after?: string;
  limit?: number;
  includeNodes?: boolean;
  includeEdges?: boolean;
}
export interface GetSecretsOptions extends RequestOptions {
  workflowId?: string;
  orgId?: string;
  before?: string;
  after?: string;
  limit?: number;
  // Field control options for flexible response content
  includeTimestamps?: boolean; // Include created_at and updated_at fields
  includeCreatedBy?: boolean; // Include created_by field
  includeDescription?: boolean; // Include description field
}
export interface SecretOptions extends RequestOptions {
  name: string;
  value: string;
  workflowId?: string;
  orgId?: string;
}

// New structured response types based on updated proto definitions
export interface CreateSecretResponse {
  success: boolean;
  status: string; // "created", "already_exists", "error"
  message: string;
  createdAt?: number; // Unix timestamp when secret was created
  secretName: string;
  scope: string; // "user", "workflow", "org"
}

export interface UpdateSecretResponse {
  success: boolean;
  status: string; // "updated", "not_found", "error"
  message: string;
  updatedAt?: number; // Unix timestamp when secret was updated
  secretName: string;
  scope: string; // "user", "workflow", "org"
}

export interface DeleteSecretResponse {
  success: boolean;
  status: string; // "deleted", "not_found", "already_deleted"
  message: string;
  deletedAt?: number; // Unix timestamp when secret was deleted
  secretName: string;
  scope: string; // "user", "workflow", "org"
}

export interface CancelTaskResponse {
  success: boolean;
  status: string; // "cancelled", "not_found", "already_cancelled", "cannot_cancel"
  message: string;
  cancelledAt?: number; // Unix timestamp when task was cancelled
  id: string;
  previousStatus: string; // Previous status before cancellation
}

export interface DeleteTaskResponse {
  success: boolean;
  status: string; // "deleted", "not_found", "cannot_delete"
  message: string;
  deletedAt?: number; // Unix timestamp when task was deleted
  id: string;
  previousStatus: string; // Previous status before deletion
}

// New execution statistics response
export interface GetExecutionStatsResponse {
  total: number; // Total number of executions
  succeeded: number; // Number of successful executions
  failed: number; // Number of failed executions
  avgExecutionTime: number; // Average execution time in milliseconds
}

export interface GetExecutionStatsOptions extends RequestOptions {
  workflowIds?: string[]; // Optional array of workflow IDs
  days?: number; // Number of days to look back (default: 7)
}

export interface RunNodeWithInputsRequest {
  nodeType: string;
  nodeConfig: Record<string, any>;
  inputVariables?: Record<string, any>;
}

/**
 * Comprehensive type for node output data that handles all possible return types
 * 
 * This type represents the actual data returned by nodes after execution.
 * The data can be:
 * - Primitive values (string, number, boolean, null) - especially from CustomCode nodes
 * - Objects (Record<string, any>) - from REST API responses, structured data
 * - Arrays (any[]) - from Filter nodes, loop results, etc.
 * - null - for empty results (protobuf limitation: cannot be undefined)
 * 
 * Note: Due to protobuf limitations, undefined is not supported and will be converted to null.
 * This type is designed to be compatible with the existing OutputDataProps type used in workflow executions.
 */
export type NodeOutputData = 
  | string 
  | number 
  | boolean 
  | null
  | Record<string, any>
  | any[];

/**
 * Enhanced response type for triggerWorkflow that includes workflowId and optional execution fields
 * 
 * When isBlocking = false:
 * - executionId: string - ID of the execution
 * - status: ExecutionStatus - Will be "pending"
 * - workflowId: string - ID of the workflow
 * - startAt: number - Timestamp when execution started (milliseconds)
 * 
 * When isBlocking = true:
 * - All fields from non-blocking mode plus:
 * - endAt: number - Timestamp when execution ended (milliseconds)
 * - success: boolean - Whether execution was successful
 * - error?: string - Error message if execution failed
 * - steps: ExecutionStep[] - Array of execution steps (same as getExecution response)
 */
export interface TriggerWorkflowResponse {
  executionId: string;
  status: string; // ExecutionStatus as string enum
  workflowId: string;
  startAt?: number;
  endAt?: number;
  success?: boolean;
  error?: string;
  steps?: ExecutionStep[];
}

/**
 * Execution step data structure (matches the structure from getExecution)
 */
export interface ExecutionStep {
  id: string;
  type: string;
  name: string;
  success: boolean;
  error: string;
  log: string;
  inputsList: string[];
  config?: unknown;
  output?: unknown;
  startAt: number;
  endAt: number;
}

/**
 * Comprehensive type for trigger output data that handles all possible return types
 * 
 * This type represents the actual data returned by triggers after execution.
 * The data can be:
 * - Primitive values (string, number, boolean, null) - from various trigger types
 * - Objects (Record<string, any>) - from structured trigger data
 * - null - for empty results (protobuf limitation: cannot be undefined)
 * 
 * Note: Due to protobuf limitations, undefined is not supported and will be converted to null.
 * This type is designed to be compatible with the existing OutputDataProps type used in workflow executions.
 */
export type TriggerOutputData = 
  | string 
  | number 
  | boolean 
  | null
  | Record<string, any>;

export interface RunNodeWithInputsResponse {
  success: boolean;
  data: NodeOutputData;
  error?: string;
  metadata?: Record<string, any> | any[];
  executionContext?: Record<string, any>;
}

export interface RunTriggerRequest {
  triggerType: string;
  triggerConfig: Record<string, any>;
}

export interface RunTriggerResponse {
  success: boolean;
  data: TriggerOutputData;
  error?: string;
  metadata?: Record<string, any> | any[];
  executionContext?: Record<string, any>;
}

export interface SimulateWorkflowRequest {
  trigger: TriggerProps;
  nodes: Array<NodeProps>;
  edges: Array<EdgeProps>;
  inputVariables?: Record<string, any>;
}

// Withdraw funds request interface
export interface WithdrawFundsRequest {
  recipientAddress: string;
  amount: string; // Amount in wei for ETH or smallest token unit for ERC20
  token: string; // "ETH" for native ETH, or contract address for ERC20 tokens
  smartWalletAddress: string; // Required: Smart wallet address to withdraw from (must be from user's getWallet() call)
}

// Withdraw funds response interface
export interface WithdrawFundsResponse {
  success: boolean; // Whether the operation completed successfully
  status: string; // Status description: "pending", "submitted", "failed"
  message: string; // Human-readable message about what happened
  userOpHash?: string; // UserOperation hash from bundler
  transactionHash?: string; // Blockchain transaction hash (if available)
  submittedAt?: number; // Unix timestamp when UserOp was submitted
  smartWalletAddress: string; // Smart wallet address used for withdrawal
  recipientAddress: string; // Recipient address
  amount: string; // Amount withdrawn
  token: string; // Token type (ETH or contract address)
}
