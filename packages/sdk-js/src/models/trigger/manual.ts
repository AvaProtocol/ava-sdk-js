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

    // Handle both new simplified format (direct data) and legacy format ({ data, headers?, pathParams? })
    if (typeof this.data === 'object' && this.data !== null && !Array.isArray(this.data)) {
      const manualData = this.data as ManualTriggerDataType;
      if ('data' in manualData) {
        // ManualTriggerDataType structure with nested data, headers, pathParams
        actualData = manualData.data;
        headers = manualData.headers;
        pathParams = manualData.pathParams;
      } else {
        // New simplified format - treat the entire object as data
        actualData = this.data as Record<string, unknown>;
        headers = undefined;
        pathParams = undefined;
      }
    } else {
      // Direct primitive data (string, number, boolean, array, null)
      actualData = this.data as string | number | boolean | unknown[] | null;
      headers = undefined;
      pathParams = undefined;
    }
    
    const dataValue = convertInputToProtobuf(actualData as any);
    if (!dataValue) {
      throw new Error("Failed to convert ManualTrigger data to protobuf format");
    }
    config.setData(dataValue);

    // Note: headers and pathParams were removed from protobuf structure
    // They are now handled at the configuration level only, not in execution output

    manualTrigger.setConfig(config);
    
    // Create comprehensive input field that includes all trigger configuration
    // This will be extracted by the backend and included in execution step input
    const comprehensiveInput: Record<string, unknown> = {
      data: actualData,
    };
    
    // Include headers and pathParams as part of trigger configuration
    if (headers && Object.keys(headers).length > 0) {
      comprehensiveInput.headers = headers;
    }
    if (pathParams && Object.keys(pathParams).length > 0) {
      comprehensiveInput.pathParams = pathParams;
    }
    
    // Merge any additional input data provided by user
    if (this.input) {
      Object.assign(comprehensiveInput, this.input);
    }
    
    const inputValue = convertInputToProtobuf(comprehensiveInput);
    if (inputValue) {
      manualTrigger.setInput(inputValue);
    }
    
    trigger.setManual(manualTrigger);

    return trigger;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): ManualTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;

    let actualData: string | number | boolean | Record<string, unknown> | unknown[] | null = null;

    const manualTrigger = raw.getManual();
    if (manualTrigger) {
      const config = manualTrigger.getConfig();
      if (config) {
        // Extract data only - headers and pathParams are handled by base class
        if (config.hasData()) {
          actualData = extractInputFromProtobuf(config.getData()) as string | number | boolean | Record<string, unknown> | unknown[] | null;
        }
      }
    }

    // Extract input data using base class method (general pattern for all triggers)
    const baseInput = super.fromResponse(raw).input;

    // Create ManualTriggerDataType structure with just the data
    // Headers and pathParams are available in baseInput for execution step display
    const manualTriggerData: ManualTriggerDataType = {
      data: actualData,
    };

    return new ManualTrigger({
      ...obj,
      type: TriggerType.Manual,
      data: manualTriggerData,
      input: baseInput, // Use the general input extraction pattern
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
