import { NodeProps, NodeTypes } from "./interface";
import Node from "./interface";
import * as avs_pb from "../../../grpc_codegen/avs_pb";

// Required props for constructor: id, name, type and data: { lang: CustomCodeLang, source: string }
type CustomCodeNodeData = avs_pb.CustomCodeNode.AsObject;
export const CustomCodeLangs = avs_pb.CustomCodeLang;
export type CustomCodeNodeProps = NodeProps & {
  data: CustomCodeNodeData;
};

class CustomCodeNode extends Node {
  constructor(props: CustomCodeNodeProps) {
    super({ ...props, type: NodeTypes.CUSTOM_CODE, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): CustomCodeNode {
    // Convert the raw object to CustomCodeNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as CustomCodeNodeProps;
    return new CustomCodeNode({
      ...obj,
      type: NodeTypes.CUSTOM_CODE,
      data: raw.getCustomCode()!.toObject() as CustomCodeNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.CustomCodeNode();
    nodeData.setLang((this.data as CustomCodeNodeData).lang);
    nodeData.setSource((this.data as CustomCodeNodeData).source);

    request.setCustomCode(nodeData);

    return request;
  }
}

export default CustomCodeNode;
