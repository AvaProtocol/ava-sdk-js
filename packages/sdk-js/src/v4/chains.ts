// Chain ID constants for v4 callers. The aggregator's REST API accepts
// any int64 chainId on chain-aware requests — these constants exist so
// SDK callers don't sprinkle magic numbers and so the auth flow has a
// single source of truth for which chain JWTs are minted against.
//
// `EigenLayerAuth` is the chain the aggregator's auth handler treats
// as the canonical audience. It does NOT have to match the workflow's
// target chain — the v4 auth flow is chain-agnostic. Keep this in
// lockstep with the engine's smart-wallet config.

export const Chains = Object.freeze({
  EthereumMainnet: 1 as const,
  Sepolia: 11_155_111 as const,
  Holesky: 17_000 as const,
  BaseMainnet: 8453 as const,
  BaseSepolia: 84_532 as const,
  /**
   * The chain the auth handler signs the canonical EIP-191 message
   * against. Defaults to Sepolia — keep this synced with the
   * aggregator's `smart_wallet.chain_id` setting (currently Sepolia
   * in dev/staging, Ethereum mainnet in production).
   */
  EigenLayerAuth: 11_155_111 as const,
});

export type ChainId = (typeof Chains)[keyof typeof Chains] | number;
