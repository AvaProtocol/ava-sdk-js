import * as avs_pb from "@/grpc_codegen/avs_pb";

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

/**
 * NodeTypeConverter - Converts between SDK NodeType enum and Protobuf NodeType enum
 * Used for gRPC communication between SDK and backend
 */
export const NodeTypeConverter = {
  /**
   * Convert SDK NodeType enum to Protobuf NodeType enum
   * @param type - SDK NodeType enum value
   * @returns Protobuf NodeType enum value
   */
  toProtobuf: (type: NodeType): avs_pb.NodeType => {
    switch (type) {
      case NodeType.ETHTransfer:
        return avs_pb.NodeType.NODE_TYPE_ETH_TRANSFER;
      case NodeType.ContractWrite:
        return avs_pb.NodeType.NODE_TYPE_CONTRACT_WRITE;
      case NodeType.ContractRead:
        return avs_pb.NodeType.NODE_TYPE_CONTRACT_READ;
      case NodeType.GraphQLQuery:
        return avs_pb.NodeType.NODE_TYPE_GRAPHQL_QUERY;
      case NodeType.RestAPI:
        return avs_pb.NodeType.NODE_TYPE_REST_API;
      case NodeType.CustomCode:
        return avs_pb.NodeType.NODE_TYPE_CUSTOM_CODE;
      case NodeType.Branch:
        return avs_pb.NodeType.NODE_TYPE_BRANCH;
      case NodeType.Filter:
        return avs_pb.NodeType.NODE_TYPE_FILTER;
      case NodeType.Loop:
        return avs_pb.NodeType.NODE_TYPE_LOOP;
      case NodeType.Unspecified:
      default:
        return avs_pb.NodeType.NODE_TYPE_UNSPECIFIED;
    }
  },

  /**
   * Convert Protobuf NodeType enum to SDK NodeType enum
   * @param type - Protobuf NodeType enum value
   * @returns SDK NodeType enum value
   */
  fromProtobuf: (type: avs_pb.NodeType): NodeType => {
    switch (type) {
      case avs_pb.NodeType.NODE_TYPE_ETH_TRANSFER:
        return NodeType.ETHTransfer;
      case avs_pb.NodeType.NODE_TYPE_CONTRACT_WRITE:
        return NodeType.ContractWrite;
      case avs_pb.NodeType.NODE_TYPE_CONTRACT_READ:
        return NodeType.ContractRead;
      case avs_pb.NodeType.NODE_TYPE_GRAPHQL_QUERY:
        return NodeType.GraphQLQuery;
      case avs_pb.NodeType.NODE_TYPE_REST_API:
        return NodeType.RestAPI;
      case avs_pb.NodeType.NODE_TYPE_CUSTOM_CODE:
        return NodeType.CustomCode;
      case avs_pb.NodeType.NODE_TYPE_BRANCH:
        return NodeType.Branch;
      case avs_pb.NodeType.NODE_TYPE_FILTER:
        return NodeType.Filter;
      case avs_pb.NodeType.NODE_TYPE_LOOP:
        return NodeType.Loop;
      case avs_pb.NodeType.NODE_TYPE_UNSPECIFIED:
      default:
        return NodeType.Unspecified;
    }
  }
};

/**
 * NodeTypeGoConverter - Converts between Protobuf NodeType enum and Go backend string constants
 * Used for API compatibility with Go backend services
 * Note: Go string values match SDK enum values exactly
 */
export const NodeTypeGoConverter = {
  /**
   * Convert Protobuf NodeType enum to Go backend string constant
   * @param nodeType - Protobuf NodeType enum value
   * @returns Go backend string constant (matches SDK enum values)
   */
  toGoString: (nodeType: avs_pb.NodeType): string => {
    switch (nodeType) {
      case avs_pb.NodeType.NODE_TYPE_ETH_TRANSFER:
        return "ethTransfer";
      case avs_pb.NodeType.NODE_TYPE_CONTRACT_WRITE:
        return "contractWrite";
      case avs_pb.NodeType.NODE_TYPE_CONTRACT_READ:
        return "contractRead";
      case avs_pb.NodeType.NODE_TYPE_GRAPHQL_QUERY:
        return "graphql";
      case avs_pb.NodeType.NODE_TYPE_REST_API:
        return "restApi";
      case avs_pb.NodeType.NODE_TYPE_CUSTOM_CODE:
        return "customCode";
      case avs_pb.NodeType.NODE_TYPE_BRANCH:
        return "branch";
      case avs_pb.NodeType.NODE_TYPE_FILTER:
        return "filter";
      case avs_pb.NodeType.NODE_TYPE_LOOP:
        return "loop";
      case avs_pb.NodeType.NODE_TYPE_UNSPECIFIED:
      default:
        return "unspecified";
    }
  },
  
  /**
   * Convert Go backend string constant to Protobuf NodeType enum
   * @param goString - Go backend string constant
   * @returns Protobuf NodeType enum value
   */
  fromGoString: (goString: string): avs_pb.NodeType => {
    switch (goString) {
      case "ethTransfer":
        return avs_pb.NodeType.NODE_TYPE_ETH_TRANSFER;
      case "contractWrite":
        return avs_pb.NodeType.NODE_TYPE_CONTRACT_WRITE;
      case "contractRead":
        return avs_pb.NodeType.NODE_TYPE_CONTRACT_READ;
      case "graphql":
        return avs_pb.NodeType.NODE_TYPE_GRAPHQL_QUERY;
      case "restApi":
        return avs_pb.NodeType.NODE_TYPE_REST_API;
      case "customCode":
        return avs_pb.NodeType.NODE_TYPE_CUSTOM_CODE;
      case "branch":
        return avs_pb.NodeType.NODE_TYPE_BRANCH;
      case "filter":
        return avs_pb.NodeType.NODE_TYPE_FILTER;
      case "loop":
        return avs_pb.NodeType.NODE_TYPE_LOOP;
      case "unspecified":
      default:
        return avs_pb.NodeType.NODE_TYPE_UNSPECIFIED;
    }
  }
};

export type SmartWallet = avs_pb.SmartWallet.AsObject & {
  factoryAddress?: string;
  totalTaskCount?: number;
  activeTaskCount?: number;
  completedTaskCount?: number;
  failedTaskCount?: number;
  canceledTaskCount?: number;
};

export const ExecutionStatus = avs_pb.ExecutionStatus;

export enum CustomCodeLangs {
  Javascript = 0,
  Python = 1,
}

export type ContractWriteNodeData = {
  contractAddress: string;
  callData: string;
  contractAbi: string;
  functionName: string;
  args: Record<string, any>;
  value?: string;
};

export type ContractReadNodeData = {
  contractAddress: string;
  callData: string;
  contractAbi: string;
  functionName: string;
  args: Record<string, any>;
};

export type BranchNodeData = {
  condition?: string;
  conditionsList?: Array<{
    expression: string;
    [key: string]: any;
  }>;
};

export type ETHTransferNodeData = {
  destination: string;
  amount: string;
};

export type GraphQLQueryNodeData = {
  url: string;
  query: string;
  variables?: Record<string, any>;
  variablesMap?: Array<[string, string]>;
  headers?: Record<string, string>;
};

export type RestAPINodeData = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  headersMap?: Array<[string, string]>;
  body?: string;
};

export type CustomCodeNodeData = {
  lang: CustomCodeLangs;
  source: string;
};

export type FilterNodeData = {
  condition?: string;
  expression?: string;
  sourceId?: string;
};

export type LoopNodeData = {
  condition?: string;
  sourceId?: string;
  iterVal?: string;
  iterKey?: string;
  restApi?: any;
  customCode?: any;
  ethTransfer?: any;
  contractRead?: any;
  contractWrite?: any;
  graphqlDataQuery?: any;
};

export type BlockTriggerDataType = {
  interval?: number;
  blockNumber?: number;
  blockHash?: string;
  timestamp?: number;
  parentHash?: string;
  difficulty?: string;
  gasLimit?: number;
  gasUsed?: number;
};

export type EventTriggerDataType = {
  expression?: string;
  matcherList?: Array<{
    type: string;
    valueList: string[];
    [key: string]: any;
  }>;
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
};

export type FixedTimeTriggerDataType = {
  epochsList?: number[];
  timestamp?: number;
  timestampIso?: string;
};

export type CronTriggerDataType = {
  scheduleList: string[];
};

export type RestAPINodeOutput = any;

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
