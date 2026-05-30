// Chain ID constants for v4 callers. The aggregator's REST API accepts
// any int64 chainId on chain-aware requests — these constants exist so
// SDK callers don't sprinkle magic numbers and so the auth flow has a
// single source of truth for which chain JWTs are minted against.
//
// The full chain set comes from `@avaprotocol/protocols` (the data-only
// DeFi catalog), with one SDK-specific addition (`EigenLayerAuth`) for
// the auth-handler audience. New chains added to the catalog flow
// through automatically — bumping the catalog dep is enough.

import { Chains as CatalogChains } from "@avaprotocol/protocols";

export const Chains = Object.freeze({
  ...CatalogChains,
  /**
   * The chain the auth handler signs the canonical EIP-191 message
   * against. Defaults to Sepolia — keep this synced with the
   * aggregator's `smart_wallet.chain_id` setting (currently Sepolia
   * in dev/staging, Ethereum mainnet in production). This is the only
   * chain constant the SDK adds on top of the catalog, because the
   * catalog is consumer-agnostic and doesn't know about our auth flow.
   */
  EigenLayerAuth: 11_155_111 as const,
});

export type ChainId = (typeof Chains)[keyof typeof Chains] | number;
