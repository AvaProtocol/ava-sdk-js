import * as avs_pb from "../grpc_codegen/avs_pb";
import { TaskType } from "./types";
import { triggerFromGRPC, nodeFromGRPC } from "./builder";

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

  constructor(task: avs_pb.Task) {
    this.id = task.getId() || "";
    this.status = task.getStatus().toString();
    this.owner = task.getOwner();
    this.smartWalletAddress = task.getSmartWalletAddress();
    this.trigger = triggerFromGRPC(task.getTrigger());
    this.nodes = task.getNodesList().map(node => nodeFromGRPC(node));
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
