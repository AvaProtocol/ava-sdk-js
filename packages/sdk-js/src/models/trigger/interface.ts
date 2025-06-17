import * as avs_pb from "@/grpc_codegen/avs_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import {
  TriggerType,
  TriggerTypeGoConverter,
  TriggerTypeConverter,
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
  input?: google_protobuf_struct_pb.Value.AsObject | Record<string, any>;

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
    this.input = props.input ? extractInputFromProtobuf(props.input as any) : undefined;
  }

  toRequest(): avs_pb.TaskTrigger {
    throw new Error("Method not implemented.");
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
