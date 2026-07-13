import {
  Chains,
  Protocols,
  UniswapV3,
  readContractWriteExecutions,
  type v4,
} from "@avaprotocol/sdk-js";

/**
 * Unit tests for the on-demand-action helpers — pure builders / readers, no
 * gateway required.
 */

// Token addresses come from the shared protocol catalog (drift-proof), the same
// source the Uniswap template test uses — not re-hardcoded here.
const WETH = Protocols.uniswapV3.tokens.WETH[Chains.Sepolia]!;
const USDC = Protocols.uniswapV3.tokens.USDC[Chains.Sepolia]!;
// A pure builder input — any address works; these tests never hit a wallet.
const RECIPIENT = "0x2222222222222222222222222222222222222222";

type CWConfig = {
  contractAddress: string;
  isSimulated?: boolean;
  methodCalls: Array<{ methodName: string; methodParams: string[] }>;
};
const configOf = (node: v4.Node): CWConfig => (node as unknown as { config: CWConfig }).config;

describe("UniswapV3.swapNode", () => {
  test("emits an exactInputSingle contractWrite against SwapRouter02", () => {
    const node = UniswapV3.swapNode({
      id: "swap",
      name: "swap",
      chainId: Chains.Sepolia,
      tokenIn: WETH,
      tokenOut: USDC,
      fee: 3000,
      recipient: RECIPIENT,
      amountIn: "1000000000000000",
      amountOutMinimum: "990000",
    });
    expect(node.type).toBe("contractWrite");
    const config = configOf(node);
    expect(config.contractAddress).toBe(Protocols.uniswapV3.swapRouter02[Chains.Sepolia]);
    expect(config.methodCalls[0].methodName).toBe("exactInputSingle");
    expect(JSON.parse(config.methodCalls[0].methodParams[0])).toEqual({
      tokenIn: WETH,
      tokenOut: USDC,
      fee: 3000,
      recipient: RECIPIENT,
      amountIn: "1000000000000000",
      amountOutMinimum: "990000",
      sqrtPriceLimitX96: "0",
    });
  });

  test("passes isSimulated through and honors a router override", () => {
    const override = "0x9999999999999999999999999999999999999999";
    const node = UniswapV3.swapNode({
      id: "s",
      name: "s",
      chainId: 999999,
      tokenIn: WETH,
      tokenOut: USDC,
      fee: 500,
      recipient: RECIPIENT,
      amountIn: "1",
      amountOutMinimum: "0",
      routerAddress: override,
      isSimulated: false,
    });
    const config = configOf(node);
    expect(config.contractAddress).toBe(override);
    expect(config.isSimulated).toBe(false);
  });

  test("throws for an unknown chain without a router override", () => {
    expect(() =>
      UniswapV3.swapNode({
        id: "s",
        name: "s",
        chainId: 999999,
        tokenIn: WETH,
        tokenOut: USDC,
        fee: 3000,
        recipient: RECIPIENT,
        amountIn: "1",
        amountOutMinimum: "0",
      }),
    ).toThrow(/SwapRouter02 address is not known for chain 999999/);
  });
});

describe("UniswapV3.quoteNode", () => {
  test("emits a simulated quoteExactInputSingle against QuoterV2", () => {
    const node = UniswapV3.quoteNode({
      id: "q",
      name: "q",
      chainId: Chains.Sepolia,
      tokenIn: WETH,
      tokenOut: USDC,
      fee: 3000,
      amountIn: "1000000000000000",
    });
    const config = configOf(node);
    expect(config.contractAddress).toBe(Protocols.uniswapV3.quoterV2[Chains.Sepolia]);
    expect(config.isSimulated).toBe(true);
    expect(config.methodCalls[0].methodName).toBe("quoteExactInputSingle");
    expect(JSON.parse(config.methodCalls[0].methodParams[0])).toEqual({
      tokenIn: WETH,
      tokenOut: USDC,
      amountIn: "1000000000000000",
      fee: 3000,
      sqrtPriceLimitX96: "0",
    });
  });
});

describe("UniswapV3.minAmountOut", () => {
  test("applies slippage in integer wei (floor)", () => {
    expect(UniswapV3.minAmountOut("1000000", 50)).toBe("995000"); // 0.5%
    expect(UniswapV3.minAmountOut(1_000_000n, 0)).toBe("1000000");
    expect(UniswapV3.minAmountOut("3", 1)).toBe("2"); // 3 * 9999 / 10000 = 2 (floor)
  });

  test("rejects out-of-range slippage and negative output", () => {
    expect(() => UniswapV3.minAmountOut("100", -1)).toThrow(/slippageBps/);
    expect(() => UniswapV3.minAmountOut("100", 10001)).toThrow(/slippageBps/);
    expect(() => UniswapV3.minAmountOut("100", 1.5)).toThrow(/slippageBps/);
    expect(() => UniswapV3.minAmountOut("-1", 10)).toThrow(/non-negative/);
  });
});

describe("readContractWriteExecutions", () => {
  const resp = (metadata: unknown): v4.RunNodeResponse =>
    ({ success: true, metadata } as unknown as v4.RunNodeResponse);

  test("extracts confirmed method results with userOpHash + txHash", () => {
    const out = readContractWriteExecutions(
      resp({
        results: [
          {
            methodName: "exactInputSingle",
            success: true,
            receipt: {
              executionStatus: "confirmed",
              userOpHash: "0xuo",
              transactionHash: "0xtx",
            },
          },
        ],
      }),
    );
    expect(out).toEqual([
      {
        methodName: "exactInputSingle",
        success: true,
        executionStatus: "confirmed",
        userOpHash: "0xuo",
        transactionHash: "0xtx",
      },
    ]);
  });

  test("treats a submitted-but-unmined UserOp as pending with no txHash", () => {
    const out = readContractWriteExecutions(
      resp({
        results: [
          {
            methodName: "exactInputSingle",
            success: false,
            receipt: {
              executionStatus: "pending",
              userOpHash: "0xuo",
              transactionHash: "pending",
            },
          },
        ],
      }),
    );
    expect(out[0].executionStatus).toBe("pending");
    expect(out[0].userOpHash).toBe("0xuo");
    expect(out[0].transactionHash).toBeUndefined();
    expect(out[0].success).toBe(false);
  });

  test("returns [] when the response has no results array", () => {
    expect(readContractWriteExecutions(resp(undefined))).toEqual([]);
    expect(readContractWriteExecutions(resp({}))).toEqual([]);
    expect(readContractWriteExecutions({ success: true } as v4.RunNodeResponse)).toEqual([]);
  });
});
