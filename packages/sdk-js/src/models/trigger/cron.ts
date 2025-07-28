import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger from "./interface";
import { 
  TriggerType, 
  CronTriggerProps, 
  CronTriggerDataType,
  CronTriggerOutput,
  TriggerProps 
} from "@avaprotocol/types";

class CronTrigger extends Trigger {
  constructor(props: CronTriggerProps) {
    super({
      ...props,
      type: TriggerType.Cron,
    });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setId(this.id);
    request.setName(this.name);
    request.setType(avs_pb.TriggerType.TRIGGER_TYPE_CRON);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const cronData = this.data as CronTriggerDataType;

    // Validate schedules is present and not null/undefined
    if (!cronData.schedules || !Array.isArray(cronData.schedules)) {
      throw new Error("Schedules are required for cron trigger");
    }

    // Validate schedules array is not empty
    if (cronData.schedules.length === 0) {
      throw new Error("Schedules are required for cron trigger");
    }

    const config = new avs_pb.CronTrigger.Config();
    config.setSchedulesList(cronData.schedules);

    const cronTrigger = new avs_pb.CronTrigger();
    cronTrigger.setConfig(config);

    request.setCron(cronTrigger);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): CronTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: CronTriggerDataType = { schedules: [] };

    if (raw.getCron() && raw.getCron()!.hasConfig()) {
      const config = raw.getCron()!.getConfig()!;
      data = {
        schedules: config.getSchedulesList(),
      };
    }

    return new CronTrigger({
      ...obj,
      type: TriggerType.Cron,
      data: data,
    });
  }

  /**
   * Convert raw data from runNodeWithInputs response to CronOutput format
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

    // Extract data from the new data field
    const dataValue = cronOutput.getData();
    if (!dataValue) return null;

    // Convert the Value to JavaScript object
    const result = dataValue.toJavaScript();
    return result;
  }
}

export default CronTrigger;
