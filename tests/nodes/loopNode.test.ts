import { describe, beforeAll, test, expect } from "@jest/globals";
import _ from "lodash";
import {
  Client,
  Edge,
  Workflow,
  NodeFactory,
  TriggerFactory,
  LoopNode,
  CustomCodeLangs,
} from "@avaprotocol/sdk-js";
import {
  LoopNodeData,
} from "@avaprotocol/types";
import { NodeType, WorkflowStatus, TriggerType } from "@avaprotocol/types";
import {
  getAddress,
  generateSignature,
  getNextId,
  TIMEOUT_DURATION,
  SaltGlobal,
} from "../utils/utils";
import { 
  defaultTriggerId, 
  createFromTemplate,
  loopNodeWithRestApiProps,
  loopNodeWithCustomCodeProps,
  loopNodeWithETHTransferProps,
  loopNodeWithContractReadProps,
  loopNodeWithGraphQLQueryProps
} from "../utils/templates";
import { getConfig } from "../utils/envalid";

jest.setTimeout(TIMEOUT_DURATION);

const { avsEndpoint, walletPrivateKey, factoryAddress } = getConfig();

let saltIndex = SaltGlobal.CreateWorkflow * 1000 + 500; // Use a different range than createWorkflow.test.ts


describe("LoopNode Tests", () => {
  let eoaAddress: string;
  let client: Client;
  
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

  test("should create a workflow with a Loop node using RestAPI runner", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address, [loopNodeWithRestApiProps]);
      
      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "setup_test_array",
        type: NodeType.CustomCode,
        data: {
          config: {
            lang: CustomCodeLangs.Javascript,
            source: `
              const testArray = [
                { name: "item1", value: 10 },
                { name: "item2", value: 20 },
                { name: "item3", value: 30 }
              ];
              return { testArray };
            `,
          }
        },
      });
      
      workflowProps.nodes.push(customCodeNode);
      
      workflowProps.edges = [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: customCodeNode.id,
        }),
        new Edge({
          id: getNextId(),
          source: customCodeNode.id,
          target: loopNodeWithRestApiProps.id,
        }),
      ];

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      expect(workflow).toBeDefined();
      expect(workflow).toBeInstanceOf(Workflow);
      expect(workflowId).toBeDefined();
      expect(typeof workflowId).toBe("string");
      
      const getResult = await client.getWorkflow(workflowId);
      expect(getResult).toBeDefined();
      expect(getResult.nodes).toHaveLength(2);
      
      const loopNode = getResult.nodes.find(node => node.type === NodeType.Loop);
      expect(loopNode).toBeDefined();
      expect(loopNode?.name).toBe("loop_with_rest_api");
      
      const loopNodeData = loopNode?.data as LoopNodeData;
      expect(loopNodeData.sourceId).toBe("testArray");
      expect(loopNodeData.iterVal).toBe("item");
      expect(loopNodeData.iterKey).toBe("index");
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should create a workflow with a Loop node using CustomCode runner", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address, [loopNodeWithCustomCodeProps]);
      
      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "setup_test_array",
        type: NodeType.CustomCode,
        data: {
          config: {
            lang: CustomCodeLangs.Javascript,
            source: `
              const testArray = [1, 2, 3, 4, 5];
              return { testArray };
            `,
          }
        },
      });
      
      workflowProps.nodes.push(customCodeNode);
      
      workflowProps.edges = [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: customCodeNode.id,
        }),
        new Edge({
          id: getNextId(),
          source: customCodeNode.id,
          target: loopNodeWithCustomCodeProps.id,
        }),
      ];

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      expect(workflow).toBeDefined();
      expect(workflow).toBeInstanceOf(Workflow);
      expect(workflowId).toBeDefined();
      expect(typeof workflowId).toBe("string");
      
      const getResult = await client.getWorkflow(workflowId);
      expect(getResult).toBeDefined();
      expect(getResult.nodes).toHaveLength(2);
      
      const loopNode = getResult.nodes.find(node => node.type === NodeType.Loop);
      expect(loopNode).toBeDefined();
      expect(loopNode?.name).toBe("loop_with_custom_code");
      
      const loopNodeData = loopNode?.data as LoopNodeData;
      expect(loopNodeData.sourceId).toBe("testArray");
      expect(loopNodeData.iterVal).toBe("item");
      expect(loopNodeData.iterKey).toBe("index");
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
  
  test("should create a workflow with a Loop node using ETHTransfer runner", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address, [loopNodeWithETHTransferProps]);
      
      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "setup_address_array",
        type: NodeType.CustomCode,
        data: {
          config: {
            lang: CustomCodeLangs.Javascript,
            source: `
              const addressArray = [
                "0x1234567890123456789012345678901234567890",
                "0x2345678901234567890123456789012345678901",
                "0x3456789012345678901234567890123456789012"
              ];
              return { addressArray };
            `,
          }
        },
      });
      
      workflowProps.nodes.push(customCodeNode);
      
      workflowProps.edges = [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: customCodeNode.id,
        }),
        new Edge({
          id: getNextId(),
          source: customCodeNode.id,
          target: loopNodeWithETHTransferProps.id,
        }),
      ];

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      expect(workflow).toBeDefined();
      expect(workflow).toBeInstanceOf(Workflow);
      expect(workflowId).toBeDefined();
      expect(typeof workflowId).toBe("string");
      
      const getResult = await client.getWorkflow(workflowId);
      expect(getResult).toBeDefined();
      expect(getResult.nodes).toHaveLength(2);
      
      const loopNode = getResult.nodes.find(node => node.type === NodeType.Loop);
      expect(loopNode).toBeDefined();
      expect(loopNode?.name).toBe("loop_with_eth_transfer");
      
      const loopNodeData = loopNode?.data as LoopNodeData;
      expect(loopNodeData.sourceId).toBe("addressArray");
      expect(loopNodeData.iterVal).toBe("address");
      expect(loopNodeData.iterKey).toBe("index");
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
  
  test("should create a workflow with a Loop node using ContractRead runner", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address, [loopNodeWithContractReadProps]);
      
      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "setup_contract_array",
        type: NodeType.CustomCode,
        data: {
          config: {
            lang: CustomCodeLangs.Javascript,
            source: `
              const contractArray = [
                { 
                  address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", 
                  callData: "0x06fdde03", 
                  abi: '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]'
                },
                { 
                  address: "0x6b175474e89094c44da98b954eedeac495271d0f", 
                  callData: "0x06fdde03", 
                  abi: '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]'
                }
              ];
              return { contractArray };
            `,
          }
        },
      });
      
      workflowProps.nodes.push(customCodeNode);
      
      workflowProps.edges = [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: customCodeNode.id,
        }),
        new Edge({
          id: getNextId(),
          source: customCodeNode.id,
          target: loopNodeWithContractReadProps.id,
        }),
      ];

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      expect(workflow).toBeDefined();
      expect(workflow).toBeInstanceOf(Workflow);
      expect(workflowId).toBeDefined();
      expect(typeof workflowId).toBe("string");
      
      const getResult = await client.getWorkflow(workflowId);
      expect(getResult).toBeDefined();
      expect(getResult.nodes).toHaveLength(2);
      
      const loopNode = getResult.nodes.find(node => node.type === NodeType.Loop);
      expect(loopNode).toBeDefined();
      expect(loopNode?.name).toBe("loop_with_contract_read");
      
      const loopNodeData = loopNode?.data as LoopNodeData;
      expect(loopNodeData.sourceId).toBe("contractArray");
      expect(loopNodeData.iterVal).toBe("contract");
      expect(loopNodeData.iterKey).toBe("index");
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });

  test("should create a workflow with a Loop node using GraphQLQuery runner", async () => {
    const wallet = await client.getWallet({ salt: _.toString(saltIndex++) });
    let workflowId: string | undefined;

    try {
      const workflowProps = createFromTemplate(wallet.address, [loopNodeWithGraphQLQueryProps]);
      
      const customCodeNode = NodeFactory.create({
        id: getNextId(),
        name: "setup_query_array",
        type: NodeType.CustomCode,
        data: {
          config: {
            lang: CustomCodeLangs.Javascript,
            source: `
              const queryArray = [
                { id: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" },
                { id: "0x6b175474e89094c44da98b954eedeac495271d0f" },
                { id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" }
              ];
              return { queryArray };
            `,
          }
        },
      });
      
      workflowProps.nodes.push(customCodeNode);
      
      workflowProps.edges = [
        new Edge({
          id: getNextId(),
          source: defaultTriggerId,
          target: customCodeNode.id,
        }),
        new Edge({
          id: getNextId(),
          source: customCodeNode.id,
          target: loopNodeWithGraphQLQueryProps.id,
        }),
      ];

      const workflow = client.createWorkflow(workflowProps);
      workflowId = await client.submitWorkflow(workflow);

      expect(workflow).toBeDefined();
      expect(workflow).toBeInstanceOf(Workflow);
      expect(workflowId).toBeDefined();
      expect(typeof workflowId).toBe("string");
      
      const getResult = await client.getWorkflow(workflowId);
      expect(getResult).toBeDefined();
      expect(getResult.nodes).toHaveLength(2);
      
      const loopNode = getResult.nodes.find(node => node.type === NodeType.Loop);
      expect(loopNode).toBeDefined();
      expect(loopNode?.name).toBe("loop_with_graphql_query");
      
      const loopNodeData = loopNode?.data as LoopNodeData;
      expect(loopNodeData.sourceId).toBe("queryArray");
      expect(loopNodeData.iterVal).toBe("query");
      expect(loopNodeData.iterKey).toBe("index");
    } finally {
      if (workflowId) {
        await client.deleteWorkflow(workflowId);
      }
    }
  });
});
