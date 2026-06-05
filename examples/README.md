# examples/example.ts — agent-friendly verification CLI

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
