import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/** `client.health.check()` — liveness probe; no auth required. */
export class HealthResource {
  constructor(private readonly transport: Transport) {}

  check(): Promise<v4.HealthStatus> {
    return this.transport.request<v4.HealthStatus>({ path: "/health" });
  }
}
