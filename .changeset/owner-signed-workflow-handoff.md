---
"@avaprotocol/types": minor
"@avaprotocol/sdk-js": minor
---

Add typed owner-signed Manual workflow preparation and signature-only execution
submission from EigenLayer-AVS #871. Export the priced v0.7 operation and handoff
request/response types. Continue receipt polling through the existing UserOps
resource; transport failures never trigger an automatic replacement operation.
