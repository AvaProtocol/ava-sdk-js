# Migrating to v4.0.0 — per-part chains

**Audience:** consumers of `@avaprotocol/sdk-js` (the Studio canvas first and foremost).
**Packages:** `@avaprotocol/sdk-js@4.0.0`, `@avaprotocol/types@4.0.0`.
**Upstream:** EigenLayer-AVS chain-decoupling renovation (PR #634).

## The one idea

**A workflow no longer has a chain.** `chainId` is a property of each *chain-aware part*:

| Part | chain-aware? |
|---|---|
| **Event trigger**, **Block trigger** | ✅ requires `chainId` |
| **contractRead**, **contractWrite**, **ethTransfer** node | ✅ requires `chainId` |
| Loop node whose **runner** is one of the above | ✅ on the **runner** |
| Manual / Cron / FixedTime trigger | ❌ no chain |
| customCode / restApi / graphql / branch / filter | ❌ no chain |
| **Balance** node | uses its own `chain` **string** (name or id) — unchanged |

Everything below follows from that. The first move: bump to `4.0.0` and let TypeScript point you at most of the call sites.

## Allowed chains

The configured set is the source of truth; anything else is rejected at create:

| Chain | `chainId` | `Chains` constant |
|---|---|---|
| Ethereum | `1` | `Chains.EthereumMainnet` |
| Base | `8453` | `Chains.BaseMainnet` |
| Sepolia | `11155111` | `Chains.Sepolia` |
| Base Sepolia | `84532` | `Chains.BaseSepolia` |

```ts
import { Chains } from "@avaprotocol/sdk-js";
```

---

## 1. Builders now require `chainId` (compile-enforced)

Every chain-aware builder gained a **required** `chainId: number`. Omitting it is a TypeScript error — your safety net for finding every call site.

```ts
import { Chains, Nodes, Triggers } from "@avaprotocol/sdk-js";

// before (v3.x)
Triggers.event({ id, name, queries });
Nodes.contractWrite({ id, name, contractAddress, methodCalls });

// v4.0.0 — chainId required on each chain-aware part
Triggers.event({ id, name, queries, chainId: Chains.Sepolia });
Triggers.block({ id, name, interval, chainId: Chains.BaseSepolia });
Nodes.contractRead({  id, name, contractAddress, methodCalls, chainId: Chains.Sepolia });
Nodes.contractWrite({ id, name, contractAddress, methodCalls, chainId: Chains.Sepolia });
Nodes.ethTransfer({   id, name, destination, amountWei,     chainId: Chains.Base });
```

**Canvas/UX:** add a **chain selector on each chain-aware part** (event/block trigger; contractRead/Write/ethTransfer node). It is required — no "inherit / default" option. Non-chain parts show no selector. The Balance node keeps its existing `chain` string field.

## 2. Loop runner carries its own chain (no inheritance)

```ts
Nodes.loop({
  id, name, inputVariable,
  runner: Nodes.contractRead({ ..., chainId: Chains.Base }), // required on the runner; no inheritance
});
```

## 3. Stop sending a workflow-level `chainId` on create

`CreateWorkflowRequest.chainId` is **removed from the type**. Drop it from the save payload:

```ts
// before
client.workflows.create({ smartWalletAddress, chainId, trigger, nodes, edges, inputVariables });

// v4.0.0 — no workflow-level chainId
client.workflows.create({ smartWalletAddress, trigger, nodes, edges, inputVariables });
```

The server **rejects** create if any chain-aware part is missing its chain (see §7).

## 4. `Workflow.chainId` is gone — derive chains from the parts

`Workflow.chainId` is removed from responses (a workflow can legitimately span chains — watch X, act on Y). Any "chain" column/filter is computed client-side:

```ts
import type { v4 } from "@avaprotocol/types";

export function chainsOf(wf: v4.Workflow): number[] {
  const ids = new Set<number>();
  const t = (wf.trigger as { config?: { chainId?: number } })?.config?.chainId;
  if (t) ids.add(t);
  for (const n of wf.nodes ?? []) {
    const c = (n as { config?: { chainId?: number } })?.config?.chainId;
    if (c) ids.add(c);
  }
  return [...ids];
}
```

## 5. List / count / stats drop the `chainId` param

These no longer accept a chain (storage is not per-chain): `ListWorkflowsParams`, `CountWorkflowsParams`, `ListExecutionsParams`, `CountExecutionsParams`, `ExecutionStatsParams`.

```ts
// before: client.workflows.list({ chainId, smartWalletAddress })
client.workflows.list({ smartWalletAddress }); // then filter client-side via chainsOf()
```

## 6. Event conditions now need `contractAbi`

If you use condition-based event filtering on a *decoded* field (e.g. `AnswerUpdated.current > 0`), the query must carry the contract ABI — newly exposed on the builder. Without it the engine returns `"Conditions not met"`.

```ts
Triggers.event({
  chainId: Chains.Sepolia,
  queries: [{
    addresses: [feed],
    topics: [ANSWER_UPDATED_SIG],
    contractAbi: ANSWER_UPDATED_ABI,            // ← required for the condition to resolve
    conditions: [{ fieldName: "AnswerUpdated.current", operator: "gt", fieldType: "int256", value: "0" }],
  }],
});
```

With an ABI + a matched condition the event is returned **decoded** (`output.data.AnswerUpdated.current`), not as a raw `topics[]` log. (`methodCalls` is also now exposed on the query for enrichment.)

## 7. Surface the server's chain rejection inline

A chain-aware part missing its `chainId` is rejected at create with `APIError`, status `400`, message containing `requires an explicit chain_id`:

```ts
import { APIError } from "@avaprotocol/sdk-js";

try {
  await client.workflows.create(req);
} catch (e) {
  if (e instanceof APIError && e.status === 400 && /chain_id/i.test(e.message)) {
    // highlight the offending node; prompt the user to pick a chain
  }
}
```

Server messages to map to inline node errors:
- `"… requires an explicit chain_id"` → node has no chain; prompt to pick one.
- `"chain_id N is not configured on this aggregator"` → chosen chain is outside the allowed set.

Mirror the rule client-side so the canvas blocks save before the round-trip when possible.

## 8. Unchanged — do **not** touch

- `client.workflows.simulate(...)` and `client.workflows.estimateFees(...)` keep their optional request-level `chainId`.
- `client.nodes.run(...)` keeps `chainId` (or set it on the node's own config; the gateway stamps the request chain onto the node when unset).
- `client.wallets.withdraw(...)` and `client.tokens.retrieve(addr, { chainId })` are per-chain and unchanged.
- Auth (`auth.exchangeWithKey`, `buildAuthMessage`) — the `chainId` there is the **EigenLayer auth chain** (JWT `aud`), unrelated to workflow chains. Leave it.

## 9. Deployed workflows were wiped

The prod cutover deleted chain-bucketed tasks (no backfill — a decided trade-off). Don't assume pre-cutover workflows still exist; users re-create them with explicit per-part chains. Show a clean empty-state rather than erroring on missing tasks.

---

## Checklist

- [ ] Bump `@avaprotocol/sdk-js` + `@avaprotocol/types` to `4.0.0`; clear all `chainId`-required TS errors.
- [ ] Workflow-level chain selector removed; per-part chain selectors added (event/block triggers, contract/transfer nodes, loop runner).
- [ ] Save sends per-part `chainId`, never a workflow-level one.
- [ ] Workflow list/detail no longer pass a chain; "chain" view derived from parts (`chainsOf`).
- [ ] Event-condition queries pass `contractAbi`.
- [ ] `InvalidArgument` (400) chain errors surfaced inline on the offending node, with client-side pre-validation.
- [ ] Empty-state for users whose pre-cutover workflows were wiped.

## References

- Backend plan: `EigenLayer-AVS/PLAN_CHAIN_DECOUPLING.md` → "Studio adoption guide" + "Client contract".
- SDK source: `packages/sdk-js/src/v4/builders/{nodes,triggers}.ts`, `packages/types/src/openapi.gen.ts`.
- Related backend tracking: EigenLayer-AVS #634 (renovation), #639 (gateway create() int64 fix), #642 (openapi prose).
