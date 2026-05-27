import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/**
 * `client.operators.*` — read-only view of the operator pool the
 * gateway is currently dispatching to. Used by dashboards and the
 * Studio sidebar's network-health widget; not part of the workflow
 * lifecycle.
 */
export class OperatorsResource {
  constructor(private readonly transport: Transport) {}

  /**
   * GET /operators — every operator currently connected to the
   * gateway, plus their advertised capabilities (block / time /
   * event monitoring) and the timestamp of their last heartbeat.
   *
   * An empty array means no operators are connected — workflows will
   * still accept, but won't execute until at least one operator
   * comes online.
   */
  list(): Promise<v4.OperatorList> {
    return this.transport.request<v4.OperatorList>({ path: "/operators" });
  }
}
