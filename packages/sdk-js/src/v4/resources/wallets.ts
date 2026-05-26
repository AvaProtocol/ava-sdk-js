import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

export class WalletsResource {
  constructor(private readonly transport: Transport) {}

  /** GET /wallets */
  list(): Promise<v4.WalletList> {
    return this.transport.request<v4.WalletList>({ path: "/wallets" });
  }

  /**
   * POST /wallets — idempotent "ensure exists". Derives the CREATE2
   * address from (owner, salt, factory) and persists the record.
   */
  create(req: v4.CreateWalletRequest): Promise<v4.Wallet> {
    return this.transport.request<v4.Wallet>({
      path: "/wallets",
      method: "POST",
      body: req,
    });
  }

  /**
   * PATCH /wallets/{address} — partial update. Today the only
   * mutable field is `isHidden`.
   */
  update(address: string, body: { isHidden?: boolean }): Promise<v4.Wallet> {
    return this.transport.request<v4.Wallet>({
      path: `/wallets/${encodeURIComponent(address)}`,
      method: "PATCH",
      body,
    });
  }

  /** POST /wallets/{address}:withdraw — UserOp-driven withdraw. */
  withdraw(address: string, req: v4.WithdrawRequest): Promise<v4.WithdrawResponse> {
    return this.transport.request<v4.WithdrawResponse>({
      path: `/wallets/${encodeURIComponent(address)}:withdraw`,
      method: "POST",
      body: req,
    });
  }

  /** GET /wallets/{address}:getNonce */
  getNonce(address: string): Promise<v4.NonceResponse> {
    return this.transport.request<v4.NonceResponse>({
      path: `/wallets/${encodeURIComponent(address)}:getNonce`,
    });
  }
}
