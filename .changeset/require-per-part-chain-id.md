---
"@avaprotocol/sdk-js": major
"@avaprotocol/types": major
---

Chain decoupling: `chainId` is now a property of each chain-aware part, not of the workflow. Adopts the EigenLayer-AVS renovation (PR #634) and regenerates `openapi.gen.ts` from staging.

BREAKING CHANGES:

- **Workflow-level chain removed.** `Workflow.chainId` and `CreateWorkflowRequest.chainId` are gone — stop sending a workflow-level `chainId`. The `chainId` query param is dropped from `workflows.list/count` and `executions.list/count/stats` (a per-chain view is derived client-side from the parts).
- **Per-part `chainId` is required.** `Nodes.contractRead` / `contractWrite` / `ethTransfer` and `Triggers.block` / `event` builders now require `chainId` (was optional) and always emit it. A chain-aware part that omits its chain is rejected at create with HTTP 400 (`requires an explicit chain_id`), never flattened to a default.

Non-breaking additions/retentions:

- `Triggers.event` query gains `contractAbi` and `methodCalls`, required for condition-based filtering on decoded event fields (e.g. `AnswerUpdated.current`).
- `workflows.simulate` and `workflows.estimateFees` keep their request-level `chainId`.

Allowed chains are the configured set (Ethereum, Base, Sepolia, Base Sepolia).
