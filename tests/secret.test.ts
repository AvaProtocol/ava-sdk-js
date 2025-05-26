import _ from "lodash";
import { describe, beforeAll, expect, it } from "@jest/globals";
import {
  Client,
  CustomCodeLangs,
  CustomCodeNodeProps,
  TriggerFactory,
  Step,
} from "@avaprotocol/sdk-js";
import {
  ListSecretsResponse,
  ListSecretResponse,
  SecretRequestOptions,
  NodeType,
  TriggerType,
} from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  SaltGlobal,
  removeCreatedWorkflows,
  removeCreatedSecrets,
  cleanupSecrets,
  getBlockNumber,
} from "./utils";
import { getConfig } from "./envalid";
import { defaultTriggerId, createFromTemplate } from "./templates";

function getSecretItems(
  response: ListSecretsResponse | ListSecretResponse[]
): ListSecretResponse[] {
  if (Array.isArray(response)) {
    return response;
  }
  return response.items || [];
}

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
const createdSecretMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.Secrets * 1000; // Salt index 9,000 - 9,999
const privateKey2 =
  "0x9c04bbac1942c5398ef520d66936523db8e489ef59fc33e8e66bb13664b45293";

describe("secret Tests", () => {
  let client: Client;
  let client2: Client;

  beforeAll(async () => {
    const eoaAddress = await getAddress(walletPrivateKey);

    // Initialize the client with test credentials
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

    const eoaAddress2 = await getAddress(privateKey2);

    console.log("Client 2 address:", eoaAddress2);
    // Initialize the client with test credentials
    client2 = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });

    const { message: message2 } = await client2.getSignatureFormat(eoaAddress2);
    const signature2 = await generateSignature(message2, privateKey2);
    const res2 = await client2.authWithSignature({
      message: message2,
      signature: signature2,
    });

    client2.setAuthKey(res2.authKey);

    // Clean up any existing secrets before starting tests
    await cleanupSecrets(client);
    await cleanupSecrets(client2);
  });

  afterEach(async () => {
    await removeCreatedWorkflows(client, createdIdMap);
    await removeCreatedSecrets(client, createdSecretMap);
  });

  describe("create secret suite", () => {
    it("created secret have value in workflow", async () => {
      const secretName = "secret_name";
      const secretValue = "dummy_value";
      const testMessage = "my secret is ";

      const result = await client.createSecret(secretName, secretValue);
      createdSecretMap.set(secretName, false);
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      expect(result).toBe(true);

      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });

      const customCodeNodeProps: CustomCodeNodeProps = {
        id: getNextId(),
        name: "custom code",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLangs.JAVASCRIPT,
          source: `return '${testMessage}' + apContext.configVars['${secretName}']`,
        },
      };

      // Use createFromTemplate and pass the specific node needed for this test
      const workflowProps = createFromTemplate(wallet.address, [
        customCodeNodeProps,
      ]);

      // Override the trigger if necessary, though the default from createFromTemplate might be fine
      // For this specific test, the default trigger (block trigger with interval 5) should work
      // as it will connect to the single customCodeNodeProps.
      // The maxExecution is already 1 by default from createFromTemplate.

      // Adjust trigger data if different from default
      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId, // Ensure using the consistent defaultTriggerId from templates.ts
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval }, // Use the triggerInterval defined in this test
      });

      const workflowId = await client.submitWorkflow(
        client.createWorkflow(workflowProps)
      );

      await client.triggerWorkflow({
        id: workflowId,
        reason: {
          type: TriggerType.Block,
          blockNumber: currentBlockNumber + triggerInterval,
        },
        isBlocking: true,
      });

      let executions = await client.getExecutions([workflowId], {
        limit: 1,
      });

      // Find the execution step that contains the secret value
      expect(executions.result.length).toBe(1);

      const matchStep: Step | undefined = _.find(
        _.first(executions.result)?.stepsList,
        (step) => step.nodeId === customCodeNodeProps.id
      );

      if (_.isUndefined(matchStep)) {
        throw new Error(
          "No corresponding match step found for the triggered execution."
        );
      }

      // Verify that the output data of CustomCode node contains the actual secret value
      expect(matchStep.output).toEqual(testMessage + secretValue);
    });

    it("create secret at user level succeeds", async () => {
      const inputName = `dummysecret_${getNextId()}`;
      const result = await client.createSecret(inputName, "value");
      createdSecretMap.set(inputName, false);

      expect(result).toBe(true);

      // now we list the secret and it should contain the above
      const secretsResponse = await client.getSecrets();
      const secretItems = getSecretItems(secretsResponse);
      const match = _.find(secretItems, (item) => item.name === inputName);
      expect(match?.name).toEqual(inputName);

      // Clean up the secret of this test
      await client.deleteSecret(inputName);
    });

    it("create secret at workflow level", async () => {
      const inputName = `dummysecret_${getNextId()}`;
      const inputWorkflowId = getNextId();
      const result = await client.createSecret(inputName, "value", {
        workflowId: inputWorkflowId,
      });
      createdSecretMap.set(inputName, false);

      expect(result).toBe(true);

      // now we list the secret and it should contain the above
      const secretsResponse = await client.getSecrets();
      const secretItems = getSecretItems(secretsResponse);
      const match = _.find(secretItems, (item) => item.name === inputName);
      expect(match?.name).toEqual(inputName);
      expect(match?.workflowId).toEqual(inputWorkflowId);

      // Clean up the secret of this test
      await client.deleteSecret(inputName);
    });

    // TODO: add test for create secret at org level
    it("create secret at org level succeeds", async () => {
      // const inputName = `dummysecret_${getNextId()}`;
      // const orgId = getNextId();
      // const result = await client.createSecret(inputName, "value", {
      //   orgId,
      // });
      // expect(result).toBe(true);
      // // now we list the secret and it should contain the above
      // const secrets = await client.listSecrets();
      // const match = _.find(secrets, (item) => item.name === inputName);
      // expect(match?.name).toEqual(inputName);
      // expect(match?.orgId).toEqual(orgId);
      // Clean up the secret of this test
      // await client.deleteSecret(inputName);
    });

    it("secrets from different eoaAddress do not cross", async () => {
      const inputName1 = `testdup1_${getNextId()}`;
      const inputName2 = `testdup2_${getNextId()}`;

      // The two clients are initialized with different eoaAddress,
      // so they should not be able to view each other's secrets
      const createResultClient1 = await client.createSecret(
        inputName1,
        "some_value"
      );
      createdSecretMap.set(inputName1, false);

      const createResultClient2 = await client2.createSecret(
        inputName2,
        "some_value"
      );
      createdSecretMap.set(inputName2, false);

      expect(createResultClient1).toBe(true);
      expect(createResultClient2).toBe(true);

      // now we list the secret and it should contain the above
      const listResultClient1 = await client.getSecrets();
      const listResultClient2 = await client2.getSecrets();

      const client1Items = getSecretItems(listResultClient1);
      const client2Items = getSecretItems(listResultClient2);

      expect(
        client1Items.some(
          (item: ListSecretResponse) => item.name === inputName2
        )
      ).toBe(false);

      expect(
        client2Items.some(
          (item: ListSecretResponse) => item.name === inputName1
        )
      ).toBe(false);
    });
  });

  describe("delete secret suite", () => {
    it("delete your own secret works", async () => {
      const inputName = `delete_${getNextId()}`;
      await client.createSecret(inputName, "value");
      createdSecretMap.set(inputName, false);

      let secretsResponse = await client.getSecrets();
      const items = getSecretItems(secretsResponse);
      expect(items.some((item) => item.name === inputName)).toBe(true);

      const deleted = await client.deleteSecret(inputName);
      expect(deleted).toBe(true);

      secretsResponse = await client.getSecrets();
      const updatedItems = getSecretItems(secretsResponse);
      expect(updatedItems.some((item) => item.name === inputName)).toBe(false);
    });

    it("delete at workflowId level succeeds", async () => {
      const userLevelName = `abc_${getNextId()}`;
      const workflowLevelName = `def_${getNextId()}`;
      const inputWorkflowId = getNextId();

      // we create 2 secret at different level
      await client.createSecret(userLevelName, "value1");
      createdSecretMap.set(userLevelName, false);

      await client.createSecret(workflowLevelName, "value2", {
        workflowId: inputWorkflowId,
      });
      createdSecretMap.set(workflowLevelName, false);

      let secretsResponse = await client.getSecrets();
      // make sure we got both secret
      const secretItems = getSecretItems(secretsResponse);
      expect(secretItems.some((item) => item.name === userLevelName)).toBe(
        true
      );
      expect(secretItems.some((item) => item.name === workflowLevelName)).toBe(
        true
      );

      // Delete the one at workflow level and list again, make sure we deleted the right one
      const deleted = await client.deleteSecret(workflowLevelName, {
        workflowId: inputWorkflowId,
      });

      expect(deleted).toBe(true);

      secretsResponse = await client.getSecrets();
      const afterDeleteItems = getSecretItems(secretsResponse);
      expect(afterDeleteItems.some((item) => item.name === userLevelName)).toBe(
        true
      );
      expect(
        afterDeleteItems.some((item) => item.name === workflowLevelName)
      ).toBe(false);
    });
  });

  describe("update secret suite", () => {
    // currently we cannot fetch back the value. we had test on the SDK to ensure that
    // Here, we just want to make sure some the update call succesfully
    it("update secret value succesfully", async () => {
      const inputName = `delete_${getNextId()}`;

      await client.createSecret(inputName, "value");
      createdSecretMap.set(inputName, false);

      let secretsResponse = await client.getSecrets();
      const items = getSecretItems(secretsResponse);
      expect(items.some((item) => item.name === inputName)).toBe(true);

      const updated = await client.updateSecret(inputName, "newvalue");
      expect(updated).toBe(true);

      secretsResponse = await client.getSecrets();
      const finalItems = getSecretItems(secretsResponse);
      expect(finalItems.some((item) => item.name === inputName)).toBe(true);
    });
  });

  describe("pagination suite", () => {
    const secretNames: string[] = [];
    const secretPrefix = `paged_${Date.now()}_`;

    beforeAll(async () => {
      for (let i = 0; i < 10; i++) {
        const name = `${secretPrefix}${i}`;
        await client.createSecret(name, `value_${i}`);
        secretNames.push(name);
        createdSecretMap.set(name, false);
      }
    });

    it("should support forward pagination with after parameter", async () => {
      const pageSize = 3;
      const options = { limit: pageSize } as SecretRequestOptions;
      console.log("Requesting first page with options:", options);

      const firstPage = await client.getSecrets(options);
      console.log("First page response:", JSON.stringify(firstPage, null, 2));

      const firstPageItems = getSecretItems(firstPage);
      console.log("First page items count:", firstPageItems.length);
      console.log(
        "First page items:",
        firstPageItems.map((item) => item.name)
      );

      expect(firstPageItems.length).toBeLessThanOrEqual(pageSize);

      if (Array.isArray(firstPage)) {
        console.log("First page is an array (legacy format)");
        return;
      }

      const typedFirstPage = firstPage as ListSecretsResponse;
      console.log("First page cursor:", typedFirstPage.cursor);
      console.log("First page hasMore:", typedFirstPage.hasMore);

      expect(typedFirstPage.cursor).toBeTruthy();
      expect(typedFirstPage.hasMore).toBe(true);

      const secondOptions = {
        after: typedFirstPage.cursor,
        limit: pageSize,
      } as SecretRequestOptions;
      console.log("Requesting second page with options:", secondOptions);

      const secondPage = await client.getSecrets(secondOptions);
      console.log("Second page response:", JSON.stringify(secondPage, null, 2));

      const secondPageItems = getSecretItems(secondPage);
      console.log("Second page items count:", secondPageItems.length);
      console.log(
        "Second page items:",
        secondPageItems.map((item) => item.name)
      );

      expect(secondPageItems.length).toBeLessThanOrEqual(pageSize);

      const firstPageNames = firstPageItems.map((item) => item.name);
      const secondPageNames = secondPageItems.map((item) => item.name);
      console.log("First page names:", firstPageNames);
      console.log("Second page names:", secondPageNames);

      const overlap = firstPageNames.filter((name) =>
        secondPageNames.includes(name)
      );
      console.log("Overlapping items:", overlap);
      expect(overlap.length).toBe(0);
    });

    it("should support backward pagination with before parameter", async () => {
      const middleOptions = { limit: 3 } as SecretRequestOptions;
      const middlePage = await client.getSecrets(middleOptions);

      if (Array.isArray(middlePage)) {
        return;
      }

      const typedMiddlePage = middlePage as ListSecretsResponse;
      const previousOptions = {
        before: typedMiddlePage.cursor,
        limit: 3,
      } as SecretRequestOptions;
      const previousPage = await client.getSecrets(previousOptions);

      const previousPageItems = getSecretItems(previousPage);
      const middlePageItems = getSecretItems(middlePage);

      // Verify that we got items in both pages
      expect(previousPageItems.length).toBeGreaterThan(0);
      expect(middlePageItems.length).toBeGreaterThan(0);

      // Verify that the previous page has the hasMore field
      if (!Array.isArray(previousPage)) {
        expect(typeof previousPage.cursor).toBe("string");
        expect(typeof previousPage.hasMore).toBe("boolean");
      }
    });

    it("should respect the limit parameter", async () => {
      const smallOptions = { limit: 2 } as SecretRequestOptions;
      const smallPage = await client.getSecrets(smallOptions);

      const largerOptions = { limit: 5 } as SecretRequestOptions;
      const largerPage = await client.getSecrets(largerOptions);

      const smallPageItems = getSecretItems(smallPage);
      const largerPageItems = getSecretItems(largerPage);

      expect(smallPageItems.length).toBeLessThanOrEqual(2);
      expect(largerPageItems.length).toBeLessThanOrEqual(5);

      expect(largerPageItems.length).toBeGreaterThanOrEqual(
        smallPageItems.length
      );
    });

    it("should filter secrets by workflowId", async () => {
      const workflowId = getNextId();
      const workflowSecretName = `${secretPrefix}_workflow_${Date.now()}`;

      await client.createSecret(workflowSecretName, "workflow_value", {
        workflowId,
      });
      createdSecretMap.set(workflowSecretName, false);

      const filteredSecrets = await client.getSecrets({
        workflowId,
      });

      const items = getSecretItems(filteredSecrets);

      expect(items.some((item) => item.name === workflowSecretName)).toBe(true);
    });

    it("should throw error with an invalid limit", async () => {
      // Invalid cursor should throw INVALID_ARGUMENT
      await expect(client.getSecrets({ limit: -1 })).rejects.toThrowError(
        /INVALID_ARGUMENT/i
      );
    });

    it("should throw error with an invalid before or after", async () => {
      // Invalid cursor should throw INVALID_ARGUMENT
      await expect(
        client.getSecrets({ before: "invalid-cursor" })
      ).rejects.toThrowError(/INVALID_ARGUMENT/i);

      await expect(
        client.getSecrets({ after: "invalid-cursor" })
      ).rejects.toThrowError(/INVALID_ARGUMENT/i);
    });
  });
});
