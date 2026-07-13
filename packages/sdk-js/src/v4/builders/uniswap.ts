import type { v4 } from "@avaprotocol/types";

import { Protocols } from "../protocols";
import { Nodes } from "./nodes";

/**
 * Uniswap V3 single-hop swap builders — thin, typed assemblers over
 * `Protocols.uniswapV3` (addresses + ABIs) and `Nodes.contractWrite`. They
 * emit a single-method node so, with atomic multi-call batching deferred on the
 * gateway, the ERC-20 approval is a **separate** action the caller runs first
 * (or the input token is already approved to the router).
 *
 * The market-order shape is: quote (`quoteNode`, simulated) → compute
 * `amountOutMinimum` from a slippage tolerance (`minAmountOut`) → swap
 * (`swapNode`). Pool discovery / fee-tier selection is the caller's job — pass
 * the `fee` tier for the pool you intend to trade against.
 */

/** Uniswap V3 pool fee tiers, in hundredths of a bip (0.01%, 0.05%, 0.3%, 1%). */
export type UniswapV3FeeTier = 100 | 500 | 3000 | 10000;

const DEFAULT_SQRT_PRICE_LIMIT = "0";

function addressForChain(
  map: Partial<Record<number, string>>,
  chainId: number,
  label: string,
): string {
  const addr = map[chainId];
  if (!addr) {
    throw new Error(
      `Uniswap V3 ${label} address is not known for chain ${chainId}; pass an explicit override`,
    );
  }
  return addr;
}

export interface UniswapV3SwapNodeOptions {
  id: string;
  name: string;
  chainId: number;
  /** Input token address (must be an ERC-20; native ETH is not exactInputSingle). */
  tokenIn: string;
  /** Output token address. */
  tokenOut: string;
  /** Pool fee tier for the tokenIn/tokenOut pool being traded. */
  fee: UniswapV3FeeTier;
  /** Swap output recipient — usually the runner smart wallet. */
  recipient: string;
  /** Exact input amount, in tokenIn's smallest unit (wei). */
  amountIn: string;
  /**
   * Minimum acceptable output (slippage floor), in tokenOut's smallest unit.
   * Required — compute it from a quote with {@link minAmountOut} rather than
   * passing "0", which disables slippage protection.
   */
  amountOutMinimum: string;
  /** Price-limit bound; "0" (default) means no limit. */
  sqrtPriceLimitX96?: string;
  /** Override the SwapRouter02 address (defaults to the per-chain canonical one). */
  routerAddress?: string;
  /** When false, execute the real swap; omit/true to Tenderly-simulate (preview). */
  isSimulated?: boolean;
}

export interface UniswapV3QuoteNodeOptions {
  id: string;
  name: string;
  chainId: number;
  tokenIn: string;
  tokenOut: string;
  fee: UniswapV3FeeTier;
  amountIn: string;
  sqrtPriceLimitX96?: string;
  /** Override the QuoterV2 address (defaults to the per-chain canonical one). */
  quoterAddress?: string;
}

export const UniswapV3 = Object.freeze({
  /**
   * Build a `contractWrite` node executing a single-hop `exactInputSingle` swap
   * on SwapRouter02. Run it via `client.nodes.run` — with `isSimulated: false`
   * (and an idempotency key) to execute for real, or the default simulate for a
   * preview.
   */
  swapNode(opts: UniswapV3SwapNodeOptions): v4.Node {
    const router =
      opts.routerAddress ??
      addressForChain(Protocols.uniswapV3.swapRouter02, opts.chainId, "SwapRouter02");
    return Nodes.contractWrite({
      id: opts.id,
      name: opts.name,
      chainId: opts.chainId,
      contractAddress: router,
      contractAbi: Protocols.uniswapV3.swapRouter02Abi,
      ...(opts.isSimulated !== undefined ? { isSimulated: opts.isSimulated } : {}),
      methodCalls: [
        {
          methodName: "exactInputSingle",
          // The gateway maps a single JSON object onto the ABI tuple by field name.
          methodParams: [
            JSON.stringify({
              tokenIn: opts.tokenIn,
              tokenOut: opts.tokenOut,
              fee: opts.fee,
              recipient: opts.recipient,
              amountIn: opts.amountIn,
              amountOutMinimum: opts.amountOutMinimum,
              sqrtPriceLimitX96: opts.sqrtPriceLimitX96 ?? DEFAULT_SQRT_PRICE_LIMIT,
            }),
          ],
        },
      ],
    });
  },

  /**
   * Build a node that quotes `exactInputSingle` via QuoterV2. QuoterV2 is a
   * state-changing "revert-to-return" call, so it is modelled as a
   * **simulated** `contractWrite` (not `contractRead`); run it via
   * `client.nodes.run` to read the predicted `amountOut` from the output.
   */
  quoteNode(opts: UniswapV3QuoteNodeOptions): v4.Node {
    const quoter =
      opts.quoterAddress ??
      addressForChain(Protocols.uniswapV3.quoterV2, opts.chainId, "QuoterV2");
    return Nodes.contractWrite({
      id: opts.id,
      name: opts.name,
      chainId: opts.chainId,
      contractAddress: quoter,
      contractAbi: Protocols.uniswapV3.quoterV2Abi,
      isSimulated: true,
      methodCalls: [
        {
          methodName: "quoteExactInputSingle",
          methodParams: [
            JSON.stringify({
              tokenIn: opts.tokenIn,
              tokenOut: opts.tokenOut,
              amountIn: opts.amountIn,
              fee: opts.fee,
              sqrtPriceLimitX96: opts.sqrtPriceLimitX96 ?? DEFAULT_SQRT_PRICE_LIMIT,
            }),
          ],
        },
      ],
    });
  },

  /**
   * Compute `amountOutMinimum` from a quoted output and a slippage tolerance in
   * basis points (bps; 50 = 0.5%). Floor-divides in integer wei, so the result
   * is a conservative minimum. Throws on a slippage outside [0, 10000].
   */
  minAmountOut(expectedOut: string | bigint, slippageBps: number): string {
    if (!Number.isInteger(slippageBps) || slippageBps < 0 || slippageBps > 10_000) {
      throw new Error("slippageBps must be an integer in [0, 10000]");
    }
    const out = typeof expectedOut === "bigint" ? expectedOut : BigInt(expectedOut);
    if (out < 0n) throw new Error("expectedOut must be non-negative");
    return ((out * BigInt(10_000 - slippageBps)) / 10_000n).toString();
  },
});
