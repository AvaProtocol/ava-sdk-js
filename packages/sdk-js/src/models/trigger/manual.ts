import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger from "./interface";
import { convertInputToProtobuf, extractInputFromProtobuf } from "../../utils";
import { TriggerType, ManualTriggerOutput, ManualTriggerProps, TriggerProps } from "@avaprotocol/types";



class ManualTrigger extends Trigger {
  constructor(props: ManualTriggerProps) {
    super({ ...props, type: TriggerType.Manual, data: props.data || null });
  }

  toRequest(): avs_pb.TaskTrigger {
    const trigger = new avs_pb.TaskTrigger();
    trigger.setId(this.id);
    trigger.setName(this.name);
    trigger.setType(avs_pb.TriggerType.TRIGGER_TYPE_MANUAL);
    
    trigger.setManual(true);
    
    // Convert input field to protobuf format and set on top-level TaskTrigger
    // Manual triggers use the top-level input field since they don't have nested structure
    const inputValue = convertInputToProtobuf(this.input);
    if (inputValue) {
      trigger.setInput(inputValue);
    }
    
    return trigger;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): ManualTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;
    
    // Extract input from top-level TaskTrigger input field for manual triggers
    let input: Record<string, any> | undefined = undefined;
    if (raw.hasInput()) {
      input = extractInputFromProtobuf(raw.getInput());
    }
    
    return new ManualTrigger({
      ...obj,
      type: TriggerType.Manual,
      data: null, // Manual triggers don't have data in the protobuf response
      input: input,
    });
  }
  
  getInputVariables(): Record<string, any> | null {
    return this.data as Record<string, any> | null;
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
   * @returns Plain JavaScript object with manual trigger data
   */
  static fromOutputData(outputData: avs_pb.RunTriggerResp): any {
    const manualOutput = outputData.getManualTrigger();
    return manualOutput?.toObject() || null;
  }
}

export default ManualTrigger;                