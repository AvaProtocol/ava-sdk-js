---
"@avaprotocol/sdk-js": minor
---

`wallets.getNonce(address, { chainId })` reads the nonce on a named chain. The gateway looks the wallet up on the chain it reads, so a wallet registered on a chain other than the token's needs `chainId`; without it the call is a 404. Needs a gateway that includes EigenLayer-AVS#868; earlier gateways check the wallet on their default chain whatever `chainId` says.
