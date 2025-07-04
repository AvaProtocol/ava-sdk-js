import * as avs_pb from "@/grpc_codegen/avs_pb";
import _ from "lodash";
import ContractWriteNode from "./contractWrite";
import CustomCodeNode from "./customCode";
import GraphQLQueryNode from "./graphqlQuery";
import Node from "./interface";
import RestAPINode from "./restApi";
import ContractReadNode from "./contractRead";
import ETHTransferNode from "./ethTransfer";
import BranchNode from "./branch";
import FilterNode from "./filter";
import LoopNode from "./loop";
import { 
  NodeType,
  ContractWriteNodeData,
  ContractReadNodeData,
  BranchNodeData,
  ETHTransferNodeData,
  GraphQLQueryNodeData,
  RestAPINodeData,
  CustomCodeNodeData,
  FilterNodeData,
  LoopNodeData,
  NodeProps,
  ContractWriteNodeProps,
  ContractReadNodeProps,
  BranchNodeProps,
  ETHTransferNodeProps,
  GraphQLQueryNodeProps,
  RestAPINodeProps,
  CustomCodeNodeProps,
  FilterNodeProps,
  LoopNodeProps
} from "@avaprotocol/types";

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
      case NodeType.Loop:
        return new LoopNode(props as LoopNodeProps);
      case NodeType.Unspecified:
        throw new Error("Cannot create node with unspecified type");
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
      case !!raw.getLoop():
        return LoopNode.fromResponse(raw);
      default:
        throw new Error(`Unsupported node type: ${raw.getName()}`);
    }
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    // Delegate to the specific node type's fromOutputData method
    // This is the correct approach, similar to how TriggerFactory.fromOutputData works
    
    switch (outputData.getOutputDataCase()) {
      case avs_pb.RunNodeWithInputsResp.OutputDataCase.REST_API:
        return RestAPINode.fromOutputData(outputData);
      case avs_pb.RunNodeWithInputsResp.OutputDataCase.CUSTOM_CODE:
        return CustomCodeNode.fromOutputData(outputData);
      case avs_pb.RunNodeWithInputsResp.OutputDataCase.CONTRACT_READ:
        return ContractReadNode.fromOutputData(outputData);
      case avs_pb.RunNodeWithInputsResp.OutputDataCase.CONTRACT_WRITE:
        return ContractWriteNode.fromOutputData(outputData);
      case avs_pb.RunNodeWithInputsResp.OutputDataCase.ETH_TRANSFER:
        return ETHTransferNode.fromOutputData(outputData);
      case avs_pb.RunNodeWithInputsResp.OutputDataCase.GRAPHQL:
        return GraphQLQueryNode.fromOutputData(outputData);
      case avs_pb.RunNodeWithInputsResp.OutputDataCase.BRANCH:
        return BranchNode.fromOutputData(outputData);
      case avs_pb.RunNodeWithInputsResp.OutputDataCase.FILTER:
        return FilterNode.fromOutputData(outputData);
      case avs_pb.RunNodeWithInputsResp.OutputDataCase.LOOP:
        return LoopNode.fromOutputData(outputData);
      case avs_pb.RunNodeWithInputsResp.OutputDataCase.OUTPUT_DATA_NOT_SET:
      default:
        throw new Error(`Unsupported output data case: ${outputData.getOutputDataCase()}`);
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
  FilterNode,
  LoopNode,
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
  LoopNodeData,
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
  LoopNodeProps,
};
