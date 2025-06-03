import * as avs_pb from "@/grpc_codegen/avs_pb";
export * from "./auth";
export * from "./enums";
export * from "./node";
export * from "./trigger";
export * from "./workflow";
export {
  SmartWallet,
  GetWalletRequest,
  ClientOption,
  PageInfo,
  SecretProps,
  Environment,
  AUTH_KEY_HEADER,
  DEFAULT_LIMIT,
  RequestOptions,
  GetExecutionsOptions,
  GetWorkflowsOptions,
  RunNodeWithInputsRequest,
  RunNodeWithInputsResponse,
  RunTriggerRequest,
  RunTriggerResponse,
  GetSecretsOptions,
  SecretOptions,
  TriggerDataProps,
  SimulateWorkflowRequest
} from "./shared";

export type StepProps = {
  id: string;
  type: string;
  name: string;
  success: boolean;
  error: string;
  log: string;
  inputsList: string[];
  output: any;
  startAt: number;
  endAt: number;
};

export type OutputDataProps =
  | any
  | { blockNumber: number }
  | { timestamp: number; timestampIso: string }
  | undefined;

export type ExecutionProps = {
  id: string;
  startAt: number;
  endAt: number;
  success: boolean;
  error: string;
  steps: any[];
};
