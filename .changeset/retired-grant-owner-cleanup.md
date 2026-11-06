---
"@avaprotocol/types": patch
"@avaprotocol/sdk-js": patch
---

Expose the optional `Problem.onChainCleanup` payload for
`BUDGET_RETIRED_GRANT_INSTALLED`. Budget preparation and submission preserve the
owner-directed removal call without submitting or retrying it automatically.
