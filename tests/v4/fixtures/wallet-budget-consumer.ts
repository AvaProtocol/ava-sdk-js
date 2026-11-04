import { Client, type TypedDataSigner } from "@avaprotocol/sdk-js";
import type {
  WalletBudgetInput,
  PreparedPolicy,
  SubmitBudgetPreparationRequest,
  BudgetChangeState,
} from "@avaprotocol/types";
declare const client: Client;
declare const prepared: PreparedPolicy;
declare const legacySigner: TypedDataSigner;
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
