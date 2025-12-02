import * as avs_pb from "@/grpc_codegen/avs_pb";

export type Environment = "production" | "development" | "staging";
export const AUTH_KEY_HEADER = "authkey";
export const DEFAULT_LIMIT = 10;

export type SmartWallet = avs_pb.SmartWallet.AsObject & {
  totalTaskCount?: number;
  enabledTaskCount?: number;
  completedTaskCount?: number;
  failedTaskCount?: number;
  disabledTaskCount?: number;
};
export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

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

export type TriggerDataProps = {
  type: any;
  blockNumber?: number;
  timestamp?: number;
  data?: string | number | boolean | Record<string, unknown> | unknown[] | null;
  headers?: Record<string, string>;
  pathParams?: Record<string, string>;
  inputVariables?: Record<string, unknown>;
};

// Input variables type for workflow execution
export type InputVariables = Record<string, unknown>;

// MethodCall interface for enhanced event data formatting
// Used by both triggers and nodes for contract interactions
export interface MethodCallType {
  methodName: string; // Method name (e.g., "decimals")
  methodParams: string[]; // Method parameters array (replaces need for callData generation)
  applyToFields?: string[]; // Optional: Fields to apply formatting to (e.g., ["current", "answer"])
  callData?: string; // Optional: Hex-encoded calldata for the method (used when methodParams is not provided)
}
