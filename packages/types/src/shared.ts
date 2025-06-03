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

export type RequestOptions = {
  limit?: number;
  cursor?: string;
  authKey?: string;
  before?: string;
  after?: string;
  includeNodes?: boolean;
  includeEdges?: boolean;
  workflowId?: string;
  includeTimestamps?: boolean;
  includeCreatedBy?: boolean;
  includeDescription?: boolean;
};

export type GetExecutionsOptions = RequestOptions;

export type GetWorkflowsOptions = RequestOptions;

export type RunNodeWithInputsRequest = {
  nodeId: string;
  inputs: Record<string, any>;
  nodeType?: any;
  nodeConfig?: any;
  inputVariables?: Record<string, any>;
};

export type RunNodeWithInputsResponse = {
  output?: any;
  success?: boolean;
  error?: string;
  data?: any;
  nodeId?: string;
};

export type RunTriggerRequest = {
  triggerId: string;
  triggerData: any;
  triggerType?: any;
  triggerConfig?: any;
};

export type RunTriggerResponse = {
  output?: any;
  success?: boolean;
  data?: any;
  error?: string;
  triggerId?: string;
};

export type GetSecretsOptions = RequestOptions;

export type SecretOptions = {
  name: string;
  value: string;
  workflowId?: string;
  orgId?: string;
};

export type TriggerDataProps = {
  type: any;
  blockNumber?: number;
  timestamp?: number;
  data?: any;
};

export type SimulateWorkflowRequest = {
  workflow: any;
  triggerData: TriggerDataProps;
  trigger?: any;
  nodes: any[];
  edges: any[];
  inputVariables?: Record<string, any>;
};
