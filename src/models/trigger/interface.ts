import * as avs_pb from "../../../grpc_codegen/avs_pb";
import { TriggerType } from "../../types";

export type TriggerData =
  | avs_pb.FixedTimeCondition.AsObject
  | avs_pb.CronCondition.AsObject
  | avs_pb.BlockCondition.AsObject
  | avs_pb.EventCondition.AsObject
  | null;

export type TriggerProps = Omit<
  avs_pb.TaskTrigger.AsObject,
  "manual" | "fixedTime" | "cron" | "block" | "event"
> & {
  type: TriggerType;
  data: TriggerData;
};

class Trigger implements TriggerProps {
  name: string;
  type: TriggerType;
  data: TriggerData;

  /**
   * Create an instance of Trigger from user inputs
   * @param props
   */
  constructor(props: TriggerProps) {
    this.name = props.name;
    this.type = props.type;
    this.data = props.data;
  }

  toRequest(): avs_pb.TaskTrigger {
    throw new Error("Method not implemented.");
  }
}

export default Trigger;
