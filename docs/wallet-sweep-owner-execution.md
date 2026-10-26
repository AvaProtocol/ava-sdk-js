# Wallet sweep: owner-signed execution contract

Related: [Studio #1987](https://github.com/AvaProtocol/studio/issues/1987).
Source audit: EigenLayer-AVS commit
`ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12`.

## Current example and next phase

The current `examples/wallet-sweep.ts` reads and simulates Sepolia USDC/WETH
transfers using existing workflow nodes. It compiles each selected positive
balance into a static `methodCalls` entry with an explicit token target and exact
base-unit amount. CustomCode checks the balance snapshot; its output array does
not dynamically become a ContractWrite call list. There is no write Loop.

Workflow/simulation is the agreed first phase and can run before the owner
handoff exists. Its successful transfer results do not establish owner signing,
gas funding, one atomic UserOperation or successful real execution. Zero balances
are omitted, so the later batching proof must use a source holding both tokens.

Owner-signed execution requires the generic gateway handoff below. After that
contract is implemented, expose thin typed SDK methods from the actual gateway
schema and extend the example/integration tests. Endpoint names are undecided;
the current authenticated Manual trigger is not that handoff. The existing
Auto/session-grant execution path retains its authorization and retry behavior.

## Prepare the complete operation

Reuse the per-call encoder and `PackExecuteBatchAuto` for the supported account.
The existing `executeAtomicBatch` packs MA v2 calls, but then calls
`submitSmartWalletUserOp`, which still requires session authorization. Reusing
that submission function unchanged would keep the server signer requirement.
[Batch implementation](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/core/taskengine/vm_runner_contract_write.go#L1245)

Extract/reuse construction and pricing before signing, then return the finalized
operation, its hash and a decoded review. Bind source, account implementation and
owner validation, chain, EntryPoint, nonce, calls, amounts, destination, gas, fees,
factory/deployment data and any paymaster fields to that prepared execution.
Validate the current supported account and owner relationship independently of
gateway wallet records. [Current session build/price/sign path](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/pkg/erc4337/preset/send_v07.go#L96)

Enable atomic batching explicitly for the owner-signed workflow path. The current
guard is `r.vm.task == nil && len(methodCalls) > 1 && !r.vm.IsSimulation`:
deployed workflows execute methods separately, simulation does not take this
batch route, and public `nodes:run` rejects fund-moving nodes. Preserve existing
workflow behavior and the standalone restriction.
[Batch guard](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/core/taskengine/vm_runner_contract_write.go#L2077),
[standalone restriction](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/core/taskengine/run_node_immediately.go#L30)

An ERC-20-only batch still needs gas. Resolve the account's required native
prefund/EntryPoint funding or the existing paymaster policy before requesting a
signature. Final paymaster fields are hash-covered. Sponsorship refusal must be
visible; changing to source-funded execution requires a new prepared review and
signature. [Pricing](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/pkg/erc4337/preset/send_v07.go#L525),
[hash-covered fields](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/pkg/erc4337/userop/v07.go#L135)

## Sign using the supported account's owner validation

For the audited MA v2 EOA fallback-owner path:

1. Select `FallbackSignerEntityID` (`0`) with `ValidationOptionGlobal` (`1`).
   Read the nonce using the matching `NonceKeyMAv2` and preserve that key's
   sequence when using `EncodeNonceMAv2`. Entity `0` alone does not mean a literal
   zero nonce; omitting the global option selects the wrong validation.
2. Ask the wallet to `personal_sign` the **32 bytes** of the finalized
   `userOpHash`. For an ethers signer this means
   `signer.signMessage(getBytes(userOpHash))`, not `signer.signMessage(userOpHash)`.
   The wallet applies the EIP-191 message prefix once; do not pre-prefix the hash.
3. Require a 65-byte ECDSA signature. Convert recovery byte `0/1` to `27/28`, keep
   `27/28` unchanged and reject other values. Then call `WrapSignatureMAv2` to add
   `0xFF 0x00`, producing 67 bytes. That helper frames the signature but does not
   normalize its recovery byte.

These rules describe this supported account/validator, not arbitrary smart
accounts, EIP-7702 delegates or contract owners. Verify compatibility before
offering the signing request. An owner signature on a session nonce is invalid.
`SessionAuthorization.Validate` intentionally rejects entity `0` and requires a
server-held signer; do not weaken it to accommodate the owner path.
[Nonce/framing helpers](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/pkg/erc4337/userop/v07_nonce.go#L29),
[signing implementation](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/pkg/erc4337/preset/builder_v07.go#L89),
[session guard](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/pkg/erc4337/preset/session_auth.go#L81)

## Continue and relay without changing signed fields

Accept the owner's signature for that prepared execution, verify it and attach
the normalized/framed signature. Continue the same priced operation through
`SendUserOpV07`, which needs no private key. Do not rerun the graph and substitute
fresh amounts, nonce, gas, fees or sponsorship after signing. All hash-covered
fields must remain exactly those reviewed and signed.

`SendUserOpV07` returns a verification-gas-efficiency rejection unchanged because
it has no key to re-sign. Do not route owner execution through
`SendUserOpV07WithRetry`. Any required change to gas, nonce or other signed fields
needs a fresh prepare/review and owner signature. Identical retransmission is
allowed; reconcile uncertain broadcasts against the same operation hash before
creating another operation. [Relay and retry behavior](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/pkg/erc4337/preset/builder_v07.go#L424)

## Reuse status with its existing ownership boundary

`LookupUserOpStatus` checks the sender through `ValidWalletOwner`. That currently
accepts either the user's default smart-account address or a chain-specific
stored wallet association. This is a gateway association check, not an
independent check of the current on-chain owner/delegate. New source-account
kinds need compatible ownership support before this status path can serve them.
Associate the operation hash with the Skill execution and reuse receipt polling;
no separate status service is required for an already supported source.
[Status lookup](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/core/taskengine/userop_status.go#L95),
[ownership check](https://github.com/AvaProtocol/EigenLayer-AVS/blob/ac7ad90f3c9e2610e5c5a8bc41e3cc4d863edb12/core/taskengine/validation.go#L16)

## Execution acceptance cases for the next phase

- Two positive token balances produce two explicit calls and exactly one real
  UserOperation, with both transfers originating from the selected source.
- Correct owner nonce options and raw-hash personal signing validate. Wrong
  signer, session nonce, missing global option, hex-text signing, double prefix
  and invalid recovery byte are refused.
- Changed account/owner, chain, EntryPoint, calls, amounts, nonce, gas, fees or
  paymaster fields invalidate the prepared continuation and require fresh consent.
- Both source-funded and sponsored cases are explicit. Insufficient gas funding,
  sponsorship refusal and verification-gas repricing surface actionable failures.
- Cancellation sends nothing. Duplicate submission and an uncertain broadcast
  reconcile one operation; pending remains pending until its receipt is known.
- Batch failure transfers no selected tokens, while gas can still be spent.
  Confirm source/destination balance changes and install no new session grant.
- Check browser-wallet signing separately after the SDK execution test passes.

These are future execution checks. The present simulation tests do not claim to
cover them, and the CLI has no execute flag.
