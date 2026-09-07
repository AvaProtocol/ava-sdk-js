# Remove v3 archive and fix staging→main E2E operator auth

- **Date**: 2026-09-07
- **Status**: Implemented
- **Branch**: staging
- **Related**: EigenLayer-AVS [#767](https://github.com/AvaProtocol/EigenLayer-AVS/pull/767); CI run [33731882311](https://github.com/AvaProtocol/ava-sdk-js/actions/runs/33731882311) (PR #259)

## Problem

Staging→main PRs have been failing the E2E Tests workflow on every suite that creates a block or event trigger. The docker stack comes up — gateway `:8080/up`, worker `:8090/health`, operator logs `Operator ready` — then tests 400 with:

```
no connected operator currently monitors chain_id=11155111 for TRIGGER_TYPE_BLOCK triggers
```

Operator logs in the same jobs show the real refusal a few seconds later:

```
rpc error: code = Unauthenticated desc = operator authentication required
```

EigenLayer-AVS #767 turned operator gRPC auth from a no-op (`enforceAuth = false`) into a default-deny interceptor. The operator signs `Operator:{address}Epoch:{unix}` using `common.Address.String()` (EIP-55 checksummed) but the Ping/Sync RPC claims `operator_address` from yaml verbatim. The aggregator recovers the signature against the claimed address. CI's `config/operator-sepolia.yaml` used the lowercase spelling `0x997e5d40…`; Railway and the local EigenLayer-AVS config use the checksummed `0x997E5D40…`. Production works, CI does not.

The "Operator ready" grep in CI was also lying: that line is printed before the first Ping, so an unauthenticated operator counted as healthy.

Separately, `tests-v3-archive/` was leftover gRPC coverage that `yarn test` already excluded, `prod-test-on-pr.yml` still called the deleted `yarn test:integrations` script, and CI had no lint/unit job — smoke tests at `tests/v4/smoke.test.ts` never ran in Actions.

## Decision

- Delete `tests-v3-archive/` (and the stale `GA_E2E_TESTS_STATUS.md` / `run-withdraw-tests.sh` leftovers).
- Checksum `operator_address` in `config/operator-sepolia.yaml` and list it under `approved_operators` in `config/gateway.yaml`.
- Wait for `Successfully pinged aggregator` (and fail immediately on `operator authentication required`) instead of grepping `Operator ready`.
- Dump gateway/worker/operator logs on test failure.
- Detect `/ava` vs `/app/ap` for `create-api-key` so a rebuilt image does not break key minting.
- Add a docker-free `Lint + smoke` job (`yarn lint` + `yarn test:smoke`).
- Point the production workflow at `yarn test:templates` and drop the PR-head checkout that is empty on `workflow_dispatch`.

## Alternatives considered

- **Disable operator auth in the CI gateway.** Rejected: CI would no longer exercise the production auth path, and the next image that enforces it would fail the same way.
- **Pin `DOCKER_IMAGE_TAG` to a pre-#767 image.** Rejected: that image is gone from `latest`, and we want CI on the current gateway.
- **Normalize the address inside EigenLayer-AVS `GetOperatorSigninMessage`.** Correct long-term, but production already checksums and we can unblock SDK CI without an AVS release.

## Verification

- CI job 100573507706 (E2E / core on PR #259): 2 failed suites, both `operator authentication required` → `no connected operator currently monitors chain_id=11155111`. Same error on workflows, executions, triggers, nodes, templates.
- Local: `yarn test:smoke` after the change (no gateway required).
- Full E2E confirmation is the next staging→main Actions run: operator step must print `Operator is authenticated and pinging the aggregator` and the six matrix jobs must get past workflow create.

Follow-up after run 34166504974 (operator auth green; remaining failures were unfunded MA v2 salt-0 + guardian config):

- `moralis_api_key` is a **platform secret** — EigenLayer-AVS never copies it into `apContext.configVars`. The guardian restApi node was interpolating `{{apContext.configVars.moralis_api_key}}`, which is always empty, so Moralis 401'd. The node now uses `options.auth: { provider: "moralis" }` (same path as GoPlus). BalanceNode already skips when the key is unset; the live guardian scan does the same. CI does not require a Moralis GitHub secret.
- `guardian_ruleset` inlined in `config/gateway.yaml` `macros.secrets`, matching `avs-infra/railway/configs/gateway-railway.yaml` and `EigenLayer-AVS/config/gateway.example.yaml`.
