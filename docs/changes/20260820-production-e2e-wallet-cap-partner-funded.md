# Production e2e: wallet cap, partner assertion, funded salt-2

- **Date**: 2026-08-20
- **Status**: In progress — step 1 (avs-infra `read` grant) shipped, deployed and verified 2026-08-20; steps 2–3 implemented in the working tree; step 4 (full re-run) pending
- **Branch**: staging
- **Related**: full v4 suite against `https://api.avaprotocol.org/api/v1` (`4.17.0`); log `logs/20260820-162128-full-e2e-prod.log`; avs-infra `railway/configs/gateway-railway.yaml`; Studio `GATEWAY_STUDIO_PARTNER_KEY`

## Problem

The 2026-08-20 production run of `TEST_ENV=railway yarn test` was **41 failed / 11 passed / 2 skipped** suites (161 failed / 227 passed tests in 78s). Every failure collapsed into two wire errors, plus a third class of tests that never got a chance to run their on-chain path:

1. `429 max smart wallet count reached for owner (limit=3)` — 226 times
2. `401 PARTNER_ASSERTION_INVALID` on `GET /tokens/*` — 36 times, all `getToken.test.ts`
3. Funded UserOp tests (`withdraw`, `contractWrite` trigger, `ethTransfer` trigger) share `TEST_PRIVATE_KEY` + salt `"2"`, but `create({ salt: "2" })` without a factory does not resolve that funded wallet on production.

CI still passes because `config/gateway.yaml` sets `max_wallets_per_owner: 2000` and the local partner key + `avs-gateway-local` audience match the docker gateway. Production is a different contract.

## Evidence (live probes against production 4.17.0)

### 1. Wallet cap is per-chain unique addresses, and 4 > 3

Config: every chain in `avs-infra/railway/configs/gateway-railway.yaml` has `max_wallets_per_owner: 3`. Engine enforces it only on **new** DB rows, counting unique addresses for `(chainId, owner)` (`EigenLayer-AVS/core/taskengine/engine.go`). Idempotent re-create of an existing `(factory, salt)` is uncapped.

Probes on a throwaway EOA:

| Experiment | Result |
|---|---|
| create salts `0,1,2,3` on Sepolia | `0,1,2` OK; `3` → 429 limit=3 |
| recreate salt `0` after hitting the cap | OK (same address) |
| create salt `0` on Base Sepolia (84532) after Sepolia is full | OK — quota is per chain |
| `wallet.test.ts` lex order salts `10,2,0,1` | 4th salt (`1`) 429 |
| rewritten lex salts `10,2,0` | all OK; list order `0,10,2` is lexicographic |
| 6 unique salts | 3 failures starting at index 3 |
| 6× salt `"0"` | 0 failures |

A **process-wide** isolated `TEST_PRIVATE_KEY` does not fix a full `yarn test`: the first few files burn the 3 slots, later files fail. `getIsolatedClient()` per file is also not enough by itself: `wallet.test.ts` has 19 create sites / 9 `nextTestSalt()`; `workflow.test.ts` and `getExecutions.test.ts` already isolate **and still failed** because they keep minting unique salts on that one EOA.

`createSmartWallet()` defaults to `nextTestSalt()` (`tests/utils/client.ts`) — unique per worker **and** per run, designed for CI's 2000 cap. That default is the production-incompatible part.

### 2. Partner: wrong key, wrong audience, and production does not grant `read`

Signature verification runs **before** audience and scope (`aggregator/rest/partner.go`). Error codes therefore diagnose the first failing check:

| Key | `aud` | `scope` | Live result |
|---|---|---|---|
| ava-sdk-js `.env` (local) | local / staging / prod | `read` | `401 PARTNER_ASSERTION_INVALID` |
| Studio `.env.production` / `.env.preview` | `avs-gateway-staging` | `read` | `401 PARTNER_ASSERTION_AUDIENCE` — `aud` must include `avs-gateway-prod` |
| Studio production key | `avs-gateway-prod` | `read` | `403 PARTNER_SCOPE_DENIED` — partner `"studio"` is **not granted** `read` |
| Studio production key | `avs-gateway-prod` | `simulate` or `read,simulate` | still `403 PARTNER_SCOPE_DENIED` for `read` (`GET /tokens` requires `read`) |

Public-key fingerprint of Studio production/preview `GATEWAY_STUDIO_PARTNER_KEY` matches the registry entry `6+YmyiVFzBGhuVnvYwUr595wxcrngdT6BzcI2jjQjU4=` in `gateway-railway.yaml`. The ava-sdk-js `.env` key is a **different** key (local docker partner).

`gateway-railway.yaml` currently has `partners[studio].scopes: [simulate]` and `partner_assertion_audience: "avs-gateway-prod"`. Studio's own `STUDIO_PARTNER_READ_ADOPTION.md` already says production must grant `read` (simulate no longer authorizes token metadata). The live 403 confirms the yaml is what is deployed.

So `getToken.test.ts` cannot go green on production from an SDK env change alone.

### 3. Funded salt-2 exists, but `create({ salt: "2" })` does not hit it

Shared test EOA `0x804e…1557` Sepolia list (4 unique addresses, already **over** the cap of 3):

- salt `0` on factory `0x0000…6fecd` (current default)
- salt `0`, `1`, `2` on factory `0xB99B…2834` (legacy)

On-chain at salt-2 `0x5a8A…8856` (legacy factory): **0.043 ETH**, **25.92 USDC**. Funded.

A **fresh** EOA's `wallets.create({ salt: "0" })` uses default factory `0x0000…6fecd`. `create({ salt: "2" })` on the shared EOA therefore derives a **new** address on the default factory, misses the funded row, trips 429.

Isolated empty wallet:

- Tenderly `nodes.run` `approve(..., 0)` → `success=true`, `is_simulated=true`, `provider=tenderly` (no funds needed)
- `withdraw` amount `0` → `400 WITHDRAW_BAD_AMOUNT` (validation works)
- `withdraw` 0.001 ETH → `400 insufficient balance` — `submitWithdrawOrSkip` already treats 400 as a skip

Real UserOps must use the **existing** salt-2 + **legacy factory** on the shared EOA. Simulate/validation must not.

## Decision

Three layered changes. Do not raise production `max_wallets_per_owner` — that cap is a product constraint.

### A. Tight-cap identity (SDK tests) — fixes 226 of 161 failures

When `TEST_ENV=railway` (or an explicit `TIGHT_WALLET_CAP=1`):

1. **Per-file isolated EOA** via `getIsolatedClient()` (or a `getSuiteClient()` wrapper). Jest `runInBand` is one process; isolation must be per file, not one env var for the whole run.
2. **Default `createSmartWallet` salt is `"0"`** in tight-cap mode (idempotent ensure-exists). Keep `nextTestSalt()` for CI (`max_wallets=2000`) so parallel workers on the shared key still do not collide.
3. Tests that need **N distinct wallets on one owner** pass explicit salts and stay at **N ≤ 3**. Rewrite the lex-order test from `["10","2","0","1"]` to `["10","2","0"]` (proved lexicographic and under the cap).
4. Tests that need **owner-scoped isolation** (exact list counts, pagination) already use `getIsolatedClient`; switch those creates to salt `"0"` / `"1"` / `"2"` instead of `nextTestSalt()`.

Mechanical surface: `tests/utils/client.ts` (`createSmartWallet`, `getSuiteClient`) plus every `beforeAll` that currently does `getClient(); authenticateClient(client)`. Files that already isolate keep doing so.

### B. Partner reads — SDK env + gateway scope

1. **ava-sdk-js (gitignored):** `.env.railway` sets `PARTNER_ASSERTION_AUDIENCE=avs-gateway-prod` and `PARTNER_ASSERTION_PRIVATE_KEY` to the Studio production partner key (same PEM as `GATEWAY_STUDIO_PARTNER_KEY`). Update `.env.railway.example` comments: audience is `avs-gateway-prod`, not `avs-gateway-staging`.
2. **avs-infra (required):** `partners[studio].scopes` in `gateway-railway.yaml` must include `read` (keep `simulate` if anything still claims it; `GET /tokens` will not accept simulate). Until that deploys, getToken stays 403 even with the right key.
3. Tests: if partner key is missing or the gateway returns `PARTNER_SCOPE_DENIED`, fail with a one-line "gateway studio partner needs scope read" rather than 36 duplicate retrieve errors. Do not skip silently on railway — that would hide a production Studio break.

### C. Funded UserOps — look up, don't re-derive

1. Add `getFundedWallet(client)` that **lists** the shared EOA's wallets, picks salt `"2"` on factory `0xB99B…2834` (or the salt-2 row that actually holds ETH/USDC). Never `create({ salt: "2" })` without `factoryAddress` on railway.
2. Only **on-chain UserOp** tests use `getFundedClient()` (shared `TEST_PRIVATE_KEY`) + `getFundedWallet()`. Confirmed: `withdraw` happy-path, `contractWrite` deploy+trigger, `ethTransfer` trigger. Keep the existing 400/insufficient skip so an unfunded chain still does not fail the suite.
3. **Simulate / `nodes.run` / validation** switch to the isolated suite wallet (salt `"0"`). Proved: Tenderly approve succeeds with 0 ETH / 0 USDC. Drop the salt-`"2"` habit from `contractWrite` sim tests, `runNodeWithInputs`, `approve-with-simulation`, `uniswapv3_stoploss` simulate, `workflow-usdc-read-write-customcode` simulate.

## Alternatives considered

- **Raise production cap to 2000.** Rejected. Production yaml is explicit ("Production cap") on every chain; tests should not require a product-limit change.
- **One random `TEST_PRIVATE_KEY` for the whole `yarn test` process.** Tried. Burns 3 slots in `auth.test.ts` and the rest of the suite dies.
- **Per-file isolated EOA only, keep `nextTestSalt()`.**** Insufficient. Any file with ≥4 unique creates still 429s (`wallet.test.ts`, `workflow.test.ts`, `getExecutions.test.ts`).
- **Per-test isolated EOA everywhere.** Would work for single-wallet tests; the lex test still needs 3 salts on one owner. Too much SIWE overhead; default salt `"0"` per file is enough.
- **SDK-only partner fix (env key + `avs-gateway-prod`).** Proved insufficient: live 403 `PARTNER_SCOPE_DENIED`. Gateway yaml must grant `read`.
- **Hard-code funded wallet address.** Brittle across factory rotations. List + match salt/factory/balance is the same lookup the gateway already serves.

## PR plan

1. ~~**avs-infra:** add `read` to `partners[studio].scopes` on `gateway-railway.yaml`. Deploy. Probe.~~ **Done** — see "Step 1 outcome" below.
2. **ava-sdk-js env + helpers (this repo):** tight-cap `createSmartWallet` default; `getSuiteClient` / `getFundedClient` / `getFundedWallet`; `.env.railway` partner audience + key; example file comments.
3. **ava-sdk-js test migration:** convert `beforeAll` to suite client; rewrite ≥4-salt tests; move sim tests off salt `"2"`; keep UserOp tests on funded lookup. Can land as one PR or split core helpers vs mechanical file conversion.
4. **Re-run** `TEST_ENV=railway yarn test` against production. Expect getToken green only after PR 1 is live.

## Step 1 outcome (avs-infra, 2026-08-20)

`partners[studio].scopes` on `railway/configs/gateway-railway.yaml` changed
`[simulate]` → `[read]` (avs-infra `a97dc40`), synced with
`./railway/sync-configs.sh gateway --apply`.

`simulate` was not merely insufficient — it is **dead**. The gateway calls
`verifyPartnerAssertion` with exactly one required scope, `read`, from two
sites in `aggregator/rest/permission.go` (`authPartnerRead`,
`authPartnerWalletPreview`). No code path anywhere requires `simulate`, so the
deployed registry entry granted studio nothing at all. It was left over from
the pre-permission-map design where partner delegation covered the simulate
family. `[read]` replaces it rather than being appended to it.

Before applying, the deployed `AP_CONFIG_YAML` was fetched and diffed against
repo HEAD: byte-identical, so no dashboard-side edit was clobbered.

Live verification against `api.avaprotocol.org` (gateway `4.17.0`), Studio
production key, `aud=avs-gateway-prod`:

| Probe | Before | After |
|---|---|---|
| `GET /tokens/{usdc}?chainId=11155111`, `scope=read` | `403 PARTNER_SCOPE_DENIED` | **`200`** `USD Coin / USDC / 6` |
| `GET /wallets?chainId=11155111` with `sub` = test EOA | (blocked) | **`200`**, 4 rows |
| `aud=avs-gateway-staging` | `401 PARTNER_ASSERTION_AUDIENCE` | `401 PARTNER_ASSERTION_AUDIENCE` (unchanged) |
| assertion declaring only `scope=simulate` | — | `403 PARTNER_TOKEN_SCOPE` (registry grant alone is not enough) |
| no `X-Partner-Assertion` header | `401` partner required | `401` partner required (unchanged) |

`TEST_ENV=railway npx jest tests/v4/core/getToken.test.ts` → **24 passed / 24**,
including `user JWT alone is rejected (partner required)`. That closes all 36
`getToken` failures.

Two collateral confirmations:

- **Studio production was itself broken**, not just the test suite. Its Vercel
  `GATEWAY_PARTNER_AUDIENCE` is `avs-gateway-prod` and its
  `GATEWAY_STUDIO_PARTNER_KEY` fingerprints to the registry key, so token
  metadata and partner-only preview-wallet resolve were 403ing in production
  for real users until this deploy.
- **Issue 3's wallet list is confirmed from the wire.** The partner
  `GET /wallets` for `0x804e…1557` on Sepolia returns exactly the 4 rows the
  cap analysis predicted — salt `0` on default factory `0x0000…6fecd`, and
  salts `0`/`1`/`2` on legacy factory `0xB99B…2834`, with funded salt-2 at
  `0x5a8A8a79DdF433756D4D97DCCE33334D9E218856`. `getFundedWallet()` can match
  on `(salt, factoryAddress)` straight from this response.

`.env.railway` already carries the Studio production key, `iss=studio`, and
`PARTNER_ASSERTION_AUDIENCE=avs-gateway-prod`, so no SDK-side partner work
remains — 2B.1 is satisfied.

Still stale elsewhere: `EigenLayer-AVS config/gateway-sepolia.yaml` has the
same dead `scopes: [simulate]`. Local-dev-only (audience `avs-gateway-local`),
but it will bite the next person who runs the suite against it.

## Verification

- Repeat the salt `0,1,2,3` / salt-0 reuse / 3-salt lex probes (must stay true).
- `TEST_ENV=railway` single-file: `auth.test.ts` (was 4 fails after 3 creates) green with salt-0 reuse.
- `TEST_ENV=railway` `wallet.test.ts` lex test green with 3 salts.
- `TEST_ENV=railway` `getToken.test.ts` green after gateway `read` scope.
- `withdraw` validation (amount 0) on isolated client; on-chain withdraw uses listed salt-2 and either confirms or skip-on-insufficient.
- Full `TEST_ENV=railway yarn test` logged under `logs/`. Watch for a **real** 429 rate-limit (`title: Too Many Requests` with a rate-limit detail) — production is 10 req/s burst 50. Wallet-cap 429s use the same HTTP status today.

## Resolved questions

- **Sequence:** avs-infra `read` scope first (deploy), then SDK env + helpers + test migration. getToken is expected green only after the gateway grant is live.
- **Partner key:** copy Studio production `GATEWAY_STUDIO_PARTNER_KEY` into gitignored `.env.railway` as `PARTNER_ASSERTION_PRIVATE_KEY`. Example file documents `PARTNER_ASSERTION_AUDIENCE=avs-gateway-prod` without the secret.
