import { APIError, Client, type TypedDataSigner } from "@avaprotocol/sdk-js";
import type {
  WalletBudgetInput,
  PreparedPolicy,
  SubmitBudgetPreparationRequest,
  BudgetChangeState,
  v4,
} from "@avaprotocol/types";
declare const client: Client;
declare const prepared: PreparedPolicy;
declare const legacySigner: TypedDataSigner;
declare const refusal: APIError;
declare const policy: v4.SessionPolicy;
const cleanupRequired: boolean = policy.onChainCleanupRequired;
const cleanupPayload: v4.OnChainRevokeCleanup | undefined = policy.onChainCleanup;
declare const submittedPolicy: v4.SubmitPolicyResponse;
const submittedCleanupRequired: boolean = submittedPolicy.onChainCleanupRequired;
// @ts-expect-error The cleanup requirement is a boolean, not text.
const invalidCleanupRequired: v4.SessionPolicy = { ...policy, onChainCleanupRequired: "true" };
const submissionStarted: boolean | undefined = refusal.problem?.submissionStarted;
const ownerDelegate: string | undefined = refusal.problem?.ownerDelegate;
const unsent: v4.Problem = {
  type: "about:blank",
  title: "Budget couldn't be submitted",
  status: 503,
  code: "BUDGET_READ_UNAVAILABLE",
  submissionStarted: false,
};
const uncertain: v4.Problem = { ...unsent, submissionStarted: true };
const delegatedOwner: v4.Problem = {
  type: "about:blank",
  title: "Owner account setup is unsupported",
  status: 409,
  code: "EOA_DELEGATION_MISSING",
  ownerDelegate,
};
// @ts-expect-error The send boundary is a JSON boolean, never prose.
const invalidBoundary: v4.Problem = { ...unsent, submissionStarted: "false" };
// @ts-expect-error The observed delegate is an address string, not a number.
const invalidDelegate: v4.Problem = { ...delegatedOwner, ownerDelegate: 1 };
const retiredCleanup: v4.OnChainRevokeCleanup | undefined = refusal.problem?.onChainCleanup;
const retiredGrant: v4.Problem = {
  ...delegatedOwner,
  code: "BUDGET_RETIRED_GRANT_INSTALLED",
  ...(retiredCleanup !== undefined ? { onChainCleanup: retiredCleanup } : {}),
};
// @ts-expect-error Cleanup must carry a typed transaction, not raw calldata alone.
const invalidRetiredCleanup: v4.Problem = { ...retiredGrant, onChainCleanup: "0xb6b1ccfe" };
// A typed deadline is optional for older gateways and other Problem codes.
const legacyGrantDeadline: number | undefined = refusal.problem?.legacyGrantDeadline;
const legacyPending: v4.Problem = {
  type: "about:blank",
  title: "Budget request refused",
  status: 409,
  code: "BUDGET_LEGACY_GRANT_PENDING",
  legacyGrantDeadline,
};
const olderGateway: v4.Problem = {
  type: "about:blank",
  title: "Budget request refused",
  status: 409,
};
// @ts-expect-error The deadline is a JSON number in unix milliseconds, not prose.
const invalidDeadline: v4.Problem = { ...legacyPending, legacyGrantDeadline: "2026-11-04T00:00:00Z" };
const chain = { chainId: 11155111 };
const budget: WalletBudgetInput = { validUntil: 1810000000000 };
const submission: SubmitBudgetPreparationRequest = { signature: "0x" };
const state: BudgetChangeState = "rejected";
client.policies.prepare("wallet", { ...chain, agentLabel: state, budget });
client.wallets.getBudget("wallet", chain);
client.policies.getPreparation("wallet", "id", chain);
client.policies.submitPreparation("wallet", "id", submission, chain);
client.policies.prepareCancel("wallet", "id", chain);
// @ts-expect-error Budget reads require an explicit chain.
client.wallets.getBudget("wallet");
// @ts-expect-error Budget recovery requires an explicit chain.
client.policies.getPreparation("wallet", "id");
// @ts-expect-error Budget submission requires an explicit chain.
client.policies.submitPreparation("wallet", "id", submission);
// @ts-expect-error Cancel preparation requires an explicit chain.
client.policies.prepareCancel("wallet", "id");
// @ts-expect-error Only the signature is accepted; no replacement operation.
client.policies.submitPreparation("wallet", "id", { signature: "0x", userOp: {} }, chain);
// @ts-expect-error Budget replies have no legacy typed-data payload.
legacySigner(prepared.typedData);
