import { describe, beforeAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import { TriggerType, NodeType } from "@avaprotocol/types";
import { CustomCodeLangs } from "@avaprotocol/sdk-js";
import {
  getAddress,
  generateSignature,
  TIMEOUT_DURATION,
  SaltGlobal,
  getNextId,
} from "./utils";
import { getConfig } from "./envalid";
import util from "util";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

describe("SimulateTask", () => {
  let eoaAddress: string;
  let client: Client;

  beforeAll(async () => {
    eoaAddress = await getAddress(walletPrivateKey);
    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message } = await client.getSignatureFormat(eoaAddress);
    const signature = await generateSignature(message, walletPrivateKey);
    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);
  });

  describe("Manual Trigger with Custom Code", () => {
    test("should simulate a manual trigger with custom code successfully", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manual trigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: nodeId,
          name: "custom code",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLangs.JAVASCRIPT,
            source:
              "return { message: 'Task executed successfully', timestamp: Date.now() };",
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      const result = await client.simulateTask({
        trigger,
        nodes,
        edges,
        triggerType: TriggerType.Manual,
        triggerConfig: {},
        inputVariables: {},
      });

      console.log("result", util.inspect(result, { depth: null }));

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify unified step structure
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);
      expect(triggerStep.name).toBe("manual trigger");

      const nodeStep = result.steps[1];
      expect(nodeStep.id).toBe(nodeId);
      expect(nodeStep.type).toBe(NodeType.CustomCode);
      expect(nodeStep.name).toBe("custom code");
    });

    test("should handle simulation with input variables", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manual trigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: nodeId,
          name: "custom code",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLangs.JAVASCRIPT,
            source: "return { greeting: 'Hello World!', calculated: 42 * 2 };",
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      const result = await client.simulateTask({
        trigger,
        nodes,
        edges,
        triggerType: TriggerType.Manual,
        triggerConfig: {},
        inputVariables: {
          name: "World",
          value: 42,
        },
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify step structure with input variables
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);

      const nodeStep = result.steps[1];
      expect(nodeStep.id).toBe(nodeId);
      expect(nodeStep.type).toBe(NodeType.CustomCode);
      expect(nodeStep.success).toBe(true);
    });
  });

  describe("Fixed Time Trigger with REST API", () => {
    test("should simulate a fixed time trigger with REST API call", async () => {
      const timestamp = Math.floor(Date.now() / 1000) + 60; // 1 minute from now
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "fixed time trigger",
        type: TriggerType.FixedTime,
        data: {
          config: {
            timestamp: timestamp,
          },
        },
      };

      const nodes = [
        {
          id: nodeId,
          name: "rest api call",
          type: NodeType.RestAPI,
          data: {
            url: "https://jsonplaceholder.typicode.com/posts/1",
            method: "GET",
            headers: {},
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      const result = await client.simulateTask({
        trigger,
        nodes,
        edges,
        triggerType: TriggerType.FixedTime,
        triggerConfig: {
          timestamp: timestamp,
        },
        inputVariables: {},
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(2); // trigger + node

      // Verify unified step structure
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.FixedTime);
      expect(triggerStep.name).toBe("fixed time trigger");

      const nodeStep = result.steps[1];
      expect(nodeStep.id).toBe(nodeId);
      expect(nodeStep.type).toBe(NodeType.RestAPI);
      expect(nodeStep.name).toBe("rest api call");
    });
  });

  describe("Multi-node Workflow", () => {
    test("should simulate a workflow with multiple connected nodes", async () => {
      const triggerId = getNextId();
      const node1Id = getNextId();
      const node2Id = getNextId();

      const trigger = {
        id: triggerId,
        name: "manual trigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: node1Id,
          name: "custom code 1",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLangs.JAVASCRIPT,
            source: "return { step1: 'completed', data: 'from step 1' };",
          },
        },
        {
          id: node2Id,
          name: "custom code 2",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLangs.JAVASCRIPT,
            source:
              "return { step2: 'completed', previousData: trigger.data };",
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: node1Id,
        },
        {
          id: getNextId(),
          source: node1Id,
          target: node2Id,
        },
      ];

      const result = await client.simulateTask({
        trigger,
        nodes,
        edges,
        triggerType: TriggerType.Manual,
        triggerConfig: {},
        inputVariables: {},
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(3); // trigger + 2 nodes

      // Verify all steps have unified structure
      const triggerStep = result.steps[0];
      expect(triggerStep.id).toBe(triggerId);
      expect(triggerStep.type).toBe(TriggerType.Manual);
      expect(triggerStep.name).toBe("manual trigger");

      const node1Step = result.steps[1];
      expect(node1Step.id).toBe(node1Id);
      expect(node1Step.type).toBe(NodeType.CustomCode);
      expect(node1Step.name).toBe("custom code 1");
      expect(node1Step.success).toBe(true);

      const node2Step = result.steps[2];
      expect(node2Step.id).toBe(node2Id);
      expect(node2Step.type).toBe(NodeType.CustomCode);
      expect(node2Step.name).toBe("custom code 2");
      expect(node2Step.success).toBe(true);
    });
  });

  describe("Error Handling", () => {
    test("should handle simulation errors gracefully", async () => {
      const triggerId = getNextId();
      const nodeId = getNextId();

      const trigger = {
        id: triggerId,
        name: "manual trigger",
        type: TriggerType.Manual,
        data: {},
      };

      const nodes = [
        {
          id: nodeId,
          name: "custom code",
          type: NodeType.CustomCode,
          data: {
            lang: CustomCodeLangs.JAVASCRIPT,
            source: "throw new Error('Intentional error for testing');",
          },
        },
      ];

      const edges = [
        {
          id: getNextId(),
          source: triggerId,
          target: nodeId,
        },
      ];

      try {
        const result = await client.simulateTask({
          trigger,
          nodes,
          edges,
          triggerType: TriggerType.Manual,
          triggerConfig: {},
          inputVariables: {},
        });

        // If we get here, the simulation succeeded despite the error
        expect(result).toBeDefined();
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();

        // Even failed simulations should have unified step structure
        expect(result.steps).toHaveLength(2); // trigger + node
        const triggerStep = result.steps[0];
        expect(triggerStep.id).toBe(triggerId);
        expect(triggerStep.type).toBe(TriggerType.Manual);

        const nodeStep = result.steps[1];
        expect(nodeStep.id).toBe(nodeId);
        expect(nodeStep.type).toBe(NodeType.CustomCode);
        expect(nodeStep.success).toBe(false);
      } catch (error: any) {
        // The server treats JavaScript errors as simulation failures
        expect(error).toBeDefined();
        expect(error.message).toContain("Intentional error for testing");
      }
    });
  });
});
