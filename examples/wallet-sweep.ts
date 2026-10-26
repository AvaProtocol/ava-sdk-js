/** Run from examples: yarn sweep --source 0x… --to 0x… [--simulate]. */
import { parseArgs } from "node:util";
import { Client } from "@avaprotocol/sdk-js";
import {
  previewWalletSweep,
  simulateWalletSweep,
  SWEEP_CHAIN_ID,
  SWEEP_TOKEN_SYMBOLS,
} from "./workflows/wallet-sweep";

export async function main(argv = process.argv.slice(2)): Promise<void> {
  const { values } = parseArgs({
    args: argv,
    options: {
      source: { type: "string" },
      to: { type: "string" },
      tokens: { type: "string" },
      simulate: { type: "boolean", default: false },
      help: { type: "boolean", default: false },
    },
  });
  if (values.help) {
    process.stdout.write(
      "Usage: yarn sweep --source 0x… --to 0x… [--tokens USDC,WETH] [--simulate]\n" +
        "Sepolia only. Reads balances and prints the plan/workflow; --simulate also tests transfers.\n" +
        "Requires AVS_API_KEY or a development TEST_PRIVATE_KEY for login. Never deploys or sends.\n",
    );
    return;
  }
  if (!values.source || !values.to)
    throw new Error("Specify --source and --to. Use --help for usage.");
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
  const options = {
    source: values.source,
    destination: values.to,
    tokenSymbols:
      values.tokens?.split(",").map((symbol) => symbol.trim()) ??
      SWEEP_TOKEN_SYMBOLS,
  };
  const result = await (
    values.simulate ? simulateWalletSweep : previewWalletSweep
  )(client, options);
  process.stdout.write(
    JSON.stringify(
      {
        mode: values.simulate ? "simulation" : "preview",
        executionEnabled: false,
        limitation:
          "Owner-signed execution and atomic workflow batching are not implemented by this example.",
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
      }) + "\n",
    );
    process.exitCode = 1;
  });
}
