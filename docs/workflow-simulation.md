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
