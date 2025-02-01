import { describe, beforeAll, test, expect } from "@jest/globals";
import Client, {
  Secret
} from "@/sdk-js/dist";

import dotenv from "dotenv";
import path from "path";
import {
  getAddress, generateSignature, requireEnvVar, getNextId
} from "./utils";

import { EXPIRED_AT, FACTORY_ADDRESS, WorkflowTemplate } from "./templates";

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

    const signature = await generateSignature(TEST_PRIVATE_KEY, EXPIRED_AT);
    const res = await client.authWithSignature(signature);
    client.setAuthKey(res.authKey);


    const eoaAddress2 = await getAddress('0x9c04bbac1942c5398ef520d66936523db8e489ef59fc33e8e66bb13664b45293');
    // Initialize the client with test credentials
    client2 = new Client({
      endpoint: ENDPOINT,
      factoryAddress: FACTORY_ADDRESS,
    });
    const signature2 = await generateSignature('0x9c04bbac1942c5398ef520d66936523db8e489ef59fc33e8e66bb13664b45293', EXPIRED_AT);
    const res2 = await client.authWithSignature(signature2);
    client2.setAuthKey(res2.authKey);
  });

  describe("create secret", () => {
    it("create secret succesfully", async() => {
      const secret = new Secret({
        name: `dummysecret_${getNextId()}`,
      })

      const result = await client.createSecret(secret);
      expect(result).toBe(true);

      // now we list the secret and it should contain the above
      const secrets = await client.listSecrets();
      const match = secrets.find(item => item.name === secret.name)
      expect(match.name).toEqual(secret.name);
    });

    it("create secret at correct level", async() => {
      const secret = new Secret({
        name: `dummysecret_${getNextId()}`,
        workflowId: getNextId(),
      })

      const result = await client.createSecret(secret);
      expect(result).toBe(true);

      // now we list the secret and it should contain the above
      const secrets = await client.listSecrets();
      const match = secrets.find(item => item.name === secret.name)
      expect(match.name).toEqual(secret.name);
      expect(match.workflowId).toEqual(secret.workflowId);
    });

    it("cannot view others secret", async() => {
      const secret1 = new Secret({
        name: `testdup1_${getNextId()}`,
      })
      const secret2 = new Secret({
        name: `testdup2_${getNextId()}`,
      })

      const result1 = await client.createSecret(secret1);
      const result2 = await client2.createSecret(secret2);

      expect(result1).toBe(true);
      expect(result2).toBe(true);

      // now we list the secret and it should contain the above
      const secrets1 = await client.listSecrets();
      const secrets2 = await client2.listSecrets();
      expect(
          secrets1.some(item => item.name === secret2.name)
      ).toBe(false);
    });
  });

  describe("deleteSecret", () => {
    it("delete your own secret works", async() => {
      const secret1 = new Secret({
        name: `delete_${getNextId()}`,
        secret: "value",
      })
      const result = await client.createSecret(secret1);
      let secrets = await client.listSecrets();
      expect(
        secrets.some(item => item.name === secret1.name)
      ).toBe(true);

      const deleted= await client.deleteSecret({
        name: secret1.name,
      });
      expect(deleted).toBe(true);

      secrets = await client.listSecrets();
      expect(
        secrets.some(item => item.name === secret1.name)
      ).toBe(false);
    });

    it("delete at correct level", async() => {
      const secret1 = new Secret({
        name: `abc_${getNextId()}`,
        secret: "value",
      });
      const secret2 = new Secret({
        name: `def_${getNextId()}`,
        secret: "value",
        workflowId: getNextId(),
      });

      await client.createSecret(secret1);
      await client.createSecret(secret2);
      let secrets = await client.listSecrets();
      expect(
        secrets.some(item => item.name === secret1.name)
      ).toBe(true);
      expect(
        secrets.some(item => item.name === secret2.name)
      ).toBe(true);

      const deleted= await client.deleteSecret({
        name: secret2.name,
        workflowId: secret2.workflowId,
      });
      expect(deleted).toBe(true);

      secrets = await client.listSecrets();
      expect(
        secrets.some(item => item.name === secret1.name)
      ).toBe(true);
      expect(
        secrets.some(item => item.name === secret2.name)
      ).toBe(false);
    });



  });

  describe("updateSecret", () => {
    // currently we cannot fetch back the value. we had test on the SDK to ensure that
    // Here, we just want to make sure some the update call succesfully
    it("update secret value succesfully", async() => {
      const secret = new Secret({
        name: `delete_${getNextId()}`,
        secret: "value",
      })
      let result = await client.createSecret(secret);
      expect(result).toBe(true);

      let secrets = await client.listSecrets();
      expect(
        secrets.some(item => item.name === secret.name)
      ).toBe(true);

      secret.secret = "newvalue";
      result = await client.updateSecret(secret);
      expect(result).toBe(true);

      secrets = await client.listSecrets();
      expect(
        secrets.some(item => item.name === secret.name)
      ).toBe(true);


    });
  });


});
