// Wrapped Ether (WETH) — the canonical native-ETH wrapping contract.
// Mainnet WETH is a one-off; Base (and Base Sepolia) use the OP-stack
// predeploy at 0x4200…0006. Sepolia is the Uniswap-deployed test WETH
// used by AAVE Sepolia and Uniswap Sepolia.

import { Chains } from "../chains";
import { type AbiFragment, type AddressByChain } from "./types";

const weth: AddressByChain = {
  [Chains.EthereumMainnet]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  [Chains.Sepolia]: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
  [Chains.BaseMainnet]: "0x4200000000000000000000000000000000000006",
  [Chains.BaseSepolia]: "0x4200000000000000000000000000000000000006",
};

/**
 * WETH9 ABI — `deposit` (payable wrap) + `withdraw` (unwrap) + the
 * standard ERC-20 surface templates rely on. `deposit` is payable
 * with no args; the wrap amount comes from `msg.value`, so the
 * contractWrite node must surface an editable value field — keep
 * stateMutability: "payable" so the SDK builder doesn't hide it.
 */
const wethAbi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "wad", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "guy", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]);

export const wrapped = Object.freeze({
  weth,
  wethAbi,
});
