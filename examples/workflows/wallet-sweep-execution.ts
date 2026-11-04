import {
  AbiCoder,
  Interface,
  concat,
  getAddress,
  getBytes,
  keccak256,
  toBeHex,
  verifyMessage,
  zeroPadValue,
} from "ethers";
import {
  APIError,
  NetworkError,
  type Client,
  type v4,
} from "@avaprotocol/sdk-js";
import {
  SWEEP_CHAIN_ID,
  buildWalletSweepWorkflow,
  previewWalletSweep,
  type WalletSweepOptions,
  type WalletSweepPlan,
} from "./wallet-sweep";

const ENTRY_POINT = "0x0000000071727De22E5E9d8BAf0edAc6f37da032";
const FACTORY = "0x00000000000017c61b5bEe81050EC8eFc9c6fecd";
const transfer = new Interface([
  "function transfer(address to,uint256 amount) returns(bool)",
]);
const batch = new Interface([
  "function executeBatch((address target,uint256 value,bytes data)[] calls)",
]);

export interface PreparedWalletSweep {
  plan: WalletSweepPlan;
  prepared: v4.PrepareWorkflowResponse;
}

export interface SweepPollingOptions {
  /** Zero performs one lookup without waiting. Default: 180 seconds. */
  timeoutMs?: number;
  intervalMs?: number;
}

export interface SweepReceiptResult {
  outcome: "confirmed" | "failed" | "unresolved";
  userOpHash: string;
  chainId: typeof SWEEP_CHAIN_ID;
  status?: v4.UserOpStatusResponse;
}

export interface SweepExecutionOptions extends SweepPollingOptions {
  signer: {
    address: string;
    /** The wallet applies EIP-191 once to these 32 raw bytes. */
    signMessage(message: Uint8Array): Promise<string>;
  };
  /** Review the priced operation before the wallet signature is requested. */
  review(sweep: PreparedWalletSweep): Promise<boolean>;
}

export class WalletSweepExecutionError extends Error {
  readonly executionId: string;
  readonly userOpHash: string;
  readonly chainId = SWEEP_CHAIN_ID;

  constructor(message: string, prepared: v4.PrepareWorkflowResponse) {
    super(message);
    this.name = "WalletSweepExecutionError";
    this.executionId = prepared.execution.id;
    this.userOpHash = prepared.userOpHash;
  }
}

function quantity(value: string, bits = 256): bigint {
  if (!/^0x(?:0|[1-9a-fA-F][0-9a-fA-F]*)$/.test(value))
    throw new Error("Prepared operation has an invalid hex quantity.");
  const number = BigInt(value);
  if (number >= 1n << BigInt(bits))
    throw new Error("Prepared operation has an out-of-range quantity.");
  return number;
}

function pair(high: string, low: string): string {
  return concat([
    zeroPadValue(toBeHex(quantity(high, 128)), 16),
    zeroPadValue(toBeHex(quantity(low, 128)), 16),
  ]);
}

/** Independently bind every priced field to the EntryPoint v0.7 hash. */
export function ownerOperationHash(op: v4.OwnerUserOperationV07): string {
  const abi = AbiCoder.defaultAbiCoder();
  if (
    (!op.factory && op.factoryData) ||
    (!op.paymaster &&
      (op.paymasterData ||
        op.paymasterVerificationGasLimit ||
        op.paymasterPostOpGasLimit))
  )
    throw new Error(
      "Prepared deployment or sponsorship fields are inconsistent.",
    );
  const init = op.factory
    ? concat([getAddress(op.factory), op.factoryData ?? "0x"])
    : "0x";
  let paymaster = "0x";
  if (op.paymaster) {
    if (!op.paymasterVerificationGasLimit || !op.paymasterPostOpGasLimit)
      throw new Error("Prepared sponsorship is missing gas limits.");
    paymaster = concat([
      getAddress(op.paymaster),
      pair(op.paymasterVerificationGasLimit, op.paymasterPostOpGasLimit),
      op.paymasterData ?? "0x",
    ]);
  }
  const packed = abi.encode(
    [
      "address",
      "uint256",
      "bytes32",
      "bytes32",
      "bytes32",
      "uint256",
      "bytes32",
      "bytes32",
    ],
    [
      getAddress(op.sender),
      quantity(op.nonce),
      keccak256(init),
      keccak256(op.callData),
      pair(op.verificationGasLimit, op.callGasLimit),
      quantity(op.preVerificationGas),
      pair(op.maxPriorityFeePerGas, op.maxFeePerGas),
      keccak256(paymaster),
    ],
  );
  return keccak256(
    abi.encode(
      ["bytes32", "address", "uint256"],
      [keccak256(packed), ENTRY_POINT, SWEEP_CHAIN_ID],
    ),
  );
}

/** Refuse a changed source, destination, amount, call, chain or signing recipe. */
export function validateWalletSweepPreparation(
  sweep: PreparedWalletSweep,
  owner?: string,
): void {
  const { plan, prepared: p } = sweep;
  buildWalletSweepWorkflow(plan); // Revalidate the catalog and exact positive amounts.
  const op = p.userOperation;
  if (op.factory && getAddress(op.factory) !== getAddress(FACTORY))
    throw new Error("Prepared operation uses an unsupported account factory.");
  if (
    p.chainId !== SWEEP_CHAIN_ID ||
    getAddress(p.entryPoint) !== getAddress(ENTRY_POINT) ||
    getAddress(op.sender) !== getAddress(plan.source) ||
    p.signingMethod !== "personal_sign" ||
    op.signature !== "0x" ||
    quantity(op.nonce) >> 64n !== 1n ||
    p.execution.status !== "waiting" ||
    p.writeNodeId !== "transfer" ||
    p.execution.steps?.some((step) => step.id === p.writeNodeId)
  )
    throw new Error(
      "Preparation does not match the supported owner-signed sweep.",
    );
  if (
    getAddress(p.owner) === "0x0000000000000000000000000000000000000000" ||
    (owner && getAddress(p.owner) !== getAddress(owner))
  )
    throw new Error("The wallet signer is not the prepared account owner.");
  if (p.calls.length !== plan.transfers.length)
    throw new Error("Prepared calls do not match the selected tokens.");
  const calls = plan.transfers.map((token, i) => {
    const data = transfer.encodeFunctionData("transfer", [
      plan.destination,
      token.amountWei,
    ]);
    const actual = p.calls[i];
    if (
      getAddress(actual.to) !== getAddress(token.tokenAddress) ||
      actual.value !== "0" ||
      actual.data.toLowerCase() !== data.toLowerCase()
    )
      throw new Error(
        "Prepared transfer differs from the reviewed sweep plan.",
      );
    return [token.tokenAddress, 0n, data];
  });
  if (
    op.callData.toLowerCase() !==
      batch.encodeFunctionData("executeBatch", [calls]).toLowerCase() ||
    ownerOperationHash(op).toLowerCase() !== p.userOpHash.toLowerCase()
  )
    throw new Error("Prepared operation does not match the batch or its hash.");
  if (
    (p.gasFunding === "sponsored") !== Boolean(op.paymaster) ||
    !["source", "sponsored"].includes(p.gasFunding)
  )
    throw new Error("Prepared gas funding is inconsistent.");
  const gas =
    quantity(op.callGasLimit, 128) +
    quantity(op.verificationGasLimit, 128) +
    quantity(op.preVerificationGas) +
    (op.paymaster
      ? quantity(op.paymasterVerificationGasLimit!, 128) +
        quantity(op.paymasterPostOpGasLimit!, 128)
      : 0n);
  if (
    !/^\d+$/.test(p.maxGasCostWei) ||
    gas * quantity(op.maxFeePerGas, 128) !== BigInt(p.maxGasCostWei)
  )
    throw new Error("Prepared maximum gas cost is inconsistent.");
  if (quantity(op.maxPriorityFeePerGas, 128) > quantity(op.maxFeePerGas, 128))
    throw new Error("Prepared priority fee exceeds the maximum fee.");
  if (!Number.isSafeInteger(p.expiresAt))
    throw new Error("Invalid preparation deadline.");
}

/** Capture balances once, then price a static transfer batch from that snapshot. */
export async function prepareWalletSweep(
  client: Client,
  options: WalletSweepOptions,
): Promise<PreparedWalletSweep> {
  const { plan, workflow } = await previewWalletSweep(client, options);
  if (!workflow) throw new Error("No supported token balances to sweep.");
  // Scheduling and simulation authorizationMode are not prepare inputs.
  const { chainId, trigger, nodes, edges, inputVariables } = workflow;
  if (chainId !== SWEEP_CHAIN_ID)
    throw new Error("This example supports Sepolia only.");
  const prepared = await client.workflows.prepare({
    chainId,
    trigger,
    nodes,
    edges,
    inputVariables,
  });
  const sweep = { plan, prepared };
  validateWalletSweepPreparation(sweep);
  return sweep;
}

function pollingOptions(options: SweepPollingOptions) {
  const timeout = options.timeoutMs ?? 180_000;
  const interval = options.intervalMs ?? 3_000;
  if (
    !Number.isFinite(timeout) ||
    timeout < 0 ||
    !Number.isFinite(interval) ||
    interval <= 0
  )
    throw new Error("Invalid receipt polling interval or timeout.");
  return { timeout, interval };
}

/** A missing receipt, including HTTP 404, never causes a new prepare or send. */
export async function waitForWalletSweep(
  client: Client,
  userOpHash: string,
  options: SweepPollingOptions = {},
): Promise<SweepReceiptResult> {
  if (!/^0x[0-9a-fA-F]{64}$/.test(userOpHash))
    throw new Error("Invalid UserOperation hash.");
  const { timeout, interval } = pollingOptions(options);
  const deadline = Date.now() + timeout;
  let status: v4.UserOpStatusResponse | undefined;
  do {
    try {
      status = await client.userops.retrieve(userOpHash, {
        chainId: SWEEP_CHAIN_ID,
      });
      if (status.userOpHash.toLowerCase() !== userOpHash.toLowerCase())
        throw new Error(
          "Status response belongs to a different UserOperation.",
        );
      if (status.executionStatus === "failed" || status.success === false)
        return {
          outcome: "failed",
          userOpHash,
          chainId: SWEEP_CHAIN_ID,
          status,
        };
      if (
        status.executionStatus === "confirmed" &&
        status.success === true &&
        status.transactionHash
      )
        return {
          outcome: "confirmed",
          userOpHash,
          chainId: SWEEP_CHAIN_ID,
          status,
        };
    } catch (error) {
      if (
        !(error instanceof NetworkError) &&
        !(
          error instanceof APIError &&
          (error.status === 404 || error.status >= 500)
        )
      )
        throw error;
    }
    const remaining = deadline - Date.now();
    if (remaining <= 0) break;
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(interval, remaining)),
    );
  } while (Date.now() <= deadline);
  return { outcome: "unresolved", userOpHash, chainId: SWEEP_CHAIN_ID, status };
}

export async function executePreparedWalletSweep(
  client: Client,
  input: PreparedWalletSweep,
  options: SweepExecutionOptions,
) {
  pollingOptions(options); // Refuse invalid waiting options before any signature/send.
  // A review callback gets its own copy: editing it cannot change what is signed.
  const sweep = JSON.parse(JSON.stringify(input)) as PreparedWalletSweep;
  validateWalletSweepPreparation(sweep, options.signer.address);
  const p = sweep.prepared;
  const checkDeadline = () => {
    if (Date.now() >= p.expiresAt)
      throw new WalletSweepExecutionError(
        "Preparation expired; prepare and review again.",
        p,
      );
  };
  checkDeadline();
  if (
    (await options.review(
      JSON.parse(JSON.stringify(sweep)) as PreparedWalletSweep,
    )) !== true
  )
    return { ...sweep, outcome: "cancelled" as const };
  checkDeadline();
  const signature = await options.signer.signMessage(getBytes(p.userOpHash));
  if (
    !/^0x[0-9a-fA-F]{130}$/.test(signature) ||
    getAddress(verifyMessage(getBytes(p.userOpHash), signature)) !==
      getAddress(p.owner)
  )
    throw new WalletSweepExecutionError(
      "Signature does not match the prepared owner and raw hash.",
      p,
    );
  checkDeadline();
  let submission: v4.SubmitExecutionResponse | undefined;
  let submissionError: string | undefined;
  try {
    submission = await client.executions.submit(p.execution.id, { signature });
    if (
      submission.userOpHash.toLowerCase() !== p.userOpHash.toLowerCase() ||
      submission.executionId !== p.execution.id ||
      submission.chainId !== SWEEP_CHAIN_ID
    )
      throw new Error(
        "Submission response does not match the prepared operation.",
      );
  } catch (error) {
    if (
      error instanceof APIError &&
      [400, 401, 403, 404, 412, 429].includes(error.status)
    )
      throw new WalletSweepExecutionError(
        `Gateway refused submit (HTTP ${error.status}${error.code ? ` ${error.code}` : ""}); no automatic retry.`,
        p,
      );
    submission = undefined;
    submissionError =
      "Submit response uncertain; reconcile the prepared hash without another send.";
  }
  let receipt: SweepReceiptResult;
  try {
    receipt = await waitForWalletSweep(client, p.userOpHash, options);
  } catch {
    throw new WalletSweepExecutionError(
      "Status lookup stopped; reconcile the prepared hash without another send.",
      p,
    );
  }
  if (receipt.outcome === "confirmed") {
    const actual = receipt.status!.calls;
    if (
      !receipt.status!.sender ||
      getAddress(receipt.status!.sender) !== getAddress(sweep.plan.source) ||
      actual?.length !== p.calls.length ||
      !actual.every(
        (call, i) =>
          getAddress(call.to) === getAddress(p.calls[i].to) &&
          call.value === p.calls[i].value &&
          call.data.toLowerCase() === p.calls[i].data.toLowerCase() &&
          call.selector === p.calls[i].selector,
      )
    )
      throw new WalletSweepExecutionError(
        "Receipt calls or sender differ from the prepared operation.",
        p,
      );
  }
  // Keep the operation unsigned in returned data. Never retain the signature.
  return { ...sweep, ...receipt, submission, submissionError };
}
