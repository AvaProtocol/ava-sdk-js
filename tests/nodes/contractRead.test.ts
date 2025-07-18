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
  contractAbi: JSON.stringify([
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
  ]),
  methodCalls: [
    { callData: "0xfeaf968c", methodName: "latestRoundData" },
    { callData: "0x313ce567", methodName: "decimals" },
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
            { callData: "0xfeaf968c", methodName: "latestRoundData" },
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
      expect(Array.isArray(result.data)).toBe(true);

      // Handle both flattened (single method) and array (multiple methods) formats
      // Multiple methods format
      expect((result.data as any[]).length).toBe(
        params.nodeConfig.methodCalls.length
      );
      const latestRoundResult = (result.data as any[]).find(
        (r: any) => r.methodName === "latestRoundData"
      );
      expect(latestRoundResult).toBeDefined();
      expect(latestRoundResult.success).toBe(true);
      expect(latestRoundResult.data).toBeDefined();

      // 🔍 TYPE CHECK: Verify ABI type improvements are working
      if (
        latestRoundResult.data &&
        typeof latestRoundResult.data === "object"
      ) {
        const data = latestRoundResult.data as any;
        if (data.roundId) expect(typeof data.roundId).toBe("string"); // uint80 -> string (large number)
        if (data.answer) expect(typeof data.answer).toBe("string"); // int256 -> string (large number)
        if (data.startedAt) expect(typeof data.startedAt).toBe("string"); // uint256 -> string (large number)
        if (data.updatedAt) expect(typeof data.updatedAt).toBe("string"); // uint256 -> string (large number)
        if (data.answeredInRound)
          expect(typeof data.answeredInRound).toBe("string"); // uint80 -> string (large number)
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
      expect(Array.isArray(result.data)).toBe(true);
      expect((result.data as any[]).length).toBe(
        params.nodeConfig.methodCalls.length
      );
      expect(result.nodeId).toBeDefined();

      // Check that we got results for both methods
      const latestRoundResult = (result.data as any[]).find(
        (r: any) => r.methodName === "latestRoundData"
      );
      const decimalsResult = (result.data as any[]).find(
        (r: any) => r.methodName === "decimals"
      );

      expect(latestRoundResult).toBeDefined();
      expect(decimalsResult).toBeDefined();

      // 🔍 TYPE CHECK: Verify ABI type improvements are working
      if (
        latestRoundResult &&
        latestRoundResult.data &&
        typeof latestRoundResult.data === "object"
      ) {
        const data = latestRoundResult.data as any;
        if (data.roundId) expect(typeof data.roundId).toBe("string"); // uint80 -> string (large number)
        if (data.answer) expect(typeof data.answer).toBe("string"); // int256 -> string (large number)
        if (data.startedAt) expect(typeof data.startedAt).toBe("string"); // uint256 -> string (large number)
        if (data.updatedAt) expect(typeof data.updatedAt).toBe("string"); // uint256 -> string (large number)
        if (data.answeredInRound)
          expect(typeof data.answeredInRound).toBe("string"); // uint80 -> string (large number)
      }

      if (decimalsResult && decimalsResult.data) {
        expect(typeof decimalsResult.data).toBe("object"); // decimals result should be object containing the decimals field
        const decimalsData = decimalsResult.data as any;
        if (decimalsData.decimals) {
          expect(typeof decimalsData.decimals).toBe("string"); // decimals field should be string type (uint8 -> string)
        }
      }
    });

    test("should handle invalid contract address", async () => {
      const params = {
        nodeType: NodeType.ContractRead,
        nodeConfig: {
          contractAddress: "0x0000000000000000000000000000000000000000", // Invalid address
          contractAbi: JSON.stringify([
            {
              inputs: [],
              name: "totalSupply",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ]),
          methodCalls: [{ callData: "0x18160ddd", methodName: "totalSupply" }],
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
          methodCalls: [{ callData: "0x7284e416", methodName: "description" }],
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
      expect(Array.isArray(result.data)).toBe(true);
      expect((result.data as any[]).length).toBe(
        params.nodeConfig.methodCalls.length
      );
      expect(result.nodeId).toBeDefined();

      // Check that we got results for the description method
      const descriptionResult = (result.data as any[]).find(
        (r: any) => r.methodName === "description"
      );
      expect(descriptionResult).toBeDefined();
      expect(descriptionResult.success).toBe(true);

      // 🔍 TYPE CHECK: Verify ABI type improvements are working
      if (descriptionResult && descriptionResult.data) {
        expect(typeof descriptionResult.data).toBe("object"); // description result should be object containing the description field
        const descriptionData = descriptionResult.data as any;
        if (descriptionData.description) {
          expect(typeof descriptionData.description).toBe("string"); // description field should be string type (string -> string)
        }
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
              callData: "0x313ce567", // decimals()
              methodName: "decimals",
              applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
            },
            {
              callData: "0xfeaf968c", // latestRoundData()
              methodName: "latestRoundData",
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

      const data = result.data as any;

      // Check that rawStructuredFields is NOT present in the data field for direct execution
      // This ensures the backend fix is working correctly for all execution types
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(params.nodeConfig.methodCalls.length); // decimals and latestRoundData

      // Find the latestRoundData result
      const latestRoundResult = data.find(
        (item: any) => item.methodName === "latestRoundData"
      );
      const decimalsResult = data.find(
        (item: any) => item.methodName === "decimals"
      );

      expect(latestRoundResult).toBeDefined();
      expect(decimalsResult).toBeDefined();

      // Check that rawStructuredFields is NOT present in the data field
      expect(latestRoundResult.data.rawStructuredFields).toBeUndefined();

      // For our new implementation, we expect direct field access in the latestRoundData result
      expect(latestRoundResult.data.answer).toBeDefined();
      expect(latestRoundResult.data.roundId).toBeDefined();
      expect(latestRoundResult.data.startedAt).toBeDefined();
      expect(latestRoundResult.data.updatedAt).toBeDefined();
      expect(latestRoundResult.data.answeredInRound).toBeDefined();

      const answerValue = latestRoundResult.data.answer;
      expect(answerValue).toBeTruthy();

      // 🔍 TYPE CHECK: Verify ABI type improvements are working
      expect(typeof answerValue).toBe("string"); // answer should be string type (formatted decimal)
      expect(typeof decimalsResult.data).toBe("object"); // decimals result should be object containing the decimals field
      if (decimalsResult.data && typeof decimalsResult.data === "object") {
        const decimalsData = decimalsResult.data as any;
        if (decimalsData.decimals) {
          expect(typeof decimalsData.decimals).toBe("string"); // decimals field should be string type
        }
      }

      expect(answerValue).toMatch(/^\d+\.\d+$/); // Should be a decimal number

      expect(result.nodeId).toBeDefined();

      expect(result.metadata?._raw).toBeDefined();

      const firstMethod = result.metadata?._raw?.[0];
      expect(firstMethod.methodName).toBeDefined();
      expect(firstMethod.success).toBe(true);
      expect(firstMethod.methodName).toBe("decimals");

      // Check if the structured fields data is present
      if (firstMethod.data && Array.isArray(firstMethod.data)) {
        expect(firstMethod.data.length).toBeGreaterThan(0);

        // Check the format of the first field
        const firstField = firstMethod.data[0];
        expect(firstField).toHaveProperty("name");
        expect(firstField).toHaveProperty("type");
        expect(firstField).toHaveProperty("value");
      }

      expect(result.metadata?._raw).toBeDefined();
      expect(result.metadata?._raw?.length).toBeGreaterThan(0);
      expect(result.metadata?._raw?.[0]?.data).toBeDefined();
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
            { callData: "0xfeaf968c", methodName: "latestRoundData" },
            { callData: "0x313ce567", methodName: "decimals" },
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
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBe(contractReadNode.data.methodCalls.length);

      // Check that rawStructuredFields is NOT present in the data field for simulation
      // This ensures the backend fix is working correctly
      for (const item of output) {
        expect(item.data).toBeDefined();
        expect(item.data.rawStructuredFields).toBeUndefined();

        // Also check that rawStructuredFields is not present at the top level of the result
        expect(item.rawStructuredFields).toBeUndefined();
      }

      // Verify that the actual data fields are present
      const latestRoundResult = output.find(
        (r: any) => r.methodName === "latestRoundData"
      );
      const decimalsResult = output.find(
        (r: any) => r.methodName === "decimals"
      );

      expect(latestRoundResult).toBeDefined();
      expect(decimalsResult).toBeDefined();
      expect(latestRoundResult.data).toHaveProperty("answer");
      expect(latestRoundResult.data).toHaveProperty("roundId");
      expect(decimalsResult.data).toHaveProperty("decimals");

      // 🔍 TYPE CHECK: Verify ABI type improvements are working in simulation mode
      if (latestRoundResult.data.answer) {
        expect(typeof latestRoundResult.data.answer).toBe("string"); // int256 -> string (large number)
      }
      if (latestRoundResult.data.roundId) {
        expect(typeof latestRoundResult.data.roundId).toBe("string"); // uint80 -> string (large number)
      }
      if (decimalsResult.data.decimals) {
        expect(typeof decimalsResult.data.decimals).toBe("string"); // uint8 -> string (ABI parsing)
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
              callData: "0x313ce567", // decimals()
              methodName: "decimals",
              applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
            },
            {
              callData: "0xfeaf968c", // latestRoundData()
              methodName: "latestRoundData",
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
      expect(output.length).toBe(contractReadNode.data.methodCalls.length);

      // Check that rawStructuredFields is NOT present in the data field for simulation
      // This ensures the backend fix is working correctly
      for (const item of output) {
        expect(item.data).toBeDefined();
        expect(item.data.rawStructuredFields).toBeUndefined();
      }

      // Verify that the actual data fields are present
      const latestRoundResult = output.find(
        (r: any) => r.methodName === "latestRoundData"
      );
      const decimalsResult = output.find(
        (r: any) => r.methodName === "decimals"
      );

      expect(latestRoundResult).toBeDefined();
      expect(decimalsResult).toBeDefined();
      expect(latestRoundResult.data).toHaveProperty("answer");
      expect(latestRoundResult.data).toHaveProperty("answerRaw");
      expect(latestRoundResult.data).toHaveProperty("roundId");
      expect(decimalsResult.data).toHaveProperty("decimals");

      // Check that decimal formatting was applied
      if (latestRoundResult.data.answer) {
        // 🔍 TYPE CHECK: Verify ABI type improvements are working in simulation mode
        expect(typeof latestRoundResult.data.answer).toBe("string");
        expect(latestRoundResult.data.answer).toMatch(/^\d+\.\d+$/); // Should be a decimal number
      }

      // Check that answerRaw field is present
      if (latestRoundResult.data.answerRaw) {
        expect(typeof latestRoundResult.data.answerRaw).toBe("string");
        expect(latestRoundResult.data.answerRaw).toMatch(/^\d+$/); // Should be raw integer
      }

      // 🔍 TYPE CHECK: Verify other fields have correct types
      if (decimalsResult.data.decimals) {
        expect(typeof decimalsResult.data.decimals).toBe("string"); // decimals field should be string type
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
              { callData: "0xfeaf968c", methodName: "latestRoundData" },
              { callData: "0x7284e416", methodName: "description" },
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
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBe(contractReadNode.data.methodCalls.length);

        const latestRoundResult = output.find(
          (r: any) => r.methodName === "latestRoundData"
        );

        const descriptionResult = output.find(
          (r: any) => r.methodName === "description"
        );

        expect(latestRoundResult).toBeDefined();
        expect(descriptionResult).toBeDefined();
        expect(latestRoundResult.success).toBe(true);
        expect(descriptionResult.success).toBe(true);
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
                callData: "0x313ce567", // decimals()
                methodName: "decimals",
                applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
              },
              {
                callData: "0xfeaf968c", // latestRoundData()
                methodName: "latestRoundData",
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
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBe(contractReadNode.data.methodCalls.length);

        // Find the specific method results
        const decimalsResult = output.find(
          (r: any) => r.methodName === "decimals"
        );
        const latestRoundResult = output.find(
          (r: any) => r.methodName === "latestRoundData"
        );

        expect(decimalsResult).toBeDefined();
        expect(latestRoundResult).toBeDefined();
        expect(decimalsResult.success).toBe(true);
        expect(latestRoundResult.success).toBe(true);

        // Verify that both method calls are included in the response
        expect(decimalsResult.data).toBeDefined();
        expect(latestRoundResult.data).toBeDefined();

        // Verify that decimals result contains the decimals value
        expect(decimalsResult.data).toHaveProperty("decimals");
        expect(typeof decimalsResult.data.decimals).toBe("string");

        // Verify that latestRoundData result contains formatted and raw values
        expect(latestRoundResult.data).toHaveProperty("answer");
        expect(latestRoundResult.data).toHaveProperty("answerRaw");
        expect(latestRoundResult.data).toHaveProperty("roundId");
        expect(latestRoundResult.data).toHaveProperty("answeredInRound");
        expect(latestRoundResult.data).toHaveProperty("startedAt");
        expect(latestRoundResult.data).toHaveProperty("updatedAt");

        // Verify decimal formatting was applied to answer field
        const answer = latestRoundResult.data.answer;
        const answerRaw = latestRoundResult.data.answerRaw;

        expect(typeof answer).toBe("string");
        expect(typeof answerRaw).toBe("string");

        // Answer should be formatted as decimal (contains a dot)
        expect(answer).toMatch(/^\d+\.\d+$/);

        // AnswerRaw should be raw integer (no decimal point)
        expect(answerRaw).toMatch(/^\d+$/);

        // Verify that answerRaw is the original value before formatting
        expect(parseInt(answerRaw)).toBeGreaterThan(0);
        expect(parseFloat(answer)).toBeGreaterThan(0);

        // Check that rawStructuredFields is present for deployed workflow execution
        expect(latestRoundResult.data.rawStructuredFields).toBeUndefined();
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
            { callData: "0x313ce567", methodName: "decimals" },
            { callData: "0x54fd4d50", methodName: "version" },
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

        // Check that all outputs have the same structure - they should all be arrays directly
        expect(Array.isArray(executedStep?.output)).toBe(true);
        expect(Array.isArray(simulatedStep?.output)).toBe(true);
        expect(Array.isArray(directOutput)).toBe(true);

        // Check that none of them have the old results wrapper
        expect(executedStep?.output).not.toHaveProperty("results");
        expect(simulatedStep?.output).not.toHaveProperty("results");
        expect(directOutput).not.toHaveProperty("results");

        // Check that all have the same method names
        const simulatedMethods = simulatedStep?.output
          .map((r: any) => r.methodName)
          .sort();
        const executedMethods = executedStep?.output
          .map((r: any) => r.methodName)
          .sort();
        const directMethods = (directOutput as any)
          ?.map((r: any) => r.methodName)
          .sort();

        expect(simulatedMethods).toEqual(executedMethods);
        expect(simulatedMethods).toEqual(directMethods);
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
          contractAbi: JSON.stringify([
            {
              inputs: [],
              name: "nonExistentMethod",
              outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
              stateMutability: "view",
              type: "function",
            },
          ]),
          methodCalls: [
            { callData: "0x12345678", methodName: "nonExistentMethod" },
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
          contractAbi: "[]",
          methodCalls: [
            {
              callData: "0x313ce567", // decimals()
              methodName: "decimals",
              applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
            },
            {
              callData: "0xfeaf968c", // latestRoundData()
              methodName: "latestRoundData",
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
      expect(decimalsCall.getCallData()).toBe("0x313ce567");
      expect(decimalsCall.getApplyToFieldsList()).toEqual([
        "latestRoundData.answer",
      ]);

      // Check second method call (no applyToFields)
      const latestRoundCall = methodCalls[1];
      expect(latestRoundCall.getMethodName()).toBe("latestRoundData");
      expect(latestRoundCall.getCallData()).toBe("0xfeaf968c");
      expect(latestRoundCall.getApplyToFieldsList()).toEqual([]);


    });
  });

  describe("ApplyToFields Decimal Formatting Tests", () => {
    test("should include answerRaw field when using applyToFields with runNodeWithInputs", async () => {
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
              callData: "0x313ce567", // decimals()
              methodName: "decimals",
              applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
            },
            {
              callData: "0xfeaf968c", // latestRoundData()
              methodName: "latestRoundData",
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

      const result = await client.runNodeWithInputs(params);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      const data = result.data as any;
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(params.nodeConfig.methodCalls.length); // decimals and latestRoundData

      // Find the specific method results
      const decimalsResult = data.find((r: any) => r.methodName === "decimals");
      const latestRoundResult = data.find(
        (r: any) => r.methodName === "latestRoundData"
      );

      expect(decimalsResult).toBeDefined();
      expect(latestRoundResult).toBeDefined();
      expect(decimalsResult.success).toBe(true);
      expect(latestRoundResult.success).toBe(true);

      // Verify that both method calls are included in the response
      expect(decimalsResult.data).toBeDefined();
      expect(latestRoundResult.data).toBeDefined();

      // Verify that decimals result contains the decimals value
      expect(decimalsResult.data).toHaveProperty("decimals");
      expect(typeof decimalsResult.data.decimals).toBe("string");

      // Verify that latestRoundData result contains formatted and raw values
      expect(latestRoundResult.data).toHaveProperty("answer");
      expect(latestRoundResult.data).toHaveProperty("answerRaw");
      expect(latestRoundResult.data).toHaveProperty("roundId");
      expect(latestRoundResult.data).toHaveProperty("answeredInRound");
      expect(latestRoundResult.data).toHaveProperty("startedAt");
      expect(latestRoundResult.data).toHaveProperty("updatedAt");

      // Verify decimal formatting was applied to answer field
      const answer = latestRoundResult.data.answer;
      const answerRaw = latestRoundResult.data.answerRaw;

      expect(typeof answer).toBe("string");
      expect(typeof answerRaw).toBe("string");

      // Answer should be formatted as decimal (contains a dot)
      expect(answer).toMatch(/^\d+\.\d+$/);

      // AnswerRaw should be raw integer (no decimal point)
      expect(answerRaw).toMatch(/^\d+$/);

      // Verify that answerRaw is the original value before formatting
      expect(parseInt(answerRaw)).toBeGreaterThan(0);
      expect(parseFloat(answer)).toBeGreaterThan(0);

      // Check that rawStructuredFields is present for direct execution
      expect(latestRoundResult.data.rawStructuredFields).toBeUndefined();


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
              callData: "0x313ce567", // decimals()
              methodName: "decimals",
              applyToFields: ["latestRoundData.answer"], // Apply decimal formatting to latestRoundData.answer field
            },
            {
              callData: "0xfeaf968c", // latestRoundData()
              methodName: "latestRoundData",
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
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBe(contractReadNode.data.methodCalls.length);

      // Find the specific method results
      const decimalsResult = output.find(
        (r: any) => r.methodName === "decimals"
      );
      const latestRoundResult = output.find(
        (r: any) => r.methodName === "latestRoundData"
      );

      expect(decimalsResult).toBeDefined();
      expect(latestRoundResult).toBeDefined();
      expect(decimalsResult.success).toBe(true);
      expect(latestRoundResult.success).toBe(true);

      // Verify that both method calls are included in the response
      expect(decimalsResult.data).toBeDefined();
      expect(latestRoundResult.data).toBeDefined();

      // Check that rawStructuredFields is NOT present in simulation
      expect(latestRoundResult.data.rawStructuredFields).toBeUndefined();

      // Verify that decimals result contains the decimals value
      expect(decimalsResult.data).toHaveProperty("decimals");
      expect(typeof decimalsResult.data.decimals).toBe("string");

      // Verify that latestRoundData result contains formatted and raw values
      expect(latestRoundResult.data).toHaveProperty("answer");
      expect(latestRoundResult.data).toHaveProperty("answerRaw");
      expect(latestRoundResult.data).toHaveProperty("roundId");
      expect(latestRoundResult.data).toHaveProperty("answeredInRound");
      expect(latestRoundResult.data).toHaveProperty("startedAt");
      expect(latestRoundResult.data).toHaveProperty("updatedAt");

      // Verify decimal formatting was applied to answer field
      const answer = latestRoundResult.data.answer;
      const answerRaw = latestRoundResult.data.answerRaw;

      expect(typeof answer).toBe("string");
      expect(typeof answerRaw).toBe("string");

      // Answer should be formatted as decimal (contains a dot)
      expect(answer).toMatch(/^\d+\.\d+$/);

      // AnswerRaw should be raw integer (no decimal point)
      expect(answerRaw).toMatch(/^\d+$/);

      // Verify that answerRaw is the original value before formatting
      expect(parseInt(answerRaw)).toBeGreaterThan(0);
      expect(parseFloat(answer)).toBeGreaterThan(0)
    });
  });
});
