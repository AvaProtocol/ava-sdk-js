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

  static fromResponse(raw: avs_pb.TaskNode): RestAPINode {
    // Convert the raw object to RestAPINodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;

    // Extract input data from top-level TaskNode.input field (not nested RestAPINode.input)
    // This matches where we set it in toRequest() and where the Go backend looks for it
    let input: Record<string, any> | undefined = undefined;
    if (raw.hasInput()) {
      input = extractInputFromProtobuf(raw.getInput());
    }

    return new RestAPINode({
      ...obj,
      type: NodeType.RestAPI,
      data: raw.getRestApi()!.getConfig()!.toObject() as RestAPINodeData,
      input: input, // Include input data from top-level TaskNode
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.RestAPINode();

    const config = new avs_pb.RestAPINode.Config();
    config.setUrl((this.data as RestAPINodeData).url);
    config.setMethod((this.data as RestAPINodeData).method);
    config.setBody((this.data as RestAPINodeData).body || "");

    if (
      (this.data as RestAPINodeData).headersMap &&
      (this.data as RestAPINodeData).headersMap.length > 0
    ) {
      const headersMap = config.getHeadersMap();
      (this.data as RestAPINodeData).headersMap.forEach(
        ([key, value]: [string, string]) => {
          headersMap.set(key, value);
        }
      );
    }

    nodeData.setConfig(config);

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

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
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
