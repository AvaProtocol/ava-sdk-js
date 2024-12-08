import _ from "lodash";
import * as avs_pb from "../grpc_codegen/avs_pb";

// Define the environment type
export type Environment = "production" | "development" | "staging";

export const AUTH_KEY_HEADER = "authkey";

export interface RequestOptions {
  authKey: string;
}

export interface GetKeyResponse {
  authKey: string;
}

export interface ClientOption {
  endpoint: string;
}

export interface CreateTaskResponse {
  id: string;
}

export interface ListTasksResponse {
  tasks: {
    id: string;
    status: string;
  }[];
}

export interface CancelTaskResponse {
  value: boolean;
}

export interface DeleteTaskResponse {
  value: boolean;
}

export interface SmartWallet {
  address: string;
  salt: string;
  factory: string;
}

export interface CreateWalletReq {
  salt: string;
  factoryAddress?: string;
}

export interface TriggerMark {
  blockNumber?: number;
  logIndex?: number;
  txHash?: string;
  epoch?: number;
}

// export interface ExecutionStep {
//   outputData: string;
//   log: string;
// }

// export interface Execution {
//   epoch: number;
//   success: boolean;
//   error: string;
//   triggerMark?: TriggerMark;
//   result: string;
//   steps: ExecutionStep[];
// }