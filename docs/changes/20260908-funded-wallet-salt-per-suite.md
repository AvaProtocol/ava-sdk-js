# Funded UserOp salt per CI suite

- **Date**: 2026-09-08
- **Status**: Implemented
- **Branch**: staging
- **Related**: [#263](https://github.com/AvaProtocol/ava-sdk-js/issues/263), [docs/changes/20260907-remove-v3-archive-fix-ci-operator-auth.md](20260907-remove-v3-archive-fix-ci-operator-auth.md)

## Problem

Every real-bundler test used `getFundedFixture()` → MA v2 salt `"0"` on `TEST_PRIVATE_KEY`. GitHub Actions runs `core` / `executions` / `nodes` (and the other shards) in parallel, so two `eth_sendUserOperation`s raced one EntryPoint nonce. The bundler returned `replacement underpriced`; `workflows.trigger` folded that into `1 of 2 steps failed: <nodeId>`, so envelope-level retry did not fire.

Retrying sequential withdraws in one file is still useful (`--runInBand`). It cannot fix cross-job races.

## Decision

Assign a **static salt per CI suite directory**, not per `test()` case:

| Suite | Salt | Why |
|---|---|---|
| `tests/v4/core` (withdraw) | `"0"` | Real UserOps |
| `tests/v4/executions` (gasTracking) | `"1"` | Real UserOps |
| `tests/v4/nodes` (contractWrite, ethTransfer) | `"2"` | Real UserOps; files in this shard share a salt because they run `--runInBand` |
| templates / workflows / triggers | `"0"` | No parallel bundler send (templates USDC path is Tenderly simulate) |

Only `"0" | "1" | "2"` so a `TEST_ENV=railway` run stays inside production's 3-wallet cap. `FUNDED_WALLET_SALT` env still overrides for debugging.

`getFundedWallet` / `getFundedFixture` call `fundedWalletSalt()`. CI sets `FUNDED_WALLET_SALT` per matrix job (source of truth on GitHub Actions). Local `yarn test:<suite>` infers the same map from Jest `testPath`. Under Jest with no path and no env, it throws rather than silently reusing salt `"0"`. CREATE2(owner, factory, salt) is stable — fund each of the three addresses once.

Per-test-case salts were rejected: a file can send several UserOps sequentially (withdraw), and more than three unique salts on one owner 429s on production.

## Verification

- `fundedSaltForTestPath` / `fundedWalletSalt` unit tests in `tests/v4/core/suiteSalt.test.ts` (no gateway).
- Skip messages print the suite salt + derived address so an unfunded shard is obvious.
