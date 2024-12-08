import * as avs_pb from "../../../grpc_codegen/avs_pb";
import Trigger, { TriggerProps, TriggerTypes } from "./interface";

// Required props for constructor: id, name, type and data: { interval }
export type BlockTriggerDataType = avs_pb.BlockCondition.AsObject;
export type BlockTriggerProps = TriggerProps & { data: BlockTriggerDataType };

class BlockTrigger extends Trigger {
  constructor(props: BlockTriggerProps) {
    super({ ...props, type: TriggerTypes.BLOCK, data: props.data });

    console.log("BlockTrigger.constructor.props:", {
      ...props,
      type: TriggerTypes.BLOCK,
      data: props.data,
    });
  }

  toRequest(): avs_pb.TaskTrigger {
    const request = new avs_pb.TaskTrigger();
    request.setName(this.name);

    if (!this.data) {
      throw new Error(`Trigger data is missing for ${this.type}`);
    }

    const condition = new avs_pb.BlockCondition();
    condition.setInterval((this.data as BlockTriggerDataType).interval);
    request.setBlock(condition);

    console.log("Trigger.toRequest.request:", request.toObject());

    return request;
  }

  static fromResponse(raw: avs_pb.TaskTrigger): BlockTrigger {
    // Convert the raw object to TriggerProps, which should keep name and id
    const obj = raw.toObject() as unknown as TriggerProps;

    console.log("BlockTrigger.fromResponse.obj:", obj);
    return new BlockTrigger({
      ...obj,
      type: TriggerTypes.BLOCK,
      data: raw.getBlock()!.toObject() as BlockTriggerDataType,
    });
  }
}

export default BlockTrigger;
