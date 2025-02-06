export const getKeyRequestMessage = (chainId: number, address: string, issuedAt: Date, expiredAt: Date): string => {
  return `Please sign the below text for ownership verification.

URI: https://app.avaprotocol.org
Chain ID: ${chainId}
Version: 1
Issued At: ${issuedAt.toISOString()}
Expire At: ${expiredAt.toISOString()}
Wallet: ${address}`;

}
