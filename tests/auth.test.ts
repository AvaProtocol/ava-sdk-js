import _ from "lodash";
import { Client } from "@avaprotocol/sdk-js";
import { GetKeyRequestSignature, WorkflowStatus } from "@avaprotocol/types";
import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  generateAuthPayloadWithApiKey,
  requireEnvVar,
  compareResults,
  SaltGlobal,
  removeCreatedWorkflows,
} from "./utils";
import { FACTORY_ADDRESS, createFromTemplate } from "./templates";

// Update the dotenv configuration
dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });

// Get environment variables with type safety
const { TEST_API_KEY, TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_API_KEY: requireEnvVar("TEST_API_KEY"),
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

// Map of created workflows and isDeleting status tracking of those that need to be cleaned up after the test
const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.Auth * 1000; // Salt index 0 - 999

describe("Authentication Tests", () => {
  let client: Client;
  let eoaAddress: string; // user's EOA wallet address

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

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdIdMap);
  });

  describe("Authenticated with client.authKey", () => {
    beforeAll(async () => {
      console.log("Authenticating with signature ...");
      const signature = await generateSignature(TEST_PRIVATE_KEY);
      const res = await client.authWithSignature(signature);

      client.setAuthKey(res.authKey);
    });

    test("getWallet works with client.authKey", async () => {
      const saltValue = _.toString(saltIndex++);
      const result = await client.getWallet({ salt: saltValue });

      expect(result).toBeDefined();
      expect(result?.address).toHaveLength(42);
      expect(result?.salt).toEqual(saltValue);
      expect(result?.factory).toEqual(FACTORY_ADDRESS);
    });

    test("getWallets works with client.authKey", async () => {
      const saltValue = _.toString(saltIndex++);

      // ensure at least one wallet is created. the call is idempotent
      await client.getWallet({ salt: saltValue });

      const wallets = await client.getWallets();
      expect(wallets.length).toBeGreaterThanOrEqual(1);

      const foundWallet = wallets.find((wallet) => wallet.salt === saltValue);
      expect(foundWallet).toBeDefined();
      expect(foundWallet?.address).toHaveLength(42);
      expect(foundWallet?.salt).toEqual(saltValue);
      expect(foundWallet?.factory).toEqual(FACTORY_ADDRESS);
    });

    test("createWorkflow works with client.authKey", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
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
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
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
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow);

        const listResult1 = await client.getWorkflows([wallet.address]);
        expect(listResult1.result.length).toBeGreaterThanOrEqual(1);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("cancelWorkflow works with client.authKey", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow);

        const workflowObj = await client.getWorkflow(workflowId);
        expect(workflowObj.status).toEqual(WorkflowStatus.Active);

        const cancelResult = await client.cancelWorkflow(workflowId);
        expect(cancelResult).toEqual(true);

        const canceled = await client.getWorkflow(workflowId);
        expect(canceled.status).toEqual(WorkflowStatus.Canceled);
      } finally {
        if (workflowId) {
          await client.deleteWorkflow(workflowId);
        }
      }
    });

    test("deleteWorkflow works with client.authKey", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      let workflowId: string | undefined;

      const workflowProps = createFromTemplate(wallet.address);
      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      const workflowObj = await client.getWorkflow(workflowId);
      expect(workflowObj.status).toEqual(WorkflowStatus.Active);

      expect(await client.deleteWorkflow(workflowId!)).toEqual(true);

      await expect(async () => {
        await client.getWorkflow(workflowId!);
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
      const saltValue = _.toString(saltIndex++);

      const wallet = await client.getWallet(
        { salt: saltValue },
        { authKey: authKeyViaAPI }
      );

      expect(wallet).toHaveProperty("address");
      expect(wallet).toHaveProperty("salt", saltValue);
      expect(wallet).toHaveProperty("factory", FACTORY_ADDRESS);

      const res2 = await client.getWallet(
        { salt: saltValue },
        { authKey: authKeyViaSignature }
      );
      expect(res2).toHaveProperty("address");
      expect(res2).toHaveProperty("salt", saltValue);
      expect(res2).toHaveProperty("factory", FACTORY_ADDRESS);
    });

    test("createWorkflow works with options.authKey", async () => {
      const wallet = await client.getWallet(
        { salt: _.toString(saltIndex++) },
        { authKey: authKeyViaAPI }
      );
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
      const wallet = await client.getWallet(
        { salt: _.toString(saltIndex++) },
        { authKey: authKeyViaAPI }
      );
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
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      let workflowId1: string | undefined;
      let workflowId2: string | undefined;

      try {
        const workflowProps1 = createFromTemplate(wallet.address);
        const workflow1 = client.createWorkflow(workflowProps1);
        workflowId1 = await client.submitWorkflow(workflow1);

        const listResult1 = await client.getWorkflows([wallet.address]);
        expect(listResult1.result.length).toBeGreaterThanOrEqual(1);

        const workflowProps2 = createFromTemplate(wallet.address);
        const workflow2 = client.createWorkflow(workflowProps2);
        workflowId2 = await client.submitWorkflow(workflow2);

        const listResult2 = await client.getWorkflows([wallet.address]);
        expect(listResult2.result.length).toBeGreaterThanOrEqual(2);
      } finally {
        if (workflowId1) {
          await client.deleteWorkflow(workflowId1);
        }
        if (workflowId2) {
          await client.deleteWorkflow(workflowId2);
        }
      }
    });

    test("cancelWorkflow works with options.authKey", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      let workflowId1: string | undefined;
      let workflowId2: string | undefined;

      try {
        const workflowProps1 = createFromTemplate(wallet.address);
        const workflow1 = client.createWorkflow(workflowProps1);
        workflowId1 = await client.submitWorkflow(workflow1);

        const workflowObj1 = await client.getWorkflow(workflowId1);
        expect(workflowObj1.status).toEqual(WorkflowStatus.Active);

        expect(
          await client.cancelWorkflow(workflowId1, { authKey: authKeyViaAPI })
        ).toEqual(true);

        const canceled1 = await client.getWorkflow(workflowId1);
        expect(canceled1.status).toEqual(WorkflowStatus.Canceled);

        const workflowProps2 = createFromTemplate(wallet.address);
        const workflow2 = client.createWorkflow(workflowProps2);
        workflowId2 = await client.submitWorkflow(workflow2);

        const workflowObj2 = await client.getWorkflow(workflowId2);
        expect(workflowObj2.status).toEqual(WorkflowStatus.Active);

        expect(
          await client.cancelWorkflow(workflowId2, {
            authKey: authKeyViaSignature,
          })
        ).toEqual(true);

        const canceled2 = await client.getWorkflow(workflowId2);
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
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      let workflowId1: string | undefined;
      let workflowId2: string | undefined;

      const workflowProps1 = createFromTemplate(wallet.address);
      const workflow1 = client.createWorkflow(workflowProps1);
      workflowId1 = await client.submitWorkflow(workflow1);

      const workflowObj1 = await client.getWorkflow(workflowId1);
      expect(workflowObj1.status).toEqual(WorkflowStatus.Active);

      expect(
        await client.deleteWorkflow(workflowId1!, { authKey: authKeyViaAPI })
      ).toEqual(true);

      await expect(async () => {
        await client.getWorkflow(workflowId1!);
      }).rejects.toThrow("5 NOT_FOUND: task not found");

      const workflowProps2 = createFromTemplate(wallet.address);
      const workflow2 = client.createWorkflow(workflowProps2);
      workflowId2 = await client.submitWorkflow(workflow2);

      const workflowObj2 = await client.getWorkflow(workflowId2);
      expect(workflowObj2.status).toEqual(WorkflowStatus.Active);

      expect(
        await client.deleteWorkflow(workflowId2!, {
          authKey: authKeyViaSignature,
        })
      ).toEqual(true);

      await expect(async () => {
        await client.getWorkflow(workflowId2!);
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
      await expect(
        client.getWallet({ salt: _.toString(saltIndex++) })
      ).rejects.toThrow(/unauthenticated/i);
    });

    test("getWallets should throw error", async () => {
      await expect(client.getWallets()).rejects.toThrow(/unauthenticated/i);
    });

    test("createWorkflow should throw error", async () => {
      const wallet = await client.getWallet(
        { salt: _.toString(saltIndex++) },
        {
          authKey: authKeyViaSignature,
        }
      );

      client.setAuthKey(undefined);
      await expect(
        client.submitWorkflow(
          client.createWorkflow(createFromTemplate(wallet.address))
        )
      ).rejects.toThrow(/unauthenticated/i);
    });

    test("getWorkflow should throw error", async () => {
      // Prepare a legit workflowId on the server
      const wallet = await client.getWallet(
        { salt: _.toString(saltIndex++) },
        {
          authKey: authKeyViaSignature,
        }
      );
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow, {
          authKey: authKeyViaSignature,
        });

        client.setAuthKey(undefined);
        await expect(client.getWorkflow(workflowId)).rejects.toThrow(
          /unauthenticated/i
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
        /unauthenticated/i
      );
    });

    test("cancelWorkflow should throw error", async () => {
      // Prepare a legit workflowId on the server
      const wallet = await client.getWallet(
        { salt: _.toString(saltIndex++) },
        {
          authKey: authKeyViaSignature,
        }
      );
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow, {
          authKey: authKeyViaSignature,
        });

        client.setAuthKey(undefined);
        await expect(client.cancelWorkflow(workflowId)).rejects.toThrow(
          /unauthenticated/i
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
      const wallet = await client.getWallet(
        { salt: _.toString(saltIndex++) },
        { authKey: authKeyViaSignature }
      );
      let workflowId: string | undefined;

      try {
        const workflowProps = createFromTemplate(wallet.address);
        const workflow = client.createWorkflow(workflowProps);
        workflowId = await client.submitWorkflow(workflow, {
          authKey: authKeyViaSignature,
        });

        client.setAuthKey(undefined);
        await expect(client.deleteWorkflow(workflowId)).rejects.toThrow(
          /unauthenticated/i
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
