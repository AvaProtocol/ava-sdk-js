// Lido — stETH (L1 rebasing) + wstETH (wrapped). Wrap/unwrap only
// exist on the L1 wstETH contract; the Base wstETH entry is a
// bridged ERC-20 and supports standard ERC-20 transfers / approvals
// only. stETH is not bridged to Base.

import { Chains } from "../chains";
import { type AbiFragment, type AddressByChain } from "./types";

const wsteth: AddressByChain = {
  [Chains.EthereumMainnet]: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
  [Chains.BaseMainnet]: "0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452",
};

const steth: AddressByChain = {
  [Chains.EthereumMainnet]: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
};

/**
 * wstETH wrap/unwrap + getStETHByWstETH read. L1-only — calls against
 * the Base bridged token revert.
 */
const wstethAbi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [{ internalType: "uint256", name: "_stETHAmount", type: "uint256" }],
    name: "wrap",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_wstETHAmount", type: "uint256" }],
    name: "unwrap",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_wstETHAmount", type: "uint256" }],
    name: "getStETHByWstETH",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]);

export const lido = Object.freeze({
  wsteth,
  steth,
  wstethAbi,
});
