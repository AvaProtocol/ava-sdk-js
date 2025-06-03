import * as avs_pb from "@/grpc_codegen/avs_pb";

export type ETHTransferNodeData = avs_pb.ETHTransferNode.Config.AsObject;
export type ContractWriteNodeData = avs_pb.ContractWriteNode.Config.AsObject;
export type ContractReadNodeData = avs_pb.ContractReadNode.Config.AsObject;
export type CustomCodeNodeData = avs_pb.CustomCodeNode.Config.AsObject;
export type BranchNodeData = avs_pb.BranchNode.Config.AsObject;
export type RestAPINodeData = avs_pb.RestAPINode.Config.AsObject;
export type GraphQLQueryNodeData = avs_pb.GraphQLQueryNode.Config.AsObject;
export type FilterNodeData = avs_pb.FilterNode.Config.AsObject;
export type LoopNodeData = avs_pb.LoopNode.Config.AsObject;

export type RestAPINodeOutput = avs_pb.RestAPINode.Output.AsObject;

export enum CustomCodeLangs {
  Javascript = 0,
  Python = 1,
}

export type BlockTriggerDataType = avs_pb.BlockTrigger.Config.AsObject;
export type EventTriggerDataType = avs_pb.EventTrigger.Config.AsObject;
export type FixedTimeTriggerDataType = avs_pb.FixedTimeTrigger.Config.AsObject;
export type CronTriggerDataType = avs_pb.CronTrigger.Config.AsObject;

export type BlockTriggerOutput = avs_pb.BlockTrigger.Output.AsObject;
export type EventTriggerOutput = avs_pb.EventTrigger.Output.AsObject;
export type FixedTimeTriggerOutput = avs_pb.FixedTimeTrigger.Output.AsObject;
export type CronTriggerOutput = avs_pb.CronTrigger.Output.AsObject;
export type ManualTriggerOutput = avs_pb.ManualTrigger.Output.AsObject;
