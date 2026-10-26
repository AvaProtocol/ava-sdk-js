# SDK examples

## Wallet sweep workflow example (#1987)

`wallet-sweep.ts` composes **existing gateway nodes** for Sepolia USDC and WETH:

`Manual → ContractRead balances → snapshot check → Branch → ContractWrite transfers`

It first runs a read-only preview to omit zero balances and compile exact amounts
into one multi-target write node. The complete workflow re-reads those balances
and takes a failure branch if the snapshot changed. A failed read is unavailable,
never zero. Token addresses/decimals come from the chain catalog.

```bash
# Build the workspace packages first, then use an existing development JWT.
yarn build
export AVS_REST_URL=http://localhost:8080/api/v1
export AVS_API_KEY=... # never commit this value
yarn --cwd examples sweep --source 0xSOURCE --to 0xDESTINATION
yarn --cwd examples sweep --source 0xSOURCE --to 0xDESTINATION --simulate
```

Replace the address placeholders with actual addresses. Both tokens are selected
by default; `--tokens USDC` selects just USDC. The source must hold the selected
tokens to simulate a positive transfer. Alternatively, the existing development
`TEST_PRIVATE_KEY` can authenticate the CLI when no JWT is set; it only signs the
login message. The consumer Skill must use its connected wallet.

The first command prints the fresh plan and compiled workflow, or `workflow: null`
for an empty wallet. `--simulate` also runs the transfer workflow through
`workflows.simulate`. Both commands are non-persistent: no workflow creation,
trigger, grant, transaction signing or on-chain send occurs.

This is the **workflow/simulation phase**, not owner-signed execution. The current
gateway workflow route executes write methods separately; one multi-call node
does not yet prove one atomic UserOperation. Owner-signature handoff and deliberate
batch execution remain gateway/SDK work tracked in
[Studio #1987](https://github.com/AvaProtocol/studio/issues/1987). Native ETH,
EIP-7702 setup, arbitrary token imports and protocol exits are outside this demo.
A passing simulation does not establish source-wallet ownership or signing support.

The [owner-signed execution contract](../docs/wallet-sweep-owner-execution.md)
records the audited gateway reuse points and next-phase checks: explicit batch
encoding, entity-0/global nonce selection, raw-hash personal signing, finalized
gas/sponsorship before signing, unchanged signed fields on relay and the existing
status ownership boundary. It does not add execution support to this example.

The shared factory is `examples/workflows/wallet-sweep.ts`. Offline tests cover
exact amounts, exclusions, invalid inputs, stale snapshots and SDK transport;
`tests/v4/templates/wallet-sweep.test.ts` checks real gateway reads and stale-plan
refusal without funding a wallet. Set `WALLET_SWEEP_FUNDED_SIMULATION=1` to also
run its funded test against the existing test owner's salt-0 Sepolia account.
That account must already hold both tokens; the test neither funds it nor installs
a grant. It checks both transfer results and unchanged source balances afterward.
All gateway tests require the existing test environment/auth configuration.

```bash
# Pure graph/transport tests; no gateway needed.
yarn jest --runInBand tests/v4/wallet-sweep.test.ts
# Live reads and stale-plan refusal, plus the optional funded simulation.
WALLET_SWEEP_FUNDED_SIMULATION=1 yarn jest --runInBand tests/v4/templates/wallet-sweep.test.ts
```

When running these tests, capture their output under `logs/` as described in
the repository's `CLAUDE.md`. The example intentionally has no execute flag.

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
