---
"@avaprotocol/sdk-js": minor
---

Bump `@avaprotocol/protocols` to `^0.10.0`. Uniswap V3 SwapRouter02 / WETH / native USDC now exist on Arbitrum and Optimism, so `SessionPolicyActions.uniswapV3Swap(42161)` and `uniswapV3Swap(10)` resolve from the catalog instead of throwing.
