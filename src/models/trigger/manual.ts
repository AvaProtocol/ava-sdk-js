import * as avs_pb from "../../../grpc_codegen/avs_pb";
import Trigger, { TriggerProps, TriggerTypes } from "./interface";

// Required props for constructor: id, name, type, and data:null
export type ManualTriggerProps = TriggerProps;

class ManualTrigger extends Trigger {
  constructor(props: ManualTriggerProps) {
    super({ ...props, type: TriggerTypes.MANUAL, data: null });

    console.log("ManualTrigger.constructor.props:", {
      ...props,
      type: TriggerTypes.MANUAL,
      data: null,
    });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);
    request.setManual(true);

    console.log("ManualTrigger.toRequest.request:", request.toObject());

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): ManualTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    console.log("ManualTrigger.fromResponse.obj:", obj);
    return new ManualTrigger({
      ...obj,
      type: TriggerTypes.MANUAL,
      data: null,
    });
  }
}

export default ManualTrigger;
