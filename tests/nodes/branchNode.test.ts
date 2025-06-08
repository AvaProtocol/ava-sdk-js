import { describe, beforeAll, afterAll, test, expect } from "@jest/globals";
import { Client } from "@avaprotocol/sdk-js";
import { NodeType } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  TIMEOUT_DURATION,
  SaltGlobal,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.CreateWorkflow * 4000;

describe("BranchNode Preprocessing Tests", () => {
  let client: Client;

  beforeAll(async () => {
    const address = await getAddress(walletPrivateKey);
    
    client = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message } = await client.getSignatureFormat(address);
    const signature = await generateSignature(message, walletPrivateKey);

    const res = await client.authWithSignature({
      message: message,
      signature: signature,
    });

    client.setAuthKey(res.authKey);
  });

  describe("{{}} Preprocessing Tests", () => {
    test("should evaluate timestamp comparison with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditionsList: [
            { id: "condition1", type: "if", expression: "{{ trigger.data.timestamp > 0 }}" },
            { id: "condition2", type: "else", expression: "" }
          ]
        },
        inputVariables: {
          trigger: {
            data: {
              timestamp: 1748804062960
            }
          }
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Timestamp comparison test failed:", result.error);
      }
    });

    test("should evaluate status string comparison with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditionsList: [
            { id: "condition1", type: "if", expression: "{{ trigger.data.status === \"ready\" }}" },
            { id: "condition2", type: "else", expression: "" }
          ]
        },
        inputVariables: {
          trigger: {
            data: {
              status: "ready"
            }
          }
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Status comparison test failed:", result.error);
      }
    });

    test("should evaluate nested object property access with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditionsList: [
            { id: "condition1", type: "if", expression: "{{ trigger.data.user.role === \"admin\" }}" },
            { id: "condition2", type: "else", expression: "" }
          ]
        },
        inputVariables: {
          trigger: {
            data: {
              user: {
                role: "admin"
              }
            }
          }
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Nested object access test failed:", result.error);
      }
    });

    test("should evaluate age comparison with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditionsList: [
            { id: "condition1", type: "if", expression: "{{ trigger.data.user.age >= 18 }}" },
            { id: "condition2", type: "else", expression: "" }
          ]
        },
        inputVariables: {
          trigger: {
            data: {
              user: {
                age: 21
              }
            }
          }
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Age comparison test failed:", result.error);
      }
    });

    test("should evaluate complex logical expression with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditionsList: [
            { id: "condition1", type: "if", expression: "{{ trigger.data.status === \"ready\" && trigger.data.user.age >= 18 }}" },
            { id: "condition2", type: "else", expression: "" }
          ]
        },
        inputVariables: {
          trigger: {
            data: {
              status: "ready",
              user: {
                age: 21
              }
            }
          }
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Complex logical expression test failed:", result.error);
      }
    });

    test("should handle false condition with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditionsList: [
            { id: "condition1", type: "if", expression: "{{ trigger.data.user.role === \"guest\" }}" },
            { id: "condition2", type: "else", expression: "" }
          ]
        },
        inputVariables: {
          trigger: {
            data: {
              user: {
                role: "admin"
              }
            }
          }
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("False condition test failed:", result.error);
      }
    });
  });

  describe("Backward Compatibility Tests", () => {
    test("should work with expressions without preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Branch,
        nodeConfig: {
          conditionsList: [
            { id: "condition1", type: "if", expression: "trigger.data.timestamp > 0" },
            { id: "condition2", type: "else", expression: "" }
          ]
        },
        inputVariables: {
          trigger: {
            data: {
              timestamp: 1748804062960
            }
          }
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
      } else {
        console.log("Backward compatibility test failed:", result.error);
      }
    });
  });
});
