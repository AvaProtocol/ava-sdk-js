// Sky Protocol (formerly MakerDAO) — sDAI savings vault. Standard
// ERC-4626 wrapper over the Dai Savings Rate (no cooldown), so the
// shared vault ABI applies cleanly.

import { Chains } from "../chains";
import { erc4626VaultAbi } from "./common";
import { type AddressByChain } from "./types";

const sdai: AddressByChain = {
  [Chains.EthereumMainnet]: "0x83F20F44975D03b1b09e64809B757c47f942BEeA",
};

export const sky = Object.freeze({
  sdai,
  /** Standard ERC-4626 surface — sDAI conforms exactly. */
  vaultAbi: erc4626VaultAbi,
});
