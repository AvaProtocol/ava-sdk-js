import * as avs_pb from "@/grpc_codegen/avs_pb";
import Node, { NodeProps } from "./interface";
import { NodeType } from "@avaprotocol/types";
import _ from "lodash";

export interface LoopNodeData {
  input: string;
  iterVal: string;
  iterKey: string;
  runnerType: NodeType;
  runnerProps: any;
  parallel?: boolean;
}

export interface LoopNodeProps {
  id: string;
  name: string;
  type: NodeType.Loop;
  data: LoopNodeData;
}

class LoopNode implements Node {
  id: string;
  name: string;
  type: NodeType.Loop;
  data: LoopNodeData;

  constructor(props: LoopNodeProps) {
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.data = props.data;
  }

  static fromResponse(raw: avs_pb.TaskNode): LoopNode {
    const loopNode = raw.getLoop();
    if (!loopNode) {
      throw new Error("Response does not contain a Loop node");
    }

    const data: LoopNodeData = {
      input: loopNode.getInput(),
      iterVal: loopNode.getIterVal(),
      iterKey: loopNode.getIterKey(),
      runnerType: NodeType.Unset,
      runnerProps: {},
    };

    if (loopNode.getEthTransfer()) {
      data.runnerType = NodeType.ETHTransfer;
      const ethTransfer = loopNode.getEthTransfer();
      data.runnerProps = {
        destination: ethTransfer?.getDestination(),
        amount: ethTransfer?.getAmount(),
      };
    } else if (loopNode.getContractWrite()) {
      data.runnerType = NodeType.ContractWrite;
      const contractWrite = loopNode.getContractWrite();
      data.runnerProps = {
        contractAddress: contractWrite?.getContractAddress(),
        callData: contractWrite?.getCallData(),
        contractAbi: contractWrite?.getContractAbi(),
      };
    } else if (loopNode.getContractRead()) {
      data.runnerType = NodeType.ContractRead;
      const contractRead = loopNode.getContractRead();
      data.runnerProps = {
        contractAddress: contractRead?.getContractAddress(),
        callData: contractRead?.getCallData(),
        contractAbi: contractRead?.getContractAbi(),
      };
    } else if (loopNode.getGraphqlDataQuery()) {
      data.runnerType = NodeType.GraphQLQuery;
      const graphqlQuery = loopNode.getGraphqlDataQuery();
      const variablesMap = graphqlQuery?.getVariablesMap();
      const variablesArray: [string, string][] = [];
      
      if (variablesMap) {
        variablesMap.forEach((value, key) => {
          variablesArray.push([key, value]);
        });
      }
      
      data.runnerProps = {
        url: graphqlQuery?.getUrl(),
        query: graphqlQuery?.getQuery(),
        variablesMap: variablesArray,
      };
    } else if (loopNode.getRestApi()) {
      data.runnerType = NodeType.RestAPI;
      const restApi = loopNode.getRestApi();
      const headersMap = restApi?.getHeadersMap();
      const headersArray: [string, string][] = [];
      
      if (headersMap) {
        headersMap.forEach((value, key) => {
          headersArray.push([key, value]);
        });
      }
      
      data.runnerProps = {
        url: restApi?.getUrl(),
        method: restApi?.getMethod(),
        headersMap: headersArray,
        body: restApi?.getBody(),
      };
    } else if (loopNode.getCustomCode()) {
      data.runnerType = NodeType.CustomCode;
      const customCode = loopNode.getCustomCode();
      data.runnerProps = {
        lang: customCode?.getLang(),
        source: customCode?.getSource(),
      };
    }

    return new LoopNode({
      id: raw.getId(),
      name: raw.getName(),
      type: NodeType.Loop,
      data,
    });
  }

  toProto(): avs_pb.TaskNode {
    const node = new avs_pb.TaskNode();
    const loopNode = new avs_pb.LoopNode();

    node.setId(this.id);
    node.setName(this.name);

    loopNode.setInput(this.data.input);
    loopNode.setIterVal(this.data.iterVal);
    loopNode.setIterKey(this.data.iterKey);

    switch (this.data.runnerType) {
      case NodeType.ETHTransfer:
        const ethTransfer = new avs_pb.ETHTransferNode();
        ethTransfer.setDestination(this.data.runnerProps.destination);
        ethTransfer.setAmount(this.data.runnerProps.amount);
        loopNode.setEthTransfer(ethTransfer);
        break;
      case NodeType.ContractWrite:
        const contractWrite = new avs_pb.ContractWriteNode();
        contractWrite.setContractAddress(this.data.runnerProps.contractAddress);
        contractWrite.setCallData(this.data.runnerProps.callData);
        contractWrite.setContractAbi(this.data.runnerProps.contractAbi || "");
        loopNode.setContractWrite(contractWrite);
        break;
      case NodeType.ContractRead:
        const contractRead = new avs_pb.ContractReadNode();
        contractRead.setContractAddress(this.data.runnerProps.contractAddress);
        contractRead.setCallData(this.data.runnerProps.callData);
        contractRead.setContractAbi(this.data.runnerProps.contractAbi || "");
        loopNode.setContractRead(contractRead);
        break;
      case NodeType.GraphQLQuery:
        const graphqlQuery = new avs_pb.GraphQLQueryNode();
        graphqlQuery.setUrl(this.data.runnerProps.url);
        graphqlQuery.setQuery(this.data.runnerProps.query);
        if (this.data.runnerProps.variablesMap) {
          const variablesMap = graphqlQuery.getVariablesMap();
          this.data.runnerProps.variablesMap.forEach(([key, value]: [string, string]) => {
            variablesMap.set(key, value);
          });
        }
        loopNode.setGraphqlDataQuery(graphqlQuery);
        break;
      case NodeType.RestAPI:
        const restApi = new avs_pb.RestAPINode();
        restApi.setUrl(this.data.runnerProps.url);
        restApi.setMethod(this.data.runnerProps.method);
        restApi.setBody(this.data.runnerProps.body || "");
        if (this.data.runnerProps.headersMap) {
          const headersMap = restApi.getHeadersMap();
          this.data.runnerProps.headersMap.forEach(([key, value]: [string, string]) => {
            headersMap.set(key, value);
          });
        }
        loopNode.setRestApi(restApi);
        break;
      case NodeType.CustomCode:
        const customCode = new avs_pb.CustomCodeNode();
        customCode.setLang(this.data.runnerProps.lang);
        customCode.setSource(this.data.runnerProps.source);
        loopNode.setCustomCode(customCode);
        break;
      default:
        throw new Error(`Unsupported runner type: ${this.data.runnerType}`);
    }

    node.setLoop(loopNode);
    return node;
  }

  toRequest(): avs_pb.TaskNode {
    return this.toProto();
  }
}

export default LoopNode;
