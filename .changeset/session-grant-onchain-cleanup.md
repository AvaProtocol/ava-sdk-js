---
"@avaprotocol/types": minor
"@avaprotocol/sdk-js": minor
---

Session policy API surface for EigenLayer-AVS #731 / #716 / #717.

- Regen `openapi.gen.ts` from gateway staging: `OnChainRevokeCleanup`, optional `onChainCleanup` on `RevokePolicyResponse` and `SessionPolicy`.
- Export `OnChainRevokeCleanup` and `SubmitPolicyResponse` from `@avaprotocol/types`.
- `policies.submit` / `grant` return `SubmitPolicyResponse` (includes required `supersededPolicyIds` when replace-on-submit revokes earlier grants).
- Document revoke outcomes and that `onChainCleanup` is not idempotent — send once; the field may linger on GET until the next grant marks teardown.
- Live policy test: pending revoke expects `status: "revoked"` and no cleanup payload.
