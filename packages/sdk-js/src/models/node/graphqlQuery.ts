import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { config: { url, query, variablesMap } }
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
    
    if ((this.data as GraphQLQueryNodeData).config) {
      const config = new avs_pb.GraphQLQueryNode.Config();
      config.setUrl((this.data as GraphQLQueryNodeData).config!.url);
      config.setQuery((this.data as GraphQLQueryNodeData).config!.query);
      
      if ((this.data as GraphQLQueryNodeData).config!.variablesMap && 
          (this.data as GraphQLQueryNodeData).config!.variablesMap.length > 0) {
        const variablesMap = config.getVariablesMap();
        (this.data as GraphQLQueryNodeData).config!.variablesMap.forEach(([key, value]: [string, string]) => {
          variablesMap.set(key, value);
        });
      }
      
      nodeData.setConfig(config);
    }

    request.setGraphqlQuery(nodeData);

    return request;
  }
}

export default GraphQLQueryNode;
