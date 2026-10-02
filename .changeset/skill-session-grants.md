---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": minor
---

Session grants for Skills. Simulate can opt in to an authorization verdict. Prepare accepts an `add` fragment and returns the merged permission set, `basePolicyId`, and `changes`. Submit reports `SESSION_POLICY_BASE_CHANGED` and `SESSION_POLICY_NOT_COVERING`. `policies.grant` echoes the merged set and prepare's `basePolicyId` (including "") when `add` is set, echoes a caller-supplied `basePolicyId` (including "") on a full-set grant, and forwards `dropTaskIds`.
