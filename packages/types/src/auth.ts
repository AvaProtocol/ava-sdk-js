export const getKeyRequestMessage = ({
  chainId,
  address,
  issuedAt,
  expiredAt,
}: {
  chainId: number;
  address: string;
  issuedAt: Date;
  expiredAt: Date;
}): string => {
  return `Please sign the below text for ownership verification.
  
  URI: https://app.avaprotocol.org
  Chain ID: ${chainId}
  Version: 1
  Issued At: ${issuedAt.toISOString()}
  Expire At: ${expiredAt.toISOString()}
  Wallet: ${address}`;
};

// Common interface for all get authKey requests
interface GetKeyRequest {
  chainId: number;
  address: string;
  issuedAt: Date;
  expiredAt: Date;
}

// Get authKey request with signature
export interface GetKeyRequestSignature extends GetKeyRequest {
  signature: string;
}

// Get authKey request with apiKey
export interface GetKeyRequestApiKey extends GetKeyRequest {
  apiKey: string;
}

export interface GetKeyResponse {
  authKey: string;
}
