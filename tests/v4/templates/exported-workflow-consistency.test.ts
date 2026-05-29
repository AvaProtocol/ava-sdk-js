/**
 * Port of tests-v3-archive/templates/exported-workflow-consistency.test.ts.
 *
 * v3 captured an exported workflow from the studio (manual trigger ->
 * filter -> loop -> customCode) and asserted that:
 *   1. simulateWorkflow produces the expected step graph
 *   2. deploy + trigger produces the same step shape
 *   3. runNodeWithInputs on the loop produces matching output
 *
 * The v4 port keeps the workflow shape + simulate assertion. The
 * cross-method consistency check is folded into a single comparison
 * between nodes.run output and the loop step's simulate output.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

const TEST_DATA = [{ key: "value1" }, { key: "value2" }];

describe("Template: exported workflow consistency", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  /**
   * Canonical workflow shape — shared by simulate and deploy tests so
   * both exercise the same exported graph. This is the "single source
   * of truth" the v3 cross-method consistency check was built around.
   */
  function buildWorkflow(smartWalletAddress: string) {
    return {
      smartWalletAddress,
      name: "Exported workflow consistency",
      chainId: 11_155_111,
      trigger: Triggers.manual({
        id: "trigger",
        name: "manualTrigger",
        lang: "json",
        data: { items: TEST_DATA },
      }),
      nodes: [
        Nodes.filter({
          id: "filter",
          name: "filter",
          expression: "value.key === 'value1'",
          inputVariable: "{{ manualTrigger.data.items }}",
        }),
        Nodes.loop({
          id: "loop",
          name: "loop",
          // Inside a workflow the filter step's output is at
          // `filter.data` (a flat array). nodes.run double-wraps it
          // as `output.data.data`; workflow execution does not.
          inputVariable: "{{ filter.data }}",
          iterVar: "item",
          runner: Nodes.customCode({
            id: "iter",
            name: "iter",
            source: "return { processed: item.key };",
          }),
        }),
        Nodes.customCode({
          id: "sum",
          name: "sum",
          source: "return { count: loop.data.length };",
        }),
      ],
      edges: [
        { id: "e1", source: "trigger", target: "filter" },
        { id: "e2", source: "filter", target: "loop" },
        { id: "e3", source: "loop", target: "sum" },
      ],
    };
  }

  test("simulates the manual->filter->loop->customCode workflow", async () => {
    const wallet = await createSmartWallet(client);
    const wf = buildWorkflow(wallet.address);

    const sim = await client.workflows.simulate({
      trigger: wf.trigger,
      nodes: wf.nodes,
      edges: wf.edges,
      inputVariables: { settings: settingsFor(wallet.address) },
    });

    expect(sim.status).toBe("success");
    const stepIds = (sim.steps ?? []).map((s) => s.id);
    expect(stepIds).toEqual(expect.arrayContaining(["trigger", "filter", "loop", "sum"]));

    const sumStep = sim.steps?.find((s) => s.id === "sum");
    expect(sumStep?.success).toBe(true);
    const out = (sumStep?.output as { data: { count: number } }).data;
    expect(out.count).toBe(1); // Only value1 passes the filter.
  });

  test("deploys + retrieves the workflow with the manual trigger type", async () => {
    const wallet = await createSmartWallet(client);
    const wf = buildWorkflow(wallet.address);

    const created = await client.workflows.create({
      ...wf,
      // The top-level wf.name is the canonical workflow name; the
      // REST mapper auto-mirrors it into settings.name server-side.
      inputVariables: {
        settings: settingsFor(wallet.address),
      },
    });
    expect(typeof created.id).toBe("string");
    createdWorkflowIds.push(created.id);

    const retrieved = await client.workflows.retrieve(created.id);
    expect(retrieved.id).toBe(created.id);
    expect(retrieved.name).toBe(wf.name);
    expect(retrieved.trigger?.type).toBe("manual");
    expect(retrieved.nodes).toHaveLength(3);
    expect(retrieved.edges).toHaveLength(3);
  });

  test("nodes.run loop result matches simulate's loop step output", async () => {
    const directResult = await client.nodes.run({
      node: Nodes.loop({
        id: "loop",
        name: "loop",
        inputVariable: "{{ items }}",
        iterVar: "item",
        runner: Nodes.customCode({
          id: "iter",
          name: "iter",
          source: "return { processed: item.key };",
        }),
      }),
      inputVariables: { items: TEST_DATA },
    });
    expect(directResult.success).toBe(true);
    const directData = (directResult.output as { data: any[] }).data;
    expect(directData.length).toBe(2);
    expect(directData[0]).toEqual({ processed: "value1" });

    // Same loop inside a workflow.
    const wallet = await createSmartWallet(client);
    const sim = await client.workflows.simulate({
      trigger: Triggers.manual({
        id: "trigger",
        name: "trigger",
        lang: "json",
        data: { items: TEST_DATA },
      }),
      nodes: [
        Nodes.loop({
          id: "loop",
          name: "loop",
          inputVariable: "{{ trigger.data.items }}",
          iterVar: "item",
          runner: Nodes.customCode({
            id: "iter",
            name: "iter",
            source: "return { processed: item.key };",
          }),
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "loop" }],
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    const loopStep = sim.steps?.find((s) => s.id === "loop");
    const simData = (loopStep?.output as { data: any[] }).data;
    expect(simData).toEqual(directData);
  });
});
