import { LoopNodeProps } from "@avaprotocol/sdk-js";
import { NodeType, CustomCodeLang } from "@avaprotocol/types";
import { getNextId } from "../utils";

export const loopNodeWithRestApiProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_rest_api",
  type: NodeType.Loop,
  data: {
    sourceId: "testArray",
    iterVal: "value",
    iterKey: "index",
    restApi: {
      config: {
        url: "https://httpbin.org/post",
        method: "POST",
        body: JSON.stringify({ data: "{{value}}", index: "{{index}}" }),
        headersMap: [["Content-Type", "application/json"]],
      },
    },
  },
};

export const loopNodeWithCustomCodeProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_custom_code",
  type: NodeType.Loop,
  data: {
    sourceId: "testArray",
    iterVal: "value",
    iterKey: "index",
    customCode: {
      config: {
        lang: CustomCodeLang.JavaScript,
        source: `const result = { processedValue: value, position: index }; return result;`,
      },
    },
  },
};

export const loopNodeWithETHTransferProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_eth_transfer",
  type: NodeType.Loop,
  data: {
    sourceId: "addressArray",
    iterVal: "address",
    iterKey: "index",
    ethTransfer: {
      config: {
        destination: "{{value}}",
        amount: "1000000000000000000", // 1 ETH in wei (decimal string)
      },
    },
  },
};

export const loopNodeWithContractReadProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_contract_read",
  type: NodeType.Loop,
  data: {
    sourceId: "contractArray",
    iterVal: "contract",
    iterKey: "index",
    contractRead: {
      config: {
        contractAddress: "{{contract.address}}",
        contractAbi: "{{contract.abi}}",
        methodCallsList: [
          {
            callData: "{{contract.callData}}",
            methodName: "{{contract.methodName}}",
          },
        ],
      },
    },
  },
};

export const loopNodeWithGraphQLQueryProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_graphql_query",
  type: NodeType.Loop,
  data: {
    sourceId: "queryArray",
    iterVal: "query",
    iterKey: "index",
    graphqlDataQuery: {
      config: {
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
  },
};
