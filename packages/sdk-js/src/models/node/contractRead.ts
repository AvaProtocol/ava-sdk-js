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

    // Extract input data from top-level TaskNode.input field (not nested ContractReadNode.input)
    // This matches where we set it in toRequest() and where the Go backend looks for it
    let input: Record<string, any> | undefined = undefined;
    if (raw.hasInput()) {
      input = extractInputFromProtobuf(raw.getInput());
    }

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
    config.setContractAddress(
      (this.data as ContractReadNodeData).contractAddress
    );
    config.setContractAbi((this.data as ContractReadNodeData).contractAbi);

    // Handle method calls array
    const methodCalls = (this.data as ContractReadNodeData).methodCalls || [];
    methodCalls.forEach(
      (methodCall: {
        callData: string;
        methodName?: string;
        applyToFields?: string[];
      }) => {
        const methodCallMsg = new avs_pb.ContractReadNode.MethodCall();
        methodCallMsg.setCallData(methodCall.callData);
        if (methodCall.methodName) {
          methodCallMsg.setMethodName(methodCall.methodName);
        }
        if (methodCall.applyToFields) {
          methodCallMsg.setApplyToFieldsList(methodCall.applyToFields);
        }
        config.addMethodCalls(methodCallMsg);
      }
    );

    node.setConfig(config);

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
