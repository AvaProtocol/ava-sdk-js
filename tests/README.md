# Tests

All tests live under `tests/v4/`. They run against a local aggregator REST
endpoint — boot it with `docker compose up -d` from the root of this repo
and point `AVS_REST_URL` at the gateway.

```bash
export AVS_REST_URL=http://localhost:8080/api/v1
export TEST_PRIVATE_KEY=0x...                       # EOA for auth flow
# Partner-gated token metadata (matches gateway partners[] + audience):
export PARTNER_ASSERTION_PRIVATE_KEY=...            # base64 Ed25519 seed
export PARTNER_ASSERTION_ISSUER=studio              # optional, default studio
export PARTNER_ASSERTION_AUDIENCE=avs-gateway-local # if gateway sets audience
yarn test
```

`tokens.retrieve` requires a partner assertion (`scope: read`); user JWT alone
returns 401. Mint via `@avaprotocol/sdk-js/partner` (Node-only).
`tests/v4/core/getToken.test.ts` skips when `PARTNER_ASSERTION_PRIVATE_KEY`
is unset. Simulate / runNode still use user JWT.

Suites map to `yarn test:<name>` and to CI matrix jobs:

| Script | Path |
|---|---|
| `yarn test:smoke` | `tests/v4/smoke.test.ts` + `onchain-helpers.test.ts` (no gateway) |
| `yarn test:core` | `tests/v4/core` |
| `yarn test:workflows` | `tests/v4/workflows` |
| `yarn test:executions` | `tests/v4/executions` |
| `yarn test:triggers` | `tests/v4/triggers` |
| `yarn test:nodes` | `tests/v4/nodes` |
| `yarn test:templates` | `tests/v4/templates` |

## CI stack

GitHub Actions (`.github/workflows/dev-test-on-pr.yml`) boots gateway +
worker-sepolia + operator from `avaprotocol/avs-dev`. The operator
address in `config/operator-sepolia.yaml` must be EIP-55 checksummed —
the aggregator recovers the operator's gRPC auth signature against that
exact string (EigenLayer-AVS #767). A lowercase spelling connects, then
fails every Ping/Sync with `operator authentication required`, and every
block/event workflow create 400s with `no connected operator currently
monitors chain_id=11155111`.
