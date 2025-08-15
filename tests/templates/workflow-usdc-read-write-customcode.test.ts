import { describe, test, expect, beforeAll } from "@jest/globals";
import { Client, TriggerFactory, NodeFactory, Edge } from "@avaprotocol/sdk-js";
import { TriggerType, NodeType, CustomCodeLang } from "@avaprotocol/types";
import util from "util";
import { getConfig } from "../utils/envalid";
import {
  getAddress,
  generateSignature,
  getNextId,
  TIMEOUT_DURATION,
  USDC_Implementation_ABI,
} from "../utils/utils";

/**
 * Replicates the workflow from @workflow-clean.log to validate that
 * both contractRead nodes (symbol/decimals) execute and their outputs are
 * available to the CustomCode node. This guards against the regression where
 * one read node is pruned/deduped and CustomCode throws due to missing input.
 */

const { avsEndpoint, walletPrivateKey, tokens } = getConfig();

// Set timeout to 180 seconds for all tests in this file (deployed workflows need more time)
jest.setTimeout(TIMEOUT_DURATION * 3); // 3 * 60 seconds = 180 seconds

let client: Client;
let eoaAddress: string;

beforeAll(async () => {
  eoaAddress = await getAddress(walletPrivateKey);

  client = new Client({ endpoint: avsEndpoint });
  const { message } = await client.getSignatureFormat(eoaAddress);
  const signature = await generateSignature(message, walletPrivateKey);
  const res = await client.authWithSignature({ message, signature });
  client.setAuthKey(res.authKey);
});

describe("Templates - USDC Read/Write + CustomCode (replica of workflow-clean)", () => {
  test("simulate workflow end-to-end", async () => {
    const wallet = await client.getWallet({ salt: "0" });

    // Use Cron trigger to match the deployed workflow
    const trigger = TriggerFactory.create({
      id: "timeTrigger",
      name: "timeTrigger",
      type: TriggerType.Cron,
      data: { schedules: ["*/2 * * * *"] },
    });

    // contractRead1: symbol
    const contractRead1 = NodeFactory.create({
      id: "contractRead1",
      name: "contractRead1",
      type: NodeType.ContractRead,
      data: {
        contractAddress: tokens.USDC.address,
        contractAbi: [
          {
            constant: true,
            inputs: [],
            name: "symbol",
            outputs: [{ name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
        ],
        methodCalls: [
          {
            methodName: "symbol",
            methodParams: [],
          },
        ],
      },
    });

    // contractRead2: decimals
    const contractRead2 = NodeFactory.create({
      id: "contractRead2",
      name: "contractRead2",
      type: NodeType.ContractRead,
      data: {
        contractAddress: tokens.USDC.address,
        contractAbi: [
          {
            constant: true,
            inputs: [],
            name: "decimals",
            outputs: [{ name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
          },
        ],
        methodCalls: [
          {
            methodName: "decimals",
            methodParams: [],
          },
        ],
      },
    });

    // contractWrite1: transfer 0.1 USDC (100000 units) to match deployed workflow
    const contractWrite1 = NodeFactory.create({
      id: "contractWrite1",
      name: "contractWrite1",
      type: NodeType.ContractWrite,
      data: {
        contractAddress: tokens.USDC.address,
        contractAbi: USDC_Implementation_ABI,
        methodCalls: [
          {
            methodName: "transfer",
            methodParams: [eoaAddress, "100000"],
          },
        ],
      },
    });

    // code1: builds message using contractWrite1 + contractRead1 + contractRead2
    const code1 = NodeFactory.create({
      id: "code1",
      name: "code1",
      type: NodeType.CustomCode,
      data: {
        lang: CustomCodeLang.JavaScript,
        source:
          "const methodName = contractWrite1?.input?.methodCalls?.[0]?.methodName;\n" +
          "const result = contractWrite1?.data?.[methodName];\n" +
          "const sender = result?.from;\n" +
          "const recipient = result?.to;\n" +
          "const value = Number(result?.value);\n" +
          "const symbol = contractRead1?.data?.symbol;\n" +
          "const decimals = Number(contractRead2?.data?.decimals);\n" +
          "let message = `Workflow: [${workflowContext.name}]\\n" +
          "Wallet: ${sender}\\n" +
          "`;\n" +
          "const amount = !isNaN(value) && !isNaN(decimals)\n" +
          "  ? value / 10 ** decimals\n" +
          "  : NaN;\n" +
          "if (!isNaN(amount)) {\n" +
          "  message += `You have ${methodName} ${amount} ${symbol} to ${recipient}.`;\n" +
          "} else {\n" +
          "  message += `The ${methodName} of ${symbol} to ${recipient} has failed.`;\n" +
          "}\n" +
          "return message;",
      },
    });

    // telegram1: as in example; we won't assert success for external dependency
    const telegram1 = NodeFactory.create({
      id: "telegram1",
      name: "telegram1",
      type: NodeType.RestAPI,
      data: {
        url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"chat_id":"452247333","text":"{{ code1.data }}\\n","parse_mode":"HTML"}',
      },
    });

    const edges = [
      new Edge({
        id: getNextId(),
        source: "timeTrigger",
        target: "contractWrite1",
      }),
      new Edge({
        id: getNextId(),
        source: "timeTrigger",
        target: "contractRead1",
      }),
      new Edge({
        id: getNextId(),
        source: "contractRead1",
        target: "contractRead2",
      }),
      new Edge({ id: getNextId(), source: "contractWrite1", target: "code1" }),
      new Edge({ id: getNextId(), source: "contractRead1", target: "code1" }),
      new Edge({ id: getNextId(), source: "contractRead2", target: "code1" }),
      new Edge({ id: getNextId(), source: "code1", target: "telegram1" }),
    ];

    const workflow = client.createWorkflow({
      smartWalletAddress: wallet.address,
      trigger,
      nodes: [contractWrite1, contractRead1, contractRead2, code1, telegram1],
      edges,
      startAt: Date.now(),
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
      maxExecution: 1,
      name: "Recurring Transfer with report",
    });

    // Extract workflow data and include name in inputVariables
    const workflowJson = workflow.toJson();
    const simulation = await client.simulateWorkflow({
      trigger: workflowJson.trigger,
      nodes: workflowJson.nodes,
      edges: workflowJson.edges,
      inputVariables: {
        workflowContext: {
          name: workflowJson.name,
          chainId: 11155111, // Sepolia chain ID for simulation
        }
      }
    });

    console.log(
      "🧪 Simulation",
      util.inspect(simulation, { depth: null, colors: true })
    );

    // Basic shape assertions
    expect(simulation).toBeDefined();
    expect(Array.isArray(simulation.steps)).toBe(true);

    // Ensure both read nodes are present
    const simRead1 = simulation.steps.find((s) => s.name === "contractRead1");
    const simRead2 = simulation.steps.find((s) => s.name === "contractRead2");
    const simCode = simulation.steps.find((s) => s.name === "code1");
    expect(simRead1).toBeDefined();
    expect(simRead2).toBeDefined();
    expect(simCode).toBeDefined();

    // code1 should reference contractRead2 in inputsList
    if (simCode) {
      expect(simCode.inputsList).toContain("contractRead2.data");
    }
  });

  test("deploy workflow and ensure contractRead2 executes and code1 sees it", async () => {
    const wallet = await client.getWallet({ salt: "0" });

    const trigger = TriggerFactory.create({
      id: "timeTrigger",
      name: "timeTrigger",
      type: TriggerType.Cron,
      data: { schedules: ["*/2 * * * *"] },
    });

    const contractRead1 = NodeFactory.create({
      id: "contractRead1",
      name: "contractRead1",
      type: NodeType.ContractRead,
      data: {
        contractAddress: tokens.USDC.address,
        contractAbi: [
          {
            constant: true,
            inputs: [],
            name: "symbol",
            outputs: [{ name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
          },
        ],
        methodCalls: [{ methodName: "symbol", methodParams: [] }],
      },
    });

    const contractRead2 = NodeFactory.create({
      id: "contractRead2",
      name: "contractRead2",
      type: NodeType.ContractRead,
      data: {
        contractAddress: tokens.USDC.address,
        contractAbi: [
          {
            constant: true,
            inputs: [],
            name: "decimals",
            outputs: [{ name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
          },
        ],
        methodCalls: [{ methodName: "decimals", methodParams: [] }],
      },
    });

    const contractWrite1 = NodeFactory.create({
      id: "contractWrite1",
      name: "contractWrite1",
      type: NodeType.ContractWrite,
      data: {
        contractAddress: tokens.USDC.address,
        contractAbi: USDC_Implementation_ABI,
        methodCalls: [
          {
            methodName: "transfer",
            // Use 100000 (0.1 USDC) to match the actual workflow
            methodParams: [eoaAddress, "100000"],
          },
        ],
      },
    });

    const code1 = NodeFactory.create({
      id: "code1",
      name: "code1",
      type: NodeType.CustomCode,
      data: {
        lang: CustomCodeLang.JavaScript,
        source:
          "const methodName = contractWrite1?.input?.methodCalls?.[0]?.methodName;\n" +
          "const result = contractWrite1?.data?.[methodName];\n" +
          "const sender = result?.from;\n" +
          "const recipient = result?.to;\n" +
          "const value = Number(result?.value);\n" +
          "const symbol = contractRead1?.data?.symbol;\n" +
          "const decimals = Number(contractRead2?.data?.decimals);\n" +
          "let message = `Workflow: [${workflowContext.name}]\\n" +
          "Wallet: ${sender}\\n" +
          "`;\n" +
          "const amount = !isNaN(value) && !isNaN(decimals)\n" +
          "  ? value / 10 ** decimals\n" +
          "  : NaN;\n" +
          "if (!isNaN(amount)) {\n" +
          "  message += `You have ${methodName} ${amount} ${symbol} to ${recipient}.`;\n" +
          "} else {\n" +
          "  message += `The ${methodName} of ${symbol} to ${recipient} has failed.`;\n" +
          "}\n" +
          "return message;",
      },
    });

    const telegram1 = NodeFactory.create({
      id: "telegram1",
      name: "telegram1",
      type: NodeType.RestAPI,
      data: {
        url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"chat_id":"452247333","text":"{{ code1.data }}\\n","parse_mode":"HTML"}',
      },
    });

    const edges = [
      new Edge({
        id: getNextId(),
        source: "timeTrigger",
        target: "contractWrite1",
      }),
      new Edge({
        id: getNextId(),
        source: "timeTrigger",
        target: "contractRead1",
      }),
      new Edge({
        id: getNextId(),
        source: "contractRead1",
        target: "contractRead2",
      }),
      new Edge({ id: getNextId(), source: "contractWrite1", target: "code1" }),
      new Edge({ id: getNextId(), source: "contractRead1", target: "code1" }),
      new Edge({ id: getNextId(), source: "contractRead2", target: "code1" }),
      new Edge({ id: getNextId(), source: "code1", target: "telegram1" }),
    ];

    const workflow = client.createWorkflow({
      smartWalletAddress: wallet.address,
      trigger,
      nodes: [contractWrite1, contractRead1, contractRead2, code1, telegram1],
      edges,
      startAt: Date.now(),
      expiredAt: Date.now() + 24 * 60 * 60 * 1000,
      maxExecution: 1,
      name: "Recurring Transfer with report",
    });

    console.log(
      "🚀 Deploying workflow, workflowProps",
      util.inspect(workflow, { depth: null, colors: true })
    );

    let workflowId: string | undefined;
    try {
      workflowId = await client.submitWorkflow(workflow);
      expect(workflowId).toBeDefined();

      const exec = await client.triggerWorkflow(
        {
          id: workflowId!,
          triggerData: {
            type: TriggerType.Cron,
            timestamp: Date.now(),
            timestampIso: new Date().toISOString(),
          },
          isBlocking: true,
        },
        {
          timeout: { timeout: TIMEOUT_DURATION * 3, retries: 0, retryDelay: 0 }, // 180 seconds
        }
      );
      expect(exec).toBeDefined();

      const executions = await client.getExecutions([workflowId!], {
        limit: 1,
      });
      const execution = executions.items[0];

      console.log(
        "🚀 Deployed workflow, execution",
        util.inspect(execution, { depth: null, colors: true })
      );

      expect(execution).toBeDefined();

      const stepNames = execution.steps.map((s: any) => s.name);
      // Ensure both read nodes executed
      expect(stepNames).toContain("contractRead1");
      expect(stepNames).toContain("contractRead2");

      const codeStep = execution.steps.find((s: any) => s.name === "code1");
      expect(codeStep).toBeDefined();
      // Extra debug of code1 step
      console.log(
        "🧩 code1 step detail:",
        util.inspect(
          {
            name: codeStep.name,
            success: codeStep.success,
            error: codeStep.error,
            inputsList: codeStep.inputsList,
            hasOutput: !!codeStep.output,
          },
          { depth: null, colors: true }
        )
      );
      // Critical: inputsList must include contractRead2 reference
      expect(codeStep.inputsList || []).toContain("contractRead2.data");

      // And custom code should not fail due to missing reference
      expect(codeStep.success).toBe(true);
    } finally {
      if (workflowId) {
        try {
          await client.deleteWorkflow(workflowId);
        } catch (e) {
          console.error("Error deleting workflow:", e);
        }
      }
    }
  });
});
