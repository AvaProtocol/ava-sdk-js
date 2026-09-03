---
"@avaprotocol/sdk-js": major
---

Bump `@avaprotocol/protocols` to `^1.0.0`. Spreads `Chains.PolygonMainnet` (137) and `Chains.HyperliquidMainnet` (999) plus `wrapped.weth` → WPOL / WHYPE, so callers can resolve those wrappers from the catalog instead of inlining addresses. No Uniswap/AAVE on HyperEVM; Polygon protocol maps are a catalog follow-up.

**Breaking:** `Chains.Holesky` is no longer re-exported (the catalog dropped 17000). Callers must use `Chains.Sepolia`. This is a major because `Chains` is a public SDK export — a `^4.x` minor would silently break compile and runtime for anyone still referencing `Holesky`.

Also collapses the expansion-chain JWT `aud` probes in `auth.test.ts` onto a `test.each` table keyed by `Chains`. Adds Railway E2E for Polygon WPOL `contractRead` / `simulate`; Hyperliquid WHYPE `contractRead` only (Tenderly has no 999).

