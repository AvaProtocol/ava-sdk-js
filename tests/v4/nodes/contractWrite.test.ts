/**
 * Contract writes require complete workflows. Standalone requests are rejected
 * before execution; workflow simulation and deployed execution own the mode.
 */

import { Chains, Client, Nodes, Protocols, Tokens, Triggers } from "@avaprotocol/sdk-js";

import {
  getCurrentBlockNumber,
  getSuiteClient,
  getFundedFixture,
  triggerUserOpAndAssert,
  createSmartWallet,
  removeCreatedWorkflows,
  settingsFor,
} from "../../utils/client";
import { createFromTemplate } from "../../utils/templates";

jest.setTimeout(180_000);

// Sepolia USDC — long-lived ERC-20 fixture.
const USDC_SEPOLIA = Tokens.USDC[Chains.Sepolia]!.address;
const ERC20_ABI = [...Protocols.erc20.transferAbi, ...Protocols.erc20.approveAbi];

describe("ContractWrite Node Tests", () => {
  let client: Client;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  beforeAll(async () => {
    ({ client, owner: eoaAddress } = await getSuiteClient());
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdWorkflowIds.splice(0));
  });

  describe("nodes.run", () => {
    test.each([false, true])("rejects a standalone contract write (loop=%s)", async (loop) => {
      const action = Nodes.contractWrite({
          id: "w", name: "w", chainId: Chains.Sepolia,
          contractAddress: USDC_SEPOLIA, contractAbi: ERC20_ABI,
          methodCalls: [{ methodName: "approve", methodParams: [eoaAddress, "0"] }],
        });
      const node = loop
        ? Nodes.loop({ id: "loop", name: "loop", inputVariable: "{{items}}", runner: action })
        : action;
      await expect(client.nodes.run({ node })).rejects.toMatchObject({
        status: 400, message: expect.stringContaining("complete workflow"),
      });
    });
  });

  describe("workflows.simulate", () => {
    test("simulates an approve workflow step", async () => {
      const wallet = await createSmartWallet(client);
      const sim = await client.workflows.simulate({
        trigger: Triggers.cron({ id: "trigger", name: "cron", schedule: ["0 * * * *"] }),
        nodes: [
          Nodes.contractWrite({
            id: "w",
            name: "w",
            chainId: 11_155_111,
            contractAddress: USDC_SEPOLIA,
            contractAbi: ERC20_ABI,
            methodCalls: [{ methodName: "approve", methodParams: [eoaAddress, "0"] }],
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "w" }],
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      const step = sim.steps?.find((s) => s.id === "w");
      expect(step?.success).toBe(true);
      const data = (step?.output as { data: Record<string, any> }).data;
      expect(data.approve).toBe(true);
      expect(step?.executionContext?.is_simulated).toBe(true);
    });
  });

  describe("deploy + trigger (real bundler round-trip)", () => {
    let funded: Client;
    let fundedOwner: string;
    let wallet: Awaited<ReturnType<typeof getFundedFixture>>["wallet"];
    const fundedWorkflowIds: string[] = [];

    beforeAll(async () => {
      ({ client: funded, owner: fundedOwner, wallet } = await getFundedFixture());
    });

    afterEach(async () => {
      await removeCreatedWorkflows(funded, fundedWorkflowIds.splice(0));
    });

    test("submits an approve through a block-triggered workflow", async () => {
      if (!process.env.CHAIN_ENDPOINT) {
        console.log("Skipping — CHAIN_ENDPOINT not set");
        return;
      }
      const blockNumber = await getCurrentBlockNumber();

      const wfReq = {
        ...createFromTemplate(wallet.address),
        maxExecution: 10,
        trigger: Triggers.block({
          id: "trigger",
          name: "blockTrigger",
          chainId: 11_155_111,
          interval: 5,
        }),
        nodes: [
          Nodes.contractWrite({
            id: "w",
            name: "w",
            chainId: 11_155_111,
            contractAddress: USDC_SEPOLIA,
            contractAbi: ERC20_ABI,
            methodCalls: [{ methodName: "approve", methodParams: [fundedOwner, "0"] }],
          }),
        ],
        edges: [{ id: "e1", source: "trigger", target: "w" }],
      };
      const created = await funded.workflows.create(wfReq);
      const wfId = created.id as string;
      fundedWorkflowIds.push(wfId);

      const trig = await triggerUserOpAndAssert(
        funded,
        wfId,
        {
          triggerType: "block",
          triggerOutput: { blockNumber: blockNumber + 5 },
          isBlocking: true,
        },
        wallet.address,
      );
      const exec = await funded.executions.retrieve(trig.executionId, { workflowId: wfId });
      const step = exec.steps?.find((s) => s.id === "w");
      expect(step?.success).toBe(true);
      // After real submission, approve still returns true. The
      // transaction hash lives on step.metadata (each step has one).
      const data = (step?.output as { data: Record<string, any> }).data;
      expect(data.approve).toBe(true);
    });
  });
});
