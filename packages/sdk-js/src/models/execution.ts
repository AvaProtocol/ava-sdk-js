import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerTypeConverter, TriggerType, ExecutionProps, StepProps, ExecutionStatus } from "@avaprotocol/types";
import Step from "./step";

/**
 * Convert protobuf ExecutionStatus to types ExecutionStatus
 */
function convertProtobufExecutionStatusToTypes(
  protobufStatus: avs_pb.ExecutionStatus
): ExecutionStatus {
  switch (protobufStatus) {
    case avs_pb.ExecutionStatus.EXECUTION_STATUS_PENDING:
      return ExecutionStatus.Pending;
    case avs_pb.ExecutionStatus.EXECUTION_STATUS_SUCCESS:
      return ExecutionStatus.Success;
    case avs_pb.ExecutionStatus.EXECUTION_STATUS_FAILED:
      return ExecutionStatus.Failed;
    case avs_pb.ExecutionStatus.EXECUTION_STATUS_PARTIAL_SUCCESS:
      return ExecutionStatus.PartialSuccess;
    case avs_pb.ExecutionStatus.EXECUTION_STATUS_UNSPECIFIED:
    default:
      return ExecutionStatus.Unspecified;
  }
}

class Execution implements ExecutionProps {
  id: string;
  startAt: number;
  endAt: number;
  status: ExecutionStatus;
  error: string;
  index: number;
  steps: Step[];

  constructor(props: ExecutionProps) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.status = props.status;
    this.error = props.error;
    this.index = props.index;
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
      status: this.status,
      error: this.error,
      index: this.index,
      steps: this.steps.map(step => step.toJson()),
    };
  }

  static fromResponse(execution: avs_pb.Execution): Execution {
    return new Execution({
      id: execution.getId(),
      startAt: execution.getStartAt(),
      endAt: execution.getEndAt(),
      status: convertProtobufExecutionStatusToTypes(execution.getStatus()),
      error: execution.getError(),
      index: execution.getIndex(),
      steps: execution
        .getStepsList()
        .map((step) => Step.fromResponse(step)) as StepProps[],
    });
  }

  // Client side does not generate the execution, so there's no toRequest() method
}

export default Execution;
