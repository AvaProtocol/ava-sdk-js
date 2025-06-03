import _ from "lodash";
import {
  Edge,
  NodeFactory,
  TriggerFactory,
  CustomCodeLangs,
} from "@avaprotocol/sdk-js";
import {
  NodeProps,
  ContractWriteNodeProps,
  ContractReadNodeProps,
  ETHTransferNodeProps,
  RestAPINodeProps,
  CustomCodeNodeProps,
  GraphQLQueryNodeProps,
  BranchNodeProps,
  FilterNodeProps,
  WorkflowProps,
} from "@avaprotocol/types";
import { getNextId } from "./utils";
import { NodeType, TriggerType } from "@avaprotocol/types";
import { ethers } from "ethers";
import { factoryProxyAbi } from "./abis";

import { getConfig } from "./envalid";

const { factoryAddress } = getConfig();

export const defaultTriggerId = getNextId();

export const ethTransferNodeProps: ETHTransferNodeProps = {
  id: getNextId(),
  name: "send eth",
  type: NodeType.ETHTransfer,
  data: {
    destination: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    amount: "1000000000000000000", // 1 ETH in wei (decimal string)
  },
};

//  Write to the proxy of our factory contract 0xB99BC2E399e06CddCF5E725c0ea341E8f0322834
// {
//   "chainId": 11155111,
//   "data": "0x5fbfb9cf000000000000000000000000c60e71bd0f2e6d8832fea1a2d56091c48493c7880000000000000000000000000000000000000000000000000000000000000000",
//   "from": "0xc60e71bd0f2e6d8832fea1a2d56091c48493c788",
//   "gas": "0x77258",
//   "gasPrice": "0x2a1f99",
//   "nonce": "0x8",
//   "to": "0xB99BC2E399e06CddCF5E725c0ea341E8f0322834"
// }
export const createContractWriteNodeProps = (
  owner: string,
  salt: string
): ContractWriteNodeProps => {
  // Encode the createAccount function call
  const contract = new ethers.Contract(factoryAddress, factoryProxyAbi);
  const callData = contract.interface.encodeFunctionData("createAccount", [
    owner,
    ethers.toBigInt(salt),
  ]);

  return {
    id: getNextId(),
    name: "create account",
    type: NodeType.ContractWrite,
    data: {
      contractAddress: factoryAddress,
      callData,
      contractAbi: factoryProxyAbi,
    },
  };
};

export const createContractReadNodeProps = (
  owner: string,
  salt: string
): ContractReadNodeProps => {
  // Encode the getAddress function call
  const contract = new ethers.Contract(factoryAddress, factoryProxyAbi);
  const callData = contract.interface.encodeFunctionData("getAddress", [
    owner,
    ethers.toBigInt(salt),
  ]);

  return {
    id: getNextId(),
    name: "get account address",
    type: NodeType.ContractRead,
    data: {
      config: {
        contractAddress: factoryAddress,
        callData,
        contractAbi: factoryProxyAbi,
      }
    },
  };
};

export const restApiNodeProps: RestAPINodeProps = {
  id: getNextId(),
  name: "rest_api_call",
  type: NodeType.RestAPI,
  data: {
    config: {
      url: "http://localhost:3000/api/test",
      method: "post",
      body: `{"test": true}`,
      headersMap: [["Content-Type", "application/json"]],
    }
  },
};

export const filterNodeProps: FilterNodeProps = {
  id: getNextId(),
  name: "filterNode",
  type: NodeType.Filter,
  data: {
    config: {
      sourceId: "rest_api_call",
      expression: "value >= 1",
    }
  },
};

const graphqlQueryNodeProps: GraphQLQueryNodeProps = {
  id: getNextId(),
  name: "graphql call",
  type: NodeType.GraphQLQuery,
  data: {
    config: {
      url: "http://localhost:3000/graphql",
      query: `query TestQuery {
        test {
          id
          value
        }
      }`,
      variablesMap: [["test", "true"]],
    }
  },
};

const branchNodeProps: BranchNodeProps = {
  id: getNextId(),
  name: "branch",
  type: NodeType.Branch,
  data: {
    conditionsList: [
      { id: "b1", type: "if", expression: "foo >= 5" },
      { id: "b2", type: "if", expression: "foo <= -1" },
      { id: "b3", type: "else", expression: "" },
    ],
  },
};

const customCodeNodeProps: CustomCodeNodeProps = {
  id: getNextId(),
  name: "custom code",
  type: NodeType.CustomCode,
  data: {
    config: {
      lang: CustomCodeLangs.JAVASCRIPT,
      source: "foo bar",
    }
  },
};

export const NodesTemplate = [ethTransferNodeProps];

// Programmatically create edges from nodes
const createEdgesFromNodes = (nodes: NodeProps[]): Edge[] => {
  return nodes.map((node, index) => {
    if (index === 0) {
      // First edge connects trigger to first node
      return new Edge({
        id: getNextId(),
        source: defaultTriggerId,
        target: node.id,
      });
    }
    // Connect each node to the next one
    return new Edge({
      id: getNextId(),
      source: nodes[index - 1].id,
      target: node.id,
    });
  });
};

/**
 * Workflow templates
 */
export const createFromTemplate = (
  address: string,
  nodes?: NodeProps[]
): WorkflowProps => {
  const nodesList = nodes || NodesTemplate;
  const now = Date.now(); // Get current time in milliseconds

  return {
    smartWalletAddress: address,
    nodes: NodeFactory.createNodes(nodesList),
    edges: createEdgesFromNodes(nodesList),
    trigger: TriggerFactory.create({
      id: defaultTriggerId,
      name: "blockTrigger",
      type: TriggerType.Block,
      data: { interval: 5 },
    }),
    startAt: now,
    expiredAt: now + 3600 * 24 * 30 * 1000, // Current time + 30 days in milliseconds
    maxExecution: 1,
  } as WorkflowProps;
};

const nodes = [
  ethTransferNodeProps,
  restApiNodeProps,
  graphqlQueryNodeProps,
  branchNodeProps,
  customCodeNodeProps,
];

export const MultiNodeWithBranch = {
  nodes: NodeFactory.createNodes(nodes),
  edges: createEdgesFromNodes(nodes),
  trigger: TriggerFactory.create({
    id: defaultTriggerId,
    name: "blockTrigger",
    type: TriggerType.Block,
    data: { interval: 5 },
  }),
  startAt: Date.now(),
  expiredAt: Date.now() + 3600 * 24 * 30 * 1000, // Current time + 30 days in milliseconds
  name: `Test task`,
  maxExecution: 1,
};

export const blockTriggerEvery5 = TriggerFactory.create({
  id: defaultTriggerId,
  name: "blockTrigger",
  type: TriggerType.Block,
  data: { interval: 5 },
});

// Import Loop node templates
import {
  loopNodeWithRestApiProps,
  loopNodeWithCustomCodeProps,
  loopNodeWithETHTransferProps,
  loopNodeWithContractReadProps,
  loopNodeWithGraphQLQueryProps,
} from "./templates/loopNode";

// Export Loop node templates
export {
  loopNodeWithRestApiProps,
  loopNodeWithCustomCodeProps,
  loopNodeWithETHTransferProps,
  loopNodeWithContractReadProps,
  loopNodeWithGraphQLQueryProps,
};
