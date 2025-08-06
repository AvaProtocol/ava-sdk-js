import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import {
  NodeType,
  ContractReadNodeData,
  ContractReadNodeProps,
  NodeProps,
} from "@avaprotocol/types";
import { convertProtobufValueToJs } from "../../utils";

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
  static createProtobufNode(
    configData: ContractReadNodeData
  ): avs_pb.ContractReadNode {
    const node = new avs_pb.ContractReadNode();
    const config = new avs_pb.ContractReadNode.Config();

    config.setContractAddress(configData.contractAddress);
    // Convert array to protobuf Value list
    const abiValueList = configData.contractAbi.map((item) => {
      const value = new google_protobuf_struct_pb.Value();
      value.setStructValue(
        google_protobuf_struct_pb.Struct.fromJavaScript(item as any)
      );
      return value;
    });
    config.setContractAbiList(abiValueList);

    // Handle method calls array (now required)
    const methodCalls = configData.methodCalls;
    methodCalls.forEach((methodCall) => {
      const methodCallMsg = new avs_pb.ContractReadNode.MethodCall();
      methodCallMsg.setMethodName(methodCall.methodName);
      methodCallMsg.setMethodParamsList(methodCall.methodParams);

      // Optional: Set callData if provided
      if (methodCall.callData) {
        methodCallMsg.setCallData(methodCall.callData);
      }

      // Optional: Set applyToFields if provided
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
    const contractReadNode = raw.getContractRead()!;
    const config = contractReadNode.getConfig()!;
    const protobufData = config.toObject();

    // Convert protobuf data to our custom interface
    const data: ContractReadNodeData = {
      contractAddress: protobufData.contractAddress,
      contractAbi: config
        .getContractAbiList()
        .map((value) => convertProtobufValueToJs(value)),
      methodCalls:
        protobufData.methodCallsList?.map((call) => ({
          methodName: call.methodName,
          applyToFields: call.applyToFieldsList || [],
          methodParams: call.methodParamsList || [],
          // Only include callData if present
          ...(call.callData && { callData: call.callData }),
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

    const node = ContractReadNode.createProtobufNode(
      this.data as ContractReadNodeData
    );

    request.setContractRead(node);

    return request;
  }

  static fromOutputData(
    outputData: avs_pb.RunNodeWithInputsResp
  ): unknown | null {
    const contractReadOutput = outputData.getContractRead();
    if (!contractReadOutput) return null;

    // Get the clean data from the data field (now a single flattened object)
    const dataValue = contractReadOutput.getData();
    const cleanData = dataValue ? convertProtobufValueToJs(dataValue) : {};

    return cleanData;
  }
}

export default ContractReadNode;
