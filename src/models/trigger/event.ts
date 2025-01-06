import * as avs_pb from "../../../grpc_codegen/avs_pb";
import Trigger, { TriggerProps } from "./interface";
import { TriggerType } from "../../types";
// Required props for constructor: id, name, type and data: { expression }
export type EventTriggerDataType = avs_pb.EventCondition.AsObject;
export type EventTriggerProps = TriggerProps & { data: EventTriggerDataType };

class EventTrigger extends Trigger {
  constructor(props: EventTriggerProps) {
    super({ ...props, type: TriggerType.Event, data: props.data });

    console.log("EventTrigger.constructor.props:", {
      ...props,
      type: TriggerType.Event,
      data: props.data,
    });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const condition = new avs_pb.EventCondition();
    condition.setExpression((this.data as EventTriggerDataType).expression);
    request.setEvent(condition);

    console.log("EventTrigger.toRequest.request:", request.toObject());

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): EventTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    console.log("EventTrigger.fromResponse.obj:", obj);
    return new EventTrigger({
      ...obj,
      type: TriggerType.Event,
      data: raw.getEvent()!.toObject() as EventTriggerDataType,
    });
  }
}

export default EventTrigger;
