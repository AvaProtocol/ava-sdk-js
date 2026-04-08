---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": minor
---

Document the new `value` / `valueFormatted` field semantics for ERC-20 Transfer event triggers and deprecate `MethodCallType.applyToFields` for the `Transfer.value` use case.

**Breaking change in trigger output (originates from EigenLayer-AVS PR #509):**

- `EventTrigger` output `data.value` is now the **raw uint256 base-units string** for ERC-20 `Transfer` events (e.g. `"1500000"` for 1.5 USDC). Previously this field held the decimal-formatted amount when token metadata was available.
- `data.valueFormatted` is the new field for the **decimal-applied display string** (e.g. `"1.5"`).
- SDK consumers that read `data.value` for display **must migrate to `data.valueFormatted`**. Code that does math/encoding on `data.value` (e.g. ERC-20 transfer calldata generation) is unchanged or now more correct.

**Deprecation:**

- `MethodCallType.applyToFields` with `["Transfer.value"]` is deprecated. The shared event enrichment on the operator now always publishes `valueFormatted` for Transfer events when token decimals are known, making this opt-in mechanism redundant and potentially double-formatting. The field remains valid for non-Transfer events whose formatting is not handled by shared enrichment (e.g., Chainlink `AnswerUpdated` `current`/`answer`).

**Updates in this release:**

- `packages/types/src/shared.ts` — `MethodCallType.applyToFields` carries a `@deprecated` JSDoc tag with migration guidance.
- `packages/sdk-js/README.md` — new "Event trigger output: `value` vs `valueFormatted`" section.
- `examples/example.ts` — comment on the `scheduleMonitorTransfer` ContractWrite step explaining when to use `data.value` vs `data.valueFormatted`.
- Test fixtures and assertions in `tests/triggers/eventTrigger.test.ts`, `tests/templates/telegram-alert-on-transfer.test.ts`, and `tests/executions/stepInput.test.ts` updated to use the new field semantics.

No production SDK code reads `transferData.value` directly, so there is no API surface break — this is a documentation and consumer-guidance release.
