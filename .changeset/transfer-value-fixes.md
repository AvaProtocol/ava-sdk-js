---
"@avaprotocol/sdk-js": patch
---

Address PR review feedback on the Transfer field semantics alignment (companion to the previous changeset, `transfer-value-semantics.md`).

**Bug fix in `examples/example.ts`** — the `scheduleMonitorTransfer` ContractWrite calldata template was using `Number(demoTriggerName.data.value).toString(16)` to encode the ERC-20 transfer amount. With `data.value` now being raw uint256 base units (per EigenLayer-AVS PR #509), the `Number(...)` cast silently loses precision for any token amount above JavaScript's safe-integer range (~9e15 — about 9 ETH or 9,000,000,000 USDC), producing incorrect transfer calldata. Switched to `BigInt(...)` which is integer-safe.

**Test determinism fix in `tests/executions/stepInput.test.ts`** — the previous attempt added an `if (eventData.valueFormatted) { ... } else { decode rawData }` fallback in the CustomCode snippet. That violated the test determinism rule (CLAUDE.md) because it allowed the test to pass via two different code paths and would have hidden a future regression that drops `valueFormatted` from the simulator output. The CustomCode snippet now reads `eventData.valueFormatted` directly. As a side effect, this also removes a `parseInt(rawValue, 16)` precision-loss path that would have silently truncated large amounts on the fallback branch.

**Documentation polish** — `packages/sdk-js/README.md` previously said "Breaking change in v1.x" but `@avaprotocol/sdk-js` is currently v2.x. Replaced with version-agnostic wording: "Breaking change in operator output (EigenLayer-AVS PR #509)".

**Comment alignment** — two inline comments in the Transfer event tests still used the word "deprecated", which contradicted the deliberate `@remarks`-not-`@deprecated` decision in the previous changeset. Updated to "is no longer needed for Transfer events" and explicitly noted the field is still valid for non-Transfer cases (Chainlink AnswerUpdated, ERC-20 totalSupply, etc.).

No SDK API surface changes. No new tests added beyond the determinism cleanup. The semantic regex assertions added in the previous PR continue to pin the `value` / `valueFormatted` contract.
