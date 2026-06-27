/**
 * Port of tests-v3-archive/executions/errorCodeConsistency.test.ts.
 *
 * Asserts that the error code returned by nodes.run for a given
 * failure mode matches the errorCode field on the corresponding
 * step in workflows.simulate. v4 surfaces error codes as strings
 * (e.g. "INVALID_REQUEST", "MISSING_REQUIRED_FIELD") rather than
 * numeric enum values; the v3 numeric checks (3006 etc.) are
 * dropped in favor of code-name matching.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

describe("Error code consistency between nodes.run and workflows.simulate", () => {
  let client: Client;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  test("empty customCode source surfaces the same error code on both paths", async () => {
    const wallet = await createSmartWallet(client);
    const emptyCustomCode = Nodes.customCode({ id: "step1", name: "code1", source: "" });

    // nodes.run path.
    const runResult = await client.nodes.run({
      node: emptyCustomCode,
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    expect(runResult.success).toBe(false);
    expect(runResult.error).toMatch(/source is required/i);
    expect(typeof runResult.errorCode).toBe("string");
    const runErrorCode = runResult.errorCode;

    // workflows.simulate path.
    const sim = await client.workflows.simulate({
      trigger: Triggers.block({ id: "trigger", name: "timeTrigger", chainId: 11_155_111, interval: 7200 }),
      nodes: [emptyCustomCode],
      edges: [{ id: "e1", source: "trigger", target: "step1" }],
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    expect(sim.status).toBe("failed");
    const step = sim.steps?.find((s) => s.type === "customCode");
    expect(step?.success).toBe(false);
    expect(step?.error).toMatch(/source is required/i);
    expect(typeof step?.errorCode).toBe("string");

    // The two paths must agree on the error code.
    expect(step?.errorCode).toBe(runErrorCode);
  });

  test("successful step has no errorCode (or an UNSPECIFIED sentinel)", async () => {
    const wallet = await createSmartWallet(client);
    const sim = await client.workflows.simulate({
      trigger: Triggers.block({ id: "trigger", name: "timeTrigger", chainId: 11_155_111, interval: 7200 }),
      nodes: [
        Nodes.customCode({ id: "step1", name: "code1", source: "return {result: 'ok'};" }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "step1" }],
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    expect(sim.status).toBe("success");
    const step = sim.steps?.find((s) => s.type === "customCode");
    expect(step?.success).toBe(true);
    expect(step?.error ?? "").toBe("");
    // errorCode is either undefined or an "unspecified" sentinel
    // on successful steps — both are acceptable.
    if (step?.errorCode !== undefined) {
      expect(step.errorCode).toMatch(/UNSPECIFIED|^$/i);
    }
  });
});
