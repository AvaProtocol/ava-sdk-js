import type { v4 } from "@avaprotocol/types";

import { assert7702ChainId } from "../eoa7702";
import { Transport } from "../internal/transport";

/**
 * `client.wallets.*` — smart-wallet CRUD, the UserOp-driven withdraw
 * action, and EIP-7702 EOA delegation (Track B).
 *
 * A derived wallet is an ERC-6900 / ERC-4337 smart account from
 * `(owner, factory, salt)`. `create` never makes an EOA and never
 * writes `kind: eoa_7702` — that record comes from
 * {@link prepareDelegation} / {@link submitDelegation} after K13.
 *
 * **Auth:**
 * - `list` / `create` (preview resolve) — user JWT **or** partner
 *   assertion (`scope: read`, `sub` = owner EOA)
 * - update / withdraw / nonce / delegation — user JWT only
 *   (partner assertions are refused on 7702)
 */
export class WalletsResource {
  constructor(private readonly transport: Transport) {}

  /**
   * GET /wallets — every smart wallet owned by the authenticated
   * EOA (JWT subject, or partner assertion `sub`).
   *
   * Hidden wallets (`isHidden=true`) are excluded by default. The
   * response is an envelope `{ data: Wallet[] }`, not a bare array.
   *
   * Wallet records are per chain, so the listing is too. `chainId` is
   * optional: omitted, the gateway uses the JWT's `aud` chain, then its
   * own default. Passing it lets one token read another chain's wallets
   * without a second signature — the JWT proves EOA ownership, which is
   * chain-independent.
   */
  list(opts?: { chainId?: number }): Promise<v4.WalletList> {
    return this.transport.request<v4.WalletList>({
      path: "/wallets",
      query: opts,
    });
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
   *
   * Preview-friendly: partner assertion with EOA `sub` is accepted
   * without a user JWT.
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

  /**
   * POST /wallets/{eoa}/delegation:prepare — EIP-7702 authorization
   * the owner signs. Not a session grant; do not send this payload to
   * `policies.prepare`.
   *
   * `delegate` is always SMA-7702. `nonce` is the EOA's pending nonce
   * (aggregator-broadcast, not `nonce+1`). `chainId=0` is refused.
   * First chains: Sepolia and Base. Partner assertions are refused.
   */
  prepareDelegation(
    address: string,
    opts?: { chainId?: number },
  ): Promise<v4.PreparedDelegation> {
    assert7702ChainId(opts?.chainId);
    return this.transport.request<v4.PreparedDelegation>({
      path: `/wallets/${encodeURIComponent(address)}/delegation:prepare`,
      method: "POST",
      body: opts?.chainId !== undefined ? { chainId: opts.chainId } : {},
    });
  }

  /**
   * POST /wallets/{eoa}/delegation:submit — broadcast the signed
   * authorization and persist `kind=eoa_7702` once K13 matches.
   *
   * `200` + `delegated` — designation is visible. `202` + `pending` —
   * type-4 was sent; **poll {@link getDelegation}, do not resubmit**
   * (EOA nonce is unchanged; a second broadcast spends controller gas).
   * Receipt status is not evidence. Stale nonce is `DELEGATION_STALE_NONCE`.
   */
  submitDelegation(
    address: string,
    req: v4.SubmitDelegationRequest,
  ): Promise<v4.DelegationStatus> {
    assert7702ChainId(req.chainId);
    return this.transport.request<v4.DelegationStatus>({
      path: `/wallets/${encodeURIComponent(address)}/delegation:submit`,
      method: "POST",
      body: req,
    });
  }

  /**
   * GET /wallets/{eoa}/delegation — K13 code read (`missing` or
   * `delegated`). When `delegated`, the gateway upserts the eoa_7702
   * wallet row so a 202 becomes grantable without a second submit.
   */
  getDelegation(
    address: string,
    opts?: { chainId?: number },
  ): Promise<v4.DelegationStatus> {
    assert7702ChainId(opts?.chainId);
    return this.transport.request<v4.DelegationStatus>({
      path: `/wallets/${encodeURIComponent(address)}/delegation`,
      query: opts,
    });
  }

  /**
   * Prepare, sign, submit. On `pending`, poll GET until `delegated`.
   * Never resubmits.
   *
   * Workflows that should spend from the EOA must name this runner;
   * the gateway does not fall back from an empty derived SW. Execute
   * still requires `eoa_7702_execute: true` on the gateway.
   */
  async delegate(
    address: string,
    opts: { chainId?: number } | undefined,
    sign: (prepared: v4.PreparedDelegation) => Promise<string>,
    poll?: { intervalMs?: number; timeoutMs?: number },
  ): Promise<v4.DelegationStatus> {
    const prepared = await this.prepareDelegation(address, opts);
    const signature = await sign(prepared);
    const submitted = await this.submitDelegation(address, {
      chainId: prepared.chainId,
      nonce: prepared.nonce,
      signature,
    });
    if (submitted.status !== "pending") {
      return submitted;
    }
    const intervalMs = poll?.intervalMs ?? 2_000;
    const timeoutMs = poll?.timeoutMs ?? 60_000;
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, intervalMs));
      const status = await this.getDelegation(address, {
        chainId: prepared.chainId,
      });
      if (status.status !== "pending") {
        return status;
      }
    }
    return submitted;
  }
}
