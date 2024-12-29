import * as avs_pb from "../../../grpc_codegen/avs_pb";
import BlockTrigger from "./block";
import { BlockTriggerProps } from "./block";
import CronTrigger, { CronTriggerProps } from "./cron";
import EventTrigger, { EventTriggerProps } from "./event";
import FixedTimeTrigger, { FixedTimeTriggerProps } from "./fixedTime";
import Trigger, { TriggerType, TriggerTypes } from "./interface";
import { TriggerProps } from "./interface";

class TriggerFactory {
  /**
   * Static factory method to create Trigger instances
   * @param props
   * @returns
   */
  static create(props: TriggerProps): Trigger {
    switch (props.type) {
      case TriggerTypes.BLOCK:
        return new BlockTrigger(props as BlockTriggerProps);
      case TriggerTypes.CRON:
        return new CronTrigger(props as CronTriggerProps);
      case TriggerTypes.EVENT:
        return new EventTrigger(props as EventTriggerProps);
      case TriggerTypes.FIXED_TIME:
        return new FixedTimeTrigger(props as FixedTimeTriggerProps);
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
      default:
        throw new Error("Unknown trigger type");
    }
  }
}

export default TriggerFactory;

export {
  Trigger,
  TriggerTypes,
  BlockTrigger,
  CronTrigger,
  EventTrigger,
  FixedTimeTrigger,
};

export type {
  TriggerProps,
  TriggerType,
  BlockTriggerProps,
  CronTriggerProps,
  EventTriggerProps,
  FixedTimeTriggerProps,
};
