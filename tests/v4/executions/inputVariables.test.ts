/**
 * Port of tests-v3-archive/executions/inputVariables.test.ts.
 *
 * Workflow creation tests confirm inputVariables round-trips through
 * the create + retrieve API; simulation tests confirm the runner can
 * access them as named globals.
 */

import { Chains, Client, Nodes, Protocols, Tokens, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";

jest.setTimeout(60_000);

describe("Input Variables", () => {
  let client: Client;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("Workflow Creation with Input Variables", () => {
    test("create+retrieve round-trips inputVariables", async () => {
      const wallet = await createSmartWallet(client);
      const created = await client.workflows.create({
        name: "Input Variables Test Workflow",
        smartWalletAddress: wallet.address,
        startAt: Date.now(),
        maxExecution: 1,
        trigger: Triggers.manual({
          id: "trigger",
          name: "manualTrigger",
          lang: "json",
          data: { test: "data" },
        }),
        nodes: [
          Nodes.customCode({
            id: "step1",
            name: "testNode",
            source: "return { userToken, amount };",
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: {
          settings: settingsFor(wallet.address, "Input Variables Test Workflow"),
          userToken: "0x1234567890abcdef",
          amount: 1000000,
        },
      });
      const id = created.id as string;
      createdWorkflowIds.push(id);

      const fetched = await client.workflows.retrieve(id);
      expect(fetched.inputVariables?.userToken).toBe("0x1234567890abcdef");
      expect(fetched.inputVariables?.amount).toBe(1000000);
      expect(fetched.inputVariables?.settings).toBeDefined();
    });

    test("settings-only workflows round-trip cleanly", async () => {
      const wallet = await createSmartWallet(client);
      const created = await client.workflows.create({
        name: "Settings Only",
        smartWalletAddress: wallet.address,
        startAt: Date.now(),
        maxExecution: 1,
        trigger: Triggers.manual({
          id: "trigger",
          name: "manualTrigger",
          lang: "json",
          data: { test: "data" },
        }),
        nodes: [
          Nodes.customCode({
            id: "step1",
            name: "simpleNode",
            source: "return { ok: true };",
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: { settings: settingsFor(wallet.address, "Settings Only") },
      });
      const id = created.id as string;
      createdWorkflowIds.push(id);

      const fetched = await client.workflows.retrieve(id);
      expect(fetched.inputVariables?.settings).toBeDefined();
    });
  });

  describe("simulateWorkflow with Input Variables", () => {
    test("scalars + primitives are accessible to the runner", async () => {
      const wallet = await createSmartWallet(client);
      const sim = await client.workflows.simulate({
        trigger: Triggers.manual({
          id: "trigger",
          name: "manualTrigger",
          lang: "json",
          data: { test: "trigger data" },
        }),
        nodes: [
          Nodes.customCode({
            id: "step1",
            name: "inputVariableTest",
            source: `return {
              userToken: userToken,
              amount: amount,
              recipient: recipient,
              isEnabled: isEnabled,
              message: "Input variables work!"
            };`,
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: {
          userToken: "0x1234567890abcdef",
          amount: 1000000,
          recipient: "0x742d35Cc6634C0532925a3b8D091D2B5e57a9C7e",
          isEnabled: true,
          settings: settingsFor(wallet.address),
        },
      });
      expect(sim.status).toBe("success");
      const step = sim.steps?.find((s) => s.name === "inputVariableTest");
      expect(step?.success).toBe(true);
      const out = (step?.output as { data: any }).data;
      expect(out.userToken).toBe("0x1234567890abcdef");
      expect(out.amount).toBe(1000000);
      expect(out.recipient).toBe("0x742d35Cc6634C0532925a3b8D091D2B5e57a9C7e");
      expect(out.isEnabled).toBe(true);
      expect(out.message).toBe("Input variables work!");
    });

    test("nested object input variables preserve structure", async () => {
      const wallet = await createSmartWallet(client);
      const swapConfig = {
        routerAddress: Protocols.uniswapV3.swapRouter02[Chains.Sepolia]!,
        amountIn: "1000000000000000000",
        tokenIn: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // native-ETH sentinel
        tokenOut: Tokens.USDC[Chains.Sepolia]!.address,
      };
      const sim = await client.workflows.simulate({
        trigger: Triggers.manual({
          id: "trigger",
          name: "manualTrigger",
          lang: "json",
          data: { test: "trigger data" },
        }),
        nodes: [
          Nodes.customCode({
            id: "step1",
            name: "complexObjectTest",
            source: "return swapConfig;",
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "step1" }],
        inputVariables: {
          swapConfig,
          settings: settingsFor(wallet.address),
        },
      });
      const step = sim.steps?.find((s) => s.id === "step1");
      const out = (step?.output as { data: any }).data;
      expect(out).toEqual(swapConfig);
    });
  });
});
