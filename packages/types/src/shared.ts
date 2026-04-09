import * as avs_pb from "@/grpc_codegen/avs_pb";

export type Environment = "production" | "development" | "staging";
export const AUTH_KEY_HEADER = "authkey";
export const DEFAULT_LIMIT = 10;

export type SmartWallet = avs_pb.SmartWallet.AsObject & {
  totalTaskCount?: number;
  enabledTaskCount?: number;
  completedTaskCount?: number;
  failedTaskCount?: number;
  disabledTaskCount?: number;
};
export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export type SecretProps = {
  name: string;
  secret?: string;
  workflowId?: string;
  orgId?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
  description?: string;
};

export type TriggerDataProps = {
  type: any;
  blockNumber?: number;
  timestamp?: number;
  data?: string | number | boolean | Record<string, unknown> | unknown[] | null;
  headers?: Record<string, string>;
  pathParams?: Record<string, string>;
  inputVariables?: Record<string, unknown>;
};

// Input variables type for workflow execution
export type InputVariables = Record<string, unknown>;

// MethodCall interface for enhanced event data formatting
// Used by both triggers and nodes for contract interactions
export interface MethodCallType {
  /** Method name (e.g., "decimals"). */
  methodName: string;
  /** Method parameters array (replaces need for callData generation). */
  methodParams: string[];
  /**
   * Fields to apply the method's return value to (e.g., decimal-format
   * `["latestRoundData.answer"]` for a Chainlink read, or
   * `["AnswerUpdated.current"]` for a Chainlink event trigger).
   *
   * @remarks
   * **Do not use for ERC-20 `Transfer` events.** As of EigenLayer-AVS
   * PR #509, the operator's shared event enrichment always publishes a
   * `valueFormatted` key alongside the raw `value` on Transfer event
   * trigger output when token decimals are known. Setting
   * `applyToFields: ["Transfer.value"]` is redundant in that case and
   * may double-format. Read the `valueFormatted` field from the trigger
   * output directly instead.
   *
   * This field remains the correct and supported mechanism for every
   * other use case — Chainlink AnswerUpdated `current`/`answer`, ERC-20
   * `totalSupply`, generic contract read fields, etc. — where shared
   * enrichment does not pre-compute a formatted value.
   */
  applyToFields?: string[];
  /** Hex-encoded calldata for the method (used when methodParams is not provided). */
  callData?: string;
}
