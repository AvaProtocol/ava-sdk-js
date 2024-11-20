import { TaskStatus } from "../grpc_codegen/avs_pb";
import _ from "lodash";
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

export interface TaskTrigger {
  triggerType: number;
  manual?: boolean;
  cron?: {
    schedule: string[];
  };
  event?: {
    expression: string;
  };
  fixedTime?: {
    epochs: number[],
  }
  block?: {
    interval: number;
  }
}

export interface TaskType {
  id: string;
  owner: string;
  smartWalletAddress: string;
  trigger: TaskTrigger;
  nodes: Array<{
    taskType: number;
    id: string;
    name: string;
    nextList: any[];
    ethTransfer?: any;
    contractExecution: any;
    graphqlDataQuery?: any;
    httpDataQuery?: any;
    customCode?: any;
    branch?: any;
  }>;
  startAt: number;
  expiredAt: number;
  memo: string;
  completedAt: number;
  status: number;
  maxExecution: number;
  executionsList: any[];
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