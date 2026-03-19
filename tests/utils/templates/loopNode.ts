import { NodeType, LoopNodeProps, LoopRunnerType, Lang } from "@avaprotocol/types";
import { getNextId } from "../utils";

export const loopNodeWithRestApiProps: LoopNodeProps = {
  id: getNextId(),
  name: "loop_with_rest_api",
  type: NodeType.Loop,
  data: {
    inputVariable: "{{testArray}}",
    iterationTimeout: 30,
    iterVal: "value",
    iterKey: "index",
    runner: {
      type: LoopRunnerType.RestAPI,
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
    inputVariable: "{{testArray}}",
    iterationTimeout: 30,
    iterVal: "value",
    iterKey: "index",
    runner: {
      type: LoopRunnerType.CustomCode,
      config: {
        lang: Lang.JavaScript,
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
    inputVariable: "{{addressArray}}",
    iterationTimeout: 30,
    iterVal: "address",
    iterKey: "index",
    runner: {
      type: LoopRunnerType.EthTransfer,
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
    inputVariable: "{{contractArray}}",
    iterationTimeout: 30,
    iterVal: "contract",
    iterKey: "index",
    runner: {
      type: LoopRunnerType.ContractRead,
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
    inputVariable: "{{contractArray}}",
    iterationTimeout: 30,
    iterVal: "contract",
    iterKey: "index",
    runner: {
      type: LoopRunnerType.ContractWrite,
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
    inputVariable: "{{queryArray}}",
    iterationTimeout: 30,
    iterVal: "query",
    iterKey: "index",
    runner: {
      type: LoopRunnerType.GraphQLQuery,
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
