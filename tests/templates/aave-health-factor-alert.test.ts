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
} from "@avaprotocol/types";
import {
  getNextId,
  TIMEOUT_DURATION,
  getClient,
  authenticateClient,
  getSmartWalletWithBalance,
  getEOAAddress,
  padAddressForTopic,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";

const { chainId, telegramBotToken, telegramChatId } = getConfig();

jest.setTimeout(TIMEOUT_DURATION * 4);

/**
 * Template: AAVE Health Factor Alert on Sepolia
 *
 * Workflow: "Send me a telegram alert when the AAVE Health Factor of my wallet drops below 1.6"
 *
 * Architecture:
 *   EventTrigger (AAVE V3 Pool events filtered by user address)
 *     → ContractRead (getUserAccountData)
 *     → Branch (healthFactor < 1.6e18)
 *       → if: Telegram (RestAPI with options.summarize for AI-generated message)
 *       → else: (no action)
 *
 * The EventTrigger monitors AAVE V3 Pool events (Supply, Withdraw, Borrow, Repay,
 * LiquidationCall) that indicate the user's position changed. Only when such an event
 * fires does the workflow check the actual health factor via ContractRead.
 *
 * This is zero-cost until something happens — no constant polling.
 */
describe("Template: AAVE Health Factor Alert", () => {
  let client: Client;
  let smartWalletAddress: string;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  // AAVE V3 Pool on Sepolia
  const AAVE_V3_POOL_SEPOLIA = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";

  // Health factor threshold: 1.6 * 10^18 (AAVE uses 18 decimals for healthFactor)
  const HEALTH_FACTOR_THRESHOLD = "1600000000000000000";

  // AAVE V3 Pool event topic0 hashes (keccak256 of canonical signatures)
  // keccak256 of canonical event signatures — verified with ethers.id()
  const AAVE_EVENT_TOPICS = {
    Supply:
      "0x2b627736bca15cd5381dcf80b0bf11fd197d01a037c52b927a881a10fb73ba61",
    Withdraw:
      "0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7",
    Borrow:
      "0xb3d084820fb1a9decffb176436bd02558d15fac9b0ddfed8c465bc7359d7dce0",
    Repay:
      "0xa534c8dbe71f871f9f3530e97a74601fea17b426cae02e1c5aee42c96c784051",
    LiquidationCall:
      "0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286",
    ReserveUsedAsCollateralEnabled:
      "0x00058a56ea94653cdf4f152d227ace22d4c00ad99e2a43f58cb7d9e3feb295f2",
    ReserveUsedAsCollateralDisabled:
      "0x44c58d81365b66dd4b1a7f36c25aa97b8c71c361ee4937adc1a00000227db5dd",
  };

  // AAVE V3 Pool ABI (only getUserAccountData for ContractRead)
  const AAVE_POOL_ABI = [
    {
      inputs: [
        { internalType: "address", name: "user", type: "address" },
      ],
      name: "getUserAccountData",
      outputs: [
        { internalType: "uint256", name: "totalCollateralBase", type: "uint256" },
        { internalType: "uint256", name: "totalDebtBase", type: "uint256" },
        { internalType: "uint256", name: "availableBorrowsBase", type: "uint256" },
        { internalType: "uint256", name: "currentLiquidationThreshold", type: "uint256" },
        { internalType: "uint256", name: "ltv", type: "uint256" },
        { internalType: "uint256", name: "healthFactor", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function" as const,
    },
  ];

  // AAVE V3 Pool event ABI (for EventTrigger decoding)
  const AAVE_EVENT_ABI = [
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "reserve", type: "address" },
        { indexed: false, internalType: "address", name: "user", type: "address" },
        { indexed: true, internalType: "address", name: "onBehalfOf", type: "address" },
        { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
        { indexed: true, internalType: "uint16", name: "referralCode", type: "uint16" },
      ],
      name: "Supply",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "reserve", type: "address" },
        { indexed: true, internalType: "address", name: "user", type: "address" },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "Withdraw",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "reserve", type: "address" },
        { indexed: false, internalType: "address", name: "user", type: "address" },
        { indexed: true, internalType: "address", name: "onBehalfOf", type: "address" },
        { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
        { indexed: false, internalType: "uint8", name: "interestRateMode", type: "uint8" },
        { indexed: false, internalType: "uint256", name: "borrowRate", type: "uint256" },
        { indexed: true, internalType: "uint16", name: "referralCode", type: "uint16" },
      ],
      name: "Borrow",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: "address", name: "reserve", type: "address" },
        { indexed: true, internalType: "address", name: "user", type: "address" },
        { indexed: true, internalType: "address", name: "repayer", type: "address" },
        { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
        { indexed: false, internalType: "bool", name: "useATokens", type: "bool" },
      ],
      name: "Repay",
      type: "event",
    },
  ];

  // Node and trigger IDs
  const triggerId = getNextId();
  const contractReadId = getNextId();
  const branchId = getNextId();
  const telegramId = getNextId();

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);
    const smartWallet = await getSmartWalletWithBalance(client);
    smartWalletAddress = smartWallet.address;
    eoaAddress = await getEOAAddress();
    console.log("EOA address (monitored):", eoaAddress);
    console.log("Smart wallet address (runner):", smartWalletAddress);
    console.log("Chain ID:", chainId);
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
   * EventTrigger: Monitor AAVE V3 Pool events filtered by the owner's EOA address.
   * The smart wallet runs the workflow and pays gas, but we monitor the EOA's AAVE position.
   *
   * Two queries needed because user address is at different topic positions:
   * - Query 1 (topic2): Supply, Withdraw, Borrow, Repay, collateral toggles
   * - Query 2 (topic3): LiquidationCall
   */
  function createEventTrigger() {
    const paddedWallet = padAddressForTopic(eoaAddress);

    // Each event type needs its own query since the SDK sends each topic as a
    // single hex string (no OR-array support at topic[0] level).
    // Events with user at topic2: Supply, Withdraw, Borrow, Repay, collateral toggles
    // Events with user at topic3: LiquidationCall
    const userAtTopic2Events = [
      { topic0: AAVE_EVENT_TOPICS.Supply, abi: AAVE_EVENT_ABI },
      { topic0: AAVE_EVENT_TOPICS.Withdraw, abi: AAVE_EVENT_ABI },
      { topic0: AAVE_EVENT_TOPICS.Borrow, abi: AAVE_EVENT_ABI },
      { topic0: AAVE_EVENT_TOPICS.Repay, abi: AAVE_EVENT_ABI },
    ];

    const queries = userAtTopic2Events.map((evt) => ({
      addresses: [AAVE_V3_POOL_SEPOLIA],
      topics: [
        evt.topic0,
        null, // topic1: any reserve
        paddedWallet, // topic2: owner's EOA address
      ],
      maxEventsPerBlock: 10,
      contractAbi: evt.abi,
    }));

    // Add LiquidationCall query (user at topic3)
    queries.push({
      addresses: [AAVE_V3_POOL_SEPOLIA],
      topics: [
        AAVE_EVENT_TOPICS.LiquidationCall,
        null, // topic1: any collateral asset
        null, // topic2: any debt asset
        paddedWallet, // topic3: owner's EOA address
      ] as (string | null)[],
      maxEventsPerBlock: 10,
      contractAbi: [
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "collateralAsset", type: "address" },
            { indexed: true, internalType: "address", name: "debtAsset", type: "address" },
            { indexed: true, internalType: "address", name: "user", type: "address" },
            { indexed: false, internalType: "uint256", name: "debtToCover", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "liquidatedCollateralAmount", type: "uint256" },
            { indexed: false, internalType: "address", name: "liquidator", type: "address" },
            { indexed: false, internalType: "bool", name: "receiveAToken", type: "bool" },
          ],
          name: "LiquidationCall",
          type: "event",
        },
      ],
    });

    return TriggerFactory.create({
      id: triggerId,
      name: "eventTrigger",
      type: TriggerType.Event,
      data: { queries },
    });
  }

  /**
   * ContractRead node: Calls getUserAccountData(eoaAddress) on AAVE V3 Pool.
   * Reads the EOA's AAVE position (not the smart wallet's).
   * Returns: totalCollateralBase, totalDebtBase, availableBorrowsBase,
   *          currentLiquidationThreshold, ltv, healthFactor
   */
  function createContractReadNode() {
    return NodeFactory.create({
      id: contractReadId,
      name: "aave_account_data",
      type: NodeType.ContractRead,
      data: {
        contractAddress: AAVE_V3_POOL_SEPOLIA,
        contractAbi: AAVE_POOL_ABI,
        methodCalls: [
          {
            methodName: "getUserAccountData",
            methodParams: [eoaAddress],
          },
        ],
      },
    });
  }

  /**
   * Branch node: Checks if healthFactor < threshold (1.6e18).
   * AAVE returns healthFactor as uint256 with 18 decimals.
   * If no debt position exists, healthFactor = type(uint256).max (infinite health).
   */
  function createBranchNode() {
    return NodeFactory.create({
      id: branchId,
      name: "check_health",
      type: NodeType.Branch,
      data: {
        conditions: [
          {
            id: "0",
            type: "if",
            expression: `BigInt(aave_account_data.data.getUserAccountData.healthFactor) < BigInt("${HEALTH_FACTOR_THRESHOLD}")`,
          },
          { id: "1", type: "else", expression: "" },
        ],
      },
    });
  }

  /**
   * Telegram node: Posts alert via REST API to Telegram Bot API.
   * Uses options.summarize to let the aggregator AI auto-generate the message
   * from the workflow context (AAVE account data, health factor, etc.).
   */
  function createTelegramNode() {
    return NodeFactory.create({
      id: telegramId,
      name: "telegram_alert",
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
   * Wire the workflow edges:
   * EventTrigger → ContractRead → Branch
   *   Branch.0 (if) → Telegram (AI-summarized message)
   *   Branch.1 (else) → (no action, workflow ends)
   */
  function createEdges() {
    return [
      new Edge({
        id: getNextId(),
        source: triggerId,
        target: contractReadId,
      }),
      new Edge({
        id: getNextId(),
        source: contractReadId,
        target: branchId,
      }),
      new Edge({
        id: getNextId(),
        source: branchId + ".0", // if: healthFactor < threshold
        target: telegramId,
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
        util.inspect(result, { depth: null, colors: true })
      );

      // For a fresh wallet with no AAVE activity, we expect no matching events
      expect(typeof result.success).toBe("boolean");

      if (result.data === null) {
        console.log(
          "No AAVE events found for wallet (expected for fresh wallet):",
          smartWalletAddress
        );
        expect(result.success).toBe(false);
      } else {
        expect(result.success).toBe(true);
        expect(result.data).toHaveProperty("blockNumber");
      }
    });

    test("should test ContractRead node with runNodeWithInputs", async () => {
      const contractReadNode = createContractReadNode();

      const result = await client.runNodeWithInputs({
        node: contractReadNode,
        inputVariables: {},
      });

      console.log(
        "ContractRead result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();

      // getUserAccountData should return data even for wallets with no AAVE position
      // (all zeros except healthFactor = uint256 max when no debt)
      if (result.success) {
        const data = result.data as Record<string, unknown>;
        expect(data).toHaveProperty("getUserAccountData");

        const accountData = (data as Record<string, Record<string, unknown>>).getUserAccountData;
        expect(accountData).toHaveProperty("healthFactor");
        expect(accountData).toHaveProperty("totalCollateralBase");
        expect(accountData).toHaveProperty("totalDebtBase");

        console.log("Health Factor:", accountData.healthFactor);
        console.log("Total Collateral:", accountData.totalCollateralBase);
        console.log("Total Debt:", accountData.totalDebtBase);
      }
    });

    test("should test Branch node condition evaluation", async () => {
      const branchNode = createBranchNode();

      // Simulate with mock data where healthFactor = 1.4e18 (below 1.6 threshold)
      const result = await client.runNodeWithInputs({
        node: branchNode,
        inputVariables: {
          aave_account_data: {
            data: {
              getUserAccountData: {
                totalCollateralBase: "150000000000",
                totalDebtBase: "100000000000",
                availableBorrowsBase: "20000000000",
                currentLiquidationThreshold: "8250",
                ltv: "7500",
                healthFactor: "1400000000000000000", // 1.4e18 — below 1.6 threshold
              },
            },
          },
        },
      });

      console.log(
        "Branch result (HF=1.4, should trigger if branch):",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
    });

    test("should test Branch node when health factor is safe", async () => {
      const branchNode = createBranchNode();

      // Simulate with healthFactor = 2.5e18 (above 1.6 threshold)
      const result = await client.runNodeWithInputs({
        node: branchNode,
        inputVariables: {
          aave_account_data: {
            data: {
              getUserAccountData: {
                totalCollateralBase: "250000000000",
                totalDebtBase: "50000000000",
                availableBorrowsBase: "100000000000",
                currentLiquidationThreshold: "8250",
                ltv: "7500",
                healthFactor: "2500000000000000000", // 2.5e18 — above 1.6 threshold
              },
            },
          },
        },
      });

      console.log(
        "Branch result (HF=2.5, should trigger else branch):",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
    });
  });

  describe("2. Workflow Simulation Testing", () => {
    test("should simulate AAVE health factor alert workflow", async () => {
      const eventTrigger = createEventTrigger();
      const contractReadNode = createContractReadNode();
      const branchNode = createBranchNode();
      const telegramNode = createTelegramNode();
      const edges = createEdges();

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger: eventTrigger,
        nodes: [contractReadNode, branchNode, telegramNode],
        edges,
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000,
        maxExecution: 10,
        name: "AAVE Health Factor Alert",
      });

      console.log(
        "Simulating AAVE workflow:",
        util.inspect(
          {
            trigger: { id: eventTrigger.id, type: "Event" },
            nodes: [contractReadNode, branchNode, telegramNode].map(
              (n) => ({ id: n.id, name: n.name, type: n.type })
            ),
            edges: edges.map((e) => ({ source: e.source, target: e.target })),
          },
          { depth: null, colors: true }
        )
      );

      const simulationResult = await client.simulateWorkflow({
        ...workflow,
        inputVariables: {
          settings: {
            name: "AAVE Health Factor Alert",
            runner: smartWalletAddress,
            chain: "sepolia",
          },
        },
      });

      console.log(
        "Simulation result:",
        util.inspect(simulationResult, { depth: 5, colors: true })
      );

      expect(simulationResult).toBeDefined();

      // The wallet has no AAVE debt, so healthFactor = uint256.max,
      // branch takes the else path, and Telegram is skipped.
      expect(simulationResult.status).toBe(ExecutionStatus.PartialSuccess);
      expect(simulationResult.steps).toHaveLength(3); // trigger + contractRead + branch
    });

    test("should simulate alert path and send telegram", async () => {
      // Full e2e simulation: EventTrigger → ContractRead → Branch → Telegram.
      // The EOA has no AAVE debt, so ContractRead returns healthFactor = uint256.max.
      // We use a Branch condition `healthFactor > threshold` to intentionally trigger
      // the alert path with the real on-chain value — no mocking needed.
      const eventTrigger = createEventTrigger();
      const contractReadNode = createContractReadNode();
      const telegramNode = createTelegramNode();

      // Branch: healthFactor > 1.6e18 → triggers for uint256.max (no-debt wallet)
      const alertBranchNode = NodeFactory.create({
        id: branchId,
        name: "check_health",
        type: NodeType.Branch,
        data: {
          conditions: [
            {
              id: "0",
              type: "if",
              expression: `BigInt(aave_account_data.data.getUserAccountData.healthFactor) > BigInt("${HEALTH_FACTOR_THRESHOLD}")`,
            },
            { id: "1", type: "else", expression: "" },
          ],
        },
      });

      const edges = [
        new Edge({ id: getNextId(), source: triggerId, target: contractReadId }),
        new Edge({ id: getNextId(), source: contractReadId, target: branchId }),
        new Edge({ id: getNextId(), source: branchId + ".0", target: telegramId }),
      ];

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger: eventTrigger,
        nodes: [contractReadNode, alertBranchNode, telegramNode],
        edges,
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000,
        maxExecution: 10,
        name: "AAVE Health Factor Alert",
      });

      const simulationResult = await client.simulateWorkflow({
        ...workflow,
        inputVariables: {
          settings: {
            name: "AAVE Health Factor Alert",
            runner: smartWalletAddress,
            chain: "sepolia",
          },
        },
      });

      console.log(
        "Alert path simulation result:",
        util.inspect(simulationResult, { depth: 5, colors: true })
      );

      expect(simulationResult).toBeDefined();
      expect(simulationResult.status).toBe(ExecutionStatus.Success);

      // All 4 steps: trigger + contractRead + branch + telegram
      expect(simulationResult.steps).toHaveLength(4);

      // Verify branch took the if path (healthFactor > threshold)
      const branchStep = simulationResult.steps.find(
        (s: { type: string }) => s.type === "branch"
      );
      expect(branchStep?.success).toBe(true);
      expect((branchStep?.output as { conditionId: string })?.conditionId).toContain(".0");

      // Verify Telegram was called successfully with AI-summarized message
      const telegramStep = simulationResult.steps.find(
        (s: { type: string }) => s.type === "restApi"
      );
      expect(telegramStep?.success).toBe(true);

      console.log(
        "Telegram step output:",
        util.inspect(telegramStep?.output, { depth: null, colors: true })
      );
    });
  });

  describe("3. Workflow Deployment Testing", () => {
    test("should deploy and persist AAVE health factor alert workflow", async () => {
      const eventTrigger = createEventTrigger();
      const contractReadNode = createContractReadNode();
      const branchNode = createBranchNode();
      const telegramNode = createTelegramNode();
      const edges = createEdges();

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger: eventTrigger,
        nodes: [contractReadNode, branchNode, telegramNode],
        edges,
        startAt: Date.now(),
        expiredAt: Date.now() + 24 * 60 * 60 * 1000,
        maxExecution: 10,
        name: "AAVE Health Factor Alert",
      });

      const workflowId = await client.submitWorkflow(workflow);
      expect(workflowId).toBeDefined();
      expect(typeof workflowId).toBe("string");
      createdWorkflowIds.push(workflowId);

      console.log("Deployed workflow ID:", workflowId);

      // Verify the workflow can be retrieved
      const retrieved = await client.getWorkflow(workflowId);
      expect(retrieved).toBeDefined();
      expect(retrieved.id).toBe(workflowId);

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
          { depth: null, colors: true }
        )
      );
    });
  });
});
