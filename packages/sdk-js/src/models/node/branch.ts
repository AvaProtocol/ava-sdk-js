import { NodeProps } from "./interface";
import { NodeType, BranchNodeData } from "@avaprotocol/types";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";

// Required props for constructor: id, name, type and data: { conditionsList }
export type BranchNodeProps = NodeProps & {
  data: BranchNodeData;
};

class BranchNode extends Node {
  constructor(props: BranchNodeProps) {
    super({ ...props, type: NodeType.Branch, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): BranchNode {
    // Convert the raw object to BranchNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as BranchNodeProps;
    return new BranchNode({
      ...obj,
      type: NodeType.Branch,
      data: raw.getBranch()!.toObject().config as BranchNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.BranchNode();
    const config = new avs_pb.BranchNode.Config();
    
    if ((this.data as BranchNodeData).conditionsList && 
        (this.data as BranchNodeData).conditionsList.length > 0) {
      
      const conditionsList = (this.data as BranchNodeData).conditionsList.map(
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
    
    nodeData.setConfig(config);
    request.setBranch(nodeData);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const branchOutput = outputData.getBranch();
    return branchOutput?.toObject() || null;
  }

  // TODO: do we need a getConditionId() to avoid exporting BranchNodeData?
}
export default BranchNode;
