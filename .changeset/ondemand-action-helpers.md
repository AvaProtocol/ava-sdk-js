---
"@avaprotocol/sdk-js": minor
---

feat(v4): Uniswap V3 swap/quote node builders + contractWrite execution readers

Adds the SDK surface for a chat agent's one-time "preview → confirm → execute"
market order:

- `UniswapV3.swapNode` / `UniswapV3.quoteNode` / `UniswapV3.minAmountOut` —
  assemble a single-hop `exactInputSingle` swap and its QuoterV2 quote over
  `Protocols.uniswapV3`, and compute `amountOutMinimum` from a slippage tolerance.
- `readContractWriteExecutions(resp)` — read the normalized per-method outcome
  (`confirmed` / `pending` / `failed`) plus `userOpHash` / `transactionHash` from
  a `contractWrite` `nodes.run` response.

Pairs with the `Idempotency-Key` support on `nodes.run`. The example CLI gains a
`nodes:run <file.json> [--idempotency-key KEY]` command.
