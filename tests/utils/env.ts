/**
 * Test env helpers. Loads .env first (then .env.$TEST_ENV if set)
 * so test runs pick up the same configuration the v3 suite used
 * without each spec file having to call dotenv on its own.
 */

import * as path from "node:path";
import * as fs from "node:fs";
import * as dotenv from "dotenv";

// Load in priority order: process env wins, then .env, then
// .env.$TEST_ENV (defaults to "dev"). Quietly skip files that
// don't exist — local devs keep different combinations.
(function loadEnv(): void {
  const repoRoot = path.resolve(__dirname, "..", "..");
  const target = process.env.TEST_ENV ?? "dev";
  const candidates = [path.join(repoRoot, ".env"), path.join(repoRoot, `.env.${target}`)];
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
