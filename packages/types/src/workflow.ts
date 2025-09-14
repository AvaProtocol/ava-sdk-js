import * as avs_pb from "@/grpc_codegen/avs_pb";
import { TriggerType, WorkflowStatus, ExecutionStatus } from "./enums";
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
      data?: string | Record<string, unknown>; // JSON string or object containing event data
    }
  | {
      type: TriggerType.Manual;
      data?:
        | string
        | number
        | boolean
        | Record<string, unknown>
        | unknown[]
        | null;
      headersMap?: Array<[string, string]>;
      pathParamsMap?: Array<[string, string]>;
    }
  | { type: TriggerType.Unspecified };

// Edge Props
export type EdgeProps = avs_pb.TaskEdge.AsObject;

// Output Data Props
export type OutputDataProps =
  | avs_pb.BlockTrigger.Output.AsObject
  | avs_pb.FixedTimeTrigger.Output.AsObject
  | avs_pb.CronTrigger.Output.AsObject
  | avs_pb.EventTrigger.Output.AsObject
  | avs_pb.ManualTrigger.Output.AsObject
  | { blockNumber: number } // Filtered block trigger output
  | { timestamp: number; timestampIso: string } // Filtered time trigger output (updated from epoch)
  | { transactionHash: string } // ETH transfer output
  | avs_pb.ETHTransferNode.Output.AsObject // ETH transfer node output
  | avs_pb.ContractWriteNode.Output.AsObject // Contract write output
  | avs_pb.BranchNode.Output.AsObject // Branch output
  | any[] // Contract read output (array of converted protobuf values)
  | any // Custom code, GraphQL, REST API, Filter outputs (converted JS values)
  | string // Loop output
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
  output: OutputDataProps;
  metadata?: any;
  executionContext?: any;
};

// Execution Props
export type ExecutionProps = Omit<avs_pb.Execution.AsObject, "stepsList" | "status"> & {
  steps: Array<StepProps>;
  status: ExecutionStatus;
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
