# Workflow simulation

Execution mode belongs to the complete workflow. `client.workflows.simulate`
previews every blockchain action; deployed workflows execute every action.
Node configuration contains no simulation-mode option.

Include approval and its dependent action in the same graph. During simulation,
the gateway carries storage changes and successful approval effects into the
following Tenderly write. It does not submit the approval on-chain or create
missing approvals automatically. Real execution performs the approval first.

`client.nodes.run` supports read and data operations only. Contract writes and
native transfers, including loops with those runners, return HTTP 400. Use the
complete workflow so prerequisites run in the correct order.

The runtime `executionContext.is_simulated` result still reports how a step ran.
It is an output field, not a node setting.

## Migration

Remove `isSimulated` from contract-write configuration and builder options.
JavaScript callers and pre-built options objects may still contain extra keys;
this does not restore the old behavior. `nodes.run` rejects blockchain actions
with HTTP 400. Move them and their prerequisites into a complete workflow.

`erc20Overrides` is deprecated on `RunNodeRequest`; nonempty values are rejected.
Use the workflow's automatic state propagation from preceding simulated steps.

`UniswapV3.quoteNode` now produces `contractRead`. Read the quote from
`output.data.quoteExactInputSingle`, rather than contract-write receipts.
