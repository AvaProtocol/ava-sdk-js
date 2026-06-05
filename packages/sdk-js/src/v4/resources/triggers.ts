import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/**
 * `client.triggers.*` — evaluate a trigger config in isolation,
 * mirroring the per-node `nodes.run` shape. Use when designing or
 * debugging a trigger before wiring it into a full workflow — e.g.
 * confirming that an `eventTrigger` topic filter matches a known
 * historical event, or that a cron expression parses.
 */
export class TriggersResource {
  constructor(private readonly transport: Transport) {}

  /**
   * POST /triggers:run — evaluate a trigger config against inline
   * input and return the same shape an executor would see.
   *
   * For event triggers, the gateway uses Tenderly to simulate a
   * matching event log against the request's `addresses` + `topics`
   * filter, then returns the decoded log under `output.data` and
   * the raw log under `output.metadata`.
   *
   * For time-based triggers (cron, fixedTime, block), the response
   * carries the next scheduled fire time / block height.
   *
   * No workflow record is created and no execution is persisted.
   */
  run(req: v4.RunTriggerRequest): Promise<v4.RunTriggerResponse> {
    return this.transport.request<v4.RunTriggerResponse>({
      path: "/triggers:run",
      method: "POST",
      body: req,
    });
  }
}
