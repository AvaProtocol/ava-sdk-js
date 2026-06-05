# OpenAPI specification

`openapi.yaml` is the source of truth for the v4 REST surface. It's copied
verbatim from [`AvaProtocol/EigenLayer-AVS`](https://github.com/AvaProtocol/EigenLayer-AVS)
at `api/openapi.yaml` — the engine's REST package is generated from the same
file, so the two stay in lockstep.

When the server spec changes, refresh this file and regenerate:

```bash
# Pull the latest spec from the engine repo (adjust path to your checkout).
cp ../../../EigenLayer-AVS/api/openapi.yaml openapi.yaml
yarn --cwd ../.. types-gen
```

`yarn types-gen` runs `openapi-typescript` to produce `src/openapi.gen.ts`,
which the v4 sub-clients consume. The generated file is checked in so
downstream consumers don't need the spec at install time.
