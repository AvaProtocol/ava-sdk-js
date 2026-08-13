---
"@avaprotocol/sdk-js": minor
---

Bump `@avaprotocol/protocols` to `^0.12.0`. Unichain (130) and Robinhood (4663) chain IDs plus Uniswap V3 / WETH now resolve from the catalog, so `SessionPolicyActions.uniswapV3Swap(130)` and `uniswapV3Swap(4663)` no longer throw. Adds Railway E2E for expansion-chain auth + WETH `contractRead` / `simulate`.
