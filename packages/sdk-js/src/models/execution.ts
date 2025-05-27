import * as avs_pb from "@/grpc_codegen/avs_pb";
import TriggerReason from "./trigger/reason";
import Step from "./step";

export type StepProps = avs_pb.Execution.Step.AsObject;

export type OutputDataProps =
  | avs_pb.BlockTrigger.Output.AsObject
  | avs_pb.CronTrigger.Output.AsObject
  | avs_pb.EventTrigger.Output.AsObject
  | avs_pb.FixedTimeTrigger.Output.AsObject
  | undefined;

// Ignore the original transferLog, evmLog, etc. fields and use a combined outputData field instead
export type ExecutionProps = Omit<
  avs_pb.Execution.AsObject,
  "stepsList" | "reason" | "transferLog" | "evmLog" | "block" | "time"
> & {
  stepsList: Step[];
  triggerReason: TriggerReason | undefined;
  triggerOutput: OutputDataProps;
};

class Execution implements ExecutionProps {
  id: string;
  startAt: number;
  endAt: number;
  success: boolean;
  error: string;
  stepsList: Step[];
  triggerReason: TriggerReason | undefined;
  triggerName: string;
  triggerOutput: OutputDataProps;

  constructor(props: ExecutionProps) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.success = props.success;
    this.error = props.error;
    this.stepsList = props.stepsList;
    this.triggerName = props.triggerName;
    this.triggerReason = props.triggerReason;
    this.triggerOutput = props.triggerOutput;
  }

  static fromResponse(execution: avs_pb.Execution): Execution {
    const triggerOutputDataType = execution.getOutputDataCase();

    let triggerOutputData: OutputDataProps | undefined;

    switch (triggerOutputDataType) {
      case avs_pb.Execution.OutputDataCase.EVENT_TRIGGER:
        triggerOutputData = execution.getEventTrigger()?.toObject();
        break;
      case avs_pb.Execution.OutputDataCase.CRON_TRIGGER:
        triggerOutputData = execution.getCronTrigger()?.toObject();
        break;
      case avs_pb.Execution.OutputDataCase.BLOCK_TRIGGER:
        triggerOutputData = execution.getBlockTrigger()?.toObject();
        break;
      case avs_pb.Execution.OutputDataCase.FIXED_TIME_TRIGGER:
        triggerOutputData = execution.getFixedTimeTrigger()?.toObject();
        break;
    }

    return new Execution({
      id: execution.getId(),
      startAt: execution.getStartAt(),
      endAt: execution.getEndAt(),
      success: execution.getSuccess(),
      error: execution.getError(),
      triggerName: execution.getTriggerName(),
      triggerReason: TriggerReason.fromResponse(execution.getReason()),
      triggerOutput: triggerOutputData,
      stepsList: execution
        .getStepsList()
        .map((step) => Step.fromResponse(step)),
    });
  }

  // Client side does not generate the execution, so there’s no toRequest() method
}

export default Execution;
