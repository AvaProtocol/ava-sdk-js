#!/usr/bin/env -S npx ts-node --transpile-only
/**
 * examples/example.ts — agent-friendly verification CLI for
 * @avaprotocol/sdk-js v4.
 *
 * Designed for Claude Code (and any other automation) to smoke-test
 * the SDK and the REST surface end-to-end. Every command emits one
 * valid JSON document to stdout; errors land on stderr as
 * `{"error":{"code","message","details"}}` plus a non-zero exit.
 *
 * Run with:
 *   yarn --cwd examples start <command> [args...]      # from repo root
 *   npx ts-node examples/example.ts <command> [args...]
 *
 * Env vars:
 *   AVS_REST_URL        Base URL incl. /api/v1 prefix (default:
 *                       http://localhost:8080/api/v1)
 *   TEST_PRIVATE_KEY    EOA private key for the auth flow.
 *                       Required by `auth` and `verify`; optional for
 *                       other commands when AVS_API_KEY is set.
 *   AVS_API_KEY         Pre-minted JWT. Skips the EIP-191 exchange.
 *   AVS_TIMEOUT_MS      Per-request timeout (default 30000).
 *   AVS_SMART_WALLET    Smart wallet address used by `verify` /
 *                       `workflows:create` when the input file
 *                       doesn't supply one.
 *
 * Exit codes: 0 success, 1 user error (bad args / validation),
 * 2 SDK/server error, 3 timeout.
 */

import { readFileSync } from "node:fs";
import { inspect } from "node:util";
import { Wallet } from "ethers";
import {
  Client,
  Triggers,
  Nodes,
  APIError,
  NetworkError,
  type v4,
} from "@avaprotocol/sdk-js";

// ---------------------------------------------------------------------
// Output + exit helpers
// ---------------------------------------------------------------------

const EXIT_USER_ERROR = 1;
const EXIT_SDK_ERROR = 2;
const EXIT_TIMEOUT = 3;

interface CliFlags {
  pretty: boolean;
  blocking: boolean;
  limit?: number;
  chainId?: number;
  workflowId?: string;
  owner?: string;
  factory?: string;
  timeout?: string;
}

interface ParsedArgs {
  command: string;
  positional: string[];
  flags: CliFlags;
}

function parseArgs(argv: readonly string[]): ParsedArgs {
  const flags: CliFlags = { pretty: false, blocking: false };
  const positional: string[] = [];
  let command = "";
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!command) {
      command = token;
      continue;
    }
    if (!token.startsWith("--")) {
      positional.push(token);
      continue;
    }
    const name = token.slice(2);
    switch (name) {
      case "pretty":
        flags.pretty = true;
        break;
      case "blocking":
        flags.blocking = true;
        break;
      case "limit":
        flags.limit = Number(argv[++i]);
        break;
      case "chain-id":
        flags.chainId = Number(argv[++i]);
        break;
      case "workflow-id":
        flags.workflowId = argv[++i];
        break;
      case "owner":
        flags.owner = argv[++i];
        break;
      case "factory":
        flags.factory = argv[++i];
        break;
      case "timeout":
        flags.timeout = argv[++i];
        break;
      default:
        // Unknown flag — fold into positional so command-specific
        // handlers can error with a helpful message.
        positional.push(token);
    }
  }
  return { command: command || "help", positional, flags };
}

function emit(value: unknown, pretty = false): void {
  if (pretty) {
    process.stdout.write(inspect(value, { depth: null, colors: true }) + "\n");
  } else {
    process.stdout.write(JSON.stringify(value) + "\n");
  }
}

function fail(
  exitCode: number,
  code: string,
  message: string,
  details?: unknown,
): never {
  process.stderr.write(
    JSON.stringify({ error: { code, message, details } }) + "\n",
  );
  process.exit(exitCode);
}

// ---------------------------------------------------------------------
// Client construction + auth
// ---------------------------------------------------------------------

function buildClient(): Client {
  const baseUrl = process.env.AVS_REST_URL ?? "http://localhost:8080/api/v1";
  const timeoutMs = process.env.AVS_TIMEOUT_MS
    ? Number(process.env.AVS_TIMEOUT_MS)
    : 30_000;
  const token = process.env.AVS_API_KEY || undefined;
  return new Client({ baseUrl, defaultTimeoutMs: timeoutMs, token });
}

/**
 * Make sure the supplied client carries a JWT — either pre-set from
 * AVS_API_KEY (in which case we noop) or freshly minted from
 * TEST_PRIVATE_KEY via the EIP-191 exchange flow.
 */
async function ensureAuth(client: Client): Promise<string> {
  if (client.token) {
    return client.token;
  }
  const pk = process.env.TEST_PRIVATE_KEY;
  if (!pk) {
    fail(
      EXIT_USER_ERROR,
      "AUTH_MISSING_CREDENTIAL",
      "Set TEST_PRIVATE_KEY (EOA private key) or AVS_API_KEY (pre-minted JWT) before running this command.",
    );
  }
  const resp = await client.auth.exchangeWithKey(pk);
  if (!client.token) {
    // Shouldn't happen — auth.exchangeWithKey sets the token — but
    // surface the wire response if it ever does.
    fail(EXIT_SDK_ERROR, "AUTH_NO_TOKEN", "auth:exchange returned no token", resp);
  }
  return client.token;
}

// ---------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------

type CommandFn = (
  client: Client,
  args: string[],
  flags: CliFlags,
) => Promise<unknown>;

const commands: Record<string, { description: string; usage: string; run: CommandFn }> = {
  help: {
    description: "List every command with its argument shape",
    usage: "help",
    run: async () => listCommands(),
  },

  health: {
    description: "Hit GET /health — aggregator liveness probe (no auth)",
    usage: "health",
    run: async (client) => client.health.check(),
  },

  auth: {
    description: "Mint a JWT via EIP-191 signature (requires TEST_PRIVATE_KEY)",
    usage: "auth",
    run: async (client) => {
      const token = await ensureAuth(client);
      const wallet = new Wallet(process.env.TEST_PRIVATE_KEY ?? "");
      return { token, ownerAddress: wallet.address };
    },
  },

  "workflows:create": {
    description: "Create a workflow from a JSON definition file",
    usage: "workflows:create <file.json> [--chain-id N]",
    run: async (client, [file], flags) => {
      if (!file) fail(EXIT_USER_ERROR, "WORKFLOWS_BAD_ARGS", "Usage: workflows:create <file.json>");
      await ensureAuth(client);
      // openapi-typescript marks generated schema fields readonly, so
      // we build a fresh request that merges the file payload with
      // the optional --chain-id flag rather than mutating in place.
      const file_body = readJsonFile<v4.CreateWorkflowRequest>(file);
      const body: v4.CreateWorkflowRequest =
        flags.chainId !== undefined ? { ...file_body, chainId: flags.chainId } : file_body;
      return client.workflows.create(body);
    },
  },

  "workflows:list": {
    description: "List workflows owned by the smart wallet (--owner ADDR)",
    usage: "workflows:list [--owner ADDR] [--limit N]",
    run: async (client, _args, flags) => {
      await ensureAuth(client);
      const owner = flags.owner ?? process.env.AVS_SMART_WALLET;
      if (!owner) {
        fail(
          EXIT_USER_ERROR,
          "WORKFLOWS_OWNER_REQUIRED",
          "Pass --owner ADDR or set AVS_SMART_WALLET. The engine scopes list responses to a smart wallet.",
        );
      }
      return client.workflows.list({
        smartWalletAddress: [owner],
        limit: flags.limit,
      });
    },
  },

  "workflows:get": {
    description: "Retrieve one workflow by id",
    usage: "workflows:get <id>",
    run: async (client, [id]) => {
      if (!id) fail(EXIT_USER_ERROR, "WORKFLOWS_BAD_ARGS", "Usage: workflows:get <id>");
      await ensureAuth(client);
      return client.workflows.retrieve(id);
    },
  },

  "workflows:cancel": {
    description: "Cancel (delete) a workflow",
    usage: "workflows:cancel <id>",
    run: async (client, [id]) => {
      if (!id) fail(EXIT_USER_ERROR, "WORKFLOWS_BAD_ARGS", "Usage: workflows:cancel <id>");
      await ensureAuth(client);
      await client.workflows.cancel(id);
      return { status: "cancelled", id };
    },
  },

  "workflows:pause": {
    description: "Pause a workflow (disable)",
    usage: "workflows:pause <id>",
    run: async (client, [id]) => {
      if (!id) fail(EXIT_USER_ERROR, "WORKFLOWS_BAD_ARGS", "Usage: workflows:pause <id>");
      await ensureAuth(client);
      return client.workflows.pause(id);
    },
  },

  "workflows:resume": {
    description: "Resume a paused workflow",
    usage: "workflows:resume <id>",
    run: async (client, [id]) => {
      if (!id) fail(EXIT_USER_ERROR, "WORKFLOWS_BAD_ARGS", "Usage: workflows:resume <id>");
      await ensureAuth(client);
      return client.workflows.resume(id);
    },
  },

  "workflows:trigger": {
    description: "Manually fire a workflow's trigger",
    usage: "workflows:trigger <id> [--blocking]",
    run: async (client, [id], flags) => {
      if (!id) fail(EXIT_USER_ERROR, "WORKFLOWS_BAD_ARGS", "Usage: workflows:trigger <id>");
      await ensureAuth(client);
      const wf = await client.workflows.retrieve(id);
      const triggerType = (wf.trigger as { type: v4.TriggerType }).type;
      return client.workflows.trigger(id, {
        triggerType,
        isBlocking: flags.blocking,
      });
    },
  },

  "workflows:simulate": {
    description: "Simulate a workflow without persisting it",
    usage: "workflows:simulate <file.json>",
    run: async (client, [file]) => {
      if (!file) fail(EXIT_USER_ERROR, "WORKFLOWS_BAD_ARGS", "Usage: workflows:simulate <file.json>");
      await ensureAuth(client);
      const body = readJsonFile<v4.SimulateWorkflowRequest>(file);
      return client.workflows.simulate(body);
    },
  },

  "workflows:count": {
    description: "Count workflows owned by --owner ADDR",
    usage: "workflows:count [--owner ADDR]",
    run: async (client, _args, flags) => {
      await ensureAuth(client);
      const owner = flags.owner ?? process.env.AVS_SMART_WALLET;
      return client.workflows.count(owner ? { smartWalletAddress: [owner] } : undefined);
    },
  },

  "executions:list": {
    description: "List executions for a workflow",
    usage: "executions:list <workflow-id> [--limit N]",
    run: async (client, [workflowId], flags) => {
      if (!workflowId) fail(EXIT_USER_ERROR, "EXECUTIONS_BAD_ARGS", "Usage: executions:list <workflow-id>");
      await ensureAuth(client);
      return client.executions.listForWorkflow(workflowId, { limit: flags.limit });
    },
  },

  "executions:get": {
    description: "Retrieve one execution (requires --workflow-id)",
    usage: "executions:get <execution-id> --workflow-id <wid>",
    run: async (client, [id], flags) => {
      if (!id || !flags.workflowId) {
        fail(
          EXIT_USER_ERROR,
          "EXECUTIONS_BAD_ARGS",
          "Usage: executions:get <execution-id> --workflow-id <wid>",
        );
      }
      await ensureAuth(client);
      return client.executions.retrieve(id, { workflowId: flags.workflowId });
    },
  },

  "executions:watch": {
    description: "SSE-stream status changes; exits on terminal status or --timeout",
    usage: "executions:watch <execution-id> --workflow-id <wid> [--timeout 60s]",
    run: async (client, [id], flags) => {
      if (!id || !flags.workflowId) {
        fail(
          EXIT_USER_ERROR,
          "EXECUTIONS_BAD_ARGS",
          "Usage: executions:watch <execution-id> --workflow-id <wid>",
        );
      }
      await ensureAuth(client);
      const timeoutMs = parseDuration(flags.timeout ?? "60s");
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), timeoutMs);
      const events: v4.ExecutionStatusSummary[] = [];
      try {
        for await (const event of client.executions.stream(id, {
          workflowId: flags.workflowId,
          signal: controller.signal,
        })) {
          events.push(event);
          // Emit each frame as its own JSON line so agents can tail
          // the stream incrementally.
          process.stdout.write(JSON.stringify(event) + "\n");
          if (
            event.status === "success" ||
            event.status === "failed" ||
            event.status === "error"
          ) {
            return { terminal: event, frames: events.length };
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          fail(EXIT_TIMEOUT, "EXECUTIONS_WATCH_TIMEOUT", `Stream did not reach terminal status within ${flags.timeout ?? "60s"}`);
        }
        throw err;
      } finally {
        clearTimeout(t);
      }
      return { terminal: events[events.length - 1], frames: events.length };
    },
  },

  "wallets:list": {
    description: "List the authenticated user's smart wallets",
    usage: "wallets:list",
    run: async (client) => {
      await ensureAuth(client);
      return client.wallets.list();
    },
  },

  "wallets:create": {
    description: "Ensure a wallet exists for (salt, factory)",
    usage: "wallets:create <salt> [--factory ADDR]",
    run: async (client, [salt], flags) => {
      if (!salt) fail(EXIT_USER_ERROR, "WALLETS_BAD_ARGS", "Usage: wallets:create <salt>");
      await ensureAuth(client);
      return client.wallets.create({
        salt,
        ...(flags.factory ? { factoryAddress: flags.factory } : {}),
      });
    },
  },

  "operators:list": {
    description: "List connected operators + their supportedChainIds",
    usage: "operators:list",
    run: async (client) => client.operators.list(),
  },

  verify: {
    description:
      "End-to-end smoke test: auth → create cron workflow → pause → resume → cancel. Prints a JSON summary per step.",
    usage: "verify [--chain-id N]",
    run: async (client, _args, flags) => {
      const steps: Array<{ step: string; status: string; details?: unknown }> = [];
      const t0 = Date.now();

      try {
        // --- 1. auth -------------------------------------------------
        const tAuth0 = Date.now();
        await ensureAuth(client);
        const wallet = new Wallet(process.env.TEST_PRIVATE_KEY ?? "");
        steps.push({
          step: "auth",
          status: "success",
          details: { ownerAddress: wallet.address, duration_ms: Date.now() - tAuth0 },
        });

        // --- 2. health ----------------------------------------------
        const health = await client.health.check();
        steps.push({ step: "health", status: "success", details: health });

        // --- 3. create wallet (or pick AVS_SMART_WALLET) -----------
        const smartWalletAddress = process.env.AVS_SMART_WALLET;
        if (!smartWalletAddress) {
          fail(
            EXIT_USER_ERROR,
            "VERIFY_SMART_WALLET_REQUIRED",
            "Set AVS_SMART_WALLET so verify knows which wallet to target. Create one via `wallets:create <salt>` first.",
          );
        }

        // --- 4. create workflow -------------------------------------
        const create = {
          smartWalletAddress,
          chainId: flags.chainId,
          trigger: Triggers.cron({
            name: "verify-cron",
            schedule: ["*/10 * * * *"],
          }),
          nodes: [
            Nodes.customCode({
              id: "step1",
              name: "step1",
              source: "return {ok: true};",
            }),
          ],
          edges: [{ id: "e1", source: "trigger", target: "step1" }],
          inputVariables: {
            settings: { name: "verify", runner: smartWalletAddress },
          },
          maxExecution: 1,
          name: "sdk-verify",
        } as v4.CreateWorkflowRequest;
        const wf = await client.workflows.create(create);
        steps.push({
          step: "create",
          status: "success",
          details: { workflowId: wf.id, status: wf.status },
        });

        // --- 5. pause / resume --------------------------------------
        const paused = await client.workflows.pause(wf.id as string);
        steps.push({ step: "pause", status: "success", details: { status: paused.status } });

        const resumed = await client.workflows.resume(wf.id as string);
        steps.push({ step: "resume", status: "success", details: { status: resumed.status } });

        // --- 6. cancel ----------------------------------------------
        await client.workflows.cancel(wf.id as string);
        steps.push({ step: "cancel", status: "success" });

        return {
          status: "success",
          duration_ms: Date.now() - t0,
          steps,
        };
      } catch (err) {
        steps.push({
          step: "(in-flight)",
          status: "error",
          details: serializeError(err),
        });
        return {
          status: "failed",
          duration_ms: Date.now() - t0,
          steps,
        };
      }
    },
  },
};

function listCommands(): unknown {
  return Object.entries(commands).map(([name, c]) => ({
    name,
    usage: c.usage,
    description: c.description,
  }));
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

function readJsonFile<T>(path: string): T {
  try {
    return JSON.parse(readFileSync(path, "utf8")) as T;
  } catch (err) {
    fail(EXIT_USER_ERROR, "FILE_READ_ERROR", `Could not parse ${path}`, (err as Error).message);
  }
}

/** Parse `60s`, `2m`, `500ms`, plain integer (milliseconds). */
function parseDuration(input: string): number {
  const match = /^(\d+)(ms|s|m)?$/.exec(input.trim());
  if (!match) {
    fail(EXIT_USER_ERROR, "BAD_DURATION", `Invalid duration: ${input}. Use formats like 500ms, 30s, 2m.`);
  }
  const value = Number(match[1]);
  switch (match[2]) {
    case "ms":
      return value;
    case "m":
      return value * 60_000;
    case "s":
    default:
      return value * 1000;
  }
}

function serializeError(err: unknown): unknown {
  if (err instanceof APIError) {
    return {
      type: "APIError",
      status: err.status,
      code: err.code,
      title: err.title,
      requestId: err.requestId,
      message: err.message,
      problem: err.problem,
    };
  }
  if (err instanceof NetworkError) {
    return { type: "NetworkError", message: err.message };
  }
  if (err instanceof Error) {
    return { type: err.name, message: err.message, stack: err.stack };
  }
  return { type: "unknown", value: err };
}

// ---------------------------------------------------------------------
// Entrypoint
// ---------------------------------------------------------------------

async function main(): Promise<void> {
  const parsed = parseArgs(process.argv.slice(2));
  const cmd = commands[parsed.command];
  if (!cmd) {
    fail(
      EXIT_USER_ERROR,
      "UNKNOWN_COMMAND",
      `Unknown command: ${parsed.command}. Run \`help\` to list available commands.`,
    );
  }

  const client = buildClient();
  try {
    const result = await cmd.run(client, parsed.positional, parsed.flags);
    emit(result, parsed.flags.pretty);
  } catch (err) {
    const serialized = serializeError(err);
    process.stderr.write(JSON.stringify({ error: serialized }) + "\n");
    const exitCode = err instanceof APIError ? EXIT_SDK_ERROR : EXIT_SDK_ERROR;
    process.exit(exitCode);
  }
}

main().catch((err) => {
  process.stderr.write(JSON.stringify({ error: serializeError(err) }) + "\n");
  process.exit(EXIT_SDK_ERROR);
});
