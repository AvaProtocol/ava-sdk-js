import * as avs_pb from "../grpc_codegen/avs_pb";
import { describe, beforeAll, test, expect } from "@jest/globals";
import Client from "../dist";
import dotenv from "dotenv";
import path from "path";
import { getAddress, generateSignature, requireEnvVar } from "./utils";

import { sampleTask1, sampleTask2 } from "./fixture";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const {
  TEST_API_KEY,
  TEST_PRIVATE_KEY,
  TOKEN_CONTRACT,
  ORACLE_CONTRACT,
  ENDPOINT,
} = {
  TEST_API_KEY: requireEnvVar("TEST_API_KEY"),
  TEST_PRIVATE_KEY: requireEnvVar('TEST_PRIVATE_KEY'),
  TOKEN_CONTRACT: requireEnvVar("TOKEN_CONTRACT"),
  ORACLE_CONTRACT: requireEnvVar("ORACLE_CONTRACT"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

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
      const result = await client.listSmartWallets({ authKey });
      smartWalletAddress = result[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);
    });

    test("should create a task when authenticated with signature", async () => {
      const result = await client.createTask(
        { ...sampleTask1, smartWalletAddress },
        { authKey }
      );
      console.log("Create task result:", result);
      expect(result).toBeDefined();
      expect(result).toHaveLength(26);
    });

    test("should throw error when creating a task with owner address using signature", async () => {
      await expect(client.createTask(
        { ...sampleTask1, smartWalletAddress: ownerAddress },
        { authKey }
      )).rejects.toThrow("3 INVALID_ARGUMENT: invalid smart account address");
    });

    test("create cron trigger", async () => {
      const result = await client.createTask(
        {
          ...sampleTask1,
          smartWalletAddress,
          // https://crontab.guru/ for syntax
          trigger: {
            cron: { schedule: ["5 4 * * *", "5 0 * 8 *"] },
          }
        },
        { authKey }
      );

      const task = await client.getTask(result, { authKey });
      expect(task.id).toEqual(result);
      expect(task.status).toEqual(avs_pb.TaskStatus.ACTIVE);
      expect(task.nodes).toHaveLength(1);
      expect(task.nodes[0].contractWrite.contractAddress).toEqual(sampleTask1.nodes[0].contractWrite.contractAddress);
      expect(task.nodes[0].contractWrite.callData).toEqual(sampleTask1.nodes[0].contractWrite.callData);

      expect(task.trigger.triggerType).toEqual(avs_pb.TaskTrigger.TriggerTypeCase.CRON);
      expect(task.trigger.cron.schedule[0]).toEqual("5 4 * * *");
      expect(task.trigger.cron.schedule[1]).toEqual("5 0 * 8 *");
    });

    test("create fixed time trigger", async () => {
      const result = await client.createTask(
        {
          ...sampleTask1,
          smartWalletAddress,
          // https://crontab.guru/ for syntax
          trigger: {
            fixedTime: { epochs: [10, 20, 30] },
          }
        },
        { authKey }
      );

      const task = await client.getTask(result, { authKey });
      expect(task.id).toEqual(result);
      expect(task.status).toEqual(avs_pb.TaskStatus.ACTIVE);
      expect(task.nodes).toHaveLength(1);
      expect(task.nodes[0].contractWrite.contractAddress).toEqual(sampleTask1.nodes[0].contractWrite.contractAddress);
      expect(task.nodes[0].contractWrite.callData).toEqual(sampleTask1.nodes[0].contractWrite.callData);

      expect(task.trigger.triggerType).toEqual(avs_pb.TaskTrigger.TriggerTypeCase.FIXED_TIME);
      expect(task.trigger.fixedTime.epochs).toEqual([10, 20, 30]);
    });

    test("create event trigger", async () => {
      const result = await client.createTask(
        {
          ...sampleTask1,
          smartWalletAddress,
          // https://crontab.guru/ for syntax
          trigger: {
            event: { expression: `topic0 == "0x123" && topic2 == "0xdef"` },
          }
        },
        { authKey }
      );

      const task = await client.getTask(result, { authKey });
      expect(task.id).toEqual(result);
      expect(task.status).toEqual(avs_pb.TaskStatus.ACTIVE);
      expect(task.nodes).toHaveLength(1);
      expect(task.nodes[0].contractWrite.contractAddress).toEqual(sampleTask1.nodes[0].contractWrite.contractAddress);
      expect(task.nodes[0].contractWrite.callData).toEqual(sampleTask1.nodes[0].contractWrite.callData);

      expect(task.trigger.triggerType).toEqual(avs_pb.TaskTrigger.TriggerTypeCase.EVENT);
      expect(task.trigger.event.expression).toEqual(`topic0 == "0x123" && topic2 == "0xdef"` );
    });

    test("create manual trigger", async () => {
      const result = await client.createTask(
        {
          ...sampleTask1,
          smartWalletAddress,
          // https://crontab.guru/ for syntax
          trigger: {
            manual: true,
          }
        },
        { authKey }
      );

      const task = await client.getTask(result, { authKey });
      expect(task.id).toEqual(result);
      expect(task.status).toEqual(avs_pb.TaskStatus.ACTIVE);
      expect(task.nodes).toHaveLength(1);
      expect(task.nodes[0].contractWrite.contractAddress).toEqual(sampleTask1.nodes[0].contractWrite.contractAddress);
      expect(task.nodes[0].contractWrite.callData).toEqual(sampleTask1.nodes[0].contractWrite.callData);

      expect(task.trigger.triggerType).toEqual(avs_pb.TaskTrigger.TriggerTypeCase.MANUAL);
      expect(task.trigger.manual).toBe(true);
    });

    test("create block trigger", async () => {
      const result = await client.createTask(
        {
          ...sampleTask1,
          smartWalletAddress,
          // https://crontab.guru/ for syntax
          trigger: {
            block: {
              interval: 102,
            }
          }
        },
        { authKey }
      );

      const task = await client.getTask(result, { authKey });
      expect(task.id).toEqual(result);
      expect(task.status).toEqual(avs_pb.TaskStatus.ACTIVE);
      expect(task.nodes).toHaveLength(1);
      expect(task.nodes[0].contractWrite.contractAddress).toEqual(sampleTask1.nodes[0].contractWrite.contractAddress);
      expect(task.nodes[0].contractWrite.callData).toEqual(sampleTask1.nodes[0].contractWrite.callData);

      expect(task.trigger.triggerType).toEqual(avs_pb.TaskTrigger.TriggerTypeCase.BLOCK);
      expect(task.trigger.block.interval).toEqual(102);
    });

    test("create complex task with multi nodes and edge ",  async() => {
      const result = await client.createTask(
        {
          ...sampleTask2,
          smartWalletAddress,
        },
        { authKey });

      const task = await client.getTask(result, { authKey });

      expect(task.id).toEqual(result);
      expect(task.status).toEqual(avs_pb.TaskStatus.ACTIVE);
      expect(task.nodes).toHaveLength(6);
      expect(task.nodes[0].contractWrite.contractAddress).toEqual(sampleTask1.nodes[0].contractWrite.contractAddress);
      expect(task.nodes[0].contractWrite.callData).toEqual(sampleTask1.nodes[0].contractWrite.callData);
      
      expect(task.nodes[5].branch.conditions).toHaveLength(3);
      expect(task.nodes[5].branch.conditions[0].type).toEqual("if");
      expect(task.nodes[5].branch.conditions[1].type).toEqual("if");
      expect(task.nodes[5].branch.conditions[2].type).toEqual("else");

      expect(task.edges).toHaveLength(6);
      expect(task.edges[3].source).toEqual("t100.b1");
      expect(task.edges[4].source).toEqual("t100.b2");

      expect(task.trigger.triggerType).toEqual(avs_pb.TaskTrigger.TriggerTypeCase.BLOCK);
      expect(task.trigger.block.interval).toEqual(5);

    })
  });

  describe("Auth with API key", () => {
    let authKey: string;
    let smartWalletAddress: string;

    beforeAll(async () => {
      console.log("Authenticating with API key ...");
      const res = await client.authWithAPIKey(ownerAddress,TEST_API_KEY,  EXPIRED_AT);
      authKey = res.authKey;

      console.log(`Retrieving smart wallet for owner ${ownerAddress} ...`);
      const result = await client.listSmartWallets({ authKey });
      smartWalletAddress = result[0].address;
      console.log(`Smart wallet created: ${smartWalletAddress}`);
    });

    test("should create a task when authenticated with API key", async () => {
      const result = await client.createTask(
        { ...sampleTask1, smartWalletAddress },
        { authKey }
      );
      console.log("Create task result:", result);
      expect(result).toBeDefined();
      expect(result).toHaveLength(26);
    });

    test("should throw error when creating a task with owner address using API key", async () => {
      await expect(client.createTask(
        { ...sampleTask1, smartWalletAddress: ownerAddress },
        { authKey }
       )).rejects.toThrow("3 INVALID_ARGUMENT: invalid smart account addres");
    });
  });

  describe("Without authentication", () => {
    let smartWalletAddress: string;
    let authKey: string;

    test("should throw error when creating a task without authentication", async () => {
      await expect(client.createTask(
        { ...sampleTask1, smartWalletAddress }
      )).rejects.toThrow("missing auth header");
    });
  });
});
