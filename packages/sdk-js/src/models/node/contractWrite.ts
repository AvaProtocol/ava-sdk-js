import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import {
  NodeType,
  ContractWriteNodeData,
  ContractWriteNodeProps,
  NodeProps,
} from "@avaprotocol/types";
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
  static createProtobufNode(configData: ContractWriteNodeData): avs_pb.ContractWriteNode {
    const node = new avs_pb.ContractWriteNode();
    const config = new avs_pb.ContractWriteNode.Config();

    config.setContractAddress(configData.contractAddress);
    // Remove the top-level callData since it's no longer part of ContractWriteNodeData
    
    // Convert array to protobuf Value list
    const abiValueList = configData.contractAbi.map(item => {
      const value = new google_protobuf_struct_pb.Value();
      value.setStructValue(google_protobuf_struct_pb.Struct.fromJavaScript(item as any));
      return value;
    });
    config.setContractAbiList(abiValueList);

    // Handle method calls array (now required)
    const methodCalls = configData.methodCalls;
    methodCalls.forEach((methodCall) => {
      const methodCallMsg = new avs_pb.ContractWriteNode.MethodCall();
      
      // Set callData only if provided (now optional)
      if (methodCall.callData) {
        methodCallMsg.setCallData(methodCall.callData);
      }
      
      if (methodCall.methodName) {
        methodCallMsg.setMethodName(methodCall.methodName);
      }
      if (methodCall.methodParams) {
        methodCallMsg.setMethodParamsList(methodCall.methodParams);
      }
      // Note: applyToFields is not supported for ContractWrite nodes
      config.addMethodCalls(methodCallMsg);
    });

    // Set isSimulated only if explicitly provided (optional field in protobuf)
    // When unset, the backend defaults to true (simulation mode)
    if (configData.isSimulated !== undefined) {
      config.setIsSimulated(configData.isSimulated);
    }

    node.setConfig(config);
    return node;
  }

  static fromResponse(raw: avs_pb.TaskNode): ContractWriteNode {
    // Convert the raw object to ContractWriteNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    const contractWriteNode = raw.getContractWrite()!;
    const config = contractWriteNode.getConfig()!;
    const protobufData = config.toObject();

    // Convert protobuf data to our custom interface
    const data: ContractWriteNodeData = {
      contractAddress: protobufData.contractAddress,
      contractAbi: config.getContractAbiList().map(value => 
        convertProtobufValueToJs(value)
      ),
      methodCalls:
        protobufData.methodCallsList?.map((call) => ({
          methodName: call.methodName,
          methodParams: call.methodParamsList || [],
          // Note: applyToFields is not supported for ContractWrite nodes in protobuf
          // callData is optional, only include if present
          ...(call.callData && { callData: call.callData }),
        })) || [],
      // Include isSimulated if present in protobuf
      ...(protobufData.isSimulated !== undefined && { isSimulated: protobufData.isSimulated }),
    };

    return new ContractWriteNode({
      ...obj,
      type: NodeType.ContractWrite,
      data: data,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = ContractWriteNode.createProtobufNode(
      this.data as ContractWriteNodeData
    );

    request.setContractWrite(node);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const contractWriteOutput = outputData.getContractWrite();
    if (!contractWriteOutput) return null;

    // ContractWrite decoded events are stored in data field (flattened object format)
    // This contains parsed receipt logs/events, similar to ContractRead format
    const dataValue = contractWriteOutput.getData();
    
    // Convert protobuf Value to JavaScript object (decoded events object)
    // Return empty object if no events were decoded from transaction receipts
    return dataValue ? convertProtobufValueToJs(dataValue) : {};
  }
}

export default ContractWriteNode;
