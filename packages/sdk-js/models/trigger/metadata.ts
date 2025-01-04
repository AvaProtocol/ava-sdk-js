import * as avs_pb from "../../../grpc_codegen/avs_pb";
import { TriggerType } from "../../types";
import _ from "lodash";

// Union type for all possible trigger data
export type TriggerMetadataProps =
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
  | { type: TriggerType.Unset };

// Convert the number values of gRPC TriggerType to string values of TriggerType
const convertTriggerType = (
  grpcType: avs_pb.TriggerMetadata.TriggerType
): TriggerType => {
  const conversionMap: {
    [key in avs_pb.TriggerMetadata.TriggerType]: TriggerType;
  } = {
    [avs_pb.TriggerMetadata.TriggerType.FIXEDTIME]: TriggerType.FixedTime,
    [avs_pb.TriggerMetadata.TriggerType.CRON]: TriggerType.Cron,
    [avs_pb.TriggerMetadata.TriggerType.BLOCK]: TriggerType.Block,
    [avs_pb.TriggerMetadata.TriggerType.EVENT]: TriggerType.Event,
    [avs_pb.TriggerMetadata.TriggerType.MANUAL]: TriggerType.Manual,
    [avs_pb.TriggerMetadata.TriggerType.UNSET]: TriggerType.Unset,
  };

  return conversionMap[grpcType];
};

class TriggerMetadata {
  type: TriggerType;
  blockNumber?: number;
  epoch?: number;
  logIndex?: number;
  txHash?: string;

  constructor(props: TriggerMetadataProps) {
    this.type = props.type;

    // Configure metadata based on trigger type
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

    return new TriggerMetadata({
      type: convertTriggerType(data.getType()),
      blockNumber: data.getBlockNumber(),
      epoch: data.getEpoch(),
      logIndex: data.getLogIndex(),
      txHash: data.getTxHash(),
    });
  }

  toRequest(): avs_pb.TriggerMetadata {
    const request = new avs_pb.TriggerMetadata();

    switch (this.type) {
      case TriggerType.FixedTime:
        request.setType(avs_pb.TriggerMetadata.TriggerType.FIXEDTIME);
        if (this.epoch) {
          request.setEpoch(this.epoch);
        }
        break;
      case TriggerType.Cron:
        request.setType(avs_pb.TriggerMetadata.TriggerType.CRON);
        if (this.epoch) {
          request.setEpoch(this.epoch);
        }
        break;
      case TriggerType.Block:
        request.setType(avs_pb.TriggerMetadata.TriggerType.BLOCK);
        if (this.blockNumber) {
          request.setBlockNumber(this.blockNumber);
        }
        break;
      case TriggerType.Event:
        request.setType(avs_pb.TriggerMetadata.TriggerType.EVENT);
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
        request.setType(avs_pb.TriggerMetadata.TriggerType.MANUAL);
        break;
      case TriggerType.Unset:
        request.setType(avs_pb.TriggerMetadata.TriggerType.UNSET);
        break;
      default:
        throw new Error("Unsupported trigger type");
    }

    return request;
  }
}

export default TriggerMetadata;
