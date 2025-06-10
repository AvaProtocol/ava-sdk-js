import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger, { TriggerOutput } from "./interface";
import { TriggerType, BlockTriggerDataType, BlockTriggerOutput, BlockTriggerProps, TriggerProps } from "@avaprotocol/types";

// Required props for constructor: id, name, type and data: { interval }


class BlockTrigger extends Trigger {
  constructor(props: BlockTriggerProps) {
    super({ ...props, type: TriggerType.Block, data: props.data });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);
    request.setId(this.id);
    request.setType(avs_pb.TriggerType.TRIGGER_TYPE_BLOCK);

    if (!this.data) {
      throw new Error(`Trigger data is missing for block`);
    }

    const blockData = this.data as BlockTriggerDataType;
    
    // Validate interval is present and not null/undefined
    if (blockData.interval === null || blockData.interval === undefined) {
      throw new Error("Interval is required for block trigger");
    }
    
    // Validate interval is greater than 0
    if (blockData.interval <= 0) {
      throw new Error("Interval must be greater than 0");
    }

    const trigger = new avs_pb.BlockTrigger();
    const config = new avs_pb.BlockTrigger.Config();
    config.setInterval(blockData.interval);
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
  getOutput(): BlockTriggerOutput | undefined {
    return this.output as BlockTriggerOutput;
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
