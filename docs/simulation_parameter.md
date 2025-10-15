# isSimulated Parameter

This document describes the new `isSimulated` parameter added to the `runNodeWithInputs` method in the AVA SDK.

## Overview

The `isSimulated` parameter allows you to control whether node execution should use simulation mode (Tenderly) or real blockchain execution. This provides better control over when actual blockchain transactions are executed vs when they are only simulated for testing purposes.

## API Changes

### RunNodeWithInputsRequest Interface

```typescript
export interface RunNodeWithInputsRequest {
  nodeType: string;
  nodeConfig: Record<string, any>;
  inputVariables?: Record<string, any>;
  isSimulated?: boolean; // Optional: If true (or unset), use simulation; if explicitly false, execute real UserOp. When unset, backend defaults to true (simulation mode).
}
```

### runNodeWithInputs Method

```typescript
async runNodeWithInputs({
  nodeType,
  nodeConfig,
  inputVariables = {},
  isSimulated // Optional: When unset, backend defaults to true (simulation mode)
}: RunNodeWithInputsRequest): Promise<RunNodeWithInputsResponse>
```

## Usage Examples

### 1. Default Behavior (Simulation Mode)

```typescript
// isSimulated not specified - backend defaults to true (simulation mode)
const result = await client.runNodeWithInputs({
  nodeType: "contractWrite",
  nodeConfig: {
    contractAddress: "0x...",
    contractAbi: [...],
    methodCalls: [...]
  }
});
```

### 2. Explicit Simulation Mode

```typescript
// Explicitly enable simulation mode
const result = await client.runNodeWithInputs({
  nodeType: "contractWrite",
  nodeConfig: {
    contractAddress: "0x...",
    contractAbi: [...],
    methodCalls: [...]
  },
  isSimulated: true // Safe testing - no real transactions
});
```

### 3. Real Execution Mode

```typescript
// Enable real blockchain execution
const result = await client.runNodeWithInputs({
  nodeType: "contractWrite",
  nodeConfig: {
    contractAddress: "0x...",
    contractAbi: [...],
    methodCalls: [...]
  },
  isSimulated: false // CAUTION: This will execute real transactions!
});
```

## Node Type Behavior

### Read-Only Nodes
For read-only nodes (like `balance`, `contractRead`, `oracle`), the `isSimulated` parameter has minimal impact since these operations don't modify blockchain state.

### Write Nodes
For write nodes (like `contractWrite`), the parameter has significant impact:

- **`isSimulated: true`** (default): Uses Tenderly simulation - safe for testing, no gas costs, no real state changes
- **`isSimulated: false`**: Executes real blockchain transactions - costs gas, modifies actual blockchain state

## Backward Compatibility

The new parameter is optional. When not specified, the backend defaults to `true` (simulation mode), ensuring existing code continues to work without changes while maintaining the safe default behavior.

## Example Workflow: Uniswap Approval and Swap

Here's an example that demonstrates testing a Uniswap approval and swap workflow:

```typescript
const workflowConfig = {
  usdcAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
  swapRouterAddress: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
  walletAddress: "0x71c8f4D7D5291EdCb3A081802e7efB2788Bd232e"
};

// 1. First, test the approval in simulation mode
const approvalSimulation = await client.runNodeWithInputs({
  nodeType: "contractWrite",
  nodeConfig: {
    contractAddress: workflowConfig.usdcAddress,
    contractAbi: [/* ERC20 ABI */],
    methodCalls: [{
      methodName: "approve",
      methodParams: [workflowConfig.swapRouterAddress, "1000000"]
    }],
    value: "0",
    gasLimit: "44909"
  },
  isSimulated: true // Test first
});

console.log("Approval simulation:", approvalSimulation.success ? "✅" : "❌");

// 2. If simulation succeeds, optionally execute for real
if (approvalSimulation.success) {
  const realApproval = await client.runNodeWithInputs({
    nodeType: "contractWrite",
    nodeConfig: {
      contractAddress: workflowConfig.usdcAddress,
      contractAbi: [/* ERC20 ABI */],
      methodCalls: [{
        methodName: "approve", 
        methodParams: [workflowConfig.swapRouterAddress, "1000000"]
      }],
      value: "0",
      gasLimit: "44909"
    },
    isSimulated: false // Real execution
  });
  
  console.log("Real approval:", realApproval.success ? "✅" : "❌");
}
```

## Implementation Details

### Protocol Buffer Changes

The underlying `RunNodeWithInputsReq` message was updated to include:

```protobuf
message RunNodeWithInputsReq {
  NodeType node_type = 1;
  map<string, google.protobuf.Value> node_config = 2;
  map<string, google.protobuf.Value> input_variables = 3;
  // IMPORTANT: Using 'optional' generates a pointer (*bool) in Go, allowing us to detect unset state.
  // When unset (nil), defaults to true (simulation mode) for safety.
  // When explicitly set to true, use simulation. When explicitly set to false, use real execution.
  optional bool is_simulated = 4;
}
```

### Backend Changes

The backend `RunNodeImmediately` function was updated to:

1. Accept an optional `isSimulated` parameter (protobuf `optional bool`, which becomes `*bool` in Go)
2. When the parameter is `nil` (unset), default to `true` (simulation mode) for safety
3. When explicitly set to `true` or `false`, use the specified mode
4. Pass the simulation mode to the execution engine
5. Use Tenderly simulation when `true`, real execution when `false`

## Testing

A comprehensive test suite was added in `tests/executions/runNodeWithInputs.test.ts` that validates:

1. Default behavior (simulation mode when isSimulated is not specified)
2. Explicit simulation mode (isSimulated: true)
3. Real execution mode (isSimulated: false)
4. ContractWrite with both simulation and real execution modes
5. Read-only operations (ContractRead) with both modes
6. Proper handling of the optional parameter at the protobuf level

## Safety Considerations

⚠️ **Important**: When using `isSimulated: false`, you are executing real blockchain transactions that:
- Cost real gas fees
- Modify actual blockchain state
- Cannot be undone

Always test with `isSimulated: true` first before switching to real execution mode.

## Migration Guide

Existing code will continue to work without changes since the backend defaults `isSimulated` to `true` when not specified. To opt into real execution, simply add `isSimulated: false` to your `runNodeWithInputs` calls.

```typescript
// Before (still works - backend defaults to simulation mode)
await client.runNodeWithInputs({
  nodeType: "contractWrite",
  nodeConfig: {...}
});

// After (with explicit control)
await client.runNodeWithInputs({
  nodeType: "contractWrite", 
  nodeConfig: {...},
  isSimulated: false // or true for explicit simulation
});
```

## SDK Implementation Details

The SDK now properly handles the optional nature of `isSimulated`:

```typescript
// Only set isSimulated if explicitly provided (optional field in protobuf)
// When unset, the backend defaults to true (simulation mode)
if (isSimulated !== undefined) {
  request.setIsSimulated(isSimulated);
}
```

This ensures that:
1. When `isSimulated` is not provided, the field remains unset in the protobuf message
2. The backend receives `nil` for the optional bool pointer in Go
3. The backend applies its default value of `true` (simulation mode)
4. When `isSimulated` is explicitly `true` or `false`, that value is sent to the backend