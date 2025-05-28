import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerProps } from "./interface";
import { TriggerType } from "@avaprotocol/types";

export type ManualTriggerProps = TriggerProps & { 
  data?: Record<string, any> | null 
};

class ManualTrigger extends Trigger {
  constructor(props: ManualTriggerProps) {
    super({ ...props, type: TriggerType.Manual, data: props.data || null });
  }

  toRequest(): avs_pb.TaskTrigger {
    const trigger = new avs_pb.TaskTrigger();
    trigger.setId(this.id);
    trigger.setName(this.name);
    
    trigger.setManual(true);
    
    return trigger;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): ManualTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;
    
    return new ManualTrigger({
      ...obj,
      type: TriggerType.Manual,
      data: null, // Manual triggers don't have data in the protobuf response
    });
  }
  
  getInputVariables(): Record<string, any> | null {
    return this.data as Record<string, any> | null;
  }
}

export default ManualTrigger;    