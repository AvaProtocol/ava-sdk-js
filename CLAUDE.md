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
yarn test:docker                       # Run tests with Docker (full e2e)
yarn test:docker "authWithSignature"   # Run specific test pattern
yarn test:core                         # Auth, wallet management
yarn test:workflows                    # Workflow CRUD
yarn test:executions                   # Execution monitoring
yarn test:triggers                     # Trigger types (block, cron, manual, event)
yarn test:nodes                        # Node types (REST, custom code, contracts)
yarn test:integrations                 # External service integrations
```

**Note:** Do not specify `TEST_ENV` explicitly - the default value `dev` works fine.

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
