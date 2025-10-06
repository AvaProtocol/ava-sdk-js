import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  NodeType,
  CustomCodeNodeData,
  CustomCodeNodeProps,
  NodeProps,
  Lang,
  LangConverter,
} from "@avaprotocol/types";
import {
  convertProtobufValueToJs,
  convertInputToProtobuf,
  extractInputFromProtobuf,
} from "../../utils";

// Required props for constructor: id, name, type and data: { lang: number, source: string }

class CustomCodeNode extends Node {
  constructor(props: CustomCodeNodeProps) {
    super({ ...props, type: NodeType.CustomCode, data: props.data });
  }


  /**
   * Create a protobuf CustomCodeNode from config data
   * @param configData - The configuration data for the custom code node
   * @returns Configured avs_pb.CustomCodeNode
   */
  static createProtobufNode(configData: {
    lang: Lang;
    source: string;
  }): avs_pb.CustomCodeNode {
    const node = new avs_pb.CustomCodeNode();
    const config = new avs_pb.CustomCodeNode.Config();

    // Convert lang to protobuf enum using centralized converter
    const langValue = LangConverter.toProtobuf(configData.lang);
    config.setLang(langValue);
    config.setSource(configData.source);

    node.setConfig(config);
    return node;
  }

  static fromResponse(raw: avs_pb.TaskNode): CustomCodeNode {
    // Convert the raw object to CustomCodeNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;

    // Get the raw protobuf config
    const customCodeNode = raw.getCustomCode();
    if (!customCodeNode) {
      throw new Error("CustomCode node data is missing");
    }
    
    const config = customCodeNode.getConfig();
    if (!config) {
      throw new Error("CustomCode config is missing");
    }

    const convertedConfig: CustomCodeNodeData = {
      lang: LangConverter.fromProtobuf(config.getLang()),
      source: config.getSource(),
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

    const node = CustomCodeNode.createProtobufNode(
      this.data as CustomCodeNodeData
    );

    request.setCustomCode(node);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const customCodeOutput = outputData.getCustomCode();
    if (customCodeOutput?.getData()) {
      // Use the modern protobuf conversion function
      const result = convertProtobufValueToJs(customCodeOutput.getData());

      // SPECIAL FIX: Check if the result is incorrectly wrapped with a single "data" property
      // This handles the case where primitive values get wrapped as {"data": value}
      if (
        result &&
        typeof result === "object" &&
        Object.keys(result).length === 1 &&
        "data" in result
      ) {
        return result.data;
      }

      return result;
    }
    return null;
  }
}

export default CustomCodeNode;
