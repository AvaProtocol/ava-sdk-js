import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger from "./interface";
import {
  TriggerType,
  FixedTimeTriggerDataType,
  FixedTimeTriggerOutput,
  FixedTimeTriggerProps,
  TriggerProps,
  TriggerOutput,
} from "@avaprotocol/types";
import { convertInputToProtobuf, extractInputFromProtobuf } from "../../utils";

// Required props for constructor: id, name, type and data: { epochsList }

class FixedTimeTrigger extends Trigger {
  constructor(props: FixedTimeTriggerProps) {
    super({ ...props, type: TriggerType.FixedTime, data: props.data });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);
    request.setId(this.id);
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
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: FixedTimeTriggerDataType = { epochsList: [] };

    if (raw.getFixedTime() && raw.getFixedTime()!.hasConfig()) {
      const config = raw.getFixedTime()!.getConfig();

      if (config) {
        data = {
          epochsList: config.getEpochsList() || [],
        };
      }
    }

    return new FixedTimeTrigger({
      ...obj,
      type: TriggerType.FixedTime,
      data: data,
    });
  }

  /**
   * Convert raw data from runTrigger response to FixedTimeOutput format
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

    const outputObj = fixedTimeOutput.toObject();
    // The output now contains timestamp and timestampIso instead of epoch
    return {
      timestamp: outputObj.timestamp,
      timestampIso: outputObj.timestampIso,
    };
  }
}

export default FixedTimeTrigger;
