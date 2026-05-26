import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

export class NodesResource {
  constructor(private readonly transport: Transport) {}

  /** POST /nodes:run — execute a single node against inline input. */
  run(req: v4.RunNodeRequest): Promise<v4.RunNodeResponse> {
    return this.transport.request<v4.RunNodeResponse>({
      path: "/nodes:run",
      method: "POST",
      body: req,
    });
  }
}
