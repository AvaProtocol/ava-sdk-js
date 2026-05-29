// Shared ABI fragments that more than one protocol routinely reuses:
// - AggregatorV3Interface for any Chainlink-compatible price feed
// - ERC-4626 deposit/redeem for staking vaults (sUSDe, sfrxETH, sDAI, ...)
// - ERC-20 approve already lives in `./erc20.ts` — keep that import path
//   stable since it's the most-touched fragment in the catalog.

import { type AbiFragment } from "./types";

/**
 * Chainlink AggregatorV3Interface — `latestRoundData` and `decimals`.
 * Every Chainlink Data Feed contract implements this, so the same ABI
 * works for ETH/USD, BTC/USD, LINK/USD, etc.
 */
export const aggregatorV3Abi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
]);

/**
 * Minimal ERC-4626 vault ABI — `deposit`, `redeem`, `previewRedeem`,
 * `convertToAssets`. Sufficient for staking vault templates that wrap
 * an underlying into a yield-bearing share token (sfrxETH, sDAI, etc.).
 * Vaults with non-standard write paths (e.g. sUSDe's cooldown +
 * unstake) ship their own ABI in their own protocol module.
 */
export const erc4626VaultAbi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [
      { internalType: "uint256", name: "assets", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "deposit",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "shares", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "redeem",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    name: "previewRedeem",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    name: "convertToAssets",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]);
