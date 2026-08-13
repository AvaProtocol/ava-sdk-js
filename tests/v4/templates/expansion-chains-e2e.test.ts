/**
 * Wave A / Wave B / Robinhood read-only E2E against a multi-chain gateway.
 *
 * Local docker-compose only wires Sepolia, so this file no-ops unless
 * TEST_ENV=railway (or MULTICHAIN_TEST=1). Against Railway it:
 *
 *   1. Mints a JWT whose `aud` is the target chain on the isolated
 *      client's transport (gateway has the chain in chains[]).
 *   2. `nodes.run` a WETH/WBNB `symbol()` contractRead under that
 *      chain-scoped token — real RPC through that chain's worker.
 *   3. `workflows.simulate` the same read — Tenderly Simulation API
 *      for that chain id (Phase 6 of Adding_A_New_Chain.md).
 *
 * No UserOp is submitted. Uses an isolated EOA so production
 * `max_wallets_per_owner` on the shared test key is not a problem.
 *
 * `.env` wins over `.env.railway` (override:false), so point at
 * production explicitly:
 *
 *   TEST_ENV=railway AVS_REST_URL=https://api.avaprotocol.org/api/v1 \
 *     yarn jest tests/v4/templates/expansion-chains-e2e.test.ts
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

const CHAINS: ReadonlyArray<{
  name: string;
  chainId: number;
  weth: string;
  symbol: string;
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
];

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

  describe.each(CHAINS)("$name ($chainId)", ({ chainId, weth, symbol }) => {
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

    test("workflows.simulate reads wrapped-native symbol via Tenderly", async () => {
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
    });
  });
});
