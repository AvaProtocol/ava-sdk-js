import * as avs_pb from "../grpc_codegen/avs_pb";
import { TaskType, TaskTrigger } from "./types";
import { triggerFromGRPC, nodeFromGRPC } from "./builder";

class Task implements TaskType {
  id: string;
  status: number;
  owner: string;
  smartWalletAddress: string;
  trigger: TaskTrigger;
  nodes: any[];
  startAt: number;
  expiredAt: number;
  memo: string;
  completedAt: number;
  maxExecution: number;
  executionsList: any[];

  constructor(task: avs_pb.Task) {
    this.id = task.getId() || "";
    this.status = task.getStatus();
    this.owner = task.getOwner();
    this.smartWalletAddress = task.getSmartWalletAddress();
    this.nodes = task.getNodesList().map(node => nodeFromGRPC(node));
    this.trigger = triggerFromGRPC(task.getTrigger());
    this.startAt = task.getStartAt();
    this.expiredAt = task.getExpiredAt();
    this.memo = task.getMemo();
    this.completedAt = task.getCompletedAt();
    this.status = task.getStatus();
    this.executionsList = task.getExecutionsList();
    this.maxExecution = task.getMaxExecution();
  }
}

export default Task;
