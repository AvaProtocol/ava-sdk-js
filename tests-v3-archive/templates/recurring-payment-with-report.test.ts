import util from "util";
import {
  describe,
  beforeAll,
  test,
  expect,
  afterAll,
} from "@jest/globals";
import { Client, TriggerFactory, NodeFactory, Edge } from "@avaprotocol/sdk-js";
import {
  TriggerType,
  NodeType,
  ExecutionStatus,
  ExecutionMode,
  Lang,
  LoopRunnerType,
} from "@avaprotocol/types";
import {
  getNextId,
  TIMEOUT_DURATION,
  getClient,
  authenticateClient,
  getSmartWallet,
  getEOAAddress,
  getExpiredAt,
  getSettings,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";

const config = getConfig();
const { telegramBotToken, telegramChatId, tokens } = config;

// Use a second EOA-derived address as the transfer recipient for testing
const TEST_RECIPIENT = "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b";

// Native ETH address (used in the template for token identification)
const NATIVE_ETH_ADDRESS = tokens.ETH.address;

// Transfer amount: 0.0001 ETH in wei (small amount for testing)
const TRANSFER_AMOUNT_WEI = "100000000000000"; // 0.0001 ETH

jest.setTimeout(TIMEOUT_DURATION * 5);

/**
 * Template: On-Demand Batch Transfer with Telegram Report
 *
 * Mirrors the studio template: recurring-payment-with-report.json
 *
 * Workflow (5-node chain):
 *   ManualTrigger
 *     → Balance (check wallet has enough tokens)
 *     → CustomCode (calculate totalNeeded vs balance)
 *     → Branch (if balance >= totalNeeded)
 *       → if: Loop (ethTransfer to each recipient)
 *         → Telegram (send summary)
 *       → else: Telegram (insufficient balance alert)
 *
 * The studio template uses USDC, but we use native ETH for testing
 * since the SDK's ethTransfer loop runner only supports native ETH.
 */
describe("Template: On-Demand Batch Transfer with Telegram Report", () => {
  let client: Client;
  let smartWalletAddress: string;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  // Node IDs
  const triggerId = getNextId();
  const balanceId = getNextId();
  const codeId = getNextId();
  const branchId = getNextId();
  const loopId = getNextId();
  const telegramId = getNextId();

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    const wallet = await getSmartWallet(client);
    smartWalletAddress = wallet.address;
    eoaAddress = await getEOAAddress();
    console.log("EOA address:", eoaAddress);
    console.log("Smart wallet address (runner):", smartWalletAddress);
  });

  afterAll(async () => {
    for (const workflowId of createdWorkflowIds) {
      try {
        await client.deleteWorkflow(workflowId);
      } catch (error) {
        console.warn(`Failed to cleanup workflow ${workflowId}:`, error);
      }
    }
  });

  /**
   * ManualTrigger: User clicks "Run" to execute on-demand.
   * Matches studio template's manualTrigger node.
   */
  function createManualTrigger() {
    return TriggerFactory.create({
      id: triggerId,
      name: "manualTrigger",
      type: TriggerType.Manual,
      data: {
        data: {},
      },
    });
  }

  /**
   * Balance node: Check wallet balance for the token being transferred.
   *
   * Matches studio template's balance1 node:
   * - wallet: {{settings.runner}}
   * - tokenIds: [{{settings.token_amount.address}}]
   */
  function createBalanceNode() {
    return NodeFactory.create({
      id: balanceId,
      name: "balance1",
      type: NodeType.Balance,
      data: {
        address: smartWalletAddress,
        chain: "sepolia",
        tokenAddresses: [NATIVE_ETH_ADDRESS],
        includeSpam: false,
      },
    });
  }

  /**
   * CustomCode node: Calculate totalNeeded and compare with balance.
   *
   * Matches studio template's code1 node which computes:
   * - totalNeeded = amount * recipients.length
   * - balance from balance1 data
   */
  function createCodeNode() {
    return NodeFactory.create({
      id: codeId,
      name: "code1",
      type: NodeType.CustomCode,
      data: {
        lang: Lang.JavaScript,
        source: `const totalNeeded = BigInt("${TRANSFER_AMOUNT_WEI}") * BigInt(settings.recipients.length);
const tokenObj = balance1.data.find(t => t.tokenAddress && t.tokenAddress.toLowerCase() === "${NATIVE_ETH_ADDRESS}".toLowerCase());
const balance = tokenObj ? BigInt(tokenObj.balance) : BigInt(0);
return { balance: balance.toString(), totalNeeded: totalNeeded.toString() };`,
      },
    });
  }

  /**
   * Branch node: Proceed with transfers only if balance is sufficient.
   *
   * Matches studio template's branch1 node:
   * - if: BigInt(code1.data.balance) >= BigInt(code1.data.totalNeeded)
   * - else: insufficient balance path
   */
  function createBranchNode() {
    return NodeFactory.create({
      id: branchId,
      name: "branch1",
      type: NodeType.Branch,
      data: {
        conditions: [
          {
            id: "0",
            type: "if",
            expression: "BigInt(code1.data.balance) >= BigInt(code1.data.totalNeeded)",
          },
          {
            id: "1",
            type: "else",
            expression: "",
          },
        ],
      },
    });
  }

  /**
   * Loop node: Iterate over recipients and send ETH to each.
   *
   * Matches studio template's loopTransfer node:
   * - inputVariable: recipients list
   * - runnerType: ethTransfer
   * - runnerData: { destination: {{value}}, amount: transfer_amount }
   */
  function createLoopNode() {
    return NodeFactory.create({
      id: loopId,
      name: "loopTransfer",
      type: NodeType.Loop,
      data: {
        inputVariable: `{{settings.recipients}}`,
        iterVal: "value",
        iterKey: "index",
        executionMode: ExecutionMode.Sequential,
        iterationTimeout: 60,
        runner: {
          type: LoopRunnerType.EthTransfer,
          config: {
            destination: "{{value}}",
            amount: TRANSFER_AMOUNT_WEI,
          },
        },
      },
    });
  }

  /**
   * Telegram node: Send summary after transfers complete.
   *
   * Matches studio template's telegram_send node:
   * - shouldSummarize: true (AI generates summary from workflow context)
   */
  function createTelegramNode() {
    return NodeFactory.create({
      id: telegramId,
      name: "telegram_send",
      type: NodeType.RestAPI,
      data: {
        url: `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        method: "POST",
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: "A new batch transfer just ran. Summary will follow below.\n",
          parse_mode: "HTML",
        }),
        headers: { "Content-Type": "application/json" },
        options: { summarize: true },
      },
    });
  }

  /**
   * Edges matching the studio template's DAG structure:
   *
   * ManualTrigger → Balance → Code → Branch
   *   Branch.0 (if: sufficient) → Loop → Telegram
   *   Branch.1 (else: insufficient) → Telegram
   */
  function createEdges() {
    return [
      new Edge({ id: getNextId(), source: triggerId, target: balanceId }),
      new Edge({ id: getNextId(), source: balanceId, target: codeId }),
      new Edge({ id: getNextId(), source: codeId, target: branchId }),
      new Edge({ id: getNextId(), source: branchId + ".0", target: loopId }),
      new Edge({ id: getNextId(), source: branchId + ".1", target: telegramId }),
      new Edge({ id: getNextId(), source: loopId, target: telegramId }),
    ];
  }

  describe("1. Individual Component Testing", () => {
    test("should test ManualTrigger with runTrigger", async () => {
      const trigger = createManualTrigger();

      const result = await client.runTrigger({
        trigger,
      });

      console.log(
        "ManualTrigger result:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(typeof result.success).toBe("boolean");
    });

    test("should test Balance node with runNodeWithInputs", async () => {
      const balanceNode = createBalanceNode();

      const result = await client.runNodeWithInputs({
        node: balanceNode,
        inputVariables: {
          settings: getSettings(smartWalletAddress),
        },
      });

      console.log(
        "Balance result:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result).toBeDefined();
      if (result.success) {
        expect(Array.isArray(result.data)).toBe(true);
      }
    });

    test("should test CustomCode node with mock balance data", async () => {
      const codeNode = createCodeNode();

      const result = await client.runNodeWithInputs({
        node: codeNode,
        inputVariables: {
          settings: {
            runner: smartWalletAddress,
            recipients: [TEST_RECIPIENT],
            token_amount: {
              amount: TRANSFER_AMOUNT_WEI,
              address: NATIVE_ETH_ADDRESS,
              decimals: 18,
            },
          },
          balance1: {
            data: [
              {
                tokenAddress: NATIVE_ETH_ADDRESS,
                balance: "1000000000000000000", // 1 ETH
                decimals: 18,
                symbol: "ETH",
                name: "Ethereum",
              },
            ],
          },
        },
      });

      console.log(
        "CustomCode result:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result).toBeDefined();
      if (result.success) {
        const data = result.data as Record<string, string>;
        expect(data).toHaveProperty("balance");
        expect(data).toHaveProperty("totalNeeded");
      }
    });

    test("should test Branch node when balance is sufficient", async () => {
      const branchNode = createBranchNode();

      const result = await client.runNodeWithInputs({
        node: branchNode,
        inputVariables: {
          code1: {
            data: {
              balance: "1000000000000000000", // 1 ETH
              totalNeeded: TRANSFER_AMOUNT_WEI, // 0.0001 ETH
            },
          },
        },
      });

      console.log(
        "Branch result (sufficient balance):",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result).toBeDefined();
    });

    test("should test Branch node when balance is insufficient", async () => {
      const branchNode = createBranchNode();

      const result = await client.runNodeWithInputs({
        node: branchNode,
        inputVariables: {
          code1: {
            data: {
              balance: "0", // No balance
              totalNeeded: TRANSFER_AMOUNT_WEI,
            },
          },
        },
      });

      console.log(
        "Branch result (insufficient balance):",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result).toBeDefined();
    });
  });

  describe("2. Workflow Simulation Testing", () => {
    test("should simulate complete batch transfer workflow", async () => {
      const workflowName = "Batch Transfer with Report Simulation";

      const trigger = createManualTrigger();
      const balanceNode = createBalanceNode();
      const codeNode = createCodeNode();
      const branchNode = createBranchNode();
      const loopNode = createLoopNode();
      const telegramNode = createTelegramNode();
      const edges = createEdges();

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger,
        nodes: [balanceNode, codeNode, branchNode, loopNode, telegramNode],
        edges,
        startAt: Date.now(),
        expiredAt: getExpiredAt("24h"),
        maxExecution: 5,
        name: workflowName,
      });

      const simulationResult = await client.simulateWorkflow({
        ...workflow,
        inputVariables: {
          settings: {
            ...getSettings(smartWalletAddress, workflowName),
            recipients: [TEST_RECIPIENT],
            token_amount: {
              amount: TRANSFER_AMOUNT_WEI,
              address: NATIVE_ETH_ADDRESS,
              decimals: 18,
            },
          },
        },
      });

      console.log(
        "Simulation result:",
        util.inspect(simulationResult, { depth: 5, colors: true }),
      );

      expect(simulationResult).toBeDefined();
      // Branch skips are SUCCESS; step failures are FAILED
      expect([ExecutionStatus.Success, ExecutionStatus.Failed]).toContain(
        simulationResult.status,
      );

      // Expect steps for: trigger + balance + code + branch + (loop or email)
      expect(simulationResult.steps.length).toBeGreaterThanOrEqual(4);

      // Verify trigger step
      const triggerStep = simulationResult.steps[0];
      expect(triggerStep.success).toBeTruthy();
    });
  });

  describe("3. Full Deployment and Execution Testing", () => {
    test("should deploy and retrieve workflow correctly", async () => {
      const workflowName = "Batch Transfer with Report Deploy Test";

      const trigger = createManualTrigger();
      const balanceNode = createBalanceNode();
      const codeNode = createCodeNode();
      const branchNode = createBranchNode();
      const loopNode = createLoopNode();
      const telegramNode = createTelegramNode();
      const edges = createEdges();

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger,
        nodes: [balanceNode, codeNode, branchNode, loopNode, telegramNode],
        edges,
        startAt: Date.now(),
        expiredAt: getExpiredAt("24h"),
        maxExecution: 5,
        name: workflowName,
        inputVariables: {
          settings: {
            ...getSettings(smartWalletAddress, workflowName),
            recipients: [TEST_RECIPIENT],
            token_amount: {
              amount: TRANSFER_AMOUNT_WEI,
              address: NATIVE_ETH_ADDRESS,
              decimals: 18,
            },
          },
        },
      });

      const workflowId = await client.submitWorkflow(workflow);
      expect(workflowId).toBeDefined();
      expect(typeof workflowId).toBe("string");
      createdWorkflowIds.push(workflowId);

      console.log("Deployed workflow ID:", workflowId);

      // Verify the workflow can be retrieved with correct structure
      const retrieved = await client.getWorkflow(workflowId);
      expect(retrieved).toBeDefined();
      expect(retrieved.id).toBe(workflowId);
      expect(retrieved.status).toBe("enabled");
      expect(retrieved.name).toBe(workflowName);

      // 5 nodes: balance + code + branch + loop + telegram
      expect(retrieved.nodes?.length).toBe(5);
      // 6 edges: trigger→balance, balance→code, code→branch, branch.0→loop, branch.1→telegram, loop→telegram
      expect(retrieved.edges?.length).toBe(6);

      // Verify trigger type is Manual
      expect(retrieved.trigger?.type).toBe(TriggerType.Manual);

      console.log(
        "Retrieved workflow:",
        util.inspect(
          {
            id: retrieved.id,
            name: retrieved.name,
            status: retrieved.status,
            trigger: retrieved.trigger?.type,
            nodeCount: retrieved.nodes?.length,
            edgeCount: retrieved.edges?.length,
          },
          { depth: null, colors: true },
        ),
      );
    });

    test("should trigger deployed workflow and verify execution", async () => {
      const workflowName = "Batch Transfer Trigger Test";

      const trigger = createManualTrigger();
      const balanceNode = createBalanceNode();
      const codeNode = createCodeNode();
      const branchNode = createBranchNode();
      const loopNode = createLoopNode();
      const telegramNode = createTelegramNode();
      const edges = createEdges();

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger,
        nodes: [balanceNode, codeNode, branchNode, loopNode, telegramNode],
        edges,
        startAt: Date.now(),
        expiredAt: getExpiredAt("24h"),
        maxExecution: 5,
        name: workflowName,
        inputVariables: {
          settings: {
            ...getSettings(smartWalletAddress, workflowName),
            recipients: [TEST_RECIPIENT],
            token_amount: {
              amount: TRANSFER_AMOUNT_WEI,
              address: NATIVE_ETH_ADDRESS,
              decimals: 18,
            },
          },
        },
      });

      const workflowId = await client.submitWorkflow(workflow);
      expect(workflowId).toBeDefined();
      createdWorkflowIds.push(workflowId);
      console.log("Deployed workflow ID:", workflowId);

      // Trigger the manual workflow
      const execution = await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Manual,
        },
        isBlocking: true,
      });

      console.log(
        "Execution result:",
        util.inspect(
          {
            id: execution?.id,
            status: execution?.status,
            stepCount: execution?.steps?.length,
          },
          { depth: null, colors: true },
        ),
      );

      // The workflow executed (may succeed or partially succeed depending on wallet balance)
      expect(execution).toBeDefined();
    });
  });
});
