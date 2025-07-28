import * as avs_pb from "@/grpc_codegen/avs_pb";
import Trigger from "./interface";
import { 
  TriggerType, 
  BlockTriggerProps, 
  BlockTriggerDataType,
  BlockTriggerOutput,
  TriggerProps 
} from "@avaprotocol/types";
class BlockTrigger extends Trigger {
  constructor(props: BlockTriggerProps) {
    super({
      ...props,
      type: TriggerType.Block,
    });
  }

  toRequest(): avs_pb.TaskTrigger {
    const trigger = new avs_pb.TaskTrigger();
    trigger.setId(this.id);
    trigger.setName(this.name);
    trigger.setType(avs_pb.TriggerType.TRIGGER_TYPE_BLOCK);

    const blockTrigger = new avs_pb.BlockTrigger();
    const config = new avs_pb.BlockTrigger.Config();

    const blockData = this.data as BlockTriggerDataType;

    // Validate trigger data exists
    if (!blockData) {
      throw new Error("Trigger data is missing for block");
    }

    // Validate interval is present and not null/undefined
    if (blockData.interval === null || blockData.interval === undefined) {
      throw new Error("Interval is required for block trigger");
    }

    // Validate interval is a positive integer
    if (blockData.interval <= 0) {
      throw new Error("Interval must be greater than 0");
    }

    // Validate interval is an integer (not decimal)
    if (!Number.isInteger(blockData.interval)) {
      throw new Error(`BlockTrigger interval must be an integer, got: ${blockData.interval}`);
    }

    config.setInterval(blockData.interval);

    blockTrigger.setConfig(config);

    trigger.setBlock(blockTrigger);

    return trigger;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): BlockTrigger {
    const obj = raw.toObject() as unknown as TriggerProps;

    let data: BlockTriggerDataType = { interval: 0 };

    if (raw.getBlock() && raw.getBlock()!.hasConfig()) {
      const config = raw.getBlock()!.getConfig()!;
      data = {
        interval: config.getInterval(),
      };
    }

    return new BlockTrigger({
      id: obj.id,
      name: obj.name,
      type: obj.type,
      data: data,
    });
  }

  /**
   * Convert the output to the expected format
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
    if (!blockOutput) return null;

    // Extract data from the new data field
    const dataValue = blockOutput.getData();
    if (!dataValue) return null;

    // Convert the Value to JavaScript object
    const result = dataValue.toJavaScript();
    return result;
  }
}

export default BlockTrigger;
