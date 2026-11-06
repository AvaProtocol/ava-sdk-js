---
"@avaprotocol/types": patch
"@avaprotocol/sdk-js": patch
---

Expose `onChainCleanupRequired` on session-policy list, detail and submit
responses. A revoked policy can still require on-chain removal when its cleanup
payload is unavailable. Sync the OpenAPI contract from EigenLayer-AVS #894 and
document that policy reads reconcile completed removals.
