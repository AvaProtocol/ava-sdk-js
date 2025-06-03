import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerType, WorkflowStatus } from "./enums";
import { TriggerProps } from "./trigger";
import { NodeProps } from "./node";

export type WorkflowTriggerDataProps =
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

// Edge Props
export type EdgeProps = avs_pb.TaskEdge.AsObject;

// Output Data Props
export type OutputDataProps =
  | avs_pb.BlockTrigger.Output.AsObject
  | avs_pb.FixedTimeTrigger.Output.AsObject
  | avs_pb.CronTrigger.Output.AsObject
  | avs_pb.EventTrigger.Output.AsObject
  | avs_pb.EventTrigger.TransferLogOutput.AsObject
  | avs_pb.ManualTrigger.Output.AsObject
  | avs_pb.Evm.Log.AsObject
  | { blockNumber: number } // Filtered block trigger output
  | { timestamp: number; timestampIso: string } // Filtered time trigger output (updated from epoch)
  | undefined;

// Step Props
export type StepProps = Omit<
  avs_pb.Execution.Step.AsObject,
  | "outputDataCase"
  | "ethTransfer"
  | "graphql"
  | "contractRead"
  | "contractWrite"
  | "customCode"
  | "restApi"
  | "branch"
  | "filter"
  | "loop"
  | "blockTrigger"
  | "fixedTimeTrigger"
  | "cronTrigger"
  | "eventTrigger"
  | "manualTrigger"
> & {
  output: any; // Changed to any to hold converted JS value
};

// Execution Props
export type ExecutionProps = Omit<avs_pb.Execution.AsObject, "stepsList"> & {
  steps: Array<StepProps>;
};

// Workflow Props - depends on other types so defined last
export type WorkflowProps = Omit<
  avs_pb.Task.AsObject,
  | "id"
  | "owner"
  | "completedAt"
  | "status"
  | "name"
  | "trigger"
  | "nodesList"
  | "edgesList"
  | "lastRanAt"
  | "executionCount"
> & {
  id?: string;
  owner?: string;
  completedAt?: number;
  status?: WorkflowStatus;
  name?: string;
  trigger: TriggerProps;
  nodes: NodeProps[];
  edges: EdgeProps[];
  lastRanAt?: number;
  executionCount?: number;
};

export const ExecutionStatus = avs_pb.ExecutionStatus;
