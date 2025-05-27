import * as avs_pb from "@/grpc_codegen/avs_pb";
import Node, { NodeProps } from "./interface";
import { NodeType } from "@avaprotocol/types";
import _ from "lodash";

export type LoopNodeData = avs_pb.LoopNode.AsObject;
export type LoopNodeProps = NodeProps & {
  data: LoopNodeData;
};

class LoopNode extends Node {
  constructor(props: LoopNodeProps) {
    super({ ...props, type: NodeType.Loop, data: props.data });
  }

  static fromResponse(raw: avs_pb.TaskNode): LoopNode {
    const loopNode = raw.getLoop();
    if (!loopNode) {
      throw new Error("Response does not contain a Loop node");
    }

    return new LoopNode({
      id: raw.getId(),
      name: raw.getName(),
      type: NodeType.Loop,
      data: loopNode.toObject() as LoopNodeData,
    });
  }

  toRequest(): avs_pb.TaskNode {
    const node = new avs_pb.TaskNode();
    const loopNode = new avs_pb.LoopNode();

    node.setId(this.id);
    node.setName(this.name);

    const data = this.data as LoopNodeData;
    loopNode.setInput(data.input);
    loopNode.setIterVal(data.iterVal);
    loopNode.setIterKey(data.iterKey);

    // Set the appropriate runner based on available data
    if (data.ethTransfer) {
      const ethTransfer = new avs_pb.ETHTransferNode();
      ethTransfer.setDestination(data.ethTransfer.destination);
      ethTransfer.setAmount(data.ethTransfer.amount);
      loopNode.setEthTransfer(ethTransfer);
    } else if (data.contractWrite) {
      const contractWrite = new avs_pb.ContractWriteNode();
      contractWrite.setContractAddress(data.contractWrite.contractAddress);
      contractWrite.setCallData(data.contractWrite.callData);
      contractWrite.setContractAbi(data.contractWrite.contractAbi);
      loopNode.setContractWrite(contractWrite);
    } else if (data.contractRead) {
      const contractRead = new avs_pb.ContractReadNode();
      contractRead.setContractAddress(data.contractRead.contractAddress);
      contractRead.setCallData(data.contractRead.callData);
      contractRead.setContractAbi(data.contractRead.contractAbi);
      loopNode.setContractRead(contractRead);
    } else if (data.graphqlDataQuery) {
      const graphqlQuery = new avs_pb.GraphQLQueryNode();
      graphqlQuery.setUrl(data.graphqlDataQuery.url);
      graphqlQuery.setQuery(data.graphqlDataQuery.query);
      // Handle variables map
      if (data.graphqlDataQuery.variablesMap && data.graphqlDataQuery.variablesMap.length > 0) {
        data.graphqlDataQuery.variablesMap.forEach(([key, value]) => {
          graphqlQuery.getVariablesMap().set(key, value);
        });
      }
      loopNode.setGraphqlDataQuery(graphqlQuery);
    } else if (data.restApi) {
      const restApi = new avs_pb.RestAPINode();
      restApi.setUrl(data.restApi.url);
      restApi.setMethod(data.restApi.method);
      restApi.setBody(data.restApi.body || "");
      // Handle headers map
      if (data.restApi.headersMap && data.restApi.headersMap.length > 0) {
        data.restApi.headersMap.forEach(([key, value]) => {
          restApi.getHeadersMap().set(key, value);
        });
      }
      loopNode.setRestApi(restApi);
    } else if (data.customCode) {
      const customCode = new avs_pb.CustomCodeNode();
      customCode.setLang(data.customCode.lang);
      customCode.setSource(data.customCode.source);
      loopNode.setCustomCode(customCode);
    }

    node.setLoop(loopNode);
    return node;
  }
}

export default LoopNode;
