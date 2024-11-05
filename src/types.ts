import { TaskStatus } from "../grpc_codegen/avs_pb";
import _ from "lodash";
// Define the environment type
export type Environment = "production" | "development" | "staging";

export const AUTH_KEY_HEADER = "authKey";

export interface RequestOptions {
  authKey: string;
}

export interface GetKeyResponse {
  authKey: string;
}

export interface ClientOption {
  endpoint: string;
}

export interface TaskType {
  id: string;
  owner: string;
  smartAccountAddress: string;
  trigger: {
    triggerType: number;
    schedule?: any;
    contractQuery?: any;
    expression: {
      expression: string;
    };
  };
  nodesList: Array<{
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
  repeatable: boolean;
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

export interface GetAddressesResponse {
  owner: string;
  smart_account_address: string;
}