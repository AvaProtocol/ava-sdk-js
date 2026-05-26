export * from "./auth";
export * from "./enums";
export * from "./node";
export * from "./token";
export * from "./trigger";
export * from "./workflow";
export * from "./api";
export * from "./shared";
export * from "./abi";

// v4 (REST) types — namespaced so they don't collide with the v3
// exports above. Use as `import { v4 } from '@avaprotocol/types'` or
// pull individual aliases via `import type { v4 } from
// '@avaprotocol/types'; type Wf = v4.Workflow`.
export * as v4 from "./v4";

// Export the new structured response types
export type {
  CreateSecretResponse,
  UpdateSecretResponse,
  DeleteSecretResponse,
  DeleteTaskResponse,
  GetExecutionStatsResponse,
  GetExecutionStatsOptions,
  TriggerWorkflowResponse,
  ExecutionStep,
  WithdrawFundsRequest,
  WithdrawFundsResponse,
  // Fee estimation types
  EstimateFeesRequest,
  EstimateFeesResponse,
  Fee,
  FeeUnit,
  NativeToken,
  NodeCOGS,
  ValueFee,
  FeeDiscount,
} from "./api";
