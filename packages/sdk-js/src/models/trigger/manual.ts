import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger from "./interface";
import {
  convertInputToProtobuf,
  extractInputFromProtobuf,
  convertProtobufValueToJs,
} from "../../utils";
import {
  TriggerType,
  ManualTriggerProps,
  ManualTriggerDataType,
  TriggerProps,
} from "@avaprotocol/types";

class ManualTrigger extends Trigger {
  constructor(props: ManualTriggerProps) {
    super({
      ...props,
      type: TriggerType.Manual,
      data: props.data,
      input: props.input,
    });
  }

  toRequest(): avs_pb.TaskTrigger {
    const trigger = new avs_pb.TaskTrigger();
    trigger.setId(this.id);
    trigger.setName(this.name);
    trigger.setType(avs_pb.TriggerType.TRIGGER_TYPE_MANUAL);

    // Create ManualTrigger with proper config structure
    const manualTrigger = new avs_pb.ManualTrigger();
    const config = new avs_pb.ManualTrigger.Config();

    // Handle ManualTriggerDataType structure: { data: actualData, headers?: {}, pathParams?: {} }
    if (this.data === null || this.data === undefined) {
      throw new Error("ManualTrigger data is required");
    }

    let actualData: string | number | boolean | Record<string, unknown> | unknown[] | null;
    let headers: Record<string, string> | undefined;
    let pathParams: Record<string, string> | undefined;

    // Expect ManualTriggerDataType structure: { data, headers?, pathParams? }
    if (typeof this.data === 'object' && this.data !== null && !Array.isArray(this.data)) {
      const manualData = this.data as ManualTriggerDataType;
      if ('data' in manualData) {
        // This is the expected ManualTriggerDataType structure
        actualData = manualData.data;
        headers = manualData.headers;
        pathParams = manualData.pathParams;
      } else {
        throw new Error("ManualTrigger data must follow ManualTriggerDataType structure with 'data' field");
      }
    } else {
      throw new Error("ManualTrigger data must be an object with ManualTriggerDataType structure");
    }
    
    const dataValue = convertInputToProtobuf(actualData as any);
    if (!dataValue) {
      throw new Error("Failed to convert ManualTrigger data to protobuf format");
    }
    config.setData(dataValue);

    // Set headers if provided - from nested structure
    if (headers && Object.keys(headers).length > 0) {
      const headersMap = config.getHeadersMap();
      Object.entries(headers).forEach(([key, value]) => {
        headersMap.set(key, value);
      });
    }

    // Set pathParams if provided - from nested structure
    if (pathParams && Object.keys(pathParams).length > 0) {
      const pathParamsMap = config.getPathparamsMap();
      Object.entries(pathParams).forEach(([key, value]) => {
        pathParamsMap.set(key, value);
      });
    }

    manualTrigger.setConfig(config);
    
    // Convert input field to protobuf format and set on ManualTrigger
    const inputValue = convertInputToProtobuf(this.input);
    if (inputValue) {
      manualTrigger.setInput(inputValue);
    }
    
    trigger.setManual(manualTrigger);

    return trigger;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): ManualTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;

    let actualData: string | number | boolean | Record<string, unknown> | unknown[] | null = null;
    let input: Record<string, unknown> | undefined = undefined;
    let headers: Record<string, string> | undefined = undefined;
    let pathParams: Record<string, string> | undefined = undefined;

    const manualTrigger = raw.getManual();
    if (manualTrigger) {
      // Extract input data if present
      if (manualTrigger.hasInput()) {
        input = extractInputFromProtobuf(manualTrigger.getInput());
      }
      
      const config = manualTrigger.getConfig();
      if (config) {
        // Extract data
        if (config.hasData()) {
          actualData = extractInputFromProtobuf(config.getData()) as string | number | boolean | Record<string, unknown> | unknown[] | null;
        }

        // Extract headers - direct protobuf map to object mapping
        const headersMapProto = config.getHeadersMap();
        if (headersMapProto && headersMapProto.getLength() > 0) {
          headers = {};
          headersMapProto.forEach((value: string, key: string) => {
            headers![key] = value;
          });
        }

        // Extract pathParams - direct protobuf map to object mapping
        const pathParamsMapProto = config.getPathparamsMap();
        if (pathParamsMapProto && pathParamsMapProto.getLength() > 0) {
          pathParams = {};
          pathParamsMapProto.forEach((value: string, key: string) => {
            pathParams![key] = value;
          });
        }
      }
    }

    // Create ManualTriggerDataType structure
    const manualTriggerData: ManualTriggerDataType = {
      data: actualData,
      ...(headers && { headers }),
      ...(pathParams && { pathParams })
    };

    return new ManualTrigger({
      ...obj,
      type: TriggerType.Manual,
      data: manualTriggerData,
      input: input,
    });
  }

  /**
   * Extract output data from RunTriggerResp for manual triggers
   * @param outputData - The RunTriggerResp containing manual trigger output
   * @returns The parsed JSON data directly (similar to CustomCode output)
   */
  static fromOutputData(
    outputData: avs_pb.RunTriggerResp
  ): unknown {
    const manualOutput = outputData.getManualTrigger();
    if (!manualOutput) {
      return null;
    }

    // Extract only the data - headers and pathParams are config-only fields
    const dataValue = manualOutput.getData();
    if (dataValue) {
      try {
        // ManualTrigger data can be any valid JSON (objects, arrays, primitives)
        return convertProtobufValueToJs(dataValue);
      } catch (error) {
        console.warn(
          "Failed to convert manual trigger data from protobuf Value:",
          error
        );
        return null;
      }
    }

    return null;
  }
}

export default ManualTrigger;
