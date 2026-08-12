/**
 * Catalog compatibility after `@avaprotocol/protocols@0.9.0`.
 *
 * Pure data — no gateway. Pins the 0.9.0 surface the SDK re-exports so a
 * stale lockfile or a catalog regression cannot silently drop Arb/OP or
 * collapse Ethereum multi-market back to Core-only.
 */

import { Chains, Protocols } from "@avaprotocol/sdk-js";

describe("protocols catalog 0.9.0", () => {
  test("spreads new catalog chain IDs onto SDK Chains", () => {
    expect(Chains.ArbitrumOne).toBe(42_161);
    expect(Chains.OptimismMainnet).toBe(10);
    expect(Chains.Sepolia).toBe(11_155_111);
    expect(Chains.EigenLayerAuth).toBe(Chains.Sepolia);
  });

  test("Aave V3 Core Pool + markets cover Arbitrum and Optimism", () => {
    expect(Protocols.aaveV3.pool[Chains.ArbitrumOne]).toMatch(/^0x[0-9a-fA-F]{40}$/);
    expect(Protocols.aaveV3.pool[Chains.OptimismMainnet]).toMatch(/^0x[0-9a-fA-F]{40}$/);

    const arb = Protocols.aaveV3.markets[Chains.ArbitrumOne] ?? [];
    const op = Protocols.aaveV3.markets[Chains.OptimismMainnet] ?? [];
    expect(arb).toHaveLength(1);
    expect(op).toHaveLength(1);
    expect(arb[0]?.key).toBe("core");
    expect(arb[0]?.pool).toBe(Protocols.aaveV3.pool[Chains.ArbitrumOne]);
    expect(op[0]?.pool).toBe(Protocols.aaveV3.pool[Chains.OptimismMainnet]);
  });

  test("Ethereum markets enumerate Core + EtherFi + Lido + Horizon", () => {
    const eth = Protocols.aaveV3.markets[Chains.EthereumMainnet] ?? [];
    expect(eth.map((m) => m.key)).toEqual(["core", "etherFi", "lido", "horizon"]);
    expect(eth[0]?.pool).toBe(Protocols.aaveV3.pool[Chains.EthereumMainnet]);
  });

  test("existing Core callers stay on the same Sepolia Pool", () => {
    expect(Protocols.aaveV3.pool[Chains.Sepolia]).toBe(
      "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951"
    );
  });

  test("Core reserves ship on every Aave chain and USDC.e is disambiguated", () => {
    for (const chain of [
      Chains.EthereumMainnet,
      Chains.OptimismMainnet,
      Chains.BaseMainnet,
      Chains.BnbMainnet,
      Chains.ArbitrumOne,
      Chains.Sepolia,
      Chains.BaseSepolia,
    ]) {
      const listed = Protocols.aaveV3.reserves[chain] ?? [];
      expect(listed.length).toBeGreaterThan(0);
      const symbols = listed.map((r) => r.symbol);
      expect(new Set(symbols).size).toBe(symbols.length);
    }

    const nativeUsdc = {
      [Chains.ArbitrumOne]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      [Chains.OptimismMainnet]: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    } as const;
    for (const chain of [Chains.ArbitrumOne, Chains.OptimismMainnet] as const) {
      const listed = Protocols.aaveV3.reserves[chain] ?? [];
      const usdc = listed.find((r) => r.symbol === "USDC");
      const usdce = listed.find((r) => r.symbol === "USDC.e");
      expect(usdc?.underlying.toLowerCase()).toBe(nativeUsdc[chain].toLowerCase());
      expect(usdce).toBeDefined();
    }
  });
});
