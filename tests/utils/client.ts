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
  Client,
  type ClientOptions,
  type v4,
  signAuthMessage,
} from "@avaprotocol/sdk-js";

import { TEST_REST_URL, requireEnv } from "./env";

/** Returns the configured test EOA private key. */
export function testPrivateKey(): string {
  return requireEnv("TEST_PRIVATE_KEY");
}

/** Returns a fresh, unauthenticated v4 Client pointed at the test stack. */
export function getClient(overrides?: Partial<ClientOptions>): Client {
  return new Client({
    baseUrl: TEST_REST_URL(),
    // The full suite under load can take a while — give every
    // request the same 60s budget the v3 helpers used.
    defaultTimeoutMs: 60_000,
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
 * Per-process salt counter. Tests pick salts from a high range
 * (1_000+) so they don't collide with user-driven workflows in dev.
 *
 * For most call sites a single `nextTestSalt()` is enough; rare
 * suites that need stable per-test salts can pass an explicit
 * `saltValue` to `createSmartWallet`.
 */
let saltCursor = 1_000;
export function nextTestSalt(): string {
  saltCursor += 1;
  return String(saltCursor);
}

export interface CreateSmartWalletOptions {
  /** Override the salt instead of pulling from the per-process cursor. */
  saltValue?: string;
  /** Override the factory address (otherwise the aggregator's default is used). */
  factoryAddress?: string;
}

/**
 * Mints (or re-resolves) a smart wallet via `POST /wallets`, which
 * is the v4 REST API's idempotent ensure-exists endpoint. Returns
 * the Wallet envelope as the spec defines it (lowercase strings,
 * `factoryAddress` not `factory`).
 *
 * Default behaviour: `nextTestSalt()` returns a fresh salt each call,
 * so each invocation derives a distinct CREATE2 address and registers
 * a brand-new wallet record — that's why the name is `create`, not
 * `get`. Callers that need a stable wallet across re-runs pass an
 * explicit `saltValue`, and the same (owner, salt) always returns the
 * same address — get-or-create semantics under the hood.
 */
export async function createSmartWallet(
  client: Client,
  options: CreateSmartWalletOptions = {},
): Promise<v4.Wallet> {
  const salt = options.saltValue ?? nextTestSalt();
  return client.wallets.create({
    salt,
    ...(options.factoryAddress ? { factoryAddress: options.factoryAddress } : {}),
  });
}

/**
 * Bulk cancel/delete a list of workflows; swallows individual
 * failures so the helper can run in a `finally` cleanup without
 * masking the original test failure.
 */
export async function removeCreatedWorkflows(
  client: Client,
  workflowIds: ReadonlyArray<string | undefined>,
): Promise<void> {
  for (const id of workflowIds) {
    if (!id) continue;
    try {
      await client.workflows.cancel(id);
    } catch {
      // Ignore — test cleanup shouldn't drown out the assertion failure.
    }
  }
}

/**
 * The `settings` block all v4 workflows expect in inputVariables.
 * Mirrors v3's `getSettings()` — keeps the per-test boilerplate down.
 */
export function settingsFor(runner: string, name = "Test Simulation") {
  // chain_id (snake_case to match the engine's expectation) is
  // mandatory for contractWrite simulation through Tenderly. Default
  // to Sepolia since the dev stack runs there; callers running on a
  // different chain can override via `settingsForChain` below.
  return { name, runner, chain_id: 11_155_111 };
}

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
