import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, ETHTransferNodeData, ETHTransferNodeProps, NodeProps } from "@avaprotocol/types";
import { convertInputToProtobuf, extractInputFromProtobuf } from "../../utils";

// Required props for constructor: id, name, type and data: { destination, amount }


class ETHTransferNode extends Node {
  constructor(props: ETHTransferNodeProps) {
    super({ ...props, type: NodeType.ETHTransfer, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): ETHTransferNode {
    // Convert the raw object to ETHTransferNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    
    // Extract input data if present
    const input = extractInputFromProtobuf(raw.getEthTransfer()?.getInput());
    
    return new ETHTransferNode({
      ...obj,
      type: NodeType.ETHTransfer,
      data: raw.getEthTransfer()!.getConfig()!.toObject() as ETHTransferNodeData,
      input: input,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = new avs_pb.ETHTransferNode();
    
    const config = new avs_pb.ETHTransferNode.Config();
    config.setDestination((this.data as ETHTransferNodeData).destination);
    config.setAmount((this.data as ETHTransferNodeData).amount);
    node.setConfig(config);

    // Set input data if provided
    const inputValue = convertInputToProtobuf(this.input);
    if (inputValue) {
      node.setInput(inputValue);
    }

    request.setEthTransfer(node);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const ethTransferOutput = outputData.getEthTransfer();
    return ethTransferOutput?.toObject() || null;
  }
}

export default ETHTransferNode;
