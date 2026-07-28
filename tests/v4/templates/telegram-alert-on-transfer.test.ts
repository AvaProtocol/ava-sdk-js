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

import { Chains, Client, Nodes, Protocols, Tokens, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";
import { startStubServerFor, type StubServer } from "../../utils/stubServer";

jest.setTimeout(60_000);

const USDC_SEPOLIA = Tokens.USDC[Chains.Sepolia]!.address;
const TRANSFER_TOPIC = Protocols.erc20.eventTopics.Transfer;

function padTopic(addr: string): string {
  return "0x" + addr.slice(2).padStart(64, "0").toLowerCase();
}

/** Local stand-in for httpbin — see tests/utils/stubServer.ts. */
let STUB = "";
let stub: StubServer;

describe("Template: Telegram alert on transfer", () => {
  let client: Client;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    eoaAddress = getEOAAddress();

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

  test("creates a transfer-monitor workflow with event trigger + REST notifier", async () => {
    const wallet = await createSmartWallet(client);
    const padded = padTopic(eoaAddress);

    const created = await client.workflows.create({
      name: "Telegram alert on transfer",
      smartWalletAddress: wallet.address,
      // An event trigger fires at whatever rate the chain produces matching
      // logs, so the gateway's execution cap is its only static bound. 0 used
      // to mean unlimited and is now rejected — pass an explicit budget.
      maxExecution: 10,
      trigger: Triggers.event({
        id: "trigger",
        name: "transferMonitor",
        chainId: 11_155_111,
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
          url: `${STUB}/post`,
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
        chainId: 11_155_111,
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
          url: `${STUB}/post`,
          method: "POST",
          body: JSON.stringify({ text: "transfer" }),
          headers: { "Content-Type": "application/json" },
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "telegram" }],
      inputVariables: { settings: settingsFor(wallet.address) },
    });
    // No skip: the notifier points at the local stub, so a failure here is a
    // real regression rather than a third party having a bad day.
    const telegram = sim.steps?.find((s) => s.id === "telegram");
    expect(telegram?.success).toBe(true);
    const inner = (telegram!.output as { data: { status: number } }).data;
    expect(inner.status).toBe(200);
  });
});
