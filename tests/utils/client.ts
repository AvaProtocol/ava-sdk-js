/**
 * v4 SDK test client helpers. Mirrors the v3 `getClient` /
 * `authenticateClient` / `getEOAAddress` / `createSmartWallet` API so
 * the per-test-file mechanical port stays surface-level.
 *
 * Notable behavioural differences vs v3:
 *   - v4 has one auth path (Bearer JWT on the transport). The v3
 *     "client.authKey vs options.authKey" split collapses into
 *     `client.setToken(jwt)` — for API-key tests pass the JWT
 *     directly; for signature tests call `authenticate()` which
 *     runs the EIP-191 exchange.
 *   - v4 `wallets.create({salt})` is idempotent ensure-exists,
 *     matching v3's `getWallet({salt})` semantics.
 *   - The `Workflow` / `Step` class hierarchy is gone — v4 returns
 *     plain JSON objects shaped by the OpenAPI spec.
 */

import { Wallet } from "ethers";
import {
  APIError,
  Client,
  type ClientOptions,
  type v4,
  signAuthMessage,
} from "@avaprotocol/sdk-js";

import { TEST_REST_URL, requireEnv } from "./env";
import { ensureE2eSessionGrant } from "./sessionGrant";

/** Returns the configured test EOA private key. */
export function testPrivateKey(): string {
  return requireEnv("TEST_PRIVATE_KEY");
}

/**
 * Production (and any `TIGHT_WALLET_CAP=1` gateway) allows 3 smart
 * wallets per owner per chain. CI's docker gateway allows 2000, which
 * is why `nextTestSalt()` was a fine default there and a 429 here.
 */
export function tightWalletCap(): boolean {
  return process.env.TIGHT_WALLET_CAP === "1" || process.env.TEST_ENV === "railway";
}

/**
 * Decode a JWT payload. Header/payload are base64url (`-`/`_`, no
 * padding); Node's `base64` alphabet mis-decodes those.
 */
export function decodeJwtPayload(token: string): Record<string, unknown> {
  const body = token.split(".")[1];
  if (!body) {
    throw new Error("JWT missing payload");
  }
  return JSON.parse(Buffer.from(body, "base64url").toString());
}

/**
 * A private EOA for one suite, and the client authenticated as it.
 *
 * Unique salts stop two suites sharing a wallet, but they do not help a query
 * scoped by OWNER — every suite authenticating as TEST_PRIVATE_KEY sees every
 * other suite's wallets, workflows, and secrets. A suite that asserts on
 * anything owner-wide is therefore order-dependent no matter how its salts are
 * allocated.
 *
 * A random key removes that entirely: the gateway mints a JWT from any
 * signature, so identity costs nothing. Use this for CRUD, listing, and
 * pagination suites.
 *
 * It is NOT for suites that need funds. A fresh EOA owns nothing, so anything
 * sending a real UserOp, spending gas, or touching a pre-funded fixture wallet
 * must use {@link getFundedFixture}.
 */
export async function getIsolatedClient(
  overrides?: Partial<ClientOptions>,
): Promise<{ client: Client; owner: string; privateKey: string }> {
  const wallet = Wallet.createRandom();
  const client = getClient(overrides);
  await authenticateClient(client, wallet.privateKey);
  return { client, owner: wallet.address, privateKey: wallet.privateKey };
}

/**
 * Client for a typical suite. On a tight-cap gateway this is a throwaway
 * EOA so the file does not share the process-wide `TEST_PRIVATE_KEY` quota.
 * On CI it authenticates as the shared test key (cap 2000).
 *
 * Always use the returned `owner` — {@link getEOAAddress} still reads
 * `TEST_PRIVATE_KEY` and is the wrong subject for an isolated client.
 */
export async function getSuiteClient(
  overrides?: Partial<ClientOptions>,
): Promise<{ client: Client; owner: string; privateKey: string }> {
  if (tightWalletCap()) {
    return getIsolatedClient(overrides);
  }
  const client = getClient(overrides);
  await authenticateClient(client);
  return { client, owner: getEOAAddress(), privateKey: testPrivateKey() };
}

/**
 * Shared `TEST_PRIVATE_KEY` client. Only for tests that need the
 * pre-funded MA v2 salt-0 wallet. Does not isolate.
 *
 * Prefer {@link getFundedFixture} for real UserOps — that helper also
 * ensures the session grant the gateway requires to sign.
 */
export async function getFundedClient(
  overrides?: Partial<ClientOptions>,
): Promise<{ client: Client; owner: string; privateKey: string }> {
  const client = getClient(overrides);
  const privateKey = testPrivateKey();
  await authenticateClient(client, privateKey);
  return { client, owner: getEOAAddress(privateKey), privateKey };
}

/** Returns a fresh, unauthenticated v4 Client pointed at the test stack. */
export function getClient(overrides?: Partial<ClientOptions>): Client {
  return new Client({
    baseUrl: TEST_REST_URL(),
    // 240s: real-bundler UserOp round-trips (Sepolia mempool + receipt polling)
    // can hit 120-200s on CI cold-start — must exceed the largest jest.setTimeout().
    defaultTimeoutMs: 240_000,
    ...overrides,
  });
}

// TEST_AUTH_CHAIN_ID is the chain id tests sign their auth message
// against. The dev/test stack runs on Sepolia, so we pin to that —
// matching what the engine's settings/test fixtures use elsewhere.
// Tests that exercise a different chain (e.g. the BNB connectivity
// probe) call exchangeWithKey directly with their own chainId.
export const TEST_AUTH_CHAIN_ID = 11_155_111;

// TEST_AUTH_URI is the origin tests stamp into the canonical message.
// Doesn't matter what value we pick — the aggregator doesn't validate
// the URI line server-side — but stamping a stable, recognizable test
// host makes it obvious in JWT-debug output that a token came from
// the test suite rather than a real app.
export const TEST_AUTH_URI = "https://test.avaprotocol.org";

/**
 * Drive the EIP-191 sign-then-exchange flow against the live
 * aggregator and stash the resulting JWT on the supplied client.
 *
 * Fetches the gateway version from /health and signs against the
 * dev-stack chain (Sepolia). The /health round trip is cheap and
 * keeps the test stamp honest — pinning a literal would lie about
 * which gateway the message was signed against.
 *
 * @param client v4 Client to authenticate.
 * @param privateKey Optional override; defaults to `TEST_PRIVATE_KEY`.
 * @returns The minted token (also already set on the client).
 */
async function fetchGatewayVersion(client: Client): Promise<string> {
  const { version } = await client.health.check();
  // The HealthStatus schema marks version as required (post AVS #554),
  // so TS guarantees a string at compile time. Belt-and-suspenders
  // runtime check catches the transition window where an old gateway
  // could still return undefined — that surfaces as a clear migration
  // error here, not a confusing "version must be non-empty" deep
  // inside buildAuthMessage.
  if (!version) {
    throw new Error(
      "Gateway /health did not return a version field — the gateway is older than the Position D rollout (AVS PR #554). Upgrade the gateway or test against a newer one.",
    );
  }
  return version;
}

export async function authenticateClient(
  client: Client,
  privateKey?: string,
): Promise<string> {
  const pk = privateKey ?? testPrivateKey();
  const version = await fetchGatewayVersion(client);
  const resp = await client.auth.exchangeWithKey(pk, {
    uri: TEST_AUTH_URI,
    chainId: TEST_AUTH_CHAIN_ID,
    version,
  });
  return resp.token;
}

/**
 * Return the EOA address derived from a private key. Defaults to
 * `TEST_PRIVATE_KEY` when no key is supplied. Pure — no SDK calls.
 */
export function getEOAAddress(privateKey?: string): string {
  return new Wallet(privateKey ?? testPrivateKey()).address;
}

/**
 * Generate an EIP-191 signature for a message with a private key.
 * Re-exported here for tests that exercise the auth flow manually.
 */
export async function generateSignature(
  message: string,
  privateKey?: string,
): Promise<string> {
  const signer = new Wallet(privateKey ?? testPrivateKey());
  return signer.signMessage(message);
}

/**
 * Build (and on the wire, sign) the canonical auth payload used by
 * tests that exercise the EIP-191 exchange explicitly rather than
 * going through `authenticateClient`. Mirrors v3's
 * `generateAuthPayloadWithApiKey` shape minus the API-key field —
 * v4 doesn't combine signature + API key in one request.
 *
 * Takes a `client` so it can fetch the gateway version from /health —
 * the SDK no longer defaults `version`. Same dev-stack Sepolia chainId
 * as `authenticateClient`.
 */
export async function buildAuthPayload(
  client: Client,
  privateKey?: string,
): Promise<{
  ownerAddress: string;
  message: string;
  signature: string;
}> {
  const version = await fetchGatewayVersion(client);
  const signed = await signAuthMessage(privateKey ?? testPrivateKey(), {
    uri: TEST_AUTH_URI,
    chainId: TEST_AUTH_CHAIN_ID,
    version,
  });
  return {
    ownerAddress: signed.ownerAddress,
    message: signed.message,
    signature: signed.signature,
  };
}

// ---------------------------------------------------------------------
// Salt allocation
// ---------------------------------------------------------------------

/**
 * Salt allocation, unique per worker AND per run.
 *
 * A plain module-level counter is not enough, and the way it failed is worth
 * keeping in mind. Jest gives every worker its own process, so a counter
 * seeded at a constant restarts in each one: with 9 workers, nine of them
 * hand out salt 1001. Same salt + same owner EOA = the *same* smart-wallet
 * address, so two suites that each believed they had a private wallet were
 * writing to one. Tests that scope a query by `smartWalletAddress` — the
 * correct thing to do — still saw the other suite's records, and exact-count
 * assertions failed intermittently depending on which worker got there first.
 *
 * The same reset also repeated salts across runs, so state accumulated on a
 * handful of addresses instead of spreading. The observable symptom was the
 * shared test EOA holding only four wallets after many full-suite runs.
 *
 * The base therefore mixes two things:
 *   - JEST_WORKER_ID, so parallel workers never overlap;
 *   - a per-run seed (CI run id, else the process start time), so today's run
 *     cannot land on yesterday's wallets.
 *
 * Salts stay above 1_000 so they never collide with user-driven wallets in
 * dev. Note CI `max_wallets_per_owner` is 2_000 per chain; production is 3,
 * which is why {@link createSmartWallet} defaults to salt `"0"` under
 * {@link tightWalletCap} rather than minting a unique salt every call.
 */
// The two strides must not be able to alias. Worker occupies the low digits
// and cannot exceed its stride (10k wallets from one worker in one run is far
// beyond anything the suite does); the run seed occupies digits above that.
// Getting this backwards silently reintroduces the bug in a subtler form:
// with a worker stride of 100k and a run stride of 1k, worker 4 of run 555
// and worker 3 of run 655 both land on 956000 — and since wallet records
// persist, a later run would inherit an earlier one's state.
const SALT_WORKER_STRIDE = 10_000;
const SALT_RUN_STRIDE = 1_000_000;

function saltBase(): number {
  const worker = Number(process.env.JEST_WORKER_ID ?? 1);
  // GITHUB_RUN_ID in CI; wall-clock locally. Either way it changes per run.
  const runSeed = Number(process.env.GITHUB_RUN_ID ?? Date.now()) % 100_000;
  return 1_000 + runSeed * SALT_RUN_STRIDE + worker * SALT_WORKER_STRIDE;
}

let saltCursor = saltBase();

/**
 * A salt no other worker or run will hand out.
 *
 * Suites that need a salt stable across re-runs must pass an explicit
 * `saltValue` to `createSmartWallet` — but be aware that opts out of the
 * isolation above and shares the wallet with anything else using that salt.
 */
export function nextTestSalt(): string {
  saltCursor += 1;
  return String(saltCursor);
}

/** Production allows this many smart wallets per owner PER CHAIN. */
export const TIGHT_WALLET_CAP_LIMIT = 3;

let suiteSaltCursor = 0;

/**
 * A salt from the suite's bounded pool: `"0" | "1" | "2"` under a tight cap,
 * `nextTestSalt()` otherwise.
 *
 * Production caps an owner at {@link TIGHT_WALLET_CAP_LIMIT} wallets per chain
 * and a suite file runs on ONE isolated EOA, so the file may only ever address
 * three distinct salts. `nextTestSalt()` is the opposite policy — a value no
 * other worker or run will reuse — which is right for CI (cap 2000) and fatal
 * against production: the fourth unique salt on one owner is a 429.
 *
 * Consecutive calls return DIFFERENT salts, so a test needing two wallets at
 * once can call it twice. A test needing MORE than three distinct wallets, or
 * one that must not collide with a salt an earlier test created (a listing
 * asserting a salt is absent, say), needs its own `getIsolatedClient()` and a
 * fresh quota — cycling cannot give it one.
 */
export function suiteSalt(): string {
  if (!tightWalletCap()) return nextTestSalt();
  const salt = String(suiteSaltCursor % TIGHT_WALLET_CAP_LIMIT);
  suiteSaltCursor += 1;
  return salt;
}

export interface CreateSmartWalletOptions {
  /** Override the salt instead of pulling from the per-process cursor. */
  saltValue?: string;
  /** Override the factory address (otherwise the aggregator's default is used). */
  factoryAddress?: string;
}

/**
 * Alchemy Modular Account v2 factory. Session grants (and therefore
 * every real UserOp) only attach to this account type. The legacy
 * SimpleAccount factory `0xB99BC2…2834` still holds historical ETH on
 * salt-2, but `policies:prepare` refuses it with SESSION_WALLET_NOT_MA_V2.
 *
 * Salt `"0"`: the owner's default MA v2 wallet. It is already in
 * production's 3-wallet cap, and CREATE2(owner, factory, 0) is the
 * address to fund once. `policiesLive.test.ts` uses an isolated EOA
 * so its grant-then-revoke cannot tear this fixture down.
 *
 * Address is CREATE2(owner, factory, salt) — stable across runs for a
 * given `TEST_PRIVATE_KEY`. Fund that address, not a fresh salt.
 */
export const FUNDED_WALLET_SALT = "0";
export const FUNDED_FACTORY_ADDRESS =
  "0x00000000000017c61b5bEe81050EC8eFc9c6fecd";

/**
 * Resolve the MA v2 salt-0 wallet on the authenticated owner.
 *
 * Looks up the existing (factory, salt) row and only creates if none
 * exists. Never falls back to the legacy SimpleAccount factory.
 * Returns `undefined` when create is refused (cap) — caller should
 * skip on-chain.
 */
export async function getFundedWallet(
  client: Client,
): Promise<v4.Wallet | undefined> {
  const listed = await client.wallets.list();
  const existing = listed.data.find(
    (w) =>
      w.salt === FUNDED_WALLET_SALT &&
      w.factoryAddress?.toLowerCase() ===
        FUNDED_FACTORY_ADDRESS.toLowerCase(),
  );
  if (existing) return existing;

  try {
    return await client.wallets.create({
      salt: FUNDED_WALLET_SALT,
      factoryAddress: FUNDED_FACTORY_ADDRESS,
    });
  } catch (error) {
    if (error instanceof APIError && error.status === 429) return undefined;
    throw error;
  }
}

/**
 * The funded UserOp fixture: shared EOA + MA v2 salt-0 runner + a
 * covering session grant. Every real-bundler test should take the
 * wallet from here so funding one address covers the suite.
 */
export async function getFundedFixture(
  overrides?: Partial<ClientOptions>,
): Promise<{
  client: Client;
  owner: string;
  privateKey: string;
  wallet: v4.Wallet;
}> {
  const { client, owner, privateKey } = await getFundedClient(overrides);
  const wallet = await getFundedWallet(client);
  if (!wallet) {
    throw new Error(
      `MA v2 funded wallet is not registered (salt ${FUNDED_WALLET_SALT}, factory ${FUNDED_FACTORY_ADDRESS}). ` +
        `Create it once for this owner, fund it on Sepolia with ETH and USDC, then re-run.`,
    );
  }
  await ensureE2eSessionGrant(
    client,
    wallet.address,
    privateKey,
    owner,
    TEST_AUTH_CHAIN_ID,
  );
  return { client, owner, privateKey, wallet };
}

/** Fail a trigger that bounced instead of treating UserOp errors as skips. */
export function assertUserOpTriggerOk(
  trig: Pick<v4.TriggerWorkflowResponse, "status" | "error">,
  walletAddress: string,
): void {
  if (trig.status === "failed" || trig.status === "error" || trig.error) {
    throw new Error(
      `UserOp failed for MA v2 funded wallet ${walletAddress} ` +
        `(salt ${FUNDED_WALLET_SALT}, factory ${FUNDED_FACTORY_ADDRESS}): ` +
        `${trig.status ?? ""}${trig.error ? `: ${trig.error}` : ""}. ` +
        `Fund this address on Sepolia with ETH (and USDC for ERC-20 tests).`,
    );
  }
}

/**
 * Mints (or re-resolves) a smart wallet via `POST /wallets`, which
 * is the v4 REST API's idempotent ensure-exists endpoint. Returns
 * the Wallet envelope as the spec defines it (lowercase strings,
 * `factoryAddress` not `factory`).
 *
 * Default salt:
 *   - tight-cap (`TEST_ENV=railway` / `TIGHT_WALLET_CAP=1`): `"0"`,
 *     so a suite can call this many times without burning the 3-wallet
 *     quota. Distinct wallets must pass `saltValue` (`"1"` / `"2"`, at
 *     most two extra on one owner).
 *   - CI / local: `nextTestSalt()`, unique per worker and run, matching
 *     the 2000-wallet docker quota.
 *
 * For the funded UserOp fixture use {@link getFundedFixture}, not a
 * unique salt from this helper.
 */
export async function createSmartWallet(
  client: Client,
  options: CreateSmartWalletOptions = {},
): Promise<v4.Wallet> {
  const salt = options.saltValue ?? (tightWalletCap() ? "0" : nextTestSalt());
  return client.wallets.create({
    salt,
    ...(options.factoryAddress ? { factoryAddress: options.factoryAddress } : {}),
  });
}

/**
 * Workflows whose cleanup failed, keyed by id. A surviving workflow keeps
 * executing on its schedule forever, so a leak must never pass silently —
 * `assertNoLeakedWorkflows()` (wired into a global `afterAll`) turns this
 * registry into a test failure.
 */
const leakedWorkflows = new Map<string, string>();

/**
 * Bulk cancel/delete a list of workflows and record any that survive.
 *
 * This helper still never throws: callers invoke it from `finally` /
 * `afterEach`, where throwing would replace the real assertion error. But
 * silence is what made a leak invisible for ten days — a live-gateway run on
 * 2026-07-17 left an every-minute prod workflow behind that burned ~14.8K
 * Moralis and GoPlus calls before anyone noticed. So a failed cancel now logs
 * loudly and is registered; the global `afterAll` fails the run afterwards,
 * once assertions have already been reported.
 *
 * A 404 means the workflow is already gone — tests that cancel explicitly and
 * then clean up again hit this, and it is success, not a leak.
 */
export async function removeCreatedWorkflows(
  client: Client,
  workflowIds: ReadonlyArray<string | undefined>,
): Promise<void> {
  for (const id of workflowIds) {
    if (!id) continue;
    try {
      await client.workflows.cancel(id);
      leakedWorkflows.delete(id);
    } catch (error) {
      if (error instanceof APIError && error.status === 404) {
        leakedWorkflows.delete(id);
        continue;
      }
      const reason = error instanceof Error ? error.message : String(error);
      leakedWorkflows.set(id, reason);
      console.error(
        `[cleanup] LEAKED WORKFLOW ${id} — cancel failed: ${reason}. ` +
          `It keeps executing on its schedule (and spending) until cancelled by hand.`,
      );
    }
  }
}

/**
 * Throws if any workflow survived cleanup. Wired into a global `afterAll` by
 * `tests/utils/matchers.ts`, so every spec file enforces it without boilerplate.
 */
export function assertNoLeakedWorkflows(): void {
  if (leakedWorkflows.size === 0) return;
  const leaked = [...leakedWorkflows.entries()];
  leakedWorkflows.clear();
  throw new Error(
    `${leaked.length} workflow(s) survived cleanup and are still running — cancel them by hand:\n` +
      leaked.map(([id, reason]) => `  - ${id}: ${reason}`).join("\n"),
  );
}

/**
 * The `settings` block all v4 workflows expect in inputVariables.
 * Mirrors v3's `getSettings()` — keeps the per-test boilerplate down.
 */
export function settingsFor(runner: string, name = "Test Simulation") {
  // `settings.chain_id` is VESTIGIAL since the chain decoupling: the engine
  // resolves the execution chain from each chain-aware part's own `chainId`,
  // not from settings (the old "audit class A" fallback was removed by G5).
  // Verified: simulate succeeds with or without it. Kept only so the helper's
  // shape doesn't churn callers; the engine ignores it. `name` is still read
  // by the context-memory summarizer. Safe to drop in a follow-up.
  return { name, runner, chain_id: 11_155_111 };
}

// Retained for back-compat with callers that pass an explicit chain. Like
// `settingsFor`, the `chain_id` it emits is vestigial — the per-part `chainId`
// on each node/trigger is authoritative.
export function settingsForChain(runner: string, chainId: number, name = "Test Simulation") {
  return { name, runner, chain_id: chainId };
}

/**
 * Fetch the current block number from the configured CHAIN_ENDPOINT.
 * Several node tests need this to seed a block-trigger workflow at
 * a near-future block.
 */
export async function getCurrentBlockNumber(): Promise<number> {
  const ep = process.env.CHAIN_ENDPOINT ?? "";
  if (!ep) throw new Error("CHAIN_ENDPOINT not set — block-trigger tests need it");
  const url = ep.startsWith("http") ? ep : `https://${ep}`;
  // Defer the ethers import so non-chain tests don't pay the cost.
  const { JsonRpcProvider } = await import("ethers");
  const provider = new JsonRpcProvider(url);
  return provider.getBlockNumber();
}
