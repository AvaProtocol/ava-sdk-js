/**
 * Test env helpers. Loads `.env.$TEST_ENV` first (when set), then `.env`
 * as fallback. `override: false` so process env / CLI always wins.
 *
 * Specific-first matters for `TEST_ENV=railway`: `.env` holds local
 * partner audience/key, `.env.railway` holds production's. Loading
 * `.env` first used to pin those and ignore the railway file.
 */

import * as path from "node:path";
import * as fs from "node:fs";
import * as dotenv from "dotenv";

(function loadEnv(): void {
  const repoRoot = path.resolve(__dirname, "..", "..");
  const target = process.env.TEST_ENV ?? "dev";
  const candidates = [path.join(repoRoot, `.env.${target}`), path.join(repoRoot, ".env")];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      dotenv.config({ path: file, override: false });
    }
  }
})();

/** Required env var; throws a clear message if missing. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Test env var ${name} is required. Set it in .env / .env.${process.env.TEST_ENV ?? "dev"} or your shell.`,
    );
  }
  return value;
}

/** Optional env var with a fallback default. */
export function optionalEnv(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

/** Default to the local docker compose aggregator REST endpoint. */
export const TEST_REST_URL = (): string =>
  optionalEnv("AVS_REST_URL", "http://localhost:8080/api/v1");

/** Test EOA private key (no funds — used for the EIP-191 auth flow). */
export const TEST_PRIVATE_KEY = (): string => requireEnv("TEST_PRIVATE_KEY");

/** Pre-minted admin JWT (alternative to TEST_PRIVATE_KEY). */
export const TEST_API_KEY = (): string | undefined => process.env.AVS_API_KEY;

/**
 * Partner assertion env (EigenLayer-AVS permission map — token metadata).
 * See tests/utils/partner.ts and gateway `partners[]` / partner_assertion_audience.
 *
 * - PARTNER_ASSERTION_PRIVATE_KEY — base64 Ed25519 private seed
 * - PARTNER_ASSERTION_ISSUER — default "studio"
 * - PARTNER_ASSERTION_AUDIENCE — local: avs-gateway-local; production: avs-gateway-prod
 */
