import * as avs_pb from "../../grpc_codegen/avs_pb";
import { TriggerMark } from "../../grpc_codegen/avs_pb";

export type ExecutionProps = avs_pb.Execution.AsObject;
export type TriggerMarkProps = avs_pb.TriggerMark.AsObject;
export type StepProps = avs_pb.Execution.Step.AsObject;

class Execution implements ExecutionProps {
  epoch: number;
  success: boolean;
  error: string;
  triggerMark?: TriggerMarkProps;
  result: string;
  stepsList: Array<StepProps>;

  constructor(props: ExecutionProps) {
    this.epoch = props.epoch;
    this.success = props.success;
    this.error = props.error;
    this.triggerMark = props.triggerMark;
    this.result = props.result;
    this.stepsList = props.stepsList;
  }

  static fromResponse(execution: avs_pb.Execution): Execution {
    return new Execution(execution.toObject());
  }

  toRequest(): avs_pb.Execution {
    const execution = new avs_pb.Execution();
    execution.setEpoch(this.epoch);
    execution.setSuccess(this.success);
    execution.setError(this.error);

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
