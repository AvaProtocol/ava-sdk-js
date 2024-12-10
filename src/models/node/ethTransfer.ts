import { NodeProps, NodeTypes } from "./interface";
import Node from "./interface";
import * as avs_pb from "../../../grpc_codegen/avs_pb";

// Required props for constructor: id, name, type and data: { destination, amount }
type ETHTransferNodeData = avs_pb.ETHTransferNode.AsObject;
export type ETHTransferNodeProps = NodeProps & {
  data: ETHTransferNodeData;
};

class ETHTransferNode extends Node {
  constructor(props: ETHTransferNodeProps) {
    super({ ...props, type: NodeTypes.ETH_TRANSFER, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): ETHTransferNode {
    // Convert the raw object to ETHTransferNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as ETHTransferNodeProps;
    return new ETHTransferNode({
      ...obj,
      type: NodeTypes.ETH_TRANSFER,
      data: raw.getEthTransfer()!.toObject() as ETHTransferNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.ETHTransferNode();
    nodeData.setDestination((this.data as ETHTransferNodeData).destination);
    nodeData.setAmount((this.data as ETHTransferNodeData).amount);

    request.setEthTransfer(nodeData);

    return request;
  }
}

export default ETHTransferNode;
