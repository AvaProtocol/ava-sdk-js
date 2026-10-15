---
"@avaprotocol/sdk-js": patch
---

Document `AUTH_EXPIRY_TOO_FAR` on `signAuthMessage` and `nativeGasWei` on `policies.grant`.

`buildAuthMessage` (and so `signAuthMessage`) now throws before a signature when `expireAt` is more than 48 hours after `issuedAt` (`AUTH_EXPIRY_MAX_MS`). This is stricter than before: a gateway without the `AUTH_EXPIRY_TOO_FAR` check (EigenLayer-AVS#841) still accepts a longer span, which this SDK no longer builds. The gateway measures its limit from when it receives the message, so an `issuedAt` set in the future can pass here and still be refused there.

`GrantRequest.dropTaskIds` accepts a `readonly string[]`, so a typed `v4.PreparePolicyRequest` can be passed to `policies.grant`.
