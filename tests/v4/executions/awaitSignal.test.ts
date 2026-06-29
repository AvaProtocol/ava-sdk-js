/**
 * Durable-execution e2e: the external-signal `await` node + the
 * `executions.signal` resume endpoint, end-to-end against a live
 * gateway with durable execution merged (EigenLayer-AVS #643–#648).
 *
 * Flow under test (human-approval gate):
 *   manualTrigger → await(channel:"api") → customCode (the gated step)
 *
 * 1. Trigger the workflow non-blocking → an execution is created and
 *    suspends at the await node.
 * 2. Poll `getStatus` → it reports the new non-terminal `"waiting"`
 *    state (the whole point of the #648 observability fix). The gated
 *    customCode has NOT run yet.
 * 3. `executions.signal(execId, { decision: "approve", payload })`
 *    resumes the execution; the decision becomes the await node's
 *    output and the gated step runs.
 * 4. The returned execution is terminal (`"success"`) and carries the
 *    downstream step.
 *
 * GATED: this exercises brand-new server behaviour and live timing, so
 * it only runs when `DURABLE_E2E=1` is set (e.g.
 * `AVS_REST_URL=http://localhost:8080/api/v1 DURABLE_E2E=1 \
 *   yarn jest tests/v4/executions/awaitSignal.test.ts`).
 * Left off by default until the target gateway is confirmed to carry
 * the durable-execution engine.
 *
 * Verified passing 2026-06-28 against a local `make dev-stack`
 * (EigenLayer-AVS staging). Gateway logs for the run show the full
 * lifecycle: `execution suspended (durable) resume_node: gate` →
 * `POST /executions/{id}:signal -> 200` → `execution resumed to
 * terminal status: EXECUTION_STATUS_SUCCESS`. (An earlier gateway
 * build 404'd the POST `:signal` route — the generated echo route
 * `/executions/:id:signal` was unmatchable for POST; fixed server-side
 * before this run.)
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  removeCreatedWorkflows,
} from "../../utils/client";

jest.setTimeout(180_000);

const DURABLE_E2E = process.env.DURABLE_E2E === "1";
// Use describe.skip when the opt-in flag is absent so the suite is a
// no-op in default CI rather than authenticating + failing.
const describeMaybe = DURABLE_E2E ? describe : describe.skip;

/** Poll getStatus until `predicate` is true or the deadline passes. */
async function waitForStatus(
  client: Client,
  execId: string,
  workflowId: string,
  predicate: (status: string) => boolean,
  { timeoutMs = 60_000, intervalMs = 1_500 } = {},
): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  let last = "";
  while (Date.now() < deadline) {
    const summary = await client.executions.getStatus(execId, { workflowId });
    last = summary.status;
    if (predicate(last)) return last;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`execution ${execId} never reached the expected status (last: "${last}")`);
}

describeMaybe("durable execution — await(channel:'api') + executions.signal", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("pauses at WAITING, resumes on approve, runs the gated step", async () => {
    const wallet = await createSmartWallet(client);

    const created = await client.workflows.create({
      smartWalletAddress: wallet.address,
      name: "durable-await-approve",
      trigger: Triggers.manual({ id: "trigger", name: "manualTrigger" }),
      nodes: [
        Nodes.await({
          id: "gate",
          name: "approval",
          channel: "api",
          prompt: "Approve the gated step?",
          timeoutSeconds: 120,
        }),
        Nodes.customCode({
          id: "gated",
          name: "gatedStep",
          source: "return { ran: true, decision: approval.data.decision };",
        }),
      ],
      edges: [
        { id: "e1", source: "trigger", target: "gate" },
        { id: "e2", source: "gate", target: "gated" },
      ],
      inputVariables: {
        settings: { name: "durable-await-approve", runner: wallet.address },
      },
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    // Non-blocking trigger — the execution will suspend at the await,
    // so a blocking trigger would just hang until the await timeout.
    const trig = await client.workflows.trigger(wfId, {
      triggerType: "manual",
      triggerOutput: {},
      isBlocking: false,
    });
    const execId = trig.executionId;

    // 1) It parks at the non-terminal WAITING state.
    const paused = await waitForStatus(client, execId, wfId, (s) => s === "waiting");
    expect(paused).toBe("waiting");

    // 2) Still parked — the gated step has not run and the execution
    //    is not terminal.
    const midExec = await client.executions.retrieve(execId, { workflowId: wfId });
    expect(midExec.status).toBe("waiting");
    const gatedBefore = midExec.steps?.find((s) => s.name === "gatedStep");
    expect(gatedBefore).toBeUndefined();

    // 3) Approve — resumes the execution; payload becomes the await
    //    node's output.
    const resumed = await client.executions.signal(execId, {
      workflowId: wfId,
      decision: "approve",
      payload: { decision: "approve" },
    });

    // 4) Terminal success, and the gated step ran post-resume.
    //    signal(...) can return before the engine finishes transitioning
    //    through "pending", so treat "pending" as keep-polling too.
    const finalStatus =
      resumed.status === "waiting" || resumed.status === "pending"
        ? await waitForStatus(client, execId, wfId, (s) => s !== "waiting" && s !== "pending")
        : resumed.status;
    expect(finalStatus).toBe("success");

    const finalExec = await client.executions.retrieve(execId, { workflowId: wfId });
    const gatedAfter = finalExec.steps?.find((s) => s.name === "gatedStep");
    expect(gatedAfter?.success).toBe(true);
  });

  test("reject resumes the execution to a clean terminal success", async () => {
    const wallet = await createSmartWallet(client);

    const created = await client.workflows.create({
      smartWalletAddress: wallet.address,
      name: "durable-await-reject",
      trigger: Triggers.manual({ id: "trigger", name: "manualTrigger" }),
      nodes: [
        Nodes.await({
          id: "gate",
          name: "approval",
          channel: "api",
          timeoutSeconds: 120,
        }),
        Nodes.customCode({
          id: "gated",
          name: "gatedStep",
          source: "return { ran: true };",
        }),
      ],
      edges: [
        { id: "e1", source: "trigger", target: "gate" },
        { id: "e2", source: "gate", target: "gated" },
      ],
      inputVariables: {
        settings: { name: "durable-await-reject", runner: wallet.address },
      },
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const trig = await client.workflows.trigger(wfId, {
      triggerType: "manual",
      triggerOutput: {},
      isBlocking: false,
    });
    const execId = trig.executionId;

    await waitForStatus(client, execId, wfId, (s) => s === "waiting");

    const resumed = await client.executions.signal(execId, {
      workflowId: wfId,
      decision: "reject",
    });

    const finalStatus =
      resumed.status === "waiting" || resumed.status === "pending"
        ? await waitForStatus(client, execId, wfId, (s) => s !== "waiting" && s !== "pending")
        : resumed.status;
    // Reject is a clean decision, not a failure: the execution resumes
    // and completes successfully. (This linear workflow has no Branch,
    // so reject doesn't skip a downstream step — routing-on-decision is
    // a separate Branch concern; this asserts the resume itself.)
    expect(finalStatus).toBe("success");
  });
});
