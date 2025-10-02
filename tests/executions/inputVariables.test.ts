import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {
  TriggerType,
  NodeType,
  CustomCodeLang,
  ExecutionStatus,
} from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  TIMEOUT_DURATION,
  getNextId,
  SaltGlobal,
  SALT_BUCKET_SIZE,
  getSettings,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
import util from "util";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey } = getConfig();

describe("Input Variables", () => {
  let eoaAddress: string;
  let client: Client;
  let saltIndex = SaltGlobal.SimulateWorkflow * SALT_BUCKET_SIZE;

  beforeAll(async () => {
    eoaAddress = await getAddress(walletPrivateKey);
    client = new Client({
      endpoint: avsEndpoint,
    });

    const { message } = await client.getSignatureFormat(eoaAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);
  });

  describe("Workflow Creation with Input Variables", () => {
    test("should create workflow with input variables", async () => {
      const workflow = client.createWorkflow({
        smartWalletAddress: "0x742d35Cc6634C0532925a3b8D091D2B5e57a9C7e",
        trigger: {
          id: "trigger1",
          name: "manualTrigger",
          type: TriggerType.Manual,
          data: { test: "data" },
        },
        nodes: [
          {
            id: "testNode1",
            type: NodeType.CustomCode,
            name: "testNode",
            data: {
              lang: CustomCodeLang.JavaScript,
              source: "return { userToken: userToken, amount: amount };",
            },
          },
        ],
        edges: [{ id: "edge1", source: "trigger1", target: "testNode1" }],
        startAt: Date.now(),
        expiredAt: Date.now() + 86400000,
        maxExecution: 1,
        inputVariables: {
          userToken: "0x1234567890abcdef",
          amount: 1000000,
        },
      });

      expect(workflow).toBeDefined();
      expect(workflow.inputVariables).toEqual({
        userToken: "0x1234567890abcdef",
        amount: 1000000,
      });
    });

    test("should handle workflow without input variables", async () => {
      const workflow = client.createWorkflow({
        smartWalletAddress: "0x742d35Cc6634C0532925a3b8D091D2B5e57a9C7e",
        trigger: {
          id: "trigger2",
          name: "manualTrigger",
          type: TriggerType.Manual,
          data: { test: "data" },
        },
        nodes: [
          {
            id: "simpleNode1",
            type: NodeType.CustomCode,
            name: "simpleNode",
            data: {
              lang: CustomCodeLang.JavaScript,
              source: "return { message: 'No input variables needed' };",
            },
          },
        ],
        edges: [{ id: "edge2", source: "trigger2", target: "simpleNode1" }],
        startAt: Date.now(),
        expiredAt: Date.now() + 86400000,
        maxExecution: 1,
        // No inputVariables provided
      });

      expect(workflow).toBeDefined();
      expect(workflow.inputVariables).toBeUndefined();
    });
  });

  describe("simulateWorkflow with Input Variables", () => {
    test("should execute workflow with input variables", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: { test: "trigger data" },
      };

      const nodes = [
        {
          id: nodeId,
          name: "inputVariableTest",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source: `
              // Test that input variables are accessible
              return {
                userToken: userToken,
                amount: amount,
                recipient: recipient,
                isEnabled: isEnabled,
                message: "Input variables work!"
              };
            `,
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      const wallet = await client.getWallet({ salt: String(saltIndex++) });

      const inputVariables = {
        userToken: "0x1234567890abcdef",
        amount: 1000000,
        recipient: "0x742d35Cc6634C0532925a3b8D091D2B5e57a9C7e",
        isEnabled: true,
        settings: getSettings(wallet.address),
      };

      const params = {
        trigger,
        nodes,
        edges,
        inputVariables,
      };

      console.log(
        "📤 simulateWorkflow params:",
        util.inspect(params, { depth: 3 })
      );

      const execution = await client.simulateWorkflow(params);

      console.log(
        "📥 simulateWorkflow response:",
        util.inspect(execution, { depth: 3 })
      );

      expect(execution).toBeDefined();
      expect(execution.status).toBe(ExecutionStatus.Success);
      expect(execution.steps).toHaveLength(2); // trigger + custom code

      // Find the custom code step
      const customCodeStep = execution.steps.find(
        (step) => step.name === "inputVariableTest"
      );
      expect(customCodeStep).toBeDefined();
      expect(customCodeStep!.success).toBe(true);
      expect(customCodeStep!.error).toBe("");

      // Verify the output contains values from input variables
      expect(customCodeStep!.output).toBeDefined();
      const output = customCodeStep!.output as Record<string, unknown>;
      expect(output.userToken).toBe("0x1234567890abcdef");
      expect(output.amount).toBe(1000000);
      expect(output.recipient).toBe(
        "0x742d35Cc6634C0532925a3b8D091D2B5e57a9C7e"
      );
      expect(output.isEnabled).toBe(true);
      expect(output.message).toBe("Input variables work!");
    });

    test("should handle complex object input variables", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: { test: "trigger data" },
      };

      const nodes = [
        {
          id: nodeId,
          name: "complexObjectTest",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source: `
              return {
                routerAddress: swapConfig.routerAddress,
                amountIn: swapConfig.amountIn,
                tokenA: swapConfig.path[0],
                tokenB: swapConfig.path[1],
                pathLength: swapConfig.path.length,
                recipient: userConfig.recipient,
                complexObjectsWork: true
              };
            `,
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      const wallet = await client.getWallet({ salt: String(saltIndex++) });

      const inputVariables = {
        swapConfig: {
          routerAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
          amountIn: "1000000000000000000",
          amountOutMin: "0",
          path: [
            "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "0xA0b86a33E6441e4EF45bAcfCaAd5C7f899342E38",
          ],
        },
        userConfig: {
          recipient: "0x742d35Cc6634C0532925a3b8D091D2B5e57a9C7e",
          deadline: Math.floor(Date.now() / 1000) + 1800,
        },
        settings: getSettings(wallet.address),
      };

      const params = {
        trigger,
        nodes,
        edges,
        inputVariables,
      };

      console.log(
        "📤 Complex objects params:",
        util.inspect(params, { depth: 4 })
      );

      const execution = await client.simulateWorkflow(params);

      console.log(
        "📥 Complex objects response:",
        util.inspect(execution, { depth: 3 })
      );

      expect(execution).toBeDefined();
      expect(execution.status).toBe(ExecutionStatus.Success);

      const customCodeStep = execution.steps.find(
        (step) => step.name === "complexObjectTest"
      );
      expect(customCodeStep).toBeDefined();
      expect(customCodeStep!.success).toBe(true);

      const output = customCodeStep!.output as Record<string, unknown>;
      expect(output.routerAddress).toBe(
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
      );
      expect(output.amountIn).toBe("1000000000000000000");
      expect(output.tokenA).toBe("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
      expect(output.tokenB).toBe("0xA0b86a33E6441e4EF45bAcfCaAd5C7f899342E38");
      expect(output.pathLength).toBe(2);
      expect(output.recipient).toBe(
        "0x742d35Cc6634C0532925a3b8D091D2B5e57a9C7e"
      );
      expect(output.complexObjectsWork).toBe(true);
    });

    test("should demonstrate input variable usage patterns", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: { test: "trigger data" },
      };

      const nodes = [
        {
          id: nodeId,
          name: "usageExamples",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLang.JavaScript,
            source: `
              // HOW TO REFERENCE INPUT VARIABLES IN NODES:
              
              // 1. Simple variables - direct access
              const contract = tokenContract;
              const amount = transferAmount;
              const gas = gasLimit;
              
              // 2. Object properties - dot notation
              const router = swapConfig.routerAddress;
              const amountIn = swapConfig.amountIn;
              
              // 3. Array elements - bracket notation
              const tokenA = swapConfig.path[0];
              const tokenB = swapConfig.path[1];
              
              // 4. Nested object properties
              const slippage = userConfig.slippage;
              const deadline = userConfig.deadline;
              
              return {
                contract: contract,
                amount: amount,
                gasLimit: gas,
                routerAddress: router,
                amountIn: amountIn,
                firstToken: tokenA,
                secondToken: tokenB,
                slippage: slippage,
                deadline: deadline,
                message: "All input variable patterns work!"
              };
            `,
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      const wallet = await client.getWallet({ salt: String(saltIndex++) });

      const inputVariables = {
        tokenContract: "0xA0b86a33E6441e4EF45bAcfCaAd5C7f899342E38",
        transferAmount: "1000000",
        gasLimit: 200000,
        swapConfig: {
          routerAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
          amountIn: "1000000000000000000",
          path: [
            "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "0xA0b86a33E6441e4EF45bAcfCaAd5C7f899342E38",
          ],
        },
        userConfig: {
          slippage: 0.5,
          deadline: 1703123400,
        },
        settings: getSettings(wallet.address),
      };

      const params = {
        trigger,
        nodes,
        edges,
        inputVariables,
      };

      console.log(
        "📤 Usage examples params:",
        util.inspect(params, { depth: 4 })
      );

      const execution = await client.simulateWorkflow(params);

      console.log(
        "📥 Usage examples response:",
        util.inspect(execution, { depth: 3 })
      );

      expect(execution).toBeDefined();
      expect(execution.status).toBe(ExecutionStatus.Success);

      const exampleStep = execution.steps.find(
        (step) => step.name === "usageExamples"
      );
      expect(exampleStep).toBeDefined();
      expect(exampleStep!.success).toBe(true);

      const output = exampleStep!.output as Record<string, unknown>;

      // Verify simple variables
      expect(output.contract).toBe(
        "0xA0b86a33E6441e4EF45bAcfCaAd5C7f899342E38"
      );
      expect(output.amount).toBe("1000000");
      expect(output.gasLimit).toBe(200000);

      // Verify object properties
      expect(output.routerAddress).toBe(
        "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
      );
      expect(output.amountIn).toBe("1000000000000000000");

      // Verify array elements
      expect(output.firstToken).toBe(
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
      );
      expect(output.secondToken).toBe(
        "0xA0b86a33E6441e4EF45bAcfCaAd5C7f899342E38"
      );

      // Verify nested object properties
      expect(output.slippage).toBe(0.5);
      expect(output.deadline).toBe(1703123400);

      // Verify success message
      expect(output.message).toBe("All input variable patterns work!");

      console.log(
        "✅ Input variable usage examples test completed successfully"
      );
    });
  });
});
