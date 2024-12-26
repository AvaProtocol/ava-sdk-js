import * as _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import Client, {
  Edge,
  Workflow,
  NodeFactory,
  TriggerFactory,
  TriggerTypes,
  WorkflowStatuses,
  NodeTypes,
  BranchNodeData,
} from "../dist";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  removeCreatedWorkflows,
  queueForRemoval,
  compareResults,
  getNextId,
} from "./utils";

import {
  WorkflowTemplate,
  NodesTemplate,
  EdgesTemplate,
  MultiNodeWithBranch,
  EXPIRED_AT,
  FACTORY_ADDRESS,
} from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_API_KEY, TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_API_KEY: requireEnvVar("TEST_API_KEY"),
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows and isDeleting status tracking of those that need to be cleaned up after the test
const createdWorkflows: Map<string, boolean> = new Map();

describe("createWorkflow Tests", () => {
  let eoaAddress: string;
  let client: Client;
  beforeAll(async () => {
    eoaAddress = await getAddress(TEST_PRIVATE_KEY);
    console.log("Client endpoint:", ENDPOINT, "\nOwner address:", eoaAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
      factoryAddress: FACTORY_ADDRESS,
    });

    console.log("Authenticating with signature ...");
    const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);
    const res = await client.authWithSignature(
      eoaAddress,
      signature,
      EXPIRED_AT
    );

    client.setAuthKey(res.authKey);
  });

  afterAll(async () => await removeCreatedWorkflows(client, createdWorkflows));

  test("should create a task when authenticated with signature", async () => {
    console.log("TriggerFactory.create.inputs:", {
      name: "blockTrigger",
      type: TriggerTypes.BLOCK,
      data: { interval: 5 },
    });

    const wallet = await client.getWallet({ salt: "0" });

    const workflow = client.createWorkflow({
      smartWalletAddress: wallet.address,
      nodes: NodeFactory.createNodes(NodesTemplate),
      edges: _.map(EdgesTemplate, (edge) => new Edge(edge)),
      trigger: TriggerFactory.create({
        name: "blockTrigger",
        type: TriggerTypes.BLOCK,
        data: { interval: 5 },
      }),
      startAt: WorkflowTemplate.startAt,
      expiredAt: WorkflowTemplate.expiredAt,
      maxExecution: 1,
    });
    console.log("Create workflow.workflow:", workflow);
    expect(workflow).toBeDefined();
    expect(workflow).toBeInstanceOf(Workflow);

    const result = await client.submitWorkflow(workflow);
    console.log("Create workflow.result:", result);

    queueForRemoval(createdWorkflows, result);

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
        name: "cronTrigger",
        type: TriggerTypes.CRON,
        data: { scheduleList: ["5 4 * * *", "5 0 * 8 *"] },
      }),
    };
    const submitResult = await client.submitWorkflow(
      client.createWorkflow(workflowData)
    );

    queueForRemoval(createdWorkflows, submitResult);

    const getResult = await client.getWorkflow(submitResult);

    compareResults(
      { ...workflowData, id: submitResult, owner: eoaAddress },
      getResult
    );
  });

  test("create fixed time trigger", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const workflowData = {
      ...WorkflowTemplate,
      smartWalletAddress: wallet.address,
      trigger: TriggerFactory.create({
        name: "fixedTimeTrigger",
        type: TriggerTypes.FIXED_TIME,
        data: { epochsList: [10, 20, 30] },
      }),
    };

    const submitResult = await client.submitWorkflow(
      client.createWorkflow(workflowData)
    );

    queueForRemoval(createdWorkflows, submitResult);

    const task = await client.getWorkflow(submitResult);
    compareResults(
      { ...workflowData, id: submitResult, owner: eoaAddress },
      task
    );
  });

  test("create event trigger", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const branchNode = NodeFactory.create({
      name: "branchCheckTokenAmount",
      type: NodeTypes.BRANCH,
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
      type: NodeTypes.REST_API,
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
          source: "__TRIGGER__",
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
        name: "eventTrigger",
        type: TriggerTypes.EVENT,
        data: {
          expression: `
              trigger1.data.topics[0] == 
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" 
              && trigger1.data.topics[2] == "${wallet.address}"
            `,
        },
      }),
    };

    const submitResult = await client.submitWorkflow(
      client.createWorkflow(workflowData)
    );

    queueForRemoval(createdWorkflows, submitResult);

    const task = await client.getWorkflow(submitResult);

    compareResults(
      {
        ...workflowData,
        smartWalletAddress: wallet.address,
        status: WorkflowStatuses.ACTIVE,
        id: submitResult,
        owner: eoaAddress,
      },
      task
    );
  });

  test("create block trigger", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const submitResult = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        smartWalletAddress: wallet.address,
        trigger: TriggerFactory.create({
          name: "blockTrigger",
          type: TriggerTypes.BLOCK,
          data: { interval: 102 },
        }),
      })
    );

    queueForRemoval(createdWorkflows, submitResult);

    const task = await client.getWorkflow(submitResult);
    compareResults(
      {
        ...WorkflowTemplate,
        smartWalletAddress: wallet.address,
        status: WorkflowStatuses.ACTIVE,
        id: submitResult,
        owner: eoaAddress,
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

    const submitResult = await client.submitWorkflow(
      client.createWorkflow(workflowData)
    );

    queueForRemoval(createdWorkflows, submitResult);

    const task = await client.getWorkflow(submitResult);
    console.log("getWorkflow task", task);

    compareResults(
      {
        ...MultiNodeWithBranch,
        smartWalletAddress: wallet.address,
        status: WorkflowStatuses.ACTIVE,
        id: submitResult,
        owner: eoaAddress,
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

  // expect(task.trigger.type).toEqual(TriggerTypes.BLOCK);
  // expect(task.trigger.data.interval).toEqual(5);
});