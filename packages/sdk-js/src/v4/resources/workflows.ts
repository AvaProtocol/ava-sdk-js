import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/**
 * `client.workflows.*` — REST counterpart to the v3 createWorkflow /
 * getWorkflow / etc. methods. Resource-grouped (Stripe style); the
 * verbs come from the HTTP method, not the resource name.
 *
 * Custom actions follow Google AIP-136 colon-suffix convention:
 *   pause(id)     -> POST /workflows/{id}:pause
 *   simulate(req) -> POST /workflows:simulate
 */
export interface ListWorkflowsParams {
  /** Filter by smart wallet address. Repeat to OR multiple addresses. */
  smartWalletAddress?: string[];
  /** Filter by status. Repeat to OR multiple statuses. */
  status?: v4.WorkflowStatus[];
  chainId?: number;
  before?: string;
  after?: string;
  limit?: number;
}

export interface CountWorkflowsParams {
  smartWalletAddress?: string[];
  status?: v4.WorkflowStatus[];
  chainId?: number;
}

export class WorkflowsResource {
  constructor(private readonly transport: Transport) {}

  /** POST /workflows */
  create(req: v4.CreateWorkflowRequest): Promise<v4.Workflow> {
    return this.transport.request<v4.Workflow>({
      path: "/workflows",
      method: "POST",
      body: req,
    });
  }

  /** GET /workflows */
  list(params?: ListWorkflowsParams): Promise<v4.WorkflowList> {
    return this.transport.request<v4.WorkflowList>({
      path: "/workflows",
      query: params,
    });
  }

  /** GET /workflows/{id} */
  retrieve(id: string): Promise<v4.Workflow> {
    return this.transport.request<v4.Workflow>({
      path: `/workflows/${encodeURIComponent(id)}`,
    });
  }

  /**
   * DELETE /workflows/{id} — cancel is the public verb in v4
   * (Stripe convention) even though the engine removes the record.
   */
  cancel(id: string): Promise<void> {
    return this.transport.request<void>({
      path: `/workflows/${encodeURIComponent(id)}`,
      method: "DELETE",
    });
  }

  /** POST /workflows/{id}:pause */
  pause(id: string): Promise<v4.Workflow> {
    return this.transport.request<v4.Workflow>({
      path: `/workflows/${encodeURIComponent(id)}:pause`,
      method: "POST",
    });
  }

  /** POST /workflows/{id}:resume */
  resume(id: string): Promise<v4.Workflow> {
    return this.transport.request<v4.Workflow>({
      path: `/workflows/${encodeURIComponent(id)}:resume`,
      method: "POST",
    });
  }

  /** POST /workflows/{id}:trigger */
  trigger(id: string, req: v4.TriggerWorkflowRequest): Promise<v4.TriggerWorkflowResponse> {
    return this.transport.request<v4.TriggerWorkflowResponse>({
      path: `/workflows/${encodeURIComponent(id)}:trigger`,
      method: "POST",
      body: req,
    });
  }

  /** POST /workflows:simulate — runs without persisting. */
  simulate(req: v4.SimulateWorkflowRequest): Promise<v4.Execution> {
    return this.transport.request<v4.Execution>({
      path: "/workflows:simulate",
      method: "POST",
      body: req,
    });
  }

  /** POST /workflows:estimateFees */
  estimateFees(req: v4.EstimateFeesRequest): Promise<v4.EstimateFeesResponse> {
    return this.transport.request<v4.EstimateFeesResponse>({
      path: "/workflows:estimateFees",
      method: "POST",
      body: req,
    });
  }

  /** GET /workflows:count */
  count(params?: CountWorkflowsParams): Promise<v4.WorkflowCount> {
    return this.transport.request<v4.WorkflowCount>({
      path: "/workflows:count",
      query: params,
    });
  }
}
