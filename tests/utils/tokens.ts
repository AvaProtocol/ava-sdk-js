/**
 * Token configuration constants for different networks
 */

export const SEPOLIA_TOKEN_CONFIGS = {
  USDC: {
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
  },
  LINK: {
    address: "0x779877a7b0d9e8603169ddbd7836e478b4624789",
    name: "ChainLink Token", 
    symbol: "LINK",
    decimals: 18,
  },
} as const;

// Convenience exports for commonly used addresses
export const USDC_SEPOLIA_ADDRESS = SEPOLIA_TOKEN_CONFIGS.USDC.address;
export const LINK_SEPOLIA_ADDRESS = SEPOLIA_TOKEN_CONFIGS.LINK.address;
