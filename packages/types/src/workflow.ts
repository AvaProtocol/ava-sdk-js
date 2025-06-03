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

// Edge Props
export type EdgeProps = avs_pb.TaskEdge.AsObject;
export type OutputDataProps = avs_pb.BlockTrigger.Output.AsObject | avs_pb.FixedTimeTrigger.Output.AsObject | undefined;
export type StepProps = Omit<avs_pb.Execution.Step.AsObject, "outputDataCase"> & { output: any; };
export type ExecutionProps = Omit<avs_pb.Execution.AsObject, "stepsList"> & { steps: Array<StepProps>; };
export type WorkflowProps = Omit<avs_pb.Task.AsObject, "trigger" | "nodesList" | "edgesList"> & { trigger: TriggerProps; nodes: NodeProps[]; edges: EdgeProps[]; };
