import * as _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import Client, {
  Edge,
  Workflow,
  NodeFactory,
  TriggerFactory,
  TriggerType,
  WorkflowStatus,
  BranchNodeData,
} from "@/sdk-js/dist";
import { NodeType } from "@/types/dist";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  removeCreatedWorkflows,
  compareResults,
  getNextId,
  submitWorkflowAndQueueForRemoval,
  queueForRemoval,
} from "./utils";

import {
  WorkflowTemplate,
  NodesTemplate,
  EdgesTemplate,
  MultiNodeWithBranch,
  FACTORY_ADDRESS,
  defaultTriggerId,
  blockTriggerEvery5,
  restApiNodeProps,
  filterNodeProps,
} from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Set timeout to 15 seconds for all tests in this file
jest.setTimeout(15000);

// Get environment variables with type safety
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows and isDeleting status tracking of those that need to be cleaned up after the test
const createdIdMap: Map<string, boolean> = new Map();

describe("createWorkflow Tests", () => {
  let eoaAddress: string;
  let client: Client;
  beforeAll(async () => {
    eoaAddress = await getAddress(TEST_PRIVATE_KEY);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
      factoryAddress: FACTORY_ADDRESS,
    });

    const signature = await generateSignature(TEST_PRIVATE_KEY);
    const res = await client.authWithSignature(signature);

    client.setAuthKey(res.authKey);
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  test("should create a task when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: "0" });

    const workflow = client.createWorkflow({
      smartWalletAddress: wallet.address,
      nodes: NodeFactory.createNodes(NodesTemplate),
      edges: _.map(EdgesTemplate, (edge) => new Edge(edge)),
      trigger: TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      }),
      startAt: WorkflowTemplate.startAt,
      expiredAt: WorkflowTemplate.expiredAt,
      maxExecution: 1,
    });

    expect(workflow).toBeDefined();
    expect(workflow).toBeInstanceOf(Workflow);

    const result = await submitWorkflowAndQueueForRemoval(
      client,
      workflow,
      createdIdMap
    );

    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });

  test("should throw error when creating a task with owner address using signature", async () => {
    await expect(
      client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: eoaAddress,
        })
      )
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);
  });

  test("create cron trigger", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const workflowData = {
      ...WorkflowTemplate,
      smartWalletAddress: wallet.address,
      trigger: TriggerFactory.create({
        id: defaultTriggerId,
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: { scheduleList: ["5 4 * * *", "5 0 * 8 *"] },
      }),
    };

    const result = await submitWorkflowAndQueueForRemoval(
      client,
      workflowData,
      createdIdMap
    );

    const getResult = await client.getWorkflow(result);

    compareResults(
      { ...workflowData, id: result, owner: eoaAddress },
      getResult
    );
  });

  test("create fixed time trigger", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const workflowData = {
      ...WorkflowTemplate,
      smartWalletAddress: wallet.address,
      trigger: TriggerFactory.create({
        id: defaultTriggerId,
        name: "fixedTimeTrigger",
        type: TriggerType.FixedTime,
        data: { epochsList: [10, 20, 30] },
      }),
    };

    const result = await submitWorkflowAndQueueForRemoval(
      client,
      workflowData,
      createdIdMap
    );

    const task = await client.getWorkflow(result);
    compareResults({ ...workflowData, id: result, owner: eoaAddress }, task);
  });

  test("create event trigger", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const branchNode = NodeFactory.create({
      name: "branchCheckTokenAmount",
      type: NodeType.Branch,
      id: getNextId(),
      data: {
        conditionsList: [
          {
            id: getNextId(),
            type: "if",
            expression: `
                   // usdc
                   ( trigger1.data.address == "0x1c7d4b196cb0c7b01d743fbc6116a902379c7238" &&
                     bigGt(
                       toBigInt(trigger1.data.value),
                       toBigInt("2000000")
                     )
                   ) ||
                   ( trigger1.data.address == lower("0x779877a7b0d9e8603169ddbd7836e478b4624789") &&
                     bigGt(
                       // link token
                       chainlinkPrice("0xc59E3633BAAC79493d908e63626716e204A45EdF"),
                       toBigInt("5000000")
                     )
                   )
                `,
          },
        ],
      },
    });

    const restApiNode = NodeFactory.create({
      name: "notification",
      type: NodeType.RestAPI,
      id: getNextId(),
      data: {
        url: "https://api.telegram.org/bot{{notify_bot_token}}/sendMessage?parse_mode=MarkdownV2",
        method: "POST",
        headersMap: [["content-type", "application/json"]],
        body: `JSON.stringify({
              chat_id: -4609037622,
              text: \`
                Congrat, your wallet 
                [\${trigger1.data.to_address}](https://sepolia.etherscan.io/address/\${trigger1.data.to_address}) 
                received \\\`\${trigger1.data.value_formatted}\\\` 
                [\${trigger1.data.token_symbol}](https://sepolia.etherscan.io/token/\${trigger1.data.address}) 
                at [\${trigger1.data.transaction_hash}](https://sepolia.etherscan.io/tx/\${trigger1.data.transaction_hash})
              \`
            })`,
      },
    });

    const workflowData = {
      ...WorkflowTemplate,
      smartWalletAddress: wallet.address,
      nodes: [branchNode, restApiNode],
      edges: [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: branchNode.id,
        }),
        new Edge({
          id: getNextId(),
          source: `${branchNode.id}.${
            (branchNode.data as BranchNodeData).conditionsList[0].id
          }`,
          target: restApiNode.id,
        }),
      ],
      trigger: TriggerFactory.create({
        id: defaultTriggerId,
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          expression: `
              trigger1.data.topics[0] == 
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" 
              && trigger1.data.topics[2] == "${wallet.address}"
            `,
          // We don't need but the compare result look at its as a whole
          matcherList: [],
        },
      }),
    };

    const result = await submitWorkflowAndQueueForRemoval(
      client,
      workflowData,
      createdIdMap
    );

    const task = await client.getWorkflow(result);

    compareResults(
      {
        ...workflowData,
        smartWalletAddress: wallet.address,
        status: WorkflowStatus.Active,
        id: result,
        owner: eoaAddress,
      },
      task
    );
  });

  test("create event trigger with topic matching", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const restApiNode = NodeFactory.create({
      name: "notification",
      type: NodeType.RestAPI,
      id: getNextId(),
      data: {
        url: "https://httpbin.org/get",
        method: "GET",
        headersMap: [["content-type", "application/json"]],
        body: `helloworld`,
      },
    });

    const workflowData = {
      ...WorkflowTemplate,
      smartWalletAddress: wallet.address,
      nodes: [restApiNode],
      edges: [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: restApiNode.id,
        }),
      ],
      trigger: TriggerFactory.create({
        id: defaultTriggerId,
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          expression: "// TODO: expression cannot be empty",
          matcherList: [
            {
              type: "topics",
              valueList: [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "",
                "0x06DBb141d8275d9eDb8a7446F037D20E215188ff",
              ],
            },
          ],
        },
      }),
    };

    const createResult = await submitWorkflowAndQueueForRemoval(
      client,
      workflowData,
      createdIdMap
    );

    const getResult = await client.getWorkflow(createResult);
    compareResults(
      {
        ...workflowData,
        smartWalletAddress: wallet.address,
        status: WorkflowStatus.Active,
        id: createResult,
        owner: eoaAddress,
      },
      getResult
    );
  });

  test("create block trigger", async () => {
    const wallet = await client.getWallet({ salt: "0" });

    const workflowData = {
      ...WorkflowTemplate,
      smartWalletAddress: wallet.address,
      trigger: TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 102 },
      }),
    };

    const result = await submitWorkflowAndQueueForRemoval(
      client,
      workflowData,
      createdIdMap
    );

    const task = await client.getWorkflow(result);
    compareResults(
      {
        id: result,
        owner: eoaAddress,
        ...workflowData,
      },
      task
    );
  });

  test("create complex task with multi nodes and edge", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const workflowData = {
      ...MultiNodeWithBranch,
      smartWalletAddress: wallet.address,
    };

    const result = await submitWorkflowAndQueueForRemoval(
      client,
      workflowData,
      createdIdMap
    );

    const task = await client.getWorkflow(result);

    compareResults(
      {
        ...MultiNodeWithBranch,
        smartWalletAddress: wallet.address,
        status: WorkflowStatus.Active,
        id: result,
        owner: eoaAddress,
      },
      task
    );
  });

  test("create filter node task", async () => {
    const wallet = await client.getWallet({ salt: "0" });

    const workflowData = {
      smartWalletAddress: wallet.address,
      nodes: NodeFactory.createNodes([restApiNodeProps, filterNodeProps]),
      edges: [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: restApiNodeProps.id,
        }),
      ],
      trigger: blockTriggerEvery5,
      startAt: WorkflowTemplate.startAt,
      expiredAt: WorkflowTemplate.expiredAt,
      maxExecution: 1,
    };

    const result = await submitWorkflowAndQueueForRemoval(
      client,
      workflowData,
      createdIdMap
    );

    const task = await client.getWorkflow(result);

    compareResults(
      {
        smartWalletAddress: wallet.address,
        status: WorkflowStatus.Active,
        id: result,
        owner: eoaAddress,
        nodes: NodeFactory.createNodes([restApiNodeProps, filterNodeProps]),
        edges: [
          new Edge({
            id: getNextId(),
            source: defaultTriggerId,
            target: restApiNodeProps.id,
          }),
        ],
        trigger: blockTriggerEvery5,
        startAt: WorkflowTemplate.startAt,
        expiredAt: WorkflowTemplate.expiredAt,
        maxExecution: 1,
      },
      task
    );
  });

  // TODO: add detailed verification for each node in the workflow
  // expect(task.nodes[0].contractWrite.contractAddress).toEqual(
  //   WorkflowTemplate.nodes[0].contractWrite.contractAddress
  // );
  // expect(task.nodes[0].contractWrite.callData).toEqual(
  //   WorkflowTemplate.nodes[0].contractWrite.callData
  // );

  // expect(task.nodes[5].branch.conditions).toHaveLength(3);
  // expect(task.nodes[5].branch.conditions[0].type).toEqual("if");
  // expect(task.nodes[5].branch.conditions[1].type).toEqual("if");
  // expect(task.nodes[5].branch.conditions[2].type).toEqual("else");

  // expect(task.edges).toHaveLength(6);
  // expect(task.edges[3].source).toEqual("t100.b1");
  // expect(task.edges[4].source).toEqual("t100.b2");

  // expect(task.trigger.type).toEqual(TriggerType.Block);
  // expect(task.trigger.data.interval).toEqual(5);
});
