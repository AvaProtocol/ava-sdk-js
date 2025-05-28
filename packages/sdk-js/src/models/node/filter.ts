import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { config: { expression, input } }
export type FilterNodeData = avs_pb.FilterNode.AsObject;
export type FilterNodeProps = NodeProps & {
  data: FilterNodeData;
};

class FilterNode extends Node {
  constructor(props: FilterNodeProps) {
    super({ ...props, type: NodeType.Filter, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): FilterNode {
    // Convert the raw object to FilterNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as FilterNodeProps;
    return new FilterNode({
      ...obj,
      type: NodeType.Filter,
      data: raw.getFilter()!.toObject() as FilterNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.FilterNode();
    
    if ((this.data as FilterNodeData).config) {
      const config = new avs_pb.FilterNode.Config();
      config.setExpression((this.data as FilterNodeData).config!.expression);
      config.setSourceId((this.data as FilterNodeData).config!.sourceId || '');
      nodeData.setConfig(config);
    }

    request.setFilter(nodeData);
    return request;
  }
}

export default FilterNode;
