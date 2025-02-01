export const getKeyRequestMessage = (chainId: number, address: string, issuedAt: string, expiredAt: string): string => {
  return `Please sign the below text for ownership verification.

URI: https://app.avaprotocol.org
Chain ID: ${chainId}
Version: 1
Issued At: ${issuedAt}
Expire At: ${expiredAt}
Wallet: ${address}`;

}
