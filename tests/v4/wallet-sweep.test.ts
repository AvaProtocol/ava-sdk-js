import { Client, Tokens, type v4 } from "@avaprotocol/sdk-js";
import { MaxUint256 } from "ethers";
import { main } from "../../examples/wallet-sweep";
import {
  buildWalletSweepPreview,
  buildWalletSweepWorkflow,
  previewWalletSweep,
  simulateWalletSweep,
  SWEEP_CHAIN_ID,
  walletSweepPlanFromPreview,
} from "../../examples/workflows/wallet-sweep";

const OPTIONS = {
  source: "0x1111111111111111111111111111111111111111",
  destination: "0x2222222222222222222222222222222222222222",
};

function preview(
  amounts: unknown[] = ["1000000", "20000000000000000"],
): v4.Execution {
  return {
    id: "preview",
    workflowId: "",
    startAt: 1,
    status: "success",
    steps: amounts.map((balanceOf, index) => ({
      id: `balance${index}`,
      type: "contractRead",
      success: true,
      output: { data: { balanceOf } },
    })),
  };
}

function writeConfig(
  workflow: v4.SimulateWorkflowRequest,
): NonNullable<v4.ContractWriteNode["config"]> {
  const node = workflow.nodes.find((node) => node.type === "contractWrite");
  if (!node?.config) throw new Error("Expected the compiled write node");
  return node.config as NonNullable<v4.ContractWriteNode["config"]>;
}

describe("wallet sweep example (offline)", () => {
  test("reads only selected chain-catalog tokens from the selected source", () => {
    const workflow = buildWalletSweepPreview(OPTIONS);
    expect(workflow.trigger).toMatchObject({
      type: "manual",
      config: { data: {} },
    });
    expect(workflow.inputVariables).toMatchObject({
      settings: {
        name: expect.any(String),
        runner: OPTIONS.source,
        chain: "sepolia",
        chain_id: SWEEP_CHAIN_ID,
      },
    });
    expect(workflow.nodes.map((node) => node.type)).toEqual([
      "contractRead",
      "contractRead",
    ]);
    workflow.nodes.forEach((node, index) => {
      expect(node).toMatchObject({
        config: {
          chainId: SWEEP_CHAIN_ID,
          contractAddress: [
            Tokens.USDC[SWEEP_CHAIN_ID]!.address,
            Tokens.WETH[SWEEP_CHAIN_ID]!.address,
          ][index],
          methodCalls: [
            { methodName: "balanceOf", methodParams: [OPTIONS.source] },
          ],
        },
      });
    });
  });

  test("compiles different token amounts into one multi-target write, without approvals or a Loop", () => {
    const plan = walletSweepPlanFromPreview(OPTIONS, preview());
    const workflow = buildWalletSweepWorkflow(plan);
    expect(plan.transfers.map((row) => [row.symbol, row.amountWei])).toEqual([
      ["USDC", "1000000"],
      ["WETH", "20000000000000000"],
    ]);
    expect(
      workflow.nodes.filter((node) => node.type === "contractWrite"),
    ).toHaveLength(1);
    expect(workflow.nodes.some((node) => node.type === "loop")).toBe(false);
    expect(writeConfig(workflow).methodCalls).toEqual(
      plan.transfers.map((row) => ({
        methodName: "transfer",
        contractAddress: row.tokenAddress,
        methodParams: [OPTIONS.destination, row.amountWei],
      })),
    );
    expect(workflow.authorizationMode).toBe("report");
  });

  test("omits zero balances and never loses precision at uint256 scale", () => {
    const plan = walletSweepPlanFromPreview(
      OPTIONS,
      preview(["0", MaxUint256.toString()]),
    );
    expect(plan.zeroBalanceTokens).toEqual(["USDC"]);
    expect(plan.transfers).toHaveLength(1);
    expect(
      writeConfig(buildWalletSweepWorkflow(plan)).methodCalls?.[0]
        .methodParams?.[1],
    ).toBe(MaxUint256.toString());
  });

  test.each([
    undefined,
    null,
    false,
    "",
    "-1",
    "1.1",
    "1e18",
    Number.MAX_SAFE_INTEGER + 1,
    (MaxUint256 + 1n).toString(),
  ])("refuses an unavailable or imprecise balance: %p", (value) => {
    expect(() =>
      walletSweepPlanFromPreview(OPTIONS, preview([value, "1"])),
    ).toThrow();
  });

  test("refuses failed executions and missing/failed token reads instead of treating them as zero", () => {
    expect(() =>
      walletSweepPlanFromPreview(OPTIONS, { ...preview(), status: "failed" }),
    ).toThrow(/preview failed/);
    expect(() => walletSweepPlanFromPreview(OPTIONS, preview(["1"]))).toThrow(
      /WETH.*unavailable/,
    );
    const execution = preview();
    expect(() =>
      walletSweepPlanFromPreview(OPTIONS, {
        ...execution,
        steps: execution.steps?.map((step, index) => ({
          ...step,
          success: index !== 0,
        })),
      }),
    ).toThrow(/USDC.*unavailable/);
  });

  test.each([
    { destination: OPTIONS.source },
    { destination: "0x0000000000000000000000000000000000000000" },
    { source: "not-an-address" },
    { tokenSymbols: [] },
    { tokenSymbols: ["USDC", "usdc"] },
    { tokenSymbols: ["ETH"] },
    { tokenSymbols: ["0x3333333333333333333333333333333333333333"] },
  ])("refuses invalid inputs before a gateway request: %j", (overrides) => {
    expect(() =>
      buildWalletSweepPreview({ ...OPTIONS, ...overrides }),
    ).toThrow();
  });

  test("rejects cross-chain/catalog tampering and zero transfer amounts", () => {
    const plan = walletSweepPlanFromPreview(OPTIONS, preview());
    expect(() =>
      buildWalletSweepWorkflow({
        ...plan,
        chainId: 8453 as typeof SWEEP_CHAIN_ID,
      }),
    ).toThrow(/Sepolia/);
    for (const patch of [
      { tokenAddress: OPTIONS.destination },
      { decimals: 18 },
      { amountWei: "0" },
    ]) {
      expect(() =>
        buildWalletSweepWorkflow({
          ...plan,
          transfers: [{ ...plan.transfers[0], ...patch }, plan.transfers[1]],
        }),
      ).toThrow();
    }
  });

  test("the freshness check takes the stale branch when a balance changes", () => {
    const workflow = buildWalletSweepWorkflow(
      walletSweepPlanFromPreview(OPTIONS, preview()),
    );
    const snapshot = workflow.nodes.find(
      (node) => node.type === "customCode" && node.id === "snapshot",
    );
    if (!snapshot?.config || !("source" in snapshot.config))
      throw new Error("Expected snapshot check");
    const check = new Function("balance0", "balance1", snapshot.config.source);
    expect(
      check(
        { data: { balanceOf: "1000000" } },
        { data: { balanceOf: "20000000000000000" } },
      ),
    ).toEqual({ ready: true });
    expect(
      check(
        { data: { balanceOf: "1000001" } },
        { data: { balanceOf: "20000000000000000" } },
      ),
    ).toEqual({ ready: false });
    expect(workflow.edges).toContainEqual({
      id: "readyEdge",
      source: "check.ready",
      target: "transfer",
    });
    expect(workflow.edges).toContainEqual({
      id: "staleEdge",
      source: "check.stale",
      target: "stale",
    });
  });

  test("the SDK contract makes only two simulation requests and never creates/triggers/sends", async () => {
    const replies: v4.Execution[] = [
      preview(),
      {
        ...preview(),
        steps: [
          {
            id: "transfer",
            type: "contractWrite",
            success: true,
            metadata: {
              results: [
                {
                  success: true,
                  value: true,
                  receipt: { to: Tokens.USDC[SWEEP_CHAIN_ID]!.address },
                },
                {
                  success: true,
                  value: true,
                  receipt: { to: Tokens.WETH[SWEEP_CHAIN_ID]!.address },
                },
              ],
            },
          },
        ],
      },
    ];
    const requests: Array<{ url: string; body: v4.SimulateWorkflowRequest }> =
      [];
    const client = new Client({
      baseUrl: "http://gateway.invalid/api/v1",
      token: "test-token",
      fetchImpl: async (url, init) => {
        requests.push({
          url: String(url),
          body: JSON.parse(String(init?.body)),
        });
        return new Response(JSON.stringify(replies[requests.length - 1]), {
          headers: { "Content-Type": "application/json" },
        });
      },
    });
    const result = await simulateWalletSweep(client, OPTIONS);
    expect(result.execution.status).toBe("success");
    expect(requests.map((request) => request.url)).toEqual(
      Array(2).fill("http://gateway.invalid/api/v1/workflows:simulate"),
    );
    expect(writeConfig(requests[1].body).methodCalls).toHaveLength(2);
  });

  test("an empty preview does not create a write workflow or call a second simulation", async () => {
    const fetchImpl = jest.fn(
      async () => new Response(JSON.stringify(preview(["0", "0"]))),
    );
    const client = new Client({
      baseUrl: "http://gateway.invalid/api/v1",
      fetchImpl,
    });
    const result = await previewWalletSweep(client, OPTIONS);
    expect(result.workflow).toBeNull();
    expect(result.plan.transfers).toEqual([]);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  test("a failed transfer simulation is reported as a failure", async () => {
    const replies = [
      preview(),
      { ...preview(), status: "failed", error: "transfer reverted" },
    ];
    const fetchImpl = jest.fn(
      async () => new Response(JSON.stringify(replies.shift())),
    );
    const client = new Client({
      baseUrl: "http://gateway.invalid/api/v1",
      fetchImpl,
    });
    await expect(simulateWalletSweep(client, OPTIONS)).rejects.toThrow(
      /transfer reverted/,
    );
  });

  test.each([
    undefined,
    [],
    [{ success: true, value: true }],
    [
      { success: true, value: false },
      { success: true, value: true },
    ],
    [
      { success: true, value: true, receipt: { to: OPTIONS.destination } },
      { success: true, value: true },
    ],
  ])(
    "does not accept missing, false-return or mismatched per-token results: %p",
    async (results) => {
      const replies = [
        preview(),
        {
          ...preview(),
          steps: [
            {
              id: "transfer",
              type: "contractWrite",
              success: true,
              metadata: { results },
            },
          ],
        },
      ];
      const client = new Client({
        baseUrl: "http://gateway.invalid/api/v1",
        fetchImpl: async () => new Response(JSON.stringify(replies.shift())),
      });
      await expect(simulateWalletSweep(client, OPTIONS)).rejects.toThrow(
        /Sweep simulation/,
      );
    },
  );

  test("CLI help performs no requests, and execution flags are not accepted", async () => {
    const output = jest
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);
    try {
      await main(["--help"]);
      expect(output).toHaveBeenCalledWith(
        expect.stringContaining("Never deploys or sends"),
      );
      await expect(main(["--execute"])).rejects.toThrow(/Unknown option/);
    } finally {
      output.mockRestore();
    }
  });
});
