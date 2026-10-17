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

## External template integration

These opt-in suites compile an externally maintained template from its current
Git checkout. Keep the test configuration and all application-specific fixture
values in the producer repository. The SDK stores no copied graph, template
identifiers, private repository links, or deployment details.

Install dependencies in both the SDK and producer checkout and use Node 24.
Set `TEMPLATE_TEST_CONFIG` explicitly in local runs and producer CI. It points to
a JSON file implementing `TemplateTestConfig` in `tests/utils/externalTemplate.ts`:
`sourceRoot` is relative to that JSON file; `bridgeArgs` are arguments to Node
resolved in the source root; `sourceFile`, `templateId`, `reportPath` and
`contract` declare the artifact and its assertions. The producer bridge accepts
JSON on stdin for `compile` and `summarize`, and returns JSON on stdout.
Compilation must hash the bytes it compiles and return the current source commit.
The SDK checks both against the producer checkout without logging their values.
The artifact hash verifies that file; HEAD identifies the checkout but does not
certify that other producer files are clean. The SDK records a `sourceDirty`
boolean from the working tree without logging file names or contents. Dirty
working trees remain supported so local edits can be tested.

Jest uses Babel, so type checking is a separate gate: `yarn test:external:types`
checks the harness against SDK workspace source. Public SDK CI runs that check
and `yarn test:external:unit` without any external producer configuration or
credentials. The producer compilation contract is exercised in producer CI.

```bash
# Standalone SDK harness checks; no producer checkout, gateway or credentials:
yarn test:external:types
yarn test:external:unit
# Also compile the producer source; no gateway or wallet credentials:
TEMPLATE_TEST_CONFIG=/path/to/producer/test-config.json yarn test:external:contract
# Include local gateway simulations:
TEMPLATE_TEST_CONFIG=/path/to/producer/test-config.json AVS_REST_URL=http://localhost:8080/api/v1 yarn test:external
# Also execute a tiny real Sepolia transfer using the funded test fixture:
TEMPLATE_TEST_CONFIG=/path/to/producer/test-config.json AVS_REST_URL=http://localhost:8080/api/v1 TEMPLATE_LIVE=1 yarn test:external
```

Each integration test owns a fresh report listener and token. Reports from a
funded simulation are discarded before executing the live workflow, so an
execution report cannot be confused with an earlier simulation. The report stub
runs the producer's real summarizer asynchronously with delivery stubbed; closing
the listener cancels active producer processes and sockets. It
binds to loopback by default. A container gateway can use `TEST_STUB_HOST` for
the advertised host and explicitly set `TEST_STUB_BIND_ADDRESS` for a wider bind.
Each run generates its own bearer token, passed as `notifyAuthorization` to the
producer compiler, and rejects report bodies over 1 MB. Bridge processes receive
only basic system environment variables by default; use the config's optional
`bridgeEnv` string array to select additional producer variables explicitly.
Wallet keys are never inherited by default. `TEMPLATE_BRIDGE_TIMEOUT_MS`
defaults to 90000. `TEMPLATE_BRIDGE_DEBUG=1` enables producer diagnostics locally;
do not publish that output if the source repository contains private data.

The live test sends 0.000001 Sepolia ETH to the fixture owner's address. If a
grant is needed, it adds the observed requirements to the shared fixture grant
for seven days. That addition persists after cleanup and can broaden an existing
grant; the test never revokes shared permissions. It removes only its own
workflows, including bounded repeated recovery by unique name after a lost
creation response. Name new gateway-free tests `*.contract.test.ts` so the
contract-only command selects them. Standalone harness tests belong under
`tests/external-templates/unit` so public SDK CI can run them without a producer.

The live test has one deadline across authentication, compilation, simulation,
grants and workflow operations. Work stops 45 seconds before the run deadline;
cleanup uses a separate authenticated client, bounded request timeouts and its
own cancellation signal. The entire sequence is inside `try/finally`, and all
timers are disposed even when setup or grant creation fails. The outer Jest
deadline has an additional five-second margin for teardown.

## CI stack

GitHub Actions (`.github/workflows/dev-test-on-pr.yml`) boots gateway +
worker-sepolia + operator from `avaprotocol/avs-dev`. The operator
address in `config/operator-sepolia.yaml` must be EIP-55 checksummed —
the aggregator recovers the operator's gRPC auth signature against that
exact string (EigenLayer-AVS #767). A lowercase spelling connects, then
fails every Ping/Sync with `operator authentication required`, and every
block/event workflow create 400s with `no connected operator currently
monitors chain_id=11155111`.

Real-bundler tests (`getFundedFixture`) use a **static MA v2 salt per
CI suite** so parallel matrix jobs do not share an EntryPoint nonce
([#263](https://github.com/AvaProtocol/ava-sdk-js/issues/263)):

| Suite | Salt |
|---|---|
| `yarn test:core` (withdraw) | `0` |
| `yarn test:executions` (gasTracking) | `1` |
| `yarn test:nodes` (contractWrite) | `2` |
| templates / workflows / triggers | `0` |

Those are the only three salts allowed under production's 3-wallet cap.
CI sets `FUNDED_WALLET_SALT` per matrix job; local `yarn test:<suite>`
infers the same map from the file path. CREATE2(owner, factory, salt)
is stable for `TEST_PRIVATE_KEY` — fund each derived address on Sepolia
with ETH and USDC. Unfunded shards skip or fail with the address in the
message. Override with `FUNDED_WALLET_SALT`.
