import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerProps } from "./interface";
import { TriggerType } from "../../types";
// Required props for constructor: id, name, type and data: { scheduleList }
export type CronTriggerDataType = avs_pb.CronCondition.AsObject;
export type CronTriggerProps = TriggerProps & { data: CronTriggerDataType };

class CronTrigger extends Trigger {
  constructor(props: CronTriggerProps) {
    super({ ...props, type: TriggerType.Cron, data: props.data });

    console.log("CronTrigger.constructor.props:", {
      ...props,
      type: TriggerType.Cron,
      data: props.data,
    });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);
    request.setId(this.id);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const condition = new avs_pb.CronCondition();
    condition.setScheduleList((this.data as CronTriggerDataType).scheduleList);
    request.setCron(condition);

    console.log("CronTrigger.toRequest.request:", request.toObject());

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): CronTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    console.log("CronTrigger.fromResponse.obj:", obj);
    return new CronTrigger({
      ...obj,
      type: TriggerType.Cron,
      data: raw.getCron()!.toObject() as CronTriggerDataType,
    });
  }
}

export default CronTrigger;
