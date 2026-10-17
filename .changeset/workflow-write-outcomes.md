---
"@avaprotocol/types": minor
"@avaprotocol/sdk-js": patch
---

Export `ExecutionErrorCode` for unresolved UserOperation confirmations, confirmed
UserOperation reverts, and writes skipped after a failed prerequisite. Document
execution-step metadata and the distinction between outer transaction status
and inner execution status. Add a REST workflow-simulation regression case for
failed approvals and dependent writes, and correct the gas regression test to
assert v4 top-level gas fields and their arithmetic.
