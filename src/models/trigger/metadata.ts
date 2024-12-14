import * as avs_pb from "../../../grpc_codegen/avs_pb";
import type { TriggerType } from "./interface";
import { TriggerTypes } from "./interface";
import _ from "lodash";

// Union type for all possible trigger data
export type TriggerMetadataProps =
  | { type: avs_pb.TaskTrigger.TriggerTypeCase.FIXED_TIME; epoch: number }
  | { type: avs_pb.TaskTrigger.TriggerTypeCase.CRON; epoch: number }
  | { type: avs_pb.TaskTrigger.TriggerTypeCase.BLOCK; blockNumber: number }
  | {
      type: avs_pb.TaskTrigger.TriggerTypeCase.EVENT;
      blockNumber: number;
      logIndex: number;
      txHash: string;
    };

class TriggerMetadata {
  type: TriggerType;
  blockNumber?: number;
  epoch?: number;
  logIndex?: number;
  txHash?: string;

  constructor(props: TriggerMetadataProps) {
    console.log("constructor.props", props);
    this.type = props.type;
    // Configure metadata based on trigger type
    switch (props.type) {
      case TriggerTypes.FIXED_TIME:
      case TriggerTypes.CRON:
        this.epoch = props.epoch;
        break;
      case TriggerTypes.BLOCK:
        this.blockNumber = props.blockNumber;
        break;
      case TriggerTypes.EVENT:
        this.blockNumber = props.blockNumber;
        this.logIndex = props.logIndex;
        this.txHash = props.txHash;
        break;
      default:
        throw new Error("Unsupported trigger type");
    }
  }

  static fromResponse(
    data: avs_pb.TriggerMetadata | undefined
  ): TriggerMetadata | undefined {
    if (!data) {
      return undefined;
    }
    console.log("fromResponse.data", data.toObject());

    let type: TriggerType;

    if (data.getEpoch() !== 0) {
      type = TriggerTypes.FIXED_TIME;
    } else if (data.getBlockNumber() !== 0) {
      if (data.getLogIndex() !== 0 && !_.isEmpty(data.getTxHash())) {
        type = TriggerTypes.EVENT;
      } else {
        type = TriggerTypes.BLOCK;
      }
    } else {
      throw new Error("Unable to determine trigger type from response");
    }

    return new TriggerMetadata({
      type,
      blockNumber: data.getBlockNumber(),
      epoch: data.getEpoch(),
      logIndex: data.getLogIndex(),
      txHash: data.getTxHash(),
    });
  }

  toRequest(): avs_pb.TriggerMetadata {
    const request = new avs_pb.TriggerMetadata();

    switch (this.type) {
      case TriggerTypes.FIXED_TIME:
      case TriggerTypes.CRON:
        if (this.epoch) {
          request.setEpoch(this.epoch);
        }
        break;
      case TriggerTypes.BLOCK:
        if (this.blockNumber) {
          request.setBlockNumber(this.blockNumber);
        }
        break;
      case TriggerTypes.EVENT:
        if (this.blockNumber) {
          request.setBlockNumber(this.blockNumber);
        }
        if (this.logIndex) {
          request.setLogIndex(this.logIndex);
        }
        if (this.txHash) {
          request.setTxHash(this.txHash);
        }
        break;
      default:
        throw new Error("Unsupported trigger type");
    }

    return request;
  }
}

export default TriggerMetadata;
