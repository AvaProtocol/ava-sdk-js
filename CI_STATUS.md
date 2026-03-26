# CI E2E Test Status

## Current State

**Passing suites:** workflows, triggers
**Disabled suites:** core, executions, nodes, templates (run locally only)

## Infrastructure Setup

The CI runs an aggregator and operator via Docker Compose against Sepolia.

### Required GitHub Secrets (dev environment)

| Secret | Purpose |
|---|---|
| `ECDSA_PRIVATE_KEY` | Aggregator ECDSA signing key |
| `JWT_SECRET` | Aggregator JWT authentication |
| `CONTROLLER_PRIVATE_KEY` | Smart wallet controller key |
| `ETH_RPC_URL` | Sepolia RPC endpoint |
| `ETH_WS_URL` | Sepolia WebSocket endpoint |
| `CHAIN_ENDPOINT` | Chain RPC for test client |
| `TEST_PRIVATE_KEY` | Test wallet private key |
| `OPERATOR_ECDSA_KEYSTORE` | Operator ECDSA keystore JSON content |
| `OPERATOR_ECDSA_KEY_PASSWORD` | Password for operator ECDSA keystore |
| `OPERATOR_BLS_KEYSTORE` | Operator BLS keystore JSON content |
| `OPERATOR_BLS_KEY_PASSWORD` | Password for operator BLS keystore |
| `AP_NOTIFY_BOT_TOKEN` | Notification bot token |
| `MORALIS_API_KEY` | Moralis API key |
| `SENDGRID_KEY` | SendGrid email API key |
| `CONTEXT_MEMORY_API_KEY` | Context memory service key |
| `TENDERLY_ACCESS_KEY` | Tenderly simulation key |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token |
| `TELEGRAM_CHAT_ID` | Telegram chat ID |

### Required GitHub Variables (dev environment)

| Variable | Purpose |
|---|---|
| `BUNDLER_URL` | ERC-4337 bundler endpoint |
| `TENDERLY_ACCOUNT` | Tenderly account name |
| `TENDERLY_PROJECT` | Tenderly project name |
| `THEGRAPH_API_KEY` | The Graph API key |

### Operator Address (hardcoded)

`0x997E5D40a32c44a3D93E59fC55C4Fd20b7d2d49D` — set in the workflow, not a secret.

## Known Limitation: Bundler Not Reachable from CI

The ERC-4337 bundler (`localhost:4437`) is only accessible locally via SSH tunnel (`ssh -L 4437:localhost:4437 ap-staging1`). GitHub Actions runners cannot reach it, causing all on-chain write operations (withdrawals, contract writes, ETH transfers, triggered workflows with execution) to timeout.

This affects the disabled test suites: core, nodes, templates, executions. These should be run locally where the bundler tunnel is available.

## Test Wallet

Address: `0x689337FdB82Da60FD0D5803b41a1614a2fDd6113` (Smart Wallet, salt:2)
Must be funded with Sepolia ETH for withdraw and transfer tests.
