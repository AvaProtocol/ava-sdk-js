# Github Actions E2E Test Status

## Current State

**Passing suites:** workflows, triggers
**Disabled suites:** core, executions, nodes, templates (run locally only)

## Infrastructure Setup

The CI runs an aggregator and operator via Docker Compose against Sepolia.

### Operator Address (hardcoded)

`0x997E5D40a32c44a3D93E59fC55C4Fd20b7d2d49D` — set in the workflow, not a secret.

## Known Limitation: Bundler Not Reachable from CI

The ERC-4337 bundler (`localhost:4437`) is only accessible locally via SSH tunnel (`ssh -L 4437:localhost:4437 ap-staging1`). GitHub Actions runners cannot reach it, causing all on-chain write operations (withdrawals, contract writes, ETH transfers, triggered workflows with execution) to timeout.

This affects the disabled test suites: core, nodes, templates, executions. These should be run locally where the bundler tunnel is available.

## Test Wallet

Address: `0x689337FdB82Da60FD0D5803b41a1614a2fDd6113` (Smart Wallet, salt:2)
Must be funded with Sepolia ETH for withdraw and transfer tests.
