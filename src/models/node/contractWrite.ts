import { NodeProps, NodeTypes } from "./interface";
import Node from "./interface";
import * as avs_pb from "../../../grpc_codegen/avs_pb";

// Required props for constructor: id, name, type and data: { contractAddress, callData, contractAbi }
type ContractWriteNodeData = avs_pb.ContractWriteNode.AsObject;
export type ContractWriteNodeProps = NodeProps & {
  data: ContractWriteNodeData;
};

class ContractWriteNode extends Node {
  constructor(props: ContractWriteNodeProps) {
    super({ ...props, type: NodeTypes.CONTRACT_WRITE, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): ContractWriteNode {
    // Convert the raw object to ContractWriteNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as ContractWriteNodeProps;
    return new ContractWriteNode({
      ...obj,
      type: NodeTypes.CONTRACT_WRITE,
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
