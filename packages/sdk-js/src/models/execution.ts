import * as avs_pb from "@/grpc_codegen/avs_pb";
import TriggerReason from "./trigger/reason";
import Step from "./step";

export type StepProps = avs_pb.Execution.Step.AsObject;

export type OutputDataProps =
  | avs_pb.Execution.TransferLogOutput.AsObject
  | avs_pb.Execution.BlockOutput.AsObject
  | avs_pb.Execution.TimeOutput.AsObject
  | avs_pb.Evm.Log.AsObject
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

    console.log("execution.triggerOutputDataType", execution.toObject());
    console.log("execution.triggerOutputDataType", triggerOutputDataType);
    let triggerOutputData: OutputDataProps | undefined;

    switch (triggerOutputDataType) {
      case avs_pb.Execution.OutputDataCase.EVM_LOG:
        triggerOutputData = execution.getEvmLog()?.toObject();
        break;
      case avs_pb.Execution.OutputDataCase.TRANSFER_LOG:
        triggerOutputData = execution.getTransferLog()?.toObject();
        break;
      case avs_pb.Execution.OutputDataCase.BLOCK:
        triggerOutputData = execution.getBlock()?.toObject();
        break;
      case avs_pb.Execution.OutputDataCase.TIME:
        triggerOutputData = execution.getTime()?.toObject();
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
