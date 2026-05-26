/**
 * Port of tests-v3-archive/executions/stepInput.test.ts.
 *
 * v3 leaned on a localhost:19876 mock server for the REST API
 * variants; v4 uses httpbin.org to keep the test self-contained.
 *
 * Step shape diff (v3 → v4):
 *   - v3 step.inputsList -> v4 step.inputs
 *   - v3 step.hasInput()/hasOutput() helpers -> v4 returns plain
 *     JSON; presence checks are just typeof / truthiness checks.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

const HTTPBIN = "https://httpbin.org";

describe("Step Input Tests", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("rejects workflow with an invalid node name (spaces)", async () => {
    const wallet = await getSmartWallet(client);
    await expect(
      client.workflows.create({
        name: "TestInvalidWorkflow",
        smartWalletAddress: wallet.address,
        maxExecution: 1,
        trigger: Triggers.manual({
          id: "trigger",
          name: "validTrigger",
          lang: "json",
          data: { test: "data" },
        }),
        nodes: [
          Nodes.customCode({
            id: "step1",
            name: "Invalid Node Name With Spaces",
            source: "return 'test';",
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      }),
    ).rejects.toMatchObject({ status: 400 });
  });

  test("trigger config + node config + step output round-trip through deploy + trigger", async () => {
    const wallet = await getSmartWallet(client);
    const triggerData = {
      apiBaseUrl: HTTPBIN,
      apiKey: "test-key-123",
      environment: "testing",
      priority: "high",
    };
    const triggerHeaders = {
      "X-Webhook-Source": "manual-trigger",
      Authorization: "Bearer trigger-token-123",
    };
    const triggerPathParams = {
      endpoint: "get",
      version: "v1",
      format: "json",
    };

    const created = await client.workflows.create({
      name: "TestWorkflowWithManualTriggerInput",
      smartWalletAddress: wallet.address,
      maxExecution: 1,
      trigger: Triggers.manual({
        id: "trigger",
        name: "ManualTriggerWithInput",
        lang: "json",
        data: triggerData,
        headers: triggerHeaders,
        pathParams: triggerPathParams,
      }),
      nodes: [
        Nodes.restApi({
          id: "rest",
          name: "APICallUsingTriggerInput",
          url: "{{ManualTriggerWithInput.data.apiBaseUrl}}/{{ManualTriggerWithInput.pathParams.endpoint}}",
          method: "GET",
          headers: {
            "X-API-Key": "{{ManualTriggerWithInput.data.apiKey}}",
            "X-Environment": "{{ManualTriggerWithInput.data.environment}}",
            "X-Priority": "{{ManualTriggerWithInput.data.priority}}",
            Authorization: "{{ManualTriggerWithInput.headers.Authorization}}",
          },
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "rest" }],
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    const wfId = created.id as string;
    createdWorkflowIds.push(wfId);

    const trig = await client.workflows.trigger(wfId, {
      triggerType: "manual",
      triggerOutput: {
        data: triggerData,
        headers: triggerHeaders,
        pathParams: triggerPathParams,
      },
      isBlocking: true,
    });
    const exec = await client.executions.retrieve(trig.executionId, { workflowId: wfId });
    expect(exec.steps?.length ?? 0).toBeGreaterThanOrEqual(2);

    const triggerStep = exec.steps?.[0];
    expect(triggerStep?.type).toBe("manual");
    expect(triggerStep?.name).toBe("ManualTriggerWithInput");
    // Trigger config carries data/headers/pathParams.
    const cfg = triggerStep?.config as Record<string, any>;
    expect(cfg?.data?.apiKey).toBe("test-key-123");
    expect(cfg?.headers?.Authorization).toBe("Bearer trigger-token-123");
    expect(cfg?.pathParams?.endpoint).toBe("get");

    const nodeStep = exec.steps?.[1];
    expect(nodeStep?.type).toBe("restApi");
    expect(nodeStep?.name).toBe("APICallUsingTriggerInput");
    // Node config carries the unresolved template URL + headers.
    const nodeCfg = nodeStep?.config as Record<string, any>;
    expect(nodeCfg?.url).toContain("{{ManualTriggerWithInput.data.apiBaseUrl}}");
    expect(nodeCfg?.method).toBe("GET");

    // Trigger output is `triggerOutput` echoed back (under data field).
    const trgOut = (triggerStep?.output as { data: any }).data;
    expect(trgOut.apiKey ?? trgOut.data?.apiKey).toBeDefined();
  });

  test("step.inputs lists available variable references", async () => {
    const wallet = await getSmartWallet(client);
    const sim = await client.workflows.simulate({
      trigger: Triggers.manual({
        id: "trigger",
        name: "manualGo",
        lang: "json",
        data: { x: 1 },
      }),
      nodes: [
        Nodes.customCode({
          id: "step1",
          name: "step1",
          source: "return { ok: true };",
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "step1" }],
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    const step = sim.steps?.find((s) => s.id === "step1");
    expect(Array.isArray(step?.inputs)).toBe(true);
    // The trigger's data is reachable via `<triggerName>.data`.
    expect(step?.inputs).toEqual(expect.arrayContaining(["manualGo.data"]));
  });
});
