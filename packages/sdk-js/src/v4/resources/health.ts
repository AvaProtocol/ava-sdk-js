import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/**
 * `client.health.*` — gateway liveness + version probes.
 *
 * Anonymous (no Bearer token required) — safe to call from
 * unauthenticated browser code or external monitors.
 */
export class HealthResource {
  constructor(private readonly transport: Transport) {}

  /**
   * GET /health — returns `{ status, chainId, version }` when the
   * gateway is up. Use for liveness checks; do not rely on it for
   * deep readiness (it doesn't probe worker connectivity).
   */
  check(): Promise<v4.HealthStatus> {
    return this.transport.request<v4.HealthStatus>({ path: "/health" });
  }
}
