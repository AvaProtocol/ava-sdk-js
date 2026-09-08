/**
 * Unit coverage for the tight-cap salt pool. Pure and offline — the e2e suites
 * exercise it end-to-end, but an off-by-one in the wraparound would silently
 * reintroduce the production 429s those suites were changed to avoid, and it
 * would only show up as a wire error against a real gateway.
 *
 * Lives under tests/v4/core rather than beside the helper in tests/utils
 * because Jest's roots is <rootDir>/tests/v4 and CI shards by that directory —
 * a test outside it is collected by neither, and a test that never runs is
 * worse than no test. It needs no gateway; it just rides the core shard.
 */
import {
  TIGHT_WALLET_CAP_LIMIT,
  FUNDED_SALT_BY_SUITE,
  fundedSaltForTestPath,
  suiteSalt,
  tightWalletCap,
} from "../../utils/client";

describe("suiteSalt", () => {
  const originalTightCap = process.env.TIGHT_WALLET_CAP;
  const originalTestEnv = process.env.TEST_ENV;

  afterEach(() => {
    process.env.TIGHT_WALLET_CAP = originalTightCap;
    process.env.TEST_ENV = originalTestEnv;
    if (originalTightCap === undefined) delete process.env.TIGHT_WALLET_CAP;
    if (originalTestEnv === undefined) delete process.env.TEST_ENV;
  });

  test("tightWalletCap is on for TEST_ENV=railway and for the explicit flag", () => {
    process.env.TEST_ENV = "railway";
    delete process.env.TIGHT_WALLET_CAP;
    expect(tightWalletCap()).toBe(true);

    process.env.TEST_ENV = "dev";
    process.env.TIGHT_WALLET_CAP = "1";
    expect(tightWalletCap()).toBe(true);

    delete process.env.TIGHT_WALLET_CAP;
    expect(tightWalletCap()).toBe(false);
  });

  test("under a tight cap it never yields more than the cap's worth of salts", () => {
    process.env.TIGHT_WALLET_CAP = "1";

    // Well past one wraparound: the constraint is on the SET of values, which
    // is what the gateway counts, not on how many times it is called.
    const produced = Array.from({ length: 4 * TIGHT_WALLET_CAP_LIMIT }, () => suiteSalt());
    const distinct = new Set(produced);

    expect(distinct.size).toBeLessThanOrEqual(TIGHT_WALLET_CAP_LIMIT);
    for (const salt of distinct) {
      expect(Number(salt)).toBeGreaterThanOrEqual(0);
      expect(Number(salt)).toBeLessThan(TIGHT_WALLET_CAP_LIMIT);
    }
  });

  test("consecutive calls differ, so a test needing two wallets at once gets two", () => {
    process.env.TIGHT_WALLET_CAP = "1";
    const first = suiteSalt();
    const second = suiteSalt();
    expect(first).not.toEqual(second);
  });

  test("without a tight cap it falls through to the unique counter", () => {
    delete process.env.TIGHT_WALLET_CAP;
    process.env.TEST_ENV = "dev";

    // CI's cap is 2000 and parallel workers share one owner, so collision —
    // not the cap — is the risk there. Values must keep climbing.
    const produced = Array.from({ length: 5 }, () => suiteSalt());
    expect(new Set(produced).size).toBe(produced.length);
    const numeric = produced.map(Number);
    expect(numeric).toEqual([...numeric].sort((a, b) => a - b));
    expect(Math.max(...numeric)).toBeGreaterThanOrEqual(TIGHT_WALLET_CAP_LIMIT);
  });
});

describe("fundedSaltForTestPath", () => {
  test("maps each CI shard directory onto a static salt inside the 3-wallet cap", () => {
    expect(fundedSaltForTestPath("/repo/tests/v4/core/withdraw.test.ts")).toBe("0");
    expect(fundedSaltForTestPath("/repo/tests/v4/executions/gasTracking.test.ts")).toBe("1");
    expect(fundedSaltForTestPath("/repo/tests/v4/nodes/contractWrite.test.ts")).toBe("2");
    expect(fundedSaltForTestPath("/repo/tests/v4/nodes/ethTransfer.test.ts")).toBe("2");
    expect(fundedSaltForTestPath("/repo/tests/v4/templates/workflow-usdc-read-write-customcode.test.ts")).toBe("0");
    expect(fundedSaltForTestPath("/repo/tests/v4/workflows/workflow.test.ts")).toBe("0");
    expect(fundedSaltForTestPath("/repo/tests/v4/triggers/block.test.ts")).toBe("0");
  });

  test("unknown paths fall back to salt 0", () => {
    expect(fundedSaltForTestPath("/repo/tests/v4/smoke.test.ts")).toBe("0");
    expect(fundedSaltForTestPath("withdraw.test.ts")).toBe("0");
  });

  test("the map only uses salts inside the production wallet cap", () => {
    const salts = Object.values(FUNDED_SALT_BY_SUITE).map(Number);
    expect(new Set(salts).size).toBeLessThanOrEqual(TIGHT_WALLET_CAP_LIMIT);
    for (const salt of salts) {
      expect(salt).toBeGreaterThanOrEqual(0);
      expect(salt).toBeLessThan(TIGHT_WALLET_CAP_LIMIT);
    }
  });
});
