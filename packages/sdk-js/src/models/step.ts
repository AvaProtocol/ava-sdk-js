import * as avs_pb from "@/grpc_codegen/avs_pb";
import { convertProtobufValueToJs } from "../utils";

export type StepProps = Omit<
  avs_pb.Execution.Step.AsObject,
  | "outputDataCase"
  | "ethTransfer"
  | "graphql"
  | "contractRead"
  | "contractWrite"
  | "customCode"
  | "restApi"
  | "branch"
  | "filter"
  | "loop"
> & {
  output: any; // Changed to any to hold converted JS value
};

// OutputDataProps is no longer a union of AsObject, it will be the converted JS type via 'output'
// export type OutputDataProps = ... (removed)

class Step implements StepProps {
  nodeId: string;
  success: boolean;
  log: string;
  error: string;
  startAt: number;
  endAt: number;
  inputsList: string[];
  output: any; // Changed to any

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

  static getOutput(step: avs_pb.Execution.Step): any {
    const outputDataType = step.getOutputDataCase();
    let nodeOutputMessage;

    switch (outputDataType) {
      case avs_pb.Execution.Step.OutputDataCase.OUTPUT_DATA_NOT_SET:
        return null as unknown as OutputDataProps;
      case avs_pb.Execution.Step.OutputDataCase.ETH_TRANSFER:
        return step.getEthTransfer()?.toObject(); // Specific structure, not google.protobuf.Value
      case avs_pb.Execution.Step.OutputDataCase.GRAPHQL:
        nodeOutputMessage = step.getGraphql();
        return nodeOutputMessage && nodeOutputMessage.hasData()
          ? nodeOutputMessage.getData()
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_READ:
        // ContractReadNode.Output has 'repeated google.protobuf.Value data'
        nodeOutputMessage = step.getContractRead();
        if (nodeOutputMessage) {
          return nodeOutputMessage
            .getDataList()
            .map((val) => convertProtobufValueToJs(val));
        }
        return []; // Default to empty array if no data
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_WRITE:
        return step.getContractWrite()?.toObject(); // Specific structure
      case avs_pb.Execution.Step.OutputDataCase.CUSTOM_CODE:
        nodeOutputMessage = step.getCustomCode();
        return nodeOutputMessage && nodeOutputMessage.hasData()
          ? convertProtobufValueToJs(nodeOutputMessage.getData())
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.REST_API:
        nodeOutputMessage = step.getRestApi();
        return nodeOutputMessage && nodeOutputMessage.hasData()
          ? nodeOutputMessage.getData()
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.BRANCH:
        return step.getBranch()?.toObject(); // Specific structure
      case avs_pb.Execution.Step.OutputDataCase.FILTER:
        nodeOutputMessage = step.getFilter();
        return nodeOutputMessage && nodeOutputMessage.hasData()
          ? nodeOutputMessage.getData()
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.LOOP:
        // LoopNode.Output has 'string data' - handle as plain string for now
        return step.getLoop()?.getData();
      default:
        console.warn(
          `Unhandled output data type in Step.getOutput: ${outputDataType}`
        );
        return undefined;
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
      output: Step.getOutput(step),
    });
  }

  // Client side does not generate the step, so there's no toRequest() method
}

export default Step;
