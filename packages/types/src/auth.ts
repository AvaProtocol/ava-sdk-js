export const getKeyRequestMessage = ({
  chainId,
  address,
  issuedAt,
  expiredAt,
}: GetKeyRequestMessage): string => {
  return `Please sign the below text for ownership verification.

URI: https://app.avaprotocol.org
Chain ID: ${chainId}
Version: 1
Issued At: ${issuedAt.toISOString()}
Expire At: ${expiredAt.toISOString()}
Wallet: ${address}`;
};

// Common interface for all get authKey requests
export type GetKeyRequestMessage = {
  chainId: number;
  address: string;
  issuedAt: Date;
  expiredAt: Date;
};

// Get authKey request with signature
export type GetKeyRequestSignature = GetKeyRequestMessage & {
  signature: string;
};

// Get authKey request with apiKey
export type GetKeyRequestApiKey = GetKeyRequestMessage & {
  apiKey: string;
};

export interface GetKeyResponse {
  authKey: string;
}
