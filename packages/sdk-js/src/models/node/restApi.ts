import { NodeProps, NodeTypes } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";

// Required props for constructor: id, name, type and data: { url, method, headersMap, body }
type RestAPINodeData = avs_pb.RestAPINode.AsObject;
export type RestAPINodeProps = NodeProps & {
  data: RestAPINodeData;
};

class RestAPINode extends Node {
  constructor(props: RestAPINodeProps) {
    super({ ...props, type: NodeTypes.REST_API, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): RestAPINode {
    // Convert the raw object to RestAPINodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as RestAPINodeProps;
    return new RestAPINode({
      ...obj,
      type: NodeTypes.REST_API,
      data: raw.getRestApi()!.toObject() as RestAPINodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.RestAPINode();
    nodeData.setUrl((this.data as RestAPINodeData).url);
    nodeData.setMethod((this.data as RestAPINodeData).method);
    nodeData.setBody((this.data as RestAPINodeData).body);

    const headers = (this.data as RestAPINodeData).headersMap;
    const headersMap = nodeData.getHeadersMap();
    headers.forEach(([key, value]) => {
      headersMap.set(key, value);
    });

    request.setRestApi(nodeData);

    return request;
  }
}

export default RestAPINode;
