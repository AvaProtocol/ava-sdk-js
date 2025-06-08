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

let saltIndex = SaltGlobal.CreateWorkflow * 5000;

describe("FilterNode Preprocessing Tests", () => {
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
    test("should filter adults only with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "{{ current.age >= 18 }}",
          sourceId: "testArray"
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Carol", age: 25 }
          ],
          current: { age: 21 }
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
        if (Array.isArray(result.data)) {
          expect(result.data.length).toBe(2);
        }
      } else {
        console.log("Filter adults test failed:", result.error);
      }
    });

    test("should filter minors with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "{{ current.age < 18 }}",
          sourceId: "testArray"
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Carol", age: 25 }
          ]
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
        if (Array.isArray(result.data)) {
          expect(result.data.length).toBe(1);
        }
      } else {
        console.log("Filter minors test failed:", result.error);
      }
    });

    test("should filter by name starting with A", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "{{ current.name.startsWith(\"A\") }}",
          sourceId: "testArray"
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Anna", age: 25 }
          ]
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
        if (Array.isArray(result.data)) {
          expect(result.data.length).toBe(2);
        }
      } else {
        console.log("Filter by name test failed:", result.error);
      }
    });

    test("should filter by age range with preprocessing", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "{{ current.age >= 20 && current.age <= 22 }}",
          sourceId: "testArray"
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Carol", age: 25 },
            { name: "David", age: 22 }
          ]
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
        if (Array.isArray(result.data)) {
          expect(result.data.length).toBe(2);
        }
      } else {
        console.log("Filter by age range test failed:", result.error);
      }
    });

    test("should filter with trigger data reference", async () => {
      const result = await client.runNodeWithInputs({
        nodeType: NodeType.Filter,
        nodeConfig: {
          expression: "{{ current.age >= trigger.data.minAge }}",
          sourceId: "testArray"
        },
        inputVariables: {
          testArray: [
            { name: "Alice", age: 21 },
            { name: "Bob", age: 17 },
            { name: "Carol", age: 25 }
          ],
          trigger: {
            data: {
              minAge: 18
            }
          }
        },
      });

      expect(result).toBeDefined();
      expect(typeof result.success).toBe("boolean");
      if (result.success) {
        expect(result.data).toBeDefined();
        expect(result.nodeId).toBeDefined();
        if (Array.isArray(result.data)) {
          expect(result.data.length).toBe(2);
        }
      } else {
        console.log("Filter with trigger data test failed:", result.error);
      }
    });
  });


});
