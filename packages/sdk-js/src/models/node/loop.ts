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

    if (data.config) {
      const config = new avs_pb.LoopNode.Config();
      config.setSourceId(data.config.sourceId);
      config.setIterVal(data.config.iterVal);
      config.setIterKey(data.config.iterKey);
      loopNode.setConfig(config);
    }

    if (data.ethTransfer) {
      const ethTransfer = new avs_pb.ETHTransferNode();
      if (data.ethTransfer.config) {
        const config = new avs_pb.ETHTransferNode.Config();
        config.setDestination(data.ethTransfer.config.destination);
        config.setAmount(data.ethTransfer.config.amount);
        ethTransfer.setConfig(config);
      }
      loopNode.setEthTransfer(ethTransfer);
    } else if (data.contractWrite) {
      const contractWrite = new avs_pb.ContractWriteNode();
      if (data.contractWrite.config) {
        const config = new avs_pb.ContractWriteNode.Config();
        config.setContractAddress(data.contractWrite.config.contractAddress);
        config.setCallData(data.contractWrite.config.callData);
        config.setContractAbi(data.contractWrite.config.contractAbi);
        contractWrite.setConfig(config);
      }
      loopNode.setContractWrite(contractWrite);
    } else if (data.contractRead) {
      const contractRead = new avs_pb.ContractReadNode();
      if (data.contractRead.config) {
        const config = new avs_pb.ContractReadNode.Config();
        config.setContractAddress(data.contractRead.config.contractAddress);
        config.setCallData(data.contractRead.config.callData);
        config.setContractAbi(data.contractRead.config.contractAbi);
        contractRead.setConfig(config);
      }
      loopNode.setContractRead(contractRead);
    } else if (data.graphqlDataQuery) {
      const graphqlQuery = new avs_pb.GraphQLQueryNode();
      if (data.graphqlDataQuery.config) {
        const config = new avs_pb.GraphQLQueryNode.Config();
        config.setUrl(data.graphqlDataQuery.config.url);
        config.setQuery(data.graphqlDataQuery.config.query);

        if (
          data.graphqlDataQuery.config.variablesMap &&
          data.graphqlDataQuery.config.variablesMap.length > 0
        ) {
          data.graphqlDataQuery.config.variablesMap.forEach(([key, value]) => {
            config.getVariablesMap().set(key, value);
          });
        }
        graphqlQuery.setConfig(config);
      }
      loopNode.setGraphqlDataQuery(graphqlQuery);
    } else if (data.restApi) {
      const restApi = new avs_pb.RestAPINode();
      if (data.restApi.config) {
        const config = new avs_pb.RestAPINode.Config();
        config.setUrl(data.restApi.config.url);
        config.setMethod(data.restApi.config.method);
        config.setBody(data.restApi.config.body || "");

        if (
          data.restApi.config.headersMap &&
          data.restApi.config.headersMap.length > 0
        ) {
          data.restApi.config.headersMap.forEach(([key, value]) => {
            config.getHeadersMap().set(key, value);
          });
        }
        restApi.setConfig(config);
      }
      loopNode.setRestApi(restApi);
    } else if (data.customCode) {
      const customCode = new avs_pb.CustomCodeNode();
      if (data.customCode.config) {
        const config = new avs_pb.CustomCodeNode.Config();
        config.setLang(data.customCode.config.lang);
        config.setSource(data.customCode.config.source);
        customCode.setConfig(config);
      }
      loopNode.setCustomCode(customCode);
    }

    node.setLoop(loopNode);
    return node;
  }
}

export default LoopNode;
