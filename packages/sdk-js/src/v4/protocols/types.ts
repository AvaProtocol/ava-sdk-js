// Loose ABI fragment shape — matches both ethers/viem-style entries and
// the protobuf-flavoured form Studio passes through. We intentionally
// don't try to narrow `inputs`/`outputs` further than `unknown[]` here:
// the SDK's contractRead/contractWrite builders accept anything that
// JSON-serializes, and the aggregator does its own canonicalization.
//
// Source of truth for the strict variant is studio's app/types/abi.ts;
// the SDK keeps a permissive view so this module can stay zero-dep.
export interface AbiFragment {
  readonly name?: string;
  readonly type: string;
  readonly stateMutability?: string;
  readonly anonymous?: boolean;
  readonly inputs?: readonly unknown[];
  readonly outputs?: readonly unknown[];
  // Permissive tail so `AbiFragment` satisfies the SDK builder's
  // `Record<string, unknown>` ABI param. Real ABI entries carry a
  // handful of vendor-specific keys (gas, signature, etc.) we don't
  // care to enumerate, and the aggregator just round-trips the
  // dictionary unchanged.
  readonly [key: string]: unknown;
}

import { type ChainId } from "../chains";

/**
 * Per-chain address map. Use `ChainId` constants from `Chains.*` for
 * the keys at the call site; `Partial` because not every protocol
 * ships on every chain.
 */
export type AddressByChain = Partial<Record<ChainId, `0x${string}`>>;
