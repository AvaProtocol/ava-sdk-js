import _ from "lodash";
import { Client } from "@avaprotocol/sdk-js";
import { WorkflowStatus } from "@avaprotocol/types";
import {
  generateSignature,
  generateAuthPayloadWithApiKey,
  compareResults,
  getSmartWallet,
  getEOAAddress,
  authenticateClient,
  getClient,
} from "../utils/utils";

import { createFromTemplate } from "../utils/templates";
import { getConfig } from "../utils/envalid";

// Get environment variables from envalid config
const { avsApiKey, walletPrivateKey } = getConfig();

describe("Authentication Tests", () => {
  let client: Client;
  let eoaAddress: string; // user's EOA wallet address
  let saltCounter = 0; // Local counter for auth API tests

  beforeAll(async () => {
    // Initialize the client with test credentials
    client = getClient();

    // Generate the address here
    eoaAddress = await getEOAAddress();
  });

  describe("Authenticated with client.authKey", () => {
    beforeAll(async () => {
      await authenticateClient(client);
    });

    test("getWallet works with client.authKey", async () => {
      const saltValue = _.toString(saltCounter++);
      const result = await getSmartWallet(client, { saltValue });

      expect(result?.address).toHaveLength(42);
      expect(result?.salt).toEqual(saltValue);
      // Factory address is now handled by aggregator default
      expect(result?.factory).toBeTruthy();
    });

    test("getWallets works with client.authKey", async () => {
      // The salt:0 wallet is automatically created

      const wallets = await client.getWallets();

      expect(wallets.length).toBeGreaterThanOrEqual(1);
    });

    test("createWorkflow works with client.authKey", async () => {
      const wallet = await getSmartWallet(client);
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow);
        expect(workflowId).toHaveLength(26);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("getWorkflow works with client.authKey", async () => {
      const wallet = await getSmartWallet(client);
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow);

        const getResponse = await client.getWorkflow(workflowId);
        compareResults(
          {
            ...workflowProps,
            id: workflowId,
            status: WorkflowStatus.Active,
            owner: eoaAddress,
          },
          getResponse
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("getWorkflows works with client.authKey", async () => {
      const wallet = await getSmartWallet(client);
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow);

        const listResult1 = await client.getWorkflows([wallet.address]);
        expect(listResult1.items.length).toBeGreaterThanOrEqual(1);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("cancelWorkflow works with client.authKey", async () => {
      const wallet = await getSmartWallet(client);
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow);

        const workflowObj = await client.getWorkflow(workflowId);
        expect(workflowObj.status).toEqual(WorkflowStatus.Active);

        const cancelResult = await client.cancelWorkflow(workflowId);
        expect(cancelResult.success).toEqual(true);

        const canceled = await client.getWorkflow(workflowId);
        expect(canceled.status).toEqual(WorkflowStatus.Canceled);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("deleteWorkflow works with client.authKey", async () => {
      const wallet = await getSmartWallet(client);

      const workflowProps = createFromTemplate(wallet.address);
      const workflow = client.createWorkflow(workflowProps);
      const workflowId = await client.submitWorkflow(workflow);

      const workflowObj = await client.getWorkflow(workflowId);
      expect(workflowObj.status).toEqual(WorkflowStatus.Active);

      const deleteResult = await client.deleteWorkflow(workflowId!);
      expect(deleteResult.success).toEqual(true);

      await expect(async () => {
        await client.getWorkflow(workflowId!);
      }).rejects.toThrow(/task not found|5 NOT_FOUND: task not found/);
    });
  });

  describe("Authenticated with options.authKey", () => {
    let authKeyViaAPI: string;
    let authKeyViaSignature: string;
    beforeAll(async () => {
      console.log("Authenticating with API key ...");
      const apiKeyPayload = await generateAuthPayloadWithApiKey(
        eoaAddress,
        avsApiKey
      );

      const { message } = await client.getSignatureFormat(eoaAddress);

      const res = await client.authWithAPIKey({
        message: message,
        apiKey: apiKeyPayload.apiKey,
      });

      authKeyViaAPI = res.authKey;

      const sigObject = await generateSignature(message, walletPrivateKey);
      const res2 = await client.authWithSignature({
        message: message,
        signature: sigObject,
      });

      authKeyViaSignature = res2.authKey;
    });

    test("getWallet works with options.authKey", async () => {
      const saltValue = _.toString(saltCounter++);

      const wallet = await getSmartWallet(client, {
        saltValue,
        authKey: authKeyViaAPI,
      });

      expect(wallet).toHaveProperty("address");
      expect(wallet).toHaveProperty("salt", saltValue);
      // Factory address is now handled by aggregator default
      expect(wallet).toHaveProperty("factory");

      const res2 = await getSmartWallet(client, {
        saltValue,
        authKey: authKeyViaSignature,
      });
      expect(res2).toHaveProperty("address");
      expect(res2).toHaveProperty("salt", saltValue);
      expect(res2).toHaveProperty("factory");
    });

    test("createWorkflow works with options.authKey", async () => {
      const wallet = await getSmartWallet(client, {
        saltValue: _.toString(saltCounter++),
        authKey: authKeyViaAPI,
      });

      let workflowId1: string | undefined;
      let workflowId2: string | undefined;

      try {
        const workflowProps1 = createFromTemplate(wallet.address);
        const workflow1 = client.createWorkflow(workflowProps1);
        workflowId1 = await client.submitWorkflow(workflow1, {
          authKey: authKeyViaAPI,
        });
        expect(workflowId1).toHaveLength(26);

        const workflowProps2 = createFromTemplate(wallet.address);
        const workflow2 = client.createWorkflow(workflowProps2);
        workflowId2 = await client.submitWorkflow(workflow2, {
          authKey: authKeyViaAPI,
        });
        expect(workflowId2).toHaveLength(26);
      } finally {
        if (workflowId1) {
          await client.deleteWorkflow(workflowId1, { authKey: authKeyViaAPI });
        }
        if (workflowId2) {
          await client.deleteWorkflow(workflowId2, { authKey: authKeyViaAPI });
        }
      }
    });

    test("getWorkflow works with options.authKey", async () => {
      const wallet = await getSmartWallet(client, {
        saltValue: _.toString(saltCounter++),
        authKey: authKeyViaAPI,
      });

      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow, {
          authKey: authKeyViaAPI,
        });

        const getResponse = await client.getWorkflow(workflowId, {
          authKey: authKeyViaAPI,
        });

        compareResults(
          {
            ...workflowProps,
            id: workflowId,
            status: WorkflowStatus.Active,
            owner: eoaAddress,
          },
          getResponse
        );

        const getResponse2 = await client.getWorkflow(workflowId, {
          authKey: authKeyViaSignature,
        });

        compareResults(
          {
            ...workflowProps,
            id: workflowId,
            status: WorkflowStatus.Active,
            owner: eoaAddress,
          },
          getResponse2
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId, { authKey: authKeyViaAPI });
        }
      }
    });

    test("getWorkflows works with options.authKey", async () => {
      const wallet = await getSmartWallet(client, {
        saltValue: _.toString(saltCounter++),
        authKey: authKeyViaAPI,
      });
      let workflowId1: string | undefined;
      let workflowId2: string | undefined;

      try {
        const workflowProps1 = createFromTemplate(wallet.address);
        const workflow1 = client.createWorkflow(workflowProps1);
        workflowId1 = await client.submitWorkflow(workflow1, {
          authKey: authKeyViaAPI,
        });

        const listResult1 = await client.getWorkflows([wallet.address], {
          authKey: authKeyViaAPI,
        });
        expect(listResult1.items.length).toBeGreaterThanOrEqual(1);

        const workflowProps2 = createFromTemplate(wallet.address);
        const workflow2 = client.createWorkflow(workflowProps2);
        workflowId2 = await client.submitWorkflow(workflow2, {
          authKey: authKeyViaSignature,
        });

        const listResult2 = await client.getWorkflows([wallet.address], {
          authKey: authKeyViaSignature,
        });
        expect(listResult2.items.length).toBeGreaterThanOrEqual(2);
      } finally {
        if (workflowId1) {
          await client.deleteWorkflow(workflowId1, { authKey: authKeyViaAPI });
        }
        if (workflowId2) {
          await client.deleteWorkflow(workflowId2, {
            authKey: authKeyViaSignature,
          });
        }
      }
    });

    test("cancelWorkflow works with options.authKey", async () => {
      const wallet = await getSmartWallet(client, {
        saltValue: _.toString(saltCounter++),
        authKey: authKeyViaAPI,
      });
      let workflowId1: string | undefined;
      let workflowId2: string | undefined;

      try {
        const workflowProps1 = createFromTemplate(wallet.address);
        const workflow1 = client.createWorkflow(workflowProps1);
        workflowId1 = await client.submitWorkflow(workflow1, {
          authKey: authKeyViaAPI,
        });

        const workflowObj1 = await client.getWorkflow(workflowId1, {
          authKey: authKeyViaAPI,
        });
        expect(workflowObj1.status).toEqual(WorkflowStatus.Active);

        const cancelResult1 = await client.cancelWorkflow(workflowId1, {
          authKey: authKeyViaAPI,
        });
        expect(cancelResult1.success).toEqual(true);

        const canceled1 = await client.getWorkflow(workflowId1, {
          authKey: authKeyViaAPI,
        });
        expect(canceled1.status).toEqual(WorkflowStatus.Canceled);

        const workflowProps2 = createFromTemplate(wallet.address);
        const workflow2 = client.createWorkflow(workflowProps2);
        workflowId2 = await client.submitWorkflow(workflow2, {
          authKey: authKeyViaSignature,
        });

        const workflowObj2 = await client.getWorkflow(workflowId2, {
          authKey: authKeyViaSignature,
        });
        expect(workflowObj2.status).toEqual(WorkflowStatus.Active);

        const cancelResult2 = await client.cancelWorkflow(workflowId2, {
          authKey: authKeyViaSignature,
        });

        expect(cancelResult2.success).toEqual(true);

        const canceled2 = await client.getWorkflow(workflowId2, {
          authKey: authKeyViaSignature,
        });
        expect(canceled2.status).toEqual(WorkflowStatus.Canceled);
      } finally {
        if (workflowId1) {
          await client.deleteWorkflow(workflowId1, { authKey: authKeyViaAPI });
        }
        if (workflowId2) {
          await client.deleteWorkflow(workflowId2, {
            authKey: authKeyViaSignature,
          });
        }
      }
    });

    test("deleteWorkflow works with options.authKey", async () => {
      const wallet = await getSmartWallet(client, {
        saltValue: _.toString(saltCounter++),
        authKey: authKeyViaAPI,
      });

      const workflowProps1 = createFromTemplate(wallet.address);
      const workflow1 = client.createWorkflow(workflowProps1);
      const workflowId1 = await client.submitWorkflow(workflow1, {
        authKey: authKeyViaAPI,
      });

      const workflowObj1 = await client.getWorkflow(workflowId1, {
        authKey: authKeyViaAPI,
      });
      expect(workflowObj1.status).toEqual(WorkflowStatus.Active);

      const deleteResult1 = await client.deleteWorkflow(workflowId1!, {
        authKey: authKeyViaAPI,
      });
      expect(deleteResult1.success).toEqual(true);

      await expect(async () => {
        await client.getWorkflow(workflowId1!, { authKey: authKeyViaAPI });
      }).rejects.toThrow(/task not found|5 NOT_FOUND: task not found/);

      const workflowProps2 = createFromTemplate(wallet.address);
      const workflow2 = client.createWorkflow(workflowProps2);
      const workflowId2 = await client.submitWorkflow(workflow2, {
        authKey: authKeyViaSignature,
      });

      const workflowObj2 = await client.getWorkflow(workflowId2, {
        authKey: authKeyViaSignature,
      });
      expect(workflowObj2.status).toEqual(WorkflowStatus.Active);

      const deleteResult2 = await client.deleteWorkflow(workflowId2!, {
        authKey: authKeyViaSignature,
      });

      expect(deleteResult2.success).toEqual(true);

      await expect(async () => {
        await client.getWorkflow(workflowId2!, {
          authKey: authKeyViaSignature,
        });
      }).rejects.toThrow(/task not found|5 NOT_FOUND: task not found/);
    });
  });

  describe("Unauthenticated state", () => {
    let authKeyViaSignature: string;
    beforeAll(async () => {
      // Prepare an auth key for the tests
      const { message } = await client.getSignatureFormat(eoaAddress);
      const signature = await generateSignature(message, walletPrivateKey);
      const res = await client.authWithSignature({
        message: message,
        signature: signature,
      });
      authKeyViaSignature = res.authKey;
    });

    test("should return auth key when using API key", async () => {
      const apiKeyPayload = await generateAuthPayloadWithApiKey(
        eoaAddress,
        avsApiKey
      );
      const res = await client.authWithAPIKey(apiKeyPayload);

      expect(res).toBeDefined();
      expect(res).toHaveProperty("authKey");

      // Check if the key is a valid JWT token
      const keyParts = res.authKey.split(".");
      expect(keyParts).toHaveLength(3);

      // The format of the parsed key payload is
      // {
      //   "iss": "AvaProtocol",
      //   "exp": number
      // }

      // Decode the base64 token and check the payload
      const payload = JSON.parse(Buffer.from(keyParts[1], "base64").toString());

      // Verify all expected payload fields
      expect(payload).toHaveProperty("iss", "AvaProtocol");
      expect(payload).toHaveProperty("exp");
    });

    test("should return auth key when using EOA signature", async () => {
      const { message } = await client.getSignatureFormat(eoaAddress);
      const signature = await generateSignature(message, walletPrivateKey);
      const res = await client.authWithSignature({
        message: message,
        signature: signature,
      });

      expect(res).toBeDefined();
      expect(res).toHaveProperty("authKey");

      // Check if the key is a valid JWT token
      const keyParts = res.authKey.split(".");
      expect(keyParts).toHaveLength(3);

      // Decode the base64 token and check the payload
      const payload = JSON.parse(Buffer.from(keyParts[1], "base64").toString());
      expect(payload).toHaveProperty("iss", "AvaProtocol");
      expect(payload).toHaveProperty("sub");
      expect(payload.sub).toMatch(/^0x[a-fA-F0-9]{40}$/); // Ethereum address format
      expect(payload).toHaveProperty("exp");
    });

    test("getWallet should throw error", async () => {
      client.setAuthKey(undefined);
      await expect(getSmartWallet(client)).rejects.toThrow(
        /User authentication error|unauthenticated/i
      );
    });

    test("getWallets should throw error", async () => {
      await expect(client.getWallets()).rejects.toThrow(
        /User authentication error|unauthenticated/i
      );
    });

    test("createWorkflow should throw error", async () => {
      const wallet = await getSmartWallet(client, {
        saltValue: _.toString(saltCounter++),
        authKey: authKeyViaSignature,
      });

      client.setAuthKey(undefined);
      await expect(
        client.submitWorkflow(
          client.createWorkflow(createFromTemplate(wallet.address))
        )
      ).rejects.toThrow(/User Auth key is invalid|unauthenticated/i);
    });

    test("getWorkflow should throw error", async () => {
      // Prepare a legit workflowId on the server
      const wallet = await getSmartWallet(client, {
        saltValue: _.toString(saltCounter++),
        authKey: authKeyViaSignature,
      });
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow, {
          authKey: authKeyViaSignature,
        });

        client.setAuthKey(undefined);
        await expect(client.getWorkflow(workflowId)).rejects.toThrow(
          /User authentication error|unauthenticated/i
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId, {
            authKey: authKeyViaSignature,
          });
        }
      }
    });

    test("getWorkflows should throw error", async () => {
      client.setAuthKey(undefined);
      await expect(client.getWorkflows([eoaAddress])).rejects.toThrow(
        /User authentication error|unauthenticated/i
      );
    });

    test("cancelWorkflow should throw error", async () => {
      // Prepare a legit workflowId on the server
      const wallet = await getSmartWallet(client, {
        saltValue: _.toString(saltCounter++),
        authKey: authKeyViaSignature,
      });
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow, {
          authKey: authKeyViaSignature,
        });

        client.setAuthKey(undefined);
        await expect(client.cancelWorkflow(workflowId)).rejects.toThrow(
          /User authentication error|unauthenticated/i
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId, {
            authKey: authKeyViaSignature,
          });
        }
      }
    });

    test("deleteWorkflow should throw error", async () => {
      // Prepare a legit workflowId on the server
      const wallet = await getSmartWallet(client, {
        saltValue: _.toString(saltCounter++),
        authKey: authKeyViaSignature,
      });
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow, {
          authKey: authKeyViaSignature,
        });

        client.setAuthKey(undefined);
        await expect(client.deleteWorkflow(workflowId)).rejects.toThrow(
          /User authentication error|unauthenticated/i
        );
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId, {
            authKey: authKeyViaSignature,
          });
        }
      }
    });
  });
});
