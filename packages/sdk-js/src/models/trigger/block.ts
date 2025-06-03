import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerOutput, TriggerProps } from "./interface";
import { TriggerType } from "@avaprotocol/types";
import { BlockTriggerDataType } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { interval }
export type BlockTriggerProps = TriggerProps & { data: BlockTriggerDataType };

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
    config.setInterval((this.data as BlockTriggerDataType).interval || 0);
    trigger.setConfig(config);
    
    request.setBlock(trigger);

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): BlockTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: BlockTriggerDataType = { interval: 0 };
    
    if (raw.getBlock() && raw.getBlock()!.hasConfig()) {
      const config = raw.getBlock()!.getConfig();
      
      if (config) {
        data = {
          interval: config.getInterval() || 0
        };
      }
    }
    
    return new BlockTrigger({
      ...obj,
      type: TriggerType.Block,
      data: data,
    });
  }

  /**
   * Convert raw data from runNodeWithInputs response to BlockOutput format
   * @param rawData - The raw data from the gRPC response
   * @returns {BlockTriggerOutput | undefined} - The converted data
   */
  getOutput(): any | undefined {
    return this.output;
  }

  /**
   * Extract output data from RunTriggerResp for block triggers
   * @param outputData - The RunTriggerResp containing block trigger output
   * @returns Plain JavaScript object with block trigger data
   */
  static fromOutputData(outputData: avs_pb.RunTriggerResp): any {
    const blockOutput = outputData.getBlockTrigger();
    return blockOutput?.toObject() || null;
  }
}

export default BlockTrigger;
