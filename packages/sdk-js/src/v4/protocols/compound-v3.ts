// Compound V3 (Comet) — USDC base market.
//
// Comet bundles supply/borrow on a single contract: `supply` /
// `withdraw` move the base asset (USDC, 6 decimals) or collateral;
// `withdraw` past zero opens a borrow.
//
// Address parity with studio/app/lib/contracts/protocols/compound-v3.ts.

import { Chains } from "../chains";
import { type AddressByChain } from "./types";

const cometUsdc: AddressByChain = {
  [Chains.EthereumMainnet]: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
  [Chains.BaseMainnet]: "0xb125E6687d4313864e53df431d5425969c15Eb2F",
};

export const compoundV3 = Object.freeze({
  cometUsdc,
});
