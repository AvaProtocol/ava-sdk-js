import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/**
 * `client.tokens.*` — ERC-20 metadata resolution backed by the
 * aggregator's curated whitelist plus an on-chain `name/symbol/decimals`
 * fallback. Used by the Studio token-picker, transfer-preview UI, and
 * the notification cost-line renderer.
 */
export class TokensResource {
  constructor(private readonly transport: Transport) {}

  /**
   * GET /tokens/{address} — resolve a token by contract address.
   *
   * Returns `{ found: false, address }` (not 404) when the token
   * isn't on the whitelist and the on-chain probe also fails — the
   * partial response keeps the caller's UI from breaking on
   * unrecognized tokens.
   *
   * `opts.chainId` picks which chain's whitelist + RPC to consult.
   * Omit it to fall back to the JWT's `aud` chain (the gateway's
   * default chain context for the authenticated user).
   */
  retrieve(address: string, opts?: { chainId?: number }): Promise<v4.TokenMetadataResponse> {
    return this.transport.request<v4.TokenMetadataResponse>({
      path: `/tokens/${encodeURIComponent(address)}`,
      query: opts,
    });
  }
}
