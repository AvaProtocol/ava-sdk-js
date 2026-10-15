import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/** Per-request options for {@link NodesResource.run}. */
export interface RunNodeOptions {
  /**
   * Optional idempotency key, sent as the `Idempotency-Key` HTTP header.
   *
   * A retried or double-submitted request carrying the same key returns the
   * first result instead of executing again — for a real execute
   * (`isSimulated: false`) that means it can't broadcast a second UserOp.
   * Generate a fresh key per user-initiated action (e.g. one per Confirm
   * click) and reuse it across retries of that same action. The gateway
   * dedupes per authenticated subject for a short TTL.
   *
   * A falsy value (empty string / undefined) is treated as "no key" — the
   * header is simply omitted, not sent empty.
   */
  idempotencyKey?: string;
}

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
   * Chain context: the request-level `chainId` names the chain the node
   * runs on. The gateway pushes it into `settings.chain_id` (the per-chain
   * smart-wallet config and the runner lookup read that) and stamps it onto
   * a chain-aware node whose `config.chainId` is unset
   * (`stampNodeChainIfUnset`). When the request carries no `chainId`, the
   * gateway falls back to the JWT's `aud` chain — the chain the wallet
   * signed in on (`handlers_nodes.go`). So a JWT minted on one chain can
   * run a node on another only if the request names that chain; without it,
   * a node whose own `config.chainId` differs from the `aud` chain runs
   * with the wrong chain context. There is no `settings.chain_id` fallback
   * and no gateway default. The chain must be one of the configured set
   * (Ethereum, Base, Sepolia, Base Sepolia) or the call is rejected.
   *
   * Simulation vs. execution: by default a `contractWrite` node is
   * Tenderly-simulated. Set the node's `isSimulated: false` to execute for
   * real through the smart wallet — fund-moving requires a user Bearer JWT.
   * Partner assertions do not authorize `nodes:run` (JWT required even for
   * simulated runs). For a real execute, pass an
   * {@link RunNodeOptions.idempotencyKey} so a retried Confirm can't broadcast
   * twice.
   */
  run(
    req: v4.RunNodeRequest,
    options?: RunNodeOptions,
  ): Promise<v4.RunNodeResponse> {
    return this.transport.request<v4.RunNodeResponse>({
      path: "/nodes:run",
      method: "POST",
      body: req,
      headers: options?.idempotencyKey
        ? { "Idempotency-Key": options.idempotencyKey }
        : undefined,
    });
  }
}
