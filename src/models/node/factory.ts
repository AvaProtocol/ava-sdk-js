import * as avs_pb from "../../../grpc_codegen/avs_pb";
import _ from "lodash";
import ContractWriteNode, { ContractWriteNodeProps } from "./contractWrite";
import CustomCodeNode, {
  CustomCodeLangs,
  CustomCodeNodeProps,
} from "./customCode";
import GraphQLQueryNode, { GraphQLQueryNodeProps } from "./graphqlQuery";
import Node, { NodeProps, NodeType, NodeTypes } from "./interface";
import RestAPINode, { RestAPINodeProps } from "./restApi";
import ContractReadNode, { ContractReadNodeProps } from "./contractRead";
import ETHTransferNode, { ETHTransferNodeProps } from "./ethTransfer";
import BranchNode, { BranchNodeProps, BranchNodeData } from "./branch";

class NodeFactory {
  static create(props: NodeProps): Node {
    switch (props.type) {
      case NodeTypes.CONTRACT_WRITE:
        return new ContractWriteNode(props as ContractWriteNodeProps);
      case NodeTypes.REST_API:
        return new RestAPINode(props as RestAPINodeProps);
      case NodeTypes.CUSTOM_CODE:
        return new CustomCodeNode(props as CustomCodeNodeProps);
      case NodeTypes.CONTRACT_READ:
        return new ContractReadNode(props as ContractReadNodeProps);
      case NodeTypes.ETH_TRANSFER:
        return new ETHTransferNode(props as ETHTransferNodeProps);
      case NodeTypes.GRAPHQL_DATA_QUERY:
        return new GraphQLQueryNode(props as GraphQLQueryNodeProps);
      case NodeTypes.BRANCH:
        return new BranchNode(props as BranchNodeProps);
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
      case !!raw.getGraphqlDataQuery():
        return GraphQLQueryNode.fromResponse(raw);
      case !!raw.getRestApi():
        return RestAPINode.fromResponse(raw);
      case !!raw.getCustomCode():
        return CustomCodeNode.fromResponse(raw);
      case !!raw.getBranch():
        return BranchNode.fromResponse(raw);
      default:
        throw new Error(`Unsupported node type: ${raw.getName()}`);
    }
  }
}

export default NodeFactory;

export {
  Node,
  NodeTypes,
  ContractWriteNode,
  ContractReadNode,
  BranchNode,
  ETHTransferNode,
  GraphQLQueryNode,
  RestAPINode,
  CustomCodeNode,
  CustomCodeLangs,
};

export type {
  NodeType,
  NodeProps,
  ContractWriteNodeProps,
  ContractReadNodeProps,
  BranchNodeProps,
  BranchNodeData,
  ETHTransferNodeProps,
  GraphQLQueryNodeProps,
  RestAPINodeProps,
  CustomCodeNodeProps,
};
