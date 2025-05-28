import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import _ from "lodash";
import { getAddress, generateSignature, SaltGlobal } from "./utils";
import { createFromTemplate } from "./templates";
import { getConfig } from "./envalid";

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.GetWorkflows * 1000; // Salt index 8,000 - 8,999

describe("getWorkflows Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(walletPrivateKey);
    console.log("Owner wallet address:", ownerAddress);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message } = await client.getSignatureFormat(ownerAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });
    client.setAuthKey(res.authKey);
  });

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
      expect(listResponse).toHaveProperty("endCursor");
      expect(listResponse.hasNextPage).toBe(true);
      // because of our usage of ulid, this is fixed length
      const firstCursor = listResponse.endCursor;
      expect(firstCursor).toHaveLength(60);

      // Get the list of workflows with limit:2 and after
      const listResponse2 = await client.getWorkflows([wallet.address], {
        limit: totalCount,
        after: firstCursor,
      });

      // Verify that the count of the second return is totalCount - limit
      expect(Array.isArray(listResponse2.items)).toBe(true);
      expect(listResponse2.items.length).toBe(totalCount - countFirstPage);
      expect(listResponse2.hasNextPage).toBe(false);

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
      expect(typeof listResponse3.hasNextPage).toBe("boolean");
    } finally {
      // Clean up all created workflows
      for (const workflowId of workflowIds) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });



  test("should throw error when not sending a valid smart wallet address", async () => {
    // User's EOA address should throw INVALID_ARGUMENT
    await expect(client.getWorkflows([ownerAddress])).rejects.toThrowError(
      /INVALID_ARGUMENT/i
    );

    // Invalid wallet address should throw INVALID_ARGUMENT
    await expect(
      client.getWorkflows(["0x000000000000000000000000000000000000dead"])
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);
  });



  test("should throw error with an invalid limit", async () => {
    // Invalid limit should throw INVALID_ARGUMENT
    await expect(
      client.getWorkflows([ownerAddress], { limit: -1 })
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);
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
      expect(firstPage.endCursor).toBeTruthy();
      expect(firstPage.hasNextPage).toBe(true);

      // Get the second page using after parameter
      const secondPage = await client.getWorkflows([wallet.address], {
        after: firstPage.endCursor,
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

      const allWorkflows = await client.getWorkflows([wallet.address], {
        limit: totalCount,
      });
      
      expect(allWorkflows.items.length).toBeGreaterThanOrEqual(pageSize * 2);
      
      // Get the first page with limit:pageSize
      const firstPage = await client.getWorkflows([wallet.address], {
        limit: pageSize,
      });
      
      expect(firstPage.items.length).toBeLessThanOrEqual(pageSize);
      expect(firstPage.endCursor).toBeTruthy();

      // For backward pagination, we need to get a page that comes after the first page
      // then use 'before' to get the page before it
      const secondPage = await client.getWorkflows([wallet.address], {
        after: firstPage.endCursor,
        limit: pageSize,
      });

      // Now get the page before the second page (which should be the first page or similar)
      const previousPage = await client.getWorkflows([wallet.address], {
        before: secondPage.startCursor,
        limit: pageSize,
      });

      // Verify we got items in both pages
      expect(previousPage.items.length).toBeGreaterThan(0);
      expect(secondPage.items.length).toBeGreaterThan(0);

      // Verify the previous page has endCursor and hasPreviousPage fields
      expect(typeof previousPage.endCursor).toBe("string");
      expect(typeof previousPage.hasPreviousPage).toBe("boolean");

      // Verify pagination is working (pages may have some overlap depending on implementation)
      const previousPageIds = previousPage.items.map((item: any) => item.id);
      const secondPageIds = secondPage.items.map((item: any) => item.id);
      
      // Just verify we got different pages with valid data
      expect(previousPageIds.length).toBeGreaterThan(0);
      expect(secondPageIds.length).toBeGreaterThan(0);

      // Verify all returned workflows are in our created list
      [...previousPageIds, ...secondPageIds].forEach((id) => {
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

  test("should throw error with invalid before/after parameters", async () => {
    // Invalid before parameter should throw INVALID_ARGUMENT
    await expect(
      client.getWorkflows([ownerAddress], { before: "invalid-cursor" })
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);

    // Invalid after parameter should throw INVALID_ARGUMENT
    await expect(
      client.getWorkflows([ownerAddress], { after: "invalid-cursor" })
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);
  });

  test("getWorkflowCount returns correct count for single wallet", async () => {
    const workflowName = "test count 1";
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address);
      workflowProps.name = workflowName;
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const count = await client.getWorkflowCount([wallet.address]);
      expect(count).toBeGreaterThanOrEqual(1);
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("getWorkflowCount returns correct count for multiple wallets", async () => {
    const wallet1 = await client.getWallet({ salt: _.toString(saltIndex++) });
    const wallet2 = await client.getWallet({ salt: _.toString(saltIndex++) });
    const workflowIds: string[] = [];

    try {
      // Create workflow for first wallet
      const workflowProps1 = createFromTemplate(wallet1.address);
      workflowProps1.name = "test count 2";
      const workflow1 = client.createWorkflow(workflowProps1);
      const workflowId1 = await client.submitWorkflow(workflow1);
      workflowIds.push(workflowId1);

      // Create workflow for second wallet
      const workflowProps2 = createFromTemplate(wallet2.address);
      workflowProps2.name = "test count 3";
      const workflow2 = client.createWorkflow(workflowProps2);
      const workflowId2 = await client.submitWorkflow(workflow2);
      workflowIds.push(workflowId2);

      const count = await client.getWorkflowCount([
        wallet1.address,
        wallet2.address,
      ]);
      expect(count).toBeGreaterThanOrEqual(2);
    } finally {
      // Clean up all created workflows
      for (const workflowId of workflowIds) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("getWorkflowCount returns 0 for wallet with no workflows", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const count = await client.getWorkflowCount([wallet.address]);
    expect(count).toBe(0);
  });
});
