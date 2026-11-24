---
"@avaprotocol/types": minor
"@avaprotocol/sdk-js": minor
---

Expose one run's need on report-mode simulate verdicts: `SessionAuthorization.perRun`, `perRunUnsizedTokens` and `perRunNativeUnsized`. `perRun` is sized for a single run from what the simulation sent and is never multiplied by the runs left. The regenerated spec also adds the `GET /networks` types (`NetworkInfo`, `NetworkList`) and the auth exchange's 403 and 503 responses already on the gateway.
