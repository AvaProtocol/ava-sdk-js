import * as avs_pb from "../../grpc_codegen/avs_pb";
import TriggerMetadata, { TriggerMetadataProps } from "./trigger/metadata";
import Step from "./step";

export type ExecutionProps = Omit<
  avs_pb.Execution.AsObject,
  "stepsList" | "triggerMetadata"
> & {
  stepsList: Step[];
  triggerMetadata: TriggerMetadata | undefined;
};
export type StepProps = avs_pb.Execution.Step.AsObject;

class Execution implements ExecutionProps {
  id: string;
  startAt: number;
  endAt: number;
  success: boolean;
  error: string;
  triggerMetadata: TriggerMetadata | undefined;
  result: string;
  stepsList: Step[];

  constructor(props: ExecutionProps) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.success = props.success;
    this.error = props.error;
    this.triggerMetadata = props.triggerMetadata;
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
      triggerMetadata: TriggerMetadata.fromResponse(
        execution.getTriggerMetadata()
      ),
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

    if (this.triggerMetadata) {
      execution.setTriggerMetadata(this.triggerMetadata.toRequest());
    }

    execution.setResult(this.result);
    return execution;
  }
}

export default Execution;
