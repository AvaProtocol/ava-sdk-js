import type { v4 } from "@avaprotocol/types";

import { Protocols } from "../protocols";
import { addressForChain } from "./uniswap";

/**
 * `SessionPolicyActions` — friendly action → `{ target, selectors }`.
 *
 * A session policy's `allowedActions` is what the AllowlistModule enforces on
 * chain: which contracts the agent may call, and which 4-byte selectors on
 * each. Studio shows those as chips ("Swap on Uniswap V3", "Approve USDC"),
 * and something has to turn a chip into an address and a selector.
 *
 * That resolution belongs here rather than in Studio, for the same reason the
 * Uniswap node builder exists: a hardcoded `"0x04e45aaf"` in a UI is a magic
 * constant nobody can check, and a hardcoded router address silently grants
 * the wrong contract when a new chain comes online. Addresses come from
 * `@avaprotocol/protocols`, so a new chain landing there is picked up by
 * bumping that package — no UI change.
 *
 * Selectors are stated with the signature they hash from, because a wrong
 * selector does not fail loudly: it produces a grant that authorizes nothing
 * the agent actually calls, and the failure appears later as an operation
 * refused at validation.
 */

/** `approve(address,uint256)` — the ERC-20 spend approval. */
export const SELECTOR_ERC20_APPROVE = "0x095ea7b3";

/**
 * `exactInputSingle((address,address,uint24,address,uint256,uint256,uint160))`
 * on Uniswap SwapRouter02.
 */
export const SELECTOR_UNISWAP_V3_EXACT_INPUT_SINGLE = "0x04e45aaf";

/** `transfer(address,uint256)` — a direct ERC-20 send. */
export const SELECTOR_ERC20_TRANSFER = "0xa9059cbb";

function routerForChain(chainId: number): string {
  return addressForChain(
    Protocols.uniswapV3.swapRouter02 as Partial<Record<number, string>>,
    chainId,
    "Uniswap V3 SwapRouter02"
  );
}

function requireAddress(value: string, label: string): string {
  if (!/^0x[0-9a-fA-F]{40}$/.test(value)) {
    throw new Error(
      `${label} must be a 0x-prefixed 20-byte address, got ${JSON.stringify(
        value
      )}`
    );
  }
  return value;
}

export const SessionPolicyActions = Object.freeze({
  /**
   * Let the agent swap on Uniswap V3 for this chain.
   *
   * Grants `exactInputSingle` on SwapRouter02 only — not `exactInput`,
   * `exactOutputSingle`, or the multicall entry points. Narrow on purpose: a
   * grant should authorize the operation the agent actually performs, and
   * widening it later is a new grant the owner signs, which is the point.
   *
   * Note this does NOT include the token approval the swap needs — pair it
   * with {@link erc20Approve} for the input token.
   */
  uniswapV3Swap(chainId: number, opts?: { target?: string }): v4.AllowedAction {
    const target = opts?.target
      ? requireAddress(opts.target, "target")
      : routerForChain(chainId);
    return { target, selectors: [SELECTOR_UNISWAP_V3_EXACT_INPUT_SINGLE] };
  },

  /**
   * Let the agent approve spending of one ERC-20.
   *
   * The token is the target: approving USDC and approving WETH are two
   * separate grants, so an agent allowed to approve one cannot approve the
   * other. The spend CAP is a different control — see `erc20SpendCap` on the
   * policy request, which the AllowlistModule enforces per token.
   */
  erc20Approve(token: string): v4.AllowedAction {
    return {
      target: requireAddress(token, "token"),
      selectors: [SELECTOR_ERC20_APPROVE],
    };
  },

  /** Let the agent transfer one ERC-20 directly. */
  erc20Transfer(token: string): v4.AllowedAction {
    return {
      target: requireAddress(token, "token"),
      selectors: [SELECTOR_ERC20_TRANSFER],
    };
  },

  /**
   * An action the catalog does not cover yet.
   *
   * Present so an unlisted protocol does not force Studio back to hardcoding
   * — but selectors passed here are unchecked, so prefer a named action and
   * add one when a protocol becomes common.
   */
  custom(target: string, selectors: readonly string[]): v4.AllowedAction {
    if (selectors.length === 0) {
      throw new Error(
        "custom() needs at least one selector; an empty list grants nothing"
      );
    }
    for (const s of selectors) {
      if (!/^0x[0-9a-fA-F]{8}$/.test(s)) {
        throw new Error(
          `selector must be 0x + 4 bytes, got ${JSON.stringify(s)}`
        );
      }
    }
    return {
      target: requireAddress(target, "target"),
      selectors: [...selectors],
    };
  },

  /**
   * Uniswap V3 capability compile: router `exactInputSingle` plus `approve`
   * for every ERC-20 the agent may spend as `tokenIn`.
   *
   * **Why this exists:** a USDC-only Uniswap grant (router + approve(USDC))
   * covers USDC→ETH buys but **not** demoted ETH→USDC sells, which need
   * `approve(WETH)` before `exactInputSingle`. Passing only the spend-cap
   * token is the historical Studio default and is the root of
   * FINDINGS_AA23_WETH_SELL_SESSION_SCOPE.md.
   *
   * Studio / clients should pass **both** the cap token (e.g. USDC) and
   * catalog WETH (and any other tradeable `tokenIn`) for Auto mode.
   *
   * Cap token / USD notional is still set via `erc20SpendCap` on the policy
   * request — this helper only builds allowlist rows.
   */
  uniswapV3Capability(
    chainId: number,
    opts: {
      /** Tokens the agent may `approve` for the router (must include every tokenIn). */
      approveTokens: readonly string[];
      /** Override SwapRouter02 when not using the catalog address. */
      router?: string;
    }
  ): v4.AllowedAction[] {
    if (!opts?.approveTokens?.length) {
      throw new Error(
        "uniswapV3Capability requires at least one approveTokens entry (e.g. USDC and WETH)"
      );
    }
    const actions: v4.AllowedAction[] = [
      SessionPolicyActions.uniswapV3Swap(chainId, {
        target: opts.router,
      }),
    ];
    for (const token of opts.approveTokens) {
      actions.push(SessionPolicyActions.erc20Approve(token));
    }
    return SessionPolicyActions.merge(actions);
  },

  /**
   * Merge actions that share a target, so the grant carries one entry per
   * contract.
   *
   * Worth doing rather than passing the raw list: each AllowlistModule entry
   * is its own cold SSTORE at install time, and duplicate targets also make
   * the manage screen show the same contract twice.
   */
  merge(actions: readonly v4.AllowedAction[]): v4.AllowedAction[] {
    // Match case-insensitively but return the target as first supplied. Both
    // forms satisfy the API (EthereumAddress is "lowercase or checksummed"),
    // so lowercasing would not be wrong — it would just mean merge([a]) does
    // not return `a`, and a checksummed address handed in by Studio comes back
    // flattened for the manage screen to render.
    const byKey = new Map<string, { target: string; selectors: Set<string> }>();
    for (const a of actions) {
      const key = a.target.toLowerCase();
      const entry = byKey.get(key) ?? {
        target: a.target,
        selectors: new Set<string>(),
      };
      for (const s of a.selectors) entry.selectors.add(s.toLowerCase());
      byKey.set(key, entry);
    }
    return [...byKey.values()].map(({ target, selectors }) => ({
      target,
      selectors: [...selectors],
    }));
  },
});

/**
 * Pure allowlist coverage — does `granted` cover every row in `required`?
 *
 * Same semantics Studio's `grantCoverage` uses for action rows (case-insensitive
 * target + selector). Cap-token / amount / expiry checks stay product-side.
 *
 * Used so clients can preflight demoted WETH sells against an existing
 * USDC-only grant without inventing rows.
 */
export function actionsCover(
  required: readonly v4.AllowedAction[],
  granted: readonly v4.AllowedAction[]
): boolean {
  return missingActions(required, granted).length === 0;
}

/**
 * Required `{ target, selectors[] }` rows not fully covered by `granted`.
 * A required selector is covered when some granted row for the same target
 * includes it. Partial target coverage returns only the uncovered selectors
 * on that target (or the whole row if the target is absent).
 */
export function missingActions(
  required: readonly v4.AllowedAction[],
  granted: readonly v4.AllowedAction[]
): v4.AllowedAction[] {
  const byTarget = new Map<string, Set<string>>();
  for (const g of granted) {
    const key = g.target.toLowerCase();
    const set = byTarget.get(key) ?? new Set<string>();
    for (const s of g.selectors) set.add(s.toLowerCase());
    byTarget.set(key, set);
  }
  const missing: v4.AllowedAction[] = [];
  for (const r of required) {
    const set = byTarget.get(r.target.toLowerCase());
    if (!set) {
      missing.push({ target: r.target, selectors: [...r.selectors] });
      continue;
    }
    const uncovered = r.selectors.filter((s) => !set.has(s.toLowerCase()));
    if (uncovered.length > 0) {
      missing.push({ target: r.target, selectors: uncovered });
    }
  }
  return missing;
}
