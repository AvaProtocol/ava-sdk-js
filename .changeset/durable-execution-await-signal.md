---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": minor
---

Durable execution: add the `await` pause node and execution `signal` endpoint. A workflow can now pause mid-execution and resume later, exactly-once, surviving aggregator restarts. Adopts the EigenLayer-AVS durable-execution work (SDK hand-off, PRs #643–#647) and regenerates `openapi.gen.ts` from staging.

Additions (non-breaking):

- **`Nodes.await(...)` builder** — a durable pause point with two mutually-exclusive flavors. External-signal (human approval): `channel: "telegram" | "api"` (+ optional `approvers` / `prompt`), resumed via `executions.signal(...)`. Chain-event (cross-chain): `chainEvent` (an `EventTriggerConfig`), resumed automatically when an operator observes the on-chain event. `timeoutSeconds` bounds the wait (0 ⇒ server default, 24h). The XOR is enforced at compile time (overloaded options) and guarded at runtime for a friendly error.
- **`client.executions.signal(id, { workflowId, decision, payload? })`** — `POST /executions/{id}:signal`; delivers an `approve` / `reject` decision (+ optional payload) to a `WAITING` execution and returns the resumed `Execution`. Chain-event awaits are not resumed here.
- **New `v4` type aliases:** `AwaitNode`, `AwaitNodeConfig`, `EventTriggerConfig`, `SignalExecutionRequest`.

- **`ExecutionStatus` gains `"waiting"`** — the regenerated enum now carries the non-terminal `waiting` state a durable execution reports while paused at an `await` node. It surfaces consistently across `GET /executions/{id}`, `:getStatus`, `:stream`, and `:trigger` (EigenLayer-AVS #648).

Behavior notes:

- `executions.waitForTerminal` / `stream` treat the paused `waiting` state as non-terminal (terminal is the `success` / `failed` / `error` allow-list), so a human-approval pause keeps waiting until a `signal(...)` resumes it. Consumers that want to react to the pause can `stream(...)` and branch on `status === "waiting"`.
