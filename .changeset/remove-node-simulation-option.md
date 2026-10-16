---
"@avaprotocol/sdk-js": major
"@avaprotocol/types": major
---

Remove the per-node `isSimulated` configuration option. Workflow simulation
previews all actions and deployed workflows execute all actions. Standalone
contract writes and native transfers (including loop runners) require a complete
workflow. Uniswap quotes now use contractRead through read-only eth_call.
