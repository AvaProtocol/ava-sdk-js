# SimulateWorkflow Bug Analysis

## Problem

Workflow simulation completes successfully on the backend but returns no visible results in the `CanvasToolbarBottom` UI. The toolbar shows no `NodeStep` entries because the execution result contains empty steps.

## Root Cause

`TypeError: e.getAutomationFee is not a function` in `@avaprotocol/sdk-js@2.12.1`

The SDK's `Execution.fromResponse()` calls `execution.getAutomationFee()` on the protobuf response object, but the method doesn't exist on the deserialized instance due to a **module aliasing mismatch** when Next.js re-bundles the SDK.

- `proto.aggregator.Execution.prototype.getAutomationFee` IS defined in the bundled `dist/index.js` (line 8698)
- `dist/models/execution.js` imports from `@/grpc_codegen/avs_pb` — a path alias that resolves to a **different module instance** under Next.js bundling
- The response object deserialized via one protobuf instance doesn't carry the `getAutomationFee` prototype method from the other instance
- The SDK CHANGELOG for `2.12.1` claims to fix this (`a6f7b8d: fix: resolve getAutomationFee function not found problem`), but the fix is incomplete for Next.js environments

## Error Flow

```
1. client.simulateWorkflow(params)        — gRPC call succeeds
2. Execution.fromResponse(result)         — calls result.getAutomationFee() → THROWS
3. executionController.ts catch block     — catches TypeError, returns synthetic failed ExecutionProps
4. simulateActions.ts                     — wraps as { success: true, data: syntheticExecution }
5. useSimulation.ts                       — sets simulationResult with steps: []
6. CanvasToolbarBottom                    — nothing to render (no NodeStep entries)
```

## Files Involved

| Layer | File | Role |
|-------|------|------|
| UI | `components/CanvasToolbarBottom/index.tsx` | Renders simulation results, calls `onSimulateWorkflow` |
| Hook | `app/hooks/useSimulation.ts` | Manages simulation state, calls action |
| Action | `app/actions/simulateActions.ts` | Server action wrapping controller |
| Controller | `app/controllers/executionController.ts` | Calls SDK, catches error, returns synthetic execution |
| SDK | `node_modules/@avaprotocol/sdk-js/dist/index.js` | gRPC client, `simulateWorkflow` method |
| SDK Model | `node_modules/@avaprotocol/sdk-js/dist/models/execution.js` | `fromResponse()` — crash site |

## Key Code Locations

**SDK crash site** — `node_modules/@avaprotocol/sdk-js/dist/models/execution.js:51-52`:
```js
static fromResponse(execution) {
    const automationFeePb = execution.getAutomationFee(); // ← TypeError thrown here
```

**Controller catch** — `app/controllers/executionController.ts:266-278`:
```typescript
// Returns synthetic failed execution instead of throwing
return {
  id: `error-${Date.now()}`,
  startAt: startAtLocal,
  endAt: endAt,
  error: errorMessage,       // "e.getAutomationFee is not a function" (leaked internal error)
  result: "failed",
  steps: [],                 // Empty — causes blank UI
  status: ExecutionStatus.Failed,
};
```

**Hook handling** — `app/hooks/useSimulation.ts:56-57`:
```typescript
if (response.success) {
  setSimulationResult(response.data); // Sets result with empty steps
```

## Original Log Traces

### Simulation Request (params logged by controller)

```
🚀 ~ simulateWorkflow ~ params: {
  trigger: {
    id: '01K2H450DVV4APEFCRK08BP5B2',
    name: 'timeTrigger',
    type: 'cronTrigger',
    data: { schedules: [ '*/10 * * * *' ] }
  },
  nodes: [
    {
      id: '01KFGZH8JF0Z7RHQXP6QQFN62F',
      name: 'balance1',
      type: 'balance',
      data: {
        address: '{{settings.runner}}',
        chain: 'base',
        tokenAddresses: [ '{{settings.token_amount.address}}' ],
        includeSpam: false
      }
    },
    {
      id: '01KFH6ETEFS0E9WPKV2WCDFRFH',
      name: 'transfer1',
      type: 'ethTransfer',
      data: {
        destination: '{{settings.recipient}}',
        amount: '{{settings.token_amount.amount}}'
      }
    },
    {
      id: '01K2JTNQBQHX00PRBE5X14Q932',
      name: 'telegram_send',
      type: 'restApi',
      data: {
        url: 'https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage',
        method: 'POST',
        body: '{"chat_id":"452247333","text":"","parse_mode":"HTML"}',
        headers: { 'Content-Type': 'application/json' },
        options: { summarize: true }
      }
    }
  ],
  edges: [
    {
      id: 'xy-edge__01K2H450DVV4APEFCRK08BP5B2source_01K2H450DVV4APEFCRK08BP5B2-01KFGZH8JF0Z7RHQXP6QQFN62Ftarget_01KFGZH8JF0Z7RHQXP6QQFN62F',
      source: '01K2H450DVV4APEFCRK08BP5B2',
      target: '01KFGZH8JF0Z7RHQXP6QQFN62F'
    },
    {
      id: 'xy-edge__01KFGZH8JF0Z7RHQXP6QQFN62Fsource_01KFGZH8JF0Z7RHQXP6QQFN62F-01KFH6ETEFS0E9WPKV2WCDFRFHtarget_01KFH6ETEFS0E9WPKV2WCDFRFH',
      source: '01KFGZH8JF0Z7RHQXP6QQFN62F',
      target: '01KFH6ETEFS0E9WPKV2WCDFRFH'
    },
    {
      id: 'xy-edge__01KFH6ETEFS0E9WPKV2WCDFRFHsource_01KFH6ETEFS0E9WPKV2WCDFRFH-01K2JTNQBQHX00PRBE5X14Q932target_01K2JTNQBQHX00PRBE5X14Q932',
      source: '01KFH6ETEFS0E9WPKV2WCDFRFH',
      target: '01K2JTNQBQHX00PRBE5X14Q932'
    }
  ],
  inputVariables: {
    settings: {
      chain: 'Base',
      chainId: 11155111,
      chain_id: 8453,
      recipient: '0xfE66125343Aabda4A330DA667431eC1Acb7BbDA9',
      token_amount: {
        amount: '100000000000000',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18
      },
      name: 'Recurring Payment with Telegram Report',
      runner: '0x50f9Cc9B21b4Bb5bB6c9ff685a63665c13E85FfC'
    }
  }
}
```

### Error Stack Trace

```
🚀 ~ simulateWorkflow ~ error: TypeError: e.getAutomationFee is not a function
    at A.fromResponse (/var/task/.next/server/chunks/9744.js:146:3923217)
    at A2.simulateWorkflow (/var/task/.next/server/chunks/9744.js:146:3937469)
    at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
    at async y (/var/task/.next/server/chunks/4836.js:71:101952)
    at async m (/var/task/.next/server/app/workflow/[flowId]/page.js:2:435090)
    at async rE (/var/task/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:15:8148)
    at async r7 (/var/task/node_modules/next/dist/compiled/next-server/app-page.runtime.prod.js:18:1144)
    at async en (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:16:26375)
    at async ea.responseCache.get.routeKind (/var/task/node_modules/next/dist/compiled/next-server/server.runtime.prod.js:17:1028)

Error name: TypeError
Error isValidationError: undefined
Error field: undefined
Error constructor name: TypeError
Error instanceof UserInputError: false
```

## Suggested Fix

**Option 1: Patch the SDK with `patch-package`** (recommended, quickest)

Guard `getAutomationFee` in `node_modules/@avaprotocol/sdk-js/dist/models/execution.js`:

```js
static fromResponse(execution) {
    const automationFeePb = typeof execution.getAutomationFee === 'function'
        ? execution.getAutomationFee()
        : undefined;
    // ... rest unchanged
}
```

**Option 2: Report upstream to `@avaprotocol/sdk-js`**

The `2.12.1` fix is incomplete — `getAutomationFee` is defined on the prototype in the monolithic bundle but not available when Next.js re-bundles the separate model files due to the `@/grpc_codegen/avs_pb` path alias resolving to a different module instance.

---

*Analysis date: 2026-02-19*
