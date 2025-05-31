import { NodeProps } from "./interface";
import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, ContractWriteNodeData } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { config: { contractAddress, callData, contractAbi } }
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
      data: raw.getContractWrite()!.getConfig()!.toObject() as ContractWriteNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.ContractWriteNode();
    
    const config = new avs_pb.ContractWriteNode.Config();
    config.setContractAddress((this.data as ContractWriteNodeData).contractAddress);
    config.setCallData((this.data as ContractWriteNodeData).callData);
    config.setContractAbi((this.data as ContractWriteNodeData).contractAbi);
    nodeData.setConfig(config);

    request.setContractWrite(nodeData);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const contractWriteOutput = outputData.getContractWrite();
    return contractWriteOutput?.toObject() || null;
  }
}

export default ContractWriteNode;
