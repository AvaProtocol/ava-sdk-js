// Protocols — the data-only DeFi catalog. Per-protocol per-chain
// contract addresses, ABI fragments, and event-topic hashes that
// template authors and tests need without re-deriving or duplicating
// the same constants across consumers.
//
// Why this lives in the SDK:
// - Template e2e tests (tests/v4/templates/*.test.ts) used to
//   hard-code the same pool / reserve / router addresses + ABIs
//   that Studio already maintained. As more v3 templates port over,
//   the duplication compounds.
// - Studio's catalog (studio/app/lib/contracts/protocols/) is
//   currently the canonical source for richer UI metadata, but it
//   carries UX shape (slug / label / description / KnownProtocol
//   envelopes / ProtocolActionInput components) that pure data
//   consumers don't need. This module ships only the static data
//   — addresses, ABIs, topics — leaving studio's UX layer in place.
// - Other partner SDKs, server-side indexers, and devtools can read
//   the same whitelist without taking a Studio dependency.
//
// Roadmap: studio's `buildWorkflowFromAction` request-builder and
// the UI `KnownProtocol` envelopes stay in studio for now — they
// ride on shapes still iterating with the v4 cutover. Studio
// migrates over to consume from this catalog once that lands.

export { aaveV3 } from "./aave-v3";
export { aerodrome } from "./aerodrome";
export { chainlink } from "./chainlink";
export { compoundV3 } from "./compound-v3";
export { erc20 } from "./erc20";
export { ethena } from "./ethena";
export { fraxEther } from "./frax-ether";
export { lido } from "./lido";
export { morphoBlue } from "./morpho";
export { rocketPool } from "./rocket-pool";
export { sky } from "./sky";
export { spark } from "./spark";
export { superfluid } from "./superfluid";
export { uniswapV3 } from "./uniswap-v3";
export { wrapped } from "./wrapped";
export { aggregatorV3Abi, erc4626VaultAbi } from "./common";
export type { AbiFragment, AddressByChain } from "./types";

import { aaveV3 } from "./aave-v3";
import { aerodrome } from "./aerodrome";
import { chainlink } from "./chainlink";
import { compoundV3 } from "./compound-v3";
import { erc20 } from "./erc20";
import { ethena } from "./ethena";
import { fraxEther } from "./frax-ether";
import { lido } from "./lido";
import { morphoBlue } from "./morpho";
import { rocketPool } from "./rocket-pool";
import { sky } from "./sky";
import { spark } from "./spark";
import { superfluid } from "./superfluid";
import { uniswapV3 } from "./uniswap-v3";
import { wrapped } from "./wrapped";

/**
 * Namespace export so callers can do
 *   `Protocols.aaveV3.pool[Chains.Sepolia]`
 *   `Protocols.uniswapV3.swapRouter02Abi`
 * the same way `Nodes.contractRead(...)` is namespaced.
 *
 * Protocol naming maps from studio's `protocolId` slug to a
 * lowerCamelCase property:
 *   aave-v3       → aaveV3
 *   compound-v3   → compoundV3
 *   frax-ether    → fraxEther
 *   morpho        → morphoBlue (the singleton's product name)
 *   rocket-pool   → rocketPool
 *   uniswap-v3    → uniswapV3
 *   (others)      → same as slug, hyphen → camelCase
 */
export const Protocols = Object.freeze({
  aaveV3,
  aerodrome,
  chainlink,
  compoundV3,
  erc20,
  ethena,
  fraxEther,
  lido,
  morphoBlue,
  rocketPool,
  sky,
  spark,
  superfluid,
  uniswapV3,
  wrapped,
});
