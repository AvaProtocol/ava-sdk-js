// Public v4 entrypoint. Consumers should `import { Client } from
// "@avaprotocol/sdk-js"` once the v3 surface is retired and this
// becomes the root export. For now the v3 index re-exports the v4
// names alongside the v3 ones so partners can migrate incrementally.

export { Client, type ClientOptions } from "./client";
export { Chains, type ChainId } from "./chains";
export { Triggers } from "./builders/triggers";
export { Nodes } from "./builders/nodes";
export {
  Protocols,
  Tokens,
  lookupToken,
  type AbiFragment,
  type AddressByChain,
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
export { APIError, NetworkError, AuthRequiredError } from "./internal/errors";

// Resource classes are exported in case advanced consumers want to
// hand-construct one without going through Client. Most callers
// won't need these.
export { AuthResource } from "./resources/auth";
export { ExecutionsResource } from "./resources/executions";
export { HealthResource } from "./resources/health";
export { NodesResource } from "./resources/nodes";
export { OperatorsResource } from "./resources/operators";
export { SecretsResource } from "./resources/secrets";
export { TokensResource } from "./resources/tokens";
export { TriggersResource } from "./resources/triggers";
export { WalletsResource } from "./resources/wallets";
export { WorkflowsResource } from "./resources/workflows";

// Re-export the v4 type bag so consumers don't have to import
// `@avaprotocol/types` separately for common types.
export type { v4 } from "@avaprotocol/types";
