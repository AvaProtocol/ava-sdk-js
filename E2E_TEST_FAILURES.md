# E2E Test Failures Analysis

**CI Run:** [#23579169424](https://github.com/AvaProtocol/ava-sdk-js/actions/runs/23579169424)
**Date:** 2026-03-26
**Branch:** `fix/ci-operator-setup-and-balance-tests`

## Summary

| Suite | Result | Passed | Failed | Total |
|---|---|---|---|---|
| triggers | Pass | — | 0 | — |
| workflows | Pass | — | 0 | — |
| core | Fail | 87 | 4 | 91 |
| templates | Fail | 45 | 3 | 49 |
| nodes | Fail | 165 | 6 | 171 |
| executions | Fail | 47 | 3 | 50 |

**Total: 16 test failures across 4 suites**

## Local vs CI Comparison

Each failing test file was run locally against the dev aggregator+operator to determine if failures are CI-specific or reproducible.

| Test File | CI | Local | Verdict |
|---|---|---|---|
| `tests/core/withdraw.test.ts` | 4 failed (timeouts) | 5 failed (timeouts) | **Fails both** — on-chain withdrawals timeout everywhere |
| `tests/templates/test-single-approve-with-simulation.test.ts` | 2 failed (gRPC timeout) | 2 failed (gRPC timeout) | **Fails both** — contractWrite `runNodeWithInputs` times out |
| `tests/templates/uniswapv3_stoploss.test.ts` | 1 failed (expired task) | 3 failed | **Fails both** — stoploss workflow has timing/expiration issues |
| `tests/nodes/graphqlQuery.test.ts` | 1 failed (DNS mismatch) | 0 failed | **CI-only** — DNS resolver returns different error message |
| `tests/nodes/contractRead.test.ts` | 1 failed (block not found) | 0 failed | **CI-only** — CI RPC node can't find block header |
| `tests/nodes/loopNode.test.ts` | 1 failed (data format) | 1 failed (data format) | **Fails both** — loop flattening mismatch is a real bug |
| `tests/nodes/ethTransfer.test.ts` | 2 failed (timeout + null) | 4 failed (timeouts) | **Fails both** — triggerTask times out at 120s |
| `tests/nodes/contractWrite.test.ts` | 1 failed (timeout) | 3 failed (timeouts) | **Fails both** — triggerTask times out at 120s |
| `tests/executions/getExecutions.test.ts` | 1 failed (pagination) | 1 failed (pagination) | **Fails both** — backward pagination returns 0 results |
| `tests/executions/execution.test.ts` | 1 failed (index gap) | 1 failed (index gap) | **Fails both** — non-consecutive execution indexes |
| `tests/executions/gasTracking.test.ts` | 1 failed (timeout) | 2 failed (timeouts) | **Fails both** — contract write gas tracking times out |

### Summary by verdict

- **CI-only failures (2):** graphqlQuery DNS mismatch, contractRead block not found
- **Fails both local and CI (9 test files, 14 CI failures):** These are real issues, not CI environment problems

---

## Failure Categories

### 1. On-chain Operation Timeouts (10 failures — fails both locally and CI)

Tests involving on-chain writes (withdrawals, contract writes, ETH transfers) consistently timeout at 30-120s. This affects `withdraw.test.ts`, `contractWrite.test.ts`, `ethTransfer.test.ts`, `gasTracking.test.ts`, and `test-single-approve-with-simulation.test.ts`.

| Suite | Test | Error |
|---|---|---|
| core | `withdraw.test.ts` — should successfully initiate ETH withdrawal with minimal parameters | Exceeded timeout of 60000 ms |
| core | `withdraw.test.ts` — should handle withdrawal to different recipient address | Exceeded timeout of 60000 ms |
| core | `withdraw.test.ts` — should work with request-level auth key | gRPC timeout after 30000ms for withdrawFunds |
| core | `withdraw.test.ts` — should return properly formatted response for successful withdrawal | Exceeded timeout of 60000 ms |
| templates | `test-single-approve-with-simulation.test.ts` — contractWrite real execution validates approval persistence | gRPC timeout after 60000ms for runNodeWithInputs |
| templates | `test-single-approve-with-simulation.test.ts` — contractWrite (approve) - explicit isSimulated parameter behavior | gRPC timeout after 60000ms for runNodeWithInputs |
| nodes | `contractWrite.test.ts` — should return consistent response format across all methods | Exceeded timeout of 60000 ms |
| nodes | `ethTransfer.test.ts` — should deploy and trigger workflow with ETH transfer | Exceeded timeout of 60000 ms |
| executions | `gasTracking.test.ts` — should include gas tracking fields in contract write execution | Exceeded timeout of 60000 ms |
| nodes | `ethTransfer.test.ts` — should deploy and trigger workflow with zero ETH transfer | Null response (timeout cascade) |

**Root cause:** On-chain write operations go through the bundler and paymaster on Sepolia. The bundler is slow — `triggerTask` calls timeout at 120s even with retries. This is not a test issue but a Sepolia bundler/paymaster performance issue.

**Potential fix:** Investigate bundler latency. If the bundler is consistently slow, either increase timeouts significantly (180-300s) or use a faster bundler endpoint.

### 2. Loop Node Data Format Bug (1 failure — fails both)

| Suite | Test | Error |
|---|---|---|
| nodes | `loopNode.test.ts` — should return flattened data format for contract_read runner in loop | Expected `Array.isArray(result.data)` to be `true`, got `false` |

**Root cause:** The loop node with a `contract_read` runner returns data in an unexpected format. `result.data` is not an array. This is a real bug in the aggregator's loop node flattening logic, not a test issue.

**Potential fix:** Fix the aggregator's loop node to return flattened array format for `contract_read` runners, or update the test if the format intentionally changed.

### 3. Execution Index Non-Consecutive (1 failure — fails both)

| Suite | Test | Error |
|---|---|---|
| executions | `execution.test.ts` — should return immediate executionId for non-blocking triggers and assign consecutive indexes | Expected difference of `1`, received `3` |

**Root cause:** Execution indexes are not consecutive even when running locally (not just a parallel CI issue). The global execution counter has gaps, possibly due to failed/cancelled executions consuming index values.

**Potential fix:** The test assertion is too strict. Change to check monotonically increasing rather than strictly consecutive.

### 4. Backward Pagination Empty (1 failure — fails both)

| Suite | Test | Error |
|---|---|---|
| executions | `getExecutions.test.ts` — should support backward pagination with before parameter | Expected: `> 0`, Received: `0` |

**Root cause:** The backward pagination `before` cursor query returns 0 results both locally and in CI. This suggests a real bug in the backward pagination implementation or the cursor value used is incorrect.

**Potential fix:** Investigate the backward pagination logic in the aggregator. The cursor may be pointing to the wrong position.

### 5. Uniswap Stoploss Timing Issues (1 failure — fails both)

| Suite | Test | Error |
|---|---|---|
| templates | `uniswapv3_stoploss.test.ts` — should deploy and trigger stoploss workflow end-to-end | `FAILED_PRECONDITION: task cannot be executed: either reached max execution, expired, or not yet started` |

**Root cause:** The stoploss workflow expires or reaches max executions before the test can trigger it. Locally, 3 out of 4 tests fail with similar timing issues. The test's expiration window is too tight.

**Potential fix:** Increase the task expiration window in the test configuration, or add a longer delay before triggering.

### 6. CI-Only: DNS Resolution Mismatch (1 failure — CI only)

| Suite | Test | Error |
|---|---|---|
| nodes | `graphqlQuery.test.ts` — should fail runNodeWithInputs with variables and return network error | Expected: `"no such host"`, Received: `"server misbehaving"` |

**Root cause:** The CI runner's DNS resolver (Docker's 127.0.0.11:53) returns `server misbehaving` for invalid hostnames, while local resolvers return `no such host`. Passes locally.

**Potential fix:** Loosen the assertion to check for `dial tcp` or general network error instead of exact DNS message.

### 7. CI-Only: RPC Block Not Found (1 failure — CI only)

| Suite | Test | Error |
|---|---|---|
| nodes | `contractRead.test.ts` — should simulate workflow with contract read | `failed to get block header for block 10523674 from RPC: not found` |

**Root cause:** The CI's Sepolia RPC endpoint cannot find the specific block header used in simulation. Passes locally because local RPC endpoint is different (likely archive node).

**Potential fix:** Ensure CI uses an archive RPC node, or adjust simulation to use a well-known confirmed block.
