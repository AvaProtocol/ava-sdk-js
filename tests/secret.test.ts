import _ from "lodash";
import util from "util";
import { describe, beforeAll, expect } from "@jest/globals";
import Client, {
  CustomCodeLangs,
  CustomCodeNodeProps,
  Edge,
  Execution,
  NodeFactory,
  StepProps,
  TriggerFactory,
  TriggerType,
} from "@/sdk-js/dist";

import dotenv from "dotenv";
import path from "path";
import {
  getAddress,
  generateSignature,
  requireEnvVar,
  getNextId,
  getBlockNumber,
} from "./utils";

import {
  defaultTriggerId,
  FACTORY_ADDRESS,
  WorkflowTemplate,
} from "./templates";
import { NodeType } from "@/types/dist";

dotenv.config({ path: path.resolve(__dirname, "..", ".env.test") });
const { TEST_PRIVATE_KEY, ENDPOINT } = {
  TEST_PRIVATE_KEY: requireEnvVar("TEST_PRIVATE_KEY"),
  ENDPOINT: requireEnvVar("ENDPOINT"),
} as const;

describe("secret Tests", () => {
  let client: Client;
  let client2: Client;

  beforeAll(async () => {
    const eoaAddress = await getAddress(TEST_PRIVATE_KEY);

    // Initialize the client with test credentials
    client = new Client({
      endpoint: ENDPOINT,
      factoryAddress: FACTORY_ADDRESS,
    });

    const signature = await generateSignature(TEST_PRIVATE_KEY);
    const res = await client.authWithSignature(signature);
    client.setAuthKey(res.authKey);

    const eoaAddress2 = await getAddress(
      "0x9c04bbac1942c5398ef520d66936523db8e489ef59fc33e8e66bb13664b45293"
    );
    // Initialize the client with test credentials
    client2 = new Client({
      endpoint: ENDPOINT,
      factoryAddress: FACTORY_ADDRESS,
    });
    const signature2 = await generateSignature(
      "0x9c04bbac1942c5398ef520d66936523db8e489ef59fc33e8e66bb13664b45293"
    );
    const res2 = await client.authWithSignature(signature2);
    client2.setAuthKey(res2.authKey);
  });

  describe("create secret suite", () => {
    it("created secret have value in workflow", async () => {
      const result = await client.createSecret("secrete_name", "secret_value");
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      expect(result).toBe(true);

      const wallet = await client.getWallet({ salt: "345" });

      const customCodeNodeProps: CustomCodeNodeProps = {
        id: getNextId(),
        name: "custom code",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLangs.JAVASCRIPT,
          // source: "console.log('foo bar')",
          source: "return {{secret.secrete_name}}",
        },
      };

      const edges = [
        {
          id: getNextId(),
          source: WorkflowTemplate.trigger.id,
          target: customCodeNodeProps.id,
        },
      ];

      const workflowId = await client.submitWorkflow(
        client.createWorkflow({
          ...WorkflowTemplate,
          trigger: TriggerFactory.create({
            id: defaultTriggerId,
            name: "blockTrigger",
            type: TriggerType.Block,
            data: { interval: triggerInterval },
          }),
          nodes: NodeFactory.createNodes([customCodeNodeProps]),
          edges: _.map(edges, (edge) => new Edge(edge)),
          smartWalletAddress: wallet.address,
          maxExecution: 1,
        })
      );

      await client.triggerWorkflow({
        id: workflowId,
        data: {
          type: TriggerType.Block,
          blockNumber: currentBlockNumber + triggerInterval * 2, // Make sure we have enough block buffer to trigger 1 execution
        },
        isBlocking: true,
      });

      let executions = await client.getExecutions([workflowId], {
        limit: 1,
      });

      expect(executions.result.length).toBe(1);
      // console.log("executions", util.inspect(executions, { depth: 6 }));

      const matchStep: StepProps | undefined = _.find(
        _.first(executions.result)?.stepsList,
        (step) => step.nodeId === customCodeNodeProps.id
      );

      expect(matchStep).toBeDefined();

      console.log("matchStep", util.inspect(matchStep, { depth: 4 }));
      
      // TODO: validate the secret variable is converted to code

      // Clean up the secret of this test
      await client.deleteSecret("secrete_name");
      await client.deleteWorkflow(workflowId);
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
