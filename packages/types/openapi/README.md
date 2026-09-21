# OpenAPI specification

`openapi.yaml` is copied from [`AvaProtocol/EigenLayer-AVS`](https://github.com/AvaProtocol/EigenLayer-AVS)
`api/openapi.yaml` via `yarn openapi-download`. Server facts stay on that
file. The download script applies **one** local patch: it strips
`default: false` on `allowContractRecipient` because `openapi-typescript`
would otherwise emit a required field. Do not `curl` the spec by hand.

When the server spec changes, refresh and regenerate:

```bash
yarn openapi-download
yarn types-gen
```

`yarn types-gen` runs `openapi-typescript` to produce `src/openapi.gen.ts`,
which the v4 sub-clients consume. The generated file is checked in so
downstream consumers don't need the spec at install time.
