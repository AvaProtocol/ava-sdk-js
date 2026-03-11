import util from "util";
import {
  describe,
  beforeAll,
  test,
  expect,
  afterAll,
} from "@jest/globals";
import { ethers } from "ethers";
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
  getExpiredAt,
  getInputVariables,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";

const config = getConfig();
const { chainId, telegramBotToken, telegramChatId } = config;

// --- AAVE V3 Sepolia addresses ---
const AAVE_V3_POOL_ADDRESS = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";
const AAVE_FAUCET_ADDRESS = "0xC959483DBa39aa9E78757139af0e9a2EDEb3f42D";
// Use LINK (no supply cap, mintable, collateral enabled) as collateral
// Borrow DAI (borrow cap unlimited, borrowing enabled) as debt
// DAI/USDC supply caps are exceeded on Sepolia, but borrowing is unaffected
const SEPOLIA_LINK = "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5";
const SEPOLIA_DAI = "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357";

// Target: healthFactor between 1.0e18 and 1.6e18 so Branch condition `< 1.6e18` triggers
const TARGET_HF_MIN = BigInt("1000000000000000000"); // 1.0e18
const TARGET_HF_MAX = BigInt("1600000000000000000"); // 1.6e18

// Supply 100 LINK as collateral (LINK: no supply cap, LTV 70%, liqThreshold 75%)
const LINK_SUPPLY_AMOUNT = ethers.parseUnits("100", 18);

// Minimal ABIs for AAVE interactions
const POOL_ABI = [
  "function getUserAccountData(address user) view returns (uint256 totalCollateralBase, uint256 totalDebtBase, uint256 availableBorrowsBase, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)",
  "function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)",
  "function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf)",
  "function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) returns (uint256)",
  "function withdraw(address asset, uint256 amount, address to) returns (uint256)",
];
const FAUCET_ABI = [
  "function mint(address token, address to, uint256 amount)",
];
const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
];

/**
 * Ensures the EOA wallet has an AAVE V3 position on Sepolia with
 * healthFactor between 1.0 and 1.6 (so the Branch condition triggers).
 *
 * Idempotent: if position already meets criteria, does nothing.
 * Otherwise: mints LINK via faucet → approves → supplies LINK → borrows DAI.
 *
 * Uses LINK as collateral (no supply cap, mintable) and DAI as debt (borrow cap unlimited).
 * DAI/USDC/USDT supply caps are exceeded on Sepolia, but borrowing is unaffected.
 */
async function ensureAavePosition(eoaAddress: string): Promise<void> {
  const provider = new ethers.JsonRpcProvider(config.chainEndpoint);
  const signer = new ethers.Wallet(config.walletPrivateKey, provider);
  const pool = new ethers.Contract(AAVE_V3_POOL_ADDRESS, POOL_ABI, signer);

  // Check current position
  const accountData = await pool.getUserAccountData(eoaAddress);
  const healthFactor = accountData.healthFactor as bigint;
  const totalDebt = accountData.totalDebtBase as bigint;

  console.log("Current AAVE position:", {
    totalCollateralBase: accountData.totalCollateralBase.toString(),
    totalDebtBase: totalDebt.toString(),
    healthFactor: healthFactor.toString(),
  });

  // If position exists and HF is in target range, do nothing
  if (totalDebt > 0n && healthFactor >= TARGET_HF_MIN && healthFactor < TARGET_HF_MAX) {
    console.log("AAVE position already meets criteria (HF in [1.0, 1.6)). Skipping setup.");
    return;
  }

  console.log("Setting up AAVE position: mint LINK -> supply -> borrow DAI...");

  const faucet = new ethers.Contract(AAVE_FAUCET_ADDRESS, FAUCET_ABI, signer);
  const link = new ethers.Contract(SEPOLIA_LINK, ERC20_ABI, signer);

  // Step 1: Mint LINK from Sepolia faucet
  const linkBalance = await link.balanceOf(eoaAddress);
  if (linkBalance < LINK_SUPPLY_AMOUNT) {
    console.log("Minting LINK from faucet...");
    const mintTx = await faucet.mint(SEPOLIA_LINK, eoaAddress, LINK_SUPPLY_AMOUNT);
    await mintTx.wait();
    console.log("LINK minted:", mintTx.hash);
  }

  // Step 2: Approve Pool to spend LINK
  console.log("Approving LINK for Pool...");
  const approveTx = await link.approve(AAVE_V3_POOL_ADDRESS, LINK_SUPPLY_AMOUNT);
  await approveTx.wait();

  // Step 3: Supply LINK as collateral
  console.log("Supplying LINK to AAVE Pool...");
  const supplyTx = await pool.supply(SEPOLIA_LINK, LINK_SUPPLY_AMOUNT, eoaAddress, 0);
  await supplyTx.wait();
  console.log("LINK supplied:", supplyTx.hash);

  // Step 4: Calculate DAI borrow amount for target HF ≈ 1.5
  // After supply, get the updated account data to know our borrowing power
  const postSupply = await pool.getUserAccountData(eoaAddress);
  const collateralBase = postSupply.totalCollateralBase as bigint; // base currency (8 decimals, USD)
  const liqThreshold = postSupply.currentLiquidationThreshold as bigint; // bps (e.g. 7500 = 75%)
  const existingDebt = postSupply.totalDebtBase as bigint;

  // Target HF = 1.5: debtNeeded = (collateral * liqThreshold) / (targetHF * 10000)
  // collateralBase and debtBase are in the same units (USD with 8 decimals)
  const TARGET_HF = 15n; // 1.5 * 10
  const debtNeeded = (collateralBase * liqThreshold) / (TARGET_HF * 1000n);
  const additionalDebt = debtNeeded > existingDebt ? debtNeeded - existingDebt : 0n;

  if (additionalDebt > 0n) {
    // additionalDebt is in base currency (USD with 8 decimals)
    // DAI ≈ $1, so DAI amount (18 decimals) ≈ additionalDebt * 1e10
    const daiBorrowAmount = additionalDebt * BigInt(1e10);

    console.log("Borrow calculation:", {
      collateralBase: collateralBase.toString(),
      liqThreshold: liqThreshold.toString(),
      existingDebt: existingDebt.toString(),
      debtNeeded: debtNeeded.toString(),
      additionalDebt: additionalDebt.toString(),
      daiBorrowAmount: ethers.formatUnits(daiBorrowAmount, 18),
    });

    // Borrow DAI (variable rate = 2)
    console.log("Borrowing DAI from AAVE Pool...");
    const borrowTx = await pool.borrow(SEPOLIA_DAI, daiBorrowAmount, 2, 0, eoaAddress);
    await borrowTx.wait();
    console.log("DAI borrowed:", borrowTx.hash);
  }

  // Verify final position
  const finalData = await pool.getUserAccountData(eoaAddress);
  console.log("Final AAVE position:", {
    totalCollateralBase: finalData.totalCollateralBase.toString(),
    totalDebtBase: finalData.totalDebtBase.toString(),
    healthFactor: finalData.healthFactor.toString(),
  });

  const finalHF = finalData.healthFactor as bigint;
  if (finalHF < TARGET_HF_MIN || finalHF >= TARGET_HF_MAX) {
    console.warn(
      `Warning: healthFactor ${finalHF.toString()} is outside target range [1.0e18, 1.6e18). ` +
      `Tests may need adjustment.`
    );
  }
}

// Extra timeout for AAVE on-chain setup (mint, supply, borrow) + workflow operations
// Section 3 e2e: ~20s on-chain txs + 180s polling = ~3.5 min
jest.setTimeout(TIMEOUT_DURATION * 7);

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
      addresses: [AAVE_V3_POOL_ADDRESS],
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
      addresses: [AAVE_V3_POOL_ADDRESS],
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
        contractAddress: AAVE_V3_POOL_ADDRESS,
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
      const workflowName = "should simulate AAVE health factor alert workflow";

      // Ensure real AAVE position exists so ContractRead returns actual HF
      await ensureAavePosition(eoaAddress);

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
        expiredAt: getExpiredAt("24h"),
        maxExecution: 10,
        name: workflowName,
      });

      const simulationResult = await client.simulateWorkflow({
        ...workflow,
        inputVariables: {
          settings: {
            name: workflowName,
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

      // With real AAVE position (HF ≈ 1.5 < 1.6), branch takes if path → full success
      expect(simulationResult.status).toBe(ExecutionStatus.Success);
      expect(simulationResult.steps).toHaveLength(4); // trigger + contractRead + branch + telegram
    });

    test("should simulate alert path and send telegram", async () => {
      const workflowName = "should simulate alert path and send telegram";

      // Ensure the EOA has an AAVE position with healthFactor < 1.6e18
      // so the Branch condition `< threshold` triggers the alert path.
      await ensureAavePosition(eoaAddress);

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
        expiredAt: getExpiredAt("24h"),
        maxExecution: 10,
        name: workflowName,
      });

      const simulationResult = await client.simulateWorkflow({
        ...workflow,
        inputVariables: {
          settings: {
            name: workflowName,
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

      // Verify branch took the if path (healthFactor < threshold)
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
    test("should deploy and retrieve workflow correctly", async () => {
      const workflowName = "should deploy and retrieve workflow correctly";

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
        expiredAt: getExpiredAt("24h"),
        maxExecution: 10,
        name: workflowName,
        inputVariables: {
          settings: {
            name: workflowName,
            runner: smartWalletAddress,
            chain: "sepolia",
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
      expect(retrieved.nodes?.length).toBe(3);
      expect(retrieved.edges?.length).toBe(3);

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

    /**
     * End-to-end test: deploy workflow, trigger via on-chain AAVE action, verify execution.
     *
     * Requires the operator to have established its WebSocket subscriptions before the
     * Supply tx is sent. The incremental subscription update (debounce + diff) should
     * add only the new subscription within ~1 second, so a 30s wait is sufficient.
     */
    test("should trigger via on-chain AAVE action and send alert", async () => {
      const workflowName = "should trigger via on-chain AAVE action and send alert";

      // Ensure the EOA has an AAVE position with healthFactor < 1.6e18
      await ensureAavePosition(eoaAddress);

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
        expiredAt: getExpiredAt("24h"),
        maxExecution: 10,
        name: workflowName,
        inputVariables: {
          settings: {
            name: workflowName,
            runner: smartWalletAddress,
            chain: "sepolia",
          },
        },
      });

      const workflowId = await client.submitWorkflow(workflow);
      expect(workflowId).toBeDefined();
      createdWorkflowIds.push(workflowId);
      console.log("Deployed workflow ID:", workflowId);

      // Perform on-chain AAVE action to emit a Supply event
      const provider = new ethers.JsonRpcProvider(config.chainEndpoint);
      const signer = new ethers.Wallet(config.walletPrivateKey, provider);
      const pool = new ethers.Contract(AAVE_V3_POOL_ADDRESS, POOL_ABI, signer);
      const link = new ethers.Contract(SEPOLIA_LINK, ERC20_ABI, signer);
      const faucet = new ethers.Contract(AAVE_FAUCET_ADDRESS, FAUCET_ABI, signer);

      const tinyAmount = ethers.parseUnits("0.001", 18);
      const mintTx = await faucet.mint(SEPOLIA_LINK, eoaAddress, tinyAmount);
      await mintTx.wait();
      const approveTx = await link.approve(AAVE_V3_POOL_ADDRESS, tinyAmount);
      await approveTx.wait();
      const supplyTx = await pool.supply(SEPOLIA_LINK, tinyAmount, eoaAddress, 0);
      const supplyReceipt = await supplyTx.wait();
      console.log("Supply tx:", supplyTx.hash, "block:", supplyReceipt.blockNumber);

      // Poll for execution
      const MAX_POLL_TIME_MS = 180_000;
      const POLL_INTERVAL_MS = 10_000;
      const startTime = Date.now();
      let execution;

      while (Date.now() - startTime < MAX_POLL_TIME_MS) {
        const executions = await client.getExecutions([workflowId], { limit: 1 });
        if (executions.items.length > 0) {
          execution = executions.items[0];
          console.log("Execution found:", execution.id);
          break;
        }
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        console.log(`No execution yet (${elapsed}s elapsed)...`);
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
      }

      expect(execution).toBeDefined();
      if (!execution) return;

      expect(execution.status).toBe(ExecutionStatus.Success);
      expect(execution.steps).toHaveLength(4);
    });
  });
});
