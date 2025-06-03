import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerOutput, TriggerProps } from "./interface";
import { TriggerType } from "@avaprotocol/types";
import { CronTriggerDataType, CronTriggerOutput } from "../node/types";

// Required props for constructor: id, name, type and data: { scheduleList }
export type CronTriggerProps = TriggerProps & { data: CronTriggerDataType };

class CronTrigger extends Trigger {
  constructor(props: CronTriggerProps) {
    super({ ...props, type: TriggerType.Cron, data: props.data });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);
    request.setId(this.id);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const trigger = new avs_pb.CronTrigger();
    const config = new avs_pb.CronTrigger.Config();
    config.setScheduleList((this.data as CronTriggerDataType).scheduleList || []);
    trigger.setConfig(config);
    
    request.setCron(trigger);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): CronTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: CronTriggerDataType = { scheduleList: [] };
    
    if (raw.getCron() && raw.getCron()!.hasConfig()) {
      const config = raw.getCron()!.getConfig();
      
      if (config) {
        data = {
          scheduleList: config.getScheduleList() || []
        };
      }
    }
    
    return new CronTrigger({
      ...obj,
      type: TriggerType.Cron,
      data: data,
    });
  }

  /**
   * Convert raw data from runTrigger response to CronOutput format
   * @param rawData - The raw data from the gRPC response
   * @returns {CronTriggerOutput | undefined} - The converted data
   */
  getOutput(): CronTriggerOutput | undefined {
    return this.output as CronTriggerOutput;
  }

  /**
   * Extract output data from RunTriggerResp for cron triggers
   * Updated to handle timestamp and timestamp_iso instead of epoch
   * @param outputData - The RunTriggerResp containing cron trigger output
   * @returns Plain JavaScript object with cron trigger data
   */
  static fromOutputData(outputData: avs_pb.RunTriggerResp): any {
    const cronOutput = outputData.getCronTrigger();
    if (!cronOutput) return null;
    
    const outputObj = cronOutput.toObject();
    // The output now contains timestamp and timestampIso instead of epoch
    return {
      timestamp: outputObj.timestamp,
      timestampIso: outputObj.timestampIso
    };
  }
}

export default CronTrigger;
