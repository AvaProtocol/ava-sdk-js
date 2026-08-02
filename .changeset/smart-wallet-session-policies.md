---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": minor
---

feat: session policies — the smart-wallet spend-grant surface

Adds `client.policies` and the `SessionPolicyActions` builder, the client half of
the MA v2 / EntryPoint v0.7 authority model. An Alchemy Modular Account v2 trusts
only its owner EOA — a key the gateway does not hold — so the gateway can act only
through a validation entity the owner has explicitly installed. A session policy
IS that grant: scoped to specific targets and selectors, capped in ERC-20 spend,
and time-bounded.

**`client.policies`** (`@avaprotocol/sdk-js`):

- `prepare(address, req)` / `submit(address, req)` — the two-call grant. The owner
  signs an EIP-712 payload that cannot exist until the gateway has allocated a
  validation entity and computed the installing op's nonce, so `prepare` returns
  the payload and `submit` takes the signature back. Nothing touches the chain in
  either call; the install rides the wallet's first workflow operation, so a grant
  is gasless to authorize and free to revoke before it is used.
- `grant(address, req, sign)` — prepare + sign + submit in one call, echoing the
  prepared allocations verbatim (`validUntil` is an absolute timestamp baked into
  the signed calldata — recomputing it invalidates the signature). This is what a
  grant screen wants.
- `list` / `get` — the manage screen's read model. Grant material (install
  calldata, owner signature) is never echoed back.
- `revoke(address, policyId)` — before first use, deletes the authorization and
  nothing remains (`deleted`). After the grant is applied on chain, the gateway
  stops honoring it immediately but the validation module is still installed, so
  the response is `revoked` with `onChainCleanupRequired: true` — clearing the
  module needs a separate owner-signed on-chain uninstall.

Every endpoint requires the owner's own JWT; a partner assertion is refused —
granting spend authority needs proven wallet ownership, not a partner's word.

**`SessionPolicyActions`** (`@avaprotocol/sdk-js`): resolves friendly action chips
("Swap on Uniswap V3", "Approve USDC") to the `{ target, selectors }` the on-chain
AllowlistModule enforces — `uniswapV3Swap`, `erc20Approve`, `erc20Transfer`,
`custom`, and `merge`. Addresses come from `@avaprotocol/protocols` so a new chain
is picked up by a package bump, not a UI change; selectors are stated with the
signature they hash from, because a wrong selector fails silently at validation.

**`@avaprotocol/types`**: adds the `v4` session-policy request/response types —
`PreparePolicyRequest`, `PreparedPolicy`, `SubmitPolicyRequest`, `SessionPolicy`,
`SessionPolicyList`, `AllowedAction`, `Erc20SpendCap`, `RevokePolicyResponse`.
