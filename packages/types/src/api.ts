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
 * - error?: string - Error message if execution failed
 * - steps: ExecutionStep[] - Array of execution steps (same as getExecution response)
 * 
 * Note: The success field was removed from TriggerTaskResp protobuf.
 * Use status field to determine execution outcome ("success", "failed", "completed", etc.)
 */
export interface TriggerWorkflowResponse {
  executionId: string;
  status: string; // ExecutionStatus as string enum
  workflowId: string;
  startAt?: number;
  endAt?: number;
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
  // Gas tracking fields for blockchain operations (ETH transfer, contract write)
  gasUsed?: string;
  gasPrice?: string;
  totalGasCost?: string;
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
  errorCode?: number;
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
  errorCode?: number;
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

// ==============================================================================
// FEE ESTIMATION TYPES
// ==============================================================================

/**
 * Request for comprehensive fee estimation for workflow deployment
 */
export interface EstimateFeesRequest {
  /** Trigger configuration for the workflow */
  trigger: TriggerProps;
  /** Array of workflow nodes */
  nodes: NodeProps[];
  /** Runner address (smart wallet address) - if not provided, will be extracted from inputVariables */
  runner?: string;
  /** Input variables for the workflow context */
  inputVariables?: Record<string, any>;
  /** Workflow creation timestamp (milliseconds) */
  createdAt: number;
  /** Workflow expiration timestamp (milliseconds) */
  expireAt: number;
}

/**
 * Comprehensive fee estimation response with detailed breakdown
 */
export interface EstimateFeesResponse {
  /** Whether the fee estimation was successful */
  success: boolean;
  /** Error message if estimation failed */
  error?: string;
  /** Error code if estimation failed */
  errorCode?: string;
  
  /** Gas fees for blockchain operations */
  gasFees?: GasFeeBreakdown;
  /** Automation/monitoring fees based on trigger type */
  automationFees?: AutomationFee;
  /** Smart wallet creation fees (if needed) */
  creationFees?: SmartWalletCreationFee;
  
  /** Total fees before discounts */
  totalFees?: FeeAmount;
  /** Applied discounts */
  discounts?: Discount[];
  /** Total discount amount */
  totalDiscounts?: FeeAmount;
  /** Final total after discounts */
  finalTotal?: FeeAmount;
  
  /** When the estimation was performed (milliseconds) */
  estimatedAt?: number;
  /** Chain ID where the workflow will be deployed */
  chainId?: string;
  /** Source of price data ("moralis", "fallback") */
  priceDataSource?: string;
  /** Age of price data in seconds */
  priceDataAgeSeconds?: number;
  
  /** Warnings about estimation accuracy */
  warnings?: string[];
  /** Recommendations for cost optimization */
  recommendations?: string[];
}

/**
 * Fee amount in multiple formats (native token + USD + AP token)
 */
export interface FeeAmount {
  /** Amount in native token wei (e.g., ETH wei) */
  nativeTokenAmount: string;
  /** Native token symbol (ETH, etc.) */
  nativeTokenSymbol: string;
  /** USD amount (formatted string with 6 decimals) */
  usdAmount: string;
  /** AP token amount (future feature, currently "0") */
  apTokenAmount: string;
}

/**
 * Gas fee breakdown for blockchain operations
 */
export interface GasFeeBreakdown {
  /** Individual gas fees per node */
  nodeGasFees: NodeGasFee[];
  /** Total gas cost across all nodes */
  totalGasCost: FeeAmount;
  /** Whether the estimation is accurate or fallback */
  estimationAccurate: boolean;
  /** Method used for estimation ("rpc_estimate", "tenderly_simulation", "fallback") */
  estimationMethod: string;
  /** Average gas price used (gwei) */
  averageGasPrice: string;
  /** Notes about the estimation */
  notes?: string[];
}

/**
 * Gas fee for a single node/operation
 */
export interface NodeGasFee {
  /** Node ID */
  nodeId: string;
  /** Type of operation ("contract_write", "eth_transfer") */
  operationType: string;
  /** Contract method name (for contract writes) */
  methodName?: string;
  /** Estimated gas units */
  gasUnits: string;
  /** Gas price in wei */
  gasPrice: string;
  /** Total cost for this operation */
  totalCost: FeeAmount;
  /** Whether the estimation was successful */
  success: boolean;
  /** Error message if estimation failed */
  error?: string;
}

/**
 * Automation fees based on trigger type and duration
 */
export interface AutomationFee {
  /** Type of trigger */
  triggerType: string;
  /** Monitoring duration in minutes */
  durationMinutes: number;
  /** Base monitoring fee */
  baseFee: FeeAmount;
  /** Per-execution fee estimate */
  executionFee: FeeAmount;
  /** Estimated number of executions */
  estimatedExecutions: number;
  /** Total automation fee */
  totalFee: FeeAmount;
  /** Fee calculation breakdown */
  breakdown: AutomationFeeComponent[];
}

/**
 * Individual component of automation fee calculation
 */
export interface AutomationFeeComponent {
  /** Component type ("base", "monitoring", "execution", "address_scaling", "topic_scaling") */
  type: string;
  /** Description of this fee component */
  description: string;
  /** Fee amount for this component */
  amount: FeeAmount;
  /** Calculation details */
  calculation?: string;
}

/**
 * Smart wallet creation fees (if wallet doesn't exist)
 */
export interface SmartWalletCreationFee {
  /** Whether wallet creation is required */
  creationRequired: boolean;
  /** Smart wallet address */
  walletAddress: string;
  /** Cost to create the wallet */
  creationFee?: FeeAmount;
  /** Recommended initial funding amount */
  initialFunding?: FeeAmount;
}

/**
 * Applied discount information
 */
export interface Discount {
  /** Unique discount ID */
  discountId: string;
  /** Type of discount ("beta_program", "new_user", "volume") */
  discountType: string;
  /** Human-readable discount name */
  discountName: string;
  /** What the discount applies to ("automation_fees", "gas_fees", "total_fees") */
  appliesTo: string;
  /** Discount percentage (0-100) */
  discountPercentage: number;
  /** Discount amount */
  discountAmount: FeeAmount;
  /** When the discount expires (ISO string) */
  expiryDate?: string;
  /** Terms and conditions */
  terms?: string;
}
