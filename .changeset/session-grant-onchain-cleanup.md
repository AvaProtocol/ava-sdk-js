---
"@avaprotocol/types": minor
"@avaprotocol/sdk-js": minor
---

Session policy revoke/GET: surface `onChainCleanup` for owner-executable on-chain uninstall (EigenLayer-AVS #731 / #717).

- Regen `openapi.gen.ts` from gateway staging: `OnChainRevokeCleanup`, optional `onChainCleanup` on `RevokePolicyResponse` and `SessionPolicy`.
- Export `OnChainRevokeCleanup` from `@avaprotocol/types` v4 surface.
- Document revoke outcomes (pending retained as `revoked` without cleanup; applied returns `onChainCleanup` for the wallet to send).
- Live policy test: pending revoke expects `status: "revoked"` and no cleanup payload.
