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
const { sendgridKey, tokens } = config;

// Use a second EOA-derived address as the transfer recipient for testing
const TEST_RECIPIENT = "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b";

// Native ETH address (matches studio template's default token)
const NATIVE_ETH_ADDRESS = tokens.ETH.address;

// Transfer amount: 0.01 ETH in wei (matches studio template's default)
const TRANSFER_AMOUNT_WEI = "10000000000000000"; // 0.01 ETH

// Test email for SendGrid (used in email node)
const TEST_EMAIL = "test@example.com";

jest.setTimeout(TIMEOUT_DURATION * 5);

/**
 * Template: Batch Recurring Payment with Email Report
 *
 * Mirrors the studio template: batch-recurring-payment-with-email.json
 *
 * Workflow (5-node chain):
 *   CronTrigger (scheduled: "0 15 * * 1" — every Monday at 3 PM UTC)
 *     → Balance (check wallet has enough tokens)
 *     → CustomCode (calculate totalNeeded vs balance)
 *     → Branch (if balance >= totalNeeded)
 *       → if: Loop (ethTransfer to each recipient)
 *         → Email (send summary via SendGrid)
 *       → else: Email (insufficient balance alert)
 *
 * Uses native ETH for transfers (matching the studio template's default
 * token_amount with 0xeeee... address).
 */
describe("Template: Batch Recurring Payment with Email Report", () => {
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
  const emailId = getNextId();

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
   * CronTrigger: Scheduled execution every Monday at 3 PM UTC.
   *
   * Matches studio template's timeTrigger node:
   * - type: "trigger" with core.type: "timeInterval"
   * - schedules: ["0 15 * * 1"]
   */
  function createCronTrigger() {
    return TriggerFactory.create({
      id: triggerId,
      name: "timeTrigger",
      type: TriggerType.Cron,
      data: {
        schedules: ["0 15 * * 1"],
      },
    });
  }

  /**
   * Balance node: Check wallet balance for native ETH.
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
   * Matches studio template's code1 node:
   * - Computes totalNeeded = amount * recipients.length
   * - Extracts balance from balance1 data
   */
  function createCodeNode() {
    return NodeFactory.create({
      id: codeId,
      name: "code1",
      type: NodeType.CustomCode,
      data: {
        lang: Lang.JavaScript,
        source: `const totalNeeded = BigInt(settings.token_amount.amount) * BigInt(settings.recipients.length);
const balance = BigInt(balance1.data[0].balance);
return { balance: balance.toString(), totalNeeded: totalNeeded.toString() };`,
      },
    });
  }

  /**
   * Branch node: Proceed with transfers only if balance is sufficient.
   *
   * Matches studio template's branch1 node.
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
   * Matches studio template's loop1 node:
   * - inputVariable: {{settings.recipients}}
   * - runnerType: ethTransfer
   * - sequential execution
   */
  function createLoopNode() {
    return NodeFactory.create({
      id: loopId,
      name: "loop1",
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
   * Email node: Send summary via SendGrid REST API.
   *
   * Matches studio template's email1 node:
   * - shouldSummarize: true (AI generates summary from workflow context)
   * - subject: "Batch Payment Summary"
   *
   * Since the SDK has no native Email node type, we use RestAPI
   * calling the SendGrid API (same pattern as uniswapv3_stoploss test).
   */
  function createEmailNode() {
    return NodeFactory.create({
      id: emailId,
      name: "email1",
      type: NodeType.RestAPI,
      data: {
        url: "https://api.sendgrid.com/v3/mail/send",
        method: "POST",
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: TEST_EMAIL }],
              subject: "Batch Payment Summary",
            },
          ],
          from: { email: "noreply@avaprotocol.org", name: "Ava Protocol" },
          content: [
            {
              type: "text/html",
              value: "",
            },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer {{apContext.configVars.sendgrid_key}}",
        },
        options: { summarize: true },
      },
    });
  }

  /**
   * Edges matching the studio template's DAG structure:
   *
   * CronTrigger → Balance → Code → Branch
   *   Branch.0 (if: sufficient) → Loop → Email
   *   Branch.1 (else: insufficient) → Email
   */
  function createEdges() {
    return [
      new Edge({ id: getNextId(), source: triggerId, target: balanceId }),
      new Edge({ id: getNextId(), source: balanceId, target: codeId }),
      new Edge({ id: getNextId(), source: codeId, target: branchId }),
      new Edge({ id: getNextId(), source: branchId + ".0", target: loopId }),
      new Edge({ id: getNextId(), source: branchId + ".1", target: emailId }),
      new Edge({ id: getNextId(), source: loopId, target: emailId }),
    ];
  }

  describe("1. Individual Component Testing", () => {
    test("should test CronTrigger with runTrigger", async () => {
      const trigger = createCronTrigger();

      const result = await client.runTrigger({
        trigger,
      });

      console.log(
        "CronTrigger result:",
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
        // With 1 ETH balance and 0.01 ETH needed, balance should be sufficient
        expect(BigInt(data.balance)).toBeGreaterThanOrEqual(BigInt(data.totalNeeded));
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
              totalNeeded: TRANSFER_AMOUNT_WEI, // 0.01 ETH
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
              balance: "0",
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
    test("should simulate complete batch payment workflow", async () => {
      const workflowName = "Batch Recurring Payment Simulation";

      const trigger = createCronTrigger();
      const balanceNode = createBalanceNode();
      const codeNode = createCodeNode();
      const branchNode = createBranchNode();
      const loopNode = createLoopNode();
      const emailNode = createEmailNode();
      const edges = createEdges();

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger,
        nodes: [balanceNode, codeNode, branchNode, loopNode, emailNode],
        edges,
        startAt: Date.now(),
        expiredAt: getExpiredAt("24h"),
        maxExecution: 3,
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
      // Accept both success and partialSuccess (e.g., email node may fail in
      // simulation without a real SendGrid key, or loop transfer is simulated)
      expect([ExecutionStatus.Success, ExecutionStatus.PartialSuccess]).toContain(
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
      const workflowName = "Batch Recurring Payment Deploy Test";

      const trigger = createCronTrigger();
      const balanceNode = createBalanceNode();
      const codeNode = createCodeNode();
      const branchNode = createBranchNode();
      const loopNode = createLoopNode();
      const emailNode = createEmailNode();
      const edges = createEdges();

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger,
        nodes: [balanceNode, codeNode, branchNode, loopNode, emailNode],
        edges,
        startAt: Date.now(),
        expiredAt: getExpiredAt("24h"),
        maxExecution: 3,
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

      // 5 nodes: balance + code + branch + loop + email
      expect(retrieved.nodes?.length).toBe(5);
      // 6 edges
      expect(retrieved.edges?.length).toBe(6);

      // Verify trigger type is Cron
      expect(retrieved.trigger?.type).toBe(TriggerType.Cron);

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
  });

  // Conditionally run SendGrid integration tests only if SENDGRID_KEY is set
  const describeFn = sendgridKey ? describe : describe.skip;

  describeFn("SendGrid Email Integration Tests", () => {
    test("should test Email node with real SendGrid API", async () => {
      const emailNode = createEmailNode();

      const result = await client.runNodeWithInputs({
        node: emailNode,
        inputVariables: {
          apContext: {
            configVars: {
              sendgrid_key: sendgridKey,
            },
          },
          loopTransfer: {
            data: {
              iterations: [
                { index: 0, value: TEST_RECIPIENT, status: "success" },
              ],
            },
          },
        },
      });

      console.log(
        "Email (SendGrid) result:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result).toBeDefined();
    });
  });
});
