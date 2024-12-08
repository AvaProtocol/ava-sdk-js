import * as avs_pb from "../../../grpc_codegen/avs_pb";
import Trigger, { TriggerProps, TriggerTypes } from "./interface";

// Required props for constructor: id, name,type and data: { epoch }
export type FixedTimeTriggerDataType = avs_pb.FixedEpochCondition.AsObject;
export type FixedTimeTriggerProps = TriggerProps & {
  data: FixedTimeTriggerDataType;
};

class FixedTimeTrigger extends Trigger {
  constructor(props: FixedTimeTriggerProps) {
    super({ ...props, type: TriggerTypes.FIXED_TIME, data: props.data });

    console.log("FixedTimeTrigger.constructor.props:", {
      ...props,
      type: TriggerTypes.FIXED_TIME,
      data: props.data,
    });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const condition = new avs_pb.FixedEpochCondition();
    condition.setEpochsList((this.data as FixedTimeTriggerDataType).epochsList);
    request.setFixedTime(condition);

    console.log("FixedTimeTrigger.toRequest.request:", request.toObject());

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): FixedTimeTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    console.log("FixedTimeTrigger.fromResponse.obj:", obj);
    return new FixedTimeTrigger({
      ...obj,
      type: TriggerTypes.FIXED_TIME,
      data: raw.getFixedTime()!.toObject() as FixedTimeTriggerDataType,
    });
  }
}

export default FixedTimeTrigger;
