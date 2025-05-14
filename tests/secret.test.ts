import _ from "lodash";
import { describe, beforeAll, expect, afterEach, it } from "@jest/globals";
import {
  Client,
  NodeFactory,
  TriggerFactory,
  TriggerType,
  Edge,
  CustomCodeNodeProps,
  CustomCodeLangs,
  Step,
} from "@avaprotocol/sdk-js";
import { NodeType } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  SaltGlobal,
  removeCreatedWorkflows,
  submitWorkflowAndQueueForRemoval,
  getBlockNumber,
} from "./utils";
import { getConfig } from "./envalid";
import { defaultTriggerId, createFromTemplate } from "./templates";

// Get environment variables from envalid config
const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.Secrets * 1000; // Salt index 9,000 - 9,999

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

    const signature = await generateSignature(walletPrivateKey);
    const res = await client.authWithSignature(signature);
    client.setAuthKey(res.authKey);

    const eoaAddress2 = await getAddress(
      "0x9c04bbac1942c5398ef520d66936523db8e489ef59fc33e8e66bb13664b45293"
    );
    // Initialize the client with test credentials
    client2 = new Client({
      endpoint: avsEndpoint,
      factoryAddress,
    });
    const signature2 = await generateSignature(
      "0x9c04bbac1942c5398ef520d66936523db8e489ef59fc33e8e66bb13664b45293"
    );
    const res2 = await client.authWithSignature(signature2);
    client2.setAuthKey(res2.authKey);
  });

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("create secret suite", () => {
    it("created secret have value in workflow", async () => {
      const secretName = "secret_name";
      const secretValue = "dummy_value";
      const testMessage = "my secret is ";

      const result = await client.createSecret(secretName, secretValue);
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

      const workflowId = await submitWorkflowAndQueueForRemoval(
        client,
        workflowProps, // Pass the fully constructed workflowProps
        createdIdMap
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

      // Clean up the secret of this test
      await client.deleteSecret(secretName);
    });

    it("create secret at user level succeeds", async () => {
      const inputName = `dummysecret_${getNextId()}`;
      const result = await client.createSecret(inputName, "value");

      expect(result).toBe(true);

      // now we list the secret and it should contain the above
      const secrets = await client.listSecrets();
      const match = _.find(secrets, (item) => item.name === inputName);
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

      expect(result).toBe(true);

      // now we list the secret and it should contain the above
      const secrets = await client.listSecrets();
      const match = _.find(secrets, (item) => item.name === inputName);
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
      const createResultClient2 = await client2.createSecret(
        inputName2,
        "some_value"
      );

      expect(createResultClient1).toBe(true);
      expect(createResultClient2).toBe(true);

      // now we list the secret and it should contain the above
      const listResultClient1 = await client.listSecrets();
      const listResultClient2 = await client2.listSecrets();

      expect(listResultClient1.some((item) => item.name === inputName2)).toBe(
        false
      );

      expect(listResultClient2.some((item) => item.name === inputName1)).toBe(
        false
      );

      // Clean up the secret of this test
      await client.deleteSecret(inputName1);
      await client2.deleteSecret(inputName2);
    });
  });

  describe("delete secret suite", () => {
    it("delete your own secret works", async () => {
      const inputName = `delete_${getNextId()}`;
      await client.createSecret(inputName, "value");

      let secrets = await client.listSecrets();
      expect(secrets.some((item) => item.name === inputName)).toBe(true);

      const deleted = await client.deleteSecret(inputName);
      expect(deleted).toBe(true);

      secrets = await client.listSecrets();
      expect(secrets.some((item) => item.name === inputName)).toBe(false);
    });

    it("delete at workflowId level succeeds", async () => {
      const userLevelName = `abc_${getNextId()}`;
      const workflowLevelName = `def_${getNextId()}`;
      const inputWorkflowId = getNextId();

      // we create 2 secret at different level
      await client.createSecret(userLevelName, "value1");
      await client.createSecret(workflowLevelName, "value2", {
        workflowId: inputWorkflowId,
      });

      let secrets = await client.listSecrets();
      // make sure we got both secret
      expect(secrets.some((item) => item.name === userLevelName)).toBe(true);
      expect(secrets.some((item) => item.name === workflowLevelName)).toBe(
        true
      );

      // Delete the one at workflow level and list again, make sure we deleted the right one
      const deleted = await client.deleteSecret(workflowLevelName, {
        workflowId: inputWorkflowId,
      });

      expect(deleted).toBe(true);

      secrets = await client.listSecrets();
      expect(secrets.some((item) => item.name === userLevelName)).toBe(true);
      expect(secrets.some((item) => item.name === workflowLevelName)).toBe(
        false
      );
    });
  });

  describe("update secret suite", () => {
    // currently we cannot fetch back the value. we had test on the SDK to ensure that
    // Here, we just want to make sure some the update call succesfully
    it("update secret value succesfully", async () => {
      const inputName = `delete_${getNextId()}`;

      await client.createSecret(inputName, "value");

      let secrets = await client.listSecrets();
      expect(secrets.some((item) => item.name === inputName)).toBe(true);

      const updated = await client.updateSecret(inputName, "newvalue");
      expect(updated).toBe(true);

      secrets = await client.listSecrets();
      expect(secrets.some((item) => item.name === inputName)).toBe(true);
    });
  });
});
