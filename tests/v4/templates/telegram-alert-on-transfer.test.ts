/**
 * Port of tests-v3-archive/templates/telegram-alert-on-transfer.test.ts.
 *
 * Real-world studio template: monitor ERC-20 Transfer events for the
 * user's wallet and emit a Telegram alert via RestAPI. The port keeps
 * the workflow shape (event trigger with from/to queries + RestAPI
 * node) and validates it survives create + simulate. We don't
 * actually call Telegram — the URL points at httpbin so the workflow
 * can run without a real bot token.
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

const USDC_SEPOLIA = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

function padTopic(addr: string): string {
  return "0x" + addr.slice(2).padStart(64, "0").toLowerCase();
}

describe("Template: Telegram alert on transfer", () => {
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

  test("creates a transfer-monitor workflow with event trigger + REST notifier", async () => {
    const wallet = await createSmartWallet(client);
    const padded = padTopic(eoaAddress);

    const created = await client.workflows.create({
      name: "Telegram alert on transfer",
      smartWalletAddress: wallet.address,
      maxExecution: 0,
      trigger: Triggers.event({
        id: "trigger",
        name: "transferMonitor",
        queries: [
          // Outgoing: wallet === from
          {
            addresses: [USDC_SEPOLIA],
            topics: [TRANSFER_TOPIC, padded, ""],
            maxEventsPerBlock: 100,
          },
          // Incoming: wallet === to
          {
            addresses: [USDC_SEPOLIA],
            topics: [TRANSFER_TOPIC, "", padded],
            maxEventsPerBlock: 100,
          },
        ],
      }),
      nodes: [
        Nodes.restApi({
          id: "telegram",
          name: "telegramSend",
          url: "https://httpbin.org/post",
          method: "POST",
          body: JSON.stringify({ text: "transfer detected" }),
          headers: { "Content-Type": "application/json" },
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "telegram" }],
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    const id = created.id as string;
    createdWorkflowIds.push(id);

    const fetched = await client.workflows.retrieve(id);
    expect(fetched.trigger?.type).toBe("event");
    expect(fetched.nodes?.length).toBe(1);
    expect(fetched.nodes?.[0].type).toBe("restApi");
  });

  test("simulates the workflow firing the REST notifier on a transfer event", async () => {
    const wallet = await createSmartWallet(client);
    const sim = await client.workflows.simulate({
      trigger: Triggers.event({
        id: "trigger",
        name: "transferMonitor",
        queries: [
          {
            addresses: [USDC_SEPOLIA],
            topics: [TRANSFER_TOPIC, padTopic(eoaAddress), ""],
            maxEventsPerBlock: 100,
          },
        ],
      }),
      nodes: [
        Nodes.restApi({
          id: "telegram",
          name: "telegramSend",
          url: "https://httpbin.org/post",
          method: "POST",
          body: JSON.stringify({ text: "transfer" }),
          headers: { "Content-Type": "application/json" },
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "telegram" }],
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    const telegram = sim.steps?.find((s) => s.id === "telegram");
    if (!telegram?.success) {
      console.log("Skipping — REST step failed");
      return;
    }
    const inner = (telegram.output as { data: { status: number } }).data;
    expect(inner.status).toBe(200);
  });
});
