---
"@avaprotocol/types": minor
"@avaprotocol/sdk-js": minor
---

Add the stored wallet-budget owner-operation API from EigenLayer-AVS #886:
`wallets.getBudget`, `policies.getPreparation`, `policies.submitPreparation`
and `policies.prepareCancel`, with explicit chains and exported budget types.
Submit sends only the signature; recovery never prepares or broadcasts again.

`PreparedPolicy.digest` and `typedData` are now optional because budget
preparations return `signing.kind: "owner_operation"` instead. Callers signing
a prepared policy must distinguish the signing path. `policies.grant` remains
the legacy typed-data helper and refuses owner-operation replies before calling
the signer. Legacy prepare/submit endpoints remain available.

Budget additions may omit `startNewTotals`; only an explicit true requests new
totals. Native-transfer `reserveGas` remains optional. Legacy grant submission
also preserves the gateway's delegated-recipient acknowledgements, including
the authoritative merged acknowledgements from prepare. Signing remains gated
by the gateway and this release enables no flags.
