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
  // Exclude arrays (typeof [] === "object") so only plain objects are read as
  // records — a malformed array entry shouldn't masquerade as a result/receipt.
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/**
 * Extract the per-method execution results from a `contractWrite` `nodes.run`
 * response. Returns an empty array when the response carries no results (a
 * non-contractWrite node, or a gateway that doesn't surface the metadata).
 */
export function readContractWriteExecutions(
  resp: v4.RunNodeResponse | undefined,
): ContractWriteMethodExecution[] {
  const results = asRecord(resp?.metadata).results;
  if (!Array.isArray(results)) return [];

  const executions: ContractWriteMethodExecution[] = [];
  for (const raw of results) {
    const entry = asRecord(raw);
    // Skip malformed entries with no method name rather than emitting a
    // phantom execution (empty methodName) that a caller might act on.
    if (typeof entry.methodName !== "string" || !entry.methodName) continue;
    const receipt = asRecord(entry.receipt);

    const out: ContractWriteMethodExecution = {
      methodName: entry.methodName,
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
    // A transaction hash exists only once mined. Key off the normalized
    // executionStatus ("pending" ⇒ not mined) rather than the gateway's raw
    // "pending" sentinel, so a sentinel change can't leak a fake hash; the
    // string guard is a defensive backstop.
    if (
      out.executionStatus !== "pending" &&
      typeof receipt.transactionHash === "string" &&
      receipt.transactionHash &&
      receipt.transactionHash !== "pending"
    ) {
      out.transactionHash = receipt.transactionHash;
    }
    executions.push(out);
  }
  return executions;
}
