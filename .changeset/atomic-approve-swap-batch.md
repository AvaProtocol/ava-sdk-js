---
"@avaprotocol/types": minor
"@avaprotocol/sdk-js": minor
---

Support atomic approve+swap batching on a single `contractWrite` node.

- `MethodCall` gains an optional per-call `contractAddress` (types + generated
  OpenAPI). When set, that call targets this address instead of the node-level
  `contractAddress`, so one node can express a heterogeneous batch — e.g. approve
  on the token + swap on the router — which the gateway submits as one atomic
  UserOp.
- `Nodes.contractWrite` exposes `contractAddress` on each method call.
- New `UniswapV3.swapWithApprovalNode` builds a token-in swap that batches the
  ERC-20 `approve` (exact `amountIn`, not unlimited) with `exactInputSingle` into
  a single atomic node — approve and swap land together or not at all.
  `swapNode` remains for the already-approved case.
