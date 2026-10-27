# Owner-signed workflow handoff and wallet sweep example

Date: 2026-10-26
Status: Proposed
Branch: `feat/1987-wallet-sweep-example`
Related: [Studio #1987](https://github.com/AvaProtocol/studio/issues/1987)

Users can preview, simulate and explicitly execute a Sepolia USDC/WETH sweep.
The example reads catalog tokens through existing ContractRead nodes, omits zero
balances and compiles exact snapshot amounts into one multi-target ContractWrite.
A fresh balance check refuses a stale snapshot. The ordinary workflow/session
route is unchanged; only the owner handoff deliberately batches the calls into
one atomic UserOperation.

The SDK now exposes typed `workflows.prepare` and signature-only
`executions.submit`, generated from merged gateway #871 at
`aecd174204a716c757136cf82c60f7ecf24eb017`. Prepare returns a priced, unsigned
operation and review. Submit continues that stored execution without replacing
signed fields. The gateway feature remains disabled by default.

The CLI defaults to preview; `--simulate` moves no funds. `--execute` independently
checks the prepared operation's hash and exact calls, presents a review and asks
for confirmation before the development owner signs the raw hash bytes. It sends
once and polls the same hash. `--status` resumes polling without a signature or
new broadcast. Cancellation, expiry, refusal and uncertain sends do not trigger
automatic preparation, repricing or replacement.

The [execution contract](../wallet-sweep-owner-execution.md) records the supported
MA v2 implementation, owner/global nonce, EIP-191 framing, finalized gas and
paymaster fields, signature-only relay and crash-recovery boundary. The example
uses a test key; a Studio Skill must use the connected owner's wallet signer.
Native ETH sweeping, EIP-7702 sources, arbitrary token imports and protocol exits
remain outside this first example.

Offline coverage checks graph construction, exact amounts, transport, hash and
call validation, signing, cancellation, expiry and uncertain-result polling.
An explicitly enabled local-gateway test runs the actual CLI, confirms both token
balance changes, checks the owner nonce and verifies unchanged session policies.
It requires a pre-funded fixture and never installs a grant. Browser-wallet,
sponsored and counterfactual execution require separate live checks.

Verification on 2026-10-26: 105 offline tests pass through `yarn test:smoke`.
The explicit local-gateway CLI test also passes, sweeping 13.3 USDC and
0.000002877930532126 WETH in UserOperation
`0x8e40a210ac2ef5933375712fae9e41c50a22742cf98f42298f532ab425a6f687`,
confirmed in [this Sepolia transaction](https://sepolia.etherscan.io/tx/0x48df74f38606cedec5955f7f903f9601b10dfa28d86e8ffd15418082f1f91ec1).
Both source balances become zero, recipient deltas are exact, the owner nonce
increments once and session policies stay unchanged. Gateway logs show one
prepare and one relay. An initial assertion exposed RPC post-state lag after
the bundler's successful receipt; the test now polls reads for up to 60 seconds
without signing or sending again. Workspace build, lint, example typecheck and
test typecheck with `--moduleResolution bundler` pass.
