import * as avs_pb from "@/grpc_codegen/avs_pb";
import TriggerReason, { TriggerReasonProps } from "./trigger/reason";
import Step from "./step";

export type ExecutionProps = Omit<
  avs_pb.Execution.AsObject,
  "stepsList" | "reason"
> & {
  stepsList: Step[];
  triggerReason: TriggerReason | undefined;
};
export type StepProps = avs_pb.Execution.Step.AsObject;

class Execution implements ExecutionProps {
  id: string;
  startAt: number;
  endAt: number;
  success: boolean;
  error: string;
  stepsList: Step[];
  triggerReason: TriggerReason | undefined;
  triggerName: string;


  constructor(props: ExecutionProps) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.success = props.success;
    this.error = props.error;
    this.stepsList = props.stepsList;
    this.triggerName = props.triggerName;
    this.triggerReason = props.triggerReason;
  }

  static fromResponse(execution: avs_pb.Execution): Execution {
    return new Execution({
      id: execution.getId(),
      startAt: execution.getStartAt(),
      endAt: execution.getEndAt(),
      success: execution.getSuccess(),
      error: execution.getError(),
      triggerName: execution.getTriggerName(),
      triggerReason: TriggerReason.fromResponse(execution.getReason()),
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

    if (this.triggerReason) {
      execution.setReason(this.triggerReason.toRequest());
    }

    return execution;
  }
}

export default Execution;
