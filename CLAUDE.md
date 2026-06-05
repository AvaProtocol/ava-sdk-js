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

```bash
yarn test                              # Run all tests (requires setup)
yarn test:core                         # Auth, wallet management
yarn test:workflows                    # Workflow CRUD
yarn test:executions                   # Execution monitoring
yarn test:triggers                     # Trigger types (block, cron, manual, event)
yarn test:nodes                        # Node types (REST, custom code, contracts)
yarn test:integrations                 # External service integrations
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

```bash
docker compose up -d                   # Start local aggregator
yarn run apikey-gen                    # Generate API key for tests
curl http://localhost:2206/up          # Health check
```

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
