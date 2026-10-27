# SDK examples

## Wallet sweep example (#1987)

`wallet-sweep.ts` prepares a Sepolia USDC/WETH sweep from one balance capture:

1. Read the selected token balances once with a read-only workflow.
2. Compile a static `Manual → ContractWrite transfers` workflow from those amounts.

Zero balances are omitted from the transfer calls. Preparation, signing and
submission keep the captured amounts without re-reading balances. Later deposits
belong to a future sweep; a balance decrease can make the transfer fail normally.
Failed initial reads are unavailable, never zero. Token addresses and decimals
come from the catalog.

```bash
# Build the workspace packages, then point at the local gateway.
yarn build
export AVS_REST_URL=http://localhost:8080/api/v1
# Supply AVS_API_KEY or the existing development TEST_PRIVATE_KEY securely.
yarn --cwd examples sweep --source 0xSOURCE --to 0xDESTINATION
yarn --cwd examples sweep --source 0xSOURCE --to 0xDESTINATION --simulate
```

Replace the address placeholders with real addresses. Both tokens are selected
by default; `--tokens USDC` selects one. Preview prints the plan and definition,
or `workflow: null` for an empty wallet. `--simulate` also checks the complete
transfer graph without sending funds. These modes do not create a workflow,
install a grant or sign a transaction. A successful simulation does not establish
source ownership or real atomic execution.

For a real owner-signed sweep, the gateway must include
[EigenLayer-AVS #871](https://github.com/AvaProtocol/EigenLayer-AVS/pull/871) and
have `owner_execution_enabled: true`. The source must be a stored, supported
CREATE2 MA v2 wallet owned by the development `TEST_PRIVATE_KEY`, with gas funding
and positive selected token balances. An arbitrary EOA cannot use this path.

```bash
# This mode can move real Sepolia test tokens and spend testnet gas.
yarn --cwd examples sweep --source 0xSOURCE --to 0xDESTINATION --execute
# Inspect the review, then type yes to request the owner signature and submit.
# Resume receipt polling using the hash printed in the review:
yarn --cwd examples sweep --status 0xUSER_OP_HASH --wait-seconds 180
```

`--execute` prepares one priced batch through `client.workflows.prepare`. The
example independently verifies its hash, sender, owner, nonce key, chain, exact
calls and gas exposure against the plan. Its review shows amounts, destination,
funding, maximum gas cost, expiry and operation hash. Confirmation signs the 32
raw hash bytes with `personal_sign`; `client.executions.submit` sends only the
signature. The gateway frames it and relays the same operation. No session grant
is installed. The consumer Skill must use its connected wallet signer; test keys
are only for this development CLI.

The command submits once. On timeout or an uncertain send, it polls the hash from
prepare without repricing or resubmitting. A 404 remains unresolved. Keep that
hash and use `--status` to continue; an unresolved result exits with code 2, an
observed failure with 1, and confirmation or cancellation with 0. The CLI never
creates a replacement automatically. `--wait-seconds 0` performs one status read.

The shared helpers are `examples/workflows/wallet-sweep.ts` and
`wallet-sweep-execution.ts`. The thin SDK methods also support other compatible
Manual workflows with one terminal ContractWrite. Ordinary scheduled/session
workflow execution is unchanged. Native ETH sweeps, EIP-7702 sources, arbitrary
token imports and protocol exits are outside this example. See the
[owner execution contract](../docs/wallet-sweep-owner-execution.md) for the pinned
account implementation, funding and recovery boundaries.

```bash
# Offline graph, transport and owner-handoff checks.
yarn jest --runInBand tests/v4/wallet-sweep.test.ts tests/v4/wallet-sweep-execution.test.ts
# Live reads; optional simulation needs an existing funded fixture.
WALLET_SWEEP_FUNDED_SIMULATION=1 yarn jest --runInBand tests/v4/templates/wallet-sweep.test.ts
# Explicit live-write opt-in: actual CLI, two transfers, nonce and policy checks.
WALLET_SWEEP_OWNER_EXECUTION=1 WALLET_SWEEP_OWNER_SOURCE=0xDEDICATED_WALLET yarn jest --runInBand tests/v4/templates/wallet-sweep-owner.test.ts
```

Capture test output under `logs/` as required by `CLAUDE.md`. The owner execution
suite only accepts a local gateway and requires an explicit
`WALLET_SWEEP_OWNER_SOURCE`: a stored wallet owned by the development key, holding
both tokens and native gas. Use a dedicated fixture: this test empties its selected
balances. The shared CI salt-0 wallet must retain USDC for other simulation tests;
if you deliberately sweep it, restore the test tokens before running those suites.
The test never funds the fixture or installs a grant. Browser-wallet signing is
a separate integration check.

## Verification CLI

A thin command-line wrapper over `@avaprotocol/sdk-js@4` for smoke-
testing the aggregator's REST surface. Designed for Claude Code (and
any other automation) to call directly — every command emits one
valid JSON document to stdout, errors land on stderr with a non-zero
exit, and behaviour stays predictable across runs.

## Quick start

```bash
# From the repo root.
cd examples
yarn install   # symlinks @avaprotocol/sdk-js + @avaprotocol/types from workspace

export AVS_REST_URL=http://localhost:8080/api/v1
export TEST_PRIVATE_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d  # dev only
export AVS_SMART_WALLET=0x...                       # required by `verify` + `workflows:list`

yarn start help                                     # list every command
yarn start health                                   # GET /api/v1/health
yarn start verify                                   # end-to-end smoke test
yarn start workflows:create my-workflow.json
yarn start workflows:list --limit 5
yarn start executions:watch <exec-id> --workflow-id <wid> --timeout 90s
```

## Output contract

* stdout: one JSON document per command (or one per SSE frame for
  `executions:watch`). Pass `--pretty` for the legacy Node.js
  `inspect` formatting when a human is reading the output.
* stderr: errors as `{"error": {"code", "message", ...}}`.
* Exit codes:
  * `0` — success
  * `1` — user error (bad args, missing env, validation failure)
  * `2` — SDK / server error (any APIError, NetworkError, etc.)
  * `3` — timeout (`executions:watch` did not reach a terminal status)

## Commands

| Command | What it does |
|---|---|
| `help` | List every command + usage |
| `health` | GET /health (no auth) |
| `auth` | Mint a JWT via EIP-191 signature (needs `TEST_PRIVATE_KEY`) |
| `workflows:create <file.json> [--chain-id N]` | Create from a JSON payload |
| `workflows:list [--owner ADDR] [--limit N]` | List (scope to a smart wallet) |
| `workflows:get <id>` | Retrieve one workflow |
| `workflows:cancel <id>` | DELETE / cancel |
| `workflows:pause <id>` / `workflows:resume <id>` | Toggle status |
| `workflows:trigger <id> [--blocking]` | Manually fire the trigger |
| `workflows:simulate <file.json>` | Simulate without persisting |
| `nodes:run <file.json> [--idempotency-key KEY]` | Run a single node in isolation (no workflow); pass a key to make a real execute retry-safe |
| `workflows:count [--owner ADDR]` | Count workflows |
| `executions:list <workflow-id> [--limit N]` | Nested list |
| `executions:get <execution-id> --workflow-id <wid>` | Single execution |
| `executions:watch <execution-id> --workflow-id <wid> [--timeout 60s]` | SSE stream |
| `wallets:list` | Owner's smart wallets |
| `wallets:create <salt> [--factory ADDR]` | Ensure a wallet exists |
| `operators:list` | Connected operators + capabilities |
| `verify [--chain-id N]` | End-to-end smoke: auth → health → create cron workflow → pause → resume → cancel. One JSON line per step |

## Env vars

| Var | Default | Notes |
|---|---|---|
| `AVS_REST_URL` | `http://localhost:8080/api/v1` | Include the `/api/v1` prefix |
| `TEST_PRIVATE_KEY` | — | EOA key for the EIP-191 exchange. Required by `auth` + `verify` |
| `AVS_API_KEY` | — | Pre-minted JWT. Skips the exchange flow |
| `AVS_TIMEOUT_MS` | `30000` | Per-request timeout |
| `AVS_SMART_WALLET` | — | Default smart wallet for `verify` + list filters |

## verify — end-to-end smoke test

`yarn start verify` runs:
1. Auth (exchange `TEST_PRIVATE_KEY` for a JWT)
2. Health check
3. Create a cron workflow against `AVS_SMART_WALLET`
4. Pause → resume to prove state transitions
5. Cancel + cleanup

Output (one JSON line on stdout):

```json
{
  "status": "success",
  "duration_ms": 2417,
  "steps": [
    { "step": "auth", "status": "success", "details": { "ownerAddress": "0x...", "duration_ms": 102 } },
    { "step": "health", "status": "success", "details": { "status": "ok", "version": "v1.9.6" } },
    { "step": "create", "status": "success", "details": { "workflowId": "01JG...", "status": "enabled" } },
    { "step": "pause", "status": "success", "details": { "status": "disabled" } },
    { "step": "resume", "status": "success", "details": { "status": "enabled" } },
    { "step": "cancel", "status": "success" }
  ]
}
```
