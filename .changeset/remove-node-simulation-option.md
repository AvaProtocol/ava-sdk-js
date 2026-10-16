---
"@avaprotocol/sdk-js": major
"@avaprotocol/types": major
---

Remove the per-node `isSimulated` configuration option. Workflow simulation
previews all actions and deployed workflows execute all actions. Standalone
contract writes and native transfers (including loop runners) require a complete
workflow. `UniswapV3.quoteNode` now uses contractRead through read-only eth_call.
Single-node `erc20Overrides` are deprecated and nonempty values are rejected.
