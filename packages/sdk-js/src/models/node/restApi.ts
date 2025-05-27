import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { config: { url, method, headersMap, body } }
export type RestAPINodeData = avs_pb.RestAPINode.AsObject;
export type RestAPINodeOutput = avs_pb.RestAPINode.Output.AsObject;

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
      data: raw.getRestApi()!.toObject() as RestAPINodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.RestAPINode();
    
    if ((this.data as RestAPINodeData).config) {
      const config = new avs_pb.RestAPINode.Config();
      config.setUrl((this.data as RestAPINodeData).config!.url);
      config.setMethod((this.data as RestAPINodeData).config!.method);
      config.setBody((this.data as RestAPINodeData).config!.body || "");
      
      if ((this.data as RestAPINodeData).config!.headersMap && 
          (this.data as RestAPINodeData).config!.headersMap.length > 0) {
        const headersMap = config.getHeadersMap();
        (this.data as RestAPINodeData).config!.headersMap.forEach(([key, value]: [string, string]) => {
          headersMap.set(key, value);
        });
      }
      
      nodeData.setConfig(config);
    }

    request.setRestApi(nodeData);

    return request;
  }
}

export default RestAPINode;
