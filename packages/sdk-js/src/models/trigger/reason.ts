import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerType } from "@avaprotocol/types";

// Union type for all possible trigger data
export type TriggerReasonProps =
  | { type: TriggerType.FixedTime; epoch: number }
  | { type: TriggerType.Cron; epoch: number }
  | { type: TriggerType.Block; blockNumber: number }
  | {
      type: TriggerType.Event;
      blockNumber: number;
      logIndex: number;
      txHash: string;
    }
  | { type: TriggerType.Manual }
  | { type: TriggerType.Unspecified };

// Convert the number values of gRPC TriggerType to string values of TriggerType
const convertTriggerType = (
  grpcType: avs_pb.TriggerType
): TriggerType => {
  const conversionMap: {
    [key in avs_pb.TriggerType]: TriggerType;
  } = {
    [avs_pb.TriggerType.TRIGGER_TYPE_FIXED_TIME]: TriggerType.FixedTime,
    [avs_pb.TriggerType.TRIGGER_TYPE_CRON]: TriggerType.Cron,
    [avs_pb.TriggerType.TRIGGER_TYPE_BLOCK]: TriggerType.Block,
    [avs_pb.TriggerType.TRIGGER_TYPE_EVENT]: TriggerType.Event,
    [avs_pb.TriggerType.TRIGGER_TYPE_MANUAL]: TriggerType.Manual,
    [avs_pb.TriggerType.TRIGGER_TYPE_UNSPECIFIED]: TriggerType.Unspecified,
  };

  return conversionMap[grpcType];
};

class TriggerReason {
  type: TriggerType;
  blockNumber?: number;
  epoch?: number;
  logIndex?: number;
  txHash?: string;

  constructor(props: TriggerReasonProps) {
    this.type = props.type;

    // Configure reason based on trigger type
    switch (props.type) {
      case TriggerType.FixedTime:
      case TriggerType.Cron:
        this.epoch = props.epoch;
        break;
      case TriggerType.Block:
        this.blockNumber = props.blockNumber;
        break;
      case TriggerType.Event:
        this.blockNumber = props.blockNumber;
        this.logIndex = props.logIndex;
        this.txHash = props.txHash;
        break;
      case TriggerType.Manual:
      case TriggerType.Unspecified:
        break;
      default:
        throw new Error("Unsupported trigger type");
    }
  }

  static fromResponse(
    data: avs_pb.TriggerReason | undefined
  ): TriggerReason | undefined {
    if (!data) {
      return undefined;
    }

    return new TriggerReason({
      type: convertTriggerType(data.getType()),
      blockNumber: data.getBlockNumber(),
      epoch: data.getEpoch(),
      logIndex: data.getLogIndex(),
      txHash: data.getTxHash(),
    });
  }

  toRequest(): avs_pb.TriggerReason {
    const request = new avs_pb.TriggerReason();

    switch (this.type) {
      case TriggerType.FixedTime:
        request.setType(avs_pb.TriggerType.TRIGGER_TYPE_FIXED_TIME);
        if (this.epoch) {
          request.setEpoch(this.epoch);
        }
        break;
      case TriggerType.Cron:
        request.setType(avs_pb.TriggerType.TRIGGER_TYPE_CRON);
        if (this.epoch) {
          request.setEpoch(this.epoch);
        }
        break;
      case TriggerType.Block:
        request.setType(avs_pb.TriggerType.TRIGGER_TYPE_BLOCK);
        if (this.blockNumber) {
          request.setBlockNumber(this.blockNumber);
        }
        break;
      case TriggerType.Event:
        request.setType(avs_pb.TriggerType.TRIGGER_TYPE_EVENT);
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
      case TriggerType.Manual:
        request.setType(avs_pb.TriggerType.TRIGGER_TYPE_MANUAL);
        break;
      case TriggerType.Unspecified:
        request.setType(avs_pb.TriggerType.TRIGGER_TYPE_UNSPECIFIED);
        break;
      default:
        throw new Error("Unsupported trigger type");
    }

    return request;
  }
}

export default TriggerReason;
