import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  ExecutionProps,
  StepProps,
  ExecutionStatus,
  type Fee,
  type NodeCOGS,
  type ValueFee,
} from "@avaprotocol/types";
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

function convertFee(feePb: avs_pb.Fee | undefined): Fee | undefined {
  if (!feePb) return undefined;
  return {
    amount: feePb.getAmount(),
    unit: feePb.getUnit(),
  };
}

function convertNodeCOGS(cogsPb: avs_pb.NodeCOGS): NodeCOGS {
  return {
    nodeId: cogsPb.getNodeId(),
    costType: cogsPb.getCostType(),
    fee: convertFee(cogsPb.getFee()) || { amount: "0", unit: "WEI" },
    gasUnits: cogsPb.getGasUnits() || undefined,
  };
}

function convertValueFee(valuePb: avs_pb.ValueFee | undefined): ValueFee | undefined {
  if (!valuePb) return undefined;
  return {
    fee: convertFee(valuePb.getFee()) || { amount: "0", unit: "PERCENTAGE" },
    tier: valuePb.getTier().toString(),
    valueBase: valuePb.getValueBase() || undefined,
    classificationMethod: valuePb.getClassificationMethod(),
    confidence: valuePb.getConfidence(),
    reason: valuePb.getReason(),
  };
}

class Execution implements ExecutionProps {
  id: string;
  startAt: number;
  endAt: number;
  status: ExecutionStatus;
  error: string;
  index: number;
  steps: Step[];
  executionFee?: Fee;
  cogs: NodeCOGS[];
  valueFee?: ValueFee;

  constructor(props: ExecutionProps) {
    this.id = props.id;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.status = props.status;
    this.error = props.error;
    this.index = props.index;
    this.steps = props.steps.map(s => new Step(s));
    this.executionFee = props.executionFee;
    this.cogs = props.cogs || [];
    this.valueFee = props.valueFee;
  }

  toJson(): ExecutionProps {
    return {
      id: this.id,
      startAt: this.startAt,
      endAt: this.endAt,
      status: this.status,
      error: this.error,
      index: this.index,
      steps: this.steps.map(step => step.toJson()),
      ...(this.executionFee && { executionFee: this.executionFee }),
      cogs: this.cogs,
      ...(this.valueFee && { valueFee: this.valueFee }),
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
      executionFee: convertFee(execution.getExecutionFee()),
      cogs: execution.getCogsList().map(convertNodeCOGS),
      valueFee: convertValueFee(execution.getValueFee()),
      steps: execution
        .getStepsList()
        .map((step) => Step.fromResponse(step)) as StepProps[],
    });
  }
}

export default Execution;
