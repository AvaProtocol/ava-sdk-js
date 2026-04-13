---
"@avaprotocol/types": major
"@avaprotocol/sdk-js": major
---

Replace `ExecutionStatus.PartialSuccess` with clear SUCCESS/FAILED/ERROR semantics.

**Breaking:** `ExecutionStatus.PartialSuccess` is removed. Use `ExecutionStatus.Failed` for step failures and `ExecutionStatus.Error` for system-level failures. Branch-skip workflows now return `ExecutionStatus.Success`.

Legacy proto value 4 (former PARTIAL_SUCCESS) is mapped to `Failed` automatically — no data migration needed.
