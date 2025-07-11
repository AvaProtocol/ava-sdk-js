export enum WorkflowStatus {
  Active = "active",
  Completed = "completed",
  Failed = "failed",
  Canceled = "canceled",
  Executing = "executing",
}

export enum TriggerType {
  Unspecified = "unspecified",
  Manual = "manualTrigger",
  FixedTime = "fixedTimeTrigger",
  Cron = "cronTrigger",
  Block = "blockTrigger",
  Event = "eventTrigger",
}

export enum NodeType {
  Unspecified = "unspecified",
  ETHTransfer = "ethTransfer",
  ContractWrite = "contractWrite",
  ContractRead = "contractRead",
  GraphQLQuery = "graphql",
  RestAPI = "restApi",
  CustomCode = "customCode",
  Branch = "branch",
  Filter = "filter",
  Loop = "loop",
}

export enum ExecutionMode {
  Sequential = "sequential",
  Parallel = "parallel",
} 