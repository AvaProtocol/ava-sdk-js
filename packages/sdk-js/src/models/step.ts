import * as avs_pb from "@/grpc_codegen/avs_pb";
import { Value as ProtobufValue } from "google-protobuf/google/protobuf/struct_pb";
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
  input?: any;
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
    this.input = props.input;
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
      input: this.input,
      output: this.output,
      startAt: this.startAt,
      endAt: this.endAt,
    };
  }

  static getOutput(step: avs_pb.Execution.Step): OutputDataProps {
    // Handle both protobuf instances and plain objects
    const getOutputDataCase = () => {
      if (typeof step.getOutputDataCase === "function") {
        return step.getOutputDataCase();
      }
      // For plain objects, determine the case by checking which properties exist
      const stepObj = step as any;
      if (stepObj.blockTrigger)
        return avs_pb.Execution.Step.OutputDataCase.BLOCK_TRIGGER;
      if (stepObj.fixedTimeTrigger)
        return avs_pb.Execution.Step.OutputDataCase.FIXED_TIME_TRIGGER;
      if (stepObj.cronTrigger)
        return avs_pb.Execution.Step.OutputDataCase.CRON_TRIGGER;
      if (stepObj.eventTrigger)
        return avs_pb.Execution.Step.OutputDataCase.EVENT_TRIGGER;
      if (stepObj.manualTrigger)
        return avs_pb.Execution.Step.OutputDataCase.MANUAL_TRIGGER;
      if (stepObj.ethTransfer)
        return avs_pb.Execution.Step.OutputDataCase.ETH_TRANSFER;
      if (stepObj.graphql) return avs_pb.Execution.Step.OutputDataCase.GRAPHQL;
      if (stepObj.contractRead)
        return avs_pb.Execution.Step.OutputDataCase.CONTRACT_READ;
      if (stepObj.contractWrite)
        return avs_pb.Execution.Step.OutputDataCase.CONTRACT_WRITE;
      if (stepObj.customCode)
        return avs_pb.Execution.Step.OutputDataCase.CUSTOM_CODE;
      if (stepObj.restApi) return avs_pb.Execution.Step.OutputDataCase.REST_API;
      if (stepObj.branch) return avs_pb.Execution.Step.OutputDataCase.BRANCH;
      if (stepObj.filter) return avs_pb.Execution.Step.OutputDataCase.FILTER;
      if (stepObj.loop) return avs_pb.Execution.Step.OutputDataCase.LOOP;
      return avs_pb.Execution.Step.OutputDataCase.OUTPUT_DATA_NOT_SET;
    };

    switch (getOutputDataCase()) {
      case avs_pb.Execution.Step.OutputDataCase.OUTPUT_DATA_NOT_SET:
        return undefined;

      // Trigger outputs
      case avs_pb.Execution.Step.OutputDataCase.BLOCK_TRIGGER:
        return typeof step.getBlockTrigger === "function"
          ? step.getBlockTrigger()?.toObject()
          : (step as any).blockTrigger;
      case avs_pb.Execution.Step.OutputDataCase.FIXED_TIME_TRIGGER:
        return typeof step.getFixedTimeTrigger === "function"
          ? step.getFixedTimeTrigger()?.toObject()
          : (step as any).fixedTimeTrigger;
      case avs_pb.Execution.Step.OutputDataCase.CRON_TRIGGER:
        return typeof step.getCronTrigger === "function"
          ? step.getCronTrigger()?.toObject()
          : (step as any).cronTrigger;
      case avs_pb.Execution.Step.OutputDataCase.EVENT_TRIGGER:
        const eventTrigger =
          typeof step.getEventTrigger === "function"
            ? step.getEventTrigger()
            : (step as any).eventTrigger;
        if (eventTrigger) {
          // Check for the new data field structure
          if (
            typeof eventTrigger.hasData === "function" &&
            eventTrigger.hasData()
          ) {
            try {
              return convertProtobufValueToJs(eventTrigger.getData());
            } catch (error) {
              console.warn('Failed to convert event trigger data from protobuf Value:', error);
              return eventTrigger.getData();
            }
          } else if (eventTrigger.data) {
            // For plain objects, try to convert or use directly
            return typeof eventTrigger.data.getKindCase === "function"
              ? convertProtobufValueToJs(eventTrigger.data)
              : eventTrigger.data;
          }
          
          // Fallback to old structure for backward compatibility
          if (
            typeof eventTrigger.hasEvmLog === "function" &&
            eventTrigger.hasEvmLog()
          ) {
            return eventTrigger.getEvmLog()?.toObject();
          } else if (
            typeof eventTrigger.hasTransferLog === "function" &&
            eventTrigger.hasTransferLog()
          ) {
            return eventTrigger.getTransferLog()?.toObject();
          } else if (eventTrigger.evmLog) {
            return eventTrigger.evmLog;
          } else if (eventTrigger.transferLog) {
            return eventTrigger.transferLog;
          }
        }
        return undefined;
      case avs_pb.Execution.Step.OutputDataCase.MANUAL_TRIGGER:
        return typeof step.getManualTrigger === "function"
          ? step.getManualTrigger()?.toObject() || undefined
          : (step as any).manualTrigger;

      // Node outputs - RESTORE MISSING CASES
      case avs_pb.Execution.Step.OutputDataCase.ETH_TRANSFER:
        return typeof step.getEthTransfer === "function"
          ? step.getEthTransfer()?.toObject()
          : (step as any).ethTransfer;

      case avs_pb.Execution.Step.OutputDataCase.CUSTOM_CODE:
        const customCodeOutput =
          typeof step.getCustomCode === "function"
            ? step.getCustomCode()
            : (step as any).customCode;
        if (customCodeOutput) {
          if (
            typeof customCodeOutput.hasData === "function" &&
            customCodeOutput.hasData()
          ) {
            try {
              return convertProtobufValueToJs(customCodeOutput.getData());
            } catch {
              // Fallback: if conversion fails, return the raw data
              return customCodeOutput.getData();
            }
          } else if (customCodeOutput.data) {
            // For plain objects, try to convert or use directly
            return typeof customCodeOutput.data.getKindCase === "function"
              ? convertProtobufValueToJs(customCodeOutput.data)
              : customCodeOutput.data;
          }
        }
        return undefined;

      case avs_pb.Execution.Step.OutputDataCase.REST_API:
        const restApiOutput =
          typeof step.getRestApi === "function"
            ? step.getRestApi()
            : (step as any).restApi;
        if (restApiOutput) {
          if (
            typeof restApiOutput.hasData === "function" &&
            restApiOutput.hasData()
          ) {
            try {
              return convertProtobufValueToJs(restApiOutput.getData());
            } catch {
              // Fallback: if conversion fails, return the raw data
              return restApiOutput.getData();
            }
          } else if (restApiOutput.data) {
            // For plain objects, try to convert or use directly
            return typeof restApiOutput.data.getKindCase === "function"
              ? convertProtobufValueToJs(restApiOutput.data)
              : restApiOutput.data;
          }
        }
        return undefined;

      case avs_pb.Execution.Step.OutputDataCase.BRANCH:
        return typeof step.getBranch === "function"
          ? step.getBranch()?.toObject()
          : (step as any).branch;

      case avs_pb.Execution.Step.OutputDataCase.LOOP:
        const loopOutput =
          typeof step.getLoop === "function"
            ? step.getLoop()
            : (step as any).loop;
        if (loopOutput) {
          if (
            typeof loopOutput.getData === "function" &&
            loopOutput.getData()
          ) {
            try {
              return JSON.parse(loopOutput.getData());
            } catch {
              return loopOutput.getData();
            }
          } else if (loopOutput.data) {
            // For plain objects
            try {
              return typeof loopOutput.data === "string"
                ? JSON.parse(loopOutput.data)
                : loopOutput.data;
            } catch {
              return loopOutput.data;
            }
          }
        }
        return undefined;

      case avs_pb.Execution.Step.OutputDataCase.GRAPHQL:
        const graphqlOutput =
          typeof step.getGraphql === "function"
            ? step.getGraphql()
            : (step as any).graphql;
        if (graphqlOutput) {
          try {
            return typeof graphqlOutput.toObject === "function"
              ? graphqlOutput.toObject()
              : graphqlOutput;
          } catch {
            return undefined;
          }
        }
        return undefined;

      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_READ:
        const contractReadOutput =
          typeof step.getContractRead === "function"
            ? step.getContractRead()
            : (step as any).contractRead;
        if (contractReadOutput) {
          // Get the raw output object
          const outputObj =
            typeof contractReadOutput.toObject === "function"
              ? contractReadOutput.toObject()
              : contractReadOutput;

          // Convert resultsList to results for consistency with ContractReadNode.fromOutputData
          if (outputObj && outputObj.resultsList) {
            // Exclude resultsList from the spread to avoid duplication
            const { resultsList, ...cleanOutputObj } = outputObj;
            return {
              ...cleanOutputObj,
              results: resultsList.map((result: any) => ({
                methodName: result.methodName,
                success: result.success,
                error: result.error,
                data: result.dataList || [],
              })),
            };
          }
          return outputObj;
        }
        return undefined;

      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_WRITE:
        const contractWriteOutput =
          typeof step.getContractWrite === "function"
            ? step.getContractWrite()
            : (step as any).contractWrite;
        if (contractWriteOutput) {
          // Get the raw output object
          const outputObj =
            typeof contractWriteOutput.toObject === "function"
              ? contractWriteOutput.toObject()
              : contractWriteOutput;

          // Convert resultsList to results for consistency with ContractWriteNode.fromOutputData
          if (outputObj && outputObj.resultsList) {
            const transformedResults = outputObj.resultsList.map(
              (result: any) => ({
                methodName: result.methodName,
                success: result.success,
                transaction: result.transaction
                  ? {
                      hash: result.transaction.hash,
                      status: result.transaction.status,
                      blockNumber: result.transaction.blockNumber,
                      blockHash: result.transaction.blockHash,
                      gasUsed: result.transaction.gasUsed,
                      gasLimit: result.transaction.gasLimit,
                      gasPrice: result.transaction.gasPrice,
                      effectiveGasPrice: result.transaction.effectiveGasPrice,
                      from: result.transaction.from,
                      to: result.transaction.to,
                      value: result.transaction.value,
                      nonce: result.transaction.nonce,
                      transactionIndex: result.transaction.transactionIndex,
                      confirmations: result.transaction.confirmations,
                      timestamp: result.transaction.timestamp,
                    }
                  : null,
                events:
                  result.eventsList?.map((event: any) => ({
                    eventName: event.eventName,
                    address: event.address,
                    topics: event.topicsList || [],
                    data: event.data,
                    decoded: event.decodedMap || {},
                  })) || [],
                error: result.error
                  ? {
                      code: result.error.code,
                      message: result.error.message,
                      revertReason: result.error.revertReason,
                    }
                  : null,
                returnData: result.returnData
                  ? {
                      name: result.returnData.name,
                      type: result.returnData.type,
                      value: result.returnData.value,
                    }
                  : null,
                inputData: result.inputData,
              })
            );

            // Exclude resultsList from the spread to avoid duplication
            const { resultsList, ...cleanOutputObj } = outputObj;
            return {
              ...cleanOutputObj,
              results: transformedResults,
              // For backward compatibility, provide legacy fields from first result
              ...(transformedResults.length > 0 && {
                transaction: transformedResults[0].transaction,
                success: transformedResults[0].success,
                hash: transformedResults[0].transaction?.hash,
              }),
            };
          }
          return outputObj;
        }
        return undefined;

      case avs_pb.Execution.Step.OutputDataCase.FILTER:
        const filterOutput =
          typeof step.getFilter === "function"
            ? step.getFilter()
            : (step as any).filter;
        if (filterOutput) {
          try {
            return typeof filterOutput.toObject === "function"
              ? filterOutput.toObject()
              : filterOutput;
          } catch {
            return undefined;
          }
        }
        return undefined;

      default:
        console.warn(
          `Unhandled output data type in Step.getOutput: ${step.getOutputDataCase()}`
        );
        return undefined;
    }
  }

  static fromResponse(step: avs_pb.Execution.Step): Step {
    // Extract input data if present - USE PROPER PROTOBUF GETTER
    let inputData: any = undefined;

    // Check for input using proper protobuf methods
    if (
      typeof (step as any).hasInput === "function" &&
      (step as any).hasInput()
    ) {
      const inputValue = (step as any).getInput();

      if (inputValue) {
        // If it's a protobuf Value instance, convert it
        try {
          inputData = convertProtobufValueToJs(inputValue);
        } catch (error) {
          console.warn("Failed to convert protobuf input value:", error);
          // Fallback: if conversion fails, use the raw value
          inputData = inputValue;
        }
      }
    } else if ((step as any).input) {
      // Fallback for plain objects (from .toObject() calls)
      const inputValue = (step as any).input;

      // If it's already a plain JavaScript object, use it directly
      if (typeof inputValue === "object" && !inputValue.getKindCase) {
        inputData = inputValue;
      } else {
        // If it's a protobuf Value instance, convert it
        try {
          inputData = convertProtobufValueToJs(inputValue);
        } catch (error) {
          // Fallback: if conversion fails, use the raw value
          inputData = inputValue;
        }
      }
    }

    // Handle method calls safely for both protobuf instances and plain objects
    const getId = () =>
      typeof step.getId === "function" ? step.getId() : (step as any).id;
    const getType = () =>
      typeof step.getType === "function" ? step.getType() : (step as any).type;
    const getName = () =>
      typeof step.getName === "function" ? step.getName() : (step as any).name;
    const getSuccess = () =>
      typeof step.getSuccess === "function"
        ? step.getSuccess()
        : (step as any).success;
    const getError = () =>
      typeof step.getError === "function"
        ? step.getError()
        : (step as any).error;
    const getLog = () =>
      typeof step.getLog === "function" ? step.getLog() : (step as any).log;
    const getInputsList = () =>
      typeof step.getInputsList === "function"
        ? step.getInputsList()
        : (step as any).inputsList || [];
    const getStartAt = () =>
      typeof step.getStartAt === "function"
        ? step.getStartAt()
        : (step as any).startAt;
    const getEndAt = () =>
      typeof step.getEndAt === "function"
        ? step.getEndAt()
        : (step as any).endAt;

    return new Step({
      id: getId(),
      type: convertProtobufStepTypeToSdk(getType()),
      name: getName(),
      success: getSuccess(),
      error: getError(),
      log: getLog(),
      inputsList: getInputsList(),
      input: inputData,
      output: Step.getOutput(step),
      startAt: getStartAt(),
      endAt: getEndAt(),
    });
  }

  // Client side does not generate the step, so there's no toRequest() method
}

export default Step;
