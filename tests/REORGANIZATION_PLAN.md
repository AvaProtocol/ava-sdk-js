# Test Folder Reorganization Plan

## Overview
This plan reorganizes the test folder to improve maintainability, reduce duplication, and create clear separation of concerns between different types of testing.

## Current Issues
1. Related functionality is split across multiple files (getWorkflow.test.ts + getWorkflows.test.ts)
2. Node-specific tests are scattered or missing individual coverage
3. `runImmediately.test.ts` is monolithic and tests multiple node types in one file
4. Lack of structured organization for different testing scenarios

## New Structure

```
ava-sdk-js/tests/
├── core/                           # Core SDK functionality tests
│   ├── auth.test.ts               # Authentication tests (existing)
│   ├── client.test.ts             # Basic client setup and configuration
│   └── wallet.test.ts             # Wallet operations (merge getWallet.test.ts + getWallets.test.ts)
│
├── workflows/                      # Workflow management tests
│   ├── workflow.test.ts           # Workflow CRUD (merge getWorkflow.test.ts + getWorkflows.test.ts)
│   ├── createWorkflow.test.ts     # Workflow creation (existing, but reorganized)
│   ├── deleteWorkflow.test.ts     # Workflow deletion (existing)
│   ├── cancelWorkflow.test.ts     # Workflow cancellation (existing)
│   └── triggerWorkflow.test.ts    # Manual workflow triggering (existing)
│
├── executions/                     # Execution management tests
│   ├── execution.test.ts          # Execution queries (merge getExecution.test.ts + getExecutions.test.ts)
│   ├── simulateWorkflow.test.ts   # Workflow simulation (existing)
│   └── runWorkflow.test.ts        # End-to-end workflow execution tests
│
├── triggers/                       # Trigger-specific tests
│   ├── blockTrigger.test.ts       # Block trigger creation and testing
│   ├── cronTrigger.test.ts        # Cron trigger creation and testing
│   ├── fixedTimeTrigger.test.ts   # Fixed time trigger creation and testing
│   ├── eventTrigger.test.ts       # Event trigger creation and testing (existing)
│   └── manualTrigger.test.ts      # Manual trigger testing
│
├── nodes/                          # Individual node type tests
│   ├── ethTransfer.test.ts        # ETH Transfer node (runTrigger + runNode + workflow integration)
│   ├── contractWrite.test.ts      # Contract Write node (runTrigger + runNode + workflow integration)
│   ├── contractRead.test.ts       # Contract Read node (runTrigger + runNode + workflow integration)
│   ├── graphql.test.ts            # GraphQL Query node (runTrigger + runNode + workflow integration)
│   ├── restApi.test.ts            # REST API node (runTrigger + runNode + workflow integration)
│   ├── customCode.test.ts         # Custom Code node (existing, but enhanced)
│   ├── branch.test.ts             # Branch node (existing as branchNode.test.ts)
│   ├── filter.test.ts             # Filter node (existing as filterNode.test.ts)
│   └── loop.test.ts               # Loop node (existing as loopNode.test.ts)
│
├── integrations/                   # Third-party integrations and utilities
│   ├── secret.test.ts             # Secret management (existing)
│   └── tokenMetadata.test.ts      # Token metadata (existing as getTokenMetadata.test.ts)
│
├── utils/                          # Test utilities and shared resources
│   ├── utils.ts                   # Test utilities (existing)
│   ├── envalid.ts                 # Environment configuration (existing)
│   ├── templates.ts               # Template workflows (existing)
│   ├── abis.ts                    # Contract ABIs (existing)
│   └── templates/                 # Template folder (existing)
│       └── loopNode.ts           # Loop node templates (existing)
│
└── mocks/                          # Mock data and servers
    └── api.ts                     # API mocks (existing)
```

## File Responsibilities

### Core Tests
- **auth.test.ts**: Authentication methods, API keys, signatures
- **client.test.ts**: Client initialization, configuration, timeout settings
- **wallet.test.ts**: Smart wallet creation, listing, configuration (merge getWallet + getWallets)

### Workflow Tests
- **workflow.test.ts**: Get workflow(s), workflow listing, pagination (merge getWorkflow + getWorkflows)
- **createWorkflow.test.ts**: Workflow creation with different configurations
- **deleteWorkflow.test.ts**: Workflow deletion and cleanup
- **cancelWorkflow.test.ts**: Workflow cancellation
- **triggerWorkflow.test.ts**: Manual workflow triggering for all trigger types

### Execution Tests
- **execution.test.ts**: Get execution(s), execution status, execution history (merge getExecution + getExecutions)
- **simulateWorkflow.test.ts**: Workflow simulation without actual execution
- **runWorkflow.test.ts**: End-to-end workflow execution with real triggers and node execution

### Trigger Tests
Each trigger test file should include:
- Trigger creation and configuration
- `runTrigger()` method testing
- Integration with workflows
- Edge cases and error handling

### Node Tests
Each node test file should include:
- **Direct Testing**: `runNodeWithInputs()` for immediate execution
- **Trigger Testing**: `runTrigger()` if the node can be triggered directly
- **Workflow Integration**: Node behavior within complete workflows
- **Configuration Testing**: All node configuration options
- **Error Handling**: Invalid configurations, runtime errors
- **Data Transformation**: Input/output data handling

### Integration Tests
- **secret.test.ts**: Secret creation, updates, deletion, usage in workflows
- **tokenMetadata.test.ts**: Token metadata retrieval and caching

## Migration Strategy

### Phase 1: Create New Structure
1. Create folder structure
2. Create new consolidated files (empty initially)

### Phase 2: Migrate Core Tests
1. Move and consolidate auth.test.ts
2. Create client.test.ts from relevant parts
3. Merge getWallet.test.ts + getWallets.test.ts → wallet.test.ts

### Phase 3: Migrate Workflow Tests
1. Merge getWorkflow.test.ts + getWorkflows.test.ts → workflow.test.ts
2. Reorganize createWorkflow.test.ts
3. Keep existing delete/cancel tests

### Phase 4: Migrate Execution Tests
1. Merge getExecution.test.ts + getExecutions.test.ts → execution.test.ts
2. Keep simulateWorkflow.test.ts
3. Create new runWorkflow.test.ts

### Phase 5: Create Trigger Tests
1. Extract trigger-specific tests from existing files
2. Create individual trigger test files
3. Enhance eventTrigger.test.ts

### Phase 6: Create Node Tests
1. Extract node tests from runImmediately.test.ts
2. Create individual node test files with comprehensive coverage
3. Enhance existing node tests (customCode, branch, filter, loop)

### Phase 7: Move Integration Tests
1. Keep secret.test.ts and tokenMetadata.test.ts
2. Reorganize into integrations folder

### Phase 8: Cleanup
1. Remove old files
2. Update imports and references
3. Update CI/CD test configurations

## Test Patterns

### Node Test Template
Each node test should follow this pattern:

```typescript
describe("NodeName Node Tests", () => {
  describe("Direct Execution (runNodeWithInputs)", () => {
    test("should execute with valid configuration", async () => {
      // Test runNodeWithInputs
    });
    
    test("should handle invalid configuration", async () => {
      // Error handling
    });
  });

  describe("Workflow Integration", () => {
    test("should work in complete workflow", async () => {
      // End-to-end workflow test
    });
  });

  describe("Configuration Options", () => {
    test("should handle all configuration parameters", async () => {
      // Test all config options
    });
  });
});
```

### Trigger Test Template
Each trigger test should follow this pattern:

```typescript
describe("TriggerName Trigger Tests", () => {
  describe("Trigger Creation", () => {
    test("should create trigger with valid configuration", async () => {
      // Trigger creation
    });
  });

  describe("Direct Execution (runTrigger)", () => {
    test("should execute trigger logic", async () => {
      // Test runTrigger
    });
  });

  describe("Workflow Integration", () => {
    test("should trigger workflow execution", async () => {
      // Integration test
    });
  });
});
```

## Benefits

1. **Clear Organization**: Related tests are grouped together
2. **Comprehensive Coverage**: Each node type has dedicated test coverage
3. **Reduced Duplication**: Consolidated related functionality
4. **Better Maintainability**: Easier to find and update specific tests
5. **Parallel Development**: Team members can work on different node types independently
6. **Improved CI/CD**: Can run specific test suites based on changes
7. **Better Documentation**: Test structure serves as API documentation

## Implementation Notes

- Maintain backward compatibility during migration
- Update CI/CD pipelines to run new test structure
- Ensure all existing test cases are preserved
- Add missing test coverage identified during reorganization
- Update documentation to reflect new test structure 