// Morpho Blue — permissionless lending singleton. Same address on
// every supported chain. Every market is addressed by a `MarketParams`
// tuple (loanToken, collateralToken, oracle, irm, lltv); lending calls
// pass that struct plus an amount in either `assets` or `shares`
// (one is zero).

import { Chains } from "../chains";
import { type AbiFragment, type AddressByChain } from "./types";

const morpho: AddressByChain = {
  [Chains.EthereumMainnet]: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
  [Chains.BaseMainnet]: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
};

/**
 * Morpho Blue minimal write+read surface. Each write takes the full
 * `MarketParams` tuple as the first argument; the `data` callback
 * bytes default to `0x` in template usage.
 */
const morphoAbi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "loanToken", type: "address" },
          { internalType: "address", name: "collateralToken", type: "address" },
          { internalType: "address", name: "oracle", type: "address" },
          { internalType: "address", name: "irm", type: "address" },
          { internalType: "uint256", name: "lltv", type: "uint256" },
        ],
        internalType: "struct MarketParams",
        name: "marketParams",
        type: "tuple",
      },
      { internalType: "uint256", name: "assets", type: "uint256" },
      { internalType: "uint256", name: "shares", type: "uint256" },
      { internalType: "address", name: "onBehalf", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "supply",
    outputs: [
      { internalType: "uint256", name: "assetsSupplied", type: "uint256" },
      { internalType: "uint256", name: "sharesSupplied", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "loanToken", type: "address" },
          { internalType: "address", name: "collateralToken", type: "address" },
          { internalType: "address", name: "oracle", type: "address" },
          { internalType: "address", name: "irm", type: "address" },
          { internalType: "uint256", name: "lltv", type: "uint256" },
        ],
        internalType: "struct MarketParams",
        name: "marketParams",
        type: "tuple",
      },
      { internalType: "uint256", name: "assets", type: "uint256" },
      { internalType: "uint256", name: "shares", type: "uint256" },
      { internalType: "address", name: "onBehalf", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
    ],
    name: "borrow",
    outputs: [
      { internalType: "uint256", name: "assetsBorrowed", type: "uint256" },
      { internalType: "uint256", name: "sharesBorrowed", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "id", type: "bytes32" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "position",
    outputs: [
      { internalType: "uint256", name: "supplyShares", type: "uint256" },
      { internalType: "uint128", name: "borrowShares", type: "uint128" },
      { internalType: "uint128", name: "collateral", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
]);

export const morphoBlue = Object.freeze({
  morpho,
  morphoAbi,
});
