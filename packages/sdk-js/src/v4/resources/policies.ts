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
 *
 * The chain comes from the request — `chainId` in the body on
 * {@link prepare} / {@link submit}, the `chainId` query elsewhere — and NOT
 * from the JWT's `aud`. The token is EOA identity here, and owning an EOA is
 * chain-independent, so one token can grant on any chain the gateway serves
 * without a second signature.
 *
 * A chain the gateway does NOT serve is refused with
 * `400 POLICIES_CHAIN_NOT_SERVED`, on prepare and again on submit. That
 * happens before any signature is collected: such a grant would be signed
 * and stored but unusable, since no bundler or RPC behind this gateway could
 * ever send under it. Requires an aggregator on v4.17.0 or later; before
 * that the grant was allocated and stored (EigenLayer-AVS #760).
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
   * Also returns `supersededPolicyIds`: every other usable grant on this
   * runner that was revoked as part of this submit (replace-on-submit). A
   * non-empty list means the user's earlier permission is gone — worth
   * reflecting in the UI. There is no flag to opt out.
   *
   * A 409 is one of:
   *
   * - `POLICIES_ENTITY_TAKEN` — the validation entity was taken by another
   *   grant while this one was being signed. Prepare again rather than
   *   retrying the submit; the entity is baked into the signed calldata.
   * - `SESSION_POLICY_BASE_CHANGED` — `basePolicyId` is not the runner's
   *   usable grant, or a carried grant's remaining limit or running set
   *   moved after prepare. The grant id can be unchanged. An empty string
   *   means prepare saw no grant. Prepare again.
   * - `SESSION_POLICY_NOT_COVERING` — storing this grant would leave another
   *   enabled automation on the runner unable to run. When a grant was
   *   carried, this is only a task the new grant covers less than the
   *   current one did. `affectedTaskIds` names those workflows. Send them
   *   back as `dropTaskIds` only when the owner means to stop them.
   * - `SESSION_POLICY_TARGET_UNRESOLVED` — there is no usable grant, and an
   *   enabled task moves funds to a target the grant cannot read, and that
   *   task was not listed in `dropTaskIds`. `affectedTaskIds` names them.
   *   When a usable grant exists, an unresolved task does not fail submit
   *   by itself.
   * - `SESSION_POLICY_NATIVE_UNSIZED` — the echoed grant would install a
   *   native spend cap and a running task's payable value cannot be sized.
   *   `affectedTaskIds` names those tasks. Pause one, or name it in
   *   `dropTaskIds`. If the current grant already has a native cap, this
   *   is not an error.
   */
  submit(
    address: string,
    req: v4.SubmitPolicyRequest,
  ): Promise<v4.SubmitPolicyResponse> {
    return this.transport.request<v4.SubmitPolicyResponse>({
      path: `/wallets/${encodeURIComponent(address)}/policies:submit`,
      method: "POST",
      body: req,
    });
  }

  /**
   * GET /wallets/{address}/policies — the wallet's grants, newest first.
   *
   * `chainId` is optional: omitted, the gateway uses the JWT's `aud` chain.
   *
   * Grant material (the install calldata and the owner's signature) is never
   * echoed back; this is the manage screen's read, not a way to recover an
   * authorization.
   */
  list(
    address: string,
    opts?: { chainId?: number },
  ): Promise<v4.SessionPolicyList> {
    return this.transport.request<v4.SessionPolicyList>({
      path: `/wallets/${encodeURIComponent(address)}/policies`,
      query: opts,
    });
  }

  /** GET /wallets/{address}/policies/{policyId} — one grant. */
  get(
    address: string,
    policyId: string,
    opts?: { chainId?: number },
  ): Promise<v4.SessionPolicy> {
    return this.transport.request<v4.SessionPolicy>({
      path: `/wallets/${encodeURIComponent(address)}/policies/${encodeURIComponent(policyId)}`,
      query: opts,
    });
  }

  /**
   * DELETE /wallets/{address}/policies/{policyId} — revoke.
   *
   * Soft-revokes in gateway storage immediately (the send path stops using
   * the grant). On-chain outcomes:
   *
   * - `status: "deleted"` — rare; no InstallCall retained; record removed.
   * - `status: "revoked"`, `onChainCleanupRequired: false` — pending grant
   *   retained so InstallCall survives a late-landing install; nothing known
   *   on chain yet (no cleanup payload).
   * - `status: "revoked"`, `onChainCleanupRequired: true` — applied grant
   *   still believed installed. Response includes `onChainCleanup`:
   *   `{ entityId, target, callData, chainId }` for the owner wallet to send
   *   as a plain call to the runner (or owner-fallback UserOp). Production
   *   grants are policied; the gateway controller cannot self-uninstall.
   *
   * **Cleanup is not idempotent.** Re-sending `uninstallValidation` after the
   * entity is already clear reverts (measured on Sepolia). The gateway only
   * learns the owner executed cleanup on the *next grant's prepare* (chain
   * readback sets `TornDownAt`); until then GET/list may still return
   * `onChainCleanup` from storage belief alone. Clients must: send the payload
   * **once**, treat success locally (do not re-prompt on a lingering field),
   * and not read presence of `onChainCleanup` as proof teardown has not run.
   * See EigenLayer-AVS #731 / #717.
   */
  revoke(
    address: string,
    policyId: string,
    opts?: { chainId?: number },
  ): Promise<v4.RevokePolicyResponse> {
    return this.transport.request<v4.RevokePolicyResponse>({
      path: `/wallets/${encodeURIComponent(address)}/policies/${encodeURIComponent(policyId)}`,
      method: "DELETE",
      query: opts,
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
   * Returns {@link v4.SubmitPolicyResponse}: the new pending policy plus
   * `supersededPolicyIds` for any earlier usable grants this submit replaced.
   *
   * When `req.add` is set, prepare merges that fragment with what the
   * runner's enabled automations still need and returns the full permission
   * set. Submit echoes that merged set and `basePolicyId` (including `""`
   * when there was no grant), taking the id from prepare rather than from
   * the request. Echoing `add` itself would sign a fragment and replace the
   * wallet's other permissions.
   *
   * When `add` is omitted, a `basePolicyId` the caller set — including `""` —
   * is echoed to submit. Prepare already compared it; dropping it on submit
   * would store the grant on the legacy replace-all path. Leave the field
   * off entirely for that replace-all path, which is also how a wallet with
   * two usable grants gets repaired.
   *
   * Prepare emits `allowContractRecipient` only when it is true. Submit
   * echoes that omission, which the gateway reads as false. The field stays
   * optional on the request types: the vendored spec drops the server's
   * `default: false` so `openapi-typescript` does not make it required.
   *
   * `dropTaskIds` names enabled workflows this grant may leave uncovered.
   * When `add` is set, those ids go on prepare, so the merged grant the
   * owner signs already leaves them out. Submit echoes prepare's
   * `affectedTaskIds`, the list prepare actually applied, not an extra id
   * the caller named that was not enabled. When `add` is omitted, prepare
   * does not receive the list — the gateway honors it only for an `add`
   * merge — and submit still receives the caller's list.
   *
   * ```ts
   * const policy = await client.policies.grant(wallet, {
   *   chainId: 11155111,
   *   agentLabel: "TradingBot",
   *   allowedActions: [{ target: usdc, selectors: ["0x095ea7b3"] }],
   *   erc20SpendCap: { token: usdc, amount: "500000000" },
   *   expiresInSeconds: 30 * 24 * 60 * 60,
   * }, (typedData) => walletClient.signTypedData(typedData as never));
   * // policy.supersededPolicyIds — earlier grants replaced on this runner
   * ```
   */
  async grant(
    address: string,
    req: GrantRequest,
    sign: TypedDataSigner,
  ): Promise<v4.SubmitPolicyResponse> {
    const { dropTaskIds, ...withoutDrops } = req;
    // An `add` merge has to see the drop list, or the signed grant still
    // includes those tasks and submit then disagrees with it. A replace-all
    // grant ignores the list at prepare.
    const prepareReq = req.add ? req : withoutDrops;
    const prepared = await this.prepare(address, prepareReq);
    const signature = await sign(prepared.typedData);
    // A fragment must not be what the owner signs. Prepare already merged it.
    // `allowContractRecipient` is included only when the source set it, so an
    // omitted flag stays omitted and the gateway applies its default of false.
    const permissions = req.add
      ? {
          allowedActions: prepared.allowedActions,
          erc20SpendCap: prepared.erc20SpendCap,
          erc20SpendCaps: prepared.erc20SpendCaps,
          nativeRecipients: prepared.nativeRecipients,
          nativeSpendCap: prepared.nativeSpendCap,
          ...(prepared.allowContractRecipient !== undefined
            ? { allowContractRecipient: prepared.allowContractRecipient }
            : {}),
          basePolicyId:
            prepared.basePolicyId ?? prepared.changes?.basePolicyId ?? "",
        }
      : {
          allowedActions: req.allowedActions,
          erc20SpendCap: req.erc20SpendCap,
          erc20SpendCaps: req.erc20SpendCaps,
          nativeRecipients: req.nativeRecipients,
          nativeSpendCap: req.nativeSpendCap,
          ...(req.allowContractRecipient !== undefined
            ? { allowContractRecipient: req.allowContractRecipient }
            : {}),
          ...(req.basePolicyId !== undefined
            ? { basePolicyId: req.basePolicyId }
            : {}),
        };
    // `add` echoes the ids prepare left out. Replace-all echoes the
    // caller's list, because prepare did not apply one.
    const submitDropTaskIds = req.add ? prepared.affectedTaskIds : dropTaskIds;

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
      ...permissions,
      ...(submitDropTaskIds !== undefined ? { dropTaskIds: submitDropTaskIds } : {}),
      signature,
    });
  }
}

/**
 * {@link PoliciesResource.grant} input. `dropTaskIds` is already on
 * {@link v4.PreparePolicyRequest}. With `add`, grant sends it on prepare
 * and submits prepare's `affectedTaskIds`. Without `add`, grant sends it
 * only on submit.
 */
export type GrantRequest = v4.PreparePolicyRequest & {
  dropTaskIds?: string[];
};
