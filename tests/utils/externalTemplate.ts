import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import type { Client, v4 } from "@avaprotocol/sdk-js";
import { removeCreatedWorkflows } from "./client";

export const TEMPLATE_TEST = {
  chainId: 11_155_111,
  amount: "0.000001",
  amountWei: "1000000000000",
  authorization: "Bearer headless-test",
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

export function templateTestConfig(): TemplateTestConfig {
  const file = process.env.TEMPLATE_TEST_CONFIG;
  if (!file)
    throw new Error(
      "TEMPLATE_TEST_CONFIG must point to a producer-owned test configuration",
    );
  const config = JSON.parse(readFileSync(file, "utf8")) as TemplateTestConfig;
  if (
    !config.sourceRoot ||
    !config.bridgeArgs?.length ||
    !config.templateId ||
    !config.sourceFile ||
    !config.contract
  ) {
    throw new Error("Invalid external template test configuration");
  }
  return {
    ...config,
    sourceRoot: resolve(dirname(resolve(file)), config.sourceRoot),
  };
}

export function templateBridge<T>(request: object): T {
  const config = templateTestConfig();
  const timeout = Number(process.env.TEMPLATE_BRIDGE_TIMEOUT_MS ?? "90000");
  if (!Number.isFinite(timeout) || timeout <= 0)
    throw new Error("Invalid TEMPLATE_BRIDGE_TIMEOUT_MS");
  try {
    return JSON.parse(
      execFileSync(process.execPath, config.bridgeArgs, {
        cwd: config.sourceRoot,
        input: JSON.stringify(request),
        encoding: "utf8",
        timeout,
        stdio: ["pipe", "pipe", "pipe"],
        env: { ...process.env, NODE_ENV: "test" },
      }),
    );
  } catch (error) {
    // Producer stderr can include private paths or data. Opt in locally only.
    if (process.env.TEMPLATE_BRIDGE_DEBUG === "1") console.error(error);
    throw new Error(
      "External template bridge failed; enable TEMPLATE_BRIDGE_DEBUG locally for details",
    );
  }
}

export interface CompiledTemplateRequest {
  provenance: {
    templateId: string;
    templateSha256: string;
    sourceCommit: string;
  };
  simulate: v4.SimulateWorkflowRequest;
  create: v4.CreateWorkflowRequest;
}

export function compileExternalTemplate(input: {
  runner: string;
  recipient: string;
  amountLabel: string;
  notifyUrl?: string;
}): CompiledTemplateRequest {
  const config = templateTestConfig();
  const compiled = templateBridge<CompiledTemplateRequest>({
    action: TEMPLATE_ACTION.compile,
    templateId: config.templateId,
    chainId: TEMPLATE_TEST.chainId,
    ...input,
  });
  const expected = createHash("sha256")
    .update(readFileSync(resolve(config.sourceRoot, config.sourceFile)))
    .digest("hex");
  const commit = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: config.sourceRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
  if (
    compiled.provenance.templateSha256 !== expected ||
    compiled.provenance.templateId !== config.templateId ||
    compiled.provenance.sourceCommit !== commit
  ) {
    throw new Error(
      "The request was not compiled from the current producer checkout",
    );
  }
  return compiled;
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
  const server = createServer(async (req, res) => {
    try {
      if (
        req.method !== "POST" ||
        req.url !== config.reportPath ||
        req.headers.authorization !== TEMPLATE_TEST.authorization
      ) {
        res.writeHead(403).end();
        return;
      }
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(Buffer.from(chunk));
      const reply = templateBridge<{ ok: true; summary: TemplateReport }>({
        action: TEMPLATE_ACTION.summarize,
        digest: JSON.parse(Buffer.concat(chunks).toString()),
      });
      reports.push(reply.summary);
      res
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify(reply));
    } catch (error) {
      if (process.env.TEMPLATE_BRIDGE_DEBUG === "1") console.error(error);
      res
        .writeHead(500)
        .end(JSON.stringify({ error: "Report computation failed" }));
    }
  });
  await new Promise<void>((accept, reject) => {
    server.once("error", reject);
    server.listen(
      0,
      process.env.TEST_STUB_HOST ? "0.0.0.0" : "127.0.0.1",
      accept,
    );
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
    close: () =>
      new Promise<void>((accept, reject) =>
        server.close((error) => (error ? reject(error) : accept())),
      ),
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
        after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : undefined;
      } while (after);
    }
  } finally {
    await removeCreatedWorkflows(input.client, input.ids);
  }
}
