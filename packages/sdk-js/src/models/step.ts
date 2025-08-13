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
  config?: any;
  output: OutputDataProps;
  startAt: number;
  endAt: number;
  metadata?: any;

  constructor(props: StepProps) {
    this.id = props.id;
    this.type = props.type;
    this.name = props.name;
    this.success = props.success;
    this.error = props.error;
    this.log = props.log;
    this.inputsList = props.inputsList;
    this.config = props.config;
    this.output = props.output;
    this.startAt = props.startAt;
    this.endAt = props.endAt;
    this.metadata = (props as any).metadata;
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
      config: this.config,
      output: this.output,
      startAt: this.startAt,
      endAt: this.endAt,
      metadata: this.metadata,
    };
  }

  static getOutput(step: avs_pb.Execution.Step): OutputDataProps {
    // Always return Output.data; step-level metadata is separate.
    const outputObj = this.extractOutputData(step);
    if (!outputObj) return null;

    // Protobuf accessor path
    if (typeof (outputObj as any).getData === "function") {
      const val = (outputObj as any).getData();
      if (!val) return null;
      try {
        return convertProtobufValueToJs(val);
      } catch (error) {
        console.warn("Failed to convert protobuf Value to JavaScript:", error);
        return val as any;
      }
    }

    // Plain object fallback
    const data = (outputObj as any).data;
    if (data) {
      try {
        return typeof (data as any).getKindCase === "function"
          ? convertProtobufValueToJs(data)
          : data;
      } catch (error) {
        console.warn(
          "Failed to convert plain object Value to JavaScript:",
          error
        );
        return data;
      }
    }

    return null;
  }

  private static extractOutputData(step: avs_pb.Execution.Step): any {
    // Simple switch to get the output object - all handled identically
    const outputCase = this.getOutputDataCase(step);
    switch (outputCase) {
      case avs_pb.Execution.Step.OutputDataCase.BLOCK_TRIGGER:
        return typeof step.getBlockTrigger === "function"
          ? step.getBlockTrigger()
          : (step as any).blockTrigger;
      case avs_pb.Execution.Step.OutputDataCase.FIXED_TIME_TRIGGER:
        return typeof step.getFixedTimeTrigger === "function"
          ? step.getFixedTimeTrigger()
          : (step as any).fixedTimeTrigger;
      case avs_pb.Execution.Step.OutputDataCase.CRON_TRIGGER:
        return typeof step.getCronTrigger === "function"
          ? step.getCronTrigger()
          : (step as any).cronTrigger;
      case avs_pb.Execution.Step.OutputDataCase.EVENT_TRIGGER:
        return typeof step.getEventTrigger === "function"
          ? step.getEventTrigger()
          : (step as any).eventTrigger;
      case avs_pb.Execution.Step.OutputDataCase.MANUAL_TRIGGER:
        return typeof step.getManualTrigger === "function"
          ? step.getManualTrigger()
          : (step as any).manualTrigger;
      case avs_pb.Execution.Step.OutputDataCase.ETH_TRANSFER:
        return typeof step.getEthTransfer === "function"
          ? step.getEthTransfer()
          : (step as any).ethTransfer;
      case avs_pb.Execution.Step.OutputDataCase.GRAPHQL:
        return typeof step.getGraphql === "function"
          ? step.getGraphql()
          : (step as any).graphql;
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_READ:
        return typeof step.getContractRead === "function"
          ? step.getContractRead()
          : (step as any).contractRead;
      case avs_pb.Execution.Step.OutputDataCase.CONTRACT_WRITE:
        return typeof step.getContractWrite === "function"
          ? step.getContractWrite()
          : (step as any).contractWrite;
      case avs_pb.Execution.Step.OutputDataCase.CUSTOM_CODE:
        return typeof step.getCustomCode === "function"
          ? step.getCustomCode()
          : (step as any).customCode;
      case avs_pb.Execution.Step.OutputDataCase.REST_API:
        return typeof step.getRestApi === "function"
          ? step.getRestApi()
          : (step as any).restApi;
      case avs_pb.Execution.Step.OutputDataCase.BRANCH:
        return typeof step.getBranch === "function"
          ? step.getBranch()
          : (step as any).branch;
      case avs_pb.Execution.Step.OutputDataCase.FILTER:
        return typeof step.getFilter === "function"
          ? step.getFilter()
          : (step as any).filter;
      case avs_pb.Execution.Step.OutputDataCase.LOOP:
        return typeof step.getLoop === "function"
          ? step.getLoop()
          : (step as any).loop;
      default:
        return null;
    }
  }

  private static getOutputDataCase(
    step: avs_pb.Execution.Step
  ): avs_pb.Execution.Step.OutputDataCase {
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
  }

  static fromResponse(step: avs_pb.Execution.Step): Step {
    // Extract input data if present - USE PROPER PROTOBUF GETTER
    let configData: any = undefined;

    // Check for input using proper protobuf methods
    if (
      typeof (step as any).hasConfig === "function" &&
      (step as any).hasConfig()
    ) {
      const configValue = (step as any).getConfig();

      if (configValue) {
        // If it's a protobuf Value instance, convert it
        try {
          configData = convertProtobufValueToJs(configValue);
        } catch (error) {
          console.warn("Failed to convert protobuf input value:", error);
          // Fallback: if conversion fails, use the raw value
          configData = configValue;
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

    // Extract step-level metadata if present (per protobuf: Execution.Step.metadata)
    let stepMetadata: any = undefined;
    if (
      typeof (step as any).getMetadata === "function" &&
      (step as any).getMetadata()
    ) {
      try {
        stepMetadata = convertProtobufValueToJs((step as any).getMetadata());
      } catch (e) {
        stepMetadata = (step as any).getMetadata();
      }
    } else if ((step as any).metadata) {
      stepMetadata = (step as any).metadata;
    }

    return new Step({
      id: getId(),
      type: convertProtobufStepTypeToSdk(getType()),
      name: getName(),
      success: getSuccess(),
      error: getError(),
      log: getLog(),
      inputsList: getInputsList(),
      config: configData,
      output: Step.getOutput(step),
      startAt: getStartAt(),
      endAt: getEndAt(),
      metadata: stepMetadata,
    } as any);
  }

  // Client side does not generate the step, so there's no toRequest() method
}

export default Step;
