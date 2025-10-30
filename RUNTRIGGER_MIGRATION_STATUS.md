# runTrigger API Migration Status

## Overview
The `runTrigger` API has been updated to match the new protobuf structure, consistent with the `runNodeWithInputs` pattern.

## Changes Made

### 1. SDK Code (✅ Complete)
- **File**: `packages/sdk-js/src/index.ts`
- **Changes**: 
  - Updated `runTrigger()` to accept complete `TaskTrigger` object instead of separate `triggerType` + `triggerConfig`
  - Now uses `TriggerFactory.create()` pattern consistent with `simulateWorkflow` and `runNodeWithInputs`
  
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

### 2. Types (✅ Complete)
- **File**: `packages/types/src/api.ts`
- **Changes**:
  - `RunTriggerRequest` now has `trigger: TriggerProps` instead of `triggerType` + `triggerConfig`
  - Added optional `triggerInput` field for input variables

### 3. Test Files (⏳ Partial - 4/6 files converted, 32% done)

#### Converted Files:
- ✅ `tests/templates/exported-workflow-consistency.test.ts` (1 occurrence)
- ✅ `tests/templates/telegram-alert-on-transfer.test.ts` (1 occurrence)
- ✅ `tests/triggers/block.test.ts` (8 occurrences)
- ✅ `tests/triggers/cron.test.ts` (11 occurrences)

#### Pending Conversion (waiting for backend):
- ⏳ `tests/triggers/eventTrigger.test.ts` (16 occurrences)
- ⏳ `tests/triggers/manual.test.ts` (29 occurrences)

**Total**: 66 occurrences (21 done, 45 remaining)

## Backend Dependency

### Issue
The backend server has NOT yet deployed the updated protobuf changes. When testing, the server returns:
```
error: 'unsupported trigger type: TRIGGER_TYPE_UNSPECIFIED'
```

### Root Cause
- Client correctly sends `trigger.type = TRIGGER_TYPE_MANUAL` (verified with debug logging)
- Server is still expecting the OLD API structure (separate `trigger_type` + `trigger_config` fields)
- Server cannot parse the new `RunTriggerReq.trigger` field, so it sees type as `UNSPECIFIED`

### Next Steps
1. **Backend team**: Deploy updated AVS proto with new `RunTriggerReq` structure
2. **SDK team**: Complete test file conversions once backend is ready
3. **SDK team**: Re-run all tests to verify the migration

## Testing Status

### What Works:
- ✅ SDK code compiles successfully
- ✅ Client correctly serializes the new API structure  
- ✅ Execution.test.ts transaction conflict fixed (100ms delay between non-blocking triggers)

### What's Blocked:
- ❌ All `runTrigger` tests fail due to backend not supporting new API
- ⏳ Cannot verify test conversions until backend is updated

## Other Improvements in This PR

1. **execution.test.ts Transaction Conflict Fix**:
   - Added 100ms delay between non-blocking `triggerWorkflow` calls
   - Prevents race condition in atomic execution index counter
   - Test now passes reliably

## Proto Reference

**New structure** (avs.proto lines 1263-1268):
```protobuf
message RunTriggerReq {
  TaskTrigger trigger = 1; // Complete trigger definition
  // Field 2 was trigger_config (removed in Jan 2025) - do not reuse
  map<string, google.protobuf.Value> trigger_input = 3;
}
```

This matches the pattern used by:
- `RunNodeWithInputsReq` (lines 1230-1235)
- `SimulateTaskReq` (lines 1293-1299)
