/** Run from examples: yarn sweep --source 0x… --to 0x… [--simulate | --execute]. */
import { parseArgs } from "node:util";
import { createInterface } from "node:readline/promises";
import { Wallet, formatUnits } from "ethers";
import { Client } from "@avaprotocol/sdk-js";
import {
  previewWalletSweep,
  simulateWalletSweep,
  SWEEP_CHAIN_ID,
  SWEEP_TOKEN_SYMBOLS,
} from "./workflows/wallet-sweep";
import {
  WalletSweepExecutionError,
  executePreparedWalletSweep,
  prepareWalletSweep,
  waitForWalletSweep,
} from "./workflows/wallet-sweep-execution";

export async function main(argv = process.argv.slice(2)): Promise<void> {
  const { values } = parseArgs({
    args: argv,
    options: {
      source: { type: "string" },
      to: { type: "string" },
      tokens: { type: "string" },
      simulate: { type: "boolean", default: false },
      execute: { type: "boolean", default: false },
      status: { type: "string" },
      "wait-seconds": { type: "string" },
      help: { type: "boolean", default: false },
    },
  });
  if (values.help) {
    process.stdout.write(
      "Usage: yarn sweep --source 0x… --to 0x… [--tokens USDC,WETH] [--simulate | --execute]\n" +
        "       yarn sweep --status 0xUSER_OP_HASH [--wait-seconds 180]\n" +
        "Sepolia only. Defaults to preview; --simulate moves no funds.\n" +
        "--execute reviews one priced batch, asks for confirmation and signs with TEST_PRIVATE_KEY.\n" +
        "Requires AVS_API_KEY or TEST_PRIVATE_KEY for login, and an owner-enabled gateway for execution.\n",
    );
    return;
  }
  if (
    [values.simulate, values.execute, Boolean(values.status)].filter(Boolean)
      .length > 1
  )
    throw new Error("Choose only one of --simulate, --execute or --status.");
  const waitSeconds = Number(values["wait-seconds"] ?? "180");
  if (!Number.isInteger(waitSeconds) || waitSeconds < 0 || waitSeconds > 3600)
    throw new Error("--wait-seconds must be an integer from 0 to 3600.");
  if (!values.status && (!values.source || !values.to))
    throw new Error("Specify --source and --to. Use --help for usage.");
  if (values.status && (values.source || values.to || values.tokens))
    throw new Error(
      "--status polls an existing hash; omit --source, --to and --tokens.",
    );
  if (values.execute && !process.env.TEST_PRIVATE_KEY)
    throw new Error(
      "--execute requires the development owner's TEST_PRIVATE_KEY.",
    );
  const baseUrl = process.env.AVS_REST_URL ?? "http://localhost:8080/api/v1";
  const client = new Client({
    baseUrl,
    token: process.env.AVS_API_KEY,
    defaultTimeoutMs: 120_000,
  });
  if (!client.token) {
    const key = process.env.TEST_PRIVATE_KEY;
    if (!key)
      throw new Error(
        "Set AVS_API_KEY or a development TEST_PRIVATE_KEY for gateway login.",
      );
    const { version } = await client.health.check();
    await client.auth.exchangeWithKey(key, {
      chainId: SWEEP_CHAIN_ID,
      uri: "https://example-cli.avaprotocol.org",
      version,
    });
  }
  if (values.status) {
    const result = await waitForWalletSweep(client, values.status, {
      timeoutMs: waitSeconds * 1000,
    });
    process.stdout.write(
      JSON.stringify({ mode: "status", ...result }, null, 2) + "\n",
    );
    if (result.outcome !== "confirmed")
      process.exitCode = result.outcome === "failed" ? 1 : 2;
    return;
  }
  const options = {
    source: values.source!,
    destination: values.to!,
    tokenSymbols:
      values.tokens?.split(",").map((symbol) => symbol.trim()) ??
      SWEEP_TOKEN_SYMBOLS,
  };
  if (values.execute) {
    const signer = new Wallet(process.env.TEST_PRIVATE_KEY!);
    const sweep = await prepareWalletSweep(client, options);
    const result = await executePreparedWalletSweep(client, sweep, {
      signer,
      timeoutMs: waitSeconds * 1000,
      review: async ({ plan, prepared }) => {
        process.stderr.write(
          JSON.stringify(
            {
              mode: "review",
              source: plan.source,
              destination: plan.destination,
              owner: prepared.owner,
              chainId: prepared.chainId,
              transfers: plan.transfers.map((token) => ({
                token: token.symbol,
                amount: formatUnits(token.amountWei, token.decimals),
                amountWei: token.amountWei,
              })),
              gasFunding: prepared.gasFunding,
              maxGasCostEth: formatUnits(prepared.maxGasCostWei, 18),
              userOpHash: prepared.userOpHash,
              executionId: prepared.execution.id,
              expiresAt: new Date(prepared.expiresAt).toISOString(),
            },
            null,
            2,
          ) + "\n",
        );
        const prompt = createInterface({
          input: process.stdin,
          output: process.stderr,
        });
        try {
          return (
            (
              await prompt.question(
                "Sign and submit this sweep? Type yes to continue: ",
              )
            )
              .trim()
              .toLowerCase() === "yes"
          );
        } finally {
          prompt.close();
        }
      },
    });
    process.stdout.write(
      JSON.stringify({ mode: "execution", ...result }, null, 2) + "\n",
    );
    if (result.outcome === "unresolved") process.exitCode = 2;
    if (result.outcome === "failed") process.exitCode = 1;
    return;
  }
  const result = await (
    values.simulate ? simulateWalletSweep : previewWalletSweep
  )(client, options);
  process.stdout.write(
    JSON.stringify(
      {
        mode: values.simulate ? "simulation" : "preview",
        executionEnabled: false,
        limitation:
          "Preview/simulation only. Use --execute for the owner-signed gateway handoff.",
        ...result,
      },
      null,
      2,
    ) + "\n",
  );
}

if (require.main === module) {
  main().catch((error: unknown) => {
    // SDK errors may carry request bodies/auth metadata. Emit only their message.
    process.stderr.write(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Sweep example failed",
        ...(error instanceof WalletSweepExecutionError
          ? {
              executionId: error.executionId,
              userOpHash: error.userOpHash,
              chainId: error.chainId,
            }
          : {}),
      }) + "\n",
    );
    process.exitCode = 1;
  });
}
