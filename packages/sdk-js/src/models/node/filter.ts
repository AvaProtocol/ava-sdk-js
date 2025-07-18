import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  NodeType,
  FilterNodeData,
  FilterNodeProps,
  NodeProps,
} from "@avaprotocol/types";
import { convertInputToProtobuf, extractInputFromProtobuf } from "../../utils";
import { Value } from "google-protobuf/google/protobuf/struct_pb";

// Required props for constructor: id, name, type and data: { expression, sourceId }

class FilterNode extends Node {
  constructor(props: FilterNodeProps) {
    super({ ...props, type: NodeType.Filter, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): FilterNode {
    // Convert the raw object to FilterNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;

    // Extract input data if present
    const input = extractInputFromProtobuf(raw.getFilter()?.getInput());

    return new FilterNode({
      ...obj,
      type: NodeType.Filter,
      data: raw.getFilter()!.getConfig()!.toObject() as FilterNodeData,
      input: input,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = new avs_pb.FilterNode();

    const config = new avs_pb.FilterNode.Config();
    config.setExpression((this.data as FilterNodeData).expression);
    config.setSourceId((this.data as FilterNodeData).sourceId || "");
    node.setConfig(config);

    // Set input data if provided
    const inputValue = convertInputToProtobuf(this.input);
    if (inputValue) {
      node.setInput(inputValue);
    }

    request.setFilter(node);
    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const filterOutput = outputData.getFilter();

    if (!filterOutput) {
      throw new Error("FilterNode output data is missing");
    }

    const anyData = filterOutput.getData();
    if (!anyData) {
      throw new Error("FilterNode output data.getData() is missing");
    }

    // Unpack the Any to get the Value
    const value = Value.deserializeBinary(anyData.getValue_asU8());

    // Convert the Value to JavaScript
    const result = value.toJavaScript();

    // The result contains the entire response object, extract the data array
    if (
      result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      (result as any).data
    ) {
      return (result as any).data;
    }

    throw new Error(
      "FilterNode output data does not contain expected data structure"
    );
  }
}

export default FilterNode;
