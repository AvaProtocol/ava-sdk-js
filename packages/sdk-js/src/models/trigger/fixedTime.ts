import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerProps } from "./interface";
import { TriggerType } from "@avaprotocol/types";

// Required props for constructor: id, name,type and data: { epoch }
export type FixedTimeTriggerConfig = avs_pb.FixedTimeTrigger.Config.AsObject;
export type FixedTimeTriggerProps = TriggerProps & {
  data: FixedTimeTriggerConfig;
};

class FixedTimeTrigger extends Trigger {
  constructor(props: FixedTimeTriggerProps) {
    super({ ...props, type: TriggerType.FixedTime, data: props.data });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);
    request.setId(this.id);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const trigger = new avs_pb.FixedTimeTrigger();
    const config = new avs_pb.FixedTimeTrigger.Config();
    config.setEpochsList((this.data as FixedTimeTriggerConfig).epochsList);
    trigger.setConfig(config);
    request.setFixedTime(trigger);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): FixedTimeTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    return new FixedTimeTrigger({
      ...obj,
      type: TriggerType.FixedTime,
      data: raw?.getFixedTime()?.toObject().config as FixedTimeTriggerConfig,
    });
  }
}

export default FixedTimeTrigger;
