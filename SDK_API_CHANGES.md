# SDK API Changes - Client Migration Guide

## Overview

This document describes interface changes in the SDK that may affect your code. These changes improve consistency and align with JavaScript best practices.

---

## Breaking Changes

### 1. Event Trigger Topics: Use `null` for Wildcards

**What Changed:**  
When creating event triggers, wildcard topic positions must use `null` instead of empty string `""`.

**Why:**  
The SDK internally uses `null` to represent "any value" wildcards, matching JavaScript conventions. Using `""` causes type mismatches after round-trip serialization.

#### Migration Required

**Before (Deprecated):**
```typescript
const trigger = TriggerFactory.create({
  type: TriggerType.Event,
  data: {
    queries: [{
      addresses: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "",  // ❌ Empty string - DEPRECATED
        walletAddress,
      ],
    }],
  },
});
```

**After (Correct):**
```typescript
const trigger = TriggerFactory.create({
  type: TriggerType.Event,
  data: {
    queries: [{
      addresses: ["0xA0b86a33E6441e6067ec0da4Cc2C8ae77d85e7b1"],
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        null,  // ✅ Use null for wildcard
        walletAddress,
      ],
    }],
  },
});
```

**Impact:**
- Workflows with `""` in topics will still work (SDK converts automatically)
- **However:** When you retrieve the workflow, you'll receive `null` instead of `""`
- **Action Required:** Update your code to expect and use `null` for wildcards

---

### 2. Event Trigger Response Field: `contractAddress`

**What Changed:**  
Event trigger responses now consistently use `contractAddress` field name across all methods.

**Why:**  
Previously, different methods returned different field names (`tokenContract` vs `contractAddress`). This is now standardized.

#### Migration Required

**Before:**
```typescript
// runTrigger returned 'tokenContract'
const result = await client.runTrigger({ /* ... */ });
const address = result.data.tokenContract;  // ❌ Old field name
```

**After:**
```typescript
// All methods now return 'contractAddress'
const result = await client.runTrigger({ /* ... */ });
const address = result.data.contractAddress;  // ✅ Standardized field name
```

**Affected Methods:**
- `client.runTrigger()`
- `client.simulateWorkflow()`
- `client.triggerWorkflow()` / `client.getExecutions()`

**Impact:**
- Old field name `tokenContract` is no longer returned
- **Action Required:** Update all references from `tokenContract` to `contractAddress`

---

### 3. Event Trigger `success` Field Semantics

**What Changed:**  
The meaning of the `success` field in event trigger responses has been clarified.

**Correct Interpretation:**

| Scenario | `success` | `data` | `error` | Meaning |
|----------|-----------|--------|---------|---------|
| Events found | `true` | `{...}` | `""` | Trigger condition was satisfied |
| No events found | `false` | `null` | `""` | Trigger condition not met (not an error) |
| Query failed | `false` | `null` | `"..."` | Technical error occurred |

#### Migration Required

**Before (Incorrect):**
```typescript
const result = await client.runTrigger({
  triggerType: TriggerType.Event,
  triggerConfig: { /* ... */ }
});

if (result.success) {
  // Process events
  console.log("Query succeeded");  // ❌ Wrong interpretation
}
```

**After (Correct):**
```typescript
const result = await client.runTrigger({
  triggerType: TriggerType.Event,
  triggerConfig: { /* ... */ }
});

if (result.success) {
  // Events were found - trigger fired
  console.log("Events found:", result.data);
} else if (result.error) {
  // Technical error occurred
  console.error("Query failed:", result.error);
} else {
  // No events found - not an error, just no matches
  console.log("No matching events");
}
```

**Impact:**
- `success: false` with `data: null` and `error: ""` now means "no events found"
- This is **not an error condition**, just an empty result
- **Action Required:** Update your error handling logic to check both `success` and `error` fields

---

## Non-Breaking Changes

### Optional Field: `eventFound`

**What Changed:**  
The `eventFound` field in event trigger responses is now explicitly optional and may not be present in all responses.

**Before:**
```typescript
const data = executionStep.output;
if (data.eventFound) {  // May be undefined
  // ...
}
```

**After:**
```typescript
const data = executionStep.output;
// Check for event data presence using other fields
if (data.contractAddress && data.topics) {
  // Event data is present
}
```

**Impact:**
- No breaking change - field was always optional
- **Recommendation:** Don't rely on `eventFound` field; check for presence of actual data fields

---

## Quick Migration Checklist

### For Existing Code

- [ ] **Search for:** `topics:` arrays with `""` → Replace with `null`
- [ ] **Search for:** `.tokenContract` → Replace with `.contractAddress`
- [ ] **Review:** Error handling logic for `success: false` cases
- [ ] **Test:** Workflows that monitor events with wildcards

### Example Migration

**Before:**
```typescript
// Creating event trigger
const trigger = TriggerFactory.create({
  type: TriggerType.Event,
  data: {
    queries: [{
      addresses: ["0x..."],
      topics: ["0xddf2...", "", wallet.address],  // ❌ Empty string
    }],
  },
});

// Processing results
const result = await client.runTrigger({ /* ... */ });
if (!result.success) {
  console.error("Failed!");  // ❌ Wrong - might just be no events
  return;
}
const address = result.data.tokenContract;  // ❌ Old field name
```

**After:**
```typescript
// Creating event trigger
const trigger = TriggerFactory.create({
  type: TriggerType.Event,
  data: {
    queries: [{
      addresses: ["0x..."],
      topics: ["0xddf2...", null, wallet.address],  // ✅ Use null
    }],
  },
});

// Processing results
const result = await client.runTrigger({ /* ... */ });
if (result.error) {
  console.error("Query failed:", result.error);  // ✅ Actual error
  return;
}
if (!result.success) {
  console.log("No events found");  // ✅ Empty result, not error
  return;
}
const address = result.data.contractAddress;  // ✅ New field name
```

---

## TypeScript Types Updated

If you're using TypeScript, the following type changes may affect you:

### EventTriggerDataType

```typescript
// topics array elements are now explicitly null | string
type EventTriggerDataType = {
  queries: Array<{
    addresses: string[];
    topics: (string | null)[];  // ✅ null is now explicit
    // ...
  }>;
};
```
