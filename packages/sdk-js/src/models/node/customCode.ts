import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  NodeType,
  CustomCodeNodeData,
  CustomCodeLang,
  CustomCodeNodeProps,
  NodeProps,
} from "@avaprotocol/types";
import { convertProtobufValueToJs } from "../../utils";

// Required props for constructor: id, name, type and data: { lang: number, source: string }

class CustomCodeNode extends Node {
  constructor(props: CustomCodeNodeProps) {
    super({ ...props, type: NodeType.CustomCode, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): CustomCodeNode {
    // Convert the raw object to CustomCodeNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;

    // Get the raw protobuf config and convert to our custom interface
    const rawConfig = raw.getCustomCode()!.getConfig()!.toObject();

    const convertedConfig: CustomCodeNodeData = {
      lang: rawConfig.lang as unknown as CustomCodeLang,
      source: rawConfig.source,
    };

    return new CustomCodeNode({
      ...obj,
      type: NodeType.CustomCode,
      data: convertedConfig,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.CustomCodeNode();

    const config = new avs_pb.CustomCodeNode.Config();

    // Set lang using enum value (cast to protobuf Lang type)
    config.setLang((this.data as CustomCodeNodeData).lang as any);
    config.setSource((this.data as CustomCodeNodeData).source);

    nodeData.setConfig(config);

    request.setCustomCode(nodeData);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const customCodeOutput = outputData.getCustomCode();
    if (customCodeOutput?.getData()) {
      // Use the modern protobuf conversion function
      return convertProtobufValueToJs(customCodeOutput.getData());
    }
    return null;
  }
}

export default CustomCodeNode;
