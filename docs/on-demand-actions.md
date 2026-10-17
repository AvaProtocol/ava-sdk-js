# On-demand workflow actions

Build on-demand actions as complete workflows with a manual trigger. Preview
with `client.workflows.simulate`, then create and trigger the workflow to execute.
The same graph is used for both modes; nodes have no execution-mode setting.

- `UniswapV3.swapWithApprovalNode` batches the exact approval and swap atomically.
- `UniswapV3.swapNode` requires an existing approval or a preceding approval node.
- `UniswapV3.quoteNode` produces a `contractRead` node. QuoterV2 is called through
  read-only `eth_call`, so the quote can still use `client.nodes.run`.
- `UniswapV3.minAmountOut` computes a slippage floor from a quote.
- `client.userops.retrieve` polls a pending UserOp; pending is not a failure.

Standalone contract writes and native transfers, including loops with those
runners, are rejected. Keep approval and the dependent action in the same
workflow so preview and execution include the prerequisites.

See [Workflow simulation](workflow-simulation.md) for execution-mode rules.
