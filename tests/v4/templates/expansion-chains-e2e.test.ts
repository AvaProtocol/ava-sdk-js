/**
 * Multi-chain read-only E2E: JWT aud + WETH `symbol()` via the chain worker
 * and Tenderly simulate.
 *
 * Gated on TEST_ENV=railway or MULTICHAIN_TEST=1.
 *
 * Local EigenLayer-AVS gateway `chains[]` is Sepolia + Ethereum + Base
 * (workers :50051 / :50053 / :50054). Against that stack this file
 * exercises Ethereum and Base (Sepolia is the JWT default).
 *
 * Against Railway it also covers Wave A / Wave B / Robinhood / Wave C:
 *
 *   1. Mints a JWT whose `aud` is the target chain.
 *   2. `nodes.run` a wrapped-native `symbol()` contractRead on that worker.
 *   3. `workflows.simulate` the same read (Tenderly for that chain id).
 *      Hyperliquid EVM is read-only here — Tenderly has no chain 999.
 *
 * No UserOp is submitted. Isolated EOA so production
 * `max_wallets_per_owner` on the shared test key is not a problem.
 *
 *   MULTICHAIN_TEST=1 yarn jest tests/v4/templates/expansion-chains-e2e.test.ts
 *   TEST_ENV=railway yarn jest tests/v4/templates/expansion-chains-e2e.test.ts
 */

import { Chains, Client, Nodes, Protocols, Triggers } from "@avaprotocol/sdk-js";

import {
  TEST_AUTH_URI,
  createSmartWallet,
  decodeJwtPayload,
  getIsolatedClient,
  settingsForChain,
} from "../../utils/client";

jest.setTimeout(120_000);

const MULTICHAIN_STACK =
  process.env.MULTICHAIN_TEST === "1" || process.env.TEST_ENV === "railway";
const describeExpansion = MULTICHAIN_STACK ? describe : describe.skip;

const SYMBOL_ABI = [...Protocols.erc20.symbolAbi];

const LOCAL_SERVED_CHAINS: ReadonlyArray<{
  name: string;
  chainId: number;
  weth: string;
  symbol: string;
  simulate?: boolean;
}> = [
  {
    name: "Ethereum",
    chainId: Chains.EthereumMainnet,
    weth: Protocols.wrapped.weth[Chains.EthereumMainnet]!,
    symbol: "WETH",
  },
  {
    name: "Base",
    chainId: Chains.BaseMainnet,
    weth: Protocols.wrapped.weth[Chains.BaseMainnet]!,
    symbol: "WETH",
  },
];

const EXPANSION_CHAINS: ReadonlyArray<{
  name: string;
  chainId: number;
  weth: string;
  symbol: string;
  simulate?: boolean;
}> = [
  {
    name: "BNB Smart Chain",
    chainId: Chains.BnbMainnet,
    weth: Protocols.wrapped.weth[Chains.BnbMainnet]!,
    symbol: "WBNB",
  },
  {
    name: "Arbitrum One",
    chainId: Chains.ArbitrumOne,
    weth: Protocols.wrapped.weth[Chains.ArbitrumOne]!,
    symbol: "WETH",
  },
  {
    name: "OP Mainnet",
    chainId: Chains.OptimismMainnet,
    weth: Protocols.wrapped.weth[Chains.OptimismMainnet]!,
    symbol: "WETH",
  },
  {
    name: "Unichain",
    chainId: Chains.UnichainMainnet,
    weth: Protocols.wrapped.weth[Chains.UnichainMainnet]!,
    symbol: "WETH",
  },
  {
    name: "Robinhood Chain",
    chainId: Chains.RobinhoodMainnet,
    weth: Protocols.wrapped.weth[Chains.RobinhoodMainnet]!,
    symbol: "WETH",
  },
  {
    name: "Polygon PoS",
    chainId: Chains.PolygonMainnet,
    weth: Protocols.wrapped.weth[Chains.PolygonMainnet]!,
    symbol: "WPOL",
  },
  {
    name: "Hyperliquid EVM",
    chainId: Chains.HyperliquidMainnet,
    weth: Protocols.wrapped.weth[Chains.HyperliquidMainnet]!,
    symbol: "WHYPE",
    // Tenderly has Polygon (137) but not HyperEVM (999).
    simulate: false,
  },
];

const CHAINS =
  process.env.TEST_ENV === "railway" ? EXPANSION_CHAINS : LOCAL_SERVED_CHAINS;

describeExpansion("Expansion chains E2E (auth + WETH read + simulate)", () => {
  let client: Client;
  let runner: string;
  let isolatedKey: string;

  beforeAll(async () => {
    // Isolated EOA: the shared TEST_PRIVATE_KEY is already at
    // production max_wallets_per_owner. This suite is read-only.
    const isolated = await getIsolatedClient();
    client = isolated.client;
    isolatedKey = isolated.privateKey;
    const wallet = await createSmartWallet(client);
    runner = wallet.address;
  });

  describe.each(CHAINS)("$name ($chainId)", ({ chainId, weth, symbol, simulate }) => {
    beforeEach(async () => {
      // Re-mint on the shared client as the isolated owner so
      // nodes.run / simulate run under a JWT whose aud is this chain.
      const { version } = await client.health.check();
      await client.auth.exchangeWithKey(isolatedKey, {
        uri: TEST_AUTH_URI,
        chainId,
        version,
      });
    });

    test("mints a JWT scoped to the chain", async () => {
      expect(client.token).toBeTruthy();
      const decoded = decodeJwtPayload(client.token!);
      expect(decoded.iss).toBe("AvaProtocol");
      expect(String(decoded.aud)).toBe(String(chainId));
    });

    test("nodes.run reads wrapped-native symbol via the chain worker", async () => {
      const result = await client.nodes.run({
        node: Nodes.contractRead({
          id: "r",
          name: "wethSymbol",
          chainId,
          contractAddress: weth,
          contractAbi: SYMBOL_ABI,
          methodCalls: [{ methodName: "symbol", methodParams: [] }],
        }),
        inputVariables: { settings: settingsForChain(runner, chainId) },
      });
      if (!result.success) {
        throw new Error(`nodes.run failed on ${chainId}: ${JSON.stringify(result)}`);
      }
      const data = (result.output as { data: Record<string, unknown> }).data;
      expect(data.symbol).toBe(symbol);
    });

    (simulate === false ? test.skip : test)(
      "workflows.simulate reads wrapped-native symbol via Tenderly",
      async () => {
        const sim = await client.workflows.simulate({
          trigger: Triggers.manual({
            id: "trigger",
            name: "manualTrigger",
            lang: "json",
            data: {},
          }),
          nodes: [
            Nodes.contractRead({
              id: "r",
              name: "wethSymbol",
              chainId,
              contractAddress: weth,
              contractAbi: SYMBOL_ABI,
              methodCalls: [{ methodName: "symbol", methodParams: [] }],
            }),
          ],
          edges: [{ id: "e1", source: "trigger", target: "r" }],
          inputVariables: { settings: settingsForChain(runner, chainId) },
        });
        if (sim.status !== "success") {
          throw new Error(`simulate failed on ${chainId}: ${JSON.stringify(sim)}`);
        }
        const step = sim.steps?.find((s) => s.id === "r");
        expect(step?.success).toBe(true);
        const data = (step?.output as { data: Record<string, unknown> }).data;
        expect(data.symbol).toBe(symbol);
      },
    );
  });
});
