import type { v4 } from "@avaprotocol/types";

import { signAuthMessage } from "../auth";
import { Transport } from "../internal/transport";

/**
 * `client.auth.*` — JWT exchange for the REST API.
 *
 * The aggregator's POST /auth:exchange takes (ownerAddress, signature,
 * message) and returns a JWT bound to the EOA. The SDK keeps the JWT
 * on the shared transport so subsequent requests carry it as a
 * Bearer token automatically.
 */
export class AuthResource {
  constructor(private readonly transport: Transport) {}

  /**
   * POST /auth:exchange — verify an EIP-191 signature and stash the
   * returned JWT on the transport. Returns the raw response so
   * callers can persist the token externally (browser localStorage,
   * keychain, etc.).
   */
  async exchange(req: v4.AuthExchangeRequest): Promise<v4.AuthExchangeResponse> {
    const resp = await this.transport.request<v4.AuthExchangeResponse>({
      path: "/auth:exchange",
      method: "POST",
      body: req,
    });
    if (resp.token) {
      this.transport.setToken(resp.token);
    }
    return resp;
  }

  /**
   * Convenience wrapper: sign the canonical message with a private
   * key, exchange it, and return the JWT. The exchanged token is
   * stashed on the transport. Designed for Node tooling — browser
   * callers should use `buildAuthMessage` + a wallet's
   * `personal_sign` and then call `exchange()` directly.
   *
   * `uri`, `chainId`, and `version` are required for the same reasons
   * as `buildAuthMessage` — silent defaults would lie about the origin
   * the user is signing for, mis-route wallet RPCs, or hide which
   * gateway minted the JWT. `version` is the gateway binary version;
   * the simplest source is the `version` field returned by
   * `client.health.check()`. `uri` is the calling origin (the studio
   * URL the user is on right now).
   */
  async exchangeWithKey(
    privateKey: string,
    opts: { ownerAddress?: string; uri: string; chainId: number; version: string },
  ): Promise<v4.AuthExchangeResponse> {
    const signed = await signAuthMessage(privateKey, opts);
    return this.exchange({
      ownerAddress: signed.ownerAddress,
      signature: signed.signature,
      message: signed.message,
    });
  }

  /**
   * Forget the currently-stored JWT. Future requests fall back to
   * anonymous and most endpoints will return 401.
   */
  clear(): void {
    this.transport.setToken(undefined);
  }
}
