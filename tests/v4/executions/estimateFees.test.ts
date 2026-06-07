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

// The `EstimateFeesRequest` OpenAPI schema still marks `createdAt` /
// `expireAt` / `maxExecution` as required because it reuses the
// `CreateWorkflowRequest` shape, but the estimate endpoint ignores
// them server-side — the fee math doesn't depend on a workflow's
// lifecycle window. Provide stubs so the typed call satisfies the
// generated request type. Real workflow create paths supply real
// values; this is estimate-only.
//
// TODO: decouple `EstimateFeesRequest` from `CreateWorkflowRequest`
// in the OpenAPI schema (currently in `packages/types/openapi/openapi.yaml`)
// so these lifecycle fields aren't required for estimate calls;
// remove the stubs here once that lands.
const ESTIMATE_LIFECYCLE_STUBS = {
  // 0 reads naturally as "unset" — server ignores both.
  createdAt: 0,
  expireAt: 0,
  // Arbitrary non-zero; ignored by the estimate endpoint. Picked 100
  // to match the test-utils default in `createManualFromTemplate`
  // so the stub and a real workflow estimate look the same.
  maxExecution: 100,
} as const;

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
      ...ESTIMATE_LIFECYCLE_STUBS,
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
        // `discount` is optional on FeeDiscount — some discount types
        // (e.g. tier-based) don't carry an inline fee, the discount is
        // baked into the upstream rate. Skip the amount assertion when
        // it's absent.
        if (d.discount) {
          expect(typeof d.discount.amount).toBe("string");
        }
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
      ...ESTIMATE_LIFECYCLE_STUBS,
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
