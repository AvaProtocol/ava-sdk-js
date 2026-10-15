---
"@avaprotocol/sdk-js": patch
---

Document `AUTH_EXPIRY_TOO_FAR` on `signAuthMessage` and `nativeGasWei` on `policies.grant`. `buildAuthMessage` throws before a signature when `expireAt` is more than 48 hours after `issuedAt`.
