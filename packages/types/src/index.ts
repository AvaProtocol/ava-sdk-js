// Define the environment type
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  getKeyRequestMessage,
  GetKeyRequestApiKey,
  GetKeyRequestSignature,
  GetKeyResponse,
} from "./auth";
export type Environment = "production" | "development" | "staging";

export const AUTH_KEY_HEADER = "authkey";
export const DEFAULT_LIMIT = 10;

export interface RequestOptions {
  authKey?: string;
}

export interface GetExecutionsRequest extends RequestOptions {
  cursor?: string;
  limit?: number;
}

export interface GetWorkflowsRequest extends RequestOptions {
  cursor?: string;
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

export type SmartWallet = avs_pb.SmartWallet.AsObject;
export {
  getKeyRequestMessage,
  GetKeyRequestApiKey,
  GetKeyRequestSignature,
  GetKeyResponse,
};
