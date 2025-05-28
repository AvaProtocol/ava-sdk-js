import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { config: { lang: number, source: string } }
export type CustomCodeNodeData = avs_pb.CustomCodeNode.AsObject;
export const CustomCodeLangs = {
  JAVASCRIPT: 0,
  PYTHON: 1
};
export type CustomCodeNodeProps = NodeProps & {
  data: CustomCodeNodeData;
};

class CustomCodeNode extends Node {
  constructor(props: CustomCodeNodeProps) {
    super({ ...props, type: NodeType.CustomCode, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): CustomCodeNode {
    // Convert the raw object to CustomCodeNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as CustomCodeNodeProps;
    return new CustomCodeNode({
      ...obj,
      type: NodeType.CustomCode,
      data: raw.getCustomCode()!.toObject() as CustomCodeNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.CustomCodeNode();
    
    if ((this.data as CustomCodeNodeData).config) {
      const config = new avs_pb.CustomCodeNode.Config();
      config.setLang((this.data as CustomCodeNodeData).config!.lang);
      config.setSource((this.data as CustomCodeNodeData).config!.source);
      nodeData.setConfig(config);
    }

    request.setCustomCode(nodeData);

    return request;
  }
}

export default CustomCodeNode;
