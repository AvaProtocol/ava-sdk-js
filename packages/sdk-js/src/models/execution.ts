import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerTypeConverter, TriggerType, ExecutionProps } from "@avaprotocol/types";
import Step from "./step";



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
