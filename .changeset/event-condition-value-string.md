---
"@avaprotocol/sdk-js": patch
"@avaprotocol/types": patch
---

fix: `EventCondition.value` is now typed as `string` instead of `Record<string, unknown>`, matching the proto contract and the aggregator's REST decoder. Studio templates (e.g. Uniswap V3 stop-loss) that previously failed with `WORKFLOWS_BAD_TRIGGER: cannot unmarshal string into Go struct field EventCondition.config.queries.conditions.value` now serialize correctly. Re-syncs `packages/types/openapi/openapi.yaml` from EigenLayer-AVS staging (PR #601) and regenerates `openapi.gen.ts`.
