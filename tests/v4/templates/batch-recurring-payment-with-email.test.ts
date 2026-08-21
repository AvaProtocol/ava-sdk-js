/**
 * Port of tests-v3-archive/templates/batch-recurring-payment-with-email.test.ts.
 *
 * Same shape as recurring-payment-with-report but driven by a cron
 * trigger and emitting via "email" (RestAPI -> SendGrid in production).
 * We use a local stub server (tests/utils/stubServer.ts) so the workflow
 * simulates without real SendGrid credentials and without depending on a
 * third party being up.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  getSuiteClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";
import {
  describeIfGatewayCanReachStub,
  startStubServerFor,
  type StubServer,
} from "../../utils/stubServer";

jest.setTimeout(60_000);

/** Local stand-in for httpbin — see tests/utils/stubServer.ts. */
let STUB = "";
let stub: StubServer;

describeIfGatewayCanReachStub("Template: batch recurring payment with email", () => {
  let client: Client;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    ({ client, owner: eoaAddress } = await getSuiteClient());

    // A local stub replaces httpbin.org here: the gateway makes this request,
    // not the test, so client-side mocking cannot intercept it — only a server
    // the gateway can dial. See tests/utils/stubServer.ts.
    stub = await startStubServerFor(client, (url) =>
      Nodes.restApi({ id: "probe", name: "probe", url, method: "GET" }),
    );
    STUB = stub.baseUrl;
  });

  afterAll(async () => {
    await stub?.close();
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  /**
   * Canonical workflow shape — shared by simulate and deploy tests so
   * both exercise the same graph. Caller passes the smart wallet
   * address so balance + settings.runner point at the right wallet.
   */
  function buildWorkflow(smartWalletAddress: string) {
    return {
      smartWalletAddress,
      name: "Batch recurring payment with email",
      trigger: Triggers.cron({
        id: "trigger",
        name: "cron",
        schedule: ["0 15 * * 1"], // every Monday 3pm UTC
      }),
      nodes: [
        Nodes.balance({
          id: "balance",
          name: "balance",
          address: smartWalletAddress,
          chain: "sepolia",
        }),
        Nodes.customCode({
          id: "code",
          name: "code",
          source: `
            const balances = balance.data;
            const eth = Array.isArray(balances) ? balances.find((b) => b.symbol === "ETH") : null;
            return { hasEth: !!eth, totalNeeded: 1 };
          `,
        }),
        Nodes.branch({
          id: "branch",
          name: "branch",
          conditions: [
            { id: "ok", type: "if", expression: "{{ code.data.hasEth }}" },
            { id: "fail", type: "else", expression: "" },
          ],
        }),
        Nodes.loop({
          id: "loop",
          name: "loop",
          inputVariable: "{{ recipients }}",
          iterVar: "addr",
          runner: Nodes.customCode({
            id: "iter",
            name: "iter",
            source: "return { sent_to: addr };",
          }),
        }),
        Nodes.restApi({
          id: "email",
          name: "email",
          url: `${STUB}/post`,
          method: "POST",
          body: JSON.stringify({ subject: "Batch transfer complete" }),
          headers: { "Content-Type": "application/json" },
        }),
      ],
      edges: [
        { id: "e1", source: "trigger", target: "balance" },
        { id: "e2", source: "balance", target: "code" },
        { id: "e3", source: "code", target: "branch" },
        { id: "e4", source: "branch.ok", target: "loop" },
        { id: "e5", source: "loop", target: "email" },
      ],
    };
  }

  test("simulates the cron-driven batch transfer workflow", async () => {
    const wallet = await createSmartWallet(client);
    const wf = buildWorkflow(wallet.address);

    const sim = await client.workflows.simulate({
      trigger: wf.trigger,
      nodes: wf.nodes,
      edges: wf.edges,
      inputVariables: {
        recipients: [eoaAddress],
        settings: settingsFor(wallet.address),
      },
    });

    expect(sim.status).toBeTruthy();
    const stepIds = (sim.steps ?? []).map((s) => s.id);
    expect(stepIds).toContain("balance");
    expect(stepIds).toContain("code");
    expect(stepIds).toContain("branch");
  });

  test("deploys + retrieves the workflow with the cron trigger type", async () => {
    const wallet = await createSmartWallet(client);
    const wf = buildWorkflow(wallet.address);

    const created = await client.workflows.create({
      ...wf,
      // The top-level wf.name is the canonical workflow name; the
      // REST mapper auto-mirrors it into settings.name server-side.
      inputVariables: {
        recipients: [eoaAddress],
        settings: settingsFor(wallet.address),
      },
    });
    expect(typeof created.id).toBe("string");
    createdWorkflowIds.push(created.id);

    const retrieved = await client.workflows.retrieve(created.id);
    expect(retrieved.id).toBe(created.id);
    expect(retrieved.name).toBe(wf.name);
    expect(retrieved.trigger?.type).toBe("cron");
    expect(retrieved.nodes).toHaveLength(5);
    expect(retrieved.edges).toHaveLength(5);
  });
});
