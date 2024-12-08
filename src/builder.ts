import * as avs_pb from "../grpc_codegen/avs_pb";
import { TaskEdge, TaskTrigger } from "../grpc_codegen/avs_pb";
import { TaskNode } from "../grpc_codegen/avs_pb";
import { TriggerType, NodeType } from "./types";

// import {
//   TaskTrigger, TaskEdge
// } from "./types";

export const buildContractWrite = ({
  contractAddress,
  callData,
  contractABI,
}: {
  contractAddress: string;
  callData: string;
  contractABI: string;
}): avs_pb.ContractWriteNode => {
  const n = new avs_pb.ContractWriteNode();
  n.setContractAddress(contractAddress);
  n.setCallData(callData);
  if (contractABI) {
    // not everytine the Abi is available on Etherscan
    n.setContractAbi(contractABI);
  }

  return n;
};

export const buildContractRead = ({
  contractAddress,
  callData,
  contractABI,
}: {
  contractAddress: string;
  callData: string;
  contractABI: string;
}): avs_pb.ContractReadNode => {
  const contract = new avs_pb.ContractReadNode();
  contract.setContractAddress(contractAddress);
  contract.setCallData(callData);
  if (contractABI) {
    // not everytine the Abi is available on Etherscan
    contract.setContractAbi(contractABI);
  }

  return n;
};

export const buildGraphQL = ({
  url,
  query,
  variables,
}: {
  url: string;
  query: string;
  variables: Record<string, string>;
}): avs_pb.GraphQLQueryNode => {
  const n = new avs_pb.GraphQLQueryNode();
  n.setUrl(url);
  n.setQuery(query);
  for (const [k, v] of Object.entries(variables || {})) {
    n.getVariablesMap().set(k, v);
  }
  return n;
};

export const buildRestAPI = ({
  url,
  body,
  method,
  headers,
}): avs_pb.RestAPINode => {
  const n = new avs_pb.RestAPINode();
  n.setUrl(url);
  n.setBody(body);
  n.setMethod(method);
  for (const [k, v] of Object.entries(headers || {})) {
    n.getHeadersMap().set(k, v);
  }

  return n;
};

export const buildBranch = ({ conditions }): avs_pb.BranchNode => {
  const n = new avs_pb.BranchNode();

  for (const item of conditions) {
    const condition = new avs_pb.Condition();
    condition.setId(item.id);
    condition.setType(item.type);
    condition.setExpression(item.expression);

    n.addConditions(condition);
  }
  return n;
};

export const buildFilter = ({ expression }): avs_pb.FilterNode => {
  const n = new avs_pb.FilterNode();
  n.setExpression(expression);
  return n;
};

export const triggerFromGRPC = (
  trigger: avs_pb.TaskTrigger | undefined
): avs_pb.TaskTrigger.AsObject | undefined => {
  if (!trigger) {
    return undefined;
  }

  // if (!trigger) {
  //   return { triggerType: TriggerType.TRIGGER_TYPE_NOT_SET };
  // }

  const base = {
    triggerType: trigger.getTriggerTypeCase(),
  };

  switch (trigger.getTriggerTypeCase()) {
    case TriggerType.MANUAL:
      base.manual = trigger.getManual();
      break;
    case TriggerType.FIXED_TIME:
      base.fixedTime = { epochs: trigger.getFixedTime().getEpochsList() };
      break;
    case TriggerType.CRON:
      base.cron = { schedule: trigger.getCron().getScheduleList() };
      break;
    case TriggerType.BLOCK:
      base.block = { interval: trigger.getBlock().getInterval() };
      break;
    case TriggerType.EVENT:
      base.event = { expression: trigger.getEvent().getExpression() };
      break;
  }

  return base;
};

export const nodeFromGRPC = (
  node: avs_pb.TaskNode
): avs_pb.TaskNode.AsObject => {
  console.log("nodeFromGRPC.node", node);
  const base = node.toObject();

  const standarize = {
    taskType: node.getTaskTypeCase(),
  };

  switch (node.getTaskTypeCase()) {
    case NodeType.ETH_TRANSFER:
      standarize.ethTransfer = base.ethTransfer;
      break;
    case NodeType.CONTRACT_WRITE:
      standarize.contractWrite = base.contractWrite;
      break;
    case NodeType.CONTRACT_READ:
      standarize.contractRead = base.contractRead;
      break;
    case NodeType.GRAPHQL_DATA_QUERY:
      standarize.graphqlDataQuery = base.graphqlDataQuery;
      break;
    case NodeType.REST_API:
      standarize.restApi = base.restApi;
      break;
    case NodeType.BRANCH:
      standarize.branch = {
        conditions: base.branch.conditionsList,
      };
      break;
    case NodeType.FILTER:
      standarize.filter = base.filter;
      break;
    case NodeType.LOOP:
      standarize.loop = base.loop;
      break;
    case NodeType.CUSTOM_CODE:
      standarize.customCode = base.customCode;
      break;
  }

  return standarize;
};

export const taskEdgeFromGRPC = (edge: TaskEdge): TaskEdge.AsObject => {
  return {
    id: edge.getId(),
    source: edge.getSource(),
    target: edge.getTarget(),
  };
};
