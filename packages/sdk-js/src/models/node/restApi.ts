import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  NodeType,
  RestAPINodeData,
  RestAPINodeProps,
  NodeProps,
} from "@avaprotocol/types";
import { convertProtobufValueToJs, convertJSValueToProtobuf } from "../../utils";

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
    options?: Record<string, unknown>;
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

    if (configData.options) {
      config.setOptions(convertJSValueToProtobuf(configData.options));
    }

    node.setConfig(config);
    return node;
  }

  static fromResponse(raw: avs_pb.TaskNode): RestAPINode {
    // Convert the raw object to RestAPINodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;

    const config = raw.getRestApi()!.getConfig()!;

    return new RestAPINode({
      ...obj,
      type: NodeType.RestAPI,
      data: {
        url: config.getUrl(),
        method: config.getMethod(),
        body: config.getBody(),
        headers: (() => {
          const headersMap = config.getHeadersMap();
          const headers: Record<string, string> = {};
          headersMap.forEach((value: string, key: string) => {
            headers[key] = value;
          });
          return headers;
        })(),
        options: (() => {
          const optionsProto = config.getOptions();
          if (optionsProto) {
            return convertProtobufValueToJs(optionsProto) as Record<string, unknown>;
          }
          return undefined;
        })(),
      } as RestAPINodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);
    request.setType(avs_pb.NodeType.NODE_TYPE_REST_API);

    const nodeData = RestAPINode.createProtobufNode(
      this.data as RestAPINodeData
    );

    request.setRestApi(nodeData);

    return request;
  }

  static fromOutputData(
    outputData: avs_pb.RunNodeWithInputsResp
  ): Record<string, unknown> | null {
    const restApiOutput = outputData.getRestApi();
    if (!restApiOutput) {
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
