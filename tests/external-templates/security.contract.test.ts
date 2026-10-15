import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  templateTestConfig,
  templateBridge,
  startTemplateReportServer,
  TEMPLATE_TEST,
} from "../utils/externalTemplate";

let root: string;
let previousEnvironment: NodeJS.ProcessEnv;

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

test("does not inherit wallet keys and forwards only explicitly selected producer environment", () => {
  process.env.TEST_PRIVATE_KEY = "test-sentinel";
  process.env.BRIDGE_EXPLICIT_VALUE = "selected";
  writeFileSync(
    join(root, "bridge.mjs"),
    "process.stdout.write(JSON.stringify({ keyPresent: !!process.env.TEST_PRIVATE_KEY, selected: process.env.BRIDGE_EXPLICIT_VALUE ?? null }));",
  );
  expect(templateBridge({})).toEqual({ keyPresent: false, selected: null });
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
