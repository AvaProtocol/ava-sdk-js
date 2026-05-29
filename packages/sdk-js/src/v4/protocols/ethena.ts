// Ethena — USDe synthetic dollar + sUSDe staking vault.
//
// sUSDe (StakedUSDeV2) is ERC-4626-shaped on the deposit side but
// gates withdrawals behind a cooldown: redemption is a two-step
// `cooldownShares` → `unstake` flow, NOT a direct ERC-4626 redeem.
// So we ship a custom ABI rather than reusing `common.erc4626VaultAbi`.

import { Chains } from "../chains";
import { type AbiFragment, type AddressByChain } from "./types";

const susde: AddressByChain = {
  [Chains.EthereumMainnet]: "0x9D39A5DE30e57443BfF2A8307A4256c8797A3497",
};

const usde: AddressByChain = {
  [Chains.EthereumMainnet]: "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3",
};

const susdeAbi: readonly AbiFragment[] = Object.freeze([
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
    inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    name: "cooldownShares",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "unstake",
    outputs: [],
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

export const ethena = Object.freeze({
  susde,
  usde,
  susdeAbi,
});
