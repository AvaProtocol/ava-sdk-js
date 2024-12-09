import _ from "lodash";
import { UlidMonotonic } from "id128";
import {
  Edge,
  NodeFactory,
  NodeTypes,
  TriggerFactory,
  TriggerTypes,
  BlockTriggerProps,
  NodeProps,
  ContractWriteNodeProps,
  ContractReadNodeProps,
  ETHTransferNodeProps,
  RestAPINodeProps,
  CustomCodeNodeProps,
  GraphQLQueryNodeProps,
  BranchNodeProps,
  CustomCodeLangs,
} from "../dist";

export const FACTORY_ADDRESS = "0x29adA1b5217242DEaBB142BC3b1bCfFdd56008e7";

/**
 * Node templates
 */
const contractWriteNodeProps: ContractWriteNodeProps = {
  id: UlidMonotonic.generate().toCanonical(),
  name: "transfer token",
  type: NodeTypes.CONTRACT_WRITE,
  data: {
    contractAddress: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    callData: "0x123cdef",
    contractAbi: `[
      {
        "type": "event",
        "name": "Transfer",
        "inputs": [
          { "indexed": true, "type": "address", "name": "from" },
          { "indexed": true, "type": "address", "name": "to" },
          { "indexed": false, "type": "uint256", "name": "value" }
        ]
      }
    ]`,
  },
};

const contractReadNodeProps: ContractReadNodeProps = {
  id: UlidMonotonic.generate().toCanonical(),
  name: "read token balance",
  type: NodeTypes.CONTRACT_READ,
  data: {
    contractAddress: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    callData: "0x123cdef",
    contractAbi: `[
      {
        "type": "event",
        "name": "Transfer",
        "inputs": [
          { "indexed": true, "type": "address", "name": "from" },
          { "indexed": true, "type": "address", "name": "to" },
          { "indexed": false, "type": "uint256", "name": "value" }
        ]
      }
    ]`,
  },
};

const ethTransferNodeProps: ETHTransferNodeProps = {
  id: UlidMonotonic.generate().toCanonical(),
  name: "send eth",
  type: NodeTypes.ETH_TRANSFER,
  data: {
    destination: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    amount: "0x123cdef",
  },
};

const restApiNodeProps: RestAPINodeProps = {
  id: UlidMonotonic.generate().toCanonical(),
  name: "rest api call",
  type: NodeTypes.REST_API,
  data: {
    url: "http://endpoint002",
    method: "post",
    body: `{"a":1}`,
    headersMap: [["Content-Type", "application/json"]],
  },
};

const graphqlQueryNodeProps: GraphQLQueryNodeProps = {
  id: UlidMonotonic.generate().toCanonical(),
  name: "graphql call",
  type: NodeTypes.GRAPHQL_DATA_QUERY,
  data: {
    url: "http://endpoint003",
    query: `foo bar`,
    variablesMap: [["foo", "bar"]],
  },
};

const branchNodeProps: BranchNodeProps = {
  id: UlidMonotonic.generate().toCanonical(),
  name: "branch",
  type: NodeTypes.BRANCH,
  data: {
    conditionsList: [
      { id: "b1", type: "if", expression: "foo >= 5" },
      { id: "b2", type: "if", expression: "foo <= -1" },
      { id: "b3", type: "else", expression: "" },
    ],
  },
};

const customCodeNodeProps: CustomCodeNodeProps = {
  id: UlidMonotonic.generate().toCanonical(),
  name: "custom code",
  type: NodeTypes.CUSTOM_CODE,
  data: {
    lang: CustomCodeLangs.JAVASCRIPT,
    source: "foo bar",
  },
};

export const NodesTemplate: NodeProps[] = [contractWriteNodeProps];
export const EdgesTemplate = [
  {
    id: UlidMonotonic.generate().toCanonical(),
    source: "__TRIGGER__",
    target: NodesTemplate[0].id,
  },
];

/**
 * Workflow templates
 */
export const WorkflowTemplate = {
  nodes: NodeFactory.createNodes(NodesTemplate),
  edges: _.map(EdgesTemplate, (edge) => new Edge(edge)),
  trigger: TriggerFactory.create({
    name: "blockTrigger",
    type: TriggerTypes.BLOCK,
    data: { interval: 5 },
  }),
  startAt: Math.floor(Date.now() / 1000) + 30,
  expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
  maxExecution: 1,
};

const nodes = [
  contractReadNodeProps,
  ethTransferNodeProps,
  restApiNodeProps,
  graphqlQueryNodeProps,
  branchNodeProps,
  customCodeNodeProps,
];

const edges = [
  {
    id: UlidMonotonic.generate().toCanonical(),
    source: "__TRIGGER__",
    target: nodes[0].id,
  },
  {
    id: UlidMonotonic.generate().toCanonical(),
    source: nodes[0].id,
    target: nodes[1].id,
  },
  {
    id: UlidMonotonic.generate().toCanonical(),
    source: nodes[1].id,
    target: nodes[2].id,
  },
  {
    id: UlidMonotonic.generate().toCanonical(),
    source: nodes[2].id,
    target: nodes[3].id,
  },
  {
    id: UlidMonotonic.generate().toCanonical(),
    source: nodes[3].id,
    target: nodes[4].id,
  },
  {
    id: UlidMonotonic.generate().toCanonical(),
    source: nodes[3].id,
    target: nodes[4].id,
  },
];

export const MultiNodeWithBranch = {
  nodes: NodeFactory.createNodes(nodes),
  edges: _.map(edges, (edge) => new Edge(edge)),
  trigger: TriggerFactory.create({
    name: "blockTrigger",
    type: TriggerTypes.BLOCK,
    data: { interval: 5 },
  }),
  startAt: Math.floor(Date.now() / 1000) + 30,
  expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
  memo: `Test task`,
  maxExecution: 1,
};
