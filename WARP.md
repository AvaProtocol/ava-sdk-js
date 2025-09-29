# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

The Ava SDK for JavaScript/TypeScript is a monorepo containing a type-safe gRPC wrapper for integrating with Ava Protocol's AVS (Actively Validated Services). The repository consists of two main packages: `@avaprotocol/sdk-js` (main SDK) and `@avaprotocol/types` (type definitions), with comprehensive testing infrastructure using Docker containers.

## Development Commands

### Build and Development
```bash
# Install dependencies
yarn

# Build all packages
yarn build

# Clean all build artifacts
yarn clean

# Generate protobuf types from latest AVS proto files
yarn run proto-download
yarn run protoc-gen

# Lint code
yarn lint
```

### Testing Infrastructure
```bash
# Run all tests (requires setup)
yarn test

# Run tests with Docker (full e2e environment)
yarn test:docker

# Run specific test pattern
yarn test:docker "authWithSignature"

# Run tests by category
yarn test:core
yarn test:workflows
yarn test:executions
yarn test:triggers
yarn test:nodes
yarn test:integrations

# Run specific test with environment
TEST_ENV=test yarn test:select -- "createTask"
```

**Testing Environment Note:**
When running tests, do not specify TEST_ENV explicitly - the default value `dev` works fine. The test environment configuration is handled automatically.

### Docker Development Environment
The project uses Docker Compose to run a local AVS aggregator for testing:

```bash
# Start local aggregator
docker compose up -d

# Generate API key for tests
yarn run apikey-gen

# Health check aggregator
curl http://localhost:2206/up
```

### Release and Publishing
```bash
# Development releases
yarn version --prerelease --preid dev
npm publish --tag dev

# Production releases using changesets
yarn changeset
yarn release

# Manual publishing
yarn publish
yarn publish:dry-run
```

## Architecture Overview

### Package Structure
- **packages/sdk-js/**: Main SDK implementation with gRPC client and models
- **packages/types/**: Type definitions, enums, and interfaces
- **grpc_codegen/**: Generated gRPC code from protocol buffers
- **tests/**: Comprehensive test suites organized by functionality
- **examples/**: Usage examples and integration patterns

### Core Components

#### Client Architecture
The main `Client` class extends `BaseClient` and provides:
- **Authentication**: Support for both signature-based and API key authentication
- **gRPC Communication**: Type-safe requests with timeout/retry configuration
- **Workflow Management**: Create, submit, trigger, and manage workflows
- **Smart Wallet Integration**: Multi-wallet support with factory patterns

#### Key Models
- **Workflow**: Represents automation workflows with triggers, nodes, and edges
- **Execution**: Tracks workflow execution state and results  
- **Step**: Individual workflow step execution details
- **Node/Trigger Factories**: Create typed workflow components
- **Secret**: Secure credential management

#### Authentication Flow
1. `getSignatureFormat(wallet)` - Get message to sign from server
2. `authWithSignature({ message, signature })` OR `authWithAPIKey({ message, apiKey })`
3. `setAuthKey(authKey)` - Store authentication for subsequent requests

### Testing Strategy

#### Test Organization
- **core/**: Authentication, wallet management
- **workflows/**: Workflow CRUD operations
- **executions/**: Execution monitoring and status
- **triggers/**: Different trigger types (block, cron, manual, event)
- **nodes/**: Node types (REST API, custom code, contract interactions)
- **integrations/**: External service integrations
- **templates/**: Pre-built workflow templates

#### Environment Management
Tests use environment-specific `.env` files:
- `.env.test` - Test environment configuration
- `.env.{environment}` - Environment-specific overrides

Required test environment variables:
- `TEST_PRIVATE_KEY` - Ethereum private key for signature auth
- `TEST_API_KEY` - Admin API key (generated automatically)
- `CHAIN_ENDPOINT` - Ethereum RPC endpoint

### gRPC Integration

#### Protocol Buffer Workflow
1. Download latest `.proto` file: `yarn run proto-download`
2. Generate TypeScript code: `yarn run protoc-gen`  
3. Generated files appear in `grpc_codegen/`

#### Type Conversion
The SDK handles conversion between:
- JavaScript objects ↔ Protocol buffer messages
- Camel case ↔ Snake case field names
- SDK enums ↔ Protobuf enums

### Release Management

#### Workspace Dependencies
The monorepo uses workspace dependencies (`workspace:*`) that get resolved during publishing:
- Development: `prepare` scripts handle resolution automatically
- Production: Changeset workflow manages versioning and publishing

#### Publishing Workflow
1. **Development**: Use `npm publish` (prepare script handles workspace resolution)  
2. **Production**: Use `yarn changeset` + `yarn release` for proper versioning

## Development Patterns

### Timeout Configuration
The SDK supports three timeout presets:
- `TimeoutPresets.FAST` - 5s timeout, 2 retries
- `TimeoutPresets.SLOW` - 2min timeout, 2 retries  
- `TimeoutPresets.NO_RETRY` - 30s timeout, no retries

### Error Handling
- gRPC errors are cleaned and normalized
- Timeout errors include context (attempt count, method name)
- Authentication errors provide helpful guidance

### Testing Best Practices
- Tests run against built `dist/` files, not source
- Docker environment replicates production setup
- Salt-based test isolation prevents conflicts
- Cleanup workflows in `finally` blocks

### Node.js Version Requirements
- **Runtime**: Node.js >= 20.18.0
- **Package Manager**: Yarn >= 1.22.19

## Common Development Tasks

### Adding New Node Types
1. Add type definition in `packages/types/src/node.ts`
2. Implement node class in `packages/sdk-js/src/models/node/`
3. Update `NodeFactory` to handle new type
4. Add tests in `tests/nodes/`

### Adding New Trigger Types
1. Add type definition in `packages/types/src/trigger.ts`
2. Implement trigger class in `packages/sdk-js/src/models/trigger/`
3. Update `TriggerFactory` to handle new type
4. Add tests in `tests/triggers/`

### Protocol Buffer Updates
After updating the AVS repository's `.proto` file:
1. `yarn run proto-download` (updates `grpc_codegen/avs.proto`)
2. `yarn run protoc-gen` (regenerates TypeScript bindings)
3. Update SDK code to handle new/changed fields
4. Update tests to cover new functionality

