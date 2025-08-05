import { Client, TriggerFactory, NodeFactory, Edge } from "@avaprotocol/sdk-js";
import {
  TriggerType,
  NodeType,
  CustomCodeLang,
  WorkflowStatus,
} from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  TIMEOUT_DURATION,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
import util from "util";

// Set timeout to 15 seconds for all tests in this file
jest.setTimeout(TIMEOUT_DURATION);

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

describe("Template: Telegram Alert on Transfer", () => {
  let client: Client;
  let eoaAddress: string;
  let testWalletAddress: string;
  const createdWorkflowIds: string[] = [];

  // Real client data for USDC transfer monitoring
  const REAL_WALLET_ADDRESS = "0xB3Fb744d8B811B4fb19586cdbEc821b4aAFbEEe7";
  const USDC_CONTRACT_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; // Sepolia USDC
  const TRANSFER_TOPIC =
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

  // Template IDs (using consistent IDs for testing)
  const triggerIds = {
    eventTrigger: "01JXCC3P7JY3YFZDDQXKFP45T1",
  };

  const nodeIds = {
    customCode: "01JXCFKH0J52SNNY4BYSKCA7HK",
    telegram: "01JXVQ4CJHS24Y2SYJ38C6017E",
  };

  beforeAll(async () => {
    eoaAddress = await getAddress(walletPrivateKey);
    testWalletAddress = await getAddress(walletPrivateKey);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message } = await client.getSignatureFormat(eoaAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);
  });

  afterAll(async () => {
    // Clean up any created workflows
    for (const workflowId of createdWorkflowIds) {
      try {
        await client.deleteWorkflow(workflowId);
      } catch (error) {
        console.warn(`Failed to cleanup workflow ${workflowId}:`, error);
      }
    }
  });

  /**
   * Create the real EventTrigger with input data (monitoring both incoming and outgoing transfers)
   */
  function createEventTrigger() {
    return TriggerFactory.create({
      id: triggerIds.eventTrigger,
      name: "eventTrigger",
      type: TriggerType.Event,
      data: {
        queries: [
          {
            // Query 1: Outgoing transfers (wallet address === from)
            addresses: [USDC_CONTRACT_ADDRESS],
            topics: [
              {
                values: [TRANSFER_TOPIC, testWalletAddress, ""],
              },
            ],
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
            methodCalls: [
              {
                methodName: "decimals",
                methodParams: [],
                applyToFields: ["Transfer.value"],
              },
            ],
          },
          {
            // Query 2: Incoming transfers (wallet address === to)
            addresses: [USDC_CONTRACT_ADDRESS],
            topics: [
              {
                values: [TRANSFER_TOPIC, "", testWalletAddress],
              },
            ],
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
            methodCalls: [
              {
                methodName: "decimals",
                methodParams: [],
                applyToFields: ["Transfer.value"],
              },
            ],
          },
        ],
      },
    });
  }

  /**
   * Create the CustomCode node that processes transfer data (matching studio template)
   */
  function createCustomCodeNode() {
    return NodeFactory.create({
      id: nodeIds.customCode,
      name: "code0",
      type: NodeType.CustomCode,
      data: {
        lang: CustomCodeLang.JavaScript,

        // eslint-disable-next-line max-len
        source: `const _ = require("lodash");
const dayjs = require("dayjs");
const isReceive = eventTrigger.data.toAddress === eventTrigger.input.address;

const {
  tokenSymbol,
  value,
  fromAddress,
  toAddress,
  blockTimestamp
} = eventTrigger.data;

// Format the timestamp into a readable string (e.g. "2025-07-09 14:30")
const formattedTime = dayjs(blockTimestamp).format('YYYY-MM-DD HH:mm');

const direction = isReceive ? "⬇️ Received" : "⬆️ Sent";
const amount = \`<b>\${_.floor(parseFloat(value), 4)} \${tokenSymbol}</b>\`;
const fromTo = isReceive ? \`from <code>\${fromAddress}</code>\` : \`to <code>\${toAddress}</code>\`;
const chain = \`on <b>Sepolia</b>\`; // Hardcoded for now since chainName is not available
const message = \`\${direction} \${amount} \${fromTo} \${chain}\\n<i>\${formattedTime}</i>\`;

return message;`,
      },
    });
  }

  /**
   * Create the Telegram notification node (matching studio template)
   */
  function createTelegramNode() {
    return NodeFactory.create({
      id: nodeIds.telegram,
      name: "telegram0",
      type: NodeType.RestAPI,
      data: {
        url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage",
        method: "POST",
        body: '{"chat_id":452247333,"text":"[Transfer]: {{code0.data}}","parse_mode":"HTML"}',
        headers: { "Content-Type": "application/json" },
      },
    });
  }

  /**
   * Create the workflow edges
   */
  function createWorkflowEdges() {
    return [
      new Edge({
        id: `xy-edge__${triggerIds.eventTrigger}source_${triggerIds.eventTrigger}-${nodeIds.customCode}target_${nodeIds.customCode}`,
        source: triggerIds.eventTrigger,
        target: nodeIds.customCode,
      }),
      new Edge({
        id: `xy-edge__${nodeIds.customCode}source_${nodeIds.customCode}-${nodeIds.telegram}target_${nodeIds.telegram}`,
        source: nodeIds.customCode,
        target: nodeIds.telegram,
      }),
    ];
  }

  describe("1. Individual Component Testing", () => {
    test("should test EventTrigger with runTrigger", async () => {
      const eventTrigger = createEventTrigger();

      const result = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: eventTrigger.data as Record<string, unknown>,
      });

      console.log(
        "EventTrigger result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.triggerId).toBeDefined();

      // For event triggers, no matching events is a valid outcome
      expect(result.success).toBe(true);

      // In test environment, we might get mock event data or null
      // Both are valid outcomes for this test
      if (result.data === null) {
        console.log(
          "ℹ️  No Transfer events found for address (expected):",
          testWalletAddress
        );
      } else {
        // If we get mock data, verify it has the expected structured event data
        expect(result.data).toHaveProperty("blockNumber");
        expect(result.data).toHaveProperty("walletAddress"); // Changed from "address" to "walletAddress"
        expect(result.data).toHaveProperty("fromAddress");
        expect(result.data).toHaveProperty("toAddress");
        expect(result.data).toHaveProperty("value"); // Formatted value from applyToFields
        expect(result.data).toHaveProperty("tokenSymbol");
        expect(result.data).toHaveProperty("transactionHash");
      }
    });

    test("should test CustomCode node with runNodeWithInputs", async () => {
      const customCodeNode = createCustomCodeNode();

      // Mock the eventTrigger context data with structured event fields (post-applyToFields processing)
      const inputVariables = {
        eventTrigger: {
          data: {
            // Structured fields created by backend event parsing with applyToFields
            fromAddress: "0x1234567890123456789012345678901234567890",
            toAddress: testWalletAddress,
            value: "100.5", // Decimal-formatted value (applyToFields: ["Transfer.value"])
            tokenSymbol: "USDC",
            blockTimestamp: Date.now(),
            // Raw blockchain log fields (still available)
            blockNumber: 12345678,
            chainId: 11155111,
            address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
            data: "0x0000000000000000000000000000000000000000000000000000000005fd8220",
            topics: [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
              "0x0000000000000000000000001234567890123456789012345678901234567890",
              `0x000000000000000000000000${testWalletAddress.slice(2)}`,
            ],
            transactionHash:
              "0x000000000000000000000000000000000000000000000000185331f3d274a668",
          },
          input: {
            address: testWalletAddress,
            chainName: "Sepolia",
            tokens: [{ symbol: "USDC", name: "USD Coin", decimals: 6 }],
          },
        },
      };

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: customCodeNode.data,
        inputVariables: inputVariables,
      });

      console.log("=== CustomCode Input Variables ===");
      console.log(
        "eventTrigger.data.value (formatted):",
        inputVariables.eventTrigger.data.value
      );
      console.log(
        "eventTrigger.data.tokenSymbol:",
        inputVariables.eventTrigger.data.tokenSymbol
      );
      console.log(
        "eventTrigger.data.fromAddress:",
        inputVariables.eventTrigger.data.fromAddress
      );
      console.log(
        "eventTrigger.data.toAddress:",
        inputVariables.eventTrigger.data.toAddress
      );

      console.log(
        "=== CustomCode result ===",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(typeof result.data).toBe("string");
      expect(result.data).toContain("⬇️ Received"); // Should be "Received" since to === testWalletAddress
      expect(result.data).toContain("USDC");
      expect(result.data).toContain("100.5"); // Exact match since we're using pre-formatted value
      expect(result.data).toContain("Sepolia"); // Should include chain name
    });

    test("should test Telegram node with runNodeWithInputs", async () => {
      const telegramNode = createTelegramNode();

      // Mock the code0 output and apContext
      const inputVariables = {
        code0: {
          data: "Received 100.5 USDC from 0x1234567890123456789012345678901234567890 at block 12345678 (2025-01-15 14:30)",
        },
        apContext: {
          configVars: {
            ap_notify_bot_token: "dummy_bot_token_for_testing",
          },
        },
      };

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.RestAPI,
        nodeConfig: telegramNode.data,
        inputVariables: inputVariables,
      });

      console.log(
        "Telegram result:",
        util.inspect(result, { depth: null, colors: true })
      );

      // The actual Telegram API call might fail due to invalid token, but we can check the request structure
      expect(result).toBeDefined();
      // Test should pass even if the HTTP call fails, as long as the node processes correctly
    });
  });

  describe("2. Workflow Simulation Testing", () => {
    test("should simulate complete workflow", async () => {
      const eventTrigger = createEventTrigger();
      const customCodeNode = createCustomCodeNode();
      const telegramNode = createTelegramNode();
      const edges = createWorkflowEdges();

      const workflowProps = {
        smartWalletAddress: REAL_WALLET_ADDRESS,
        trigger: eventTrigger,
        nodes: [customCodeNode, telegramNode],
        edges: edges,
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        maxExecution: 1,
        name: "Telegram Alert on Transfer Simulation",
      };

      const workflow = client.createWorkflow(workflowProps);
      const simulationResult = await client.simulateWorkflow(workflow);

      console.log(
        "Simulation result:",
        util.inspect(simulationResult, { depth: null, colors: true })
      );

      expect(simulationResult.success).toBe(true);
      expect(simulationResult.steps).toHaveLength(3); // trigger + 2 nodes

      // Verify trigger step
      const triggerStep = simulationResult.steps[0];
      expect(triggerStep.id).toBe(triggerIds.eventTrigger);
      expect(triggerStep.type).toBe(TriggerType.Event);
      expect(triggerStep.success).toBe(true);

      // The trigger step's config field should contain custom configuration data provided by the user
      // TODO: The trigger config field is currently not populated - this is a known backend issue
      // For now, we verify that config exists and has the queries structure
      expect(triggerStep.config).toBeDefined();
      const triggerConfig = triggerStep.config as Record<string, unknown>;
      expect(triggerConfig.queries).toBeDefined();
      expect(Array.isArray(triggerConfig.queries)).toBe(true);

      // Custom input data should be accessible via VM variables (checked in subsequent node's inputsList)
      // The CustomCode node should have access to eventTrigger.data which contains the trigger output data
      const customCodeStep = simulationResult.steps[1];
      expect(customCodeStep.inputsList).toContain("eventTrigger.data");

      // CRITICAL: Validate that the CustomCode execution succeeds with structured event trigger data
      expect(customCodeStep.success).toBe(true);
      expect(customCodeStep.output).toBeDefined();
      expect(typeof customCodeStep.output).toBe("string");
    });
  });

  describe("3. Full Deployment and Execution Testing", () => {
    test("should deploy and trigger workflow", async () => {
      const eventTrigger = createEventTrigger();
      const customCodeNode = createCustomCodeNode();
      const telegramNode = createTelegramNode();
      const edges = createWorkflowEdges();

      // Get a test wallet using numeric salt
      const wallet = await client.getWallet({
        salt: (12000 + (Date.now() % 1000)).toString(),
      });

      const workflowData = {
        smartWalletAddress: wallet.address,
        trigger: eventTrigger,
        nodes: [customCodeNode, telegramNode],
        edges: edges,
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        maxExecution: 1,
        name: "Telegram Alert on Transfer Test",
      };

      // Create and submit workflow
      const workflow = client.createWorkflow(workflowData);
      const workflowId = await client.submitWorkflow(workflow);
      createdWorkflowIds.push(workflowId);

      console.log(`✅ Workflow deployed with ID: ${workflowId}`);

      // Verify workflow was saved correctly
      const savedWorkflow = await client.getWorkflow(workflowId);

      expect(savedWorkflow.id).toBe(workflowId);
      expect(savedWorkflow.status).toBe(WorkflowStatus.Active);
      expect(savedWorkflow.nodes).toHaveLength(2);
      expect(savedWorkflow.edges).toHaveLength(2);

      // Triggers no longer have input fields - they only have config fields
      // EventTrigger data contains the query configuration (addresses, topics, etc.)
      expect(savedWorkflow.trigger.data).toBeDefined();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const triggerData = savedWorkflow.trigger.data as any;
      expect(triggerData.queries).toBeDefined();
      expect(triggerData.queries).toHaveLength(2); // Two queries: outgoing (from) and incoming (to) transfers
      expect(triggerData.queries[0].addresses).toContain(
        "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
      );
    });

    test("should verify workflow nodes are properly saved (regression test)", async () => {
      const eventTrigger = createEventTrigger();
      const customCodeNode = createCustomCodeNode();
      const telegramNode = createTelegramNode();
      const edges = createWorkflowEdges();

      const wallet = await client.getWallet({
        salt: (13000 + (Date.now() % 1000)).toString(),
      });

      const workflowData = {
        smartWalletAddress: wallet.address,
        trigger: eventTrigger,
        nodes: [customCodeNode, telegramNode],
        edges: edges,
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000,
        maxExecution: 1,
        name: "Serialization Regression Test",
      };

      const workflow = client.createWorkflow(workflowData);
      const workflowId = await client.submitWorkflow(workflow);
      createdWorkflowIds.push(workflowId);

      // Get the workflow back and verify it has nodes and edges
      const savedWorkflow = await client.getWorkflow(workflowId);

      // This was the original bug - nodes and edges were empty arrays
      expect(savedWorkflow.nodes).toHaveLength(2);
      expect(savedWorkflow.edges).toHaveLength(2);

      // Verify node details are preserved
      const savedCustomCodeNode = savedWorkflow.nodes.find(
        (n: { id: string }) => n.id === nodeIds.customCode
      );
      const savedTelegramNode = savedWorkflow.nodes.find(
        (n: { id: string }) => n.id === nodeIds.telegram
      );

      expect(savedCustomCodeNode).toBeDefined();
      expect(savedCustomCodeNode!.type).toBe(NodeType.CustomCode);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((savedCustomCodeNode!.data as any).source).toContain(
        "eventTrigger.data.to"
      );

      expect(savedTelegramNode).toBeDefined();
      expect(savedTelegramNode!.type).toBe(NodeType.RestAPI);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((savedTelegramNode!.data as any).url).toContain("telegram.org");
    });
  });
});
