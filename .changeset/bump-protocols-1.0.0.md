---
"@avaprotocol/sdk-js": minor
---

Bump `@avaprotocol/protocols` to `^1.0.0`. Spreads `Chains.PolygonMainnet` (137) and `Chains.HyperliquidMainnet` (999) plus `wrapped.weth` → WPOL / WHYPE, so callers can resolve those wrappers from the catalog instead of inlining addresses. No Uniswap/AAVE on HyperEVM; Polygon protocol maps are a catalog follow-up. `Chains.Holesky` is no longer re-exported — use `Chains.Sepolia`. Collapses the expansion-chain JWT `aud` probes in `auth.test.ts` onto a `test.each` table keyed by `Chains`. Adds Railway E2E for Polygon WPOL `contractRead` / `simulate`; Hyperliquid WHYPE `contractRead` only (Tenderly has no 999).
