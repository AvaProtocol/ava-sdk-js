import { mkdtempSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  templateTestConfig,
  templateBridge,
  templateBridgeAsync,
  compileExternalTemplate,
  startTemplateReportServer,
  TEMPLATE_TEST,
} from "../../utils/externalTemplate";

let root: string;
let previousEnvironment: NodeJS.ProcessEnv;

// Checkpoints prove ordering; allow a loaded runner time to spawn Node without
// weakening the requirement that the second report finishes before release.
const TEST_TIMING = {
  checkpointMs: 10_000,
  producerMs: 30_000,
  reportMs: 10_000,
  pollMs: 10,
  testMs: 45_000,
} as const;
jest.setTimeout(TEST_TIMING.testMs);

function fixture(overrides: Record<string, unknown> = {}) {
  return {
    sourceRoot: ".",
    bridgeArgs: ["bridge.mjs"],
    templateId: "fixture",
    sourceFile: "template.json",
    reportPath: "/report",
    contract: {
      input: { runner: "runner", recipient: "recipient", amountLabel: "1" },
      expectedCreate: {},
      nodeIds: ["transfer", "report"],
      transferNodeId: "transfer",
      reportNodeId: "report",
      reportEdges: [{ source: "transfer", target: "report" }],
      unfunded: {
        amountLabel: "2",
        summaryIncludes: "skipped",
        errorIncludes: "skipped",
      },
      withoutDeliveryHasReport: false,
    },
    ...overrides,
  };
}

beforeEach(() => {
  previousEnvironment = { ...process.env };
  root = mkdtempSync(join(tmpdir(), "external-template-test-"));
  process.env.TEMPLATE_TEST_CONFIG = join(root, "config.json");
  delete process.env.TEST_STUB_HOST;
  delete process.env.TEST_STUB_BIND_ADDRESS;
  writeFileSync(process.env.TEMPLATE_TEST_CONFIG, JSON.stringify(fixture()));
  writeFileSync(join(root, "template.json"), "{}");
});
afterEach(() => {
  process.env = previousEnvironment;
  rmSync(root, { recursive: true, force: true });
});

test.each([
  { sourceFile: "../outside.json" },
  { reportPath: undefined },
  { bridgeArgs: [123] },
])(
  "rejects invalid fixture configuration before invoking producer code: %j",
  (invalid) => {
    writeFileSync(
      process.env.TEMPLATE_TEST_CONFIG!,
      JSON.stringify(fixture(invalid)),
    );
    expect(() => templateTestConfig()).toThrow(/configuration|artifact/);
  },
);

test("does not inherit wallet keys and forwards only explicitly selected producer environment", async () => {
  process.env.TEST_PRIVATE_KEY = "test-sentinel";
  process.env.BRIDGE_EXPLICIT_VALUE = "selected";
  writeFileSync(
    join(root, "bridge.mjs"),
    "process.stdout.write(JSON.stringify({ keyPresent: !!process.env.TEST_PRIVATE_KEY, selected: process.env.BRIDGE_EXPLICIT_VALUE ?? null }));",
  );
  expect(templateBridge({})).toEqual({ keyPresent: false, selected: null });
  expect(await templateBridgeAsync({})).toEqual({
    keyPresent: false,
    selected: null,
  });
  process.env.TEMPLATE_TEST_CONFIG = join(root, "explicit.json");
  writeFileSync(
    process.env.TEMPLATE_TEST_CONFIG,
    JSON.stringify(fixture({ bridgeEnv: ["BRIDGE_EXPLICIT_VALUE"] })),
  );
  expect(templateBridge({})).toEqual({
    keyPresent: false,
    selected: "selected",
  });
});

test("uses per-run report tokens and rejects unauthenticated or oversized requests", async () => {
  writeFileSync(
    join(root, "bridge.mjs"),
    'throw new Error("Rejected requests must not invoke the producer");',
  );
  const first = await startTemplateReportServer();
  const second = await startTemplateReportServer();
  try {
    expect(first.authorization).not.toBe(second.authorization);
    const denied = await fetch(first.url, {
      method: "POST",
      headers: { Authorization: "Bearer not-this-run" },
      body: "{}",
    });
    expect(denied.status).toBe(403);
    const oversized = await fetch(first.url, {
      method: "POST",
      headers: { Authorization: first.authorization },
      body: "x".repeat(TEMPLATE_TEST.maxReportBytes + 1),
    });
    expect(oversized.status).toBe(413);
    expect(first.reports).toEqual([]);
  } finally {
    await Promise.all([first.close(), second.close()]);
  }
});

async function waitForFile(file: string) {
  const deadline = Date.now() + TEST_TIMING.checkpointMs;
  while (!existsSync(file)) {
    if (Date.now() >= deadline)
      throw new Error("Producer did not reach its test checkpoint");
    await new Promise((accept) => setTimeout(accept, TEST_TIMING.pollMs));
  }
}

test("serves a second report while a producer process is still running", async () => {
  process.env.TEMPLATE_BRIDGE_TIMEOUT_MS = String(TEST_TIMING.producerMs);
  writeFileSync(
    join(root, "bridge.mjs"),
    `
    import { readFileSync, writeFileSync, existsSync } from 'node:fs';
    const { digest } = JSON.parse(readFileSync(0, 'utf8'));
    if (digest.wait) {
      writeFileSync('started', '');
      while (!existsSync('release')) await new Promise(r => setTimeout(r, 10));
    }
    process.stdout.write(JSON.stringify({ ok: true, summary: { subject: 'test', body: { summary: 'done', status: 'success', executions: [], errors: [] } } }));
  `,
  );
  const server = await startTemplateReportServer();
  const slow = fetch(server.url, {
    method: "POST",
    headers: { Authorization: server.authorization },
    body: JSON.stringify({ wait: true }),
  });
  try {
    await waitForFile(join(root, "started"));
    const fast = await fetch(server.url, {
      method: "POST",
      headers: { Authorization: server.authorization },
      body: "{}",
      signal: AbortSignal.timeout(TEST_TIMING.reportMs),
    });
    expect(fast.status).toBe(200);
    expect(server.reports).toHaveLength(1);
    writeFileSync(join(root, "release"), "");
    expect((await slow).status).toBe(200);
    expect(server.reports).toHaveLength(2);
  } finally {
    writeFileSync(join(root, "release"), "");
    await slow.catch(() => undefined);
    await server.close();
  }
});

test("shutdown aborts active producer processes and is idempotent", async () => {
  writeFileSync(
    join(root, "bridge.mjs"),
    `
    import { writeFileSync } from 'node:fs';
    process.once('SIGTERM', () => { writeFileSync('stopped', ''); process.exit(0); });
    writeFileSync('started', '');
    setInterval(() => {}, 1000);
  `,
  );
  const server = await startTemplateReportServer();
  const request = fetch(server.url, {
    method: "POST",
    headers: { Authorization: server.authorization },
    body: "{}",
  }).catch(() => null);
  try {
    await waitForFile(join(root, "started"));
    await server.close();
    await waitForFile(join(root, "stopped"));
    expect(await request).toBeNull();
    await expect(server.close()).resolves.toBeUndefined();
  } finally {
    await server.close();
  }
});

test("records dirty producer code outside the source artifact without claiming a clean commit", () => {
  writeFileSync(join(root, "helper.txt"), "initial");
  writeFileSync(
    join(root, "bridge.mjs"),
    `
    import { readFileSync } from 'node:fs';
    import { createHash } from 'node:crypto';
    import { execFileSync } from 'node:child_process';
    const input = JSON.parse(readFileSync(0, 'utf8'));
    process.stdout.write(JSON.stringify({
      provenance: { templateId: input.templateId, templateSha256: createHash('sha256').update(readFileSync('template.json')).digest('hex'), sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim() },
      simulate: {}, create: {}
    }));
  `,
  );
  const git = (...args: string[]) =>
    execFileSync("git", args, { cwd: root, stdio: "ignore" });
  git("init", "--initial-branch=main");
  git("add", ".");
  git(
    "-c",
    "user.name=Template test",
    "-c",
    "user.email=template@example.invalid",
    "-c",
    "commit.gpgsign=false",
    "-c",
    "core.hooksPath=/dev/null",
    "commit",
    "-m",
    "fixture",
  );
  const input = { runner: "runner", recipient: "recipient", amountLabel: "1" };
  const clean = compileExternalTemplate(input);
  expect(clean.provenance.sourceDirty).toBe(false);
  writeFileSync(join(root, "helper.txt"), "edited");
  const dirty = compileExternalTemplate(input);
  expect(dirty.provenance.sourceDirty).toBe(true);
  expect(dirty.provenance.templateSha256).toBe(clean.provenance.templateSha256);
  expect(dirty.provenance.sourceCommit).toBe(clean.provenance.sourceCommit);
});

test("a pre-aborted producer invocation fails cleanly instead of accepting output", async () => {
  writeFileSync(
    join(root, "bridge.mjs"),
    "process.stdout.write(JSON.stringify({ ok: true }));",
  );
  await expect(
    templateBridgeAsync({}, { signal: AbortSignal.abort() }),
  ).rejects.toThrow("External template bridge failed");
});
