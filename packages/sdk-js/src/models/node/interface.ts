import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, NodeTypeGoConverter, NodeTypeConverter, NodeProps, NodeData } from "@avaprotocol/types";
import _ from "lodash";

// Function to convert TaskStatus to string
export function covertNodeTypeToString(
  status: avs_pb.TaskNode.TaskTypeCase
): NodeType {
  const conversionMap: { [key in avs_pb.TaskNode.TaskTypeCase]: NodeType } = {
    [avs_pb.TaskNode.TaskTypeCase.ETH_TRANSFER]: NodeType.ETHTransfer,
    [avs_pb.TaskNode.TaskTypeCase.CONTRACT_WRITE]: NodeType.ContractWrite,
    [avs_pb.TaskNode.TaskTypeCase.CONTRACT_READ]: NodeType.ContractRead,
    [avs_pb.TaskNode.TaskTypeCase.GRAPHQL_QUERY]: NodeType.GraphQLQuery,
    [avs_pb.TaskNode.TaskTypeCase.REST_API]: NodeType.RestAPI,
    [avs_pb.TaskNode.TaskTypeCase.BRANCH]: NodeType.Branch,
    [avs_pb.TaskNode.TaskTypeCase.FILTER]: NodeType.Filter,
    [avs_pb.TaskNode.TaskTypeCase.LOOP]: NodeType.Loop,
    [avs_pb.TaskNode.TaskTypeCase.CUSTOM_CODE]: NodeType.CustomCode,
    [avs_pb.TaskNode.TaskTypeCase.TASK_TYPE_NOT_SET]: NodeType.Unspecified,
  };

  return conversionMap[status] as NodeType;
}

// Option 2: Use protobuf NodeType directly
export type ProtobufNodeProps = Omit<
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
  // Keep the protobuf type field as-is (numeric enum)
  data: any; // Use any for protobuf data since it's different from our custom NodeData
};

// Utility functions to work with protobuf NodeProps
export const ProtobufNodePropsUtils = {
  // Get the Go backend string representation of the node type
  getGoStringType: (props: ProtobufNodeProps): string => {
    return NodeTypeGoConverter.toGoString(props.type);
  },
  
  // Create ProtobufNodeProps from Go string type
  fromGoStringType: (goStringType: string, baseProps: Omit<ProtobufNodeProps, 'type'>): ProtobufNodeProps => {
    return {
      ...baseProps,
      type: NodeTypeGoConverter.fromGoString(goStringType)
    };
  }
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
    const raw = request.serializeBinary();
    const parsed = avs_pb.TaskNode.deserializeBinary(raw);
    if (!_.isEqual(request, parsed)) {
      throw new Error("Invalid request object");
    }

    return request;
  }
}

export default Node;
