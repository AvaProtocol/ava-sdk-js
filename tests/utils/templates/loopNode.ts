import { NodeType, CustomCodeLang, LoopNodeProps } from "@avaprotocol/types";
import { getNextId } from "../utils";

export const loopNodeWithRestApiProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_rest_api",
  type: NodeType.Loop,
  data: {
    inputNodeName: "testArray",
    iterVal: "value",
    iterKey: "index",
    runner: {
      type: "restApi",
      config: {
        url: "https://mock-api.ap-aggregator.local/post",
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
    inputNodeName: "testArray",
    iterVal: "value",
    iterKey: "index",
    runner: {
      type: "customCode",
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
    inputNodeName: "addressArray",
    iterVal: "address",
    iterKey: "index",
    runner: {
      type: "ethTransfer",
      config: {
        destination: "{{value}}",
        amount: "100000000000000", // 0.0001 ETH in wei (decimal string)
      },
    },
  },
};

export const loopNodeWithContractReadProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_contract_read",
  type: NodeType.Loop,
  data: {
    inputNodeName: "contractArray",
    iterVal: "contract",
    iterKey: "index",
    runner: {
      type: "contractRead",
      config: {
        contractAddress: "{{contract.address}}",
        contractAbi: "{{contract.abi}}" as any,
        methodCalls: [
          {
            methodName: "{{contract.methodName}}",
            methodParams: "{{contract.methodParams}}",
          },
        ],
      },
    },
  },
};

export const loopNodeWithContractWriteProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_contract_write",
  type: NodeType.Loop,
  data: {
    inputNodeName: "contractArray",
    iterVal: "contract",
    iterKey: "index",
    runner: {
      type: "contractWrite",
      config: {
        contractAddress: "{{contract.address}}",
        contractAbi: "{{contract.abi}}" as any,
        methodCalls: [
          {
            methodName: "{{contract.methodName}}",
            methodParams: "{{contract.methodParams}}",
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
    inputNodeName: "queryArray",
    iterVal: "query",
    iterKey: "index",
    runner: {
      type: "graphqlQuery",
      config: {
        url: "https://mock-api.ap-aggregator.local/graphql",
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
