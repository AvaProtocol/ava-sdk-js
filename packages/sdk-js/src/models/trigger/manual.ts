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

    // TODO: Use proper ManualTrigger structure once protobuf bindings are regenerated
    // For now, use boolean approach until TaskTrigger.setManual() accepts ManualTrigger object
    trigger.setManual(true);

    // Set the data in the top-level input field (temporary approach)
    const dataToSend = this.data !== null ? this.data : this.input;
    if (dataToSend !== null && dataToSend !== undefined) {
      const inputValue = convertInputToProtobuf(dataToSend);
      if (inputValue) {
        trigger.setInput(inputValue);
      }
    }

    return trigger;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): ManualTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;

    // TODO: Extract data from ManualTrigger structure once protobuf bindings are regenerated
    // For now, extract data from top-level input field (temporary approach)
    let data: unknown = null;
    let input: Record<string, unknown> | undefined = undefined;

    if (raw.hasInput()) {
      const inputData = extractInputFromProtobuf(raw.getInput());
      // For manual triggers, treat the input as the data
      data = inputData;
    }

    return new ManualTrigger({
      ...obj,
      type: TriggerType.Manual,
      data: data as any,
      input: input,
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

    const dataValue = manualOutput.getData();
    if (dataValue) {
      try {
        // Convert protobuf Value to JavaScript object and wrap in standard structure
        const userData = convertProtobufValueToJs(dataValue);
        return { data: userData };
      } catch (error) {
        console.warn(
          "Failed to convert manual trigger data from protobuf Value:",
          error
        );

        // Return the raw protobuf Value object as fallback, wrapped in standard structure
        return { data: dataValue as unknown as Record<string, unknown> };
      }
    }

    return { data: null };
  }
}

export default ManualTrigger;
