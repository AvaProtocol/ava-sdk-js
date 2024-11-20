import * as avs_pb from "../grpc_codegen/avs_pb";
import { TaskType, TaskTrigger, Execution } from "./types";
import { triggerFromGRPC, nodeFromGRPC, taskEdgeFromGRPC } from "./builder";

class Task implements TaskType {
  id: string;
  status: number;
  owner: string;
  smartWalletAddress: string;
  trigger: TaskTrigger;
  nodes: any[];
  edges: any[];
  startAt: number;
  expiredAt: number;
  memo: string;
  completedAt: number;
  maxExecution: number;
  executions: Execution[];

  constructor(task: avs_pb.Task) {
    this.id = task.getId() || "";
    this.status = task.getStatus();
    this.owner = task.getOwner();
    this.smartWalletAddress = task.getSmartWalletAddress();
    this.nodes = task.getNodesList().map(node => nodeFromGRPC(node));
    this.trigger = triggerFromGRPC(task.getTrigger());
    this.edges = task.getEdgesList().map(edge => taskEdgeFromGRPC(edge));
    this.startAt = task.getStartAt();
    this.expiredAt = task.getExpiredAt();
    this.memo = task.getMemo();
    this.completedAt = task.getCompletedAt();
    this.status = task.getStatus();
    this.executions = task.getExecutionsList().map(execution => {
       return {
         epoch: execution.getEpoch(),
         userOpHash: execution.getUserOpHash(),
         error: execution.getError(),
       } 
    });
    this.maxExecution = task.getMaxExecution();
  }
}

export default Task;
