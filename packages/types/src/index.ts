export * from "./auth";
export type Environment = "production" | "development" | "staging";

export const AUTH_KEY_HEADER = "authkey";
export const DEFAULT_LIMIT = 10;

export interface RequestOptions {
  authKey?: string;
}

export interface GetExecutionsOptions extends RequestOptions {
  before?: string; // Get items before this cursor value (for backward pagination)
  after?: string; // Get items after this cursor value (for forward pagination)
  limit?: number;
}

export interface GetWorkflowsOptions extends RequestOptions {
  before?: string; // Get items before this cursor value (for backward pagination)
  after?: string; // Get items after this cursor value (for forward pagination)
  limit?: number;
  // Field control options for flexible response content
  includeNodes?: boolean; // Include task nodes (expensive field)
  includeEdges?: boolean; // Include task edges (expensive field)
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
  Unspecified = "unspecified",
  Manual = "manualTrigger",
  FixedTime = "fixedTimeTrigger",
  Cron = "cronTrigger",
  Block = "blockTrigger",
  Event = "eventTrigger",
}

export enum NodeType {
  Unspecified = "unspecified",
  ETHTransfer = "ethTransfer",
  ContractWrite = "contractWrite",
  ContractRead = "contractRead",
  GraphQLQuery = "graphql",
  RestAPI = "restApi",
  CustomCode = "customCode",
  Branch = "branch",
  Filter = "filter",
  Loop = "loop",
}



export type SmartWallet = {
  address: string;
  salt: string;
  factoryAddress: string;
  factory?: string;
  isHidden?: boolean;
  totalTaskCount?: number;
  activeTaskCount?: number;
  completedTaskCount?: number;
  failedTaskCount?: number;
  canceledTaskCount?: number;
};

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

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface GetSecretsOptions extends RequestOptions {
  workflowId?: string;
  orgId?: string;
  before?: string;
  after?: string;
  limit?: number;
  // Field control options for flexible response content
  includeTimestamps?: boolean; // Include created_at and updated_at fields
  includeCreatedBy?: boolean; // Include created_by field
  includeDescription?: boolean; // Include description field
}

export interface SecretOptions extends RequestOptions {
  workflowId?: string;
  orgId?: string;
}

export interface RunNodeWithInputsRequest {
  nodeType: string;
  nodeConfig: Record<string, any>;
  inputVariables?: Record<string, any>;
}

export interface RunNodeWithInputsResponse {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
  executionId?: string;
  nodeId?: string;
}

export interface RunTriggerRequest {
  triggerType: string;
  triggerConfig: Record<string, any>;
}

export interface RunTriggerResponse {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
  triggerId?: string;
}

export interface SimulateTaskRequest {
  trigger: Record<string, any>;
  nodes: Array<Record<string, any>>;
  edges: Array<Record<string, any>>;
  triggerType: string;
  triggerConfig?: Record<string, any>;
  inputVariables?: Record<string, any>;
}



export type TriggerDataProps =
  | { type: TriggerType.FixedTime; timestamp: number; timestampIso: string }
  | { type: TriggerType.Cron; timestamp: number; timestampIso: string }
  | { type: TriggerType.Block; blockNumber: number; blockHash?: string; timestamp?: number; parentHash?: string; difficulty?: string; gasLimit?: number; gasUsed?: number }
  | {
      type: TriggerType.Event;
      evmLog?: {
        address: string;
        blockNumber: number;
        transactionHash: string;
        index: number;
        [key: string]: any;
      };
      transferLog?: {
        tokenName: string;
        tokenSymbol: string;
        tokenDecimals: number;
        transactionHash: string;
        address: string;
        blockNumber: number;
        blockTimestamp: number;
        fromAddress: string;
        toAddress: string;
        value: string;
        valueFormatted: string;
        transactionIndex: number;
        logIndex: number;
      };
    }
  | { type: TriggerType.Manual; runAt?: number }
  | { type: TriggerType.Unspecified };
