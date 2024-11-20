import * as avs_pb from "../grpc_codegen/avs_pb";

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

export const buildTaskEdge = ({id, source, target}): avs_pb.TaskEdge => {
  const edge = new avs_pb.TaskEdge();
  edge.setId(id);
  edge.setSource(source);
  edge.setTarget(target);

  return edge;
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

export const triggerFromGRPC = (trigger: avs_pb.TaskTrigger) => {
  const base = {
    trigger_type: trigger.getTriggerTypeCase()
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
    task_type: node.getTaskTypeCase()
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
      standarize.branch = base.branch;
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
