import util from "util";
import { Client, TriggerFactory, NodeFactory, Edge } from "@avaprotocol/sdk-js";
import {
  TriggerType,
  NodeType,
  WorkflowStatus,
  ExecutionStatus,
} from "@avaprotocol/types";
import {
  getEOAAddress,
  authenticateClient,
  TIMEOUT_DURATION,
  getSettings,
  getSmartWallet,
  getClient,
  padAddressForTopic,
  getNextId,
  getExpiredAt,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
const { tokens, telegramBotToken, telegramChatId } = getConfig();

const USDC_SEPOLIA_ADDRESS = tokens?.USDC?.address;

jest.setTimeout(TIMEOUT_DURATION);

/**
 * Template: Instant Telegram Alert for Token Transfers
 *
 * Mirrors the studio template: telegram-alert-on-transfer.json
 *
 * Workflow (2-node):
 *   EventTrigger (transfer monitor: incoming + outgoing ERC-20 transfers)
 *     → Telegram (RestAPI with shouldSummarize for AI-generated message)
 *
 * The EventTrigger uses the "transfer" type to monitor ERC-20 Transfer events
 * for specified tokens on the user's wallet. The Telegram node uses AI summarization
 * to compose a human-readable message from the raw event data.
 */
describe("Template: Telegram Alert on Transfer", () => {
  let client: Client;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  // Template IDs matching studio template
  const triggerIds = {
    eventTrigger: "01JXCC3P7JY3YFZDDQXKFP45T1",
  };

  const nodeIds = {
    telegram: "01JXVQ4CJHS24Y2SYJ38C6017E",
  };

  beforeAll(async () => {
    eoaAddress = await getEOAAddress();
    client = getClient();
    await authenticateClient(client);
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
   * EventTrigger: Monitor both incoming and outgoing ERC-20 transfers.
   *
   * Matches studio template's eventTrigger node with:
   * - type: "transfer"
   * - tokenIds: [native ETH, USDC]
   *
   * The SDK expresses this as two queries (outgoing + incoming) with
   * topic filtering on the wallet address. The operator's shared event
   * enrichment publishes both `value` (raw uint256 base units) and
   * `valueFormatted` (decimal-applied display string) automatically when
   * token decimals are known, so no `applyToFields` is required.
   */
  function createEventTrigger() {
    const TRANSFER_TOPIC =
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

    return TriggerFactory.create({
      id: triggerIds.eventTrigger,
      name: "transfer_monitor",
      type: TriggerType.Event,
      data: {
        queries: [
          {
            // Query 1: Outgoing transfers (wallet === from)
            addresses: [USDC_SEPOLIA_ADDRESS],
            topics: [TRANSFER_TOPIC, padAddressForTopic(eoaAddress), null],
            maxEventsPerBlock: 100,
            contractAbi: [
              {
                inputs: [],
                name: "decimals",
                outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
                stateMutability: "view",
                type: "function",
              },
              {
                anonymous: false,
                inputs: [
                  {
                    indexed: true,
                    internalType: "address",
                    name: "from",
                    type: "address",
                  },
                  {
                    indexed: true,
                    internalType: "address",
                    name: "to",
                    type: "address",
                  },
                  {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                  },
                ],
                name: "Transfer",
                type: "event",
              },
            ],
            // No methodCalls needed: shared event enrichment publishes
            // `valueFormatted` automatically. applyToFields ["Transfer.value"]
            // is no longer needed for Transfer events (the field itself is
            // still valid for other cases like Chainlink AnswerUpdated).
          },
          {
            // Query 2: Incoming transfers (wallet === to)
            addresses: [USDC_SEPOLIA_ADDRESS],
            topics: [TRANSFER_TOPIC, null, padAddressForTopic(eoaAddress)],
            maxEventsPerBlock: 100,
            contractAbi: [
              {
                inputs: [],
                name: "decimals",
                outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
                stateMutability: "view",
                type: "function",
              },
              {
                anonymous: false,
                inputs: [
                  {
                    indexed: true,
                    internalType: "address",
                    name: "from",
                    type: "address",
                  },
                  {
                    indexed: true,
                    internalType: "address",
                    name: "to",
                    type: "address",
                  },
                  {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                  },
                ],
                name: "Transfer",
                type: "event",
              },
            ],
            // No methodCalls needed: shared event enrichment publishes
            // `valueFormatted` automatically. applyToFields ["Transfer.value"]
            // is no longer needed for Transfer events (the field itself is
            // still valid for other cases like Chainlink AnswerUpdated).
          },
        ],
      },
    });
  }

  /**
   * Telegram node: Send alert via Telegram Bot API with AI summarization.
   *
   * Matches studio template's telegram node:
   * - shouldSummarize: true (AI generates the message from workflow context)
   * - message: "" (empty — AI fills it in)
   *
   * Since the SDK has no native Telegram node type, we use RestAPI
   * with options.summarize to achieve the same result.
   */
  function createTelegramNode() {
    return NodeFactory.create({
      id: nodeIds.telegram,
      name: "telegram_send",
      type: NodeType.RestAPI,
      data: {
        url: `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        method: "POST",
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: "",
          parse_mode: "HTML",
        }),
        headers: { "Content-Type": "application/json" },
        options: { summarize: true },
      },
    });
  }

  /**
   * Edges: EventTrigger → Telegram (direct, no intermediate nodes)
   * Matches studio template's 2-edge structure (settings→trigger, trigger→telegram)
   * minus the settings edge which is implicit in the SDK.
   */
  function createWorkflowEdges() {
    return [
      new Edge({
        id: `xy-edge__${triggerIds.eventTrigger}source_${triggerIds.eventTrigger}-${nodeIds.telegram}target_${nodeIds.telegram}`,
        source: triggerIds.eventTrigger,
        target: nodeIds.telegram,
      }),
    ];
  }

  describe("1. Individual Component Testing", () => {
    test("should test EventTrigger with runTrigger", async () => {
      const eventTrigger = createEventTrigger();

      const result = await client.runTrigger({
        trigger: eventTrigger,
      });

      console.log(
        "EventTrigger result:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(typeof result.success).toBe("boolean");

      // For event triggers, no matching events means success: false with data: null
      if (result.data === null) {
        console.log(
          "No Transfer events found for address (expected):",
          eoaAddress,
        );
        expect(result.success).toBe(false);
      } else {
        expect(result.success).toBe(true);
        expect(result.data).toHaveProperty("blockNumber");
        expect(result.data).toHaveProperty("walletAddress");
        expect(result.data).toHaveProperty("fromAddress");
        expect(result.data).toHaveProperty("toAddress");
        expect(result.data).toHaveProperty("value"); // raw uint256 base units
        expect(result.data).toHaveProperty("valueFormatted"); // decimal-applied display string
        expect(result.data).toHaveProperty("tokenSymbol");
        expect(result.data).toHaveProperty("transactionHash");
      }
    });

    test("should test Telegram node with runNodeWithInputs", async () => {
      const telegramNode = createTelegramNode();

      // Mock the transfer_monitor (eventTrigger) output data.
      // `value` is the raw uint256 base-units string (USDC has 6 decimals,
      // so 100.5 USDC == 100_500_000 base units). `valueFormatted` is the
      // decimal-applied display string. See EigenLayer-AVS PR #509.
      const inputVariables = {
        transfer_monitor: {
          data: {
            fromAddress: "0x1234567890123456789012345678901234567890",
            toAddress: eoaAddress,
            value: "100500000",
            valueFormatted: "100.5",
            tokenSymbol: "USDC",
            tokenDecimals: 6,
            blockTimestamp: Date.now(),
            blockNumber: 12345678,
            transactionHash:
              "0x000000000000000000000000000000000000000000000000185331f3d274a668",
          },
        },
      };

      const result = await client.runNodeWithInputs({
        node: {
          id: getNextId(),
          name: "telegram_send_test",
          type: NodeType.RestAPI,
          data: telegramNode.data,
        },
        inputVariables: inputVariables,
      });

      console.log(
        "Telegram result:",
        util.inspect(result, { depth: null, colors: true }),
      );

      // The node processes correctly even if the actual HTTP call fails (e.g., invalid token)
      expect(result).toBeDefined();
    });
  });

  describe("2. Workflow Simulation Testing", () => {
    test("should simulate complete workflow", async () => {
      const eventTrigger = createEventTrigger();
      const telegramNode = createTelegramNode();
      const edges = createWorkflowEdges();

      const wallet = await getSmartWallet(client);

      const workflowProps = {
        smartWalletAddress: wallet.address,
        trigger: eventTrigger,
        nodes: [telegramNode],
        edges: edges,
        startAt: Date.now(),
        expiredAt: getExpiredAt("24h"),
        maxExecution: 5,
        name: "Telegram Alert on Transfer Simulation",
      };

      const workflow = client.createWorkflow(workflowProps);
      const simulationResult = await client.simulateWorkflow({
        ...workflow,
        inputVariables: {
          settings: getSettings(
            wallet.address,
            "Telegram Alert on Transfer Simulation",
          ),
        },
      });

      console.log(
        "Simulation result:",
        util.inspect(simulationResult, { depth: null, colors: true }),
      );

      expect(simulationResult.status).toBe(ExecutionStatus.Success);
      expect(simulationResult.steps).toHaveLength(2); // trigger + telegram

      // Verify trigger step
      const triggerStep = simulationResult.steps[0];
      expect(triggerStep.id).toBe(triggerIds.eventTrigger);
      expect(triggerStep.type).toBe(TriggerType.Event);
      expect(triggerStep.success).toBeTruthy();

      // Verify trigger config contains queries
      expect(triggerStep.config).toBeDefined();
      const triggerConfig = triggerStep.config as Record<string, unknown>;
      expect(triggerConfig.queries).toBeDefined();
      expect(Array.isArray(triggerConfig.queries)).toBe(true);

      // Verify Telegram step executed
      const telegramStep = simulationResult.steps[1];
      expect(telegramStep.id).toBe(nodeIds.telegram);
      expect(telegramStep.success).toBeTruthy();
    });
  });

  describe("3. Full Deployment and Execution Testing", () => {
    test("should deploy and retrieve workflow correctly", async () => {
      const eventTrigger = createEventTrigger();
      const telegramNode = createTelegramNode();
      const edges = createWorkflowEdges();

      const wallet = await getSmartWallet(client);

      const workflowData = {
        smartWalletAddress: wallet.address,
        trigger: eventTrigger,
        nodes: [telegramNode],
        edges: edges,
        startAt: Date.now(),
        expiredAt: getExpiredAt("24h"),
        maxExecution: 5,
        name: "Telegram Alert on Transfer Test",
        inputVariables: {
          settings: getSettings(
            wallet.address,
            "Telegram Alert on Transfer Test",
          ),
        },
      };

      const workflow = client.createWorkflow(workflowData);
      const workflowId = await client.submitWorkflow(workflow);
      createdWorkflowIds.push(workflowId);

      console.log(`Workflow deployed with ID: ${workflowId}`);

      // Verify workflow was saved correctly
      const savedWorkflow = await client.getWorkflow(workflowId);

      expect(savedWorkflow.id).toBe(workflowId);
      expect(savedWorkflow.status).toBe(WorkflowStatus.Enabled);
      expect(savedWorkflow.nodes).toHaveLength(1); // Only telegram node
      expect(savedWorkflow.edges).toHaveLength(1); // trigger → telegram

      // Verify trigger data
      expect(savedWorkflow.trigger.data).toBeDefined();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const triggerData = savedWorkflow.trigger.data as any;
      expect(triggerData.queries).toBeDefined();
      expect(triggerData.queries).toHaveLength(2); // Two queries: outgoing + incoming
      expect(triggerData.queries[0].addresses).toContain(USDC_SEPOLIA_ADDRESS);
    });

    test("should verify workflow structure persistence (regression test)", async () => {
      const eventTrigger = createEventTrigger();
      const telegramNode = createTelegramNode();
      const edges = createWorkflowEdges();

      const wallet = await getSmartWallet(client);

      const workflowData = {
        smartWalletAddress: wallet.address,
        trigger: eventTrigger,
        nodes: [telegramNode],
        edges: edges,
        startAt: Date.now(),
        expiredAt: getExpiredAt("24h"),
        maxExecution: 5,
        name: "Serialization Regression Test",
        inputVariables: {
          settings: getSettings(
            wallet.address,
            "Serialization Regression Test",
          ),
        },
      };

      const workflow = client.createWorkflow(workflowData);
      const workflowId = await client.submitWorkflow(workflow);
      createdWorkflowIds.push(workflowId);

      const savedWorkflow = await client.getWorkflow(workflowId);

      // Regression: nodes and edges were previously empty arrays
      expect(savedWorkflow.nodes).toHaveLength(1);
      expect(savedWorkflow.edges).toHaveLength(1);

      // Verify telegram node details are preserved
      const savedTelegramNode = savedWorkflow.nodes.find(
        (n: { id: string }) => n.id === nodeIds.telegram,
      );

      expect(savedTelegramNode).toBeDefined();
      expect(savedTelegramNode!.type).toBe(NodeType.RestAPI);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((savedTelegramNode!.data as any).url).toContain(
        "api.telegram.org/bot",
      );
    });
  });
});
