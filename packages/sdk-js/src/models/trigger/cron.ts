import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerProps } from "./interface";
import { TriggerType } from "@avaprotocol/types";
// Required props for constructor: id, name, type and data: { scheduleList }
export type CronTriggerConfig = avs_pb.CronTrigger.Config.AsObject;
export type CronTriggerProps = TriggerProps & { data: CronTriggerConfig };

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
    config.setScheduleList((this.data as CronTriggerConfig).scheduleList);
    trigger.setConfig(config);
    request.setCron(trigger);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): CronTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    return new CronTrigger({
      ...obj,
      type: TriggerType.Cron,
      data: raw?.getCron()?.toObject().config as CronTriggerConfig,
    });
  }
}

export default CronTrigger;
