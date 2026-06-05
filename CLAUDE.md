# CLAUDE.md

## Project Overview

Ava SDK for JavaScript/TypeScript - a monorepo containing a type-safe gRPC wrapper for integrating with Ava Protocol's AVS. Two main packages: `@avaprotocol/sdk-js` (main SDK) and `@avaprotocol/types` (type definitions).

## Development Commands

### Build and Development

```bash
yarn                    # Install dependencies
yarn build              # Build all packages
yarn clean              # Clean all build artifacts
yarn lint               # Lint code
yarn run proto-download # Download latest proto files
yarn run protoc-gen     # Generate protobuf types
```

### Testing

All E2E suites target the v4 REST surface (`tests/v4/**`); the legacy
v3 gRPC tests are archived under `tests-v3-archive/`. Each suite maps
to a subdirectory and is sharded as its own CI matrix job:

```bash
yarn test                              # Run every jest spec (full suite)
yarn test:v4                           # Everything under tests/v4
yarn test:core                         # tests/v4/core      — auth, wallet, secrets, getToken, withdraw
yarn test:workflows                    # tests/v4/workflows — CRUD + trigger/enable/cancel
yarn test:executions                   # tests/v4/executions — simulate, runNodeWithInputs, gas, fees
yarn test:triggers                     # tests/v4/triggers   — block, cron, event, manual
yarn test:nodes                        # tests/v4/nodes      — REST, contractRead/Write, customCode, etc.
yarn test:templates                    # tests/v4/templates  — end-to-end template workflows
```

**Note:** Do not specify `TEST_ENV` explicitly - the default value `dev` works fine.

### Running tests — ALWAYS pipe to a log file

When running any e2e test from the `./tests` folder (via `npx jest`, `yarn test*`,
etc.), **always** pipe full output to a timestamped file under `./logs/` so
failures can be inspected without rerunning:

```bash
mkdir -p logs
npx jest tests/path/to/file.test.ts --verbose 2>&1 | tee logs/$(date +%Y%m%d-%H%M%S)-name.log
```

Then grep the log for `FAIL`, `✕`, `Error:`, `Received:`, etc. Do not repeatedly
rerun a suite to extract failure details — the log has everything. The `./logs/`
folder is gitignored.

### Running v4 tests against the Railway gateway

For the v4 REST suite (`tests/v4/**`), `TEST_ENV=railway` points the tests at
the deployed gateway in the EigenLayer-AVS `eigenlayer-avs` project,
`feature/rest-api-migration` environment. Use this when verifying changes
that landed on the server side (a fresh push to `feature/rest-api-migration`
auto-rebuilds the gateway service) without standing up `make dev-stack`
locally.

```bash
TEST_ENV=railway yarn jest tests/v4/templates/aave-health-factor-alert.test.ts
```

**Setup**: see `.env.railway.example`. Requires `AVS_REST_URL` pointing at
the public gateway domain + an admin JWT in `AVS_API_KEY` minted via
`railway ssh --service gateway --environment feature/rest-api-migration "./ap create-api-key --config=config/gateway-railway.yaml --role=admin --subject=0x..."`.

#### Per-test log verification

When **adding or rewriting** a v4 test (especially template tests that exercise
multiple node types), run **one test at a time** and tail both the gateway and
the matching chain worker's Railway logs for that execution window. The test
passing is necessary but not sufficient — log lines reveal expected behaviour
the test can't assert (Tenderly invocations, RPC calls, state-override
injection, chain-worker dispatch). They also surface warnings the test
swallows.

```bash
# 1) Run the single test (NOT the full suite)
TEST_ENV=railway yarn jest tests/v4/templates/your-template.test.ts

# 2) Tail the gateway logs for the same time window. The relevant chain worker
#    is determined by the test's chainId — Sepolia (11_155_111) → worker-sepolia,
#    Base Sepolia (84_532) → worker-base-sepolia, mainnet → worker-ethereum,
#    Base → worker-base.
cd /Users/mikasa/Code/avs-infra
railway logs --service gateway --environment feature/rest-api-migration --deployment 2>&1 | tail -50
railway logs --service worker-sepolia --environment feature/rest-api-migration --deployment 2>&1 | tail -50
```

What to look for:

- **Gateway**: HTTP method + URI + status code for each request (`POST /api/v1/workflows:simulate status=200`), no `Worker reconnect failed` / `context deadline exceeded` warnings, no Sentry-bound errors.
- **Worker**: `Chain worker gRPC server listening` at startup, the actual RPC calls the test induced (contract reads/writes show up as `eth_call` / Tenderly simulate requests), no `Failed to connect to WebSocket RPC` / `403 Forbidden` from the chain RPC.
- **For contractWrite-bearing tests**: confirm Tenderly state-override invocations show up in worker logs — same-workflow `approve` should inject allowance state for the chained `supply`/`transfer`.

If logs show a warning the test passes through (e.g. `Worker not ready, will retry`, `Failed to fetch paymaster owner`), surface it explicitly in the test's output or the change description. Tests that pass on green logs but ignore amber logs are how regressions slip in.

### Docker Environment

The local stack mirrors the Railway deployment shape: one **gateway**
(REST + gRPC, multi-chain) plus one **worker** per chain. The CI
compose file (`docker-compose.yml`) wires up gateway + worker-sepolia
— the v4 REST suite only needs Sepolia. Configs live under `config/`
and are modeled on the EigenLayer-AVS `gateway-dev.example.yaml` /
`worker-sepolia-dev.example.yaml` shapes; CI renders the `${...}`
placeholders into `*.runtime.yaml` via `envsubst` before booting.

```bash
docker compose up -d gateway           # Start gateway (REST :8080, gRPC :2206)
docker compose up -d worker-sepolia    # Start Sepolia chain worker (gRPC :50051, health :8090)
yarn run apikey-gen                    # Mint an admin JWT for the v4 suite (sets TEST_API_KEY in .env.test)
curl http://localhost:8080/up          # Gateway liveness probe
curl http://localhost:8090/health      # Worker liveness probe
```

The container binary in the published `avaprotocol/avs-dev:latest`
image today is `/ava` (root path, ENTRYPOINT `["/ava"]`). The
EigenLayer-AVS source Dockerfile has since renamed it to `/app/ap`
(ENTRYPOINT `["./ap"]`); flip the `apikey-gen` script in
`package.json` and the workflow's API-key step to `./ap` once a
fresh image tag picks up that rebuild. Subcommands either way:
`aggregator` (runs in gateway mode when the config carries a
`chains[]` block), `worker`, `operator`, `create-api-key`.

### Release

```bash
yarn changeset          # Create changeset for production release
yarn release            # Production release via changesets
yarn publish:dry-run    # Dry run publishing
```

## Architecture

### Package Structure

- **packages/sdk-js/**: Main SDK - gRPC client and models
- **packages/types/**: Type definitions, enums, interfaces
- **grpc_codegen/**: Generated gRPC code from protocol buffers
- **tests/**: Test suites organized by functionality
- **examples/**: Usage examples

### Core Components

- **Client** (extends BaseClient): Auth (signature + API key), gRPC communication, workflow management, smart wallet integration
- **Workflow**: Automation workflows with triggers, nodes, and edges
- **Node/Trigger Factories**: Create typed workflow components
- **Execution/Step**: Track workflow execution state and results

### Authentication Flow

1. `getSignatureFormat(wallet)` - Get message to sign
2. `authWithSignature({ message, signature })` OR `authWithAPIKey({ message, apiKey })`
3. `setAuthKey(authKey)` - Store for subsequent requests

### Timeout Presets

- `TimeoutPresets.FAST` - 5s timeout, 2 retries
- `TimeoutPresets.SLOW` - 2min timeout, 2 retries
- `TimeoutPresets.NO_RETRY` - 30s timeout, no retries

## Development Guidelines

### Test Conventions

- Tests run against built `dist/` files, not source
- Docker environment replicates production setup
- Salt-based test isolation prevents conflicts
- Cleanup workflows in `finally` blocks
- **All test assertions must be deterministic** - never use conditional checks that allow tests to pass on errors (e.g., `if (result.success) { expect(...) }` is forbidden)

#### simulateWorkflow must include `settings` in inputVariables

When calling `client.simulateWorkflow()`, always spread the workflow and pass `inputVariables` with a `settings` object containing at minimum:
- `name`: workflow name (required by the context-memory AI summarizer)
- `runner`: smart wallet address
- `chain`: chain name (e.g., "sepolia")

```typescript
const simulationResult = await client.simulateWorkflow({
  ...workflow,
  inputVariables: {
    settings: {
      name: "My Workflow Name",
      runner: smartWalletAddress,
      chain: "sepolia",
    },
  },
});
```

Without `settings.name`, the aggregator's context-memory API fails validation and falls back to a generic deterministic summary.

### runNodeWithInputs API Structure

Use the same node structure as `simulateWorkflow`:

```typescript
await client.runNodeWithInputs({
  node: {
    id: "node-id",
    name: "nodeName",
    type: NodeType.ContractWrite,
    data: { /* node-specific config */ }
  },
  inputVariables: { /* input data */ }
});
```

### Adding New Node/Trigger Types

1. Add type definition in `packages/types/src/` (`node.ts` or `trigger.ts`)
2. Implement class in `packages/sdk-js/src/models/node/` or `trigger/`
3. Update the corresponding Factory to handle the new type
4. Add tests in `tests/nodes/` or `tests/triggers/`

### Protocol Buffer Updates

1. `yarn run proto-download` (updates `grpc_codegen/avs.proto`)
2. `yarn run protoc-gen` (regenerates TypeScript bindings)
3. Update SDK code for new/changed fields
4. Update tests

## Requirements

- Node.js >= 20.18.0
- Yarn >= 1.22.19
