import * as avs_pb from "../../grpc_codegen/avs_pb";
import { TriggerMark } from "../../grpc_codegen/avs_pb";
import Step from "./step";

export type ExecutionProps = Omit<avs_pb.Execution.AsObject, "stepsList"> & {
  stepsList: Step[];
};
export type TriggerMarkProps = avs_pb.TriggerMark.AsObject;
export type StepProps = avs_pb.Execution.Step.AsObject;

class Execution implements ExecutionProps {
  id: string;
  startAt: number;
  endAt: number;
  success: boolean;
  error: string;
  triggerMark?: TriggerMarkProps;
  result: string;
  stepsList: Step[];

  constructor(props: ExecutionProps) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.success = props.success;
    this.error = props.error;
    this.triggerMark = props.triggerMark;
    this.result = props.result;
    this.stepsList = props.stepsList;
  }

  static fromResponse(execution: avs_pb.Execution): Execution {
    return new Execution({
      id: execution.getId(),
      startAt: execution.getStartAt(),
      endAt: execution.getEndAt(),
      success: execution.getSuccess(),
      error: execution.getError(),
      triggerMark: {
        blockNumber: execution.getTriggerMark()?.getBlockNumber() ?? 0,
        logIndex: execution.getTriggerMark()?.getLogIndex() ?? 0,
        txHash: execution.getTriggerMark()?.getTxHash() ?? "",
      },
      result: execution.getResult(),
      stepsList: execution
        .getStepsList()
        .map((step) => Step.fromResponse(step)),
    });
  }

  toRequest(): avs_pb.Execution {
    const execution = new avs_pb.Execution();
    execution.setId(this.id);
    execution.setStartAt(this.startAt);
    execution.setEndAt(this.endAt);
    execution.setSuccess(this.success);
    execution.setError(this.error);
    execution.setStepsList(this.stepsList.map((step) => step.toRequest()));

    if (this.triggerMark) {
      const triggerMark = new TriggerMark();
      triggerMark.setBlockNumber(this.triggerMark.blockNumber);
      triggerMark.setLogIndex(this.triggerMark.logIndex);
      triggerMark.setTxHash(this.triggerMark.txHash);
      execution.setTriggerMark(triggerMark);
    }

    execution.setResult(this.result);
    return execution;
  }
}

export default Execution;
