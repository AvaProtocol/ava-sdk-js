/**
 * Port of tests-v3-archive/workflows/createWorkflow.test.ts.
 *
 * v3 used `client.createWorkflow()` to instantiate a Workflow class
 * and `client.submitWorkflow()` to push it; v4 has a single
 * `client.workflows.create(req)` that returns the persisted record.
 *
 * v3's `compareResults` deep-equality helper is reimplemented inline
 * as a couple of targeted assertions — the v4 wire format is well-
 * defined so we no longer need the loose compare logic.
 */

import { Client, Nodes, Triggers, type v4 } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  getEOAAddress,
  getSmartWallet,
  removeCreatedWorkflows,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(60_000);

const USDC = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const WETH = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
const TRANSFER_SIG = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

function padTopic(addr: string): string {
  return "0x" + addr.slice(2).padStart(64, "0").toLowerCase();
}

describe("createWorkflow Tests", () => {
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

  test("creates a workflow with a block trigger", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      trigger: Triggers.block({ id: "trigger", name: "blockTrigger", interval: 5 }),
    });
    expect(typeof created.id).toBe("string");
    expect((created.id as string).length).toBe(26);
    createdWorkflowIds.push(created.id as string);
  });

  test("rejects creating a workflow with the EOA address as smartWalletAddress", async () => {
    await expect(
      client.workflows.create(createFromTemplate(eoaAddress)),
    ).rejects.toMatchObject({ status: 400 });
  });

  test("creates a workflow with a cron trigger and round-trips through retrieve", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      trigger: Triggers.cron({
        id: "trigger",
        name: "cronTrigger",
        schedule: ["5 4 * * *", "5 0 * 8 *"],
      }),
    });
    createdWorkflowIds.push(created.id as string);
    const fetched = await client.workflows.retrieve(created.id as string);
    expect(fetched.id).toBe(created.id);
    expect(fetched.trigger?.type).toBe("cron");
    expect(fetched.smartWalletAddress?.toLowerCase()).toBe(wallet.address.toLowerCase());
  });

  test("creates a workflow with a fixedTime trigger", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      trigger: Triggers.fixedTime({
        id: "trigger",
        name: "fixedTimeTrigger",
        epochsMs: [10, 20, 30],
      }),
    });
    createdWorkflowIds.push(created.id as string);
    const fetched = await client.workflows.retrieve(created.id as string);
    expect(fetched.trigger?.type).toBe("fixedTime");
  });

  test("creates a workflow with an event trigger filtered by wallet address", async () => {
    const wallet = await getSmartWallet(client);
    const branch = Nodes.branch({
      id: "branchCheckTokenAmount",
      name: "branchCheckTokenAmount",
      conditions: [
        {
          id: "c1",
          type: "if",
          expression: 'eventTrigger.data.address == "' + USDC.toLowerCase() + '"',
        },
      ],
    });
    const notify = Nodes.restApi({
      id: "notification",
      name: "notification",
      url: "http://localhost:19876/post",
      method: "POST",
      body: "{}",
      headers: { "content-type": "application/json" },
    });

    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      trigger: Triggers.event({
        id: "trigger",
        name: "eventTrigger",
        queries: [
          {
            addresses: [WETH, USDC],
            topics: [TRANSFER_SIG, "", padTopic(wallet.address)],
            maxEventsPerBlock: 100,
          },
        ],
      }),
      nodes: [branch, notify],
      edges: [
        { id: "e1", source: "trigger", target: "branchCheckTokenAmount" },
        { id: "e2", source: "branchCheckTokenAmount.c1", target: "notification" },
      ],
    });
    createdWorkflowIds.push(created.id as string);
    expect(created.status).toBe("enabled");
    const fetched = await client.workflows.retrieve(created.id as string);
    expect(fetched.trigger?.type).toBe("event");
    expect(fetched.nodes?.length).toBe(2);
    expect(fetched.edges?.length).toBe(2);
  });

  test("creates a workflow with a block trigger and large interval", async () => {
    const wallet = await getSmartWallet(client);
    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      trigger: Triggers.block({
        id: "trigger",
        name: "blockTrigger",
        interval: 102,
      }),
    });
    createdWorkflowIds.push(created.id as string);
    const fetched = await client.workflows.retrieve(created.id as string);
    expect(fetched.trigger?.type).toBe("block");
  });

  test("creates a complex workflow with multiple nodes + branch + edges", async () => {
    const wallet = await getSmartWallet(client);
    const dataNode = Nodes.customCode({
      id: "data",
      name: "data",
      source: "return { items: [1, 2, 3] };",
    });
    const branch = Nodes.branch({
      id: "branch",
      name: "branch",
      conditions: [
        { id: "on", type: "if", expression: "true" },
        { id: "off", type: "else", expression: "" },
      ],
    });
    const trueBranch = Nodes.customCode({
      id: "trueBranch",
      name: "trueBranch",
      source: "return { took: 'true' };",
    });
    const falseBranch = Nodes.customCode({
      id: "falseBranch",
      name: "falseBranch",
      source: "return { took: 'false' };",
    });

    const created = await client.workflows.create({
      ...createFromTemplate(wallet.address),
      trigger: Triggers.cron({
        id: "trigger",
        name: "cron",
        schedule: ["0 * * * *"],
      }),
      nodes: [dataNode, branch, trueBranch, falseBranch],
      edges: [
        { id: "e1", source: "trigger", target: "data" },
        { id: "e2", source: "data", target: "branch" },
        { id: "e3", source: "branch.on", target: "trueBranch" },
        { id: "e4", source: "branch.off", target: "falseBranch" },
      ],
    } as v4.CreateWorkflowRequest);
    createdWorkflowIds.push(created.id as string);
    expect(created.status).toBe("enabled");
    const fetched = await client.workflows.retrieve(created.id as string);
    expect(fetched.nodes?.length).toBe(4);
    expect(fetched.edges?.length).toBe(4);
  });
});
