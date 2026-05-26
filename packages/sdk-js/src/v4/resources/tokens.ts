import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

export class TokensResource {
  constructor(private readonly transport: Transport) {}

  /**
   * GET /tokens/{address} — returns `{ found: false }` (not 404)
   * when the token is not in the aggregator's whitelist and the
   * on-chain fallback fails. Partial info (the address) is still
   * useful to callers.
   */
  retrieve(address: string, opts?: { chainId?: number }): Promise<v4.TokenMetadataResponse> {
    return this.transport.request<v4.TokenMetadataResponse>({
      path: `/tokens/${encodeURIComponent(address)}`,
      query: opts,
    });
  }
}
