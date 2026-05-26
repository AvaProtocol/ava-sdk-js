import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

export class OperatorsResource {
  constructor(private readonly transport: Transport) {}

  /** GET /operators — connected operators + capabilities. */
  list(): Promise<v4.OperatorList> {
    return this.transport.request<v4.OperatorList>({ path: "/operators" });
  }
}
