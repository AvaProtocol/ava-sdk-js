import * as avs_pb from "../../../grpc_codegen/avs_pb";
import ContractWriteNode, { ContractWriteNodeProps } from "./contractWrite";
import CustomCodeNode from "./customCode";
import GraphQLQueryNode from "./graphqlQuery";
import Node, { NodeProps, NodeTypes } from "./interface";
import _ from "lodash";
import RestAPINode from "./restApi";
import ContractReadNode from "./contractRead";
import ETHTransferNode from "./ethTransfer";

class NodeFactory {
  static create(props: NodeProps): Node {
    switch (props.type) {
      case NodeTypes.CONTRACT_WRITE:
        return new ContractWriteNode(props as ContractWriteNodeProps);
      default:
        throw new Error(`Unsupported node type: ${props.type}`);
    }
  }

  static createNodes(props: NodeProps[]): Node[] {
    return _.map(props, (node) => this.create(node));
  }

  static fromResponse(raw: avs_pb.TaskNode): Node {
    console.log("NodeFactory.fromResponse.raw:", raw.toObject());
    console.log(
      "NodeFactory.fromResponse.!!raw.getContractWrite():",
      !!raw.getContractWrite()
    );
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
      default:
        throw new Error(`Unsupported node type: ${raw.getName()}`);
    }
  }
}

export default NodeFactory;
