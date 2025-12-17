import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerType, Lang } from "./enums";
import { ContractAbi } from "./abi";
import { MethodCallType } from "./shared";

// Custom CronTrigger data type with cleaner field names
export interface CronTriggerDataType {
  schedules: string[];
}

// EventCondition interface for condition-based filtering
export interface EventConditionType {
  fieldName: string; // Event field name (e.g., "answer", "roundId")
  operator: string; // Comparison operator: "gt", "gte", "lt", "lte", "eq", "ne"
  value: string; // Value to compare against (as string, parsed based on type)
  fieldType: string; // Field type: "uint256", "int256", "address", "bool", "bytes32", etc.
}

export interface ManualTriggerDataType {
  data: string | number | boolean | Record<string, unknown> | unknown[] | null;
  headers?: Record<string, string>;
  pathParams?: Record<string, string>;
  lang?: Lang;
}

// Custom EventTrigger data type with cleaner field names
export interface EventTriggerDataType {
  queries: Array<{
    addresses?: string[];
    topics?: (string | null)[]; // Flat array: [signature, from, to, ...]. Use null for wildcards.
    maxEventsPerBlock?: number;
    contractAbi?: ContractAbi; // Contract ABI as array (optional)
    conditions?: EventConditionType[]; // Event conditions to evaluate on decoded event data
    methodCalls?: MethodCallType[]; // Method calls for enhanced formatting (e.g., decimals)
  }>;
  // Cooldown period in seconds. After a trigger fires, wait this many seconds before
  // allowing the same task to trigger again. This prevents repeated firing when
  // conditions remain true (e.g., price > threshold fires every block).
  // Default: 300 (5 minutes cooldown - prevents repeated firing when conditions remain true)
  // Set to 0 to disable cooldown (triggers fire immediately when conditions match)
  cooldownSeconds?: number;
}
export type BlockTriggerDataType = avs_pb.BlockTrigger.Config.AsObject;
export type FixedTimeTriggerDataType = avs_pb.FixedTimeTrigger.Config.AsObject;

export type CronTriggerOutput = avs_pb.CronTrigger.Output.AsObject;
export type EventTriggerOutput = avs_pb.EventTrigger.Output.AsObject;
export type BlockTriggerOutput = avs_pb.BlockTrigger.Output.AsObject;
export type FixedTimeTriggerOutput = avs_pb.FixedTimeTrigger.Output.AsObject;
export type ManualTriggerOutput = avs_pb.ManualTrigger.Output.AsObject;

export type TriggerData =
  | FixedTimeTriggerDataType
  | CronTriggerDataType
  | BlockTriggerDataType
  | EventTriggerDataType
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
  "manual" | "fixedTime" | "cron" | "block" | "event" | "type" | "input"
> & {
  type: TriggerType;
  data: TriggerData;
  output?: TriggerOutput;
};

export type CronTriggerProps = TriggerProps & { data: CronTriggerDataType };
export type EventTriggerProps = TriggerProps & { data: EventTriggerDataType };
export type ManualTriggerProps = TriggerProps & { data: ManualTriggerDataType };
export type BlockTriggerProps = TriggerProps & { data: BlockTriggerDataType };
export type FixedTimeTriggerProps = TriggerProps & {
  data: FixedTimeTriggerDataType;
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
