import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerOutput, TriggerProps } from "./interface";
import { TriggerType } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { interval }
export type BlockTriggerConfig = avs_pb.BlockTrigger.Config.AsObject;
export type BlockTriggerProps = TriggerProps & { data: BlockTriggerConfig };
export type BlockTriggerOutput = avs_pb.BlockTrigger.Output.AsObject;

class BlockTrigger extends Trigger {
  constructor(props: BlockTriggerProps) {
    super({ ...props, type: TriggerType.Block, data: props.data });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);
    request.setId(this.id);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const trigger = new avs_pb.BlockTrigger();
    const config = new avs_pb.BlockTrigger.Config();
    config.setInterval((this.data as BlockTriggerConfig).interval);
    trigger.setConfig(config);

    request.setBlock(trigger);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): BlockTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    return new BlockTrigger({
      ...obj,
      type: TriggerType.Block,
      data: raw?.getBlock()?.toObject().config as BlockTriggerConfig,
    });
  }

  // /**
  //  * Convert raw data from runNodeWithInputs response to BlockOutput format
  //  * @param rawData - The raw data from the gRPC response
  //  * @returns {avs_pb.Execution.BlockOutput.AsObject} - The converted data
  //  */
  // getOutput(): TriggerOutput | undefined {
  //   return this.output;
  // }
}

export default BlockTrigger;
