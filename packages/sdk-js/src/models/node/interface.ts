import * as avs_pb from "@/grpc_codegen/avs_pb";
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
