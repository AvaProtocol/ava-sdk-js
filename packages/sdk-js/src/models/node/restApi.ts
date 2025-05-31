import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  NodeType,
  RestAPINodeData,
  RestAPINodeOutput,
} from "@avaprotocol/types";
import { convertProtobufValueToJs } from "../../utils";

// Required props for constructor: id, name, type and data: { url, method, headersMap, body }
export type RestAPINodeProps = NodeProps & {
  data: RestAPINodeData;
};

class RestAPINode extends Node {
  constructor(props: RestAPINodeProps) {
    super({ ...props, type: NodeType.RestAPI, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): RestAPINode {
    // Convert the raw object to RestAPINodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as RestAPINodeProps;
    return new RestAPINode({
      ...obj,
      type: NodeType.RestAPI,
      data: raw.getRestApi()!.getConfig()!.toObject() as RestAPINodeData,
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

    request.setRestApi(nodeData);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const restApiOutput = outputData.getRestApi();
    if (!restApiOutput) {
      console.log("Debug RestAPI: No restApiOutput found");
      return null;
    }

    console.log("Debug RestAPI: fromOutputData", restApiOutput.toObject());

    return restApiOutput.toObject();
  }
}

export default RestAPINode;
