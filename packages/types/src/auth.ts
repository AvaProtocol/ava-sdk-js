export type GetSignatureFormatRequest = {
  wallet: string;
};

export interface GetSignatureFormatResponse {
  message: string;
}

// Common interface for all get authKey requests (legacy)
export type GetKeyRequestMessage = {
  chainId: number;
  address: string;
  issuedAt: Date;
  expiredAt: Date;
};

// Get authKey request with signature
export interface GetKeyRequestSignature {
  message: string;
  signature: string;
}

// Get authKey request with apiKey
export interface GetKeyRequestApiKey {
  message: string;
  apiKey: string;
}

export interface GetKeyResponse {
  authKey: string;
}
