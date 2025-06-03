import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "@avaprotocol/types";
import { ETHTransferNodeData } from "./types";

// Required props for constructor: id, name, type and data: { destination, amount }
export type ETHTransferNodeProps = NodeProps & {
  data: ETHTransferNodeData;
};

class ETHTransferNode extends Node {
  constructor(props: ETHTransferNodeProps) {
    super({ ...props, type: NodeType.ETHTransfer, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): ETHTransferNode {
    // Convert the raw object to ETHTransferNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as ETHTransferNodeProps;
    return new ETHTransferNode({
      ...obj,
      type: NodeType.ETHTransfer,
      data: raw.getEthTransfer()!.getConfig()!.toObject() as ETHTransferNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.ETHTransferNode();
    
    const config = new avs_pb.ETHTransferNode.Config();
    config.setDestination((this.data as ETHTransferNodeData).destination);
    config.setAmount((this.data as ETHTransferNodeData).amount);
    nodeData.setConfig(config);

    request.setEthTransfer(nodeData);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const ethTransferOutput = outputData.getEthTransfer();
    return ethTransferOutput?.toObject() || null;
  }
}

export default ETHTransferNode;
