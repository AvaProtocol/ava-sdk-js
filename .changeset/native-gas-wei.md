---
"@avaprotocol/types": minor
---

Regenerate OpenAPI types from EigenLayer-AVS staging.

`nativeGasWei` is the self-funded gas inside a native spend cap. It is optional on `SessionPolicyNeed` (steady UserOps of one workflow), `SessionPolicyAddition` (already included in that addition's cap; prepare does not add it again), and `SessionPolicyChanges` (enabled automations' steady gas, one install when the grant is not yet applied, plus the addition's gas). It is not a field on prepare's top-level permissions or on submit. `policies.grant` forwards `add.nativeGasWei` with the prepare request and echoes the merged `nativeSpendCap`, which already includes that gas.

Also in this spec: `Execution.summary` and `ExecutionStatusSummary.summary` are an `ExecutionSummary` with `subject` (report title) and `body` (structured report); prepare and submit document `SESSION_POLICY_TOO_MANY_NATIVE_RECIPIENTS` and `SESSION_POLICY_RECIPIENT_NOT_EOA`; create and resume document `SESSION_POLICY_EXPIRED`; the auth exchange documents `AUTH_EXPIRY_TOO_FAR` (token expiry at most 48 hours).
