import { Wallet } from "ethers";

export const getKeyRequestMessage = (wallet: Wallet, expiredAt: number): string => {
  return `key request for ${wallet.address} expired at ${expiredAt}`;
}
