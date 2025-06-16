import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, FilterNodeData, FilterNodeProps, NodeProps } from "@avaprotocol/types";
import { convertJSValueToProtobuf, convertProtobufValueToJs } from "../../utils";

// Required props for constructor: id, name, type and data: { expression, sourceId }


class FilterNode extends Node {
  constructor(props: FilterNodeProps) {
    super({ ...props, type: NodeType.Filter, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): FilterNode {
    // Convert the raw object to FilterNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    
    let input: any = undefined;
    if (raw.hasInput()) {
      input = convertProtobufValueToJs(raw.getInput());
    }
    
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

    if (this.input !== undefined) {
      const inputValue = convertJSValueToProtobuf(this.input);
      request.setInput(inputValue);
    }

    const nodeData = new avs_pb.FilterNode();
    
    const config = new avs_pb.FilterNode.Config();
    config.setExpression((this.data as FilterNodeData).expression);
    config.setSourceId((this.data as FilterNodeData).sourceId || '');
    nodeData.setConfig(config);

    request.setFilter(nodeData);
    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const filterOutput = outputData.getFilter();
    return filterOutput?.toObject() || null;
  }
}

export default FilterNode;
