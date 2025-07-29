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

    // Extract data, headers, and pathParams from ManualTriggerDataType
    let actualData: unknown = this.data;
    let headers: Record<string, string> = {};
    let pathParams: Record<string, string> = {};

    if (typeof this.data === 'object' && this.data !== null && !Array.isArray(this.data)) {
      const dataObj = this.data as Record<string, unknown>;
      
      // If this.data has the ManualTriggerDataType structure
      if ('data' in dataObj) {
        actualData = dataObj.data;
        headers = (dataObj.headers as Record<string, string>) || {};
        pathParams = (dataObj.pathParams as Record<string, string>) || {};
      }
      // Otherwise, use this.data directly as the data content
    }

    const dataValue = convertInputToProtobuf(actualData as Record<string, any> | undefined);

    if (!dataValue) {
      throw new Error(
        "Failed to convert ManualTrigger data to protobuf format"
      );
    }

    config.setData(dataValue);

    // Set headers and pathParams in the config for execution step debugging
    if (Object.keys(headers).length > 0) {
      const headersMap = config.getHeadersMap();
      Object.entries(headers).forEach(([key, value]) => {
        headersMap.set(key, value);
      });
    }

    if (Object.keys(pathParams).length > 0) {
      const pathParamsMap = config.getPathparamsMap();
      Object.entries(pathParams).forEach(([key, value]) => {
        pathParamsMap.set(key, value);
      });
    }

    manualTrigger.setConfig(config);

    trigger.setManual(manualTrigger);

    return trigger;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): ManualTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;

    let actualData:
      | string
      | number
      | boolean
      | Record<string, unknown>
      | unknown[]
      | null = null;

    const manualTrigger = raw.getManual();
    if (manualTrigger) {
      const config = manualTrigger.getConfig();
      if (config) {
        // Extract data only - headers and pathParams are handled by base class
        if (config.hasData()) {
          actualData = extractInputFromProtobuf(config.getData()) as
            | string
            | number
            | boolean
            | Record<string, unknown>
            | unknown[]
            | null;
        }
      }
    }

    


    // Create ManualTriggerDataType structure with just the data
    // Headers and pathParams are available in baseInput for execution step display
    const manualTriggerData: ManualTriggerDataType = {
      data: actualData,
    };

    return new ManualTrigger({
      ...obj,
      type: TriggerType.Manual,
      data: manualTriggerData,
    });
  }

  /**
   * Extract output data from RunTriggerResp for manual triggers
   * @param outputData - The RunTriggerResp containing manual trigger output
   * @returns The parsed JSON data directly (similar to CustomCode output)
   */
  static fromOutputData(outputData: avs_pb.RunTriggerResp): unknown {
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
