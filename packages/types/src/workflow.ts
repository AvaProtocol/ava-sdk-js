import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerType } from "./enums";
import { TriggerProps } from "./trigger";
import { NodeProps } from "./node";
export interface SimulateWorkflowRequest {
  trigger: TriggerProps;
  nodes: Array<NodeProps>;
  edges: Array<Record<string, any>>;
  inputVariables?: Record<string, any>;
}
export type TriggerDataProps =
  | { type: TriggerType.FixedTime; timestamp: number; timestampIso: string }
  | { type: TriggerType.Cron; timestamp: number; timestampIso: string }
  | {
      type: TriggerType.Block;
      blockNumber: number;
      blockHash?: string;
      timestamp?: number;
      parentHash?: string;
      difficulty?: string;
      gasLimit?: number;
      gasUsed?: number;
    }
  | {
      type: TriggerType.Event;
      evmLog?: {
        address: string;
        blockNumber: number;
        transactionHash: string;
        index: number;
        [key: string]: any;
      };
      transferLog?: {
        tokenName: string;
        tokenSymbol: string;
        tokenDecimals: number;
        transactionHash: string;
        address: string;
        blockNumber: number;
        blockTimestamp: number;
        fromAddress: string;
        toAddress: string;
        value: string;
        valueFormatted: string;
        transactionIndex: number;
        logIndex: number;
      };
    }
  | { type: TriggerType.Manual; runAt?: number }
  | { type: TriggerType.Unspecified };
export const ExecutionStatus = avs_pb.ExecutionStatus;
