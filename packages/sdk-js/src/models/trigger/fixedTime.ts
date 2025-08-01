import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger from "./interface";
import { 
  TriggerType, 
  FixedTimeTriggerProps, 
  FixedTimeTriggerDataType,
  FixedTimeTriggerOutput,
  TriggerProps 
} from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { epochsList }

class FixedTimeTrigger extends Trigger {
  constructor(props: FixedTimeTriggerProps) {
    super({
      ...props,
      type: TriggerType.FixedTime,
    });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setId(this.id);
    request.setName(this.name);
    request.setType(avs_pb.TriggerType.TRIGGER_TYPE_FIXED_TIME);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const trigger = new avs_pb.FixedTimeTrigger();
    const config = new avs_pb.FixedTimeTrigger.Config();
    config.setEpochsList(
      (this.data as FixedTimeTriggerDataType).epochsList || []
    );
    trigger.setConfig(config);

    request.setFixedTime(trigger);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): FixedTimeTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: FixedTimeTriggerDataType = { epochsList: [] };

    if (raw.getFixedTime() && raw.getFixedTime()!.hasConfig()) {
      const config = raw.getFixedTime()!.getConfig()!;
      data = {
        epochsList: config.getEpochsList(),
      };
    }

    return new FixedTimeTrigger({
      ...obj,
      type: TriggerType.FixedTime,
      data: data,
    });
  }

  /**
   * Convert raw data from runNodeWithInputs response to FixedTimeOutput format
   * @param rawData - The raw data from the gRPC response
   * @returns {FixedTimeTriggerOutput | undefined} - The converted data
   */
  getOutput(): FixedTimeTriggerOutput | undefined {
    return this.output as FixedTimeTriggerOutput;
  }

  /**
   * Extract output data from RunTriggerResp for fixed time triggers
   * Updated to handle timestamp and timestamp_iso instead of epoch
   * @param outputData - The RunTriggerResp containing fixed time trigger output
   * @returns Plain JavaScript object with fixed time trigger data
   */
  static fromOutputData(outputData: avs_pb.RunTriggerResp): any {
    const fixedTimeOutput = outputData.getFixedTimeTrigger();
    if (!fixedTimeOutput) return null;

    // Extract data from the new data field
    const dataValue = fixedTimeOutput.getData();
    if (!dataValue) return null;

    // Convert the Value to JavaScript object
    const result = dataValue.toJavaScript();
    return result;
  }
}

export default FixedTimeTrigger;
