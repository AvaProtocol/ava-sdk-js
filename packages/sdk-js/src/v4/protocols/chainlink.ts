// Chainlink Data Feeds — AggregatorV3Interface price oracles.
//
// The ABI for every Chainlink Data Feed is the same (AggregatorV3
// Interface), so it lives in `./common.ts` as `aggregatorV3Abi` and
// every feed entry below reuses it. The catalog ships the ETH/USD +
// BTC/USD feeds Studio surfaces by default plus the Sepolia ETH/USD
// feed the v4 stoploss template test uses.
//
// Address verification dates: same as studio's chainlink.ts (May 2026).
// Extend with more feeds (LINK/USD, EUR/USD, etc.) as templates land.

import { Chains } from "../chains";
import { aggregatorV3Abi } from "./common";
import { type AddressByChain } from "./types";

const ethUsdFeed: AddressByChain = {
  [Chains.EthereumMainnet]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [Chains.Sepolia]: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
};

const btcUsdFeed: AddressByChain = {
  [Chains.EthereumMainnet]: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
};

export const chainlink = Object.freeze({
  ethUsdFeed,
  btcUsdFeed,
  /** Shared AggregatorV3 ABI — works for any Chainlink feed. */
  aggregatorV3Abi,
});
