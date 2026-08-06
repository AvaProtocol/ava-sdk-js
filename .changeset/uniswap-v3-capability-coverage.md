---
"@avaprotocol/sdk-js": minor
---

feat: `SessionPolicyActions.uniswapV3Capability` + allowlist coverage helpers

Compile Uniswap session grants with `approve` for every `tokenIn` (USDC **and**
WETH for Auto demote sells), not only the spend-cap token. Export
`actionsCover` / `missingActions` so Studio can preflight demoted sells before
`nodes:run`.

Pairs with EigenLayer-AVS session-grant allowlist preflight
(`SESSION_POLICY_TARGET_NOT_ALLOWED`).
