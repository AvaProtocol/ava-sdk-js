import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

export class TriggersResource {
  constructor(private readonly transport: Transport) {}

  /** POST /triggers:run — evaluate a trigger config against inline input. */
  run(req: v4.RunTriggerRequest): Promise<v4.RunTriggerResponse> {
    return this.transport.request<v4.RunTriggerResponse>({
      path: "/triggers:run",
      method: "POST",
      body: req,
    });
  }
}
