// Token metadata types based on avs.proto TokenMetadata message

/**
 * Represents ERC20 token information
 */
export interface TokenMetadata {
  /** Contract address (lowercase, normalized) */
  address: string;
  /** Token name (e.g., "USD Coin") */
  name: string;
  /** Token symbol (e.g., "USDC") */
  symbol: string;
  /** Number of decimal places */
  decimals: number;
}

/**
 * Request for token metadata lookup
 */
export interface GetTokenMetadataRequest {
  /** Contract address to look up */
  address: string;
}

/**
 * Response containing token metadata
 */
export interface GetTokenMetadataResponse {
  /** Token metadata information (null if not found) */
  token: TokenMetadata | null;
  /** Whether the token was found */
  found: boolean;
  /** Source of data: "whitelist", "rpc", or "cache" */
  source: string;
}

/**
 * Token source types for better type safety
 */
export type TokenSource = "whitelist" | "rpc" | "cache" | ""; 