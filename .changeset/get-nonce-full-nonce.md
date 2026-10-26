---
"@avaprotocol/types": minor
"@avaprotocol/sdk-js": patch
---

Regenerate the OpenAPI types from EigenLayer-AVS staging:

- `getNonce` returns the full EntryPoint v0.7 nonce at the owner's validation key (`key << 64 | sequence`). Use it as `userOp.nonce` unchanged and parse it with `BigInt`. `wallets.getNonce` documents this.
- Policies submit declares its `503 POLICIES_ENTITY_UNVERIFIED` response, which the gateway has returned since v5.0.0. `policies.submit` documents it.
- The `SESSION_POLICY_SIGNER_RETIRED` descriptions.
