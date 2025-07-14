import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, GraphQLQueryNodeData, GraphQLQueryNodeProps, NodeProps } from "@avaprotocol/types";
import { convertInputToProtobuf, extractInputFromProtobuf } from "../../utils";

// Required props for constructor: id, name, type and data: { url, query, variablesMap }


class GraphQLQueryNode extends Node {
  constructor(props: GraphQLQueryNodeProps) {
    super({
      ...props,
      type: NodeType.GraphQLQuery,
      data: props.data,
    });
  }

  /**
   * Create a protobuf GraphQLQueryNode from config data
   * @param configData - The configuration data for the GraphQL query node
   * @returns Configured avs_pb.GraphQLQueryNode
   */
  static createProtobufNode(configData: {
    url: string;
    query: string;
    variablesMap?: Array<[string, string]>;
  }): avs_pb.GraphQLQueryNode {
    const node = new avs_pb.GraphQLQueryNode();
    const config = new avs_pb.GraphQLQueryNode.Config();
    
    config.setUrl(configData.url);
    config.setQuery(configData.query);
    
    if (configData.variablesMap && configData.variablesMap.length > 0) {
      const variablesMap = config.getVariablesMap();
      configData.variablesMap.forEach(([key, value]: [string, string]) => {
        variablesMap.set(key, value);
      });
    }
    
    node.setConfig(config);
    return node;
  }

  static fromResponse(raw: avs_pb.TaskNode): GraphQLQueryNode {
    // Convert the raw object to GraphQLQueryNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    
    // Extract input data if present
    const input = extractInputFromProtobuf(raw.getGraphqlQuery()?.getInput());
    
    return new GraphQLQueryNode({
      ...obj,
      type: NodeType.GraphQLQuery,
      data: raw.getGraphqlQuery()!.getConfig()!.toObject() as GraphQLQueryNodeData,
      input: input,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = GraphQLQueryNode.createProtobufNode(
      this.data as GraphQLQueryNodeData
    );

    // Set input data if provided
    const inputValue = convertInputToProtobuf(this.input);
    if (inputValue) {
      node.setInput(inputValue);
    }

    request.setGraphqlQuery(node);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const graphqlOutput = outputData.getGraphql();
    return graphqlOutput?.toObject() || null;
  }
}

export default GraphQLQueryNode;
