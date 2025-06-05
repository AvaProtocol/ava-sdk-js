import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerTypeConverter, TriggerType, ExecutionProps, StepProps } from "@avaprotocol/types";
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
    this.steps = props.steps.map(s => new Step(s));
  }

  /**
   * Convert Execution instance to plain object (ExecutionProps)
   * This is useful for serialization, especially with Next.js Server Components
   */
  toJson(): ExecutionProps {
    return {
      id: this.id,
      startAt: this.startAt,
      endAt: this.endAt,
      success: this.success,
      error: this.error,
      steps: this.steps.map(step => step.toJson()),
    };
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
        .map((step) => Step.fromResponse(step)) as StepProps[],
    });
  }

  // Client side does not generate the execution, so there's no toRequest() method
}

export default Execution;
