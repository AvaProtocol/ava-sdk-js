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