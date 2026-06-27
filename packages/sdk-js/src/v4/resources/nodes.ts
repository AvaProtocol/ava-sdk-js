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
   * Chain context: the chain is **explicit-or-error** since the chain
   * decoupling — there is no `settings.chain_id` / JWT-`aud` / default
   * fallback. For a chain-aware node, set either the request-level
   * `chainId` or the node's own `config.chainId`; the gateway stamps the
   * request chain onto the node when the node leaves it unset
   * (`stampNodeChainIfUnset`). The chain must be one of the configured
   * set (Ethereum, Base, Sepolia, Base Sepolia) or the call is rejected.
   */
  run(req: v4.RunNodeRequest): Promise<v4.RunNodeResponse> {
    return this.transport.request<v4.RunNodeResponse>({
      path: "/nodes:run",
      method: "POST",
      body: req,
    });
  }
}
