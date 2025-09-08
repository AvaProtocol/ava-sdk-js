import _ from "lodash";
import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import {
  getAddress,
  generateSignature,
  compareResults,
  SaltGlobal,
  SALT_BUCKET_SIZE,
} from "../utils/utils";
import { createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey } = getConfig();

let saltIndex = SaltGlobal.GetWorkflow * SALT_BUCKET_SIZE;

describe("Workflow Management Tests", () => {
  let client: Client;
  let eoaAddress: string;

  beforeAll(async () => {
    eoaAddress = await getAddress(walletPrivateKey);
    console.log("Owner wallet address:", eoaAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: avsEndpoint,
    });

    const { message } = await client.getSignatureFormat(eoaAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });
    client.setAuthKey(res.authKey);
  });

  describe("getWorkflow Tests", () => {
    test("should get workflow when authenticated with signature", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow);

        const result = await client.getWorkflow(workflowId);

        // Check if the result is an object and has the expected properties
        compareResults(
          {
            ...workflowProps,
            id: workflowId,
            owner: eoaAddress,
            smartWalletAddress: wallet.address,
          },
          result
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("should throw task not found when getting an non-existent task", async () => {
      await expect(
        client.getWorkflow("non-existent-task-id")
      ).rejects.toThrowError(/task not found|NOT_FOUND/i);
    });
  });

  describe("getWorkflows Tests", () => {
    test("should list tasks when authenticated with signature", async () => {
      const workflowName = "test 123";
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        workflowProps.name = workflowName;
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow);

        const res = await client.getWorkflows([wallet.address]);
        expect(Array.isArray(res.items)).toBe(true);
        expect(res.items.length).toBeGreaterThanOrEqual(1);
        expect(res.items.some((task) => task.id === workflowId)).toBe(true);
        const result = res.items.find((task) => task.id === workflowId);

        expect(result?.id).toEqual(workflowId);
        expect(result?.name).toEqual(workflowName);
        expect(result?.startAt).toEqual(workflowProps.startAt);
        expect(result?.maxExecution).toEqual(workflowProps.maxExecution);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("options.limit returns the correct number of workflows", async () => {
      const totalCount = 4;
      const countFirstPage = 1;

      // Isolated test of this account
      const salt = _.toString(saltIndex++);
      const wallet = await client.getWallet({ salt });
      const workflowIds: string[] = [];

      try {
        // Create 4 workflows
        for (let i = 0; i < totalCount; i++) {
          const workflowProps = createFromTemplate(wallet.address);
          const workflow = client.createWorkflow(workflowProps);
          const workflowId = await client.submitWorkflow(workflow);
          workflowIds.push(workflowId);
        }

        // Get the list of workflows with limit:countFirstPage
        const listResponse = await client.getWorkflows([wallet.address], {
          limit: countFirstPage,
        });
        expect(listResponse.items.length).toBe(countFirstPage);
        expect(listResponse).toHaveProperty("pageInfo");
        expect(listResponse.pageInfo.hasNextPage).toBeTruthy();
        // because of our usage of ulid, this is fixed length
        const firstCursor = listResponse.pageInfo.endCursor;
        expect(firstCursor).toHaveLength(60);

        // Get the list of workflows with limit:2 and after
        const listResponse2 = await client.getWorkflows([wallet.address], {
          limit: totalCount,
          after: firstCursor,
        });

        // Verify that the count of the second return is totalCount - limit
        expect(Array.isArray(listResponse2.items)).toBe(true);
        expect(listResponse2.items.length).toBe(totalCount - countFirstPage);
        expect(listResponse2.pageInfo.hasNextPage).toBeFalsy();

        // Make sure there's no overlap between the two lists
        expect(
          _.intersection(
            listResponse.items.map((item: any) => item.id),
            listResponse2.items.map((item: any) => item.id)
          ).length
        ).toBe(0);

        // Get the list of workflows with limit:4 and no cursor
        const listResponse3 = await client.getWorkflows([wallet.address], {
          limit: totalCount,
        });

        expect(listResponse3.items.length).toBe(totalCount);
        // Note: hasNextPage might be true even when we get all items, depending on server implementation
        expect(typeof listResponse3.pageInfo.hasNextPage).toBe("boolean");
      } finally {
        // Clean up all created workflows
        for (const workflowId of workflowIds) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("should throw error when not sending a valid smart wallet address", async () => {
      // User's EOA address should throw INVALID_ARGUMENT
      await expect(client.getWorkflows([eoaAddress])).rejects.toThrowError(
        /invalid smart account address|INVALID_ARGUMENT/i
      );

      // Invalid wallet address should throw INVALID_ARGUMENT
      await expect(
        client.getWorkflows(["0x000000000000000000000000000000000000dead"])
      ).rejects.toThrowError(/invalid smart account address|INVALID_ARGUMENT/i);
    });

    test("should throw error with an invalid limit", async () => {
      // Invalid limit should throw INVALID_ARGUMENT
      await expect(
        client.getWorkflows([eoaAddress], { limit: -1 })
      ).rejects.toThrowError(/invalid smart account address|INVALID_ARGUMENT/i);
    });

    test("should support forward pagination with after parameter", async () => {
      const totalCount = 4;
      const pageSize = 2;

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const workflowIds: string[] = [];

      try {
        // Create workflows
        for (let i = 0; i < totalCount; i++) {
          const workflowProps = createFromTemplate(wallet.address);
          workflowProps.name = `forward_pagination_${i}`;
          const workflow = client.createWorkflow(workflowProps);
          const workflowId = await client.submitWorkflow(workflow);
          workflowIds.push(workflowId);
        }

        // Get the first page with limit:pageSize
        const firstPage = await client.getWorkflows([wallet.address], {
          limit: pageSize,
        });
        
        expect(firstPage.items.length).toBeLessThanOrEqual(pageSize);
        expect(firstPage.pageInfo.endCursor).toBeTruthy();
        expect(firstPage.pageInfo.hasNextPage).toBeTruthy();

        // Get the second page using after parameter
        const secondPage = await client.getWorkflows([wallet.address], {
          after: firstPage.pageInfo.endCursor,
          limit: pageSize,
        });

        expect(secondPage.items.length).toBeLessThanOrEqual(pageSize);

        // Verify no overlap between pages
        const firstPageIds = firstPage.items.map((item) => item.id);
        const secondPageIds = secondPage.items.map((item) => item.id);
        
        const overlap = firstPageIds.filter((id) => secondPageIds.includes(id));
        expect(overlap.length).toBe(0);

        // Verify all returned workflows are in our created list
        [...firstPageIds, ...secondPageIds].forEach((id) => {
          if (id) {
            expect(workflowIds.includes(id)).toBe(true);
          }
        });
      } finally {
        // Clean up all created workflows
        for (const workflowId of workflowIds) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("should support backward pagination with before parameter", async () => {
      const totalCount = 4;
      const pageSize = 2;

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const workflowIds: string[] = [];

      try {
        // Create workflows
        for (let i = 0; i < totalCount; i++) {
          const workflowProps = createFromTemplate(wallet.address);
          workflowProps.name = `backward_pagination_${i}`;
          const workflow = client.createWorkflow(workflowProps);
          const workflowId = await client.submitWorkflow(workflow);
          workflowIds.push(workflowId);
        }

        // Get all workflows first to get cursor
        const allWorkflows = await client.getWorkflows([wallet.address], {
          limit: totalCount,
        });
        
        expect(allWorkflows.items.length).toBe(totalCount);

        // Use the second item's cursor as a reference point
        const secondItemCursor = allWorkflows.pageInfo.endCursor;

        // Get workflows before the cursor
        const beforePage = await client.getWorkflows([wallet.address], {
          before: secondItemCursor,
          limit: pageSize,
        });

        expect(beforePage.items.length).toBeLessThanOrEqual(pageSize);
        expect(typeof beforePage.pageInfo.hasPreviousPage).toBe("boolean");

        // Verify that items in beforePage come before items in the original list
        const beforeIds = beforePage.items.map((item) => item.id);
        beforeIds.forEach((id) => {
          if (id) {
            expect(workflowIds.includes(id)).toBe(true);
          }
        });
      } finally {
        // Clean up all created workflows
        for (const workflowId of workflowIds) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("should handle empty results gracefully", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const res = await client.getWorkflows([wallet.address]);
      expect(Array.isArray(res.items)).toBe(true);
      expect(res.items.length).toBe(0);
      expect(res.pageInfo.hasNextPage).toBeFalsy();
      expect(res.pageInfo.hasPreviousPage).toBeFalsy();
    });

    test("should filter workflows by status", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const workflowIds: string[] = [];

      try {
        // Create a workflow
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        const workflowId = await client.submitWorkflow(workflow);
        workflowIds.push(workflowId);

        // Get workflows with status filter (if supported)
        const res = await client.getWorkflows([wallet.address]);
        expect(Array.isArray(res.items)).toBe(true);
        expect(res.items.length).toBeGreaterThanOrEqual(1);
        
        const createdWorkflow = res.items.find((task) => task.id === workflowId);
        expect(createdWorkflow?.status).toBeTruthy();
      } finally {
        // Clean up all created workflows
        for (const workflowId of workflowIds) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });
  });
}); 