import * as avs_pb from "@/grpc_codegen/avs_pb";
import BlockTrigger from "./block";
import CronTrigger from "./cron";
import EventTrigger from "./event";
import FixedTimeTrigger from "./fixedTime";
import ManualTrigger from "./manual";
import Trigger from "./interface";
import { 
  TriggerType,
  TriggerProps,
  BlockTriggerProps,
  CronTriggerProps,
  EventTriggerProps,
  FixedTimeTriggerProps,
  ManualTriggerProps,
} from "@avaprotocol/types";

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

  static fromOutputData(outputData: avs_pb.RunTriggerResp): any {
    // Delegate to the specific trigger type's fromOutputData method
    switch (outputData.getOutputDataCase()) {
      case avs_pb.RunTriggerResp.OutputDataCase.BLOCK_TRIGGER:
        return BlockTrigger.fromOutputData(outputData);
      case avs_pb.RunTriggerResp.OutputDataCase.FIXED_TIME_TRIGGER:
        return FixedTimeTrigger.fromOutputData(outputData);
      case avs_pb.RunTriggerResp.OutputDataCase.CRON_TRIGGER:
        return CronTrigger.fromOutputData(outputData);
      case avs_pb.RunTriggerResp.OutputDataCase.EVENT_TRIGGER:
        return EventTrigger.fromOutputData(outputData);
      case avs_pb.RunTriggerResp.OutputDataCase.MANUAL_TRIGGER:
        return ManualTrigger.fromOutputData(outputData);
      case avs_pb.RunTriggerResp.OutputDataCase.OUTPUT_DATA_NOT_SET:
      default:
        return null;
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
