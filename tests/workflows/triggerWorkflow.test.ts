import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client, TriggerFactory } from "@avaprotocol/sdk-js";
import {
  TriggerType,
  WorkflowStatus,
  ExecutionStatus,
} from "@avaprotocol/types";
import _ from "lodash";
import {
  getAddress,
  generateSignature,
  cleanupWorkflows,
  getBlockNumber,
  SaltGlobal,
  TIMEOUT_DURATION,
} from "../utils/utils";
import { createFromTemplate, defaultTriggerId } from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION); // Set timeout to 15 seconds for all tests in this file
let saltIndex = SaltGlobal.TriggerWorkflow * 1000; // Salt index 10,000 - 10,999

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

describe("triggerWorkflow Tests", () => {
  let ownerAddress: string;
  let client: Client;

  beforeAll(async () => {
    ownerAddress = await getAddress(walletPrivateKey);

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

  test("trigger for block type should succeed", async () => {
    const interval = 5;
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
      })
    );

    try {
      const executions = await client.getExecutions([workflowId]);

      // The list should be empty because the workflow has not been executed yet
      expect(Array.isArray(executions.items)).toBe(true);
      expect(executions.items.length).toEqual(0);

      // Manually trigger the workflow with block number + 5
      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: blockNumber + interval, // block interval in the workflow template
        },
        isBlocking: true,
      });

      // The list should now contain one execution
      const executions2 = await client.getExecutions([workflowId]);

      // Verify that the execution is successfully triggered at block number + 5
      expect(Array.isArray(executions2.items)).toBe(true);
      expect(executions2.items.length).toEqual(1);
      expect(executions2.items[0].success).toEqual(true);
      const workflow = await client.getWorkflow(workflowId);

      expect(workflow.status).toEqual(WorkflowStatus.Completed);
      expect(workflow.executionCount).toEqual(1);
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });

  test("trigger for cron type should succeed", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    await cleanupWorkflows(client, wallet.address);
    const epoch = Math.floor(Date.now() / 1000);

    // Create a cron trigger with a schedule of every minute
    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "cronTrigger",
      type: TriggerType.Cron,
      data: { scheduleList: ["* * * * *"] },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
      })
    );

    const executions = await client.getExecutions([workflowId]);

    // The list should be empty because the workflow has not been executed yet
    expect(Array.isArray(executions.items)).toBe(true);
    expect(executions.items.length).toEqual(0);

    const result = await client.triggerWorkflow({
      id: workflowId,
      triggerData: {
        type: TriggerType.Cron,
        timestamp: (epoch + 60) * 1000, // Convert to milliseconds
        timestampIso: new Date((epoch + 60) * 1000).toISOString(),
      } as any,
      isBlocking: true,
    });

    // The list should now contain one execution, the id from manual trigger should matched
    const executions2 = await client.getExecutions([workflowId]);
    expect(executions2.items[0].id).toEqual(result.executionId);
    expect(Array.isArray(executions2.items)).toBe(true);
    expect(executions2.items.length).toEqual(1);

    const workflow = await client.getWorkflow(workflowId);
    expect(workflow.executionCount).toEqual(1);
    expect(workflow.status).toEqual(WorkflowStatus.Completed);

    await client.deleteWorkflow(workflowId);
  });

  test("trigger for fixed time type should succeed", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const epoch = Math.floor(Date.now() / 1000);

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "fixedTimeTrigger",
      type: TriggerType.FixedTime,
      data: { epochsList: [epoch + 60, epoch + 120, epoch + 180] }, // one per minute for the next 3 minutes
    });

    // TODO: the maxExecution is 1, but epochsList has 3 epochs;
    // Should we change the maxExecution to 3?
    // Add a test: what happens if the maxExecution is less than the epochsList length?
    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
      })
    );

    // The list should be empty because the workflow has not been executed yet
    const executions = await client.getExecutions([workflowId]);
    expect(Array.isArray(executions.items)).toBe(true);
    expect(executions.items.length).toEqual(0);

    // Manually trigger the workflow
    const result = await client.triggerWorkflow({
      id: workflowId,
      triggerData: {
        type: TriggerType.FixedTime,
        timestamp: (epoch + 300) * 1000, // Convert to milliseconds
        timestampIso: new Date((epoch + 300) * 1000).toISOString(),
      } as any,
      isBlocking: true,
    });

    // The list should now contain one execution
    const executions2 = await client.getExecutions([workflowId]);
    expect(Array.isArray(executions2.items)).toBe(true);
    expect(executions2.items.length).toEqual(1);

    const workflow = await client.getWorkflow(workflowId);
    expect(workflow.status).toEqual(WorkflowStatus.Completed);
    expect(workflow.executionCount).toEqual(1);

    await client.deleteWorkflow(workflowId);
  });

  test("trigger for event type should succeed", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "eventTrigger",
      type: TriggerType.Event,
      data: {
        queriesList: [
          {
            addressesList: [], // Listen to all contracts
            topicsList: [
              {
                valuesList: [
                  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", // Transfer event signature
                  null, // Any FROM address
                  wallet.address.toLowerCase() // TO this specific wallet
                ]
              }
            ],
            maxEventsPerBlock: 100,
          }
        ],
      },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
      })
    );

    // The list should be empty because the workflow has not been executed yet
    const executions = await client.getExecutions([workflowId]);
    expect(Array.isArray(executions.items)).toBe(true);
    expect(executions.items.length).toEqual(0);

    // Manually trigger the workflow
    await client.triggerWorkflow({
      id: workflowId,
      triggerData: {
        type: TriggerType.Event,
        evmLog: {
          address: "0x1234567890123456789012345678901234567890",
          blockNumber: blockNumber + 5,
          transactionHash: "0x1234567890",
          index: 0,
        },
      } as any,
      isBlocking: true,
    });

    // The list should now contain one execution
    const executions2 = await client.getExecutions([workflowId]);
    expect(Array.isArray(executions2.items)).toBe(true);
    expect(executions2.items.length).toEqual(1);

    const workflow = await client.getWorkflow(workflowId);
    expect(workflow.status).toEqual(WorkflowStatus.Completed);
    expect(workflow.executionCount).toEqual(1);

    await client.deleteWorkflow(workflowId);
  });

  test("trigger return correct execution id in blocking mode", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    await cleanupWorkflows(client, wallet.address);
    const epoch = Math.floor(Date.now() / 1000);

    // Create a cron trigger with a schedule of every minute
    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "cronTrigger",
      type: TriggerType.Cron,
      data: { scheduleList: ["* * * * *"] },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
      })
    );

    const executions = await client.getExecutions([workflowId]);

    // The list should be empty because the workflow has not been executed yet
    expect(Array.isArray(executions.items)).toBe(true);
    expect(executions.items.length).toEqual(0);

    const result = await client.triggerWorkflow({
      id: workflowId,
      triggerData: {
        type: TriggerType.Cron,
        timestamp: (epoch + 60) * 1000, // Convert to milliseconds
        timestampIso: new Date((epoch + 60) * 1000).toISOString(),
      } as any,
      isBlocking: true,
    });

    // The list should now contain one execution, the id from manual trigger should matched
    const execution = await client.getExecution(workflowId, result.executionId);
    expect(execution.id).toEqual(result.executionId);
    const executionStatus = await client.getExecutionStatus(
      workflowId,
      result.executionId
    );
    expect(executionStatus).toEqual(ExecutionStatus.EXECUTION_STATUS_COMPLETED);

    await client.deleteWorkflow(workflowId);
  });

  test("trigger async return id and pending status", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    await cleanupWorkflows(client, wallet.address);
    const epoch = Math.floor(Date.now() / 1000);

    // Create a cron trigger with a schedule of every minute
    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "cronTrigger",
      type: TriggerType.Cron,
      data: { scheduleList: ["* * * * *"] },
    });

    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
      })
    );

    const result = await client.triggerWorkflow({
      id: workflowId,
      triggerData: {
        type: TriggerType.Cron,
        timestamp: (epoch + 60) * 1000, // Convert to milliseconds
        timestampIso: new Date((epoch + 60) * 1000).toISOString(),
      } as any,
      isBlocking: false,
    });

    expect(result.status).toEqual(ExecutionStatus.EXECUTION_STATUS_PENDING);
    expect(result.executionId).toBeDefined();

    await client.deleteWorkflow(workflowId);
  });

  test("should throw trigger an non-existent workflow Id", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

    await expect(
      client.triggerWorkflow({
        id: "non-existent-workflow-id",
        triggerData: {
          type: TriggerType.Block,
          blockNumber: blockNumber + 5,
        },
        isBlocking: true,
      })
    ).rejects.toThrowError(/INVALID_ARGUMENT/i);
  });

  test("should throw error when triggering a completed block workflow", async () => {
    const interval = 5;
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval },
    });

    // Create workflow with maxExecution = 1 to ensure it completes after one execution
    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
        maxExecution: 1, // Set to 1 to ensure workflow completes after one execution
      })
    );

    try {
      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: blockNumber + interval,
        },
        isBlocking: true,
      });

      // Verify workflow is completed
      const workflow = await client.getWorkflow(workflowId);
      expect(workflow.status).toEqual(WorkflowStatus.Completed);
      expect(workflow.executionCount).toEqual(1);

      await expect(
        client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Block,
            blockNumber: blockNumber + interval * 2,
          },
          isBlocking: true,
        })
      ).rejects.toThrowError(/FAILED_PRECONDITION/i);
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });

  test("should throw error when triggering a completed cron workflow", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const epoch = Math.floor(Date.now() / 1000);

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "cronTrigger",
      type: TriggerType.Cron,
      data: { scheduleList: ["* * * * *"] },
    });

    // Create workflow with maxExecution = 1 to ensure it completes after one execution
    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
        maxExecution: 1, // Set to 1 to ensure workflow completes after one execution
      })
    );

    try {
      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Cron,
          timestamp: (epoch + 60) * 1000, // Convert to milliseconds
          timestampIso: new Date((epoch + 60) * 1000).toISOString(),
        } as any,
        isBlocking: true,
      });

      // Verify workflow is completed
      const workflow = await client.getWorkflow(workflowId);
      expect(workflow.status).toEqual(WorkflowStatus.Completed);
      expect(workflow.executionCount).toEqual(1);

      await expect(
        client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Cron,
            timestamp: (epoch + 120) * 1000, // Convert to milliseconds
            timestampIso: new Date((epoch + 120) * 1000).toISOString(),
          } as any,
          isBlocking: true,
        })
      ).rejects.toThrowError(/FAILED_PRECONDITION/i);
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });

  test("should throw error when triggering a completed fixed time workflow", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const epoch = Math.floor(Date.now() / 1000);

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "fixedTimeTrigger",
      type: TriggerType.FixedTime,
      data: { epochsList: [epoch + 60] },
    });

    // Create workflow with maxExecution = 1 to ensure it completes after one execution
    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
        maxExecution: 1, // Set to 1 to ensure workflow completes after one execution
      })
    );

    try {
      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.FixedTime,
          timestamp: (epoch + 60) * 1000, // Convert to milliseconds
          timestampIso: new Date((epoch + 60) * 1000).toISOString(),
        } as any,
        isBlocking: true,
      });

      // Verify workflow is completed
      const workflow = await client.getWorkflow(workflowId);
      expect(workflow.status).toEqual(WorkflowStatus.Completed);
      expect(workflow.executionCount).toEqual(1);

      await expect(
        client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.FixedTime,
            timestamp: (epoch + 120) * 1000, // Convert to milliseconds
            timestampIso: new Date((epoch + 120) * 1000).toISOString(),
          } as any,
          isBlocking: true,
        })
      ).rejects.toThrowError(/FAILED_PRECONDITION/i);
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });

  test("should throw error when triggering a completed event workflow", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    const blockNumber = await getBlockNumber();

    const trigger = TriggerFactory.create({
      id: defaultTriggerId,
      name: "eventTrigger",
      type: TriggerType.Event,
      data: {
        queriesList: [
          {
            addressesList: [], // Listen to all contracts
            topicsList: [
              {
                valuesList: [
                  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", // Transfer event signature
                  null, // Any FROM address
                  wallet.address.toLowerCase() // TO this specific wallet
                ]
              }
            ],
            maxEventsPerBlock: 100,
          }
        ],
      },
    });

    // Create workflow with maxExecution = 1 to ensure it completes after one execution
    const workflowId = await client.submitWorkflow(
      client.createWorkflow({
        ...createFromTemplate(wallet.address),
        trigger,
        smartWalletAddress: wallet.address,
        maxExecution: 1, // Set to 1 to ensure workflow completes after one execution
      })
    );

    try {
      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Event,
          evmLog: {
            address: "0x1234567890123456789012345678901234567890",
            blockNumber: blockNumber + 5,
            transactionHash: "0x1234567890",
            index: 0,
          },
        } as any,
        isBlocking: true,
      });

      // Verify workflow is completed
      const workflow = await client.getWorkflow(workflowId);
      expect(workflow.status).toEqual(WorkflowStatus.Completed);
      expect(workflow.executionCount).toEqual(1);

      await expect(
        client.triggerWorkflow({
          id: workflowId,
          triggerData: {
            type: TriggerType.Event,
            evmLog: {
              address: "0x1234567890123456789012345678901234567890",
              blockNumber: blockNumber + 10,
              transactionHash: "0x0987654321",
              index: 1,
            },
          } as any,
          isBlocking: true,
        })
      ).rejects.toThrowError(/FAILED_PRECONDITION/i);
    } finally {
      await client.deleteWorkflow(workflowId);
    }
  });
});
