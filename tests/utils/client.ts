/**
 * v4 SDK test client helpers. Mirrors the v3 `getClient` /
 * `authenticateClient` / `getEOAAddress` / `getSmartWallet` API so
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

/**
 * Drive the EIP-191 sign-then-exchange flow against the live
 * aggregator and stash the resulting JWT on the supplied client.
 *
 * @param client v4 Client to authenticate.
 * @param privateKey Optional override; defaults to `TEST_PRIVATE_KEY`.
 * @returns The minted token (also already set on the client).
 */
export async function authenticateClient(
  client: Client,
  privateKey?: string,
): Promise<string> {
  const pk = privateKey ?? testPrivateKey();
  const resp = await client.auth.exchangeWithKey(pk);
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
 */
export async function buildAuthPayload(
  privateKey?: string,
): Promise<{
  ownerAddress: string;
  message: string;
  signature: string;
}> {
  const signed = await signAuthMessage(privateKey ?? testPrivateKey());
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
 * `saltValue` to `getSmartWallet`.
 */
let saltCursor = 1_000;
export function nextTestSalt(): string {
  saltCursor += 1;
  return String(saltCursor);
}

export interface GetSmartWalletOptions {
  /** Override the salt instead of pulling from the per-process cursor. */
  saltValue?: string;
  /** Override the factory address (otherwise the aggregator's default is used). */
  factoryAddress?: string;
}

/**
 * Get-or-create a smart wallet via the v4 idempotent ensure-exists
 * endpoint. Returns the Wallet envelope as the spec defines it
 * (lowercase strings, `factoryAddress` not `factory`).
 */
export async function getSmartWallet(
  client: Client,
  options: GetSmartWalletOptions = {},
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
