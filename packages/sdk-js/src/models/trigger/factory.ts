import * as avs_pb from "@/grpc_codegen/avs_pb";
import BlockTrigger, { BlockTriggerDataType } from "./block";
import { BlockTriggerProps } from "./block";
import CronTrigger, { CronTriggerDataType, CronTriggerProps } from "./cron";
import EventTrigger, { EventTriggerDataType, EventTriggerProps } from "./event";
import FixedTimeTrigger, {
  FixedTimeTriggerDataType,
  FixedTimeTriggerProps,
} from "./fixedTime";
import ManualTrigger, { ManualTriggerProps } from "./manual";
import Trigger from "./interface";
import { TriggerProps } from "./interface";
import { TriggerType } from "@avaprotocol/types";

class TriggerFactory {
  /**
   * Static factory method to create Trigger instances
   * @param props
   * @returns
   */
  static create(props: TriggerProps): Trigger {
    switch (props.type) {
      case TriggerType.Block:
        return new BlockTrigger(props as BlockTriggerProps);
      case TriggerType.Cron:
        return new CronTrigger(props as CronTriggerProps);
      case TriggerType.Event:
        return new EventTrigger(props as EventTriggerProps);
      case TriggerType.FixedTime:
        return new FixedTimeTrigger(props as FixedTimeTriggerProps);
      case TriggerType.Manual:
        return new ManualTrigger(props as ManualTriggerProps);
    }

    // Add more conditions for other subclasses
    throw new Error("Unsupported trigger type");
  }

  /**
   * Create an instance of Trigger from AVS getWorkflow or getWorkflows response
   * @param trigger
   * @returns
   */
  static fromResponse(raw: avs_pb.TaskTrigger): Trigger {
    switch (true) {
      case !!raw.getFixedTime():
        return FixedTimeTrigger.fromResponse(raw);
      case !!raw.getCron():
        return CronTrigger.fromResponse(raw);
      case !!raw.getBlock():
        return BlockTrigger.fromResponse(raw);
      case !!raw.getEvent():
        return EventTrigger.fromResponse(raw);
      case !!raw.getManual():
        return ManualTrigger.fromResponse(raw);
      default:
        throw new Error("Unknown trigger type");
    }
  }
}

export default TriggerFactory;

// Trigger object definitions
export {
  Trigger,
  BlockTrigger,
  CronTrigger,
  EventTrigger,
  FixedTimeTrigger,
  ManualTrigger,
};

// Trigger Props definitions
export type {
  TriggerProps,
  BlockTriggerProps,
  CronTriggerProps,
  EventTriggerProps,
  FixedTimeTriggerProps,
  ManualTriggerProps,
};

// Trigger Data definitions
export type {
  BlockTriggerDataType,
  CronTriggerDataType,
  EventTriggerDataType,
  FixedTimeTriggerDataType,
};
