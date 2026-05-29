// AAVE V3 whitelist context — Pool/Oracle/wethGateway addresses per
// supported chain, the Pool ABI fragments (events + the read/write
// methods the canonical templates target), and event-topic hashes.
//
// Mirrors studio/app/lib/contracts/protocols/aave-v3.ts but in a flat,
// data-only shape — no UI metadata (no `slug`, `label`, `description`
// fields, no `KnownProtocol`/`KnownEvent` envelopes). The SDK only needs
// the raw whitelist context so template tests can stop hard-coding it.
// Studio's UI layer keeps its richer shape; both will eventually consume
// from the same canonical data once studio's request-builder moves over.
//
// Address parity with studio's per-chain data files:
//   sepolia       → app/lib/aave/v3/data/sepolia.json
//   ethereum      → app/lib/aave/v3/data/ethereum.json
//   base          → app/lib/aave/v3/data/base.json
//   base-sepolia  → app/lib/aave/v3/data/base-sepolia.json
// If those drift, update here too.

import { Chains } from "../chains";
import { type AbiFragment, type AddressByChain } from "./types";

/**
 * AAVE V3 Pool addresses per chain. The Pool is the single entry point
 * for supply / borrow / repay / withdraw / liquidationCall and is the
 * contract whose events templates filter on (`Supply`, `Borrow`, etc.).
 */
const pool: AddressByChain = {
  [Chains.EthereumMainnet]: "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
  [Chains.Sepolia]: "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951",
  [Chains.BaseMainnet]: "0xA238Dd80C259a72e81d7e4664a9801593F98d1c5",
  [Chains.BaseSepolia]: "0x8bAB6d1b75f19e9eD9fCe8b9BD338844fF79aE27",
};

/**
 * Aave Oracle — the price feed used by Pool to value collateral and
 * debt. Templates that derive health-factor-equivalent metrics off
 * chain can hit this directly to avoid a Pool round-trip.
 */
const oracle: AddressByChain = {
  [Chains.EthereumMainnet]: "0x54586bE62E3c3580375aE3723C145253060Ca0C2",
  [Chains.Sepolia]: "0x2da88497588bf89281816106C7259e31AF45a663",
  [Chains.BaseMainnet]: "0x2Cc0Fc26eD4563A5ce5e8bdcfe1A2878676Ae156",
  [Chains.BaseSepolia]: "0x943b0dE18d4abf4eF02A85912F8fc07684C141dF",
};

/**
 * WETH gateway — wraps native ETH supplies so Pool can hold WETH as
 * the reserve. Templates that supply native ETH (rather than an
 * already-wrapped token) go through here instead of Pool directly.
 */
const wethGateway: AddressByChain = {
  [Chains.EthereumMainnet]: "0xd01607c3C5eCABa394D8be377a08590149325722",
  [Chains.Sepolia]: "0x387d311e47e80b498169e6fb51d3193167d89F7D",
  [Chains.BaseMainnet]: "0xa0d9C1E9E48Ca30c8d8C3B5D69FF5dc1f6DFfC24",
  [Chains.BaseSepolia]: "0x0568130e794429D2eEBC4dafE18f25Ff1a1ed8b6",
};

/**
 * Pre-computed keccak256 of the canonical event signatures. Cheaper
 * than recomputing per-call and stable across deployments. Match
 * topics[0] on `eventTrigger` queries against these.
 */
const eventTopics = Object.freeze({
  Supply: "0x2b627736bca15cd5381dcf80b0bf11fd197d01a037c52b927a881a10fb73ba61",
  Withdraw: "0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7",
  Borrow: "0xb3d084820fb1a9decffb176436bd02558d15fac9b0ddfed8c465bc7359d7dce0",
  Repay: "0xa534c8dbe71f871f9f3530e97a74601fea17b426cae02e1c5aee42c96c784051",
  LiquidationCall: "0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286",
} as const);

/**
 * Pool event ABI — Supply / Withdraw / Borrow / Repay / LiquidationCall.
 * Used by `eventTrigger` queries to decode topic data so downstream
 * nodes can reference `reserve`, `amount`, `onBehalfOf`, etc. by name.
 */
const poolEventsAbi: readonly AbiFragment[] = Object.freeze([
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "reserve", type: "address" },
      { indexed: false, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "address", name: "onBehalfOf", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: true, internalType: "uint16", name: "referralCode", type: "uint16" },
    ],
    name: "Supply",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "reserve", type: "address" },
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "reserve", type: "address" },
      { indexed: false, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "address", name: "onBehalfOf", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "uint8", name: "interestRateMode", type: "uint8" },
      { indexed: false, internalType: "uint256", name: "borrowRate", type: "uint256" },
      { indexed: true, internalType: "uint16", name: "referralCode", type: "uint16" },
    ],
    name: "Borrow",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "reserve", type: "address" },
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "address", name: "repayer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "bool", name: "useATokens", type: "bool" },
    ],
    name: "Repay",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "collateralAsset", type: "address" },
      { indexed: true, internalType: "address", name: "debtAsset", type: "address" },
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "debtToCover", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "liquidatedCollateralAmount", type: "uint256" },
      { indexed: false, internalType: "address", name: "liquidator", type: "address" },
      { indexed: false, internalType: "bool", name: "receiveAToken", type: "bool" },
    ],
    name: "LiquidationCall",
    type: "event",
  },
]);

/**
 * Pool method ABI — the read + write surface templates routinely call:
 * `getUserAccountData` (account health), `supply`, `borrow`, `repay`,
 * `withdraw`, and `setUserUseReserveAsCollateral`. Mirrors the
 * `actions[]` block in studio's `aave-v3.ts` but as raw ABI so
 * `Nodes.contractRead`/`contractWrite` can consume it directly.
 */
const poolMethodsAbi: readonly AbiFragment[] = Object.freeze([
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserAccountData",
    outputs: [
      { internalType: "uint256", name: "totalCollateralBase", type: "uint256" },
      { internalType: "uint256", name: "totalDebtBase", type: "uint256" },
      { internalType: "uint256", name: "availableBorrowsBase", type: "uint256" },
      { internalType: "uint256", name: "currentLiquidationThreshold", type: "uint256" },
      { internalType: "uint256", name: "ltv", type: "uint256" },
      { internalType: "uint256", name: "healthFactor", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "onBehalfOf", type: "address" },
      { internalType: "uint16", name: "referralCode", type: "uint16" },
    ],
    name: "supply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "interestRateMode", type: "uint256" },
      { internalType: "uint16", name: "referralCode", type: "uint16" },
      { internalType: "address", name: "onBehalfOf", type: "address" },
    ],
    name: "borrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "interestRateMode", type: "uint256" },
      { internalType: "address", name: "onBehalfOf", type: "address" },
    ],
    name: "repay",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "withdraw",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "bool", name: "useAsCollateral", type: "bool" },
    ],
    name: "setUserUseReserveAsCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]);

/**
 * Per-chain reserve token addresses for the assets AAVE V3 markets
 * keep available across chains. Mainly used by template tests that
 * need a known faucet-mintable token to drive supply/borrow flows
 * against the live testnet markets. Extend per chain as more reserves
 * become test-relevant.
 *
 * NOTE: the Sepolia LINK here is AAVE's *faucet-mintable test token*
 * wired into the Sepolia market, not mainnet ChainLink LINK.
 */
const tokens = Object.freeze({
  LINK: {
    [Chains.Sepolia]: "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5",
  } satisfies AddressByChain,
});

export const aaveV3 = Object.freeze({
  pool,
  oracle,
  wethGateway,
  eventTopics,
  poolEventsAbi,
  poolMethodsAbi,
  tokens,
});
