import * as avs_pb from "@/grpc_codegen/avs_pb";

export type StepProps = avs_pb.Execution.Step.AsObject & {
  output: OutputDataProps;
};

// There are 9 different types of output data
// ETH_TRANSFER = 3,
// GRAPHQL = 4,
// CONTRACT_READ = 5,
// CONTRACT_WRITE = 6,
// CUSTOM_CODE = 7,
// REST_API = 8,
// BRANCH = 9,
// FILTER = 10,
// LOOP = 11,
export type OutputDataProps =
  | avs_pb.ETHTransferNode.Output.AsObject
  | avs_pb.GraphQLQueryNode.Output.AsObject
  | avs_pb.ContractReadNode.Output.AsObject
  | avs_pb.ContractWriteNode.Output.AsObject
  | avs_pb.CustomCodeNode.Output.AsObject
  | avs_pb.RestAPINode.Output.AsObject
  | avs_pb.BranchNode.Output.AsObject
  | avs_pb.FilterNode.Output.AsObject
  | avs_pb.LoopNode.Output.AsObject;

class Step implements StepProps {
  nodeId: string;
  success: boolean;
  log: string;
  error: string;
  startAt: number;
  endAt: number;
  inputsList: string[];
  output: OutputDataProps;

  constructor(props: StepProps) {
    this.nodeId = props.nodeId;
    this.success = props.success;
    this.log = props.log;
    this.error = props.error;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.inputsList = props.inputsList;
    this.output = props.output;
  }

  static getOutput(step: avs_pb.Execution.Step): OutputDataProps {
    console.log("step.getOutput", step.toObject());

    const outputDataType = step.getOutputDataCase();
    console.log("step.getOutput.outputDataType", outputDataType);
    switch (outputDataType) {
      case avs_pb.Execution.Step.OutputDataCase.OUTPUT_DATA_NOT_SET:
        return {} as OutputDataProps;
      case avs_pb.Execution.Step.OutputDataCase.ETH_TRANSFER:
        return step
          .getEthTransfer()
          ?.toObject() as avs_pb.ETHTransferNode.Output.AsObject;
      case avs_pb.Execution.Step.OutputDataCase.GRAPHQL:
        return step
          .getGraphql()
          ?.toObject() as avs_pb.GraphQLQueryNode.Output.AsObject;
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_READ:
        return step
          .getContractRead()
          ?.toObject() as avs_pb.ContractReadNode.Output.AsObject;
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_WRITE:
        return step
          .getContractWrite()
          ?.toObject() as avs_pb.ContractWriteNode.Output.AsObject;
      case avs_pb.Execution.Step.OutputDataCase.CUSTOM_CODE:
        return step
          .getCustomCode()
          ?.toObject() as avs_pb.CustomCodeNode.Output.AsObject;
      case avs_pb.Execution.Step.OutputDataCase.REST_API:
        return step
          .getRestApi()
          ?.toObject() as avs_pb.RestAPINode.Output.AsObject;
      case avs_pb.Execution.Step.OutputDataCase.BRANCH:
        return step
          .getBranch()
          ?.toObject() as avs_pb.BranchNode.Output.AsObject;
      case avs_pb.Execution.Step.OutputDataCase.FILTER:
        return step
          .getFilter()
          ?.toObject() as avs_pb.FilterNode.Output.AsObject;
      case avs_pb.Execution.Step.OutputDataCase.LOOP:
        return step.getLoop()?.toObject() as avs_pb.LoopNode.Output.AsObject;
      default:
        throw new Error(`Unknown output data type: ${outputDataType}`);
    }
  }

  static fromResponse(step: avs_pb.Execution.Step): Step {
    return new Step({
      nodeId: step.getNodeId(),
      success: step.getSuccess(),
      log: step.getLog(),
      error: step.getError(),
      startAt: step.getStartAt(),
      endAt: step.getEndAt(),
      inputsList: step.getInputsList(),
      output: Step.getOutput(step), // static function of this class for switch conversion
    });
  }

  // Client side does not generate the step, so there’s no toRequest() method
}

export default Step;
