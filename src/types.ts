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

export interface TaskNode {
  taskType: number;
  id: string;
  name: string;
  ethTransfer?: any;
  contractWrite?: any;
  contractRead?: any;
  restApi?: any;
  customCode?: any;
  branch?: any;
  filter?: any;
}

export interface TaskType {
  id: string;
  owner: string;
  smartWalletAddress: string;
  trigger: TaskTrigger;
  nodes:  TaskNode[];
  edges: TaskEdge[];
  startAt: number;
  expiredAt: number;
  memo: string;
  completedAt: number;
  status: number;
  maxExecution: number;
  executions: Execution[];
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

export interface ExecutionStep {
  outputData: string;
  log: string;
}

export interface Execution {
  epoch: number;
  success: boolean;
  error: string;
  triggerMark?: TriggerMark;
  result: string;
  steps: ExecutionStep[];
}

export interface TaskEdge {
  id: string;
  source: string;
  target: string;
}