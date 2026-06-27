# SDK chain-decoupling renovation — tracking & inventory

**Status:** Track A + Track B **source implemented** (2026-06-26); awaiting a
gateway built from `staging` for end-to-end runtime verification + the release
changeset. **Date:** 2026-06-26.
**Upstream:** `EigenLayer-AVS/PLAN_CHAIN_DECOUPLING.md` (backend leads, bottom-up).

> **#634 merged + #639 fixed and VERIFIED (2026-06-26).** Types regenerated;
> builders + resources + tests + example updated. Against the local v4.0.0
> gateway (`:8080`, start.sh, with the #639 fix): the multichain create→retrieve
> round-trip **passes**, and the **full `yarn test` suite is 283 passed / 1
> skipped / 285**, with **0 int64 errors**. The one remaining failure
> (`eventTrigger.test.ts › condition-based filtering`) is **unrelated** to
> chain-decoupling: the event is fetched correctly on Sepolia, but the gateway
> evaluates `AnswerUpdated.current > 0` as "Conditions not met" (no ABI in the
> query) — pre-existing condition-eval behavior, flagged for a separate look.
> `yarn build` clean, `tsc -p tsconfig.json` = 0.

The backend is making `chainId` a property of the **parts that touch a chain**
(event/block triggers; contract-read/-write and ETH-transfer nodes) and
**removing the workflow-level chain entirely** (G5 / Decision 1): no
`Task.chain_id`, no `CreateTaskReq.chain_id`, chain-agnostic task storage,
`chainId` **required** (`>0`, configured) on every chain-aware part, `0`/unset
rejected. The 4 cleared chains: Ethereum, Base, Sepolia, Base Sepolia.

Our type layer is **generated** from the backend spec
(`yarn openapi-download` pulls `EigenLayer-AVS/staging/api/openapi.yaml`, then
`yarn types-gen` → `packages/types/src/openapi.gen.ts`). So the breaking type
changes are mechanical and **gated on the backend spec merging to `staging`**.

**Gating item is DONE (unmerged):** the renovated `openapi.yaml` is in
**EigenLayer-AVS PR #634** (targets `staging`); the backend stopped reading the
workflow-level fields in **#631** (no further Go changes needed). Once #634 merges
to `staging`, `yarn openapi-download && yarn types-gen` produces the new types and
Track B is unblocked. Verified contents of #634:

- **Removed:** `Workflow.chainId` (response) and `CreateWorkflowRequest.chainId`;
  `chainId` query param on listWorkflows / countWorkflows / listExecutions /
  countExecutions / executionStats.
- **Kept:** per-part `config.chainId` — now in each config's **required** list
  (5/5), so regenerated TS makes it **non-optional**; request-level `chainId` on
  simulate / estimateFees / runNode / createWallet / withdraw / getToken.

This splits the SDK work into two tracks.

---

## Track A — no-regret, do now (safe under both the current and the G5 contract)

Explicit per-part chains already work end-to-end (backend Phases 1–2 are
IMPLEMENTED; SDK builders already accept `chainId`). Writing explicit chains is
forward-compatible: it works today **and** is what G5 makes mandatory.

- [x] **Multi-chain template test** — `tests/v4/templates/multichain-per-part-chain.test.ts`.
  Locks the wire contract: explicit per-part `chainId` round-trips through
  create → retrieve. Tier 1 (single-chain, every part names Sepolia explicitly);
  Tier 2 (genuine watch-Sepolia / act-Base-Sepolia). Both gated behind
  `PER_NODE_CHAIN_READY=1` (Tier 2 additionally on `MULTICHAIN_TEST=1` /
  `TEST_ENV=railway`) because the **deployed server does not yet honor a per-node
  `chainId` on the persisted `create()` path** — see the upstream finding below.
  Typechecks clean; default-skips so CI stays green until the backend lands.
  Flip the gate on once the renovated backend (G3) is deployed to the target stack.
- [x] **Convert template/builder call sites to explicit per-part chains.** Done as
  part of Track B (required `chainId` forced every chain-aware part to carry its
  own). Every chain-aware builder call now passes `chainId: 11_155_111`; the dead
  workflow-level `chainId` was removed from the `buildWorkflow` objects below:
  - `tests/v4/templates/aave-health-factor-alert.test.ts:119`
  - `tests/v4/templates/batch-recurring-payment-with-email.test.ts:47`
  - `tests/v4/templates/exported-workflow-consistency.test.ts:51` (manual trigger + off-chain nodes — chain-agnostic; just drop the top-level `chainId`)
  - `tests/v4/templates/workflow-usdc-read-write-customcode.test.ts:50`
  - `tests/v4/templates/uniswapv3_stoploss.test.ts:53`
  - `tests/v4/templates/recurring-payment-with-report.test.ts:53`
  - (`tests/v4/smoke.test.ts:61,79` and the `auth.test.ts` / `client.ts` `chainId`
    are the **auth-flow** chain — JWT `aud`, kept by design. Do **not** touch.)
- [ ] **Rework the `settingsForChain` / `settingsFor` test helpers**
  (`tests/utils/client.ts:225-235`). They inject `inputVariables.settings.chain_id`,
  which today feeds the `body.chainId → settings.chain_id → aud → default`
  fallback (backend audit class **A**, removed by G5). Keep `settings.name` +
  `settings.runner` (still required by the context-memory summarizer); stop
  treating `settings.chain_id` as a task-default execution chain. Move execution
  chain onto the parts.

## Track B — IMPLEMENTED (source) against #634 on `staging`

#634 merged to `staging`, so the gating regen was real, not hypothetical. All
source items below are done; `yarn build` clean, `tsc -p tsconfig.json` = 0,
smoke green. What remains is **runtime** verification against a deployed
renovated gateway and the release changeset (see "Remaining" at the end).

- [x] **Regenerated types** — `yarn openapi-download && yarn types-gen`. Confirmed
  diffs in `packages/types/src/openapi.gen.ts`:
  - `Workflow.chainId` (response) — **removed**. No SDK/test read it (verified), safe.
  - `CreateWorkflowRequest.chainId` — **removed**.
  - `SimulateWorkflowRequest.chainId` / `EstimateFeesRequest.chainId` — **KEPT** (unchanged).
  - Per-part `config.chainId` (event/block trigger, contractRead/Write, ethTransfer)
    — now **required / non-optional** (verified `chainId?` → `chainId` on all 5).
  - `"0 = inherit"` notes dropped; `ChainIdQuery` removed from list/count/executions ops.
- [x] **Builders' `chainId` now required** — `builders/nodes.ts`
  (`ethTransfer`/`contractWrite`/`contractRead`) and `builders/triggers.ts`
  (`block`/`event`): `chainId?: number` → `chainId: number`, emitted
  unconditionally. **Breaking for SDK consumers** (must now pass `chainId`).
- [x] **Workflow-level `chainId` dropped from create** — falls out of the
  regenerated `CreateWorkflowRequest`; removed the dead top-level `chainId` from
  the 6 template `buildWorkflow` objects and the example demo. `simulate` /
  `estimateFees` keep their request-level `chainId`.
- [x] **Removed list/count chainId params** — `ListWorkflowsParams`,
  `CountWorkflowsParams`, `ListExecutionsParams`, `CountExecutionsParams`,
  `ExecutionStatsParams` no longer carry `chainId`. (Optional future: a helper to
  derive the per-chain set from a workflow's parts — not built yet.)
- [x] **Fixed stale chain-coupling docs** — `resources/nodes.ts` rewritten to
  "explicit-or-error; request `chainId` or node `config.chainId`, stamped via
  `stampNodeChainIfUnset`"; `resources/executions.ts` `RetrieveExecutionParams`
  comment updated to chain-agnostic storage.
- [x] **All test/example call sites updated** — 73 TS errors → 0; every
  chain-aware builder call in tests now passes `chainId: 11_155_111` (Sepolia dev
  stack); `examples/example.ts` `--chain-id` flag removed.
- [ ] **Flip inherit-asserting tests to expect rejection** — none existed (the
  suite never asserted `0`-inherit), so nothing to flip. The `PER_NODE_CHAIN_READY`
  multichain test asserts the positive round-trip; verify it green on a renovated
  gateway, then consider adding an explicit "missing chain → InvalidArgument" case.

## Untouched by design (do NOT change)

- Auth flow: `chains.ts` (`Chains.EigenLayerAuth`), `auth.ts`
  (`buildAuthMessage`/`signAuthMessage`), `resources/auth.ts`. The JWT `aud`
  chain stays — it is **API-auth scope**, not a task chain (plan answer #1).
- `resources/tokens.ts` `retrieve(address, { chainId })` — `GetTokenMetadataReq`,
  explicitly "unchanged". Keep.
- `resources/wallets.ts` `withdraw(address, req)` — `WithdrawFundsReq`, explicitly
  "unchanged" (takes its own `chain_id`). Keep.
- `TriggerWorkflowRequest` — has no `chainId` today, and the backend ignores
  `TriggerTaskReq.chain_id` anyway ("a task has no chain to override"). Nothing to do.
- `Nodes.balance({ chain })` — Balance node uses a `chain` **string** (name or id),
  NOT `chain_id`; it is not in the chain-aware set. Keep as-is.

(Builders are NOT in this list — their `chainId` goes from optional to required;
see the Track B "Make the builders' `chainId` required" item.)

---

## Remaining (not source — verification + release)

1. **Runtime verification** — deploy a gateway built from `staging` (#631/#633),
   then run `PER_NODE_CHAIN_READY=1 yarn jest tests/v4/templates/multichain-per-part-chain.test.ts`
   (and the full suite) and flip the gate default on once green. The local docker
   `avs-dev:latest` image is pre-renovation, so it still fails today.
   `settings.chain_id` in the `settingsFor*` helpers is now vestigial (backend
   ignores it) but harmless — optional cleanup, left in place.
2. **Changeset + release** — `yarn changeset` for the **breaking** SDK change
   (builders' `chainId` now required; workflow-level + list/count `chainId`
   removed). Bump `@avaprotocol/sdk-js` + `@avaprotocol/types` major. Land in the
   release window for the renovated gateway.
3. **Two stale backend OpenAPI prose descriptions** (cosmetic, don't affect
   generated types — flag to AVS): `api/openapi.yaml` createWorkflow description
   (~:1662) still says "the server resolves the workflow-level `chainId` (falling
   back to the aggregator default)"; the LoopNode description (~:729) still says
   it "inherits chainId from this LoopNode." Both contradict the shipped contract.

## Upstream finding to report to the AVS backend (2026-06-26)

Running the new test against the local `avaprotocol/avs-dev:latest` gateway,
`client.workflows.create()` with an explicit per-node `chainId` on a
`contractRead` node is **rejected in every representation**:

| node `config.chainId` sent | result |
|---|---|
| `11155111` (number, type-correct per `ChainId: number`) | `unmarshal config into Go struct: json: cannot unmarshal string into Go struct field ContractReadNodeConfig.chainId of type int64` |
| `"11155111"` (string) | `node read: decode ContractReadNode: json: cannot unmarshal string into Go struct field ContractReadNodeConfig.config.chainId of type int64` |
| omitted | OK — created, retrieved `chainId` undefined (legacy `0`-inherit) |

**UPDATE 2026-06-26 (verified against the new v4.0.0 gateway on :8080, health
200, no docker):** the failure is **isolated to the persisted `create()` path**.
The *identical* `Nodes.contractRead({ chainId: 11155111 })` node — a JSON
**number** on the wire (verified: SDK builder emits `"chainId":11155111`; the
transport does a plain `JSON.stringify`, no transform) — behaves as:

| endpoint | same node + per-node `chainId` (number) | result |
|---|---|---|
| `POST /workflows:simulate` | ✅ | status=success |
| `POST /nodes:run` | ✅ | success=true |
| `POST /workflows:create` | ❌ | `cannot unmarshal string into ... ContractReadNodeConfig.chainId of type int64` |

Two of three gateway endpoints decode the per-node chain correctly from the same
bytes, so the SDK request shape is correct. Only `create()` fails — and it fails
for a **number and a string** alike (the string case fails deeper, at
`...config.chainId`), so there is no client representation that gets through.

Diagnosis: a step **unique to the create()/persist path** marshals the node
config via **protojson** (proto `int64` → quoted JSON string) and then
`encoding/json`-decodes it into a Go struct whose `chainId` is `int64` without a
`,string` tag → the quoted value is rejected. Same class as the
`EventCondition.value` string fix (#224). **#633 (`TestNodeRoundTrip_PerNodeChainId`)
exercises `OpenAPIToProtoNode` from an already-decoded Go `generated.Node`, not
the HTTP create() body→persist round-trip**, so it stays green while the live
create() path still fails.

This is **not an SDK bug** (simulate + runNode prove the wire format). **Filed as
[AvaProtocol/EigenLayer-AVS#639](https://github.com/AvaProtocol/EigenLayer-AVS/issues/639)**
with the full root cause: `protoRetargetJSON` (`aggregator/rest/mapping/node.go:339`)
does `protojson.Marshal` (proto `int64` → quoted string) → `encoding/json` into
`generated.ChainId = int64` (`json:"chainId"`, no `,string`) on the
proto→OpenAPI render path (`ProtoToOpenAPINode`, hit by create/get/list, not by
simulate/runNode). `#633` only covers the inbound `OpenAPIToProtoNode` direction.
Repro: `PER_NODE_CHAIN_READY=1 yarn jest
tests/v4/templates/multichain-per-part-chain.test.ts` against `:8080`. SDK needs
no further change once #639 lands.

## Open questions — RESOLVED by the plan's "Client contract (after #632)" section

1. **List/count filtering.** ✅ Query param **removed** — list/get/cancel/pause/
   setEnabled are chain-agnostic; "workflows on chain Y" is derived **client-side**
   from the parts. (Note: client-side, not server-side as first assumed.)
2. **Single-node `runNodeWithInputs` chain source.** ✅ `RunNodeWithInputsReq.chain_id`
   **stays** (or the node's own `chainId`); backend stamps request→node via
   `stampNodeChainIfUnset`. The `settings.chain_id`/`aud`/default fallback is removed.
3. **Simulate / EstimateFees chainId.** ✅ Both **kept** — simulate takes per-part
   chains *or* a request `chainId`; `EstimateFeesReq` is explicitly unchanged.
   (Earlier guess that they'd be removed was wrong — corrected above.)

**Still open:**

4. **Create()-path int64 decode** — confirm #631 (backend read-stop) fixes the
   persisted `create()` `ContractReadNodeConfig`/`ContractWriteNodeConfig` int64
   decode (the upstream finding above), not just simulate/runNode. The contract
   says to send per-part chains on CreateWorkflow, which implies the fix; verify
   on deploy with `PER_NODE_CHAIN_READY=1`.
5. **#634 release coordination.** Target date for #634 merge to `staging`, so the
   Track B changeset (regen + builder/edit) lands in the same window.

---

## How to run the multi-chain test

Both tiers default-skip until `PER_NODE_CHAIN_READY=1` (server honors per-node
`chainId` on the persisted create path — backend G3 deployed):

```bash
# Tier 1 (single-chain round-trip; any stack once G3 is deployed):
PER_NODE_CHAIN_READY=1 yarn jest tests/v4/templates/multichain-per-part-chain.test.ts

# Tier 2 (genuine cross-chain — needs worker-sepolia + worker-base-sepolia):
PER_NODE_CHAIN_READY=1 MULTICHAIN_TEST=1 TEST_ENV=railway \
  yarn jest tests/v4/templates/multichain-per-part-chain.test.ts
```

Per CLAUDE.md, run one test at a time against Railway and tail the gateway +
worker-sepolia / worker-base-sepolia logs for the execution window to confirm
the per-part chain actually routed (gateway accepts the explicit chains; no
"unconfigured chain" rejection on Base Sepolia).
