import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  convertProtobufValueToJs,
  convertProtobufStepTypeToSdk,
} from "../utils";
import { StepProps, OutputDataProps } from "@avaprotocol/types";

class Step implements StepProps {
  id: string;
  type: string;
  name: string;
  success: boolean;
  error: string;
  log: string;
  inputsList: string[];
  output: OutputDataProps;
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

  /**
   * Convert Step instance to plain object (StepProps)
   * This is useful for serialization, especially with Next.js Server Components
   */
  toJson(): StepProps {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      success: this.success,
      error: this.error,
      log: this.log,
      inputsList: this.inputsList,
      output: this.output,
      startAt: this.startAt,
      endAt: this.endAt,
    };
  }

  static getOutput(step: avs_pb.Execution.Step): OutputDataProps {
    const outputDataType = step.getOutputDataCase();
    let nodeOutputMessage;

    switch (outputDataType) {
      case avs_pb.Execution.Step.OutputDataCase.OUTPUT_DATA_NOT_SET:
        return undefined;

      // Trigger outputs
      case avs_pb.Execution.Step.OutputDataCase.BLOCK_TRIGGER:
        const blockOutput = step.getBlockTrigger()?.toObject();
        return blockOutput
          ? { blockNumber: blockOutput.blockNumber }
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.FIXED_TIME_TRIGGER:
        const fixedTimeOutput = step.getFixedTimeTrigger()?.toObject();
        return fixedTimeOutput
          ? {
              timestamp: fixedTimeOutput.timestamp,
              timestampIso: fixedTimeOutput.timestampIso,
            }
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.CRON_TRIGGER:
        const cronOutput = step.getCronTrigger()?.toObject();
        return cronOutput
          ? {
              timestamp: cronOutput.timestamp,
              timestampIso: cronOutput.timestampIso,
            }
          : undefined;
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
        const ethTransferOutput = step.getEthTransfer()?.toObject();
        return ethTransferOutput
          ? {
              transactionHash: ethTransferOutput.transactionHash,
            }
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.GRAPHQL:
        nodeOutputMessage = step.getGraphql();
        return nodeOutputMessage && nodeOutputMessage.hasData()
          ? nodeOutputMessage.getData()
          : undefined;
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_READ:
        nodeOutputMessage = step.getContractRead();
        if (nodeOutputMessage) {
          const results = nodeOutputMessage.getResultsList();
          if (results && results.length > 0) {
            // If single result, return it directly for backward compatibility
            if (results.length === 1) {
              const result = results[0];
              const structuredData: { [key: string]: string } = {};
              result.getDataList().forEach((field) => {
                structuredData[field.getName()] = field.getValue();
              });
              return {
                methodName: result.getMethodName(),
                success: result.getSuccess(),
                error: result.getError(),
                data: structuredData,
              };
            } else {
              // Multiple results - return as array
              return results.map((result) => {
                const structuredData: { [key: string]: string } = {};
                result.getDataList().forEach((field) => {
                  structuredData[field.getName()] = field.getValue();
                });
                return {
                  methodName: result.getMethodName(),
                  success: result.getSuccess(),
                  error: result.getError(),
                  data: structuredData,
                };
              });
            }
          }
        }
        return undefined;
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_WRITE:
        nodeOutputMessage = step.getContractWrite();
        if (nodeOutputMessage) {
          const results = nodeOutputMessage.getResultsList();
          if (results && results.length > 0) {
            // Transform enhanced results structure
            const transformedResults = results.map((result) => ({
              methodName: result.getMethodName(),
              success: result.getSuccess(),
              transaction: result.getTransaction() ? {
                hash: result.getTransaction()?.getHash(),
                status: result.getTransaction()?.getStatus(),
                blockNumber: result.getTransaction()?.getBlockNumber(),
                blockHash: result.getTransaction()?.getBlockHash(),
                gasUsed: result.getTransaction()?.getGasUsed(),
                gasLimit: result.getTransaction()?.getGasLimit(),
                gasPrice: result.getTransaction()?.getGasPrice(),
                effectiveGasPrice: result.getTransaction()?.getEffectiveGasPrice(),
                from: result.getTransaction()?.getFrom(),
                to: result.getTransaction()?.getTo(),
                value: result.getTransaction()?.getValue(),
                nonce: result.getTransaction()?.getNonce(),
                transactionIndex: result.getTransaction()?.getTransactionIndex(),
                confirmations: result.getTransaction()?.getConfirmations(),
                timestamp: result.getTransaction()?.getTimestamp(),
              } : null,
              events: result.getEventsList().map((event) => ({
                eventName: event.getEventName(),
                address: event.getAddress(),
                topics: event.getTopicsList(),
                data: event.getData(),
                decoded: event.getDecodedMap() ? Object.fromEntries(event.getDecodedMap().toArray()) : {},
              })),
              error: result.getError() ? {
                code: result.getError()?.getCode(),
                message: result.getError()?.getMessage(),
                revertReason: result.getError()?.getRevertReason(),
              } : null,
              returnData: result.getReturnData() ? {
                name: result.getReturnData()?.getName(),
                type: result.getReturnData()?.getType(),
                value: result.getReturnData()?.getValue(),
              } : null,
              inputData: result.getInputData(),
            }));

            // For single result, also provide legacy fields for backward compatibility
            if (transformedResults.length === 1) {
              return {
                results: transformedResults,
                // Legacy compatibility fields
                transaction: transformedResults[0].transaction,
                success: transformedResults[0].success,
                hash: transformedResults[0].transaction?.hash,
              };
            } else {
              return { results: transformedResults };
            }
          }
        }
        return undefined;
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
