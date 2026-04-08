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
   * `["current", "answer"]` for a Chainlink AnswerUpdated event).
   *
   * @deprecated For ERC-20 `Transfer` events, prefer the auto-populated
   * `valueFormatted` field on the trigger output instead of
   * `applyToFields: ["Transfer.value"]`. As of EigenLayer-AVS PR #509
   * (release v1.x), the operator's shared event enrichment always
   * publishes a `valueFormatted` key alongside the raw `value` for
   * Transfer events when token decimals are known. Using `applyToFields`
   * for `Transfer.value` is now redundant and may double-format. This
   * field remains the correct mechanism for non-Transfer events whose
   * formatting is not handled by shared enrichment (e.g., Chainlink
   * AnswerUpdated `current`/`answer`).
   */
  applyToFields?: string[];
  /** Hex-encoded calldata for the method (used when methodParams is not provided). */
  callData?: string;
}
