// Rocket Pool — rETH liquid-staking token. L1 rETH supports burn /
// getExchangeRate / getEthValue; Base rETH is a bridged ERC-20 and
// only exposes the standard ERC-20 surface.

import { Chains } from "../chains";
import { type AbiFragment, type AddressByChain } from "./types";

const reth: AddressByChain = {
  [Chains.EthereumMainnet]: "0xae78736Cd615f374D3085123A210448E74Fc6393",
  [Chains.BaseMainnet]: "0xB6fe221Fe9EeF5aBa221c348bA20A1Bf5e73624c",
};

/** L1-only `burn` + rate/value reads. */
const rethAbi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [{ internalType: "uint256", name: "_rethAmount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getExchangeRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_rethAmount", type: "uint256" }],
    name: "getEthValue",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]);

export const rocketPool = Object.freeze({
  reth,
  rethAbi,
});
