# API Migration Status - runNodeWithInputs & runTrigger

## Overview
Both `runNodeWithInputs` and `runTrigger` APIs have been updated to use complete object structures instead of separate type + config fields, providing consistency across the SDK.

## Changes Made

### 1. SDK Code (✅ Complete)

#### runNodeWithInputs API Change
- **File**: `packages/sdk-js/src/index.ts`
- **Changes**: Updated to accept complete `TaskNode` object instead of separate `nodeType` + `nodeConfig`

**Old API:**
```typescript
await client.runNodeWithInputs({
  nodeType: NodeType.ContractWrite,
  nodeConfig: { contractAddress: "0x...", callData: "0x..." },
  inputVariables: { settings: {...} }
})
```

**New API:**
```typescript
await client.runNodeWithInputs({
  node: {
    id: getNextId(),
    name: "node_name",
    type: NodeType.ContractWrite,
    data: { contractAddress: "0x...", callData: "0x..." }
  },
  inputVariables: { settings: {...} }
})
```

#### runTrigger API Change
- **File**: `packages/sdk-js/src/index.ts`
- **Changes**: Updated to accept complete `TaskTrigger` object instead of separate `triggerType` + `triggerConfig`

**Old API:**
```typescript
await client.runTrigger({
  triggerType: TriggerType.Manual,
  triggerConfig: { data: {...}, headers: {...} }
})
```

**New API:**
```typescript
await client.runTrigger({
  trigger: {
    id: getNextId(),
    name: "trigger_name",
    type: TriggerType.Manual,
    data: { data: {...}, headers: {...}, lang: Lang.JSON }
  }
})
```

**Consistency Pattern:**
Both APIs now follow the same pattern as `simulateWorkflow`, using complete object structures with `id`, `name`, `type`, and `data` fields.

### 2. Types (✅ Complete)
- **File**: `packages/types/src/api.ts`
- **Changes**:
  - `RunNodeWithInputsRequest`: Now has `node: NodeProps` instead of `nodeType` + `nodeConfig`
  - `RunTriggerRequest`: Now has `trigger: TriggerProps` instead of `triggerType` + `triggerConfig`
  - Added optional `triggerInput` field for runTrigger

### 3. Test Files (✅ Complete - 6/6 files converted, 100% done)

#### Converted Files:
- ✅ `tests/templates/exported-workflow-consistency.test.ts` (1 occurrence)
- ✅ `tests/templates/telegram-alert-on-transfer.test.ts` (1 occurrence)
- ✅ `tests/triggers/block.test.ts` (8 occurrences)
- ✅ `tests/triggers/cron.test.ts` (11 occurrences)
- ✅ `tests/triggers/manual.test.ts` (29 occurrences)
- ✅ `tests/triggers/eventTrigger.test.ts` (16 occurrences)

**Total**: 66 occurrences (66 done, 0 remaining) ✅

## Backend Dependency

### Status
⚠️ The backend server has NOT yet deployed the updated protobuf changes. When testing, the server returns:
```
error: 'unsupported trigger type: TRIGGER_TYPE_UNSPECIFIED'
```

### Root Cause
- Client correctly sends `trigger.type = TRIGGER_TYPE_MANUAL` (verified with debug logging)
- Server is still expecting the OLD API structure (separate `trigger_type` + `trigger_config` fields)
- Server cannot parse the new `RunTriggerReq.trigger` field, so it sees type as `UNSPECIFIED`

### Next Steps
1. ✅ **SDK team**: All test file conversions are complete (66/66 occurrences)
2. ⚠️ **Backend team**: Deploy updated AVS proto with new `RunTriggerReq` structure
3. ⏳ **SDK team**: Re-run all tests to verify the migration once backend is updated

## Testing Status

### What Works:
- ✅ SDK code compiles successfully
- ✅ Client correctly serializes the new API structure  
- ✅ Execution.test.ts transaction conflict fixed (100ms delay between non-blocking triggers)
- ✅ All test files converted to new API (66/66 occurrences)

### What's Blocked:
- ❌ All `runTrigger` tests fail due to backend not supporting new API
- ⏳ Cannot verify test conversions until backend is updated

## Other Improvements in This PR

1. **execution.test.ts Transaction Conflict Fix**:
   - Added 100ms delay between non-blocking `triggerWorkflow` calls
   - Prevents race condition in atomic execution index counter
   - Test now passes reliably

## Proto Reference

**Consistent API Structure** - All three APIs now use the same pattern:

### RunNodeWithInputsReq (lines 1230-1235)
```protobuf
message RunNodeWithInputsReq {
  TaskNode node = 1; // Complete node definition
  // Field 2 was node_config (removed in Jan 2025) - do not reuse
  map<string, google.protobuf.Value> input_variables = 3;
}
```

### RunTriggerReq (lines 1263-1268)
```protobuf
message RunTriggerReq {
  TaskTrigger trigger = 1; // Complete trigger definition
  // Field 2 was trigger_config (removed in Jan 2025) - do not reuse
  map<string, google.protobuf.Value> trigger_input = 3;
}
```

### SimulateTaskReq (lines 1293-1299)
```protobuf
message SimulateTaskReq {
  TaskTrigger trigger = 1;
  repeated TaskNode nodes = 2;
  repeated TaskEdge edges = 3;
  map<string, google.protobuf.Value> input_variables = 6;
}
```

**Pattern**: All use complete objects (TaskNode/TaskTrigger) with `id`, `name`, `type`, and type-specific data.
