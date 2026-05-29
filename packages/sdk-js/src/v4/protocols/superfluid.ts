// Superfluid — money streaming via the CFAv1Forwarder. Deployed at
// the same address on every Superfluid network (Ethereum, Base,
// Polygon, Optimism, ...). Flow rates are tokens-per-second as int96.

import { Chains } from "../chains";
import { type AbiFragment, type AddressByChain } from "./types";

const cfaForwarder: AddressByChain = {
  [Chains.EthereumMainnet]: "0xcfA132E353cB4E398080B9700609bb008eceB125",
  [Chains.BaseMainnet]: "0xcfA132E353cB4E398080B9700609bb008eceB125",
};

/** CFAv1Forwarder minimal write surface — `setFlowrate` + `createFlow`. */
const cfaForwarderAbi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "int96", name: "flowrate", type: "int96" },
    ],
    name: "setFlowrate",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "int96", name: "flowrate", type: "int96" },
      { internalType: "bytes", name: "userData", type: "bytes" },
    ],
    name: "createFlow",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
]);

export const superfluid = Object.freeze({
  cfaForwarder,
  cfaForwarderAbi,
});
