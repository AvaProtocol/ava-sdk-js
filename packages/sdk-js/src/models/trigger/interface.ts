import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerType } from "@avaprotocol/types";

export type TriggerData =
  | avs_pb.FixedTimeTrigger.AsObject
  | avs_pb.CronTrigger.AsObject
  | avs_pb.BlockTrigger.AsObject
  | avs_pb.EventTrigger.AsObject
  | Record<string, any>
  | null;

export type TriggerOutput =
  | avs_pb.FixedTimeTrigger.Output.AsObject
  | avs_pb.CronTrigger.Output.AsObject
  | avs_pb.BlockTrigger.Output.AsObject
  | avs_pb.EventTrigger.Output.AsObject
  | avs_pb.ManualTrigger.Output.AsObject
  | null;

export type TriggerProps = Omit<
  avs_pb.TaskTrigger.AsObject,
  "manual" | "fixedTime" | "cron" | "block" | "event" | "type"
> & {
  type: TriggerType;
  data: TriggerData;
  output?: TriggerOutput;
};

class Trigger implements TriggerProps {
  id: string;
  name: string;
  type: TriggerType;
  data: TriggerData;
  output?: TriggerOutput;

  /**
   * Create an instance of Trigger from user inputs
   * @param props
   */
  constructor(props: TriggerProps) {
    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.data = props.data;
    this.output = props.output;
  }

  toRequest(): avs_pb.TaskTrigger {
    throw new Error("Method not implemented.");
  }

  getOutput(): TriggerOutput | undefined {
    return this.output;
  }
}

export default Trigger;
