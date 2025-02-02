import * as avs_pb from "@/grpc_codegen/avs_pb";
import _ from "lodash";
import ContractWriteNode, {
  ContractWriteNodeData,
  ContractWriteNodeProps,
} from "./contractWrite";
import CustomCodeNode, {
  CustomCodeLangs,
  CustomCodeNodeData,
  CustomCodeNodeProps,
} from "./customCode";
import GraphQLQueryNode, {
  GraphQLQueryNodeData,
  GraphQLQueryNodeProps,
} from "./graphqlQuery";
import Node, { NodeProps } from "./interface";
import RestAPINode, { RestAPINodeData, RestAPINodeProps } from "./restApi";
import ContractReadNode, {
  ContractReadNodeData,
  ContractReadNodeProps,
} from "./contractRead";
import ETHTransferNode, {
  ETHTransferNodeData,
  ETHTransferNodeProps,
} from "./ethTransfer";
import BranchNode, { BranchNodeProps, BranchNodeData } from "./branch";
import FilterNode, { FilterNodeData, FilterNodeProps } from "./filter";
import { NodeType } from "@avaprotocol/types";
class NodeFactory {
  static create(props: NodeProps): Node {
    switch (props.type) {
      case NodeType.ContractWrite:
        return new ContractWriteNode(props as ContractWriteNodeProps);
      case NodeType.RestAPI:
        return new RestAPINode(props as RestAPINodeProps);
      case NodeType.CustomCode:
        return new CustomCodeNode(props as CustomCodeNodeProps);
      case NodeType.ContractRead:
        return new ContractReadNode(props as ContractReadNodeProps);
      case NodeType.ETHTransfer:
        return new ETHTransferNode(props as ETHTransferNodeProps);
      case NodeType.GraphQLQuery:
        return new GraphQLQueryNode(props as GraphQLQueryNodeProps);
      case NodeType.Branch:
        return new BranchNode(props as BranchNodeProps);
      case NodeType.Filter:
        return new FilterNode(props as FilterNodeProps);
      default:
        throw new Error(`Unsupported node type: ${props.type}`);
    }
  }

  static createNodes(props: NodeProps[]): Node[] {
    return _.map(props, (node) => this.create(node));
  }

  static fromResponse(raw: avs_pb.TaskNode): Node {
    switch (true) {
      case !!raw.getEthTransfer():
        return ETHTransferNode.fromResponse(raw);
      case !!raw.getContractRead():
        return ContractReadNode.fromResponse(raw);
      case !!raw.getContractWrite():
        return ContractWriteNode.fromResponse(raw);
      case !!raw.getGraphqlQuery():
        return GraphQLQueryNode.fromResponse(raw);
      case !!raw.getRestApi():
        return RestAPINode.fromResponse(raw);
      case !!raw.getCustomCode():
        return CustomCodeNode.fromResponse(raw);
      case !!raw.getBranch():
        return BranchNode.fromResponse(raw);
      case !!raw.getFilter():
        return FilterNode.fromResponse(raw);
      default:
        throw new Error(`Unsupported node type: ${raw.getName()}`);
    }
  }
}

export default NodeFactory;

// Node object definitions
export {
  Node,
  ContractWriteNode,
  ContractReadNode,
  BranchNode,
  ETHTransferNode,
  GraphQLQueryNode,
  RestAPINode,
  CustomCodeNode,
  CustomCodeLangs,
  FilterNode,
};

// Data definitions of Node
export type {
  ContractWriteNodeData,
  ContractReadNodeData,
  BranchNodeData,
  ETHTransferNodeData,
  GraphQLQueryNodeData,
  RestAPINodeData,
  CustomCodeNodeData,
  FilterNodeData,
};

// Node Props definitions
export type {
  NodeProps,
  ContractWriteNodeProps,
  ContractReadNodeProps,
  BranchNodeProps,
  ETHTransferNodeProps,
  GraphQLQueryNodeProps,
  RestAPINodeProps,
  CustomCodeNodeProps,
  FilterNodeProps,
};
