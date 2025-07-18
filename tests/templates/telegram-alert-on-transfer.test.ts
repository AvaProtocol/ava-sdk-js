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

const EVENT_TRIGGER_DATA_ERROR = "Error: eventTrigger.data not available";
const EVENT_TRIGGER_TOPICS_ERROR =
  "Error: eventTrigger.data.topics not available - keys: ";

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
   * Create the real EventTrigger with input data
   */
  function createEventTrigger() {
    return TriggerFactory.create({
      id: triggerIds.eventTrigger,
      name: "eventTrigger",
      type: TriggerType.Event,
      data: {
        queries: [
          {
            type: "event",
            addresses: [USDC_CONTRACT_ADDRESS],
            topics: [
              {
                values: [
                  TRANSFER_TOPIC,
                  testWalletAddress, // from address
                  null, // to address (any)
                ],
              },
            ],
          },
          {
            type: "event",
            addresses: [USDC_CONTRACT_ADDRESS],
            topics: [
              {
                values: [
                  TRANSFER_TOPIC,
                  null, // from address (any)
                  testWalletAddress, // to address
                ],
              },
            ],
          },
        ],
      },
      input: {
        tokens: [
          {
            name: "USD Coin",
            symbol: "USDC",
            address: USDC_CONTRACT_ADDRESS,
            decimals: 6,
          },
        ],
        address: testWalletAddress,
        chainId: 11155111, // Sepolia
        subType: "transfer",
      },
    });
  }

  /**
   * Create the CustomCode node that processes transfer data
   */
  function createCustomCodeNode() {
    return NodeFactory.create({
      id: nodeIds.customCode,
      name: "code0",
      type: NodeType.CustomCode,
      data: {
        lang: CustomCodeLang.JavaScript,
        source: `const _ = require("lodash");
const dayjs = require("dayjs");

if (!eventTrigger || !eventTrigger.data) {
  return "${EVENT_TRIGGER_DATA_ERROR}";
}

if (!eventTrigger.data.topics) {
  return "${EVENT_TRIGGER_TOPICS_ERROR}" + Object.keys(eventTrigger.data).join(", ");
}

// Extract addresses from topics (ERC20 Transfer event structure)
// topics[0] = event signature
// topics[1] = from address (padded to 32 bytes)
// topics[2] = to address (padded to 32 bytes)
const fromAddress = eventTrigger.data.topics[1] ? '0x' + eventTrigger.data.topics[1].slice(-40) : 'unknown';
const toAddress = eventTrigger.data.topics[2] ? '0x' + eventTrigger.data.topics[2].slice(-40) : 'unknown';

// Decode value from rawData (assuming 18 decimals for USDC-like token)
const rawValue = eventTrigger.data.rawData;
const valueWei = parseInt(rawValue, 16);
const valueFormatted = valueWei / Math.pow(10, 18); // Assuming 18 decimals

// Check if this is a receive or send (compare with wallet address if available)
const walletAddress = eventTrigger.input?.address?.toLowerCase();
const isReceive = walletAddress && toAddress.toLowerCase() === walletAddress;

const blockNumber = eventTrigger.data.blockNumber;
const tokenSymbol = "USDC"; // Default token symbol

// Use current time since blockTimestamp is no longer available
const formattedTime = dayjs().format('YYYY-MM-DD HH:mm');

const message = \`\${isReceive ? "Received" : "Sent"} \${_.floor(valueFormatted, 4)} \${tokenSymbol} \${isReceive ? \`from \${fromAddress}\` : \`to \${toAddress}\`} at block \${blockNumber} (\${formattedTime})\`;

return message;`,
      },
      input: undefined,
    });
  }

  /**
   * Create the Telegram notification node
   */
  function createTelegramNode() {
    return NodeFactory.create({
      id: nodeIds.telegram,
      name: "telegram0",
      type: NodeType.RestAPI,
      data: {
        url: "https://api.telegram.org/bot{{apContext.configVars.ap_notify_bot_token}}/sendMessage",
        method: "POST",
        body: '{"chat_id":452247333,"text":"[Transfer]: {{code0.data}}"}',
        headersMap: [["Content-Type", "application/json"]],
      },
      input: undefined,
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
      console.log("🔍 Testing EventTrigger individually...");

      const eventTrigger = createEventTrigger();

      const result = await client.runTrigger({
        triggerType: TriggerType.Event,
        triggerConfig: eventTrigger.data,
        inputVariables: {
          eventTrigger: {
            input: eventTrigger.input,
          },
        },
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
        console.log("ℹ️  Mock event data returned for testing:", result.data);
        // If we get mock data, verify it has the expected structure
        expect(result.data).toHaveProperty("blockNumber");
        expect(result.data).toHaveProperty("eventType");
        expect(result.data).toHaveProperty("topics");
      }
    });

    test("should test CustomCode node with runNodeWithInputs", async () => {
      console.log("🔍 Testing CustomCode node individually...");

      const customCodeNode = createCustomCodeNode();

      // Mock the eventTrigger context data with actual event structure
      const inputVariables = {
        eventTrigger: {
          data: {
            blockNumber: 12345678,
            chainId: 11155111,
            contractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
            eventDescription: "ERC20 Transfer event",
            eventFound: true,
            eventSignature:
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            eventType: "Transfer",
            logIndex: 0,
            rawData:
              "0x00000000000000000000000000000000000000000000000572b7b98736c20000", // ~100.5 tokens with 18 decimals
            topics: [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", // Transfer event signature
              "0x0000000000000000000000001234567890123456789012345678901234567890", // from address (padded)
              `0x000000000000000000000000${testWalletAddress.slice(2)}`, // to address (padded)
            ],
            transactionHash:
              "0x000000000000000000000000000000000000000000000000185331f3d274a668",
          },
          input: {
            address: testWalletAddress,
            tokens: [{ symbol: "USDC", name: "USD Coin" }],
          },
        },
      };

      const result = await client.runNodeWithInputs({
        nodeType: NodeType.CustomCode,
        nodeConfig: customCodeNode.data,
        inputVariables: inputVariables,
      });

      console.log(
        "CustomCode result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(typeof result.data).toBe("string");
      expect(result.data).toContain("Received");
      expect(result.data).toContain("USDC");
      expect(result.data).toContain("100.5");
    });

    test("should test Telegram node with runNodeWithInputs", async () => {
      console.log("🔍 Testing Telegram RestAPI node individually...");

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

      // The trigger step's input field contains configuration (queries), not custom input data
      expect(triggerStep.input).toBeDefined();
      expect(triggerStep.input.queries).toBeDefined();
      expect(triggerStep.input.queries).toHaveLength(2);

      // Custom input data should be accessible via VM variables (checked in subsequent node's inputsList)
      // The CustomCode node should have access to eventTrigger.input which contains the custom input data
      const customCodeStep = simulationResult.steps[1];
      expect(customCodeStep.inputsList).toContain("eventTrigger.input");
      expect(customCodeStep.inputsList).toContain("eventTrigger.data");

      // CRITICAL: Validate that the CustomCode execution succeeds with proper event trigger data
      // The test should fail if eventTrigger.data.topics is not available
      expect(customCodeStep.success).toBe(true);
      expect(customCodeStep.output).toBeDefined();
      expect(typeof customCodeStep.output).toBe("string");
      expect(customCodeStep.output).not.toContain(EVENT_TRIGGER_TOPICS_ERROR);
      expect(customCodeStep.output).not.toContain(EVENT_TRIGGER_DATA_ERROR);

      console.log("✅ Event trigger simulation completed successfully");
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

      // Verify trigger has input data
      expect(savedWorkflow.trigger.input).toBeDefined();
      expect(savedWorkflow.trigger.input.tokens).toHaveLength(1);
      expect(savedWorkflow.trigger.input.tokens[0].symbol).toBe("USDC");

      console.log("🎉 Full workflow deployment test completed successfully!");
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

      console.log("Saved workflow nodes:", savedWorkflow.nodes.length);
      console.log("Saved workflow edges:", savedWorkflow.edges.length);

      // This was the original bug - nodes and edges were empty arrays
      expect(savedWorkflow.nodes).toHaveLength(2);
      expect(savedWorkflow.edges).toHaveLength(2);

      // Verify node details are preserved
      const savedCustomCodeNode = savedWorkflow.nodes.find(
        (n) => n.id === nodeIds.customCode
      );
      const savedTelegramNode = savedWorkflow.nodes.find(
        (n) => n.id === nodeIds.telegram
      );

      expect(savedCustomCodeNode).toBeDefined();
      expect(savedCustomCodeNode!.type).toBe(NodeType.CustomCode);
      expect(savedCustomCodeNode!.data.source).toContain(
        "eventTrigger.data.topics"
      );

      expect(savedTelegramNode).toBeDefined();
      expect(savedTelegramNode!.type).toBe(NodeType.RestAPI);
      expect(savedTelegramNode!.data.url).toContain("telegram.org");
    });
  });
});
