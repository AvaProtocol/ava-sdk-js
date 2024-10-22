import { describe, beforeAll, test, expect } from '@jest/globals';
import Client from '../index';
import { getRpcEndpoint } from '../config';

describe('Client E2E Tests', () => {
  let client: Client;

  beforeAll(() => {
    // Initialize the client with test credentials
    client = new Client({
      env: 'production',
      jwtApiKey: process.env.TEST_JWT_API_KEY, // Set this in your environment variables
      owner: process.env.TEST_OWNER, // Set this in your environment variables
    });
  });

  test('authenticate with JWT key', async () => {
    await expect(client.authenticate()).resolves.not.toThrow();
  });

  test('listTask', async () => {
    await client.authenticate(); // Ensure we're authenticated
    const result = await client.listTask();
    expect(result).toBeDefined();
    expect(Array.isArray(result.tasks)).toBe(true);
  });

  test('getSmartWalletAddress', async () => {
    await client.authenticate(); // Ensure we're authenticated
    const result = await client.getSmartWalletAddress();
    expect(result).toBeDefined();
    expect(result.address).toMatch(/^0x[a-fA-F0-9]{40}$/); // Ethereum address format
  });

  test('getTask', async () => {
    await client.authenticate(); // Ensure we're authenticated
    // First, list tasks to get a valid task ID
    const listResult = await client.listTask();
    if (listResult.tasks.length > 0) {
      const taskId = listResult.tasks[0].id;
      const result = await client.getTask(taskId);
      expect(result).toBeDefined();
      expect(result.id).toBe(taskId);
    } else {
      console.warn('No tasks available to test getTask');
    }
  });

  // Add more e2e tests for other methods as needed
});
