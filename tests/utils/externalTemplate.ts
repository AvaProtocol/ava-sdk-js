import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { createHash, randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import type { Client, v4 } from "@avaprotocol/sdk-js";
import { removeCreatedWorkflows } from "./client";

export const TEMPLATE_TEST = {
  chainId: 11_155_111,
  amount: "0.000001",
  amountWei: "1000000000000",
  maxReportBytes: 1024 * 1024,
} as const;
export const TEMPLATE_ACTION = {
  compile: "compile",
  summarize: "summarize",
} as const;
export const TEMPLATE_STATUS = {
  success: "success",
  covered: "covered",
} as const;
export const TEMPLATE_MODE = { report: "report", manual: "manual" } as const;

/** Application-specific values belong in the producer checkout, never here. */
export interface TemplateTestConfig {
  sourceRoot: string;
  bridgeArgs: string[];
  bridgeEnv?: string[];
  templateId: string;
  sourceFile: string;
  reportPath: string;
  contract: {
    input: { runner: string; recipient: string; amountLabel: string };
    expectedCreate: Record<string, unknown>;
    nodeIds: string[];
    reportEdges: { source: string; target: string }[];
    transferNodeId: string;
    reportNodeId: string;
    unfunded: {
      amountLabel: string;
      summaryIncludes: string;
      errorIncludes: string;
    };
    withoutDeliveryHasReport: boolean;
  };
}

let cachedConfig: { file: string; config: TemplateTestConfig } | undefined;
const nonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;
const stringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(nonEmptyString);
const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

export function templateTestConfig(): TemplateTestConfig {
  const file = process.env.TEMPLATE_TEST_CONFIG;
  if (!file)
    throw new Error(
      "TEMPLATE_TEST_CONFIG must point to a producer-owned test configuration",
    );
  const absoluteFile = resolve(file);
  if (cachedConfig?.file === absoluteFile) return cachedConfig.config;
  const config = JSON.parse(
    readFileSync(absoluteFile, "utf8"),
  ) as TemplateTestConfig;
  const contract = config?.contract;
  if (
    !record(config) ||
    !nonEmptyString(config.sourceRoot) ||
    !stringArray(config.bridgeArgs) ||
    config.bridgeArgs.length === 0 ||
    (config.bridgeEnv !== undefined &&
      (!stringArray(config.bridgeEnv) ||
        !config.bridgeEnv.every((key) =>
          /^[A-Za-z_][A-Za-z0-9_]*$/.test(key),
        ))) ||
    !nonEmptyString(config.templateId) ||
    !nonEmptyString(config.sourceFile) ||
    !nonEmptyString(config.reportPath) ||
    !/^\/[A-Za-z0-9/_-]+$/.test(config.reportPath) ||
    !record(contract) ||
    !record(contract.input) ||
    !nonEmptyString(contract.input.runner) ||
    !nonEmptyString(contract.input.recipient) ||
    !nonEmptyString(contract.input.amountLabel) ||
    !record(contract.expectedCreate) ||
    !stringArray(contract.nodeIds) ||
    contract.nodeIds.length === 0 ||
    !nonEmptyString(contract.transferNodeId) ||
    !nonEmptyString(contract.reportNodeId) ||
    !contract.nodeIds.includes(contract.transferNodeId) ||
    !contract.nodeIds.includes(contract.reportNodeId) ||
    !Array.isArray(contract.reportEdges) ||
    !contract.reportEdges.every(
      (edge) =>
        record(edge) &&
        nonEmptyString(edge.source) &&
        nonEmptyString(edge.target),
    ) ||
    !record(contract.unfunded) ||
    !nonEmptyString(contract.unfunded.amountLabel) ||
    !nonEmptyString(contract.unfunded.summaryIncludes) ||
    !nonEmptyString(contract.unfunded.errorIncludes) ||
    typeof contract.withoutDeliveryHasReport !== "boolean"
  ) {
    throw new Error("Invalid external template test configuration");
  }
  const sourceRoot = resolve(dirname(absoluteFile), config.sourceRoot);
  const sourceRelative = relative(
    sourceRoot,
    resolve(sourceRoot, config.sourceFile),
  );
  if (isAbsolute(sourceRelative) || sourceRelative.split(sep)[0] === "..") {
    throw new Error(
      "The source artifact must stay inside the producer checkout",
    );
  }
  const resolved = { ...config, sourceRoot };
  cachedConfig = { file: absoluteFile, config: resolved };
  return resolved;
}

function bridgeEnvironment(config: TemplateTestConfig): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { NODE_ENV: "test" };
  for (const key of [
    "PATH",
    "HOME",
    "TMPDIR",
    "TMP",
    "TEMP",
    "SYSTEMROOT",
    ...(config.bridgeEnv ?? []),
  ]) {
    if (process.env[key] !== undefined) env[key] = process.env[key];
  }
  return env;
}

const execFileAsync = promisify(execFile);

function bridgeTimeout(): number {
  const timeout = Number(process.env.TEMPLATE_BRIDGE_TIMEOUT_MS ?? "90000");
  if (!Number.isFinite(timeout) || timeout <= 0)
    throw new Error("Invalid TEMPLATE_BRIDGE_TIMEOUT_MS");
  return timeout;
}

function bridgeFailure(error: unknown): never {
  if (process.env.TEMPLATE_BRIDGE_DEBUG === "1") console.error(error);
  throw new Error(
    "External template bridge failed; enable TEMPLATE_BRIDGE_DEBUG locally for details",
  );
}

export function templateBridge<T>(request: object): T {
  const config = templateTestConfig();
  const timeout = bridgeTimeout();
  try {
    return JSON.parse(
      execFileSync(process.execPath, config.bridgeArgs, {
        cwd: config.sourceRoot,
        input: JSON.stringify(request),
        encoding: "utf8",
        timeout,
        stdio: ["pipe", "pipe", "pipe"],
        env: bridgeEnvironment(config),
      }),
    );
  } catch (error) {
    return bridgeFailure(error);
  }
}

/** Async producer invocation keeps the report listener responsive and cancellable. */
export async function templateBridgeAsync<T>(
  request: object,
  options: { signal?: AbortSignal } = {},
): Promise<T> {
  const config = templateTestConfig();
  const timeout = bridgeTimeout();
  try {
    const child = execFileAsync(process.execPath, config.bridgeArgs, {
      cwd: config.sourceRoot,
      encoding: "utf8",
      timeout,
      signal: options.signal,
      env: bridgeEnvironment(config),
    });
    const inputWritten = new Promise<void>((accept, reject) => {
      const stdin = child.child.stdin;
      if (!stdin) {
        reject(new Error("Producer stdin unavailable"));
        return;
      }
      stdin.once("error", reject);
      stdin.end(JSON.stringify(request), accept);
    });
    const [{ stdout }] = await Promise.all([child, inputWritten]).catch(
      (error) => {
        child.child.kill();
        throw error;
      },
    );
    return JSON.parse(stdout);
  } catch (error) {
    return bridgeFailure(error);
  }
}

export interface CompiledTemplateRequest {
  provenance: {
    templateId: string;
    templateSha256: string;
    sourceCommit: string;
    sourceDirty: boolean;
  };
  simulate: v4.SimulateWorkflowRequest;
  create: v4.CreateWorkflowRequest;
}
type BridgeTemplateRequest = Omit<CompiledTemplateRequest, "provenance"> & {
  provenance: Omit<CompiledTemplateRequest["provenance"], "sourceDirty">;
};
interface TemplateCompileInput {
  runner: string;
  recipient: string;
  amountLabel: string;
  notifyUrl?: string;
  notifyAuthorization?: string;
}
function compileRequest(input: TemplateCompileInput) {
  return {
    action: TEMPLATE_ACTION.compile,
    templateId: templateTestConfig().templateId,
    chainId: TEMPLATE_TEST.chainId,
    ...input,
  };
}
function verifyCompiledTemplate(
  compiled: BridgeTemplateRequest,
): CompiledTemplateRequest {
  const config = templateTestConfig();
  const expected = createHash("sha256")
    .update(readFileSync(resolve(config.sourceRoot, config.sourceFile)))
    .digest("hex");
  const gitOptions = {
    cwd: config.sourceRoot,
    encoding: "utf8" as const,
    stdio: ["ignore", "pipe", "ignore"] as ["ignore", "pipe", "ignore"],
    env: bridgeEnvironment(config),
  };
  const commit = execFileSync("git", ["rev-parse", "HEAD"], gitOptions).trim();
  const sourceDirty =
    execFileSync("git", ["status", "--porcelain"], gitOptions).trim().length >
    0;
  if (
    compiled.provenance.templateSha256 !== expected ||
    compiled.provenance.templateId !== config.templateId ||
    compiled.provenance.sourceCommit !== commit
  ) {
    throw new Error(
      "The source artifact hash or checkout HEAD provenance does not match (" +
        (sourceDirty ? "dirty" : "clean") +
        " working tree)",
    );
  }
  return { ...compiled, provenance: { ...compiled.provenance, sourceDirty } };
}
export function compileExternalTemplate(
  input: TemplateCompileInput,
): CompiledTemplateRequest {
  return verifyCompiledTemplate(
    templateBridge<BridgeTemplateRequest>(compileRequest(input)),
  );
}
export async function compileExternalTemplateAsync(
  input: TemplateCompileInput,
  options: { signal?: AbortSignal } = {},
): Promise<CompiledTemplateRequest> {
  return verifyCompiledTemplate(
    await templateBridgeAsync<BridgeTemplateRequest>(
      compileRequest(input),
      options,
    ),
  );
}

export interface TemplateReport {
  subject: string;
  body: {
    summary: string;
    status: string;
    executions: { description: string; txHash?: string }[];
    errors: string[];
    notice?: string;
  };
}

/** Uses the producer's report implementation; only delivery is stubbed. */
export async function startTemplateReportServer() {
  const config = templateTestConfig();
  const reports: TemplateReport[] = [];
  const authorization = "Bearer " + randomBytes(32).toString("hex");
  const pending = new Set<AbortController>();
  let closing: Promise<void> | undefined;
  const server = createServer(async (req, res) => {
    const controller = new AbortController();
    res.once("close", () => {
      if (!res.writableEnded) controller.abort();
    });
    try {
      if (
        req.method !== "POST" ||
        req.url !== config.reportPath ||
        req.headers.authorization !== authorization
      ) {
        res.writeHead(403).end();
        return;
      }
      const chunks: Buffer[] = [];
      let size = 0;
      for await (const chunk of req.iterator({ destroyOnReturn: false })) {
        const data = Buffer.from(chunk);
        size += data.length;
        if (size > TEMPLATE_TEST.maxReportBytes) {
          res.writeHead(413).end();
          req.resume();
          return;
        }
        chunks.push(data);
      }
      pending.add(controller);
      const reply = await templateBridgeAsync<{
        ok: true;
        summary: TemplateReport;
      }>(
        {
          action: TEMPLATE_ACTION.summarize,
          digest: JSON.parse(Buffer.concat(chunks).toString()),
        },
        { signal: controller.signal },
      );
      reports.push(reply.summary);
      res
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify(reply));
    } catch (error) {
      if (
        !controller.signal.aborted &&
        process.env.TEMPLATE_BRIDGE_DEBUG === "1"
      )
        console.error(error);
      if (!res.destroyed && !res.headersSent)
        res
          .writeHead(500)
          .end(JSON.stringify({ error: "Report computation failed" }));
    } finally {
      pending.delete(controller);
    }
  });
  await new Promise<void>((accept, reject) => {
    server.once("error", reject);
    server.listen(0, process.env.TEST_STUB_BIND_ADDRESS ?? "127.0.0.1", accept);
  });
  const { port } = server.address() as AddressInfo;
  return {
    url:
      "http://" +
      (process.env.TEST_STUB_HOST ?? "127.0.0.1") +
      ":" +
      port +
      config.reportPath,
    reports,
    authorization,
    close: () =>
      (closing ??= new Promise<void>((accept, reject) => {
        for (const controller of pending) controller.abort();
        server.close((error) => (error ? reject(error) : accept()));
        server.closeAllConnections();
      })),
  };
}

/** Recover a server-created workflow even if create's response was lost. */
export async function cleanupTemplateWorkflows(input: {
  client: Client;
  ids: string[];
  walletAddress: string;
  name: string;
}): Promise<void> {
  try {
    if (input.ids.length === 0) {
      for (let attempt = 0; attempt < 2 && input.ids.length === 0; attempt++) {
        if (attempt > 0) await new Promise((accept) => setTimeout(accept, 500));
        let after: string | undefined;
        do {
          const page = await input.client.workflows.list({
            smartWalletAddress: [input.walletAddress],
            limit: 100,
            ...(after ? { after } : {}),
          });
          input.ids.push(
            ...page.data
              .filter((workflow) => workflow.name === input.name)
              .map((workflow) => workflow.id),
          );
          after = page.pageInfo.hasNextPage
            ? page.pageInfo.endCursor
            : undefined;
        } while (after);
      }
    }
  } catch (error) {
    // Discovery only runs after a failed create. Preserve that primary error,
    // and still cancel any ids recovered before discovery failed.
    console.error("Workflow recovery discovery failed");
    if (process.env.TEMPLATE_BRIDGE_DEBUG === "1") console.error(error);
  } finally {
    await removeCreatedWorkflows(input.client, input.ids);
  }
}
