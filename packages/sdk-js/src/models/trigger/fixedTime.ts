import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerProps } from "./interface";
import { TriggerType } from "@avaprotocol/types";

// Required props for constructor: id, name,type and data: { epoch }
export type FixedTimeTriggerDataType = avs_pb.FixedTimeCondition.AsObject;
export type FixedTimeTriggerProps = TriggerProps & {
  data: FixedTimeTriggerDataType;
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

    const condition = new avs_pb.FixedTimeCondition();
    condition.setEpochsList((this.data as FixedTimeTriggerDataType).epochsList);
    request.setFixedTime(condition);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): FixedTimeTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    return new FixedTimeTrigger({
      ...obj,
      type: TriggerType.FixedTime,
      data: raw.getFixedTime()!.toObject() as FixedTimeTriggerDataType,
    });
  }
}

export default FixedTimeTrigger;
