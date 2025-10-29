import {
  NodeType,
  BranchNodeData,
  BranchNodeProps,
  NodeProps,
} from "@avaprotocol/types";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { convertProtobufValueToJs } from "../../utils";

// Required props for constructor: id, name, type and data: { conditions }

class BranchNode extends Node {
  constructor(props: BranchNodeProps) {
    super({ ...props, type: NodeType.Branch, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): BranchNode {
    // Convert the raw object to BranchNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    const protobufData = raw.getBranch()!.toObject().config;

    // Convert protobuf data to our custom interface
    const data: BranchNodeData = {
      conditions:
        protobufData?.conditionsList?.map((condition) => ({
          id: condition.id,
          type: condition.type,
          expression: condition.expression,
        })) || [],
    };

    return new BranchNode({
      ...obj,
      type: NodeType.Branch,
      data: data,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);
    request.setType(avs_pb.NodeType.NODE_TYPE_BRANCH);

    const node = new avs_pb.BranchNode();
    const config = new avs_pb.BranchNode.Config();

    if (
      (this.data as BranchNodeData).conditions &&
      (this.data as BranchNodeData).conditions.length > 0
    ) {
      const conditionsList = (this.data as BranchNodeData).conditions.map(
        (condition: any) => {
          const conditionObj = new avs_pb.BranchNode.Condition();
          conditionObj.setId(condition.id);
          conditionObj.setType(condition.type);
          conditionObj.setExpression(condition.expression);
          return conditionObj;
        }
      );

      config.setConditionsList(conditionsList);
    }

    node.setConfig(config);

    request.setBranch(node);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const branchOutput = outputData.getBranch();
    if (!branchOutput) {
      return null;
    }

    // Use convertProtobufValueToJs to get clean JavaScript objects
    const rawData = branchOutput.getData();
    if (rawData) {
      return convertProtobufValueToJs(rawData);
    }

    return null;
  }

  // TODO: do we need a getConditionId() to avoid exporting BranchNodeData?
}
export default BranchNode;
