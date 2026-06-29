// SDK v4 type surface — re-exports the openapi-typescript-generated
// schemas under shorter, hand-curated aliases. The generated file
// (`openapi.gen.ts`) carries every type the spec declares; this module
// is the v4 SDK's public type bag.
//
// v3 types (`./api`, `./workflow`, `./trigger`, etc.) remain available
// during the transition window; they map 1:1 to the proto shapes and
// will be deleted once every consumer is on v4.

import type { components, paths, operations } from "./openapi.gen";

// ---------------------------------------------------------------------
// Top-level: paths + operations + raw component schemas
// ---------------------------------------------------------------------

export type Paths = paths;
export type Operations = operations;
export type Schemas = components["schemas"];

// ---------------------------------------------------------------------
// Workflow envelope + sub-types
// ---------------------------------------------------------------------

export type Workflow = components["schemas"]["Workflow"];
export type WorkflowList = components["schemas"]["WorkflowList"];
export type WorkflowCount = components["schemas"]["WorkflowCount"];
export type WorkflowStatus = components["schemas"]["WorkflowStatus"];
export type CreateWorkflowRequest = components["schemas"]["CreateWorkflowRequest"];
export type SimulateWorkflowRequest = components["schemas"]["SimulateWorkflowRequest"];
export type TriggerWorkflowRequest = components["schemas"]["TriggerWorkflowRequest"];
export type TriggerWorkflowResponse = components["schemas"]["TriggerWorkflowResponse"];
export type EstimateFeesRequest = components["schemas"]["EstimateFeesRequest"];
export type EstimateFeesResponse = components["schemas"]["EstimateFeesResponse"];

// ---------------------------------------------------------------------
// Trigger + Node unions (discriminated by `type`)
// ---------------------------------------------------------------------

export type Trigger = components["schemas"]["Trigger"];
export type TriggerType = components["schemas"]["TriggerType"];
export type BlockTrigger = components["schemas"]["BlockTrigger"];
export type CronTrigger = components["schemas"]["CronTrigger"];
export type FixedTimeTrigger = components["schemas"]["FixedTimeTrigger"];
export type EventTrigger = components["schemas"]["EventTrigger"];
export type ManualTrigger = components["schemas"]["ManualTrigger"];

export type EventTriggerConfig = components["schemas"]["EventTriggerConfig"];

export type Node = components["schemas"]["Node"];
export type NodeType = components["schemas"]["NodeType"];
export type ETHTransferNode = components["schemas"]["ETHTransferNode"];
export type ContractReadNode = components["schemas"]["ContractReadNode"];
export type ContractWriteNode = components["schemas"]["ContractWriteNode"];
export type GraphQLQueryNode = components["schemas"]["GraphQLQueryNode"];
export type RestAPINode = components["schemas"]["RestAPINode"];
export type BranchNode = components["schemas"]["BranchNode"];
export type FilterNode = components["schemas"]["FilterNode"];
export type LoopNode = components["schemas"]["LoopNode"];
export type CustomCodeNode = components["schemas"]["CustomCodeNode"];
export type BalanceNode = components["schemas"]["BalanceNode"];
// Durable-execution pause node (human approval / cross-chain wait).
export type AwaitNode = components["schemas"]["AwaitNode"];
export type AwaitNodeConfig = components["schemas"]["AwaitNodeConfig"];

export type Edge = components["schemas"]["Edge"];
export type InputVariables = components["schemas"]["InputVariables"];
export type Lang = components["schemas"]["Lang"];

// ---------------------------------------------------------------------
// Executions
// ---------------------------------------------------------------------

export type Execution = components["schemas"]["Execution"];
export type ExecutionList = components["schemas"]["ExecutionList"];
export type ExecutionStatus = components["schemas"]["ExecutionStatus"];
export type ExecutionStep = components["schemas"]["ExecutionStep"];
export type ExecutionStatusSummary = components["schemas"]["ExecutionStatusSummary"];
export type ExecutionCount = components["schemas"]["ExecutionCount"];
export type ExecutionStats = components["schemas"]["ExecutionStats"];
export type SignalExecutionRequest = components["schemas"]["SignalExecutionRequest"];

// ---------------------------------------------------------------------
// Wallets
// ---------------------------------------------------------------------

export type Wallet = components["schemas"]["Wallet"];
export type WalletList = components["schemas"]["WalletList"];
export type CreateWalletRequest = components["schemas"]["CreateWalletRequest"];
export type WithdrawRequest = components["schemas"]["WithdrawRequest"];
export type WithdrawResponse = components["schemas"]["WithdrawResponse"];
export type NonceResponse = components["schemas"]["NonceResponse"];

// ---------------------------------------------------------------------
// Secrets, tokens, operators, auth, problem
// ---------------------------------------------------------------------

export type Secret = components["schemas"]["Secret"];
export type SecretList = components["schemas"]["SecretList"];
// Inline because the spec defines `scope` as an inline enum on Secret
// rather than a top-level component schema.
export type SecretScope = components["schemas"]["Secret"]["scope"];
export type PutSecretRequest = components["schemas"]["PutSecretRequest"];

export type TokenMetadataResponse = components["schemas"]["TokenMetadataResponse"];

export type OperatorList = components["schemas"]["OperatorList"];
export type OperatorInfo = components["schemas"]["OperatorInfo"];
export type OperatorCapabilities = components["schemas"]["OperatorCapabilities"];

export type AuthExchangeRequest = components["schemas"]["AuthExchangeRequest"];
export type AuthExchangeResponse = components["schemas"]["AuthExchangeResponse"];

export type RunNodeRequest = components["schemas"]["RunNodeRequest"];
export type RunNodeResponse = components["schemas"]["RunNodeResponse"];
export type RunTriggerRequest = components["schemas"]["RunTriggerRequest"];
export type RunTriggerResponse = components["schemas"]["RunTriggerResponse"];

export type HealthStatus = components["schemas"]["HealthStatus"];
export type Problem = components["schemas"]["Problem"];
export type PageInfo = components["schemas"]["PageInfo"];

// Common scalar aliases.
export type Ulid = components["schemas"]["Ulid"];
export type EthereumAddress = components["schemas"]["EthereumAddress"];
export type Hex = components["schemas"]["Hex"];
export type ChainId = components["schemas"]["ChainId"];
export type Timestamp = components["schemas"]["Timestamp"];
