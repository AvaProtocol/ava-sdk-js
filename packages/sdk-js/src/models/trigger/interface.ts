import * as avs_pb from "@/grpc_codegen/avs_pb";
import {
  TriggerType,
  TriggerProps,
  TriggerData,
  TriggerOutput,
} from "@avaprotocol/types";


export default abstract class Trigger implements TriggerProps {
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

  static fromResponse(raw: avs_pb.TaskTrigger): Trigger {
    // Convert the raw object to TriggerProps
    const obj = raw.toObject() as unknown as TriggerProps;

    return new (this as any)({ // eslint-disable-line @typescript-eslint/no-explicit-any
      ...obj,
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
    };
  }
}
