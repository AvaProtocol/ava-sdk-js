---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": patch
---

feat: mintPartnerAssertion for partner-gated token/wallet reads

Adds `mintPartnerAssertion` / `partnerAssertionHeaders` / `PARTNER_SCOPE_READ`
so Studio and e2e can send `X-Partner-Assertion` with `scope: read` for token
metadata and preview wallet resolve (EigenLayer-AVS permission map). Simulate
and runNode remain user-JWT-only. getToken e2e uses partner auth when
PARTNER_ASSERTION_PRIVATE_KEY is set.

Regens OpenAPI types from AVS staging (`partnerAssertion` security scheme).
