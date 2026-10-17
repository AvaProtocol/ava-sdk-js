import { Chains, Nodes, Protocols, Tokens, Triggers } from "@avaprotocol/sdk-js";
import { ExecutionErrorCode } from "@avaprotocol/types";
import { getIsolatedClient, createSmartWallet, settingsForChain } from "../../utils/client";

jest.setTimeout(120_000);

describe("REST workflow write prerequisites", () => {
  test("a failed simulated approve skips the dependent write and keeps the report", async () => {
    const { client, owner } = await getIsolatedClient();
    const wallet = await createSmartWallet(client);
    const chainId = Chains.Sepolia;
    const pool = Protocols.aaveV3.pool[chainId]!;
    const execution = await client.workflows.simulate({
      trigger: Triggers.manual({ id: "trigger", name: "trigger", lang: "json", data: {} }),
      nodes: [
        // The Pool has no ERC-20 approve entrypoint: this deliberately reverts
        // in Tenderly without funding a wallet or submitting a transaction.
        Nodes.contractWrite({ id: "approve", name: "approve", chainId,
          contractAddress: pool, contractAbi: Protocols.erc20.approveAbi,
          methodCalls: [{ methodName: "approve", methodParams: [owner, "0"] }],
        }),
        Nodes.contractWrite({ id: "transfer", name: "transfer", chainId,
          contractAddress: Tokens.USDC[chainId]!.address, contractAbi: Protocols.erc20.transferAbi,
          methodCalls: [{ methodName: "transfer", methodParams: [owner, "0"] }],
        }),
        Nodes.customCode({ id: "report", name: "report", source: "return { message: 'Execution attempt recorded' };" }),
      ],
      edges: [
        { id: "e1", source: "trigger", target: "approve" },
        { id: "e2", source: "approve", target: "transfer" },
        { id: "e3", source: "transfer", target: "report" },
      ],
      inputVariables: { settings: settingsForChain(wallet.address, chainId) },
      authorizationMode: "report",
    });
    const approval = execution.steps?.find((step) => step.id === "approve");
    const transfer = execution.steps?.find((step) => step.id === "transfer");
    expect(execution.status).toBe("failed");
    expect(approval?.success).toBe(false);
    expect(approval?.error).toMatch(/revert/i);
    expect(approval?.metadata).toMatchObject({ results: expect.any(Array) });
    expect(transfer).toMatchObject({ success: false,
      errorCode: ExecutionErrorCode.WRITE_PREREQUISITE_FAILED,
      metadata: { skipped: true, prerequisiteNodeId: "approve", prerequisiteError: approval?.error },
    });
    expect(transfer?.error).toContain(approval?.error);
    expect(transfer?.gasUsed || "0").toBe("0");
    expect(execution.steps?.find((step) => step.id === "report")?.success).toBe(true);
  });
});
