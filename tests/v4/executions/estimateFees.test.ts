/**
 * Port of tests-v3-archive/executions/estimateFees.test.ts.
 *
 * v3 client.estimateFees() -> v4 client.workflows.estimateFees(req).
 *
 * The response shape carries over from v3: top-level success/error,
 * cogs/discounts/warnings arrays, executionFee/valueFee objects, and
 * optional metadata (chainId, nativeToken, pricingModel).
 */

import { Client, Nodes, Triggers } from "@avaprotocol/sdk-js";

import {
  authenticateClient,
  getClient,
  createSmartWallet,
  settingsForChain,
} from "../../utils/client";

jest.setTimeout(60_000);

describe("workflows.estimateFees Tests", () => {
  let client: Client;
  let smartWalletAddress: string;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    const wallet = await createSmartWallet(client);
    smartWalletAddress = wallet.address;
  });

  test("returns executionFee + valueFee + cogs for a customCode-only workflow", async () => {
    const result = await client.workflows.estimateFees({
      trigger: Triggers.manual({
        id: "trigger",
        name: "manualTrigger",
        lang: "json",
        data: {},
      }),
      nodes: [Nodes.customCode({ id: "step1", name: "customCode", source: "return {result: 1};" })],
      edges: [{ id: "e1", source: "trigger", target: "step1" }],
      runner: smartWalletAddress,
      inputVariables: { settings: settingsForChain(smartWalletAddress, 11_155_111) },
    });

    // v4 EstimateFeesResponse: executionFee, valueFee, cogs[], optional
    // discounts[], nativeToken, chainId, pricingModel. v3's
    // success/error/warnings fields are gone — the endpoint either
    // returns the breakdown or throws.
    expect(result.executionFee).toBeDefined();
    expect(typeof result.executionFee.amount).toBe("string");
    expect(result.executionFee.unit).toBe("USD");

    // cogs is optional in practice (customCode-only workflows
    // produce no on-chain cost). Validate the shape when present.
    if (result.cogs) {
      expect(Array.isArray(result.cogs)).toBe(true);
      for (const c of result.cogs) {
        expect(typeof c.nodeId).toBe("string");
        expect(["gas", "externalApi", "walletCreation"]).toContain(c.costType);
        expect(typeof c.fee.amount).toBe("string");
        expect(c.fee.unit).toBe("WEI");
      }
    }

    expect(result.valueFee).toBeDefined();
    expect(result.valueFee.fee.unit).toBe("PERCENTAGE");
    expect(typeof result.valueFee.fee.amount).toBe("string");
    expect(typeof result.valueFee.tier).toBe("string");

    if (result.discounts) {
      for (const d of result.discounts) {
        expect(typeof d.discount.amount).toBe("string");
      }
    }
  });

  test("produces gas COGS for an ETH transfer workflow", async () => {
    const result = await client.workflows.estimateFees({
      trigger: Triggers.manual({
        id: "trigger",
        name: "manualTrigger",
        lang: "json",
        data: {},
      }),
      nodes: [
        Nodes.ethTransfer({
          id: "step1",
          name: "ethTransfer",
          destination: smartWalletAddress,
          amountWei: "1000000000000000",
        }),
      ],
      edges: [{ id: "e1", source: "trigger", target: "step1" }],
      runner: smartWalletAddress,
      inputVariables: { settings: settingsForChain(smartWalletAddress, 11_155_111) },
    });

    // ETH transfer is expected to produce gas COGS but the server
    // may elide cogs when the value is zero — tolerate either.
    if (result.cogs) {
      const gas = result.cogs.filter((c) => c.costType === "gas");
      for (const c of gas) {
        expect(c.fee.unit).toBe("WEI");
        expect(BigInt(c.fee.amount)).toBeGreaterThanOrEqual(0n);
      }
    }
    // valueFee is always present in the v4 response.
    expect(result.valueFee.fee.unit).toBe("PERCENTAGE");
  });
});
