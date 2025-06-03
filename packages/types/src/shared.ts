import * as avs_pb from "@/grpc_codegen/avs_pb";
export type SmartWallet = avs_pb.SmartWallet.AsObject & {
  totalTaskCount?: number;
  activeTaskCount?: number;
  completedTaskCount?: number;
  failedTaskCount?: number;
  canceledTaskCount?: number;
};
export interface GetWalletRequest {
  salt: string;
  factoryAddress?: string;
}
export interface ClientOption {
  endpoint: string;
  factoryAddress?: string;
}
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
export type Environment = "production" | "development" | "staging";
export const AUTH_KEY_HEADER = "authkey";
export const DEFAULT_LIMIT = 10;
