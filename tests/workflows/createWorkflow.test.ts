import * as _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import {
  Client,
  Edge,
  Workflow,
  NodeFactory,
  TriggerFactory,
} from "@avaprotocol/sdk-js";
import { NodeType, WorkflowStatus, TriggerType } from "@avaprotocol/types";
import {
  compareResults,
  getNextId,
  TIMEOUT_DURATION,
  getSmartWallet,
  getClient,
  authenticateClient,
  getEOAAddress,
} from "../utils/utils";

import {
  createFromTemplate,
  MultiNodeWithBranch,
  defaultTriggerId,
} from "../utils/templates";

// Set timeout to 15 seconds for all tests in this file
jest.setTimeout(TIMEOUT_DURATION);

describe("createWorkflow Tests", () => {
  let eoaAddress: string;
  let client: Client;
  beforeAll(async () => {
    eoaAddress = await getEOAAddress();
    client = getClient();
    await authenticateClient(client);
  });

  test("should create a task when authenticated with signature", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 5 },
      });

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      expect(workflow).toBeInstanceOf(Workflow);
      expect(typeof workflowId).toBe("string");
    } finally {
      await client.deleteWorkflow(workflowId!);
    }
  });

  test("should throw error when creating a task with owner address using signature", async () => {
    await expect(
      client.submitWorkflow(
        client.createWorkflow(createFromTemplate(eoaAddress))
      )
    ).rejects.toThrowError(/invalid smart account address|INVALID_ARGUMENT/i);
  });

  test("create cron trigger", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "cronTrigger",
        type: TriggerType.Cron,
        data: { schedules: ["5 4 * * *", "5 0 * 8 *"] },
      });

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const getResult = await client.getWorkflow(workflowId);
      compareResults(
        { ...workflowProps, id: workflowId, owner: eoaAddress },
        getResult
      );
    } finally {
      await client.deleteWorkflow(workflowId!);
    }
  });

  test("create fixed time trigger", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "fixedTimeTrigger",
        type: TriggerType.FixedTime,
        data: { epochsList: [10, 20, 30] },
      });

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const task = await client.getWorkflow(workflowId);
      compareResults(
        { ...workflowProps, id: workflowId, owner: eoaAddress },
        task
      );
    } finally {
      await client.deleteWorkflow(workflowId!);
    }
  });

  test("create event trigger", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const branchNode = NodeFactory.create({
        name: "branchCheckTokenAmount",
        type: NodeType.Branch,
        id: getNextId(),
        data: {
          conditions: [
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
      } as any);

      const restApiNode = NodeFactory.create({
        name: "notification",
        type: NodeType.RestAPI,
        id: getNextId(),
        data: {
          config: {
            url: "https://mock-api.ap-aggregator.local/post",
            method: "POST",
            headersMap: [["content-type", "application/json"]],
            body: `JSON.stringify({
                chat_id: -4609037622,
                text: \`
                  Test Event Trigger: 
                  Address: \${trigger1.data.to_address || "Unknown"} 
                  Amount: \${trigger1.data.value_formatted || "0"} 
                  Token: \${trigger1.data.token_symbol || "UNKNOWN"}
                  Block: \${trigger1.data.block_number || "Unknown"}
                  Hash: \${trigger1.data.transaction_hash || "Unknown"}
                \`
              })`,
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [
        branchNode,
        restApiNode,
      ]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: [
                "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
                "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
              ], // WETH and USDC
              topics: [
                {
                  values: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", // Transfer event
                    "", // Any from address
                    wallet.address, // To specific wallet address
                  ],
                },
              ],
              maxEventsPerBlock: 100,
              contractAbi: [], // Backend now adds this field
            },
          ],
        },
      });

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const task = await client.getWorkflow(workflowId);
      compareResults(
        {
          ...workflowProps,
          status: WorkflowStatus.Active,
          id: workflowId,
          owner: eoaAddress,
        },
        task
      );
    } finally {
      expect(workflowId).toBeDefined();
      await client.deleteWorkflow(workflowId);
    }
  });

  test("create event trigger with topic matching", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const restApiNode = NodeFactory.create({
        name: "notification",
        type: NodeType.RestAPI,
        id: getNextId(),
        data: {
          config: {
            url: "https://mock-api.ap-aggregator.local/get",
            method: "GET",
            headersMap: [["content-type", "application/json"]],
            body: `helloworld`,
          },
        },
      });

      const workflowProps = createFromTemplate(wallet.address, [restApiNode]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "eventTrigger",
        type: TriggerType.Event,
        data: {
          queries: [
            {
              addresses: [
                "0xaa8e23fb1079ea71e0a56f48a2aa51851d8433d0",
                "0x3e622317f8c93f7328350cf0b56d9ed4c620c5d6",
              ], // USDT and DAI
              topics: [
                {
                  values: [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", // Transfer event
                    "", // Any from address
                    "0x06DBb141d8275d9eDb8a7446F037D20E215188ff", // To specific address
                  ],
                },
              ],
              maxEventsPerBlock: 100,
              contractAbi: [], // Backend now adds this field
            },
          ],
        },
      });

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const getResult = await client.getWorkflow(workflowId);
      compareResults(
        {
          ...workflowProps,
          status: WorkflowStatus.Active,
          id: workflowId,
          owner: eoaAddress,
        },
        getResult
      );
    } finally {
      expect(workflowId).toBeDefined();
      await client.deleteWorkflow(workflowId);
    }
  });

  test("create block trigger", async () => {
    const wallet = await getSmartWallet(client);
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: 102 },
      });

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const task = await client.getWorkflow(workflowId);
      compareResults(
        {
          id: workflowId,
          owner: eoaAddress,
          ...workflowProps,
        },
        task
      );
    } finally {
      expect(workflowId).toBeDefined();
      await client.deleteWorkflow(workflowId);
    }
  });

  test("create complex task with multi nodes and edge", async () => {
    const wallet = await getSmartWallet(client);

    const workflowData = {
      ...MultiNodeWithBranch,
      smartWalletAddress: wallet.address,
    };

    const workflow = await client.createWorkflow(workflowData);

    const workflowId = await client.submitWorkflow(workflow);

    const getResponse = await client.getWorkflow(workflowId);

    compareResults(
      {
        ...MultiNodeWithBranch,
        smartWalletAddress: wallet.address,
        status: WorkflowStatus.Active,
        id: workflowId,
        owner: eoaAddress,
      },
      getResponse
    );

    // Clean up
    await client.deleteWorkflow(workflowId);
  });
});
