# On-demand actions (single-node execute)

Run one node on demand with `client.nodes.run` — no workflow to build or deploy.
This is the SDK surface behind a chat agent's "preview → confirm → execute" for a
one-time action such as a Uniswap market order.

## The building blocks

- `client.nodes.run(req, options?)` — execute a single node. A `contractWrite`
  node is **Tenderly-simulated by default** (a preview); set the node's
  `isSimulated: false` to execute for real through the smart wallet. A real
  execute is fund-moving and needs a Bearer JWT.
- `options.idempotencyKey` — sent as the `Idempotency-Key` header. Reuse one key
  across retries of a single Confirm so a re-send can't broadcast a second UserOp.
- `UniswapV3.swapNode` / `UniswapV3.quoteNode` / `UniswapV3.minAmountOut` —
  build the swap and quote nodes and compute the slippage floor.
- `readContractWriteExecutions(resp)` — read the normalized per-method outcome
  (`confirmed` / `pending` / `failed`) plus `userOpHash` / `transactionHash`
  from a `contractWrite` response.

## Market order: quote → preview → execute

```ts
import {
  Client,
  UniswapV3,
  readContractWriteExecutions,
} from "@avaprotocol/sdk-js";

const chainId = 11_155_111; // Sepolia
const settings = { settings: { runner: smartWalletAddress } };

// 1. Quote the expected output (simulated QuoterV2 call).
const quoteResp = await client.nodes.run({
  node: UniswapV3.quoteNode({
    id: "q", name: "q", chainId,
    tokenIn: WETH, tokenOut: USDC, fee: 3000, amountIn: "1000000000000000",
  }),
  inputVariables: settings,
});
// QuoterV2.quoteExactInputSingle returns (amountOut, sqrtPriceX96After,
// initializedTicksCrossed, gasEstimate); the gateway decodes it under
// output.data.quoteExactInputSingle. Read the first return value defensively —
// the exact key depends on the ABI decoding, so fall back across shapes:
const quoteData = (quoteResp.output as { data?: Record<string, any> })?.data ?? {};
const decoded = quoteData.quoteExactInputSingle ?? quoteData;
const expectedOut = String(decoded.amountOut ?? decoded[0] ?? "0");

// 2. Slippage floor (0.5%).
const amountOutMinimum = UniswapV3.minAmountOut(expectedOut, 50);

// 3. Build the swap once; run it in two modes.
const swap = (isSimulated: boolean) =>
  UniswapV3.swapNode({
    id: "swap", name: "swap", chainId,
    tokenIn: WETH, tokenOut: USDC, fee: 3000, recipient: smartWalletAddress,
    amountIn: "1000000000000000", amountOutMinimum, isSimulated,
  });

// 3a. Preview (simulate) — show the user the outcome.
const preview = await client.nodes.run({ node: swap(true), inputVariables: settings });

// 3b. Execute (real) — after the user confirms. One idempotency key per Confirm.
const executed = await client.nodes.run(
  { node: swap(false), inputVariables: settings },
  { idempotencyKey: `swap-${confirmId}` },
);

for (const r of readContractWriteExecutions(executed)) {
  // r.executionStatus: "confirmed" | "pending" | "failed"
  // r.userOpHash (always for a real execute), r.transactionHash (once mined)
}
```

## Notes

- **Approval is a separate action.** Atomic approve+swap batching is deferred on
  the gateway, so `swapNode` emits a single `exactInputSingle` call. Approve the
  input token to SwapRouter02 as its own action first (or trade an already-approved
  token).
- **Pool / fee tier is the caller's choice.** Pass the `fee` tier for the pool you
  intend to trade; the builders don't discover pools.
- **Pending ≠ failed.** A submitted-but-unmined UserOp reports `pending` with a
  `userOpHash` (and no `transactionHash` yet) — poll it rather than treating it as
  a failure.
- Reading `executionStatus` / receipts requires a gateway that surfaces
  contractWrite metadata under `metadata.results` (AVS PR #660+); older gateways
  return an empty list from `readContractWriteExecutions`.
