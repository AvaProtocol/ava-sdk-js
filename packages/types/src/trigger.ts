import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerType } from "./enums";

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
export const TriggerTypeConverter = {
  toProtobuf: (type: TriggerType): avs_pb.TriggerType => {
    switch (type) {
      case TriggerType.Manual:
        return avs_pb.TriggerType.TRIGGER_TYPE_MANUAL;
      case TriggerType.FixedTime:
        return avs_pb.TriggerType.TRIGGER_TYPE_FIXED_TIME;
      case TriggerType.Cron:
        return avs_pb.TriggerType.TRIGGER_TYPE_CRON;
      case TriggerType.Block:
        return avs_pb.TriggerType.TRIGGER_TYPE_BLOCK;
      case TriggerType.Event:
        return avs_pb.TriggerType.TRIGGER_TYPE_EVENT;
      case TriggerType.Unspecified:
      default:
        return avs_pb.TriggerType.TRIGGER_TYPE_UNSPECIFIED;
    }
  },
  fromProtobuf: (type: avs_pb.TriggerType): TriggerType => {
    switch (type) {
      case avs_pb.TriggerType.TRIGGER_TYPE_MANUAL:
        return TriggerType.Manual;
      case avs_pb.TriggerType.TRIGGER_TYPE_FIXED_TIME:
        return TriggerType.FixedTime;
      case avs_pb.TriggerType.TRIGGER_TYPE_CRON:
        return TriggerType.Cron;
      case avs_pb.TriggerType.TRIGGER_TYPE_BLOCK:
        return TriggerType.Block;
      case avs_pb.TriggerType.TRIGGER_TYPE_EVENT:
        return TriggerType.Event;
      case avs_pb.TriggerType.TRIGGER_TYPE_UNSPECIFIED:
      default:
        return TriggerType.Unspecified;
    }
  },
};
export const TriggerTypeGoConverter = {
  toGoString: (triggerType: avs_pb.TriggerType): string => {
    switch (triggerType) {
      case avs_pb.TriggerType.TRIGGER_TYPE_MANUAL:
        return "manualTrigger";
      case avs_pb.TriggerType.TRIGGER_TYPE_FIXED_TIME:
        return "fixedTimeTrigger";
      case avs_pb.TriggerType.TRIGGER_TYPE_CRON:
        return "cronTrigger";
      case avs_pb.TriggerType.TRIGGER_TYPE_BLOCK:
        return "blockTrigger";
      case avs_pb.TriggerType.TRIGGER_TYPE_EVENT:
        return "eventTrigger";
      case avs_pb.TriggerType.TRIGGER_TYPE_UNSPECIFIED:
      default:
        return "unspecified";
    }
  },
  fromGoString: (goString: string): avs_pb.TriggerType => {
    switch (goString) {
      case "manualTrigger":
        return avs_pb.TriggerType.TRIGGER_TYPE_MANUAL;
      case "fixedTimeTrigger":
        return avs_pb.TriggerType.TRIGGER_TYPE_FIXED_TIME;
      case "cronTrigger":
        return avs_pb.TriggerType.TRIGGER_TYPE_CRON;
      case "blockTrigger":
        return avs_pb.TriggerType.TRIGGER_TYPE_BLOCK;
      case "eventTrigger":
        return avs_pb.TriggerType.TRIGGER_TYPE_EVENT;
      case "unspecified":
      default:
        return avs_pb.TriggerType.TRIGGER_TYPE_UNSPECIFIED;
    }
  },
};
