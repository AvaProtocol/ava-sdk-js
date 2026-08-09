---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": patch
---

feat: partner assertion minting for permission-gated gateway reads

Aligns with EigenLayer-AVS permission map (#739):

- **`@avaprotocol/sdk-js/partner`** (Node-only): `mintPartnerAssertion`,
  `partnerAssertionHeaders` — EdDSA `X-Partner-Assertion` with `scope: read`,
  optional EOA `sub`, `jti`, Studio base64-PEM keys
- **Root package** (browser-safe): `PARTNER_ASSERTION_HEADER`, `PARTNER_SCOPE_READ`
  only — no `node:crypto` on the main barrel
- OpenAPI regen: `partnerAssertion` security scheme; tokens partner-only;
  wallets partner or bearer; simulate/runNode bearer-only
- E2E: getToken uses partner assertion; JWT-alone expects 401
