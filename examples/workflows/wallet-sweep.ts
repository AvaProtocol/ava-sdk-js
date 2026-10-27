/**
 * #1987: compose a sweep with existing nodes. These helpers only build, read
 * and simulate; wallet-sweep-execution.ts handles the explicit owner handoff.
 */
import { getAddress, MaxUint256 } from "ethers";
import {
  Chains,
  Nodes,
  Protocols,
  Tokens,
  Triggers,
  type Client,
  type v4,
} from "@avaprotocol/sdk-js";

export const SWEEP_CHAIN_ID = Chains.Sepolia;
export const SWEEP_TOKEN_SYMBOLS = ["USDC", "WETH"] as const;
export type SweepTokenSymbol = (typeof SWEEP_TOKEN_SYMBOLS)[number];

export interface WalletSweepOptions {
  source: string;
  destination: string;
  tokenSymbols?: readonly string[];
}

export interface SweepTransfer {
  symbol: SweepTokenSymbol;
  tokenAddress: string;
  decimals: number;
  amountWei: string;
}

export interface WalletSweepPlan {
  chainId: typeof SWEEP_CHAIN_ID;
  source: string;
  destination: string;
  transfers: SweepTransfer[];
  zeroBalanceTokens: SweepTokenSymbol[];
}

const STEP = {
  trigger: "start",
  transfer: "transfer",
} as const;
const WORKFLOW_NAME = "Sweep supported Sepolia balances";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
// The catalog supplies token addresses; its current ERC-20 ABI bundle does
// not export balanceOf. Use the standard read ABI without adding a package API.
const BALANCE_OF_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
];

function resolveOptions(input: WalletSweepOptions) {
  const source = getAddress(input.source);
  const destination = getAddress(input.destination);
  if (
    source === ZERO_ADDRESS ||
    destination === ZERO_ADDRESS ||
    source === destination
  ) {
    throw new Error(
      "Source and destination must be different, nonzero addresses.",
    );
  }
  const symbols = input.tokenSymbols ?? SWEEP_TOKEN_SYMBOLS;
  if (symbols.length === 0)
    throw new Error("Select at least one supported token.");
  const tokens = symbols.map((raw) => {
    const symbol = SWEEP_TOKEN_SYMBOLS.find(
      (candidate) => candidate.toLowerCase() === raw.toLowerCase(),
    );
    if (!symbol)
      throw new Error(
        `Unsupported demo token: ${raw}. Choose USDC or WETH on Sepolia.`,
      );
    const token = Tokens[symbol][SWEEP_CHAIN_ID];
    if (!token) throw new Error(`${symbol} is not in the Sepolia catalog.`);
    return {
      symbol,
      tokenAddress: getAddress(token.address),
      decimals: token.decimals,
    };
  });
  if (
    new Set(tokens.map((token) => token.tokenAddress)).size !== tokens.length
  ) {
    throw new Error("Each token may appear only once.");
  }
  return { source, destination, tokens };
}

function baseUnits(value: unknown): string {
  if (
    typeof value === "number" &&
    (!Number.isSafeInteger(value) || value < 0)
  ) {
    throw new Error("A balance cannot be an unsafe number.");
  }
  if (
    (typeof value !== "string" && typeof value !== "number") ||
    !/^\d+$/.test(String(value))
  ) {
    throw new Error("A balance must be an unsigned base-unit integer.");
  }
  const amount = BigInt(value);
  if (amount > MaxUint256) throw new Error("A balance exceeds uint256.");
  return amount.toString();
}

function readNodes(
  source: string,
  tokens: readonly { tokenAddress: string }[],
) {
  return tokens.map((token, index) =>
    Nodes.contractRead({
      id: `balance${index}`,
      name: `balance${index}`,
      chainId: SWEEP_CHAIN_ID,
      contractAddress: token.tokenAddress,
      contractAbi: BALANCE_OF_ABI,
      methodCalls: [{ methodName: "balanceOf", methodParams: [source] }],
    }),
  );
}

function envelope(
  source: string,
  nodes: v4.Node[],
  edges: v4.Edge[],
): v4.SimulateWorkflowRequest {
  return {
    chainId: SWEEP_CHAIN_ID,
    trigger: Triggers.manual({
      id: STEP.trigger,
      name: STEP.trigger,
      data: {},
    }),
    nodes,
    edges,
    inputVariables: {
      settings: {
        name: WORKFLOW_NAME,
        runner: source,
        chain: "sepolia",
        chain_id: SWEEP_CHAIN_ID,
      },
    },
    // Report the current session-grant verdict without requiring that authority
    // for this dry run. Report mode is not an owner execution capability.
    authorizationMode: "report",
  };
}

function sequentialEdges(nodes: readonly v4.Node[]): v4.Edge[] {
  return nodes.map((node, index) => ({
    id: `readEdge${index}`,
    source: index === 0 ? STEP.trigger : nodes[index - 1].id,
    target: node.id,
  }));
}

/** Read-only workflow: the same gateway ContractRead nodes used by the sweep. */
export function buildWalletSweepPreview(
  input: WalletSweepOptions,
): v4.SimulateWorkflowRequest {
  const { source, tokens } = resolveOptions(input);
  const nodes = readNodes(source, tokens);
  return envelope(source, nodes, sequentialEdges(nodes));
}

/** Failed/missing reads are errors, never zero balances. */
export function walletSweepPlanFromPreview(
  input: WalletSweepOptions,
  execution: v4.Execution,
): WalletSweepPlan {
  const { source, destination, tokens } = resolveOptions(input);
  if (execution.status !== "success")
    throw new Error("The balance preview failed; no sweep can be prepared.");
  const balances = tokens.map((token, index) => {
    const step = execution.steps?.find(
      (candidate) => candidate.id === `balance${index}`,
    );
    if (!step?.success)
      throw new Error(`The ${token.symbol} balance read is unavailable.`);
    const output = step.output as
      | { data?: { balanceOf?: unknown } }
      | undefined;
    return { ...token, amountWei: baseUnits(output?.data?.balanceOf) };
  });
  return {
    chainId: SWEEP_CHAIN_ID,
    source,
    destination,
    transfers: balances.filter((token) => token.amountWei !== "0"),
    zeroBalanceTokens: balances
      .filter((token) => token.amountWei === "0")
      .map((token) => token.symbol),
  };
}

/** Freeze captured nonzero amounts into one write node, without balance rereads. */
export function buildWalletSweepWorkflow(
  plan: WalletSweepPlan,
): v4.SimulateWorkflowRequest {
  if (plan.chainId !== SWEEP_CHAIN_ID)
    throw new Error("This example supports Sepolia only.");
  const { source, destination, tokens } = resolveOptions({
    ...plan,
    tokenSymbols: plan.transfers.map((row) => row.symbol),
  });
  const transfers = plan.transfers.map((row, index) => {
    const token = tokens[index];
    if (
      getAddress(row.tokenAddress) !== token.tokenAddress ||
      row.decimals !== token.decimals
    ) {
      throw new Error(
        `The ${token.symbol} transfer does not match its chain catalog entry.`,
      );
    }
    const amountWei = baseUnits(row.amountWei);
    if (amountWei === "0")
      throw new Error("Omit zero balances before compiling the sweep.");
    return { ...token, amountWei };
  });
  const transfer = Nodes.contractWrite({
    id: STEP.transfer,
    name: STEP.transfer,
    chainId: SWEEP_CHAIN_ID,
    contractAddress: transfers[0].tokenAddress,
    contractAbi: Protocols.erc20.transferAbi,
    methodCalls: transfers.map((row) => ({
      methodName: "transfer",
      contractAddress: row.tokenAddress,
      methodParams: [destination, row.amountWei],
    })),
  });
  return envelope(
    source,
    [transfer],
    [{ id: "transferEdge", source: STEP.trigger, target: STEP.transfer }],
  );
}

/** No create/trigger/sign/send calls: both stages use workflows.simulate only. */
export async function previewWalletSweep(
  client: Client,
  options: WalletSweepOptions,
) {
  const execution = await client.workflows.simulate(
    buildWalletSweepPreview(options),
  );
  const plan = walletSweepPlanFromPreview(options, execution);
  return {
    plan,
    workflow: plan.transfers.length ? buildWalletSweepWorkflow(plan) : null,
  };
}

export async function simulateWalletSweep(
  client: Client,
  options: WalletSweepOptions,
) {
  const prepared = await previewWalletSweep(client, options);
  if (!prepared.workflow)
    throw new Error("No supported nonzero token balances to simulate.");
  const execution = await client.workflows.simulate(prepared.workflow);
  const transfer = execution.steps?.find((step) => step.id === STEP.transfer);
  if (execution.status !== "success" || !transfer?.success) {
    throw new Error(
      `Sweep simulation failed: ${execution.error || transfer?.error || "inspect the execution steps"}`,
    );
  }
  const results = transfer.metadata?.results;
  if (
    !Array.isArray(results) ||
    results.length !== prepared.plan.transfers.length
  ) {
    throw new Error(
      "Sweep simulation did not report every token transfer result.",
    );
  }
  results.forEach(
    (
      result: {
        success?: unknown;
        value?: unknown;
        receipt?: { to?: unknown };
      },
      index,
    ) => {
      const token = prepared.plan.transfers[index];
      if (
        !result ||
        result.success !== true ||
        result.value !== true ||
        typeof result.receipt?.to !== "string" ||
        result.receipt.to.toLowerCase() !== token.tokenAddress.toLowerCase()
      ) {
        throw new Error(
          `Sweep simulation did not confirm a successful ${token.symbol} transfer.`,
        );
      }
    },
  );
  return { ...prepared, execution };
}
