/**
 * Port of tests-v3-archive/nodes/contractWrite.test.ts (2219 lines).
 *
 * v3's giant test file came from re-asserting the same shape across
 * runNodeWithInputs / simulate / deploy+trigger. v4 keeps just one
 * happy-path per surface, since the response shape is uniform.
 *
 * v4 contractWrite always uses Tenderly under the hood for the
 * `nodes.run` and `workflows.simulate` paths — `is_simulated` is
 * always true. Real bundler submission only happens through
 * `workflows.trigger` against a funded wallet.
 *
 * Output shape:
 *   - `result.output.data.<methodName>` = method's decoded return
 *     value (bool for approve/transfer, struct for tuple returns).
 *   - `result.executionContext.is_simulated = true` for sim paths.
 *
 * The MA v2 salt-0 funded wallet + session grant is required for
 * the real deploy+trigger path. Simulation of `transfer` also uses
 * that wallet because Tenderly does not override ERC-20 balances.
 */

import { Chains, Client, Nodes, Protocols, Tokens, Triggers } from "@avaprotocol/sdk-js";

import {
  getCurrentBlockNumber,
  getSuiteClient,
  getFundedClient,
  getFundedWallet,
  getFundedFixture,
  assertUserOpTriggerOk,
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

  describe("nodes.run (Tenderly simulation)", () => {
    test("simulates an approve(spender, 0) call", async () => {
      const wallet = await createSmartWallet(client);
      const result = await client.nodes.run({
        node: Nodes.contractWrite({
          id: "w",
          name: "w",
          chainId: 11_155_111,
          contractAddress: USDC_SEPOLIA,
          contractAbi: ERC20_ABI,
          methodCalls: [{ methodName: "approve", methodParams: [eoaAddress, "0"] }],
        }),
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: Record<string, any> }).data;
      // ERC-20 approve returns bool; OZ-style returns true on success.
      expect(data.approve).toBe(true);
      const ctx = result.executionContext as Record<string, unknown>;
      expect(ctx.is_simulated).toBe(true);
    });

    test("simulates a transfer call against the funded wallet", async () => {
      // MA v2 salt-0 holds Sepolia USDC. A suite wallet (fresh salt /
      // isolated EOA) has none, and Tenderly does not override ERC-20
      // balances — transfer would revert with "amount exceeds balance".
      const { client: funded, owner } = await getFundedClient();
      const wallet = await getFundedWallet(funded);
      expect(wallet).toBeTruthy();
      const result = await funded.nodes.run({
        node: Nodes.contractWrite({
          id: "w",
          name: "w",
          chainId: 11_155_111,
          contractAddress: USDC_SEPOLIA,
          contractAbi: ERC20_ABI,
          methodCalls: [{ methodName: "transfer", methodParams: [owner, "1"] }],
        }),
        inputVariables: { settings: settingsFor(wallet!.address) },
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: Record<string, any> }).data;
      expect(data.transfer).toBe(true);
      expect((result.executionContext as Record<string, unknown>).is_simulated).toBe(true);
    });

    test("simulates multiple method calls in one node", async () => {
      const wallet = await createSmartWallet(client);
      const result = await client.nodes.run({
        node: Nodes.contractWrite({
          id: "w",
          name: "w",
          chainId: 11_155_111,
          contractAddress: USDC_SEPOLIA,
          contractAbi: ERC20_ABI,
          methodCalls: [
            { methodName: "approve", methodParams: [eoaAddress, "0"] },
            { methodName: "approve", methodParams: [eoaAddress, "0"] },
          ],
        }),
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(result.success).toBe(true);
      const data = (result.output as { data: Record<string, any> }).data;
      // Both calls were against the same method — engine keeps the
      // last result keyed by methodName.
      expect(data.approve).toBe(true);
    });

    test("rejects a method that doesn't exist in the ABI", async () => {
      const wallet = await createSmartWallet(client);
      const result = await client.nodes.run({
        node: Nodes.contractWrite({
          id: "w",
          name: "w",
          chainId: 11_155_111,
          contractAddress: USDC_SEPOLIA,
          contractAbi: ERC20_ABI,
          methodCalls: [{ methodName: "nonexistent", methodParams: [] }],
        }),
        inputVariables: { settings: settingsFor(wallet.address) },
      });
      expect(result.success).toBe(false);
      expect(typeof result.error).toBe("string");
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

      const trig = await funded.workflows.trigger(wfId, {
        triggerType: "block",
        triggerOutput: { blockNumber: blockNumber + 5 },
        isBlocking: true,
      });
      assertUserOpTriggerOk(trig, wallet.address);
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
