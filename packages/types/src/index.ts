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
  cursor?: string;
  before?: string;
  after?: string;
  limit?: number;
}

export interface GetWorkflowsRequest extends RequestOptions {
  cursor?: string;  // Deprecated: Use before or after instead
  before?: string;  // Get items before this cursor value (for backward pagination)
  after?: string;   // Get items after this cursor value (for forward pagination)
  limit?: number;
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

export interface ListSecretResponse {
  name: string;
  workflowId?: string;
  orgId?: string;
}

export interface ListSecretsResponse {
  items: ListSecretResponse[];
  cursor: string;
  hasMore: boolean;
}

export interface SecretRequestOptions extends RequestOptions {
  workflowId?: string;
  orgId?: string;
  cursor?: string;
  before?: string;
  after?: string;
  itemPerPage?: number;
}
