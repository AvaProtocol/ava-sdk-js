import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerType } from "@avaprotocol/types";
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

export type ExecutionProps = Omit<
  avs_pb.Execution.AsObject,
  | "stepsList"
> & {
  steps: Step[];
};

class Execution implements ExecutionProps {
  id: string;
  startAt: number;
  endAt: number;
  success: boolean;
  error: string;
  steps: Step[];

  constructor(props: ExecutionProps) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.success = props.success;
    this.error = props.error;
    this.steps = props.steps;
  }

  static fromResponse(execution: avs_pb.Execution): Execution {
    return new Execution({
      id: execution.getId(),
      startAt: execution.getStartAt(),
      endAt: execution.getEndAt(),
      success: execution.getSuccess(),
      error: execution.getError(),
      steps: execution
        .getStepsList()
        .map((step) => Step.fromResponse(step)),
    });
  }

  // Client side does not generate the execution, so there's no toRequest() method
}

export default Execution;
