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
        const blockTrigger =
          typeof step.getBlockTrigger === "function"
            ? step.getBlockTrigger()?.toObject()
            : (step as any).blockTrigger;
        return { data: blockTrigger }; // ✅ Use standard structure
      case avs_pb.Execution.Step.OutputDataCase.FIXED_TIME_TRIGGER:
        const fixedTimeTrigger =
          typeof step.getFixedTimeTrigger === "function"
            ? step.getFixedTimeTrigger()?.toObject()
            : (step as any).fixedTimeTrigger;
        return { data: fixedTimeTrigger }; // ✅ Use standard structure
      case avs_pb.Execution.Step.OutputDataCase.CRON_TRIGGER:
        const cronTrigger =
          typeof step.getCronTrigger === "function"
            ? step.getCronTrigger()?.toObject()
            : (step as any).cronTrigger;
        return { data: cronTrigger }; // ✅ Use standard structure
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
              const eventData = convertProtobufValueToJs(
                eventTrigger.getData()
              );
              return { data: eventData }; // ✅ Use standard structure
            } catch (error) {
              console.warn(
                "Failed to convert event trigger data from protobuf Value:",
                error
              );
              return { data: eventTrigger.getData() }; // ✅ Use standard structure
            }
          } else if (eventTrigger.data) {
            // For plain objects, try to convert or use directly
            const eventData =
              typeof eventTrigger.data.getKindCase === "function"
                ? convertProtobufValueToJs(eventTrigger.data)
                : eventTrigger.data;
            return { data: eventData }; // ✅ Use standard structure
          }

          // Fallback to old structure for backward compatibility
          if (
            typeof eventTrigger.hasEvmLog === "function" &&
            eventTrigger.hasEvmLog()
          ) {
            return { data: eventTrigger.getEvmLog()?.toObject() }; // ✅ Use standard structure
          } else if (
            typeof eventTrigger.hasTransferLog === "function" &&
            eventTrigger.hasTransferLog()
          ) {
            return { data: eventTrigger.getTransferLog()?.toObject() }; // ✅ Use standard structure
          } else if (eventTrigger.evmLog) {
            return { data: eventTrigger.evmLog }; // ✅ Use standard structure
          } else if (eventTrigger.transferLog) {
            return { data: eventTrigger.transferLog }; // ✅ Use standard structure
          }
        }
        return { data: null }; // ✅ Use standard structure
      case avs_pb.Execution.Step.OutputDataCase.MANUAL_TRIGGER: {
        const manualTrigger =
          typeof step.getManualTrigger === "function"
            ? step.getManualTrigger()
            : (step as any).manualTrigger;
        if (manualTrigger) {
          // Check for the new data field structure
          if (
            typeof manualTrigger.hasData === "function" &&
            manualTrigger.hasData()
          ) {
            try {
              const userData = convertProtobufValueToJs(
                manualTrigger.getData()
              );
              return { data: userData }; // ✅ Use standard structure
            } catch (error) {
              console.warn(
                "Failed to convert manual trigger data from protobuf Value:",
                error
              );
              return { data: manualTrigger.getData() }; // ✅ Use standard structure
            }
          } else if (manualTrigger.data) {
            // For plain objects, try to convert or use directly
            const userData =
              typeof manualTrigger.data.getKindCase === "function"
                ? convertProtobufValueToJs(manualTrigger.data)
                : manualTrigger.data;
            return { data: userData }; // ✅ Use standard structure
          }

          // Check if this is the new format with no data field or null data
          const objData = manualTrigger.toObject?.() || manualTrigger;
          if (objData && objData.data === undefined) {
            // No data was provided, return null
            return { data: null }; // ✅ Use standard structure
          }

          // Fallback to old structure for backward compatibility
          return { data: objData }; // ✅ Use standard structure
        }
        return { data: null }; // ✅ Use standard structure
      }

      // Node outputs - RESTORE MISSING CASES
      case avs_pb.Execution.Step.OutputDataCase.ETH_TRANSFER:
        return typeof step.getEthTransfer === "function"
          ? step.getEthTransfer()?.toObject()
          : (step as any).ethTransfer;

      case avs_pb.Execution.Step.OutputDataCase.CUSTOM_CODE: {
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
      }

      case avs_pb.Execution.Step.OutputDataCase.REST_API: {
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
      }

      case avs_pb.Execution.Step.OutputDataCase.BRANCH:
        return typeof step.getBranch === "function"
          ? step.getBranch()?.toObject()
          : (step as any).branch;

      case avs_pb.Execution.Step.OutputDataCase.LOOP: {
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
      }

      case avs_pb.Execution.Step.OutputDataCase.GRAPHQL: {
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
      }

      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_READ: {
        const contractReadOutput =
          typeof step.getContractRead === "function"
            ? step.getContractRead()
            : (step as any).contractRead;
        if (contractReadOutput) {
          // Check if the output has a data field that's a protobuf Value
          if (
            typeof contractReadOutput.hasData === "function" &&
            contractReadOutput.hasData()
          ) {
            try {
              // Convert protobuf Value to JavaScript object
              const data = convertProtobufValueToJs(
                contractReadOutput.getData()
              );

              // Always return the array directly for contract read outputs
              if (Array.isArray(data)) {
                return data;
              } else {
                // If it's a single object, wrap it in an array for consistency
                return [data];
              }
            } catch (error) {
              console.warn(
                "Failed to convert contract read data from protobuf Value:",
                error
              );
              // Fallback to raw data
              return contractReadOutput.getData();
            }
          } else if (contractReadOutput.data) {
            // For plain objects, try to convert or use directly
            const data =
              typeof contractReadOutput.data.getKindCase === "function"
                ? convertProtobufValueToJs(contractReadOutput.data)
                : contractReadOutput.data;

            // Always return the array directly for contract read outputs
            if (Array.isArray(data)) {
              return data;
            } else {
              // If it's a single object, wrap it in an array for consistency
              return [data];
            }
          }

          // Fallback to old structure for backward compatibility
          const outputObj =
            typeof contractReadOutput.toObject === "function"
              ? contractReadOutput.toObject()
              : contractReadOutput;

          // Convert resultsList to results for consistency with ContractReadNode.fromOutputData
          if (outputObj && outputObj.resultsList) {
            // Return the results array directly
            return outputObj.resultsList.map((result: any) => ({
              methodName: result.methodName,
              success: result.success,
              error: result.error,
              data: result.dataList || [],
            }));
          }
          return outputObj;
        }
        return undefined;
      }

      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_WRITE: {
        const contractWriteOutput =
          typeof step.getContractWrite === "function"
            ? step.getContractWrite()
            : (step as any).contractWrite;
        if (contractWriteOutput) {
          // Check if the output has a data field that's a protobuf Value
          if (
            typeof contractWriteOutput.hasData === "function" &&
            contractWriteOutput.hasData()
          ) {
            try {
              // Convert protobuf Value to JavaScript object
              const data = convertProtobufValueToJs(
                contractWriteOutput.getData()
              );

              // Always return the array directly for contract write outputs
              if (Array.isArray(data)) {
                return data;
              } else {
                // If it's a single object, wrap it in an array for consistency
                return [data];
              }
            } catch (error) {
              console.warn(
                "Failed to convert contract write data from protobuf Value:",
                error
              );
              // Fallback to raw data
              return contractWriteOutput.getData();
            }
          } else if (contractWriteOutput.data) {
            // For plain objects, try to convert or use directly
            const data =
              typeof contractWriteOutput.data.getKindCase === "function"
                ? convertProtobufValueToJs(contractWriteOutput.data)
                : contractWriteOutput.data;

            // Always return the array directly for contract write outputs
            if (Array.isArray(data)) {
              return data;
            } else {
              // If it's a single object, wrap it in an array for consistency
              return [data];
            }
          }

          // Fallback to old structure for backward compatibility
          const outputObj =
            typeof contractWriteOutput.toObject === "function"
              ? contractWriteOutput.toObject()
              : contractWriteOutput;

          // Convert resultsList to results for consistency with ContractWriteNode.fromOutputData
          if (outputObj && outputObj.resultsList) {
            // Return the results array directly
            return outputObj.resultsList.map((result: any) => ({
              methodName: result.methodName,
              success: result.success,
              error: result.error,
              transaction: result.transaction,
              events: result.eventsList || [],
              returnData: result.returnData,
              inputData: result.inputData,
            }));
          }
          return outputObj;
        }
        return undefined;
      }

      case avs_pb.Execution.Step.OutputDataCase.FILTER: {
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
      }

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
