import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  NodeType,
  RestAPINodeData,
  RestAPINodeProps,
  NodeProps,
} from "@avaprotocol/types";
import {
  convertProtobufValueToJs,
  convertInputToProtobuf,
  extractInputFromProtobuf,
} from "../../utils";

// Required props for constructor: id, name, type and data: { url, method, headersMap, body }

class RestAPINode extends Node {
  constructor(props: RestAPINodeProps) {
    super({ ...props, type: NodeType.RestAPI, data: props.data });
  }

  /**
   * Create a protobuf RestAPINode from config data
   * @param configData - The configuration data for the REST API node
   * @returns Configured avs_pb.RestAPINode
   */
  static createProtobufNode(configData: {
    url: string;
    method: string;
    body?: string;
    headers?: Record<string, string>;
  }): avs_pb.RestAPINode {
    const node = new avs_pb.RestAPINode();
    const config = new avs_pb.RestAPINode.Config();
    
    config.setUrl(configData.url);
    config.setMethod(configData.method);
    config.setBody(configData.body || "");

    if (configData.headers && Object.keys(configData.headers).length > 0) {
      const headersMap = config.getHeadersMap();
      Object.entries(configData.headers).forEach(([key, value]) => {
        headersMap.set(key, value);
      });
    }

    node.setConfig(config);
    return node;
  }

  static fromResponse(raw: avs_pb.TaskNode): RestAPINode {
    // Convert the raw object to RestAPINodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;

    // Extract input data from top-level TaskNode.input field (not nested RestAPINode.input)
    // This matches where we set it in toRequest() and where the Go backend looks for it
    let input: Record<string, unknown> | undefined = undefined;
    if (raw.hasInput()) {
      input = extractInputFromProtobuf(raw.getInput());
    }

    return new RestAPINode({
      ...obj,
      type: NodeType.RestAPI,
      data: {
        url: raw.getRestApi()!.getConfig()!.getUrl(),
        method: raw.getRestApi()!.getConfig()!.getMethod(),
        body: raw.getRestApi()!.getConfig()!.getBody(),
        headers: (() => {
          const headersMap = raw.getRestApi()!.getConfig()!.getHeadersMap();
          const headers: Record<string, string> = {};
          headersMap.forEach((value: string, key: string) => {
            headers[key] = value;
          });
          return headers;
        })(),
      } as RestAPINodeData,
      input: input, // Include input data from top-level TaskNode
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = RestAPINode.createProtobufNode(
      this.data as RestAPINodeData
    );

    // Use the standard utility function to convert input field to protobuf format
    const inputValue = convertInputToProtobuf(this.input);

    if (inputValue) {
      // Set input on the top-level TaskNode, not the nested RestAPINode
      // This matches where the Go backend's ExtractNodeInputData() looks for it
      request.setInput(inputValue);
    }

    request.setRestApi(nodeData);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): Record<string, unknown> | null {
    const restApiOutput = outputData.getRestApi();
    if (!restApiOutput) {
      console.log("Debug RestAPI: No restApiOutput found");
      return null;
    }

    // Use convertProtobufValueToJs to get clean JavaScript objects
    const rawData = restApiOutput.getData();
    if (rawData) {
      return convertProtobufValueToJs(rawData);
    }

    return restApiOutput.toObject();
  }
}

export default RestAPINode;
