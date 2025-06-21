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
  executionId?: string;
  nodeId?: string;
}

export interface RunTriggerRequest {
  triggerType: string;
  triggerConfig: Record<string, any>;
}

export interface RunTriggerResponse {
  success: boolean;
  data: TriggerOutputData;
  error?: string;
  triggerId?: string;
  metadata?: string; // Optional JSON-encoded metadata for testing/debugging
}

export interface SimulateWorkflowRequest {
  trigger: TriggerProps;
  nodes: Array<NodeProps>;
  edges: Array<EdgeProps>;
  inputVariables?: Record<string, any>;
}
