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

// Required props for constructor: id, name, type and data: { expression, inputNodeName }

class FilterNode extends Node {
  constructor(props: FilterNodeProps) {
    super({ ...props, type: NodeType.Filter, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): FilterNode {
    // Convert the raw object to FilterNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;

    return new FilterNode({
      ...obj,
      type: NodeType.Filter,
      data: raw.getFilter()!.getConfig()!.toObject() as FilterNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = new avs_pb.FilterNode();

    const config = new avs_pb.FilterNode.Config();
    config.setExpression((this.data as FilterNodeData).expression);
    config.setInputNodeName((this.data as FilterNodeData).inputNodeName || "");
    node.setConfig(config);

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

    // The data is now directly a Value, not wrapped in Any
    const result = anyData.toJavaScript();

    // The result contains nested data structure, extract the actual array
    if (
      result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      (result as any).data &&
      (result as any).data.data &&
      Array.isArray((result as any).data.data)
    ) {
      return (result as any).data.data;
    }

    // If result.data is already an array, return it directly
    if (
      result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      (result as any).data &&
      Array.isArray((result as any).data)
    ) {
      return (result as any).data;
    }

    // If result is already an array, return it directly
    if (Array.isArray(result)) {
      return result;
    }

    throw new Error(
      "FilterNode output data does not contain expected data structure"
    );
  }
}

export default FilterNode;
