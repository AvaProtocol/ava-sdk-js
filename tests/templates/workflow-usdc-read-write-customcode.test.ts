import { describe, test, expect, beforeAll } from "@jest/globals";
import { Client, TriggerFactory, NodeFactory, Edge } from "@avaprotocol/sdk-js";
import { TriggerType, NodeType, CustomCodeLang } from "@avaprotocol/types";
import util from "util";
import _ from "lodash";
import { getConfig } from "../utils/envalid";
import {
  getAddress,
  generateSignature,
  getNextId,
  SaltGlobal,
} from "../utils/utils";

/**
 * Replicates the workflow from @workflow-clean.log to validate that
 * both contractRead nodes (symbol/decimals) execute and their outputs are
 * available to the CustomCode node. This guards against the regression where
 * one read node is pruned/deduped and CustomCode throws due to missing input.
 */

const USDC_SEPOLIA = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const { avsEndpoint, walletPrivateKey } = getConfig();

let client: Client;
let eoaAddress: string;
let saltIndex = SaltGlobal.CreateWorkflow * 1000 + 1200;

beforeAll(async () => {
  eoaAddress = await getAddress(walletPrivateKey);

  client = new Client({ endpoint: avsEndpoint });
  const { message } = await client.getSignatureFormat(eoaAddress);
  const signature = await generateSignature(message, walletPrivateKey);
  const res = await client.authWithSignature({ message, signature });
  client.setAuthKey(res.authKey);
});

describe("Templates - USDC Read/Write + CustomCode (replica of workflow-clean)", () => {
  test("simulate workflow end-to-end (trigger -> read1/read2 -> write -> code -> rest)", async () => {
    const wallet = await client.getWallet({ salt: "0" });

    // timeTrigger in the original; for simulation it is fine to keep Manual for determinism
    const trigger = TriggerFactory.create({
      id: "timeTrigger",
      name: "timeTrigger",
      type: TriggerType.Manual,
      data: {
        note: "Replicated workflow trigger",
      },
    });

    // contractRead1: symbol
    const contractRead1 = NodeFactory.create({
      id: "contractRead1",
      name: "contractRead1",
      type: NodeType.ContractRead,
      data: {
        contractAddress: USDC_SEPOLIA,
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
        contractAddress: USDC_SEPOLIA,
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

    // contractWrite1: transfer 1 USDC (6 decimals) to EOA (matches example)
    const contractWrite1 = NodeFactory.create({
      id: "contractWrite1",
      name: "contractWrite1",
      type: NodeType.ContractWrite,
      data: {
        contractAddress: USDC_SEPOLIA,
        contractAbi: [
          {
            constant: false,
            inputs: [
              { name: "to", type: "address" },
              { name: "value", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        methodCalls: [
          {
            methodName: "transfer",
            methodParams: [eoaAddress, "1000000"],
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
          "return { sender, recipient, value, symbol, decimals };",
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
      name: "USDC Read/Write + CustomCode Template",
    });

    const simulation = await client.simulateWorkflow(workflow);

    // Verbose debug logging for simulation
    // Print a compact summary of all steps: id, type, name, success, inputsList
    console.log(
      "🧪 Simulation steps summary:",
      util.inspect(
        simulation.steps.map((s: any) => ({
          id: s.id,
          type: s.type,
          name: s.name,
          success: s.success,
          hasOutput: !!s.output,
          inputsList: s.inputsList,
        })),
        { depth: null, colors: true }
      )
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

  test("deploy + trigger workflow and ensure contractRead2 executes and code1 sees it", async () => {
    const wallet = await client.getWallet({ salt: "0" });

    const trigger = TriggerFactory.create({
      id: "timeTrigger",
      name: "timeTrigger",
      type: TriggerType.Manual,
      data: { note: "Replicated workflow trigger" },
    });

    const contractRead1 = NodeFactory.create({
      id: "contractRead1",
      name: "contractRead1",
      type: NodeType.ContractRead,
      data: {
        contractAddress: USDC_SEPOLIA,
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
        contractAddress: USDC_SEPOLIA,
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
        contractAddress: USDC_SEPOLIA,
        contractAbi: [
          {
            constant: false,
            inputs: [
              { name: "to", type: "address" },
              { name: "value", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ name: "", type: "bool" }],
            payable: false,
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        methodCalls: [
          {
            methodName: "transfer",
            // Use a small value (1 USDC) like the example; paymaster/funded wallet should handle gas
            methodParams: [eoaAddress, "1000000"],
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
          "return { sender, recipient, value, symbol, decimals };",
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
      name: "USDC Read/Write + CustomCode Deployed",
    });

    let workflowId: string | undefined;
    try {
      workflowId = await client.submitWorkflow(workflow);
      expect(workflowId).toBeDefined();

      const exec = await client.triggerWorkflow({
        id: workflowId!,
        triggerData: { type: TriggerType.Manual, note: "run" },
        isBlocking: true,
      });
      expect(exec).toBeDefined();

      const executions = await client.getExecutions([workflowId!], {
        limit: 1,
      });
      const execution = executions.items[0];
      expect(execution).toBeDefined();

      // Verbose debug logging for deployed execution
      console.log(
        "🚀 Deployed execution steps summary:",
        util.inspect(
          execution.steps.map((s: any) => ({
            id: s.id,
            type: s.type,
            name: s.name,
            success: s.success,
            hasOutput: !!s.output,
            inputsList: s.inputsList,
          })),
          { depth: null, colors: true }
        )
      );

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
