import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { url, query, variablesMap }
export type GraphQLQueryNodeData = avs_pb.GraphQLQueryNode.AsObject;
export type GraphQLQueryNodeProps = NodeProps & {
  data: GraphQLQueryNodeData;
};

class GraphQLQueryNode extends Node {
  constructor(props: GraphQLQueryNodeProps) {
    super({
      ...props,
      type: NodeType.GraphQLQuery,
      data: props.data,
    });
  }

  static fromResponse(raw: avs_pb.TaskNode): GraphQLQueryNode {
    // Convert the raw object to GraphQLQueryNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as GraphQLQueryNodeProps;
    return new GraphQLQueryNode({
      ...obj,
      type: NodeType.GraphQLQuery,
      data: raw.getGraphqlQuery()!.toObject() as GraphQLQueryNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.GraphQLQueryNode();
    nodeData.setUrl((this.data as GraphQLQueryNodeData).url);
    nodeData.setQuery((this.data as GraphQLQueryNodeData).query);
    const variables = (this.data as GraphQLQueryNodeData).variablesMap;
    const variablesMap = nodeData.getVariablesMap();
    variables.forEach(([key, value]) => {
      variablesMap.set(key, value);
    });

    request.setGraphqlQuery(nodeData);

    return request;
  }
}

export default GraphQLQueryNode;
