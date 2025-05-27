import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { config: { contractAddress, callData, contractAbi } }
export type ContractReadNodeData = avs_pb.ContractReadNode.AsObject;
export type ContractReadNodeProps = NodeProps & {
  data: ContractReadNodeData;
};

class ContractReadNode extends Node {
  constructor(props: ContractReadNodeProps) {
    super({ ...props, type: NodeType.ContractRead, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): ContractReadNode {
    // Convert the raw object to ContractReadNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as ContractReadNodeProps;
    return new ContractReadNode({
      ...obj,
      type: NodeType.ContractRead,
      data: raw.getContractRead()!.toObject() as ContractReadNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.ContractReadNode();
    
    if ((this.data as ContractReadNodeData).config) {
      const config = new avs_pb.ContractReadNode.Config();
      config.setContractAddress((this.data as ContractReadNodeData).config!.contractAddress);
      config.setCallData((this.data as ContractReadNodeData).config!.callData);
      config.setContractAbi((this.data as ContractReadNodeData).config!.contractAbi);
      nodeData.setConfig(config);
    }

    request.setContractRead(nodeData);

    return request;
  }
}

export default ContractReadNode;
