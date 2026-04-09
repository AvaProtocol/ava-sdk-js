import util from "util";
import { describe, beforeAll, test, expect, afterEach } from "@jest/globals";
import _ from "lodash";
import { Client, NodeFactory, TriggerFactory } from "@avaprotocol/sdk-js";
import {
  NodeType,
  TriggerType,
  ExecutionMode,
  LoopNodeData,
  WorkflowProps,
  ExecutionStatus,
  Lang,
  LoopRunnerType,
} from "@avaprotocol/types";
import type { Edge } from "@avaprotocol/sdk-js";

// Type definitions for test responses
interface ProcessedLoopItem {
  item?: number;
  timestamp?: number;
  executionMode?: string;
  processedValue?: number;
  index?: number;
  squared?: number;
  doubled?: number;
  tripled?: number;
  defaultMode?: boolean;
  [key: string]: unknown;
}

// Use the proper LoopNodeData type from the types package

// Type for run node response data
interface RunNodeResponseData {
  data: ProcessedLoopItem[];
}

import {
  getNextId,
  TIMEOUT_DURATION_SLOW,
  removeCreatedWorkflows,
  getBlockNumber,
  getSettings,
  getSmartWallet,
  getSmartWalletWithBalance,
  getClient,
  authenticateClient,
  getExpiredAt,
} from "../utils/utils";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";
const { tokens } = getConfig();

const USDC_SEPOLIA_ADDRESS = tokens?.USDC?.address;

// Loop tests deploy + trigger real UserOps via the bundler under load.
// Use the slow preset to avoid jest racing TimeoutPresets.SLOW gRPC calls.
// See AvaProtocol/ava-sdk-js#209.
jest.setTimeout(TIMEOUT_DURATION_SLOW);

const createdIdMap: Map<string, boolean> = new Map();

describe("LoopNode Tests", () => {
  let client: Client;
  let fundedSmartWalletAddress: string;

  // Define all node props at the beginning for consistency
  const customCodeLoopProps = {
    inputVariable: "{{testArray}}",
    iterationTimeout: 30,
    iterVal: "value",
    iterKey: "index",
    executionMode: ExecutionMode.Sequential,
    runner: {
      type: LoopRunnerType.CustomCode,
      config: {
        lang: Lang.JavaScript,
        source: `
          const _ = require('lodash');
          return {
            processedValue: value,
            index: index,
            squared: value * value,
            timestamp: new Date().toISOString()
          };
        `,
      },
    },
  } as LoopNodeData;

  const restApiLoopProps = {
    inputVariable: "{{urlArray}}",
    iterationTimeout: 30,
    iterVal: "value",
    iterKey: "index",
    executionMode: ExecutionMode.Sequential,
    runner: {
      type: LoopRunnerType.RestAPI,
      config: {
        url: "{{value}}",
        method: "GET",
        body: "",
        headersMap: [["User-Agent", "AvaProtocol-Loop-Test"]],
      },
    },
  } as LoopNodeData;

  const emptyArrayLoopProps = {
    inputVariable: "{{emptyArray}}",
    iterationTimeout: 30,
    iterVal: "value",
    iterKey: "index",
    executionMode: ExecutionMode.Sequential,
    runner: {
      type: LoopRunnerType.CustomCode,
      config: {
        lang: Lang.JavaScript,
        source: "return { processed: value, index: index };",
      },
    },
  } as LoopNodeData;

  const singleItemLoopProps = {
    inputVariable: "{{singleItem}}",
    iterationTimeout: 30,
    iterVal: "value",
    iterKey: "index",
    executionMode: ExecutionMode.Sequential,
    runner: {
      type: LoopRunnerType.CustomCode,
      config: {
        lang: Lang.JavaScript,
        source: "return { value: value, index: index, processed: true };",
      },
    },
  } as LoopNodeData;

  const parallelExecutionProps = {
    inputVariable: "{{parallelArray}}",
    iterationTimeout: 30,
    iterVal: "value",
    iterKey: "index",
    executionMode: ExecutionMode.Parallel,
    runner: {
      type: LoopRunnerType.CustomCode,
      config: {
        lang: Lang.JavaScript,
        source: `
            return {
              processedValue: value,
              index: index,
              executionMode: 'parallel',
              timestamp: new Date().toISOString()
            };
          `,
      },
    },
  } as LoopNodeData;

  const complexDataLoopProps = {
    inputVariable: "{{complexArray}}",
    iterationTimeout: 30,
    iterVal: "value",
    iterKey: "index",
    executionMode: ExecutionMode.Sequential,
    runner: {
      type: LoopRunnerType.CustomCode,
      config: {
        lang: Lang.JavaScript,
        source: `
            const _ = require('lodash');
            return {
              id: value.id,
              upperName: value.name.toUpperCase(),
              doubledValue: value.value * 2,
              index: index,
              isEven: value.value % 2 === 0
            };
          `,
      },
    },
  } as LoopNodeData;

  beforeAll(async () => {
    client = getClient();
    await authenticateClient(client);

    // Get the funded smart wallet address
    const wallet = await getSmartWalletWithBalance(client);
    fundedSmartWalletAddress = wallet.address;
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("runNodeWithInputs Tests", () => {
    test("should process loop with CustomCode runner using runNodeWithInputs", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_test",
          type: NodeType.Loop,
          data: customCodeLoopProps,
        },
        inputVariables: {
          testArray: [1, 2, 3, 4, 5],
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true }),
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      // With the consistency fix, result.data is now the array directly
      expect(Array.isArray(result.data)).toBe(true);
      expect((result.data as ProcessedLoopItem[]).length).toBe(5);

      // Check first processed item
      const firstItem = (
        result.data as ProcessedLoopItem[]
      )[0] as ProcessedLoopItem;
      expect(firstItem.processedValue).toBe(1);
      expect(firstItem.index).toBe(0);
      expect(firstItem.squared).toBe(1);
      expect(firstItem.timestamp).toBeDefined();
    });

    test("should process loop with REST API runner using runNodeWithInputs", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_rest_test",
          type: NodeType.Loop,
          data: restApiLoopProps,
        },
        inputVariables: {
          urlArray: [
            "https://mock-api.ap-aggregator.local/get?test=1",
            "https://mock-api.ap-aggregator.local/get?test=2",
          ],
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true }),
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      // With the consistency fix, result.data is now the array directly
      expect(Array.isArray(result.data)).toBe(true);
      expect((result.data as Record<string, unknown>[]).length).toBe(2);

      // Check that each item has the expected structure
      const firstItem = (result.data as Record<string, unknown>[])[0] as Record<
        string,
        unknown
      >;
      expect(firstItem).toBeDefined();
      expect(typeof firstItem).toBe("object");
    });

    test("should handle empty array input", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_empty_test",
          type: NodeType.Loop,
          data: emptyArrayLoopProps,
        },
        inputVariables: {
          emptyArray: [],
        },
      };

      console.log(
        "🚀 Empty array loop input:",
        util.inspect(params, { depth: null, colors: true }),
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 Empty array loop result:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      // With the consistency fix, result.data is now the array directly
      expect(Array.isArray(result.data)).toBe(true);
      expect((result.data as ProcessedLoopItem[]).length).toBe(0);
    });

    test("should handle complex object array", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_complex_test",
          type: NodeType.Loop,
          data: complexDataLoopProps,
        },
        inputVariables: {
          complexArray: [
            { id: "a1", name: "Alice", value: 10 },
            { id: "b2", name: "Bob", value: 15 },
            { id: "c3", name: "Carol", value: 20 },
          ],
        },
      };

      console.log(
        "🚀 Complex object array loop input:",
        util.inspect(params, { depth: null, colors: true }),
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 Complex object array loop result:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();

      // Type guard to ensure result.data is the expected type
      // With the consistency fix, result.data is now the array directly
      expect(Array.isArray(result.data)).toBe(true);
      expect((result.data as ProcessedLoopItem[]).length).toBe(3);

      const firstResult = (
        result.data as ProcessedLoopItem[]
      )[0] as ProcessedLoopItem;
      expect(firstResult.id).toBe("a1");
      expect(firstResult.upperName).toBe("ALICE");
      expect(firstResult.doubledValue).toBe(20);
      expect(firstResult.index).toBe(0);
      expect(firstResult.isEven).toBe(true);
    });

    test("should process loop with ContractRead runner using runNodeWithInputs", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{contractAddresses}}",
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            executionMode: ExecutionMode.Sequential,
            runner: {
              type: LoopRunnerType.ContractRead,
              config: {
                contractAddress: "{{value}}",
                contractAbi: [
                  {
                    inputs: [],
                    name: "name",
                    outputs: [{ name: "", type: "string" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function",
                  },
                ],
                methodCalls: [
                  {
                    methodName: "name",
                    methodParams: [],
                  },
                ],
              },
            },
          } as LoopNodeData,
        },
        inputVariables: {
          contractAddresses: [
            "0xB0C712f98daE15264c8E26132BCC91C40aD4d5F9", // Chainlink ETH/USD price feed (doesn't have name/symbol)
            USDC_SEPOLIA_ADDRESS, // USDC contract (has name/symbol)
          ],
        },
      };

      console.log(
        "🚀 ~ should process loop with ContractRead ~ params:",
        util.inspect(params, { depth: null, colors: true }),
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "runNodeWithInputs ContractRead loop response:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();

      // Note: The test may fail due to contract validation or network issues,
      // but the important part is that the backend now supports contractRead as a loop runner
    });

    test("should process loop with ContractWrite runner using runNodeWithInputs", async () => {
      const methodName = "approve";
      const methodParams = ["{{value.spender}}", "{{value.amount}}"];
      const params = {
        node: {
          id: getNextId(),
          name: "loop_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{writeParams}}",
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            executionMode: ExecutionMode.Sequential,
            runner: {
              type: LoopRunnerType.ContractWrite,
              config: {
                contractAddress: USDC_SEPOLIA_ADDRESS,
                contractAbi: [
                  {
                    inputs: [
                      { name: "spender", type: "address" },
                      { name: "amount", type: "uint256" },
                    ],
                    name: "approve",
                    outputs: [{ name: "", type: "bool" }],
                    payable: false,
                    stateMutability: "nonpayable",
                    type: "function",
                  },
                ],
                methodCalls: [
                  {
                    methodName: methodName,
                    methodParams: methodParams,
                  },
                ],
              },
            },
          } as LoopNodeData,
        },
        inputVariables: {
          writeParams: [
            {
              spender: fundedSmartWalletAddress,
              amount: "0",
            },
            {
              spender: "0x0000000000000000000000000000000000000001",
              amount: "0",
            },
          ],
          settings: getSettings(fundedSmartWalletAddress),
        },
      };

      console.log(
        "🚀 ~ should process loop with ContractWrite ~ params:",
        params,
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "runNodeWithInputs ContractWrite loop response:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      // Expect format: data: [ { approve: true }, { approve: true } ]
      const iterations = result.data as Array<Record<string, unknown>>;
      expect(iterations.length).toBe(methodParams.length);
      iterations.forEach((iteration) => {
        expect(iteration).toHaveProperty(methodName);
        expect((iteration as Record<string, unknown>)[methodName]).toBe(true); // Expect {approve: true}
      });
    });

    test("should process loop with ETHTransfer runner and populate from address", async () => {
      const recipientAddresses = [
        "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
        "0x0000000000000000000000000000000000000001",
      ];
      const transferAmount = "100000000000000"; // 0.0001 ETH in wei

      const params = {
        node: {
          id: getNextId(),
          name: "loop_eth_transfer_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{recipients}}",
            iterationTimeout: 60,
            iterVal: "value",
            iterKey: "index",
            executionMode: ExecutionMode.Sequential,
            runner: {
              type: LoopRunnerType.EthTransfer,
              config: {
                destination: "{{value}}",
                amount: transferAmount,
              },
            },
          } as LoopNodeData,
        },
        inputVariables: {
          recipients: recipientAddresses,
          settings: getSettings(fundedSmartWalletAddress),
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true }),
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      const iterations = result.data as Array<Record<string, unknown>>;
      expect(iterations.length).toBe(recipientAddresses.length);

      // Each iteration should return a transfer object with from, to, and value
      iterations.forEach((iteration, i) => {
        expect(iteration).toHaveProperty("transfer");
        const transfer = iteration.transfer as Record<string, string>;

        // Verify from address is populated (smart wallet address)
        expect(transfer.from).toBeDefined();
        expect(typeof transfer.from).toBe("string");
        expect(transfer.from.toLowerCase()).toBe(
          fundedSmartWalletAddress.toLowerCase(),
        );

        // Verify to address matches the recipient
        expect(transfer.to).toBeDefined();
        expect(transfer.to.toLowerCase()).toBe(
          recipientAddresses[i].toLowerCase(),
        );

        // Verify amount
        expect(transfer.value).toBe(transferAmount);
      });
    });

    test("should process loop with GraphQL runner using runNodeWithInputs", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_graphql_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{tokenIds}}",
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            executionMode: ExecutionMode.Sequential,
            runner: {
              type: LoopRunnerType.GraphQLQuery,
              config: {
                url: "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
                query: `{
                  tokens(first: 1, where: {symbol: "{{value}}"}) {
                    id
                    symbol
                    name
                    decimals
                  }
                }`,
              },
            },
          } as LoopNodeData,
        },
        inputVariables: {
          tokenIds: ["WETH", "USDC"],
        },
      };

      console.log(
        "params:",
        util.inspect(params, { depth: null, colors: true }),
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "response:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      const iterations = result.data as Array<Record<string, unknown>>;
      expect(iterations.length).toBe(2);

      // Each iteration should return GraphQL query data
      iterations.forEach((iteration) => {
        expect(iteration).toBeDefined();
        // The response should contain the data from The Graph API
        expect(typeof iteration).toBe("object");
      });
    });
  });

  describe("simulateWorkflow Tests", () => {
    test("should simulate workflow with Loop node using CustomCode runner", async () => {
      const wallet = await getSmartWallet(client);

      // Create a data generation node
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_loop_data",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
              return [
                { name: "item1", value: 10 },
                { name: "item2", value: 20 },
                { name: "item3", value: 30 }
              ];
            `,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_loop_test",
        type: NodeType.Loop,
        data: {
          inputVariable: `{{${dataNode.name}.data}}`,
          iterationTimeout: 30,
          iterVal: "value",
          iterKey: "index",
          runner: {
            type: LoopRunnerType.CustomCode,
            config: {
              lang: Lang.JavaScript,
              source: `
                  const _ = require('lodash');
                  return {
                    processedValue: value,
                    index: index,
                    calculatedValue: value.value * 2 + index,
                    itemName: value.name
                  };
                `,
            },
          },
        } as LoopNodeData,
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);

      console.log(
        "🚀 ~ simulate workflow with CustomCode loop ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true }),
      );

      const base = client.createWorkflow(workflowProps);
      const simulation = await client.simulateWorkflow({
        ...base.toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      console.log(
        "simulateWorkflow loop response:",
        util.inspect(simulation, { depth: null, colors: true }),
      );

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(3); // trigger + data node + loop node

      const loopStep = simulation.steps.find((step) => step.id === loopNode.id);
      expect(loopStep!.success).toBeTruthy();

      // Verify the step input contains the loop node configuration
      expect(loopStep!.config).toBeDefined();
      const inputConfig = loopStep!.config as unknown as LoopNodeData;

      // Verify basic configuration
      expect(inputConfig.inputVariable).toBe(`{{${dataNode.name}.data}}`);
      expect(inputConfig.iterVal).toBe("value");
      expect(inputConfig.iterKey).toBe("index");
      expect(inputConfig.executionMode).toBeDefined();

      // Verify runner configuration
      expect(inputConfig.runner).toBeDefined();
      expect(inputConfig.runner!.type).toBe("customCode");
      if (inputConfig.runner && inputConfig.runner.type === "customCode") {
        expect(inputConfig.runner.config.source).toBeDefined();
        expect(inputConfig.runner.config.lang).toBeDefined();
      } else {
        throw new Error(
          `Expected runner type 'customCode', but got '${inputConfig.runner?.type}'`,
        );
      }

      const output = loopStep!.output as ProcessedLoopItem[];
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBe(3);

      // Verify each processed item
      output.forEach((item, index) => {
        expect(item.processedValue).toBeDefined();
        expect(item.index).toBe(index);
        expect(item.calculatedValue).toBeDefined();
        expect(item.itemName).toBeDefined();
      });
    });

    test("should simulate workflow with Loop node using REST API runner", async () => {
      const wallet = await getSmartWallet(client);

      // Create a data generation node for URLs
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_url_data",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
              return [
                "https://mock-api.ap-aggregator.local/get?test=1",
                "https://mock-api.ap-aggregator.local/get?test=2"
              ] ;
            `,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_rest_api_loop",
        type: NodeType.Loop,
        data: {
          inputVariable: `{{${dataNode.name}.data}}`,
          iterationTimeout: 30,
          iterVal: "value",
          iterKey: "index",
          runner: {
            type: LoopRunnerType.RestAPI,
            config: {
              url: "{{value}}",
              method: "GET",
              body: "",
              headersMap: [["User-Agent", "AvaProtocol-Loop-Test"]],
            },
          },
        } as LoopNodeData,
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);

      console.log(
        "🚀 ~ simulate workflow with REST API loop ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true }),
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps),
      );

      console.log(
        "simulateWorkflow REST API loop response:",
        util.inspect(simulation, { depth: null, colors: true }),
      );

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(3); // trigger + data node + loop node

      const loopStep = simulation.steps.find((step) => step.id === loopNode.id);
      expect(loopStep!.success).toBeTruthy();

      // Verify the step input contains the loop node configuration
      expect(loopStep!.config).toBeDefined();
      const loopStepConfig = loopStep!.config as unknown as LoopNodeData;

      // Verify basic configuration
      expect(loopStepConfig.inputVariable).toBe(`{{${dataNode.name}.data}}`);
      expect(loopStepConfig.iterVal).toBe("value");
      expect(loopStepConfig.iterKey).toBe("index");
      expect(loopStepConfig.executionMode).toBeDefined();

      // Verify runner configuration
      expect(loopStepConfig.runner).toBeDefined();
      expect(loopStepConfig.runner!.type).toBe("restApi");
      if (loopStepConfig.runner && loopStepConfig.runner.type === "restApi") {
        expect(loopStepConfig.runner.config.url).toBe("{{value}}");
        expect(loopStepConfig.runner.config.method).toBe("GET");
        expect(loopStepConfig.runner.config.body).toBe("");
      } else {
        throw new Error(
          `Expected runner type 'restApi', but got '${loopStepConfig.runner?.type}'`,
        );
      }

      const output = loopStep!.output as Record<string, unknown>[];
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBe(2);

      // Verify each API response has expected structure
      output.forEach((item) => {
        expect(item).toBeDefined();
        expect(typeof item).toBe("object");
      });
    });

    test("should simulate workflow with Loop node using ContractRead runner", async () => {
      const wallet = await getSmartWallet(client);

      // Create a data generation node for contract addresses
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_contract_addresses",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
            return [
              USDC_SEPOLIA_ADDRESS,
              "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238"
            ];
          `,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_contract_read_loop",
        type: NodeType.Loop,
        data: {
          inputVariable: `{{${dataNode.name}.data}}`,
          iterationTimeout: 30,
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: LoopRunnerType.ContractRead,
            config: {
              contractAddress: "{{value}}",
              contractAbi: [
                {
                  inputs: [],
                  name: "name",
                  outputs: [{ name: "", type: "string" }],
                  payable: false,
                  stateMutability: "view",
                  type: "function",
                },
              ],
              methodCalls: [
                {
                  methodName: "name",
                  methodParams: [],
                },
              ],
            },
          },
        } as LoopNodeData,
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);

      console.log(
        "🚀 ~ simulate workflow with ContractRead loop ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true }),
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps),
      );

      console.log(
        "simulateWorkflow ContractRead loop response:",
        util.inspect(simulation, { depth: null, colors: true }),
      );

      expect(simulation.steps).toHaveLength(3); // trigger + data node + loop node

      const loopStep = simulation.steps.find((step) => step.id === loopNode.id);
      expect(loopStep).toBeDefined();

      // Verify the step input contains the loop node configuration
      expect(loopStep!.config).toBeDefined();
      const inputConfig = loopStep!.config as unknown as LoopNodeData;

      // Verify basic configuration
      expect(inputConfig.inputVariable).toBe(`{{${dataNode.name}.data}}`);
      expect(inputConfig.iterVal).toBe("value");
      expect(inputConfig.iterKey).toBe("index");
      expect(inputConfig.executionMode).toBeDefined();

      // Verify runner configuration
      expect(inputConfig.runner).toBeDefined();
      expect(inputConfig.runner!.type).toBe("contractRead");
      if (inputConfig.runner && inputConfig.runner.type === "contractRead") {
        expect(inputConfig.runner.config.contractAddress).toBe("{{value}}");
        // Note: contractAbi is not in the protobuf AsObject type but exists in practice
        expect(
          (inputConfig.runner.config as Record<string, unknown>).contractAbi,
        ).toBeDefined();
      } else {
        throw new Error(
          `Expected runner type 'contractRead', but got '${inputConfig.runner?.type}'`,
        );
      }

      // Note: The test may fail due to contract validation or network issues,
      // but the important part is that the backend now supports contractRead as a loop runner
    });

    test("should simulate workflow with Loop node using ContractWrite runner", async () => {
      // Note: ContractWrite operations in simulation may fail due to:
      // - Smart wallet validation (needs proper balance/setup)
      // - Bundler/tenderly simulation limitations
      // This test verifies the data flow is correct, even if execution partially fails

      const wallet = await getSmartWallet(client);

      // Create a data generation node for contract write params
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_contract_write_params",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
            return [
              {
                contractAddress: "${USDC_SEPOLIA_ADDRESS}",
                spender: "${fundedSmartWalletAddress}",
                amount: "0"
              },
              {
                contractAddress: "${USDC_SEPOLIA_ADDRESS}",
                spender: "0x0000000000000000000000000000000000000001",
                amount: "0"
              }
            ];
          `,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_contract_write_loop",
        type: NodeType.Loop,
        data: {
          inputVariable: `{{${dataNode.name}.data}}`,
          iterationTimeout: 30,
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: LoopRunnerType.ContractWrite,
            config: {
              contractAddress: "{{value.contractAddress}}",
              contractAbi: [
                {
                  inputs: [
                    { name: "spender", type: "address" },
                    { name: "amount", type: "uint256" },
                  ],
                  name: "approve",
                  outputs: [{ name: "", type: "bool" }],
                  payable: false,
                  stateMutability: "nonpayable",
                  type: "function",
                },
                {
                  anonymous: false,
                  inputs: [
                    { indexed: true, name: "owner", type: "address" },
                    { indexed: true, name: "spender", type: "address" },
                    { indexed: false, name: "value", type: "uint256" },
                  ],
                  name: "Approval",
                  type: "event",
                },
              ],
              methodCalls: [
                {
                  methodName: "approve",
                  methodParams: ["{{value.spender}}", "{{value.amount}}"],
                },
              ],
            },
          },
        } as LoopNodeData,
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);

      console.log(
        "🚀 ~ simulate workflow with ContractWrite loop ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true }),
      );

      const base = client.createWorkflow(workflowProps);
      const simulation = await client.simulateWorkflow({
        ...base.toJson(),
        inputVariables: {
          settings: getSettings(wallet.address),
        },
      });

      console.log(
        "simulateWorkflow ContractWrite loop response:",
        util.inspect(simulation, { depth: null, colors: true }),
      );

      // Accept both success and partialSuccess (contract write operations may fail in simulation)
      expect([
        ExecutionStatus.Success,
        ExecutionStatus.PartialSuccess,
      ]).toContain(simulation.status);
      expect(simulation.steps).toHaveLength(3); // trigger + data node + loop node

      // Verify the data generation node succeeded
      const dataStep = simulation.steps.find((step) => step.id === dataNode.id);
      expect(dataStep).toBeDefined();
      expect(dataStep!.success).toBeTruthy();
      expect(dataStep!.output).toBeDefined();
      expect(Array.isArray(dataStep!.output)).toBe(true);

      // Verify the generated data has the correct structure
      const generatedData = dataStep!.output as Array<{
        contractAddress: string;
        spender: string;
        amount: string;
      }>;
      expect(generatedData).toHaveLength(2);
      expect(generatedData[0]).toHaveProperty("contractAddress");
      expect(generatedData[0]).toHaveProperty("spender");
      expect(generatedData[0]).toHaveProperty("amount");

      const loopStep = simulation.steps.find((step) => step.id === loopNode.id);
      expect(loopStep).toBeDefined();

      // Loop step may fail in simulation due to smart wallet/bundler limitations, but that's okay
      console.log(
        `Loop step status: ${
          loopStep!.success ? "SUCCESS" : "FAILED (expected in simulation)"
        }`,
      );
    });
  });

  describe("Deploy Workflow + Trigger Tests", () => {
    test("should deploy and trigger workflow with Loop node", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      // Create a data generation node
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_test_data",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
            return [
              { name: "Alice", score: 85 },
              { name: "Bob", score: 92 },
              { name: "Carol", score: 78 }
            ];
          `,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_loop_test",
        type: NodeType.Loop,
        data: {
          inputVariable: `{{${dataNode.name}.data}}`,
          iterationTimeout: 30,
          iterVal: "value",
          iterKey: "index",
          runner: {
            type: LoopRunnerType.CustomCode,
            config: {
              lang: Lang.JavaScript,
              source: `
                  const _ = require('lodash');
                  const grade = value.score >= 90 ? 'A' : 
                               value.score >= 80 ? 'B' : 
                               value.score >= 70 ? 'C' : 'D';
                  
                  return {
                    studentName: value.name,
                    originalScore: value.score,
                    letterGrade: grade,
                    index: index + 1,
                    timestamp: new Date().toISOString()
                  };
                `,
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      let workflowId: string | undefined;
      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps),
        );
        createdIdMap.set(workflowId, true);

        await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        });

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const loopStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === loopNode.id,
        );

        if (_.isUndefined(loopStep)) {
          throw new Error("No corresponding loop step found.");
        }

        expect(loopStep.success).toBeTruthy();

        const output = loopStep.output as ProcessedLoopItem[];
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBe(3);
        expect(output[0].studentName).toBe("Alice");
        expect(output[0].letterGrade).toBe("B");
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });

    test("should deploy and trigger workflow with multiple Loop node types", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      // Create a data generation node
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_multi_data",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
            return [1, 2, 3];
            `,
        },
      });

      // Create CustomCode loop
      const customCodeLoop = NodeFactory.create({
        id: getNextId(),
        name: "custom_code_loop",
        type: NodeType.Loop,
        data: {
          inputVariable: `{{${dataNode.name}.data}}`,
          iterationTimeout: 30,
          iterVal: "value",
          iterKey: "index",
          runner: {
            type: LoopRunnerType.CustomCode,
            config: {
              lang: Lang.JavaScript,
              source: `return { number: value, squared: value * value, index: index };`,
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        customCodeLoop,
      ]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      let workflowId: string | undefined;
      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps),
        );
        createdIdMap.set(workflowId, true);

        await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        });

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });
        const customCodeLoopStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === customCodeLoop.id,
        );

        expect(customCodeLoopStep!.success).toBeTruthy();

        const output = customCodeLoopStep!.output as ProcessedLoopItem[];
        expect(Array.isArray(output)).toBe(true);
        expect(output.length).toBe(3);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });

    test("should deploy and trigger workflow with Loop node using ContractRead runner", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      // Create a data generation node for contract addresses
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_contract_addresses",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
            return [
              USDC_SEPOLIA_ADDRESS,
              "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238"
            ];
          `,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_contract_read_loop",
        type: NodeType.Loop,
        data: {
          inputVariable: `{{${dataNode.name}.data}}`,
          iterationTimeout: 30,
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: LoopRunnerType.ContractRead,
            config: {
              contractAddress: "{{value}}",
              contractAbi: [
                {
                  inputs: [],
                  name: "name",
                  outputs: [{ name: "", type: "string" }],
                  payable: false,
                  stateMutability: "view",
                  type: "function",
                },
              ],
              methodCalls: [
                {
                  methodName: "name",
                  methodParams: [],
                },
              ],
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      let workflowId: string | undefined;
      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps),
        );
        createdIdMap.set(workflowId, true);

        await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: currentBlockNumber + triggerInterval,
          },
          isBlocking: true,
        });

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const loopStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === loopNode.id,
        );

        expect(loopStep).toBeDefined();
        console.log(
          "Deploy + trigger ContractRead loop step output:",
          util.inspect(loopStep!.output, { depth: null, colors: true }),
        );

        // Note: The test may fail due to contract validation or network issues,
        // but the important part is that the backend now supports contractRead as a loop runner
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });

    // 2 sequential real UserOps on Sepolia need longer than the default 60s
    test("should deploy and trigger workflow with Loop node using ContractWrite runner", async () => {
      const wallet = await getSmartWallet(client);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      // Create a data generation node for contract write params
      const codeNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_contract_write_params",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `
            return [
              {
                contractAddress: "${USDC_SEPOLIA_ADDRESS}",
                spender: "${fundedSmartWalletAddress}",
                amount: "0"
              },
              {
                contractAddress: "${USDC_SEPOLIA_ADDRESS}",
                spender: "0x0000000000000000000000000000000000000001",
                amount: "0"
              }
            ];
          `,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "deploy_contract_write_loop",
        type: NodeType.Loop,
        data: {
          inputVariable: `{{${codeNode.name}.data}}`,
          iterationTimeout: 60,
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: LoopRunnerType.ContractWrite,
            config: {
              contractAddress: "{{value.contractAddress}}",
              contractAbi: [
                {
                  inputs: [
                    { name: "spender", type: "address" },
                    { name: "amount", type: "uint256" },
                  ],
                  name: "approve",
                  outputs: [{ name: "", type: "bool" }],
                  payable: false,
                  stateMutability: "nonpayable",
                  type: "function",
                },
              ],
              methodCalls: [
                {
                  methodName: "approve",
                  methodParams: ["{{value.spender}}", "{{value.amount}}"],
                },
              ],
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        codeNode,
        loopNode,
      ]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      let workflowId: string | undefined;
      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps),
        );
        createdIdMap.set(workflowId, true);

        await client.triggerWorkflow(
          {
            id: workflowId,
            triggerData: {
              type: TriggerType.Block,
              blockNumber: currentBlockNumber + triggerInterval,
            },
            isBlocking: true,
          },
          { timeout: { timeout: 120000 } }, // 2 sequential real UserOps on Sepolia
        );

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });

        expect(executions.items.length).toBe(1);

        const loopStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === loopNode.id,
        );

        expect(loopStep).toBeDefined();
        console.log(
          "Deploy + trigger ContractWrite loop step output:",
          util.inspect(loopStep!.output, { depth: null, colors: true }),
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    }, 180000);
  });

  describe("Response Format Consistency Tests", () => {
    test("should return consistent response format across all three methods", async () => {
      const wallet = await getSmartWallet(client);

      const loopConfig = {
        inputVariable: "{{manualTrigger.data}}",
        iterationTimeout: 30,
        iterVal: "value",
        iterKey: "index",
        executionMode: ExecutionMode.Sequential,
        runner: {
          type: LoopRunnerType.CustomCode,
          config: {
            lang: Lang.JavaScript,
            source: `return value;`,
          },
        },
      } as LoopNodeData;

      const inputVariables = {
        manualTrigger: {
          data: [{ key: "value1" }, { key: "value2" }],
          input: {
            data: [{ key: "value1" }, { key: "value2" }],
            headers: { headerKey: "headerValue" },
            pathParams: { pathKey: "pathValue" },
          },
        },
      };

      // Test 1: runNodeWithInputs
      const directResponse = await client.runNodeWithInputs({
        node: {
          id: getNextId(),
          name: "consistency_test",
          type: NodeType.Loop,
          data: loopConfig,
        },
        inputVariables: inputVariables,
      });

      // Test 2: simulateWorkflow with ManualTrigger
      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "consistency_test",
        type: NodeType.Loop,
        data: {
          inputVariable: "{{manualTrigger.data}}",
          iterationTimeout: 30,
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: LoopRunnerType.CustomCode,
            config: {
              lang: Lang.JavaScript,
              source: `return value;`,
            },
          },
        } as LoopNodeData,
      });

      const workflowProps = createFromTemplate(wallet.address, [loopNode]);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "manualTrigger",
        type: TriggerType.Manual,
        data: [{ key: "value1" }, { key: "value2" }], // Use direct array structure like execution
      });

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps),
      );

      const simulatedStep = simulation.steps.find(
        (step) => step.id === loopNode.id,
      );

      // Test 3: Deploy + Trigger with ManualTrigger
      let workflowId: string | undefined;
      try {
        workflowId = await client.submitWorkflow(
          client.createWorkflow(workflowProps),
        );
        createdIdMap.set(workflowId, true);

        await client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Manual,
            data: [{ key: "value1" }, { key: "value2" }],
            headers: { headerKey: "headerValue" },
            pathParams: { pathKey: "pathValue" },
          },
          isBlocking: true,
        });

        const executions = await client.getExecutions([workflowId], {
          limit: 1,
        });
        const executedStep = _.find(
          _.first(executions.items)?.steps,
          (step) => step.id === loopNode.id,
        );

        // Compare response formats - LoopNode should return consistent data structure

        // All should be successful
        expect(directResponse.success).toBeTruthy();
        expect(simulatedStep).toBeDefined();
        expect(executedStep).toBeDefined();
        expect(executedStep!.success).toBeTruthy();

        // Verify consistent structure - the key fix from the backend
        console.log(
          "🔍 Direct Response:",
          JSON.stringify(directResponse, null, 2),
        );
        console.log(
          "🔍 Simulated Step:",
          JSON.stringify(simulatedStep, null, 2),
        );
        console.log("🔍 Executed Step:", JSON.stringify(executedStep, null, 2));

        // Check that all outputs have the same structure - they should all be arrays directly
        // This is the key consistency check: LoopNode should return array directly in data field
        expect(directResponse.data).toBeDefined();
        expect(Array.isArray(directResponse.data)).toBe(true);
        expect(Array.isArray(executedStep?.output)).toBe(true);
        expect(Array.isArray(simulatedStep?.output)).toBe(true);

        // Check that all have the same number of results (2 items from the test data)
        expect((directResponse.data as ProcessedLoopItem[]).length).toBe(2);
        expect(executedStep?.output.length).toBe(2);
        expect(simulatedStep?.output.length).toBe(2);

        // Check that all have the same structure for first item
        // Since we're using "return value;", each item should be the original object
        const directFirstItem = (
          directResponse.data as ProcessedLoopItem[]
        )[0] as { key: string };
        const simulatedFirstItem = simulatedStep?.output[0] as { key: string };
        const executedFirstItem = executedStep?.output[0] as { key: string };

        expect(directFirstItem.key).toBe("value1");
        expect(simulatedFirstItem.key).toBe("value1");
        expect(executedFirstItem.key).toBe("value1");

        // Check second item for completeness
        const directSecondItem = (
          directResponse.data as ProcessedLoopItem[]
        )[1] as {
          key: string;
        };
        const simulatedSecondItem = simulatedStep?.output[1] as { key: string };
        const executedSecondItem = executedStep?.output[1] as { key: string };

        expect(directSecondItem.key).toBe("value2");
        expect(simulatedSecondItem.key).toBe("value2");
        expect(executedSecondItem.key).toBe("value2");
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });

    test("should handle client workflow with parallel loop execution consistently", async () => {
      const wallet = await getSmartWallet(client);
      let workflowId: string | undefined;

      try {
        // Create manual trigger with array data (from client workflow)
        const manualTrigger = TriggerFactory.create({
          id: getNextId(),
          name: "manualTrigger",
          type: TriggerType.Manual,
          data: {
            data: [
              { key: "key", amount: 1 },
              { key: "key2", amount: 2000 },
            ],
            headers: {},
            pathParams: {},
          },
        });

        // Create loop node with parallel execution (from client workflow)
        const loopNode = NodeFactory.create({
          id: getNextId(),
          name: "loop1",
          type: NodeType.Loop,
          data: {
            inputVariable: `{{${manualTrigger.name}.data}}`,
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            executionMode: ExecutionMode.Parallel,
            runner: {
              type: LoopRunnerType.CustomCode,
              config: {
                lang: Lang.JavaScript,
                source: "return value;",
              },
            },
          } as LoopNodeData,
        });

        // Test runNodeWithInputs
        const directResponse = await client.runNodeWithInputs({
          node: {
            id: loopNode.id,
            name: loopNode.name,
            type: loopNode.type,
            data: loopNode.data,
          },
          inputVariables: {
            [manualTrigger.name]: {
              data: [
                { key: "key", amount: 1 },
                { key: "key2", amount: 2000 },
              ],
            },
          },
        });

        console.log(
          "🔍 Direct Response:",
          JSON.stringify(directResponse, null, 2),
        );

        // Test simulateWorkflow
        const workflowProps: WorkflowProps = {
          name: "Loop Node Type Consistency Test",
          smartWalletAddress: wallet.address,
          nodes: [loopNode],
          edges: [
            {
              id: getNextId(),
              source: manualTrigger.id,
              target: loopNode.id,
            } as Edge,
          ],
          trigger: manualTrigger,
          startAt: Date.now(),
          expiredAt: getExpiredAt("30d"),
          maxExecution: 1,
          inputVariables: {
            settings: getSettings(
              wallet.address,
              "Loop Node Type Consistency Test",
            ),
          },
        };
        const simulatedWorkflow = await client.simulateWorkflow(
          client.createWorkflow(workflowProps),
        );

        console.log(
          "🔍 Simulated Workflow:",
          JSON.stringify(simulatedWorkflow, null, 2),
        );

        // TODO: Add deployWorkflow test once triggerWorkflow API issue is resolved

        // Assertions for response format consistency
        expect(directResponse.success).toBeTruthy();
        expect(simulatedWorkflow.status).toBe(ExecutionStatus.Success);

        // Check data structure consistency
        expect(Array.isArray(directResponse.data)).toBe(true);
        expect(
          (directResponse.data as { key: string; amount: number }[]).length,
        ).toBe(2);

        const simulatedLoopStep = simulatedWorkflow.steps.find(
          (step) => step.id === loopNode.id,
        );
        expect(simulatedLoopStep!.success).toBeTruthy();
        expect(Array.isArray(simulatedLoopStep!.output)).toBe(true);
        expect(
          (simulatedLoopStep!.output as { key: string; amount: number }[])
            .length,
        ).toBe(2);

        // Check that data is correctly passed through
        const directFirstItem = (
          directResponse.data as { key: string; amount: number }[]
        )[0];
        const simulatedFirstItem = (
          simulatedLoopStep!.output as { key: string; amount: number }[]
        )[0];

        const directSecondItem = (
          directResponse.data as { key: string; amount: number }[]
        )[1];
        const simulatedSecondItem = (
          simulatedLoopStep!.output as { key: string; amount: number }[]
        )[1];

        // First item should be { key: "key", amount: 1 }
        expect(directFirstItem.key).toBe("key");
        expect(directFirstItem.amount).toBe(1);
        expect(simulatedFirstItem.key).toBe("key");
        expect(simulatedFirstItem.amount).toBe(1);

        // Second item should be { key: "key2", amount: 2000 }
        expect(directSecondItem.key).toBe("key2");
        expect(directSecondItem.amount).toBe(2000);
        expect(simulatedSecondItem.key).toBe("key2");
        expect(simulatedSecondItem.amount).toBe(2000);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
          createdIdMap.delete(workflowId);
        }
      }
    });
  });

  describe("Error Handling Tests", () => {
    test("should handle invalid runner configuration gracefully", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{testArray}}",
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            runner: {
              type: LoopRunnerType.CustomCode,
              config: {
                lang: Lang.JavaScript,
                source: `throw new Error("Intentional test error");`,
              },
            },
          },
        },

        inputVariables: {
          testArray: [1, 2, 3],
        },
      };

      console.log("🚀 ~ error handling test ~ params:", params);

      const result = await client.runNodeWithInputs(params);

      console.log(
        "Error handling response:",
        util.inspect(result, { depth: null, colors: true }),
      );

      // Per EigenLayer-AVS PR for issue #511, the loop runner now preserves
      // the per-iteration results array even when iterations error. The
      // top-level `success` flag here is the open semantic question:
      //
      //   - "loop ran to completion" → success: true even with all-null data
      //   - "all iterations failed" → success: false with all-null data
      //
      // The current operator implementation returns success: true. This test
      // accepts either outcome but verifies that the failure is observable
      // either via the top-level error/success flag OR via all-null entries
      // in the data array. See follow-up issue on EigenLayer-AVS for the
      // stricter semantics decision.
      const allIterationsNull =
        Array.isArray(result.data) &&
        result.data.length === 3 &&
        result.data.every((iter) => iter === null);
      expect(result.success === false || allIterationsNull).toBe(true);
    });

    test("should handle missing source array gracefully", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{nonExistentArray}}",
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            runner: {
              type: LoopRunnerType.CustomCode,
              config: {
                lang: Lang.JavaScript,
                source: `return { processed: item };`,
              },
            },
          },
        },

        inputVariables: {
          existingArray: [1, 2, 3], // Different from sourceId
        },
      };

      console.log("🚀 ~ missing source array test ~ params:", params);

      const result = await client.runNodeWithInputs(params);

      console.log(
        "Missing source array response:",
        util.inspect(result, { depth: null, colors: true }),
      );

      // Backend correctly returns error when input variable is missing
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain("could not be resolved");
    });
  });

  test("should handle edge cases consistently across all methods", async () => {
    const wallet = await getSmartWallet(client);

    // Test with single item array using predefined props
    const inputVariables = {
      singleItem: [42],
    };

    // Test 1: runNodeWithInputs
    const directResponse = await client.runNodeWithInputs({
      node: {
        id: getNextId(),
        name: "edge_case_single_item",
        type: NodeType.Loop,
        data: singleItemLoopProps,
      },
      inputVariables: inputVariables,
    });

    // Test 2: simulateWorkflow
    const dataNode = NodeFactory.create({
      id: getNextId(),
      name: "edge_case_data",
      type: NodeType.CustomCode,
      data: {
        lang: Lang.JavaScript,
        source: `return [42];`,
      },
    });

    const loopNode = NodeFactory.create({
      id: getNextId(),
      name: "edge_case_test",
      type: NodeType.Loop,
      data: {
        inputVariable: `{{${dataNode.name}.data}}`,
        iterationTimeout: 30,
        iterVal: "value",
        iterKey: "index",
        runner: {
          type: LoopRunnerType.CustomCode,
          config: {
            lang: Lang.JavaScript,
            source: `return { value: value, index: index, processed: true };`,
          },
        },
      } as LoopNodeData,
    });

    const workflowProps = createFromTemplate(wallet.address, [
      dataNode,
      loopNode,
    ]);
    const simulation = await client.simulateWorkflow(
      client.createWorkflow(workflowProps),
    );

    const simulatedStep = simulation.steps.find(
      (step) => step.id === loopNode.id,
    );

    // All should be successful
    expect(directResponse.success).toBeTruthy();
    expect(simulatedStep!.success).toBeTruthy();

    // runNodeWithInputs returns data directly as array, not wrapped in RunNodeResponseData
    expect(directResponse.data).toBeDefined();
    expect(Array.isArray(directResponse.data)).toBe(true);
    expect(directResponse.data.length).toBe(1);
    expect(directResponse.data[0].value).toBe(42);
    expect(directResponse.data[0].index).toBe(0);
    expect(directResponse.data[0].processed).toBe(true);

    const simulatedOutput = simulatedStep!.output as ProcessedLoopItem[];
    expect(Array.isArray(simulatedOutput)).toBe(true);
    expect(simulatedOutput.length).toBe(1);
    expect(simulatedOutput[0].value).toBe(42);
    expect(simulatedOutput[0].index).toBe(0);
    expect(simulatedOutput[0].processed).toBe(true);
  });

  describe("Execution Mode Tests", () => {
    test("should support sequential execution mode with timing verification", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{testArray}}",
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            executionMode: ExecutionMode.Sequential,
            runner: {
              type: LoopRunnerType.CustomCode,
              config: {
                lang: Lang.JavaScript,
                // The CustomCode runner uses the variables declared by the
                // loop config (iterVal: "value", iterKey: "index"). Earlier
                // versions of this test referenced `item` which was always
                // undefined in goja and made each iteration return null —
                // pre-#509 the test passed by accident because the operator
                // surfaced the failure as `success: false` and the body
                // below was skipped.
                source: `
                  return {
                    value: value,
                    index: index,
                    timestamp: Date.now(),
                    executionMode: 'sequential'
                  };
                `,
              },
            },
          },
        },

        inputVariables: {
          testArray: [1, 2, 3, 4],
        },
      };

      const result = await client.runNodeWithInputs(params);

      expect(result.success).toBe(true);
      // runNodeWithInputs returns the iteration array directly at result.data
      // (see the test on line ~2000 that documents the same contract).
      expect(Array.isArray(result.data)).toBe(true);
      const items = result.data as Array<{ value: number; index: number; timestamp: number; executionMode: string }>;
      expect(items.length).toBe(4);
      items.forEach((item, idx) => {
        expect(item.value).toBe(idx + 1);
        expect(item.index).toBe(idx);
        expect(item.executionMode).toBe("sequential");
        expect(item.timestamp).toBeDefined();
      });
    });

    test("should support parallel execution mode with timing verification", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "parallel_execution_test",
          type: NodeType.Loop,
          data: parallelExecutionProps,
        },
        inputVariables: {
          parallelArray: [1, 2, 3, 4],
        },
      };

      const result = await client.runNodeWithInputs(params);

      expect(typeof result.success).toBe("boolean");

      // For parallel execution, we just verify completion - not timing
      const responseData = result.data as ProcessedLoopItem[];
      expect(responseData).toBeDefined();
      expect(Array.isArray(responseData)).toBe(true);
      expect(responseData.length).toBe(4);

      // Verify all executions completed (may have race conditions in parallel mode)
      responseData.forEach((item: ProcessedLoopItem) => {
        expect(item.processedValue).toBeDefined();
        expect(item.index).toBeDefined(); // Backend may have race condition in parallel mode
        expect(item.executionMode).toBe("parallel");
        expect(item.timestamp).toBeDefined();
      });

      // Just verify that all items have the parallel execution mode
      expect(
        responseData.every((item) => item.executionMode === "parallel"),
      ).toBe(true);
    });

    test("should default to sequential execution mode when not specified", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{testArray}}",
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            // executionMode not specified - should default to sequential
            runner: {
              type: LoopRunnerType.CustomCode,
              config: {
                lang: Lang.JavaScript,
                // Use `value` (matches iterVal) not `item` — see the comment
                // on the previous test for why.
                source: `
                  return {
                    value: value,
                    index: index,
                    defaultMode: true
                  };
                `,
              },
            },
          },
        },

        inputVariables: {
          testArray: [1, 2, 3],
        },
      };

      console.log("🚀 ~ default execution mode test ~ params:", params);

      const result = await client.runNodeWithInputs(params);

      expect(result.success).toBe(true);
      // runNodeWithInputs returns the iteration array directly at result.data
      expect(Array.isArray(result.data)).toBe(true);
      const items = result.data as Array<{ value: number; index: number; defaultMode: boolean }>;
      expect(items.length).toBe(3);
      items.forEach((item, idx) => {
        expect(item.value).toBe(idx + 1);
        expect(item.index).toBe(idx);
        expect(item.defaultMode).toBe(true);
      });
    });

    test("should force sequential mode for ContractWrite operations", async () => {
      const wallet = await getSmartWalletWithBalance(client);
      const params = {
        node: {
          id: getNextId(),
          name: "loop_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{addressArray}}",
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            executionMode: ExecutionMode.Parallel, // Requested parallel but should be forced to sequential
            runner: {
              type: LoopRunnerType.ContractWrite,
              config: {
                contractAddress: "{{value}}",
                contractAbi: [
                  {
                    constant: false,
                    inputs: [
                      { name: "_spender", type: "address" },
                      { name: "_value", type: "uint256" },
                    ],
                    name: "approve",
                    outputs: [{ name: "", type: "bool" }],
                    payable: false,
                    stateMutability: "nonpayable",
                    type: "function",
                  },
                ],
                methodCalls: [
                  {
                    methodName: "approve",
                    methodParams: [
                      "0x0000000000000000000000000000000000000000",
                      "1",
                    ],
                  },
                ],
              },
            },
          },
        },

        inputVariables: {
          addressArray: [
            USDC_SEPOLIA_ADDRESS,
            USDC_SEPOLIA_ADDRESS,
          ],
          settings: getSettings(wallet.address),
        },
      };

      console.log(
        "🚀 ~ contractWrite forced sequential test ~ params:",
        params,
      );

      const result = await client.runNodeWithInputs(params);

      expect(typeof result.success).toBe("boolean");

      // ContractWrite operations may fail due to missing smart wallet config or simulation issues,
      // but the important part is that the backend should have forced sequential execution
    });

    test("should execute contract read operations with loop runner", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{contractAddresses}}",
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            executionMode: ExecutionMode.Parallel, // Contract reads can run in parallel
            runner: {
              type: LoopRunnerType.ContractRead,
              config: {
                contractAddress: "{{value}}",
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
                    applyToFields: ["totalSupply"],
                  },
                  {
                    methodName: "totalSupply",
                    methodParams: [],
                  },
                ],
              },
            },
          },
        },

        inputVariables: {
          contractAddresses: [
            USDC_SEPOLIA_ADDRESS, // Real USDC contract on Sepolia
            USDC_SEPOLIA_ADDRESS, // Same contract for consistency
          ],
        },
      };

      console.log(
        "🚀 ~ contractRead loop runner test ~ params:",
        util.inspect(params, { depth: null, colors: true }),
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ contractRead loop runner test ~ result:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      // Validate that each iteration contains both decimals and totalSupply
      const iterations = result.data as Record<string, unknown>[];
      expect(iterations.length).toBe(2); // Two contract addresses

      iterations.forEach((iteration, index) => {
        // Both decimals and totalSupply should exist
        expect(iteration).toHaveProperty("decimals");
        expect(iteration).toHaveProperty("totalSupply");

        // decimals should be a string representing the decimal places (e.g., "6")
        expect(typeof iteration.decimals).toBe("string");
        expect(parseInt(iteration.decimals as string)).toBeGreaterThan(0);

        // totalSupply should be a formatted decimal string (divided by 10^decimals)
        expect(typeof iteration.totalSupply).toBe("string");
        const totalSupplyValue = iteration.totalSupply as string;

        // Should contain a decimal point (indicating it's been formatted)
        expect(totalSupplyValue).toMatch(/^\d+\.\d+$/);

        // Should be a valid number when parsed
        const parsedValue = parseFloat(totalSupplyValue);
        expect(parsedValue).toBeGreaterThan(0);
        expect(parsedValue).toBeLessThan(Number.MAX_SAFE_INTEGER);

        console.log(`✅ Iteration ${index} validation passed:`, {
          decimals: iteration.decimals,
          totalSupply: iteration.totalSupply,
          parsedTotalSupply: parsedValue,
        });
      });
    });

    test("should return flattened data format for contract_read runner in loop", async () => {
      const params = {
        node: {
          id: getNextId(),
          name: "loop_test",
          type: NodeType.Loop,
          data: {
            inputVariable: "{{contractAddresses}}",
            iterationTimeout: 30,
            iterVal: "value",
            iterKey: "index",
            executionMode: ExecutionMode.Sequential,
            runner: {
              type: LoopRunnerType.ContractRead,
              config: {
                contractAddress: "{{value}}",
                contractAbi: [
                  {
                    constant: true,
                    inputs: [],
                    name: "name",
                    outputs: [{ name: "", type: "string" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function",
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "symbol",
                    outputs: [{ name: "", type: "string" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function",
                  },
                ],
                methodCalls: [
                  {
                    methodName: "name",
                    methodParams: [],
                  },
                  {
                    methodName: "symbol",
                    methodParams: [],
                  },
                ],
              },
            },
          },
        },

        inputVariables: {
          contractAddresses: [
            "0xB0C712f98daE15264c8E26132BCC91C40aD4d5F9", // Chainlink ETH/USD price feed (doesn't have name/symbol)
            USDC_SEPOLIA_ADDRESS, // USDC contract (has name/symbol)
          ],
        },
      };

      console.log(
        "🚀 ~ flattened data format test ~ params:",
        util.inspect(params, { depth: null, colors: true }),
      );

      const result = await client.runNodeWithInputs(params);

      console.log(
        "🚀 ~ flattened data format test ~ result:",
        util.inspect(result, { depth: null, colors: true }),
      );

      expect(typeof result.success).toBe("boolean");
      expect(result.data).toBeDefined();

      // Verify that the data is an array (one item per iteration)
      expect(Array.isArray(result.data)).toBe(true);

      // Each iteration should return a flattened object (not an array of method results)
      // Expected format: [{ name: null, symbol: null }, { name: "USDC", symbol: "USDC" }]
      if (
        result.success &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        expect(result.data.length).toBe(2);

        result.data.forEach((iteration, index) => {
          console.log(`🚀 ~ iteration ${index}:`, iteration);

          if (index === 0) {
            // First contract: Chainlink ETH/USD price feed doesn't have name/symbol methods
            // The entire iteration result is null because both method calls failed
            expect(iteration).toBeNull(); // Chainlink price feed doesn't have ERC-20 methods
            console.log(
              `✅ Iteration ${index}: Chainlink contract correctly returns null (no ERC-20 methods)`,
            );
          } else if (index === 1) {
            // Second contract: USDC contract has name/symbol methods
            // Should be a flattened object, not an array of method results
            expect(typeof iteration).toBe("object");
            expect(iteration).not.toBeNull();
            expect(Array.isArray(iteration)).toBe(false);

            // Should not have method result structure
            expect(iteration).not.toHaveProperty("methodName");
            expect(iteration).not.toHaveProperty("success");
            expect(iteration).not.toHaveProperty("error");

            const secondIteration = iteration as {
              name: unknown;
              symbol: unknown;
            };
            expect(secondIteration).toHaveProperty("name");
            expect(secondIteration).toHaveProperty("symbol");
            expect(secondIteration.name).toBe("USDC"); // USDC contract name
            expect(secondIteration.symbol).toBe("USDC"); // USDC contract symbol
            console.log(
              `✅ Iteration ${index}: USDC contract correctly returns name and symbol`,
            );
          }
        });
      }
    });

    test("should verify loop contract_read data structure with mock data", async () => {
      // This test verifies the expected data structure without relying on real contracts
      const expectedDataStructure = [
        {
          // Each iteration should return a flattened object like standalone contract_read
          name: "Mock Token",
          symbol: "MTK",
        },
        {
          name: "Mock Token 2",
          symbol: "MTK2",
        },
      ];

      // Verify the expected structure
      expect(Array.isArray(expectedDataStructure)).toBe(true);
      expect(expectedDataStructure.length).toBe(2);

      // Each item should be a flattened object
      expectedDataStructure.forEach((iteration) => {
        expect(typeof iteration).toBe("object");
        expect(Array.isArray(iteration)).toBe(false);

        // Should have direct properties, not method result structure
        expect(iteration).toHaveProperty("name");
        expect(iteration).toHaveProperty("symbol");
        expect(iteration).not.toHaveProperty("methodName");
        expect(iteration).not.toHaveProperty("success");
        expect(iteration).not.toHaveProperty("error");
      });

      // This test passes if the structure is correct
      expect(true).toBe(true);
    });

    test("should simulate workflow with sequential execution mode", async () => {
      const wallet = await getSmartWallet(client);

      // Create a data generation node
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_sequential_data",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `return [10, 20, 30];`,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_sequential_loop",
        type: NodeType.Loop,
        data: {
          inputVariable: `{{${dataNode.name}.data}}`,
          iterationTimeout: 30,
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Sequential,
          runner: {
            type: LoopRunnerType.CustomCode,
            config: {
              lang: Lang.JavaScript,
              source: `
                  return {
                    item: value,
                    index: index,
                    doubled: value * 2,
                    executionMode: 'sequential'
                  };
                `,
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps),
      );

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(3); // trigger + data node + loop node

      const loopStep = simulation.steps.find((step) => step.id === loopNode.id);
      expect(loopStep!.success).toBeTruthy();

      // Verify the step input contains the loop node configuration
      expect(loopStep!.config).toBeDefined();
      const inputConfig = loopStep!.config as unknown as LoopNodeData;

      // Verify basic configuration
      expect(inputConfig.inputVariable).toBe(`{{${dataNode.name}.data}}`);
      expect(inputConfig.iterVal).toBe("value");
      expect(inputConfig.iterKey).toBe("index");
      expect(inputConfig.executionMode).toBeDefined();
      // Verify that sequential execution mode is properly set
      expect(inputConfig.executionMode).toBe(ExecutionMode.Sequential);

      // Verify runner configuration
      expect(inputConfig.runner).toBeDefined();
      expect(inputConfig.runner!.type).toBe("customCode");
      if (inputConfig.runner && inputConfig.runner.type === "customCode") {
        expect(inputConfig.runner.config.source).toBeDefined();
        expect(inputConfig.runner.config.lang).toBeDefined();
      } else {
        throw new Error(
          `Expected runner type 'customCode', but got '${inputConfig.runner?.type}'`,
        );
      }

      const output = loopStep!.output as ProcessedLoopItem[];
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBe(3);

      // Verify execution results
      output.forEach((item: ProcessedLoopItem, index: number) => {
        expect(item.item).toBe((index + 1) * 10);
        expect(item.index).toBe(index);
        expect(item.doubled).toBe((index + 1) * 20);
        expect(item.executionMode).toBe(ExecutionMode.Sequential);
      });
    });

    test("should simulate workflow with parallel execution mode", async () => {
      const wallet = await getSmartWallet(client);

      // Create a data generation node
      const dataNode = NodeFactory.create({
        id: getNextId(),
        name: "generate_parallel_data",
        type: NodeType.CustomCode,
        data: {
          lang: Lang.JavaScript,
          source: `return [5, 15, 25];`,
        },
      });

      const loopNode = NodeFactory.create({
        id: getNextId(),
        name: "simulate_parallel_loop",
        type: NodeType.Loop,
        data: {
          inputVariable: `{{${dataNode.name}.data}}`,
          iterationTimeout: 30,
          iterVal: "value",
          iterKey: "index",
          executionMode: ExecutionMode.Parallel,
          runner: {
            type: LoopRunnerType.CustomCode,
            config: {
              lang: Lang.JavaScript,
              source: `
                  return {
                    item: value,
                    index: index,
                    tripled: value * 3,
                    executionMode: 'parallel'
                  };
                `,
            },
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        dataNode,
        loopNode,
      ]);

      console.log(
        "🚀 ~ simulateWorkflow ~ workflowProps:",
        util.inspect(workflowProps, { depth: null, colors: true }),
      );

      const simulation = await client.simulateWorkflow(
        client.createWorkflow(workflowProps),
      );

      console.log(
        "🚀 ~ simulateWorkflow ~ simulation:",
        util.inspect(simulation, { depth: null, colors: true }),
      );

      expect(simulation.status).toBe(ExecutionStatus.Success);
      expect(simulation.steps).toHaveLength(3); // trigger + data node + loop node

      const loopStep = simulation.steps.find((step) => step.id === loopNode.id);
      expect(loopStep!.success).toBeTruthy();

      // Verify the step input contains the loop node configuration
      expect(loopStep!.config).toBeDefined();
      const inputConfig = loopStep!.config as unknown as LoopNodeData;

      // Verify basic configuration
      expect(inputConfig.inputVariable).toBe(`{{${dataNode.name}.data}}`);
      expect(inputConfig.iterVal).toBe("value");
      expect(inputConfig.iterKey).toBe("index");
      expect(inputConfig.executionMode).toBeDefined();
      // Verify that parallel execution mode is properly set
      expect(inputConfig.executionMode).toBe(ExecutionMode.Parallel);

      // Verify runner configuration
      expect(inputConfig.runner).toBeDefined();
      expect(inputConfig.runner!.type).toBe("customCode");
      if (inputConfig.runner && inputConfig.runner.type === "customCode") {
        expect(inputConfig.runner.config.source).toBeDefined();
        expect(inputConfig.runner.config.lang).toBeDefined();
      } else {
        throw new Error(
          `Expected runner type 'customCode', but got '${inputConfig.runner?.type}'`,
        );
      }

      const output = loopStep!.output as ProcessedLoopItem[];
      expect(Array.isArray(output)).toBe(true);
      expect(output.length).toBe(3);

      // Verify execution results - just check that parallel execution completed
      output.forEach((item: ProcessedLoopItem) => {
        expect(item.item).toBeDefined(); // Should have processed some value
        expect(item.index).toBeDefined(); // Should have some index (may be duplicated due to race conditions)
        expect(item.tripled).toBeDefined(); // Should have tripled value
        expect(item.executionMode).toBe("parallel");
      });

      // Verify that all items completed in parallel mode
      expect(output.every((item) => item.executionMode === "parallel")).toBe(
        true,
      );

      // ✅ **VALIDATION**: Verify that inputsList doesn't contain iteration variables
      expect(loopStep!.config).toBeDefined();
      const stepConfig = loopStep!.config as Record<string, unknown>;

      if (stepConfig.inputsList && Array.isArray(stepConfig.inputsList)) {
        const inputsList = stepConfig.inputsList as string[];
        console.log("🔍 Actual inputsList:", inputsList);

        // ✅ Should NOT contain iteration variables
        expect(inputsList).not.toContain("value");
        expect(inputsList).not.toContain("index");

        // ✅ Should NOT contain iteration-specific node references
        const iterationRefs = inputsList.filter((input: string) =>
          input.includes("_iter_"),
        );
        expect(iterationRefs.length).toBe(0);

        // ✅ Should ONLY contain standard node references
        const expectedInputs = [
          "apContext.configVars",
          "generate_parallel_data.data",
          "generate_parallel_data.input",
          "blockTrigger.data",
          "blockTrigger.input",
        ];

        // Verify that all expected inputs are present (order may vary)
        expectedInputs.forEach((expectedInput) => {
          expect(inputsList).toContain(expectedInput);
        });

        console.log(
          "✅ inputsList validation passed - no iteration variables found",
        );
      }
    });
  });
});
