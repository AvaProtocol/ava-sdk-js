import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  NodeType,
  GraphQLQueryNodeData,
  GraphQLQueryNodeProps,
  NodeProps,
} from "@avaprotocol/types";
import { convertProtobufValueToJs } from "../../utils";

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
    variables?: Record<string, string>;
  }): avs_pb.GraphQLQueryNode {
    const node = new avs_pb.GraphQLQueryNode();
    const config = new avs_pb.GraphQLQueryNode.Config();

    config.setUrl(configData.url);
    config.setQuery(configData.query);

    if (configData.variables && Object.keys(configData.variables).length > 0) {
      const variablesMap = config.getVariablesMap();
      Object.entries(configData.variables).forEach(([key, value]) => {
        variablesMap.set(key, value);
      });
    }

    node.setConfig(config);
    return node;
  }

  static fromResponse(raw: avs_pb.TaskNode): GraphQLQueryNode {
    // Convert the raw object to GraphQLQueryNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;

    const config = raw.getGraphqlQuery()!.getConfig()!;
    const variablesMap = config.getVariablesMap();
    const variables: Record<string, string> = {};

    variablesMap.forEach((value, key) => {
      variables[key] = value;
    });

    return new GraphQLQueryNode({
      ...obj,
      type: NodeType.GraphQLQuery,
      data: {
        url: config.getUrl(),
        query: config.getQuery(),
        variables: variables,
      } as GraphQLQueryNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = GraphQLQueryNode.createProtobufNode(
      this.data as GraphQLQueryNodeData
    );

    request.setGraphqlQuery(node);

    return request;
  }

  static fromOutputData(
    outputData: avs_pb.RunNodeWithInputsResp
  ): Record<string, unknown> | null {
    const graphqlOutput = outputData.getGraphql();
    if (!graphqlOutput) {
      return null;
    }

    // Use convertProtobufValueToJs to get clean JavaScript objects
    const rawData = graphqlOutput.getData();
    if (rawData) {
      return convertProtobufValueToJs(rawData);
    }

    return null;
  }
}

export default GraphQLQueryNode;
