import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, ContractReadNodeData, ContractReadNodeProps, NodeProps } from "@avaprotocol/types";
import { convertProtobufValueToJs, convertInputToProtobuf, extractInputFromProtobuf } from "../../utils";

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

    // Extract input data if present
    const input = extractInputFromProtobuf(raw.getContractRead()?.getInput());
    
    return new ContractReadNode({
      ...obj,
      type: NodeType.ContractRead,
      data: data,
      input: input,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = new avs_pb.ContractReadNode();
    
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
    
    node.setConfig(config);

    // Set input data if provided
    const inputValue = convertInputToProtobuf(this.input);
    if (inputValue) {
      node.setInput(inputValue);
    }

    request.setContractRead(node);

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
