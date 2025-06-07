import { NodeProps } from "./node";
import { TriggerProps } from "./trigger";
import { EdgeProps } from "./workflow";

export interface GetWalletRequest {
  salt: string;
  factoryAddress?: string;
}
export interface ClientOption {
  endpoint: string;
  factoryAddress?: string;
  timeout?: number;
}

export interface RequestOptions {
  authKey?: string;
  timeout?: number;
}
export interface GetExecutionsOptions extends RequestOptions {
  before?: string;
  after?: string;
  limit?: number;
}
export interface GetWorkflowsOptions extends RequestOptions {
  before?: string;
  after?: string;
  limit?: number;
  includeNodes?: boolean;
  includeEdges?: boolean;
}
export interface GetSecretsOptions extends RequestOptions {
  workflowId?: string;
  orgId?: string;
  before?: string;
  after?: string;
  limit?: number;
  // Field control options for flexible response content
  includeTimestamps?: boolean; // Include created_at and updated_at fields
  includeCreatedBy?: boolean; // Include created_by field
  includeDescription?: boolean; // Include description field
}
export interface SecretOptions extends RequestOptions {
  name: string;
  value: string;
  workflowId?: string;
  orgId?: string;
}

export interface RunNodeWithInputsRequest {
  nodeType: string;
  nodeConfig: Record<string, any>;
  inputVariables?: Record<string, any>;
}

export interface RunNodeWithInputsResponse {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
  executionId?: string;
  nodeId?: string;
}

export interface RunTriggerRequest {
  triggerType: string;
  triggerConfig: Record<string, any>;
}

export interface RunTriggerResponse {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
  triggerId?: string;
}

export interface SimulateWorkflowRequest {
  trigger: TriggerProps;
  nodes: Array<NodeProps>;
  edges: Array<EdgeProps>;
  inputVariables?: Record<string, any>;
}
