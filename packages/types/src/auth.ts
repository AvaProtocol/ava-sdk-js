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

export interface GetKeyRequest {
  chainId: number;
  address: string;
  issuedAt: Date;
  expiredAt: Date;
  signature: string;
}

export interface GetKeyResponse {
  authKey: string;
}
