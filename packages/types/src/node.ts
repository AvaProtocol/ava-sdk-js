import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "./enums";

// Node DataTypes
export type ETHTransferNodeData = avs_pb.ETHTransferNode.Config.AsObject;
export type ContractWriteNodeData = avs_pb.ContractWriteNode.Config.AsObject;
export type ContractReadNodeData = avs_pb.ContractReadNode.Config.AsObject;
export type CustomCodeNodeData = avs_pb.CustomCodeNode.Config.AsObject;
export type BranchNodeData = avs_pb.BranchNode.Config.AsObject;
export type RestAPINodeData = avs_pb.RestAPINode.Config.AsObject;
export type GraphQLQueryNodeData = avs_pb.GraphQLQueryNode.Config.AsObject;
export type FilterNodeData = avs_pb.FilterNode.Config.AsObject;
export type LoopNodeData = avs_pb.LoopNode.Config.AsObject;

// Node Output Types
export type RestAPINodeOutput = avs_pb.RestAPINode.Output.AsObject;

// Node Constants
export const CustomCodeLangs = {
  Javascript: 0,
  Python: 1,
};

// Trigger DataTypes
export type BlockTriggerDataType = avs_pb.BlockTrigger.Config.AsObject;
export type EventTriggerDataType = avs_pb.EventTrigger.Config.AsObject;
export type FixedTimeTriggerDataType = avs_pb.FixedTimeTrigger.Config.AsObject;
export type CronTriggerDataType = avs_pb.CronTrigger.Config.AsObject;

// Trigger Output Types
export type BlockTriggerOutput = avs_pb.BlockTrigger.Output.AsObject;
export type EventTriggerOutput = avs_pb.EventTrigger.Output.AsObject;
export type FixedTimeTriggerOutput = avs_pb.FixedTimeTrigger.Output.AsObject;
export type CronTriggerOutput = avs_pb.CronTrigger.Output.AsObject;
export type ManualTriggerOutput = avs_pb.ManualTrigger.Output.AsObject;

export type NodeData =
  | avs_pb.ETHTransferNode.AsObject
  | avs_pb.ContractWriteNode.AsObject
  | avs_pb.ContractReadNode.AsObject
  | avs_pb.GraphQLQueryNode.AsObject
  | avs_pb.RestAPINode.AsObject
  | avs_pb.BranchNode.AsObject
  | avs_pb.FilterNode.AsObject
  | avs_pb.LoopNode.AsObject
  | avs_pb.CustomCodeNode.AsObject;

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
> & {
  type: NodeType; // Use our own NodeType enum
  data: NodeData;
};
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
