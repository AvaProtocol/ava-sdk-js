import type { v4 } from "@avaprotocol/types";

import { Transport } from "../internal/transport";

/**
 * Signs an EIP-712 payload and returns a 65-byte `0x…` signature.
 *
 * This is the wallet's `eth_signTypedData_v4`. It is passed in rather than
 * built here because the SDK has no opinion about how the owner's key is
 * held — a browser wallet, a hardware signer, and a test key all satisfy it.
 *
 * With viem:
 * ```ts
 * const sign = (typedData) => walletClient.signTypedData(typedData as never);
 * ```
 * With ethers v6:
 * ```ts
 * const sign = ({ domain, types, message }: any) =>
 *   signer.signTypedData(domain, omitEIP712Domain(types), message);
 * ```
 */
export type TypedDataSigner = (
  typedData: Readonly<Record<string, unknown>>,
) => Promise<string>;

/**
 * `client.policies.*` — session policies, the grant that lets the gateway
 * execute on a smart wallet.
 *
 * Why this exists at all: an Alchemy Modular Account v2 trusts exactly one
 * signer, the owner's EOA, and the gateway does not hold that key. So the
 * gateway can only act through a validation entity the owner has explicitly
 * installed. A policy IS that grant — scoped to specific targets and
 * selectors, capped in ERC-20 spend, and time-bounded.
 *
 * Granting is deliberately two calls. The owner signs an EIP-712 payload that
 * cannot exist until the gateway has allocated an entity and computed the
 * nonce the installing operation will use, so `prepare` returns the payload
 * and `submit` takes the signature back. Nothing reaches the chain in either:
 * the install rides the first workflow operation on that wallet, which is why
 * a grant is gasless to authorize and free to revoke before it is used.
 *
 * Every endpoint requires the owner's own JWT. A partner assertion is refused
 * outright — granting spend authority needs proven wallet ownership, not a
 * partner's word for it.
 */
export class PoliciesResource {
  constructor(private readonly transport: Transport) {}

  /**
   * POST /wallets/{address}/policies:prepare — allocate the grant and get
   * the payload to sign.
   *
   * Stores nothing. A prepare that is never submitted leaves no state, so
   * abandoning the grant screen costs the user nothing.
   *
   * The returned `policyId`, `entityId`, `deadline`, and `validUntil` must be
   * echoed verbatim to {@link submit}: the gateway rebuilds the grant from
   * them, so altering one only produces a signature that no longer verifies.
   * Prefer {@link grant}, which handles the echoing for you.
   */
  prepare(
    address: string,
    req: v4.PreparePolicyRequest,
  ): Promise<v4.PreparedPolicy> {
    return this.transport.request<v4.PreparedPolicy>({
      path: `/wallets/${encodeURIComponent(address)}/policies:prepare`,
      method: "POST",
      body: req,
    });
  }

  /**
   * POST /wallets/{address}/policies:submit — hand back the owner's
   * signature and persist the grant.
   *
   * Returns the policy as `pending`: authorized, but not yet on chain. It
   * becomes `active` when the first workflow operation applies the install.
   *
   * A 409 means the validation entity was taken by another grant while this
   * one was being signed — prepare again rather than retrying the submit,
   * since the entity is baked into the signed calldata.
   */
  submit(
    address: string,
    req: v4.SubmitPolicyRequest,
  ): Promise<v4.SessionPolicy> {
    return this.transport.request<v4.SessionPolicy>({
      path: `/wallets/${encodeURIComponent(address)}/policies:submit`,
      method: "POST",
      body: req,
    });
  }

  /**
   * GET /wallets/{address}/policies — the wallet's grants, newest first.
   *
   * Grant material (the install calldata and the owner's signature) is never
   * echoed back; this is the manage screen's read, not a way to recover an
   * authorization.
   */
  list(address: string, chainId: number): Promise<v4.SessionPolicyList> {
    return this.transport.request<v4.SessionPolicyList>({
      path: `/wallets/${encodeURIComponent(address)}/policies`,
      query: { chainId },
    });
  }

  /** GET /wallets/{address}/policies/{policyId} — one grant. */
  get(
    address: string,
    policyId: string,
    chainId: number,
  ): Promise<v4.SessionPolicy> {
    return this.transport.request<v4.SessionPolicy>({
      path: `/wallets/${encodeURIComponent(address)}/policies/${encodeURIComponent(policyId)}`,
      query: { chainId },
    });
  }

  /**
   * DELETE /wallets/{address}/policies/{policyId} — revoke.
   *
   * Before the grant's first use this is complete on its own: nothing was
   * installed, so deleting the authorization ends it. Afterwards the
   * validation module is still on the account and clearing it needs a
   * separate on-chain uninstall — the gateway stops using the grant either
   * way, but only the first case leaves nothing behind.
   *
   * The response says which happened: `deleted` when the grant never reached
   * the chain, `revoked` when the record is retained for audit because a
   * module is still installed.
   */
  revoke(
    address: string,
    policyId: string,
    chainId: number,
  ): Promise<v4.RevokePolicyResponse> {
    return this.transport.request<v4.RevokePolicyResponse>({
      path: `/wallets/${encodeURIComponent(address)}/policies/${encodeURIComponent(policyId)}`,
      method: "DELETE",
      query: { chainId },
    });
  }

  /**
   * The whole grant in one call: prepare, sign, submit.
   *
   * This is what a grant screen wants. It echoes the prepared allocations
   * back verbatim, which is the part that is easy to get subtly wrong by
   * hand — `validUntil` in particular is an ABSOLUTE timestamp baked into the
   * signed calldata, so recomputing it from `expiresInSeconds` at submit time
   * changes the digest and the signature stops verifying.
   *
   * ```ts
   * const policy = await client.policies.grant(wallet, {
   *   chainId: 11155111,
   *   agentLabel: "TradingBot",
   *   allowedActions: [{ target: usdc, selectors: ["0x095ea7b3"] }],
   *   erc20SpendCap: { token: usdc, amount: "500000000" },
   *   expiresInSeconds: 30 * 24 * 60 * 60,
   * }, (typedData) => walletClient.signTypedData(typedData as never));
   * ```
   */
  async grant(
    address: string,
    req: v4.PreparePolicyRequest,
    sign: TypedDataSigner,
  ): Promise<v4.SessionPolicy> {
    const prepared = await this.prepare(address, req);
    const signature = await sign(prepared.typedData);

    return this.submit(address, {
      chainId: prepared.chainId,
      policyId: prepared.policyId,
      entityId: prepared.entityId,
      deadline: prepared.deadline,
      // Absolute, from prepare — NOT recomputed. It is inside the signed
      // calldata, so a recomputed value invalidates the signature.
      validUntil: prepared.validUntil,
      agentLabel: req.agentLabel,
      justification: req.justification,
      allowedActions: req.allowedActions,
      erc20SpendCap: req.erc20SpendCap,
      signature,
    });
  }
}
