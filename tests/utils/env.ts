// Test environment helpers. Reads required vars from process.env and
// fails the test up front when something is missing (no silent skips
// — a missing AVS_REST_URL means the test author forgot to start
// the local aggregator).

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Test env var ${name} is required. Set it in .env or your shell before running yarn test.`,
    );
  }
  return value;
}

export function optionalEnv(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

/** Default to the local docker compose aggregator. */
export const TEST_REST_URL = (): string =>
  optionalEnv("AVS_REST_URL", "http://localhost:8080/api/v1");

/** Test EOA private key (no funds — used to derive an address for auth). */
export const TEST_PRIVATE_KEY = (): string => requireEnv("TEST_PRIVATE_KEY");
