// Spark Protocol — SparkLend money market, an AAVE V3 fork.
//
// Because Spark forked AAVE V3 unchanged, the Pool contract surface
// is identical: `supply`, `withdraw`, `borrow`, `repay`,
// `setUserUseReserveAsCollateral`, `getUserAccountData` — same
// signatures as `Protocols.aaveV3.poolMethodsAbi`. Templates that
// target Spark can pass `aaveV3.poolMethodsAbi` directly; we don't
// re-vendor a copy. Only the addresses differ.

import { Chains } from "../chains";
import { type AddressByChain } from "./types";

const pool: AddressByChain = {
  [Chains.EthereumMainnet]: "0xC13e21B648A5Ee794902342038FF3aDAB66BE987",
};

export const spark = Object.freeze({
  pool,
});
