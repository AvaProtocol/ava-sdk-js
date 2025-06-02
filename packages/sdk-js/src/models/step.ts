import * as avs_pb from "@/grpc_codegen/avs_pb";
import { convertProtobufValueToJs, convertProtobufStepTypeToSdk } from "../utils";

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
  | "blockTrigger"
  | "fixedTimeTrigger"
  | "cronTrigger"
  | "eventTrigger"
  | "manualTrigger"
> & {
  output: any; // Changed to any to hold converted JS value
};

// OutputDataProps is no longer a union of AsObject, it will be the converted JS type via 'output'
// export type OutputDataProps = ... (removed)

class Step implements StepProps {
  id: string;
  type: string;
  name: string;
  success: boolean;
  error: string;
  log: string;
  inputsList: string[];
  output: any;
  startAt: number;
  endAt: number;

  constructor(props: StepProps) {
    this.id = props.id;
    this.type = props.type;
    this.name = props.name;
    this.success = props.success;
    this.error = props.error;
    this.log = props.log;
    this.inputsList = props.inputsList;
    this.output = props.output;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
  }

  static getOutput(step: avs_pb.Execution.Step): any {
    const outputDataType = step.getOutputDataCase();
    let nodeOutputMessage;

    switch (outputDataType) {
      case avs_pb.Execution.Step.OutputDataCase.OUTPUT_DATA_NOT_SET:
        return null;
      
      // Trigger outputs
      case avs_pb.Execution.Step.OutputDataCase.BLOCK_TRIGGER:
        const blockOutput = step.getBlockTrigger()?.toObject();
        return blockOutput ? { blockNumber: blockOutput.blockNumber } : undefined;
      case avs_pb.Execution.Step.OutputDataCase.FIXED_TIME_TRIGGER:
        const fixedTimeOutput = step.getFixedTimeTrigger()?.toObject();
        return fixedTimeOutput ? { 
          timestamp: fixedTimeOutput.timestamp, 
          timestampIso: fixedTimeOutput.timestampIso 
        } : undefined;
      case avs_pb.Execution.Step.OutputDataCase.CRON_TRIGGER:
        const cronOutput = step.getCronTrigger()?.toObject();
        return cronOutput ? { 
          timestamp: cronOutput.timestamp, 
          timestampIso: cronOutput.timestampIso
        } : undefined;
      case avs_pb.Execution.Step.OutputDataCase.EVENT_TRIGGER:
        const eventTrigger = step.getEventTrigger();
        if (eventTrigger) {
          if (eventTrigger.hasEvmLog()) {
            return eventTrigger.getEvmLog()?.toObject();
          } else if (eventTrigger.hasTransferLog()) {
            return eventTrigger.getTransferLog()?.toObject();
          }
        }
        return undefined;
      case avs_pb.Execution.Step.OutputDataCase.MANUAL_TRIGGER:
        const manualOutput = step.getManualTrigger()?.toObject();
        return manualOutput || undefined;
      
      // Node outputs
      case avs_pb.Execution.Step.OutputDataCase.ETH_TRANSFER:
        return step.getEthTransfer()?.toObject();
      case avs_pb.Execution.Step.OutputDataCase.GRAPHQL:
        nodeOutputMessage = step.getGraphql();
        return nodeOutputMessage && nodeOutputMessage.hasData()
          ? nodeOutputMessage.getData()
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_READ:
        nodeOutputMessage = step.getContractRead();
        if (nodeOutputMessage) {
          return nodeOutputMessage
            .getDataList()
            .map((val) => convertProtobufValueToJs(val));
        }
        return [];
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_WRITE:
        return step.getContractWrite()?.toObject();
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
        return step.getBranch()?.toObject();
      case avs_pb.Execution.Step.OutputDataCase.FILTER:
        nodeOutputMessage = step.getFilter();
        return nodeOutputMessage && nodeOutputMessage.hasData()
          ? nodeOutputMessage.getData()
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.LOOP:
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
      id: step.getId(),
      type: convertProtobufStepTypeToSdk(step.getType()),
      name: step.getName(),
      success: step.getSuccess(),
      error: step.getError(),
      log: step.getLog(),
      inputsList: step.getInputsList(),
      output: Step.getOutput(step),
      startAt: step.getStartAt(),
      endAt: step.getEndAt(),
    });
  }

  // Client side does not generate the step, so there's no toRequest() method
}

export default Step;
