import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  TriggerType,
  TriggerProps,
  TriggerData,
  TriggerOutput,
} from "@avaprotocol/types";
import _ from "lodash";
import { extractInputFromProtobuf } from "../../utils";

export default abstract class Trigger implements TriggerProps {
  id: string;
  name: string;
  type: TriggerType;
  data: TriggerData;
  output?: TriggerOutput;
  input?: Record<string, any>;

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
    this.input = props.input;
  }

  toRequest(): avs_pb.TaskTrigger {
    throw new Error("Method not implemented.");
  }

  static fromResponse(raw: avs_pb.TaskTrigger): Trigger {
    // Convert the raw object to TriggerProps
    const obj = raw.toObject() as unknown as TriggerProps;

    // Extract input data using the utility function - this provides a general way
    // for all trigger types to extract input data from execution step responses
    let input: Record<string, unknown> | undefined = undefined;

    // Check each trigger type and extract input from the correct nested object
    switch (raw.getTriggerTypeCase()) {
      case avs_pb.TaskTrigger.TriggerTypeCase.MANUAL: {
        const manualTrigger = raw.getManual();
        if (manualTrigger && manualTrigger.hasInput()) {
          input = extractInputFromProtobuf(manualTrigger.getInput());
        }
        break;
      }
      case avs_pb.TaskTrigger.TriggerTypeCase.BLOCK: {
        const blockTrigger = raw.getBlock();
        if (blockTrigger && blockTrigger.hasInput()) {
          input = extractInputFromProtobuf(blockTrigger.getInput());
        }
        break;
      }
      case avs_pb.TaskTrigger.TriggerTypeCase.CRON: {
        const cronTrigger = raw.getCron();
        if (cronTrigger && cronTrigger.hasInput()) {
          input = extractInputFromProtobuf(cronTrigger.getInput());
        }
        break;
      }
      case avs_pb.TaskTrigger.TriggerTypeCase.EVENT: {
        const eventTrigger = raw.getEvent();
        if (eventTrigger && eventTrigger.hasInput()) {
          input = extractInputFromProtobuf(eventTrigger.getInput());
        }
        break;
      }
      case avs_pb.TaskTrigger.TriggerTypeCase.FIXED_TIME: {
        const fixedTimeTrigger = raw.getFixedTime();
        if (fixedTimeTrigger && fixedTimeTrigger.hasInput()) {
          input = extractInputFromProtobuf(fixedTimeTrigger.getInput());
        }
        break;
      }
    }

    return new (this as any)({ // eslint-disable-line @typescript-eslint/no-explicit-any
      ...obj,
      input: input,
    });
  }

  getOutput(): TriggerOutput | undefined {
    return this.output;
  }

  toJson(): TriggerProps {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      data: this.data,
      output: this.output,
      input: this.input,
    };
  }
}
