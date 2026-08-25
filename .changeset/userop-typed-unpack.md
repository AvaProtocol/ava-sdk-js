---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": minor
---

Typed UserOp inner calls on execute receipts and a JWT-gated status GET (N14.a / EigenLayer-AVS #774).

`readContractWriteExecutions` now copies `receipt.calls[]` and `receipt.failedCall`. `client.userops.retrieve(userOpHash, { chainId })` re-polls a pending UserOp. OpenAPI types regenerated from AVS staging.
