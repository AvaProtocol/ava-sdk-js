import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import { TriggerType, NodeType, Lang } from "@avaprotocol/types";
import {
  TIMEOUT_DURATION,
  getNextId,
  getSmartWallet,
  getClient,
  authenticateClient,
} from "../utils/utils";

jest.setTimeout(TIMEOUT_DURATION);

describe("EstimateFees", () => {
  let client: Client;
  let smartWalletAddress: string;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    const wallet = await getSmartWallet(client);
    smartWalletAddress = wallet.address;
  });

  test("should return fee estimation with correct structure for a simple workflow", async () => {
    const triggerId = getNextId();
    const nodeId = getNextId();

    const result = await client.estimateFees({
      trigger: {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: {},
      },
      nodes: [
        {
          id: nodeId,
          name: "customCode",
          type: NodeType.CustomCode,
          data: {
            lang: Lang.JavaScript,
            source: "return { result: 1 };",
          },
        },
      ],
      runner: smartWalletAddress,
      inputVariables: {
        settings: {
          name: "Fee Estimation Test",
          runner: smartWalletAddress,
          chain: "sepolia",
        },
      },
      createdAt: Date.now(),
      expireAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    // Top-level response fields
    expect(typeof result.success).toBe("boolean");
    expect(result).toHaveProperty("cogs");
    expect(Array.isArray(result.cogs)).toBe(true);
    expect(result).toHaveProperty("discounts");
    expect(Array.isArray(result.discounts)).toBe(true);
    expect(result).toHaveProperty("warnings");
    expect(Array.isArray(result.warnings)).toBe(true);

    if (!result.success) {
      expect(typeof result.error).toBe("string");
      return;
    }

    // executionFee should be a Fee with USD unit
    expect(result.executionFee).toBeDefined();
    expect(typeof result.executionFee!.amount).toBe("string");
    expect(result.executionFee!.unit).toBe("USD");

    // cogs entries should have correct shape
    for (const cogs of result.cogs) {
      expect(typeof cogs.nodeId).toBe("string");
      expect(typeof cogs.costType).toBe("string");
      expect(cogs.fee).toBeDefined();
      expect(typeof cogs.fee.amount).toBe("string");
      expect(cogs.fee.unit).toBe("WEI");
    }

    // valueFee when present
    if (result.valueFee) {
      expect(result.valueFee.fee).toBeDefined();
      expect(typeof result.valueFee.fee.amount).toBe("string");
      expect(result.valueFee.fee.unit).toBe("PERCENTAGE");
      expect(typeof result.valueFee.tier).toBe("string");
      expect(typeof result.valueFee.classificationMethod).toBe("string");
      expect(typeof result.valueFee.confidence).toBe("number");
      expect(typeof result.valueFee.reason).toBe("string");
    }

    // discounts entries when present
    for (const discount of result.discounts) {
      expect(typeof discount.discountType).toBe("string");
      expect(typeof discount.discountName).toBe("string");
      expect(discount.discount).toBeDefined();
      expect(typeof discount.discount.amount).toBe("string");
      expect(typeof discount.discount.unit).toBe("string");
    }

    // optional metadata fields
    if (result.chainId) {
      expect(typeof result.chainId).toBe("string");
    }
    if (result.nativeToken) {
      expect(typeof result.nativeToken.symbol).toBe("string");
      expect(typeof result.nativeToken.decimals).toBe("number");
    }
    if (result.pricingModel) {
      expect(typeof result.pricingModel).toBe("string");
    }
  });

  test("should return fee estimation for a workflow with ETH transfer node", async () => {
    const triggerId = getNextId();
    const nodeId = getNextId();

    const result = await client.estimateFees({
      trigger: {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: {},
      },
      nodes: [
        {
          id: nodeId,
          name: "ethTransfer",
          type: NodeType.ETHTransfer,
          data: {
            destination: smartWalletAddress,
            amount: "1000000000000000",
          },
        },
      ],
      runner: smartWalletAddress,
      inputVariables: {
        settings: {
          name: "ETH Transfer Fee Test",
          runner: smartWalletAddress,
          chain: "sepolia",
        },
      },
      createdAt: Date.now(),
      expireAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    expect(typeof result.success).toBe("boolean");
    expect(Array.isArray(result.cogs)).toBe(true);
    expect(Array.isArray(result.discounts)).toBe(true);
    expect(Array.isArray(result.warnings)).toBe(true);

    if (result.success) {
      // ETH transfer should produce gas COGS
      if (result.cogs.length > 0) {
        const gasCogs = result.cogs.filter((c) => c.costType === "gas");
        expect(gasCogs.length).toBeGreaterThan(0);
        for (const cogs of gasCogs) {
          expect(cogs.fee.unit).toBe("WEI");
          expect(BigInt(cogs.fee.amount)).toBeGreaterThanOrEqual(BigInt(0));
        }
      }

      // valueFee should indicate on-chain execution
      if (result.valueFee) {
        expect(result.valueFee.fee.unit).toBe("PERCENTAGE");
        expect(typeof result.valueFee.tier).toBe("string");
      }
    }
  });
});
