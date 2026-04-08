---
"@avaprotocol/sdk-js": minor
"@avaprotocol/types": minor
---

Document the new `value` / `valueFormatted` field semantics for ERC-20 Transfer event triggers and document that `MethodCallType.applyToFields: ["Transfer.value"]` is no longer needed (and should not be used) for Transfer events. The `applyToFields` field itself is **not** deprecated — it remains the correct mechanism for non-Transfer cases like Chainlink `AnswerUpdated.current`, ERC-20 `totalSupply`, and other contract read fields where shared enrichment does not pre-compute a formatted value.

**Breaking change in trigger output (originates from EigenLayer-AVS PR #509):**

- `EventTrigger` output `data.value` is now the **raw uint256 base-units string** for ERC-20 `Transfer` events (e.g. `"1500000"` for 1.5 USDC). Previously this field held the decimal-formatted amount when token metadata was available.
- `data.valueFormatted` is the new field for the **decimal-applied display string** (e.g. `"1.5"`).
- SDK consumers that read `data.value` for display **must migrate to `data.valueFormatted`**. Code that does math/encoding on `data.value` (e.g. ERC-20 transfer calldata generation) is unchanged or now more correct.

**Guidance change (not a type-level deprecation):**

- `MethodCallType.applyToFields: ["Transfer.value"]` is no longer needed for ERC-20 Transfer events — the operator's shared event enrichment now always publishes `valueFormatted` for Transfer events when token decimals are known, making the opt-in mechanism redundant and potentially double-formatting. **`applyToFields` itself is not deprecated** — it remains valid (and required) for non-Transfer use cases.

**Updates in this release:**

- `packages/types/src/shared.ts` — `MethodCallType.applyToFields` JSDoc clarified with an `@remarks` block explaining the Transfer-specific guidance. No `@deprecated` tag (which would incorrectly strikethrough the 30+ legitimate non-Transfer usages across `contractRead.test.ts`, `loopNode.test.ts`, Chainlink/Uniswap templates, etc.).
- `packages/sdk-js/README.md` — new "Event trigger output: `value` vs `valueFormatted`" section.
- `examples/example.ts` — comment on the `scheduleMonitorTransfer` ContractWrite step explaining when to use `data.value` vs `data.valueFormatted`.
- Test fixtures and assertions in `tests/triggers/eventTrigger.test.ts`, `tests/templates/telegram-alert-on-transfer.test.ts`, and `tests/executions/stepInput.test.ts` updated to use the new field semantics.

No production SDK code reads `transferData.value` directly, so there is no API surface break — this is a documentation and consumer-guidance release.
