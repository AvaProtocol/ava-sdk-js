import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerType } from "../../types";

export type TriggerData =
  | avs_pb.FixedTimeCondition.AsObject
  | avs_pb.CronCondition.AsObject
  | avs_pb.BlockCondition.AsObject
  | avs_pb.EventCondition.AsObject

export type TriggerProps = Omit<
  avs_pb.TaskTrigger.AsObject,
  "manual" | "fixedTime" | "cron" | "block" | "event"
> & {
  type: TriggerType;
  data: TriggerData;
};

class Trigger implements TriggerProps {
  id: string;
  name: string;
  type: TriggerType;
  data: TriggerData;

  /**
   * Create an instance of Trigger from user inputs
   * @param props
   */
  constructor(props: TriggerProps) {
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.data = props.data;
  }

  toRequest(): avs_pb.TaskTrigger {
    // Since the interface is a base class, toRequest should never be called
    throw new Error("Method not implemented.");
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      data: this.data,
    }
  }
}

export default Trigger;
