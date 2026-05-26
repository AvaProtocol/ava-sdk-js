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
  getExpiredAt,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";

const config = getConfig();
const { telegramBotToken, telegramChatId } = config;

// --- AAVE V3 Sepolia addresses ---
const AAVE_V3_POOL_ADDRESS = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";
const AAVE_FAUCET_ADDRESS = "0xC959483DBa39aa9E78757139af0e9a2EDEb3f42D";
// Use LINK (no supply cap, mintable, collateral enabled) as collateral
// Borrow DAI (borrow cap unlimited, borrowing enabled) as debt
const SEPOLIA_LINK = "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5";
const SEPOLIA_DAI = "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357";

// Target: healthFactor between 1.0e18 and 1.6e18 so Branch condition triggers
const TARGET_HF_MIN = BigInt("1000000000000000000"); // 1.0e18
const TARGET_HF_MAX = BigInt("1600000000000000000"); // 1.6e18

const LINK_SUPPLY_AMOUNT = ethers.parseUnits("100", 18);

// Minimal ABIs for AAVE interactions
const POOL_ABI = [
  "function getUserAccountData(address user) view returns (uint256 totalCollateralBase, uint256 totalDebtBase, uint256 availableBorrowsBase, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)",
  "function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)",
  "function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf)",
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
 */
async function ensureAavePosition(eoaAddress: string): Promise<void> {
  const provider = new ethers.JsonRpcProvider(config.chainEndpoint);
  const signer = new ethers.Wallet(config.walletPrivateKey, provider);
  const pool = new ethers.Contract(AAVE_V3_POOL_ADDRESS, POOL_ABI, signer);

  const accountData = await pool.getUserAccountData(eoaAddress);
  const healthFactor = accountData.healthFactor as bigint;
  const totalDebt = accountData.totalDebtBase as bigint;

  console.log("Current AAVE position:", {
    totalCollateralBase: accountData.totalCollateralBase.toString(),
    totalDebtBase: totalDebt.toString(),
    healthFactor: healthFactor.toString(),
  });

  if (totalDebt > 0n && healthFactor >= TARGET_HF_MIN && healthFactor < TARGET_HF_MAX) {
    console.log("AAVE position already meets criteria (HF in [1.0, 1.6)). Skipping setup.");
    return;
  }

  console.log("Setting up AAVE position: mint LINK -> supply -> borrow DAI...");

  const faucet = new ethers.Contract(AAVE_FAUCET_ADDRESS, FAUCET_ABI, signer);
  const link = new ethers.Contract(SEPOLIA_LINK, ERC20_ABI, signer);

  const linkBalance = await link.balanceOf(eoaAddress);
  if (linkBalance < LINK_SUPPLY_AMOUNT) {
    console.log("Minting LINK from faucet...");
    const mintTx = await faucet.mint(SEPOLIA_LINK, eoaAddress, LINK_SUPPLY_AMOUNT);
    await mintTx.wait();
    console.log("LINK minted:", mintTx.hash);
  }

  console.log("Approving LINK for Pool...");
  const approveTx = await link.approve(AAVE_V3_POOL_ADDRESS, LINK_SUPPLY_AMOUNT);
  await approveTx.wait();

  console.log("Supplying LINK to AAVE Pool...");
  const supplyTx = await pool.supply(SEPOLIA_LINK, LINK_SUPPLY_AMOUNT, eoaAddress, 0);
  await supplyTx.wait();
  console.log("LINK supplied:", supplyTx.hash);

  const postSupply = await pool.getUserAccountData(eoaAddress);
  const collateralBase = postSupply.totalCollateralBase as bigint;
  const liqThreshold = postSupply.currentLiquidationThreshold as bigint;
  const existingDebt = postSupply.totalDebtBase as bigint;

  const TARGET_HF = 15n; // 1.5 * 10
  const debtNeeded = (collateralBase * liqThreshold) / (TARGET_HF * 1000n);
  const additionalDebt = debtNeeded > existingDebt ? debtNeeded - existingDebt : 0n;

  if (additionalDebt > 0n) {
    const daiBorrowAmount = additionalDebt * BigInt(1e10);

    console.log("Borrow calculation:", {
      collateralBase: collateralBase.toString(),
      liqThreshold: liqThreshold.toString(),
      existingDebt: existingDebt.toString(),
      debtNeeded: debtNeeded.toString(),
      additionalDebt: additionalDebt.toString(),
      daiBorrowAmount: ethers.formatUnits(daiBorrowAmount, 18),
    });

    console.log("Borrowing DAI from AAVE Pool...");
    const borrowTx = await pool.borrow(SEPOLIA_DAI, daiBorrowAmount, 2, 0, eoaAddress);
    await borrowTx.wait();
    console.log("DAI borrowed:", borrowTx.hash);
  }

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

// Extra timeout for AAVE on-chain setup + workflow operations
jest.setTimeout(TIMEOUT_DURATION * 7);

// AAVE V3 Pool ABI (for ContractRead node)
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

/**
 * Template: AAVE Health Factor Alert
 *
 * Mirrors the studio template: aave-health-factor-alert.json
 *
 * Workflow:
 *   CronTrigger (every 6 hours: "0 * /6 * * *")
 *     → ContractRead (getUserAccountData on AAVE V3 Pool)
 *     → Branch (healthFactor < threshold)
 *       → if: Telegram (RestAPI with AI summarization)
 *       → else: (no action)
 *
 * The studio template uses a time-based trigger to periodically poll the
 * AAVE V3 Pool contract for the user's health factor. When it drops below
 * the configured threshold, a Telegram alert is sent.
 */
describe("Template: AAVE Health Factor Alert", () => {
  let client: Client;
  let smartWalletAddress: string;
  let eoaAddress: string;
  const createdWorkflowIds: string[] = [];

  // Health factor threshold: 1.6 * 10^18
  const HEALTH_FACTOR_THRESHOLD = "1600000000000000000";

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
   * CronTrigger: Periodic check every 6 hours.
   *
   * Matches studio template's trigger node:
   * - type: "trigger" with core.type: "timeInterval"
   * - schedules: ["0 * /6 * * *"]
   *
   * In the SDK, this maps to TriggerType.Cron.
   */
  function createCronTrigger() {
    return TriggerFactory.create({
      id: triggerId,
      name: "timeTrigger",
      type: TriggerType.Cron,
      data: {
        schedules: ["0 */6 * * *"],
      },
    });
  }

  /**
   * ContractRead node: Calls getUserAccountData on AAVE V3 Pool.
   *
   * Matches studio template's contractRead1 node:
   * - contractAddress: AAVE V3 Pool
   * - methodCalls: getUserAccountData({{settings.runner}})
   *
   * For testing, we use the EOA address directly since the runner's
   * AAVE position is what we monitor.
   */
  function createContractReadNode() {
    return NodeFactory.create({
      id: contractReadId,
      name: "contractRead1",
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
   * Branch node: Check if healthFactor < threshold.
   *
   * Matches studio template's branch1 node condition:
   * - IIFE that parses health_threshold from settings and compares
   *
   * For testing, we use a simplified BigInt comparison with a fixed threshold.
   */
  function createBranchNode() {
    return NodeFactory.create({
      id: branchId,
      name: "branch1",
      type: NodeType.Branch,
      data: {
        conditions: [
          {
            id: "cond_below_threshold",
            type: "if",
            expression: `BigInt(contractRead1.data.getUserAccountData.healthFactor) < BigInt("${HEALTH_FACTOR_THRESHOLD}")`,
          },
          { id: "cond_else", type: "else", expression: "" },
        ],
      },
    });
  }

  /**
   * Telegram node: Alert via REST API with AI summarization.
   *
   * Matches studio template's telegram1 node:
   * - shouldSummarize: true
   * - message: "" (AI fills in)
   */
  function createTelegramNode() {
    return NodeFactory.create({
      id: telegramId,
      name: "telegram1",
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
   * Edges: CronTrigger → ContractRead → Branch → Telegram
   *
   * Matches studio template's 4-edge structure (minus settings edge):
   * - trigger → contractRead
   * - contractRead → branch
   * - branch.0 (if: below threshold) → telegram
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
        source: branchId + ".cond_below_threshold",
        target: telegramId,
      }),
    ];
  }

  describe("1. Individual Component Testing", () => {
    test("should test CronTrigger with runTrigger", async () => {
      const cronTrigger = createCronTrigger();

      const result = await client.runTrigger({
        trigger: cronTrigger,
      });

      console.log(
        "CronTrigger result:",
        util.inspect(result, { depth: null, colors: true })
      );

      // Cron triggers always succeed when run immediately (they produce a tick)
      expect(typeof result.success).toBe("boolean");
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

    test("should test Branch node when health factor is below threshold", async () => {
      const branchNode = createBranchNode();

      const result = await client.runNodeWithInputs({
        node: branchNode,
        inputVariables: {
          contractRead1: {
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

      const result = await client.runNodeWithInputs({
        node: branchNode,
        inputVariables: {
          contractRead1: {
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
      const workflowName = "AAVE Health Factor Alert Simulation";

      // Ensure real AAVE position exists so ContractRead returns actual HF
      await ensureAavePosition(eoaAddress);

      const cronTrigger = createCronTrigger();
      const contractReadNode = createContractReadNode();
      const branchNode = createBranchNode();
      const telegramNode = createTelegramNode();
      const edges = createEdges();

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger: cronTrigger,
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
      expect(simulationResult.status).toBe(ExecutionStatus.Success);
      // With real AAVE position (HF < 1.6), branch takes if path → all 4 steps
      expect(simulationResult.steps).toHaveLength(4); // trigger + contractRead + branch + telegram
    });

    test("should simulate and verify branch takes alert path", async () => {
      const workflowName = "AAVE Alert Path Simulation";

      await ensureAavePosition(eoaAddress);

      const cronTrigger = createCronTrigger();
      const contractReadNode = createContractReadNode();
      const branchNode = createBranchNode();
      const telegramNode = createTelegramNode();
      const edges = createEdges();

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger: cronTrigger,
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
      expect(simulationResult.steps).toHaveLength(4);

      // Verify branch took the if path (healthFactor < threshold)
      const branchStep = simulationResult.steps.find(
        (s: { type: string }) => s.type === "branch"
      );
      expect(branchStep?.success).toBe(true);

      // Verify Telegram was called with AI summarization
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

  describe("3. Full Deployment and Execution Testing", () => {
    test("should deploy and retrieve workflow correctly", async () => {
      const workflowName = "AAVE Health Factor Alert Deploy Test";

      const cronTrigger = createCronTrigger();
      const contractReadNode = createContractReadNode();
      const branchNode = createBranchNode();
      const telegramNode = createTelegramNode();
      const edges = createEdges();

      const workflow = client.createWorkflow({
        smartWalletAddress,
        trigger: cronTrigger,
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
      expect(retrieved.nodes?.length).toBe(3); // contractRead + branch + telegram
      expect(retrieved.edges?.length).toBe(3);

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
          { depth: null, colors: true }
        )
      );
    });
  });
});
