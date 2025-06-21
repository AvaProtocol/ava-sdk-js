import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "./enums";

// Node DataTypes
export type ETHTransferNodeData = avs_pb.ETHTransferNode.Config.AsObject;
// Custom ContractWrite data type with cleaner field names
export interface ContractWriteNodeData {
  contractAddress: string;
  callData: string;
  contractAbi: string;  // Contract ABI as string
  methodCalls?: Array<{
    callData: string;
    methodName?: string;
  }>;
}

// Custom ContractRead data type with cleaner field names
export interface ContractReadNodeData {
  contractAddress: string;
  contractAbi: string;  // Contract ABI as string
  methodCalls: Array<{
    callData: string;
    methodName?: string;
    applyToFields?: string[];  // Fields to apply decimal formatting to
  }>;
}

// Custom CustomCode data type with cleaner field names
export interface CustomCodeNodeData {
  lang: CustomCodeLang;
  source: string;
}

// Custom BranchNode data type with cleaner field names
export interface BranchNodeData {
  conditions: Array<{
    id: string;
    type: string;
    expression: string;
  }>;
}

export type RestAPINodeData = avs_pb.RestAPINode.Config.AsObject;
export type GraphQLQueryNodeData = avs_pb.GraphQLQueryNode.Config.AsObject;
export type FilterNodeData = avs_pb.FilterNode.Config.AsObject;
export type LoopNodeData = avs_pb.LoopNode.Config.AsObject & {
  // Optional runner nodes - only one should be present
  restApi?: {
    config: avs_pb.RestAPINode.Config.AsObject;
  };
  customCode?: {
    config: {
      lang: CustomCodeLang;
      source: string;
    };
  };
  ethTransfer?: {
    config: avs_pb.ETHTransferNode.Config.AsObject;
  };
  contractRead?: {
    config: avs_pb.ContractReadNode.Config.AsObject;
  };
  contractWrite?: {
    config: avs_pb.ContractWriteNode.Config.AsObject;
  };
  graphqlDataQuery?: {
    config: avs_pb.GraphQLQueryNode.Config.AsObject;
  };
};

// Node Output Types
export type RestAPINodeOutput = avs_pb.RestAPINode.Output.AsObject;

// Language enum that exactly matches protobuf enum values
export enum CustomCodeLang {
  JavaScript = 0, // avs_pb.Lang.JAVASCRIPT
}

export type NodeData =
  | ETHTransferNodeData
  | ContractWriteNodeData
  | ContractReadNodeData
  | GraphQLQueryNodeData
  | RestAPINodeData
  | BranchNodeData
  | FilterNodeData
  | LoopNodeData
  | CustomCodeNodeData;

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
  | "type" // Exclude the protobuf type field to avoid conflict
  | "input" // ✨ Omit the protobuf input field
> & {
  type: NodeType; // Use our own NodeType enum
  data: NodeData;
  input?: Record<string, any>; // Simplified to plain JS object - transformation handled in SDK
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
      case "unspecified":
      default:
        return avs_pb.NodeType.NODE_TYPE_UNSPECIFIED;
    }
  },
};
