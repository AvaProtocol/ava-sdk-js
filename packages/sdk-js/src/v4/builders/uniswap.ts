import type { v4 } from "@avaprotocol/types";

import { Protocols } from "../protocols";
import { Nodes } from "./nodes";

/**
 * Uniswap V3 single-hop swap builders — thin, typed assemblers over
 * `Protocols.uniswapV3` (addresses + ABIs) and `Nodes.contractWrite`.
 *
 * The market-order shape is: quote (`quoteNode`, simulated) → compute
 * `amountOutMinimum` from a slippage tolerance (`minAmountOut`) → swap. Pool
 * discovery / fee-tier selection is the caller's job — pass the `fee` tier for
 * the pool you intend to trade against.
 *
 * For the swap itself, pick the node that matches the input token's allowance:
 * - `swapWithApprovalNode` — token-in swap where the router is **not** yet
 *   approved. Emits ONE node with `approve` + `exactInputSingle`; the gateway
 *   submits it as a single atomic UserOp, so the approve and swap land together
 *   or not at all (no dangling allowance on a failed swap).
 * - `swapNode` — the single `exactInputSingle` call, for when the router is
 *   already approved for `amountIn` (or more).
 */

/** Uniswap V3 pool fee tiers, in hundredths of a bip (0.01%, 0.05%, 0.3%, 1%). */
export type UniswapV3FeeTier = 100 | 500 | 3000 | 10000;

const DEFAULT_SQRT_PRICE_LIMIT = "0";

/**
 * Resolve a per-chain address from the protocol catalog, or refuse.
 *
 * Exported so other builders resolving catalog addresses share one
 * implementation and one message. Refusing beats defaulting: a missing entry
 * would otherwise become a zero address or another chain's contract, and both
 * produce something that looks valid and points at the wrong place.
 */
export function addressForChain(
  map: Partial<Record<number, string>>,
  chainId: number,
  label: string
): string {
  const addr = map[chainId];
  if (!addr) {
    throw new Error(
      `${label} address is not known for chain ${chainId}; pass an explicit override`
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
   * Build a `contractWrite` node that approves the router for `amountIn` on
   * `tokenIn` and then swaps, as a single atomic batch: two method calls —
   * `approve` on `tokenIn` and `exactInputSingle` on the router — that the
   * gateway submits as ONE UserOp. Either both land or neither does, so a failed
   * swap never leaves a dangling allowance. The approval is exact (`amountIn`),
   * not unlimited.
   *
   * Use this for a token-in swap where the router isn't already approved. For an
   * already-approved token, use {@link swapNode}. Run via `client.nodes.run`
   * with `isSimulated: false` (and an idempotency key) to execute; the default
   * simulate previews the whole batch (approve then swap).
   */
  swapWithApprovalNode(opts: UniswapV3SwapNodeOptions): v4.Node {
    // Fail fast on inputs that can only be a caller mistake. This node emits a real ERC-20 approval,
    // so catch these at build time rather than as an opaque on-chain revert (the atomicity would
    // roll the approve back, but a clear error beats a wasted preview/execute round-trip).
    if (opts.tokenIn.toLowerCase() === opts.tokenOut.toLowerCase()) {
      throw new Error("swapWithApprovalNode: tokenIn and tokenOut must differ");
    }
    let amountInWei: bigint;
    try {
      amountInWei = BigInt(opts.amountIn);
    } catch {
      throw new Error(
        `swapWithApprovalNode: amountIn must be an integer wei string, got "${opts.amountIn}"`
      );
    }
    if (amountInWei <= 0n) {
      throw new Error("swapWithApprovalNode: amountIn must be greater than 0");
    }

    const router =
      opts.routerAddress ??
      addressForChain(
        Protocols.uniswapV3.swapRouter02,
        opts.chainId,
        "Uniswap V3 SwapRouter02"
      );
    return Nodes.contractWrite({
      id: opts.id,
      name: opts.name,
      chainId: opts.chainId,
      // Node-level target is the router (used by the swap call); the approve call
      // overrides it to the token via a per-call contractAddress.
      contractAddress: router,
      // Merged ABI so the gateway resolves both method names against one node.
      contractAbi: [
        ...Protocols.erc20.approveAbi,
        ...Protocols.uniswapV3.swapRouter02Abi,
      ],
      ...(opts.isSimulated !== undefined
        ? { isSimulated: opts.isSimulated }
        : {}),
      methodCalls: [
        {
          methodName: "approve",
          contractAddress: opts.tokenIn,
          methodParams: [router, opts.amountIn],
        },
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
              sqrtPriceLimitX96:
                opts.sqrtPriceLimitX96 ?? DEFAULT_SQRT_PRICE_LIMIT,
            }),
          ],
        },
      ],
    });
  },

  /**
   * Build a `contractWrite` node executing a single-hop `exactInputSingle` swap
   * on SwapRouter02. Assumes the router is already approved for `amountIn` on
   * `tokenIn` — for an unapproved token-in swap use {@link swapWithApprovalNode},
   * which batches the approval atomically. Run it via `client.nodes.run` — with
   * `isSimulated: false` (and an idempotency key) to execute for real, or the
   * default simulate for a preview.
   */
  swapNode(opts: UniswapV3SwapNodeOptions): v4.Node {
    const router =
      opts.routerAddress ??
      addressForChain(
        Protocols.uniswapV3.swapRouter02,
        opts.chainId,
        "Uniswap V3 SwapRouter02"
      );
    return Nodes.contractWrite({
      id: opts.id,
      name: opts.name,
      chainId: opts.chainId,
      contractAddress: router,
      contractAbi: Protocols.uniswapV3.swapRouter02Abi,
      ...(opts.isSimulated !== undefined
        ? { isSimulated: opts.isSimulated }
        : {}),
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
              sqrtPriceLimitX96:
                opts.sqrtPriceLimitX96 ?? DEFAULT_SQRT_PRICE_LIMIT,
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
      addressForChain(
        Protocols.uniswapV3.quoterV2,
        opts.chainId,
        "Uniswap V3 QuoterV2"
      );
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
              sqrtPriceLimitX96:
                opts.sqrtPriceLimitX96 ?? DEFAULT_SQRT_PRICE_LIMIT,
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
    if (
      !Number.isInteger(slippageBps) ||
      slippageBps < 0 ||
      slippageBps > 10_000
    ) {
      throw new Error("slippageBps must be an integer in [0, 10000]");
    }
    const out =
      typeof expectedOut === "bigint" ? expectedOut : BigInt(expectedOut);
    if (out < 0n) throw new Error("expectedOut must be non-negative");
    return ((out * BigInt(10_000 - slippageBps)) / 10_000n).toString();
  },
});
