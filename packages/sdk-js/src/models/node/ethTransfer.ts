import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, ETHTransferNodeData, ETHTransferNodeProps, NodeProps } from "@avaprotocol/types";
import { convertInputToProtobuf, extractInputFromProtobuf } from "../../utils";

// Required props for constructor: id, name, type and data: { destination, amount }


class ETHTransferNode extends Node {
  constructor(props: ETHTransferNodeProps) {
    super({ ...props, type: NodeType.ETHTransfer, data: props.data });
  }

  /**
   * Create a protobuf ETHTransferNode from config data
   * @param configData - The configuration data for the ETH transfer node
   * @returns Configured avs_pb.ETHTransferNode
   */
  static createProtobufNode(configData: {
    destination: string;
    amount: string;
  }): avs_pb.ETHTransferNode {
    const node = new avs_pb.ETHTransferNode();
    const config = new avs_pb.ETHTransferNode.Config();
    
    config.setDestination(configData.destination);
    config.setAmount(configData.amount);
    node.setConfig(config);
    
    return node;
  }

  static fromResponse(raw: avs_pb.TaskNode): ETHTransferNode {
    // Convert the raw object to ETHTransferNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    
    // Extract input data using base class method
    const baseInput = super.fromResponse(raw).input;
    
    return new ETHTransferNode({
      ...obj,
      type: NodeType.ETHTransfer,
      data: raw.getEthTransfer()!.getConfig()!.toObject() as ETHTransferNodeData,
      input: baseInput,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = ETHTransferNode.createProtobufNode(
      this.data as ETHTransferNodeData
    );

    // Set input data on the top-level TaskNode, not the nested ETHTransferNode
    // This matches where the Go backend's ExtractNodeInputData() looks for it
    const inputValue = convertInputToProtobuf(this.input);
    if (inputValue) {
      request.setInput(inputValue);
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
