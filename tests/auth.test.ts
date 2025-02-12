import Client from "@/sdk-js/dist";
import { GetKeyRequestSignature, WorkflowStatus } from "@/types/dist";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  generateAuthPayloadWithApiKey,
  requireEnvVar,
  queueForRemoval,
  removeCreatedWorkflows,
  compareResults,
} from "./utils";
import { FACTORY_ADDRESS, WorkflowTemplate } from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_API_KEY, TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_API_KEY: requireEnvVar("TEST_API_KEY"),
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows and isDeleting status tracking of those that need to be cleaned up after the test
const createdWorkflows: Map<string, boolean> = new Map();

describe("Authentication Tests", () => {
  let client: Client;
  let eoaAddress: string; // user’s EOA wallet address

  beforeAll(async () => {
    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
      factoryAddress: FACTORY_ADDRESS,
    });

    // Generate the address here
    const address = await getAddress(TEST_PRIVATE_KEY);
    eoaAddress = address;
  });

  afterAll(async () => await removeCreatedWorkflows(client, createdWorkflows));

  describe("Authenticated with client.authKey", () => {
    beforeAll(async () => {
      console.log("Authenticating with signature ...");
      const signature = await generateSignature(TEST_PRIVATE_KEY);
      const res = await client.authWithSignature(signature);

      client.setAuthKey(res.authKey);
    });

    test("getWallet works with client.authKey", async () => {
      const result = await client.getWallet({ salt: "123" });

      expect(result).toBeDefined();
      expect(result?.address).toHaveLength(42);
      expect(result?.salt).toEqual("123");
      expect(result?.factory).toEqual(FACTORY_ADDRESS);
    });

    test("getWallets works with client.authKey", async () => {
      // ensure at least one wallet is created. the call is idempotent
      await client.getWallet({ salt: "123" });

      const wallets = await client.getWallets();
      expect(wallets.length).toBeGreaterThanOrEqual(1);

      expect(wallets[0]).toHaveProperty("address");
      expect(wallets[0]?.salt).toEqual("123"0);
      expect(wallets[0]).toHaveProperty("factory", FACTORY_ADDRESS);
    });

    test("createWorkflow works with client.authKey", async () => {
      const wallet = await client.getWallet({ salt: "345" });

      const workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        })
      );

      queueForRemoval(createdWorkflows, workflowId);

      expect(workflowId).toHaveLength(26);
    });

    test("getWorkflow works with client.authKey", async () => {
      const wallet = await client.getWallet({ salt: "0" });

      const createResult = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        })
      );
      queueForRemoval(createdWorkflows, createResult);

      const getResponse = await client.getWorkflow(createResult);
      compareResults(
        {
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
          id: createResult,
          status: WorkflowStatus.Active,
          owner: eoaAddress,
        },
        getResponse
      );
    });

    test("getWorkflows works with client.authKey", async () => {
      // Remove any workflows created in previous tests
      await removeCreatedWorkflows(client, createdWorkflows);

      const wallet = await client.getWallet({ salt: "8" });

      // populate tasks for default wallet and the custom salt smart wallet above
      const createdId1 = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        })
      );
      queueForRemoval(createdWorkflows, createdId1);

      console.log("Getting workflows for wallet:", wallet.address);
      const listResult1 = await client.getWorkflows([wallet.address]);
      expect(listResult1.result.length).toBeGreaterThanOrEqual(1);
    });

    test("cancelWorkflow works with client.authKey", async () => {
      const wallet = await client.getWallet({ salt: "0" });

      const workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        })
      );
      queueForRemoval(createdWorkflows, workflowId);

      const workflow = await client.getWorkflow(workflowId);
      expect(workflow.status).toEqual(WorkflowStatus.Active);

      const cancelResult = await client.cancelWorkflow(workflowId);
      expect(cancelResult).toEqual(true);

      const canceled = await client.getWorkflow(workflowId);
      expect(canceled.status).toEqual(WorkflowStatus.Canceled);
    });

    test("deleteWorkflow works with client.authKey", async () => {
      const wallet = await client.getWallet({ salt: "0" });

      const workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        })
      );
      queueForRemoval(createdWorkflows, workflowId);

      const workflow = await client.getWorkflow(workflowId);
      expect(workflow.status).toEqual(WorkflowStatus.Active);

      expect(await client.deleteWorkflow(workflowId)).toEqual(true);

      await expect(async () => {
        await client.getWorkflow(workflowId);
      }).rejects.toThrow("5 NOT_FOUND: task not found");
    });
  });

  describe("Authenticated with options.authKey", () => {
    let authKeyViaAPI: string;
    let authKeyViaSignature: string;
    beforeAll(async () => {
      console.log("Authenticating with API key ...");
      const res = await client.authWithAPIKey(
        generateAuthPayloadWithApiKey(eoaAddress, TEST_API_KEY)
      );

      authKeyViaAPI = res.authKey;

      console.log("Authenticating with signature ...");
      const sigObject: GetKeyRequestSignature = await generateSignature(
        TEST_PRIVATE_KEY
      );

      const res2 = await client.authWithSignature(sigObject);

      authKeyViaSignature = res2.authKey;
    });

    test("getWallet works with options.authKey", async () => {
      const testSalt = "123";

      const wallet = await client.getWallet(
        { salt: testSalt },
        { authKey: authKeyViaAPI }
      );

      expect(wallet).toHaveProperty("address");
      expect(wallet).toHaveProperty("salt", testSalt);
      expect(wallet).toHaveProperty("factory", FACTORY_ADDRESS);

      const res2 = await client.getWallet(
        { salt: testSalt },
        { authKey: authKeyViaSignature }
      );
      expect(res2).toHaveProperty("address");
      expect(res2).toHaveProperty("salt", testSalt);
      expect(res2).toHaveProperty("factory", FACTORY_ADDRESS);
    });

    test("getWallets works with options.authKey", async () => {
      const wallets = await client.getWallets({ authKey: authKeyViaAPI });
      expect(wallets.length).toBeGreaterThanOrEqual(1);

      expect(wallets[0]).toHaveProperty("address");
      expect(wallets[0]).toHaveProperty("salt", "0");
      expect(wallets[0]).toHaveProperty("factory", FACTORY_ADDRESS);

      const wallets2 = await client.getWallets({
        authKey: authKeyViaSignature,
      });
      expect(wallets2.length).toBeGreaterThanOrEqual(1);
    });

    test("createWorkflow works with options.authKey", async () => {
      const wallet = await client.getWallet(
        { salt: "345" },
        { authKey: authKeyViaAPI }
      );

      const workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        }),
        { authKey: authKeyViaAPI }
      );

      queueForRemoval(createdWorkflows, workflowId);
      expect(workflowId).toHaveLength(26);

      const workflowId2 = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        }),
        { authKey: authKeyViaSignature }
      );

      queueForRemoval(createdWorkflows, workflowId2);
      expect(workflowId2).toHaveLength(26);
    });

    test("getWorkflow works with options.authKey", async () => {
      const wallet = await client.getWallet(
        { salt: "0" },
        { authKey: authKeyViaAPI }
      );

      const createResult = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        })
      );
      queueForRemoval(createdWorkflows, createResult);

      const getResponse = await client.getWorkflow(createResult, {
        authKey: authKeyViaAPI,
      });

      compareResults(
        {
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
          id: createResult,
          status: WorkflowStatus.Active,
          owner: eoaAddress,
        },
        getResponse
      );

      const getResponse2 = await client.getWorkflow(createResult, {
        authKey: authKeyViaSignature,
      });

      compareResults(
        {
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
          id: createResult,
          status: WorkflowStatus.Active,
          owner: eoaAddress,
        },
        getResponse2
      );
    });

    test("getWorkflows works with options.authKey", async () => {
      // Remove any workflows created in previous tests
      await removeCreatedWorkflows(client, createdWorkflows);

      const wallet = await client.getWallet({ salt: "8" });

      // populate tasks for default wallet and the custom salt smart wallet above
      const createdId1 = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        }),
        { authKey: authKeyViaAPI }
      );
      queueForRemoval(createdWorkflows, createdId1);

      const listResult1 = await client.getWorkflows([wallet.address]);
      expect(listResult1.result.length).toBeGreaterThanOrEqual(1);

      const createdId2 = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        }),
        { authKey: authKeyViaSignature }
      );
      queueForRemoval(createdWorkflows, createdId2);

      const listResult2 = await client.getWorkflows([wallet.address]);
      expect(listResult2.result.length).toBeGreaterThanOrEqual(2);
    });

    test("cancelWorkflow works with options.authKey", async () => {
      const wallet = await client.getWallet({ salt: "0" });

      const workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        })
      );
      queueForRemoval(createdWorkflows, workflowId);

      const workflow = await client.getWorkflow(workflowId);
      expect(workflow.status).toEqual(WorkflowStatus.Active);

      expect(
        await client.cancelWorkflow(workflowId, { authKey: authKeyViaAPI })
      ).toEqual(true);

      const canceled = await client.getWorkflow(workflowId);
      expect(canceled.status).toEqual(WorkflowStatus.Canceled);

      const workflowId2 = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        })
      );
      queueForRemoval(createdWorkflows, workflowId2);

      const workflow2 = await client.getWorkflow(workflowId2);
      expect(workflow2.status).toEqual(WorkflowStatus.Active);

      expect(
        await client.cancelWorkflow(workflowId2, {
          authKey: authKeyViaSignature,
        })
      ).toEqual(true);

      const canceled2 = await client.getWorkflow(workflowId2);
      expect(canceled2.status).toEqual(WorkflowStatus.Canceled);
    });

    test("deleteWorkflow works with options.authKey", async () => {
      const wallet = await client.getWallet({ salt: "0" });

      const workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        })
      );
      queueForRemoval(createdWorkflows, workflowId);

      const workflow = await client.getWorkflow(workflowId);
      expect(workflow.status).toEqual(WorkflowStatus.Active);

      expect(
        await client.deleteWorkflow(workflowId, { authKey: authKeyViaAPI })
      ).toEqual(true);

      await expect(async () => {
        await client.getWorkflow(workflowId);
      }).rejects.toThrow("5 NOT_FOUND: task not found");

      const workflowId2 = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        })
      );
      queueForRemoval(createdWorkflows, workflowId);

      const workflow2 = await client.getWorkflow(workflowId2);
      expect(workflow2.status).toEqual(WorkflowStatus.Active);

      expect(
        await client.deleteWorkflow(workflowId2, {
          authKey: authKeyViaSignature,
        })
      ).toEqual(true);

      await expect(async () => {
        await client.getWorkflow(workflowId2);
      }).rejects.toThrow("5 NOT_FOUND: task not found");
    });
  });

  describe("Unauthenticated state", () => {
    let authKeyViaSignature: string;
    beforeAll(async () => {
      // Prepare an auth key for the tests
      const signature = await generateSignature(TEST_PRIVATE_KEY);
      const res = await client.authWithSignature(signature);
      authKeyViaSignature = res.authKey;
    });

    test("should return auth key when using API key", async () => {
      const res = await client.authWithAPIKey(
        generateAuthPayloadWithApiKey(eoaAddress, TEST_API_KEY)
      );

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
      const signature = await generateSignature(TEST_PRIVATE_KEY);

      if (!signature) {
        throw new Error(
          "Signature could not be generated. Make sure TEST_PRIVATE_KEY is set in the .env.test file"
        );
      }

      const res = await client.authWithSignature(signature);

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
      await expect(client.getWallet({ salt: "1" })).rejects.toThrowError(
        /unauthenticated/i
      );
    });

    test("getWallets should throw error", async () => {
      await expect(client.getWallets()).rejects.toThrowError(
        /unauthenticated/i
      );
    });

    test("createWorkflow should throw error", async () => {
      const wallet = await client.getWallet(
        { salt: "1" },
        {
          authKey: authKeyViaSignature,
        }
      );

      client.setAuthKey(undefined);
      await expect(
        client.submitWorkflow(
          client.createWorkflow({
            ...WorkflowTemplate,
            smartWalletAddress: wallet.address,
          })
        )
      ).rejects.toThrowError(/unauthenticated/i);
    });

    test("getWorkflow should throw error", async () => {
      // Prepare a legit workflowId on the server
      const wallet = await client.getWallet(
        { salt: "1" },
        {
          authKey: authKeyViaSignature,
        }
      );
      const workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        }),
        { authKey: authKeyViaSignature }
      );

      client.setAuthKey(undefined);
      await expect(client.getWorkflow(workflowId)).rejects.toThrowError(
        /unauthenticated/i
      );
    });

    test("getWorkflows should throw error", async () => {
      client.setAuthKey(undefined);
      await expect(client.getWorkflows([eoaAddress])).rejects.toThrowError(
        /unauthenticated/i
      );
    });

    test("cancelWorkflow should throw error", async () => {
      // Prepare a legit workflowId on the server
      const wallet = await client.getWallet(
        { salt: "1" },
        {
          authKey: authKeyViaSignature,
        }
      );
      const workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        }),
        { authKey: authKeyViaSignature }
      );

      client.setAuthKey(undefined);
      await expect(client.cancelWorkflow(workflowId)).rejects.toThrowError(
        /unauthenticated/i
      );
    });

    test("deleteWorkflow should throw error", async () => {
      // Prepare a legit workflowId on the server
      const wallet = await client.getWallet(
        { salt: "1" },
        { authKey: authKeyViaSignature }
      );

      console.log("Submitting workflow ...ƒ");
      const workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          smartWalletAddress: wallet.address,
        }),
        { authKey: authKeyViaSignature }
      );

      client.setAuthKey(undefined);
      await expect(client.deleteWorkflow(workflowId)).rejects.toThrowError(
        /unauthenticated/i
      );
    });
  });
});
