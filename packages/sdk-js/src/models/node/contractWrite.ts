import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { contractAddress, callData, contractAbi }
type ContractWriteNodeData = avs_pb.ContractWriteNode.AsObject;
export type ContractWriteNodeProps = NodeProps & {
  data: ContractWriteNodeData;
};

class ContractWriteNode extends Node {
  constructor(props: ContractWriteNodeProps) {
    super({ ...props, type: NodeType.ContractWrite, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): ContractWriteNode {
    // Convert the raw object to ContractWriteNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as ContractWriteNodeProps;
    return new ContractWriteNode({
      ...obj,
      type: NodeType.ContractWrite,
      data: raw.getContractWrite()!.toObject() as ContractWriteNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.ContractWriteNode();
    nodeData.setContractAddress(
      (this.data as ContractWriteNodeData).contractAddress
    );
    nodeData.setCallData((this.data as ContractWriteNodeData).callData);
    nodeData.setContractAbi((this.data as ContractWriteNodeData).contractAbi);

    request.setContractWrite(nodeData);

    return request;
  }
}

export default ContractWriteNode;
