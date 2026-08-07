---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": minor
---

feat: session-grant on-chain cleanup + submit supersede typing (EigenLayer-AVS #731 / #716 / #717)

Adopts the gateway surface from EigenLayer-AVS staging after #731.

**`@avaprotocol/types`**

- Regen `openapi.gen.ts` from gateway `api/openapi.yaml`.
- Export `OnChainRevokeCleanup` — owner-executable `{ entityId, target, callData, chainId }` for `uninstallValidation`.
- Export `SubmitPolicyResponse` — `SessionPolicy` plus required `supersededPolicyIds`.
- `RevokePolicyResponse` / `SessionPolicy` gain optional `onChainCleanup`.

**`@avaprotocol/sdk-js`**

- `policies.submit` / `policies.grant` return `SubmitPolicyResponse` so consumers see `supersededPolicyIds` (replace-on-submit; non-empty means earlier usable grants on the runner were revoked).
- `policies.revoke` docs: pending with InstallCall is retained as `revoked` without cleanup; applied returns `onChainCleanup` for a one-shot owner tx.
- Cleanup is **not** idempotent: re-sending after the entity is clear reverts. GET may still advertise `onChainCleanup` until the next grant's prepare marks teardown (`TornDownAt`) — send once and track success client-side.

Run `yarn run version` to consume: `@avaprotocol/types` 4.4.0 → 4.5.0, `@avaprotocol/sdk-js` 4.7.0 → 4.8.0 (and internal types dep bump).
