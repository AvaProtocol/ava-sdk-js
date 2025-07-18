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
  TriggerProps,
} from "@avaprotocol/types";

class ManualTrigger extends Trigger {
  public headersMap?: Array<[string, string]>;
  public pathParamsMap?: Array<[string, string]>;

  constructor(props: ManualTriggerProps) {
    // Extract headersMap and pathParamsMap from data if they exist there
    const data = props.data as any;
    const headersMap = props.headersMap || data?.headersMap;
    const pathParamsMap = props.pathParamsMap || data?.pathParamsMap;
    
    // If data is an object with headersMap/pathParamsMap, extract the actual data
    let actualData = props.data;
    if (data && typeof data === 'object' && (data.headersMap || data.pathParamsMap)) {
      const { headersMap: _, pathParamsMap: __, ...rest } = data;
      actualData = rest.data !== undefined ? rest.data : rest;
    }

    super({
      ...props,
      type: TriggerType.Manual,
      data: actualData,
      input: props.input,
    });
    this.headersMap = headersMap;
    this.pathParamsMap = pathParamsMap;
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

    // Set headers if provided - use map format consistent with REST API nodes
    if (this.headersMap && this.headersMap.length > 0) {
      const headersMap = config.getHeadersMap();
      this.headersMap.forEach(([key, value]: [string, string]) => {
        headersMap.set(key, value);
      });
    }

    // Set pathParams if provided - use map format consistent with REST API nodes
    if (this.pathParamsMap && this.pathParamsMap.length > 0) {
      const pathParamsMap = config.getPathparamsMap();
      this.pathParamsMap.forEach(([key, value]: [string, string]) => {
        pathParamsMap.set(key, value);
      });
    }

    manualTrigger.setConfig(config);
    trigger.setManual(manualTrigger);

    return trigger;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): ManualTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: unknown = null;
    const input: Record<string, unknown> | undefined = undefined;
    let headersMap: Array<[string, string]> | undefined = undefined;
    let pathParamsMap: Array<[string, string]> | undefined = undefined;

    const manualTrigger = raw.getManual();
    if (manualTrigger) {
      const config = manualTrigger.getConfig();
      if (config) {
        // Extract data
        if (config.hasData()) {
          data = extractInputFromProtobuf(config.getData());
        }

        // Extract headers - convert map to array format
        const headersMapProto = config.getHeadersMap();
        if (headersMapProto && headersMapProto.getLength() > 0) {
          headersMap = [];
          headersMapProto.forEach((value: string, key: string) => {
            headersMap!.push([key, value]);
          });
        }

        // Extract pathParams - convert map to array format
        const pathParamsMapProto = config.getPathparamsMap();
        if (pathParamsMapProto && pathParamsMapProto.getLength() > 0) {
          pathParamsMap = [];
          pathParamsMapProto.forEach((value: string, key: string) => {
            pathParamsMap!.push([key, value]);
          });
        }
      }
    }

    return new ManualTrigger({
      ...obj,
      type: TriggerType.Manual,
      data: data as any,
      input: input,
      headersMap: headersMap,
      pathParamsMap: pathParamsMap,
    });
  }

  getInputVariables(): Record<string, unknown> | null {
    // Return input variables that can be referenced by other nodes
    return this.input as Record<string, unknown> | null;
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

    // Extract headers - convert map to object format for test compatibility
    const headersMapProto = manualOutput.getHeadersMap();
    if (headersMapProto && headersMapProto.getLength() > 0) {
      const headers: Record<string, string> = {};
      headersMapProto.forEach((value: string, key: string) => {
        headers[key] = value;
      });
      result.headers = headers;
    }

    // Extract pathParams - convert map to object format for test compatibility
    const pathParamsMapProto = manualOutput.getPathparamsMap();
    if (pathParamsMapProto && pathParamsMapProto.getLength() > 0) {
      const pathParams: Record<string, string> = {};
      pathParamsMapProto.forEach((value: string, key: string) => {
        pathParams[key] = value;
      });
      result.pathParams = pathParams;
    }

    return result;
  }
}

export default ManualTrigger;
