import * as avs_pb from "../../../grpc_codegen/avs_pb";
import _ from "lodash";
export const NodeTypes = avs_pb.TaskNode.TaskTypeCase; // an enum of node types
export type NodeType = avs_pb.TaskNode.TaskTypeCase;
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
> & {
  type: avs_pb.TaskNode.TaskTypeCase;
  data: NodeData;
};

class Node implements NodeProps {
  id: string;
  name: string;
  type: NodeType;
  data: NodeData;

  constructor(props: NodeProps) {
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.data = props.data;
  }

  static getTypeAndData(obj: avs_pb.TaskNode.AsObject): {
    type: NodeType;
    data: NodeData;
  } {
    switch (true) {
      case !!obj.ethTransfer:
        return { type: NodeTypes.ETH_TRANSFER, data: obj.ethTransfer };
      case !!obj.contractWrite:
        return { type: NodeTypes.CONTRACT_WRITE, data: obj.contractWrite };
      case !!obj.contractRead:
        return { type: NodeTypes.CONTRACT_READ, data: obj.contractRead };
      case !!obj.graphqlDataQuery:
        return {
          type: NodeTypes.GRAPHQL_DATA_QUERY,
          data: obj.graphqlDataQuery,
        };
      case !!obj.restApi:
        return { type: NodeTypes.REST_API, data: obj.restApi };
      case !!obj.branch:
        return { type: NodeTypes.BRANCH, data: obj.branch };
      case !!obj.filter:
        return { type: NodeTypes.FILTER, data: obj.filter };
      case !!obj.loop:
        return { type: NodeTypes.LOOP, data: obj.loop };
      case !!obj.customCode:
        return { type: NodeTypes.CUSTOM_CODE, data: obj.customCode };
      default:
        throw new Error("Unknown node type");
    }
  }

  // static fromResponse(res: avs_pb.TaskNode): Node {
  //   const raw = res.toObject() as avs_pb.TaskNode.AsObject;

  //   const { type, data } = Node.getTypeAndData(raw);

  //   return new Node({
  //     id: raw.id,
  //     name: raw.name,
  //     type: type,
  //     data: data,
  //   });
  // }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();
    console.log("Node.toRequest.request:", request);
    const raw = request.serializeBinary();
    const parsed = avs_pb.TaskNode.deserializeBinary(raw);
    if (!_.isEqual(request, parsed)) {
      throw new Error("Invalid request object");
    }

    return request;
  }
}

export default Node;
