// Uniswap V3 whitelist context — Router02 / QuoterV2 / Permit2 / Factory
// / NonfungiblePositionManager addresses per chain, plus the ABI
// fragments templates routinely need to compose swaps and quotes.
//
// Address parity with studio's per-chain data files:
//   sepolia       → app/lib/uniswap/v3/data/sepolia.json
//   ethereum      → app/lib/uniswap/v3/data/ethereum.json
//   base          → app/lib/uniswap/v3/data/base.json
//   base-sepolia  → app/lib/uniswap/v3/data/base-sepolia.json
//
// Studio's per-chain pool registries (`pools[]`) intentionally NOT
// migrated — they're 25+ entries per chain, change frequently, and
// belong to studio's UI discovery layer. Template tests that need a
// specific pool address pass it inline; the catalog ships the
// canonical contract addresses, not the indexed pool universe.

import { Chains } from "../chains";
import { type AbiFragment, type AddressByChain } from "./types";

/** SwapRouter02 — the entry point for exactInput/exactOutput swaps. */
const swapRouter02: AddressByChain = {
  [Chains.EthereumMainnet]: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
  [Chains.Sepolia]: "0x3bFA4769FB09eefC5a80d6E87c3B9C650f7Ae48E",
  [Chains.BaseMainnet]: "0x2626664c2603336E57B271c5C0b26F421741e481",
  [Chains.BaseSepolia]: "0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4",
};

/** QuoterV2 — off-chain quote helper for swap previews. */
const quoterV2: AddressByChain = {
  [Chains.EthereumMainnet]: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  [Chains.Sepolia]: "0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3",
  [Chains.BaseMainnet]: "0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a",
  [Chains.BaseSepolia]: "0xC5290058841028F1614F3A6F0F5816cAd0df5E27",
};

/**
 * Permit2 — Uniswap's universal token-permit contract. Deployed at the
 * SAME address across all chains in the catalog.
 */
const permit2: AddressByChain = {
  [Chains.EthereumMainnet]: "0x000000000022d473030F116dDEE9F6B43aC78BA3",
  [Chains.Sepolia]: "0x000000000022d473030F116dDEE9F6B43aC78BA3",
  [Chains.BaseMainnet]: "0x000000000022d473030F116dDEE9F6B43aC78BA3",
  [Chains.BaseSepolia]: "0x000000000022d473030F116dDEE9F6B43aC78BA3",
};

/** Uniswap V3 Factory — derives the deterministic pool address per token-pair+fee. */
const factory: AddressByChain = {
  [Chains.EthereumMainnet]: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  [Chains.Sepolia]: "0x0227628f3F023bb0B980b67D528571c95c6DaC1c",
  [Chains.BaseMainnet]: "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
  [Chains.BaseSepolia]: "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24",
};

/** NonfungiblePositionManager — LP NFT mint/burn/collect. */
const nonfungiblePositionManager: AddressByChain = {
  [Chains.EthereumMainnet]: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
  [Chains.Sepolia]: "0x1238536071E1c677A632429e3655c799b22cDA52",
  [Chains.BaseMainnet]: "0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1",
  [Chains.BaseSepolia]: "0x27F971cb582BF9E50F397e4d29a5C7A34f11faA2",
};

/** UniversalRouter — Uniswap's multi-step routing entrypoint (Permit2-aware). */
const universalRouter: AddressByChain = {
  [Chains.EthereumMainnet]: "0x66a9893cc07d91d95644aedd05d03f95e1dba8af",
  [Chains.Sepolia]: "0x3A9D48AB9751398BbFa63ad67599Bb04e4BdF98b",
  [Chains.BaseMainnet]: "0x6ff5693b99212da76ad316178a184ab56d299b43",
  [Chains.BaseSepolia]: "0x492e6456d9528771018deb9e87ef7750ef184104",
};

/**
 * SwapRouter02 ABI — `exactInputSingle` + `exactOutputSingle`. These
 * are the two single-hop swap methods stoploss-style and DCA-style
 * templates use; multi-hop variants (`exactInput` / `exactOutput`)
 * take a `path` bytes blob and aren't included until a template
 * actually needs them.
 */
const swapRouter02Abi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMinimum", type: "uint256" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" },
        ],
        internalType: "struct IV3SwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "amountInMaximum", type: "uint256" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" },
        ],
        internalType: "struct IV3SwapRouter.ExactOutputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "exactOutputSingle",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
]);

/**
 * QuoterV2 ABI — `quoteExactInputSingle` for off-chain price preview.
 * Note: this is a state-changing call in QuoterV2 (the contract uses
 * `revert` to return the quote) — eth_call against an archive node is
 * the standard usage, which the SDK's `contractRead` supports.
 */
const quoterV2Abi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" },
        ],
        internalType: "struct IQuoterV2.QuoteExactInputSingleParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "quoteExactInputSingle",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint160", name: "sqrtPriceX96After", type: "uint160" },
      { internalType: "uint32", name: "initializedTicksCrossed", type: "uint32" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
]);

/**
 * Factory ABI — `getPool` resolves the canonical pool address for a
 * (tokenA, tokenB, fee) triple. Useful when a template starts from a
 * pair + fee tier rather than a known pool.
 */
const factoryAbi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint24", name: "fee", type: "uint24" },
    ],
    name: "getPool",
    outputs: [{ internalType: "address", name: "pool", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
]);

/**
 * Reference token addresses on the testnet markets these templates
 * routinely target. Mainnet tokens vary per template — pass them
 * inline rather than relying on a global registry the catalog
 * doesn't yet maintain.
 */
const tokens = Object.freeze({
  WETH: {
    [Chains.Sepolia]: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
    [Chains.EthereumMainnet]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    [Chains.BaseMainnet]: "0x4200000000000000000000000000000000000006",
    [Chains.BaseSepolia]: "0x4200000000000000000000000000000000000006",
  } satisfies AddressByChain,
  USDC: {
    [Chains.Sepolia]: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    [Chains.EthereumMainnet]: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    [Chains.BaseMainnet]: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    [Chains.BaseSepolia]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  } satisfies AddressByChain,
});

export const uniswapV3 = Object.freeze({
  swapRouter02,
  quoterV2,
  permit2,
  factory,
  nonfungiblePositionManager,
  universalRouter,
  swapRouter02Abi,
  quoterV2Abi,
  factoryAbi,
  tokens,
});
