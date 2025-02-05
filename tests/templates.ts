import _ from "lodash";
import {
  Edge,
  NodeFactory,
  NodeProps,
  TriggerFactory,
  TriggerType,
  ContractWriteNodeProps,
  ContractReadNodeProps,
  ETHTransferNodeProps,
  RestAPINodeProps,
  CustomCodeNodeProps,
  GraphQLQueryNodeProps,
  BranchNodeProps,
  CustomCodeLangs,
  FilterNodeProps,
} from "@/sdk-js/dist";
import { getNextId } from "./utils";
import { NodeType } from "@/types/dist";
export const FACTORY_ADDRESS = "0x29adA1b5217242DEaBB142BC3b1bCfFdd56008e7";

export const defaultTriggerId = getNextId();

/**
 * Node templates
 */
const contractWriteNodeProps: ContractWriteNodeProps = {
  id: getNextId(),
  name: "transfer token",
  type: NodeType.ContractWrite,
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
  id: getNextId(),
  name: "read token balance",
  type: NodeType.ContractRead,
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
  id: getNextId(),
  name: "send eth",
  type: NodeType.ETHTransfer,
  data: {
    destination: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    amount: "0x123cdef",
  },
};

export const restApiNodeProps: RestAPINodeProps = {
  id: getNextId(),
  name: "rest_api_call",
  type: NodeType.RestAPI,
  data: {
    url: "http://endpoint002",
    method: "post",
    body: `{"a":1}`,
    headersMap: [["Content-Type", "application/json"]],
  },
};

export const filterNodeProps: FilterNodeProps  = {
  id: getNextId(),
  name: "filterNode",
  type: NodeType.Filter,
  data: {
    input: "rest_api_call",
    expression: "value >= 1",
  },
};

const graphqlQueryNodeProps: GraphQLQueryNodeProps = {
  id: getNextId(),
  name: "graphql call",
  type: NodeType.GraphQLQuery,
  data: {
    url: "http://endpoint003",
    query: `foo bar`,
    variablesMap: [["foo", "bar"]],
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
    lang: CustomCodeLangs.JAVASCRIPT,
    source: "foo bar",
  },
};

export const NodesTemplate: NodeProps[] = [contractWriteNodeProps];
export const EdgesTemplate = [
  {
    id: getNextId(),
    source: defaultTriggerId,
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
    id: defaultTriggerId,
    name: "blockTrigger",
    type: TriggerType.Block,
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
    id: getNextId(),
    source: defaultTriggerId,
    target: nodes[0].id,
  },
  {
    id: getNextId(),
    source: nodes[0].id,
    target: nodes[1].id,
  },
  {
    id: getNextId(),
    source: nodes[1].id,
    target: nodes[2].id,
  },
  {
    id: getNextId(),
    source: nodes[2].id,
    target: nodes[3].id,
  },
  {
    id: getNextId(),
    source: nodes[3].id,
    target: nodes[4].id,
  },
  {
    id: getNextId(),
    source: nodes[3].id,
    target: nodes[4].id,
  },
];

export const MultiNodeWithBranch = {
  nodes: NodeFactory.createNodes(nodes),
  edges: _.map(edges, (edge) => new Edge(edge)),
  trigger: TriggerFactory.create({
    id: defaultTriggerId,
    name: "blockTrigger",
    type: TriggerType.Block,
    data: { interval: 5 },
  }),
  startAt: Math.floor(Date.now() / 1000) + 30,
  expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
  name: `Test task`,
  maxExecution: 1,
};

export const blockTriggerEvery5 = TriggerFactory.create({
  id: defaultTriggerId,
  name: "blockTrigger",
  type: TriggerType.Block,
  data: { interval: 5 },
});

