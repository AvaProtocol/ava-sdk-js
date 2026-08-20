---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": minor
---

`wallets.list({ chainId })` — list a specific chain's smart wallets.

Wallet records are stored per chain, but `GET /wallets` previously read
whichever chain the gateway defaulted to, so a wallet created on one chain was
invisible unless that happened to be the gateway's. Reading another chain's
list meant minting a second JWT for it.

The aggregator now accepts `chainId` as a query on `GET /wallets`, on the same
precedence `POST /wallets` already used — explicit value, then the JWT `aud`
chain, then the gateway default (EigenLayer-AVS #760, v4.17.0). `wallets.list`
surfaces it as an optional `opts`, matching `policies.list({ chainId })`.

```ts
await client.wallets.list();                  // the JWT's aud chain
await client.wallets.list({ chainId: 8453 }); // Base, from any token for this EOA
```

Omitting `chainId` is unchanged for single-chain gateways and for any caller
whose `aud` is the gateway default. On a multi-chain gateway the list now
follows the token's `aud` rather than the gateway default — pass `chainId`
explicitly to pin it.

Requires an aggregator on v4.17.0 or later; older gateways ignore the query and
return their default chain's wallets.
