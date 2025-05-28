import * as avs_pb from "@/grpc_codegen/avs_pb";
import TriggerReason from "./trigger/reason";
import Step from "./step";

export type StepProps = avs_pb.Execution.Step.AsObject;

export type OutputDataProps =
  | avs_pb.BlockTrigger.Output.AsObject
  | avs_pb.FixedTimeTrigger.Output.AsObject
  | avs_pb.CronTrigger.Output.AsObject
  | avs_pb.EventTrigger.Output.AsObject
  | avs_pb.EventTrigger.TransferLogOutput.AsObject
  | avs_pb.Evm.Log.AsObject
  | { blockNumber: number } // Filtered block trigger output
  | { epoch: number } // Filtered fixed time trigger output
  | { epoch: number; scheduleMatched: string } // Filtered cron trigger output
  | undefined;

// Ignore the original trigger output fields and use a combined outputData field instead
export type ExecutionProps = Omit<
  avs_pb.Execution.AsObject,
  | "stepsList"
  | "reason"
  | "blockTrigger"
  | "fixedTimeTrigger"
  | "cronTrigger"
  | "eventTrigger"
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
      case avs_pb.Execution.OutputDataCase.BLOCK_TRIGGER:
        const blockOutput = execution.getBlockTrigger()?.toObject();
        // Filter to only return blockNumber for block triggers
        triggerOutputData = blockOutput ? { blockNumber: blockOutput.blockNumber } : undefined;
        break;
      case avs_pb.Execution.OutputDataCase.FIXED_TIME_TRIGGER:
        const fixedTimeOutput = execution.getFixedTimeTrigger()?.toObject();
        // Filter to only return epoch for fixed time triggers
        triggerOutputData = fixedTimeOutput ? { epoch: fixedTimeOutput.epoch } : undefined;
        break;
      case avs_pb.Execution.OutputDataCase.CRON_TRIGGER:
        const cronOutput = execution.getCronTrigger()?.toObject();
        // Filter to only return epoch and scheduleMatched for cron triggers
        triggerOutputData = cronOutput ? { epoch: cronOutput.epoch, scheduleMatched: cronOutput.scheduleMatched } : undefined;
        break;
      case avs_pb.Execution.OutputDataCase.EVENT_TRIGGER:
        const eventTrigger = execution.getEventTrigger();
        if (eventTrigger) {
          if (eventTrigger.hasEvmLog()) {
            triggerOutputData = eventTrigger.getEvmLog()?.toObject();
          } else if (eventTrigger.hasTransferLog()) {
            triggerOutputData = eventTrigger.getTransferLog()?.toObject();
          }
        }
        break;
      case avs_pb.Execution.OutputDataCase.OUTPUT_DATA_NOT_SET:
        triggerOutputData = undefined;
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

  // Client side does not generate the execution, so there's no toRequest() method
}

export default Execution;
