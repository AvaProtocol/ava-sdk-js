import * as avs_pb from "../grpc_codegen/avs_pb";

import {
    TaskTrigger
} from "./types";

export const buildContractWrite = ({contractAddress, callData, contractABI}): avs_pb.ContractWriteNode => {
  const n = new avs_pb.ContractWriteNode();
  n.setContractAddress(contractAddress);
  n.setCallData(callData);
  if (contractABI) {
    // not everytine the Abi is available on Etherscan
    n.setContractAbi(contractABI);
  }

  return n;
}

export const buildContractRead = ({contract_ddress, callData, contractABI}): avs_pb.ContractReadNode => {
  const n = new avs_pb.ContractReadNode();
  n.setContractAddress(contractAddress);
  n.setCallData(callData);
  if (n.contractABI) {
    // not everytine the Abi is available on Etherscan
    n.setContractAbi(n.contractABI);
  }

  return n;
}

export const buildGraphQL = ({url, query, variables}): avs_pb.GraphQLQueryNode => {
  const n = new avs_pb.GraphQLQueryNode();
  n.setUrl(url);
  n.setQuery(query);
  for (const [k,v ] of Object.entries(variables || {})) {
    n.getVariablesMap().set(k, v);
  }
  return n;
}

export const buildRestAPI = ({url, body, method, headers}): avs_pb.RestAPINode => {
  const n = new avs_pb.RestAPINode();
  n.setUrl(url);
  n.setBody(body);
  n.setMethod(method);
  for (const [k,v ] of Object.entries(headers || {})) {
    n.getHeadersMap().set(k, v);
  }

  return n;
}

export const buildBranch = ({conditions}): avs_pb.BranchNode => {
  const n = new avs_pb.BranchNode();

  for (const item of conditions) {
    const condition = new avs_pb.Condition();
    condition.setId(item.id);
    condition.setType(item.type);
    condition.setExpression(item.expression);

    n.addConditions(condition);
  }
  return n;
}

export const buildFilter = ({expression}): avs_pb.FilterNode => {
  const n = new avs_pb.FilterNode();
  n.setExpression(expression);
  return n;
}

export const buildTaskEdge = ({id, source, target}): avs_pb.TaskEdge => {
  const edge = new avs_pb.TaskEdge();
  edge.setId(id);
  edge.setSource(source);
  edge.setTarget(target);

  return edge;
}

export const buildTaskNode = (node): avs_pb.TaskNode => {
  const n = new avs_pb.TaskNode();
  n.setId(node.id);
  n.setName(node.name);

  if (node.ethTransfer) {
    const ethTransfer = new avs_pb.ETHTransferNode();
    ethTransfer.setDestination(node.ethTransfer.destination);
    ethTransfer.setAmount(node.ethTransfer.amount);
    n.setEthTransfer(ethTransfer);
  } else if (node.contractWrite) {
    n.setContractWrite(buildContractWrite(node.contractWrite));
  } else if (node.contractRead) {
    n.setContractRead(buildContractRead(node.contractRead));
  } else if (node.graphqlDataQuery) {
    n.setGraphqlDataQuery(buildGraphQL(node.graphqlDataQuery));
  } else if (node.restApi) {
    n.setRestApi(buildRestAPI(node.restApi));
  } else if (node.branch) {
    n.setBranch(buildBranch(node.branch));
  } else if (node["filter"]) {
    n.setfilter(buildFilter(node["filter"]));
  } else if (node.customCode) {
    const code = new avs_pb.CustomCodeNode;
    code.setType(node.customCode.type);
    n.setCustomCode(node.customCode);
  } else {
    throw new Error("missing task payload");
  }
  return n
}

export const buildTrigger = (payload): avs_pb.TaskTrigger => {
  const trigger = new avs_pb.TaskTrigger();

  for (const [key, value] of Object.entries(payload)) {
    if (key == "manual") {
      trigger.setManual(value);
      return trigger;
    }

    if (key == "fixedTime") {
      let schedule = new avs_pb.FixedEpochCondition();
      schedule.setEpochsList(value.epochs);
      trigger.setFixedTime(schedule);

      return trigger;
    }

    if (key == "cron") {
      const cron = new avs_pb.CronCondition();
      cron.setScheduleList(value.schedule);
      trigger.setCron(cron);
      return trigger;
    }
    
    if (key == "block") {
      const block = new avs_pb.BlockCondition();
      block.setInterval(value.interval);
      trigger.setBlock(block);
      return trigger;
    }
    
    if (key == "event") {
      const event = new avs_pb.EventCondition();
      event.setExpression(payload.event.expression);

      trigger.setEvent(event);

      return trigger;
    }

    throw new Error("missing trigger");
  }
}

export const triggerFromGRPC = (trigger: avs_pb.TaskTrigger | undefined): TaskTrigger => {
  if (!trigger) {
    return { triggerType: avs_pb.TaskTrigger.TriggerTypeCase.TRIGGER_TYPE_NOT_SET }
  }

  const base = {
    triggerType: trigger.getTriggerTypeCase()
  }

  switch (trigger.getTriggerTypeCase()) {
    case avs_pb.TaskTrigger.TriggerTypeCase.MANUAL:
      base.manual = trigger.getManual();
      break;
    case avs_pb.TaskTrigger.TriggerTypeCase.FIXED_TIME:
      base.fixedTime = { epochs: trigger.getFixedTime().getEpochsList() }
      break;
    case avs_pb.TaskTrigger.TriggerTypeCase.CRON:
      base.cron = { schedule: trigger.getCron().getScheduleList() }
      break;
    case avs_pb.TaskTrigger.TriggerTypeCase.BLOCK:
      base.block = { interval: trigger.getBlock().getInterval() }
      break;
    case avs_pb.TaskTrigger.TriggerTypeCase.EVENT:
      base.event = { expression: trigger.getEvent().getExpression() }
      break;
  }

  return base;
}

export const nodeFromGRPC = (node) => {
  const base = node.toObject();
  const standarize = {
    taskType: node.getTaskTypeCase()
  }

  switch (node.getTaskTypeCase()) {
    case avs_pb.TaskNode.TaskTypeCase.ETH_TRANSFER:
      standarize.ethTransfer = base.ethTransfer;
      break;
    case avs_pb.TaskNode.TaskTypeCase.CONTRACT_WRITE:
      standarize.contractWrite = base.contractWrite;
      break;
    case avs_pb.TaskNode.TaskTypeCase.CONTRACT_READ:
      standarize.contractRead = base.contractRead;
      break;
    case avs_pb.TaskNode.TaskTypeCase.GRAPHQL_DATA_QUERY:
      standarize.graphqlDataQuery = base.graphqlDataQuery;
      break;
    case avs_pb.TaskNode.TaskTypeCase.REST_API:
      standarize.restApi = base.restApi;
      break;
    case avs_pb.TaskNode.TaskTypeCase.BRANCH:
      standarize.branch = {
        conditions: base.branch.conditionsList,
      }
      break;
    case avs_pb.TaskNode.TaskTypeCase.FILTER:
      standarize.filter = base.filter;
      break;
    case avs_pb.TaskNode.TaskTypeCase.LOOP:
      standarize.loop = base.loop;
      break;
    case avs_pb.TaskNode.TaskTypeCase.CUSTOM_CODE:
      standarize.custom_code = base.custom_code;
      break;
  }

  return standarize;
}

export const taskEdgeFromGRPC = (edge: avs_pb.TaskEdge) => {
  return {
    id: edge.getId(),
    source: edge.getSource(),
    target: edge.getTarget(),
  }
}
