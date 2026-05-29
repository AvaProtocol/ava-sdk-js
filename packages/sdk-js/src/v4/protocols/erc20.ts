// Minimal ERC-20 ABI fragments that templates routinely need but don't
// belong to any one protocol. `approveAbi` is the standard 2-arg ERC-20
// approve — used by any DeFi flow that funnels tokens through a protocol's
// pool/router (AAVE.supply, Uniswap.swap, etc.).

import { type AbiFragment } from "./types";

export const erc20 = Object.freeze({
  approveAbi: Object.freeze([
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]) as readonly AbiFragment[],
});
