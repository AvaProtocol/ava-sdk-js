// Public v4 entrypoint. Consumers should `import { Client } from
// "@avaprotocol/sdk-js"` once the v3 surface is retired and this
// becomes the root export. For now the v3 index re-exports the v4
// names alongside the v3 ones so partners can migrate incrementally.

export { Client, type ClientOptions } from "./client";
export { Chains, type ChainId } from "./chains";
export { Triggers } from "./builders/triggers";
export { Nodes } from "./builders/nodes";
export {
  UniswapV3,
  type UniswapV3FeeTier,
  type UniswapV3SwapNodeOptions,
  type UniswapV3QuoteNodeOptions,
} from "./builders/uniswap";
export {
  SessionPolicyActions,
  SELECTOR_ERC20_APPROVE,
  SELECTOR_ERC20_TRANSFER,
  SELECTOR_UNISWAP_V3_EXACT_INPUT_SINGLE,
  actionsCover,
  missingActions,
} from "./builders/sessionPolicy";
export {
  Protocols,
  Tokens,
  lookupToken,
  type AbiFragment,
  type AddressByChain,
  type AaveV3Reserve,
  type AaveV3ReservesByChain,
  type AaveV3MarketKey,
  type AaveV3Market,
  type AaveV3MarketsByChain,
  type TokenByChain,
  type TokenChainEntry,
  type TokenLinks,
} from "./protocols";
export {
  buildAuthMessage,
  signAuthMessage,
  AUTH_TEMPLATE,
  type BuildAuthMessageInput,
  type BuiltAuthMessage,
} from "./auth";
// Partner assertion *constants* only — minting is Node-only and lives at
// `@avaprotocol/sdk-js/partner` so browser bundles never pull in `node:crypto`.
export {
  PARTNER_ASSERTION_HEADER,
  PARTNER_SCOPE_READ,
} from "./partnerAssertionConstants";
export { APIError, NetworkError, AuthRequiredError } from "./internal/errors";

// Resource classes are exported in case advanced consumers want to
// hand-construct one without going through Client. Most callers
// won't need these.
export { AuthResource } from "./resources/auth";
export { ExecutionsResource } from "./resources/executions";
export { HealthResource } from "./resources/health";
export { NodesResource, type RunNodeOptions } from "./resources/nodes";
export {
  readContractWriteExecutions,
  type ContractWriteExecutionStatus,
  type ContractWriteMethodExecution,
} from "./results/contractWrite";
export { OperatorsResource } from "./resources/operators";
export { SecretsResource } from "./resources/secrets";
export { TokensResource } from "./resources/tokens";
export { TriggersResource } from "./resources/triggers";
export { PoliciesResource } from "./resources/policies";
export type { TypedDataSigner } from "./resources/policies";
export { WalletsResource } from "./resources/wallets";
export { WorkflowsResource } from "./resources/workflows";

// Re-export the v4 type bag so consumers don't have to import
// `@avaprotocol/types` separately for common types.
export type { v4 } from "@avaprotocol/types";
