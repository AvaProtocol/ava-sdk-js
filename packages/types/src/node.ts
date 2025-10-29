import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, ExecutionMode, Lang } from "./enums";
import { ContractAbi } from "./abi";
import { MethodCallType } from "./shared";

// Node DataTypes
export type ETHTransferNodeData = avs_pb.ETHTransferNode.Config.AsObject;
export interface ContractWriteNodeData {
  contractAddress: string;
  contractAbi: ContractAbi; // Contract ABI as array
  methodCalls: MethodCallType[]; // Required: Method calls with methodParams
  isSimulated?: boolean; // Optional: If true (or unset), use simulation; if explicitly false, execute real UserOp
  gasLimit?: string; // Optional: Custom gas limit for the transaction (in wei as string)
  value?: string; // Optional: ETH value to send with the transaction (in wei as string)
}

export interface ContractReadNodeData {
  contractAddress: string;
  contractAbi: ContractAbi; // Contract ABI as array
  methodCalls: MethodCallType[]; // Required: Method calls with methodParams
}

export interface CustomCodeNodeData {
  lang: Lang;
  source: string;
}

export interface BranchNodeData {
  conditions: Array<{
    id: string;
    type: string;
    expression: string;
  }>;
}

// Custom RestAPINode data type with object format for headers
export interface RestAPINodeData {
  url: string;
  headers: Record<string, string>;
  body: string;
  method: string;
  options?: Record<string, unknown>; // Generic options bag for backend features (e.g., { "summarize": true })
}

export type GraphQLQueryNodeData = {
  url: string;
  query: string;
  variables?: Record<string, string>;
};

export type FilterNodeData = avs_pb.FilterNode.Config.AsObject;

export interface BalanceNodeData {
  address: string;
  chain: string;
  includeSpam?: boolean;
  includeZeroBalances?: boolean;
  minUsdValue?: number;
  tokenAddresses?: string[];
}

type LoopRunnerConfig =
  | {
      type: "restApi";
      config: avs_pb.RestAPINode.Config.AsObject;
    }
  | {
      type: "customCode";
      config: { lang: Lang; source: string };
    }
  | {
      type: "ethTransfer";
      config: avs_pb.ETHTransferNode.Config.AsObject;
    }
  | {
      type: "contractRead";
      config: {
        contractAddress: string;
        contractAbi: ContractAbi;
        methodCalls: MethodCallType[];
      };
    }
  | {
      type: "contractWrite";
      config: {
        contractAddress: string;
        contractAbi: ContractAbi;
        methodCalls: MethodCallType[];
        isSimulated?: boolean;
      };
    }
  | {
      type: "graphqlQuery";
      config: avs_pb.GraphQLQueryNode.Config.AsObject;
    }
  | {
      type: "filter";
      config: avs_pb.FilterNode.Config.AsObject;
    };

export type LoopNodeData = Omit<
  avs_pb.LoopNode.Config.AsObject,
  "executionMode"
> & {
  // The runner field matches the protobuf oneof runner structure
  runner?: LoopRunnerConfig;
  // Execution mode for loop iterations - override the protobuf executionMode field
  executionMode?: ExecutionMode;
};

// Node Output Types
export type RestAPINodeOutput = avs_pb.RestAPINode.Output.AsObject;


export type NodeData =
  | ETHTransferNodeData
  | ContractWriteNodeData
  | ContractReadNodeData
  | GraphQLQueryNodeData
  | RestAPINodeData
  | BranchNodeData
  | FilterNodeData
  | LoopNodeData
  | CustomCodeNodeData
  | BalanceNodeData;

export type NodeProps = Omit<
  avs_pb.TaskNode.AsObject,
  | "ethTransfer"
  | "contractWrite"
  | "contractRead"
  | "graphqlDataQuery"
  | "restApi"
  | "branch"
  | "filter"
  | "loop"
  | "customCode"
  | "balance"
  | "type" // Exclude the protobuf type field to avoid conflict
  | "input" // ✨ Omit the protobuf input field
> & {
  type: NodeType; // Use our own NodeType enum
  data: NodeData;
};

export type LoopNodeProps = NodeProps & { data: LoopNodeData };
export type ContractWriteNodeProps = NodeProps & {
  data: ContractWriteNodeData;
};
export type ContractReadNodeProps = NodeProps & { data: ContractReadNodeData };
export type ETHTransferNodeProps = NodeProps & { data: ETHTransferNodeData };
export type RestAPINodeProps = NodeProps & { data: RestAPINodeData };
export type CustomCodeNodeProps = NodeProps & { data: CustomCodeNodeData };
export type GraphQLQueryNodeProps = NodeProps & { data: GraphQLQueryNodeData };
export type BranchNodeProps = NodeProps & { data: BranchNodeData };
export type FilterNodeProps = NodeProps & { data: FilterNodeData };
export type BalanceNodeProps = NodeProps & { data: BalanceNodeData };
export const NodeTypeConverter = {
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
      case NodeType.Balance:
        return avs_pb.NodeType.NODE_TYPE_BALANCE;
      case NodeType.Unspecified:
      default:
        return avs_pb.NodeType.NODE_TYPE_UNSPECIFIED;
    }
  },
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
      case avs_pb.NodeType.NODE_TYPE_BALANCE:
        return NodeType.Balance;
      case avs_pb.NodeType.NODE_TYPE_UNSPECIFIED:
      default:
        return NodeType.Unspecified;
    }
  },
};
export const NodeTypeGoConverter = {
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
      case avs_pb.NodeType.NODE_TYPE_BALANCE:
        return "balance";
      case avs_pb.NodeType.NODE_TYPE_UNSPECIFIED:
      default:
        return "unspecified";
    }
  },
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
      case "balance":
        return avs_pb.NodeType.NODE_TYPE_BALANCE;
      case "unspecified":
      default:
        return avs_pb.NodeType.NODE_TYPE_UNSPECIFIED;
    }
  },
};
