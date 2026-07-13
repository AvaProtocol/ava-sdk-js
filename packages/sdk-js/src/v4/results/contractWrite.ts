import type { v4 } from "@avaprotocol/types";

/**
 * Typed readers for a `contractWrite` `client.nodes.run` response.
 *
 * The gateway returns per-method results under `metadata.results[]`, each with
 * a receipt. For a real execute (`isSimulated: false`) the receipt carries the
 * normalized outcome the preview→confirm→execute flow branches on. These
 * helpers pull that out of the otherwise-untyped response bag.
 *
 * Requires the gateway to surface array-typed contractWrite metadata (it is
 * wrapped under `metadata.results`); older gateways dropped it, in which case
 * these readers return an empty list.
 */

/**
 * Normalized on-chain outcome of a single method call:
 * - `confirmed` — mined and the inner call succeeded
 * - `pending` — the UserOp was submitted but is not yet mined (poll `userOpHash`)
 * - `failed` — submission failed or the transaction/inner call reverted
 */
export type ContractWriteExecutionStatus = "confirmed" | "pending" | "failed";

export interface ContractWriteMethodExecution {
  /** ABI method name (e.g. "exactInputSingle", "approve"). */
  methodName: string;
  /** True only when the method confirmed successfully. */
  success: boolean;
  /** Error summary when the method did not succeed. */
  error?: string;
  /** Normalized outcome; absent on a simulated run that predates the field. */
  executionStatus?: ContractWriteExecutionStatus;
  /** ERC-4337 UserOp hash — present for a real execute (use it to poll pending). */
  userOpHash?: string;
  /** On-chain transaction hash — present once mined (absent while pending). */
  transactionHash?: string;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

/**
 * Extract the per-method execution results from a `contractWrite` `nodes.run`
 * response. Returns an empty array when the response carries no results (a
 * non-contractWrite node, or a gateway that doesn't surface the metadata).
 */
export function readContractWriteExecutions(
  resp: v4.RunNodeResponse,
): ContractWriteMethodExecution[] {
  const results = asRecord(resp?.metadata).results;
  if (!Array.isArray(results)) return [];

  return results.map((raw): ContractWriteMethodExecution => {
    const entry = asRecord(raw);
    const receipt = asRecord(entry.receipt);
    const out: ContractWriteMethodExecution = {
      methodName: typeof entry.methodName === "string" ? entry.methodName : "",
      success: entry.success === true,
    };
    if (typeof entry.error === "string" && entry.error) out.error = entry.error;

    const status = receipt.executionStatus;
    if (status === "confirmed" || status === "pending" || status === "failed") {
      out.executionStatus = status;
    }
    if (typeof receipt.userOpHash === "string" && receipt.userOpHash) {
      out.userOpHash = receipt.userOpHash;
    }
    // The gateway uses the sentinel "pending" for an unmined tx hash; surface a
    // transactionHash only once it's a real mined hash.
    if (
      typeof receipt.transactionHash === "string" &&
      receipt.transactionHash &&
      receipt.transactionHash !== "pending"
    ) {
      out.transactionHash = receipt.transactionHash;
    }
    return out;
  });
}
