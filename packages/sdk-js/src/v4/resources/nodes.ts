import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/**
 * `client.nodes.*` — execute a single node definition in isolation,
 * without persisting a workflow. Used by the Studio UI's per-node
 * "Run once" affordance and by SDK test suites that exercise a node
 * shape against a live gateway.
 */
export class NodesResource {
  constructor(private readonly transport: Transport) {}

  /**
   * POST /nodes:run — execute one node against inline `inputVariables`.
   *
   * The request shape mirrors a single entry from `workflows.simulate`:
   * a complete node definition + the variables the node would have seen
   * inside a workflow. The gateway runs the node in-process (no worker
   * delegation, no persistence) and returns the raw output keyed by
   * node type — `{ success, output: { <nodeType>: {...} } }`.
   *
   * Chain context: the gateway resolves the target chain in this order:
   * `body.chainId` → `inputVariables.settings.chain_id` → the JWT's
   * `aud` claim → the gateway's default chain. Specify `chainId`
   * explicitly when calling a contract that lives on a non-default
   * chain (e.g. a sepolia oracle when the gateway defaults to mainnet).
   */
  run(req: v4.RunNodeRequest): Promise<v4.RunNodeResponse> {
    return this.transport.request<v4.RunNodeResponse>({
      path: "/nodes:run",
      method: "POST",
      body: req,
    });
  }
}
