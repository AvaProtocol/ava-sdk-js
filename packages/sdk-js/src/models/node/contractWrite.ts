import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, ContractWriteNodeData, ContractWriteNodeProps, NodeProps } from "@avaprotocol/types";
import { convertInputToProtobuf, extractInputFromProtobuf } from "../../utils";
import { convertProtobufValueToJs } from "../../utils";

// Required props for constructor: id, name, type and data: { config: { contractAddress, callData, contractAbi, methodCallsList? } }


class ContractWriteNode extends Node {
  constructor(props: ContractWriteNodeProps) {
    super({ ...props, type: NodeType.ContractWrite, data: props.data });
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
      methodCalls: protobufData.methodCallsList?.map(call => ({
        callData: call.callData,
        methodName: call.methodName,
      })) || [],
    };

    // Extract input data from top-level TaskNode.input field (not nested ContractWriteNode.input)
    // This matches where we set it in toRequest() and where the Go backend looks for it
    let input: Record<string, any> | undefined = undefined;
    if (raw.hasInput()) {
      input = extractInputFromProtobuf(raw.getInput());
    }
    
    return new ContractWriteNode({
      ...obj,
      type: NodeType.ContractWrite,
      data: data,
      input: input,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const request = new avs_pb.TaskNode();

    request.setId(this.id);
    request.setName(this.name);

    const node = new avs_pb.ContractWriteNode();
    
    const config = new avs_pb.ContractWriteNode.Config();
    config.setContractAddress((this.data as ContractWriteNodeData).contractAddress);
    config.setCallData((this.data as ContractWriteNodeData).callData);
    config.setContractAbi((this.data as ContractWriteNodeData).contractAbi);
    
    // Handle method calls array
    const methodCalls = (this.data as ContractWriteNodeData).methodCalls || [];
    methodCalls.forEach((methodCall: { callData: string; methodName?: string }) => {
      const methodCallMsg = new avs_pb.ContractWriteNode.MethodCall();
      methodCallMsg.setCallData(methodCall.callData);
      if (methodCall.methodName) {
        methodCallMsg.setMethodName(methodCall.methodName);
      }
      config.addMethodCalls(methodCallMsg);
    });
    
    node.setConfig(config);

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
    
    // Handle the data as an array of method results
    const results = Array.isArray(jsData) ? jsData : [jsData];
    
    // Transform the new enhanced response structure for easier consumption
    const transformedResults = results.map((result: any) => ({
      methodName: result.methodName || 'unknown',
      success: result.success !== false, // Default to true if not specified
      transaction: result.transaction ? {
        hash: result.transaction.hash,
        status: result.transaction.status,
        blockNumber: result.transaction.blockNumber,
        blockHash: result.transaction.blockHash,
        gasUsed: result.transaction.gasUsed,
        gasLimit: result.transaction.gasLimit,
        gasPrice: result.transaction.gasPrice,
        effectiveGasPrice: result.transaction.effectiveGasPrice,
        from: result.transaction.from,
        to: result.transaction.to,
        value: result.transaction.value,
        nonce: result.transaction.nonce,
        transactionIndex: result.transaction.transactionIndex,
        confirmations: result.transaction.confirmations,
        timestamp: result.transaction.timestamp,
        simulation: result.transaction.simulation,
        simulationMode: result.transaction.simulationMode,
        chainId: result.transaction.chainId,
      } : null,
      events: result.events?.map((event: any) => ({
        eventName: event.eventName,
        address: event.address,
        topics: event.topics || [],
        data: event.data,
        decoded: event.decoded || {},
      })) || [],
      error: result.error ? {
        code: result.error.code,
        message: result.error.message,
        revertReason: result.error.revertReason,
      } : null,
      returnData: result.returnData ? {
        name: result.returnData.name,
        type: result.returnData.type,
        value: result.returnData.value,
      } : null,
      inputData: result.inputData,
    }));

    return {
      results: transformedResults,
      // For backward compatibility, provide legacy fields from first result
      ...(transformedResults.length > 0 && {
        transaction: transformedResults[0].transaction,
        success: transformedResults[0].success,
        hash: transformedResults[0].transaction?.hash,
        simulation: transformedResults[0].transaction?.simulation,
        simulationMode: transformedResults[0].transaction?.simulationMode,
        chainId: transformedResults[0].transaction?.chainId,
      }),
    };
  }
}

export default ContractWriteNode;
