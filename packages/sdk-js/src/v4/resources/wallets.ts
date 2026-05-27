import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/**
 * `client.wallets.*` — smart-wallet CRUD plus the UserOp-driven
 * withdraw action. A "wallet" here is an ERC-6900 / ERC-4337 smart
 * account derived deterministically from `(owner, factory, salt)` —
 * the SDK never creates an EOA, it ensures-and-registers smart
 * accounts owned by the authenticated user's EOA.
 *
 * All endpoints require auth and operate on wallets owned by the
 * JWT's subject EOA.
 */
export class WalletsResource {
  constructor(private readonly transport: Transport) {}

  /**
   * GET /wallets — every smart wallet owned by the authenticated
   * EOA on the JWT's audience chain.
   *
   * Hidden wallets (`isHidden=true`) are excluded by default. The
   * response is an envelope `{ data: Wallet[] }`, not a bare array.
   */
  list(): Promise<v4.WalletList> {
    return this.transport.request<v4.WalletList>({ path: "/wallets" });
  }

  /**
   * POST /wallets — idempotent "ensure exists". Derives the CREATE2
   * address from `(owner, salt, factory)` and persists the record;
   * calling twice with the same triple returns the same address.
   *
   * The on-chain account is **not** deployed by this call — deployment
   * happens lazily as part of the first UserOp (workflow execution or
   * `withdraw`) via the `initCode` field, so the smart wallet costs
   * zero gas until it's first used.
   *
   * Per-owner cap is enforced by `max_wallets_per_owner` in the
   * aggregator config; the call returns 429 `WALLETS_LIMIT_REACHED`
   * when exceeded.
   */
  create(req: v4.CreateWalletRequest): Promise<v4.Wallet> {
    return this.transport.request<v4.Wallet>({
      path: "/wallets",
      method: "POST",
      body: req,
    });
  }

  /**
   * PATCH /wallets/{address} — partial update. The only mutable
   * field today is `isHidden`, used by the Studio UI's hide/unhide
   * wallet action. Keyed by **address**, not salt — callers that
   * still think in salts must look up the address first via
   * `create({ salt })`.
   */
  update(address: string, body: { isHidden?: boolean }): Promise<v4.Wallet> {
    return this.transport.request<v4.Wallet>({
      path: `/wallets/${encodeURIComponent(address)}`,
      method: "PATCH",
      body,
    });
  }

  /**
   * POST /wallets/{address}:withdraw — transfer ETH or an ERC-20 out
   * of the smart wallet via a UserOp through the bundler + paymaster.
   *
   * Per-chain config (bundler URL, paymaster address, RPC) is resolved
   * by the gateway from the JWT's `aud` claim or `body.chainId`.
   * The response's `status` is one of `pending | confirmed | failed`:
   * `confirmed` means the bundler returned a receipt synchronously,
   * `pending` means it accepted the UserOp but the receipt hasn't
   * landed yet, `failed` means the bundler rejected the op or it
   * reverted before inclusion.
   */
  withdraw(address: string, req: v4.WithdrawRequest): Promise<v4.WithdrawResponse> {
    return this.transport.request<v4.WithdrawResponse>({
      path: `/wallets/${encodeURIComponent(address)}:withdraw`,
      method: "POST",
      body: req,
    });
  }

  /**
   * GET /wallets/{address}:getNonce — current AA nonce for the wallet.
   *
   * Used when an external signer needs to assemble a UserOp outside
   * the SDK's bundler path. Most callers don't need this directly —
   * `workflows.simulate` and `wallets.withdraw` handle nonce sourcing
   * internally.
   */
  getNonce(address: string): Promise<v4.NonceResponse> {
    return this.transport.request<v4.NonceResponse>({
      path: `/wallets/${encodeURIComponent(address)}:getNonce`,
    });
  }
}
