import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, ContractReadNodeData, ContractReadNodeProps, NodeProps } from "@avaprotocol/types";
import { convertProtobufValueToJs } from "../../utils";

// Required props for constructor: id, name, type and data


class ContractReadNode extends Node {
  constructor(props: ContractReadNodeProps) {
    super({ ...props, type: NodeType.ContractRead, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): ContractReadNode {
    // Convert the raw object to ContractReadNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    const protobufData = raw.getContractRead()!.getConfig()!.toObject();
    
    // Convert protobuf data to our custom interface
    const data: ContractReadNodeData = {
      contractAddress: protobufData.contractAddress,
      contractAbi: protobufData.contractAbi,
      methodCalls: protobufData.methodCallsList?.map(call => ({
        callData: call.callData,
        methodName: call.methodName,
      })) || [],
    };
    
    return new ContractReadNode({
      ...obj,
      type: NodeType.ContractRead,
      data: data,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const nodeData = new avs_pb.ContractReadNode();
    
    const config = new avs_pb.ContractReadNode.Config();
    config.setContractAddress((this.data as ContractReadNodeData).contractAddress);
    config.setContractAbi((this.data as ContractReadNodeData).contractAbi);
    
    // Handle method calls array
    const methodCalls = (this.data as ContractReadNodeData).methodCalls || [];
    methodCalls.forEach((methodCall: { callData: string; methodName?: string }) => {
      const methodCallMsg = new avs_pb.ContractReadNode.MethodCall();
      methodCallMsg.setCallData(methodCall.callData);
      if (methodCall.methodName) {
        methodCallMsg.setMethodName(methodCall.methodName);
      }
      config.addMethodCalls(methodCallMsg);
    });
    
    nodeData.setConfig(config);

    request.setContractRead(nodeData);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const contractReadOutput = outputData.getContractRead();
    if (contractReadOutput && contractReadOutput.getResultsList()) {
      const resultsList = contractReadOutput.getResultsList();
      return {
        results: resultsList.map((result: any) => ({
          methodName: result.getMethodName(),
          success: result.getSuccess(),
          error: result.getError(),
          data: result.getDataList().map((field: any) => ({
            name: field.getName(),
            type: field.getType(),
            value: field.getValue()
          }))
        }))
      };
    }
    return null;
  }
}

export default ContractReadNode;
