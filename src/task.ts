import * as avs_pb from "../grpc_codegen/avs_pb";
import { TaskType, TaskTrigger, Execution, ExecutionStep, TaskEdge, TaskNode, TriggerMark } from "./types";
import { triggerFromGRPC, nodeFromGRPC, taskEdgeFromGRPC } from "./builder";

class Task implements TaskType {
  id: string;
  status: number;
  owner: string;
  smartWalletAddress: string;
  trigger: TaskTrigger;
  nodes: TaskNode[];
  edges: TaskEdge[];
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
         success: execution.getSuccess(),
         error: execution.getError(),
         triggerMark: execution.getTriggerMark()?.toObject() as TriggerMark,
         result: execution.getResult(),
         steps: execution.getStepsList().map(step => step.toObject() as ExecutionStep)
       } 
    });
    this.maxExecution = task.getMaxExecution();
  }
}

export default Task;
