import Node from "./interface";
import * as avs_pb from "@/grpc_codegen/avs_pb";
import { NodeType, ContractWriteNodeData, ContractWriteNodeProps, NodeProps } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { config: { contractAddress, callData, contractAbi, methodCallsList? } }


class ContractWriteNode extends Node {
  constructor(props: ContractWriteNodeProps) {
    super({ ...props, type: NodeType.ContractWrite, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): ContractWriteNode {
    // Convert the raw object to ContractWriteNodeProps, which should keep name and id
    const obj = raw.toObject() as unknown as NodeProps;
    const protobufData = raw.getContractWrite()!.getConfig()!.toObject();
    
    // Extract input field if present
    let input: any = undefined;
    if (raw.hasInput()) {
      const { convertProtobufValueToJs } = require("../../utils");
      input = convertProtobufValueToJs(raw.getInput());
    }
    
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

    const nodeData = new avs_pb.ContractWriteNode();
    
    const config = new avs_pb.ContractWriteNode.Config();
    config.setContractAddress((this.data as ContractWriteNodeData).contractAddress);
    config.setCallData((this.data as ContractWriteNodeData).callData);
    config.setContractAbi((this.data as ContractWriteNodeData).contractAbi);
    
    // Handle method calls array if present
    const methodCalls = (this.data as ContractWriteNodeData).methodCalls || [];
    methodCalls.forEach((methodCall: { callData: string; methodName?: string }) => {
      const methodCallMsg = new avs_pb.ContractWriteNode.MethodCall();
      methodCallMsg.setCallData(methodCall.callData);
      if (methodCall.methodName) {
        methodCallMsg.setMethodName(methodCall.methodName);
      }
      config.addMethodCalls(methodCallMsg);
    });
    
    nodeData.setConfig(config);

    request.setContractWrite(nodeData);

    return request;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const contractWriteOutput = outputData.getContractWrite();
    if (!contractWriteOutput) return null;

    const outputObj = contractWriteOutput.toObject();
    
    // Transform the new enhanced response structure for easier consumption
    const transformedResults = outputObj.resultsList?.map((result: any) => ({
      methodName: result.methodName,
      success: result.success,
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
      } : null,
      events: result.eventsList?.map((event: any) => ({
        eventName: event.eventName,
        address: event.address,
        topics: event.topicsList || [],
        data: event.data,
        decoded: event.decodedMap || {},
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
    })) || [];

    return {
      results: transformedResults,
      // For backward compatibility, provide legacy fields from first result
      ...(transformedResults.length > 0 && {
        transaction: transformedResults[0].transaction,
        success: transformedResults[0].success,
        hash: transformedResults[0].transaction?.hash,
      }),
    };
  }
}

export default ContractWriteNode;
