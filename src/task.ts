import * as avs_pb from "../grpc_codegen/avs_pb";
import { TaskType } from "./types";

function buildNodeFromGRPC(node) {
  return node.toObject();
}

function buildTriggerFromGRPC(trigger) {
  return trigger?.toObject();
}

class Task implements TaskType {
  id: string;
  status: number;
  owner: string;
  smartAccountAddress: string;
  trigger: {
    triggerType: number;
    schedule?: any;
    contractQuery?: any;
    expression: { expression: string };
  };
  nodesList: any[];
  startAt: number;
  expiredAt: number;
  memo: string;
  completedAt: number;
  repeatable: boolean;
  executionsList: any[];
  // Add other missing properties here

  constructor(task: avs_pb.Task) {
    this.id = task.getId()?.toString() || "";
    this.status = task.getStatus().toString();
    this.owner = task.getOwner();
    this.smartWalletAddress = task.getSmartWalletAddress();
    this.trigger = buildTriggerFromGRPC(task.getTrigger());
    this.nodes = task.getNodesList().map(node => buildNodeFromGRPC(node));
    this.startAt = task.getStartAt();
    this.expiredAt = task.getExpiredAt();
    this.memo = task.getMemo();
    this.completedAt = task.getCompletedAt();
    this.status = task.getStatus();
    //this.repeatable = task.getRepeatable();
    this.executionsList = task.getExecutionsList();
  }
}

export default Task;
