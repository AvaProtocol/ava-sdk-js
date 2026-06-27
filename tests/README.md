# Tests

All v4 (REST) tests live under `tests/v4/`. They run against a local
aggregator REST endpoint — boot it with `docker compose up -d` from
the root of this repo and point `AVS_REST_URL` at the gateway.

```bash
export AVS_REST_URL=http://localhost:8080/api/v1
export TEST_PRIVATE_KEY=0x...                       # EOA for auth flow
yarn test
```

`tests-v3-archive/` holds the legacy gRPC test suite (44 files). They
are excluded from `yarn test` because the v3 surface has been
removed. They stay in the repo as reference material for partners
migrating their own tests over to v4; once the SDK has been on v4 for
a release cycle, the archive is deleted.

Conversion guide (deterministic — behaviour is unchanged, only the
SDK call sites move):

| v3                                      | v4                                            |
|-----------------------------------------|-----------------------------------------------|
| `client.createWorkflow(req)`            | `client.workflows.create(req)`                |
| `client.getWorkflow(id)`                | `client.workflows.retrieve(id)`               |
| `client.getWorkflows(opts)`             | `client.workflows.list(opts)`                 |
| `client.deleteWorkflow(id)`             | `client.workflows.cancel(id)`                 |
| `client.setTaskEnabled(id, true)`       | `client.workflows.resume(id)`                 |
| `client.setTaskEnabled(id, false)`      | `client.workflows.pause(id)`                  |
| `client.triggerWorkflow(id, body)`      | `client.workflows.trigger(id, body)`          |
| `client.simulateWorkflow(req)`          | `client.workflows.simulate(req)`              |
| `client.getExecutions(opts)`            | `client.executions.list(opts)`                |
| `client.getExecution(id, {workflowId})` | `client.executions.retrieve(id, {workflowId})`|
| `client.getWallet({salt})`              | `client.wallets.create({salt})`               |
| `client.getWallets()`                   | `client.wallets.list()`                       |
| `client.createSecret(name, val)`        | `client.secrets.put(name, {value: val})`      |
| `client.runNodeWithInputs(req)`         | `client.nodes.run(req)`                       |
| `client.runTrigger(req)`                | `client.triggers.run(req)`                    |
| `client.estimateFees(req)`              | `client.workflows.estimateFees(req)`          |
| `client.getTokenMetadata(addr)`         | `client.tokens.retrieve(addr)`                |

Trigger/Node construction also moves from class instances to the
builder helpers:

| v3                                      | v4                                            |
|-----------------------------------------|-----------------------------------------------|
| `TriggerFactory.create(CronTrigger,…)`  | `Triggers.cron({ name, schedule })`           |
| `NodeFactory.create(RestAPiNode,…)`     | `Nodes.restApi({ id, name, url, method })`    |
| `NodeFactory.create(CustomCodeNode,…)`  | `Nodes.customCode({ id, name, source })`     |
