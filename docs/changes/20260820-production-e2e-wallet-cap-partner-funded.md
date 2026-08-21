# Production e2e: wallet cap, partner assertion, funded salt-2

- **Date**: 2026-08-20
- **Status**: Implemented — production helpers green 2026-08-20 (45/9/0 suites); local e2e **closed** 2026-08-21 against gateway `4.17.0` + EigenLayer-AVS #761 (`0c8aa185`): **54/54 suites, 385/385 tests, 0 failed, 0 skipped**
- **Branch**: staging
- **Related**: production `https://api.avaprotocol.org/api/v1` (`4.17.0`); local `http://localhost:8080/api/v1`; EigenLayer-AVS [#761](https://github.com/AvaProtocol/EigenLayer-AVS/issues/761) / staging `0c8aa185`; avs-infra `railway/configs/gateway-railway.yaml`; logs `logs/20260820-170300-full-e2e-prod-final.log`, `logs/20260821-000558-full-e2e-local-761.log`

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

The same dead `scopes: [simulate]` was also sitting in
`EigenLayer-AVS config/gateway-sepolia.yaml` — fixed to `[read]`, with the
comment block realigned to the wording already used in `config/gateway.yaml`
(it still pointed at the retired `PLAN_PARTNER_PAYMENTS.md`). That file needs
no PR: every real `config/*.yaml` is gitignored and symlinked into the local
`ClaudeSync/EigenLayer-AVS-env/config/` store, so only the `*.example.yaml`
files are tracked, and `config/gateway.example.yaml` already said `read`. All
four gateway configs — local, local-sepolia, example, and prod — now parse to
`scopes=[read]` through `config.PartnerConfig`.

One consequence of that layout: any *other* machine with a stale local
`gateway-sepolia.yaml` has to be fixed by hand, since there is no repo-side
artifact carrying the bad value.

## Verification

2026-08-20 `TEST_ENV=railway yarn test` against production `4.17.0` after this change: **45 passed / 9 skipped / 0 failed** suites, **359 passed / 35 skipped** tests (`logs/20260820-170300-full-e2e-prod-final.log`). Before: 41 failed / 161 failed tests, almost all `limit=3` or `PARTNER_ASSERTION_INVALID`.

Skipped suites are expected: 7 stub-backed files (production cannot dial `127.0.0.1`) plus `awaitSignal` / `multichain-per-part-chain` (gated). Stub suites still run against the local docker gateway.

## Remote gateway findings (production `4.17.0`)

Log: `logs/20260820-170300-full-e2e-prod-final.log`. Target `https://api.avaprotocol.org/api/v1`.

| Constraint | What it did to the suite |
|---|---|
| `max_wallets_per_owner=3` per chain | Unique `nextTestSalt()` dies on the 4th create (`429`). One process-wide EOA is unusable. Per-file isolated EOA + default salt `"0"` is required. Lex sort must use 3 salts (`0,10,2`), not 4. |
| Isolated throwaway EOA | Has no indexed tokens. Balance-node "list length > 0" would fail unless skipped or pointed at a funded address. |
| Partner `aud` = `avs-gateway-prod` | Local `.env` key + `avs-gateway-local`/`staging` is `PARTNER_ASSERTION_INVALID` / `PARTNER_ASSERTION_AUDIENCE`. Studio production PEM matches the registry. |
| Partner scopes must include `read` | `GET /tokens` requires `read`; `simulate` is not enough (`PARTNER_SCOPE_DENIED` until avs-infra grant). |
| Default factory ≠ funded factory | `create({ salt: "2" })` derives a new unfunded wallet on `0x0000…6fecd` and 429s. Funded salt-2 lives on legacy `0xB99B…2834` with ~0.043 ETH / ~26 USDC. Must **list**, not re-derive. |
| Gateway cannot dial `127.0.0.1` | 7 stub-backed suites (restApi, loop, simulateWorkflow, stepInput, telegram, recurring-payment, batch-recurring) must skip. They are not product bugs. |
| HTTP 429 is overloaded | Wallet-cap and rate-limit share status 429. Cap detail is `max smart wallet count reached for owner (limit=3)`. |

Local (`config/gateway.yaml`) does **not** have the cap of 3 (`max_wallets_per_owner: 2000`), so unique salts and the shared test EOA (which has indexed balances) are the right local shape. The 3-salt budget and isolated-EOA balance skip are production-only adaptations and are relaxed when `TEST_ENV` is unset.

## Remote vs local (full v4 suite)

| | Remote production | Local gateway |
|---|---|---|
| URL | `https://api.avaprotocol.org/api/v1` | `http://localhost:8080/api/v1` |
| `/health` version | `4.17.0` | `4.16.0` |
| `TEST_ENV` | `railway` | unset (`.env` + code default) |
| Wallet cap | 3 per owner per chain | 2000 (`config/gateway.yaml`) |
| Identity | isolated EOA per file | shared `TEST_PRIVATE_KEY` |
| Default `createSmartWallet` salt | `"0"` | `nextTestSalt()` |
| Lex-sort salts | 3 (`0,10,2`) on the railway run | 4 (`0,1,10,2`, original) |
| Balance-node "length > 0" | would fail on empty isolated EOA | **asserted** — shared EOA has indexed tokens |
| Stub suites (restApi, loop, simulate, stepInput, telegram, recurring, batch) | skip (gateway cannot dial `127.0.0.1`) | **run** |
| `wallets.list({ chainId })` | ran (`TEST_ENV=railway`) | skipped (Sepolia-only stack) |
| Expansion-chain E2E | ran | skipped |
| `POLICIES_CHAIN_NOT_SERVED` | asserted (4.17.0) | no-op skip (4.16.0 still allocates the grant) |
| Suites passed / skipped / failed | **45 / 9 / 0** | **51 / 3 / 0** |
| Tests passed / skipped / failed | **359 / 35 / 0** | **372 / 22 / 0** |
| Duration | 140 s | 102 s |
| Log | `logs/20260820-170300-full-e2e-prod-final.log` | `logs/20260820-221742-full-e2e-local-2.log` |

Local runs **+6 suites / +13 tests** vs remote because the 7 stub-backed files actually execute. Remote runs expansion-chain + `list({chainId})` that local skips. First local pass had **1 fail**: `policiesLive` unserved-chain refusal — `4.16.0` still returns a prepared grant for chain `999999`. That test now returns early unless `/health` is `>= 4.17.0`.

## Local re-run after rebuild (`4.17.0`)

Log: `logs/20260820-222509-local-417-corresponding.log`. Same binary version as production; local `chains[]` is Sepolia + Ethereum + Base (`config/gateway.yaml`), no Base Sepolia worker, no expansion-chain workers.

| Test | Production `4.17.0` | Local `4.16.0` (pre-rebuild) | Local `4.17.0` (rebuilt) |
|---|---|---|---|
| `POLICIES_CHAIN_NOT_SERVED` on prepare(`999999`) | **pass** (400) | prepare **succeeded** (old behaviour) | **pass** (400, 9 ms) |
| `wallets.list({ chainId: 84532 })` | **pass** (gated on `TEST_ENV=railway`) | skipped (flag off) | **fail** on Base Sepolia (not in local `chains[]`). Retargeted to Base (`8453`). |
| Expansion-chain JWT `aud=56/42161/10/130/4663` | **pass** | skipped | **pass** (auth only) |
| Expansion-chain `nodes.run` / simulate WETH `symbol()` | **pass** | skipped | **fail** on BNB/Arb/OP/Unichain/Robinhood (no local workers). Local run now uses Ethereum + Base. |

After retargeting to the local `chains[]` (Sepolia JWT aud, Ethereum `:50053`, Base `:50054`), `MULTICHAIN_TEST=1` against local `4.17.0`:

- `POLICIES_CHAIN_NOT_SERVED` — pass
- `wallets.list({ chainId: 8453 })` scopes off the Sepolia aud list — pass
- Ethereum + Base WETH `symbol()` via `nodes.run` and simulate — pass (6/6)

`TEST_ENV=railway` still runs the Wave A/B/Robinhood expansion set. Log: `logs/20260820-223226-local-served-chains.log`.

## Resolved questions

- **Sequence:** avs-infra `read` scope first (deploy), then SDK env + helpers + test migration. getToken is expected green only after the gateway grant is live.
- **Partner key:** copy Studio production `GATEWAY_STUDIO_PARTNER_KEY` into gitignored `.env.railway` as `PARTNER_ASSERTION_PRIVATE_KEY`. Example file documents `PARTNER_ASSERTION_AUDIENCE=avs-gateway-prod` without the secret.

## UserOp fixture: MA v2 + session grant (2026-08-20 evening)

The remaining local UserOp/trigger “skips” were not an empty-balance problem. Gateway log:

```
no session authorization for smart wallet 0x5a8A…8856
MA v2 execution requires a session grant — the gateway cannot sign as the owner fallback
```

`0x5a8A…` is salt-2 on the **legacy SimpleAccount** factory `0xB99BC2…2834`. `policies:prepare` refuses that runner (`SESSION_WALLET_NOT_MA_V2`). Tenderly sims do not need a grant; real bundler sends do.

Fix in `tests/utils/client.ts` + `tests/utils/sessionGrant.ts`:

- Funded fixture is **always** salt `"0"` on MA v2 factory `0x0000…6fecd` (CREATE2-stable for `TEST_PRIVATE_KEY`). That row is already in production's 3-wallet cap.
- Address to fund (Sepolia): **`0x209eb31c199bEB4c386eF83CF442DE1a00667a1F`**. Owner EOA `0x804e…1557`. As of 2026-08-20 evening: ~0.22 ETH + ~56 USDC, deployed.
- `getFundedFixture()` registers that wallet and submits a one-year session grant (`agentLabel: e2e-funded-wallet`) covering USDC `approve`/`transfer`. Native ETH rows in the allowlist do **not** make native sends work (see #761).
- `policiesLive` uses `getIsolatedClient()` so its grant-then-revoke cannot tear down the fixture.

Do **not** fund the legacy SimpleAccount `0x5a8A…8856` (factory `0xB99BC2…2834`) — `policies:prepare` refuses it with `SESSION_WALLET_NOT_MA_V2`.

## EigenLayer-AVS #761 — local live check (2026-08-21)

Gateway rebuilt from staging `0c8aa185` (`./out/ap` 2026-08-20 23:57, `/health` still reports `4.17.0`). Both parts of the issue are **correct**. The two design calls in the push (not running `MissingGrantCalls` on `ETHTransfer`; refusing native ETH whether or not a grant exists) are the right ones — a coverage “miss” would send people to re-grant a shape that cannot work.

### Part 1 — native ETH typed refusal

| Probe | Result |
|---|---|
| `POST …:withdraw` token=`ETH` | **400** `SESSION_POLICY_NATIVE_NOT_ALLOWED`, ~1 ms, no bundler |
| Block-triggered `ethTransfer` | execution **failed**; **step** error contains `SESSION_POLICY_NATIVE_NOT_ALLOWED` (trigger envelope only says `1 of 2 steps failed: transfer`) |
| `ethTransfer` `nodes.run` / `workflows.simulate` | **success** (Tenderly; preflight sits only on `executeRealETHTransfer`) |
| 1000 ETH withdraw on a **fresh** salt-0 MA v2 wallet (no grant) | still **400** native refusal, not `no session authorization` |
| Bundler AA23 | **absent** on these paths |

SDK tests now **assert** the code instead of skipping.

### Part 2 — withdraw sends in-process

`ExecuteWithdraw` → `preset.SendUserOpAuto` with gateway-resolved session grant. Worker `ExecuteUserOp` is gone. Live Sepolia on `0x209eb31…`:

| What | Result |
|---|---|
| 0.01 USDC to owner | mined `0x80c788f5…` / later full-suite runs also mined |
| 0.01 USDC to alternate recipient `0x7E5F…5Bdf` | mined `0xfc16444e…` |
| `no session authorization` / `worker ExecuteUserOp` | **gone** |

Balance reads remain worker-routed; only the send moved. Sponsorship-neutral as stated in the push.

### Full local suite after #761 (closes this investigation)

`env -u TEST_ENV MULTICHAIN_TEST=1 yarn test` against `http://localhost:8080/api/v1`.

| | Production (2026-08-20 helpers) | Local (2026-08-21, #761) |
|---|---|---|
| `/health` | `4.17.0` | `4.17.0` (`0c8aa185`) |
| Suites passed / skipped / failed | 45 / 9 / 0 | **54 / 0 / 0** |
| Tests passed / skipped / failed | 359 / 35 / 0 | **385 / 0 / 0** |
| Duration | 140 s | 177 s |
| Log | `logs/20260820-170300-full-e2e-prod-final.log` | `logs/20260821-000558-full-e2e-local-761.log` |

Local +9 suites vs that production run are the stub-backed files (gateway can dial `127.0.0.1`) plus the UserOp/native-refusal tests that production never executed for real. No `Skipping —` lines in the local log.

**Not in this close-out:** re-running `TEST_ENV=railway` against production. Production still needs the #761 binary deployed before ERC-20 withdraw / native-refusal assertions will match. Expansion-chain Wave A/B/Robinhood remain railway-only.

### Remaining product limit (asserted, not a test hole)

REST session grants **cannot** authorize native ETH (`execute(to, value, 0x)`). That is option C of #761, not an SDK bug. ERC-20 approve/transfer/withdraw on the MA v2 fixture do mine. To actually move ETH, send with the owner key outside the session.
