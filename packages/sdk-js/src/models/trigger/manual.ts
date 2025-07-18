import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger from "./interface";
import {
  convertInputToProtobuf,
  extractInputFromProtobuf,
  convertProtobufValueToJs,
} from "../../utils";
import {
  TriggerType,
  ManualTriggerOutput,
  ManualTriggerProps,
  TriggerProps,
} from "@avaprotocol/types";

class ManualTrigger extends Trigger {
  public headers?: Array<Record<string, string>>;
  public pathParams?: Array<Record<string, string>>;

  constructor(props: ManualTriggerProps) {
    // Extract headers and pathParams from data if they exist there
    const data = props.data as any;
    const headers = props.headers || data?.headers;
    const pathParams = props.pathParams || data?.pathParams;
    
    // If data is an object with headers/pathParams, extract the actual data
    let actualData = props.data;
    if (data && typeof data === 'object' && (data.headers || data.pathParams)) {
      const { headers: _, pathParams: __, ...rest } = data;
      actualData = rest.data !== undefined ? rest.data : rest;
    }

    super({
      ...props,
      type: TriggerType.Manual,
      data: actualData,
      input: props.input,
    });
    this.headers = headers;
    this.pathParams = pathParams;
  }

  toRequest(): avs_pb.TaskTrigger {
    const trigger = new avs_pb.TaskTrigger();
    trigger.setId(this.id);
    trigger.setName(this.name);
    trigger.setType(avs_pb.TriggerType.TRIGGER_TYPE_MANUAL);

    // Create ManualTrigger with proper config structure
    const manualTrigger = new avs_pb.ManualTrigger();
    const config = new avs_pb.ManualTrigger.Config();

    // Set the data
    const dataToSend = this.data !== null ? this.data : this.input;
    if (dataToSend !== null && dataToSend !== undefined) {
      const inputValue = convertInputToProtobuf(dataToSend);
      if (inputValue) {
        config.setData(inputValue);
      }
    }

    // Set headers if provided
    if (this.headers && this.headers.length > 0) {
      const headersValue = convertInputToProtobuf(this.headers);
      if (headersValue) {
        config.setHeaders(headersValue);
      }
    }

    // Set pathParams if provided
    if (this.pathParams && this.pathParams.length > 0) {
      const pathParamsValue = convertInputToProtobuf(this.pathParams);
      if (pathParamsValue) {
        config.setPathparams(pathParamsValue); // Note: protobuf uses "pathparams"
      }
    }

    manualTrigger.setConfig(config);
    trigger.setManual(manualTrigger);

    return trigger;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): ManualTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: unknown = null;
    const input: Record<string, unknown> | undefined = undefined;
    let headers: Array<Record<string, string>> | undefined = undefined;
    let pathParams: Array<Record<string, string>> | undefined = undefined;

    const manualTrigger = raw.getManual();
    if (manualTrigger) {
      const config = manualTrigger.getConfig();
      if (config) {
        // Extract data
        if (config.hasData()) {
          data = extractInputFromProtobuf(config.getData());
        }

        // Extract headers
        if (config.hasHeaders()) {
          const headersData = extractInputFromProtobuf(config.getHeaders());
          headers = headersData as Array<Record<string, string>>;
        }

        // Extract pathParams
        if (config.hasPathparams()) { // Note: protobuf uses "pathparams"
          const pathParamsData = extractInputFromProtobuf(config.getPathparams());
          pathParams = pathParamsData as Array<Record<string, string>>;
        }
      }
    }

    return new ManualTrigger({
      ...obj,
      type: TriggerType.Manual,
      data: data as any,
      input: input,
      headers: headers,
      pathParams: pathParams,
    });
  }

  getInputVariables(): Record<string, unknown> | null {
    // Return input variables that can be referenced by other nodes
    return this.input as Record<string, unknown> | null;
  }

  /**
   * Convert raw data from runTrigger response to ManualOutput format
   * @param rawData - The raw data from the gRPC response
   * @returns {ManualTriggerOutput | undefined} - The converted data
   */
  getOutput(): ManualTriggerOutput | undefined {
    return this.output as ManualTriggerOutput;
  }

  /**
   * Extract output data from RunTriggerResp for manual triggers
   * @param outputData - The RunTriggerResp containing manual trigger output
   * @returns Plain JavaScript object with manual trigger data in standard structure
   */
  static fromOutputData(
    outputData: avs_pb.RunTriggerResp
  ): Record<string, unknown> | null {
    const manualOutput = outputData.getManualTrigger();
    if (!manualOutput) {
      return null;
    }

    const result: Record<string, unknown> = {};

    // Extract data
    const dataValue = manualOutput.getData();
    if (dataValue) {
      try {
        result.data = convertProtobufValueToJs(dataValue);
      } catch (error) {
        console.warn(
          "Failed to convert manual trigger data from protobuf Value:",
          error
        );
        result.data = dataValue as unknown as Record<string, unknown>;
      }
    } else {
      result.data = null;
    }

    // Extract headers
    const headersValue = manualOutput.getHeaders();
    if (headersValue) {
      try {
        result.headers = convertProtobufValueToJs(headersValue);
      } catch (error) {
        console.warn(
          "Failed to convert manual trigger headers from protobuf Value:",
          error
        );
        result.headers = headersValue as unknown as Array<Record<string, string>>;
      }
    }

    // Extract pathParams
    const pathParamsValue = manualOutput.getPathparams(); // Note: protobuf uses "pathparams"
    if (pathParamsValue) {
      try {
        result.pathParams = convertProtobufValueToJs(pathParamsValue); // Note: SDK uses "pathParams"
      } catch (error) {
        console.warn(
          "Failed to convert manual trigger pathParams from protobuf Value:",
          error
        );
        result.pathParams = pathParamsValue as unknown as Array<Record<string, string>>;
      }
    }

    return result;
  }
}

export default ManualTrigger;
