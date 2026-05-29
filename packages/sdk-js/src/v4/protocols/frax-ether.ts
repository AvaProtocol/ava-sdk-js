// Frax Ether — frxETH (the L1 liquid token) + sfrxETH (the ERC-4626
// staking vault that distributes validator yield to depositors).
//
// sfrxETH is a standard ERC-4626 vault — deposit/redeem/previewRedeem/
// convertToAssets all live in `common.erc4626VaultAbi`. We just need
// to surface the addresses.

import { Chains } from "../chains";
import { erc4626VaultAbi } from "./common";
import { type AddressByChain } from "./types";

const sfrxeth: AddressByChain = {
  [Chains.EthereumMainnet]: "0xac3E018457B222d93114458476f3E3416Abbe38F",
};

const frxeth: AddressByChain = {
  [Chains.EthereumMainnet]: "0x5E8422345238F34275888049021821E8E08CAa1f",
};

export const fraxEther = Object.freeze({
  sfrxeth,
  frxeth,
  /** Standard ERC-4626 surface — sfrxETH conforms exactly. */
  vaultAbi: erc4626VaultAbi,
});
