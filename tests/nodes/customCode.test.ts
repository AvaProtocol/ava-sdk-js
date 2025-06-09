import _ from "lodash";
import { describe, beforeAll, expect, it } from "@jest/globals";
import { Client, TriggerFactory, Step } from "@avaprotocol/sdk-js";
import { CustomCodeNodeProps, NodeType, TriggerType, CustomCodeLang } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  SaltGlobal,
  removeCreatedWorkflows,
  getBlockNumber,
} from "../utils/utils";
import { getConfig } from "../utils/envalid";
import { defaultTriggerId, createFromTemplate } from "../utils/templates";

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

const createdIdMap: Map<string, boolean> = new Map();
let saltIndex = SaltGlobal.CreateSecret * 1000 + 500; // Use a different salt range to avoid conflicts

describe("CustomCode Module Imports Tests", () => {
  let client: Client;
  let eoaAddress: string;

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

  afterEach(async () => await removeCreatedWorkflows(client, createdIdMap));

  describe("JavaScript Module Import Tests", () => {
    it("should support lodash module import", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const customCodeNodeProps: CustomCodeNodeProps = {
        id: getNextId(),
        name: "lodash test",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: `
            const _ = require('lodash');
            return _.map([1, 2, 3], n => n * 2);
          `,
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [
        customCodeNodeProps,
      ]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      const workflowId = await client.submitWorkflow(
        client.createWorkflow(workflowProps)
      );

      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: currentBlockNumber + triggerInterval,
        },
        isBlocking: true,
      });

      const executions = await client.getExecutions([workflowId], {
        limit: 1,
      });

      expect(executions.items.length).toBe(1);

      const matchStep: Step | undefined = _.find(
        _.first(executions.items)?.steps,
        (step) => step.id === customCodeNodeProps.id
      );

      if (_.isUndefined(matchStep)) {
        throw new Error(
          "No corresponding match step found for the triggered execution."
        );
      }

      expect(matchStep.output).toEqual([2, 4, 6]);
    });

    it("should support dayjs for date handling", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const customCodeNodeProps: CustomCodeNodeProps = {
        id: getNextId(),
        name: "dayjs test",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.Javascript,
          source: `
            const dayjs = require('dayjs');
            const date = dayjs('2023-01-01');
            return date.format('YYYY-MM-DD');
          `,
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [
        customCodeNodeProps,
      ]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      const workflowId = await client.submitWorkflow(
        client.createWorkflow(workflowProps)
      );

      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: currentBlockNumber + triggerInterval,
        },
        isBlocking: true,
      });

      const executions = await client.getExecutions([workflowId], {
        limit: 1,
      });

      expect(executions.items.length).toBe(1);

      const matchStep: Step | undefined = _.find(
        _.first(executions.items)?.steps,
        (step) => step.id === customCodeNodeProps.id
      );

      if (_.isUndefined(matchStep)) {
        throw new Error(
          "No corresponding match step found for the triggered execution."
        );
      }

      expect(matchStep.output).toEqual("2023-01-01");
    });

    it("should support uuid module import", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const customCodeNodeProps: CustomCodeNodeProps = {
        id: getNextId(),
        name: "uuid test",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.Javascript,
          source: `
            const { v4: uuidv4 } = require('uuid');
            const id = uuidv4();
            return typeof id === 'string' && id.length > 0;
          `,
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [
        customCodeNodeProps,
      ]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      const workflowId = await client.submitWorkflow(
        client.createWorkflow(workflowProps)
      );

      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: currentBlockNumber + triggerInterval,
        },
        isBlocking: true,
      });

      const executions = await client.getExecutions([workflowId], {
        limit: 1,
      });

      expect(executions.items.length).toBe(1);

      const matchStep: Step | undefined = _.find(
        _.first(executions.items)?.steps,
        (step) => step.id === customCodeNodeProps.id
      );

      if (_.isUndefined(matchStep)) {
        throw new Error(
          "No corresponding match step found for the triggered execution."
        );
      }

      expect(matchStep.output).toEqual(true);
    });

    it("should support complex operations with multiple modules", async () => {
      const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
      const currentBlockNumber = await getBlockNumber();
      const triggerInterval = 5;

      const customCodeNodeProps: CustomCodeNodeProps = {
        id: getNextId(),
        name: "complex module test",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.Javascript,
          source: `
            const _ = require('lodash');
            const dayjs = require('dayjs');
            const { v4: uuidv4 } = require('uuid');
            
            const id = uuidv4();
            
            const now = dayjs();
            
            const dates = _.range(0, 3).map(i => 
              dayjs(now).add(i, 'days').format('YYYY-MM-DD')
            );
            
            return {
              id: id,
              today: now.format('YYYY-MM-DD'),
              dates: dates
            };
          `,
        },
      };

      const workflowProps = createFromTemplate(wallet.address, [
        customCodeNodeProps,
      ]);

      workflowProps.trigger = TriggerFactory.create({
        id: defaultTriggerId,
        name: "blockTrigger",
        type: TriggerType.Block,
        data: { interval: triggerInterval },
      });

      const workflowId = await client.submitWorkflow(
        client.createWorkflow(workflowProps)
      );

      await client.triggerWorkflow({
        id: workflowId,
        triggerData: {
          type: TriggerType.Block,
          blockNumber: currentBlockNumber + triggerInterval,
        },
        isBlocking: true,
      });

      const executions = await client.getExecutions([workflowId], {
        limit: 1,
      });

      expect(executions.items.length).toBe(1);

      const matchStep: Step | undefined = _.find(
        _.first(executions.items)?.steps,
        (step) => step.id === customCodeNodeProps.id
      );

      if (_.isUndefined(matchStep)) {
        throw new Error(
          "No corresponding match step found for the triggered execution."
        );
      }

      const output = matchStep.output as any;
      expect(output).toBeDefined();
      expect(typeof output.id).toBe('string');
      expect(output.id.length).toBeGreaterThan(0);
      expect(typeof output.today).toBe('string');
      expect(output.today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Array.isArray(output.dates)).toBe(true);
      expect(output.dates.length).toBe(3);
      output.dates.forEach((date: string) => {
        expect(typeof date).toBe('string');
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });
    });
  });
});
