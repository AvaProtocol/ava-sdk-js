import * as avs_pb from "@/grpc_codegen/avs_pb";
import Node from "./interface";
import { NodeType, LoopNodeData, LoopNodeProps, NodeProps } from "@avaprotocol/types";
import _ from "lodash";



class LoopNode extends Node {
  constructor(props: LoopNodeProps) {
    super({ ...props, type: NodeType.Loop, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): LoopNode {
    const obj = raw.toObject() as unknown as NodeProps;
    const loopNode = raw.getLoop();
    if (!loopNode) {
      throw new Error("Response does not contain a Loop node");
    }

    // Get the config data directly as flat structure
    const configData = loopNode.getConfig()?.toObject();
    const loopNodeData = loopNode.toObject() as any;
    
    // Since LoopNodeData is now Config.AsObject, we need to merge the config properties
    // with the nested node data from the full object
    const data: LoopNodeData = {
      ...configData,
      // Keep the nested node structures from the full object
      restApi: loopNodeData.restApi,
      customCode: loopNodeData.customCode,
      ethTransfer: loopNodeData.ethTransfer,
      contractRead: loopNodeData.contractRead,
      contractWrite: loopNodeData.contractWrite,
      graphqlDataQuery: loopNodeData.graphqlDataQuery,
    } as LoopNodeData;

    return new LoopNode({
      ...obj,
      type: NodeType.Loop,
      data: data,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const node = new avs_pb.TaskNode();
    const loopNode = new avs_pb.LoopNode();

    node.setId(this.id);
    node.setName(this.name);

    const data = this.data as LoopNodeData;

    // Set the loop config from the flat data structure
    const config = new avs_pb.LoopNode.Config();
    config.setSourceId(data.sourceId || "");
    config.setIterVal(data.iterVal || "");
    config.setIterKey(data.iterKey || "");
    loopNode.setConfig(config);

    // Handle nested nodes - these still use the nested structure within LoopNodeData
    if ((data as any).ethTransfer) {
      const ethTransfer = new avs_pb.ETHTransferNode();
      if ((data as any).ethTransfer.config) {
        const config = new avs_pb.ETHTransferNode.Config();
        config.setDestination((data as any).ethTransfer.config.destination);
        config.setAmount((data as any).ethTransfer.config.amount);
        ethTransfer.setConfig(config);
      }
      loopNode.setEthTransfer(ethTransfer);
    } else if ((data as any).contractWrite) {
      const contractWrite = new avs_pb.ContractWriteNode();
      if ((data as any).contractWrite.config) {
        const config = new avs_pb.ContractWriteNode.Config();
        config.setContractAddress((data as any).contractWrite.config.contractAddress);
        config.setCallData((data as any).contractWrite.config.callData);
        config.setContractAbi((data as any).contractWrite.config.contractAbi);
        contractWrite.setConfig(config);
      }
      loopNode.setContractWrite(contractWrite);
    } else if ((data as any).contractRead) {
      const contractRead = new avs_pb.ContractReadNode();
      if ((data as any).contractRead.config) {
        const config = new avs_pb.ContractReadNode.Config();
        config.setContractAddress((data as any).contractRead.config.contractAddress);
        config.setContractAbi((data as any).contractRead.config.contractAbi);
        
        // Handle method calls array
        const methodCalls = (data as any).contractRead.config.methodCallsList || [];
        methodCalls.forEach((methodCall: { callData: string; methodName?: string }) => {
          const methodCallMsg = new avs_pb.ContractReadNode.MethodCall();
          methodCallMsg.setCallData(methodCall.callData);
          if (methodCall.methodName) {
            methodCallMsg.setMethodName(methodCall.methodName);
          }
          config.addMethodCalls(methodCallMsg);
        });
        
        contractRead.setConfig(config);
      }
      loopNode.setContractRead(contractRead);
    } else if ((data as any).graphqlDataQuery) {
      const graphqlQuery = new avs_pb.GraphQLQueryNode();
      if ((data as any).graphqlDataQuery.config) {
        const config = new avs_pb.GraphQLQueryNode.Config();
        config.setUrl((data as any).graphqlDataQuery.config.url);
        config.setQuery((data as any).graphqlDataQuery.config.query);

        if (
          (data as any).graphqlDataQuery.config.variablesMap &&
          (data as any).graphqlDataQuery.config.variablesMap.length > 0
        ) {
          (data as any).graphqlDataQuery.config.variablesMap.forEach(([key, value]: [string, string]) => {
            config.getVariablesMap().set(key, value);
          });
        }
        graphqlQuery.setConfig(config);
      }
      loopNode.setGraphqlDataQuery(graphqlQuery);
    } else if ((data as any).restApi) {
      const restApi = new avs_pb.RestAPINode();
      if ((data as any).restApi.config) {
        const config = new avs_pb.RestAPINode.Config();
        config.setUrl((data as any).restApi.config.url);
        config.setMethod((data as any).restApi.config.method);
        config.setBody((data as any).restApi.config.body || "");

        if (
          (data as any).restApi.config.headersMap &&
          (data as any).restApi.config.headersMap.length > 0
        ) {
          (data as any).restApi.config.headersMap.forEach(([key, value]: [string, string]) => {
            config.getHeadersMap().set(key, value);
          });
        }
        restApi.setConfig(config);
      }
      loopNode.setRestApi(restApi);
    } else if ((data as any).customCode) {
      const customCode = new avs_pb.CustomCodeNode();
      if ((data as any).customCode.config) {
        const config = new avs_pb.CustomCodeNode.Config();
        config.setLang((data as any).customCode.config.lang);
        config.setSource((data as any).customCode.config.source);
        customCode.setConfig(config);
      }
      loopNode.setCustomCode(customCode);
    }

    node.setLoop(loopNode);
    return node;
  }

  static fromOutputData(outputData: avs_pb.RunNodeWithInputsResp): any {
    const loopOutput = outputData.getLoop();
    return loopOutput?.toObject() || null;
  }
}

export default LoopNode;
