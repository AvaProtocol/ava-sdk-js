import * as avs_pb from "../grpc_codegen/avs_pb";
import { TaskType } from "./types";

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
    this.smartAccountAddress = task.getSmartAccountAddress();
    this.trigger = {
      triggerType: task.getTrigger()?.getTriggerType() || 0,
      schedule: task.getTrigger()?.getSchedule()?.toObject(),
      contractQuery: task.getTrigger()?.getContractQuery()?.toObject(),
      expression: task.getTrigger()?.getExpression()?.toObject() || {
        expression: "",
      },
    };
    this.nodesList = task.getNodesList();
    this.startAt = task.getStartAt();
    this.expiredAt = task.getExpiredAt();
    this.memo = task.getMemo();
    this.completedAt = task.getCompletedAt();
    this.status = task.getStatus();
    this.repeatable = task.getRepeatable();
    this.executionsList = task.getExecutionsList();
  }
}

export default Task;
