// Aerodrome — Base-native AMM (Velodrome V2 fork). Base-only.
// Swaps route through `Route` hops (from, to, stable, factory).

import { Chains } from "../chains";
import { type AddressByChain } from "./types";

const router: AddressByChain = {
  [Chains.BaseMainnet]: "0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43",
};

export const aerodrome = Object.freeze({
  router,
});
