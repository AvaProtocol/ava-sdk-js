# E2E Test Failures Analysis

**Run:** [#23579169424](https://github.com/AvaProtocol/ava-sdk-js/actions/runs/23579169424)
**Date:** 2026-03-26
**Branch:** `fix/ci-operator-setup-and-balance-tests`

## Summary

| Suite | Result | Passed | Failed | Total |
|---|---|---|---|---|
| triggers | ✅ Pass | — | 0 | — |
| workflows | ✅ Pass | — | 0 | — |
| core | ❌ Fail | 87 | 4 | 91 |
| templates | ❌ Fail | 45 | 3 | 49 |
| nodes | ❌ Fail | 165 | 6 | 171 |
| executions | ❌ Fail | 47 | 3 | 50 |

**Total: 16 test failures across 4 suites**

---

## Failure Categories

### 1. gRPC/Test Timeouts (8 failures)

These tests exceed their 60s timeout, likely because on-chain transactions via the bundler/paymaster take longer in CI than locally.

| Suite | Test | Error |
|---|---|---|
| core | `withdraw.test.ts` — should successfully initiate ETH withdrawal with minimal parameters | Exceeded timeout of 60000 ms |
| core | `withdraw.test.ts` — should handle withdrawal to different recipient address | Exceeded timeout of 60000 ms |
| core | `withdraw.test.ts` — should work with request-level auth key | gRPC request timeout after 30000ms for method withdrawFunds |
| core | `withdraw.test.ts` — should return properly formatted response for successful withdrawal | Exceeded timeout of 60000 ms |
| templates | `test-single-approve-with-simulation.test.ts` — contractWrite real execution validates approval persistence | gRPC request timeout after 60000ms for method runNodeWithInputs |
| templates | `test-single-approve-with-simulation.test.ts` — contractWrite (approve) - explicit isSimulated parameter behavior | gRPC request timeout after 60000ms for method runNodeWithInputs |
| nodes | `contractWrite.test.ts` — should return consistent response format across all methods | Exceeded timeout of 60000 ms |
| nodes | `ethTransfer.test.ts` — should deploy and trigger workflow with ETH transfer | Exceeded timeout of 60000 ms |

**Root cause:** On-chain write operations (withdrawals, contract writes, ETH transfers) go through the bundler and paymaster, which can be slow on Sepolia. The 30-60s timeouts are too short for CI. Locally these likely succeed because the network is faster or the wallet state is warm.

**Potential fix:** Increase test timeouts for on-chain write operations (e.g., 120-180s), or use `jest.setTimeout` per-test for known slow operations.

### 2. RPC Block Not Found (2 failures)

| Suite | Test | Error |
|---|---|---|
| nodes | `contractRead.test.ts` — should simulate workflow with contract read | `simulation failed: failed to get block header for block 10523674 from RPC: not found` |
| nodes | `ethTransfer.test.ts` — should simulate zero ETH transfer | `simulation failed: failed to get block header for block 10522793 from RPC: not found` (from previous run) |

**Root cause:** The simulation uses a specific Sepolia block number (likely from `getBlockNumber()` at test setup), but the CI's RPC node may not serve old/recent block headers. The RPC endpoint may be a non-archive node that prunes block headers.

**Potential fix:** Either use an archive RPC node in CI, or adjust the simulation to use a recent confirmed block.

### 3. DNS Resolution Mismatch (1 failure)

| Suite | Test | Error |
|---|---|---|
| nodes | `graphqlQuery.test.ts` — should fail runNodeWithInputs with variables and return network error | Expected: `"dial tcp: lookup mock-api.ap-aggregator.local: no such host"`, Received: `"...server misbehaving"` |

**Root cause:** The test asserts a specific DNS error message for an intentionally invalid hostname. The CI runner's DNS resolver returns `server misbehaving` instead of `no such host`. This is a test assertion issue, not a real failure.

**Potential fix:** Loosen the assertion to accept any DNS/network error (e.g., check for `dial tcp` or `lookup` instead of the exact message).

### 4. Null Response from Trigger (1 failure)

| Suite | Test | Error |
|---|---|---|
| nodes | `ethTransfer.test.ts` — should deploy and trigger workflow with zero ETH transfer | `TypeError: Cannot read properties of null (reading 'transfer')` |

**Root cause:** The trigger response returned null output for the ETH transfer node. This may be related to the timeout cascade — if the trigger takes too long, the response may not have populated the transfer object yet.

**Potential fix:** Add a null check before accessing `transfer` property, or increase the wait time for trigger completion.

### 5. Loop Node Data Format (1 failure)

| Suite | Test | Error |
|---|---|---|
| nodes | `loopNode.test.ts` — should return flattened data format for contract_read runner in loop | Expected: `true`, Received: `false` |

**Root cause:** The loop node with a `contract_read` runner is not returning data in the expected flattened format. This may be a behavioral difference in the aggregator version deployed in CI vs what the test expects.

**Potential fix:** Investigate whether the flattening behavior changed in the aggregator. May need to update the test assertion or fix the aggregator.

### 6. Execution Index Non-Consecutive (1 failure)

| Suite | Test | Error |
|---|---|---|
| executions | `execution.test.ts` — should return immediate executionId for non-blocking triggers and assign consecutive indexes | Expected: `1`, Received: `3` |

**Root cause:** The test expects consecutive execution indexes (difference of 1), but got a gap of 3. This happens because other parallel test suites share the same aggregator and increment the global execution counter. The test comment even acknowledges this: _"This accounts for global counter being affected by other concurrent tests"_ — but the assertion is still too strict.

**Potential fix:** Relax the assertion to check that indexes are monotonically increasing rather than strictly consecutive.

### 7. Backward Pagination Empty (1 failure)

| Suite | Test | Error |
|---|---|---|
| executions | `getExecutions.test.ts` — should support backward pagination with before parameter | Expected: `> 0`, Received: `0` |

**Root cause:** The backward pagination query returned 0 results. This may be a timing issue — the test creates executions and immediately queries with a `before` cursor, but the executions may not be indexed yet.

**Potential fix:** Add a small delay or retry logic between creating executions and querying with backward pagination.

### 8. Gas Tracking Timeout (1 failure)

| Suite | Test | Error |
|---|---|---|
| executions | `gasTracking.test.ts` — should include gas tracking fields in contract write execution | Exceeded timeout of 60000 ms |

**Root cause:** Same as category 1 — contract write execution takes too long for the 60s timeout.

**Potential fix:** Increase timeout for gas tracking tests that involve on-chain writes.

### 9. Uniswap Stoploss Expired Task (1 failure)

| Suite | Test | Error |
|---|---|---|
| templates | `uniswapv3_stoploss.test.ts` — should deploy and trigger stoploss workflow end-to-end | `FAILED_PRECONDITION: task cannot be executed: either reached max execution, expired, or not yet started` |

**Root cause:** The stoploss workflow's task expired before it could be triggered, or has already reached its max execution count. This is likely a timing issue — the task's expiration window is too short for CI execution speed.

**Potential fix:** Set a longer expiration window in the test task configuration.
