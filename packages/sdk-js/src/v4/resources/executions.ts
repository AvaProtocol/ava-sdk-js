import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

export interface ListExecutionsParams {
  /** Required for the flat list endpoint; pass one or more workflowIds. */
  workflowId?: string[];
  chainId?: number;
  before?: string;
  after?: string;
  limit?: number;
}

export interface CountExecutionsParams {
  workflowId?: string[];
  chainId?: number;
}

export interface ExecutionStatsParams {
  workflowId?: string[];
  chainId?: number;
}

export interface RetrieveExecutionParams {
  /**
   * Workflow id the execution belongs to. Required because executions
   * are stored under their parent workflow's chain-scoped prefix in
   * BadgerDB — there is no global execution index.
   */
  workflowId: string;
}

export interface StreamExecutionParams {
  workflowId: string;
  /** Poll interval as a Go-style duration. Defaults to `1s`. */
  interval?: string;
  /** Optional AbortSignal to close the stream early. */
  signal?: AbortSignal;
}

export class ExecutionsResource {
  constructor(private readonly transport: Transport) {}

  /** GET /executions */
  list(params: ListExecutionsParams): Promise<v4.ExecutionList> {
    return this.transport.request<v4.ExecutionList>({
      path: "/executions",
      query: params,
    });
  }

  /** GET /workflows/{id}/executions — convenience nested form. */
  listForWorkflow(
    workflowId: string,
    params?: { before?: string; after?: string; limit?: number },
  ): Promise<v4.ExecutionList> {
    return this.transport.request<v4.ExecutionList>({
      path: `/workflows/${encodeURIComponent(workflowId)}/executions`,
      query: params,
    });
  }

  /** GET /executions/{id}?workflowId=... */
  retrieve(id: string, params: RetrieveExecutionParams): Promise<v4.Execution> {
    return this.transport.request<v4.Execution>({
      path: `/executions/${encodeURIComponent(id)}`,
      query: { workflowId: params.workflowId },
    });
  }

  /** GET /executions/{id}:getStatus?workflowId=... */
  getStatus(id: string, params: RetrieveExecutionParams): Promise<v4.ExecutionStatusSummary> {
    return this.transport.request<v4.ExecutionStatusSummary>({
      path: `/executions/${encodeURIComponent(id)}:getStatus`,
      query: { workflowId: params.workflowId },
    });
  }

  /** GET /executions:count */
  count(params?: CountExecutionsParams): Promise<v4.ExecutionCount> {
    return this.transport.request<v4.ExecutionCount>({
      path: "/executions:count",
      query: params,
    });
  }

  /** GET /executions:stats */
  stats(params?: ExecutionStatsParams): Promise<v4.ExecutionStats> {
    return this.transport.request<v4.ExecutionStats>({
      path: "/executions:stats",
      query: params,
    });
  }

  /**
   * GET /executions/{id}:stream — yields one `ExecutionStatusSummary`
   * per status change. The stream closes on terminal status, when
   * `signal` aborts, or when the connection drops. Implementation
   * uses fetch streaming + a minimal SSE parser so it works in Node
   * 20+ and browsers without an external EventSource polyfill.
   */
  async *stream(
    id: string,
    params: StreamExecutionParams,
  ): AsyncGenerator<v4.ExecutionStatusSummary, void, undefined> {
    const response = await this.transport.stream({
      path: `/executions/${encodeURIComponent(id)}:stream`,
      query: { workflowId: params.workflowId, interval: params.interval },
      headers: { Accept: "text/event-stream" },
      signal: params.signal,
      // SSE streams are long-lived — disable the default per-request
      // timeout so we don't kill the stream after 30s. The caller's
      // signal is the right cancellation channel.
      timeoutMs: 0,
    });
    if (!response.body) {
      throw new Error("SSE response has no body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) return;
        buffer += decoder.decode(value, { stream: true });
        // SSE frames are separated by a blank line.
        let idx = buffer.indexOf("\n\n");
        while (idx !== -1) {
          const frame = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          const data = parseSSEData(frame);
          if (data !== null) {
            yield JSON.parse(data) as v4.ExecutionStatusSummary;
          }
          idx = buffer.indexOf("\n\n");
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Poll-and-wait helper — yields the final ExecutionStatusSummary
   * once the execution reaches a terminal status. Use `stream()`
   * when you want every intermediate status update.
   */
  async waitForTerminal(
    id: string,
    params: StreamExecutionParams,
  ): Promise<v4.ExecutionStatusSummary> {
    let last: v4.ExecutionStatusSummary | undefined;
    for await (const event of this.stream(id, params)) {
      last = event;
      if (event.status === "success" || event.status === "failed" || event.status === "error") {
        return event;
      }
    }
    if (!last) {
      throw new Error(`execution ${id} stream ended without a status event`);
    }
    return last;
  }
}

/**
 * Extract the `data:` payload from one SSE frame. Returns null when
 * the frame is a heartbeat / comment / lacks a data line.
 */
function parseSSEData(frame: string): string | null {
  const lines = frame.split("\n");
  const data: string[] = [];
  for (const line of lines) {
    if (line.startsWith("data:")) {
      data.push(line.slice(5).trimStart());
    }
  }
  return data.length === 0 ? null : data.join("\n");
}
