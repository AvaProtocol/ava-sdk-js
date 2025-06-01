import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerTypeConverter } from "@avaprotocol/types";
import Step from "./step";

export type StepProps = avs_pb.Execution.Step.AsObject;

export type OutputDataProps =
  | avs_pb.BlockTrigger.Output.AsObject
  | avs_pb.FixedTimeTrigger.Output.AsObject
  | avs_pb.CronTrigger.Output.AsObject
  | avs_pb.EventTrigger.Output.AsObject
  | avs_pb.EventTrigger.TransferLogOutput.AsObject
  | avs_pb.ManualTrigger.Output.AsObject
  | avs_pb.Evm.Log.AsObject
  | { blockNumber: number } // Filtered block trigger output
  | { timestamp: number; timestampIso: string } // Filtered time trigger output (updated from epoch)
  | undefined;

// Updated to remove triggerReason and use the new flattened structure
export type ExecutionProps = Omit<
  avs_pb.Execution.AsObject,
  | "stepsList"
  | "blockTrigger"
  | "fixedTimeTrigger"
  | "cronTrigger"
  | "eventTrigger"
  | "manualTrigger"
> & {
  stepsList: Step[];
  triggerOutput: OutputDataProps;
};

class Execution implements ExecutionProps {
  id: string;
  startAt: number;
  endAt: number;
  success: boolean;
  error: string;
  stepsList: Step[];
  triggerName: string;
  triggerType: avs_pb.TriggerType; // Now using the flattened trigger_type field
  triggerOutput: OutputDataProps;

  constructor(props: ExecutionProps) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.success = props.success;
    this.error = props.error;
    this.stepsList = props.stepsList;
    this.triggerName = props.triggerName;
    this.triggerType = props.triggerType;
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
        // Updated to use timestamp and timestampIso instead of epoch
        triggerOutputData = fixedTimeOutput ? { 
          timestamp: fixedTimeOutput.timestamp, 
          timestampIso: fixedTimeOutput.timestampIso 
        } : undefined;
        break;
      case avs_pb.Execution.OutputDataCase.CRON_TRIGGER:
        const cronOutput = execution.getCronTrigger()?.toObject();
        // Updated to use timestamp and timestampIso instead of epoch (removed scheduleMatched as it doesn't exist)
        triggerOutputData = cronOutput ? { 
          timestamp: cronOutput.timestamp, 
          timestampIso: cronOutput.timestampIso
        } : undefined;
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
      case avs_pb.Execution.OutputDataCase.MANUAL_TRIGGER:
        const manualOutput = execution.getManualTrigger()?.toObject();
        triggerOutputData = manualOutput || undefined;
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
      triggerType: execution.getTriggerType(), // Using the flattened trigger_type field
      triggerOutput: triggerOutputData,
      stepsList: execution
        .getStepsList()
        .map((step) => Step.fromResponse(step)),
    });
  }

  // Client side does not generate the execution, so there's no toRequest() method
}

export default Execution;
