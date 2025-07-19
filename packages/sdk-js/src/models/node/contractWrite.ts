import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  NodeType,
  ContractWriteNodeData,
  ContractWriteNodeProps,
  NodeProps,
} from "@avaprotocol/types";
import { convertInputToProtobuf, extractInputFromProtobuf } from "../../utils";
import { convertProtobufValueToJs } from "../../utils";

// Required props for constructor: id, name, type and data: { config: { contractAddress, callData, contractAbi, methodCallsList? } }

class ContractWriteNode extends Node {
  constructor(props: ContractWriteNodeProps) {
    super({ ...props, type: NodeType.ContractWrite, data: props.data });
  }

  /**
   * Create a protobuf ContractWriteNode from config data
   * @param configData - The configuration data for the contract write node
   * @returns Configured avs_pb.ContractWriteNode
   */
  static createProtobufNode(configData: {
    contractAddress: string;
    callData: string;
    contractAbi: string;
    methodCalls?: Array<{
      callData: string;
      methodName?: string;
    }>;
  }): avs_pb.ContractWriteNode {
    const node = new avs_pb.ContractWriteNode();
    const config = new avs_pb.ContractWriteNode.Config();

    config.setContractAddress(configData.contractAddress);
    config.setCallData(configData.callData);
    config.setContractAbi(configData.contractAbi);

    // Handle method calls array
    const methodCalls = configData.methodCalls || [];
    methodCalls.forEach((methodCall) => {
      const methodCallMsg = new avs_pb.ContractWriteNode.MethodCall();
      methodCallMsg.setCallData(methodCall.callData);
      if (methodCall.methodName) {
        methodCallMsg.setMethodName(methodCall.methodName);
      }
      config.addMethodCalls(methodCallMsg);
    });

    node.setConfig(config);
    return node;
  }

  static fromResponse(raw: avs_pb.TaskNode): ContractWriteNode {
    // Convert the raw object to ContractWriteNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    const protobufData = raw.getContractWrite()!.getConfig()!.toObject();

    // Convert protobuf data to our custom interface
    const data: ContractWriteNodeData = {
      contractAddress: protobufData.contractAddress,
      callData: protobufData.callData,
      contractAbi: protobufData.contractAbi,
      methodCalls:
        protobufData.methodCallsList?.map((call) => ({
          callData: call.callData,
          methodName: call.methodName,
        })) || [],
    };

    // Extract input data using base class method
    const baseInput = super.fromResponse(raw).input;

    return new ContractWriteNode({
      ...obj,
      type: NodeType.ContractWrite,
      data: data,
      input: baseInput,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = ContractWriteNode.createProtobufNode(
      this.data as ContractWriteNodeData
    );

    // Set input data on the top-level TaskNode, not the nested ContractWriteNode
    // This matches where the Go backend's ExtractNodeInputData() looks for it
    const inputValue = convertInputToProtobuf(this.input);
    if (inputValue) {
      request.setInput(inputValue);
    }

    request.setContractWrite(node);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const contractWriteOutput = outputData.getContractWrite();
    if (!contractWriteOutput) return null;

    // Use the new getData() method instead of the old resultsList
    const data = contractWriteOutput.getData();
    if (!data) return null;

    // Convert protobuf Value to JavaScript object
    const jsData = convertProtobufValueToJs(data);

    // Return the array directly, matching ContractRead format
    return Array.isArray(jsData) ? jsData : [jsData];
  }
}

export default ContractWriteNode;
