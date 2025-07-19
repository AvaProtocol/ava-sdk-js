import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  NodeType,
  ContractReadNodeData,
  ContractReadNodeProps,
  NodeProps,
} from "@avaprotocol/types";
import {
  convertProtobufValueToJs,
  convertInputToProtobuf,
  extractInputFromProtobuf,
} from "../../utils";

// Required props for constructor: id, name, type and data

class ContractReadNode extends Node {
  constructor(props: ContractReadNodeProps) {
    super({ ...props, type: NodeType.ContractRead, data: props.data });
  }

  /**
   * Create a protobuf ContractReadNode from config data
   * @param configData - The configuration data for the contract read node
   * @returns Configured avs_pb.ContractReadNode
   */
  static createProtobufNode(configData: {
    contractAddress: string;
    contractAbi: string;
    methodCalls?: Array<{
      callData: string;
      methodName?: string;
      applyToFields?: string[];
    }>;
  }): avs_pb.ContractReadNode {
    const node = new avs_pb.ContractReadNode();
    const config = new avs_pb.ContractReadNode.Config();
    
    config.setContractAddress(configData.contractAddress);
    config.setContractAbi(configData.contractAbi);

    // Handle method calls array
    const methodCalls = configData.methodCalls || [];
    methodCalls.forEach((methodCall) => {
      const methodCallMsg = new avs_pb.ContractReadNode.MethodCall();
      methodCallMsg.setCallData(methodCall.callData);
      if (methodCall.methodName) {
        methodCallMsg.setMethodName(methodCall.methodName);
      }
      if (methodCall.applyToFields) {
        methodCallMsg.setApplyToFieldsList(methodCall.applyToFields);
      }
      config.addMethodCalls(methodCallMsg);
    });

    node.setConfig(config);
    return node;
  }

  static fromResponse(raw: avs_pb.TaskNode): ContractReadNode {
    // Convert the raw object to ContractReadNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    const protobufData = raw.getContractRead()!.getConfig()!.toObject();

    // Convert protobuf data to our custom interface
    const data: ContractReadNodeData = {
      contractAddress: protobufData.contractAddress,
      contractAbi: protobufData.contractAbi,
      methodCalls:
        protobufData.methodCallsList?.map((call) => ({
          callData: call.callData,
          methodName: call.methodName,
          applyToFields: call.applyToFieldsList || [],
        })) || [],
    };

    // Extract input data using base class method
    const baseInput = super.fromResponse(raw).input;

    return new ContractReadNode({
      ...obj,
      type: NodeType.ContractRead,
      data: data,
      input: baseInput,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = ContractReadNode.createProtobufNode(
      this.data as ContractReadNodeData
    );

    // Set input data on the top-level TaskNode, not the nested ContractReadNode
    // This matches where the Go backend's ExtractNodeInputData() looks for it
    const inputValue = convertInputToProtobuf(this.input);
    if (inputValue) {
      request.setInput(inputValue);
    }

    request.setContractRead(node);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const contractReadOutput = outputData.getContractRead();
    if (contractReadOutput && contractReadOutput.getData()) {
      // The new structure uses getData() which returns a protobuf Value
      const data = contractReadOutput.getData();
      if (data) {
        // Convert protobuf Value to JavaScript object
        const jsData = convertProtobufValueToJs(data);

        // The data should now be directly an array of results
        if (Array.isArray(jsData)) {
          return jsData.map((result: any) => ({
            methodName: result.methodName,
            success: result.success,
            error: result.error || "",
            data: result.data || {},
          }));
        } else {
          // Fallback for old format or unexpected structure
          return jsData;
        }
      }
    }
    return null;
  }
}

export default ContractReadNode;
