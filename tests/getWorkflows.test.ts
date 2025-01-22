import { describe, beforeAll, test, expect } from "@jest/globals";
import Client, { Workflow, WorkflowStatus } from "@/sdk-js/dist";
import dotenv from "dotenv";
import path from "path";
import _ from "lodash";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  queueForRemoval,
  removeCreatedWorkflows,
  cleanupWorkflows,
  compareResults,
  compareListResults,
} from "./utils";
import { EXPIRED_AT, FACTORY_ADDRESS, WorkflowTemplate } from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows tracking of those that need to be cleaned up after the test
const createdWorkflows: Map<string, boolean> = new Map();

describe("getWorkflows Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(TEST_PRIVATE_KEY);
    console.log("Client endpoint:", ENDPOINT, "\nOwner address:", ownerAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
      factoryAddress: FACTORY_ADDRESS,
    });

    const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);
    const res = await client.authWithSignature(signature);
    client.setAuthKey(res.authKey);
  });

  afterAll(async () => await removeCreatedWorkflows(client, createdWorkflows));

  test("should list tasks when authenticated with signature", async () => {
    const wallet = await client.getWallet({ salt: "0" });
    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...WorkflowTemplate,
        smartWalletAddress: wallet.address,
        name: "test 123",
      })
    );
    queueForRemoval(createdWorkflows, workflowId);

    const res = await client.getWorkflows([wallet.address]);
    expect(Array.isArray(res.result)).toBe(true);
    expect(res.result.length).toBeGreaterThanOrEqual(1);
    expect(res.result.some((task) => task.id === workflowId)).toBe(true);
    const result = res.result.find((task) => task.id === workflowId);

    expect(result?.id).toEqual(workflowId);
    expect(result?.name).toEqual("test 123");
    expect(result?.startAt).toEqual(WorkflowTemplate.startAt);
    expect(result?.maxExecution).toEqual(WorkflowTemplate.maxExecution);
  });

  test("options.limit returns the correct number of workflows", async () => {
    const totalCount = 4;
    const countFirstPage = 1;

    const wallet = await client.getWallet({ salt: Math.round(Math.random() * 123425554424242) });
    await cleanupWorkflows(client, wallet.address);

    // Create 4 workflows
    const workflowPromises = Array.from({ length: totalCount }).map(
      async () => {
        const workflowId = await client.submitWorkflow(
          client.createWorkflow({
            ...WorkflowTemplate,
            smartWalletAddress: wallet.address,
          })
        );

        queueForRemoval(createdWorkflows, workflowId);
        return workflowId;
      }
    );

    const workflowIds = await Promise.all(workflowPromises);
    queueForRemoval(createdWorkflows, workflowIds);

    // Get the list of workflows with limit:countFirstPage
    const listResponse = await client.getWorkflows([wallet.address], {
      limit: countFirstPage,
    });
    expect(listResponse.result.length).toBe(countFirstPage);
    expect(listResponse).toHaveProperty("cursor");
    expect(listResponse.hasMore).toBe(true);
    // because of our usage of ulid, this is fixed length
    const firstCursor = listResponse.cursor;
    expect(firstCursor).toHaveLength(60);

    // Get the list of workflows with limit:2 and cursor
    const listResponse2 = await client.getWorkflows([wallet.address], {
      limit: totalCount,
      cursor: firstCursor,
    });

    // Verify that the count of the second return is totalCount - limit
    expect(Array.isArray(listResponse2.result)).toBe(true);
    expect(listResponse2.result.length).toBe(totalCount - countFirstPage);
    expect(listResponse2.hasMore).toBe(false);

    // Make sure there’s no overlap between the two lists
    expect(
      _.intersection(
        listResponse.result.map((item) => item.id),
        listResponse2.result.map((item) => item.id)
      ).length
    ).toBe(0);

    // Get the list of workflows with limit:4 and no cursor
    const listResponse3 = await client.getWorkflows([wallet.address], {
      limit: totalCount,
    });

    expect(listResponse3.result.length).toBe(totalCount);
    expect(listResponse3.hasMore).toBe(false);
  });

  test("options.cursor works as pagination", async () => {
    const totalCount = 3;
    const limit = 2;

    // jest runs test in parallel across files. If there are other test in other file that adds task to the same smart wallet, the return of listing workflow will become undeterministic ahead of time. by using a dedicated salt here we ensure other activity won't interfer with this test
    const wallet = await client.getWallet({ salt: Math.round(Math.random() * 100000000000).toString() });
    await cleanupWorkflows(client, wallet.address);

    // Create 3 workflows
    const workflowPromises = Array.from({ length: totalCount }).map(
      async () => {
        const workflowId = await client.submitWorkflow(
          client.createWorkflow({
            ...WorkflowTemplate,
            smartWalletAddress: wallet.address,
          })
        );

        queueForRemoval(createdWorkflows, workflowId);
        return workflowId;
      }
    );

    const workflowIds = await Promise.all(workflowPromises);
    queueForRemoval(createdWorkflows, workflowIds);

    // Get the list of workflows with limit:2
    const listResponse = await client.getWorkflows([wallet.address], { limit });
    expect(Array.isArray(listResponse.result)).toBe(true);
    expect(listResponse.result.length).toBe(limit);
    expect(listResponse).toHaveProperty("cursor");

    _.each(listResponse.result, (item) => {
      expect(_.includes(workflowIds, item.id)).toBe(true);
    });


    const firstCursor = listResponse.cursor;

    // Get the list of workflows with limit:2 and cursor
    const listResponse2 = await client.getWorkflows([wallet.address], {
      limit,
      cursor: firstCursor,
    });

    // Verify that the count of the second return is totalCount - limit
    expect(Array.isArray(listResponse2.result)).toBe(true);
    expect(listResponse2.result.length).toBe(totalCount - limit);

    // Make sure the returned ids are in the list of created ids
    _.each(listResponse2.result, (item) => {
      expect(_.includes(workflowIds, item.id)).toBe(true);
    });

    // Make sure there’s no overlap between the two lists
    expect(
      _.intersection(
        listResponse.result.map((item) => item.id),
        listResponse2.result.map((item) => item.id)
      ).length
    ).toBe(0);

    // Make sure the cursor is different from the first cursor and an empty string due to reaching the end of the list
    expect(listResponse2.cursor).not.toBe(firstCursor);
    expect(listResponse2.cursor).toBe("");
    expect(listResponse2.hasMore).toBe(false);
  });

  test("should throw error when not sending a valid smart wallet address", async () => {
    // User’s EOA address should throw INVALID_ARGUMENT
    await expect(client.getWorkflows([ownerAddress])).rejects.toThrowError(
      /INVALID_ARGUMENT/i
    );

    // Invalid wallet address should throw INVALID_ARGUMENT
    await expect(
      client.getWorkflows(["0x000000000000000000000000000000000000dead"])
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);
  });

  test("should throw error with an invalid cursor", async () => {
    // Invalid cursor should throw INVALID_ARGUMENT
    await expect(
      client.getWorkflows([ownerAddress], { cursor: "invalid-cursor" })
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);
  });

  test("should throw error with an invalid limit", async () => {
    // Invalid limit should throw INVALID_ARGUMENT
    await expect(
      client.getWorkflows([ownerAddress], { limit: -1 })
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);
  });
});
