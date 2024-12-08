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
} from "../dist";

export const FACTORY_ADDRESS = "0x29adA1b5217242DEaBB142BC3b1bCfFdd56008e7";

/**
 * Trigger templates
 */
export const TriggerTemplate: BlockTriggerProps = {
  name: "blockTrigger",
  type: TriggerTypes.BLOCK,
  data: {
    interval: 5, // run every 5 block
  },
};

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

export const multiNodeBranchingTask = {
  smartWalletAddress: "0x6B5103D06B53Cc2386243A09f4EAf3140f4FaD41",
  startAt: Math.floor(Date.now() / 1000) + 30,
  expiredAt: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
  memo: `Test task`,

  trigger: {
    block: {
      interval: 5, // run every 5 block
    },
  },
  nodes: [
    {
      // id need to be unique. it will be assign to the variable
      id: "t000",
      // name is for our note only. use for display a humand friendly version
      name: "transfer token",
      contractWrite: {
        contractAddress: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
        callData: "0x123cdef",
      },
    },
    {
      // id need to be unique. it will be assign to the variable
      id: "t001",
      // name is for our note only. use for display a humand friendly version
      name: "send eth",
      ethTransfer: {
        destination: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
        amount: "0x123cdef",
      },
    },
    {
      // id need to be unique. it will be assign to the variable
      id: "t002",
      // name is for our note only. use for display a humand friendly version
      name: "make rest call",
      restApi: {
        url: "http://endpoint002",
        method: "post",
        body: `{"a":1}`,
      },
    },
    {
      // id need to be unique. it will be assign to the variable
      id: "t003",
      // name is for our note only. use for display a humand friendly version
      name: "make graphql call",
      graphqlDataQuery: {
        url: "http://endpoint003",
        query: `foo bar`,
      },
    },
    {
      // id need to be unique. it will be assign to the variable
      id: "t004",
      // name is for our note only. use for display a humand friendly version
      name: "make graphql call 2",
      graphqlDataQuery: {
        url: "http://endpoint004",
        query: `other test`,
      },
    },
    {
      id: "t100",
      name: "branch ",
      branch: {
        conditions: [
          { id: "b1", type: "if", expression: "foo >= 5" },
          { id: "b2", type: "if", expression: "foo <= -1" },
          { id: "b3", type: "else" },
        ],
      },
    },
  ],
  edges: [
    {
      id: UlidMonotonic.generate().toCanonical(),
      source: "__TRIGGER__",
      target: "t000",
    },
    {
      id: UlidMonotonic.generate().toCanonical(),
      source: "t000",
      target: "t001",
    },
    {
      id: UlidMonotonic.generate().toCanonical(),
      source: "t001",
      target: "t100",
    },
    {
      id: UlidMonotonic.generate().toCanonical(),
      source: "t100.b1",
      target: "t002",
    },
    {
      id: UlidMonotonic.generate().toCanonical(),
      source: "t100.b2",
      target: "t003",
    },
    {
      id: UlidMonotonic.generate().toCanonical(),
      source: "t100.b3",
      target: "t004",
    },
  ],
};
