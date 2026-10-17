import { Chains, Protocols, UniswapV3 } from "@avaprotocol/sdk-js";
import { getSuiteClient } from "../../utils/client";

jest.setTimeout(60_000);

test("QuoterV2 quotes through a standalone read without submitting a transaction", async () => {
  const { client } = await getSuiteClient();
  const node = UniswapV3.quoteNode({
    id: "quote",
    name: "quote",
    chainId: Chains.Sepolia,
    tokenIn: Protocols.uniswapV3.tokens.USDC[Chains.Sepolia]!,
    tokenOut: Protocols.uniswapV3.tokens.WETH[Chains.Sepolia]!,
    fee: 3000,
    amountIn: "1000000",
  });
  expect(node.type).toBe("contractRead");
  const result = await client.nodes.run({ node, chainId: Chains.Sepolia });
  expect(result.error).toBeUndefined();
  expect(result.success).toBe(true);
  expect(result.executionContext).toMatchObject({ provider: "chain_rpc", is_simulated: false });
  const data = (result.output as { data: { quoteExactInputSingle: { amountOut: string } } }).data;
  expect(BigInt(data.quoteExactInputSingle.amountOut)).toBeGreaterThan(0n);
});
