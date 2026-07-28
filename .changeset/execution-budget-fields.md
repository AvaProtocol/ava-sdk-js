---
"@avaprotocol/types": minor
"@avaprotocol/sdk-js": minor
---

Surface the gateway's execution-budget fields on the `Workflow` response.

Regenerated from the AVS OpenAPI spec (EigenLayer-AVS #673/#674), which added
constant execution ceilings to the gateway. `v4.Workflow` is an alias for
`components["schemas"]["Workflow"]` and `sdk-js` re-exports `v4`, so both
packages pick these up without any hand-written type changes.

- `remainingExecutions?: number` — `maxExecution - executionCount`, floored at 0,
  computed server-side. Prefer it over subtracting the two fields yourself:
  `executionCount` is omitted when zero, so a client-side subtraction on a
  never-run workflow reads an absent field. It is emitted **even when 0**,
  because 0 is exactly the state where the workflow has stopped. Absent only on
  legacy uncapped workflows, where no finite number exists.
- `completionReason?: "TASK_COMPLETION_REASON_UNSPECIFIED" |
  "TASK_COMPLETION_REASON_MAX_EXECUTIONS_REACHED" |
  "TASK_COMPLETION_REASON_EXPIRED"` — an exhausted budget and a passed expiry
  both produce `status: "completed"`, and nothing previously distinguished them.
  Cancellation is not represented because cancelling deletes the workflow rather
  than leaving a terminal record.
- `maxExecution` on `CreateWorkflowRequest` now documents `minimum: 1`.

Two request-shape changes callers must handle — the gateway rejects them, so
they surface as `400`s rather than type errors:

- **`maxExecution: 0` is no longer accepted.** It used to mean "run forever".
  Omit the field to take the server default; an explicit `0` (or a negative,
  which the executor also read as unlimited) is rejected.
- **Trigger floors.** Cron may not fire more often than every 5 minutes; block
  triggers may not fire more often than every 60s, which is per-chain in blocks —
  at least 5 on Ethereum/Sepolia, 30 on Base, 80 on BNB. `interval: 1` was
  previously valid and is now rejected.

`maxExecution` also changes shape in responses: it previously used omitempty and
defaulted to `0`, so the field was **absent from every workflow**. It is now
always present and finite on workflows created since the gateway change. Code
branching on its absence changes behaviour — absent now means a legacy uncapped
workflow, not "unlimited by default".
