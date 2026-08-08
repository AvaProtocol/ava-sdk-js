---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": patch
---

feat: mintPartnerAssertion for partner-gated token/wallet reads

Adds Node-only `@avaprotocol/sdk-js/partner` (`mintPartnerAssertion` /
`partnerAssertionHeaders`) so Studio and e2e can send `X-Partner-Assertion`
with `scope: read`. Root package exports browser-safe constants only
(`PARTNER_ASSERTION_HEADER`, `PARTNER_SCOPE_READ`) — no `node:crypto` on the
main barrel. Simulate/runNode remain user-JWT-only. getToken e2e uses partner
auth when PARTNER_ASSERTION_PRIVATE_KEY is set.

Regens OpenAPI types from AVS staging (`partnerAssertion` security scheme).
