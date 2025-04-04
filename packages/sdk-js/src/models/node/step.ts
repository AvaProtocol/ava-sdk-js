import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "@avaprotocol/types";
import GraphQLQueryNode from "./graphqlQuery";
import RestAPINode from "./restAPI";

// Required props for constructor: id, name, type and data: { nodes }
export type StepNodeData = avs_pb.StepNode.AsObject;
export type StepNodeProps = NodeProps & {
  data: StepNodeData;
};

class StepNode extends Node {
  constructor(props: StepNodeProps) {
    super({
      ...props,
      type: NodeType.Step,
      data: props.data,
    });
  }

  static fromResponse(raw: avs_pb.TaskNode): StepNode {
    // Convert the raw object to StepNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as StepNodeProps;
    return new StepNode({
      ...obj,
      type: NodeType.Step,
      data: raw.getStep()!.toObject() as StepNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.StepNode();
    const nodes = (this.data as StepNodeData).nodes;
    const nodesList = nodeData.getNodesList();
    nodes.forEach((node) => {
      const taskNode = new avs_pb.TaskNode();
      taskNode.setId(node.id);
      taskNode.setName(node.name);

      // Handle different node types
      switch (node.type) {
        case NodeType.GraphQLQuery:
          const graphqlNode = new avs_pb.GraphQLQueryNode();
          graphqlNode.setUrl(node.data.url);
          graphqlNode.setQuery(node.data.query);
          const variables = node.data.variablesMap;
          const variablesMap = graphqlNode.getVariablesMap();
          variables.forEach(([key, value]) => {
            variablesMap.set(key, value);
          });
          taskNode.setGraphqlQuery(graphqlNode);
          break;
        case NodeType.RestAPI:
          const restApiNode = new avs_pb.RestAPINode();
          restApiNode.setUrl(node.data.url);
          restApiNode.setMethod(node.data.method);
          restApiNode.setBody(node.data.body);
          const headers = node.data.headersMap;
          const headersMap = restApiNode.getHeadersMap();
          headers.forEach(([key, value]) => {
            headersMap.set(key, value);
          });
          taskNode.setRestApi(restApiNode);
          break;
        // Add other node types as needed
        default:
          throw new Error(`Unsupported node type: ${node.type}`);
      }

      nodesList.push(taskNode);
    });

    request.setStep(nodeData);

    return request;
  }
}

export default StepNode; 