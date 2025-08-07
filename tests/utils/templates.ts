import { Edge, NodeFactory, TriggerFactory } from "@avaprotocol/sdk-js";
import {
  NodeProps,
  ContractWriteNodeProps,
  ContractReadNodeProps,
  ETHTransferNodeProps,
  RestAPINodeProps,
  CustomCodeNodeProps,
  GraphQLQueryNodeProps,
  BranchNodeProps,
  WorkflowProps,
} from "@avaprotocol/types";
import { getNextId } from "./utils";
import { NodeType, TriggerType, CustomCodeLang } from "@avaprotocol/types";
import { ethers } from "ethers";
import { factoryProxyAbi } from "./abis";

// Lazy-load configuration to handle CI/CD environments gracefully
async function getTestConfig() {
  try {
    const { getConfig } = await import("./envalid");
    return getConfig();
  } catch (error) {
    console.warn(
      "⚠️ Environment validation failed in templates, using mock config:",
      error
    );
    // Return mock config for CI/CD or when real credentials aren't available
    return {};
  }
}

export const defaultTriggerId = getNextId();

export const ethTransferNodeProps: ETHTransferNodeProps = {
  id: getNextId(),
  name: "sendETH",
  type: NodeType.ETHTransfer,
  data: {
    destination: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    amount: "1000000000000000", // 0.001 ETH in wei (decimal string) - reduced from 1 ETH
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
export const createContractWriteNodeProps = async (
  owner: string,
  salt: string
): Promise<ContractWriteNodeProps> => {
  return {
    id: getNextId(),
    name: "create account",
    type: NodeType.ContractWrite,
    data: {
      contractAddress: "0x0000000000000000000000000000000000000000", // Will be replaced by aggregator's default factory
      contractAbi: factoryProxyAbi,
      methodCalls: [
        {
          methodName: "createAccount",
          methodParams: [salt],
        },
      ],
    },
  };
};

export const createContractReadNodeProps = async (
  owner: string,
  salt: string
): Promise<ContractReadNodeProps> => {
  return {
    id: getNextId(),
    name: "get account address",
    type: NodeType.ContractRead,
    data: {
      contractAddress: "0x0000000000000000000000000000000000000000", // Will be replaced by aggregator's default factory
      contractAbi: factoryProxyAbi,
      methodCalls: [
        {
          methodName: "getAddress",
          methodParams: [salt],
        },
      ],
    },
  };
};

const graphqlQueryNodeProps: GraphQLQueryNodeProps = {
  id: getNextId(),
  name: "graphql_call",
  type: NodeType.GraphQLQuery,
  data: {
    url: "http://localhost:3000/graphql",
    query: `query TestQuery {
        test {
          id
          value
        }
      }`,
    variablesMap: [["test", "true"]],
  },
};

const branchNodeProps: BranchNodeProps = {
  id: getNextId(),
  name: "branch",
  type: NodeType.Branch,
  data: {
    conditions: [
      { id: "b1", type: "if", expression: "foo >= 5" },
      { id: "b2", type: "if", expression: "foo <= -1" },
      { id: "b3", type: "else", expression: "" },
    ],
  },
};

const customCodeNodeProps: CustomCodeNodeProps = {
  id: getNextId(),
  name: "customCode",
  type: NodeType.CustomCode,
  data: {
    lang: CustomCodeLang.JavaScript,
    source: "return { foo: 'bar' };",
  },
};

export const NodesTemplate = [customCodeNodeProps];

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
  let nodesList: NodeProps[];

  if (nodes === undefined) {
    // Use default template when nodes is not provided
    nodesList = NodesTemplate;
  } else if (nodes.length === 0) {
    // When empty array is explicitly passed, use a minimal no-op node
    // This handles cases where tests want to test triggers in isolation
    nodesList = [
      {
        id: getNextId(),
        name: "minimal_node",
        type: NodeType.CustomCode,
        data: {
          lang: CustomCodeLang.JavaScript,
          source: "return {};", // Minimal no-op code
        },
      } as CustomCodeNodeProps,
    ];
  } else {
    // Use provided nodes
    nodesList = nodes;
  }

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
