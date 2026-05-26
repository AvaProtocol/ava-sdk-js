/**
 * Port of tests-v3-archive/templates/batch-recurring-payment-with-email.test.ts.
 *
 * Same shape as recurring-payment-with-report but driven by a cron
 * trigger and emitting via "email" (RestAPI -> SendGrid in production).
 * We use httpbin so the workflow can simulate without real SendGrid
 * credentials.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  getSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

describe("Template: batch recurring payment with email", () => {
  let client: Client;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    eoaAddress = getEOAAddress();
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  test("simulates the cron-driven batch transfer workflow", async () => {
    const wallet = await getSmartWallet(client);
    const sim = await client.workflows.simulate({
      trigger: Triggers.cron({
        id: "trigger",
        name: "cron",
        schedule: ["0 15 * * 1"], // every Monday 3pm UTC
      }),
      nodes: [
        Nodes.balance({
          id: "balance",
          name: "balance",
          address: wallet.address,
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
          url: "https://httpbin.org/post",
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
});
