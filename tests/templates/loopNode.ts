import { LoopNodeProps, CustomCodeLangs } from "@avaprotocol/sdk-js";
import { NodeType } from "@avaprotocol/types";
import { getNextId } from "../utils";

export const loopNodeWithRestApiProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_rest_api",
  type: NodeType.Loop,
  data: {
    input: "testArray",
    iterVal: "item",
    iterKey: "index",
    runnerType: NodeType.RestAPI,
    runnerProps: {
      url: "https://httpbin.org/post",
      method: "POST",
      body: JSON.stringify({ data: "{{item}}", index: "{{index}}" }),
      headersMap: [["Content-Type", "application/json"]],
    },
  },
};

export const loopNodeWithCustomCodeProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_custom_code", 
  type: NodeType.Loop,
  data: {
    input: "testArray",
    iterVal: "item",
    iterKey: "index", 
    runnerType: NodeType.CustomCode,
    runnerProps: {
      lang: CustomCodeLangs.JAVASCRIPT,
      source: `const result = { processedItem: item, position: index }; return result;`,
    },
  },
};

export const loopNodeWithETHTransferProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_eth_transfer",
  type: NodeType.Loop,
  data: {
    input: "addressArray",
    iterVal: "address", 
    iterKey: "index",
    runnerType: NodeType.ETHTransfer,
    runnerProps: {
      destination: "{{address}}",
      amount: "0.001",
    },
  },
};

export const loopNodeWithContractReadProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_contract_read",
  type: NodeType.Loop,
  data: {
    input: "contractArray",
    iterVal: "contract",
    iterKey: "index",
    runnerType: NodeType.ContractRead,
    runnerProps: {
      contractAddress: "{{contract.address}}",
      callData: "{{contract.callData}}",
      contractAbi: "{{contract.abi}}",
    },
  },
};

export const loopNodeWithGraphQLQueryProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_graphql_query",
  type: NodeType.Loop,
  data: {
    input: "queryArray",
    iterVal: "query",
    iterKey: "index",
    runnerType: NodeType.GraphQLQuery,
    runnerProps: {
      url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
      query: `
        query GetToken($id: String!) {
          token(id: $id) {
            id
            symbol
            name
            decimals
          }
        }
      `,
      variablesMap: [["id", "{{query.id}}"]],
    },
  },
};
