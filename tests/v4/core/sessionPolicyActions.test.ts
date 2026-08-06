/**
 * `SessionPolicyActions` — friendly action → `{ target, selectors }`.
 *
 * Needs no gateway: this is pure resolution. The value being protected is
 * that a wrong selector or address does NOT fail loudly — it produces a grant
 * authorizing something the agent never calls, and the failure surfaces much
 * later as an operation refused at validation.
 */

import {
  SessionPolicyActions,
  Protocols,
  actionsCover,
  missingActions,
} from "@avaprotocol/sdk-js";

const SEPOLIA = 11_155_111;
const USDC = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
const WETH = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";

describe("SessionPolicyActions", () => {
  // Selectors verified against `cast sig`. If one of these ever changes it is
  // a mistake, not a refactor — pinning them is the whole point.
  test("selectors are the real 4-byte hashes", () => {
    expect(SessionPolicyActions.erc20Approve(USDC).selectors).toEqual([
      "0x095ea7b3",
    ]);
    expect(SessionPolicyActions.erc20Transfer(USDC).selectors).toEqual([
      "0xa9059cbb",
    ]);
    expect(SessionPolicyActions.uniswapV3Swap(SEPOLIA).selectors).toEqual([
      "0x04e45aaf",
    ]);
  });

  test("uniswapV3Swap resolves the router from the shared protocol catalog", () => {
    const action = SessionPolicyActions.uniswapV3Swap(SEPOLIA);
    // Not a literal in this test either — both sides read the catalog, so a
    // new chain landing there needs no change here or in Studio.
    expect(action.target).toBe(Protocols.uniswapV3.swapRouter02[SEPOLIA]);
  });

  // Better to refuse than to grant a zero address or the wrong chain's router.
  test("an unknown chain is refused, with the way out in the message", () => {
    expect(() => SessionPolicyActions.uniswapV3Swap(999_999)).toThrow(
      /not known for chain 999999/
    );
    expect(() => SessionPolicyActions.uniswapV3Swap(999_999)).toThrow(
      /explicit/
    );
  });

  test("an explicit target overrides the catalog", () => {
    const custom = "0x00000000000000000000000000000000deadBeef";
    expect(
      SessionPolicyActions.uniswapV3Swap(999_999, { target: custom }).target
    ).toBe(custom);
  });

  test("malformed addresses are rejected rather than passed through", () => {
    expect(() => SessionPolicyActions.erc20Approve("0x123")).toThrow(
      /20-byte address/
    );
    expect(() => SessionPolicyActions.erc20Approve("not-an-address")).toThrow(
      /20-byte address/
    );
  });

  describe("custom", () => {
    test("accepts a well-formed selector", () => {
      const a = SessionPolicyActions.custom(USDC, ["0x12345678"]);
      expect(a).toEqual({ target: USDC, selectors: ["0x12345678"] });
    });

    // An empty list reads as "allow this contract" but grants nothing, so the
    // agent fails at validation with no clue why.
    test("refuses an empty selector list", () => {
      expect(() => SessionPolicyActions.custom(USDC, [])).toThrow(
        /grants nothing/
      );
    });

    test("refuses a selector that is not 4 bytes", () => {
      expect(() => SessionPolicyActions.custom(USDC, ["0x1234"])).toThrow(
        /4 bytes/
      );
      expect(() => SessionPolicyActions.custom(USDC, ["0x095ea7b3ff"])).toThrow(
        /4 bytes/
      );
    });
  });

  describe("merge", () => {
    // Each AllowlistModule entry is its own cold SSTORE at install time, and a
    // duplicated target also renders twice on the manage screen.
    test("collapses actions that share a target", () => {
      const merged = SessionPolicyActions.merge([
        SessionPolicyActions.erc20Approve(USDC),
        SessionPolicyActions.erc20Transfer(USDC),
      ]);
      expect(merged).toHaveLength(1);
      expect([...merged[0].selectors].sort()).toEqual(
        ["0x095ea7b3", "0xa9059cbb"].sort()
      );
    });

    test("keeps distinct targets apart", () => {
      const merged = SessionPolicyActions.merge([
        SessionPolicyActions.erc20Approve(USDC),
        SessionPolicyActions.uniswapV3Swap(SEPOLIA),
      ]);
      expect(merged).toHaveLength(2);
    });

    test("does not duplicate a selector listed twice", () => {
      const merged = SessionPolicyActions.merge([
        SessionPolicyActions.erc20Approve(USDC),
        SessionPolicyActions.erc20Approve(USDC),
      ]);
      expect(merged[0].selectors).toEqual(["0x095ea7b3"]);
    });
  });

  describe("uniswapV3Capability", () => {
    test("includes router exactInputSingle and approve for each token", () => {
      const actions = SessionPolicyActions.uniswapV3Capability(SEPOLIA, {
        approveTokens: [USDC, WETH],
      });
      const router = Protocols.uniswapV3.swapRouter02[SEPOLIA];
      expect(actions).toHaveLength(3);
      const byTarget = Object.fromEntries(
        actions.map((a) => [a.target.toLowerCase(), a.selectors])
      );
      expect(byTarget[router!.toLowerCase()]).toEqual(["0x04e45aaf"]);
      expect(byTarget[USDC.toLowerCase()]).toEqual(["0x095ea7b3"]);
      expect(byTarget[WETH.toLowerCase()]).toEqual(["0x095ea7b3"]);
    });

    test("refuses an empty approveTokens list", () => {
      expect(() =>
        SessionPolicyActions.uniswapV3Capability(SEPOLIA, { approveTokens: [] })
      ).toThrow(/approveTokens/);
    });
  });

  describe("actionsCover / missingActions", () => {
    test("USDC grant misses WETH approve", () => {
      const granted = SessionPolicyActions.uniswapV3Capability(SEPOLIA, {
        approveTokens: [USDC],
      });
      const required = SessionPolicyActions.uniswapV3Capability(SEPOLIA, {
        approveTokens: [WETH],
      });
      expect(actionsCover(required, granted)).toBe(false);
      const miss = missingActions(required, granted);
      expect(
        miss.some((m) => m.target.toLowerCase() === WETH.toLowerCase())
      ).toBe(true);
    });

    test("USDC+WETH grant covers demoted sell rows", () => {
      const granted = SessionPolicyActions.uniswapV3Capability(SEPOLIA, {
        approveTokens: [USDC, WETH],
      });
      const required = SessionPolicyActions.merge([
        SessionPolicyActions.erc20Approve(WETH),
        SessionPolicyActions.uniswapV3Swap(SEPOLIA),
      ]);
      expect(actionsCover(required, granted)).toBe(true);
      expect(missingActions(required, granted)).toEqual([]);
    });
  });

  // The shape the grant screen actually produces.
  test("composes into a PreparePolicyRequest's allowedActions", () => {
    const allowedActions = SessionPolicyActions.merge([
      SessionPolicyActions.erc20Approve(USDC),
      SessionPolicyActions.uniswapV3Swap(SEPOLIA),
    ]);
    for (const a of allowedActions) {
      expect(a.target).toMatch(/^0x[0-9a-fA-F]{40}$/);
      expect(a.selectors.length).toBeGreaterThan(0);
      for (const s of a.selectors) expect(s).toMatch(/^0x[0-9a-fA-F]{8}$/);
    }
  });
});

// merge() matches targets case-insensitively but returns the target as first
// supplied. Both forms satisfy the API (EthereumAddress is "lowercase or
// checksummed"), so lowercasing would not be wrong — it would just mean
// merge([a]) does not return `a`, and a checksummed address from Studio comes
// back flattened for the manage screen to render.
describe("merge preserves the caller's address casing", () => {
  const CHECKSUMMED = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

  test("a single action round-trips unchanged", () => {
    const action = SessionPolicyActions.erc20Approve(CHECKSUMMED);
    expect(SessionPolicyActions.merge([action])).toEqual([action]);
  });

  test("still merges when the same address is supplied in different cases", () => {
    const merged = SessionPolicyActions.merge([
      SessionPolicyActions.erc20Approve(CHECKSUMMED),
      SessionPolicyActions.erc20Transfer(CHECKSUMMED.toLowerCase()),
    ]);
    expect(merged).toHaveLength(1);
    expect(merged[0].target).toBe(CHECKSUMMED); // first-seen form wins
    expect([...merged[0].selectors].sort()).toEqual(
      ["0x095ea7b3", "0xa9059cbb"].sort()
    );
  });
});
