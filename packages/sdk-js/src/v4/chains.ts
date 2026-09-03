// Chain ID constants for v4 callers. The aggregator's REST API accepts
// any int64 chainId on chain-aware requests — these constants exist so
// SDK callers don't sprinkle magic numbers and so the auth flow has a
// single source of truth for which chain JWTs are minted against.
//
// The full chain set comes from `@avaprotocol/protocols` (the data-only
// DeFi catalog), plus two SDK-specific constants: `EigenLayerAuth` for
// the auth-handler audience, and a deprecated `Holesky` alias so a
// catalog major does not force an SDK major. New chains added to the
// catalog flow through automatically — bumping the catalog dep is enough.

import { Chains as CatalogChains } from "@avaprotocol/protocols";

export const Chains = Object.freeze({
  ...CatalogChains,
  /**
   * The chain the auth handler signs the canonical EIP-191 message
   * against. Defaults to Sepolia — keep this synced with the
   * aggregator's `smart_wallet.chain_id` setting (currently Sepolia
   * in dev/staging, Ethereum mainnet in production).
   */
  EigenLayerAuth: 11_155_111 as const,
  /**
   * @deprecated Catalog 1.0.0 dropped `Chains.Holesky` (17000). Kept
   * as an SDK alias so existing `Chains.Holesky` callers still compile
   * on a 4.x minor. Use `Chains.Sepolia` for testnet work.
   */
  Holesky: 17_000 as const,
});

export type ChainId = (typeof Chains)[keyof typeof Chains] | number;
