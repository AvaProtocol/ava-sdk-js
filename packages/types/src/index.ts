// Define the environment type
import * as avs_pb from "@/grpc_codegen/avs_pb";

export * from "./auth";
export type Environment = "production" | "development" | "staging";

export const AUTH_KEY_HEADER = "authkey";
export const DEFAULT_LIMIT = 10;

export interface RequestOptions {
  authKey?: string;
}

export interface GetExecutionsRequest extends RequestOptions {
  cursor?: string; // Deprecated: Use before or after instead
  before?: string; // Get items before this cursor value (for backward pagination)
  after?: string; // Get items after this cursor value (for forward pagination)
  limit?: number;
}

export interface GetWorkflowsRequest extends RequestOptions {
  cursor?: string; // Deprecated: Use before or after instead
  before?: string; // Get items before this cursor value (for backward pagination)
  after?: string; // Get items after this cursor value (for forward pagination)
  limit?: number;
  // Field control options for flexible response content
  includeNodes?: boolean;  // Include task nodes (expensive field)
  includeEdges?: boolean;  // Include task edges (expensive field)
}

export interface GetWalletRequest {
  salt: string;
  factoryAddress?: string;
}

export interface ClientOption {
  endpoint: string;
  factoryAddress?: string;
}

export enum WorkflowStatus {
  Active = "active",
  Completed = "completed",
  Failed = "failed",
  Canceled = "canceled",
  Executing = "executing",
}

export enum TriggerType {
  Manual = "manual",
  FixedTime = "fixed_time",
  Cron = "cron",
  Block = "block",
  Event = "event",
  Unset = "unset",
}

export enum NodeType {
  ETHTransfer = "eth_transfer",
  ContractWrite = "contract_write",
  ContractRead = "contract_read",
  GraphQLQuery = "graphql_query",
  RestAPI = "rest_api",
  Branch = "branch",
  Filter = "filter",
  Loop = "loop",
  CustomCode = "custom_code",
  Unset = "unset",
}

export type SmartWallet = avs_pb.SmartWallet.AsObject & {
  totalTaskCount?: number;
  activeTaskCount?: number;
  completedTaskCount?: number;
  failedTaskCount?: number;
  canceledTaskCount?: number;
};

export const ExecutionStatus = avs_pb.ExecutionStatus;

export type SecretProps = {
  name: string;
  secret?: string;
  workflowId?: string;
  orgId?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
  description?: string;
};

export interface ListSecretsResponse {
  items: SecretProps[];
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface SecretRequestOptions extends RequestOptions {
  workflowId?: string;
  orgId?: string;
  before?: string;
  after?: string;
  limit?: number;
  // Field control options for flexible response content
  includeTimestamps?: boolean;   // Include created_at and updated_at fields
  includeCreatedBy?: boolean;    // Include created_by field
  includeDescription?: boolean;  // Include description field
}

export interface RunNodeWithInputsRequest {
  nodeType: string;
  nodeConfig: Record<string, any>;
  inputVariables?: Record<string, any>;
}

export interface RunNodeWithInputsResponse {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
  executionId?: string;
  nodeId?: string;
}
