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
import util from "util";
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

// Define EXPIRED_AT as a constant
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours from now

describe("createTask Tests", () => {
  let ownerAddress: string;
  let client: Client;
  beforeAll(async () => {
    ownerAddress = await getAddress(TEST_PRIVATE_KEY);
    console.log("Client endpoint:", ENDPOINT, "\nOwner address:", ownerAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
    });
  });

  describe("Auth with Signature", () => {
    let smartWalletAddress: string;
    let authKey: string;

    beforeAll(async () => {
      console.log("Authenticating with signature ...");
      const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);
      const res = await client.authWithSignature(
        ownerAddress,
        signature,
        EXPIRED_AT
      );
      authKey = res.authKey;

      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const result = await client.getWallets({ authKey });
      smartWalletAddress = result[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);
    });

    afterAll(
      async () =>
        await removeCreatedWorkflows(client, authKey, createdWorkflows)
    );

    test("should create a task when authenticated with signature", async () => {
      console.log("TriggerFactory.create.inputs:", {
        name: "blockTrigger",
        type: TriggerTypes.BLOCK,
        data: { interval: 5 },
      });

      const workflow = client.createWorkflow({
        smartWalletAddress,
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

      const result = await client.submitWorkflow(workflow, { authKey });
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
            smartWalletAddress: ownerAddress,
          }),
          { authKey }
        )
      ).rejects.toThrow("3 INVALID_ARGUMENT: invalid smart account address");
    });

    test("create cron trigger", async () => {
      const workflowData = {
        ...WorkflowTemplate,
        smartWalletAddress,
        trigger: TriggerFactory.create({
          name: "cronTrigger",
          type: TriggerTypes.CRON,
          data: { scheduleList: ["5 4 * * *", "5 0 * 8 *"] },
        }),
      };
      const submitResult = await client.submitWorkflow(
        client.createWorkflow(workflowData),
        { authKey }
      );

      queueForRemoval(createdWorkflows, submitResult);

      const getResult = await client.getWorkflow(submitResult, { authKey });

      compareResults(
        { ...workflowData, id: submitResult, owner: ownerAddress },
        getResult
      );
    });

    test("create fixed time trigger", async () => {
      const workflowData = {
        ...WorkflowTemplate,
        smartWalletAddress,
        trigger: TriggerFactory.create({
          name: "fixedTimeTrigger",
          type: TriggerTypes.FIXED_TIME,
          data: { epochsList: [10, 20, 30] },
        }),
      };

      const submitResult = await client.submitWorkflow(
        client.createWorkflow(workflowData),
        { authKey }
      );

      queueForRemoval(createdWorkflows, submitResult);

      const task = await client.getWorkflow(submitResult, { authKey });
      compareResults(
        { ...workflowData, id: submitResult, owner: ownerAddress },
        task
      );
    });

    test("create event trigger", async () => {
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
        smartWalletAddress,
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
              && trigger1.data.topics[2] == "${smartWalletAddress}"
            `,
          },
        }),
      };

      const submitResult = await client.submitWorkflow(
        client.createWorkflow(workflowData),
        { authKey }
      );

      queueForRemoval(createdWorkflows, submitResult);

      const task = await client.getWorkflow(submitResult, { authKey });

      compareResults(
        {
          ...workflowData,
          smartWalletAddress,
          status: WorkflowStatuses.ACTIVE,
          id: submitResult,
          owner: ownerAddress,
        },
        task
      );
    });

    test("create block trigger", async () => {
      const submitResult = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress,
          trigger: TriggerFactory.create({
            name: "blockTrigger",
            type: TriggerTypes.BLOCK,
            data: { interval: 102 },
          }),
        }),
        { authKey }
      );

      queueForRemoval(createdWorkflows, submitResult);

      const task = await client.getWorkflow(submitResult, { authKey });
      compareResults(
        {
          ...WorkflowTemplate,
          smartWalletAddress,
          status: WorkflowStatuses.ACTIVE,
          id: submitResult,
          owner: ownerAddress,
        },
        task
      );
    });

    test("create complex task with multi nodes and edge", async () => {
      const workflowData = {
        ...MultiNodeWithBranch,
        smartWalletAddress,
      };

      const submitResult = await client.submitWorkflow(
        client.createWorkflow(workflowData),
        { authKey }
      );

      queueForRemoval(createdWorkflows, submitResult);

      const task = await client.getWorkflow(submitResult, { authKey });
      console.log("getTask task", task);

      compareResults(
        {
          ...MultiNodeWithBranch,
          smartWalletAddress,
          status: WorkflowStatuses.ACTIVE,
          id: submitResult,
          owner: ownerAddress,
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

  describe("Auth with API key", () => {
    let authKey: string;
    let smartWalletAddress: string;

    beforeAll(async () => {
      console.log("Authenticating with API key ...");
      const res = await client.authWithAPIKey(
        ownerAddress,
        TEST_API_KEY,
        EXPIRED_AT
      );
      authKey = res.authKey;

      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const result = await client.getWallets({ authKey });
      smartWalletAddress = result[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);
    });

    afterAll(
      async () =>
        await removeCreatedWorkflows(client, authKey, createdWorkflows)
    );

    test("should create a task when authenticated with API key", async () => {
      const submitResult = await client.submitWorkflow(
        client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
        { authKey }
      );

      queueForRemoval(createdWorkflows, submitResult);

      console.log("Create task result:", submitResult);
      expect(submitResult).toBeDefined();
      expect(submitResult).toHaveLength(26);
    });

    test("should throw error when creating a task with owner address using API key", async () => {
      await expect(
        client.submitWorkflow(
          client.createWorkflow({
            ...WorkflowTemplate,
            smartWalletAddress: ownerAddress,
          }),
          { authKey }
        )
      ).rejects.toThrow("3 INVALID_ARGUMENT: invalid smart account addres");
    });
  });

  describe("Without authentication", () => {
    let smartWalletAddress: string;
    const emptyAuthKey: string = "";

    test("should throw error when creating a task without authentication", async () => {
      await expect(
        client.submitWorkflow(
          client.createWorkflow({ ...WorkflowTemplate, smartWalletAddress }),
          { authKey: emptyAuthKey }
        )
      ).rejects.toThrow("missing auth header");
    });
  });
});
