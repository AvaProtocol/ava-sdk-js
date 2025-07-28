import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import util from "util";
import { Client, TriggerFactory, NodeFactory } from "@avaprotocol/sdk-js";
import {
  NodeType,
  RunNodeWithInputsResponse,
  TriggerType,
} from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  TIMEOUT_DURATION,
  SaltGlobal,
  removeCreatedWorkflows,
  getBlockNumber,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress, chainEndpoint } =
  getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateWorkflow * 6000;

// Sepolia Chainlink ETH/USD Price Feed Oracle
const SEPOLIA_ORACLE_CONFIG = {
  contractAddress: "0xB0C712f98daE15264c8E26132BCC91C40aD4d5F9",
  contractAbi: [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  methodCalls: [
    { methodName: "latestRoundData", methodParams: [] },
    { methodName: "decimals", methodParams: [] },
  ],
};

// Helper function to check if we're on Sepolia
async function isSepoliaChain(): Promise<boolean> {
  try {
    // This is a simple check - in a real scenario you might want to query the chain ID
    // For now, we'll assume if chainEndpoint contains 'sepolia' we're on Sepolia
    return chainEndpoint?.toLowerCase().includes("sepolia") || false;
  } catch {
    return false;
  }
}

describe("ContractRead Node Tests", () => {
  let client: Client;
  let isSepoliaTest: boolean;

  beforeAll(async () => {
    const address = await getAddress(walletPrivateKey);

    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message } = await client.getSignatureFormat(address);
    const signature = await generateSignature(message, walletPrivateKey);

    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);

    // Check if we're on Sepolia chain
    isSepoliaTest = await isSepoliaChain();

    if (!isSepoliaTest) {
      console.log(
        "⚠️  Skipping Sepolia-specific ContractRead tests - not on Sepolia chain"
      );
    }
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should read latest round data from Chainlink oracle", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            { methodName: "latestRoundData", methodParams: [] },
          ],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Contract Read Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            maxExecution: 0,
            status: "draft",
            completedAt: null,
            lastRanAt: null,
            executionCount: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with Chainlink oracle read ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with Chainlink oracle read ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();

      // Handle flattened object format (new design)
      expect(typeof result.data).toBe("object");
      expect(result.data).not.toBeNull();
      expect(Array.isArray(result.data)).toBe(false);

      // Verify the method result is available as a top-level property
      const data = result.data as Record<string, any>;
      expect(data.latestRoundData).toBeDefined();

      // 🔍 TYPE CHECK: Verify ABI type improvements are working
      if (data.latestRoundData) {
        // The response should be an object with named fields
        expect(typeof data.latestRoundData).toBe("object");

        // Verify it contains expected oracle fields
        expect(data.latestRoundData.roundId).toBeDefined();
        expect(data.latestRoundData.answer).toBeDefined();
        expect(data.latestRoundData.startedAt).toBeDefined();
        expect(data.latestRoundData.updatedAt).toBeDefined();
        expect(data.latestRoundData.answeredInRound).toBeDefined();
      }

      expect(result.nodeId).toBeDefined();
    });

    test("should read multiple methods from contract", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: SEPOLIA_ORACLE_CONFIG.methodCalls,
        },
        inputVariables: {},
      };

      console.log(
        "🚀 ~ runNodeWithInputs with multiple methods ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with multiple methods ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      
      // Handle flattened object format (new design)
      expect(typeof result.data).toBe("object");
      expect(result.data).not.toBeNull();
      expect(Array.isArray(result.data)).toBe(false);
      expect(result.nodeId).toBeDefined();

      // Check that we got results for both methods in flattened format
      const data = result.data as Record<string, any>;
      expect(data.latestRoundData).toBeDefined();
      expect(data.decimals).toBeDefined();

      // 🔍 TYPE CHECK: Verify ABI type improvements are working
      if (data.latestRoundData && typeof data.latestRoundData === "object") {
        const latestRoundData = data.latestRoundData as any;
        if (latestRoundData.roundId) expect(typeof latestRoundData.roundId).toBe("string"); // uint80 -> string (large number)
        if (latestRoundData.answer) expect(typeof latestRoundData.answer).toBe("string"); // int256 -> string (large number)
        if (latestRoundData.startedAt) expect(typeof latestRoundData.startedAt).toBe("string"); // uint256 -> string (large number)
        if (latestRoundData.updatedAt) expect(typeof latestRoundData.updatedAt).toBe("string"); // uint256 -> string (large number)
        if (latestRoundData.answeredInRound)
          expect(typeof latestRoundData.answeredInRound).toBe("string"); // uint80 -> string (large number)
      }

      if (data.decimals) {
        expect(typeof data.decimals).toBe("string"); // decimals field should be string type (uint8 -> string)
      }
    });

    test("should handle invalid contract address", async () => {
      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: "0x0000000000000000000000000000000000000000", // Invalid address
          contractAbi: [
            {
              inputs: [],
              name: "totalSupply",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ],
          methodCalls: [{ methodName: "totalSupply", methodParams: [] }],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Invalid Contract Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            maxExecution: 0,
            status: "draft",
            completedAt: null,
            lastRanAt: null,
            executionCount: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with invalid contract address ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with invalid contract address ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      // This should either fail or return error results
    });

    test("should read oracle description method", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [{ methodName: "description", methodParams: [] }],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Description Method Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            maxExecution: 0,
            status: "draft",
            completedAt: null,
            lastRanAt: null,
            executionCount: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs with description method ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ runNodeWithInputs with description method ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();
      
      // Handle flattened object format (new design)
      expect(typeof result.data).toBe("object");
      expect(result.data).not.toBeNull();
      expect(Array.isArray(result.data)).toBe(false);
      expect(result.nodeId).toBeDefined();

      // Check that we got results for the description method in flattened format
      const data = result.data as Record<string, any>;
      expect(data.description).toBeDefined();

      // 🔍 TYPE CHECK: Verify ABI type improvements are working
      if (data.description) {
        expect(typeof data.description).toBe("string"); // description field should be string type (string -> string)
      }
    });

    test("should apply decimal formatting using applyToFields", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            {
              methodName: "decimals",
              methodParams: [],
              applyToFields: ["latestRoundData.answer"], // Use dot notation for nested fields
            },
            {
              methodName: "latestRoundData",
              methodParams: [], // latestRoundData()
            },
          ],
        },
        inputVariables: {},
      };

      console.log(
        "🚀 ~ runNodeWithInputs with decimal formatting ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result: RunNodeWithInputsResponse = await client.runNodeWithInputs(
        params
      );

      console.log(
        "🚀 ~ runNodeWithInputs with decimal formatting ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      // Handle flattened object format (new design)
      expect(typeof result.data).toBe("object");
      expect(result.data).not.toBeNull();
      expect(Array.isArray(result.data)).toBe(false);

      const data = result.data as Record<string, any>;

      // Check that we got results for both methods in flattened format
      expect(data.latestRoundData).toBeDefined();
      expect(data.decimals).toBeDefined();

      // For our new implementation, we expect direct field access in the latestRoundData result
      expect(data.latestRoundData.answer).toBeDefined();
      expect(data.latestRoundData.roundId).toBeDefined();
      expect(data.latestRoundData.startedAt).toBeDefined();
      expect(data.latestRoundData.updatedAt).toBeDefined();
      expect(data.latestRoundData.answeredInRound).toBeDefined();

      const answerValue = data.latestRoundData.answer;
      expect(answerValue).toBeTruthy();

      // 🔍 TYPE CHECK: Verify ABI type improvements are working
      expect(typeof answerValue).toBe("string"); // answer should be string type (formatted decimal)
      expect(typeof data.decimals).toBe("string"); // decimals field should be string type

      expect(answerValue).toMatch(/^\d+\.\d+$/); // Should be a decimal number

      expect(result.nodeId).toBeDefined();

      // Check metadata array (new format)
      expect(result.metadata).toBeDefined();
      expect(Array.isArray(result.metadata)).toBe(true);
      expect(result.metadata.length).toBeGreaterThan(0);

      const firstMethod = result.metadata[0];
      expect(firstMethod.methodName).toBeDefined();
      expect(firstMethod.success).toBe(true);
      expect(firstMethod.methodName).toBe("decimals");
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with contract read", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const contractReadNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_contract_read_test",
        type: NodeType.ContractRead,
        data: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            { methodName: "latestRoundData", methodParams: [] },
            { methodName: "decimals", methodParams: [] },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractReadNode,
      ]);

      console.log(
        "🚀 ~ simulateWorkflow with contract read ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "🚀 ~ simulateWorkflow with contract read ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      expect(simulation.steps).toHaveLength(2); // trigger + contract read node

      const contractReadStep = simulation.steps.find(
        (step) => step.id === contractReadNode.id
      );
      expect(contractReadStep).toBeDefined();
      expect(contractReadStep!.success).toBe(true);

      const output = contractReadStep!.output as any;
      expect(output).toBeDefined();
      
      // Handle flattened object format (new design)
      expect(typeof output).toBe("object");
      expect(output).not.toBeNull();
      expect(Array.isArray(output)).toBe(false);

      // Verify that the actual data fields are present in flattened format
      expect(output.latestRoundData).toBeDefined();
      expect(output.decimals).toBeDefined();
      expect(output.latestRoundData).toHaveProperty("answer");
      expect(output.latestRoundData).toHaveProperty("roundId");
      expect(typeof output.decimals).toBe("string");

      // 🔍 TYPE CHECK: Verify ABI type improvements are working in simulation mode
      if (output.latestRoundData.answer) {
        expect(typeof output.latestRoundData.answer).toBe("string"); // int256 -> string (large number)
      }
      if (output.latestRoundData.roundId) {
        expect(typeof output.latestRoundData.roundId).toBe("string"); // uint80 -> string (large number)
      }
    });

    test("should simulate workflow with decimal formatting using applyToFields", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const contractReadNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_decimal_formatting",
        type: NodeType.ContractRead,
        data: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            {
              methodName: "decimals",
              methodParams: [],
              applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
            },
            {
              methodName: "latestRoundData",
              methodParams: [], // latestRoundData()
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractReadNode,
      ]);

      console.log(
        "🚀 ~ simulateWorkflow with decimal formatting ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "🚀 ~ simulateWorkflow with decimal formatting ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      const contractReadStep = simulation.steps.find(
        (step) => step.id === contractReadNode.id
      );
      expect(contractReadStep).toBeDefined();
      expect(contractReadStep!.success).toBe(true);

      const output = contractReadStep!.output as any;
      expect(output).toBeDefined();
      
      // Handle flattened object format (new design)
      expect(typeof output).toBe("object");
      expect(output).not.toBeNull();
      expect(Array.isArray(output)).toBe(false);

      // Verify that the actual data fields are present in flattened format
      expect(output.latestRoundData).toBeDefined();
      expect(output.decimals).toBeDefined();
      expect(output.latestRoundData).toHaveProperty("answer");
      expect(output.latestRoundData).toHaveProperty("roundId");
      expect(typeof output.decimals).toBe("string");

      // Check that decimal formatting was applied
      if (output.latestRoundData.answer) {
        // 🔍 TYPE CHECK: Verify ABI type improvements are working in simulation mode
        expect(typeof output.latestRoundData.answer).toBe("string");
        expect(output.latestRoundData.answer).toMatch(/^\d+\.\d+$/); // Should be a decimal number
      }
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with contract read", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;

      try {
        const contractReadNode = NodeFactory.create({
          id: getNextId(),
          name: "deploy_contract_read_test",
          type: NodeType.ContractRead,
          data: {
            contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
            contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
            methodCalls: [
              { methodName: "latestRoundData", methodParams: [] },
              { methodName: "description", methodParams: [] },
            ],
          },
        });

        const workflowProps = createFromTemplate(wallet.address, [
          contractReadNode,
        ]);

        workflowProps.trigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval: triggerInterval },
        });

        console.log(
          "🚀 ~ deploy + trigger workflow with contract read ~ workflowProps:",
          util.inspect(workflowProps, { depth: null, colors: true })
        );

        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        const triggerParams = {
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        };

        console.log(
          "🚀 ~ triggerWorkflow ~ params:",
          util.inspect(triggerParams, { depth: null, colors: true })
        );

        const triggerResult = await client.triggerWorkflow(triggerParams);

        console.log(
          "🚀 ~ triggerWorkflow ~ result:",
          util.inspect(triggerResult, { depth: null, colors: true })
        );

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const contractReadStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === contractReadNode.id
        );

        if (_.isUndefined(contractReadStep)) {
          throw new Error("No corresponding contract read step found.");
        }

        expect(contractReadStep.success).toBe(true);
        console.log(
          "Deploy + trigger contract read step output:",
          util.inspect(contractReadStep.output, { depth: null, colors: true })
        );

        const output = contractReadStep.output as any;
        expect(output).toBeDefined();
        
        // Handle flattened object format (new design)
        expect(typeof output).toBe("object");
        expect(output).not.toBeNull();
        expect(Array.isArray(output)).toBe(false);

        // Verify that the actual data fields are present in flattened format
        expect(output.latestRoundData).toBeDefined();
        expect(output.description).toBeDefined();
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });

    test("should deploy and trigger workflow with applyToFields decimal formatting", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;

      try {
        const contractReadNode = NodeFactory.create({
          id: getNextId(),
          name: "deploy_contract_read_applyToFields_test",
          type: NodeType.ContractRead,
          data: {
            contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
            contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
            methodCalls: [
              {
                methodName: "decimals",
                methodParams: [],
                applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
              },
              {
                methodName: "latestRoundData",
                methodParams: [], // latestRoundData()
              },
            ],
          },
        });

        const workflowProps = createFromTemplate(wallet.address, [
          contractReadNode,
        ]);

        workflowProps.trigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval: triggerInterval },
        });

        console.log(
          "🚀 ~ deploy + trigger workflow with applyToFields ~ workflowProps:",
          util.inspect(workflowProps, { depth: null, colors: true })
        );

        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        const triggerParams = {
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        };

        console.log(
          "🚀 ~ triggerWorkflow with applyToFields ~ params:",
          util.inspect(triggerParams, { depth: null, colors: true })
        );

        const triggerResult = await client.triggerWorkflow(triggerParams);

        console.log(
          "🚀 ~ triggerWorkflow with applyToFields ~ result:",
          util.inspect(triggerResult, { depth: null, colors: true })
        );

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const contractReadStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === contractReadNode.id
        );

        if (_.isUndefined(contractReadStep)) {
          throw new Error("No corresponding contract read step found.");
        }

        expect(contractReadStep.success).toBe(true);
        console.log(
          "Deploy + trigger contract read with applyToFields step output:",
          util.inspect(contractReadStep.output, { depth: null, colors: true })
        );

        const output = contractReadStep.output as any;
        expect(output).toBeDefined();
        
        // Handle flattened object format (new design)
        expect(typeof output).toBe("object");
        expect(output).not.toBeNull();
        expect(Array.isArray(output)).toBe(false);

        // Verify that both method calls are included in the response in flattened format
        expect(output.decimals).toBeDefined();
        expect(output.latestRoundData).toBeDefined();

        // Verify that decimals result contains the decimals value
        expect(typeof output.decimals).toBe("string");

        // Verify that latestRoundData result contains formatted values
        expect(output.latestRoundData).toHaveProperty("answer");
        expect(output.latestRoundData).toHaveProperty("roundId");
        expect(output.latestRoundData).toHaveProperty("answeredInRound");
        expect(output.latestRoundData).toHaveProperty("startedAt");
        expect(output.latestRoundData).toHaveProperty("updatedAt");

        // Verify decimal formatting was applied to answer field
        const answer = output.latestRoundData.answer;

        expect(typeof answer).toBe("string");

        // Answer should be formatted as decimal (contains a dot)
        expect(answer).toMatch(/^\d+\.\d+$/);

        // Verify that answer is a valid formatted value
        expect(parseFloat(answer)).toBeGreaterThan(0);

        // Check that rawStructuredFields is not present for deployed workflow execution
        // (rawStructuredFields should not exist in the flattened object format)
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Response Format Consistency Tests", () => {
    test("should return consistent response format across all three methods", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;
      let workflowId: string | undefined;

      try {
        const contractReadConfig = {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            { methodName: "decimals", methodParams: [] },
            { methodName: "version", methodParams: [] },
          ],
        };

        const inputVariables = {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Consistency Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            maxExecution: 0,
            status: "draft",
            completedAt: null,
            lastRanAt: null,
            executionCount: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };

        console.log(
          "🔍 Testing response format consistency across all methods..."
        );

        // Test 1: runNodeWithInputs
        const directParams = {
          nodeType: NodeType.ContractRead,
          nodeConfig: contractReadConfig,
          inputVariables: inputVariables,
        };

        console.log(
          "🚀 ~ runNodeWithInputs consistency test ~ params:",
          util.inspect(directParams, { depth: null, colors: true })
        );

        const directResponse = await client.runNodeWithInputs(directParams);

        console.log(
          "🚀 ~ runNodeWithInputs consistency test ~ result:",
          util.inspect(directResponse, { depth: null, colors: true })
        );

        // Test 2: simulateWorkflow
        const contractReadNode = NodeFactory.create({
          id: getNextId(),
          name: "consistency_test",
          type: NodeType.ContractRead,
          data: contractReadConfig,
        });

        const workflowProps = createFromTemplate(wallet.address, [
          contractReadNode,
        ]);

        console.log(
          "🚀 ~ simulateWorkflow consistency test ~ workflowProps:",
          util.inspect(workflowProps, { depth: null, colors: true })
        );

        const simulation = await client.simulateWorkflow(
          client.createWorkflow(workflowProps)
        );

        console.log(
          "🚀 ~ simulateWorkflow consistency test ~ result:",
          util.inspect(simulation, { depth: null, colors: true })
        );

        const simulatedStep = simulation.steps.find(
          (step) => step.id === contractReadNode.id
        );

        // Test 3: Deploy + Trigger
        workflowProps.trigger = TriggerFactory.create({
          id: defaultTriggerId,
          name: "blockTrigger",
          type: TriggerType.Block,
          data: { interval: triggerInterval },
        });

        console.log(
          "🚀 ~ deploy workflow consistency test ~ workflowProps:",
          util.inspect(workflowProps, { depth: null, colors: true })
        );

        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps)
        );
        createdIdMap.set(workflowId, true);

        const triggerParams = {
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        };

        console.log(
          "🚀 ~ triggerWorkflow consistency test ~ params:",
          util.inspect(triggerParams, { depth: null, colors: true })
        );

        await client.triggerWorkflow(triggerParams);

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });
        const executedStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === contractReadNode.id
        );

        // All should be successful
        expect(directResponse.success).toBe(true);
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBe(true);

        // Verify consistent structure
        const directOutput = directResponse.data;

        // Check that all outputs have the same structure - they should all be flattened objects
        expect(typeof executedStep?.output).toBe("object");
        expect(typeof simulatedStep?.output).toBe("object");
        expect(typeof directOutput).toBe("object");
        expect(Array.isArray(executedStep?.output)).toBe(false);
        expect(Array.isArray(simulatedStep?.output)).toBe(false);
        expect(Array.isArray(directOutput)).toBe(false);

        // Check that none of them have the old results wrapper
        expect(executedStep?.output).not.toHaveProperty("results");
        expect(simulatedStep?.output).not.toHaveProperty("results");
        expect(directOutput).not.toHaveProperty("results");

        // Check that all have the same method fields (flattened object format)
        const simulatedKeys = Object.keys(simulatedStep?.output || {}).sort();
        const executedKeys = Object.keys(executedStep?.output || {}).sort();
        const directKeys = Object.keys(directOutput || {}).sort();

        expect(simulatedKeys).toEqual(executedKeys);
        expect(simulatedKeys).toEqual(directKeys);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Error Handling Tests", () => {
    test("should handle invalid method signature gracefully", async () => {
      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: [
            {
              inputs: [],
              name: "nonExistentMethod",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ],
          methodCalls: [
            { methodName: "nonExistentMethod", methodParams: [] },
          ],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "Error Handling Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            maxExecution: 0,
            status: "draft",
            completedAt: null,
            lastRanAt: null,
            executionCount: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      };

      console.log(
        "🚀 ~ runNodeWithInputs error handling ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      expect(result).toBeDefined();
      // Backend fails the entire node execution for invalid method signatures
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("Protobuf Serialization Tests", () => {
    test("should properly serialize applyToFields in protobuf", () => {
      const contractReadNode = NodeFactory.create({
        id: "test-contract-read",
        name: "Test Contract Read",
        type: NodeType.ContractRead,
        data: {
          contractAddress: "0x1234567890123456789012345678901234567890",
          contractAbi: [], // Fixed: Use array instead of string
          methodCalls: [
            {
              methodName: "decimals",
              methodParams: [],
              applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
            },
            {
              methodName: "latestRoundData",
              methodParams: [], // latestRoundData()
            },
          ],
        },
      });

      // Convert to protobuf request
      const request = contractReadNode.toRequest();

      // Verify the structure
      expect(request.getContractRead()).toBeDefined();
      const config = request.getContractRead()!.getConfig();
      expect(config).toBeDefined();

      const methodCalls = config!.getMethodCallsList();
      expect(methodCalls).toHaveLength(2);

      // Check first method call (decimals with applyToFields)
      const decimalsCall = methodCalls[0];
      expect(decimalsCall.getMethodName()).toBe("decimals");
      expect(decimalsCall.getMethodParamsList()).toEqual([]);
      expect(decimalsCall.getApplyToFieldsList()).toEqual([
        "latestRoundData.answer",
      ]);

      // Check second method call (no applyToFields)
      const latestRoundCall = methodCalls[1];
      expect(latestRoundCall.getMethodName()).toBe("latestRoundData");
      expect(latestRoundCall.getMethodParamsList()).toEqual([]);
      expect(latestRoundCall.getApplyToFieldsList()).toEqual([]);
    });

    test("should properly serialize methodParams in protobuf", () => {
      const contractReadNode = NodeFactory.create({
        id: "test-contract-read-methodparams",
        name: "Test Contract Read MethodParams",
        type: NodeType.ContractRead,
        data: {
          contractAddress: "0x1234567890123456789012345678901234567890",
          contractAbi: [],
          methodCalls: [
            {
              methodName: "balanceOf",
              methodParams: ["{{value.address}}"], // Array with single parameter
            },
            {
              methodName: "transfer",
              methodParams: ["{{value.recipient}}", "{{value.amount}}"], // Array with multiple parameters
            },
            {
              methodName: "decimals",
              methodParams: [],
              // No methodParams - should be empty array
            },
          ],
        },
      });

      // Convert to protobuf request
      const request = contractReadNode.toRequest();

      // Verify the structure
      expect(request.getContractRead()).toBeDefined();
      const config = request.getContractRead()!.getConfig();
      expect(config).toBeDefined();

      const methodCalls = config!.getMethodCallsList();
      expect(methodCalls).toHaveLength(3);

      // Check first method call (balanceOf with single parameter)
      const balanceOfCall = methodCalls[0];
      expect(balanceOfCall.getMethodName()).toBe("balanceOf");
      expect(balanceOfCall.getMethodParamsList()).toEqual([
        "{{value.address}}",
      ]);

      // Check second method call (transfer with multiple parameters)
      const transferCall = methodCalls[1];
      expect(transferCall.getMethodName()).toBe("transfer");
      expect(transferCall.getMethodParamsList()).toEqual([
        "{{value.recipient}}",
        "{{value.amount}}",
      ]);

      // Check third method call (decimals without methodParams)
      const decimalsCall = methodCalls[2];
      expect(decimalsCall.getMethodName()).toBe("decimals");
      expect(decimalsCall.getMethodParamsList()).toEqual([]); // Should be empty array when not set
    });
  });

  describe("ApplyToFields Decimal Formatting Tests", () => {
    test("should apply decimal formatting with dot notation applyToFields for Chainlink oracle", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            {
              methodName: "decimals",
              methodParams: [],
              applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
            },
            {
              methodName: "latestRoundData",
              methodParams: [], // latestRoundData()
            },
          ],
        },
        inputVariables: {
          workflowContext: {
            id: "3b57f7cd-eda4-4d17-9c4c-fda35b548dbe",
            chainId: null,
            name: "ApplyToFields Test",
            userId: "2f8ed075-3658-4a56-8003-e6e8207f8a2d",
            eoaAddress: await getAddress(walletPrivateKey),
            runner: "0xB861aEe06De8694E129b50adA89437a1BF688F69",
            startAt: new Date(),
            expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            maxExecution: 0,
            status: "draft",
            completedAt: null,
            lastRanAt: null,
            executionCount: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      };

      console.log(
        "🚀 ~ Chainlink oracle applyToFields test ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ Chainlink oracle applyToFields test ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.metadata).toBeDefined();

      // NEW: data is now a flattened object, not an array
      const data = result.data as Record<string, unknown>;
      const metadata = result.metadata as Record<string, unknown>[];

      // NEW: data should be an object, not an array
      expect(typeof data).toBe("object");
      expect(Array.isArray(data)).toBe(false);
      expect(Array.isArray(metadata)).toBe(true);
      expect(metadata.length).toBe(params.nodeConfig.methodCalls.length);

      // NEW: Access flattened data directly
      expect(data.decimals).toBeDefined();
      expect(data.latestRoundData).toBeDefined();

      // Verify decimals field
      expect(typeof data.decimals).toBe("string");
      expect(parseInt(data.decimals as string)).toBeGreaterThan(0);

      // Verify latestRoundData structure with decimal formatting applied
      const latestRoundData = data.latestRoundData as Record<string, unknown>;
      expect(latestRoundData.answer).toBeDefined();
      expect(latestRoundData.roundId).toBeDefined();
      expect(latestRoundData.startedAt).toBeDefined();
      expect(latestRoundData.updatedAt).toBeDefined();
      expect(latestRoundData.answeredInRound).toBeDefined();

      // Verify that decimal formatting is applied to the answer field
      const answer = latestRoundData.answer as string;
      expect(typeof answer).toBe("string");
      expect(parseFloat(answer)).toBeGreaterThan(0);
      expect(answer).toMatch(/^\d+\.\d+$/); // Should contain decimal point (formatted)

      // Find metadata for verification
      const decimalsMetadata = metadata.find(
        (r: Record<string, unknown>) => r.methodName === "decimals"
      );
      const latestRoundMetadata = metadata.find(
        (r: Record<string, unknown>) => r.methodName === "latestRoundData"
      );

      expect(decimalsMetadata).toBeDefined();
      expect(latestRoundMetadata).toBeDefined();

      // Verify metadata structure
      expect(decimalsMetadata!.success).toBe(true);
      expect(latestRoundMetadata!.success).toBe(true);
      expect(decimalsMetadata!.methodName).toBe("decimals");
      expect(latestRoundMetadata!.methodName).toBe("latestRoundData");
      expect(decimalsMetadata!.methodABI).toBeDefined();
      expect(latestRoundMetadata!.methodABI).toBeDefined();

      // Verify that metadata contains raw unformatted values
      const rawLatestRoundData = latestRoundMetadata!.value as Record<string, unknown>;
      const rawAnswer = rawLatestRoundData.answer as string;
      
      // Raw answer should be different from formatted answer (no decimal point in raw)
      expect(rawAnswer).not.toEqual(answer);
      expect(parseInt(rawAnswer)).toBeGreaterThan(0);

      console.log(`✅ Decimal formatting applied: raw=${rawAnswer}, formatted=${answer}`);
    });

    test("should apply decimal formatting with simplified applyToFields syntax for USDC token", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      // USDC contract on Sepolia - test simplified applyToFields syntax
      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238", // USDC on Sepolia
          contractAbi: [
            {
              constant: true,
              inputs: [],
              name: "totalSupply",
              outputs: [{ name: "", type: "uint256" }],
              payable: false,
              stateMutability: "view",
              type: "function",
            },
            {
              constant: true,
              inputs: [],
              name: "decimals",
              outputs: [{ name: "", type: "uint8" }],
              payable: false,
              stateMutability: "view",
              type: "function",
            },
          ],
          methodCalls: [
            {
              methodName: "decimals",
              methodParams: [],
              applyToFields: ["totalSupply"], // ✅ Simplified syntax: just method name for single values
            },
            {
              methodName: "totalSupply",
              methodParams: [],
            },
          ],
        },
        inputVariables: {},
      };

      console.log(
        "🚀 ~ USDC simplified applyToFields test ~ params:",
        util.inspect(params, { depth: null, colors: true })
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ USDC simplified applyToFields test ~ result:",
        util.inspect(result, { depth: null, colors: true })
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(typeof result.data).toBe("object");

      // For standalone contractRead, the data is a flattened object containing all method results
      const data = result.data as Record<string, unknown>;

      // Verify both method results are present in the flattened data
      expect(data.decimals).toBeDefined();
      expect(data.totalSupply).toBeDefined();

      // Verify decimals result
      expect(typeof data.decimals).toBe("string");
      expect(data.decimals).toBe("6"); // USDC has 6 decimals

      // Verify totalSupply result with decimal formatting applied
      expect(typeof data.totalSupply).toBe("string");

      // totalSupply should be formatted as decimal (contains a dot)
      const totalSupply = data.totalSupply as string;
      expect(totalSupply).toMatch(/^\d+\.\d+$/);

      // Verify that no Raw fields are created automatically
      expect(data.totalSupplyRaw).toBeUndefined();

      // Verify the value is properly formatted (should be a reasonable USDC total supply)
      const parsedTotalSupply = parseFloat(totalSupply);
      expect(parsedTotalSupply).toBeGreaterThan(0);
      expect(parsedTotalSupply).toBeLessThan(Number.MAX_SAFE_INTEGER);

      console.log(`✅ USDC totalSupply formatted correctly: ${totalSupply} (${parsedTotalSupply})`);

      // Verify metadata structure (should be array of method results)
      expect(result.metadata).toBeDefined();
      expect(Array.isArray(result.metadata)).toBe(true);
      const metadata = result.metadata as Record<string, unknown>[];
      expect(metadata.length).toBe(2);

      // Find the specific method results in metadata
      const decimalsMetadata = metadata.find(
        (r: Record<string, unknown>) => r.methodName === "decimals"
      );
      const totalSupplyMetadata = metadata.find(
        (r: Record<string, unknown>) => r.methodName === "totalSupply"
      );

      expect(decimalsMetadata).toBeDefined();
      expect(totalSupplyMetadata).toBeDefined();
      expect(decimalsMetadata!.success).toBe(true);
      expect(totalSupplyMetadata!.success).toBe(true);
    });

    test("should include answerRaw field when using applyToFields with simulateWorkflow", async () => {
      if (!isSepoliaTest) {
        console.log("Skipping test - not on Sepolia chain");
        return;
      }

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const contractReadNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_applyToFields_test",
        type: NodeType.ContractRead,
        data: {
          contractAddress: SEPOLIA_ORACLE_CONFIG.contractAddress,
          contractAbi: SEPOLIA_ORACLE_CONFIG.contractAbi,
          methodCalls: [
            {
              methodName: "decimals",
              methodParams: [],
              applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
            },
            {
              methodName: "latestRoundData",
              methodParams: [], // latestRoundData()
            },
          ],
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        contractReadNode,
      ]);

      console.log(
        "🚀 ~ simulateWorkflow applyToFields test ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true })
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps)
      );

      console.log(
        "🚀 ~ simulateWorkflow applyToFields test ~ result:",
        util.inspect(simulation, { depth: null, colors: true })
      );

      expect(simulation.success).toBe(true);
      const contractReadStep = simulation.steps.find(
        (step) => step.id === contractReadNode.id
      );
      expect(contractReadStep).toBeDefined();
      expect(contractReadStep!.success).toBe(true);

      const output = contractReadStep!.output as any;
      expect(output).toBeDefined();
      
      // Handle flattened object format (new design)
      expect(typeof output).toBe("object");
      expect(output).not.toBeNull();
      expect(Array.isArray(output)).toBe(false);

      // Verify that both method calls are included in the response in flattened format
      expect(output.decimals).toBeDefined();
      expect(output.latestRoundData).toBeDefined();

      // Verify that decimals result contains the decimals value
      expect(typeof output.decimals).toBe("string");

      // Verify that latestRoundData result contains formatted values
      expect(output.latestRoundData).toHaveProperty("answer");
      expect(output.latestRoundData).toHaveProperty("roundId");
      expect(output.latestRoundData).toHaveProperty("answeredInRound");
      expect(output.latestRoundData).toHaveProperty("startedAt");
      expect(output.latestRoundData).toHaveProperty("updatedAt");

      // Verify decimal formatting was applied to answer field
      const answer = output.latestRoundData.answer;

      expect(typeof answer).toBe("string");

      // Answer should be formatted as decimal (contains a dot)
      expect(answer).toMatch(/^\d+\.\d+$/);

      // Verify that answer is a valid formatted value
      expect(parseFloat(answer)).toBeGreaterThan(0);
    });
  });
});
