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
  public headers?: Record<string, string>;
  public pathParams?: Record<string, string>;

  constructor(props: ManualTriggerProps) {
    super({
      ...props,
      type: TriggerType.Manual,
      data: props.data,
      input: props.input,
    });
    this.headers = props.headers;
    this.pathParams = props.pathParams;
  }

  toRequest(): avs_pb.TaskTrigger {
    const trigger = new avs_pb.TaskTrigger();
    trigger.setId(this.id);
    trigger.setName(this.name);
    trigger.setType(avs_pb.TriggerType.TRIGGER_TYPE_MANUAL);

    // Create ManualTrigger with proper config structure
    const manualTrigger = new avs_pb.ManualTrigger();
    const config = new avs_pb.ManualTrigger.Config();

    // Set the data - required for ManualTrigger
    const dataToSend = this.data ?? this.input;
    if (dataToSend === null || dataToSend === undefined) {
      throw new Error("ManualTrigger data is required");
    }
    
    const inputValue = convertInputToProtobuf(dataToSend);
    if (!inputValue) {
      throw new Error("Failed to convert ManualTrigger data to protobuf format");
    }
    config.setData(inputValue);

    // Set headers if provided - direct object to protobuf map mapping
    if (this.headers && Object.keys(this.headers).length > 0) {
      const headersMap = config.getHeadersMap();
      Object.entries(this.headers).forEach(([key, value]) => {
        headersMap.set(key, value);
      });
    }

    // Set pathParams if provided - direct object to protobuf map mapping
    if (this.pathParams && Object.keys(this.pathParams).length > 0) {
      const pathParamsMap = config.getPathparamsMap();
      Object.entries(this.pathParams).forEach(([key, value]) => {
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
    let headers: Record<string, string> | undefined = undefined;
    let pathParams: Record<string, string> | undefined = undefined;

    const manualTrigger = raw.getManual();
    if (manualTrigger) {
      const config = manualTrigger.getConfig();
      if (config) {
        // Extract data
        if (config.hasData()) {
          data = extractInputFromProtobuf(config.getData());
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

    return new ManualTrigger({
      ...obj,
      type: TriggerType.Manual,
      data: data as Record<string, unknown>,
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
